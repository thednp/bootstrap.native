import fixedTopClass from '../strings/fixedTopClass.js';
import fixedBottomClass from '../strings/fixedBottomClass.js';

export default function getTipContainer(element) {
  // maybe the element is inside a modal
  const modal = element.closest('.modal');

  // OR maybe the element is inside a fixed navbar
  const navbarFixed = element.closest(`.${fixedTopClass},.${fixedBottomClass}`);

  // set default container option appropriate for the context
  return modal || navbarFixed || document.body;
}
