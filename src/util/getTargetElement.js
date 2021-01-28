import queryElement from 'shorter-js/src/misc/queryElement.js'

export default function( element ){
  return queryElement( 
    element.getAttribute( 'data-bs-target' ) || element.getAttribute( 'href' ) 
  )
}