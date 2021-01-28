let bsnUID = 1

export default function( element, key ){
  return element[key] || (bsnUID++)
}