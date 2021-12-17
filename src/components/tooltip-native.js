/* Native JavaScript for Bootstrap 5 | Tooltip
---------------------------------------------- */
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
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
import dataOriginalTitle from '../strings/dataOriginalTitle';
import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import tipClassPositions from '../util/tipClassPositions';
import styleTip from '../util/styleTip';
import isVisibleTip from '../util/isVisibleTip';
import getUID from '../util/getUID';
import getTipContainer from '../util/getTipContainer';
import closestRelative from '../util/closestRelative';
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
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  title: null, // string
  customClass: null, // string | null
  placement: 'top', // string
  sanitizeFn: null, // function
  animation: true, // bool
  delay: 200, // number
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
  const { options, id } = self;
  const {
    title, template, customClass, animation, placement, sanitizeFn,
  } = options;
  const placementClass = `bs-${tooltipString}-${tipClassPositions[placement]}`;

  if (!title) return;

  // load template
  let tooltipTemplate;
  if (typeof template === 'object') {
    tooltipTemplate = template;
  } else {
    const htmlMarkup = document.createElement('div');
    setHtml(htmlMarkup, template, sanitizeFn);
    tooltipTemplate = htmlMarkup.firstChild;
  }

  // create tooltip
  // @ts-ignore
  self.tooltip = tooltipTemplate.cloneNode(true);
  // @ts-ignore
  const { tooltip } = self;
  // set title
  // @ts-ignore
  setHtml(queryElement(`.${tooltipInnerClass}`, tooltip), title, sanitizeFn);
  // set id & role attribute
  // @ts-ignore
  tooltip.setAttribute('id', id);
  // @ts-ignore
  tooltip.setAttribute('role', tooltipString);
  // set arrow
  // @ts-ignore
  self.arrow = queryElement(`.${tooltipString}-arrow`, tooltip);

  // set classes
  // @ts-ignore
  if (!hasClass(tooltip, tooltipString)) addClass(tooltip, tooltipString);
  // @ts-ignore
  if (animation && !hasClass(tooltip, fadeClass)) addClass(tooltip, fadeClass);
  // @ts-ignore
  if (customClass && !hasClass(tooltip, customClass)) {
    // @ts-ignore
    addClass(tooltip, customClass);
  }
  // @ts-ignore
  if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
}

/**
 * Removes the tooltip from the DOM.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function removeTooltip(self) {
  // @ts-ignore
  const { element, tooltip } = self;
  element.removeAttribute(ariaDescribedBy);
  // @ts-ignore
  tooltip.remove();
  // @ts-ignore
  self.timer = null;
}

/**
 * Executes after the instance has been disposed.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function disposeTooltipComplete(self) {
  const { element } = self;
  toggleTooltipHandlers(self);
  // @ts-ignore
  if (element.hasAttribute(dataOriginalTitle)) toggleTooltipTitle(self);
}

/**
 * Toggles on/off the special `Tooltip` event listeners.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function toggleTooltipAction(self, add) {
  const action = add ? addEventListener : removeEventListener;

  // @ts-ignore
  document[action]('touchstart', tooltipTouchHandler, passiveHandler);

  if (!isMedia(self.element)) {
    // @ts-ignore
    window[action]('scroll', self.update, passiveHandler);
    // @ts-ignore
    window[action]('resize', self.update, passiveHandler);
  }
}

/**
 * Executes after the tooltip was shown to the user.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function tooltipShownAction(self) {
  toggleTooltipAction(self, true);
  self.element.dispatchEvent(shownTooltipEvent);
}

/**
 * Executes after the tooltip was hidden to the user.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function tooltipHiddenAction(self) {
  toggleTooltipAction(self);
  removeTooltip(self);
  self.element.dispatchEvent(hiddenTooltipEvent);
}

/**
 * Toggles on/off the `Tooltip` event listeners.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function toggleTooltipHandlers(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { element } = self;

  // @ts-ignore
  if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
  // @ts-ignore
  element[action]('mousedown', self.show);
  // @ts-ignore
  element[action]('mouseenter', self.show);
  // @ts-ignore
  element[action]('mouseleave', self.hide);
}

/**
 * Toggles the `title` and `data-original-title` attributes.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {string} content when `true`, event listeners are added
 */
function toggleTooltipTitle(self, content) {
  // [0 - add, 1 - remove] | [0 - remove, 1 - add]
  const titleAtt = [dataOriginalTitle, titleAttr];
  const { element } = self;

  element.setAttribute(titleAtt[content ? 0 : 1],
    // @ts-ignore
    (content || element.getAttribute(titleAtt[0])));
  element.removeAttribute(titleAtt[content ? 1 : 0]);
}

// TOOLTIP EVENT HANDLERS
// ======================
/**
 * Handles the `touchstart` event listener for `Tooltip`
 * @this {Tooltip}
 * @param {{target: Element}} e the `Event` object
 */
function tooltipTouchHandler({ target }) {
  // @ts-ignore
  const { tooltip, element } = this;
  // @ts-ignore
  if (tooltip.contains(target) || target === element || element.contains(target)) {
    // smile for ESLint
  } else {
    // @ts-ignore
    this.hide();
  }
}

// TOOLTIP DEFINITION
// ==================
/** Creates a new `Tooltip` instance. */
export default class Tooltip extends BaseComponent {
  /**
   * @param {Element | string} target the target element
   * @param {BSN.Options.Tooltip=} config the instance options
   */
  constructor(target, config) {
    // initialization element
    const element = queryElement(target);
    // @ts-ignore
    tooltipDefaults[titleAttr] = element.getAttribute(titleAttr);
    // @ts-ignore
    tooltipDefaults.container = getTipContainer(element);
    super(target, config);

    // bind
    const self = this;

    // additional properties
    /** @private @type {Element?} */
    self.tooltip = null;
    /** @private @type {Element?} */
    self.arrow = null;
    /** @private @type {number?} */
    self.timer = null;
    /** @private @type {boolean} */
    self.enabled = true;

    // instance options
    const { options } = self;

    // media elements only work with body as a container
    self.options.container = isMedia(element)
      ? tooltipDefaults.container
      : queryElement(options.container);

    // reset default options
    tooltipDefaults.container = null;
    tooltipDefaults[titleAttr] = null;

    // invalidate
    if (!options.title) return;

    // all functions bind
    tooltipTouchHandler.bind(self);
    self.update = self.update.bind(self);

    // set title attributes and add event listeners
    // @ts-ignore
    if (element.hasAttribute(titleAttr)) toggleTooltipTitle(self, options.title);

    // create tooltip here
    // @ts-ignore
    self.id = `${tooltipString}-${getUID(element)}`;
    createTooltip(self);

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
   * @param {Event?} e the `Event` object
   */
  show(e) {
    // @ts-ignore
    const self = e ? getTooltipInstance(this) : this;
    const {
      options, tooltip, element, id,
    } = self;
    const {
      container, animation,
    } = options;
    // @ts-ignore
    clearTimeout(self.timer);
    if (!isVisibleTip(tooltip, container)) {
      element.dispatchEvent(showTooltipEvent);
      if (showTooltipEvent.defaultPrevented) return;

      // append to container
      container.append(tooltip);
      element.setAttribute(ariaDescribedBy, id);

      self.update(e);
      // @ts-ignore
      if (!hasClass(tooltip, showClass)) addClass(tooltip, showClass);
      // @ts-ignore
      if (animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(self));
      else tooltipShownAction(self);
    }
  }

  /**
   * Hides the tooltip.
   *
   * @param {Event?} e the `Event` object
   */
  hide(e) {
    // @ts-ignore
    const self = e ? getTooltipInstance(this) : this;
    const { options, tooltip, element } = self;

    // @ts-ignore
    clearTimeout(self.timer);
    // @ts-ignore
    self.timer = setTimeout(() => {
      if (isVisibleTip(tooltip, options.container)) {
        element.dispatchEvent(hideTooltipEvent);
        if (hideTooltipEvent.defaultPrevented) return;

        // @ts-ignore
        removeClass(tooltip, showClass);
        // @ts-ignore
        if (options.animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(self));
        else tooltipHiddenAction(self);
      }
    }, options.delay);
  }

  /**
   * Updates the tooltip position.
   *
   * @param {Event?} e the `Event` object
   */
  update(e) {
    // @ts-ignore
    styleTip(this, e);
  }

  /**
   * Toggles the tooltip visibility.
   *
   * @param {Event?} e the `Event` object
   */
  toggle(e) {
    // @ts-ignore
    const self = e ? getTooltipInstance(this) : this;
    const { tooltip, options } = self;
    // @ts-ignore
    if (!isVisibleTip(tooltip, options.container)) self.show();
    // @ts-ignore
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
    const { tooltip, options, enabled } = self;
    if (enabled) {
      if (!isVisibleTip(tooltip, options.container) && options.animation) {
        // @ts-ignore
        self.hide();

        setTimeout(
          () => toggleTooltipHandlers(self),
          // @ts-ignore
          getElementTransitionDuration(tooltip) + options.delay + 17,
        );
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
      // @ts-ignore
      self.hide();
      // @ts-ignore
      emulateTransitionEnd(tooltip, () => disposeTooltipComplete(self));
    } else {
      disposeTooltipComplete(self);
    }
    super.dispose();
  }
}

Object.assign(Tooltip, {
  selector: tooltipSelector,
  init: tooltipInitCallback,
  getInstance: getTooltipInstance,
});
