/* Native JavaScript for Bootstrap 5 | Tooltip
---------------------------------------------- */
import setAttribute from 'shorter-js/src/attr/setAttribute';
import getAttribute from 'shorter-js/src/attr/getAttribute';
import removeAttribute from 'shorter-js/src/attr/removeAttribute';
import getDocumentBody from 'shorter-js/src/get/getDocumentBody';
import getElementTransitionDuration from 'shorter-js/src/get/getElementTransitionDuration';
import getElementStyle from 'shorter-js/src/get/getElementStyle';
import dispatchEvent from 'shorter-js/src/misc/dispatchEvent';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import querySelector from 'shorter-js/src/selectors/querySelector';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import on from 'shorter-js/src/event/on';
import off from 'shorter-js/src/event/off';
import ariaDescribedBy from 'shorter-js/src/strings/ariaDescribedBy';
import mousedownEvent from 'shorter-js/src/strings/mousedownEvent';
import mouseenterEvent from 'shorter-js/src/strings/mouseenterEvent';
import mouseleaveEvent from 'shorter-js/src/strings/mouseleaveEvent';
import mousemoveEvent from 'shorter-js/src/strings/mousemoveEvent';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import { getInstance } from 'shorter-js/src/misc/data';
import isMedia from 'shorter-js/src/is/isMedia';
import isRTL from 'shorter-js/src/is/isRTL';
import Timer from 'shorter-js/src/misc/timer';
import getUID from 'shorter-js/src/misc/getUID';

import scrollEvent from 'shorter-js/src/strings/scrollEvent';
import resizeEvent from 'shorter-js/src/strings/resizeEvent';
import getWindow from 'shorter-js/src/get/getWindow';
import getDocument from 'shorter-js/src/get/getDocument';
import touchstartEvent from 'shorter-js/src/strings/touchstartEvent';
import dataBsToggle from '../strings/dataBsToggle';
import dataOriginalTitle from '../strings/dataOriginalTitle';
import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import tipClassPositions from '../util/tipClassPositions';
import styleTip from '../util/styleTip';
import isVisibleTip from '../util/isVisibleTip';
import getElementContainer from '../util/getElementContainer';
import setHtml from '../util/setHtml';
import BaseComponent from './base-component';

// TOOLTIP PRIVATE GC
// ==================
const tooltipString = 'tooltip';
const tooltipComponent = 'Tooltip';
const tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`;
const titleAttr = 'title';
const tooltipInnerClass = `${tooltipString}-inner`;

const tooltipDefaults = {
  /** @type {string} */
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  /** @type {string?} */
  title: null, // string
  /** @type {string?} */
  customClass: null, // string | null
  /** @type {string?} */
  placement: 'top', // string
  /** @type {ReturnType<string>?} */
  sanitizeFn: null, // function
  /** @type {boolean} */
  animation: true, // bool
  /** @type {number} */
  delay: 200, // number
  /** @type {(HTMLElement | Element)?} */
  container: null,
};

/**
 * Static method which returns an existing `Tooltip` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Tooltip>}
 */
const getTooltipInstance = (element) => getInstance(element, tooltipComponent);

/**
 * A `Tooltip` initialization callback.
 * @type {BSN.InitCallback<Tooltip>}
 */
const tooltipInitCallback = (element) => new Tooltip(element);

// TOOLTIP CUSTOM EVENTS
// =====================
const showTooltipEvent = bootstrapCustomEvent(`show.bs.${tooltipString}`);
const shownTooltipEvent = bootstrapCustomEvent(`shown.bs.${tooltipString}`);
const hideTooltipEvent = bootstrapCustomEvent(`hide.bs.${tooltipString}`);
const hiddenTooltipEvent = bootstrapCustomEvent(`hidden.bs.${tooltipString}`);

// TOOLTIP PRIVATE METHODS
// =======================
/**
 * Creates a new tooltip.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function createTooltip(self) {
  const { element, options, id } = self;
  const {
    title, template, customClass, animation, placement, sanitizeFn,
  } = options;
  const tipPositions = { ...tipClassPositions };
  // update RTL languages
  if (isRTL(element)) {
    tipPositions.left = 'end';
    tipPositions.right = 'start';
  }
  const placementClass = `bs-${tooltipString}-${tipPositions[placement]}`;

  if (!title) return;

  // load template
  /** @type {(HTMLElement | Element)?} */
  let tooltipTemplate;
  if ([Element, HTMLElement].some((x) => template instanceof x)) {
    tooltipTemplate = template;
  } else {
    const htmlMarkup = getDocument(element).createElement('div');
    setHtml(htmlMarkup, template, sanitizeFn);
    tooltipTemplate = htmlMarkup.firstElementChild;
  }

  self.tooltip = tooltipTemplate && tooltipTemplate.cloneNode(true);

  const { tooltip } = self;
  const tooltipInner = querySelector(`.${tooltipInnerClass}`, tooltip);

  if (tooltipInner) setHtml(tooltipInner, title, sanitizeFn);
  // set id & role attribute
  setAttribute(tooltip, 'id', id);
  setAttribute(tooltip, 'role', tooltipString);
  self.arrow = querySelector(`.${tooltipString}-arrow`, tooltip);

  if (!hasClass(tooltip, tooltipString)) addClass(tooltip, tooltipString);
  if (animation && !hasClass(tooltip, fadeClass)) addClass(tooltip, fadeClass);
  if (customClass && !hasClass(tooltip, customClass)) addClass(tooltip, customClass);
  if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
}

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

  if (element.hasAttribute(dataOriginalTitle)) toggleTooltipTitle(self);
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
  const { element } = self;

  // @ts-ignore
  if (isMedia(element)) action(element, mousemoveEvent, self.update, passiveHandler);
  action(element, mousedownEvent, self.show);
  action(element, mouseenterEvent, self.show);
  action(element, mouseleaveEvent, self.hide);
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
    // initialization element
    /** @type {(HTMLElement | Element)?} */
    const element = querySelector(target);
    tooltipDefaults[titleAttr] = element && getAttribute(element, titleAttr);
    super(target, config);

    // bind
    const self = this;
    if (!element) return;

    // additional properties
    /** @type {any} */
    self.tooltip = {};
    /** @type {(HTMLElement | Element)?} */
    self.arrow = null;
    /** @type {any} */
    self.offsetParent = {};
    /** @type {boolean} */
    self.enabled = true;
    /**
     * Set unique ID for `aria-describedby`.
     * @type {string}
     */
    self.id = `${tooltipString}-${getUID(element, tooltipString)}`;

    // instance options
    const { options } = self;
    // invalidate
    if (!options.title) return;

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

    // set title attributes and add event listeners
    if (element.hasAttribute(titleAttr)) toggleTooltipTitle(self, options.title);

    // create tooltip here
    createTooltip(self);

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
    // @ts-ignore
    const self = e ? getTooltipInstance(this) : this;
    if (!self) return;
    const {
      options, tooltip, element, id,
    } = self;
    const { container, animation } = options;
    const outTimer = Timer.get(element, 'out');

    Timer.clear(element, 'out');

    if (tooltip && !outTimer && !isVisibleTip(tooltip, container)) {
      const showCallback = () => {
        dispatchEvent(element, showTooltipEvent);
        if (showTooltipEvent.defaultPrevented) return;

        // append to container
        container.append(tooltip);
        setAttribute(element, ariaDescribedBy, `#${id}`);

        // offsetParent might change?
        self.offsetParent = getElementContainer(tooltip, true);

        self.update(e);

        if (!hasClass(tooltip, showClass)) addClass(tooltip, showClass);
        if (animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(self));
        else tooltipShownAction(self);
      };
      Timer.set(element, showCallback, 17, 'in');
    }
  }

  /**
   * Hides the tooltip.
   *
   * @param {Event=} e the `Event` object
   * @this {Tooltip}
   */
  hide(e) {
    // @ts-ignore
    const self = e ? getTooltipInstance(this) : this;
    if (!self) return;
    const { options, tooltip, element } = self;
    const { container, animation, delay } = options;

    Timer.clear(element, 'in');

    if (tooltip && isVisibleTip(tooltip, container)) {
      const hideCallback = () => {
        dispatchEvent(element, hideTooltipEvent);
        if (hideTooltipEvent.defaultPrevented) return;

        // @ts-ignore
        removeClass(tooltip, showClass);
        if (animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(self));
        else tooltipHiddenAction(self);
      };
      Timer.set(element, hideCallback, delay + 17, 'out');
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
   * @param {Event?} e the `Event` object
   * @this {Tooltip} the instance
   */
  toggle(e) {
    // @ts-ignore
    const self = e ? getTooltipInstance(this) : this;
    if (!self) return;
    const { tooltip, options } = self;

    if (!isVisibleTip(tooltip, options.container)) self.show();
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
      if (!isVisibleTip(tooltip, container) && animation) {
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
