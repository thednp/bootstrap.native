/* Native JavaScript for Bootstrap 5 | Modal
-------------------------------------------- */
import keyEscape from '@thednp/shorty/src/strings/keyEscape';
import ariaHidden from '@thednp/shorty/src/strings/ariaHidden';
import ariaModal from '@thednp/shorty/src/strings/ariaModal';
import resizeEvent from '@thednp/shorty/src/strings/resizeEvent';
import mouseclickEvent from '@thednp/shorty/src/strings/mouseclickEvent';
import keydownEvent from '@thednp/shorty/src/strings/keydownEvent';
import setAttribute from '@thednp/shorty/src/attr/setAttribute';
import removeAttribute from '@thednp/shorty/src/attr/removeAttribute';
import getElementTransitionDuration from '@thednp/shorty/src/get/getElementTransitionDuration';
import getWindow from '@thednp/shorty/src/get/getWindow';
import getDocument from '@thednp/shorty/src/get/getDocument';
import getDocumentBody from '@thednp/shorty/src/get/getDocumentBody';
import getDocumentElement from '@thednp/shorty/src/get/getDocumentElement';
import querySelector from '@thednp/shorty/src/selectors/querySelector';
import querySelectorAll from '@thednp/shorty/src/selectors/querySelectorAll';
import closest from '@thednp/shorty/src/selectors/closest';
import addClass from '@thednp/shorty/src/class/addClass';
import hasClass from '@thednp/shorty/src/class/hasClass';
import removeClass from '@thednp/shorty/src/class/removeClass';
import isRTL from '@thednp/shorty/src/is/isRTL';
import { getInstance } from '@thednp/shorty/src/misc/data';
import Timer from '@thednp/shorty/src/misc/timer';
import focus from '@thednp/shorty/src/misc/focus';
import ObjectAssign from '@thednp/shorty/src/misc/ObjectAssign';
import dispatchEvent from '@thednp/shorty/src/misc/dispatchEvent';
import passiveHandler from '@thednp/shorty/src/misc/passiveHandler';
import emulateTransitionEnd from '@thednp/shorty/src/misc/emulateTransitionEnd';
import OriginalEvent from '@thednp/shorty/src/misc/OriginalEvent';
import setElementStyle from '@thednp/shorty/src/misc/setElementStyle';

import { addListener, removeListener } from '@thednp/event-listener/src/event-listener';

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

  /* istanbul ignore else */
  if (!modalOverflow && scrollbarWidth) {
    const pad = !isRTL(element) ? 'paddingRight' : /* istanbul ignore next */'paddingLeft';
    const padStyle = {};
    padStyle[pad] = `${scrollbarWidth}px`;
    setElementStyle(element, padStyle);
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

  /* istanbul ignore else */
  if (triggers.length) {
    triggers.forEach((btn) => action(btn, mouseclickEvent, modalClickHandler));
  }
}

/**
 * Executes after a modal is hidden to the user.
 * @param {Modal} self the `Modal` instance
 * @param {Function} callback the `Modal` instance
 */
function afterModalHide(self, callback) {
  const { triggers, element, relatedTarget } = self;
  removeOverlay(element);
  setElementStyle(element, { paddingRight: '', display: '' });
  toggleModalDismiss(self);

  const focusElement = showModalEvent.relatedTarget || triggers.find(isVisible);
  /* istanbul ignore else */
  if (focusElement) focus(focusElement);

  /* istanbul ignore else */
  if (callback) callback();

  hiddenModalEvent.relatedTarget = relatedTarget;
  dispatchEvent(element, hiddenModalEvent);
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
  setElementStyle(element, { display: 'block' });

  setModalScrollbar(self);
  /* istanbul ignore else */
  if (!getCurrentOpen(element)) {
    setElementStyle(getDocumentBody(element), { overflow: 'hidden' });
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
 * @param {Function=} callback when `true` skip animation
 */
function beforeModalHide(self, callback) {
  const {
    element, options, hasFade,
  } = self;

  // callback can also be the transitionEvent object, we wanna make sure it's not
  // call is not forced and overlay is visible
  if (options.backdrop && !callback && hasFade && hasClass(overlay, showClass)
    && !getCurrentOpen(element)) { // AND no modal is visible
    hideOverlay();
    emulateTransitionEnd(overlay, () => afterModalHide(self));
  } else {
    afterModalHide(self, callback);
  }
}

// MODAL EVENT HANDLERS
// ====================
/**
 * Handles the `click` event listener for modal.
 * @param {MouseEvent} e the `Event` object
 */
function modalClickHandler(e) {
  const { target } = e;

  const trigger = target && closest(target, modalToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getModalInstance(element);

  /* istanbul ignore else */
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
function modalKeyHandler({ code, target }) {
  const element = querySelector(modalActiveSelector, getDocument(target));
  const self = element && getModalInstance(element);

  const { options } = self;
  /* istanbul ignore else */
  if (options.keyboard && code === keyEscape // the keyboard option is enabled and the key is 27
    && hasClass(element, showClass)) { // the modal is not visible
    self.relatedTarget = null;
    self.hide();
  }
}

/**
 * Handles the `click` event listeners that hide the modal.
 *
 * @this {HTMLElement}
 * @param {MouseEvent} e the `Event` object
 */
function modalDismissHandler(e) {
  const element = this;
  const self = getModalInstance(element);

  // this timer is needed
  /* istanbul ignore next: must have a filter */
  if (!self || Timer.get(element)) return;

  const { options, isStatic, modalDialog } = self;
  const { backdrop } = options;
  const { target } = e;

  const selectedText = getDocument(element).getSelection().toString().length;
  const targetInsideDialog = modalDialog.contains(target);
  const dismiss = target && closest(target, modalDismissSelector);

  /* istanbul ignore else */
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
   * @param {HTMLElement | string} target usually the `.modal` element
   * @param {BSN.Options.Modal=} config instance options
   */
  constructor(target, config) {
    super(target, config);

    // bind
    const self = this;

    // the modal
    const { element } = self;

    // the modal-dialog
    /** @type {(HTMLElement)} */
    self.modalDialog = querySelector(`.${modalString}-dialog`, element);

    // modal can have multiple triggering elements
    /** @type {HTMLElement[]} */
    self.triggers = [...querySelectorAll(modalToggleSelector, getDocument(element))]
      .filter((btn) => getTargetElement(btn) === element);

    // additional internals
    /** @type {boolean} */
    self.isStatic = self.options.backdrop === 'static';
    /** @type {boolean} */
    self.hasFade = hasClass(element, fadeClass);
    /** @type {HTMLElement?} */
    self.relatedTarget = null;
    /** @type {HTMLBodyElement | HTMLElement} */
    self.container = getElementContainer(element);

    // attach event listeners
    toggleModalHandler(self, true);

    // bind
    self.update = self.update.bind(self);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() { return modalComponent; }
  /**
   * Returns component default options.
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
      const that1 = this1
        || /* istanbul ignore next */getInstance(currentOpen, 'Offcanvas');
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
      /* istanbul ignore else */
      if (currentOpen && hasClass(overlay, showClass)) {
        hideOverlay();
      }
    }
  }

  /**
   * Hide the modal from the user.
   * @param {Function=} callback when defined it will skip animation
   */
  hide(callback) {
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

    // if (hasFade && callback) {
    /* istanbul ignore else */
    if (hasFade) {
      emulateTransitionEnd(element, () => beforeModalHide(self, callback));
    } else {
      beforeModalHide(self, callback);
    }
  }

  /**
   * Updates the modal layout.
   * @this {Modal} the modal instance
   */
  update() {
    const self = this;
    /* istanbul ignore else */
    if (hasClass(self.element, showClass)) setModalScrollbar(self);
  }

  /** Removes the `Modal` component from target element. */
  dispose() {
    const self = this;
    toggleModalHandler(self);
    // use callback
    self.hide(() => super.dispose());
  }
}

ObjectAssign(Modal, {
  selector: modalSelector,
  init: modalInitCallback,
  getInstance: getModalInstance,
});
