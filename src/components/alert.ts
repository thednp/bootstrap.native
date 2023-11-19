/* Native JavaScript for Bootstrap 5 | Alert
-------------------------------------------- */
import {
  emulateTransitionEnd,
  mouseclickEvent,
  getInstance,
  querySelector,
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
const alertTransitionEnd = (self: Alert) => {
  const { element } = self;
  dispatchEvent(element, closedAlertEvent);

  self._toggleEventListeners();
  self.dispose();
  element.remove();
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
    this._toggleEventListeners(true);
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

      if (!closeAlertEvent.defaultPrevented) {
        removeClass(element, showClass);

        if (hasClass(element, fadeClass)) {
          emulateTransitionEnd(element, () => alertTransitionEnd(this));
        } else alertTransitionEnd(this);
      }
    }
  };
  /**
   * Toggle on / off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (add?: boolean) => {
    const action = add ? addListener : removeListener;
    const { dismiss, close } = this;
    /* istanbul ignore else */
    if (dismiss) action(dismiss, mouseclickEvent, close);
  };

  /** Remove the component from target element. */
  dispose() {
    this._toggleEventListeners();
    super.dispose();
  }
}
