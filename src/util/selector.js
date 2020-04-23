export function getElementsByClassName (element,classNAME) { // returns Array
  return [].slice.call(element.getElementsByClassName( classNAME ));
}

export function queryElement (selector, parent) {
  var lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}