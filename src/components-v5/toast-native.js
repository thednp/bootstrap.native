
/* Native JavaScript for Bootstrap 5 | Toast
-------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import privateProperties from '../util/privateProperties.js'
import getUID from '../util/getUID.js'

// TOAST PRIVATE GC
// ================
const toastString = 'toast',
      toastComponent = 'Toast',
      toastSelector = '[data-bs-dismiss="toast"]',
      toastIDKey = `${toastString}UID`


// TOAST CUSTOM EVENTS
// ===================
const showToastEvent = bootstrapCustomEvent( `show.bs.${toastString}` ),
      hideToastEvent = bootstrapCustomEvent( `hide.bs.${toastString}` ),
      shownToastEvent = bootstrapCustomEvent( `shown.bs.${toastString}` ),
      hiddenToastEvent = bootstrapCustomEvent( `hidden.bs.${toastString}` )


// TOAST PRIVATE METHODS
// =====================
function showToastComplete({ element, toast, options }) {
  if ( !options.animation ) {
    toast.classList.remove( 'showing' )
    toast.classList.add( 'show' )
  }

  toast.dispatchEvent( shownToastEvent )
  options.autohide && element[toastComponent].hide()
}

function hideToastComplete({ toast }) {
  toast.classList.add( 'hide' );
  toast.dispatchEvent( hiddenToastEvent )
}

function closeToast({ toast, options }) {
  toast.classList.remove( 'show' )
  if ( options.animation ) {
    toast.offsetWidth // force reflow
    emulateTransitionEnd( toast, function hideWrap(){
      hideToastComplete({ toast })
    })
  } else {
    hideToastComplete({ toast })
  }
}

function openToast({ element, toast, options }) {
  toast.classList.remove( 'hide' )
  
  if ( options.animation ) {
    toast.offsetWidth // force reflow
    toast.classList.add( 'showing' )
    toast.classList.add( 'show' )
    
    emulateTransitionEnd(toast, function showWrap() {
      showToastComplete({ element, toast, options }) 
    })
  } else {
    showToastComplete({ element, toast, options })
  }
}

function disposeToastComplete( vars ) {
  const { element } = vars, 
        uid = element[toastIDKey]

  clearTimeout( vars.timer )
  element.removeEventListener( 'click', toastClickHandler )
  delete element[toastComponent][toastIDKey]
  delete element[toastComponent]
  delete element[toastIDKey]
  delete privateProperties[uid]
}


// TOAST EVENT HANDLER
// ===================
function toastClickHandler(){
  this[toastComponent].hide()
}


// TOAST DEFINITION
// ================
export default class Toast {
  constructor( element, options ) {

    // set options
    options = options || {}

    // initialization element
    element = queryElement( element )

    // reset on re-init
    element[toastComponent] && element[toastComponent].dispose()

    // DATA API
    const animationData = element.getAttribute( 'data-bs-animation' ),
          autohideData = element.getAttribute( 'data-bs-autohide' ),
          delayData = element.getAttribute( 'data-bs-delay' )

    // set instance options
    const ops = {}
    ops.animation = options.animation === false || animationData === 'false' ? 0 : 1 // true by default
    ops.autohide = options.autohide === false || autohideData === 'false' ? 0 : 1 // true by default
    ops.delay = +(options.delay || delayData) || 500 // 500ms default

    // set private properties unique ID key
    const elementID = getUID( element, toastIDKey )

    element[toastIDKey] = elementID
    this[toastIDKey] = elementID
    privateProperties[elementID] = {
      element: element,
      toast: element.closest( '.toast' ),
      options: ops,
      timer: null
    }
    
    // add event listener
    element.addEventListener( 'click', toastClickHandler )

    // associate targets to init object
    element[toastComponent] = this    
  }

  // TOAST PUBLIC METHODS
  // ====================
  show() {
    const vars = privateProperties[ this[toastIDKey] ],
      { toast } = vars

    if ( toast && toast.classList.contains( 'hide' ) ) {
      toast.dispatchEvent( showToastEvent )
      if ( showToastEvent.defaultPrevented ) return

      toast.classList.add( 'fade' )
      clearTimeout( vars.timer )
      vars.timer = setTimeout( () => openToast( vars ), 10)
    }
  }

  hide( noTimer ) {
    const vars = privateProperties[ this[toastIDKey] ],
      { toast, options } = vars

    if ( toast && toast.classList.contains( 'show' ) ) {
      toast.dispatchEvent( hideToastEvent )
      if ( hideToastEvent.defaultPrevented ) return

      clearTimeout( vars.timer )
      vars.timer = setTimeout( () => closeToast( vars ), noTimer ? 10 : options.delay )
    }
  }

  dispose() {
    const vars = privateProperties[ this[toastIDKey] ],
      { toast, options } = vars
    
    options.animation ? emulateTransitionEnd( toast, function completeWrap() {
      disposeToastComplete( vars ) 
    }) : disposeToastComplete( vars )
  }
}

export const toastInit = {
  component: toastComponent,
  selector: toastSelector,
  constructor: Toast
}

