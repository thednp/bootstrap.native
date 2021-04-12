/* Native JavaScript for Bootstrap 5 | Modal
-------------------------------------------- */
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import addClass from 'shorter-js/src/class/addClass.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import reflow from 'shorter-js/src/misc/reflow.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';

import ariaHidden from '../strings/ariaHidden.js';
import dataBsToggle from '../strings/dataBsToggle.js';
import dataBsDismiss from '../strings/dataBsDismiss.js';
import fadeClass from '../strings/fadeClass.js';
import showClass from '../strings/showClass.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js';
import getTargetElement from '../util/getTargetElement.js';
import { setScrollbar, resetScrollbar, measureScrollbar } from '../util/scrollbar.js';
import setFocus from '../util/setFocus.js';
import BaseComponent from './base-component.js';

// MODAL PRIVATE GC
// ================
const modalString = 'modal';
const modalComponent = 'Modal';
const modalSelector = `.${modalString}`;
const modalActiveSelector = `.${modalString}.${showClass}`;
const modalToggleSelector = `[${dataBsToggle}="${modalString}"]`;
const modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`;
const modalDefaultOptions = {
  backdrop: true, // boolean|string
  keyboard: true, // boolean
};
const modalOpenClass = `${modalString}-open`;
const modalBackdropClass = `${modalString}-backdrop`;
const modalStaticClass = `${modalString}-static`;
const ariaModal = `aria-${modalString}`;

// MODAL CUSTOM EVENTS
// ===================
const showModalEvent = bootstrapCustomEvent(`show.bs.${modalString}`);
const shownModalEvent = bootstrapCustomEvent(`shown.bs.${modalString}`);
const hideModalEvent = bootstrapCustomEvent(`hide.bs.${modalString}`);
const hiddenModalEvent = bootstrapCustomEvent(`hidden.bs.${modalString}`);

// MODAL PRIVATE METHODS
// =====================
function setModalScrollbar(self) {
  const { element } = self;
  const bd = document.body;
  const html = document.documentElement;
  const openModal = hasClass(bd, modalOpenClass);
  const bodyOverflow = html.clientHeight !== html.scrollHeight
                    || bd.clientHeight !== bd.scrollHeight;
  const modalOverflow = element.clientHeight !== element.scrollHeight;
  const scrollbarWidth = measureScrollbar();

  if (!modalOverflow && scrollbarWidth) {
    element.style.paddingRight = `${scrollbarWidth}px`;
  }

  setScrollbar(scrollbarWidth, (modalOverflow || bodyOverflow), openModal);
}

function createModalOverlay(self) {
  let overlay = queryElement(`.${modalBackdropClass}`);

  if (overlay === null) {
    const newOverlay = document.createElement('div');
    newOverlay.setAttribute('class', `${modalBackdropClass}${self.hasFade ? (` ${fadeClass}`) : ''}`);

    overlay = newOverlay;
    document.body.appendChild(overlay);
  }

  return overlay;
}

function removeModalOverlay(self) {
  let overlay = queryElement(`.${modalBackdropClass}`);
  const bd = document.body;
  const currentOpen = queryElement(modalActiveSelector);

  if (overlay && !currentOpen) {
    bd.removeChild(overlay);
    overlay = null;
  }

  self.isAnimating = false;

  if (overlay === null) {
    removeClass(bd, modalOpenClass);
    self.element.style.paddingRight = '';
    resetScrollbar();
  }
}

function toggleModalDismiss(self, add) {
  const action = add ? addEventListener : removeEventListener;
  window[action]('resize', self.update, passiveHandler);
  self.element[action]('click', modalDismissHandler);
  document[action]('keydown', modalKeyHandler);
}

function toggleModalHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;

  if (self.triggers && self.triggers.length) {
    self.triggers.forEach((btn) => btn[action]('click', modalClickHandler));
  }
}

function beforeShowModal(self) {
  const { element, hasFade } = self;
  element.style.display = 'block';

  setModalScrollbar(self);
  if (!queryElement(modalActiveSelector)) {
    addClass(document.body, modalOpenClass);
  }

  addClass(element, showClass);
  element.removeAttribute(ariaHidden);
  element.setAttribute(ariaModal, true);

  if (hasFade) emulateTransitionEnd(element, () => triggerModalShow(self));
  else triggerModalShow(self);
}

function triggerModalShow(self) {
  const { element, relatedTarget } = self;
  setFocus(element);
  self.isAnimating = false;

  toggleModalDismiss(self, 1);

  shownModalEvent.relatedTarget = relatedTarget;
  element.dispatchEvent(shownModalEvent);
}

function triggerModalHide(self, force) {
  const {
    relatedTarget, hasFade, element, triggers,
  } = self;
  const overlay = queryElement(`.${modalBackdropClass}`);

  element.style.display = '';
  if (triggers.length) setFocus(triggers[0]);

  // force can also be the transitionEvent object, we wanna make sure it's not
  // call is not forced and overlay is visible
  if (!force && overlay && hasFade && hasClass(overlay, showClass)
    && !queryElement(`.${modalString}.${showClass}`)) { // AND no modal is visible
    removeClass(overlay, showClass);
    emulateTransitionEnd(overlay, () => removeModalOverlay(self));
  } else {
    removeModalOverlay(self);
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

  self.toggle(trigger);
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

function modalDismissHandler(e) { // mouseup on dismiss button or outside the .modal-dialog
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
    self.relatedTarget = null;

    // attach event listeners
    toggleModalHandler(self, 1);

    // bind
    self.update = self.update.bind(self);
  }

  // MODAL PUBLIC METHODS
  // ====================
  toggle(target) {
    const self = this;
    if (hasClass(self.element, showClass)) self.hide();
    else self.show(target);
  }

  show(related) {
    const self = this;
    const { element, isAnimating, options } = self;
    if (hasClass(element, showClass) && !isAnimating) return;

    showModalEvent.relatedTarget = related;
    element.dispatchEvent(showModalEvent);
    if (showModalEvent.defaultPrevented) return;

    self.isAnimating = true;

    // we elegantly hide any opened modal
    const currentOpen = queryElement(modalActiveSelector);
    const overlay = options.backdrop ? createModalOverlay(self) : null;

    let overlayDelay = 0;

    if (currentOpen && currentOpen !== element) {
      if (currentOpen[modalComponent]) currentOpen[modalComponent].hide();
    }

    if (overlay // overlay exists
      && !currentOpen // no open modal found
      && !hasClass(overlay, showClass) // overlay not visible
    ) {
      reflow(overlay); // force reflow to enable trasition
      overlayDelay = getElementTransitionDuration(overlay);
      addClass(overlay, showClass);
    }

    if (!currentOpen) {
      setTimeout(() => beforeShowModal(self), overlay && overlayDelay ? overlayDelay : 0);
    } else beforeShowModal(self);
  }

  hide(force) {
    const self = this;
    const {
      element, isAnimating, hasFade, relatedTarget,
    } = self;
    if (!hasClass(element, showClass) && !isAnimating) return;

    hideModalEvent.relatedTarget = relatedTarget;
    element.dispatchEvent(hideModalEvent);
    if (hideModalEvent.defaultPrevented) return;

    self.isAnimating = true;
    removeClass(element, showClass);
    element.setAttribute(ariaHidden, true);
    element.removeAttribute(ariaModal);

    if (hasFade && force !== 1) {
      emulateTransitionEnd(element, () => { triggerModalHide(self); });
    } else {
      triggerModalHide(self, force);
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

export const modalInit = {
  component: modalComponent,
  selector: modalSelector,
  constructor: Modal,
};
