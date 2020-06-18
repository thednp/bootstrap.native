
/* Native JavaScript for Bootstrap 4 | Popover
---------------------------------------------- */
import mouseHoverEvents from 'shorter-js/src/strings/mouseHoverEvents.js';
import mouseClickEvents from 'shorter-js/src/strings/mouseClickEvents.js';
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';
import styleTip from '../util/styleTip.js';

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
      contentString,
      // options
      ops = {};

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
    ops.container.removeChild(popover);
    timer = null; popover = null;
  }

  function createPopover() {
    titleString = getContents()[0] || null;
    contentString = getContents()[1];
    // fixing https://github.com/thednp/bootstrap.native/issues/233
    contentString = !!contentString ? contentString.trim() : null;

    popover = document.createElement('div');

    // popover arrow
    let popoverArrow = document.createElement('div');
    popoverArrow.classList.add('arrow');
    popover.appendChild(popoverArrow);

    if ( contentString !== null && ops.template === null ) { //create the popover from data attributes

      popover.setAttribute('role','tooltip');

      if (titleString !== null) {
        let popoverTitle = document.createElement('h3');
        popoverTitle.classList.add('popover-header');
        popoverTitle.innerHTML = ops.dismissible ? titleString + closeBtn : titleString;
        popover.appendChild(popoverTitle);
      }

      //set popover content
      let popoverBodyMarkup = document.createElement('div');
      popoverBodyMarkup.classList.add('popover-body');
      popoverBodyMarkup.innerHTML = ops.dismissible && titleString === null ? contentString + closeBtn : contentString;
      popover.appendChild(popoverBodyMarkup);

    } else {  // or create the popover from template
      let popoverTemplate = document.createElement('div');
      popoverTemplate.innerHTML = ops.template.trim();
      popover.className = popoverTemplate.firstChild.className;
      popover.innerHTML = popoverTemplate.firstChild.innerHTML;

      let popoverHeader = queryElement('.popover-header',popover),
          popoverBody = queryElement('.popover-body',popover);

      // fill the template with content from data attributes
      titleString && popoverHeader && (popoverHeader.innerHTML = titleString.trim());
      contentString && popoverBody && (popoverBody.innerHTML = contentString.trim());
    }

    //append to the container
    ops.container.appendChild(popover);
    popover.style.display = 'block';
    !popover.classList.contains( 'popover') && popover.classList.add('popover');
    !popover.classList.contains( ops.animation) && popover.classList.add(ops.animation);
    !popover.classList.contains( placementClass) && popover.classList.add(placementClass);
  }
  function showPopover() {
    !popover.classList.contains('show') && ( popover.classList.add('show') );
  }
  function updatePopover() {
    styleTip(element, popover, ops.placement, ops.container);
  }
  function forceFocus () {
    if (popover === null) { element.focus(); }
  }
  function toggleEvents(action) {
    action = action ? 'addEventListener' : 'removeEventListener';
    if (ops.trigger === 'hover') {
      element[action]( mouseClickEvents.down, self.show );
      element[action]( mouseHoverEvents[0], self.show );
      if (!ops.dismissible) { element[action]( mouseHoverEvents[1], self.hide ); } // mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ]
    } else if ('click' == ops.trigger) {
      element[action]( ops.trigger, self.toggle );
    } else if ('focus' == ops.trigger) {
      isIphone && element[action]( 'click', forceFocus, false );
      element[action]( ops.trigger, self.toggle );
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
    action = action ? 'addEventListener' : 'removeEventListener';
    if (ops.dismissible) {
      document[action]('click', dismissibleHandler, false );
    } else {
      'focus' == ops.trigger && element[action]( 'blur', self.hide );
      'hover' == ops.trigger && document[action]( 'touchstart', touchHandler, passiveHandler );
    }
    window[action]('resize', self.hide, passiveHandler );
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
        !!ops.animation ? emulateTransitionEnd(popover, showTrigger) : showTrigger();
      }
    }, 20 );
  };
  self.hide = () => {
    clearTimeout(timer);
    timer = setTimeout( () => {
      if (popover && popover !== null && popover.classList.contains('show')) {
        dispatchCustomEvent.call(element, hideCustomEvent);
        if ( hideCustomEvent.defaultPrevented ) return;
        popover.classList.remove('show');
        !!ops.animation ? emulateTransitionEnd(popover, hideTrigger) : hideTrigger();
      }
    }, ops.delay );
  };
  self.dispose = () => {
    self.hide();
    toggleEvents();
    delete element.Popover;
  };

  // INIT
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
  ops.template = options.template ? options.template : null; // JavaScript only
  ops.trigger = options.trigger ? options.trigger : triggerData || 'hover';
  ops.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
  ops.placement = options.placement ? options.placement : placementData || 'top';
  ops.delay = parseInt(options.delay || delayData) || 200;
  ops.dismissible = options.dismissible || dismissibleData === 'true' ? true : false;
  ops.container = containerElement ? containerElement
                          : containerDataElement ? containerDataElement
                          : navbarFixedTop ? navbarFixedTop
                          : navbarFixedBottom ? navbarFixedBottom
                          : modal ? modal : document.body;

  placementClass = `bs-popover-${ops.placement}`


  // invalidate
  let popoverContents = getContents()
  titleString = popoverContents[0];
  contentString = popoverContents[1];

  if ( !contentString && !ops.template ) return;

  // init
  if ( !element.Popover ) { // prevent adding event handlers twice
    toggleEvents(1);
  }

  // associate target to init object
  element.Popover = self;

}

