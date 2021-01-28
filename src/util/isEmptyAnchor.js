export default function( anchor ) {

  // return anchor ? ( anchor.href && anchor.href.slice(-1) === '#' // anchor href starts with #
  //   || anchor.parentNode && anchor.parentNode.href  // OR a child of an anchor with href starts with #
  //   && anchor.parentNode.href.slice(-1) === '#' ) 
  // && e.preventDefault() : false
  return anchor && ( anchor.href && anchor.href.slice(-1) === '#' // anchor href starts with #
    || anchor.parentNode && anchor.parentNode.href  // OR a child of an anchor with href starts with #
    && anchor.parentNode.href.slice(-1) === '#' )
}