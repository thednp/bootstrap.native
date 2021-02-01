
/* Native JavaScript for Bootstrap 5 | Tooltip
---------------------------------------------- */
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js'
import mouseHoverEvents from 'shorter-js/src/strings/mouseHoverEvents.js'
import mouseClickEvents from 'shorter-js/src/strings/mouseClickEvents.js'
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'
import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'

import ariaDescribedBy from '../strings/ariaDescribedBy.js'
// import dataBsAnimation from '../strings/dataBsAnimation.js'
// import dataBsContainer from '../strings/dataBsContainer.js'
// import dataBsDelay from '../strings/dataBsDelay.js'
// import dataBsPlacement from '../strings/dataBsPlacement.js'
// import dataBsTitle from '../strings/dataBsTitle.js'
import dataBsToggle from '../strings/dataBsToggle.js'
import dataOriginalTitle from '../strings/dataOriginalTitle.js'
import fadeClass from '../strings/fadeClass.js'
import showClass from '../strings/showClass.js'
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

// TOOLTIP PRIVATE GC
// ==================
const tooltipString = 'tooltip',
    tooltipComponent = 'Tooltip',
    tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`


export default function Tooltip( tooltipElement, tooltipOptions ){

  // TOOLTIP PRIVATE GC
  // ==================
  const titleAttr = 'title',
      // tooltipArrowClass = `${tooltipString}-arrow`,
      tooltipInnerClass = `${tooltipString}-inner`,
      tooltipDefaultOptions = {
        title: null,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        placement: 'top',
        animation: fadeClass,
        delay: 200,
        sanitizeFn: null
      },
  
      // TOOLTIP CUSTOM EVENTS
      // =====================
      showTooltipEvent = bootstrapCustomEvent( `show.bs.${tooltipString}` ),
      shownTooltipEvent = bootstrapCustomEvent( `shown.bs.${tooltipString}` ),
      hideTooltipEvent = bootstrapCustomEvent( `hide.bs.${tooltipString}` ),
      hiddenTooltipEvent = bootstrapCustomEvent( `hidden.bs.${tooltipString}` )
  
  let self,
      element,
      tooltipID,
      tooltip = null,
      timer = null,
      enabled = true,
      placementClass,
      ops = {}


  // TOOLTIP PRIVATE METHODS
  // ======================= 
  function removeTooltip() {  
    element.removeAttribute( ariaDescribedBy )
    ops.container.removeChild( tooltip )
    tooltip = null
    timer = null
  }
  
  function createTooltip() {  
    let titleString = ops.title.trim() // read the title again
  
    // sanitize title
    titleString = ops.sanitizeFn ? ops.sanitizeFn( titleString ) : titleString
  
    if ( !titleString ) return // invalidate, maybe markup changed
  
    // create tooltip
    tooltip = document.createElement( 'div' )
    // set aria
    tooltip.setAttribute( 'id', tooltipID)
    element.setAttribute( ariaDescribedBy, `#${tooltipID}`)
  
    // set markup

    let tooltipMarkup = document.createElement( 'div' )
    tooltipMarkup.innerHTML = ops.template.trim()

    tooltip.className = tooltipMarkup.firstChild.className
    tooltip.innerHTML = tooltipMarkup.firstChild.innerHTML

    queryElement( `.${tooltipInnerClass}`, tooltip ).innerHTML = titleString

    // reset position
    tooltip.style.left = '0'
    tooltip.style.top = '0'
    // set class and role attribute
    tooltip.setAttribute('role', tooltipString )
    !hasClass( tooltip, tooltipString ) && addClass( tooltip, tooltipString )
    !hasClass( tooltip, ops.animation ) && addClass( tooltip, ops.animation )
    !hasClass( tooltip, placementClass ) && addClass( tooltip, placementClass )
  
    // append to container
    ops.container.appendChild( tooltip )
  }
  
  function updateTooltip(e) { 
    tooltip && styleTip( element, tooltip, ops.placement, ops.container, e )
  }
  
  function showTooltip() {
    !hasClass( tooltip, showClass ) && addClass( tooltip, showClass )
  }
  
  function tooltipTouchHandler(e){
    const eventTarget = e.target
  
    if ( tooltip && tooltip.contains( eventTarget ) || eventTarget === element || element.contains( eventTarget ) ) {
      // smile
    } else {
      self.hide()
    }
  }
  
  function openTooltipHandler(){
    self.show()
  }
  
  function closeTooltipHandler(){
    self.hide()
  }
  
  function toggleTooltipAction( action ){
    action = action ? addEventListener : removeEventListener

    document[action]( 'touchstart', tooltipTouchHandler, passiveHandler )
  
    if ( !isMedia( element ) ) {
      window[action]( 'scroll', updateTooltip, passiveHandler )
      window[action]( 'resize', updateTooltip, passiveHandler )
    }
  }
  
  function tooltipShownAction() {
    toggleTooltipAction( 1 )
    element.dispatchEvent( shownTooltipEvent )
  }
  
  function tooltipHiddenAction() {
    toggleTooltipAction()
    removeTooltip()
    element.dispatchEvent( hiddenTooltipEvent )
  }
  
  function toggleTooltipHandlers( action ) {
    action = action ? addEventListener : removeEventListener
  
    isMedia(element) && element[action]( 'mousemove', updateTooltip, passiveHandler )
    element[action]( mouseClickEvents.down, openTooltipHandler )
    element[action]( mouseHoverEvents[0], openTooltipHandler )
    element[action]( mouseHoverEvents[1], closeTooltipHandler )
  }
  
  function toggleTooltipTitle( content ){
    const titleAtt = [ dataOriginalTitle, titleAttr ] // [0 - add, 1 - remove] | [0 - remove, 1 - add]
  
    element.setAttribute( titleAtt[ content ? 0 : 1 ], 
      ( content ? content : element.getAttribute( titleAtt[0] ) ) )
    element.removeAttribute( titleAtt[ content ? 1 : 0 ] )
  }
  
  
  // TOOLTIP DEFINITION
  // ==================
  class Tooltip {
    constructor( target, options ) {
  
      // bind
      self = this

      // set options
      options = options || {}
    
      // initialization element
      element = queryElement( target )
    
      // set private properties unique ID key
      element[tooltipComponent] && element[tooltipComponent].dispose()
    
      // maybe the element is inside a modal
      const modal = element.closest( '.modal' ),
  
          // maybe the element is inside a fixed navbar
          navbarFixed = element.closest( `.${fixedTopClass}` ) || element.closest( `.${fixedBottomClass}` )

      // set the element's title as the default title to validate
      tooltipDefaultOptions.title = element.getAttribute( titleAttr )
      // set default container option appropriate for the context
      tooltipDefaultOptions.container = modal || navbarFixed || document.body

      // set instance options
      ops = normalizeOptions( element, tooltipDefaultOptions, options )

      // invalidate
      if ( !ops.title ) return

      tooltipID = `${tooltipString}-${element.id || getUID( element )}`
      placementClass = `bs-${tooltipString}-${tipClassPositions[ops.placement]}`
    
      // set title attributes and add event listeners
      element.hasAttribute( titleAttr ) && toggleTooltipTitle( ops.title );
  
      toggleTooltipHandlers( 1 )
    
      // associate target to init object
      element[tooltipComponent] = self
    }
  }
  
  
  // TOOLTIP PRIVATE METHODS
  // =======================
  const TooltipProto = Tooltip.prototype
  
  TooltipProto.show = function() {
  
    clearTimeout( timer )
    timer = setTimeout( () => {
      if ( tooltip === null ) {
        element.dispatchEvent( showTooltipEvent)
        if ( showTooltipEvent.defaultPrevented ) return
  
        if ( createTooltip() !== false ) {
          updateTooltip()
          showTooltip()
          ops.animation ? emulateTransitionEnd( tooltip, tooltipShownAction ) 
            : tooltipShownAction()
        }
      }
    }, 20 )
  }
  
  TooltipProto.hide = function() {
  
    clearTimeout( timer )
    timer = setTimeout( () => {
      if (tooltip && hasClass( tooltip, showClass )) {
        element.dispatchEvent( hideTooltipEvent )
        if ( hideTooltipEvent.defaultPrevented ) return
  
        removeClass( tooltip, showClass )
        !!ops.animation ? emulateTransitionEnd( tooltip, tooltipHiddenAction ) 
          : tooltipHiddenAction()
      }
    }, ops.delay )
  }
  
  TooltipProto.toggle = function() {
    tooltip === null ? self.show() : self.hide()
  }

  TooltipProto.enable = function() {
    if ( !enabled ) {
      toggleTooltipHandlers(1)
      enabled = !enabled
    }
  }

  TooltipProto.disable = function() {
    if ( enabled ) {
      if ( tooltip !== null && ops.animation ) {
        self.hide()

        setTimeout(
          toggleTooltipHandlers, 
          getElementTransitionDuration( tooltip ) + ops.delay + 17 )

      } else {
        toggleTooltipHandlers()
      }
      enabled = !enabled
    }
  }

  TooltipProto.toggleEnabled = function() {
    !enabled ? self.enable() : self.disable()
  }  
  
  TooltipProto.dispose = function() { 
    this.hide()
    toggleTooltipHandlers()
  
    element.hasAttribute( dataOriginalTitle ) && toggleTooltipTitle()
  
    delete element[tooltipComponent]
  }

  return new Tooltip( tooltipElement, tooltipOptions )
}


export const tooltipInit = {
  component: tooltipComponent,
  selector: tooltipSelector,
  constructor: Tooltip
}

