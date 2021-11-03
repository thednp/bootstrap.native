/* Native JavaScript for Bootstrap 5 | Tooltip
---------------------------------------------- */
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js';
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import addClass from 'shorter-js/src/class/addClass.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';

import ariaDescribedBy from '../strings/ariaDescribedBy.js';
import dataBsToggle from '../strings/dataBsToggle.js';
import dataOriginalTitle from '../strings/dataOriginalTitle.js';
import fadeClass from '../strings/fadeClass.js';
import showClass from '../strings/showClass.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import tipClassPositions from '../util/tipClassPositions.js';
import styleTip from '../util/styleTip.js';
import isVisibleTip from '../util/isVisibleTip.js';
import isMedia from '../util/isMedia.js';
import getUID from '../util/getUID.js';
import getTipContainer from '../util/getTipContainer.js';
import closestRelative from '../util/closestRelative.js';
import setHtml from '../util/setHtml.js';
import BaseComponent from './base-component.js';

// TOOLTIP PRIVATE GC
// ==================
const tooltipString = 'tooltip';
const tooltipComponent = 'Tooltip';
const tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`;

const titleAttr = 'title';
const tooltipInnerClass = `${tooltipString}-inner`;
const tooltipDefaultOptions = {
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  title: null, // string
  customClass: null, // string | null
  placement: 'top', // string
  sanitizeFn: null, // function
  animation: true, // bool
  html: false, // bool
  delay: 200, // number
};

// TOOLTIP CUSTOM EVENTS
// =====================
const showTooltipEvent = bootstrapCustomEvent(`show.bs.${tooltipString}`);
const shownTooltipEvent = bootstrapCustomEvent(`shown.bs.${tooltipString}`);
const hideTooltipEvent = bootstrapCustomEvent(`hide.bs.${tooltipString}`);
const hiddenTooltipEvent = bootstrapCustomEvent(`hidden.bs.${tooltipString}`);

// TOOLTIP PRIVATE METHODS
// =======================
function createTooltip(self) {
  const { options, id } = self;
  const {
    title, template, customClass, animation, placement, sanitizeFn,
  } = options;
  const placementClass = `bs-${tooltipString}-${tipClassPositions[placement]}`;

  if (!title) return;

  // create tooltip
  self.tooltip = document.createElement('div');
  const { tooltip } = self;

  // set aria
  tooltip.setAttribute('id', id);
  // set role attribute
  tooltip.setAttribute('role', tooltipString);

  // set markup
  const tooltipMarkup = document.createElement('div');
  tooltipMarkup.innerHTML = template.trim();

  // fill content
  tooltip.className = tooltipMarkup.firstChild.className;
  tooltip.innerHTML = tooltipMarkup.firstChild.innerHTML;
  setHtml(queryElement(`.${tooltipInnerClass}`, tooltip), title, sanitizeFn);

  // set arrow
  self.arrow = queryElement(`.${tooltipString}-arrow`, tooltip);

  // set classes
  if (!hasClass(tooltip, tooltipString)) addClass(tooltip, tooltipString);
  if (animation && !hasClass(tooltip, fadeClass)) addClass(tooltip, fadeClass);
  if (customClass && !hasClass(tooltip, customClass)) {
    addClass(tooltip, customClass);
  }
  if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
}

function removeTooltip(self) {
  const { element, tooltip } = self;
  element.removeAttribute(ariaDescribedBy);
  tooltip.remove();
  self.timer = null;
}

function disposeTooltipComplete(self) {
  const { element } = self;
  toggleTooltipHandlers(self);
  if (element.hasAttribute(dataOriginalTitle)) toggleTooltipTitle(self);
}
function toggleTooltipAction(self, add) {
  const action = add ? addEventListener : removeEventListener;

  document[action]('touchstart', tooltipTouchHandler, passiveHandler);

  if (!isMedia(self.element)) {
    window[action]('scroll', self.update, passiveHandler);
    window[action]('resize', self.update, passiveHandler);
  }
}
function tooltipShownAction(self) {
  toggleTooltipAction(self, 1);
  self.element.dispatchEvent(shownTooltipEvent);
}
function tooltipHiddenAction(self) {
  toggleTooltipAction(self);
  removeTooltip(self);
  self.element.dispatchEvent(hiddenTooltipEvent);
}
function toggleTooltipHandlers(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { element } = self;

  if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
  element[action]('mousedown', self.show);
  element[action]('mouseenter', self.show);
  element[action]('mouseleave', self.hide);
}

function toggleTooltipTitle(self, content) {
  // [0 - add, 1 - remove] | [0 - remove, 1 - add]
  const titleAtt = [dataOriginalTitle, titleAttr];
  const { element } = self;

  element.setAttribute(titleAtt[content ? 0 : 1],
    (content || element.getAttribute(titleAtt[0])));
  element.removeAttribute(titleAtt[content ? 1 : 0]);
}

// TOOLTIP EVENT HANDLERS
// ======================
function tooltipTouchHandler({ target }) {
  const { tooltip, element } = this;
  if (tooltip.contains(target) || target === element || element.contains(target)) {
    // smile
  } else {
    this.hide();
  }
}

// TOOLTIP DEFINITION
// ==================
export default class Tooltip extends BaseComponent {
  constructor(target, config) {
    // initialization element
    const element = queryElement(target);
    tooltipDefaultOptions.title = element.getAttribute(titleAttr);
    tooltipDefaultOptions.container = getTipContainer(element);
    super(tooltipComponent, element, tooltipDefaultOptions, config);

    // bind
    const self = this;

    // additional properties
    self.tooltip = null;
    self.arrow = null;
    self.timer = null;
    self.enabled = false;

    // instance options
    const { options } = self;

    // media elements only work with body as a container
    self.options.container = isMedia(element)
      ? tooltipDefaultOptions.container
      : queryElement(options.container);

    // reset default options
    tooltipDefaultOptions.container = null;
    tooltipDefaultOptions[titleAttr] = null;

    // invalidate
    if (!options.title) return;

    // all functions bind
    tooltipTouchHandler.bind(self);
    self.update = self.update.bind(self);

    // set title attributes and add event listeners
    if (element.hasAttribute(titleAttr)) toggleTooltipTitle(self, options.title);

    // create tooltip here
    self.id = `${tooltipString}-${getUID(element)}`;
    createTooltip(self);

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

    // attach events
    toggleTooltipHandlers(self, 1);
  }

  // TOOLTIP PUBLIC METHODS
  // ======================
  show(e) {
    const self = e ? this[tooltipComponent] : this;
    const {
      options, tooltip, element, id,
    } = self;
    const {
      container, animation,
    } = options;
    clearTimeout(self.timer);
    if (!isVisibleTip(tooltip, container)) {
      element.dispatchEvent(showTooltipEvent);
      if (showTooltipEvent.defaultPrevented) return;

      // append to container
      container.append(tooltip);
      element.setAttribute(ariaDescribedBy, id);

      self.update(e);
      if (!hasClass(tooltip, showClass)) addClass(tooltip, showClass);
      if (animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(self));
      else tooltipShownAction(self);
    }
  }

  hide(e) {
    const self = e ? this[tooltipComponent] : this;
    const { options, tooltip, element } = self;

    clearTimeout(self.timer);
    self.timer = setTimeout(() => {
      if (isVisibleTip(tooltip, options.container)) {
        element.dispatchEvent(hideTooltipEvent);
        if (hideTooltipEvent.defaultPrevented) return;

        removeClass(tooltip, showClass);
        if (options.animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(self));
        else tooltipHiddenAction(self);
      }
    }, options.delay);
  }

  update(e) {
    styleTip(this, e);
  }

  toggle() {
    const self = this;
    const { tooltip, options } = self;
    if (!isVisibleTip(tooltip, options.container)) self.show();
    else self.hide();
  }

  enable() {
    const self = this;
    const { enabled } = self;
    if (!enabled) {
      toggleTooltipHandlers(self, 1);
      self.enabled = !enabled;
    }
  }

  disable() {
    const self = this;
    const { tooltip, options, enabled } = self;
    if (enabled) {
      if (!isVisibleTip(tooltip, options.container) && options.animation) {
        self.hide();

        setTimeout(
          () => toggleTooltipHandlers(self),
          getElementTransitionDuration(tooltip) + options.delay + 17,
        );
      } else {
        toggleTooltipHandlers(self);
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
    const { tooltip, options } = self;

    if (options.animation && isVisibleTip(tooltip, options.container)) {
      options.delay = 0; // reset delay
      self.hide();
      emulateTransitionEnd(tooltip, () => disposeTooltipComplete(self));
    } else {
      disposeTooltipComplete(self);
    }
    super.dispose(tooltipComponent);
  }
}

Tooltip.init = {
  component: tooltipComponent,
  selector: tooltipSelector,
  constructor: Tooltip,
};
