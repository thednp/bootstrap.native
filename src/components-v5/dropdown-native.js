
/* Native JavaScript for Bootstrap 5 | Dropdown
----------------------------------------------- */
import queryElement from 'shorter-js/src/misc/queryElement.js'
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'
import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'

import ariaExpanded from '../strings/ariaExpanded.js'
import showClass from '../strings/showClass.js'
import dataBsToggle from '../strings/dataBsToggle.js'
import addEventListener from '../strings/addEventListener.js'
import removeEventListener from '../strings/removeEventListener.js'
import dropdownClasses from '../strings/dropdownClasses.js'
import dropdownMenuClass from '../strings/dropdownMenuClass.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import isEmptyAnchor from '../util/isEmptyAnchor.js'
import setFocus from '../util/setFocus.js'


// DROPDOWN PRIVATE GC
// ===================
const dropdownString = dropdownClasses[0],
      dropdownComponent = 'Dropdown',
      dropdownSelector = `[${dataBsToggle}="${dropdownString}"]`


// DROPDOWN SCOPE
// ==============
export default function Dropdown( dropdownElement ){   

  // DROPDOWN PRIVATE GC
  // ===================
  const dropupString = dropdownClasses[1],
      dropstartString = dropdownClasses[2],
      dropendString = dropdownClasses[3],
      dropleftString = 'dropleft',
      droprightString = 'dropright',
      dropdownMenuEndClass = `${dropdownMenuClass}-end`,
      hideMenuClass = [ 'd-block', 'invisible' ],
      verticalClass = [ dropdownString, dropupString ],
      horizontalClass = [ dropstartString, dropendString ],

      // DROPDOWN CUSTOM EVENTS
      // ========================
      showDropdownEvent = bootstrapCustomEvent( `show.bs.${dropdownString}` ),  
      shownDropdownEvent = bootstrapCustomEvent( `shown.bs.${dropdownString}` ), 
      hideDropdownEvent = bootstrapCustomEvent( `hide.bs.${dropdownString}` ), 
      hiddenDropdownEvent = bootstrapCustomEvent( `hidden.bs.${dropdownString}` )

  let self, 
      element,
      parent,
      menu,
      btnGroup,
      originalClass,
      dropLeft,
      dropRight,
      dropdownMenuEnd,
      menuItems,
      relatedTarget


  // DROPDOWN PRIVATE METHODS
  // ========================
  function styleDropdown( show ){
    let positionClass = dropdownClasses.filter( c => originalClass.includes(c) )[0]

    if ( !show ) {
      parent.className = originalClass.join( ' ' )
      const menuAction = dropdownMenuEnd && !hasClass( menu, dropdownMenuEndClass ) ? addClass : removeClass
      menuAction( menu, dropdownMenuEndClass )
      return
    }

    // force showing the menu to calculate its size
    hideMenuClass.map( c => addClass( menu, c ) )

    const dropdownRegex   = new RegExp( `\\b(${dropdownString}|${dropupString}|${dropstartString}|${dropendString})+` ),
        elementDimensions = { w : element.offsetWidth, h: element.offsetHeight },
        menuDimensions    = { w : menu.offsetWidth,    h: menu.offsetHeight    },
        windowWidth       = ( document.documentElement.clientWidth  || document.body.clientWidth  ),
        windowHeight      = ( document.documentElement.clientHeight || document.body.clientHeight ),
        targetBCR         = element.getBoundingClientRect(),
        leftExceed        = targetBCR.left + elementDimensions.w - menuDimensions.w < 0, // dropdownMenuEnd && [ dropdown | dropup ]
        leftFullExceed    = targetBCR.left - menuDimensions.w < 0, // dropstart
        rightExceed       = targetBCR.left + menuDimensions.w >= windowWidth, // !dropdownMenuEnd && [ dropdown | dropup ]
        rightFullExceed   = targetBCR.left + menuDimensions.w + elementDimensions.w >= windowWidth, // dropend 
        bottomExceed      = targetBCR.top  + menuDimensions.h >= windowHeight, // dropstart | dropend
        bottomFullExceed  = targetBCR.top  + menuDimensions.h + elementDimensions.h >= windowHeight, // dropdown
        topExceed         = targetBCR.top  - menuDimensions.h < 0 // dropup

    // recompute position
    positionClass = horizontalClass.includes( positionClass ) && leftFullExceed && rightFullExceed ? dropdownString : positionClass
    positionClass = horizontalClass.includes( positionClass ) && bottomExceed ? dropupString : positionClass
    positionClass = positionClass === dropstartString && leftFullExceed && !bottomExceed ? dropendString : positionClass
    positionClass = positionClass === dropendString && rightFullExceed && !bottomExceed ? dropstartString : positionClass
    positionClass = positionClass === dropupString && topExceed && !bottomFullExceed ? dropdownString : positionClass
    positionClass = positionClass === dropdownString && bottomFullExceed && !topExceed ? dropupString : positionClass

    // update dropdown position class
    !hasClass( parent, positionClass ) && 
    ( parent.className = parent.className.replace( dropdownRegex, positionClass ) )

    // update dropstart / dropend to pixel perfect
    const dropStartAction = (!dropLeft || !dropRight) && positionClass === dropstartString ? addClass : removeClass,
        dropEndAction = (!dropLeft || !dropRight) && positionClass === dropendString ? addClass : removeClass

    dropStartAction( parent, dropleftString )
    dropEndAction( parent, droprightString )

    // update dropdown / dropup to handle parent btn-group element
    // as well as the dropdown-menu-end utility class
    if ( verticalClass.includes( positionClass ) ) {
      const menuEndAction = rightExceed ? addClass : removeClass

      !btnGroup ? menuEndAction( menu, dropdownMenuEndClass )
          : leftExceed && addClass( parent, 'position-static' )
    }

    // remove util classes from the menu, we have its size
    hideMenuClass.map( c => removeClass( menu, c ) )
  }

  function toggleDropdownDismiss() {
    const action = element.open ? addEventListener : removeEventListener

    document[action]( 'click', dropdownDismissHandler )
    document[action]( 'focus', dropdownDismissHandler )
    document[action]( 'keydown', dropdownPreventScroll )
    document[action]( 'keyup', dropdownKeyHandler )
    window[action]( 'scroll', dropdownLayoutHandler, passiveHandler )
    window[action]( 'resize', dropdownLayoutHandler, passiveHandler )
  }

  function toggleDropdownHandler( action ) {
    action = action ? addEventListener : removeEventListener
    element[action]( 'click', dropdownClickHandler )
  }

  function showDropdown(){
    const currentParent = queryElement( dropdownClasses.map( c => `.${c}.${showClass}` ).join(',') ),
        currentElement = currentParent && queryElement( dropdownSelector, currentParent )

    currentElement && currentElement[dropdownComponent].toggle()

    // update relatedTarget and dispatch
    showDropdownEvent.relatedTarget = relatedTarget
    parent.dispatchEvent( showDropdownEvent )
    if ( showDropdownEvent.defaultPrevented ) return

    // change menu position
    styleDropdown( 1 )

    addClass( menu, showClass )
    addClass( parent, showClass )

    element.setAttribute( ariaExpanded, true )
    element.open = true

    setTimeout( () => {
      setFocus( menu.getElementsByTagName( 'INPUT' )[0] || element ) // focus the first input item | element
      toggleDropdownDismiss()

      shownDropdownEvent.relatedTarget = relatedTarget
      parent.dispatchEvent( shownDropdownEvent )
    }, 1 )
  }

  function hideDropdown(){
    hideDropdownEvent.relatedTarget = relatedTarget
    parent.dispatchEvent( hideDropdownEvent )
    if ( hideDropdownEvent.defaultPrevented ) return

    removeClass( menu, showClass )
    removeClass( parent, showClass )

    // revert to original position
    styleDropdown()

    element.setAttribute( ariaExpanded, false )
    element.open = false

    setFocus( element )
    
    // only re-attach handler if the instance is not disposed
    setTimeout( () => toggleDropdownDismiss(), 1 )

    // update relatedTarget and dispatch
    hiddenDropdownEvent.relatedTarget = relatedTarget
    parent.dispatchEvent( hiddenDropdownEvent )
  }


  // DROPDOWN EVENT HANDLERS
  // =======================
  function dropdownDismissHandler( e ) {
    const eventTarget = e.target,
          hasData = eventTarget.getAttribute( dataBsToggle) === dropdownString ||
            eventTarget.closest( dropdownSelector ) !== null,
          isForm = parent.contains( eventTarget ) &&
            ( eventTarget.tagName === 'form' || eventTarget.closest( 'form' ) !== null )

    if ( e.type === 'click' && isEmptyAnchor( eventTarget ) ) { 
      e.preventDefault()
    }
    if ( e.type === 'focus' && 
      ( eventTarget === element || eventTarget === menu || menu.contains( eventTarget ) ) ) 
    { return }  

    if ( isForm || hasData ){
      return
    } else {
      relatedTarget = eventTarget
      hideDropdown()
    }
  }

  function dropdownClickHandler( e ) {
    relatedTarget = element
    self.toggle()

    isEmptyAnchor( e.target ) && e.preventDefault()
  }

  function dropdownPreventScroll( e ) {
    if ( e.which === 38 || e.which === 40 ) { e.preventDefault() }
  }

  function dropdownKeyHandler({ which }) {
    const activeItem = document.activeElement,
        isSameElement = activeItem === element,
        isInsideMenu = menu.contains(activeItem),
        isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu

    let idx = menuItems.indexOf( activeItem )

    if ( isMenuItem ) { // navigate up | down
      idx = isSameElement ? 0 
          : which === 38 ? ( idx > 1 ? idx-1 : 0 )
          : which === 40 ? ( idx < menuItems.length-1 ? idx+1 : idx ) : idx
      menuItems[idx] && setFocus( menuItems[idx] )
    }

    if ( ( menuItems.length && isMenuItem // menu has items
        || !menuItems.length && (isInsideMenu || isSameElement )  // menu might be a form
        || !isInsideMenu ) // or the focused element is not in the menu at all
        && element.open && which === 27  // menu must be open
    ) {
      relatedTarget = null
      self.toggle()
    }
  }

  function dropdownLayoutHandler(){
    element.open && styleDropdown( 1 )
  }


  // DROPDOWN DEFINITION
  // ===================

  class Dropdown {
    constructor ( target ) {

      // bind
      self = this

      // initialization element
      element = queryElement( target )

      // set private properties unique ID key
      element[dropdownComponent] && element[dropdownComponent].dispose()

      // set targets
      parent = element.parentNode
      menu = queryElement( `.${dropdownMenuClass}`, parent )
      btnGroup = parent.parentNode.closest('.btn-group,.btn-group-vertical')
      // set original position
      originalClass = Array.from( parent.classList )
      dropLeft = originalClass.includes( dropleftString )
      dropRight = originalClass.includes( droprightString )
      dropdownMenuEnd = hasClass( menu, dropdownMenuEndClass )
      relatedTarget = null
      menuItems = []

      Array.from( menu.children ).map( child => {
        child.children.length && ( child.children[0].tagName === 'A' && menuItems.push(child.children[0]) )
        child.tagName === 'A' && menuItems.push( child )
      })

      // set initial state to closed
      element.open = false

      // add event listener
      toggleDropdownHandler( 1 )

      // associate element with init object 
      element[dropdownComponent] = this
    }
  }


  // DROPDOWN PUBLIC METHODS
  // =======================
  const DropdownProto = Dropdown.prototype

  DropdownProto.toggle = function() {
    hasClass( parent, showClass ) && element.open
      ? hideDropdown() : showDropdown()
  }
  DropdownProto.dispose = function() {
    hasClass( parent, showClass ) && element.open 
      && hideDropdown()

    toggleDropdownHandler()
    delete element[dropdownComponent]
    delete element.open
  }

  return new Dropdown( dropdownElement )
}


export const dropdownInit = {
  component: dropdownComponent,
  selector: dropdownSelector,
  constructor: Dropdown
}

