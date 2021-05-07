/* Native JavaScript for Bootstrap 4 | Toast
-------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import reflow from 'shorter-js/src/misc/reflow.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v4.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';

// TOAST DEFINITION
// ==================

export default function Toast(elem, opsInput) {
  let element;

  // set options
  const options = opsInput || {};

  // bind
  const self = this;

  // toast, timer
  let toast;
  let timer = 0;

  // custom events
  let showCustomEvent;
  let hideCustomEvent;
  let shownCustomEvent;
  let hiddenCustomEvent;
  const ops = {};

  // private methods
  function showComplete() {
    toast.classList.remove('showing');
    toast.classList.add('show');
    dispatchCustomEvent.call(toast, shownCustomEvent);
    if (ops.autohide) self.hide();
  }
  function hideComplete() {
    toast.classList.add('hide');
    dispatchCustomEvent.call(toast, hiddenCustomEvent);
  }
  function close() {
    toast.classList.remove('show');
    if (ops.animation) emulateTransitionEnd(toast, hideComplete);
    else hideComplete();
  }
  function disposeComplete() {
    clearTimeout(timer);
    element.removeEventListener('click', self.hide, false);

    delete element.Toast;
  }

  // public methods
  self.show = () => {
    if (toast && !toast.classList.contains('show')) {
      dispatchCustomEvent.call(toast, showCustomEvent);
      if (showCustomEvent.defaultPrevented) return;
      if (ops.animation) toast.classList.add('fade');
      toast.classList.remove('hide');
      reflow(toast); // force reflow
      toast.classList.add('showing');

      if (ops.animation) emulateTransitionEnd(toast, showComplete);
      else showComplete();
    }
  };
  self.hide = (noTimer) => {
    if (toast && toast.classList.contains('show')) {
      dispatchCustomEvent.call(toast, hideCustomEvent);
      if (hideCustomEvent.defaultPrevented) return;

      if (noTimer) close();
      else timer = setTimeout(close, ops.delay);
    }
  };
  self.dispose = () => {
    if (ops.animation) emulateTransitionEnd(toast, disposeComplete);
    else disposeComplete();
  };

  // init

  // initialization element
  element = queryElement(elem);

  // reset on re-init
  if (element.Toast) element.Toast.dispose();

  // toast, timer
  toast = element.closest('.toast');

  // DATA API
  const animationData = element.getAttribute('data-animation');
  const autohideData = element.getAttribute('data-autohide');
  const delayData = element.getAttribute('data-delay');

  // custom events
  showCustomEvent = bootstrapCustomEvent('show', 'toast');
  hideCustomEvent = bootstrapCustomEvent('hide', 'toast');
  shownCustomEvent = bootstrapCustomEvent('shown', 'toast');
  hiddenCustomEvent = bootstrapCustomEvent('hidden', 'toast');

  // set instance options
  ops.animation = options.animation === false || animationData === 'false' ? 0 : 1; // true by default
  ops.autohide = options.autohide === false || autohideData === 'false' ? 0 : 1; // true by default
  ops.delay = parseInt((options.delay || delayData), 10) || 500; // 500ms default

  if (!element.Toast) { // prevent adding event handlers twice
    element.addEventListener('click', self.hide, false);
  }

  // associate targets to init object
  element.Toast = self;
}
