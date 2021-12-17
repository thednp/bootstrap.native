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
import isApple from 'shorter-js/src/boolean/isApple';

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
const popoverHeaderClass = `${popoverString}-header`;
const popoverBodyClass = `${popoverString}-body`;

// POPOVER CUSTOM EVENTS
// =====================
const showPopoverEvent = bootstrapCustomEvent(`show.bs.${popoverString}`);
const shownPopoverEvent = bootstrapCustomEvent(`shown.bs.${popoverString}`);
const hidePopoverEvent = bootstrapCustomEvent(`hide.bs.${popoverString}`);
const hiddenPopoverEvent = bootstrapCustomEvent(`hidden.bs.${popoverString}`);

const popoverDefaults = {
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  title: null,
  content: null,
  customClass: null,
  trigger: 'hover',
  placement: 'top',
  btnClose: '<button class="btn-close" aria-label="Close"></button>',
  sanitizeFn: null,
  dismissible: false,
  animation: true,
  delay: 200,
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
 * @param {{target: Element}} e the `Event` object
 */
function popoverTouchHandler({ target }) {
  const self = this;
  // @ts-ignore
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
  // @ts-ignore
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
  // @ts-ignore
  self.popover = popoverTemplate.cloneNode(true);

  // @ts-ignore
  const { popover } = self;

  // set id and role attributes
  // @ts-ignore
  popover.setAttribute('id', id);
  // @ts-ignore
  popover.setAttribute('role', 'tooltip');

  // @ts-ignore
  const popoverHeader = queryElement(`.${popoverHeaderClass}`, popover);
  // @ts-ignore
  const popoverBody = queryElement(`.${popoverBodyClass}`, popover);

  // set arrow and enable access for styleTip
  // @ts-ignore
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
  // @ts-ignore
  [self.btn] = popover.getElementsByClassName('btn-close');

  // set popover animation and placement
  // @ts-ignore
  if (!hasClass(popover, popoverString)) addClass(popover, popoverString);
  // @ts-ignore
  if (animation && !hasClass(popover, fadeClass)) addClass(popover, fadeClass);
  // @ts-ignore
  if (customClass && !hasClass(popover, customClass)) {
    // @ts-ignore
    addClass(popover, customClass);
  }
  // @ts-ignore
  if (!hasClass(popover, placementClass)) addClass(popover, placementClass);
}

/**
 * Removes the popover from the DOM.
 *
 * @param {Popover} self the `Popover` instance
 */
function removePopover(self) {
  // @ts-ignore
  const { element, popover } = self;
  element.removeAttribute(ariaDescribedBy);
  // @ts-ignore
  popover.remove();
  // @ts-ignore
  self.timer = null;
}

/**
 * Toggles on/off the `Popover` event listeners.
 *
 * @param {Popover} self the `Popover` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function togglePopoverHandlers(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { element, options } = self;
  const { trigger, dismissible } = options;
  // @ts-ignore
  self.enabled = !!add;

  if (trigger === 'hover') {
    // @ts-ignore
    element[action]('mousedown', self.show);
    // @ts-ignore
    element[action]('mouseenter', self.show);
    // @ts-ignore
    if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
    // @ts-ignore
    if (!dismissible) element[action]('mouseleave', self.hide);
  } else if (trigger === 'click') {
    // @ts-ignore
    element[action](trigger, self.toggle);
  } else if (trigger === 'focus') {
    // @ts-ignore
    if (isApple) element[action]('click', () => setFocus(element));
    // @ts-ignore
    element[action]('focusin', self.show);
  }
}

/**
 * Toggles on/off the `Popover` event listeners that close popover.
 *
 * @param {Popover} self the `Popover` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function dismissHandlerToggle(self, add) {
  const action = add ? addEventListener : removeEventListener;
  // @ts-ignore
  const { options, element, btn } = self;
  const { trigger, dismissible } = options;

  if (dismissible) {
    // @ts-ignore
    if (btn) btn[action]('click', self.hide);
  } else {
    // @ts-ignore
    if (trigger === 'focus') element[action]('focusout', self.hide);
    // @ts-ignore
    if (trigger === 'hover') document[action]('touchstart', popoverTouchHandler, passiveHandler);
  }

  if (!isMedia(element)) {
    // @ts-ignore
    window[action]('scroll', self.update, passiveHandler);
    // @ts-ignore
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
   * @param {BSN.Options.Popover=} config instance options
   */
  constructor(target, config) {
    const element = queryElement(target);
    // @ts-ignore
    popoverDefaults.container = getTipContainer(element);
    super(target, config);

    // bind
    const self = this;

    // additional instance properties
    /** @private @type {any?} */
    self.timer = null;
    /** @private @type {Element?} */
    self.popover = null;
    /** @private @type {Element?} */
    self.arrow = null;
    /** @private @type {Element?} */
    self.btn = null;
    /** @private @type {boolean} */
    self.enabled = true;
    // set unique ID for aria-describedby
    /** @private @type {string} */
    // @ts-ignore
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
    // @ts-ignore
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
   * Updates the position of the popover.
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
   * Toggles visibility of the popover.
   *
   * @param {Event=} e the `Event` object
   */
  toggle(e) {
    // @ts-ignore
    const self = e ? getPopoverInstance(this) : this;
    const { popover, options } = self;
    // @ts-ignore
    if (!isVisibleTip(popover, options.container)) self.show();
    else self.hide();
  }

  /**
   * Shows the popover.
   *
   * @param {Event=} e the `Event` object
   */
  show(e) {
    // @ts-ignore
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
      // @ts-ignore
      if (!hasClass(popover, showClass)) addClass(popover, showClass);
      dismissHandlerToggle(self, true);

      // @ts-ignore
      if (options.animation) emulateTransitionEnd(popover, () => popoverShowComplete(self));
      else popoverShowComplete(self);
    }
  }

  /**
   * Hides the popover.
   *
   * @this {Element | Popover}
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
        const dEl = dPopover && queryElement(`[${ariaDescribedBy}="${dPopover.id}"]`);
        self = getPopoverInstance(dEl);
      }
    } else {
      // @ts-ignore
      self = this;
    }
    const { element, popover, options } = self;

    clearTimeout(self.timer);
    self.timer = setTimeout(() => {
      if (isVisibleTip(popover, options.container)) {
        element.dispatchEvent(hidePopoverEvent);
        if (hidePopoverEvent.defaultPrevented) return;

        // @ts-ignore
        removeClass(popover, showClass);
        dismissHandlerToggle(self);

        // @ts-ignore
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
      togglePopoverHandlers(self, true);
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
          // @ts-ignore
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
      // @ts-ignore
      emulateTransitionEnd(popover, () => togglePopoverHandlers(self));
    } else {
      togglePopoverHandlers(self);
    }
    super.dispose();
  }
}

Object.assign(Popover, {
  selector: popoverSelector,
  init: popoverInitCallback,
  getInstance: getPopoverInstance,
});
