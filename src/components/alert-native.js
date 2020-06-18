
/* Native JavaScript for Bootstrap 4 | Alert
-------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';

// ALERT DEFINITION
// ================

export default function Alert(element) {
  
  // bind
  let self = this,
  
    // the target alert 
    alert,

    // custom events
    closeCustomEvent = bootstrapCustomEvent('close','alert'),
    closedCustomEvent = bootstrapCustomEvent('closed','alert');

  // private methods
  function triggerHandler() {
    alert.classList.contains('fade') ? emulateTransitionEnd(alert,transitionEndHandler) : transitionEndHandler(); 
  }
  function toggleEvents(action){
    action = action ? 'addEventListener' : 'removeEventListener';
    element[action]('click',clickHandler,false);
  }

  // event handlers
  function clickHandler(e) {
    alert = e && e.target.closest(`.alert`);
    element = queryElement('[data-dismiss="alert"]',alert);
    element && alert && (element === e.target || element.contains(e.target)) && self.close();
  }
  function transitionEndHandler() {
    // off(element, 'click', clickHandler); // detach it's listener
    toggleEvents()
    alert.parentNode.removeChild(alert);
    dispatchCustomEvent.call(alert,closedCustomEvent);
  }

  // PUBLIC METHODS
  self.close = () => {
    if ( alert && element && alert.classList.contains('show') ) {
      dispatchCustomEvent.call(alert,closeCustomEvent);
      if ( closeCustomEvent.defaultPrevented ) return;
      self.dispose();
      alert.classList.remove('show');
      triggerHandler();
    }
  }

  self.dispose = () => {    
    // off(element, 'click', clickHandler);
    toggleEvents()
    delete element.Alert;
  }

  // INIT
  // initialization element
  element = queryElement(element);
  
  // find the target alert 
  alert = element.closest('.alert');
  
  // reset on re-init
  element.Alert && element.Alert.dispose();     
  
  // prevent adding event handlers twice 
  if ( !element.Alert ) {
    // on(element, 'click', clickHandler);
    toggleEvents(1)
  }

  // store init object within target element 
  self.element = element;
  element.Alert = self;
}

