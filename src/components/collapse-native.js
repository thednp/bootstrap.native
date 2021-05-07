/* Native JavaScript for Bootstrap 5 | Collapse
----------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import reflow from 'shorter-js/src/misc/reflow.js';
import addClass from 'shorter-js/src/class/addClass.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';

import ariaExpanded from '../strings/ariaExpanded.js';
import dataBsToggle from '../strings/dataBsToggle.js';
import collapsingClass from '../strings/collapsingClass.js';
import showClass from '../strings/showClass.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import getTargetElement from '../util/getTargetElement.js';
import BaseComponent from './base-component.js';

// COLLAPSE GC
// ===========
const collapseString = 'collapse';
const collapseComponent = 'Collapse';
const collapseSelector = `.${collapseString}`;
const collapseToggleSelector = `[${dataBsToggle}="${collapseString}"]`;

// COLLAPSE CUSTOM EVENTS
// ======================
const showCollapseEvent = bootstrapCustomEvent(`show.bs.${collapseString}`);
const shownCollapseEvent = bootstrapCustomEvent(`shown.bs.${collapseString}`);
const hideCollapseEvent = bootstrapCustomEvent(`hide.bs.${collapseString}`);
const hiddenCollapseEvent = bootstrapCustomEvent(`hidden.bs.${collapseString}`);

// COLLAPSE PRIVATE METHODS
// ========================
function expandCollapse(self) {
  const {
    element, parent, triggers,
  } = self;

  element.dispatchEvent(showCollapseEvent);
  if (showCollapseEvent.defaultPrevented) return;

  self.isAnimating = true;
  if (parent) parent.isAnimating = true;

  addClass(element, collapsingClass);
  removeClass(element, collapseString);

  element.style.height = `${element.scrollHeight}px`;

  emulateTransitionEnd(element, () => {
    self.isAnimating = false;
    if (parent) parent.isAnimating = false;

    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'true'));

    removeClass(element, collapsingClass);
    addClass(element, collapseString);
    addClass(element, showClass);

    element.style.height = '';

    element.dispatchEvent(shownCollapseEvent);
  });
}

function collapseContent(self) {
  const {
    element, parent, triggers,
  } = self;

  element.dispatchEvent(hideCollapseEvent);

  if (hideCollapseEvent.defaultPrevented) return;

  self.isAnimating = true;
  if (parent) parent.isAnimating = true;

  element.style.height = `${element.scrollHeight}px`;

  removeClass(element, collapseString);
  removeClass(element, showClass);
  addClass(element, collapsingClass);

  reflow(element);
  element.style.height = '0px';

  emulateTransitionEnd(element, () => {
    self.isAnimating = false;
    if (parent) parent.isAnimating = false;

    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'false'));

    removeClass(element, collapsingClass);
    addClass(element, collapseString);

    element.style.height = '';

    element.dispatchEvent(hiddenCollapseEvent);
  });
}

function toggleCollapseHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { triggers } = self;

  if (triggers.length) {
    triggers.forEach((btn) => btn[action]('click', collapseClickHandler));
  }
}

// COLLAPSE EVENT HANDLER
// ======================
function collapseClickHandler(e) {
  const { target } = e;
  const trigger = target.closest(collapseToggleSelector);
  const element = getTargetElement(trigger);
  const self = element && element[collapseComponent];
  if (self) self.toggle(target);

  // event target is anchor link #398
  if (trigger && trigger.tagName === 'A') e.preventDefault();
}

// COLLAPSE DEFINITION
// ===================
export default class Collapse extends BaseComponent {
  constructor(target, config) {
    super(collapseComponent, target, { parent: null }, config);
    // bind
    const self = this;

    // initialization element
    const { element } = self;

    // set triggering elements
    self.triggers = Array.from(document.querySelectorAll(collapseToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // set parent accordion
    self.parent = queryElement(self.options.parent);
    const { parent } = self;

    // set initial state
    self.isAnimating = false;
    if (parent) parent.isAnimating = false;

    // add event listeners
    toggleCollapseHandler(self, 1);
  }

  // COLLAPSE PUBLIC METHODS
  // =======================
  toggle(related) {
    const self = this;
    if (!hasClass(self.element, showClass)) self.show(related);
    else self.hide(related);
  }

  hide() {
    const self = this;
    const { triggers, isAnimating } = self;
    if (isAnimating) return;

    collapseContent(self);
    if (triggers.length) {
      triggers.forEach((btn) => addClass(btn, `${collapseString}d`));
    }
  }

  show() {
    const self = this;
    const {
      element, parent, triggers, isAnimating,
    } = self;
    let activeCollapse;
    let activeCollapseInstance;

    if (parent) {
      activeCollapse = Array.from(parent.querySelectorAll(`.${collapseString}.${showClass}`))
        .find((i) => i[collapseComponent]);
      activeCollapseInstance = activeCollapse && activeCollapse[collapseComponent];
    }

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

  dispose() {
    const self = this;
    const { parent } = self;
    toggleCollapseHandler(self);

    if (parent) delete parent.isAnimating;
    super.dispose(collapseComponent);
  }
}

Collapse.init = {
  component: collapseComponent,
  selector: collapseSelector,
  constructor: Collapse,
};
