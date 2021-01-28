
/* Native JavaScript for Bootstrap 5 | ScrollSpy
------------------------------------------------ */
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import privateProperties from '../util/privateProperties.js'
import getUID from '../util/getUID.js'


// SCROLLSPY PRIVATE GC
// ====================
const scrollspyString = 'scrollspy',
      scrollspyComponent = 'ScrollSpy',
      scrollspySelector = '[data-bs-spy="scroll"]',
      scrollspyIDKey = `${scrollspyString}UID`


// SCROLLSPY CUSTOM EVENT
// ======================
const activateScrollSpy = bootstrapCustomEvent( `activate.bs.${scrollspyString}` )


// SCROLLSPY PRIVATE METHODS
// =========================
function updateSpyTargets( vars ){
  const links = vars.spyTarget.getElementsByTagName( 'A' ),
        { scrollTarget, length, isWindow, offset } = vars

  vars.scrollTop = isWindow ? scrollTarget.pageYOffset : scrollTarget.scrollTop

  // only update vars once or with each mutation
  if ( length !== links.length || getScrollHeight( scrollTarget ) !== vars.scrollHeight ) {
    let href, targetItem, rect

    // reset arrays & update 
    vars.items = []
    vars.offsets = []
    vars.scrollHeight = getScrollHeight( scrollTarget )
    vars.maxScroll = vars.scrollHeight - getOffsetHeight( vars )

    Array.from( links ).map( link => {
      href = link.getAttribute( 'href' )
      targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement( href )

      if ( targetItem ) {
        vars.items.push( link )
        rect = targetItem.getBoundingClientRect()        
        vars.offsets.push( ( isWindow ? rect.top + vars.scrollTop : targetItem.offsetTop ) - offset )
      }
    })
    vars.length = vars.items.length
  }
}

function getScrollHeight( scrollTarget ){
  return scrollTarget.scrollHeight || Math.max( 
    document.body.scrollHeight, 
    document.documentElement.scrollHeight)
}

function getOffsetHeight({isWindow,element}){
  return !isWindow ? element.getBoundingClientRect().height : window.innerHeight
}

function clear( spyTarget ){
  Array.from( spyTarget.getElementsByTagName( 'A' ) ).map( item => 
    item.classList.contains( 'active' ) 
    && item.classList.remove( 'active' ) )
}

function activate( item, vars ){
  const { element, spyTarget } = vars

  clear( spyTarget )
  vars.activeItem = item
  item.classList.add( 'active' )

  // activate all parents
  let parents = []
  while (item.parentNode !== document.body) {
    item = item.parentNode
    ;[ 'dropdown-menu', 'nav' ].some( c => item.classList.contains( c ) ) && parents.push(item)
  }

  parents.map( menuItem => {
    const parentLink = menuItem.previousElementSibling

    if ( parentLink && !parentLink.classList.contains( 'active' ) ) {
      parentLink.classList.add( 'active' )
    }      
  })

  // update relatedTarget and dispatch
  activateScrollSpy.relatedTarget = item
  element.dispatchEvent( activateScrollSpy )
}

function toggleSpyEvents( plus, uid, self ) {
  const action = plus ? 'addEventListener' : 'removeEventListener',
        scrollIdx = scrollHandlerQueue.indexOf( scrollHandlerQueue.find( s => s.id===uid ) ),
        resizeIdx = resizeHandlerQueue.indexOf( resizeHandlerQueue.find( r => r.id===uid ) ),
        { scrollTarget, isWindow } = privateProperties[uid],
        listener = { id: uid, self: self }

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


// SCROLLSPY EVENT HANDLER
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
export default class ScrollSpy {
  constructor( element, options ){

    // set options
    options = options || {}

    // initialization element, the element we spy on
    element = queryElement(element)

    // reset on re-init
    element[scrollspyComponent] && element[scrollspyComponent].dispose()

    // event targets, constants   
    // DATA API
    const spyTarget = queryElement( options.target || element.getAttribute( 'data-bs-target' ) ),
          // determine which is the real scrollTarget
          scrollTarget = element.clientHeight < element.scrollHeight ? element : window

    if ( !spyTarget ) return
    
    // set private properties unique ID key
    const elementID = getUID( element, scrollspyIDKey )
    
    this[scrollspyIDKey] = elementID
    element[scrollspyIDKey] = elementID
    
    privateProperties[elementID] = {
      element: element,
      offset: +(options.offset || element.getAttribute( 'data-bs-offset' )) || 10,
      length: 0,
      items: [],
      offsets: [],
      scrollTarget: scrollTarget,
      spyTarget: spyTarget,
      isWindow: scrollTarget === window,
      activeItem: null,
      scrollHeight: 0,
      maxScroll: 0
    }

    // prevent adding event handlers multiple times
    toggleSpyEvents( 1, elementID, this )

    this.refresh()

    // associate target with init object
    element[scrollspyComponent] = this
  }

  // SCROLLSPY PUBLIC METHODS
  // ========================
  refresh() {
    const vars = privateProperties[ this[scrollspyIDKey] ],
          { activeItem, spyTarget } = vars

    updateSpyTargets( vars )
    
    if ( vars.scrollTop >= vars.maxScroll ) {
      const newActiveItem = vars.items[vars.length - 1]

      if ( activeItem !== newActiveItem ) {
        activate( newActiveItem, vars )
      }
      return
    }

    if ( activeItem && vars.scrollTop < vars.offsets[0] && vars.offsets[0] > 0 ) {
      vars.activeItem = null
      clear( spyTarget )
      return
    }

    vars.items.map( ( item, i ) => {
      if ( vars.activeItem !== item && vars.scrollTop >= vars.offsets[i] 
        && ( typeof vars.offsets[i + 1] === 'undefined' || vars.scrollTop < vars.offsets[i + 1] ) )
      {
        activate( item, vars )
      }
    })
  }

  dispose() {
    const uid = this[scrollspyIDKey],
          { element } = privateProperties[uid]

    toggleSpyEvents( 0, uid, this )
    delete element[scrollspyComponent]
    delete element[scrollspyIDKey]
    delete this[scrollspyIDKey]
    delete privateProperties[uid]
  }
}

export const scrollSpyInit = {
  component: scrollspyComponent,
  selector: scrollspySelector,
  constructor: ScrollSpy
}

