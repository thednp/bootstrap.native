
/* Native JavaScript for Bootstrap 5 | Modal
-------------------------------------------- */
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import getTargetElement from '../util/getTargetElement.js'
import setFocus from '../util/setFocus.js'

import privateProperties from '../util/privateProperties.js'
import getUID from '../util/getUID.js'


// MODAL PRIVATE GC
// ================
const modalString = 'modal',
      modalComponent = 'Modal',
      modalSelector = '[data-bs-toggle="modal"]',
      modalIDKey = `${modalString}UID`,
      modalFixedItems = Array.from(document.getElementsByClassName( 'fixed-top' ))
                .concat(Array.from(document.getElementsByClassName( 'fixed-bottom' )))


// MODAL CUSTOM EVENTS
// ===================
const showModalEvent = bootstrapCustomEvent( `show.bs.${modalString}` ),
      shownModalEvent = bootstrapCustomEvent( `shown.bs.${modalString}` ),
      hideModalEvent = bootstrapCustomEvent( `hide.bs.${modalString}` ),
      hiddenModalEvent = bootstrapCustomEvent( `hidden.bs.${modalString}` )


// MODAL PRIVATE METHODS
// =====================
function setModalScrollbar( modal ) {
  const openModal = document.body.classList.contains( 'modal-open' ),
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

function resetModalScrollbar( modal ) {
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

function createModalOverlay( options ) {
  let overlay = queryElement( '.modal-backdrop' )

  if ( overlay === null ) {
    const newOverlay = document.createElement( 'div' )
    newOverlay.setAttribute( 'class', `modal-backdrop${options.animation ? ' fade' : ''}`)

    overlay = newOverlay
    document.body.appendChild( overlay )
  }

  return overlay
}

function removeModalOverlay ( vars ) {
  const modal = vars.modal
  let overlay = queryElement( '.modal-backdrop' )

  if ( overlay && !document.getElementsByClassName('modal show')[0] ) {
    document.body.removeChild(overlay); overlay = null     
  }

  overlay === null && ( document.body.classList.remove( 'modal-open' ), resetModalScrollbar( modal ) )
}

function toggleModalEvents( action, modal ) {
  action = action ? 'addEventListener' : 'removeEventListener'
  window[action]( 'resize', modalResizeHandler, passiveHandler)
  modal[action]( 'click', modalDismissHandler )
  document[action]( 'keydown', modalKeyHandler )
}

function beforeModalShow( vars ) {
  const modal = vars.modal

  modal.style.display = 'block'

  setModalScrollbar( modal )
  !document.getElementsByClassName( 'modal show' )[0]
    && document.body.classList.add('modal-open')

  modal.classList.add('show')
  modal.setAttribute('aria-hidden', false)

  modal.classList.contains('fade') ? 
    emulateTransitionEnd( modal, function showTransitionEndHandler(){ triggerShow( vars ) }) :
    triggerShow( vars )
}

function triggerShow( vars ) {
  const { modal } = vars

  setFocus( modal )
  vars.isAnimating = false

  toggleModalEvents( 1, modal )

  shownModalEvent.relatedTarget = vars.relatedTarget
  modal.dispatchEvent( shownModalEvent )
}

function triggerHide( force, vars ) {
  const overlay = queryElement('.modal-backdrop'),
      { modal, element } = vars

  modal.style.display = ''
  element && ( setFocus( element ) ) 

  // force can also be the transitionEvent object, we wanna make sure it's not
  if ( force !== 1 && overlay && overlay.classList.contains( 'show' ) // call is not forced and overlay is visible
    && !queryElement( '.modal.show' ) ) // AND no modal is visible
  {
    overlay.classList.remove( 'show' )
    emulateTransitionEnd( overlay, 
      function hideWrap() { 
        removeModalOverlay( vars ) 
      })
  } else {
    removeModalOverlay( vars )
  }

  toggleModalEvents( 0, modal )

  vars.isAnimating = false

  modal.dispatchEvent( hiddenModalEvent )
}


// MODAL EVENT HANDLERS
// ====================
function modalClickHandler(e) {
  const eventTarget = e.target,
        element = this,
        vars = privateProperties[ element[modalIDKey] ],
        self = vars && element[modalComponent],
        modal = vars.modal

  if ( vars.isAnimating ) return

  const modalID = modal.getAttribute( 'id' ),
        // eventTargetModal = getTargetElement( eventTarget ),
        elemTargetModal = getTargetElement( element )

  // if ( !modal.classList.contains( 'show' ) // modal not visible AND
  //     && (eventTarget === element && eventTargetModal.id === modalID // EITHER the event target is our element and points to our modal
  //     || element.contains( eventTarget ) && elemTargetModal.id === modalID ) ) // OR the event target is a child of the element pointing to our modal
  // {
  if ( !modal.classList.contains( 'show' ) // modal not visible AND
      && element.contains( eventTarget ) && elemTargetModal.id === modalID ) // OR the event target is a child of the element pointing to our modal
  {
    vars.relatedTarget = element
    self.show()
    e.preventDefault()
  }
}

function modalResizeHandler(){
  const modal = document.getElementsByClassName( 'modal show' )[0],
        self = ( modal.modalTrigger || modal )[modalComponent]

  self.update()
}

function modalKeyHandler( {which} ) {
  const modal = document.getElementsByClassName( 'modal show' )[0],
        self = ( modal.modalTrigger || modal )[modalComponent],
        vars = privateProperties[ self[modalIDKey] ],
        options = vars.options

  if ( !vars.isAnimating // modal has no animations running
    && options.keyboard && which == 27 // the keyboard option is enabled and the key is 27
    && modal.classList.contains('show') ) // the modal is not visible
  {
    self.hide()
  }
}

function modalDismissHandler(e) {
  const modal = this,
        self = ( modal.modalTrigger || modal )[modalComponent],
        vars = privateProperties[ self[modalIDKey] ],
        options = vars.options

  if ( vars.isAnimating ) return

  let clickTarget = e.target,
      hasData = clickTarget.getAttribute( 'data-bs-dismiss' ) === 'modal',
      parentWithData = clickTarget.closest( '[data-bs-dismiss="modal"]' )

  if ( modal.classList.contains( 'show' ) // modal is visible AND
      && ( parentWithData || hasData // the event target is a dismissing element or it's child
      || clickTarget === modal && options.backdrop !== 'static' ) ) // OR event target is the non-static modal
  {
    self.hide()
    vars.relatedTarget = null
    e.preventDefault()
  }
}


// MODAL DEFINITION
// ================
export default class Modal {
  constructor( element, options ){ // element can be the modal/triggering button

    // set options
    options = options || {}

    // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
    element = queryElement( element )

    // determine modal, triggering element
    const modal = element.classList.contains( 'modal' ) ? element : getTargetElement( element )

    // modal is now independent of it's triggering element
    if ( element.classList.contains( 'modal' ) ) { element = null } 

    // reset on re-init
    if ( element ) {
      element[modalComponent] && element[modalComponent].dispose()
    } else {
      modal[modalComponent] && modal[modalComponent].dispose()
    }

    // set private properties unique ID key
    const elementID = getUID( ( element||modal ), modalIDKey )
    this[modalIDKey] = elementID
    modal[modalIDKey] = elementID

    // set associations
    if ( element ) {
      // modal is independent of a triggering element
      element.addEventListener( 'click', modalClickHandler )

      modal.modalTrigger = element
      element[modalIDKey] = elementID
      element[modalComponent] = this

    } else { 
      modal[modalComponent] = this
    }

    // set options
    const ops = {}
    ops.keyboard = options.keyboard === false || modal.getAttribute('data-bs-keyboard') === 'false' ? false : true
    ops.backdrop = options.backdrop === 'static' || modal.getAttribute('data-bs-backdrop') === 'static' ? 'static' : true
    ops.backdrop = options.backdrop === false || modal.getAttribute('data-bs-backdrop') === 'false' ? false : ops.backdrop
    ops.animation = modal.classList.contains('fade') ? true : false
    ops.content = options.content // JavaScript only

    // register private internals
    privateProperties[elementID] = {
      element: element,
      modal: modal,
      options: ops,
      isAnimating: false,
      relatedTarget: null
    }

    // set content from option
    options.content && this.setContent( options.content.trim() )
  }

  // MODAL PUBLIC METHODS
  // ====================
  toggle() {
    const { modal } = privateProperties[ this[modalIDKey] ]

    modal.classList.contains( 'show' ) ? this.hide() : this.show()
  }

  show() {
    const vars = privateProperties[ this[modalIDKey] ],
        { modal, options } = vars

    if ( modal.classList.contains( 'show' ) && !vars.isAnimating ) return

    showModalEvent.relatedTarget = vars.relatedTarget
    modal.dispatchEvent( showModalEvent )
    if ( showModalEvent.defaultPrevented ) return

    vars.isAnimating = true

    // we elegantly hide any opened modal
    const currentOpen = document.getElementsByClassName('modal show')[0],
          overlay = options.backdrop ? createModalOverlay( options ) : null

    let overlayDelay = 0

    if ( currentOpen && currentOpen !== modal ) {
      currentOpen.modalTrigger && currentOpen.modalTrigger[modalComponent].hide()
      currentOpen[modalComponent] && currentOpen[modalComponent].hide()
    }

    if ( overlay // overlay exists
      && !currentOpen // no open modal found 
      && !overlay.classList.contains( 'show' ) // overlay not visible
    ) {
      overlay.offsetWidth // force reflow to enable trasition
      overlayDelay = getElementTransitionDuration( overlay )
      overlay.classList.add( 'show' )
    }

    !currentOpen ? setTimeout( () => beforeModalShow( vars ), overlay && overlayDelay ? overlayDelay : 0 ) 
                 : beforeModalShow( vars )
  }

  hide( force ) {
    const vars = privateProperties[ this[modalIDKey] ], { modal } = vars
    
    if ( !modal.classList.contains( 'show' ) && !vars.isAnimating ) return

    modal.dispatchEvent( hideModalEvent )
    if ( hideModalEvent.defaultPrevented ) return

    vars.isAnimating = true
    modal.classList.remove( 'show' )
    modal.setAttribute( 'aria-hidden', true )

    modal.classList.contains( 'fade' ) && force !== 1 // modal should fade AND not forced to hide
        ? emulateTransitionEnd( modal, function triggerHideHandler() { triggerHide( 0, vars ) } ) // then wait for overlay to fade then triggerHide
        : triggerHide( force, vars ) // OR triggerHide on force or no fade class present
  }

  setContent( content ) {
    const { modal } = privateProperties[ this[modalIDKey] ]
    queryElement( '.modal-content', modal ).innerHTML = content.trim()
  }

  update() {
    const { modal } = privateProperties[ this[modalIDKey] ]
    modal.classList.contains( 'show' ) && setModalScrollbar( modal )
  }

  dispose() {
    const uid = this[modalIDKey],
          vars = privateProperties[uid],
          { modal, element } = vars

    this.hide(1) // forced call

    if ( element ) {
      delete element[modalComponent] // remove init object
      delete element[modalIDKey]
      delete modal.modalTrigger
      element.removeEventListener( 'click', modalClickHandler ) // detatch event handler
    } else { 
      delete modal[modalComponent] // remove init Object
    }

    // remove all associations
    delete privateProperties[uid]
    delete modal[modalIDKey]
    delete this[modalIDKey]
  }  
}

export const modalInit = {
  component: modalComponent,
  selector: modalSelector,
  constructor: Modal
}

