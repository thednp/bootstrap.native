
/* Native JavaScript for Bootstrap 4 | Popover
---------------------------------------------- */
import { hasClass, addClass, removeClass } from '../util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off, mouseHover, mouseEvents, touchEvents, passiveHandler } from '../util/event.js';
import { queryElement } from '../util/selector.js';
import { emulateTransitionEnd } from '../util/transition.js';
import { componentInit, styleTip } from '../util/misc.js';

// POPOVER DEFINITION
// ==================

export default function Popover(element,options) {

  // set instance options
  options = options || {};

  // bind
  let self = this

  // popover and timer
  let popover = null,
      timer = 0,
      isIphone = /(iPhone|iPod|iPad)/.test(navigator.userAgent),
      // title and content
      titleString,
      contentString;

  // DATA API
  let triggerData, // click / hover / focus
      animationData, // true / false

      placementData,
      dismissibleData,
      delayData,
      containerData,

      // close btn for dissmissible popover
      closeBtn,

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

  // handlers
  function dismissibleHandler(e) {
    if (popover !== null && e.target === queryElement('.close',popover)) {
      self.hide();
    }
  }
  // private methods
  function getContents() {
    return {
      0 : options.title || element.getAttribute('data-title') || null,
      1 : options.content || element.getAttribute('data-content') || null
    }
  }
  function removePopover() {
    self.options.container.removeChild(popover);
    timer = null; popover = null;
  }

  function createPopover() {
    titleString = getContents()[0] || null;
    contentString = getContents()[1];
    // fixing https://github.com/thednp/bootstrap.native/issues/233
    contentString = !!contentString ? contentString.trim() : null;

    popover = document.createElement('div');

    // popover arrow
    const popoverArrow = document.createElement('div');
    addClass(popoverArrow,'arrow');
    popover.appendChild(popoverArrow);

    if ( contentString !== null && self.options.template === null ) { //create the popover from data attributes

      popover.setAttribute('role','tooltip');

      if (titleString !== null) {
        const popoverTitle = document.createElement('h3');
        addClass(popoverTitle,'popover-header');
        popoverTitle.innerHTML = self.options.dismissible ? titleString + closeBtn : titleString;
        popover.appendChild(popoverTitle);
      }

      //set popover content
      const popoverBodyMarkup = document.createElement('div');
      addClass(popoverBodyMarkup,'popover-body');
      popoverBodyMarkup.innerHTML = self.options.dismissible && titleString === null ? contentString + closeBtn : contentString;
      popover.appendChild(popoverBodyMarkup);

    } else {  // or create the popover from template
      const popoverTemplate = document.createElement('div');
      popoverTemplate.innerHTML = self.options.template.trim();
      popover.className = popoverTemplate.firstChild.className;
      popover.innerHTML = popoverTemplate.firstChild.innerHTML;

      const popoverHeader = queryElement('.popover-header',popover),
            popoverBody = queryElement('.popover-body',popover);

      // fill the template with content from data attributes
      titleString && popoverHeader && (popoverHeader.innerHTML = titleString.trim());
      contentString && popoverBody && (popoverBody.innerHTML = contentString.trim());
    }

    //append to the container
    self.options.container.appendChild(popover);
    popover.style.display = 'block';
    !hasClass(popover, 'popover') && addClass(popover, 'popover');
    !hasClass(popover, self.options.animation) && addClass(popover, self.options.animation);
    !hasClass(popover, placementClass) && addClass(popover, placementClass);
  }
  function showPopover() {
    !hasClass(popover,'show') && ( addClass(popover,'show') );
  }
  function updatePopover() {
    styleTip(element, popover, self.options.placement, self.options.container);
  }
  function provideFocus () {
    if (popover === null) { element.focus(); }
  }
  function toggleEvents(action) {
    if (self.options.trigger === 'hover') {
      action( element, mouseEvents.down, self.show );
      action( element, mouseHover[0], self.show );
      if (!self.options.dismissible) { action( element, mouseHover[1], self.hide ); } // export const mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ]
    } else if ('click' == self.options.trigger) {
      action( element, self.options.trigger, self.toggle );
    } else if ('focus' == self.options.trigger) {
      isIphone && action( element, 'click', provideFocus );
      action( element, self.options.trigger, self.toggle );
    }
  }
  function touchHandler(e){
    if ( popover && popover.contains(e.target) || e.target === element || element.contains(e.target)) {
      // smile
    } else {
      self.hide()
    }
  }
  // event toggle
  function dismissHandlerToggle(action) {
    if (self.options.dismissible) {
      action( document, 'click', dismissibleHandler );
    } else {
      'focus' == self.options.trigger && action( element, 'blur', self.hide );
      'hover' == self.options.trigger && action( document, touchEvents.start, touchHandler, passiveHandler );
    }
    action( window, 'resize', self.hide, passiveHandler );
  }
  // triggers
  function showTrigger() {
    dismissHandlerToggle(on);
    dispatchCustomEvent.call(element, shownCustomEvent);
  }
  function hideTrigger() {
    dismissHandlerToggle(off);
    removePopover();
    dispatchCustomEvent.call(element, hiddenCustomEvent);
  }

  // public methods / handlers
  self.toggle = () => {
    if (popover === null) { self.show(); }
    else { self.hide(); }
  };
  self.show = () => {
    clearTimeout(timer);
    timer = setTimeout( () => {
      if (popover === null) {
        dispatchCustomEvent.call(element, showCustomEvent);
        if ( showCustomEvent.defaultPrevented ) return;

        createPopover();
        updatePopover();
        showPopover();
        !!self.options.animation ? emulateTransitionEnd(popover, showTrigger) : showTrigger();
      }
    }, 20 );
  };
  self.hide = () => {
    clearTimeout(timer);
    timer = setTimeout( () => {
      if (popover && popover !== null && hasClass(popover,'show')) {
        dispatchCustomEvent.call(element, hideCustomEvent);
        if ( hideCustomEvent.defaultPrevented ) return;
        removeClass(popover,'show');
        !!self.options.animation ? emulateTransitionEnd(popover, hideTrigger) : hideTrigger();
      }
    }, self.options.delay );
  };
  self.dispose = () => {
    self.hide();
    toggleEvents(off);
    delete element.Popover;
  };

  componentInit(()=>{

    // initialization element
    element = queryElement(element)

    // reset on re-init
    element.Popover && element.Popover.dispose()

    // DATA API
    triggerData = element.getAttribute('data-trigger') // click / hover / focus
    animationData = element.getAttribute('data-animation') // true / false

    placementData = element.getAttribute('data-placement')
    dismissibleData = element.getAttribute('data-dismissible')
    delayData = element.getAttribute('data-delay')
    containerData = element.getAttribute('data-container')

    // close btn for dissmissible popover
    closeBtn = '<button type="button" class="close">×</button>'

    // custom events
    showCustomEvent = bootstrapCustomEvent('show', 'popover')
    shownCustomEvent = bootstrapCustomEvent('shown', 'popover')
    hideCustomEvent = bootstrapCustomEvent('hide', 'popover')
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'popover')

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
    self.options.template = options.template ? options.template : null; // JavaScript only
    self.options.trigger = options.trigger ? options.trigger : triggerData || 'hover';
    self.options.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
    self.options.placement = options.placement ? options.placement : placementData || 'top';
    self.options.delay = parseInt(options.delay || delayData) || 200;
    self.options.dismissible = options.dismissible || dismissibleData === 'true' ? true : false;
    self.options.container = containerElement ? containerElement
                           : containerDataElement ? containerDataElement
                           : navbarFixedTop ? navbarFixedTop
                           : navbarFixedBottom ? navbarFixedBottom
                           : modal ? modal : document.body;

    placementClass = `bs-popover-${self.options.placement}`


    // invalidate
    let popoverContents = getContents()
    titleString = popoverContents[0];
    contentString = popoverContents[1];

    if ( !contentString && !self.options.template ) return;

    // init
    if ( !element.Popover ) { // prevent adding event handlers twice
      toggleEvents(on);
    }

    // associate target to init object
    self.element = element;
    element.Popover = self;

  })

}
