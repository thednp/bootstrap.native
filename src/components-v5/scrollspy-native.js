
/* Native JavaScript for Bootstrap 5 | ScrollSpy
------------------------------------------------ */
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'
import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'

import activeClass from '../strings/activeClass.js'
import addEventListener from '../strings/addEventListener.js'
import removeEventListener from '../strings/removeEventListener.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import getTargetElement from '../util/getTargetElement.js'
import getUID from '../util/getUID.js'


// SCROLLSPY PRIVATE GC
// ====================
const scrollspyString = 'scrollspy',
    scrollspyComponent = 'ScrollSpy',
    scrollspySelector = '[data-bs-spy="scroll"]'


// SCROLLSPY SCOPE
// ===============
export default function ScrollSpy( scrollSpyElement, scrollSpyOptions ){


  // SCROLLSPY CUSTOM EVENT
  // ======================
  const activateScrollSpy = bootstrapCustomEvent( `activate.bs.${scrollspyString}` )

  let elementID,
      self,
      element,
      offset,
      itemsLength = 0,
      items = [],
      offsets = [],
      scrollTarget,
      spyTarget,
      isWindow,
      activeItem,
      scrollHeight,
      maxScroll,
      scrollTop


  // SCROLLSPY PRIVATE METHODS
  // =========================
  function updateSpyTargets(){
    const links = spyTarget.getElementsByTagName( 'A' )

    scrollTop = isWindow ? scrollTarget.pageYOffset : scrollTarget.scrollTop

    // only update items/offsets once or with each mutation
    if ( itemsLength !== links.length || getScrollHeight( scrollTarget ) !== scrollHeight ) {
      let href, targetItem, rect

      // reset arrays & update 
      items = []
      offsets = []
      scrollHeight = getScrollHeight( scrollTarget )
      maxScroll = scrollHeight - getOffsetHeight()

      Array.from( links ).map( link => {
        href = link.getAttribute( 'href' )
        targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement( href )
        // targetItem = getTargetElement( link )

        if ( targetItem ) {
          items.push( link )
          rect = targetItem.getBoundingClientRect()        
          offsets.push( ( isWindow ? rect.top + scrollTop : targetItem.offsetTop ) - offset )
        }
      })
      itemsLength = items.length
    }
  }

  function getScrollHeight( scrollTarget ){
    return scrollTarget.scrollHeight || Math.max( 
      document.body.scrollHeight, 
      document.documentElement.scrollHeight)
  }

  function getOffsetHeight(){
    return !isWindow ? element.getBoundingClientRect().height : window.innerHeight
  }

  function clear( spyTarget ){
    Array.from( spyTarget.getElementsByTagName( 'A' ) ).map( item => 
      hasClass( item, activeClass ) 
      && removeClass( item, activeClass ) )
  }

  function activate( item ){

    clear( spyTarget )
    activeItem = item
    addClass( item, activeClass )

    // activate all parents
    let parents = []
    while (item.parentNode !== document.body) {
      item = item.parentNode
      ;[ 'dropdown-menu', 'nav' ].some( c => hasClass( item, c ) ) && parents.push(item)
    }

    parents.map( menuItem => {
      const parentLink = menuItem.previousElementSibling

      if ( parentLink && !hasClass( parentLink, activeClass ) ) {
        addClass( parentLink, activeClass )
      }      
    })

    // update relatedTarget and dispatch
    activateScrollSpy.relatedTarget = item
    element.dispatchEvent( activateScrollSpy )
  }

  function toggleSpyHandlers( plus ) {
    const action = plus ? addEventListener : removeEventListener,
        scrollIdx = scrollHandlerQueue.indexOf( scrollHandlerQueue.find( s => s.id===elementID ) ),
        resizeIdx = resizeHandlerQueue.indexOf( resizeHandlerQueue.find( r => r.id===elementID ) ),
        listener = { id: elementID, self: self }

    // window should always have a single scroll/resize listener
    if ( !plus ) {
      scrollIdx > -1 && scrollHandlerQueue.splice( scrollIdx, 1 )
      resizeIdx > -1 && resizeHandlerQueue.splice( resizeIdx, 1 )
    }

    // scroll handling
    if ( !isWindow || plus && !scrollHandlerQueue.length || !plus ) {
      scrollTarget[action]( 'scroll', scrollUpdateHandler, passiveHandler )
    }

    // resize handling
    if ( plus && !resizeHandlerQueue.length || !plus && !resizeHandlerQueue.length ) {
      window[action]( 'resize', resizeUpdateHandler, passiveHandler )
    }

    if ( plus ) {
      scrollHandlerQueue.push( listener )
      resizeHandlerQueue.push( listener )
    }
  }


  // SCROLLSPY EVENT HANDLERS
  // ========================
  let scrollHandlerQueue = []
  function scrollUpdateHandler(){
    scrollHandlerQueue.map( i => i.self.refresh() )
  }

  let resizeHandlerQueue = []
  function resizeUpdateHandler(){
    resizeHandlerQueue.map( i => i.self.refresh() )
  }


  // SCROLLSPY DEFINITION
  // ====================
  class ScrollSpy {
    constructor( target, options ){

      // bind
      self = this

      // set options
      options = options || {}

      // initialization element, the element we spy on
      element = queryElement( target )

      // reset previous instance
      element[scrollspyComponent] && element[scrollspyComponent].dispose()

      // event targets, constants   
      // JavaScript API options > DATA API
      spyTarget = queryElement( options.target ) || getTargetElement( element )
      // determine which is the real scrollTarget
      scrollTarget = element.clientHeight < element.scrollHeight ? element : window

      if ( !spyTarget ) return
      
      offset = +(options.offset || element.getAttribute( 'data-bs-offset' )) || 10
      isWindow = scrollTarget === window
      elementID = getUID( element )

      // prevent adding event handlers multiple times
      toggleSpyHandlers( 1 )

      self.refresh()

      // associate target with init object
      element[scrollspyComponent] = self
    }
  }


  // SCROLLSPY PUBLIC METHODS
  // ========================
  const ScrollSpyProto = ScrollSpy.prototype

  ScrollSpyProto.refresh = function() {

    updateSpyTargets()
    
    if ( scrollTop >= maxScroll ) {
      const newActiveItem = items[itemsLength - 1]

      if ( activeItem !== newActiveItem ) {
        activate( newActiveItem )
      }
      return
    }

    if ( activeItem && scrollTop < offsets[0] && offsets[0] > 0 ) {
      activeItem = null
      clear( spyTarget )
      return
    }

    items.map( ( item, i ) => {
      if ( activeItem !== item && scrollTop >= offsets[i] 
        && ( typeof offsets[i + 1] === 'undefined' || scrollTop < offsets[i + 1] ) )
      {
        activate( item )
      }
    })
  }

  ScrollSpyProto.dispose = function() {
    toggleSpyHandlers()
    delete element[scrollspyComponent]
  }

  return new ScrollSpy( scrollSpyElement, scrollSpyOptions )
}


export const scrollSpyInit = {
  component: scrollspyComponent,
  selector: scrollspySelector,
  constructor: ScrollSpy
}

