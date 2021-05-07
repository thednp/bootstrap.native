/* Native JavaScript for Bootstrap 5 | Toast
-------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import addClass from 'shorter-js/src/class/addClass.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';
import queryElement from 'shorter-js/src/misc/queryElement';
import reflow from 'shorter-js/src/misc/reflow.js';

import fadeClass from '../strings/fadeClass.js';
import showClass from '../strings/showClass.js';
import dataBsDismiss from '../strings/dataBsDismiss.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import BaseComponent from './base-component.js';

// TOAST PRIVATE GC
// ================
const toastString = 'toast';
const toastComponent = 'Toast';
const toastSelector = `.${toastString}`;
const toastDismissSelector = `[${dataBsDismiss}="${toastString}"]`;
const showingClass = 'showing';
const hideClass = 'hide';
const toastDefaultOptions = {
  animation: true,
  autohide: true,
  delay: 500,
};

// TOAST CUSTOM EVENTS
// ===================
const showToastEvent = bootstrapCustomEvent(`show.bs.${toastString}`);
const hideToastEvent = bootstrapCustomEvent(`hide.bs.${toastString}`);
const shownToastEvent = bootstrapCustomEvent(`shown.bs.${toastString}`);
const hiddenToastEvent = bootstrapCustomEvent(`hidden.bs.${toastString}`);

// TOAST PRIVATE METHODS
// =====================
function showToastComplete(self) {
  const { element, options } = self;
  if (!options.animation) {
    removeClass(element, showingClass);
    addClass(element, showClass);
  }

  element.dispatchEvent(shownToastEvent);
  if (options.autohide) self.hide();
}

function hideToastComplete(self) {
  const { element } = self;
  addClass(element, hideClass);
  element.dispatchEvent(hiddenToastEvent);
}

function closeToast(self) {
  const { element, options } = self;
  removeClass(element, showClass);

  if (options.animation) {
    reflow(element);
    emulateTransitionEnd(element, () => hideToastComplete(self));
  } else {
    hideToastComplete(self);
  }
}

function openToast(self) {
  const { element, options } = self;
  removeClass(element, hideClass);

  if (options.animation) {
    reflow(element);
    addClass(element, showingClass);
    addClass(element, showClass);

    emulateTransitionEnd(element, () => showToastComplete(self));
  } else {
    showToastComplete(self);
  }
}

function toggleToastHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  if (self.dismiss) {
    self.dismiss[action]('click', self.hide);
  }
}

// TOAST EVENT HANDLERS
// ====================
function completeDisposeToast(self) {
  clearTimeout(self.timer);
  toggleToastHandler(self);
}

// TOAST DEFINITION
// ================
export default class Toast extends BaseComponent {
  constructor(target, config) {
    super(toastComponent, target, toastDefaultOptions, config);
    // bind
    const self = this;

    // dismiss button
    self.dismiss = queryElement(toastDismissSelector, self.element);

    // bind
    self.show = self.show.bind(self);
    self.hide = self.hide.bind(self);

    // add event listener
    toggleToastHandler(self, 1);
  }

  // TOAST PUBLIC METHODS
  // ====================
  show() {
    const self = this;
    const { element } = self;
    if (element && hasClass(element, hideClass)) {
      element.dispatchEvent(showToastEvent);
      if (showToastEvent.defaultPrevented) return;

      addClass(element, fadeClass);
      clearTimeout(self.timer);
      self.timer = setTimeout(() => openToast(self), 10);
    }
  }

  hide(noTimer) {
    const self = this;
    const { element, options } = self;

    if (element && hasClass(element, showClass)) {
      element.dispatchEvent(hideToastEvent);
      if (hideToastEvent.defaultPrevented) return;

      clearTimeout(self.timer);
      self.timer = setTimeout(
        closeToast(self),
        noTimer ? 10 : options.delay,
      );
    }
  }

  dispose() {
    const self = this;
    const { element, options } = self;
    self.hide();

    if (options.animation) emulateTransitionEnd(element, () => completeDisposeToast(self));
    else completeDisposeToast(self);

    super.dispose(toastComponent);
  }
}

Toast.init = {
  component: toastComponent,
  selector: toastSelector,
  constructor: Toast,
};
