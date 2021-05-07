/* Native JavaScript for Bootstrap 5 | Button
---------------------------------------------*/
import addClass from 'shorter-js/src/class/addClass.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';

import activeClass from '../strings/activeClass.js';
import dataBsToggle from '../strings/dataBsToggle.js';
import BaseComponent from './base-component.js';

// BUTTON PRIVATE GC
// =================
const buttonString = 'button';
const buttonComponent = 'Button';
const buttonSelector = `[${dataBsToggle}="${buttonString}"]`;
const ariaPressed = 'aria-pressed';

// BUTTON PRIVATE METHOD
// =====================
function toggleButtonHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.element[action]('click', self.toggle);
}

// BUTTON DEFINITION
// =================
export default class Button extends BaseComponent {
  constructor(target) {
    super(buttonComponent, target);
    const self = this;

    // initialization element
    const { element } = self;

    // set initial state
    self.isActive = hasClass(element, activeClass);
    element.setAttribute(ariaPressed, !!self.isActive);

    // add event listener
    toggleButtonHandler(self, 1);
  }

  // BUTTON PUBLIC METHODS
  // =====================
  toggle(e) {
    if (e) e.preventDefault();
    const self = e ? this[buttonComponent] : this;
    const { element } = self;

    if (hasClass(element, 'disabled')) return;

    self.isActive = hasClass(element, activeClass);
    const { isActive } = self;

    const action = isActive ? removeClass : addClass;
    const ariaValue = isActive ? 'false' : 'true';

    action(element, activeClass);
    element.setAttribute(ariaPressed, ariaValue);
  }

  dispose() {
    toggleButtonHandler(this);
    super.dispose(buttonComponent);
  }
}

Button.init = {
  component: buttonComponent,
  selector: buttonSelector,
  constructor: Button,
};
