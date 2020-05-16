
/* Native JavaScript for Bootstrap 4 | Alert
-------------------------------------------- */
import { hasClass } from 'shorter-js/src/class/hasClass.js';
import { removeClass } from 'shorter-js/src/class/removeClass.js';
import { on } from 'shorter-js/src/event/on.js';
import { off } from 'shorter-js/src/event/off.js';
import { emulateTransitionEnd } from 'shorter-js/src/misc/emulateTransitionEnd.js';
import { queryElement } from 'shorter-js/src/misc/queryElement.js';
import { tryWrapper } from 'shorter-js/src/misc/tryWrapper.js';

import { bootstrapCustomEvent, dispatchCustomEvent } from '../util/event.js';

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
  tryWrapper(()=>{
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
  },"BSN.Alert")
}

