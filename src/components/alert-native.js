/* Native JavaScript for Bootstrap 4 | Alert
-------------------------------------------- */
import emulateTransitionEnd from '@thednp/shorty/src/misc/emulateTransitionEndLegacy';
import querySelector from '@thednp/shorty/src/selectors/querySelector';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import dispatchCustomEvent from '../util/dispatchCustomEvent';

// ALERT DEFINITION
// ================

export default function Alert(elem) {
  let element;

  // bind
  const self = this;

  // the target alert
  let alert;

  // custom events
  const closeCustomEvent = bootstrapCustomEvent('close', 'alert');
  const closedCustomEvent = bootstrapCustomEvent('closed', 'alert');

  // private methods
  function triggerHandler() {
    if (alert.classList.contains('fade')) emulateTransitionEnd(alert, transitionEndHandler);
    else transitionEndHandler();
  }
  function toggleEvents(add) {
    const action = add ? 'addEventListener' : 'removeEventListener';
    element[action]('click', clickHandler, false);
  }

  // event handlers
  function clickHandler(e) {
    alert = e && e.target.closest('.alert');
    element = querySelector('[data-dismiss="alert"]', alert);
    if (element && alert && (element === e.target || element.contains(e.target))) self.close();
  }
  function transitionEndHandler() {
    toggleEvents();
    alert.parentNode.removeChild(alert);
    dispatchCustomEvent.call(alert, closedCustomEvent);
  }

  // PUBLIC METHODS
  self.close = () => {
    if (alert && element && alert.classList.contains('show')) {
      dispatchCustomEvent.call(alert, closeCustomEvent);
      if (closeCustomEvent.defaultPrevented) return;
      self.dispose();
      alert.classList.remove('show');
      triggerHandler();
    }
  };

  self.dispose = () => {
    toggleEvents();
    delete element.Alert;
  };

  // INIT
  // initialization element
  element = querySelector(elem);

  // find the target alert
  alert = element.closest('.alert');

  // reset on re-init
  if (element.Alert) element.Alert.dispose();

  // prevent adding event handlers twice
  if (!element.Alert) toggleEvents(1);

  // store init object within target element
  self.element = element;
  element.Alert = self;
}
