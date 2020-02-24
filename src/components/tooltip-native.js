
/* Native JavaScript for Bootstrap 4 | Tooltip
---------------------------------------------- */
import { hasClass, addClass, removeClass } from '../util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off, mouseHover, mouseEvents, touchEvents, passiveHandler } from '../util/event.js';
import { queryElement } from '../util/selector.js';
import { emulateTransitionEnd } from '../util/transition.js';
import { componentInit, styleTip } from '../util/misc.js';

// TOOLTIP DEFINITION
// ==================

export default function Tooltip(element,options) {

  // set options
  options = options || {};

  // bind
  let self = this,

      // tooltip, timer, and title
      tooltip = null, timer = 0, titleString,

      // DATA API
      animationData,
      placementData,
      delayData,
      containerData,

      // custom events
      showCustomEvent,
      shownCustomEvent,
      hideCustomEvent,
      hiddenCustomEvent,

      // check container
      containerElement,
      containerDataElement,

      // maybe the element is inside a modal
      modal,

      // maybe the element is inside a fixed navbar
      navbarFixedTop,
      navbarFixedBottom,
      placementClass;

  // private methods
  function getTitle() {
    return element.getAttribute('title')
        || element.getAttribute('data-title')
        || element.getAttribute('data-original-title')
  }
  function removeToolTip() {
    self.options.container.removeChild(tooltip);
    tooltip = null; timer = null;
  }
  function createToolTip() {
    titleString = getTitle(); // read the title again
    if ( titleString ) { // invalidate, maybe markup changed
      // create tooltip
      tooltip = document.createElement('div');

      // set markup
      if (self.options.template) {
        const tooltipMarkup = document.createElement('div');
        tooltipMarkup.innerHTML = self.options.template.trim();

        tooltip.className = tooltipMarkup.firstChild.className;
        tooltip.innerHTML = tooltipMarkup.firstChild.innerHTML;

        queryElement('.tooltip-inner',tooltip).innerHTML = titleString.trim();
      } else {
        // tooltip arrow
        const tooltipArrow = document.createElement('div');
        addClass(tooltipArrow,'arrow');
        tooltip.appendChild(tooltipArrow);
        // tooltip inner
        const tooltipInner = document.createElement('div');
        addClass(tooltipInner,'tooltip-inner');
        tooltip.appendChild(tooltipInner);
        tooltipInner.innerHTML = titleString;
      }
      // reset position
      tooltip.style.left = '0';
      tooltip.style.top = '0';
      // set class and role attribute
      tooltip.setAttribute('role','tooltip');
      !hasClass(tooltip, 'tooltip') && addClass(tooltip, 'tooltip');
      !hasClass(tooltip, self.options.animation) && addClass(tooltip, self.options.animation);
      !hasClass(tooltip, placementClass) && addClass(tooltip, placementClass);
      // append to container
      self.options.container.appendChild(tooltip);
    }
  }
  function updateTooltip() {
    styleTip(element, tooltip, self.options.placement, self.options.container);
  }
  function showTooltip() {
    !hasClass(tooltip,'show') && ( addClass(tooltip,'show') );
  }
  function touchHandler(e){
    if ( tooltip && tooltip.contains(e.target) || e.target === element || element.contains(e.target)) {
      // smile
    } else {
      self.hide()
    }
  }
  // triggers
  function showAction() {
    on( document, touchEvents.start, touchHandler, passiveHandler );
    on( window, 'resize', self.hide, passiveHandler );
    dispatchCustomEvent.call(element, shownCustomEvent);
  }
  function hideAction() {
    off( document, touchEvents.start, touchHandler, passiveHandler );
    off( window, 'resize', self.hide, passiveHandler );
    removeToolTip();
    dispatchCustomEvent.call(element, hiddenCustomEvent);
  }
  function toggleEvents(action) {
    action(element, mouseEvents.down, self.show);
    action(element, mouseHover[0], self.show);
    action(element, mouseHover[1], self.hide);
  }

  // public methods
  self.show = () => {
    clearTimeout(timer);
    timer = setTimeout( () => {
      if (tooltip === null) {
        dispatchCustomEvent.call(element, showCustomEvent);
        if (showCustomEvent.defaultPrevented) return;
        // if(createToolTip() == false) return;
        if(createToolTip() !== false) {
          updateTooltip();
          showTooltip();
          !!self.options.animation ? emulateTransitionEnd(tooltip, showAction) : showAction();
        }
      }
    }, 20 );
  };
  self.hide = () => {
    clearTimeout(timer);
    timer = setTimeout( () => {
      if (tooltip && hasClass(tooltip,'show')) {
        dispatchCustomEvent.call(element, hideCustomEvent);
        if (hideCustomEvent.defaultPrevented) return;
        removeClass(tooltip,'show');
        !!self.options.animation ? emulateTransitionEnd(tooltip, hideAction) : hideAction();
      }
    }, self.options.delay);
  };
  self.toggle = () => {
    if (!tooltip) { self.show(); }
    else { self.hide(); }
  };
  self.dispose = () => {
    toggleEvents(off);
    self.hide();
    element.setAttribute('title', element.getAttribute('data-original-title'));
    element.removeAttribute('data-original-title');
    delete element.Tooltip;
  };

  // init
  componentInit(()=>{
    // initialization element
    element = queryElement(element);

    // reset on re-init
    element.Tooltip && element.Tooltip.dispose();

    // DATA API
    animationData = element.getAttribute('data-animation')
    placementData = element.getAttribute('data-placement')
    delayData = element.getAttribute('data-delay')
    containerData = element.getAttribute('data-container')

    // custom events
    showCustomEvent = bootstrapCustomEvent('show', 'tooltip')
    shownCustomEvent = bootstrapCustomEvent('shown', 'tooltip')
    hideCustomEvent = bootstrapCustomEvent('hide', 'tooltip')
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'tooltip')

    // check container
    containerElement = queryElement(options.container)
    containerDataElement = queryElement(containerData)

    // maybe the element is inside a modal
    modal = element.closest('.modal')

    // maybe the element is inside a fixed navbar
    navbarFixedTop = element.closest('.fixed-top')
    navbarFixedBottom = element.closest('.fixed-bottom')

    // set instance options
    self.options = {};
    self.options.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
    self.options.placement = options.placement ? options.placement : placementData || 'top';
    self.options.template = options.template ? options.template : null; // JavaScript only
    self.options.delay = parseInt(options.delay || delayData) || 200;
    self.options.container = containerElement ? containerElement
                           : containerDataElement ? containerDataElement
                           : navbarFixedTop ? navbarFixedTop
                           : navbarFixedBottom ? navbarFixedBottom
                           : modal ? modal : document.body;

    // set placement class
    placementClass = `bs-tooltip-${self.options.placement}`

    // set tooltip content
    titleString = getTitle();

    // invalidate
    if ( !titleString ) return;

    // prevent adding event handlers twice
    if (!element.Tooltip) {
      element.setAttribute('data-original-title',titleString);
      element.removeAttribute('title');
      toggleEvents(on);
    }

    // associate target to init object
    self.element = element;
    element.Tooltip = self;
  })

}
