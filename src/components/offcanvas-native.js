/* Native JavaScript for Bootstrap 5 | OffCanvas
------------------------------------------------ */
import queryElement from 'shorter-js/src/misc/queryElement';
import addEventListener from 'shorter-js/src/strings/addEventListener';
import removeEventListener from 'shorter-js/src/strings/removeEventListener';
import hasClass from 'shorter-js/src/class/hasClass';
import addClass from 'shorter-js/src/class/addClass';
import removeClass from 'shorter-js/src/class/removeClass';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration';
import ariaHidden from 'shorter-js/src/strings/ariaHidden';
import ariaModal from 'shorter-js/src/strings/ariaModal';
import ariaExpanded from 'shorter-js/src/strings/ariaExpanded';
import { getInstance } from 'shorter-js/src/misc/data';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import getTargetElement from '../util/getTargetElement';
import dataBsDismiss from '../strings/dataBsDismiss';
import dataBsToggle from '../strings/dataBsToggle';
import showClass from '../strings/showClass';
import setFocus from '../util/setFocus';
import isVisible from '../util/isVisible';
import { setScrollbar, measureScrollbar } from '../util/scrollbar';
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
  const bd = document.body;
  const html = document.documentElement;
  const bodyOverflow = html.clientHeight !== html.scrollHeight
                    || bd.clientHeight !== bd.scrollHeight;
  // @ts-ignore
  setScrollbar(self.scrollbarWidth, bodyOverflow);
}

/**
 * Toggles on/off the `click` event listeners.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 * @param {boolean=} add when `true`, listeners are added
 */
function toggleOffcanvasEvents(self, add) {
  const action = add ? addEventListener : removeEventListener;
  // @ts-ignore
  self.triggers.forEach((btn) => btn[action]('click', offcanvasTriggerHandler));
}

/**
 * Toggles on/off the listeners of the events that close the offcanvas.
 *
 * @param {boolean=} add the `Offcanvas` instance
 */
function toggleOffCanvasDismiss(add) {
  const action = add ? addEventListener : removeEventListener;
  // @ts-ignore
  document[action]('keydown', offcanvasKeyDismissHandler);
  // @ts-ignore
  document[action]('click', offcanvasDismissHandler);
}

/**
 * Executes before showing the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 */
function beforeOffcanvasShow(self) {
  const { element, options } = self;

  if (!options.scroll) {
    document.body.style.overflow = 'hidden';
    setOffCanvasScrollbar(self);
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
  const currentOpen = getCurrentOpen();

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
 * @this {Element}
 * @param {Event} e the `Event` object
 */
function offcanvasTriggerHandler(e) {
  const trigger = this.closest(offcanvasToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getOffcanvasInstance(element);

  if (trigger && trigger.tagName === 'A') e.preventDefault();
  if (self) {
    self.toggle();
  }
}

/**
 * Handles the event listeners that close the offcanvas.
 *
 * @param {Event} e the `Event` object
 */
function offcanvasDismissHandler(e) {
  const element = queryElement(offcanvasActiveSelector);
  if (!element) return;

  const offCanvasDismiss = queryElement(offcanvasDismissSelector, element);
  const self = getOffcanvasInstance(element);
  if (!self) return;

  // @ts-ignore
  const { options, triggers } = self;
  const { target } = e;
  // @ts-ignore
  const trigger = target.closest(offcanvasToggleSelector);

  if (trigger && trigger.tagName === 'A') e.preventDefault();

  // @ts-ignore
  if ((!element.contains(target) && options.backdrop
    && (!trigger || (trigger && !triggers.includes(trigger))))
    // @ts-ignore
    || (offCanvasDismiss && offCanvasDismiss.contains(target))) {
    self.hide();
  }
}

/**
 * Handles the `keydown` event listener for offcanvas
 * to hide it when user type the `ESC` key.
 *
 * @param {{which: number}} e the `Event` object
 */
function offcanvasKeyDismissHandler({ which }) {
  const element = queryElement(offcanvasActiveSelector);
  if (!element) return;

  const self = getOffcanvasInstance(element);

  if (self && self.options.keyboard && which === 27) {
    self.hide();
  }
}

/**
 * Handles the `transitionend` when showing the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 */
function showOffcanvasComplete(self) {
  // @ts-ignore
  const { element, triggers } = self;
  removeClass(element, offcanvasTogglingClass);

  element.removeAttribute(ariaHidden);
  element.setAttribute(ariaModal, 'true');
  element.setAttribute('role', 'dialog');
  // @ts-ignore
  self.isAnimating = false;

  if (triggers.length) {
    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'true'));
  }

  element.dispatchEvent(shownOffcanvasEvent);

  toggleOffCanvasDismiss(true);
  setFocus(element);
}

/**
 * Handles the `transitionend` when hiding the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 */
function hideOffcanvasComplete(self) {
  const {
    // @ts-ignore
    element, triggers,
  } = self;

  element.setAttribute(ariaHidden, 'true');
  element.removeAttribute(ariaModal);
  element.removeAttribute('role');
  // @ts-ignore
  element.style.visibility = '';
  // @ts-ignore
  self.isAnimating = false;

  if (triggers.length) {
    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'false'));
    const visibleTrigger = triggers.find((x) => isVisible(x));
    if (visibleTrigger) setFocus(visibleTrigger);
  }

  removeOverlay();

  element.dispatchEvent(hiddenOffcanvasEvent);
  removeClass(element, offcanvasTogglingClass);

  toggleOffCanvasDismiss();
}

// OFFCANVAS DEFINITION
// ====================
/** Returns a new `Offcanvas` instance. */
export default class Offcanvas extends BaseComponent {
  /**
   * @param {Element | string} target usually an `.offcanvas` element
   * @param {BSN.Options.Offcanvas=} config instance options
   */
  constructor(target, config) {
    super(target, config);
    const self = this;

    // instance element
    const { element } = self;

    // all the triggering buttons
    /** @private @type {Element[]} */
    self.triggers = Array.from(document.querySelectorAll(offcanvasToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // additional instance property
    /** @private @type {boolean} */
    self.isAnimating = false;
    /** @private @type {number} */
    self.scrollbarWidth = measureScrollbar();

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
      element, options, isAnimating,
    } = self;
    let overlayDelay = 0;

    if (hasClass(element, showClass) || isAnimating) return;

    element.dispatchEvent(showOffcanvasEvent);

    if (showOffcanvasEvent.defaultPrevented) return;

    // we elegantly hide any opened modal/offcanvas
    const currentOpen = getCurrentOpen();
    if (currentOpen && currentOpen !== element) {
      const this1 = getOffcanvasInstance(currentOpen);
      const that1 = this1 || getInstance(currentOpen, 'Modal');
      that1.hide();
    }

    self.isAnimating = true;

    if (options.backdrop) {
      if (!currentOpen) {
        appendOverlay(true);
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
    const { element, isAnimating } = self;

    if (!hasClass(element, showClass) || isAnimating) return;

    element.dispatchEvent(hideOffcanvasEvent);
    if (hideOffcanvasEvent.defaultPrevented) return;

    self.isAnimating = true;
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

Object.assign(Offcanvas, {
  selector: offcanvasSelector,
  init: offcanvasInitCallback,
  getInstance: getOffcanvasInstance,
});
