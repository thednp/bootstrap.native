/* Native JavaScript for Bootstrap 5 | Button
---------------------------------------------*/
import ariaPressed from '@thednp/shorty/src/strings/ariaPressed';
import mouseclickEvent from '@thednp/shorty/src/strings/mouseclickEvent';
import setAttribute from '@thednp/shorty/src/attr/setAttribute';
import ObjectAssign from '@thednp/shorty/src/misc/ObjectAssign';
import addClass from '@thednp/shorty/src/class/addClass';
import hasClass from '@thednp/shorty/src/class/hasClass';
import removeClass from '@thednp/shorty/src/class/removeClass';
import { getInstance } from '@thednp/shorty/src/misc/data';

import { addListener, removeListener } from '@thednp/event-listener/src/event-listener';

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
   * @param {HTMLElement | string} target usually a `.btn` element
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
    const self = e ? getButtonInstance(this) : this;
    if (!self.element) return;
    const { element, isActive } = self;

    if (hasClass(element, 'disabled')) return;

    const action = isActive ? removeClass : addClass;
    action(element, activeClass);
    setAttribute(element, ariaPressed, isActive ? 'false' : 'true');
    self.isActive = hasClass(element, activeClass);
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
