/* Native JavaScript for Bootstrap 5 | OffCanvas
------------------------------------------------ */
import {
  ariaHidden,
  addClass,
  hasClass,
  closest,
  querySelectorAll,
  querySelector,
  removeAttribute,
  setAttribute,
  keyEscape,
  keydownEvent,
  mouseclickEvent,
  ariaModal,
  emulateTransitionEnd,
  dispatchEvent,
  getElementTransitionDuration,
  getDocumentBody,
  getDocumentElement,
  getDocument,
  removeClass,
  setElementStyle,
  createCustomEvent,
  focus,
  getInstance,
} from '@thednp/shorty';

import { addListener, removeListener } from '@thednp/event-listener';

import dataBsDismiss from '../strings/dataBsDismiss';
import dataBsToggle from '../strings/dataBsToggle';
import showClass from '../strings/showClass';
import offcanvasString from '../strings/offcanvasString';
import offcanvasComponent from '../strings/offcanvasComponent';
import modalComponent from '../strings/modalComponent';

import getTargetElement from '../util/getTargetElement';
import isVisible from '../util/isVisible';
import { setScrollbar } from '../util/scrollbar';
import { hasPopup } from '../util/popupContainer';
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
import { OffcanvasOptions, OffcanvasEvent } from '../interface/offcanvas';

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
 */
const getOffcanvasInstance = (element: HTMLElement) => getInstance<Offcanvas>(element, offcanvasComponent);

/**
 * An `Offcanvas` initialization callback.
 */
const offcanvasInitCallback = (element: HTMLElement) => new Offcanvas(element);

// OFFCANVAS CUSTOM EVENTS
// =======================
const showOffcanvasEvent = createCustomEvent<OffcanvasEvent>(`show.bs.${offcanvasString}`);
const shownOffcanvasEvent = createCustomEvent<OffcanvasEvent>(`shown.bs.${offcanvasString}`);
const hideOffcanvasEvent = createCustomEvent<OffcanvasEvent>(`hide.bs.${offcanvasString}`);
const hiddenOffcanvasEvent = createCustomEvent<OffcanvasEvent>(`hidden.bs.${offcanvasString}`);

// OFFCANVAS PRIVATE METHODS
// =========================
/**
 * Sets additional style for the `<body>` and other elements
 * when showing an offcanvas to the user.
 *
 * @param self the `Offcanvas` instance
 */
const setOffCanvasScrollbar = (self: Offcanvas) => {
  const { element } = self;
  const { clientHeight, scrollHeight } = getDocumentElement(element);
  setScrollbar(element, clientHeight !== scrollHeight);
};

/**
 * Toggles on/off the listeners of the events that close the offcanvas.
 *
 * @param self the `Offcanvas` instance
 * @param add when *true* listeners are added
 */
const toggleOffCanvasDismiss = (self: Offcanvas, add?: boolean) => {
  const action = add ? addListener : removeListener;
  const doc = getDocument(self.element);
  action(doc, keydownEvent, offcanvasKeyDismissHandler);
  action(doc, mouseclickEvent, offcanvasDismissHandler);
};

/**
 * Executes before showing the offcanvas.
 *
 * @param self the `Offcanvas` instance
 */
const beforeOffcanvasShow = (self: Offcanvas) => {
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
};

/**
 * Executes before hiding the offcanvas.
 *
 * @param self the `Offcanvas` instance
 */
const beforeOffcanvasHide = (self: Offcanvas) => {
  const { element, options } = self;
  const currentOpen = getCurrentOpen(element);

  element.blur();

  if (!currentOpen && options.backdrop && hasClass(overlay, showClass)) {
    hideOverlay();
  }
  emulateTransitionEnd(element, () => hideOffcanvasComplete(self));
};

// OFFCANVAS EVENT HANDLERS
// ========================
/**
 * Handles the `click` event listeners.
 *
 * @param e the `Event` object
 */
const offcanvasTriggerHandler = (e: MouseEvent) => {
  const trigger = closest(e.target as HTMLElement, offcanvasToggleSelector);
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
};

/**
 * Handles the event listeners that close the offcanvas.
 *
 * @param e the `Event` object
 */
const offcanvasDismissHandler = (e: MouseEvent) => {
  const { target } = e;
  const element = querySelector(offcanvasActiveSelector, getDocument(target as Node));
  const offCanvasDismiss = querySelector(offcanvasDismissSelector, element as HTMLElement | undefined);
  const self = element && getOffcanvasInstance(element);

  /* istanbul ignore else */
  if (self) {
    const { options, triggers } = self;
    const { backdrop } = options;
    const trigger = closest(target as HTMLElement, offcanvasToggleSelector);
    const selection = getDocument(element).getSelection();

    /* istanbul ignore else: a filter is required here */
    if (!overlay.contains(target as HTMLElement) || backdrop !== 'static') {
      /* istanbul ignore else */
      if (
        !(selection && selection.toString().length) &&
        ((!element.contains(target as HTMLElement) &&
          backdrop &&
          /* istanbul ignore next */ (!trigger || triggers.includes(target as HTMLElement))) ||
          (offCanvasDismiss && offCanvasDismiss.contains(target as HTMLElement)))
      ) {
        self.relatedTarget =
          offCanvasDismiss && offCanvasDismiss.contains(target as HTMLElement) ? offCanvasDismiss : null;
        self.hide();
      }

      /* istanbul ignore next */
      if (trigger && trigger.tagName === 'A') e.preventDefault();
    }
  }
};

/**
 * Handles the `keydown` event listener for offcanvas
 * to hide it when user type the `ESC` key.
 *
 * @param e the `Event` object
 */
const offcanvasKeyDismissHandler = ({ code, target }: KeyboardEvent) => {
  const element = querySelector(offcanvasActiveSelector, getDocument(target as Node));
  const self = element && getOffcanvasInstance(element);

  /* istanbul ignore else */
  if (self) {
    /* istanbul ignore else */
    if (self.options.keyboard && code === keyEscape) {
      self.relatedTarget = null;
      self.hide();
    }
  }
};

/**
 * Handles the `transitionend` when showing the offcanvas.
 *
 * @param self the `Offcanvas` instance
 */
const showOffcanvasComplete = (self: Offcanvas) => {
  const { element } = self;
  removeClass(element, offcanvasTogglingClass);

  removeAttribute(element, ariaHidden);
  setAttribute(element, ariaModal, 'true');
  setAttribute(element, 'role', 'dialog');

  dispatchEvent(element, shownOffcanvasEvent);

  toggleOffCanvasDismiss(self, true);
  focus(element);
};

/**
 * Handles the `transitionend` when hiding the offcanvas.
 *
 * @param self the `Offcanvas` instance
 */
const hideOffcanvasComplete = (self: Offcanvas) => {
  const { element, triggers } = self;

  setAttribute(element, ariaHidden, 'true');
  removeAttribute(element, ariaModal);
  removeAttribute(element, 'role');
  setElementStyle(element, { visibility: '' });

  const visibleTrigger = showOffcanvasEvent.relatedTarget || triggers.find(isVisible);
  /* istanbul ignore else */
  if (visibleTrigger) focus(visibleTrigger as HTMLElement);

  removeOverlay(element);

  dispatchEvent(element, hiddenOffcanvasEvent);
  removeClass(element, offcanvasTogglingClass);

  // must check for open instances
  if (!getCurrentOpen(element)) {
    toggleOffCanvasDismiss(self);
  }
};

// OFFCANVAS DEFINITION
// ====================
/** Returns a new `Offcanvas` instance. */
export default class Offcanvas extends BaseComponent {
  static selector = offcanvasSelector;
  static init = offcanvasInitCallback;
  static getInstance = getOffcanvasInstance;
  declare options: OffcanvasOptions;
  declare triggers: HTMLElement[];
  declare relatedTarget: HTMLElement | null;

  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(target: HTMLElement | string, config?: Partial<OffcanvasOptions>) {
    super(target, config);

    // instance element
    const { element } = this;

    // all the triggering buttons
    this.triggers = [...querySelectorAll(offcanvasToggleSelector, getDocument(element))].filter(
      btn => getTargetElement(btn) === element,
    );

    // additional instance property
    this.relatedTarget = null;

    // attach event listeners
    this._toggleEventListeners(true);
  }

  /**
   * Returns component name string.
   */
  get name() {
    return offcanvasComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return offcanvasDefaults;
  }

  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    if (hasClass(this.element, showClass)) this.hide();
    else this.show();
  }

  /** Shows the offcanvas to the user. */
  show() {
    const { element, options, relatedTarget } = this;
    let overlayDelay = 0;

    if (!hasClass(element, showClass)) {
      showOffcanvasEvent.relatedTarget = relatedTarget || undefined;
      shownOffcanvasEvent.relatedTarget = relatedTarget || undefined;
      dispatchEvent(element, showOffcanvasEvent);

      if (!showOffcanvasEvent.defaultPrevented) {
        // we elegantly hide any opened modal/offcanvas
        const currentOpen = getCurrentOpen(element);
        if (currentOpen && currentOpen !== element) {
          const that =
            getOffcanvasInstance(currentOpen) ||
            /* istanbul ignore next */
            getInstance<typeof BaseComponent & { hide: () => void }>(currentOpen, modalComponent);
          if (that) that.hide();
        }

        if (options.backdrop) {
          if (!hasPopup(overlay)) {
            appendOverlay(element, true);
          } else {
            toggleOverlayType();
          }

          overlayDelay = getElementTransitionDuration(overlay);
          showOverlay();

          setTimeout(() => beforeOffcanvasShow(this), overlayDelay);
        } else {
          beforeOffcanvasShow(this);
          /* istanbul ignore next - this test was done on Modal */
          if (currentOpen && hasClass(overlay, showClass)) {
            hideOverlay();
          }
        }
      }
    }
  }

  /** Hides the offcanvas from the user. */
  hide() {
    const { element, relatedTarget } = this;
    // let overlayDelay = 0;

    if (hasClass(element, showClass)) {
      hideOffcanvasEvent.relatedTarget = relatedTarget || undefined;
      hiddenOffcanvasEvent.relatedTarget = relatedTarget || undefined;
      dispatchEvent(element, hideOffcanvasEvent);
      if (!hideOffcanvasEvent.defaultPrevented) {
        addClass(element, offcanvasTogglingClass);
        removeClass(element, showClass);
        beforeOffcanvasHide(this);
      }
    }
  }

  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (add?: boolean) => {
    const action = add ? addListener : removeListener;
    this.triggers.forEach(btn => action(btn, mouseclickEvent, offcanvasTriggerHandler));
  };

  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const clone = { ...this };
    const { element, options } = clone;
    const delay = options.backdrop ? getElementTransitionDuration(overlay) : /* istanbul ignore next */ 0;
    const callback = () => setTimeout(() => super.dispose(), delay + 17);
    this._toggleEventListeners();

    this.hide();
    if (hasClass(element, showClass)) {
      emulateTransitionEnd(element, callback);
      /* istanbul ignore next */
    } else {
      callback();
    }
  }
}
