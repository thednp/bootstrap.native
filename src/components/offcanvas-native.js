/* Native JavaScript for Bootstrap 5 | OffCanvas
------------------------------------------------ */
import setAttribute from 'shorter-js/src/attr/setAttribute';
import removeAttribute from 'shorter-js/src/attr/removeAttribute';
import querySelector from 'shorter-js/src/selectors/querySelector';
import querySelectorAll from 'shorter-js/src/selectors/querySelectorAll';
import on from 'shorter-js/src/event/on';
import off from 'shorter-js/src/event/off';
import hasClass from 'shorter-js/src/class/hasClass';
import addClass from 'shorter-js/src/class/addClass';
import removeClass from 'shorter-js/src/class/removeClass';
import dispatchEvent from 'shorter-js/src/misc/dispatchEvent';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import getDocument from 'shorter-js/src/get/getDocument';
import getDocumentElement from 'shorter-js/src/get/getDocumentElement';
import getDocumentBody from 'shorter-js/src/get/getDocumentBody';
import getElementTransitionDuration from 'shorter-js/src/get/getElementTransitionDuration';
import ariaHidden from 'shorter-js/src/strings/ariaHidden';
import ariaModal from 'shorter-js/src/strings/ariaModal';
import mouseclickEvent from 'shorter-js/src/strings/mouseclickEvent';
import keydownEvent from 'shorter-js/src/strings/keydownEvent';
import ariaExpanded from 'shorter-js/src/strings/ariaExpanded';
import keyEscape from 'shorter-js/src/strings/keyEscape';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import { getInstance } from 'shorter-js/src/misc/data';
import focus from 'shorter-js/src/misc/focus';
import closest from 'shorter-js/src/selectors/closest';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import getTargetElement from '../util/getTargetElement';
import getElementContainer from '../util/getElementContainer';
import dataBsDismiss from '../strings/dataBsDismiss';
import dataBsToggle from '../strings/dataBsToggle';
import showClass from '../strings/showClass';
import isVisible from '../util/isVisible';
import { setScrollbar } from '../util/scrollbar';
import {
  overlay,
  offcanvasActiveSelector,
  toggleOverlayType,
  appendOverlay,
  showOverlay,
  hideOverlay,
  getCurrentOpen,
  removeOverlay,
} from '../util/backdrop';
import BaseComponent from './base-component';

// OFFCANVAS PRIVATE GC
// ====================
const offcanvasString = 'offcanvas';
const offcanvasComponent = 'Offcanvas';
const offcanvasSelector = `.${offcanvasString}`;
const offcanvasToggleSelector = `[${dataBsToggle}="${offcanvasString}"]`;
const offcanvasDismissSelector = `[${dataBsDismiss}="${offcanvasString}"]`;
const offcanvasTogglingClass = `${offcanvasString}-toggling`;

const offcanvasDefaults = {
  backdrop: true, // boolean
  keyboard: true, // boolean
  scroll: false, // boolean
};

/**
 * Static method which returns an existing `Offcanvas` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Offcanvas>}
 */
const getOffcanvasInstance = (element) => getInstance(element, offcanvasComponent);

/**
 * An `Offcanvas` initialization callback.
 * @type {BSN.InitCallback<Offcanvas>}
 */
const offcanvasInitCallback = (element) => new Offcanvas(element);

// OFFCANVAS CUSTOM EVENTS
// =======================
const showOffcanvasEvent = bootstrapCustomEvent(`show.bs.${offcanvasString}`);
const shownOffcanvasEvent = bootstrapCustomEvent(`shown.bs.${offcanvasString}`);
const hideOffcanvasEvent = bootstrapCustomEvent(`hide.bs.${offcanvasString}`);
const hiddenOffcanvasEvent = bootstrapCustomEvent(`hidden.bs.${offcanvasString}`);

// OFFCANVAS PRIVATE METHODS
// =========================
/**
 * Sets additional style for the `<body>` and other elements
 * when showing an offcanvas to the user.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 */
function setOffCanvasScrollbar(self) {
  const { element } = self;
  const { clientHeight, scrollHeight } = getDocumentElement(element);
  setScrollbar(element, clientHeight !== scrollHeight);
}

/**
 * Toggles on/off the `click` event listeners.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 * @param {boolean=} add when *true*, listeners are added
 */
function toggleOffcanvasEvents(self, add) {
  const action = add ? on : off;
  self.triggers.forEach((btn) => action(btn, mouseclickEvent, offcanvasTriggerHandler));
}

/**
 * Toggles on/off the listeners of the events that close the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 * @param {boolean=} add when *true* listeners are added
 */
function toggleOffCanvasDismiss(self, add) {
  const action = add ? on : off;
  const doc = getDocument(self.element);
  action(doc, keydownEvent, offcanvasKeyDismissHandler);
  action(doc, mouseclickEvent, offcanvasDismissHandler);
}

/**
 * Executes before showing the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 */
function beforeOffcanvasShow(self) {
  const { element, options } = self;

  if (!options.scroll) {
    setOffCanvasScrollbar(self);
    getDocumentBody(element).style.overflow = 'hidden';
  }

  addClass(element, offcanvasTogglingClass);
  addClass(element, showClass);
  // @ts-ignore
  element.style.visibility = 'visible';

  emulateTransitionEnd(element, () => showOffcanvasComplete(self));
}

/**
 * Executes before hiding the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 */
function beforeOffcanvasHide(self) {
  const { element, options } = self;
  const currentOpen = getCurrentOpen(element);

  // @ts-ignore
  element.blur();

  if (!currentOpen && options.backdrop && hasClass(overlay, showClass)) {
    hideOverlay();
    emulateTransitionEnd(overlay, () => hideOffcanvasComplete(self));
  } else hideOffcanvasComplete(self);
}

// OFFCANVAS EVENT HANDLERS
// ========================
/**
 * Handles the `click` event listeners.
 *
 * @this {HTMLElement | Element}
 * @param {MouseEvent} e the `Event` object
 */
function offcanvasTriggerHandler(e) {
  const trigger = closest(this, offcanvasToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getOffcanvasInstance(element);

  if (self) {
    self.relatedTarget = trigger;
    self.toggle();
    if (trigger && trigger.tagName === 'A') {
      e.preventDefault();
    }
  }
}

/**
 * Handles the event listeners that close the offcanvas.
 *
 * @this {Document}
 * @param {MouseEvent} e the `Event` object
 */
function offcanvasDismissHandler(e) {
  const element = querySelector(offcanvasActiveSelector, this);
  if (!element) return;

  const offCanvasDismiss = querySelector(offcanvasDismissSelector, element);
  const self = getOffcanvasInstance(element);

  if (!self) return;

  const { options, triggers } = self;
  const { target } = e;
  // @ts-ignore -- `EventTarget` is `HTMLElement`
  const trigger = closest(target, offcanvasToggleSelector);
  const selection = getDocument(element).getSelection();

  if (!(selection && selection.toString().length)
    // @ts-ignore
    && ((!element.contains(target) && options.backdrop
    && (!trigger || (trigger && !triggers.includes(trigger))))
    // @ts-ignore
    || (offCanvasDismiss && offCanvasDismiss.contains(target)))) {
    // @ts-ignore
    self.relatedTarget = offCanvasDismiss && offCanvasDismiss.contains(target)
      ? offCanvasDismiss : null;
    self.hide();
  }
  if (trigger && trigger.tagName === 'A') e.preventDefault();
}

/**
 * Handles the `keydown` event listener for offcanvas
 * to hide it when user type the `ESC` key.
 *
 * @param {KeyboardEvent} e the `Event` object
 * @this {Document}
 */
function offcanvasKeyDismissHandler({ code }) {
  const element = querySelector(offcanvasActiveSelector, this);
  if (!element) return;

  const self = getOffcanvasInstance(element);

  if (self && self.options.keyboard && code === keyEscape) {
    self.relatedTarget = null;
    self.hide();
  }
}

/**
 * Handles the `transitionend` when showing the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 */
function showOffcanvasComplete(self) {
  const { element, triggers } = self;
  removeClass(element, offcanvasTogglingClass);

  removeAttribute(element, ariaHidden);
  setAttribute(element, ariaModal, 'true');
  setAttribute(element, 'role', 'dialog');

  if (triggers.length) {
    triggers.forEach((btn) => setAttribute(btn, ariaExpanded, 'true'));
  }

  dispatchEvent(element, shownOffcanvasEvent);

  toggleOffCanvasDismiss(self, true);
  focus(element);
}

/**
 * Handles the `transitionend` when hiding the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 */
function hideOffcanvasComplete(self) {
  const { element, triggers } = self;

  setAttribute(element, ariaHidden, 'true');
  removeAttribute(element, ariaModal);
  removeAttribute(element, 'role');
  // @ts-ignore
  element.style.visibility = '';

  if (triggers.length) {
    triggers.forEach((btn) => setAttribute(btn, ariaExpanded, 'false'));
    const visibleTrigger = triggers.find((x) => isVisible(x));
    if (visibleTrigger) focus(visibleTrigger);
  }

  removeOverlay(element);

  dispatchEvent(element, hiddenOffcanvasEvent);
  removeClass(element, offcanvasTogglingClass);

  // must check for open instances
  if (!getCurrentOpen(element)) {
    toggleOffCanvasDismiss(self);
  }
}

// OFFCANVAS DEFINITION
// ====================
/** Returns a new `Offcanvas` instance. */
export default class Offcanvas extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target usually an `.offcanvas` element
   * @param {BSN.Options.Offcanvas=} config instance options
   */
  constructor(target, config) {
    super(target, config);
    const self = this;

    // instance element
    const { element } = self;

    // all the triggering buttons
    /** @type {(HTMLElement | Element)[]} */
    self.triggers = [...querySelectorAll(offcanvasToggleSelector)]
      .filter((btn) => getTargetElement(btn) === element);

    // additional instance property
    /** @type {HTMLBodyElement | HTMLElement | Element} */
    // @ts-ignore
    self.container = getElementContainer(element);
    /** @type {(HTMLElement | Element)?} */
    self.relatedTarget = null;

    // attach event listeners
    toggleOffcanvasEvents(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return offcanvasComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return offcanvasDefaults; }
  /* eslint-enable */

  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    const self = this;
    if (hasClass(self.element, showClass)) self.hide();
    else self.show();
  }

  /** Shows the offcanvas to the user. */
  show() {
    const self = this;
    const {
      element, options, container, relatedTarget,
    } = self;
    let overlayDelay = 0;

    if (hasClass(element, showClass)) return;

    showOffcanvasEvent.relatedTarget = relatedTarget;
    shownOffcanvasEvent.relatedTarget = relatedTarget;
    dispatchEvent(element, showOffcanvasEvent);
    if (showOffcanvasEvent.defaultPrevented) return;

    // we elegantly hide any opened modal/offcanvas
    const currentOpen = getCurrentOpen(element);
    if (currentOpen && currentOpen !== element) {
      const this1 = getOffcanvasInstance(currentOpen);
      const that1 = this1 || getInstance(currentOpen, 'Modal');
      that1.hide();
    }

    if (options.backdrop) {
      if (!currentOpen) {
        appendOverlay(container, true);
      } else {
        toggleOverlayType();
      }
      overlayDelay = getElementTransitionDuration(overlay);
      if (!hasClass(overlay, showClass)) showOverlay();

      setTimeout(() => beforeOffcanvasShow(self), overlayDelay);
    } else {
      beforeOffcanvasShow(self);
      if (currentOpen && hasClass(overlay, showClass)) {
        hideOverlay();
      }
    }
  }

  /**
   * Hides the offcanvas from the user.
   * @param {boolean=} force when `true` it will skip animation
   */
  hide(force) {
    const self = this;
    const { element, relatedTarget } = self;

    if (!hasClass(element, showClass)) return;

    hideOffcanvasEvent.relatedTarget = relatedTarget;
    hiddenOffcanvasEvent.relatedTarget = relatedTarget;
    dispatchEvent(element, hideOffcanvasEvent);
    if (hideOffcanvasEvent.defaultPrevented) return;

    addClass(element, offcanvasTogglingClass);
    removeClass(element, showClass);

    if (!force) {
      emulateTransitionEnd(element, () => beforeOffcanvasHide(self));
    } else beforeOffcanvasHide(self);
  }

  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const self = this;
    self.hide(true);
    toggleOffcanvasEvents(self);
    super.dispose();
  }
}

ObjectAssign(Offcanvas, {
  selector: offcanvasSelector,
  init: offcanvasInitCallback,
  getInstance: getOffcanvasInstance,
});
