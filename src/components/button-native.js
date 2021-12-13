/* Native JavaScript for Bootstrap 5 | Button
---------------------------------------------*/
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import addEventListener from 'shorter-js/src/strings/addEventListener';
import removeEventListener from 'shorter-js/src/strings/removeEventListener';
import ariaPressed from 'shorter-js/src/strings/ariaPressed';
import { getInstance } from 'shorter-js/src/misc/data';

import activeClass from '../strings/activeClass';
import dataBsToggle from '../strings/dataBsToggle';
import BaseComponent from './base-component';

// BUTTON PRIVATE GC
// =================
const buttonString = 'button';
const buttonComponent = 'Button';
const buttonSelector = `[${dataBsToggle}="${buttonString}"]`;

/**
 * Static method which returns an existing `Button` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Button>}
 */
const getButtonInstance = (element) => getInstance(element, buttonComponent);

/**
 * A `Button` initialization callback.
 * @type {BSN.InitCallback<Button>}
 */
const buttonInitCallback = (element) => new Button(element);

// BUTTON PRIVATE METHOD
// =====================
function toggleButtonHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.element[action]('click', self.toggle);
}

// BUTTON DEFINITION
// =================
/** Creates a new `Button` instance. */
export default class Button extends BaseComponent {
  /**
   * @param {Element | string} target usually a `.btn` element
   */
  constructor(target) {
    super(target);
    const self = this;

    // initialization element
    const { element } = self;

    // set initial state
    /** @private @type {boolean} */
    self.isActive = hasClass(element, activeClass);
    element.setAttribute(ariaPressed, !!self.isActive);

    // add event listener
    toggleButtonHandler(self, 1);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return buttonComponent; }
  /* eslint-enable */

  // BUTTON PUBLIC METHODS
  // =====================
  /**
   * Toggles the state of the target button.
   * @param {Event} e usually `click` Event object
   */
  toggle(e) {
    if (e) e.preventDefault();
    const self = e ? getButtonInstance(this) : this;
    const { element } = self;

    if (hasClass(element, 'disabled')) return;

    self.isActive = hasClass(element, activeClass);
    const { isActive } = self;

    const action = isActive ? removeClass : addClass;
    const ariaValue = isActive ? 'false' : 'true';

    action(element, activeClass);
    element.setAttribute(ariaPressed, ariaValue);
  }

  /** Removes the `Button` component from the target element. */
  dispose() {
    toggleButtonHandler(this);
    super.dispose(buttonComponent);
  }
}

Object.assign(Button, {
  selector: buttonSelector,
  init: buttonInitCallback,
  getInstance: getButtonInstance,
});
