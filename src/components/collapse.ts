/* Native JavaScript for Bootstrap 5 | Collapse
----------------------------------------------- */
import {
  addClass,
  ariaExpanded,
  closest,
  createCustomEvent,
  dispatchEvent,
  emulateTransitionEnd,
  getDocument,
  getInstance,
  hasClass,
  isHTMLElement,
  isString,
  mouseclickEvent,
  MouseEvent,
  noop,
  querySelector,
  querySelectorAll,
  reflow,
  removeClass,
  setAttribute,
  setElementStyle,
  Timer,
} from "@thednp/shorty";

import { addListener, removeListener } from "@thednp/event-listener";

import dataBsToggle from "~/strings/dataBsToggle";
import collapsingClass from "~/strings/collapsingClass";
import showClass from "~/strings/showClass";
import collapseString from "~/strings/collapseString";
import collapseComponent from "~/strings/collapseComponent";
import getTargetElement from "~/util/getTargetElement";
import BaseComponent from "./base-component";
import type { CollapseEvent, CollapseOptions } from "~/interface/collapse";
import isDisabled from "~/util/isDisabled";

// COLLAPSE GC
// ===========
const collapseSelector = `.${collapseString}`;
const collapseToggleSelector = `[${dataBsToggle}="${collapseString}"]`;
const collapseDefaults = { parent: null };

/**
 * Static method which returns an existing `Collapse` instance associated
 * to a target `Element`.
 */
const getCollapseInstance = (element: Element) =>
  getInstance<Collapse>(element, collapseComponent);

/**
 * A `Collapse` initialization callback.
 */
const collapseInitCallback = (element: Element) => new Collapse(element);

// COLLAPSE CUSTOM EVENTS
// ======================
const showCollapseEvent = createCustomEvent<
  Record<string, never>,
  CollapseEvent
>(`show.bs.${collapseString}`);
const shownCollapseEvent = createCustomEvent<
  Record<string, never>,
  CollapseEvent
>(`shown.bs.${collapseString}`);
const hideCollapseEvent = createCustomEvent<
  Record<string, never>,
  CollapseEvent
>(`hide.bs.${collapseString}`);
const hiddenCollapseEvent = createCustomEvent<
  Record<string, never>,
  CollapseEvent
>(`hidden.bs.${collapseString}`);

// COLLAPSE PRIVATE METHODS
// ========================
/**
 * Expand the designated `Element`.
 *
 * @param self the `Collapse` instance
 */
const expandCollapse = (self: Collapse) => {
  const { element, parent, triggers } = self;

  dispatchEvent(element, showCollapseEvent);
  if (!showCollapseEvent.defaultPrevented) {
    Timer.set(element, noop, 17);
    if (parent) Timer.set(parent, noop, 17);

    addClass(element, collapsingClass);
    removeClass(element, collapseString);

    setElementStyle(element, { height: `${element.scrollHeight}px` });

    emulateTransitionEnd(element, () => {
      Timer.clear(element);
      if (parent) Timer.clear(parent);

      triggers.forEach((btn) => setAttribute(btn, ariaExpanded, "true"));

      removeClass(element, collapsingClass);
      addClass(element, collapseString);
      addClass(element, showClass);

      setElementStyle(element, { height: "" });

      dispatchEvent(element, shownCollapseEvent);
    });
  }
};

/**
 * Collapse the designated `Element`.
 *
 * @param self the `Collapse` instance
 */
const collapseContent = (self: Collapse) => {
  const { element, parent, triggers } = self;

  dispatchEvent(element, hideCollapseEvent);

  if (!hideCollapseEvent.defaultPrevented) {
    Timer.set(element, noop, 17);
    if (parent) Timer.set(parent, noop, 17);

    setElementStyle(element, { height: `${element.scrollHeight}px` });

    removeClass(element, collapseString);
    removeClass(element, showClass);
    addClass(element, collapsingClass);

    reflow(element as HTMLElement);
    setElementStyle(element, { height: "0px" });

    emulateTransitionEnd(element, () => {
      Timer.clear(element);
      // istanbul ignore else @preserve
      if (parent) Timer.clear(parent);

      triggers.forEach((btn) => setAttribute(btn, ariaExpanded, "false"));

      removeClass(element, collapsingClass);
      addClass(element, collapseString);

      setElementStyle(element, { height: "" });

      dispatchEvent(element, hiddenCollapseEvent);
    });
  }
};

// COLLAPSE EVENT HANDLER
// ======================
/**
 * Handles the `click` event for the `Collapse` instance.
 *
 * @param e the `Event` object
 */
const collapseClickHandler = (e: MouseEvent<HTMLElement>) => {
  const { target } = e; // our target is `HTMLElement`
  const trigger = target &&
    closest(target, collapseToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getCollapseInstance(element);

  // istanbul ignore if @preserve
  if (!self) return;

  self.toggle();
  // event target is anchor link #398
  if (trigger?.tagName === "A") e.preventDefault();
};

// COLLAPSE DEFINITION
// ===================

/** Returns a new `Colapse` instance. */
export default class Collapse extends BaseComponent {
  static selector = collapseSelector;
  static init = collapseInitCallback;
  static getInstance = getCollapseInstance;
  declare element: HTMLElement;
  declare options: CollapseOptions;
  declare parent: Element | null;
  declare triggers: Element[];

  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(target: Element | string, config?: Partial<CollapseOptions>) {
    super(target, config);

    // initialization element
    const { element, options } = this;
    const doc = getDocument(element);

    // set triggering elements
    this.triggers = [...querySelectorAll(collapseToggleSelector, doc)].filter(
      (btn) => getTargetElement(btn) === element,
    );

    // set parent accordion
    this.parent = isHTMLElement(options.parent)
      ? options.parent
      : isString(options.parent)
      ? getTargetElement(element) || querySelector(options.parent, doc)
      : null;

    // add event listeners
    this._toggleEventListeners(true);
  }

  /**
   * Returns component name string.
   */
  get name() {
    return collapseComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return collapseDefaults;
  }

  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Hides the collapse. */
  hide() {
    const { triggers, element } = this;
    // istanbul ignore else @preserve
    if (!Timer.get(element)) {
      collapseContent(this);
      // istanbul ignore else @preserve
      if (triggers.length) {
        triggers.forEach((btn) => addClass(btn, `${collapseString}d`));
      }
    }
  }

  /** Shows the collapse. */
  show() {
    const { element, parent, triggers } = this;
    let activeCollapse;
    let activeCollapseInstance;

    if (parent) {
      activeCollapse = [
        ...querySelectorAll(`.${collapseString}.${showClass}`, parent),
      ].find((i) => getCollapseInstance(i));
      activeCollapseInstance = activeCollapse &&
        getCollapseInstance(activeCollapse);
    }

    if ((!parent || !Timer.get(parent)) && !Timer.get(element)) {
      if (activeCollapseInstance && activeCollapse !== element) {
        collapseContent(activeCollapseInstance);
        activeCollapseInstance.triggers.forEach((btn) => {
          addClass(btn, `${collapseString}d`);
        });
      }

      expandCollapse(this);
      // istanbul ignore else @preserve
      if (triggers.length) {
        triggers.forEach((btn) => removeClass(btn, `${collapseString}d`));
      }
    }
  }

  /** Toggles the visibility of the collapse. */
  toggle() {
    if (!hasClass(this.element, showClass)) this.show();
    else this.hide();
  }

  /**
   * Toggles on/off the event listener(s) of the `Collapse` instance.
   *
   * @param add when `true`, the event listener is added
   */
  _toggleEventListeners = (add?: boolean) => {
    const action = add ? addListener : removeListener;
    const { triggers } = this;

    // istanbul ignore else @preserve
    if (triggers.length) {
      triggers.forEach((btn) => {
        // istanbul ignore else @preserve
        if (!isDisabled(btn)) {
          action(btn, mouseclickEvent, collapseClickHandler);
        }
      });
    }
  };

  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    this._toggleEventListeners();

    super.dispose();
  }
}
