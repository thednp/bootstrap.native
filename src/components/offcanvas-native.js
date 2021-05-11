/* Native JavaScript for Bootstrap 5 | OffCanvas
------------------------------------------------ */
import queryElement from 'shorter-js/src/misc/queryElement.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import addClass from 'shorter-js/src/class/addClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import getTargetElement from '../util/getTargetElement.js';
import dataBsDismiss from '../strings/dataBsDismiss.js';
import dataBsToggle from '../strings/dataBsToggle.js';
import showClass from '../strings/showClass.js';
import ariaHidden from '../strings/ariaHidden.js';
import ariaModal from '../strings/ariaModal.js';
import ariaExpanded from '../strings/ariaExpanded.js';
import setFocus from '../util/setFocus.js';
import isVisible from '../util/isVisible.js';
import { resetScrollbar, setScrollbar, measureScrollbar } from '../util/scrollbar.js';
import {
  overlay,
  modalOpenClass,
  modalBackdropClass,
  offcanvasActiveSelector,
  appendOverlay,
  showOverlay,
  hideOverlay,
  getCurrentOpen,
  removeOverlay,
} from '../util/backdrop.js';
import BaseComponent from './base-component.js';

// OFFCANVAS PRIVATE GC
// ====================
const offcanvasString = 'offcanvas';
const offcanvasComponent = 'Offcanvas';
const OffcanvasSelector = `.${offcanvasString}`;
const offcanvasToggleSelector = `[${dataBsToggle}="${offcanvasString}"]`;
const offcanvasDismissSelector = `[${dataBsDismiss}="${offcanvasString}"]`;
const offcanvasTogglingClass = `${offcanvasString}-toggling`;
const offcanvasDefaultOptions = {
  backdrop: true, // boolean
  keyboard: true, // boolean
  scroll: false, // boolean
};

// OFFCANVAS CUSTOM EVENTS
// =======================
const showOffcanvasEvent = bootstrapCustomEvent(`show.bs.${offcanvasString}`);
const shownOffcanvasEvent = bootstrapCustomEvent(`shown.bs.${offcanvasString}`);
const hideOffcanvasEvent = bootstrapCustomEvent(`hide.bs.${offcanvasString}`);
const hiddenOffcanvasEvent = bootstrapCustomEvent(`hidden.bs.${offcanvasString}`);

// OFFCANVAS PRIVATE METHODS
// =========================
function setOffCanvasScrollbar(self) {
  const bd = document.body;
  const html = document.documentElement;
  const openOffCanvas = hasClass(bd, modalOpenClass);
  const bodyOverflow = html.clientHeight !== html.scrollHeight
                    || bd.clientHeight !== bd.scrollHeight;
  setScrollbar(self.scrollbarWidth, bodyOverflow, openOffCanvas);
}

function toggleOffcanvasEvents(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.triggers.forEach((btn) => btn[action]('click', offcanvasTriggerHandler));
}

function toggleOffCanvasDismiss(add) {
  const action = add ? addEventListener : removeEventListener;
  document[action]('keydown', offcanvasKeyDismissHandler);
  document[action]('click', offcanvasDismissHandler);
}

function beforeOffcanvasShow(self) {
  const { element, options } = self;

  if (!options.scroll) {
    addClass(document.body, modalOpenClass);
    setOffCanvasScrollbar(self);
  }

  addClass(element, offcanvasTogglingClass);
  addClass(element, showClass);
  element.style.visibility = 'visible';

  emulateTransitionEnd(element, () => showOffcanvasComplete(self));
}

function beforeOffcanvasHide(self) {
  const { element, options } = self;
  const currentOpen = getCurrentOpen();

  element.blur();

  if (!currentOpen && options.backdrop && hasClass(overlay, showClass)) {
    hideOverlay();
    emulateTransitionEnd(overlay, () => hideOffcanvasComplete(self));
  } else hideOffcanvasComplete(self);
}

// OFFCANVAS EVENT HANDLERS
// ========================
function offcanvasTriggerHandler(e) {
  const trigger = this.closest(offcanvasToggleSelector);
  const element = getTargetElement(trigger);
  const self = element && element[offcanvasComponent];

  if (trigger.tagName === 'A') e.preventDefault();
  if (self) {
    self.relatedTarget = trigger;
    self.toggle();
  }
}

function offcanvasDismissHandler(e) {
  const element = queryElement(offcanvasActiveSelector);
  if (!element) return;

  const offCanvasDismiss = queryElement(offcanvasDismissSelector, element);
  const self = element[offcanvasComponent];
  if (!self) return;

  const { options, open, triggers } = self;
  const { target } = e;
  const trigger = target.closest(offcanvasToggleSelector);

  if (trigger && trigger.tagName === 'A') e.preventDefault();

  if (open && ((!element.contains(target) && options.backdrop
    && (!trigger || (trigger && !triggers.includes(trigger))))
    || offCanvasDismiss.contains(target))) {
    self.relatedTarget = target === offCanvasDismiss ? offCanvasDismiss : null;
    self.hide();
  }
}

function offcanvasKeyDismissHandler({ which }) {
  const element = queryElement(offcanvasActiveSelector);
  if (!element) return;

  const self = element[offcanvasComponent];

  if (self && self.options.keyboard && which === 27) {
    self.relatedTarget = null;
    self.hide();
  }
}

function showOffcanvasComplete(self) {
  const { element, triggers, relatedTarget } = self;
  removeClass(element, offcanvasTogglingClass);

  element.removeAttribute(ariaHidden);
  element.setAttribute(ariaModal, true);
  element.setAttribute('role', 'dialog');
  self.isAnimating = false;

  if (triggers.length) {
    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, true));
  }

  shownOffcanvasEvent.relatedTarget = relatedTarget || null;
  element.dispatchEvent(shownOffcanvasEvent);

  toggleOffCanvasDismiss(1);
  setFocus(element);
}

function hideOffcanvasComplete(self) {
  const {
    element, options, relatedTarget, triggers,
  } = self;
  const currentOpen = getCurrentOpen();

  element.setAttribute(ariaHidden, true);
  element.removeAttribute(ariaModal);
  element.removeAttribute('role');
  element.style.visibility = '';
  self.open = false;
  self.isAnimating = false;

  if (triggers.length) {
    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, false));
    const visibleTrigger = triggers.find((x) => isVisible(x));
    if (visibleTrigger) setFocus(visibleTrigger);
  }

  // handle new offcanvas showing up
  if (!currentOpen) {
    if (options.backdrop) removeOverlay();
    if (!options.scroll) {
      resetScrollbar();
      removeClass(document.body, modalOpenClass);
    }
  }

  hiddenOffcanvasEvent.relatedTarget = relatedTarget || null;
  element.dispatchEvent(hiddenOffcanvasEvent);
  removeClass(element, offcanvasTogglingClass);

  toggleOffCanvasDismiss();
}

// OFFCANVAS DEFINITION
// ====================
export default class Offcanvas extends BaseComponent {
  constructor(target, config) {
    super(offcanvasComponent, target, offcanvasDefaultOptions, config);
    const self = this;

    // instance element
    const { element } = self;

    // all the triggering buttons
    self.triggers = Array.from(document.querySelectorAll(offcanvasToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // additional instance property
    self.open = false;
    self.isAnimating = false;
    self.scrollbarWidth = measureScrollbar();

    // attach event listeners
    toggleOffcanvasEvents(self, 1);
  }

  // OFFCANVAS PUBLIC METHODS
  // ========================
  toggle() {
    const self = this;
    return self.open ? self.hide() : self.show();
  }

  show() {
    const self = this[offcanvasComponent] ? this[offcanvasComponent] : this;
    const {
      element, options, isAnimating, relatedTarget,
    } = self;
    let overlayDelay = 0;

    if (self.open || isAnimating) return;

    showOffcanvasEvent.relatedTarget = relatedTarget || null;
    element.dispatchEvent(showOffcanvasEvent);

    if (showOffcanvasEvent.defaultPrevented) return;

    // we elegantly hide any opened modal/offcanvas
    const currentOpen = getCurrentOpen();
    if (currentOpen && currentOpen !== element) {
      const that = currentOpen[offcanvasComponent]
        ? currentOpen[offcanvasComponent]
        : currentOpen.Modal;
      that.hide();
    }

    self.open = true;
    self.isAnimating = true;

    if (options.backdrop) {
      if (!queryElement(`.${modalBackdropClass}`)) {
        appendOverlay(1);
      }

      overlayDelay = getElementTransitionDuration(overlay);

      if (!hasClass(overlay, showClass)) showOverlay();

      setTimeout(() => beforeOffcanvasShow(self), overlayDelay);
    } else beforeOffcanvasShow(self);
  }

  hide(force) {
    const self = this;
    const { element, isAnimating, relatedTarget } = self;

    if (!self.open || isAnimating) return;

    hideOffcanvasEvent.relatedTarget = relatedTarget || null;
    element.dispatchEvent(hideOffcanvasEvent);
    if (hideOffcanvasEvent.defaultPrevented) return;

    self.isAnimating = true;
    addClass(element, offcanvasTogglingClass);
    removeClass(element, showClass);

    if (!force) {
      emulateTransitionEnd(element, () => beforeOffcanvasHide(self));
    } else beforeOffcanvasHide(self, force);
  }

  dispose() {
    const self = this;
    self.hide(1);
    toggleOffcanvasEvents(self);
    super.dispose(offcanvasComponent);
  }
}

Offcanvas.init = {
  component: offcanvasComponent,
  selector: OffcanvasSelector,
  constructor: Offcanvas,
};
