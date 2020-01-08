export function getElementsByClassName (element,classNAME) { // returns Array
  return [].slice.call(element.getElementsByClassName( classNAME ));
}

export function queryElement (selector, parent) {
  var lookUp = parent ? parent : document, element;
  if (selector instanceof Element) {
    return selector;
  } else if ((element = lookUp.querySelector(selector)) instanceof Element) {
    return element; 
  }
  return false;
}