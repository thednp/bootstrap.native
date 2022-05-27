/* Native JavaScript for Bootstrap 5 | Alert
-------------------------------------------- */
import mouseclickEvent from '@thednp/shorty/src/strings/mouseclickEvent';
import emulateTransitionEnd from '@thednp/shorty/src/misc/emulateTransitionEnd';
import querySelector from '@thednp/shorty/src/selectors/querySelector';
import closest from '@thednp/shorty/src/selectors/closest';
import ObjectAssign from '@thednp/shorty/src/misc/ObjectAssign';
import hasClass from '@thednp/shorty/src/class/hasClass';
import removeClass from '@thednp/shorty/src/class/removeClass';
import dispatchEvent from '@thednp/shorty/src/misc/dispatchEvent';
import { getInstance } from '@thednp/shorty/src/misc/data';
import OriginalEvent from '@thednp/shorty/src/misc/OriginalEvent';
import { addListener, removeListener } from '@thednp/event-listener/src/event-listener';

import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import dataBsDismiss from '../strings/dataBsDismiss';
import alertString from '../strings/alertString';
import alertComponent from '../strings/alertComponent';

import BaseComponent from './base-component';

// ALERT PRIVATE GC
// ================
const alertSelector = `.${alertString}`;
const alertDismissSelector = `[${dataBsDismiss}="${alertString}"]`;

/**
 * Static method which returns an existing `Alert` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Alert>}
 */
const getAlertInstance = (element) => getInstance(element, alertComponent);

/**
* An `Alert` initialization callback.
* @type {BSN.InitCallback<Alert>}
*/
const alertInitCallback = (element) => new Alert(element);

// ALERT CUSTOM EVENTS
// ===================
const closeAlertEvent = OriginalEvent(`close.bs.${alertString}`);
const closedAlertEvent = OriginalEvent(`closed.bs.${alertString}`);

// ALERT EVENT HANDLER
// ===================
/**
 * Alert `transitionend` callback.
 * @param {Alert} self target Alert instance
 */
function alertTransitionEnd(self) {
  const { element } = self;
  toggleAlertHandler(self);

  dispatchEvent(element, closedAlertEvent);

  self.dispose();
  element.remove();
}

// ALERT PRIVATE METHOD
// ====================
/**
 * Toggle on / off the `click` event listener.
 * @param {Alert} self the target alert instance
 * @param {boolean=} add when `true`, event listener is added
 */
function toggleAlertHandler(self, add) {
  const action = add ? addListener : removeListener;
  const { dismiss } = self;
  /* istanbul ignore else */
  if (dismiss) action(dismiss, mouseclickEvent, self.close);
}

// ALERT DEFINITION
// ================
/** Creates a new Alert instance. */
export default class Alert extends BaseComponent {
  /** @param {HTMLElement | string} target element or selector */
  constructor(target) {
    super(target);
    // bind
    const self = this;

    // initialization element
    const { element } = self;

    // the dismiss button
    /** @static @type {HTMLElement?} */
    self.dismiss = querySelector(alertDismissSelector, element);

    // add event listener
    toggleAlertHandler(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return alertComponent; }
  /* eslint-enable */

  // ALERT PUBLIC METHODS
  // ====================
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   *
   * @param {Event=} e most likely the `click` event
   * @this {Alert} the `Alert` instance or `EventTarget`
   */
  close(e) {
    const self = e ? getAlertInstance(closest(this, alertSelector)) : this;
    const { element } = self;

    /* istanbul ignore else */
    if (element && hasClass(element, showClass)) {
      dispatchEvent(element, closeAlertEvent);
      if (closeAlertEvent.defaultPrevented) return;

      removeClass(element, showClass);

      if (hasClass(element, fadeClass)) {
        emulateTransitionEnd(element, () => alertTransitionEnd(self));
      } else alertTransitionEnd(self);
    }
  }

  /** Remove the component from target element. */
  dispose() {
    toggleAlertHandler(this);
    super.dispose();
  }
}

ObjectAssign(Alert, {
  selector: alertSelector,
  init: alertInitCallback,
  getInstance: getAlertInstance,
});
