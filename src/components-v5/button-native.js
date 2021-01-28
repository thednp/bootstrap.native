
/* Native JavaScript for Bootstrap 5 | Button
---------------------------------------------*/
import queryElement from 'shorter-js/src/misc/queryElement.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import privateProperties from '../util/privateProperties.js'
import getUID from '../util/getUID.js'


// BUTTON PRIVATE GC
// =================
const buttonString = 'button',
      buttonComponent = 'Button',
      buttonSelector = '[data-bs-toggle="buttons"]',
      buttonIDKey = `${buttonString}UID`


// BUTTON CUSTOM EVENT
// ===================
const changeButtonEvent = bootstrapCustomEvent( `change.bs.${buttonString}` )


// BUTTON PRIVATE METHODS
function toggleButtonEvents( self, action) {
  action = action ? 'addEventListener' : 'removeEventListener'

  const { element } = privateProperties[ self[buttonIDKey] ]

  element[action]( 'click', toggleButtonHandler )
  element[action]( 'keyup', buttonKeyHandler )
  element[action]( 'keydown', buttonPreventScroll )
  element[action]( 'focusin', buttonFocusHandler )
  element[action]( 'focusout', buttonFocusHandler )
}


// BUTTON EVENT HANDLERS
// =====================
function toggleButtonHandler(e) {
  const eventTarget = e.target,
        element = eventTarget.closest( buttonSelector ),
        vars = privateProperties[ element[buttonIDKey] ],
        buttons = vars.buttons,
        label = eventTarget.tagName === 'LABEL' ? eventTarget // the .btn label 
              : eventTarget.closest( 'LABEL' ),
        input = label && label.getElementsByTagName( 'INPUT' )[0]

  // invalidate if no input
  if ( !input ) return

  element.dispatchEvent( changeButtonEvent ) // trigger the change for the btn-group
  if ( changeButtonEvent.defaultPrevented ) return // discontinue when defaultPrevented is true

  // manage the dom manipulation
  if ( input.type === 'checkbox' ) { //checkboxes

    if ( !input.checked ) {
      label.classList.add( 'active' )
      input.getAttribute( 'checked' )
      input.setAttribute( 'checked', 'checked' )
      input.checked = true
    } else {
      label.classList.remove( 'active' )
      input.getAttribute( 'checked' )
      input.removeAttribute( 'checked' )
      input.checked = false
    }

    if ( !element.toggled ) { // prevent triggering the event twice
      element.toggled = true
    }
  }

  if ( input.type === 'radio' && !element.toggled ) { // radio buttons
    // if ( changeButtonEvent.defaultPrevented ) return
    // don't trigger if already active (the OR condition is a hack to check 
    // if the buttons were selected with key press and NOT mouse click)
    if ( !input.checked || (e.screenX === 0 && e.screenY == 0) ) {
      label.classList.add( 'active' )
      label.classList.add( 'focus' )
      input.setAttribute( 'checked', 'checked' )
      input.checked = true
      element.toggled = true

      buttons.map( otherLabel => {
        const otherInput = otherLabel.getElementsByTagName( 'INPUT' )[0]

        if ( otherLabel !== label && otherLabel.classList.contains( 'active' ) )  {
          otherInput.dispatchEvent( changeButtonEvent ) // trigger the change
          otherLabel.classList.remove( 'active' )
          otherInput.removeAttribute( 'checked' )
          otherInput.checked = false
        }
      })
    }
  }
  setTimeout( () => { element.toggled = false; }, 10 )
}

function buttonKeyHandler(e) {
  e.which === 32 && e.target === document.activeElement && toggleButtonHandler(e)
}

function buttonPreventScroll(e) { 
  e.which === 32 && e.preventDefault()
}

function buttonFocusHandler(e) {
  const eventTarget = e.target, 
        action = e.type === 'focusin' ? 'add' : 'remove'

  eventTarget.tagName === 'INPUT' &&
    eventTarget.closest( '.btn' ).classList[action]( 'focus' )
}


// BUTTON DEFINITION
// =================
export default class Button{
  constructor( element ){

    // initialization element
    element = queryElement(element)

    // reset on re-init
    element[buttonComponent] && element[buttonComponent].dispose()

    // store all possible targets
    const buttons = Array.from( element.getElementsByClassName( 'btn' ) )
    
    // invalidate
    if (!buttons.length) return

    // set private properties unique ID key
    const elementID = getUID( element, buttonIDKey )
    
    // associate target with init object
    this[buttonIDKey] = elementID
    element[buttonIDKey] = elementID
    privateProperties[elementID] = {
      element: element,
      buttons: buttons
    }
    
    // add event listeners
    toggleButtonEvents( this, 1 )
    element[buttonComponent] = this
    
    // set initial toggled state
    // toggled makes sure to prevent triggering twice the change.bs.button events
    element.toggled = false

    // activate items on init
    buttons.map( btn => {
      !btn.classList.contains( 'active' ) 
        && queryElement( 'input:checked', btn )
        && btn.classList.add( 'active' )
      btn.classList.contains( 'active' )
        && !queryElement( 'input:checked', btn )
        && btn.classList.remove( 'active' )
    })
  }

  // BUTTON PUBLIC METHOD
  dispose() {
    toggleButtonEvents( this )

    const uid = this[buttonIDKey],
        { element } = privateProperties[uid]

    delete element[buttonComponent]
    delete element[buttonIDKey]
    delete this[buttonIDKey]
    delete privateProperties[uid]
  }
}

export const buttonInit = {
  component: buttonComponent,
  selector: buttonSelector,
  constructor: Button
}

