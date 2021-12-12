/* Native JavaScript for Bootstrap 5 | Popover
---------------------------------------------- */
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration';
import queryElement from 'shorter-js/src/misc/queryElement';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import addEventListener from 'shorter-js/src/strings/addEventListener';
import removeEventListener from 'shorter-js/src/strings/removeEventListener';
import ariaDescribedBy from 'shorter-js/src/strings/ariaDescribedBy';
import { getInstance } from 'shorter-js/src/misc/data';
import isMedia from 'shorter-js/src/misc/isMedia';

import dataBsToggle from '../strings/dataBsToggle';
import showClass from '../strings/showClass';
import fadeClass from '../strings/fadeClass';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import tipClassPositions from '../util/tipClassPositions';
import isVisibleTip from '../util/isVisibleTip';
import styleTip from '../util/styleTip';
import setFocus from '../util/setFocus';
import getUID from '../util/getUID';
import getTipContainer from '../util/getTipContainer';
import closestRelative from '../util/closestRelative';
import setHtml from '../util/setHtml';
import BaseComponent from './base-component';

// POPOVER PRIVATE GC
// ==================
const popoverString = 'popover';
const popoverComponent = 'Popover';
const popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`;

/**
 * Static method which returns an existing `Popover` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Popover>}
 */
const getPopoverInstance = (element) => getInstance(element, popoverComponent);

const popoverDefaults = {
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', // string
  title: null, // string
  content: null, // string
  customClass: null, // string
  trigger: 'hover', // string
  placement: 'top', // string
  btnClose: '<button class="btn-close" aria-label="Close"></button>', // string
  sanitizeFn: null, // function
  dismissible: false, // boolean
  animation: true, // boolean
  delay: 200, // number
  container: null,
};

// POPOVER PRIVATE GC
// ==================
const appleBrands = /(iPhone|iPod|iPad)/;
const isIphone = navigator.userAgentData
  ? navigator.userAgentData.brands.some((x) => appleBrands.test(x.brand))
  : appleBrands.test(navigator.userAgent);
const popoverHeaderClass = `${popoverString}-header`;
const popoverBodyClass = `${popoverString}-body`;

// POPOVER CUSTOM EVENTS
// =====================
/** @type {BSN.PopoverEvent.show} */
const showPopoverEvent = bootstrapCustomEvent(`show.bs.${popoverString}`);
/** @type {BSN.PopoverEvent.shown} */
const shownPopoverEvent = bootstrapCustomEvent(`shown.bs.${popoverString}`);
/** @type {BSN.PopoverEvent.hide} */
const hidePopoverEvent = bootstrapCustomEvent(`hide.bs.${popoverString}`);
/** @type {BSN.PopoverEvent.hidden} */
const hiddenPopoverEvent = bootstrapCustomEvent(`hidden.bs.${popoverString}`);

// POPOVER EVENT HANDLERS
// ======================
/**
 * Handles the `touchstart` event listener for `Popover`
 * @param {Event} e the `Event` object
 */
function popoverTouchHandler({ target }) {
  const self = this;
  const { popover, element } = self;

  if ((popover && popover.contains(target)) // popover includes touch target
    || target === element // OR touch target is element
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
  const { id, options } = self;
  const {
    animation, customClass, sanitizeFn, placement, dismissible,
  } = options;
  let {
    title, content,
  } = options;
  const {
    template, btnClose,
  } = options;

  // set initial popover class
  const placementClass = `bs-${popoverString}-${tipClassPositions[placement]}`;

  // load template
  let popoverTemplate;
  if (typeof template === 'object') {
    popoverTemplate = template;
  } else {
    const htmlMarkup = document.createElement('div');
    setHtml(htmlMarkup, template, sanitizeFn);
    popoverTemplate = htmlMarkup.firstChild;
  }
  // set popover markup
  self.popover = popoverTemplate.cloneNode(true);

  const { popover } = self;

  // set id and role attributes
  popover.setAttribute('id', id);
  popover.setAttribute('role', 'tooltip');

  const popoverHeader = queryElement(`.${popoverHeaderClass}`, popover);
  const popoverBody = queryElement(`.${popoverBodyClass}`, popover);

  // set arrow and enable access for styleTip
  self.arrow = queryElement(`.${popoverString}-arrow`, popover);

  // set dismissible button
  if (dismissible) {
    if (title) {
      if (title instanceof Element) setHtml(title, btnClose, sanitizeFn);
      else title += btnClose;
    } else {
      if (popoverHeader) popoverHeader.remove();
      if (content instanceof Element) setHtml(content, btnClose, sanitizeFn);
      else content += btnClose;
    }
  }

  // fill the template with content from options / data attributes
  // also sanitize title && content
  if (title && popoverHeader) setHtml(popoverHeader, title, sanitizeFn);
  if (content && popoverBody) setHtml(popoverBody, content, sanitizeFn);

  // set btn and enable access for styleTip
  [self.btn] = popover.getElementsByClassName('btn-close');

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
  element.removeAttribute(ariaDescribedBy);
  popover.remove();
  self.timer = null;
}

/**
 * Toggles on/off the `Popover` event listeners.
 *
 * @param {Popover} self the `Popover` instance
 * @param {boolean | number} add when `true`, event listeners are added
 */
function togglePopoverHandlers(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { element, options } = self;
  const { trigger, dismissible } = options;
  self.enabled = !!add;

  if (trigger === 'hover') {
    element[action]('mousedown', self.show);
    element[action]('mouseenter', self.show);
    if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
    if (!dismissible) element[action]('mouseleave', self.hide);
  } else if (trigger === 'click') {
    element[action](trigger, self.toggle);
  } else if (trigger === 'focus') {
    if (isIphone) element[action]('click', () => setFocus(element));
    element[action]('focusin', self.show);
  }
}

/**
 * Toggles on/off the `Popover` event listeners that close popover.
 *
 * @param {Popover} self the `Popover` instance
 * @param {boolean | number} add when `true`, event listeners are added
 */
function dismissHandlerToggle(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { options, element, btn } = self;
  const { trigger, dismissible } = options;

  if (dismissible) {
    if (btn) btn[action]('click', self.hide);
  } else {
    if (trigger === 'focus') element[action]('focusout', self.hide);
    if (trigger === 'hover') document[action]('touchstart', popoverTouchHandler, passiveHandler);
  }

  if (!isMedia(element)) {
    window[action]('scroll', self.update, passiveHandler);
    window[action]('resize', self.update, passiveHandler);
  }
}

/**
 * Executes after popover was shown to the user.
 *
 * @param {Popover} self the `Popover` instance
 */
function popoverShowComplete(self) {
  self.element.dispatchEvent(shownPopoverEvent);
}

/**
 * Executes after popover was been hidden from the user.
 *
 * @param {Popover} self the `Popover` instance
 */
function popoverHideComplete(self) {
  removePopover(self);
  self.element.dispatchEvent(hiddenPopoverEvent);
}

// POPOVER DEFINITION
// ==================
/** Returns a new `Popover` instance. */
export default class Popover extends BaseComponent {
  /**
   * @param {Element | string} target usualy an element with `data-bs-toggle` attribute
   * @param {BSN.PopoverOptions?} config instance options
   */
  constructor(target, config) {
    const element = queryElement(target);
    popoverDefaults.container = getTipContainer(element);
    super(target, config);

    // bind
    const self = this;

    // additional instance properties
    /** @private @type {number} */
    self.timer = null;
    /** @private @type {Element} */
    self.popover = null;
    /** @private @type {Element} */
    self.arrow = null;
    /** @private @type {Element} */
    self.btn = null;
    /** @private @type {boolean} */
    self.enabled = false;
    // set unique ID for aria-describedby
    /** @private @type {string} */
    self.id = `${popoverString}-${getUID(element)}`;

    // set instance options
    const { options } = self;

    // media elements only work with body as a container
    self.options.container = isMedia(element)
      ? popoverDefaults.container
      : queryElement(options.container);

    // reset default container
    popoverDefaults.container = null;

    // invalidate when no content is set
    if (!options.content) return;

    // crate popover
    createPopover(self);

    // set positions
    const { container } = self.options;
    const elementPosition = getComputedStyle(element).position;
    const containerPosition = getComputedStyle(container).position;
    const parentIsBody = container === document.body;
    const containerIsStatic = !parentIsBody && containerPosition === 'static';
    const containerIsRelative = !parentIsBody && containerPosition === 'relative';
    const relContainer = containerIsStatic && closestRelative(container);
    /** @private @type {Record<string, any>} */
    self.positions = {
      elementPosition,
      containerIsRelative,
      containerIsStatic,
      relContainer,
    };

    // bind
    self.update = self.update.bind(self);

    // attach event listeners
    togglePopoverHandlers(self, 1);
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
   * Updates the position of the popover.
   *
   * @param {Event?} e the `Event` object
   */
  update(e) {
    styleTip(this, e);
  }

  // POPOVER PUBLIC METHODS
  // ======================
  /**
   * Toggles visibility of the popover.
   *
   * @param {Event?} e the `Event` object
   */
  toggle(e) {
    const self = e ? getPopoverInstance(this) : this;
    const { popover, options } = self;
    if (!isVisibleTip(popover, options.container)) self.show();
    else self.hide();
  }

  /**
   * Shows the popover.
   *
   * @param {Event?} e the `Event` object
   */
  show(e) {
    const self = e ? getPopoverInstance(this) : this;
    const {
      element, popover, options, id,
    } = self;
    const { container } = options;

    clearTimeout(self.timer);
    if (!isVisibleTip(popover, container)) {
      element.dispatchEvent(showPopoverEvent);
      if (showPopoverEvent.defaultPrevented) return;

      // append to the container
      container.append(popover);
      element.setAttribute(ariaDescribedBy, id);

      self.update(e);
      if (!hasClass(popover, showClass)) addClass(popover, showClass);
      dismissHandlerToggle(self, 1);

      if (options.animation) emulateTransitionEnd(popover, () => popoverShowComplete(self));
      else popoverShowComplete(self);
    }
  }

  /**
   * Hides the popover.
   *
   * @param {Event?} e the `Event` object
   */
  hide(e) {
    let self;
    if (e) {
      self = getPopoverInstance(this);
      if (!self) { // dismissible popover
        const dPopover = this.closest(`.${popoverString}`);
        const dEl = dPopover && queryElement(`[${ariaDescribedBy}="${dPopover.id}"]`);
        self = getPopoverInstance(dEl);
      }
    } else {
      self = this;
    }
    const { element, popover, options } = self;

    clearTimeout(self.timer);
    self.timer = setTimeout(() => {
      if (isVisibleTip(popover, options.container)) {
        element.dispatchEvent(hidePopoverEvent);
        if (hidePopoverEvent.defaultPrevented) return;

        removeClass(popover, showClass);
        dismissHandlerToggle(self);

        if (options.animation) emulateTransitionEnd(popover, () => popoverHideComplete(self));
        else popoverHideComplete(self);
      }
    }, options.delay + 17);
  }

  /** Disables the popover. */
  enable() {
    const self = this;
    const { enabled } = self;
    if (!enabled) {
      togglePopoverHandlers(self, 1);
      self.enabled = !enabled;
    }
  }

  /** Enables the popover. */
  disable() {
    const self = this;
    const { enabled, popover, options } = self;
    if (enabled) {
      if (isVisibleTip(popover, options.container) && options.animation) {
        self.hide();

        setTimeout(
          () => togglePopoverHandlers(self),
          getElementTransitionDuration(popover) + options.delay + 17,
        );
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

Object.assign(Popover, {
  selector: popoverSelector,
  /**
   * A `Popover` initialization callback.
   * @type {BSN.InitCallback<Popover>}
   */
  callback: (element) => new Popover(element),
  getInstance: getPopoverInstance,
});
