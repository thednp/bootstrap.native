
/* Native JavaScript for Bootstrap 5 | Toast
-------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'
import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions.js'

import fadeClass from '../strings/fadeClass.js'
import showClass from '../strings/showClass.js'
import addEventListener from '../strings/addEventListener.js'
import removeEventListener from '../strings/removeEventListener.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'

// TOAST PRIVATE GC
// ================
const toastString = 'toast',
      toastComponent = 'Toast',
      toastSelector = '[data-bs-dismiss="toast"]'


// TOAST SCOPE
// ===========
export default function Toast( toastElement, toastOptions ){


  // TOAST PRIVATE GC
  // ================
  const showingClass = 'showing',
      hideClass = 'hide',
      toastDefaultOptions = {
        animation: true,
        autohide: true,
        delay: 500
      },

      // TOAST CUSTOM EVENTS
      // ===================
      showToastEvent = bootstrapCustomEvent( `show.bs.${toastString}` ),
      hideToastEvent = bootstrapCustomEvent( `hide.bs.${toastString}` ),
      shownToastEvent = bootstrapCustomEvent( `shown.bs.${toastString}` ),
      hiddenToastEvent = bootstrapCustomEvent( `hidden.bs.${toastString}` )


  let self, element, toast, timer = null, ops = {}

  // TOAST PRIVATE METHODS
  // =====================
  function showToastComplete() {
    if ( !ops.animation ) {
      removeClass( toast, showingClass )
      addClass( toast, showClass )
    }
  
    toast.dispatchEvent( shownToastEvent )
    ops.autohide && self.hide()
  }
  
  function hideToastComplete() {
    addClass( toast, hideClass );
    toast.dispatchEvent( hiddenToastEvent )
  }
  
  function closeToast() {
    removeClass( toast, showClass )
    if ( ops.animation ) {
      toast.offsetWidth // force reflow
      emulateTransitionEnd( toast, hideToastComplete )
    } else {
      hideToastComplete()
    }
  }
  
  function openToast() {
    removeClass( toast, hideClass )

    if ( ops.animation ) {
      toast.offsetWidth // force reflow
      addClass( toast, showingClass )
      addClass( toast, showClass )

      emulateTransitionEnd( toast, showToastComplete)
    } else {
      showToastComplete()
    }
  }
  
  function toggleToastHandler( action ){
    action = action ? addEventListener : removeEventListener
    element[action]( 'click', toastClickHandler )
  }
  
  
  // TOAST EVENT HANDLERS
  // ====================
  function toastClickHandler(){
    self.hide()
  }

  function completeDispose() {
    clearTimeout( timer )
    toggleToastHandler()
    delete element[toastComponent]
  }
  
  
  // TOAST DEFINITION
  // ================
  class Toast {
    constructor( target, options ) {
  
      // bind
      self = this

      // set options
      options = options || {}
  
      // initialization element
      element = queryElement( target )
      toast = element.closest( `.${toastString}` )
  
      // reset previous instance
      element[toastComponent] && element[toastComponent].dispose()

      // set options
      ops = normalizeOptions( element, toastDefaultOptions, options, 'bs' )
      
      // add event listener
      toggleToastHandler( 1 )
  
      // associate targets to init object
      element[toastComponent] = self    
    }
  }
  
  
  // TOAST PUBLIC METHODS
  // ====================
  const ToastProto = Toast.prototype
  
  ToastProto.show = function() {  
    if ( toast && hasClass( toast, hideClass ) ) {
      toast.dispatchEvent( showToastEvent )
      if ( showToastEvent.defaultPrevented ) return
  
      addClass( toast, fadeClass )
      clearTimeout( timer )
      timer = setTimeout( () => openToast(), 10)
    }
  }
  
  ToastProto.hide = function( noTimer ) {
  
    if ( toast && hasClass( toast, showClass ) ) {
      toast.dispatchEvent( hideToastEvent )
      if ( hideToastEvent.defaultPrevented ) return
  
      clearTimeout( timer )
      timer = setTimeout( 
        closeToast, 
        noTimer ? 10 : ops.delay )
    }
  }
  
  ToastProto.dispose = function() {
  
    self.hide()
  
    ops.animation 
      ? emulateTransitionEnd( toast, completeDispose ) 
      : completeDispose()
  }

  return new Toast( toastElement, toastOptions )
}


export const toastInit = {
  component: toastComponent,
  selector: toastSelector,
  constructor: Toast
}

