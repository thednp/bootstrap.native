
/* Native JavaScript for Bootstrap 5 | Alert
-------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'
// import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'
import addEventListener from 'shorter-js/src/strings/addEventListener.js'
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js'

import fadeClass from '../strings/fadeClass.js'
import showClass from '../strings/showClass.js'
import dataBsDismiss from '../strings/dataBsDismiss.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'


// ALERT PRIVATE GC
// ================
const alertString = 'alert',
    alertComponent = 'Alert',
    alertSelector = `[${dataBsDismiss}="${alertString}"]`


// ALERT SCOPE
// ===========
export default function Alert( alertTarget ) {

  let self, element, alert

  // ALERT CUSTOM EVENTS
  // ===================
  const closeAlertEvent = bootstrapCustomEvent( `close.bs.${alertString}` ), // 'type.bs.component'
      closedAlertEvent = bootstrapCustomEvent( `closed.bs.${alertString}` )


  // ALERT EVENT HANDLERS
  // ====================
  function alertTransitionEnd() {

    toggleAlertHandler()
    alert.dispatchEvent( closedAlertEvent )

    alert.parentNode.removeChild( alert )
  }

  function alertClickHandler(e) {
    const eventTarget = e.target

    alert && ( element === eventTarget || element.contains( eventTarget ) )
      && self.close()
  }


  // ALERT PRIVATE METHOD
  // ====================
  function toggleAlertHandler( action ) {
    action = action ? addEventListener : removeEventListener
    element[action]( 'click', alertClickHandler )
  }


  // ALERT DEFINITION
  // ================
  class Alert {
    constructor( target ){

      // bind 
      self = this

      // initialization element
      element = queryElement( target )
      
      // reset previous instance
      element[alertComponent] && element[alertComponent].dispose()

      alert = element.closest( `.${alertString}` )

      // add event listener
      toggleAlertHandler( 1 )

      // store init 
      element[alertComponent] = this
    }
  }


  // ALERT PUBLIC METHODS
  // ====================
  const AlertProto = Alert.prototype

  AlertProto.close = function() {
    if ( alert && hasClass( alert, showClass) ) {

      alert.dispatchEvent( closeAlertEvent )
      if ( closeAlertEvent.defaultPrevented ) return

      removeClass( alert, showClass )

      hasClass( alert, fadeClass )
        ? emulateTransitionEnd( alert, alertTransitionEnd ) 
        : alertTransitionEnd()

      this.dispose()
    }
  }

  AlertProto.dispose = function() {
    toggleAlertHandler()
    delete element[alertComponent]
  }

  return new Alert( alertTarget )
}


export const alertInit = {
  component: alertComponent,
  selector: alertSelector,
  constructor: Alert
}

