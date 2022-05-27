/* Native JavaScript for Bootstrap 5 | Toast
-------------------------------------------- */
import mouseclickEvent from '@thednp/shorty/src/strings/mouseclickEvent';
import mouseenterEvent from '@thednp/shorty/src/strings/mouseenterEvent';
import mouseleaveEvent from '@thednp/shorty/src/strings/mouseleaveEvent';
import focusinEvent from '@thednp/shorty/src/strings/focusinEvent';
import focusoutEvent from '@thednp/shorty/src/strings/focusoutEvent';
import addClass from '@thednp/shorty/src/class/addClass';
import hasClass from '@thednp/shorty/src/class/hasClass';
import removeClass from '@thednp/shorty/src/class/removeClass';
import querySelector from '@thednp/shorty/src/selectors/querySelector';
import dispatchEvent from '@thednp/shorty/src/misc/dispatchEvent';
import emulateTransitionEnd from '@thednp/shorty/src/misc/emulateTransitionEnd';
import ObjectAssign from '@thednp/shorty/src/misc/ObjectAssign';
import reflow from '@thednp/shorty/src/misc/reflow';
import { getInstance } from '@thednp/shorty/src/misc/data';
import Timer from '@thednp/shorty/src/misc/timer';
import OriginalEvent from '@thednp/shorty/src/misc/OriginalEvent';

import { addListener, removeListener } from '@thednp/event-listener/src/event-listener';

import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import dataBsDismiss from '../strings/dataBsDismiss';
import toastString from '../strings/toastString';
import toastComponent from '../strings/toastComponent';

import BaseComponent from './base-component';

// TOAST PRIVATE GC
// ================
const toastSelector = `.${toastString}`;
const toastDismissSelector = `[${dataBsDismiss}="${toastString}"]`;
const showingClass = 'showing';
/** @deprecated */
const hideClass = 'hide';

const toastDefaults = {
  animation: true,
  autohide: true,
  delay: 5000,
};

/**
 * Static method which returns an existing `Toast` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Toast>}
 */
const getToastInstance = (element) => getInstance(element, toastComponent);

/**
 * A `Toast` initialization callback.
 * @type {BSN.InitCallback<Toast>}
 */
const toastInitCallback = (element) => new Toast(element);

// TOAST CUSTOM EVENTS
// ===================
const showToastEvent = OriginalEvent(`show.bs.${toastString}`);
const shownToastEvent = OriginalEvent(`shown.bs.${toastString}`);
const hideToastEvent = OriginalEvent(`hide.bs.${toastString}`);
const hiddenToastEvent = OriginalEvent(`hidden.bs.${toastString}`);

// TOAST PRIVATE METHODS
// =====================
/**
 * Executes after the toast is shown to the user.
 * @param {Toast} self the `Toast` instance
 */
function showToastComplete(self) {
  const { element, options } = self;
  removeClass(element, showingClass);
  Timer.clear(element, showingClass);

  dispatchEvent(element, shownToastEvent);
  /* istanbul ignore else */
  if (options.autohide) {
    Timer.set(element, () => self.hide(), options.delay, toastString);
  }
}

/**
 * Executes after the toast is hidden to the user.
 * @param {Toast} self the `Toast` instance
 */
function hideToastComplete(self) {
  const { element } = self;
  removeClass(element, showingClass);
  removeClass(element, showClass);
  addClass(element, hideClass); // B/C
  Timer.clear(element, toastString);
  dispatchEvent(element, hiddenToastEvent);
}

/**
 * Executes before hiding the toast.
 * @param {Toast} self the `Toast` instance
 */
function hideToast(self) {
  const { element, options } = self;
  addClass(element, showingClass);

  if (options.animation) {
    reflow(element);
    emulateTransitionEnd(element, () => hideToastComplete(self));
  } else {
    hideToastComplete(self);
  }
}

/**
 * Executes before showing the toast.
 * @param {Toast} self the `Toast` instance
 */
function showToast(self) {
  const { element, options } = self;
  Timer.set(element, () => {
    removeClass(element, hideClass); // B/C
    reflow(element);
    addClass(element, showClass);
    addClass(element, showingClass);

    if (options.animation) {
      emulateTransitionEnd(element, () => showToastComplete(self));
    } else {
      showToastComplete(self);
    }
  }, 17, showingClass);
}

/**
 * Toggles on/off the `click` event listener.
 * @param {Toast} self the `Toast` instance
 * @param {boolean=} add when `true`, it will add the listener
 */
function toggleToastHandlers(self, add) {
  const action = add ? addListener : removeListener;
  const { element, dismiss, options } = self;
  /* istanbul ignore else */
  if (dismiss) {
    action(dismiss, mouseclickEvent, self.hide);
  }
  /* istanbul ignore else */
  if (options.autohide) {
    [focusinEvent, focusoutEvent, mouseenterEvent, mouseleaveEvent]
      .forEach((e) => action(element, e, interactiveToastHandler));
  }
}

// TOAST EVENT HANDLERS
// ====================
/**
 * Executes after the instance has been disposed.
 * @param {Toast} self the `Toast` instance
 */
function completeDisposeToast(self) {
  Timer.clear(self.element, toastString);
  toggleToastHandlers(self);
}

/**
 * Executes when user interacts with the toast without closing it,
 * usually by hovering or focusing it.
 *
 * @this {HTMLElement}
 * @param {MouseEvent} e the `Toast` instance
 */
function interactiveToastHandler(e) {
  const element = this;
  const self = getToastInstance(element);
  const { type, relatedTarget } = e;

  /* istanbul ignore next: a solid filter is required */
  if (!self || (element === relatedTarget || element.contains(relatedTarget))) return;

  if ([mouseenterEvent, focusinEvent].includes(type)) {
    Timer.clear(element, toastString);
  } else {
    Timer.set(element, () => self.hide(), self.options.delay, toastString);
  }
}

// TOAST DEFINITION
// ================
/** Creates a new `Toast` instance. */
export default class Toast extends BaseComponent {
  /**
   * @param {HTMLElement | string} target the target `.toast` element
   * @param {BSN.Options.Toast=} config the instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;
    const { element, options } = self;

    // set fadeClass, the options.animation will override the markup
    if (options.animation && !hasClass(element, fadeClass)) addClass(element, fadeClass);
    else if (!options.animation && hasClass(element, fadeClass)) removeClass(element, fadeClass);
    // dismiss button
    /** @type {HTMLElement?} */
    self.dismiss = querySelector(toastDismissSelector, element);

    // bind
    self.show = self.show.bind(self);
    self.hide = self.hide.bind(self);

    // add event listener
    toggleToastHandlers(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */  
  get name() { return toastComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */  
  get defaults() { return toastDefaults; }
  /* eslint-enable */

  // TOAST PUBLIC METHODS
  // ====================
  /** Shows the toast. */
  show() {
    const self = this;
    const { element } = self;
    /* istanbul ignore else */
    if (element && !hasClass(element, showClass)) {
      dispatchEvent(element, showToastEvent);
      if (showToastEvent.defaultPrevented) return;

      showToast(self);
    }
  }

  /** Hides the toast. */
  hide() {
    const self = this;
    const { element } = self;

    /* istanbul ignore else */
    if (element && hasClass(element, showClass)) {
      dispatchEvent(element, hideToastEvent);
      if (hideToastEvent.defaultPrevented) return;
      hideToast(self);
    }
  }

  /** Removes the `Toast` component from the target element. */
  dispose() {
    const self = this;
    const { element } = self;

    /* istanbul ignore else */
    if (hasClass(element, showClass)) {
      removeClass(element, showClass);
    }

    completeDisposeToast(self);

    super.dispose();
  }
}

ObjectAssign(Toast, {
  selector: toastSelector,
  init: toastInitCallback,
  getInstance: getToastInstance,
});
