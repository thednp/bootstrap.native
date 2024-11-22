/* Native JavaScript for Bootstrap 5 | OffCanvas
------------------------------------------------ */
import {
  addClass,
  ariaHidden,
  ariaModal,
  closest,
  createCustomEvent,
  dispatchEvent,
  emulateTransitionEnd,
  focus,
  getDocument,
  getDocumentBody,
  getDocumentElement,
  getElementTransitionDuration,
  getInstance,
  hasClass,
  keydownEvent,
  keyEscape,
  mouseclickEvent,
  MouseEvent,
  querySelector,
  querySelectorAll,
  removeAttribute,
  removeClass,
  setAttribute,
  setElementStyle,
  toggleFocusTrap,
} from "@thednp/shorty";

import { addListener, removeListener } from "@thednp/event-listener";

import dataBsDismiss from "~/strings/dataBsDismiss";
import dataBsToggle from "~/strings/dataBsToggle";
import showClass from "~/strings/showClass";
import offcanvasString from "~/strings/offcanvasString";
import offcanvasComponent from "~/strings/offcanvasComponent";
import modalComponent from "~/strings/modalComponent";

import getTargetElement from "~/util/getTargetElement";
import isVisible from "~/util/isVisible";
import { setScrollbar } from "~/util/scrollbar";
import { hasPopup } from "~/util/popupContainer";
import {
  appendOverlay,
  getCurrentOpen,
  hideOverlay,
  offcanvasActiveSelector,
  overlay,
  removeOverlay,
  showOverlay,
  toggleOverlayType,
} from "~/util/backdrop";
import isDisabled from "~/util/isDisabled";
import BaseComponent from "./base-component";
import { OffcanvasEvent, OffcanvasOptions } from "~/interface/offcanvas";

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

type OffCanvasEventProps = {
  relatedTarget: Element & EventTarget | undefined;
};

/**
 * Static method which returns an existing `Offcanvas` instance associated
 * to a target `Element`.
 */
const getOffcanvasInstance = (element: Element) =>
  getInstance<Offcanvas>(element, offcanvasComponent);

/**
 * An `Offcanvas` initialization callback.
 */
const offcanvasInitCallback = (element: Element) => new Offcanvas(element);

// OFFCANVAS CUSTOM EVENTS
// =======================
const showOffcanvasEvent = createCustomEvent<
  OffCanvasEventProps,
  OffcanvasEvent
>(`show.bs.${offcanvasString}`);
const shownOffcanvasEvent = createCustomEvent<
  OffCanvasEventProps,
  OffcanvasEvent
>(`shown.bs.${offcanvasString}`);
const hideOffcanvasEvent = createCustomEvent<
  OffCanvasEventProps,
  OffcanvasEvent
>(`hide.bs.${offcanvasString}`);
const hiddenOffcanvasEvent = createCustomEvent<
  OffCanvasEventProps,
  OffcanvasEvent
>(`hidden.bs.${offcanvasString}`);

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

  // istanbul ignore else @preserve
  if (!options.scroll) {
    setOffCanvasScrollbar(self);
    setElementStyle(getDocumentBody(element), { overflow: "hidden" });
  }

  addClass(element, offcanvasTogglingClass);
  addClass(element, showClass);
  setElementStyle(element, { visibility: "visible" });

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

  (element as HTMLElement).blur();

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
function offcanvasTriggerHandler(
  this: HTMLElement,
  e: MouseEvent<HTMLElement>,
) {
  const element = getTargetElement(this);
  const self = element && getOffcanvasInstance(element);

  // istanbul ignore if @preserve
  if (isDisabled(this)) return;

  // istanbul ignore if @preserve
  if (!self) return;

  self.relatedTarget = this;
  self.toggle();

  // istanbul ignore else @preserve
  if (this.tagName === "A") e.preventDefault();
}

/**
 * Handles the event listeners that close the offcanvas.
 *
 * @param e the `Event` object
 */
const offcanvasDismissHandler = (e: MouseEvent<HTMLElement>) => {
  const { target } = e;
  const element = querySelector(
    offcanvasActiveSelector,
    getDocument(target),
  );
  // istanbul ignore else @preserve
  if (!element) return;

  const offCanvasDismiss = querySelector<HTMLElement>(
    offcanvasDismissSelector,
    element,
  );
  const self = getOffcanvasInstance(element);

  // istanbul ignore if @preserve
  if (!self) return;

  const { options, triggers } = self;
  const { backdrop } = options;
  const trigger = closest(target, offcanvasToggleSelector);
  const selection = getDocument(element).getSelection();

  // istanbul ignore if: a filter is required here @preserve
  if (overlay.contains(target) && backdrop === "static") return;

  // istanbul ignore else @preserve
  if (
    !(selection && selection.toString().length) &&
    ((!element.contains(target) &&
      backdrop &&
      // istanbul ignore next @preserve
      (!trigger || triggers.includes(target))) ||
      (offCanvasDismiss &&
        offCanvasDismiss.contains(target)))
  ) {
    self.relatedTarget = offCanvasDismiss && offCanvasDismiss.contains(target)
      ? offCanvasDismiss
      : undefined;
    self.hide();
  }

  // istanbul ignore next @preserve
  if (trigger && trigger.tagName === "A") e.preventDefault();
};

/**
 * Handles the `keydown` event listener for offcanvas
 * to hide it when user type the `ESC` key.
 *
 * @param e the `Event` object
 */
const offcanvasKeyDismissHandler = ({ code, target }: KeyboardEvent) => {
  const element = querySelector(
    offcanvasActiveSelector,
    getDocument(target as Node),
  );
  const self = element && getOffcanvasInstance(element);

  // istanbul ignore if @preserve
  if (!self) return;

  // istanbul ignore else @preserve
  if (self.options.keyboard && code === keyEscape) {
    self.relatedTarget = undefined;
    self.hide();
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
  setAttribute(element, ariaModal, "true");
  setAttribute(element, "role", "dialog");

  dispatchEvent(element, shownOffcanvasEvent);

  toggleOffCanvasDismiss(self, true);
  focus(element);
  toggleFocusTrap(element);
};

/**
 * Handles the `transitionend` when hiding the offcanvas.
 *
 * @param self the `Offcanvas` instance
 */
const hideOffcanvasComplete = (self: Offcanvas) => {
  const { element, triggers } = self;

  setAttribute(element, ariaHidden, "true");
  removeAttribute(element, ariaModal);
  removeAttribute(element, "role");
  setElementStyle(element, { visibility: "" });

  const visibleTrigger = showOffcanvasEvent.relatedTarget ||
    triggers.find(isVisible);
  // istanbul ignore else @preserve
  if (visibleTrigger) focus(visibleTrigger);

  removeOverlay(element);

  dispatchEvent(element, hiddenOffcanvasEvent);
  removeClass(element, offcanvasTogglingClass);
  toggleFocusTrap(element);

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
  declare element: HTMLElement;
  declare options: OffcanvasOptions;
  declare triggers: HTMLElement[];
  declare relatedTarget: EventTarget & HTMLElement | undefined;

  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(
    target: Element | string,
    config?: Partial<OffcanvasOptions>,
  ) {
    super(target, config);

    // instance element
    const { element } = this;

    // all the triggering buttons
    this.triggers = [
      ...querySelectorAll<HTMLElement>(
        offcanvasToggleSelector,
        getDocument(element),
      ),
    ].filter(
      (btn) => getTargetElement(btn) === element,
    );

    // additional instance property
    this.relatedTarget = undefined;

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

    // istanbul ignore else @preserve
    if (hasClass(element, showClass)) return;

    showOffcanvasEvent.relatedTarget = relatedTarget || undefined;
    shownOffcanvasEvent.relatedTarget = relatedTarget || undefined;
    dispatchEvent(element, showOffcanvasEvent);

    // istanbul ignore else @preserve
    if (showOffcanvasEvent.defaultPrevented) return;

    // we elegantly hide any opened modal/offcanvas
    const currentOpen = getCurrentOpen(element);
    if (currentOpen && currentOpen !== element) {
      const that = getOffcanvasInstance(currentOpen) ||
        // istanbul ignore next @preserve
        getInstance<typeof BaseComponent & { hide: () => void }>(
          currentOpen,
          modalComponent,
        );

      // istanbul ignore else @preserve
      if (that) that.hide();
    }

    if (options.backdrop) {
      if (!hasPopup(overlay)) appendOverlay(element, true);
      else toggleOverlayType();

      overlayDelay = getElementTransitionDuration(overlay);
      showOverlay();

      setTimeout(() => beforeOffcanvasShow(this), overlayDelay);
    } else {
      beforeOffcanvasShow(this);
      // istanbul ignore next @preserve - this test was done on Modal
      if (currentOpen && hasClass(overlay, showClass)) hideOverlay();
    }
  }

  /** Hides the offcanvas from the user. */
  hide() {
    const { element, relatedTarget } = this;

    // istanbul ignore else @preserve
    if (!hasClass(element, showClass)) return;

    hideOffcanvasEvent.relatedTarget = relatedTarget || undefined;
    hiddenOffcanvasEvent.relatedTarget = relatedTarget || undefined;
    dispatchEvent(element, hideOffcanvasEvent);

    // istanbul ignore else @preserve
    if (hideOffcanvasEvent.defaultPrevented) return;

    addClass(element, offcanvasTogglingClass);
    removeClass(element, showClass);
    beforeOffcanvasHide(this);
  }

  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (add?: boolean) => {
    const action = add ? addListener : removeListener;
    this.triggers.forEach((btn) => {
      action(btn, mouseclickEvent, offcanvasTriggerHandler);
    });
  };

  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const { element } = this;
    const isOpen = hasClass(element, showClass);
    const callback = () => setTimeout(() => super.dispose(), 1);

    this.hide();
    this._toggleEventListeners();

    if (isOpen) emulateTransitionEnd(element, callback);
    // istanbul ignore next @preserve
    else callback();
  }
}
