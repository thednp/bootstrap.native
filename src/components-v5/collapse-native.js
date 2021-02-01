
/* Native JavaScript for Bootstrap 5 | Collapse
----------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'
import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'

import ariaExpanded from '../strings/ariaExpanded.js'
import dataBsToggle from '../strings/dataBsToggle.js'
import collapsingClass from '../strings/collapsingClass.js'
import showClass from '../strings/showClass.js'
import addEventListener from '../strings/addEventListener.js'
import removeEventListener from '../strings/removeEventListener.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import getTargetElement from '../util/getTargetElement.js'
// import normalizeOptions from '../util/normalizeOptions.js'


// COLLAPSE GC
// ===========
const collapseString = 'collapse',
    collapseComponent = 'Collapse',
    collapseSelector = `[${dataBsToggle}="${collapseString}"]`


// COLLAPSE SCOPE
// ==============
export default function Collapse( collapseElement, collapseOptions ) {

  // COLLAPSE INTERNALS
  // ==================
  let self, element, collapse, accordion, collapseAnimating


  // COLLAPSE CUSTOM EVENTS
  // ======================
  const showCollapseEvent = bootstrapCustomEvent( `show.bs.${collapseString}` ),
      shownCollapseEvent = bootstrapCustomEvent( `shown.bs.${collapseString}` ),
      hideCollapseEvent = bootstrapCustomEvent( `hide.bs.${collapseString}` ),
      hiddenCollapseEvent = bootstrapCustomEvent( `hidden.bs.${collapseString}` )


  // COLLAPSE PRIVATE METHODS
  // ========================
  function expandCollapse() {

    collapse.dispatchEvent( showCollapseEvent )
    if ( showCollapseEvent.defaultPrevented ) return

    collapseAnimating = true
    accordion && ( accordion.isAnimating = true )

    addClass( collapse, collapsingClass )
    removeClass( collapse, collapseString )

    collapse.style.height = `${collapse.scrollHeight}px`
    
    emulateTransitionEnd( collapse, () => {
      collapseAnimating = false
      accordion && ( accordion.isAnimating = false )

      collapse.setAttribute( ariaExpanded, 'true' )
      element.setAttribute( ariaExpanded, 'true' )

      removeClass( collapse, collapsingClass )
      addClass( collapse, collapseString )
      addClass( collapse, showClass )

      collapse.style.height = ''
      collapse.dispatchEvent( shownCollapseEvent )
    })
  }

  function collapseContent({ collapse, element }) {
    collapse.dispatchEvent( hideCollapseEvent )
    if ( hideCollapseEvent.defaultPrevented ) return

    collapseAnimating = true
    accordion && ( accordion.isAnimating = true )

    collapse.style.height = `${collapse.scrollHeight}px`

    removeClass( collapse, collapseString )
    removeClass( collapse, showClass )
    addClass( collapse, collapsingClass )

    collapse.offsetWidth // force reflow
    collapse.style.height = '0px'

    emulateTransitionEnd( collapse, () => {
      collapseAnimating = false
      accordion && ( accordion.isAnimating = false )

      collapse.setAttribute( ariaExpanded, 'false' )
      element.setAttribute( ariaExpanded, 'false' )

      removeClass( collapse, collapsingClass )
      addClass( collapse, collapseString )

      collapse.style.height = ''
      collapse.dispatchEvent( hiddenCollapseEvent )
    })
  }

  function toggleCollapseHandler( action ) {
    action = action ? addEventListener : removeEventListener
    element[action]( 'click', collapseClickHandler )
  }


  // COLLAPSE EVENT HANDLER
  // ======================
  function collapseClickHandler(e){
    const eventTarget = e.target

    self.toggle()

    // event target is anchor link with collapse DATA API #398
    if ( e && eventTarget.tagName === 'A' && eventTarget.getAttribute( dataBsToggle ) === collapseString 
      || element.tagName === 'A' ) // OR our init element is anchor link
    {
      e.preventDefault() 
    }
  }


  // COLLAPSE DEFINITION
  // ===================
  class Collapse {
    constructor( target, options ) {
      
      // bind
      self = this
      
      // set options
      options = options || {}

      // initialization element
      element = queryElement( target )

      // reset on re-init
      element[collapseComponent] && element[collapseComponent].dispose()

      // determine targets
      collapse =  queryElement( options.target ) || getTargetElement( element )
      accordion = element.closest( options.parent ) || getTargetElement( collapse )

      collapse && ( collapseAnimating = false )
      accordion && ( accordion.isAnimating = false )

      // add event listeners
      toggleCollapseHandler( 1 )

      // associate target to init object
      element[collapseComponent] = self
    }
  }


  // COLLAPSE PUBLIC METHODS
  // =======================
  const CollapseProto = Collapse.prototype

  CollapseProto.toggle = function() {
    if ( !hasClass( collapse, showClass ) ) { this.show() } 
    else { this.hide() }
  }

  CollapseProto.hide = function() {   
    if ( collapseAnimating ) return

    collapseContent({ collapse, element })
    addClass( element, `${collapseString}d` )
  }

  CollapseProto.show = function() {
    let activeElement, activeCollapse

    if ( accordion ) {
      activeCollapse = accordion.getElementsByClassName( `${collapseString} ${showClass}` )[0]
      activeElement = Array.from( accordion.querySelectorAll( collapseSelector ) )
                            .find( c => !hasClass( c, `${collapseString}d` ) )
    }

    if ( ( !accordion || accordion && !accordion.isAnimating ) && !collapseAnimating ) {
      if ( activeElement && activeCollapse !== collapse ) {
        collapseContent({ collapse: activeCollapse, element: activeElement })
        addClass( activeElement, `${collapseString}d` )
      }
      expandCollapse()
      removeClass( element, `${collapseString}d` )
    }
  }

  CollapseProto.dispose = function() {

    toggleCollapseHandler()

    accordion && ( delete accordion.isAnimating )
    delete element[collapseComponent]
  }

  return new Collapse( collapseElement, collapseOptions )
}


export const collapseInit = {
  component: collapseComponent,
  selector: collapseSelector,
  constructor: Collapse
}

