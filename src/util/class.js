export function addClass(element,classNAME) {
  element.classList.add(classNAME);
}

export function removeClass(element,classNAME) {
  element.classList.remove(classNAME);
}

export function hasClass(element,classNAME) {
  return element.classList.contains(classNAME);
}