/* Native JavaScript for Bootstrap 5 | Button
---------------------------------------------*/
import {
  getInstance,
  removeClass,
  hasClass,
  addClass,
  setAttribute,
  mouseclickEvent,
  ariaPressed,
} from '@thednp/shorty';

import { addListener, removeListener } from '@thednp/event-listener';

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
 */
const getButtonInstance = (element: HTMLElement) => getInstance<Button>(element, buttonComponent);

/** A `Button` initialization callback. */
const buttonInitCallback = (element: HTMLElement) => new Button(element);

// BUTTON PRIVATE METHOD
// =====================
/**
 * Toggles on/off the `click` event listener.
 *
 * @param self the `Button` instance
 * @param add when `true`, event listener is added
 */
const toggleButtonHandler = (self: Button, add?: boolean) => {
  const action = add ? addListener : removeListener;
  action(self.element, mouseclickEvent, self.toggle);
};

// BUTTON DEFINITION
// =================
/** Creates a new `Button` instance. */
export default class Button extends BaseComponent {
  static selector = buttonSelector;
  static init = buttonInitCallback;
  static getInstance = getButtonInstance;

  isActive = false;

  /**
   * @param target usually a `.btn` element
   */
  constructor(target: HTMLElement | string) {
    super(target);

    // initialization element
    const { element } = this;

    // set initial state
    this.isActive = hasClass(element, activeClass);
    setAttribute(element, ariaPressed, String(!!this.isActive));

    // add event listener
    toggleButtonHandler(this, true);
  }

  /**
   * Returns component name string.
   */
  get name() {
    return buttonComponent;
  }

  // BUTTON PUBLIC METHODS
  // =====================
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle = (e: Event) => {
    if (e) e.preventDefault();

    const { element, isActive } = this;
    if (hasClass(element, 'disabled')) return;

    const action = isActive ? removeClass : addClass;
    action(element, activeClass);
    setAttribute(element, ariaPressed, isActive ? 'false' : 'true');
    this.isActive = hasClass(element, activeClass);
  };

  /** Removes the `Button` component from the target element. */
  dispose() {
    toggleButtonHandler(this);
    super.dispose();
  }
}
