
/* Native JavaScript for Bootstrap 5 | Toast
-------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';

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
    if (!ops.animation) {
      toast.classList.remove('showing')
      toast.classList.add('show')
    }

    dispatchCustomEvent.call(toast,shownCustomEvent)
    ops.autohide && self.hide()
  }
  function hideComplete() {
    toast.classList.add( 'hide' );
    dispatchCustomEvent.call(toast,hiddenCustomEvent);
  }
  function close() {
    toast.classList.remove('show')
    if (ops.animation){
      toast.offsetWidth // force reflow
      emulateTransitionEnd(toast, hideComplete)
    } else {
      hideComplete()
    }
  }
  function open() {
    toast.classList.remove('hide')
    
    if (ops.animation) {
      toast.offsetWidth // force reflow
      toast.classList.add('showing')
      toast.classList.add('show')
      
      emulateTransitionEnd(toast, showComplete)
    } else {
      showComplete()
    }
  }
  function disposeComplete() {
    clearTimeout(timer);
    element.removeEventListener('click',self.hide,false);

    delete element.Toast;
  }

  // public methods
  self.show = () => {
    if (toast && toast.classList.contains('hide')) {
      dispatchCustomEvent.call(toast,showCustomEvent)
      if (showCustomEvent.defaultPrevented) return
      toast.classList.add('fade')
      clearTimeout(timer)
      timer = setTimeout( open, 10)
    }
  };
  self.hide = noTimer => {
    if (toast && toast.classList.contains('show')) {
      dispatchCustomEvent.call(toast,hideCustomEvent)
      if (hideCustomEvent.defaultPrevented) return
      clearTimeout(timer)
      timer = setTimeout( close, noTimer ? 10 : ops.delay)
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
  animationData = element.getAttribute('data-bs-animation')
  autohideData = element.getAttribute('data-bs-autohide')
  delayData = element.getAttribute('data-bs-delay')

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
    element.addEventListener('click',self.hide,false);
  }

  // associate targets to init object
  element.Toast = self;
}

