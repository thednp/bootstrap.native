
/* Native JavaScript for Bootstrap 4 | Alert
-------------------------------------------*/

// IMPORTS
import { supports } from './util/callbacks.js';
import { hasClass, removeClass  } from './util/class.js';
import { bootstrapCustomEvent, on, off  } from './util/event.js';
import { queryElement } from './util/selector.js';
import { emulateTransitionEnd } from './util/transition.js';

// ALERT DEFINITION
// ================
export default class Alert  {

  constructor (element) {

    // initialization element
    element = queryElement(element);

    // reset on re-init
    element.Alert && element.Alert.destroy();

    // bind, target alert, duration and stuff
    const self = this,

      // custom events
      closeCustomEvent = bootstrapCustomEvent('close','alert'),
      closedCustomEvent = bootstrapCustomEvent('closed','alert'),

      // handlers
      triggerHandler = () => {
        hasClass(alert,'fade') ? emulateTransitionEnd(alert,transitionEndHandler) : transitionEndHandler(); 
      },
      clickHandler = e => {
        alert = e.target.closest(`.alert`);
        element = queryElement(`[data-dismiss="alert"]`,alert);
        element && alert && (element === e.target || element.contains(e.target)) && self.close();
      },
      transitionEndHandler = () => {
        off(element, 'click', clickHandler); // detach it's listener
        alert.parentNode.removeChild(alert);
        dispatchCustomEvent.call(alert,closedCustomEvent);
      };

    // public method
    self.close = () => {
      if ( alert && element && hasClass(alert,'show') ) {
        dispatchCustomEvent.call(alert,closeCustomEvent);
        if ( closeCustomEvent.defaultPrevented ) return;
        self.destroy();
      }
    }

    self.destroy = () => {
      removeClass(alert,'show');
      alert && triggerHandler();
      off(element, 'click', clickHandler);
      delete element.Alert;
    }

    // init
    if ( !element.Alert ) { // prevent adding event handlers twice
      on(element, 'click', clickHandler);
    }

    // find the parent alert
    let alert = element.closest(`.alert`);

    // store init object within target element
    self.element = element;
    element.Alert = self;
  }
}

// ALERT DATA API
// ==============
supports.push(['Alert', Alert, '[data-dismiss="alert"]']);

