
/* Native JavaScript for Bootstrap 5 | Popover
---------------------------------------------- */
import mouseHoverEvents from 'shorter-js/src/strings/mouseHoverEvents.js'
import mouseClickEvents from 'shorter-js/src/strings/mouseClickEvents.js'
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'
import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'

import ariaDescribedBy from '../strings/ariaDescribedBy.js'
import showClass from '../strings/showClass.js'
import fadeClass from '../strings/fadeClass.js'
import dataBsToggle from '../strings/dataBsToggle.js'
// import dataBsContainer from '../strings/dataBsContainer.js'
// import dataBsContent from '../strings/dataBsContent.js'
// import dataBsPlacement from '../strings/dataBsPlacement.js'
// import dataBsTitle from '../strings/dataBsTitle.js'
// import dataBsAnimation from '../strings/dataBsAnimation.js'
// import dataBsDelay from '../strings/dataBsDelay.js'
import addEventListener from '../strings/addEventListener.js'
import removeEventListener from '../strings/removeEventListener.js'
import fixedTopClass from '../strings/fixedTopClass.js'
import fixedBottomClass from '../strings/fixedBottomClass.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import tipClassPositions from '../util/tipClassPositions.js'
import styleTip from '../util/styleTip-v5.js'
import isMedia from '../util/isMedia.js'
import getUID from '../util/getUID.js'
import normalizeOptions from '../util/normalizeOptions.js'
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js'


// POPOVER PRIVATE GC
// ==================
const popoverString = 'popover',
    popoverComponent = 'Popover',
    popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`,
    popoverDefaultOptions = {
      template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      title: null,
      content: null,
      sanitizeFn: null,
      dismissible: false,
      trigger: 'hover',
      animation: fadeClass,
      placement: 'top',
      delay: 200
    }


// POPOVER SCOPE
// =============
export default function Popover( popoverElement, popoverOptions ){

  // POPOVER PRIVATE GC
  // ==================
  const isIphone = /(iPhone|iPod|iPad)/.test(navigator.userAgent),
      // close btn for dissmissible popover
      popoverCloseButton = '<button type="button" class="btn-close"></button>',
      popoverArrowClass = `${popoverString}-arrow`,
      popoverHeaderClass = `${popoverString}-header`,
      popoverBodyClass = `${popoverString}-body`,

      // POPOVER CUSTOM EVENTS
      // =====================
      showPopoverEvent = bootstrapCustomEvent( `show.bs.${popoverString}` ),
      shownPopoverEvent = bootstrapCustomEvent( `shown.bs.${popoverString}` ),
      hidePopoverEvent = bootstrapCustomEvent( `hide.bs.${popoverString}` ),
      hiddenPopoverEvent = bootstrapCustomEvent( `hidden.bs.${popoverString}` )


  let self, 
      element,
      popoverID,
      placementClass,
      popover = null,
      ops = {},
      enabled = true,
      timer=  null


  // POPOVER EVENT HANDLERS
  // ======================
  function dismissiblePopoverHandler(e) {
    if ( popover !== null && e.target === queryElement( '.btn-close', popover ) ) {
      self.hide()
    }
  }

  function updatePopover(e) {
    popover && styleTip( element, popover, ops.placement, ops.container, e )
  }

  function popoverForceFocus() {
    popover === null && element.focus()
  }

  function popoverShowHandler() {
    popover === null && self.show()
  }

  function popoverHideHandler() {
    popover !== null && self.hide()
  }

  function popoverClickHandler() {
    self.toggle()
  }

  function popoverTouchHandler(e){
    const eventTarget = e.target

    if ( popover && popover.contains( eventTarget ) // popover includes touch target
      || eventTarget === element // OR touch target is element
      || element.contains( eventTarget ) ) // OR element includes touch target
    {
      // nothing to do
    } else {
      self.hide()
    }
  }


  // POPOVER PRIVATE METHODS
  // =======================
  function removePopover() {
    element.removeAttribute( ariaDescribedBy )
    ops.container.removeChild( popover )
    timer = null
    popover = null
  }

  function createPopover() {
    let titleString = ops.title,
        contentString = ops.content

    // fixing #233
    titleString = !!titleString ? titleString.trim() : null
    contentString = !!contentString ? contentString.trim() : null

    // sanitize title && content
    if ( ops.sanitizeFn ) {
      titleString = titleString ? ops.sanitizeFn( titleString ) : null
      contentString = contentString ? ops.sanitizeFn( contentString ) : null
    }    

    popover = document.createElement( 'div' )

    // set id and aria-describedby
    popover.setAttribute( 'id', popoverID )
    element.setAttribute( ariaDescribedBy, `#${popoverID}` )

    // load template
    const popoverTemplate = document.createElement( 'div' )
    popoverTemplate.innerHTML = ops.template.trim()
    popover.className = popoverTemplate.firstChild.className
    popover.innerHTML = popoverTemplate.firstChild.innerHTML

    const popoverHeader = queryElement( `.${popoverHeaderClass}`, popover ),
        popoverBody = queryElement( `.${popoverBodyClass}`, popover )

    // set dismissible button
    titleString = ops.dismissible && titleString ? titleString + popoverCloseButton : titleString
    contentString = ops.dismissible && titleString === null ? + popoverCloseButton : contentString

    // fill the template with content from data attributes
    titleString && popoverHeader && ( popoverHeader.innerHTML = titleString.trim() )
    contentString && popoverBody && ( popoverBody.innerHTML = contentString.trim() )

    //append to the container
    ops.container.appendChild( popover )
    popover.style.display = 'block'
    // set popover animation and placement 
    !hasClass( popover, popoverString ) && addClass( popover, popoverString )
    !hasClass( popover, ops.animation ) && addClass( popover, ops.animation )
    !hasClass( popover, placementClass ) && addClass( popover, placementClass )
  }

  function showPopover() {
    !hasClass( popover, showClass ) && ( addClass( popover, showClass ) )
  }

  function togglePopoverHandlers( action ) {
    action = action ? addEventListener : removeEventListener

    if ( 'hover' === ops.trigger ) {
      element[action]( mouseClickEvents.down, popoverShowHandler )
      element[action]( mouseHoverEvents[0], popoverShowHandler )
      isMedia(element) && element[action]( 'mousemove', updatePopover, passiveHandler )
      !ops.dismissible && element[action]( mouseHoverEvents[1], popoverHideHandler ) // mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ]
    } else if ( 'click' === ops.trigger ) {
      element[action]( ops.trigger, popoverClickHandler )
    } else if ( 'focus' === ops.trigger ) {
      isIphone && element[action]( 'click', popoverForceFocus )
      element[action]( 'focusin', popoverShowHandler )
    }
  }

  function dismissHandlerToggle( action ) {
    action = action ? addEventListener : removeEventListener

    if ( ops.dismissible ) {
      document[action]( 'click', dismissiblePopoverHandler )
    } else {
      'focus' === ops.trigger && element[action]( 'focusout', popoverHideHandler )
      'hover' === ops.trigger && document[action]( 'touchstart', popoverTouchHandler, passiveHandler )
    }

    if ( !isMedia(element) ) {
      window[action]( 'scroll', updatePopover, passiveHandler )
      window[action]( 'resize', updatePopover, passiveHandler )
    }
  }

  function popoverShowTrigger() {
    dismissHandlerToggle( 1 )
    element.dispatchEvent( shownPopoverEvent )
  }
  function popoverHideTrigger(e) {
    dismissHandlerToggle()
    removePopover()
    element.dispatchEvent( hiddenPopoverEvent )
  }


  // POPOVER DEFINITION
  // ==================
  class Popover {
    constructor( target, options ){

      // bind
      self = this

      // set instance options
      options = options || {}

      // initialization element
      element = queryElement( target )

      // reset previous instance
      element[popoverComponent] && element[popoverComponent].dispose()

      // maybe the element is inside a modal
      const modal = element.closest( '.modal' ),

          // OR maybe the element is inside a fixed navbar
          navbarFixed = element.closest( `.${fixedTopClass}` ) 
                     || element.closest( `.${fixedBottomClass}` )

      // set default container option appropriate for the context
      popoverDefaultOptions.container = modal || navbarFixed || document.body

      // set instance options
      ops = normalizeOptions( element, popoverDefaultOptions, options )

      // invalidate when no content is set
      if ( !ops.content ) return

      // set default popover class
      placementClass = `bs-${popoverString}-${tipClassPositions[ops.placement]}`
      // set unique ID for aria-describedby
      popoverID = `${popoverString}-${element.id || getUID( element )}`

      // attach event listeners
      togglePopoverHandlers( 1 )

      // associate target to init object
      element[popoverComponent] = self
    }
  }


  // POPOVER PUBLIC METHODS
  // ======================
  const PopoverProto = Popover.prototype

  PopoverProto.toggle = function() {
    popover === null ? self.show() : self.hide()
  }

  PopoverProto.show = function() {
    clearTimeout( timer )

    timer = setTimeout( () => {
      if ( popover === null ) {
        element.dispatchEvent( showPopoverEvent )
        if ( showPopoverEvent.defaultPrevented ) return

        createPopover()
        updatePopover()
        showPopover()

        ops.animation ? emulateTransitionEnd( popover, popoverShowTrigger )
          : popoverShowTrigger()
      }
    }, 17 )
  }

  PopoverProto.hide = function() {
    clearTimeout( timer )

    timer = setTimeout( () => {
      if (popover && popover !== null && hasClass( popover, showClass )) {
        element.dispatchEvent( hidePopoverEvent )
        if ( hidePopoverEvent.defaultPrevented ) return

        removeClass( popover, showClass )

        ops.animation ? emulateTransitionEnd( popover, popoverHideTrigger  ) 
          : popoverHideTrigger()
      }
    }, ops.delay + 50 )
  }

  PopoverProto.enable = function() {
    if ( !enabled ) {
      togglePopoverHandlers(1)
      enabled = !enabled
    }
  }

  PopoverProto.disable = function() {
    if ( enabled ) {
      if ( popover !== null && ops.animation ) {
        self.hide()

        setTimeout(
          togglePopoverHandlers, 
          getElementTransitionDuration( popover ) + ops.delay + 17 )
      } else {
        togglePopoverHandlers()
      }
      enabled = !enabled
    }
  }

  PopoverProto.toggleEnabled = function() {
    !enabled ? self.enable() : self.disable()
  }

  PopoverProto.dispose = function() {
    self.hide()

    togglePopoverHandlers()

    delete element[popoverComponent]
  }

  return new Popover( popoverElement, popoverOptions )
}


export const popoverInit = {
  component: popoverComponent,
  selector: popoverSelector,
  constructor: Popover
}

