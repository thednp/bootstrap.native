
/* Native JavaScript for Bootstrap 5 | Modal
-------------------------------------------- */
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'
import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions.js'

import ariaHidden from '../strings/ariaHidden.js'
import dataBsToggle from '../strings/dataBsToggle.js'
import dataBsDismiss from '../strings/dataBsDismiss.js'
import fadeClass from '../strings/fadeClass.js'
import showClass from '../strings/showClass.js'
import addEventListener from '../strings/addEventListener.js'
import removeEventListener from '../strings/removeEventListener.js'
import fixedTopClass from '../strings/fixedTopClass.js'
import fixedBottomClass from '../strings/fixedBottomClass.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import getTargetElement from '../util/getTargetElement.js'
import setFocus from '../util/setFocus.js'


// MODAL PRIVATE GC
// ================
const modalString = 'modal',
      modalComponent = 'Modal',
      modalSelector = `[${dataBsToggle}="${modalString}"]`,
      modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`,
      modalDefaultOptions = {
        backdrop: true, // boolean|string
        keyboard: true // boolean
      }


// MODAL SCOPE
// ===========   
export default function Modal( modalElement, modalOptions ){

  // MODAL PRIVATE GC
  // ================
  const modalFixedItems = Array.from(document.getElementsByClassName( fixedTopClass ))
                  .concat(Array.from(document.getElementsByClassName( fixedBottomClass ))),
        modalOpenClass = `${modalString}-open`,
        modalBackdropClass = `${modalString}-backdrop`,
        modalStaticClass = `${modalString}-static`,

        // MODAL CUSTOM EVENTS
        // ===================
        showModalEvent = bootstrapCustomEvent( `show.bs.${modalString}` ),
        shownModalEvent = bootstrapCustomEvent( `shown.bs.${modalString}` ),
        hideModalEvent = bootstrapCustomEvent( `hide.bs.${modalString}` ),
        hiddenModalEvent = bootstrapCustomEvent( `hidden.bs.${modalString}` )

 let self,
    element,
    modal,
    modalDialog,
    ops = {},
    isAnimating = false,
    isStatic,
    hasFade,
    relatedTarget


  // MODAL PRIVATE METHODS
  // =====================
  function setModalScrollbar() {
    const openModal = hasClass( document.body, modalOpenClass ),
          bodyPad = parseInt( getComputedStyle(document.body).paddingRight ),
          bodyOverflow = document.documentElement.clientHeight !== document.documentElement.scrollHeight 
                      || document.body.clientHeight !== document.body.scrollHeight,
          modalOverflow = modal.clientHeight !== modal.scrollHeight,
          scrollBarWidth = measureModalScrollbar()

    modal.style.paddingRight = !modalOverflow && scrollBarWidth 
      ? `${scrollBarWidth}px` : ''

    document.body.style.paddingRight = modalOverflow || bodyOverflow 
      ? `${bodyPad + ( openModal ? 0 : scrollBarWidth )}px` : ''

    modalFixedItems.length && modalFixedItems.map( fixed => {
      let itemPad = getComputedStyle(fixed).paddingRight

      fixed.style.paddingRight = modalOverflow || bodyOverflow 
        ? `${parseInt( itemPad ) + ( openModal ? 0 : scrollBarWidth )}px`
        : `${parseInt( itemPad )}px`
    })
  }

  function resetModalScrollbar() {
    document.body.style.paddingRight = ''
    modal.style.paddingRight = ''

    modalFixedItems.length && modalFixedItems.map( fixed => {
      fixed.style.paddingRight = ''
    })
  }

  function measureModalScrollbar() {
    let scrollDiv = document.createElement( 'div' ), widthValue

    scrollDiv.className = 'modal-scrollbar-measure' // this is here to stay
    document.body.appendChild(scrollDiv)
    widthValue = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild( scrollDiv )
    return widthValue;
  }

  function createModalOverlay() {
    let overlay = queryElement( `.${modalBackdropClass}` )

    if ( overlay === null ) {
      const newOverlay = document.createElement( 'div' )
      newOverlay.setAttribute( 'class', `${modalBackdropClass}${hasFade ? (' '+fadeClass) : ''}`)

      overlay = newOverlay
      document.body.appendChild( overlay )
    }

    return overlay
  }

  function removeModalOverlay () {
    let overlay = queryElement( `.${modalBackdropClass}` )

    if ( overlay && !document.getElementsByClassName( `${modalString} ${showClass}` )[0] ) {
      document.body.removeChild(overlay); overlay = null     
    }
    
    isAnimating = false

    overlay === null && ( removeClass( document.body, modalOpenClass), resetModalScrollbar() )
  }

  function toggleModalDismiss( action ) {
    action = action ? addEventListener : removeEventListener
    window[action]( 'resize', modalResizeHandler, passiveHandler)
    modal[action]( 'click', modalDismissHandler ) 
    document[action]( 'keydown', modalKeyHandler )
  }

  function toggleModalHandler( action ) {
    action = action ? addEventListener : removeEventListener
    element[action]( 'click', modalClickHandler )
  }

  function beforeShowModal() {
    modal.style.display = 'block'
    
    setModalScrollbar()
    !document.getElementsByClassName( `${modalString} ${showClass}` )[0]
      && addClass( document.body, modalOpenClass )
    
    addClass( modal, showClass )
    modal.setAttribute( ariaHidden, false )

    hasFade ? emulateTransitionEnd( modal, triggerModalShow )
        : triggerModalShow()
  }

  function triggerModalShow() {
    setFocus( modal )
    isAnimating = false

    toggleModalDismiss( 1 )

    shownModalEvent.relatedTarget = relatedTarget
    modal.dispatchEvent( shownModalEvent )
  }

  function triggerModalHide( force ) {
    const overlay = queryElement( `.${modalBackdropClass}` )

    modal.style.display = ''
    element && ( setFocus( element ) ) 

    // force can also be the transitionEvent object, we wanna make sure it's not
    if ( !force && overlay && hasFade && hasClass( overlay, showClass ) // call is not forced and overlay is visible
      && !queryElement( `.${modalString}.${showClass}` ) ) // AND no modal is visible
    {
      removeClass( overlay, showClass )
      emulateTransitionEnd( overlay, removeModalOverlay )
    } else {
      removeModalOverlay()
    }

    toggleModalDismiss()

    hiddenModalEvent.relatedTarget = relatedTarget
    modal.dispatchEvent( hiddenModalEvent )
  }


  // MODAL EVENT HANDLERS
  // ====================
  function modalClickHandler(e) {
    const eventTarget = e.target

    if ( isAnimating ) return

    const modalID = modal.getAttribute( 'id' ),
          elemTargetModal = getTargetElement( element )

    if ( !hasClass( modal, showClass ) // modal not visible AND
        && element.contains( eventTarget ) && elemTargetModal.id === modalID ) // OR the event target is a child of the element pointing to our modal
    {
      relatedTarget = element
      self.show()
      e.preventDefault()
    }
  }

  function modalResizeHandler(){
    self.update()
  }

  function modalKeyHandler( {which} ) {
    if ( !isAnimating // modal has no animations running
      && ops.keyboard && which == 27 // the keyboard option is enabled and the key is 27
      && hasClass( modal, showClass ) ) // the modal is not visible
    {
      self.hide()
    }
  }

  function modalDismissHandler( e ) { // mouseup on dismiss button or outside the .modal-dialog
    if ( isAnimating ) return

    const eTarget = e.target,
        selectedText = document.getSelection().toString().length,
        targetInsideDialog = modalDialog.contains( eTarget ),
        dismiss = eTarget.getAttribute( dataBsDismiss ) === modalString
               || eTarget.closest( modalDismissSelector )

    if ( selectedText && !targetInsideDialog ) {
      return
    } else if ( isStatic && !targetInsideDialog ) {
      addClass( modal, modalStaticClass )
      isAnimating = true
      emulateTransitionEnd( modalDialog, staticTransitionEnd )
    } else if ( dismiss || ( !selectedText && !isStatic && !targetInsideDialog ) ) {
      self.hide()
      relatedTarget = dismiss ? eTarget : null
      e.preventDefault()
    }
  }

  function staticTransitionEnd(){
    const duration = getElementTransitionDuration( modalDialog ) + 17
    removeClass( modal, modalStaticClass )
    setTimeout( () => isAnimating = false, duration ) // user must wait for zoom out transition
  }


  // MODAL DEFINITION
  // ================
  class Modal {

    constructor( target, options ){ // element can be the modal/triggering button

      // bind
      self = this

      // set options
      options = options || {}

      // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
      element = queryElement( target )

      // determine modal, triggering element
      modal = hasClass( element, modalString ) ? element : getTargetElement( element )
      modalDialog = queryElement( `.${modalString}-dialog`, modal )

      // modal is now independent of it's triggering element
      if ( hasClass( element, modalString ) ) { element = null } 
      
      // reset previous instance
      (element||modal)[modalComponent] && (element||modal)[modalComponent].dispose()

      // set options
      ops = normalizeOptions( modal, modalDefaultOptions, options, 'bs' )

      // additional internal options
      isStatic = ops.backdrop === 'static'
      hasFade = hasClass( modal, fadeClass )

      // set associations
      if ( element ) {
        // modal is independent of a triggering element
        toggleModalHandler( 1 )

        modal.modalTrigger = element
        element[modalComponent] = self
      } else { 
        modal[modalComponent] = self
      }
    }
  }


  // MODAL PUBLIC METHODS
  // ====================
  const ModalProto = Modal.prototype

  ModalProto.toggle = function() {
    hasClass( modal, showClass ) ? self.hide() : self.show()
  }

  ModalProto.show = function() {
    if ( hasClass( modal, showClass ) && !isAnimating ) return

    showModalEvent.relatedTarget = relatedTarget
    modal.dispatchEvent( showModalEvent )
    if ( showModalEvent.defaultPrevented ) return

    isAnimating = true

    // we elegantly hide any opened modal
    const currentOpen = document.getElementsByClassName( `${modalString} ${showClass}` )[0],
          overlay = ops.backdrop ? createModalOverlay() : null

    let overlayDelay = 0

    if ( currentOpen && currentOpen !== modal ) {
      currentOpen.modalTrigger && currentOpen.modalTrigger[modalComponent].hide()
      currentOpen[modalComponent] && currentOpen[modalComponent].hide()
    }

    if ( overlay // overlay exists
      && !currentOpen // no open modal found 
      && !hasClass( overlay, showClass ) // overlay not visible
    ) {
      overlay.offsetWidth // force reflow to enable trasition
      overlayDelay = getElementTransitionDuration( overlay )
      addClass( overlay, showClass )
    }

    !currentOpen ? setTimeout( () => beforeShowModal(), overlay && overlayDelay ? overlayDelay : 0 ) 
                  : beforeShowModal()
  }

  ModalProto.hide = function( force ) {
    if ( !hasClass( modal, showClass ) && !isAnimating ) return

    hideModalEvent.relatedTarget = relatedTarget
    modal.dispatchEvent( hideModalEvent )
    if ( hideModalEvent.defaultPrevented ) return

    isAnimating = true
    removeClass( modal, showClass )
    modal.setAttribute( ariaHidden, true )

    hasFade && force !== 1 // modal should fade AND not forced to hide
      ? emulateTransitionEnd( modal, function hideWrap() { triggerModalHide() } ) // then wait for overlay to fade then triggerModalHide
      : triggerModalHide( force ) // OR triggerModalHide on force or no fade class present
  }

  ModalProto.update = function() {
    hasClass( modal, showClass ) && setModalScrollbar()
  }

  ModalProto.dispose = function() {
    this.hide(1) // forced call

    if ( element ) {
      delete modal.modalTrigger
      toggleModalHandler( element )
    }
    
    // remove association
    delete (element||modal)[modalComponent]
  }

  return new Modal( modalElement, modalOptions )
}


export const modalInit = {
  component: modalComponent,
  selector: modalSelector,
  constructor: Modal
}

