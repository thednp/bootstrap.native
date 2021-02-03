import { alertInit } from '../components-v5/alert-native.js'
import { buttonInit } from '../components-v5/button-native.js'
import { carouselInit } from '../components-v5/carousel-native.js'
import { collapseInit } from '../components-v5/collapse-native.js'
import { dropdownInit } from '../components-v5/dropdown-native.js'
import { modalInit } from '../components-v5/modal-native.js'
import { popoverInit } from '../components-v5/popover-native.js'
import { scrollSpyInit } from '../components-v5/scrollspy-native.js'
import { tabInit } from '../components-v5/tab-native.js'
import { toastInit } from '../components-v5/toast-native.js'
import { tooltipInit } from '../components-v5/tooltip-native.js'

const componentsInit = {
  Alert: alertInit,
  Button: buttonInit,
  Carousel: carouselInit,
  Collapse: collapseInit,
  Dropdown: dropdownInit,
  Modal: modalInit,
  Popover: popoverInit,
  ScrollSpy: scrollSpyInit,
  Tab: tabInit,
  Toast: toastInit,
  Tooltip: tooltipInit
}

function initializeDataAPI( konstructor, collection ){
  Array.from( collection ).map( x => new konstructor(x) )
}
function removeElementDataAPI( component, collection ){
  Array.from( collection ).map( x => x[component] && x[component].dispose() )
}

/* 
 * Callback Usage Examples
 *
 * // init all components with valid markup in the #main element
 * BSN.Callback('#main',true)
 * // remove all components with valid markup in the #main element
 * BSN.Callback('#main',false)
 * // equivalent to the following
 * BSN.Callback('#main')
 * // remove all components in the document
 * BSN.Callback()
 * 
*/
export function Callback( lookUp = 0, init = 0 ){
  const action = init ? initializeDataAPI : removeElementDataAPI
  lookUp = lookUp instanceof Element ? lookUp : document

  for (const component in componentsInit) {
    action( init ? componentsInit[component].constructor : component,
      lookUp.querySelectorAll( componentsInit[component].selector ) )
  }
}

// bulk initialize all components
document.body ? Callback(0,1) : 
document.addEventListener( 'DOMContentLoaded', () => Callback(0,1), { once: true })