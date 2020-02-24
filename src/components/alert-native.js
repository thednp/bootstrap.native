
/* Native JavaScript for Bootstrap 4 | Alert
-------------------------------------------- */
import { hasClass, removeClass  } from '../util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off } from '../util/event.js';
import { queryElement } from '../util/selector.js';
import { emulateTransitionEnd } from '../util/transition.js';
import { componentInit } from '../util/misc.js';

// ALERT DEFINITION
// ================

export default function Alert(element) {
  
  // bind
  let self = this
  
  // find the target alert 
  let alert

  // CONSTANTS
  const 
    closeCustomEvent = bootstrapCustomEvent('close','alert'),
    closedCustomEvent = bootstrapCustomEvent('closed','alert');

  // private methods
  function triggerHandler() {
    hasClass(alert,'fade') ? emulateTransitionEnd(alert,transitionEndHandler) : transitionEndHandler(); 
  }

  // event handlers
  function clickHandler(e) {
    alert = e && e.target.closest(`.alert`);
    element = queryElement('[data-dismiss="alert"]',alert);
    element && alert && (element === e.target || element.contains(e.target)) && self.close();
  }
  function transitionEndHandler() {
    off(element, 'click', clickHandler); // detach it's listener
    alert.parentNode.removeChild(alert);
    dispatchCustomEvent.call(alert,closedCustomEvent);
  }

  // PUBLIC METHODS
  self.close = () => {
    if ( alert && element && hasClass(alert,'show') ) {
      dispatchCustomEvent.call(alert,closeCustomEvent);
      if ( closeCustomEvent.defaultPrevented ) return;
      self.dispose();
      removeClass(alert,'show');
      triggerHandler();
    }
  }

  self.dispose = () => {
    off(element, 'click', clickHandler);
    delete element.Alert;
  }

  // INIT
  // prevent adding event handlers twice 
  componentInit(()=>{
    // initialization element
    element = queryElement(element);

    // find the target alert 
    alert = element.closest('.alert');

    // reset on re-init
    element.Alert && element.Alert.dispose();     

    if ( !element.Alert ) {
      on(element, 'click', clickHandler);
    }
  
    // store init object within target element 
    self.element = element;
    element.Alert = self;
  })
}

