let bsnUID = 1

// popover, tooltip, scrollspy need a unique id
export default function( element, key ){
  return element[key] || (bsnUID++)
}