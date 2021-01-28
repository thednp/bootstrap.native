
/* Native JavaScript for Bootstrap 5 | Popover
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


// POPOVER PRIVATE GC
// ==================
const popoverString = 'popover',
      popoverComponent = 'Popover',
      popoverSelector = '[data-bs-toggle="popover"],[data-tip="popover"]',
      popoverIDKey = `${popoverString}UID`,
      isIphone = /(iPhone|iPod|iPad)/.test(navigator.userAgent),
      // close btn for dissmissible popover
      popoverCloseButton = '<button type="button" class="btn-close"></button>'


// POPOVER CUSTOM EVENTS
// =====================
const showPopoverEvent = bootstrapCustomEvent( `show.bs.${popoverString}` ),
      shownPopoverEvent = bootstrapCustomEvent( `shown.bs.${popoverString}` ),
      hidePopoverEvent = bootstrapCustomEvent( `hide.bs.${popoverString}` ),
      hiddenPopoverEvent = bootstrapCustomEvent( `hidden.bs.${popoverString}` )


// POPOVER EVENT HANDLERS
// ======================
function dismissiblePopoverHandler(e) {
  const popover = document.getElementsByClassName( `${popoverString} show` )[0],
        self = privateProperties[ popover[popoverIDKey] ]
              .element[popoverComponent]

  if ( popover !== null && e.target === queryElement( '.btn-close', popover ) ) {
    self.hide()
  }
}

function updatePopover(e) {
  let vars = {}

  if ( e.type === 'mousemove' ) {
    vars = privateProperties[ this[popoverIDKey] ]
  } else if ( ['resize','scroll'].includes( e.type ) ) {
    const currentPopover = document.getElementsByClassName( `${popoverString} show` )[0]
    vars = currentPopover ? privateProperties[ currentPopover[popoverIDKey] ] : {}
  } else if ( e.element ) {
    vars = e
  } else {
    vars = { popover: null }
  }

  const { element, popover, options } = vars

  popover && styleTip( element, popover, options.placement, options.container, e )
}

function popoverForceFocus() {
  const { element, popover } = privateProperties[ this[popoverIDKey] ]
  popover === null && element.focus()
}

function popoverShowHandler() {
  const self = this[popoverComponent]
  self.show()
}

function popoverHideHandler() {
  const self = this[popoverComponent]
  self.hide()
}

function popoverClickHandler() {
  const self = this[popoverComponent]
  self.toggle()
}

function popoverTouchHandler(e){
  const popover = document.getElementsByClassName( `${popoverString} show` )[0],
        vars = privateProperties[ popover[popoverIDKey] ],
        eventTarget = e.target,
        { element } = vars,
        self = element[popoverComponent]

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
function getPopoverContents( vars ) {
  const { element, options } = vars

  return {
    0 : options.title || element.getAttribute( 'data-bs-title' ) || null,
    1 : options.content || element.getAttribute( 'data-bs-content' ) || null
  }
}

function removePopover( vars ) {
  const { options, popover } = vars
  options.container.removeChild( popover )
  vars.timer = null
  vars.popover = null
}

function createPopover( vars ) {
  const { element, options, placementClass } = vars,
        popoverContents = getPopoverContents({ element, options })

  let titleString = popoverContents[0],
      contentString = popoverContents[1]

  // fixing #233
  titleString = !!titleString ? titleString.trim() : null
  contentString = !!contentString ? contentString.trim() : null

  // sanitize title && content
  if ( options.sanitizeFn ) {
    titleString = titleString ? options.sanitizeFn( titleString ) : null
    contentString = contentString ? options.sanitizeFn( contentString ) : null
  }    

  const popover = document.createElement( 'div' )
  popover[popoverIDKey] = element[popoverIDKey]

  // popover arrow
  let popoverArrow = document.createElement( 'div' )
  popoverArrow.classList.add( 'popover-arrow' )
  popover.appendChild( popoverArrow )

  if ( contentString !== null && options.template === null ) { // create the popover from data attributes
    popover.setAttribute( 'role', 'tooltip' )

    // set title if any
    if ( titleString !== null ) {
      let popoverTitle = document.createElement( 'h3' )
      options.sanitizeFn && ( titleString = options.sanitizeFn( titleString ) ) // sanitize title
      popoverTitle.classList.add( 'popover-header' )
      popoverTitle.innerHTML = options.dismissible ? titleString + popoverCloseButton : titleString
      popover.appendChild( popoverTitle )
    }

    // set popover content
    const popoverBodyMarkup = document.createElement( 'div' )
    popoverBodyMarkup.classList.add( 'popover-body' )
    options.sanitizeFn && ( contentString = options.sanitizeFn( contentString ) ) // sanitize content
    popoverBodyMarkup.innerHTML = options.dismissible && titleString === null ? contentString + popoverCloseButton : contentString
    popover.appendChild( popoverBodyMarkup )

  } else {  // or create the popover from template
    let popoverTemplate = document.createElement( 'div' )
    popoverTemplate.innerHTML = options.template.trim()
    popover.className = popoverTemplate.firstChild.className
    popover.innerHTML = popoverTemplate.firstChild.innerHTML

    const popoverHeader = queryElement( '.popover-header', popover ),
          popoverBody = queryElement( '.popover-body', popover )

    // fill the template with content from data attributes
    titleString && popoverHeader && ( popoverHeader.innerHTML = titleString.trim() )
    contentString && popoverBody && ( popoverBody.innerHTML = contentString.trim() )
  }

  //append to the container
  options.container.appendChild( popover )
  popover.style.display = 'block'
  !popover.classList.contains( 'popover' ) && popover.classList.add( 'popover' )
  !popover.classList.contains( options.animation ) && popover.classList.add( options.animation )
  !popover.classList.contains( placementClass ) && popover.classList.add( placementClass )

  vars.popover = popover
}

function showPopover( vars ) {
  const { popover } = vars
  !popover.classList.contains( 'show' ) && ( popover.classList.add( 'show' ) )
}

function toggleEvents( action, vars ) {
  const { element, options } = vars
  action = action ? 'addEventListener' : 'removeEventListener'

  if ( 'hover' === options.trigger ) {
    element[action]( mouseClickEvents.down, popoverShowHandler )
    element[action]( mouseHoverEvents[0], popoverShowHandler )
    isMedia(element) && element[action]( 'mousemove', updatePopover, passiveHandler )
    !options.dismissible && element[action]( mouseHoverEvents[1], popoverHideHandler ) // mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ]
  } else if ( 'click' === options.trigger ) {
    element[action]( options.trigger, popoverClickHandler )
  } else if ( 'focus' === options.trigger ) {
    isIphone && element[action]( 'click', popoverForceFocus )
    element[action]( options.trigger, popoverClickHandler )
  }
}

function dismissHandlerToggle( action, vars ) {
  const { element, options } = vars
  action = action ? 'addEventListener' : 'removeEventListener'

  if ( options.dismissible ) {
    document[action]( 'click', dismissiblePopoverHandler )
  } else {
    'focus' === options.trigger && element[action]( 'blur', popoverHideHandler )
    'hover' === options.trigger && document[action]( 'touchstart', popoverTouchHandler, passiveHandler )
  }

  if ( !isMedia(element) ) {
    window[action]( 'scroll', updatePopover, passiveHandler )
    window[action]( 'resize', updatePopover, passiveHandler )
  }
}

function popoverShowTrigger( vars ) {
  dismissHandlerToggle( 1, vars )
  vars.element.dispatchEvent( shownPopoverEvent )
}
function popoverHideTrigger( vars ) {
  dismissHandlerToggle( 0, vars )
  removePopover( vars )
  vars.element.dispatchEvent( hiddenPopoverEvent )
}


// POPOVER DEFINITION
// ==================
export default class Popover {
  constructor( element, options ){

    // set instance options
    options = options || {}

    // initialization element
    element = queryElement(element)

    // reset on re-init
    element[popoverComponent] && element[popoverComponent].dispose()

    // DATA API
    const triggerData = element.getAttribute( 'data-bs-trigger' ), // click / hover / focus
          animationData = element.getAttribute( 'data-bs-animation' ), // true / false

          placementData = element.getAttribute( 'data-bs-placement' ),
          dismissibleData = element.getAttribute( 'data-bs-dismissible' ),
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
    ops.title = options.title
    ops.content = options.content
    ops.sanitizeFn = typeof options.sanitizeFn === 'function' ? options.sanitizeFn : null // JavaScript only
    ops.template = options.template ? options.template : null // JavaScript only
    ops.trigger = options.trigger ? options.trigger : triggerData || 'hover'
    ops.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade'
    ops.placement = options.placement ? options.placement : placementData || 'top'
    ops.delay = parseInt(options.delay || delayData) || 200
    ops.dismissible = options.dismissible || dismissibleData === 'true' ? true : false
    ops.container = containerOption ? containerOption
                  : navbarFixed ? navbarFixed
                  : modal ? modal : document.body

    // invalidate
    const contentString = getPopoverContents({element,options:ops})[1]

    if ( !contentString && !ops.template ) return

    toggleEvents( 1, {element, options:ops} )

    // set private properties unique ID key
    const elementID = getUID( element, popoverIDKey )

    this[popoverIDKey] = elementID
    element[popoverIDKey] = elementID

    privateProperties[elementID] = {
      element: element,
      placementClass: `bs-popover-${tipClassPositions[ops.placement]}`,
      popover: null,
      options: ops,
      timer: null
    }

    // associate target to init object
    element[popoverComponent] = this
  }

  // POPOVER PUBLIC METHODS
  // ======================
  toggle() {
    const {popover} = privateProperties[ this[popoverIDKey] ]
    popover === null ? this.show() : this.hide()
  }

  show() {
    const vars = privateProperties[ this[popoverIDKey] ],
          { element, options } = vars,
          showWrap = () => { popoverShowTrigger( vars ) }

    clearTimeout( vars.timer )
    vars.timer = setTimeout( () => {
      if ( vars.popover === null ) {
        element.dispatchEvent( showPopoverEvent )
        if ( showPopoverEvent.defaultPrevented ) return

        createPopover( vars )
        updatePopover( vars )
        showPopover( vars )
        !!options.animation ? emulateTransitionEnd( vars.popover, showWrap )
                            : popoverShowTrigger( vars )
      }
    }, 20 )
  }

  hide() {
    const vars = privateProperties[ this[popoverIDKey] ],
          { element, options, popover } = vars,
          hideWrap = () => { popoverHideTrigger( vars ) }

    clearTimeout(vars.timer)

    vars.timer = setTimeout( () => {
      if (popover && popover !== null && popover.classList.contains( 'show' )) {
        element.dispatchEvent( hidePopoverEvent )
        if ( hidePopoverEvent.defaultPrevented ) return

        popover.classList.remove( 'show' )
        !!options.animation ? emulateTransitionEnd( popover, hideWrap  ) 
                            : popoverHideTrigger( vars )
      }
    }, options.delay )
  }

  dispose() {
    const uid = this[popoverIDKey],
          vars = privateProperties[ uid ],
          { element } = vars

    this.hide()
    toggleEvents( 0, vars )
    delete element[popoverComponent]
    delete element[popoverIDKey]
    delete this[popoverIDKey]
    delete privateProperties[ uid ]
  }
}

export const popoverInit = {
  component: popoverComponent,
  selector: popoverSelector,
  constructor: Popover
}

