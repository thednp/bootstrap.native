/* Native JavaScript for Bootstrap 5 | Toast
-------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import addEventListener from 'shorter-js/src/strings/addEventListener';
import removeEventListener from 'shorter-js/src/strings/removeEventListener';
import queryElement from 'shorter-js/src/misc/queryElement';
import reflow from 'shorter-js/src/misc/reflow';
import { getInstance } from 'shorter-js/src/misc/data';

import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import dataBsDismiss from '../strings/dataBsDismiss';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import BaseComponent from './base-component';

// TOAST PRIVATE GC
// ================
const toastString = 'toast';
const toastComponent = 'Toast';
const toastSelector = `.${toastString}`;
const toastDismissSelector = `[${dataBsDismiss}="${toastString}"]`;
const showingClass = 'showing';
/** @deprecated */
const hideClass = 'hide';

const toastDefaults = {
  animation: true,
  autohide: true,
  delay: 500,
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
const showToastEvent = bootstrapCustomEvent(`show.bs.${toastString}`);
const hideToastEvent = bootstrapCustomEvent(`hide.bs.${toastString}`);
const shownToastEvent = bootstrapCustomEvent(`shown.bs.${toastString}`);
const hiddenToastEvent = bootstrapCustomEvent(`hidden.bs.${toastString}`);

// TOAST PRIVATE METHODS
// =====================
/**
 * Executes after the toast is shown to the user.
 * @param {Toast} self the `Toast` instance
 */
function showToastComplete(self) {
  const { element, options } = self;
  removeClass(element, showingClass);

  element.dispatchEvent(shownToastEvent);
  if (options.autohide) self.hide();
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
  element.dispatchEvent(hiddenToastEvent);
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
  removeClass(element, hideClass); // B/C
  reflow(element);
  addClass(element, showClass);
  addClass(element, showingClass);

  if (options.animation) {
    emulateTransitionEnd(element, () => showToastComplete(self));
  } else {
    showToastComplete(self);
  }
}

/**
 * Toggles on/off the `click` event listener.
 * @param {Toast} self the `Toast` instance
 * @param {boolean=} add when `true`, it will add the listener
 */
function toggleToastHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  // @ts-ignore
  if (self.dismiss) {
    // @ts-ignore
    self.dismiss[action]('click', self.hide);
  }
}

// TOAST EVENT HANDLERS
// ====================
/**
 * Executes after the instance has been disposed.
 * @param {Toast} self the `Toast` instance
 */
function completeDisposeToast(self) {
  // @ts-ignore
  clearTimeout(self.timer);
  toggleToastHandler(self);
}

// TOAST DEFINITION
// ================
/** Creates a new `Toast` instance. */
export default class Toast extends BaseComponent {
  /**
   * @param {Element | string} target the target `.toast` element
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
    /** @private @type {any} */
    self.timer = null;
    /** @private @type {Element?} */
    self.dismiss = queryElement(toastDismissSelector, element);

    // bind
    self.show = self.show.bind(self);
    self.hide = self.hide.bind(self);

    // add event listener
    toggleToastHandler(self, true);
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
    if (element && !hasClass(element, showClass)) {
      element.dispatchEvent(showToastEvent);
      if (showToastEvent.defaultPrevented) return;

      clearTimeout(self.timer);
      self.timer = setTimeout(() => showToast(self), 10);
    }
  }

  /** Hides the toast. */
  hide() {
    const self = this;
    const { element, options } = self;

    if (element && hasClass(element, showClass)) {
      element.dispatchEvent(hideToastEvent);
      if (hideToastEvent.defaultPrevented) return;

      clearTimeout(self.timer);
      self.timer = setTimeout(() => hideToast(self), options.delay);
    }
  }

  /** Removes the `Toast` component from the target element. */
  dispose() {
    const self = this;
    const { element } = self;

    if (hasClass(element, showClass)) {
      removeClass(element, showClass);
    }

    completeDisposeToast(self);

    super.dispose();
  }
}

Object.assign(Toast, {
  selector: toastSelector,
  init: toastInitCallback,
  getInstance: getToastInstance,
});
