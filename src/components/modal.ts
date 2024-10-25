/* Native JavaScript for Bootstrap 5 | Modal
-------------------------------------------- */
import {
  addClass,
  ariaHidden,
  ariaModal,
  closest,
  createCustomEvent,
  CSS4Declaration,
  dispatchEvent,
  emulateTransitionEnd,
  focus,
  getDocument,
  getDocumentBody,
  getDocumentElement,
  getElementTransitionDuration,
  getInstance,
  getWindow,
  hasClass,
  isRTL,
  KeyboardEvent,
  keydownEvent,
  keyEscape,
  mouseclickEvent,
  MouseEvent,
  passiveHandler,
  querySelector,
  querySelectorAll,
  removeAttribute,
  removeClass,
  resizeEvent,
  setAttribute,
  setElementStyle,
  Timer,
  toggleFocusTrap,
} from '@thednp/shorty';

import { addListener, removeListener } from '@thednp/event-listener';

import dataBsToggle from '../strings/dataBsToggle';
import dataBsDismiss from '../strings/dataBsDismiss';
import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import modalString from '../strings/modalString';
import modalComponent from '../strings/modalComponent';
import offcanvasComponent from '../strings/offcanvasComponent';
import getTargetElement from '../util/getTargetElement';
import { measureScrollbar, setScrollbar } from '../util/scrollbar';
import {
  appendOverlay,
  getCurrentOpen,
  hideOverlay,
  modalActiveSelector,
  overlay,
  removeOverlay,
  showOverlay,
  toggleOverlayType,
} from '../util/backdrop';
import isVisible from '../util/isVisible';
import BaseComponent from './base-component';
import { ModalEvent, ModalOptions } from '../interface/modal';
import { hasPopup } from '../util/popupContainer';

// MODAL PRIVATE GC
// ================
const modalSelector = `.${modalString}`;
const modalToggleSelector = `[${dataBsToggle}="${modalString}"]`;
const modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`;
const modalStaticClass = `${modalString}-static`;

const modalDefaults = {
  backdrop: true,
  keyboard: true,
};

type ModalEventProps = {
  relatedTarget: HTMLElement | undefined;
};

/**
 * Static method which returns an existing `Modal` instance associated
 * to a target `Element`.
 */
const getModalInstance = (element: HTMLElement) => getInstance<Modal>(element, modalComponent);

/**
 * A `Modal` initialization callback.
 */
const modalInitCallback = (element: HTMLElement) => new Modal(element);

// MODAL CUSTOM EVENTS
// ===================
const showModalEvent = createCustomEvent<ModalEventProps, ModalEvent>(`show.bs.${modalString}`);
const shownModalEvent = createCustomEvent<ModalEventProps, ModalEvent>(`shown.bs.${modalString}`);
const hideModalEvent = createCustomEvent<ModalEventProps, ModalEvent>(`hide.bs.${modalString}`);
const hiddenModalEvent = createCustomEvent<ModalEventProps, ModalEvent>(`hidden.bs.${modalString}`);

// MODAL PRIVATE METHODS
// =====================
/**
 * Applies special style for the `<body>` and fixed elements
 * when a modal instance is shown to the user.
 *
 * @param self the `Modal` instance
 */
const setModalScrollbar = (self: Modal) => {
  const { element } = self;
  const scrollbarWidth = measureScrollbar(element);
  const { clientHeight, scrollHeight } = getDocumentElement(element);
  const { clientHeight: modalHeight, scrollHeight: modalScrollHeight } = element;
  const modalOverflow = modalHeight !== modalScrollHeight;

  // istanbul ignore next @preserve: impossible to test?
  if (!modalOverflow && scrollbarWidth) {
    const pad = !isRTL(element)
      ? 'paddingRight'
      : // istanbul ignore next @preserve
        'paddingLeft';
    const padStyle = { [pad]: `${scrollbarWidth}px` } as Partial<CSS4Declaration>;
    setElementStyle(element, padStyle);
  }
  setScrollbar(element, modalOverflow || clientHeight !== scrollHeight);
};

/**
 * Toggles on/off the listeners of events that close the modal.
 *
 * @param self the `Modal` instance
 * @param add when `true`, event listeners are added
 */
const toggleModalDismiss = (self: Modal, add?: boolean) => {
  const action = add ? addListener : removeListener;
  const { element, update } = self;
  action(element, mouseclickEvent, modalDismissHandler);
  action(getWindow(element), resizeEvent, update, passiveHandler);
  action(getDocument(element), keydownEvent, modalKeyHandler);
};

/**
 * Executes after a modal is hidden to the user.
 *
 * @param self the `Modal` instance
 */
const afterModalHide = (self: Modal) => {
  const { triggers, element, relatedTarget } = self;
  removeOverlay(element);
  setElementStyle(element, { paddingRight: '', display: '' });
  toggleModalDismiss(self);

  const focusElement = showModalEvent.relatedTarget || triggers.find(isVisible);
  // istanbul ignore else @preserve
  if (focusElement) focus(focusElement as HTMLElement);

  hiddenModalEvent.relatedTarget = relatedTarget as HTMLElement | undefined;
  dispatchEvent(element, hiddenModalEvent);
  toggleFocusTrap(element);
};

/**
 * Executes after a modal is shown to the user.
 *
 * @param self the `Modal` instance
 */
const afterModalShow = (self: Modal) => {
  const { element, relatedTarget } = self;
  focus(element);
  toggleModalDismiss(self, true);

  shownModalEvent.relatedTarget = relatedTarget as HTMLElement | undefined;
  dispatchEvent(element, shownModalEvent);
  toggleFocusTrap(element);
};

/**
 * Executes before a modal is shown to the user.
 *
 * @param self the `Modal` instance
 */
const beforeModalShow = (self: Modal) => {
  const { element, hasFade } = self;
  setElementStyle(element, { display: 'block' });
  setModalScrollbar(self);
  // istanbul ignore else @preserve
  if (!getCurrentOpen(element)) {
    setElementStyle(getDocumentBody(element), { overflow: 'hidden' });
  }

  addClass(element, showClass);
  removeAttribute(element, ariaHidden);
  setAttribute(element, ariaModal, 'true');

  if (hasFade) emulateTransitionEnd(element, () => afterModalShow(self));
  else afterModalShow(self);
};

/**
 * Executes before a modal is hidden to the user.
 *
 * @param self the `Modal` instance
 */
const beforeModalHide = (self: Modal) => {
  const { element, options, hasFade } = self;

  // callback can also be the transitionEvent object, we wanna make sure it's not
  // call is not forced and overlay is visible
  if (options.backdrop && hasFade && hasClass(overlay, showClass) && !getCurrentOpen(element)) {
    // AND no modal is visible
    hideOverlay();
    emulateTransitionEnd(overlay, () => afterModalHide(self));
  } else {
    afterModalHide(self);
  }
};

// MODAL EVENT HANDLERS
// ====================
/**
 * Handles the `click` event listener for modal.
 *
 * @param e the `Event` object
 */
const modalClickHandler = (e: MouseEvent<HTMLElement>) => {
  const { target } = e;

  const trigger = target && closest(target, modalToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getModalInstance(element);

  // istanbul ignore else @preserve
  if (self) {
    // istanbul ignore else @preserve
    if (trigger && trigger.tagName === 'A') e.preventDefault();
    self.relatedTarget = trigger;
    self.toggle();
  }
};

/**
 * Handles the `keydown` event listener for modal
 * to hide the modal when user type the `ESC` key.
 *
 * @param e the `Event` object
 */
const modalKeyHandler = ({ code, target }: KeyboardEvent<HTMLElement>) => {
  const element = querySelector(modalActiveSelector, getDocument(target));
  const self = element && getModalInstance(element);

  // istanbul ignore else @preserve
  if (self) {
    const { options } = self;
    // istanbul ignore else @preserve
    if (
      options.keyboard &&
      code === keyEscape && // the keyboard option is enabled and the key is 27
      hasClass(element, showClass)
    ) {
      // the modal is not visible
      self.relatedTarget = null;
      self.hide();
    }
  }
};

/**
 * Handles the `click` event listeners that hide the modal.
 *
 * @param e the `Event` object
 */
const modalDismissHandler = (e: MouseEvent<HTMLElement>) => {
  const { currentTarget } = e;
  const self = currentTarget && getModalInstance(currentTarget);

  // this timer is needed
  // istanbul ignore else @preserve
  if (self && currentTarget && !Timer.get(currentTarget)) {
    const { options, isStatic, modalDialog } = self;
    const { backdrop } = options;
    const { target } = e;

    const selectedText = getDocument(currentTarget)?.getSelection()?.toString().length;
    const targetInsideDialog = modalDialog.contains(target);
    const dismiss = target && closest(target, modalDismissSelector);

    // istanbul ignore else @preserve
    if (isStatic && !targetInsideDialog) {
      Timer.set(
        currentTarget,
        () => {
          addClass(currentTarget, modalStaticClass);
          emulateTransitionEnd(modalDialog, () => staticTransitionEnd(self));
        },
        17,
      );
    } else if (dismiss || (!selectedText && !isStatic && !targetInsideDialog && backdrop)) {
      self.relatedTarget = dismiss || null;
      self.hide();
      e.preventDefault();
    }
  }
};

/**
 * Handles the `transitionend` event listeners for `Modal`.
 *
 * @param self the `Modal` instance
 */
const staticTransitionEnd = (self: Modal) => {
  const { element, modalDialog } = self;
  const duration = (getElementTransitionDuration(modalDialog) || 0) + 17;
  removeClass(element, modalStaticClass);
  // user must wait for zoom out transition
  Timer.set(element, () => Timer.clear(element), duration);
};

// MODAL DEFINITION
// ================
/** Returns a new `Modal` instance. */
export default class Modal extends BaseComponent {
  static selector = modalSelector;
  static init = modalInitCallback;
  static getInstance = getModalInstance;
  declare options: ModalOptions;
  declare modalDialog: HTMLElement;
  declare triggers: HTMLElement[];
  declare isStatic: boolean;
  declare hasFade: boolean;
  declare relatedTarget: HTMLElement | null;

  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(target: HTMLElement | string, config?: Partial<ModalOptions>) {
    super(target, config);

    // the modal
    const { element } = this;

    // the modal-dialog
    const modalDialog = querySelector(`.${modalString}-dialog`, element);

    // istanbul ignore else @preserve
    if (modalDialog) {
      this.modalDialog = modalDialog;
      // modal can have multiple triggering elements
      this.triggers = [...querySelectorAll(modalToggleSelector, getDocument(element))].filter(
        btn => getTargetElement(btn) === element,
      );

      // additional internals
      this.isStatic = this.options.backdrop === 'static';
      this.hasFade = hasClass(element, fadeClass);
      this.relatedTarget = null;

      // attach event listeners
      this._toggleEventListeners(true);
    }
  }

  /**
   * Returns component name string.
   */
  get name() {
    return modalComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return modalDefaults;
  }

  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    if (hasClass(this.element, showClass)) this.hide();
    else this.show();
  }

  /** Shows the modal to the user. */
  show() {
    const { element, options, hasFade, relatedTarget } = this;
    const { backdrop } = options;
    let overlayDelay = 0;

    // istanbul ignore else @preserve
    if (!hasClass(element, showClass)) {
      showModalEvent.relatedTarget = relatedTarget || undefined;
      dispatchEvent(element, showModalEvent);
      if (!showModalEvent.defaultPrevented) {
        // we elegantly hide any opened modal/offcanvas
        const currentOpen = getCurrentOpen(element);

        // istanbul ignore else @preserve
        if (currentOpen && currentOpen !== element) {
          const that =
            getModalInstance(currentOpen) ||
            // istanbul ignore next @preserve
            getInstance<typeof BaseComponent & { hide: () => void }>(currentOpen, offcanvasComponent);
          // istanbul ignore else @preserve
          if (that) that.hide();
        }
        if (backdrop) {
          if (!hasPopup(overlay)) {
            appendOverlay(element, hasFade, true);
          } else {
            toggleOverlayType(true);
          }

          overlayDelay = getElementTransitionDuration(overlay);
          showOverlay();

          setTimeout(() => beforeModalShow(this), overlayDelay);
        } else {
          beforeModalShow(this);
          // istanbul ignore else @preserve
          if (currentOpen && hasClass(overlay, showClass)) {
            hideOverlay();
          }
        }
      }
    }
  }

  /** Hide the modal from the user. */
  hide() {
    const { element, hasFade, relatedTarget } = this;

    // istanbul ignore else @preserve
    if (hasClass(element, showClass)) {
      hideModalEvent.relatedTarget = relatedTarget || undefined;
      dispatchEvent(element, hideModalEvent);

      // istanbul ignore else @preserve
      if (!hideModalEvent.defaultPrevented) {
        removeClass(element, showClass);
        setAttribute(element, ariaHidden, 'true');
        removeAttribute(element, ariaModal);

        if (hasFade) {
          emulateTransitionEnd(element, () => beforeModalHide(this));
        } else {
          beforeModalHide(this);
        }
      }
    }
  }

  /**
   * Updates the modal layout.
   */
  update = () => {
    // istanbul ignore else @preserve
    if (hasClass(this.element, showClass)) setModalScrollbar(this);
  };

  /**
   * Toggles on/off the `click` event listener of the `Modal` instance.
   *
   * @param add when `true`, event listener(s) is/are added
   */
  _toggleEventListeners = (add?: boolean) => {
    const action = add ? addListener : removeListener;
    const { triggers } = this;

    // istanbul ignore else @preserve
    if (triggers.length) {
      triggers.forEach(btn => action(btn, mouseclickEvent, modalClickHandler));
    }
  };

  /** Removes the `Modal` component from target element. */
  dispose() {
    const clone = { ...this };
    const { modalDialog, hasFade } = clone;
    const callback = () => setTimeout(() => super.dispose(), 17);

    this.hide();
    this._toggleEventListeners();

    if (hasFade) {
      // use transitionend callback
      emulateTransitionEnd(modalDialog, callback);
    } else {
      callback();
    }
  }
}
