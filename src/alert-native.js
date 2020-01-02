
/* Native JavaScript for Bootstrap 4 | Alert
-------------------------------------------- */

import { supports } from './util/globals.js';
import { hasClass, removeClass  } from './util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off  } from './util/event.js';
import { queryElement } from './util/selector.js';
import { emulateTransitionEnd } from './util/transition.js';

/* ALERT DEFINITION
// ================ */

export default function Alert(element) {

  element = queryElement(element); // initialization element

  element.Alert && element.Alert.destroy(); // reset on re-init

  /* CONSTANTS
  * bind 
  * custom events
  * handlers
  */

  const 
    self = this, 
    closeCustomEvent = bootstrapCustomEvent('close','alert'),
    closedCustomEvent = bootstrapCustomEvent('closed','alert'),

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

  /* PUBLIC METHODS
  -----------------*/

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

  /* INIT
  * prevent adding event handlers twice */
  if ( !element.Alert ) { // 
    on(element, 'click', clickHandler);
  }

  /* find the parent alert */
  let alert = element.closest(`.alert`);

  /* store init object within target element */
  self.element = element;
  element.Alert = self;
}

/* ALERT DATA API
 * ============== */

supports.push(['Alert', Alert, '[data-dismiss="alert"]']);

