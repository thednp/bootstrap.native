/* Native JavaScript for Bootstrap 5 | Collapse
----------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import queryElement from 'shorter-js/src/misc/queryElement';
import reflow from 'shorter-js/src/misc/reflow';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import addEventListener from 'shorter-js/src/strings/addEventListener';
import removeEventListener from 'shorter-js/src/strings/removeEventListener';
import ariaExpanded from 'shorter-js/src/strings/ariaExpanded';
import { getInstance } from 'shorter-js/src/misc/data';

import dataBsToggle from '../strings/dataBsToggle';
import collapsingClass from '../strings/collapsingClass';
import showClass from '../strings/showClass';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import getTargetElement from '../util/getTargetElement';
import BaseComponent from './base-component';

// COLLAPSE GC
// ===========
const collapseString = 'collapse';
const collapseComponent = 'Collapse';
const collapseSelector = `.${collapseString}`;
const collapseToggleSelector = `[${dataBsToggle}="${collapseString}"]`;
const collapseDefaults = { parent: null };

/**
 * Static method which returns an existing `Collapse` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Collapse>}
 */
const getCollapseInstance = (element) => getInstance(element, collapseComponent);

/**
 * A `Collapse` initialization callback.
 * @type {BSN.InitCallback<Collapse>}
 */
const collapseInitCallback = (element) => new Collapse(element);

// COLLAPSE CUSTOM EVENTS
// ======================
const showCollapseEvent = bootstrapCustomEvent(`show.bs.${collapseString}`);
const shownCollapseEvent = bootstrapCustomEvent(`shown.bs.${collapseString}`);
const hideCollapseEvent = bootstrapCustomEvent(`hide.bs.${collapseString}`);
const hiddenCollapseEvent = bootstrapCustomEvent(`hidden.bs.${collapseString}`);

// COLLAPSE PRIVATE METHODS
// ========================
/**
 * Expand the designated `Element`.
 * @param {Collapse} self the `Collapse` instance
 */
function expandCollapse(self) {
  const {
    // @ts-ignore
    element, parent, triggers,
  } = self;

  element.dispatchEvent(showCollapseEvent);
  if (showCollapseEvent.defaultPrevented) return;

  // @ts-ignore
  self.isAnimating = true;
  // @ts-ignore
  if (parent) parent.isAnimating = true;

  addClass(element, collapsingClass);
  removeClass(element, collapseString);

  // @ts-ignore
  element.style.height = `${element.scrollHeight}px`;

  emulateTransitionEnd(element, () => {
    // @ts-ignore
    self.isAnimating = false;
    // @ts-ignore
    if (parent) parent.isAnimating = false;

    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'true'));

    removeClass(element, collapsingClass);
    addClass(element, collapseString);
    addClass(element, showClass);

    // @ts-ignore
    element.style.height = '';

    element.dispatchEvent(shownCollapseEvent);
  });
}

/**
 * Collapse the designated `Element`.
 * @param {Collapse} self the `Collapse` instance
 */
function collapseContent(self) {
  const {
    // @ts-ignore
    element, parent, triggers,
  } = self;

  element.dispatchEvent(hideCollapseEvent);

  if (hideCollapseEvent.defaultPrevented) return;

  // @ts-ignore
  self.isAnimating = true;
  // @ts-ignore
  if (parent) parent.isAnimating = true;

  // @ts-ignore
  element.style.height = `${element.scrollHeight}px`;

  removeClass(element, collapseString);
  removeClass(element, showClass);
  addClass(element, collapsingClass);

  reflow(element);
  // @ts-ignore
  element.style.height = '0px';

  emulateTransitionEnd(element, () => {
    // @ts-ignore
    self.isAnimating = false;
    // @ts-ignore
    if (parent) parent.isAnimating = false;

    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'false'));

    removeClass(element, collapsingClass);
    addClass(element, collapseString);

    // @ts-ignore
    element.style.height = '';

    element.dispatchEvent(hiddenCollapseEvent);
  });
}

/**
 * Toggles on/off the event listener(s) of the `Collapse` instance.
 * @param {Collapse} self the `Collapse` instance
 * @param {boolean=} add when `true`, the event listener is added
 */
function toggleCollapseHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  // @ts-ignore
  const { triggers } = self;

  if (triggers.length) {
    // @ts-ignore
    triggers.forEach((btn) => btn[action]('click', collapseClickHandler));
  }
}

// COLLAPSE EVENT HANDLER
// ======================
/**
 * Handles the `click` event for the `Collapse` instance.
 * @param {Event} e the `Event` object
 */
function collapseClickHandler(e) {
  const { target } = e;
  // @ts-ignore
  const trigger = target.closest(collapseToggleSelector);
  const element = getTargetElement(trigger);
  const self = element && getCollapseInstance(element);
  if (self) self.toggle();

  // event target is anchor link #398
  if (trigger && trigger.tagName === 'A') e.preventDefault();
}

// COLLAPSE DEFINITION
// ===================

/** Returns a new `Colapse` instance. */
export default class Collapse extends BaseComponent {
  /**
   * @param {Element | string} target and `Element` that matches the selector
   * @param {BSN.Options.Collapse=} config instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // initialization element
    const { element, options } = self;

    // set triggering elements
    /** @private @type {Element[]} */
    self.triggers = Array.from(document.querySelectorAll(collapseToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // set parent accordion
    /** @private @type {Element?} */
    self.parent = queryElement(options.parent);
    const { parent } = self;

    // set initial state
    /** @private @type {boolean} */
    self.isAnimating = false;
    // @ts-ignore
    if (parent) parent.isAnimating = false;

    // add event listeners
    toggleCollapseHandler(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return collapseComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return collapseDefaults; }
  /* eslint-enable */

  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Toggles the visibility of the collapse. */
  toggle() {
    const self = this;
    if (!hasClass(self.element, showClass)) self.show();
    else self.hide();
  }

  /** Hides the collapse. */
  hide() {
    const self = this;
    const { triggers, isAnimating } = self;
    if (isAnimating) return;

    collapseContent(self);
    if (triggers.length) {
      triggers.forEach((btn) => addClass(btn, `${collapseString}d`));
    }
  }

  /** Shows the collapse. */
  show() {
    const self = this;
    const {
      element, parent, triggers, isAnimating,
    } = self;
    let activeCollapse;
    let activeCollapseInstance;

    if (parent) {
      activeCollapse = Array.from(parent.querySelectorAll(`.${collapseString}.${showClass}`))
        .find((i) => getCollapseInstance(i));
      activeCollapseInstance = activeCollapse && getCollapseInstance(activeCollapse);
    }

    // @ts-ignore
    if ((!parent || (parent && !parent.isAnimating)) && !isAnimating) {
      if (activeCollapseInstance && activeCollapse !== element) {
        collapseContent(activeCollapseInstance);
        activeCollapseInstance.triggers.forEach((btn) => {
          addClass(btn, `${collapseString}d`);
        });
      }

      expandCollapse(self);
      if (triggers.length) {
        triggers.forEach((btn) => removeClass(btn, `${collapseString}d`));
      }
    }
  }

  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    const self = this;
    const { parent } = self;
    toggleCollapseHandler(self);

    // @ts-ignore
    if (parent) delete parent.isAnimating;
    super.dispose();
  }
}

Object.assign(Collapse, {
  selector: collapseSelector,
  init: collapseInitCallback,
  getInstance: getCollapseInstance,
});
