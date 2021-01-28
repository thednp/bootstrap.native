
/* Native JavaScript for Bootstrap 5 | Dropdown
----------------------------------------------- */
import queryElement from 'shorter-js/src/misc/queryElement.js'
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import setFocus from '../util/setFocus.js'
import isEmptyAnchor from '../util/isEmptyAnchor.js'

import privateProperties from '../util/privateProperties.js'
import getUID from '../util/getUID.js'


// DROPDOWN PRIVATE GC
// ===================
const dropdownString = 'dropdown',
      dropdownComponent = 'Dropdown',
      dropdownSelector = '[data-bs-toggle="dropdown"]',
      dropdownIDKey = `${dropdownString}UID`,
      dropdownMenuEndClass = 'dropdown-menu-end',
      dropdownClasses = ['dropdown','dropup','dropstart','dropend']


// DROPDOWN CUSTOM EVENTS
// ========================
const showDropdownEvent = bootstrapCustomEvent( `show.bs.${dropdownString}` ),  
      shownDropdownEvent = bootstrapCustomEvent( `shown.bs.${dropdownString}` ), 
      hideDropdownEvent = bootstrapCustomEvent( `hide.bs.${dropdownString}` ), 
      hiddenDropdownEvent = bootstrapCustomEvent( `hidden.bs.${dropdownString}` )


// DROPDOWN PRIVATE METHODS
// ========================
function styleDropdown( show, vars ){
  const { element, menu, parent, btnGroup, originalClass, dropLeft, dropRight, dropdownMenuEnd } = vars,
      hideMenuClass = ['d-block','invisible'],
      verticalClass = ['dropdown','dropup'],
      horizontalClass = ['dropstart','dropend']

  let positionClass = dropdownClasses.filter( c => originalClass.includes(c) )[0]

  if ( !show ) {
    parent.className = originalClass.join( ' ' )
    const menuAction = dropdownMenuEnd && !menu.classList.contains( dropdownMenuEndClass ) ? 'add' : 'remove'
    menu.classList[menuAction]( dropdownMenuEndClass )
    return
  }

  // force showing the menu to calculate its size
  hideMenuClass.map( c => menu.classList.add( c ) )

  const dropdownRegex = /\b(dropdown|dropup|dropstart|dropend)+/,
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
  positionClass = horizontalClass.includes( positionClass ) && leftFullExceed && rightFullExceed ? 'dropdown' : positionClass
  positionClass = horizontalClass.includes( positionClass ) && bottomExceed ? 'dropup' : positionClass
  positionClass = positionClass === 'dropstart' && leftFullExceed && !bottomExceed ? 'dropend' : positionClass
  positionClass = positionClass === 'dropend' && rightFullExceed && !bottomExceed ? 'dropstart' : positionClass
  positionClass = positionClass === 'dropup' && topExceed && !bottomFullExceed ? 'dropdown' : positionClass
  positionClass = positionClass === 'dropdown' && bottomFullExceed && !topExceed ? 'dropup' : positionClass

  // update dropdown position class
  !parent.classList.contains( positionClass ) && 
  ( parent.className = parent.className.replace( dropdownRegex, positionClass ) )

  // update dropstart / dropend to pixel perfect
  const dropStartAction = (!dropLeft || !dropRight) && positionClass === 'dropstart' ? 'add' : 'remove',
        dropEndAction = (!dropLeft || !dropRight) && positionClass === 'dropend' ? 'add' : 'remove'

  parent.classList[dropStartAction]( 'dropleft' )
  parent.classList[dropEndAction]( 'dropright' )

  // update dropdown / dropup to handle parent btn-group element
  // as well as the dropdown-menu-end utility class
  if ( verticalClass.includes( positionClass ) ) {
    const menuEndAction = rightExceed ? 'add' : 'remove'

    !btnGroup ? menu.classList[menuEndAction]( dropdownMenuEndClass )
              : leftExceed && parent.classList.add( 'position-static' )
  }

  // remove util classes from the menu, we have its size
  hideMenuClass.map( c => menu.classList.remove( c ) )
}

function toggleDropdownDismiss( vars ) {
  const { element } = vars,
      action = element.open ? 'addEventListener' : 'removeEventListener'

  document[action]( 'click', dropdownDismissHandler )
  document[action]( 'focus', dropdownDismissHandler )
  document[action]( 'keydown', preventDropdownScroll )
  document[action]( 'keyup', dropdownKeyHandler )
  window[action]( 'scroll', dropdownLayoutHandler, passiveHandler )
  window[action]( 'resize', dropdownLayoutHandler, passiveHandler )
}

function showDropdown( vars ){
  const { element, menu, parent, relatedTarget } = vars,
      currentParent = queryElement( dropdownClasses.map( c => `.${c}.show` ).join(',') ),
      currentElement = currentParent && queryElement( dropdownSelector, currentParent )

  currentElement && currentElement[dropdownComponent].toggle()

  // update relatedTarget and dispatch
  showDropdownEvent.relatedTarget = relatedTarget
  parent.dispatchEvent( showDropdownEvent )
  if ( showDropdownEvent.defaultPrevented ) return

  // change menu position
  styleDropdown( 1, vars )

  menu.classList.add( 'show' )
  parent.classList.add( 'show' )

  element.setAttribute( 'aria-expanded', true )
  element.open = true

  setTimeout( () => {
    setFocus( menu.getElementsByTagName( 'INPUT' )[0] || element ) // focus the first input item | element
    toggleDropdownDismiss( vars )

    shownDropdownEvent.relatedTarget = relatedTarget
    parent.dispatchEvent( shownDropdownEvent )
  }, 1 )
}

function hideDropdown( vars ){
  const { element, menu, parent, relatedTarget } = vars

  hideDropdownEvent.relatedTarget = relatedTarget
  parent.dispatchEvent( hideDropdownEvent )
  if ( hideDropdownEvent.defaultPrevented ) return

  menu.classList.remove( 'show' )
  parent.classList.remove( 'show' )

  // revert to original position
  styleDropdown( 0, vars )

  element.setAttribute( 'aria-expanded', false )
  element.open = false

  setFocus( element )
  
  // only re-attach handler if the instance is not disposed
  setTimeout( () => toggleDropdownDismiss( vars ), 1 )

  // update relatedTarget and dispatch
  hiddenDropdownEvent.relatedTarget = relatedTarget
  parent.dispatchEvent( hiddenDropdownEvent )
}


// DROPDOWN EVENT HANDLERS
// =======================
function dropdownDismissHandler( e ) {
  const eventTarget = e.target,
        parent = queryElement( dropdownClasses.map( c => `.${c}.show` ).join(',') ),
        menu = eventTarget.closest( '.dropdown-menu.show' ),
        element = queryElement( dropdownSelector, parent ),
        vars = privateProperties[ element[dropdownIDKey] ],
        hasData = eventTarget.getAttribute( 'data-bs-toggle' ) === dropdownString ||
          eventTarget.closest( dropdownSelector ) !== null,
        isForm = parent && parent.contains( eventTarget ) &&
          ( eventTarget.tagName === 'form' || eventTarget.closest( 'form' ) !== null )

  if ( e.type === 'click' && ( menu || parent ) && isEmptyAnchor( eventTarget ) ) { 
    e.preventDefault()
  }
  if ( e.type === 'focus' && 
    ( eventTarget === element || eventTarget === menu || menu.contains( eventTarget ) ) ) 
  { return }  

  if ( isForm || hasData ){
    return
  } else if ( vars ){
    vars.relatedTarget = eventTarget
    hideDropdown( vars )
  }
}

function dropdownClickHandler( e ) {
  isEmptyAnchor( e.target ) && e.preventDefault()

  const element = this,
        self = element[dropdownComponent],
        vars = privateProperties[ element[dropdownIDKey] ]

  vars.relatedTarget = element
  self.toggle()
}

function preventDropdownScroll( e ) {
  if ( e.which === 38 || e.which === 40 ) { e.preventDefault() }
}

function dropdownKeyHandler({ which }) {
  const activeItem = document.activeElement,
        parent = queryElement( dropdownClasses.map( c => `.${c}.show` ).join(',') ),
        element = parent.querySelector( dropdownSelector ),
        self = element[dropdownComponent],
        vars = privateProperties[ element[dropdownIDKey] ],
        menu = vars.menu,
        menuItems = vars.menuItems,
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
    vars.relatedTarget = null
    self.toggle()
  }
}

function dropdownLayoutHandler(){
  const parent = queryElement( dropdownClasses.map( c => `.${c}.show` ).join(',') ),
        element = queryElement( dropdownSelector, parent ),
        vars = privateProperties[ element[dropdownIDKey] ]

  element.open && styleDropdown( 1, vars )
}


// DROPDOWN DEFINITION
// ===================

export default class Dropdown {
  constructor ( element ) {

    // initialization element
    element = queryElement(element)

    // reset on re-init
    element[dropdownComponent] && element[dropdownComponent].dispose()

    // set targets
    const parent = element.parentNode,
          menu = queryElement( '.dropdown-menu', parent ),
          btnGroup = parent.parentNode.closest('.btn-group,.btn-group-vertical'),
          isForm = menu.tagName === 'form' || queryElement( 'form', menu ) !== null,
          // set original position
          originalClass = Array.from( parent.classList ),
          dropLeft = originalClass.includes( 'dropleft' ),
          dropRight = originalClass.includes( 'dropright' ),
          dropdownMenuEnd = menu.classList.contains( dropdownMenuEndClass ),
          relatedTarget = null,
          menuItems = []

    Array.from( menu.children ).map( child => {
      child.children.length && (child.children[0].tagName === 'A' && menuItems.push(child.children[0]))
      child.tagName === 'A' && menuItems.push(child)
    })

    // add event listener
    element.addEventListener( 'click', dropdownClickHandler )

    // set initial state to closed
    element.open = false

    // set private properties unique ID key
    const elementID = getUID( element, dropdownIDKey )

    this[dropdownIDKey] = elementID
    element[dropdownIDKey] = elementID
    privateProperties[elementID] = {
      element: element,
      parent: parent,
      menu: menu,
      btnGroup: btnGroup,
      isForm: isForm, // replaces persist option
      originalClass: originalClass,
      dropLeft: dropLeft,
      dropright: dropRight,
      dropdownMenuEnd: dropdownMenuEnd,
      menuItems: menuItems,
      relatedTarget: relatedTarget
    }     

    // associate element with init object 
    element[dropdownComponent] = this
  }


  // DROPDOWN PUBLIC METHODS
  // =======================
  toggle() {
    const vars = privateProperties[ this[dropdownIDKey] ],
      { element, parent } = vars
    
    if ( parent.classList.contains( 'show' ) && element.open ) { hideDropdown( vars ) }
    else { showDropdown( vars ) }
  }
  dispose() {
    const uid = this[dropdownIDKey],
          vars = privateProperties[uid],
          { element, parent } = vars

    if ( parent.classList.contains( 'show' ) && element.open ) { hideDropdown( vars ) }

    element.removeEventListener( 'click', dropdownClickHandler )

    delete element[dropdownComponent]
    delete element[dropdownIDKey]
    delete this[dropdownIDKey]
  }
}

export const dropdownInit = {
  component: dropdownComponent,
  selector: dropdownSelector,
  constructor: Dropdown
}

