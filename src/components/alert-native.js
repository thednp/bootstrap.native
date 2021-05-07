/* Native JavaScript for Bootstrap 5 | Alert
-------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';

import fadeClass from '../strings/fadeClass.js';
import showClass from '../strings/showClass.js';
import dataBsDismiss from '../strings/dataBsDismiss.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import BaseComponent from './base-component.js';

// ALERT PRIVATE GC
// ================
const alertString = 'alert';
const alertComponent = 'Alert';
const alertSelector = `.${alertString}`;
const alertDismissSelector = `[${dataBsDismiss}="${alertString}"]`;

// ALERT CUSTOM EVENTS
// ===================
const closeAlertEvent = bootstrapCustomEvent(`close.bs.${alertString}`);
const closedAlertEvent = bootstrapCustomEvent(`closed.bs.${alertString}`);

// ALERT EVENT HANDLERS
// ====================
function alertTransitionEnd(self) {
  const { element, relatedTarget } = self;
  toggleAlertHandler(self);

  if (relatedTarget) closedAlertEvent.relatedTarget = relatedTarget;
  element.dispatchEvent(closedAlertEvent);

  self.dispose();
  element.parentNode.removeChild(element);
}

// ALERT PRIVATE METHOD
// ====================
function toggleAlertHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  if (self.dismiss) self.dismiss[action]('click', self.close);
}

// ALERT DEFINITION
// ================
export default class Alert extends BaseComponent {
  constructor(target) {
    super(alertComponent, target);
    // bind
    const self = this;

    // initialization element
    const { element } = self;

    // the dismiss button
    self.dismiss = queryElement(alertDismissSelector, element);
    self.relatedTarget = null;

    // add event listener
    toggleAlertHandler(self, 1);
  }

  // ALERT PUBLIC METHODS
  // ====================
  close(e) {
    const target = e ? e.target : null;
    const self = e
      ? e.target.closest(alertSelector)[alertComponent]
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

  dispose() {
    toggleAlertHandler(this);
    super.dispose(alertComponent);
  }
}

Alert.init = {
  component: alertComponent,
  selector: alertSelector,
  constructor: Alert,
};
