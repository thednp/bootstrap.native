/* Native JavaScript for Bootstrap 5 | Collapse
----------------------------------------------- */
import setAttribute from '@thednp/shorty/src/attr/setAttribute';
import getDocument from '@thednp/shorty/src/get/getDocument';
import closest from '@thednp/shorty/src/selectors/closest';
import querySelector from '@thednp/shorty/src/selectors/querySelector';
import querySelectorAll from '@thednp/shorty/src/selectors/querySelectorAll';
import addClass from '@thednp/shorty/src/class/addClass';
import hasClass from '@thednp/shorty/src/class/hasClass';
import removeClass from '@thednp/shorty/src/class/removeClass';
import mouseclickEvent from '@thednp/shorty/src/strings/mouseclickEvent';
import ariaExpanded from '@thednp/shorty/src/strings/ariaExpanded';
import emulateTransitionEnd from '@thednp/shorty/src/misc/emulateTransitionEnd';
import reflow from '@thednp/shorty/src/misc/reflow';
import ObjectAssign from '@thednp/shorty/src/misc/ObjectAssign';
import dispatchEvent from '@thednp/shorty/src/misc/dispatchEvent';
import setElementStyle from '@thednp/shorty/src/misc/setElementStyle';
import { getInstance } from '@thednp/shorty/src/misc/data';
import Timer from '@thednp/shorty/src/misc/timer';
import OriginalEvent from '@thednp/shorty/src/misc/OriginalEvent';

import { addListener, removeListener } from '@thednp/event-listener/src/event-listener';

import dataBsToggle from '../strings/dataBsToggle';
import collapsingClass from '../strings/collapsingClass';
import showClass from '../strings/showClass';
import collapseString from '../strings/collapseString';
import collapseComponent from '../strings/collapseComponent';

import getTargetElement from '../util/getTargetElement';
import BaseComponent from './base-component';

// COLLAPSE GC
// ===========
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
const showCollapseEvent = OriginalEvent(`show.bs.${collapseString}`);
const shownCollapseEvent = OriginalEvent(`shown.bs.${collapseString}`);
const hideCollapseEvent = OriginalEvent(`hide.bs.${collapseString}`);
const hiddenCollapseEvent = OriginalEvent(`hidden.bs.${collapseString}`);

// COLLAPSE PRIVATE METHODS
// ========================
/**
 * Expand the designated `Element`.
 * @param {Collapse} self the `Collapse` instance
 */
function expandCollapse(self) {
  const {
    element, parent, triggers,
  } = self;

  dispatchEvent(element, showCollapseEvent);
  if (showCollapseEvent.defaultPrevented) return;

  Timer.set(element, () => {}, 17);
  if (parent) Timer.set(parent, () => {}, 17);

  addClass(element, collapsingClass);
  removeClass(element, collapseString);

  setElementStyle(element, { height: `${element.scrollHeight}px` });

  emulateTransitionEnd(element, () => {
    Timer.clear(element);
    if (parent) Timer.clear(parent);

    triggers.forEach((btn) => setAttribute(btn, ariaExpanded, 'true'));

    removeClass(element, collapsingClass);
    addClass(element, collapseString);
    addClass(element, showClass);

    setElementStyle(element, { height: '' });

    dispatchEvent(element, shownCollapseEvent);
  });
}

/**
 * Collapse the designated `Element`.
 * @param {Collapse} self the `Collapse` instance
 */
function collapseContent(self) {
  const {
    element, parent, triggers,
  } = self;

  dispatchEvent(element, hideCollapseEvent);

  if (hideCollapseEvent.defaultPrevented) return;

  Timer.set(element, () => {}, 17);
  if (parent) Timer.set(parent, () => {}, 17);

  setElementStyle(element, { height: `${element.scrollHeight}px` });

  removeClass(element, collapseString);
  removeClass(element, showClass);
  addClass(element, collapsingClass);

  reflow(element);
  setElementStyle(element, { height: '0px' });

  emulateTransitionEnd(element, () => {
    Timer.clear(element);
    /* istanbul ignore else */
    if (parent) Timer.clear(parent);

    triggers.forEach((btn) => setAttribute(btn, ariaExpanded, 'false'));

    removeClass(element, collapsingClass);
    addClass(element, collapseString);

    setElementStyle(element, { height: '' });

    dispatchEvent(element, hiddenCollapseEvent);
  });
}

/**
 * Toggles on/off the event listener(s) of the `Collapse` instance.
 * @param {Collapse} self the `Collapse` instance
 * @param {boolean=} add when `true`, the event listener is added
 */
function toggleCollapseHandler(self, add) {
  const action = add ? addListener : removeListener;
  const { triggers } = self;

  /* istanbul ignore else */
  if (triggers.length) {
    triggers.forEach((btn) => action(btn, mouseclickEvent, collapseClickHandler));
  }
}

// COLLAPSE EVENT HANDLER
// ======================
/**
 * Handles the `click` event for the `Collapse` instance.
 * @param {MouseEvent} e the `Event` object
 */
function collapseClickHandler(e) {
  const { target } = e; // our target is `HTMLElement`
  const trigger = target && closest(target, collapseToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getCollapseInstance(element);
  /* istanbul ignore else */
  if (self) self.toggle();

  // event target is anchor link #398
  if (trigger && trigger.tagName === 'A') e.preventDefault();
}

// COLLAPSE DEFINITION
// ===================

/** Returns a new `Colapse` instance. */
export default class Collapse extends BaseComponent {
  /**
   * @param {HTMLElement | string} target and `Element` that matches the selector
   * @param {BSN.Options.Collapse=} config instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // initialization element
    const { element, options } = self;
    const doc = getDocument(element);

    // set triggering elements
    /** @type {HTMLElement[]} */
    self.triggers = [...querySelectorAll(collapseToggleSelector, doc)]
      .filter((btn) => getTargetElement(btn) === element);

    // set parent accordion
    /** @type {HTMLElement?} */
    self.parent = querySelector(options.parent, doc)
      || getTargetElement(element) || null;

    // add event listeners
    toggleCollapseHandler(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() { return collapseComponent; }
  /**
   * Returns component default options.
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
    const { triggers, element } = self;
    if (Timer.get(element)) return;

    collapseContent(self);
    /* istanbul ignore else */
    if (triggers.length) {
      triggers.forEach((btn) => addClass(btn, `${collapseString}d`));
    }
  }

  /** Shows the collapse. */
  show() {
    const self = this;
    const {
      element, parent, triggers,
    } = self;
    let activeCollapse;
    let activeCollapseInstance;

    if (parent) {
      activeCollapse = [...querySelectorAll(`.${collapseString}.${showClass}`, parent)]
        .find((i) => getCollapseInstance(i));
      activeCollapseInstance = activeCollapse && getCollapseInstance(activeCollapse);
    }

    if ((!parent || !Timer.get(parent)) && !Timer.get(element)) {
      if (activeCollapseInstance && activeCollapse !== element) {
        collapseContent(activeCollapseInstance);
        activeCollapseInstance.triggers.forEach((btn) => {
          addClass(btn, `${collapseString}d`);
        });
      }

      expandCollapse(self);
      /* istanbul ignore else */
      if (triggers.length) {
        triggers.forEach((btn) => removeClass(btn, `${collapseString}d`));
      }
    }
  }

  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    const self = this;
    toggleCollapseHandler(self);

    super.dispose();
  }
}

ObjectAssign(Collapse, {
  selector: collapseSelector,
  init: collapseInitCallback,
  getInstance: getCollapseInstance,
});
