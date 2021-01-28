
/* Native JavaScript for Bootstrap 5 | Tooltip
---------------------------------------------- */
import mouseHoverEvents from 'shorter-js/src/strings/mouseHoverEvents.js'
import mouseClickEvents from 'shorter-js/src/strings/mouseClickEvents.js'
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import tipClassPositions from '../util/tipClassPositions.js'
import styleTip from '../util/styleTip-v5.js'
import isMedia from '../util/isMedia.js'
import privateProperties from '../util/privateProperties.js'
import getUID from '../util/getUID.js'


// TOOLTIP PRIVATE GC
// ==================
const tooltipString = 'tooltip',
      tooltipComponent = 'Tooltip',
      tooltipSelector = '[data-bs-toggle="tooltip"],[data-tip="tooltip"]',
      tooltipIDKey = `${tooltipString}UID`


// TOOLTIP CUSTOM EVENTS
// =====================
const showTooltipEvent = bootstrapCustomEvent( `show.bs.${tooltipString}` ),
      shownTooltipEvent = bootstrapCustomEvent( `shown.bs.${tooltipString}` ),
      hideTooltipEvent = bootstrapCustomEvent( `hide.bs.${tooltipString}` ),
      hiddenTooltipEvent = bootstrapCustomEvent( `hidden.bs.${tooltipString}` )


// TOOLTIP PRIVATE METHODS
// =======================
function getTooltipTitle({ element, options }) {
  return options.title
      || element.getAttribute( 'title' )
      || element.getAttribute( 'data-bs-title' )
      || element.getAttribute( 'data-original-title' )
}

function removeTooltip( vars ) {
  const { options, tooltip } = vars

  options.container.removeChild( tooltip )
  vars.tooltip = null
  vars.timer = null
}

function createTooltip( vars ) {
  const { element, options, placementClass } = vars
  let titleString = getTooltipTitle( vars ).trim() // read the title again

  // sanitize title
  titleString = options.sanitizeFn ? options.sanitizeFn( titleString ) : titleString

  if ( !titleString ) return // invalidate, maybe markup changed

  // create tooltip
  let tooltip = vars.tooltip || document.createElement( 'div' )
  tooltip[tooltipIDKey] = element[tooltipIDKey]

  // set markup
  if ( options.template ) {
    let tooltipMarkup = document.createElement( 'div' )
    tooltipMarkup.innerHTML = options.template.trim()

    tooltip.className = tooltipMarkup.firstChild.className
    tooltip.innerHTML = tooltipMarkup.firstChild.innerHTML

    queryElement( '.tooltip-inner', tooltip ).innerHTML = titleString
  } else {
    // tooltip arrow
    let tooltipArrow = document.createElement( 'div' )
    tooltipArrow.classList.add( 'tooltip-arrow' )
    tooltip.appendChild( tooltipArrow )
    // tooltip inner
    let tooltipInner = document.createElement( 'div' )
    tooltipInner.classList.add( 'tooltip-inner' )
    tooltip.appendChild( tooltipInner )
    tooltipInner.innerHTML = titleString
  }
  // reset position
  tooltip.style.left = '0'
  tooltip.style.top = '0'
  // set class and role attribute
  tooltip.setAttribute('role','tooltip')
  !tooltip.classList.contains('tooltip') && tooltip.classList.add('tooltip')
  !tooltip.classList.contains(options.animation) && tooltip.classList.add(options.animation)
  !tooltip.classList.contains(placementClass) && tooltip.classList.add(placementClass)
  // append to container
  options.container.appendChild( tooltip )
  // update internals
  vars.tooltip = tooltip
}

function updateTooltip(e) {
  let vars = {}

  if ( e.type === 'mousemove' ) {
    vars = privateProperties[ this[tooltipIDKey] ]
  } else if ( ['resize','scroll'].includes( e.type ) ) {
    const currentTooltip = document.getElementsByClassName( `${tooltipString} show` )[0]
    vars = currentTooltip ? privateProperties[ currentTooltip[tooltipIDKey] ] : {}
  } else if ( e.element ) {
    vars = e
  } else {
    vars = { tooltip: null }
  }

  const { element, tooltip, options } = vars

  tooltip && styleTip( element, tooltip, options.placement, options.container, e )
}

function showTooltip({ tooltip }) {
  !tooltip.classList.contains( 'show' ) && tooltip.classList.add( 'show' )
}

function tooltipTouchHandler(e){
  const tooltip = document.getElementsByClassName( `${tooltipString} show` )[0],
        vars = privateProperties[ tooltip[tooltipIDKey] ],
        eventTarget = e.target,
        { element } = vars,
        self = element[tooltipComponent]

  if ( tooltip && tooltip.contains( eventTarget ) || eventTarget === element || element.contains( eventTarget ) ) {
    // smile
  } else {
    self.hide()
  }
}

function openTooltipHandler(){
  const self = this[tooltipComponent]
  self.show()
}

function closeTooltipHandler(){
  const self = this[tooltipComponent]
  self.hide()
}

function toggleTooltipAction( action, element ){
  action = action ? 'addEventListener' : 'removeEventListener'

  document[action]( 'touchstart', tooltipTouchHandler, passiveHandler )

  if ( !isMedia( element ) ) {
    window[action]( 'scroll', updateTooltip, passiveHandler )
    window[action]( 'resize', updateTooltip, passiveHandler )
  }
}

function tooltipShownAction({ element }) {
  toggleTooltipAction( 1, element )
  element.dispatchEvent( shownTooltipEvent )
}

function tooltipHiddenAction( vars ) {
  const { element } = vars
  toggleTooltipAction( 0, element )
  removeTooltip( vars )
  element.dispatchEvent( hiddenTooltipEvent )
}

function toggleTooltipEvents( action, element ) {
  action = action ? 'addEventListener' : 'removeEventListener'

  isMedia(element) && element[action]( 'mousemove', updateTooltip, passiveHandler )
  element[action]( mouseClickEvents.down, openTooltipHandler )
  element[action]( mouseHoverEvents[0], openTooltipHandler )
  element[action]( mouseHoverEvents[1], closeTooltipHandler )
}


// TOOLTIP DEFINITION
// ==================
export default class Tooltip {
  constructor( element, options ) {

    // set options
    options = options || {}
  
    // initialization element
    element = queryElement(element)
  
    // reset on re-init
    element[tooltipComponent] && element[tooltipComponent].dispose()
  
    // DATA API
    const animationData = element.getAttribute( 'data-bs-animation' ),
          placementData = element.getAttribute( 'data-bs-placement' ),
          delayData = element.getAttribute( 'data-bs-delay' ),
          containerData = element.getAttribute( 'data-bs-container' ),

          // check container
          containerOption = queryElement( options.container || containerData ),

          // maybe the element is inside a modal
          modal = element.closest( '.modal' ),

          // maybe the element is inside a fixed navbar
          navbarFixed = element.closest( '.fixed-top' ) || element.closest( '.fixed-bottom' )
  
    // set instance options
    const ops = {}
    ops.title = options.title // JavaScript only
    ops.template = options.template ? options.template : null // JavaScript only
    ops.sanitizeFn = options.sanitizeFn && typeof options.sanitizeFn === 'function' ? options.sanitizeFn : null // JavaScript only
    ops.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade'
    ops.placement = options.placement ? options.placement : placementData || 'top'
    ops.delay = +(options.delay || delayData) || 200
    ops.container = containerOption ? containerOption
                  : navbarFixed ? navbarFixed
                  : modal ? modal : document.body

    // check tooltip title
    const titleString = getTooltipTitle({ element, options:ops })
  
    // invalidate
    if ( !titleString && !ops.template ) return

    // set private properties unique ID key
    const elementID = getUID( element, tooltipIDKey )
    element[tooltipIDKey] = elementID
    this[tooltipIDKey] = elementID

    privateProperties[elementID] = {
      element: element,
      placementClass: `bs-tooltip-${tipClassPositions[ops.placement]}`,
      options: ops,
      tooltip: null,
      timer: null
    }
  
    // set title attributes and add event listeners
    element.setAttribute( 'data-original-title', titleString )
    element.removeAttribute( 'title' )
    toggleTooltipEvents( 1, element )
  
    // associate target to init object
    element[tooltipComponent] = this
  }

  // TOOLTIP PRIVATE METHODS
  // =======================
  show() {
    const vars = privateProperties[ this[tooltipIDKey] ],
      { element, options } = vars

    clearTimeout( vars.timer )
    vars.timer = setTimeout( () => {
      if ( vars.tooltip === null ) {
        element.dispatchEvent( showTooltipEvent)
        if ( showTooltipEvent.defaultPrevented ) return

        if ( createTooltip( vars ) !== false ) {
          updateTooltip( vars )
          showTooltip( vars )
          !!options.animation ? emulateTransitionEnd( vars.tooltip, function shownWrap(){
            tooltipShownAction( vars ) 
          }) : tooltipShownAction( vars )
        }
      }
    }, 20 )
  }

  hide() {
    const vars = privateProperties[ this[tooltipIDKey] ],
      { element, tooltip, options } = vars

    clearTimeout( vars.timer )
    vars.timer = setTimeout( () => {
      if (tooltip && tooltip.classList.contains( 'show' )) {
        element.dispatchEvent( hideTooltipEvent )
        if ( hideTooltipEvent.defaultPrevented ) return

        tooltip.classList.remove( 'show' )
        !!options.animation ? emulateTransitionEnd( tooltip, function hiddenWrap() { 
          tooltipHiddenAction( vars ) 
        }) : tooltipHiddenAction( vars )
      }
    }, options.delay )
  }

  toggle() {
    const { tooltip } = privateProperties[ this[tooltipIDKey] ]
    tooltip === null ? this.show() : this.hide()
  }

  dispose() {
    const uid = this[tooltipIDKey],
        { element } = privateProperties[uid]

    this.hide()
    toggleTooltipEvents( 0, element )
    element.setAttribute( 'title', element.getAttribute( 'data-original-title' ))
    element.removeAttribute( 'data-original-title' )
    delete element[tooltipComponent]
    delete element[tooltipIDKey]
    delete this[tooltipIDKey]
    delete privateProperties[uid]
  }
}

export const tooltipInit = {
  component: tooltipComponent,
  selector: tooltipSelector,
  constructor: Tooltip
}

