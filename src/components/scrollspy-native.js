
/* Native JavaScript for Bootstrap 5 | ScrollSpy
------------------------------------------------ */
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js'
import dispatchCustomEvent from '../util/dispatchCustomEvent.js'
import getScroll from '../util/getScroll.js'

// SCROLLSPY DEFINITION
// ====================

export default function ScrollSpy(element,options) {

  // set options
  options = options || {}

  // bind
  let self = this,

    // GC internals
    vars, links,

    // DATA API
    targetData,
    offsetData,
    // targets
    spyTarget,
    // determine which is the real scrollTarget
    scrollTarget,
    // options
    ops = {}

  // private methods
  // populate items and targets
  function updateTargets(){
    links = spyTarget.getElementsByTagName( 'A' )

    vars.scrollTop = vars.isWindow ? getScroll().y : element.scrollTop

    // only update vars once or with each mutation
    if ( vars.length !== links.length || getScrollHeight() !== vars.scrollHeight ) {
      let href, targetItem, rect

      // reset arrays & update 
      vars.items = []
      vars.offsets = []
      vars.scrollHeight = getScrollHeight()
      vars.maxScroll = vars.scrollHeight - getOffsetHeight()

      Array.from( links ).map( link => {
        href = link.getAttribute( 'href' )
        targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement( href )

        if ( targetItem ) {
          vars.items.push( link )
          rect = targetItem.getBoundingClientRect()        
          vars.offsets.push( ( vars.isWindow ? rect.top + vars.scrollTop : targetItem.offsetTop ) - ops.offset )
        }
      })
      vars.length = vars.items.length
    }
  }
  // item update
  function toggleEvents(action) {
    action = action ? 'addEventListener' : 'removeEventListener'
    scrollTarget[action]( 'scroll', self.refresh, passiveHandler )
    window[action]( 'resize', self.refresh, passiveHandler )
  }
  function getScrollHeight(){
    return scrollTarget.scrollHeight || Math.max( 
      document.body.scrollHeight, 
      document.documentElement.scrollHeight)
  }
  function getOffsetHeight(){
    return !vars.isWindow ? element.getBoundingClientRect().height : window.innerHeight
  }
  function clear(){
    Array.from( links ).map( item => item.classList.contains( 'active' ) && item.classList.remove( 'active' ) )
  }
  function activate( item ){
    clear()
    vars.activeItem = item
    item.classList.add( 'active' )

    // activate all parents
    let parents = []
    while (item.parentNode !== document.body) {
      item = item.parentNode;
      [ 'dropdown-menu', 'nav' ].some( pc => item.classList.contains( pc ) ) && parents.push(item)
    }

    parents.map( menuItem => {
      const parentLink = menuItem.previousElementSibling

      if ( parentLink && !parentLink.classList.contains( 'active' ) ) {
        parentLink.classList.add( 'active' )
      }      
    })

    dispatchCustomEvent.call( element, bootstrapCustomEvent( 'activate', 'scrollspy', { relatedTarget: vars.activeItem } ) )
  }

  // public method
  self.refresh = () => {
    updateTargets()
    
    if ( vars.scrollTop >= vars.maxScroll ) {
      const newActiveItem = vars.items[vars.length - 1]

      if ( vars.activeItem !== newActiveItem ) {
        activate( newActiveItem )
      }

      return
    }

    if ( vars.activeItem && vars.scrollTop < vars.offsets[0] && vars.offsets[0] > 0 ) {
      vars.activeItem = null
      clear()
      return
    }

    for ( let i = vars.length; i--; ) {
      if ( vars.activeItem !== vars.items[i] && vars.scrollTop >= vars.offsets[i] 
        && (typeof vars.offsets[i + 1] === 'undefined' || vars.scrollTop < vars.offsets[i + 1] ) ) {
          activate( vars.items[i] )
      }
    }
  }
  self.dispose = () => {
    toggleEvents()
    delete element.ScrollSpy
  }

  // init
  // initialization element, the element we spy on
  element = queryElement(element)

  // reset on re-init
  element.ScrollSpy && element.ScrollSpy.dispose()

  // event targets, constants   
  // DATA API
  targetData = element.getAttribute( 'data-target' )
  offsetData = element.getAttribute( 'data-offset' )

  // targets
  spyTarget = queryElement( options.target || targetData )

  // determine which is the real scrollTarget
  scrollTarget = element.clientHeight < element.scrollHeight ? element : window

  if ( !spyTarget ) return

  // set instance option
  ops.offset = +(options.offset || offsetData) || 10

  // set instance priority variables
  vars = {}
  vars.length = 0
  vars.items = []
  vars.offsets = []
  vars.isWindow = scrollTarget === window
  vars.activeItem = null
  vars.scrollHeight = 0
  vars.maxScroll = 0

  // prevent adding event handlers twice
  !element.ScrollSpy && toggleEvents(1)

  self.refresh()

  // associate target with init object
  element.ScrollSpy = self
}

