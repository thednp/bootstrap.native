/* Native JavaScript for Bootstrap 5 | Toast
-------------------------------------------- */
import {
  mouseclickEvent,
  closest,
  removeClass,
  hasClass,
  addClass,
  focusoutEvent,
  focusinEvent,
  mouseleaveEvent,
  mouseenterEvent,
  createCustomEvent,
  getDocument,
  Timer,
  getInstance,
  reflow,
  emulateTransitionEnd,
  dispatchEvent,
  querySelectorAll,
  querySelector,
} from '@thednp/shorty';

import { addListener, removeListener } from '@thednp/event-listener';

import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import dataBsDismiss from '../strings/dataBsDismiss';
import dataBsToggle from '../strings/dataBsToggle';
import toastString from '../strings/toastString';
import toastComponent from '../strings/toastComponent';
import getTargetElement from '../util/getTargetElement';
import BaseComponent from './base-component';
import { ToastOptions, ToastEvent } from '../interface/toast';

// TOAST PRIVATE GC
// ================
const toastSelector = `.${toastString}`;
const toastDismissSelector = `[${dataBsDismiss}="${toastString}"]`;
const toastToggleSelector = `[${dataBsToggle}="${toastString}"]`;
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
 */
const getToastInstance = (element: HTMLElement) => getInstance<Toast>(element, toastComponent);

/**
 * A `Toast` initialization callback.
 */
const toastInitCallback = (element: HTMLElement) => new Toast(element);

// TOAST CUSTOM EVENTS
// ===================
const showToastEvent = createCustomEvent<ToastEvent>(`show.bs.${toastString}`);
const shownToastEvent = createCustomEvent<ToastEvent>(`shown.bs.${toastString}`);
const hideToastEvent = createCustomEvent<ToastEvent>(`hide.bs.${toastString}`);
const hiddenToastEvent = createCustomEvent<ToastEvent>(`hidden.bs.${toastString}`);

// TOAST PRIVATE METHODS
// =====================
/**
 * Executes after the toast is shown to the user.
 *
 * @param self the `Toast` instance
 */
const showToastComplete = (self: Toast) => {
  const { element, options } = self;
  removeClass(element, showingClass);
  Timer.clear(element, showingClass);

  dispatchEvent(element, shownToastEvent);
  /* istanbul ignore else */
  if (options.autohide) {
    Timer.set(element, () => self.hide(), options.delay, toastString);
  }
};

/**
 * Executes after the toast is hidden to the user.
 *
 * @param self the `Toast` instance
 */
const hideToastComplete = (self: Toast) => {
  const { element } = self;
  removeClass(element, showingClass);
  removeClass(element, showClass);
  addClass(element, hideClass); // B/C
  Timer.clear(element, toastString);
  dispatchEvent(element, hiddenToastEvent);
};

/**
 * Executes before hiding the toast.
 *
 * @param self the `Toast` instance
 */
const hideToast = (self: Toast) => {
  const { element, options } = self;
  addClass(element, showingClass);

  if (options.animation) {
    reflow(element);
    emulateTransitionEnd(element, () => hideToastComplete(self));
  } else {
    hideToastComplete(self);
  }
};

/**
 * Executes before showing the toast.
 *
 * @param self the `Toast` instance
 */
const showToast = (self: Toast) => {
  const { element, options } = self;
  Timer.set(
    element,
    () => {
      removeClass(element, hideClass); // B/C
      reflow(element);
      addClass(element, showClass);
      addClass(element, showingClass);

      if (options.animation) {
        emulateTransitionEnd(element, () => showToastComplete(self));
      } else {
        showToastComplete(self);
      }
    },
    17,
    showingClass,
  );
};

// TOAST EVENT HANDLERS
// ====================
/**
 * Executes after the instance has been disposed.
 *
 * @param {Toast} self the `Toast` instance
 */
const completeDisposeToast = (self: Toast) => {
  Timer.clear(self.element, toastString);
  self._toggleEventListeners();
};

/**
 * Handles the `click` event listener for toast.
 *
 * @param e the `Event` object
 */
const toastClickHandler = (e: Event) => {
  const { target } = e;

  const trigger = target && closest(target as HTMLElement, toastToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getToastInstance(element);

  /* istanbul ignore else */
  if (self) {
    /* istanbul ignore else */
    if (trigger && trigger.tagName === 'A') e.preventDefault();
    self.relatedTarget = trigger;
    self.show();
  }
};

/**
 * Executes when user interacts with the toast without closing it,
 * usually by hovering or focusing it.
 *
 * @param e the `Toast` instance
 */
const interactiveToastHandler = (e: MouseEvent) => {
  const element = e.target as HTMLElement;
  const self = getToastInstance(element);
  const { type, relatedTarget } = e;

  /* istanbul ignore else: a solid filter is required */
  if (self && element !== relatedTarget && !element.contains(relatedTarget as Node)) {
    if ([mouseenterEvent, focusinEvent].includes(type)) {
      Timer.clear(element, toastString);
    } else {
      Timer.set(element, () => self.hide(), self.options.delay, toastString);
    }
  }
};

// TOAST DEFINITION
// ================
/** Creates a new `Toast` instance. */
export default class Toast extends BaseComponent {
  static selector = toastSelector;
  static init = toastInitCallback;
  static getInstance = getToastInstance;
  declare options: ToastOptions;
  declare dismiss: HTMLElement | null;
  declare triggers: HTMLElement[];
  declare relatedTarget: HTMLElement | null;

  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(target: HTMLElement | string, config?: Partial<ToastOptions>) {
    super(target, config);
    const { element, options } = this;

    // set fadeClass, the options.animation will override the markup
    if (options.animation && !hasClass(element, fadeClass)) addClass(element, fadeClass);
    else if (!options.animation && hasClass(element, fadeClass)) removeClass(element, fadeClass);

    // dismiss button
    this.dismiss = querySelector(toastDismissSelector, element);

    // toast can have multiple triggering elements
    this.triggers = [...querySelectorAll(toastToggleSelector, getDocument(element))].filter(
      btn => getTargetElement(btn) === element,
    );

    // add event listener
    this._toggleEventListeners(true);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return toastComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return toastDefaults;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return hasClass(this.element, showClass);
  }

  // TOAST PUBLIC METHODS
  // ====================
  /** Shows the toast. */
  show = () => {
    const { element, isShown } = this;

    /* istanbul ignore else */
    if (element && !isShown) {
      dispatchEvent(element, showToastEvent);
      if (!showToastEvent.defaultPrevented) {
        showToast(this);
      }
    }
  };

  /** Hides the toast. */
  hide = () => {
    const { element, isShown } = this;

    /* istanbul ignore else */
    if (element && isShown) {
      dispatchEvent(element, hideToastEvent);
      if (!hideToastEvent.defaultPrevented) {
        hideToast(this);
      }
    }
  };

  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, it will add the listener
   */
  _toggleEventListeners = (add?: boolean) => {
    const action = add ? addListener : removeListener;
    const { element, triggers, dismiss, options, hide } = this;

    /* istanbul ignore else */
    if (dismiss) {
      action(dismiss, mouseclickEvent, hide);
    }

    /* istanbul ignore else */
    if (options.autohide) {
      [focusinEvent, focusoutEvent, mouseenterEvent, mouseleaveEvent].forEach(e =>
        action(element, e, interactiveToastHandler),
      );
    }
    /* istanbul ignore else */
    if (triggers.length) {
      triggers.forEach(btn => action(btn, mouseclickEvent, toastClickHandler));
    }
  };

  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element, isShown } = this;

    /* istanbul ignore else */
    if (isShown) {
      removeClass(element, showClass);
    }

    completeDisposeToast(this);

    super.dispose();
  }
}
