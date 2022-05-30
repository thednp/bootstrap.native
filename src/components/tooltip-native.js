/* Native JavaScript for Bootstrap 5 | Tooltip
---------------------------------------------- */
import ariaDescribedBy from '@thednp/shorty/src/strings/ariaDescribedBy';
import mouseclickEvent from '@thednp/shorty/src/strings/mouseclickEvent';
import mousedownEvent from '@thednp/shorty/src/strings/mousedownEvent';
import mouseenterEvent from '@thednp/shorty/src/strings/mouseenterEvent';
import mouseleaveEvent from '@thednp/shorty/src/strings/mouseleaveEvent';
import mousemoveEvent from '@thednp/shorty/src/strings/mousemoveEvent';
import focusEvent from '@thednp/shorty/src/strings/focusEvent';
import focusinEvent from '@thednp/shorty/src/strings/focusinEvent';
import focusoutEvent from '@thednp/shorty/src/strings/focusoutEvent';
import mousehoverEvent from '@thednp/shorty/src/strings/mousehoverEvent';
import scrollEvent from '@thednp/shorty/src/strings/scrollEvent';
import resizeEvent from '@thednp/shorty/src/strings/resizeEvent';
import touchstartEvent from '@thednp/shorty/src/strings/touchstartEvent';
import hasAttribute from '@thednp/shorty/src/attr/hasAttribute';
import setAttribute from '@thednp/shorty/src/attr/setAttribute';
import getAttribute from '@thednp/shorty/src/attr/getAttribute';
import removeAttribute from '@thednp/shorty/src/attr/removeAttribute';
import getWindow from '@thednp/shorty/src/get/getWindow';
import getDocument from '@thednp/shorty/src/get/getDocument';
import getDocumentBody from '@thednp/shorty/src/get/getDocumentBody';
// import getElementTransitionDuration from '@thednp/shorty/src/get/getElementTransitionDuration';
import getElementStyle from '@thednp/shorty/src/get/getElementStyle';
import getUID from '@thednp/shorty/src/get/getUID';
import closest from '@thednp/shorty/src/selectors/closest';
import querySelector from '@thednp/shorty/src/selectors/querySelector';
import addClass from '@thednp/shorty/src/class/addClass';
import hasClass from '@thednp/shorty/src/class/hasClass';
import removeClass from '@thednp/shorty/src/class/removeClass';
import ObjectAssign from '@thednp/shorty/src/misc/ObjectAssign';
import { getInstance } from '@thednp/shorty/src/misc/data';
import isFunction from '@thednp/shorty/src/is/isFunction';
import isMedia from '@thednp/shorty/src/is/isMedia';
import isApple from '@thednp/shorty/src/boolean/isApple';
import dispatchEvent from '@thednp/shorty/src/misc/dispatchEvent';
import passiveHandler from '@thednp/shorty/src/misc/passiveHandler';
import emulateTransitionEnd from '@thednp/shorty/src/misc/emulateTransitionEnd';
import Timer from '@thednp/shorty/src/misc/timer';
import focus from '@thednp/shorty/src/misc/focus';
import OriginalEvent from '@thednp/shorty/src/misc/OriginalEvent';
import toLowerCase from '@thednp/shorty/src/misc/toLowerCase';

import { addListener, removeListener } from '@thednp/event-listener/src/event-listener';

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
 * @param {Function=} callback the parent dispose callback
 */
function disposeTooltipComplete(self, callback) {
  const { element } = self;
  toggleTooltipHandlers(self);

  /* istanbul ignore else */
  if (hasAttribute(element, dataOriginalTitle) && self.name === tooltipComponent) {
    toggleTooltipTitle(self);
  }
  /* istanbul ignore else */
  if (callback) callback();
}

/**
 * Toggles on/off the special `Tooltip` event listeners.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function toggleTooltipAction(self, add) {
  const action = add ? addListener : removeListener;
  const { element } = self;

  action(getDocument(element), touchstartEvent, self.handleTouch, passiveHandler);

  /* istanbul ignore else */
  if (!isMedia(element)) {
    [scrollEvent, resizeEvent].forEach((ev) => {
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
 * @param {Function=} callback the dispose callback
 */
function tooltipHiddenAction(self, callback) {
  const { element } = self;
  const hiddenTooltipEvent = OriginalEvent(`hidden.bs.${toLowerCase(self.name)}`);

  toggleTooltipAction(self);
  removeTooltip(self);
  dispatchEvent(element, hiddenTooltipEvent);
  if (isFunction(callback)) callback();
  Timer.clear(element, 'out');
}

/**
 * Toggles on/off the `Tooltip` event listeners.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function toggleTooltipHandlers(self, add) {
  const action = add ? addListener : removeListener;
  // btn is only for dismissible popover
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
    /* istanbul ignore else */
    if (elemIsMedia || tr === mousehoverEvent) {
      action(element, mousedownEvent, self.show);
      action(element, mouseenterEvent, self.show);

      /* istanbul ignore else */
      if (dismissible && btn) {
        action(btn, mouseclickEvent, self.hide);
      } else {
        action(element, mouseleaveEvent, self.hide);
        action(getDocument(element), touchstartEvent, self.handleTouch, passiveHandler);
      }
    } else if (tr === mouseclickEvent) {
      action(element, tr, (!dismissible ? self.toggle : self.show));
    } else if (tr === focusEvent) {
      action(element, focusinEvent, self.show);
      /* istanbul ignore else */
      if (!dismissible) action(element, focusoutEvent, self.hide);
      /* istanbul ignore else */
      if (isApple) {
        action(element, mouseclickEvent, () => focus(element));
      }
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
  const action = add ? addListener : removeListener;
  const { element, options, offsetParent } = self;
  const { container } = options;
  const { offsetHeight, scrollHeight } = container;
  const parentModal = closest(element, `.${modalString}`);
  const parentOffcanvas = closest(element, `.${offcanvasString}`);

  /* istanbul ignore else */
  if (!isMedia(element)) {
    const win = getWindow(element);
    const overflow = offsetHeight !== scrollHeight;
    const scrollTarget = overflow || offsetParent !== win ? container : win;
    action(win, resizeEvent, self.update, passiveHandler);
    action(scrollTarget, scrollEvent, self.update, passiveHandler);
  }

  // dismiss tooltips inside modal / offcanvas
  if (parentModal) action(parentModal, `hide.bs.${modalString}`, self.hide);
  if (parentOffcanvas) action(parentOffcanvas, `hide.bs.${offcanvasString}`, self.hide);
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
    (content || getAttribute(element, titleAtt[0])));
  removeAttribute(element, titleAtt[content ? 1 : 0]);
}

// TOOLTIP DEFINITION
// ==================
/** Creates a new `Tooltip` instance. */
export default class Tooltip extends BaseComponent {
  /**
   * @param {HTMLElement | string} target the target element
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

    /* istanbul ignore next: this is to set Popover too */
    getTooltipInstance = (elem) => getInstance(elem, tipComponent);

    // additional properties
    /** @type {any} */
    self.tooltip = {};
    if (!isTooltip) {
      /** @type {any?} */
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
    if ((!options.title && isTooltip) || (!isTooltip && !options.content)) {
      // throw Error(`${this.name} Error: target has no content set.`);
      return;
    }

    const container = querySelector(options.container, getDocument(element));
    const idealContainer = getElementContainer(element);

    // bypass container option when its position is static/relative
    self.options.container = !container || (container
      && ['static', 'relative'].includes(getElementStyle(container, 'position')))
      ? idealContainer
      : /* istanbul ignore next */container || getDocumentBody(element);

    // reset default options
    tooltipDefaults[titleAttr] = null;

    // all functions bind
    self.handleTouch = self.handleTouch.bind(self);
    self.update = self.update.bind(self);
    self.show = self.show.bind(self);
    self.hide = self.hide.bind(self);
    self.toggle = self.toggle.bind(self);

    // set title attributes and add event listeners
    /* istanbul ignore else */
    if (hasAttribute(element, titleAttr) && isTooltip) {
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
   */
  get name() { return tooltipComponent; }
  /**
   * Returns component default options.
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

        /* istanbul ignore else */
        if (!hasClass(tooltip, showClass)) addClass(tooltip, showClass);
        /* istanbul ignore else */
        if (animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(self));
        else tooltipShownAction(self);
      }, 17, 'in');
    }
  }

  /**
   * Hides the tooltip.
   *
   * @this {Tooltip} the Tooltip instance
   * @param {Function=} callback the dispose callback
   */
  hide(callback) {
    const self = this;
    const { options, tooltip, element } = self;
    const { container, animation, delay } = options;

    Timer.clear(element, 'in');

    /* istanbul ignore else */
    if (tooltip && isVisibleTip(tooltip, container)) {
      Timer.set(element, () => {
        const hideTooltipEvent = OriginalEvent(`hide.bs.${toLowerCase(self.name)}`);
        dispatchEvent(element, hideTooltipEvent);

        if (hideTooltipEvent.defaultPrevented) return;

        removeClass(tooltip, showClass);
        toggleTooltipOpenHandlers(self);

        /* istanbul ignore else */
        if (animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(self, callback));
        else tooltipHiddenAction(self, callback);
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
    /* istanbul ignore else */
    if (!enabled) {
      toggleTooltipHandlers(self, true);
      self.enabled = !enabled;
    }
  }

  /** Disables the tooltip. */
  disable() {
    const self = this;
    const {
      tooltip, options, enabled,
    } = self;
    const { animation, container } = options;
    /* istanbul ignore else */
    if (enabled) {
      if (isVisibleTip(tooltip, container) && animation) {
        self.hide(() => toggleTooltipHandlers(self));
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

  /**
   * Handles the `touchstart` event listener for `Tooltip`
   * @this {Tooltip}
   * @param {TouchEvent} e the `Event` object
   */
  handleTouch({ target }) {
    const { tooltip, element } = this;

    /* istanbul ignore next */
    if (tooltip.contains(target) || target === element
      || (target && element.contains(target))) {
      // smile for ESLint
    } else {
      this.hide();
    }
  }

  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const self = this;
    const { tooltip, options } = self;
    const callback = () => disposeTooltipComplete(self, () => super.dispose());

    if (options.animation && isVisibleTip(tooltip, options.container)) {
      self.options.delay = 0; // reset delay
      self.hide(callback);
    } else {
      callback();
    }
  }
}

ObjectAssign(Tooltip, {
  selector: tooltipSelector,
  init: tooltipInitCallback,
  getInstance: getTooltipInstance,
  styleTip,
});
