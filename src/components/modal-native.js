/* Native JavaScript for Bootstrap 5 | Modal
-------------------------------------------- */
import keyEscape from 'shorter-js/src/strings/keyEscape';
import ariaHidden from 'shorter-js/src/strings/ariaHidden';
import ariaModal from 'shorter-js/src/strings/ariaModal';
import resizeEvent from 'shorter-js/src/strings/resizeEvent';
import mouseclickEvent from 'shorter-js/src/strings/mouseclickEvent';
import keydownEvent from 'shorter-js/src/strings/keydownEvent';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import removeAttribute from 'shorter-js/src/attr/removeAttribute';
import getElementTransitionDuration from 'shorter-js/src/get/getElementTransitionDuration';
import getWindow from 'shorter-js/src/get/getWindow';
import getDocument from 'shorter-js/src/get/getDocument';
import getDocumentBody from 'shorter-js/src/get/getDocumentBody';
import getDocumentElement from 'shorter-js/src/get/getDocumentElement';
import querySelector from 'shorter-js/src/selectors/querySelector';
import querySelectorAll from 'shorter-js/src/selectors/querySelectorAll';
import closest from 'shorter-js/src/selectors/closest';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import isRTL from 'shorter-js/src/is/isRTL';
import { getInstance } from 'shorter-js/src/misc/data';
import Timer from 'shorter-js/src/misc/timer';
import focus from 'shorter-js/src/misc/focus';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import dispatchEvent from 'shorter-js/src/misc/dispatchEvent';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import OriginalEvent from 'shorter-js/src/misc/OriginalEvent';

import { addListener, removeListener } from 'event-listener.js';

import dataBsToggle from '../strings/dataBsToggle';
import dataBsDismiss from '../strings/dataBsDismiss';
import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import modalString from '../strings/modalString';
import modalComponent from '../strings/modalComponent';

import getElementContainer from '../util/getElementContainer';
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
import isVisible from '../util/isVisible';
import BaseComponent from './base-component';

// MODAL PRIVATE GC
// ================
const modalSelector = `.${modalString}`;
const modalToggleSelector = `[${dataBsToggle}="${modalString}"]`;
const modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`;
const modalStaticClass = `${modalString}-static`;

const modalDefaults = {
  backdrop: true, // boolean|string
  keyboard: true, // boolean
};

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

// MODAL CUSTOM EVENTS
// ===================
const showModalEvent = OriginalEvent(`show.bs.${modalString}`);
const shownModalEvent = OriginalEvent(`shown.bs.${modalString}`);
const hideModalEvent = OriginalEvent(`hide.bs.${modalString}`);
const hiddenModalEvent = OriginalEvent(`hidden.bs.${modalString}`);

// MODAL PRIVATE METHODS
// =====================
/**
 * Applies special style for the `<body>` and fixed elements
 * when a modal instance is shown to the user.
 *
 * @param {Modal} self the `Modal` instance
 */
function setModalScrollbar(self) {
  const { element } = self;
  const scrollbarWidth = measureScrollbar(element);
  const { clientHeight, scrollHeight } = getDocumentElement(element);
  const { clientHeight: modalHeight, scrollHeight: modalScrollHeight } = element;
  const modalOverflow = modalHeight !== modalScrollHeight;

  if (!modalOverflow && scrollbarWidth) {
    const pad = isRTL(element) ? 'paddingLeft' : 'paddingRight';
    // @ts-ignore
    element.style[pad] = `${scrollbarWidth}px`;
  }
  setScrollbar(element, (modalOverflow || clientHeight !== scrollHeight));
}

/**
 * Toggles on/off the listeners of events that close the modal.
 *
 * @param {Modal} self the `Modal` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function toggleModalDismiss(self, add) {
  const action = add ? addListener : removeListener;
  const { element } = self;
  action(element, mouseclickEvent, modalDismissHandler);
  // @ts-ignore
  action(getWindow(element), resizeEvent, self.update, passiveHandler);
  action(getDocument(element), keydownEvent, modalKeyHandler);
}

/**
 * Toggles on/off the `click` event listener of the `Modal` instance.
 * @param {Modal} self the `Modal` instance
 * @param {boolean=} add when `true`, event listener is added
 */
function toggleModalHandler(self, add) {
  const action = add ? addListener : removeListener;
  const { triggers } = self;

  if (triggers.length) {
    triggers.forEach((btn) => action(btn, mouseclickEvent, modalClickHandler));
  }
}

/**
 * Executes after a modal is hidden to the user.
 * @param {Modal} self the `Modal` instance
 */
function afterModalHide(self) {
  const { triggers, element } = self;
  removeOverlay(element);
  // @ts-ignore
  element.style.paddingRight = '';

  if (triggers.length) {
    const visibleTrigger = triggers.find((x) => isVisible(x));
    if (visibleTrigger) focus(visibleTrigger);
  }
}

/**
 * Executes after a modal is shown to the user.
 * @param {Modal} self the `Modal` instance
 */
function afterModalShow(self) {
  const { element, relatedTarget } = self;
  focus(element);
  toggleModalDismiss(self, true);

  shownModalEvent.relatedTarget = relatedTarget;
  dispatchEvent(element, shownModalEvent);
}

/**
 * Executes before a modal is shown to the user.
 * @param {Modal} self the `Modal` instance
 */
function beforeModalShow(self) {
  const { element, hasFade } = self;
  // @ts-ignore
  element.style.display = 'block';

  setModalScrollbar(self);
  if (!getCurrentOpen(element)) {
    getDocumentBody(element).style.overflow = 'hidden';
  }

  addClass(element, showClass);
  removeAttribute(element, ariaHidden);
  setAttribute(element, ariaModal, 'true');

  if (hasFade) emulateTransitionEnd(element, () => afterModalShow(self));
  else afterModalShow(self);
}

/**
 * Executes before a modal is hidden to the user.
 * @param {Modal} self the `Modal` instance
 * @param {boolean=} force when `true` skip animation
 */
function beforeModalHide(self, force) {
  const {
    element, options, relatedTarget, hasFade,
  } = self;

  // @ts-ignore
  element.style.display = '';

  // force can also be the transitionEvent object, we wanna make sure it's not
  // call is not forced and overlay is visible
  if (options.backdrop && !force && hasFade && hasClass(overlay, showClass)
    && !getCurrentOpen(element)) { // AND no modal is visible
    hideOverlay();
    emulateTransitionEnd(overlay, () => afterModalHide(self));
  } else {
    afterModalHide(self);
  }

  toggleModalDismiss(self);

  hiddenModalEvent.relatedTarget = relatedTarget;
  dispatchEvent(element, hiddenModalEvent);
}

// MODAL EVENT HANDLERS
// ====================
/**
 * Handles the `click` event listener for modal.
 * @param {MouseEvent} e the `Event` object
 * @this {HTMLElement | Element}
 */
function modalClickHandler(e) {
  const { target } = e;

  const trigger = target && closest(this, modalToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getModalInstance(element);

  if (!self) return;

  if (trigger && trigger.tagName === 'A') e.preventDefault();
  self.relatedTarget = trigger;
  self.toggle();
}

/**
 * Handles the `keydown` event listener for modal
 * to hide the modal when user type the `ESC` key.
 *
 * @param {KeyboardEvent} e the `Event` object
 */
function modalKeyHandler({ code }) {
  const element = querySelector(modalActiveSelector);
  const self = element && getModalInstance(element);
  if (!self) return;
  const { options } = self;
  if (options.keyboard && code === keyEscape // the keyboard option is enabled and the key is 27
    && hasClass(element, showClass)) { // the modal is not visible
    self.relatedTarget = null;
    self.hide();
  }
}

/**
 * Handles the `click` event listeners that hide the modal.
 *
 * @this {HTMLElement | Element}
 * @param {MouseEvent} e the `Event` object
 */
function modalDismissHandler(e) {
  const element = this;
  const self = getModalInstance(element);

  // this timer is needed
  if (!self || Timer.get(element)) return;

  const { options, isStatic, modalDialog } = self;
  const { backdrop } = options;
  const { target } = e;

  // @ts-ignore
  const selectedText = getDocument(element).getSelection().toString().length;
  // @ts-ignore
  const targetInsideDialog = modalDialog.contains(target);
  // @ts-ignore
  const dismiss = target && closest(target, modalDismissSelector);

  if (isStatic && !targetInsideDialog) {
    Timer.set(element, () => {
      addClass(element, modalStaticClass);
      emulateTransitionEnd(modalDialog, () => staticTransitionEnd(self));
    }, 17);
  } else if (dismiss || (!selectedText && !isStatic && !targetInsideDialog && backdrop)) {
    self.relatedTarget = dismiss || null;
    self.hide();
    e.preventDefault();
  }
}

/**
 * Handles the `transitionend` event listeners for `Modal`.
 *
 * @param {Modal} self the `Modal` instance
 */
function staticTransitionEnd(self) {
  const { element, modalDialog } = self;
  const duration = getElementTransitionDuration(modalDialog) + 17;
  removeClass(element, modalStaticClass);
  // user must wait for zoom out transition
  Timer.set(element, () => Timer.clear(element), duration);
}

// MODAL DEFINITION
// ================
/** Returns a new `Modal` instance. */
export default class Modal extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target usually the `.modal` element
   * @param {BSN.Options.Modal=} config instance options
   */
  constructor(target, config) {
    super(target, config);

    // bind
    const self = this;

    // the modal
    const { element } = self;

    // the modal-dialog
    /** @type {(HTMLElement | Element)} */
    // @ts-ignore
    self.modalDialog = querySelector(`.${modalString}-dialog`, element);

    // modal can have multiple triggering elements
    /** @type {(HTMLElement | Element)[]} */
    self.triggers = [...querySelectorAll(modalToggleSelector)]
      .filter((btn) => getTargetElement(btn) === element);

    // additional internals
    /** @type {boolean} */
    self.isStatic = self.options.backdrop === 'static';
    /** @type {boolean} */
    self.hasFade = hasClass(element, fadeClass);
    /** @type {(HTMLElement | Element)?} */
    self.relatedTarget = null;
    /** @type {HTMLBodyElement | HTMLElement | Element} */
    // @ts-ignore
    self.container = getElementContainer(element);

    // attach event listeners
    toggleModalHandler(self, true);

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
      element, options, hasFade, relatedTarget, container,
    } = self;
    const { backdrop } = options;
    let overlayDelay = 0;

    if (hasClass(element, showClass)) return;

    showModalEvent.relatedTarget = relatedTarget || null;
    dispatchEvent(element, showModalEvent);
    if (showModalEvent.defaultPrevented) return;

    // we elegantly hide any opened modal/offcanvas
    const currentOpen = getCurrentOpen(element);
    if (currentOpen && currentOpen !== element) {
      const this1 = getModalInstance(currentOpen);
      const that1 = this1 || getInstance(currentOpen, 'Offcanvas');
      that1.hide();
    }

    if (backdrop) {
      if (!container.contains(overlay)) {
        appendOverlay(container, hasFade, true);
      } else {
        toggleOverlayType(true);
      }

      overlayDelay = getElementTransitionDuration(overlay);

      showOverlay();
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
   * @param {boolean=} force when `true` it will skip animation
   */
  hide(force) {
    const self = this;
    const {
      element, hasFade, relatedTarget,
    } = self;

    if (!hasClass(element, showClass)) return;

    hideModalEvent.relatedTarget = relatedTarget || null;
    dispatchEvent(element, hideModalEvent);
    if (hideModalEvent.defaultPrevented) return;
    removeClass(element, showClass);
    setAttribute(element, ariaHidden, 'true');
    removeAttribute(element, ariaModal);

    if (hasFade && force !== false) {
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
    self.hide(true); // forced call

    toggleModalHandler(self);

    super.dispose();
  }
}

ObjectAssign(Modal, {
  selector: modalSelector,
  init: modalInitCallback,
  getInstance: getModalInstance,
});
