/* Native JavaScript for Bootstrap 5 | Popover
---------------------------------------------- */
import setAttribute from 'shorter-js/src/attr/setAttribute';
import removeAttribute from 'shorter-js/src/attr/removeAttribute';
import getDocumentBody from 'shorter-js/src/get/getDocumentBody';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import dispatchEvent from 'shorter-js/src/misc/dispatchEvent';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import getElementTransitionDuration from 'shorter-js/src/get/getElementTransitionDuration';
import querySelector from 'shorter-js/src/selectors/querySelector';
import getElementsByClassName from 'shorter-js/src/selectors/getElementsByClassName';
import getElementStyle from 'shorter-js/src/get/getElementStyle';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import on from 'shorter-js/src/event/on';
import off from 'shorter-js/src/event/off';
import ariaDescribedBy from 'shorter-js/src/strings/ariaDescribedBy';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import { getInstance } from 'shorter-js/src/misc/data';
import isMedia from 'shorter-js/src/is/isMedia';
import isApple from 'shorter-js/src/boolean/isApple';
import isRTL from 'shorter-js/src/is/isRTL';
import Timer from 'shorter-js/src/misc/timer';
import getUID from 'shorter-js/src/misc/getUID';

import mousedownEvent from 'shorter-js/src/strings/mousedownEvent';
import mouseenterEvent from 'shorter-js/src/strings/mouseenterEvent';
import mousemoveEvent from 'shorter-js/src/strings/mousemoveEvent';
import mouseleaveEvent from 'shorter-js/src/strings/mouseleaveEvent';
import mousehoverEvent from 'shorter-js/src/strings/mousehoverEvent';
import mouseclickEvent from 'shorter-js/src/strings/mouseclickEvent';
import focusEvent from 'shorter-js/src/strings/focusEvent';
import focusinEvent from 'shorter-js/src/strings/focusinEvent';
import focusoutEvent from 'shorter-js/src/strings/focusoutEvent';
import touchstartEvent from 'shorter-js/src/strings/touchstartEvent';
import scrollEvent from 'shorter-js/src/strings/scrollEvent';
import resizeEvent from 'shorter-js/src/strings/resizeEvent';
import getDocument from 'shorter-js/src/get/getDocument';
import getWindow from 'shorter-js/src/get/getWindow';
import focus from 'shorter-js/src/misc/focus';
import dataBsToggle from '../strings/dataBsToggle';
import showClass from '../strings/showClass';
import fadeClass from '../strings/fadeClass';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import tipClassPositions from '../util/tipClassPositions';
import isVisibleTip from '../util/isVisibleTip';
import styleTip from '../util/styleTip';
import getElementContainer from '../util/getElementContainer';
import setHtml from '../util/setHtml';
import BaseComponent from './base-component';

// POPOVER PRIVATE GC
// ==================
const popoverString = 'popover';
const popoverComponent = 'Popover';
const popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`;
const popoverHeaderClass = `${popoverString}-header`;
const popoverBodyClass = `${popoverString}-body`;

// POPOVER CUSTOM EVENTS
// =====================
const showPopoverEvent = bootstrapCustomEvent(`show.bs.${popoverString}`);
const shownPopoverEvent = bootstrapCustomEvent(`shown.bs.${popoverString}`);
const hidePopoverEvent = bootstrapCustomEvent(`hide.bs.${popoverString}`);
const hiddenPopoverEvent = bootstrapCustomEvent(`hidden.bs.${popoverString}`);

const popoverDefaults = {
  /** @type {string} */
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  /** @type {string?} */
  title: null,
  /** @type {string?} */
  content: null,
  /** @type {string?} */
  customClass: null,
  /** @type {string} */
  trigger: 'hover',
  /** @type {string} */
  placement: 'top',
  /** @type {string} */
  btnClose: '<button class="btn-close" aria-label="Close"></button>',
  /** @type {ReturnType<string>} */
  sanitizeFn: null,
  /** @type {boolean} */
  dismissible: false,
  /** @type {boolean} */
  animation: true,
  /** @type {number} */
  delay: 200,
  /** @type {Element?} */
  container: null,
};

/**
 * Static method which returns an existing `Popover` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Popover>}
 */
const getPopoverInstance = (element) => getInstance(element, popoverComponent);

/**
 * A `Popover` initialization callback.
 * @type {BSN.InitCallback<Popover>}
 */
const popoverInitCallback = (element) => new Popover(element);

// POPOVER EVENT HANDLERS
// ======================
/**
 * Handles the `touchstart` event listener for `Popover`
 * @this {Popover}
 * @param {TouchEvent} e the `TouchEvent` object
 */
function popoverTouchHandler({ target }) {
  const self = this;
  const { popover, element } = self;
  if ((popover && popover.contains(target)) // popover includes touch target
    || target === element // OR touch target is element
    // @ts-ignore
    || element.contains(target)) { // OR element includes touch target
    // nothing to do
  } else {
    self.hide();
  }
}

// POPOVER PRIVATE METHODS
// =======================
/**
 * Creates a new popover.
 *
 * @param {Popover} self the `Popover` instance
 */
function createPopover(self) {
  const { id, element, options } = self;
  const {
    animation, customClass, sanitizeFn, placement, dismissible,
  } = options;
  let { title, content } = options;
  const { template, btnClose } = options;
  const tipPositions = { ...tipClassPositions };

  if (isRTL(element)) {
    tipPositions.left = 'end';
    tipPositions.right = 'start';
  }

  // set initial popover class
  const placementClass = `bs-${popoverString}-${tipPositions[placement]}`;

  // load template
  /** @type {(HTMLElement | Element)?} */
  let popoverTemplate;
  if ([Element, HTMLElement].some((x) => template instanceof x)) {
    popoverTemplate = template;
  } else {
    const htmlMarkup = getDocument(element).createElement('div');
    setHtml(htmlMarkup, template, sanitizeFn);
    popoverTemplate = htmlMarkup.firstElementChild;
  }

  // set popover markup
  self.popover = popoverTemplate && popoverTemplate.cloneNode(true);

  const { popover } = self;

  // set id and role attributes
  setAttribute(popover, 'id', id);
  setAttribute(popover, 'role', 'tooltip');

  const popoverHeader = querySelector(`.${popoverHeaderClass}`, popover);
  const popoverBody = querySelector(`.${popoverBodyClass}`, popover);

  // set arrow and enable access for styleTip
  self.arrow = querySelector(`.${popoverString}-arrow`, popover);

  // set dismissible button
  if (dismissible) {
    if (title) {
      if (title instanceof HTMLElement) setHtml(title, btnClose, sanitizeFn);
      else title += btnClose;
    } else {
      if (popoverHeader) popoverHeader.remove();
      if (content instanceof HTMLElement) setHtml(content, btnClose, sanitizeFn);
      else content += btnClose;
    }
  }

  // fill the template with content from options / data attributes
  // also sanitize title && content
  if (title && popoverHeader) setHtml(popoverHeader, title, sanitizeFn);
  if (content && popoverBody) setHtml(popoverBody, content, sanitizeFn);

  // set btn and enable access for styleTip
  [self.btn] = getElementsByClassName('btn-close', popover);

  // set popover animation and placement
  if (!hasClass(popover, popoverString)) addClass(popover, popoverString);
  if (animation && !hasClass(popover, fadeClass)) addClass(popover, fadeClass);
  if (customClass && !hasClass(popover, customClass)) {
    addClass(popover, customClass);
  }
  if (!hasClass(popover, placementClass)) addClass(popover, placementClass);
}

/**
 * Removes the popover from the DOM.
 *
 * @param {Popover} self the `Popover` instance
 */
function removePopover(self) {
  const { element, popover } = self;
  removeAttribute(element, ariaDescribedBy);
  popover.remove();
}

/**
 * Toggles on/off the `Popover` event listeners.
 *
 * @param {Popover} self the `Popover` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function togglePopoverHandlers(self, add) {
  const action = add ? on : off;
  const { element, options } = self;
  const { trigger, dismissible } = options;
  self.enabled = !!add;

  if (trigger === mousehoverEvent) {
    action(element, mousedownEvent, self.show);
    action(element, mouseenterEvent, self.show);
    if (isMedia(element)) action(element, mousemoveEvent, self.update, passiveHandler);
    if (!dismissible) action(element, mouseleaveEvent, self.hide);
  } else if (trigger === mouseclickEvent) {
    action(element, trigger, self.toggle);
  } else if (trigger === focusEvent) {
    if (isApple) action(element, mouseclickEvent, () => focus(element));
    action(element, focusinEvent, self.show);
  }
}

/**
 * Toggles on/off the `Popover` event listeners that close popover.
 *
 * @param {Popover} self the `Popover` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function dismissHandlerToggle(self, add) {
  const action = add ? on : off;
  const { options, element, btn } = self;
  const { trigger, dismissible } = options;

  if (dismissible) {
    if (btn) action(btn, mouseclickEvent, self.hide);
  } else {
    if (trigger === focusEvent) action(element, focusoutEvent, self.hide);
    if (trigger === mousehoverEvent) {
      action(getDocument(element), touchstartEvent, popoverTouchHandler, passiveHandler);
    }
  }

  if (!isMedia(element)) {
    [scrollEvent, resizeEvent].forEach((ev) => {
      // @ts-ignore
      action(getWindow(element), ev, self.update, passiveHandler);
    });
  }
}

/**
 * Executes after popover was shown to the user.
 *
 * @param {Popover} self the `Popover` instance
 */
function popoverShowComplete(self) {
  const { element } = self;
  dispatchEvent(element, shownPopoverEvent);
  Timer.clear(element, 'in');
}

/**
 * Executes after popover was been hidden from the user.
 *
 * @param {Popover} self the `Popover` instance
 */
function popoverHideComplete(self) {
  removePopover(self);
  const { element } = self;
  dispatchEvent(element, hiddenPopoverEvent);
  Timer.clear(element, 'out');
}

// POPOVER DEFINITION
// ==================
/** Returns a new `Popover` instance. */
export default class Popover extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target element with `data-bs-toggle` attribute
   * @param {BSN.Options.Popover=} config instance options
   */
  constructor(target, config) {
    super(target, config);

    // bind
    const self = this;
    const { element } = self;

    // additional instance properties
    /** @type {any} */
    self.popover = {};
    /** @type {(HTMLElement | Element)?} */
    self.arrow = null;
    /** @type {(HTMLElement | Element)?} */
    self.btn = null;
    /** @type {any} */
    self.offsetParent = {};
    /** @type {boolean} */
    self.enabled = true;
    /**
     * Set a unique ID for `aria-describedby`.
     * @type {string}
     */
    self.id = `${popoverString}-${getUID(element, popoverString)}`;

    // set instance options
    const { options } = self;
    // invalidate when no content is set
    if (!options.content) return;

    const container = querySelector(options.container);
    const idealContainer = getElementContainer(element);

    // first set container
    // bypass container option when its position is static/relative
    self.options.container = !container || (container
      && ['static', 'relative'].includes(getElementStyle(container, 'position')))
      ? idealContainer
      : container || getDocumentBody(element);

    // crate popover
    createPopover(self);

    // bind
    popoverTouchHandler.bind(self);
    self.update = self.update.bind(self);

    // attach event listeners
    togglePopoverHandlers(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */ 
  get name() { return popoverComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return popoverDefaults; }
  /* eslint-enable */

  /**
   * Updates the position of the popover. Must use `Event` object.
   *
   * @param {Event=} e the `Event` object
   */
  update(e) {
    // @ts-ignore
    styleTip(this, e);
  }

  // POPOVER PUBLIC METHODS
  // ======================
  /**
   * Toggles visibility of the popover. Must use `Event` object.
   *
   * @param {Event=} e the `Event` object
   * @this {Popover}
   */
  toggle(e) {
    // @ts-ignore
    const self = e ? getPopoverInstance(this) : this;
    if (!self) return;
    const { popover, options } = self;
    if (!isVisibleTip(popover, options.container)) self.show();
    else self.hide();
  }

  /**
   * Shows the popover. Must use `Event` object.
   *
   * @param {Event=} e the `Event` object
   * @this {Popover}
   */
  show(e) {
    // @ts-ignore
    const self = e ? getPopoverInstance(this) : this;
    if (!self) return;
    const {
      element, popover, options, id,
    } = self;
    const { container, animation } = options;
    const outTimer = Timer.get(element, 'out');

    Timer.clear(element, 'out');

    if (popover && !outTimer && !isVisibleTip(popover, container)) {
      const showCallback = () => {
        dispatchEvent(element, showPopoverEvent);
        if (showPopoverEvent.defaultPrevented) return;

        // append to the container
        container.append(popover);
        setAttribute(element, ariaDescribedBy, `#${id}`);

        self.offsetParent = getElementContainer(popover, true);

        self.update(e);
        if (!hasClass(popover, showClass)) addClass(popover, showClass);
        dismissHandlerToggle(self, true);

        if (animation) emulateTransitionEnd(popover, () => popoverShowComplete(self));
        else popoverShowComplete(self);
      };
      Timer.set(element, showCallback, 17, 'in');
    }
  }

  /**
   * Hides the popover.
   *
   * @this {Popover}
   * @param {Event=} e the `Event` object
   */
  hide(e) {
    /** @type {Popover} */
    let self;
    if (e) {
      // @ts-ignore
      self = getPopoverInstance(this);
      if (!self) { // dismissible popover
        // @ts-ignore
        const dPopover = this.closest(`.${popoverString}`);
        const dEl = dPopover && querySelector(`[${ariaDescribedBy}="#${dPopover.id}"]`);
        // @ts-ignore
        self = getPopoverInstance(dEl);
      }
    } else {
      self = this;
    }
    const { element, popover, options } = self;
    const { container, animation, delay } = options;

    Timer.clear(element, 'in');

    if (popover && isVisibleTip(popover, container)) {
      const hideCallback = () => {
        dispatchEvent(element, hidePopoverEvent);
        if (hidePopoverEvent.defaultPrevented) return;

        removeClass(popover, showClass);
        dismissHandlerToggle(self);

        if (animation) emulateTransitionEnd(popover, () => popoverHideComplete(self));
        else popoverHideComplete(self);
      };
      Timer.set(element, hideCallback, delay + 17, 'out');
    }
  }

  /** Disables the popover. */
  enable() {
    const self = this;
    const { enabled } = self;
    if (!enabled) {
      togglePopoverHandlers(self, true);
      self.enabled = !enabled;
    }
  }

  /** Enables the popover. */
  disable() {
    const self = this;
    const {
      element, enabled, popover, options,
    } = self;
    const { container, animation, delay } = options;

    if (enabled) {
      if (isVisibleTip(popover, container) && animation) {
        self.hide();
        Timer.set(element, () => {
          togglePopoverHandlers(self);
          Timer.clear(element, popoverString);
        }, getElementTransitionDuration(popover) + delay + 17, popoverString);
      } else {
        togglePopoverHandlers(self);
      }
      self.enabled = !enabled;
    }
  }

  /** Toggles the `enabled` property. */
  toggleEnabled() {
    const self = this;
    if (!self.enabled) self.enable();
    else self.disable();
  }

  /** Removes the `Popover` from the target element. */
  dispose() {
    const self = this;
    const { popover, options } = self;
    const { container, animation } = options;
    if (animation && isVisibleTip(popover, container)) {
      self.options.delay = 0; // reset delay
      self.hide();
      emulateTransitionEnd(popover, () => togglePopoverHandlers(self));
    } else {
      togglePopoverHandlers(self);
    }
    super.dispose();
  }
}

ObjectAssign(Popover, {
  selector: popoverSelector,
  init: popoverInitCallback,
  getInstance: getPopoverInstance,
  styleTip,
});
