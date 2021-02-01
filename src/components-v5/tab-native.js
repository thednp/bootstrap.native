
/* Native JavaScript for Bootstrap 5 | Tab
------------------------------------------ */
import supportTransition from 'shorter-js/src/boolean/supportTransition.js'
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'
import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'

import ariaSelected from '../strings/ariaSelected.js'
import collapsingClass from '../strings/collapsingClass.js'
import activeClass from '../strings/activeClass.js'
import fadeClass from '../strings/fadeClass.js'
import showClass from '../strings/showClass.js'
import dropdownClasses from '../strings/dropdownClasses.js'
import dropdownMenuClass from '../strings/dropdownMenuClass.js'
import dataBsToggle from '../strings/dataBsToggle.js'
import addEventListener from '../strings/addEventListener.js'
import removeEventListener from '../strings/removeEventListener.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'


// TAB PRIVATE GC
// ================
const tabString = 'tab',
      tabComponent = 'Tab',
      tabSelector = `[${dataBsToggle}="${tabString}"]`


// TAB SCOPE
// ================
export default function Tab( tabElement ){

  // TAB CUSTOM EVENTS
  // =================
  const showTabEvent = bootstrapCustomEvent( `show.bs.${tabString}` ),
        shownTabEvent = bootstrapCustomEvent( `shown.bs.${tabString}` ),
        hideTabEvent = bootstrapCustomEvent( `hide.bs.${tabString}` ), 
        hiddenTabEvent = bootstrapCustomEvent( `hidden.bs.${tabString}` )


let self, 
    element,
    next,
    nextContent,
    nextHeight,
    activeTab,
    activeContent,
    nav,
    dropdown,
    tabContent,
    containerHeight,
    equalContents
  
  
  // TAB PRIVATE METHODS
  // ===================
  function triggerTabEnd() {
    tabContent.style.height = ''
    removeClass( tabContent, collapsingClass )
    nav.isAnimating = false
  }
  
  function triggerTabShow() {
    if ( tabContent ) { // height animation
      if ( equalContents ) {
        triggerTabEnd()
      } else {
        setTimeout( () => { // enables height animation
          tabContent.style.height = `${nextHeight}px` // height animation
          tabContent.offsetWidth
          emulateTransitionEnd( tabContent, triggerTabEnd)
        }, 50 )
      }
    } else {
      nav.isAnimating = false
    }
    shownTabEvent.relatedTarget = activeTab
    next.dispatchEvent( shownTabEvent )
  }
  
  function triggerTabHide() {
  
    if ( tabContent ) {
      activeContent.style.float = 'left'
      nextContent.style.float = 'left'
      containerHeight = activeContent.scrollHeight
    }
  
    // update relatedTarget and dispatch event
    showTabEvent.relatedTarget = activeTab
    hiddenTabEvent.relatedTarget = next
    next.dispatchEvent( showTabEvent )
    if ( showTabEvent.defaultPrevented ) return
      
    addClass( nextContent, activeClass )
    removeClass( activeContent, activeClass )
  
    if ( tabContent ) {
      nextHeight = nextContent.scrollHeight
      equalContents = nextHeight === containerHeight
      addClass( tabContent, collapsingClass )
      tabContent.style.height = `${containerHeight}px` // height animation
      tabContent.offsetHeight
      activeContent.style.float = ''
      nextContent.style.float = ''
    }
  
    if ( hasClass( nextContent, fadeClass ) ) {
      setTimeout( () => {
        addClass( nextContent, showClass );
        emulateTransitionEnd( nextContent, function showWrap() {
          triggerTabShow()
        })
      }, 20 )
    } else { triggerTabShow() }
  
    activeTab.dispatchEvent( hiddenTabEvent )
  }
  
  function getActiveTab() {
    let activeTabs = nav.getElementsByClassName( activeClass ), activeTab
  
    if ( activeTabs.length === 1 
      && !dropdownClasses.some( c => hasClass( activeTabs[0].parentNode, c ) ) )
    {
      activeTab = activeTabs[0]
    } else if ( activeTabs.length > 1 ) {
      activeTab = activeTabs[activeTabs.length-1]
    }
    return activeTab
  }
  
  function getActiveTabContent() { 
    return queryElement(getActiveTab().getAttribute('href')) 
  }
  
  function toggleTabHandler( action ) {
    action = action ? addEventListener : removeEventListener
    element[action]( 'click', tabClickHandler )
  }
  
  
  // TAB EVENT HANDLER
  // ================= 
  function tabClickHandler(e) {  
    e.preventDefault()
    next = e.currentTarget
    !nav.isAnimating && self.show()
  }
  
  
  // TAB DEFINITION
  // ==============
  class Tab {
    constructor( target ) {
  
      // bind
      self = this
  
      // initialization element
      element = queryElement( target )
  
      // reset previous instance
      element[tabComponent] && element[tabComponent].dispose()
  
      // event targets
      nav = element.closest( '.nav' )
      dropdown = nav && queryElement( `.${dropdownClasses[0]}-toggle`, nav )
      activeContent = getActiveTabContent()
      tabContent = supportTransition && activeContent.closest( '.tab-content' )
      containerHeight = activeContent.scrollHeight
  
      // set default animation state
      nav.isAnimating = false
  
      // add event listener
      toggleTabHandler( 1 )
  
      // associate target with init object
      element[tabComponent] = this
    }
  }
  
  
  // TAB PUBLIC METHODS
  // ==================
  const TabProto = Tab.prototype
  
  TabProto.show = function() { // the tab we clicked is now the next tab
  
    if ( !hasClass( next, activeClass ) ) {
      nextContent = queryElement( next.getAttribute( 'href' ) ) // this is the actual object, the next tab content to activate
      activeTab = getActiveTab( {nav} )
      activeContent = getActiveTabContent( {nav} )
  
      // update relatedTarget and dispatch
      hideTabEvent.relatedTarget = next
      activeTab.dispatchEvent( hideTabEvent )
      if ( hideTabEvent.defaultPrevented ) return
  
      nav.isAnimating = true
      removeClass( activeTab, activeClass )
      activeTab.setAttribute( ariaSelected,'false' )
      addClass( next, activeClass )
      next.setAttribute( ariaSelected, 'true' )
  
      if ( dropdown ) {
        if ( !hasClass( element.parentNode, dropdownMenuClass ) ) {
          hasClass( dropdown, activeClass ) && removeClass( dropdown, activeClass )
        } else {
          !hasClass( dropdown, activeClass ) && addClass( dropdown, activeClass )
        }
      }
  
      if ( hasClass( activeContent, fadeClass ) ) {
        removeClass( activeContent, showClass )
        emulateTransitionEnd( activeContent, triggerTabHide )
      } else { 
        triggerTabHide() 
      }
    }
  }
  
  TabProto.dispose = function() { 
    toggleTabHandler()
    delete element[tabComponent]
  }

  return new Tab( tabElement )
}


export const tabInit = {
  component: tabComponent,
  selector: tabSelector,
  constructor: Tab
}

