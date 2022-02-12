/* Native JavaScript for Bootstrap 5 | Button
---------------------------------------------*/
import ariaPressed from 'shorter-js/src/strings/ariaPressed';
import mouseclickEvent from 'shorter-js/src/strings/mouseclickEvent';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import { getInstance } from 'shorter-js/src/misc/data';

import { addListener, removeListener } from 'event-listener.js';

import activeClass from '../strings/activeClass';
import dataBsToggle from '../strings/dataBsToggle';
import buttonString from '../strings/buttonString';
import buttonComponent from '../strings/buttonComponent';

import BaseComponent from './base-component';

// BUTTON PRIVATE GC
// =================
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
/**
 * Toggles on/off the `click` event listener.
 * @param {Button} self the `Button` instance
 * @param {boolean=} add when `true`, event listener is added
 */
function toggleButtonHandler(self, add) {
  const action = add ? addListener : removeListener;
  action(self.element, mouseclickEvent, self.toggle);
}

// BUTTON DEFINITION
// =================
/** Creates a new `Button` instance. */
export default class Button extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target usually a `.btn` element
   */
  constructor(target) {
    super(target);
    const self = this;

    // initialization element
    const { element } = self;

    // set initial state
    /** @type {boolean} */
    self.isActive = hasClass(element, activeClass);
    setAttribute(element, ariaPressed, `${!!self.isActive}`);

    // add event listener
    toggleButtonHandler(self, true);
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
   * @param {MouseEvent} e usually `click` Event object
   */
  toggle(e) {
    if (e) e.preventDefault();
    // @ts-ignore
    const self = e ? getButtonInstance(this) : this;
    if (!self) return;
    const { element } = self;

    if (hasClass(element, 'disabled')) return;
    self.isActive = hasClass(element, activeClass);
    const { isActive } = self;

    const action = isActive ? removeClass : addClass;

    action(element, activeClass);
    setAttribute(element, ariaPressed, isActive ? 'false' : 'true');
  }

  /** Removes the `Button` component from the target element. */
  dispose() {
    toggleButtonHandler(this);
    super.dispose();
  }
}

ObjectAssign(Button, {
  selector: buttonSelector,
  init: buttonInitCallback,
  getInstance: getButtonInstance,
});
