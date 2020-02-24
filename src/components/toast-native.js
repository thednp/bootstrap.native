
/* Native JavaScript for Bootstrap 4 | Toast
-------------------------------------------- */
import { hasClass, addClass, removeClass } from '../util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off } from '../util/event.js';
import { queryElement } from '../util/selector.js';
import { emulateTransitionEnd } from '../util/transition.js';
import { componentInit } from '../util/misc.js';

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
      hiddenCustomEvent;

  // private methods
  function showComplete() {
    removeClass( toast, 'showing' );
    addClass( toast, 'show' );
    dispatchCustomEvent.call(toast,shownCustomEvent);
    if (self.options.autohide) { self.hide(); }
  }
  function hideComplete() {
    addClass( toast, 'hide' );
    dispatchCustomEvent.call(toast,hiddenCustomEvent);
  }
  function close () {
    removeClass( toast,'show' );
    self.options.animation ? emulateTransitionEnd(toast, hideComplete) : hideComplete();
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
      self.options.animation && addClass( toast,'fade' );
      removeClass( toast,'hide' );
      toast.offsetWidth; // force reflow
      addClass( toast,'showing' );

      self.options.animation ? emulateTransitionEnd(toast, showComplete) : showComplete();
    }
  };
  self.hide = noTimer => {
    if (toast && hasClass(toast,'show')) {
      dispatchCustomEvent.call(toast,hideCustomEvent);
      if(hideCustomEvent.defaultPrevented) return;

      noTimer ? close() : (timer = setTimeout( close, self.options.delay));
    }
  };
  self.dispose = () => {
    self.options.animation ? emulateTransitionEnd(toast, disposeComplete) : disposeComplete();
  };

  // init
  componentInit(()=>{

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
    self.options = {};
    self.options.animation = options.animation === false || animationData === 'false' ? 0 : 1; // true by default
    self.options.autohide = options.autohide === false || autohideData === 'false' ? 0 : 1; // true by default
    self.options.delay = parseInt(options.delay || delayData) || 500; // 500ms default    
    
    if ( !element.Toast ) { // prevent adding event handlers twice
      on(element, 'click', self.hide);
    }
  
    // associate targets to init object
    self.toast = toast;
    self.element = element;
    element.Toast = self;
  })

}

