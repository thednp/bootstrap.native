/* Native JavaScript for Bootstrap 5 | Modal
-------------------------------------------- */
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration';
import queryElement from 'shorter-js/src/misc/queryElement';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import addEventListener from 'shorter-js/src/strings/addEventListener';
import removeEventListener from 'shorter-js/src/strings/removeEventListener';
import ariaHidden from 'shorter-js/src/strings/ariaHidden';
import ariaModal from 'shorter-js/src/strings/ariaModal';
import { getInstance } from 'shorter-js/src/misc/data';

import dataBsToggle from '../strings/dataBsToggle';
import dataBsDismiss from '../strings/dataBsDismiss';
import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import getTargetElement from '../util/getTargetElement';
import { setScrollbar, measureScrollbar } from '../util/scrollbar';
import {
  overlay,
  modalActiveSelector,
  toggleOverlayType,
  appendOverlay,
  showOverlay,
  hideOverlay,
  getCurrentOpen,
  removeOverlay,
} from '../util/backdrop';
import setFocus from '../util/setFocus';
import isVisible from '../util/isVisible';
import BaseComponent from './base-component';

// MODAL PRIVATE GC
// ================
const modalString = 'modal';
const modalComponent = 'Modal';
const modalSelector = `.${modalString}`;
const modalToggleSelector = `[${dataBsToggle}="${modalString}"]`;
const modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`;
const modalStaticClass = `${modalString}-static`;
/**
 * Static method which returns an existing `Modal` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Modal>}
 */
const getModalInstance = (element) => getInstance(element, modalComponent);

/**
 * A `Modal` initialization callback.
 * @type {BSN.InitCallback<Modal>}
 */
const modalInitCallback = (element) => new Modal(element);

const modalDefaults = {
  backdrop: true, // boolean|string
  keyboard: true, // boolean
};

// MODAL CUSTOM EVENTS
// ===================
/** @type {BSN.ModalEvent.show} */
const showModalEvent = bootstrapCustomEvent(`show.bs.${modalString}`);
/** @type {BSN.ModalEvent.shown} */
const shownModalEvent = bootstrapCustomEvent(`shown.bs.${modalString}`);
/** @type {BSN.ModalEvent.hide} */
const hideModalEvent = bootstrapCustomEvent(`hide.bs.${modalString}`);
/** @type {BSN.ModalEvent.hidden} */
const hiddenModalEvent = bootstrapCustomEvent(`hidden.bs.${modalString}`);

// MODAL PRIVATE METHODS
// =====================
/**
 * Applies special style for the `<body>` and fixed elements
 * when a modal instance is shown to the user.
 *
 * @param {Modal} self the `Modal` instance
 */
function setModalScrollbar(self) {
  const { element, scrollbarWidth } = self;
  const bd = document.body;
  const html = document.documentElement;
  const bodyOverflow = html.clientHeight !== html.scrollHeight
                    || bd.clientHeight !== bd.scrollHeight;
  const modalOverflow = element.clientHeight !== element.scrollHeight;

  if (!modalOverflow && scrollbarWidth) {
    element.style.paddingRight = `${scrollbarWidth}px`;
  }
  setScrollbar(scrollbarWidth, (modalOverflow || bodyOverflow));
}

/**
 * Toggles on/off the listeners of events that close the modal.
 *
 * @param {Modal} self the `Modal` instance
 * @param {boolean | number} add when `true`, event listeners are added
 */
function toggleModalDismiss(self, add) {
  const action = add ? addEventListener : removeEventListener;
  window[action]('resize', self.update, passiveHandler);
  self.element[action]('click', modalDismissHandler);
  document[action]('keydown', modalKeyHandler);
}

/**
 * Toggles on/off the `click` event listener of the `Modal` instance.
 * @param {Modal} self the `Modal` instance
 * @param {boolean | number} add when `true`, event listener is added
 */
function toggleModalHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { triggers } = self;

  if (triggers.length) {
    triggers.forEach((btn) => btn[action]('click', modalClickHandler));
  }
}

/**
 * Executes after a modal is hidden to the user.
 * @param {Modal} self the `Modal` instance
 */
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

/**
 * Executes after a modal is shown to the user.
 * @param {Modal} self the `Modal` instance
 */
function afterModalShow(self) {
  const { element, relatedTarget } = self;
  setFocus(element);
  self.isAnimating = false;

  toggleModalDismiss(self, 1);

  shownModalEvent.relatedTarget = relatedTarget;
  element.dispatchEvent(shownModalEvent);
}

/**
 * Executes before a modal is shown to the user.
 * @param {Modal} self the `Modal` instance
 */
function beforeModalShow(self) {
  const { element, hasFade } = self;
  element.style.display = 'block';

  setModalScrollbar(self);
  if (!getCurrentOpen()) {
    document.body.style.overflow = 'hidden';
  }

  addClass(element, showClass);
  element.removeAttribute(ariaHidden);
  element.setAttribute(ariaModal, true);

  if (hasFade) emulateTransitionEnd(element, () => afterModalShow(self));
  else afterModalShow(self);
}

/**
 * Executes before a modal is hidden to the user.
 * @param {Modal} self the `Modal` instance
 */
function beforeModalHide(self, force) {
  const {
    element, options, relatedTarget, hasFade,
  } = self;

  element.style.display = '';

  // force can also be the transitionEvent object, we wanna make sure it's not
  // call is not forced and overlay is visible
  if (options.backdrop && !force && hasFade && hasClass(overlay, showClass)
    && !getCurrentOpen()) { // AND no modal is visible
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
/**
 * Handles the `click` event listener for modal.
 * @param {Event} e the `Event` object
 */
function modalClickHandler(e) {
  const { target } = e;
  const trigger = target.closest(modalToggleSelector);
  const element = getTargetElement(trigger);
  const self = element && getModalInstance(element, modalComponent);

  if (trigger.tagName === 'A') e.preventDefault();

  if (self.isAnimating) return;

  self.relatedTarget = trigger;

  self.toggle();
}

/**
 * Handles the `keydown` event listener for modal
 * to hide the modal when user type the `ESC` key.
 *
 * @param {Event} e the `Event` object
 */
function modalKeyHandler({ which }) {
  const element = queryElement(modalActiveSelector);
  const self = getModalInstance(element, modalComponent);
  const { options, isAnimating } = self;
  if (!isAnimating // modal has no animations running
    && options.keyboard && which === 27 // the keyboard option is enabled and the key is 27
    && hasClass(element, showClass)) { // the modal is not visible
    self.relatedTarget = null;
    self.hide();
  }
}

/**
 * Handles the `click` event listeners that hide the modal.
 *
 * @param {Event} e the `Event` object
 */
function modalDismissHandler(e) {
  const element = this;
  const self = getModalInstance(element, modalComponent);

  if (self.isAnimating) return;

  const { options, isStatic, modalDialog } = self;
  const { backdrop } = options;
  const { target } = e;
  const selectedText = document.getSelection().toString().length;
  const targetInsideDialog = modalDialog.contains(target);
  const dismiss = target.closest(modalDismissSelector);

  if (isStatic && !targetInsideDialog) {
    addClass(element, modalStaticClass);
    self.isAnimating = true;
    emulateTransitionEnd(modalDialog, () => staticTransitionEnd(self));
  } else if (dismiss || (!selectedText && !isStatic && !targetInsideDialog && backdrop)) {
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
/** Returns a new `Modal` instance. */
export default class Modal extends BaseComponent {
  /**
   * @param {Element | string} target usually the `.modal` element
   * @param {BSN.ModalOptions?} config instance options
   */
  constructor(target, config) {
    super(target, config);

    // bind
    const self = this;

    // the modal
    const { element } = self;

    // the modal-dialog
    /** @private @type {Element} */
    self.modalDialog = queryElement(`.${modalString}-dialog`, element);

    // modal can have multiple triggering elements
    /** @private @type {Element[]} */
    self.triggers = Array.from(document.querySelectorAll(modalToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // additional internals
    /** @private @type {boolean} */
    self.isStatic = self.options.backdrop === 'static';
    /** @private @type {boolean} */
    self.hasFade = hasClass(element, fadeClass);
    /** @private @type {boolean} */
    self.isAnimating = false;
    /** @private @type {number} */
    self.scrollbarWidth = measureScrollbar();
    /** @private @type {number} */
    self.relatedTarget = null;

    // attach event listeners
    toggleModalHandler(self, 1);

    // bind
    self.update = self.update.bind(self);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return modalComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return modalDefaults; }
  /* eslint-enable */

  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    const self = this;
    if (hasClass(self.element, showClass)) self.hide();
    else self.show();
  }

  /** Shows the modal to the user. */
  show() {
    const self = this;
    const {
      element, options, isAnimating, hasFade, relatedTarget,
    } = self;
    const { backdrop } = options;
    let overlayDelay = 0;

    if (hasClass(element, showClass) && !isAnimating) return;

    showModalEvent.relatedTarget = relatedTarget || null;
    element.dispatchEvent(showModalEvent);
    if (showModalEvent.defaultPrevented) return;

    // we elegantly hide any opened modal/offcanvas
    const currentOpen = getCurrentOpen();
    if (currentOpen && currentOpen !== element) {
      const this1 = getModalInstance(currentOpen);
      const that1 = this1 || getInstance(currentOpen, 'Offcanvas');
      that1.hide();
    }

    self.isAnimating = true;

    if (backdrop) {
      if (!currentOpen && !hasClass(overlay, showClass)) {
        appendOverlay(hasFade, 1);
      } else {
        toggleOverlayType(1);
      }
      overlayDelay = getElementTransitionDuration(overlay);

      if (!hasClass(overlay, showClass)) showOverlay();
      setTimeout(() => beforeModalShow(self), overlayDelay);
    } else {
      beforeModalShow(self);
      if (currentOpen && hasClass(overlay, showClass)) {
        hideOverlay();
      }
    }
  }

  /**
   * Hide the modal from the user.
   * @param {boolean | number} force when `true` it will skip animation
   */
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

  /** Updates the modal layout. */
  update() {
    const self = this;

    if (hasClass(self.element, showClass)) setModalScrollbar(self);
  }

  /** Removes the `Modal` component from target element. */
  dispose() {
    const self = this;
    self.hide(1); // forced call

    toggleModalHandler(self);

    super.dispose();
  }
}

Object.assign(Modal, {
  selector: modalSelector,
  init: modalInitCallback,
  getInstance: getModalInstance,
});
