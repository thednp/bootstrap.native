/* Native JavaScript for Bootstrap 5 | Modal
-------------------------------------------- */
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import addClass from 'shorter-js/src/class/addClass.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';

import ariaHidden from '../strings/ariaHidden.js';
import dataBsToggle from '../strings/dataBsToggle.js';
import dataBsDismiss from '../strings/dataBsDismiss.js';
import fadeClass from '../strings/fadeClass.js';
import showClass from '../strings/showClass.js';
import ariaModal from '../strings/ariaModal.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import getTargetElement from '../util/getTargetElement.js';
import { setScrollbar, measureScrollbar } from '../util/scrollbar.js';
import {
  overlay,
  modalOpenClass,
  modalBackdropClass,
  modalActiveSelector,
  appendOverlay,
  showOverlay,
  hideOverlay,
  getCurrentOpen,
  removeOverlay,
} from '../util/backdrop.js';
import setFocus from '../util/setFocus.js';
import isVisible from '../util/isVisible.js';
import BaseComponent from './base-component.js';

// MODAL PRIVATE GC
// ================
const modalString = 'modal';
const modalComponent = 'Modal';
const modalSelector = `.${modalString}`;
// const modalActiveSelector = `.${modalString}.${showClass}`;
const modalToggleSelector = `[${dataBsToggle}="${modalString}"]`;
const modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`;
const modalStaticClass = `${modalString}-static`;
const modalDefaultOptions = {
  backdrop: true, // boolean|string
  keyboard: true, // boolean
};

// MODAL CUSTOM EVENTS
// ===================
const showModalEvent = bootstrapCustomEvent(`show.bs.${modalString}`);
const shownModalEvent = bootstrapCustomEvent(`shown.bs.${modalString}`);
const hideModalEvent = bootstrapCustomEvent(`hide.bs.${modalString}`);
const hiddenModalEvent = bootstrapCustomEvent(`hidden.bs.${modalString}`);

// MODAL PRIVATE METHODS
// =====================
function setModalScrollbar(self) {
  const { element, scrollbarWidth } = self;
  const bd = document.body;
  const html = document.documentElement;
  const openModal = hasClass(bd, modalOpenClass);
  const bodyOverflow = html.clientHeight !== html.scrollHeight
                    || bd.clientHeight !== bd.scrollHeight;
  const modalOverflow = element.clientHeight !== element.scrollHeight;

  if (!modalOverflow && scrollbarWidth) {
    element.style.paddingRight = `${scrollbarWidth}px`;
  }
  setScrollbar(scrollbarWidth, (modalOverflow || bodyOverflow), openModal);
}

function toggleModalDismiss(self, add) {
  const action = add ? addEventListener : removeEventListener;
  window[action]('resize', self.update, passiveHandler);
  self.element[action]('click', modalDismissHandler);
  document[action]('keydown', modalKeyHandler);
}

function toggleModalHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { triggers } = self;

  if (triggers.length) {
    triggers.forEach((btn) => btn[action]('click', modalClickHandler));
  }
}

function afterModalHide(self) {
  const { triggers } = self;
  removeOverlay();
  self.element.style.paddingRight = '';
  self.isAnimating = false;

  if (triggers.length) {
    const visibleTrigger = triggers.find((x) => isVisible(x));
    if (visibleTrigger) setFocus(visibleTrigger);
  }
}

function afterModalShow(self) {
  const { element, relatedTarget } = self;
  setFocus(element);
  self.isAnimating = false;

  toggleModalDismiss(self, 1);

  shownModalEvent.relatedTarget = relatedTarget;
  element.dispatchEvent(shownModalEvent);
}

function beforeModalShow(self) {
  const { element, hasFade } = self;
  element.style.display = 'block';

  setModalScrollbar(self);
  if (!queryElement(modalActiveSelector)) {
    addClass(document.body, modalOpenClass);
  }

  addClass(element, showClass);
  element.removeAttribute(ariaHidden);
  element.setAttribute(ariaModal, true);

  if (hasFade) emulateTransitionEnd(element, () => afterModalShow(self));
  else afterModalShow(self);
}

function beforeModalHide(self, force) {
  const {
    element, relatedTarget, hasFade,
  } = self;
  const currentOpen = getCurrentOpen();

  element.style.display = '';

  // force can also be the transitionEvent object, we wanna make sure it's not
  // call is not forced and overlay is visible
  if (!force && hasFade && hasClass(overlay, showClass)
    && !currentOpen) { // AND no modal is visible
    hideOverlay();
    emulateTransitionEnd(overlay, () => afterModalHide(self));
  } else {
    afterModalHide(self);
  }

  toggleModalDismiss(self);

  hiddenModalEvent.relatedTarget = relatedTarget;
  element.dispatchEvent(hiddenModalEvent);
}

// MODAL EVENT HANDLERS
// ====================
function modalClickHandler(e) {
  const { target } = e;
  const trigger = target.closest(modalToggleSelector);
  const element = getTargetElement(trigger);
  const self = element && element[modalComponent];

  if (trigger.tagName === 'A') e.preventDefault();

  if (self.isAnimating) return;

  self.relatedTarget = trigger;

  self.toggle();
}

function modalKeyHandler({ which }) {
  const element = queryElement(modalActiveSelector);
  const self = element[modalComponent];
  const { options, isAnimating } = self;
  if (!isAnimating // modal has no animations running
    && options.keyboard && which === 27 // the keyboard option is enabled and the key is 27
    && hasClass(element, showClass)) { // the modal is not visible
    self.relatedTarget = null;
    self.hide();
  }
}

function modalDismissHandler(e) {
  const element = this;
  const self = element[modalComponent];

  if (self.isAnimating) return;

  const { isStatic, modalDialog } = self;
  const { target } = e;
  const selectedText = document.getSelection().toString().length;
  const targetInsideDialog = modalDialog.contains(target);
  const dismiss = target.closest(modalDismissSelector);

  if (isStatic && !targetInsideDialog) {
    addClass(element, modalStaticClass);
    self.isAnimating = true;
    emulateTransitionEnd(modalDialog, () => staticTransitionEnd(self));
  } else if (dismiss || (!selectedText && !isStatic && !targetInsideDialog)) {
    self.relatedTarget = dismiss || null;
    self.hide();
    e.preventDefault();
  }
}

function staticTransitionEnd(self) {
  const duration = getElementTransitionDuration(self.modalDialog) + 17;
  removeClass(self.element, modalStaticClass);
  // user must wait for zoom out transition
  setTimeout(() => { self.isAnimating = false; }, duration);
}

// MODAL DEFINITION
// ================
export default class Modal extends BaseComponent {
  constructor(target, config) {
    super(modalComponent, target, modalDefaultOptions, config);

    // bind
    const self = this;

    // the modal
    const { element } = self;

    // the modal-dialog
    self.modalDialog = queryElement(`.${modalString}-dialog`, element);

    // modal can have multiple triggering elements
    self.triggers = Array.from(document.querySelectorAll(modalToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // additional internals
    self.isStatic = self.options.backdrop === 'static';
    self.hasFade = hasClass(element, fadeClass);
    self.isAnimating = false;
    self.scrollbarWidth = measureScrollbar();
    self.relatedTarget = null;

    // attach event listeners
    toggleModalHandler(self, 1);

    // bind
    self.update = self.update.bind(self);
  }

  // MODAL PUBLIC METHODS
  // ====================
  toggle() {
    const self = this;
    if (hasClass(self.element, showClass)) self.hide();
    else self.show();
  }

  show() {
    const self = this;
    const {
      element, isAnimating, hasFade, relatedTarget,
    } = self;
    let overlayDelay = 0;

    if (hasClass(element, showClass) && !isAnimating) return;

    showModalEvent.relatedTarget = relatedTarget || null;
    element.dispatchEvent(showModalEvent);
    if (showModalEvent.defaultPrevented) return;

    self.isAnimating = true;

    // we elegantly hide any opened modal/offcanvas
    const currentOpen = getCurrentOpen();
    if (currentOpen && currentOpen !== element) {
      const that = currentOpen[modalComponent]
        ? currentOpen[modalComponent]
        : currentOpen.Offcanvas;
      that.hide();
    }

    if (!queryElement(`.${modalBackdropClass}`)) {
      appendOverlay(hasFade);
    }
    overlayDelay = getElementTransitionDuration(overlay);

    if (!hasClass(overlay, showClass)) {
      showOverlay();
    }

    if (!currentOpen) {
      setTimeout(() => beforeModalShow(self), overlayDelay);
    } else beforeModalShow(self);
  }

  hide(force) {
    const self = this;
    const {
      element, isAnimating, hasFade, relatedTarget,
    } = self;
    if (!hasClass(element, showClass) && !isAnimating) return;

    hideModalEvent.relatedTarget = relatedTarget || null;
    element.dispatchEvent(hideModalEvent);
    if (hideModalEvent.defaultPrevented) return;

    self.isAnimating = true;
    removeClass(element, showClass);
    element.setAttribute(ariaHidden, true);
    element.removeAttribute(ariaModal);

    if (hasFade && force !== 1) {
      emulateTransitionEnd(element, () => beforeModalHide(self));
    } else {
      beforeModalHide(self, force);
    }
  }

  update() {
    const self = this;

    if (hasClass(self.element, showClass)) setModalScrollbar(self);
  }

  dispose() {
    const self = this;
    self.hide(1); // forced call

    toggleModalHandler(self);

    super.dispose(modalComponent);
  }
}

Modal.init = {
  component: modalComponent,
  selector: modalSelector,
  constructor: Modal,
};
