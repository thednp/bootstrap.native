
/* Native JavaScript for Bootstrap 4 | Toast
-------------------------------------------- */
import { hasClass } from 'shorter-js/src/class/hasClass.js';
import { addClass } from 'shorter-js/src/class/addClass.js';
import { removeClass } from 'shorter-js/src/class/removeClass.js';
import { on } from 'shorter-js/src/event/on.js';
import { off } from 'shorter-js/src/event/off.js';
import { emulateTransitionEnd } from 'shorter-js/src/misc/emulateTransitionEnd.js';
import { queryElement } from 'shorter-js/src/misc/queryElement.js';
// import { tryWrapper } from 'shorter-js/src/misc/tryWrapper.js';

import { bootstrapCustomEvent, dispatchCustomEvent } from '../util/event.js';

// TOAST DEFINITION
// ==================

export default function Toast(element,options) {

  // set options
  options = options || {};

  // bind
  let self = this,

      // toast, timer
      toast, timer = 0,

      // DATA API
      animationData,
      autohideData,
      delayData,

      // custom events
      showCustomEvent,
      hideCustomEvent,
      shownCustomEvent,
      hiddenCustomEvent,
      ops = {};

  // private methods
  function showComplete() {
    removeClass( toast, 'showing' );
    addClass( toast, 'show' );
    dispatchCustomEvent.call(toast,shownCustomEvent);
    if (ops.autohide) { self.hide(); }
  }
  function hideComplete() {
    addClass( toast, 'hide' );
    dispatchCustomEvent.call(toast,hiddenCustomEvent);
  }
  function close () {
    removeClass( toast,'show' );
    ops.animation ? emulateTransitionEnd(toast, hideComplete) : hideComplete();
  }
  function disposeComplete() {
    clearTimeout(timer);
    off(element, 'click', self.hide);
    delete element.Toast;
  }

  // public methods
  self.show = () => {
    if (toast && !hasClass(toast,'show')) {
      dispatchCustomEvent.call(toast,showCustomEvent);
      if (showCustomEvent.defaultPrevented) return;
      ops.animation && addClass( toast,'fade' );
      removeClass( toast,'hide' );
      toast.offsetWidth; // force reflow
      addClass( toast,'showing' );

      ops.animation ? emulateTransitionEnd(toast, showComplete) : showComplete();
    }
  };
  self.hide = noTimer => {
    if (toast && hasClass(toast,'show')) {
      dispatchCustomEvent.call(toast,hideCustomEvent);
      if(hideCustomEvent.defaultPrevented) return;

      noTimer ? close() : (timer = setTimeout( close, ops.delay));
    }
  };
  self.dispose = () => {
    ops.animation ? emulateTransitionEnd(toast, disposeComplete) : disposeComplete();
  };

  // init

  // initialization element
  element = queryElement(element)

  // reset on re-init
  element.Toast && element.Toast.dispose()

  // toast, timer
  toast = element.closest('.toast')

  // DATA API
  animationData = element.getAttribute('data-animation')
  autohideData = element.getAttribute('data-autohide')
  delayData = element.getAttribute('data-delay')

  // custom events
  showCustomEvent = bootstrapCustomEvent('show', 'toast')
  hideCustomEvent = bootstrapCustomEvent('hide', 'toast')
  shownCustomEvent = bootstrapCustomEvent('shown', 'toast')
  hiddenCustomEvent = bootstrapCustomEvent('hidden', 'toast')

  // set instance options
  ops.animation = options.animation === false || animationData === 'false' ? 0 : 1; // true by default
  ops.autohide = options.autohide === false || autohideData === 'false' ? 0 : 1; // true by default
  ops.delay = parseInt(options.delay || delayData) || 500; // 500ms default    
  
  if ( !element.Toast ) { // prevent adding event handlers twice
    on(element, 'click', self.hide);
  }

  // associate targets to init object
  element.Toast = self;

}

