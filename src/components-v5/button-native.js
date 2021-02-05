
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


// BUTTON PRIVATE GC
// =================
const buttonString = 'button',
    buttonComponent = 'Button',
    buttonSelector = `[${dataBsToggle}="${buttonString}"]`,
    ariaPressed = 'aria-pressed'


// BUTTON SCOPE
// ============
export default function Button( buttonTarget ){

  let self, element, isActive

  // BUTTON PRIVATE METHOD
  // =====================
  function handleButtonToggle( e ) {
    self.toggle.apply( element, [e] ) 
  }

  // BUTTON PRIVATE METHOD
  // =====================
  function toggleButtonHandler(action) {
    action = action ? addEventListener : removeEventListener
    element[action]( 'click', handleButtonToggle )
  }  

  // BUTTON DEFINITION
  // =================
  class Button {
    constructor( target ){

      self = this
      
      // initialization element
      element = queryElement( target )

      // reset previous instance
      element[buttonComponent] && element[buttonComponent].dispose()
      
      // set initial state
      isActive = hasClass( element, activeClass )
      element.setAttribute( ariaPressed, isActive ? true : 'false' )

      // add event listener
      toggleButtonHandler( 1 )

      // attach instance to element
      element[buttonComponent] = self
    }
  }

  
  // BUTTON PUBLIC METHODS
  // =====================
  const ButtonProto = Button.prototype

  ButtonProto.toggle = function(e) {
    e.preventDefault()

    if ( hasClass( element, 'disabled' ) ) return 

    isActive = hasClass( element, activeClass )
    
    const action = isActive ? removeClass : addClass,
          ariaValue = isActive ? 'false' : 'true'

    action( element, activeClass )
    element.setAttribute( ariaPressed, ariaValue )
  }

  ButtonProto.dispose = function() {
    toggleButtonHandler()
    delete element[buttonComponent]
  }

  return new Button( buttonTarget )
}


export const buttonInit = {
  component: buttonComponent,
  selector: buttonSelector,
  constructor: Button
}

