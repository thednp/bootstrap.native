/* Native JavaScript for Bootstrap 5 | Popover
---------------------------------------------- */
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import addClass from 'shorter-js/src/class/addClass.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';

import ariaDescribedBy from '../strings/ariaDescribedBy.js';
import dataBsToggle from '../strings/dataBsToggle.js';
import showClass from '../strings/showClass.js';
import fadeClass from '../strings/fadeClass.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import tipClassPositions from '../util/tipClassPositions.js';
import isVisibleTip from '../util/isVisibleTip.js';
import styleTip from '../util/styleTip.js';
import setFocus from '../util/setFocus';
import isMedia from '../util/isMedia.js';
import getUID from '../util/getUID.js';
import getTipContainer from '../util/getTipContainer.js';
import closestRelative from '../util/closestRelative.js';
import setHtml from '../util/setHtml.js';
import BaseComponent from './base-component.js';

// POPOVER PRIVATE GC
// ==================
const popoverString = 'popover';
const popoverComponent = 'Popover';
const popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`;
const popoverDefaultOptions = {
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
const showPopoverEvent = bootstrapCustomEvent(`show.bs.${popoverString}`);
const shownPopoverEvent = bootstrapCustomEvent(`shown.bs.${popoverString}`);
const hidePopoverEvent = bootstrapCustomEvent(`hide.bs.${popoverString}`);
const hiddenPopoverEvent = bootstrapCustomEvent(`hidden.bs.${popoverString}`);

// POPOVER EVENT HANDLERS
// ======================
function popoverForceFocus() {
  setFocus(this);
}

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

  self.popover = document.createElement('div');
  const { popover } = self;

  // set id and aria-describedby
  popover.setAttribute('id', id);
  popover.setAttribute('role', 'tooltip');

  // load template
  const popoverTemplate = document.createElement('div');
  popoverTemplate.innerHTML = template.trim();
  popover.className = popoverTemplate.firstChild.className;
  popover.innerHTML = popoverTemplate.firstChild.innerHTML;

  const popoverHeader = queryElement(`.${popoverHeaderClass}`, popover);
  const popoverBody = queryElement(`.${popoverBodyClass}`, popover);

  // set arrow and enable access for styleTip
  self.arrow = queryElement(`.${popoverString}-arrow`, popover);

  // set dismissible button
  if (dismissible) {
    if (title) {
      if (title instanceof Element) title.innerHTML += btnClose;
      else title += btnClose;
    } else {
      if (popoverHeader) popoverHeader.remove();
      if (content instanceof Element) content.innerHTML += btnClose;
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

function removePopover(self) {
  const { element, popover } = self;
  element.removeAttribute(ariaDescribedBy);
  popover.remove();
  self.timer = null;
}

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
    if (isIphone) element[action]('click', popoverForceFocus);
    element[action]('focusin', self.show);
  }
}

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

function popoverShowTrigger(self) {
  self.element.dispatchEvent(shownPopoverEvent);
}

function popoverHideTrigger(self) {
  removePopover(self);
  self.element.dispatchEvent(hiddenPopoverEvent);
}

// POPOVER DEFINITION
// ==================
export default class Popover extends BaseComponent {
  constructor(target, config) {
    popoverDefaultOptions.container = getTipContainer(queryElement(target));
    super(popoverComponent, target, popoverDefaultOptions, config);

    // bind
    const self = this;

    // initialization element
    const { element } = self;
    // additional instance properties
    self.timer = null;
    self.popover = null;
    self.arrow = null;
    self.btn = null;
    self.enabled = false;
    // set unique ID for aria-describedby
    self.id = `${popoverString}-${getUID(element)}`;

    // set instance options
    const { options } = self;

    // media elements only work with body as a container
    self.options.container = isMedia(element)
      ? popoverDefaultOptions.container
      : queryElement(options.container);

    // reset default container
    popoverDefaultOptions.container = null;

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

  update(e) {
    styleTip(this, e);
  }

  // POPOVER PUBLIC METHODS
  // ======================
  toggle(e) {
    const self = e ? this[popoverComponent] : this;
    const { popover, options } = self;
    if (!isVisibleTip(popover, options.container)) self.show();
    else self.hide();
  }

  show(e) {
    const self = e ? this[popoverComponent] : this;
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

      if (options.animation) emulateTransitionEnd(popover, () => popoverShowTrigger(self));
      else popoverShowTrigger(self);
    }
  }

  hide(e) {
    let self;
    if (e && this[popoverComponent]) {
      self = this[popoverComponent];
    } else if (e) { // dismissible popover
      const dPopover = this.closest(`.${popoverString}`);
      const dEl = dPopover && queryElement(`[${ariaDescribedBy}="${dPopover.id}"]`);
      self = dEl[popoverComponent];
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

        if (options.animation) emulateTransitionEnd(popover, () => popoverHideTrigger(self));
        else popoverHideTrigger(self);
      }
    }, options.delay + 17);
  }

  enable() {
    const self = this;
    const { enabled } = self;
    if (!enabled) {
      togglePopoverHandlers(self, 1);
      self.enabled = !enabled;
    }
  }

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

  toggleEnabled() {
    const self = this;
    if (!self.enabled) self.enable();
    else self.disable();
  }

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
    super.dispose(popoverComponent);
  }
}

Popover.init = {
  component: popoverComponent,
  selector: popoverSelector,
  constructor: Popover,
};
