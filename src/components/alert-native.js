/* Native JavaScript for Bootstrap 5 | Alert
-------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import queryElement from 'shorter-js/src/misc/queryElement';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import addEventListener from 'shorter-js/src/strings/addEventListener';
import removeEventListener from 'shorter-js/src/strings/removeEventListener';
import { getInstance } from 'shorter-js/src/misc/data';

import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import dataBsDismiss from '../strings/dataBsDismiss';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import BaseComponent from './base-component';

// ALERT PRIVATE GC
// ================
const alertString = 'alert';
const alertComponent = 'Alert';
const alertSelector = `.${alertString}`;
const alertDismissSelector = `[${dataBsDismiss}="${alertString}"]`;

/**
 * Static method which returns an existing `Alert` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Alert>}
 */
const getAlertInstance = (element) => getInstance(element, alertComponent);

// ALERT CUSTOM EVENTS
// ===================
/** @type {BSN.AlertEvent.close} */
const closeAlertEvent = bootstrapCustomEvent(`close.bs.${alertString}`);
/** @type {BSN.AlertEvent.closed} */
const closedAlertEvent = bootstrapCustomEvent(`closed.bs.${alertString}`);

// ALERT EVENT HANDLER
// ===================
/**
 * Alert `transitionend` callback.
 * @param {Alert} self target Alert instance
 */
function alertTransitionEnd(self) {
  const { element, relatedTarget } = self;
  toggleAlertHandler(self);

  if (relatedTarget) closedAlertEvent.relatedTarget = relatedTarget;
  element.dispatchEvent(closedAlertEvent);

  self.dispose();
  element.remove();
}

// ALERT PRIVATE METHOD
// ====================
/**
 * Toggle on / off the `click` event listener.
 * @param {Alert} self the target alert instance
 * @param {boolean | number} add
 */
function toggleAlertHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  if (self.dismiss) self.dismiss[action]('click', self.close);
}

// ALERT DEFINITION
// ================
/** Creates a new Alert instance. */
export default class Alert extends BaseComponent {
  /** @param {Element | string} target element or selector */
  constructor(target) {
    super(target);
    // bind
    const self = this;

    // initialization element
    const { element } = self;

    // the dismiss button
    /** @private */
    self.dismiss = queryElement(alertDismissSelector, element);
    /** @private */
    self.relatedTarget = null;

    // add event listener
    toggleAlertHandler(self, 1);
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
   * Private method that:
   * * Hides the `.alert` element from the user,
   * * Destroy the instance once animation is complete,
   * * Removes the element from the DOM.
   *
   * @param {Event} e most likely the `click` event
   * @returns {void}
   */
  close(e) {
    const target = e ? e.target : null;
    const self = e
      ? getAlertInstance(e.target.closest(alertSelector))
      : this;
    const { element } = self;

    if (self && element && hasClass(element, showClass)) {
      if (target) {
        closeAlertEvent.relatedTarget = target;
        self.relatedTarget = target;
      }
      element.dispatchEvent(closeAlertEvent);
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

Object.assign(Alert, {
  selector: alertSelector,
  /**
   * An `Alert` initialization callback.
   * @type {BSN.InitCallback<Alert>}
   */
  callback: (element) => new Alert(element),
  getInstance: getAlertInstance,
});
