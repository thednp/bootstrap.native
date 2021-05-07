/* Native JavaScript for Bootstrap 4 | Tooltip
---------------------------------------------- */
import mouseHoverEvents from 'shorter-js/src/strings/mouseHoverEvents.js';
import mouseClickEvents from 'shorter-js/src/strings/mouseClickEvents.js';
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v4.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';
import styleTip from '../util/styleTip-v4.js';

// TOOLTIP DEFINITION
// ==================

export default function Tooltip(elem, opsInput) {
  let element;
  // set options
  const options = opsInput || {};

  // bind
  const self = this;

  // tooltip, timer, and title
  let tooltip = null;
  let timer = 0;
  let titleString;
  let placementClass;

  // custom events
  let showCustomEvent;
  let shownCustomEvent;
  let hideCustomEvent;
  let hiddenCustomEvent;

  const ops = {};

  // private methods
  function getTitle() {
    return element.getAttribute('title')
        || element.getAttribute('data-title')
        || element.getAttribute('data-original-title');
  }
  function removeToolTip() {
    ops.container.removeChild(tooltip);
    tooltip = null; timer = null;
  }
  function createToolTip() {
    titleString = getTitle(); // read the title again
    if (titleString) { // invalidate, maybe markup changed
      // create tooltip
      tooltip = document.createElement('div');

      // set markup
      if (ops.template) {
        const tooltipMarkup = document.createElement('div');
        tooltipMarkup.innerHTML = ops.template.trim();

        tooltip.className = tooltipMarkup.firstChild.className;
        tooltip.innerHTML = tooltipMarkup.firstChild.innerHTML;

        queryElement('.tooltip-inner', tooltip).innerHTML = titleString.trim();
      } else {
        // tooltip arrow
        const tooltipArrow = document.createElement('div');
        tooltipArrow.classList.add('arrow');
        tooltip.appendChild(tooltipArrow);
        // tooltip inner
        const tooltipInner = document.createElement('div');
        tooltipInner.classList.add('tooltip-inner');
        tooltip.appendChild(tooltipInner);
        tooltipInner.innerHTML = titleString;
      }
      // reset position
      tooltip.style.left = '0';
      tooltip.style.top = '0';
      // set class and role attribute
      tooltip.setAttribute('role', 'tooltip');
      if (!tooltip.classList.contains('tooltip')) tooltip.classList.add('tooltip');
      if (!tooltip.classList.contains(ops.animation)) tooltip.classList.add(ops.animation);
      if (!tooltip.classList.contains(placementClass)) tooltip.classList.add(placementClass);
      // append to container
      ops.container.appendChild(tooltip);
    }
  }
  function updateTooltip() {
    styleTip(element, tooltip, ops.placement, ops.container);
  }
  function showTooltip() {
    if (!tooltip.classList.contains('show')) tooltip.classList.add('show');
  }
  function touchHandler(e) {
    if ((tooltip && tooltip.contains(e.target))
      || e.target === element || element.contains(e.target)) {
      // smile
    } else {
      self.hide();
    }
  }
  // triggers
  function toggleAction(add) {
    const action = add ? 'addEventListener' : 'removeEventListener';
    document[action]('touchstart', touchHandler, passiveHandler);
    window[action]('resize', self.hide, passiveHandler);
  }
  function showAction() {
    toggleAction(1);
    dispatchCustomEvent.call(element, shownCustomEvent);
  }
  function hideAction() {
    toggleAction();
    removeToolTip();
    dispatchCustomEvent.call(element, hiddenCustomEvent);
  }
  function toggleEvents(add) {
    const action = add ? 'addEventListener' : 'removeEventListener';
    element[action](mouseClickEvents.down, self.show, false);
    element[action](mouseHoverEvents[0], self.show, false);
    element[action](mouseHoverEvents[1], self.hide, false);
  }

  // public methods
  self.show = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (tooltip === null) {
        dispatchCustomEvent.call(element, showCustomEvent);
        if (showCustomEvent.defaultPrevented) return;
        // if(createToolTip() == false) return;
        if (createToolTip() !== false) {
          updateTooltip();
          showTooltip();
          if (ops.animation) emulateTransitionEnd(tooltip, showAction);
          else showAction();
        }
      }
    }, 20);
  };
  self.hide = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (tooltip && tooltip.classList.contains('show')) {
        dispatchCustomEvent.call(element, hideCustomEvent);
        if (hideCustomEvent.defaultPrevented) return;
        tooltip.classList.remove('show');
        if (ops.animation) emulateTransitionEnd(tooltip, hideAction);
        else hideAction();
      }
    }, ops.delay);
  };
  self.toggle = () => {
    if (!tooltip) self.show();
    else self.hide();
  };
  self.dispose = () => {
    toggleEvents();
    self.hide();
    element.setAttribute('title', element.getAttribute('data-original-title'));
    element.removeAttribute('data-original-title');
    delete element.Tooltip;
  };

  // init
  // initialization element
  element = queryElement(elem);

  // reset on re-init
  if (element.Tooltip) element.Tooltip.dispose();

  // DATA API
  const animationData = element.getAttribute('data-animation');
  const placementData = element.getAttribute('data-placement');
  const delayData = element.getAttribute('data-delay');
  const containerData = element.getAttribute('data-container');

  // check container
  const containerElement = queryElement(options.container);
  const containerDataElement = queryElement(containerData);

  // maybe the element is inside a modal
  const modal = element.closest('.modal');

  // custom events
  showCustomEvent = bootstrapCustomEvent('show', 'tooltip');
  shownCustomEvent = bootstrapCustomEvent('shown', 'tooltip');
  hideCustomEvent = bootstrapCustomEvent('hide', 'tooltip');
  hiddenCustomEvent = bootstrapCustomEvent('hidden', 'tooltip');

  // maybe the element is inside a fixed navbar
  const navbarFixedTop = element.closest('.fixed-top');
  const navbarFixedBottom = element.closest('.fixed-bottom');

  // set instance options
  ops.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
  ops.placement = options.placement ? options.placement : placementData || 'top';
  ops.template = options.template ? options.template : null; // JavaScript only
  ops.delay = parseInt((options.delay || delayData), 10) || 200;
  ops.container = containerElement
    || (containerDataElement
      || (navbarFixedTop || (navbarFixedBottom || (modal || document.body))));

  // set placement class
  placementClass = `bs-tooltip-${ops.placement}`;

  // set tooltip content
  titleString = getTitle();

  // invalidate
  if (!titleString) return;

  // prevent adding event handlers twice
  if (!element.Tooltip) {
    element.setAttribute('data-original-title', titleString);
    element.removeAttribute('title');
    toggleEvents(1);
  }

  // associate target to init object
  element.Tooltip = self;
}
