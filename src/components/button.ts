/* Native JavaScript for Bootstrap 5 | Button
---------------------------------------------*/
import {
  addClass,
  ariaPressed,
  getInstance,
  hasClass,
  mouseclickEvent,
  PointerEvent,
  removeClass,
  setAttribute,
} from "@thednp/shorty";

import { addListener, removeListener } from "@thednp/event-listener";

import activeClass from "~/strings/activeClass";
import dataBsToggle from "~/strings/dataBsToggle";
import buttonString from "~/strings/buttonString";
import buttonComponent from "~/strings/buttonComponent";
import BaseComponent from "./base-component";
import isDisabled from "~/util/isDisabled";

// BUTTON PRIVATE GC
// =================
const buttonSelector = `[${dataBsToggle}="${buttonString}"]`;

/**
 * Static method which returns an existing `Button` instance associated
 * to a target `Element`.
 */
const getButtonInstance = (element: Element) =>
  getInstance<Button>(element, buttonComponent);

/** A `Button` initialization callback. */
const buttonInitCallback = (element: Element) => new Button(element);

// BUTTON DEFINITION
// =================
/** Creates a new `Button` instance. */
export default class Button extends BaseComponent {
  static selector = buttonSelector;
  static init = buttonInitCallback;
  static getInstance = getButtonInstance;

  declare isActive: boolean;
  declare element: HTMLElement;

  /**
   * @param target usually a `.btn` element
   */
  constructor(target: Element | string) {
    super(target);

    // initialization element
    const { element } = this;

    // set initial state
    this.isActive = hasClass(element, activeClass);
    setAttribute(element, ariaPressed, String(!!this.isActive));

    // add event listener
    this._toggleEventListeners(true);
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
  toggle = (e?: PointerEvent<HTMLElement>) => {
    if (e) e.preventDefault();

    const { element, isActive } = this;
    // istanbul ignore if @preserve
    if (isDisabled(element)) return;
    const action = isActive ? removeClass : addClass;
    action(element, activeClass);
    setAttribute(element, ariaPressed, isActive ? "false" : "true");
    this.isActive = hasClass(element, activeClass);
  };

  // BUTTON PRIVATE METHOD
  // =====================
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (add?: boolean) => {
    const action = add ? addListener : removeListener;
    action(this.element, mouseclickEvent, this.toggle);
  };

  /** Removes the `Button` component from the target element. */
  dispose() {
    this._toggleEventListeners();
    super.dispose();
  }
}
