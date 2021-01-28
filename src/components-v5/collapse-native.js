
/* Native JavaScript for Bootstrap 5 | Collapse
----------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import privateProperties from '../util/privateProperties.js'
import getTargetElement from '../util/getTargetElement.js'
import getUID from '../util/getUID.js'


// COLLAPSE GC
// ===========
const collapseString = 'collapse',
      collapseComponent = 'Collapse',
      collapseSelector = '[data-bs-toggle="collapse"]',
      collapseIDKey = `${collapseString}UID`


// COLLAPSE CUSTOM EVENTS
// ======================
const showCollapseEvent = bootstrapCustomEvent( `show.bs.${collapseString}` ),
      showsCollapseEvent = bootstrapCustomEvent( `shown.bs.${collapseString}` ),
      hideCollapseEvent = bootstrapCustomEvent( `hide.bs.${collapseString}` ),
      hiddenCollapseEvent = bootstrapCustomEvent( `hidden.bs.${collapseString}` )


// COLLAPSE PRIVATE METHODS
// ========================
function openAction( vars ) {
  const { collapse, element, accordion } = vars

  collapse.dispatchEvent( showCollapseEvent )
  if ( showCollapseEvent.defaultPrevented ) return

  collapse.isAnimating = true
  accordion && ( accordion.isAnimating = true )

  collapse.classList.add( 'collapsing' )
  collapse.classList.remove( 'collapse' )
  collapse.style.height = `${collapse.scrollHeight}px`
  
  emulateTransitionEnd( collapse, () => {
    collapse.isAnimating = false
    accordion && ( accordion.isAnimating = false )

    collapse.setAttribute( 'aria-expanded', 'true' )
    element.setAttribute( 'aria-expanded', 'true' )
    collapse.classList.remove( 'collapsing' )
    collapse.classList.add( 'collapse' )
    collapse.classList.add( 'show' )
    collapse.style.height = ''
    collapse.dispatchEvent( showsCollapseEvent )
  })
}

function closeAction( vars ) {
  const { collapse, element, accordion } = vars
          
  collapse.dispatchEvent( hideCollapseEvent )
  if ( hideCollapseEvent.defaultPrevented ) return

  collapse.isAnimating = true
  accordion && ( accordion.isAnimating = true )

  collapse.style.height = `${collapse.scrollHeight}px` // set height first
  collapse.classList.remove( 'collapse' )
  collapse.classList.remove( 'show' )
  collapse.classList.add( 'collapsing' )
  collapse.offsetWidth // force reflow
  collapse.style.height = '0px'
  
  emulateTransitionEnd( collapse, () => {
    collapse.isAnimating = false
    accordion && ( accordion.isAnimating = false )

    collapse.setAttribute( 'aria-expanded', 'false' )
    element.setAttribute( 'aria-expanded', 'false' )
    collapse.classList.remove( 'collapsing' )
    collapse.classList.add( 'collapse' )
    collapse.style.height = ''
    collapse.dispatchEvent( hiddenCollapseEvent )
  })
}


// COLLAPSE EVENT HANDLER
// ======================
function collapseClickHandler(e){
  const eventTarget = e.target,
        element = this,
        self = element[collapseComponent]

  self.toggle()
  // event target is anchor link with collapse DATA API #398
  if ( e && eventTarget.tagName === 'A' && eventTarget.getAttribute( 'data-bs-toggle' ) === 'collapse' 
    || element.tagName === 'A' ) // OR our init element is anchor link
  {
    e.preventDefault() 
  }
}


// COLLAPSE DEFINITION
// ===================
export default class Collapse {
  constructor( element, options ) {
    
    // set options
    options = options || {}

    // initialization element
    element = queryElement(element)

    // reset on re-init
    element[collapseComponent] && element[collapseComponent].dispose()

    // determine targets
    const collapse =  queryElement( options.target ) || getTargetElement( element ),
          accordion = element.closest( options.parent || collapse.getAttribute( 'data-bs-parent' ) )

    collapse && ( collapse.isAnimating = false )
    accordion && ( accordion.isAnimating = false )

    // prevent adding event handlers twice
    element.addEventListener( 'click', collapseClickHandler )

    // set private properties unique ID key
    const elementID = getUID( element, collapseIDKey )

    // after validation set
    this[collapseIDKey] = elementID
    privateProperties[elementID] = {
      element: element,
      collapse: collapse,
      accordion: accordion
    }

    // associate target to init object
    element.Collapse = this
  }

  // COLLAPSE PUBLIC METHODS
  // =======================
  toggle() {
    const { collapse } = privateProperties[ this[collapseIDKey] ]

    if ( !collapse.classList.contains( 'show' ) ) { this.show() } 
    else { this.hide() }
  }

  hide() {
    const vars = privateProperties[ this[collapseIDKey] ],
        { collapse, element } = vars
    
    if ( collapse.isAnimating ) return

    closeAction( vars )
    element.classList.add( 'collapsed' )
  }
  show() {
    const vars = privateProperties[ this[collapseIDKey] ],
      { collapse, element, accordion } = vars

    let activeElement, activeCollapse

    if ( accordion ) {
      activeCollapse = accordion.getElementsByClassName( 'collapse show' )[0]
      activeElement = Array.from( accordion.querySelectorAll( collapseSelector ) )
                           .find( c => !c.classList.contains( 'collapsed' ) )
    }

    if ( ( !accordion || accordion && !accordion.isAnimating ) && !collapse.isAnimating ) {
      if ( activeElement && activeCollapse !== collapse ) {
        closeAction( { collapse: activeCollapse, element: activeElement, accordion: accordion } )
        activeElement.classList.add( 'collapsed' )
      }
      openAction( vars )
      element.classList.remove( 'collapsed' )
    }
  }
  dispose() {
    const uid = this[collapseIDKey],
        {element} = privateProperties[uid]
          
    element.removeEventListener( 'click', collapseClickHandler )

    delete element[collapseComponent]
    delete element[collapseIDKey]
    delete this[collapseIDKey]
    delete privateProperties[uid]
  }
}

export const collapseInit = {
  component: collapseComponent,
  selector: collapseSelector,
  constructor: Collapse
}

