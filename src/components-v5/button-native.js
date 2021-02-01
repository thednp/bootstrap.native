
/* Native JavaScript for Bootstrap 5 | Button
---------------------------------------------*/
import queryElement from 'shorter-js/src/misc/queryElement.js'
import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'

import activeClass from '../strings/activeClass.js'
import addEventListener from '../strings/addEventListener.js'
import removeEventListener from '../strings/removeEventListener.js'
import dataBsToggle from '../strings/dataBsToggle.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'


// BUTTON PRIVATE GC
// =================
const buttonString = 'button',
    buttonComponent = 'Button',
    buttonSelector = `[${dataBsToggle}="${buttonString}s"]`


// BUTTON SCOPE
// ============
export default function Button( buttonTarget ){

  let element, buttons, checkedAttr = 'checked'

  // BUTTON CUSTOM EVENT
  // ===================
  const changeButtonEvent = bootstrapCustomEvent( `change.bs.${buttonString}` )


  // BUTTON PRIVATE METHODS
  // ======================
  function toggleButtonHandlers( action ) {
    action = action ? addEventListener : removeEventListener

    element[action]( 'click', toggleButtonAction )
    element[action]( 'keyup', buttonKeyHandler )
    element[action]( 'keydown', buttonPreventScroll )
    element[action]( 'focusin', buttonFocusHandler )
    element[action]( 'focusout', buttonFocusHandler )
  }


  // BUTTON EVENT HANDLERS
  // =====================
  function toggleButtonAction(e) {
    const eventTarget = e.target,
        label = eventTarget.tagName === 'LABEL' ? eventTarget // the .btn label 
              : eventTarget.closest( 'LABEL' ),
        input = label && label.getElementsByTagName( 'INPUT' )[0]

    // invalidate if no input
    if ( !input ) return

    element.dispatchEvent( changeButtonEvent ) // trigger the change for the btn-group
    if ( changeButtonEvent.defaultPrevented ) return // discontinue when defaultPrevented is true

    // manage the dom manipulation
    if ( input.type === 'checkbox' ) { //checkboxes

      if ( !input[checkedAttr] ) {
        addClass( label, activeClass )
        input.getAttribute( checkedAttr )
        input.setAttribute( checkedAttr, checkedAttr )
        input[checkedAttr] = true
      } else {
        removeClass( label, activeClass )
        input.getAttribute( checkedAttr )
        input.removeAttribute( checkedAttr )
        input[checkedAttr] = false
      }

      if ( !element.toggled ) { // prevent triggering the event twice
        element.toggled = true
      }
    }

    if ( input.type === 'radio' && !element.toggled ) { // radio buttons
      // if ( changeButtonEvent.defaultPrevented ) return
      // don't trigger if already active (the OR condition is a hack to check 
      // if the buttons were selected with key press and NOT mouse click)
      if ( !input[checkedAttr] || (e.screenX === 0 && e.screenY == 0) ) {

        addClass( label, activeClass )
        addClass( label, 'focus' )

        input.setAttribute( checkedAttr, checkedAttr )
        input[checkedAttr] = true
        element.toggled = true

        Array.from( buttons ).map( otherLabel => {
          const otherInput = otherLabel.getElementsByTagName( 'INPUT' )[0]

          if ( otherLabel !== label && hasClass( otherLabel, activeClass ) )  {
            otherInput.dispatchEvent( changeButtonEvent ) // trigger the change
            removeClass( otherLabel, activeClass )
            otherInput.removeAttribute( checkedAttr )
            otherInput[checkedAttr] = false
          }
        })
      }
    }
    setTimeout( () => { element.toggled = false; }, 10 )
  }

  function buttonKeyHandler(e) {
    e.which === 32 && e.target === document.activeElement && toggleButtonAction(e)
  }

  function buttonPreventScroll(e) { 
    e.which === 32 && e.preventDefault()
  }

  function buttonFocusHandler(e) {
    const eventTarget = e.target, 
        action = e.type === 'focusin' ? addClass : removeClass

    eventTarget.tagName === 'INPUT' &&
      action( eventTarget.closest( '.btn' ), 'focus' )
  }


  // BUTTON DEFINITION
  // =================
  class Button {
    constructor( target ){

      // initialization element
      element = queryElement( target )

      // reset previous instance
      element[buttonComponent] && element[buttonComponent].dispose()

      // store all possible targets
      buttons = element.getElementsByClassName( 'btn' )
      
      // invalidate
      if (!buttons.length) return
      
      // set initial toggled state
      // toggled makes sure to prevent triggering twice the change.bs.button events
      element.toggled = false

      // activate items on init
      Array.from( buttons ).map( btn => {
        !hasClass( btn, activeClass )
          && queryElement( `input:${checkedAttr}`, btn )
          && addClass( btn, activeClass )
        hasClass( btn, activeClass )
          && !queryElement( `input:${checkedAttr}`, btn )
          && removeClass( btn, activeClass )
      })

      // add event listeners
      toggleButtonHandlers( 1 )
      // attach instance to element
      element[buttonComponent] = this
    }
  }


  // BUTTON PUBLIC METHOD
  // ====================
  Button.prototype.dispose = function() {
    toggleButtonHandlers()
    delete element.toggled
    delete element[buttonComponent]
  }

  return new Button( buttonTarget )
}


export const buttonInit = {
  component: buttonComponent,
  selector: buttonSelector,
  constructor: Button
}

