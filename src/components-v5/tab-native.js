
/* Native JavaScript for Bootstrap 5 | Tab
------------------------------------------ */
import supportTransition from 'shorter-js/src/boolean/supportTransition.js'
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import privateProperties from '../util/privateProperties.js'
import getUID from '../util/getUID.js'

// TAB PRIVATE GC
// ================
const tabString = 'tab',
      tabComponent = 'Tab',
      tabSelector = '[data-bs-toggle="tab"]',
      tabIDKey = `${tabString}UID`


// TAB CUSTOM EVENTS
// =================
const showTabEvent = bootstrapCustomEvent( `show.bs.${tabString}` ),
      shownTabEvent = bootstrapCustomEvent( `shown.bs.${tabString}` ),
      hideTabEvent = bootstrapCustomEvent( `hide.bs.${tabString}` ), 
      hiddenTabEvent = bootstrapCustomEvent( `hidden.bs.${tabString}` )


// TAB PRIVATE METHODS
// ===================
function triggerTabEnd( { tabContent, nav } ) {
  tabContent.style.height = ''
  tabContent.classList.remove( 'collapsing' )
  nav.isAnimating = false
}

function triggerTabShow( { next, nextHeight, activeTab, tabContent, nav, equalContents } ) {
  if ( tabContent ) { // height animation
    if ( equalContents ) {
      triggerTabEnd( { tabContent, nav } )
    } else {
      setTimeout( () => { // enables height animation
        tabContent.style.height = `${nextHeight}px` // height animation
        tabContent.offsetWidth
        emulateTransitionEnd( tabContent, function endWrapper() { 
          triggerTabEnd( { tabContent, nav } ) 
        })
      }, 50 )
    }
  } else {
    nav.isAnimating = false
  }
  shownTabEvent.relatedTarget = activeTab
  next.dispatchEvent( shownTabEvent )
}

function triggerTabHide( vars ) {
  const { tabContent, activeTab, activeContent, next, nextContent } = vars

  if ( tabContent ) {
    activeContent.style.float = 'left'
    nextContent.style.float = 'left'
    vars.containerHeight = activeContent.scrollHeight
  }

  // update relatedTarget and dispatch event
  showTabEvent.relatedTarget = activeTab
  hiddenTabEvent.relatedTarget = next
  next.dispatchEvent( showTabEvent )
  if ( showTabEvent.defaultPrevented ) return
    
  nextContent.classList.add('active')
  activeContent.classList.remove('active')

  if ( tabContent ) {
    vars.nextHeight = nextContent.scrollHeight
    vars.equalContents = vars.nextHeight === vars.containerHeight
    tabContent.classList.add( 'collapsing' )
    tabContent.style.height = `${vars.containerHeight}px` // height animation
    tabContent.offsetHeight
    activeContent.style.float = ''
    nextContent.style.float = ''
  }

  if ( nextContent.classList.contains( 'fade' ) ) {
    setTimeout( () => {
      nextContent.classList.add( 'show' );
      emulateTransitionEnd( nextContent, function showWrap() {
        triggerTabShow( vars )
      })
    }, 20 )
  } else { triggerTabShow( vars ) }

  activeTab.dispatchEvent( hiddenTabEvent )
}

function getActiveTab( {nav} ) {
  let activeTabs = nav.getElementsByClassName('active'), activeTab

  if ( activeTabs.length === 1 
    && !activeTabs[0].parentNode.classList.contains( 'dropdown' ) ) 
  {
    activeTab = activeTabs[0]
  } else if ( activeTabs.length > 1 ) {
    activeTab = activeTabs[activeTabs.length-1]
  }
  return activeTab
}

function getActiveTabContent( {nav} ) { 
  return queryElement(getActiveTab( {nav} ).getAttribute('href')) 
}


// TAB EVENT HANDLER
// ================= 
function tabClickHandler(e) {
  const element = this,
        self = element[tabComponent],
        vars = privateProperties[ self[tabIDKey] ]

  e.preventDefault()
  vars.next = e.currentTarget
  !vars.nav.isAnimating && self.show()
}


// TAB DEFINITION
// ==============
export default class Tab {
  constructor( element, options ) {

    // set options
    options = options || {}

    // initialization element
    element = queryElement(element)

    // reset on re-init
    element[tabComponent] && element[tabComponent].dispose()

    // event targets
    const nav = element.closest( '.nav' ),
          dropdown = nav && queryElement( '.dropdown-toggle', nav ),
          activeContent = getActiveTabContent({ nav }),
          tabContent = supportTransition && activeContent.closest( '.tab-content' )

    // set default animation state
    nav.isAnimating = false

    // set private properties unique ID key
    const elementID = getUID( element, tabIDKey )
    element[tabIDKey] = elementID

    this[tabIDKey] = elementID
    privateProperties[elementID] = {
      element: element,
      next: null,
      nextContent: null,
      nextHeight: 0,
      activeTab: null,
      activeContent: activeContent,
      nav: nav,
      dropdown: dropdown,
      tabContent: tabContent,
      containerHeight: tabComponent.scrollHeight
    }

    // add event listener
    element.addEventListener( 'click', tabClickHandler )

    // associate target with init object
    element[tabComponent] = this
  }

  // TAB PUBLIC METHODS
  // ==================
  show() { // the tab we clicked is now the next tab
    const vars = privateProperties[ this[tabIDKey] ],
      { element, dropdown, nav } = vars

    let next = vars.next || element, nextContent, 
        activeTab, activeContent

    if ( !next.classList.contains( 'active' ) ) {
      nextContent = queryElement( next.getAttribute( 'href' ) ) // this is the actual object, the next tab content to activate
      activeTab = getActiveTab( {nav} )
      activeContent = getActiveTabContent( {nav} )
  
      // update relatedTarget and dispatch
      hideTabEvent.relatedTarget = next
      activeTab.dispatchEvent( hideTabEvent )
      if ( hideTabEvent.defaultPrevented ) return

      nav.isAnimating = true
      activeTab.classList.remove( 'active' )
      activeTab.setAttribute( 'aria-selected','false' )
      next.classList.add( 'active' )
      next.setAttribute( 'aria-selected', 'true' )
  
      if ( dropdown ) {
        if ( !element.parentNode.classList.contains( 'dropdown-menu' ) ) {
          dropdown.classList.contains( 'active' ) && dropdown.classList.remove( 'active' )
        } else {
          !dropdown.classList.contains( 'active' ) && dropdown.classList.add( 'active' )
        }
      }
  
      if ( activeContent.classList.contains( 'fade' ) ) {
        activeContent.classList.remove( 'show' )
        emulateTransitionEnd( activeContent, function hideWrap(){
          triggerTabHide( vars ) 
        })
      } else { triggerTabHide( vars ) }

      // update vars
      vars.next = next
      vars.nextContent = nextContent
      vars.activeTab = activeTab
      vars.activeContent = activeContent
    }
  }

  dispose() {
    const uid = this[tabIDKey],
    { element } = privateProperties[uid]

    element.removeEventListener( 'click', tabClickHandler )
    delete this[tabIDKey]
    delete element[tabIDKey]
    delete element[tabComponent]
    delete privateProperties[uid]
  }
}

export const tabInit = {
  component: tabComponent,
  selector: tabSelector,
  constructor: Tab
}

