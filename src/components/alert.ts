/* Native JavaScript for Bootstrap 5 | Alert
-------------------------------------------- */
import {
  emulateTransitionEnd,
  mouseclickEvent,
  getInstance,
  querySelector,
  // closest,
  // ObjectAssign,
  hasClass,
  removeClass,
  dispatchEvent,
  createCustomEvent,
} from '@thednp/shorty';

import { addListener, removeListener } from '@thednp/event-listener';

import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import dataBsDismiss from '../strings/dataBsDismiss';
import alertString from '../strings/alertString';
import alertComponent from '../strings/alertComponent';
import type { AlertEvent } from '../interface/alert';

import BaseComponent from './base-component';

// ALERT PRIVATE GC
// ================
const alertSelector = `.${alertString}`;
const alertDismissSelector = `[${dataBsDismiss}="${alertString}"]`;

/**
 * Static method which returns an existing `Alert` instance associated
 * to a target `Element`.
 *
 */
const getAlertInstance = (element: HTMLElement) => getInstance<Alert>(element, alertComponent);

/**
 * An `Alert` initialization callback.
 */
const alertInitCallback = <T>(element: HTMLElement) => new Alert(element) as T;

// ALERT CUSTOM EVENTS
// ===================
const closeAlertEvent = createCustomEvent<AlertEvent>(`close.bs.${alertString}`);
const closedAlertEvent = createCustomEvent<AlertEvent>(`closed.bs.${alertString}`);

// ALERT EVENT HANDLER
// ===================
/**
 * Alert `transitionend` callback.
 *
 * @param that target Alert instance
 */
const alertTransitionEnd = (that: Alert) => {
  const { element } = that;
  toggleAlertHandler(that);

  dispatchEvent(element, closedAlertEvent);

  that.dispose();
  element.remove();
};

// ALERT PRIVATE METHOD
// ====================
/**
 * Toggle on / off the `click` event listener.
 *
 * @param that the target alert instance
 * @param add when `true`, event listener is added
 */
const toggleAlertHandler = (that: Alert, add?: boolean) => {
  const action = add ? addListener : removeListener;
  const { dismiss, close } = that;
  /* istanbul ignore else */
  if (dismiss) action(dismiss, mouseclickEvent, close);
};

// ALERT DEFINITION
// ================
/** Creates a new Alert instance. */
export default class Alert extends BaseComponent {
  static selector = alertSelector;
  static init = alertInitCallback;
  static getInstance = getAlertInstance;
  dismiss: HTMLElement | null;

  constructor(target: HTMLElement | string) {
    super(target);

    // the dismiss button
    this.dismiss = querySelector(alertDismissSelector, this.element);

    // add event listener
    toggleAlertHandler(this, true);
  }

  /** Returns component name string. */
  get name() {
    return alertComponent;
  }

  // ALERT PUBLIC METHODS
  // ====================
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   */
  close = () => {
    const { element } = this;

    /* istanbul ignore else */
    if (element && hasClass(element, showClass)) {
      dispatchEvent(element, closeAlertEvent);
      if (closeAlertEvent.defaultPrevented) return;

      removeClass(element, showClass);

      if (hasClass(element, fadeClass)) {
        emulateTransitionEnd(element, () => alertTransitionEnd(this));
      } else alertTransitionEnd(this);
    }
  };

  /** Remove the component from target element. */
  dispose() {
    toggleAlertHandler(this);
    super.dispose();
  }
}
