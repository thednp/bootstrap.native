/* Native JavaScript for Bootstrap 5 | OffCanvas
------------------------------------------------ */
import ariaHidden from '@thednp/shorty/src/strings/ariaHidden';
import ariaModal from '@thednp/shorty/src/strings/ariaModal';
import mouseclickEvent from '@thednp/shorty/src/strings/mouseclickEvent';
import keydownEvent from '@thednp/shorty/src/strings/keydownEvent';
import keyEscape from '@thednp/shorty/src/strings/keyEscape';
import setAttribute from '@thednp/shorty/src/attr/setAttribute';
import removeAttribute from '@thednp/shorty/src/attr/removeAttribute';
import querySelector from '@thednp/shorty/src/selectors/querySelector';
import querySelectorAll from '@thednp/shorty/src/selectors/querySelectorAll';
import closest from '@thednp/shorty/src/selectors/closest';
import hasClass from '@thednp/shorty/src/class/hasClass';
import addClass from '@thednp/shorty/src/class/addClass';
import removeClass from '@thednp/shorty/src/class/removeClass';
import getDocument from '@thednp/shorty/src/get/getDocument';
import getDocumentElement from '@thednp/shorty/src/get/getDocumentElement';
import getDocumentBody from '@thednp/shorty/src/get/getDocumentBody';
import getElementTransitionDuration from '@thednp/shorty/src/get/getElementTransitionDuration';
import dispatchEvent from '@thednp/shorty/src/misc/dispatchEvent';
import emulateTransitionEnd from '@thednp/shorty/src/misc/emulateTransitionEnd';
import ObjectAssign from '@thednp/shorty/src/misc/ObjectAssign';
import { getInstance } from '@thednp/shorty/src/misc/data';
import focus from '@thednp/shorty/src/misc/focus';
import OriginalEvent from '@thednp/shorty/src/misc/OriginalEvent';
import setElementStyle from '@thednp/shorty/src/misc/setElementStyle';

import { addListener, removeListener } from '@thednp/event-listener/src/event-listener';

import dataBsDismiss from '../strings/dataBsDismiss';
import dataBsToggle from '../strings/dataBsToggle';
import showClass from '../strings/showClass';
import offcanvasString from '../strings/offcanvasString';
import offcanvasComponent from '../strings/offcanvasComponent';

import getTargetElement from '../util/getTargetElement';
import getElementContainer from '../util/getElementContainer';
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
const showOffcanvasEvent = OriginalEvent(`show.bs.${offcanvasString}`);
const shownOffcanvasEvent = OriginalEvent(`shown.bs.${offcanvasString}`);
const hideOffcanvasEvent = OriginalEvent(`hide.bs.${offcanvasString}`);
const hiddenOffcanvasEvent = OriginalEvent(`hidden.bs.${offcanvasString}`);

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
  const action = add ? addListener : removeListener;
  self.triggers.forEach((btn) => action(btn, mouseclickEvent, offcanvasTriggerHandler));
}

/**
 * Toggles on/off the listeners of the events that close the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 * @param {boolean=} add when *true* listeners are added
 */
function toggleOffCanvasDismiss(self, add) {
  const action = add ? addListener : removeListener;
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

  /* istanbul ignore else */
  if (!options.scroll) {
    setOffCanvasScrollbar(self);
    setElementStyle(getDocumentBody(element), { overflow: 'hidden' });
  }

  addClass(element, offcanvasTogglingClass);
  addClass(element, showClass);
  setElementStyle(element, { visibility: 'visible' });

  emulateTransitionEnd(element, () => showOffcanvasComplete(self));
}

/**
 * Executes before hiding the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 * @param {Function=} callback the hide callback
 */
function beforeOffcanvasHide(self, callback) {
  const { element, options } = self;
  const currentOpen = getCurrentOpen(element);

  element.blur();

  if (!currentOpen && options.backdrop && hasClass(overlay, showClass)) {
    hideOverlay();
    emulateTransitionEnd(overlay, () => hideOffcanvasComplete(self, callback));
  } else hideOffcanvasComplete(self, callback);
}

// OFFCANVAS EVENT HANDLERS
// ========================
/**
 * Handles the `click` event listeners.
 *
 * @this {HTMLElement}
 * @param {MouseEvent} e the `Event` object
 */
function offcanvasTriggerHandler(e) {
  const trigger = closest(this, offcanvasToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getOffcanvasInstance(element);

  /* istanbul ignore else */
  if (self) {
    self.relatedTarget = trigger;
    self.toggle();
    /* istanbul ignore else */
    if (trigger && trigger.tagName === 'A') {
      e.preventDefault();
    }
  }
}

/**
 * Handles the event listeners that close the offcanvas.
 *
 * @param {MouseEvent} e the `Event` object
 */
function offcanvasDismissHandler(e) {
  const { target } = e;
  const element = querySelector(offcanvasActiveSelector, getDocument(target));
  const offCanvasDismiss = querySelector(offcanvasDismissSelector, element);
  const self = getOffcanvasInstance(element);

  /* istanbul ignore next: must have a filter */
  if (!self) return;

  const { options, triggers } = self;
  const trigger = closest(target, offcanvasToggleSelector);
  const selection = getDocument(element).getSelection();

  /* istanbul ignore else */
  if (!(selection && selection.toString().length)
    && ((!element.contains(target) && options.backdrop
    && /* istanbul ignore next */(!trigger || (trigger && !triggers.includes(trigger))))
    || (offCanvasDismiss && offCanvasDismiss.contains(target)))) {
    self.relatedTarget = offCanvasDismiss && offCanvasDismiss.contains(target)
      ? offCanvasDismiss : null;
    self.hide();
  }
  /* istanbul ignore next */
  if (trigger && trigger.tagName === 'A') e.preventDefault();
}

/**
 * Handles the `keydown` event listener for offcanvas
 * to hide it when user type the `ESC` key.
 *
 * @param {KeyboardEvent} e the `Event` object
 */
function offcanvasKeyDismissHandler({ code, target }) {
  const element = querySelector(offcanvasActiveSelector, getDocument(target));

  const self = getOffcanvasInstance(element);

  /* istanbul ignore next: must filter */
  if (!self) return;

  /* istanbul ignore else */
  if (self.options.keyboard && code === keyEscape) {
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
  const { element } = self;
  removeClass(element, offcanvasTogglingClass);

  removeAttribute(element, ariaHidden);
  setAttribute(element, ariaModal, 'true');
  setAttribute(element, 'role', 'dialog');

  dispatchEvent(element, shownOffcanvasEvent);

  toggleOffCanvasDismiss(self, true);
  focus(element);
}

/**
 * Handles the `transitionend` when hiding the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 * @param {Function} callback the hide callback
 */
function hideOffcanvasComplete(self, callback) {
  const { element, triggers } = self;

  setAttribute(element, ariaHidden, 'true');
  removeAttribute(element, ariaModal);
  removeAttribute(element, 'role');
  setElementStyle(element, { visibility: '' });

  const visibleTrigger = showOffcanvasEvent.relatedTarget || triggers.find((x) => isVisible(x));
  /* istanbul ignore else */
  if (visibleTrigger) focus(visibleTrigger);

  removeOverlay(element);

  dispatchEvent(element, hiddenOffcanvasEvent);
  removeClass(element, offcanvasTogglingClass);

  // must check for open instances
  if (!getCurrentOpen(element)) {
    toggleOffCanvasDismiss(self);
  }
  // callback
  if (callback) callback();
}

// OFFCANVAS DEFINITION
// ====================
/** Returns a new `Offcanvas` instance. */
export default class Offcanvas extends BaseComponent {
  /**
   * @param {HTMLElement | string} target usually an `.offcanvas` element
   * @param {BSN.Options.Offcanvas=} config instance options
   */
  constructor(target, config) {
    super(target, config);
    const self = this;

    // instance element
    const { element } = self;

    // all the triggering buttons
    /** @type {HTMLElement[]} */
    self.triggers = [...querySelectorAll(offcanvasToggleSelector, getDocument(element))]
      .filter((btn) => getTargetElement(btn) === element);

    // additional instance property
    /** @type {HTMLBodyElement | HTMLElement} */
    self.container = getElementContainer(element);
    /** @type {HTMLElement?} */
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
      const that1 = this1
        || /* istanbul ignore next */getInstance(currentOpen, 'Modal');
      that1.hide();
    }

    if (options.backdrop) {
      if (!container.contains(overlay)) {
        appendOverlay(container, true);
      } else {
        toggleOverlayType();
      }

      overlayDelay = getElementTransitionDuration(overlay);
      showOverlay();

      setTimeout(() => beforeOffcanvasShow(self), overlayDelay);
    } else {
      beforeOffcanvasShow(self);
      /* istanbul ignore else */
      if (currentOpen && hasClass(overlay, showClass)) {
        hideOverlay();
      }
    }
  }

  /**
   * Hides the offcanvas from the user.
   * @param {Function=} callback when `true` it will skip animation
   */
  hide(callback) {
    const self = this;
    const { element, relatedTarget } = self;

    if (!hasClass(element, showClass)) return;

    hideOffcanvasEvent.relatedTarget = relatedTarget;
    hiddenOffcanvasEvent.relatedTarget = relatedTarget;
    dispatchEvent(element, hideOffcanvasEvent);
    if (hideOffcanvasEvent.defaultPrevented) return;

    addClass(element, offcanvasTogglingClass);
    removeClass(element, showClass);

    if (!callback) {
      emulateTransitionEnd(element, () => beforeOffcanvasHide(self, callback));
    } else beforeOffcanvasHide(self, callback);
  }

  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const self = this;
    toggleOffcanvasEvents(self);
    self.hide(() => super.dispose());
  }
}

ObjectAssign(Offcanvas, {
  selector: offcanvasSelector,
  init: offcanvasInitCallback,
  getInstance: getOffcanvasInstance,
});
