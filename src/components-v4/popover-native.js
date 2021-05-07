/* Native JavaScript for Bootstrap 4 | Popover
---------------------------------------------- */
import mouseHoverEvents from 'shorter-js/src/strings/mouseHoverEvents.js';
import mouseClickEvents from 'shorter-js/src/strings/mouseClickEvents.js';
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v4.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';
import styleTip from '../util/styleTip-v4.js';

// POPOVER DEFINITION
// ==================

export default function Popover(elem, opsInput) {
  let element;
  // set instance options
  const options = opsInput || {};

  // bind
  const self = this;

  // popover and timer
  let popover = null;
  let timer = 0;
  const isIphone = /(iPhone|iPod|iPad)/.test(navigator.userAgent);
  // title and content
  let titleString;
  let contentString;
  let placementClass;

  // options
  const ops = {};

  // close btn for dissmissible popover
  let closeBtn;

  // custom events
  let showCustomEvent;
  let shownCustomEvent;
  let hideCustomEvent;
  let hiddenCustomEvent;

  // handlers
  function dismissibleHandler(e) {
    if (popover !== null && e.target === queryElement('.close', popover)) {
      self.hide();
    }
  }
  // private methods
  function getContents() {
    return {
      0: options.title || element.getAttribute('data-title') || null,
      1: options.content || element.getAttribute('data-content') || null,
    };
  }
  function removePopover() {
    ops.container.removeChild(popover);
    timer = null; popover = null;
  }

  function createPopover() {
    [titleString, contentString] = getContents();
    // fixing https://github.com/thednp/bootstrap.native/issues/233
    contentString = contentString ? contentString.trim() : null;

    popover = document.createElement('div');

    // popover arrow
    const popoverArrow = document.createElement('div');
    popoverArrow.classList.add('arrow');
    popover.appendChild(popoverArrow);

    // create the popover from data attributes
    if (contentString !== null && ops.template === null) {
      popover.setAttribute('role', 'tooltip');

      if (titleString !== null) {
        const popoverTitle = document.createElement('h3');
        popoverTitle.classList.add('popover-header');
        popoverTitle.innerHTML = ops.dismissible ? titleString + closeBtn : titleString;
        popover.appendChild(popoverTitle);
      }

      // set popover content
      const popoverBodyMarkup = document.createElement('div');
      popoverBodyMarkup.classList.add('popover-body');
      popoverBodyMarkup.innerHTML = ops.dismissible && titleString === null
        ? contentString + closeBtn
        : contentString;
      popover.appendChild(popoverBodyMarkup);
    } else { // or create the popover from template
      const popoverTemplate = document.createElement('div');
      popoverTemplate.innerHTML = ops.template.trim();
      popover.className = popoverTemplate.firstChild.className;
      popover.innerHTML = popoverTemplate.firstChild.innerHTML;

      const popoverHeader = queryElement('.popover-header', popover);
      const popoverBody = queryElement('.popover-body', popover);

      // fill the template with content from data attributes
      if (titleString && popoverHeader) popoverHeader.innerHTML = titleString.trim();
      if (contentString && popoverBody) popoverBody.innerHTML = contentString.trim();
    }

    // append to the container
    ops.container.appendChild(popover);
    popover.style.display = 'block';
    if (!popover.classList.contains('popover')) popover.classList.add('popover');
    if (!popover.classList.contains(ops.animation)) popover.classList.add(ops.animation);
    if (!popover.classList.contains(placementClass)) popover.classList.add(placementClass);
  }
  function showPopover() {
    if (!popover.classList.contains('show')) popover.classList.add('show');
  }
  function updatePopover() {
    styleTip(element, popover, ops.placement, ops.container);
  }
  function forceFocus() {
    if (popover === null) element.focus();
  }
  function toggleEvents(add) {
    const action = add ? 'addEventListener' : 'removeEventListener';
    if (ops.trigger === 'hover') {
      element[action](mouseClickEvents.down, self.show);
      element[action](mouseHoverEvents[0], self.show);
      // mouseHover = ('onmouseleave' in document)
      //   ? [ 'mouseenter', 'mouseleave']
      //   : [ 'mouseover', 'mouseout' ]
      if (!ops.dismissible) element[action](mouseHoverEvents[1], self.hide);
    } else if (ops.trigger === 'click') {
      element[action](ops.trigger, self.toggle);
    } else if (ops.trigger === 'focus') {
      if (isIphone) element[action]('click', forceFocus, false);
      element[action](ops.trigger, self.toggle);
    }
  }
  function touchHandler(e) {
    if ((popover && popover.contains(e.target))
      || e.target === element || element.contains(e.target)) {
      // smile
    } else {
      self.hide();
    }
  }
  // event toggle
  function dismissHandlerToggle(add) {
    const action = add ? 'addEventListener' : 'removeEventListener';
    if (ops.dismissible) {
      document[action]('click', dismissibleHandler, false);
    } else {
      if (ops.trigger === 'focus') element[action]('blur', self.hide);
      if (ops.trigger === 'hover') document[action]('touchstart', touchHandler, passiveHandler);
    }
    window[action]('resize', self.hide, passiveHandler);
  }
  // triggers
  function showTrigger() {
    dismissHandlerToggle(1);
    dispatchCustomEvent.call(element, shownCustomEvent);
  }
  function hideTrigger() {
    dismissHandlerToggle();
    removePopover();
    dispatchCustomEvent.call(element, hiddenCustomEvent);
  }

  // public methods / handlers
  self.toggle = () => {
    if (popover === null) self.show();
    else self.hide();
  };
  self.show = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (popover === null) {
        dispatchCustomEvent.call(element, showCustomEvent);
        if (showCustomEvent.defaultPrevented) return;

        createPopover();
        updatePopover();
        showPopover();
        if (ops.animation) emulateTransitionEnd(popover, showTrigger);
        else showTrigger();
      }
    }, 20);
  };
  self.hide = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (popover && popover !== null && popover.classList.contains('show')) {
        dispatchCustomEvent.call(element, hideCustomEvent);
        if (hideCustomEvent.defaultPrevented) return;
        popover.classList.remove('show');
        if (ops.animation) emulateTransitionEnd(popover, hideTrigger);
        else hideTrigger();
      }
    }, ops.delay);
  };
  self.dispose = () => {
    self.hide();
    toggleEvents();
    delete element.Popover;
  };

  // INIT
  // initialization element
  element = queryElement(elem);

  // reset on re-init
  if (element.Popover) element.Popover.dispose();

  // DATA API
  const triggerData = element.getAttribute('data-trigger'); // click / hover / focus
  const animationData = element.getAttribute('data-animation'); // true / false

  const placementData = element.getAttribute('data-placement');
  const dismissibleData = element.getAttribute('data-dismissible');
  const delayData = element.getAttribute('data-delay');
  const containerData = element.getAttribute('data-container');

  // close btn for dissmissible popover
  closeBtn = '<button type="button" class="close">×</button>';

  // custom events
  showCustomEvent = bootstrapCustomEvent('show', 'popover');
  shownCustomEvent = bootstrapCustomEvent('shown', 'popover');
  hideCustomEvent = bootstrapCustomEvent('hide', 'popover');
  hiddenCustomEvent = bootstrapCustomEvent('hidden', 'popover');

  // check container
  const containerElement = queryElement(options.container);
  const containerDataElement = queryElement(containerData);

  // maybe the element is inside a modal
  const modal = element.closest('.modal');

  // maybe the element is inside a fixed navbar
  const navbarFixedTop = element.closest('.fixed-top');
  const navbarFixedBottom = element.closest('.fixed-bottom');

  // set instance options
  ops.template = options.template ? options.template : null; // JavaScript only
  ops.trigger = options.trigger ? options.trigger : triggerData || 'hover';
  ops.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
  ops.placement = options.placement ? options.placement : placementData || 'top';
  ops.delay = parseInt((options.delay || delayData), 10) || 200;
  ops.dismissible = !!(options.dismissible || dismissibleData === 'true');
  ops.container = containerElement
    || (containerDataElement
      || (navbarFixedTop || (navbarFixedBottom || (modal || document.body))));

  placementClass = `bs-popover-${ops.placement}`;

  // invalidate
  [titleString, contentString] = getContents();

  if (!contentString && !ops.template) return;

  // init
  if (!element.Popover) { // prevent adding event handlers twice
    toggleEvents(1);
  }

  // associate target to init object
  element.Popover = self;
}
