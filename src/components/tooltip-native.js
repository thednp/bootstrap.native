/* Native JavaScript for Bootstrap 5 | Tooltip
---------------------------------------------- */
import ariaDescribedBy from 'shorter-js/src/strings/ariaDescribedBy';
import mouseclickEvent from 'shorter-js/src/strings/mouseclickEvent';
import mousedownEvent from 'shorter-js/src/strings/mousedownEvent';
import mouseenterEvent from 'shorter-js/src/strings/mouseenterEvent';
import mouseleaveEvent from 'shorter-js/src/strings/mouseleaveEvent';
import mousemoveEvent from 'shorter-js/src/strings/mousemoveEvent';
import focusEvent from 'shorter-js/src/strings/focusEvent';
import focusinEvent from 'shorter-js/src/strings/focusinEvent';
import focusoutEvent from 'shorter-js/src/strings/focusoutEvent';
import mousehoverEvent from 'shorter-js/src/strings/mousehoverEvent';
import scrollEvent from 'shorter-js/src/strings/scrollEvent';
import resizeEvent from 'shorter-js/src/strings/resizeEvent';
import touchstartEvent from 'shorter-js/src/strings/touchstartEvent';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import getAttribute from 'shorter-js/src/attr/getAttribute';
import removeAttribute from 'shorter-js/src/attr/removeAttribute';
import getWindow from 'shorter-js/src/get/getWindow';
import getDocument from 'shorter-js/src/get/getDocument';
import getDocumentBody from 'shorter-js/src/get/getDocumentBody';
import getElementTransitionDuration from 'shorter-js/src/get/getElementTransitionDuration';
import getElementStyle from 'shorter-js/src/get/getElementStyle';
import closest from 'shorter-js/src/selectors/closest';
import querySelector from 'shorter-js/src/selectors/querySelector';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
// import on from 'shorter-js/src/event/on';
// import off from 'shorter-js/src/event/off';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import { getInstance } from 'shorter-js/src/misc/data';
import isMedia from 'shorter-js/src/is/isMedia';
import isApple from 'shorter-js/src/boolean/isApple';
import dispatchEvent from 'shorter-js/src/misc/dispatchEvent';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import Timer from 'shorter-js/src/misc/timer';
import getUID from 'shorter-js/src/misc/getUID';
import focus from 'shorter-js/src/misc/focus';
import OriginalEvent from 'shorter-js/src/misc/OriginalEvent';
import toLowerCase from 'shorter-js/src/misc/toLowerCase';

import EventListener from 'event-listener.js';

import dataBsToggle from '../strings/dataBsToggle';
import dataOriginalTitle from '../strings/dataOriginalTitle';
import showClass from '../strings/showClass';
import tooltipString from '../strings/tooltipString';
import tooltipComponent from '../strings/tooltipComponent';
import popoverString from '../strings/popoverString';
import popoverComponent from '../strings/popoverComponent';
import modalString from '../strings/modalString';
import offcanvasString from '../strings/offcanvasString';

import styleTip from '../util/styleTip';
import createTip from '../util/createTip';
import isVisibleTip from '../util/isVisibleTip';
import getElementContainer from '../util/getElementContainer';
import tooltipDefaults from '../util/tooltipDefaults';
import BaseComponent from './base-component';

// TOOLTIP PRIVATE GC
// ==================
const tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`;
const titleAttr = 'title';
const { on, off } = EventListener;

/**
 * Static method which returns an existing `Tooltip` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Tooltip>}
 */
let getTooltipInstance = (element) => getInstance(element, tooltipComponent);

/**
 * A `Tooltip` initialization callback.
 * @type {BSN.InitCallback<Tooltip>}
 */
const tooltipInitCallback = (element) => new Tooltip(element);

// TOOLTIP PRIVATE METHODS
// =======================
/**
 * Removes the tooltip from the DOM.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function removeTooltip(self) {
  const { element, tooltip } = self;
  removeAttribute(element, ariaDescribedBy);
  tooltip.remove();
}

/**
 * Executes after the instance has been disposed.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function disposeTooltipComplete(self) {
  const { element } = self;
  toggleTooltipHandlers(self);

  if (element.hasAttribute(dataOriginalTitle) && self.name === tooltipString) {
    toggleTooltipTitle(self);
  }
}

/**
 * Toggles on/off the special `Tooltip` event listeners.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function toggleTooltipAction(self, add) {
  const action = add ? on : off;
  const { element } = self;

  action(getDocument(element), touchstartEvent, tooltipTouchHandler, passiveHandler);

  if (!isMedia(element)) {
    [scrollEvent, resizeEvent].forEach((ev) => {
      // @ts-ignore
      action(getWindow(element), ev, self.update, passiveHandler);
    });
  }
}

/**
 * Executes after the tooltip was shown to the user.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function tooltipShownAction(self) {
  const { element } = self;
  const shownTooltipEvent = OriginalEvent(`shown.bs.${toLowerCase(self.name)}`);

  toggleTooltipAction(self, true);
  dispatchEvent(element, shownTooltipEvent);
  Timer.clear(element, 'in');
}

/**
 * Executes after the tooltip was hidden to the user.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function tooltipHiddenAction(self) {
  const { element } = self;
  const hiddenTooltipEvent = OriginalEvent(`hidden.bs.${toLowerCase(self.name)}`);

  toggleTooltipAction(self);
  removeTooltip(self);
  dispatchEvent(element, hiddenTooltipEvent);
  Timer.clear(element, 'out');
}

/**
 * Toggles on/off the `Tooltip` event listeners.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function toggleTooltipHandlers(self, add) {
  const action = add ? on : off;
  // @ts-ignore -- btn is only for dismissible popover
  const { element, options, btn } = self;
  const { trigger, dismissible } = options;

  if (trigger.includes('manual')) return;

  self.enabled = !!add;

  /** @type {string[]} */
  const triggerOptions = trigger.split(' ');
  const elemIsMedia = isMedia(element);

  if (elemIsMedia) {
    action(element, mousemoveEvent, self.update, passiveHandler);
  }

  triggerOptions.forEach((tr) => {
    if (elemIsMedia || tr === mousehoverEvent) {
      action(element, mousedownEvent, self.show);
      action(element, mouseenterEvent, self.show);

      if (dismissible && btn) {
        action(btn, mouseclickEvent, self.hide);
      } else {
        action(element, mouseleaveEvent, self.hide);
        action(getDocument(element), touchstartEvent, tooltipTouchHandler, passiveHandler);
      }
    } else if (tr === mouseclickEvent) {
      action(element, tr, (!dismissible ? self.toggle : self.show));
    } else if (tr === focusEvent) {
      action(element, focusinEvent, self.show);
      if (!dismissible) action(element, focusoutEvent, self.hide);
      if (isApple) action(element, mouseclickEvent, () => focus(element));
    }
  });
}

/**
 * Toggles on/off the `Tooltip` event listeners that hide/update the tooltip.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function toggleTooltipOpenHandlers(self, add) {
  const action = add ? on : off;
  const { element, options, offsetParent } = self;
  const { container } = options;
  const { offsetHeight, scrollHeight } = container;
  const parentModal = closest(element, `.${modalString}`);
  const parentOffcanvas = closest(element, `.${offcanvasString}`);

  if (!isMedia(element)) {
    const win = getWindow(element);
    const overflow = offsetHeight !== scrollHeight;
    const scrollTarget = overflow || offsetParent !== win ? container : win;
    // @ts-ignore
    action(win, resizeEvent, self.update, passiveHandler);
    action(scrollTarget, scrollEvent, self.update, passiveHandler);
  }

  // dismiss tooltips inside modal / offcanvas
  if (parentModal) on(parentModal, `hide.bs.${modalString}`, self.hide);
  if (parentOffcanvas) on(parentOffcanvas, `hide.bs.${offcanvasString}`, self.hide);
}

/**
 * Toggles the `title` and `data-original-title` attributes.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {string=} content when `true`, event listeners are added
 */
function toggleTooltipTitle(self, content) {
  // [0 - add, 1 - remove] | [0 - remove, 1 - add]
  const titleAtt = [dataOriginalTitle, titleAttr];
  const { element } = self;

  setAttribute(element, titleAtt[content ? 0 : 1],
    // @ts-ignore
    (content || getAttribute(element, titleAtt[0])));
  removeAttribute(element, titleAtt[content ? 1 : 0]);
}

// TOOLTIP EVENT HANDLERS
// ======================
/**
 * Handles the `touchstart` event listener for `Tooltip`
 * @this {Tooltip}
 * @param {TouchEvent} e the `Event` object
 */
function tooltipTouchHandler({ target }) {
  const { tooltip, element } = this;
  // @ts-ignore
  if (tooltip.contains(target) || target === element || element.contains(target)) {
    // smile for ESLint
  } else {
    this.hide();
  }
}

// TOOLTIP DEFINITION
// ==================
/** Creates a new `Tooltip` instance. */
export default class Tooltip extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target the target element
   * @param {BSN.Options.Tooltip=} config the instance options
   */
  constructor(target, config) {
    super(target, config);

    // bind
    const self = this;
    const { element } = self;
    const isTooltip = self.name === tooltipComponent;
    const tipString = isTooltip ? tooltipString : popoverString;
    const tipComponent = isTooltip ? tooltipComponent : popoverComponent;

    getTooltipInstance = (elem) => getInstance(elem, tipComponent);

    // additional properties
    /** @type {any} */
    self.tooltip = {};
    if (!isTooltip) {
      /** @type {any?} */
      // @ts-ignore
      self.btn = null;
    }
    /** @type {any} */
    self.arrow = {};
    /** @type {any} */
    self.offsetParent = {};
    /** @type {boolean} */
    self.enabled = true;
    /** @type {string} Set unique ID for `aria-describedby`. */
    self.id = `${tipString}-${getUID(element, tipString)}`;

    // instance options
    const { options } = self;

    // invalidate
    if ((!options.title && isTooltip) || (!isTooltip && !options.content)) return;

    const container = querySelector(options.container);
    const idealContainer = getElementContainer(element);

    // bypass container option when its position is static/relative
    self.options.container = !container || (container
      && ['static', 'relative'].includes(getElementStyle(container, 'position')))
      ? idealContainer
      : container || getDocumentBody(element);

    // reset default options
    tooltipDefaults[titleAttr] = null;

    // all functions bind
    tooltipTouchHandler.bind(self);
    self.update = self.update.bind(self);
    self.show = self.show.bind(self);
    self.hide = self.hide.bind(self);
    self.toggle = self.toggle.bind(self);

    // set title attributes and add event listeners
    if (element.hasAttribute(titleAttr) && isTooltip) {
      toggleTooltipTitle(self, options.title);
    }

    // create tooltip here
    createTip(self);

    // attach events
    toggleTooltipHandlers(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return tooltipComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return tooltipDefaults; }
  /* eslint-enable */

  // TOOLTIP PUBLIC METHODS
  // ======================
  /**
   * Shows the tooltip.
   *
   * @param {Event=} e the `Event` object
   * @this {Tooltip}
   */
  show(e) {
    const self = this;
    const {
      options, tooltip, element, id,
    } = self;
    const { container, animation } = options;
    const outTimer = Timer.get(element, 'out');

    Timer.clear(element, 'out');

    if (tooltip && !outTimer && !isVisibleTip(tooltip, container)) {
      Timer.set(element, () => {
        const showTooltipEvent = OriginalEvent(`show.bs.${toLowerCase(self.name)}`);
        dispatchEvent(element, showTooltipEvent);
        if (showTooltipEvent.defaultPrevented) return;

        // append to container
        container.append(tooltip);
        setAttribute(element, ariaDescribedBy, `#${id}`);
        // set offsetParent
        self.offsetParent = getElementContainer(tooltip, true);

        self.update(e);
        toggleTooltipOpenHandlers(self, true);

        if (!hasClass(tooltip, showClass)) addClass(tooltip, showClass);
        if (animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(self));
        else tooltipShownAction(self);
      }, 17, 'in');
    }
  }

  /**
   * Hides the tooltip.
   *
   * @this {Tooltip}
   */
  hide() {
    const self = this;
    const { options, tooltip, element } = self;
    const { container, animation, delay } = options;

    Timer.clear(element, 'in');

    if (tooltip && isVisibleTip(tooltip, container)) {
      Timer.set(element, () => {
        const hideTooltipEvent = OriginalEvent(`hide.bs.${toLowerCase(self.name)}`);
        dispatchEvent(element, hideTooltipEvent);

        if (hideTooltipEvent.defaultPrevented) return;

        // @ts-ignore
        removeClass(tooltip, showClass);
        toggleTooltipOpenHandlers(self);

        if (animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(self));
        else tooltipHiddenAction(self);
      }, delay + 17, 'out');
    }
  }

  /**
   * Updates the tooltip position.
   *
   * @param {Event=} e the `Event` object
   * @this {Tooltip} the `Tooltip` instance
   */
  update(e) {
    // @ts-ignore
    styleTip(this, e);
  }

  /**
   * Toggles the tooltip visibility.
   *
   * @param {Event=} e the `Event` object
   * @this {Tooltip} the instance
   */
  toggle(e) {
    const self = this;
    const { tooltip, options } = self;

    if (!isVisibleTip(tooltip, options.container)) self.show(e);
    else self.hide();
  }

  /** Enables the tooltip. */
  enable() {
    const self = this;
    const { enabled } = self;
    if (!enabled) {
      toggleTooltipHandlers(self, true);
      self.enabled = !enabled;
    }
  }

  /** Disables the tooltip. */
  disable() {
    const self = this;
    const {
      element, tooltip, options, enabled,
    } = self;
    const { animation, container, delay } = options;
    if (enabled) {
      if (isVisibleTip(tooltip, container) && animation) {
        self.hide();

        Timer.set(element, () => {
          toggleTooltipHandlers(self);
          Timer.clear(element, tooltipString);
        }, getElementTransitionDuration(tooltip) + delay + 17, tooltipString);
      } else {
        toggleTooltipHandlers(self);
      }
      self.enabled = !enabled;
    }
  }

  /** Toggles the `disabled` property. */
  toggleEnabled() {
    const self = this;
    if (!self.enabled) self.enable();
    else self.disable();
  }

  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const self = this;
    const { tooltip, options } = self;

    if (options.animation && isVisibleTip(tooltip, options.container)) {
      options.delay = 0; // reset delay
      self.hide();
      emulateTransitionEnd(tooltip, () => disposeTooltipComplete(self));
    } else {
      disposeTooltipComplete(self);
    }
    super.dispose();
  }
}

ObjectAssign(Tooltip, {
  selector: tooltipSelector,
  init: tooltipInitCallback,
  getInstance: getTooltipInstance,
  styleTip,
});
