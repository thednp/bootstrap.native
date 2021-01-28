
/* Native JavaScript for Bootstrap 5 | Alert
-------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import privateProperties from '../util/privateProperties.js'
import getUID from '../util/getUID.js'


// ALERT PRIVATE GC
// ================
const alertString = 'alert',
      alertComponent = 'Alert',
      alertSelector = '[data-bs-dismiss="alert"]',
      alertIDKey = `${alertString}UID`


// ALERT CUSTOM EVENTS
// ===================
const closeAlertEvent = bootstrapCustomEvent( `close.bs.${alertString}` ), // 'type.bs.component'
      closedAlertEvent = bootstrapCustomEvent( `closed.bs.${alertString}` )


// ALERT EVENT HANDLERS
// ====================
function alertTransitionEndHandler( alert ) {
  const element = queryElement( alertSelector, alert )

  element.removeEventListener( 'click', alertClickHandler )
  alert.dispatchEvent( closedAlertEvent )

  alert.parentNode.removeChild( alert )
}

function alertClickHandler(e) {
  const eventTarget = e.target,
        element = this,
        alert = eventTarget && eventTarget.closest( '.alert' ) // go around and check

  alert && ( element === eventTarget || element.contains( eventTarget ) )
    && element[alertComponent].close()
}


// ALERT DEFINITION
// ================
export default class Alert {
  constructor( element ){

    // initialization element
    element = queryElement( element )
    
    // reset on re-init
    element[alertComponent] && element[alertComponent].dispose()

    // set private properties unique ID key
    const elementID = getUID( element, alertIDKey )

    this[alertIDKey] = elementID
    privateProperties[elementID] = {
      element: element,
      alert: element.closest( '.alert' )
    }

    // add event listener
    element.addEventListener( 'click', alertClickHandler )

    // store init object within target element 
    element[alertComponent] = this
  }

  // ALERT PUBLIC METHODS
  // ====================
  close(){
    const { alert } = privateProperties[ this[alertIDKey] ]

    if ( alert && alert.classList.contains( 'show' ) ) {
      alert.dispatchEvent( closeAlertEvent )
      if ( closeAlertEvent.defaultPrevented ) return

      alert.classList.remove( 'show' )

      alert.classList.contains( 'fade' )
        ? emulateTransitionEnd( alert, function endWrap() { alertTransitionEndHandler( alert ) } ) 
        : alertTransitionEndHandler( alert )

      this.dispose()
    }
  }

  dispose() {
    const uid = this[alertIDKey],
    { element } = privateProperties[ uid ]

    element.removeEventListener( 'click', alertClickHandler )

    delete element[alertComponent]
    delete element[alertIDKey]
    delete this[alertIDKey]
    delete privateProperties[uid]
  }
}

export const alertInit = {
  component: alertComponent,
  selector: alertSelector,
  constructor: Alert
}
