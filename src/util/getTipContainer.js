import fixedTopClass from '../strings/fixedTopClass';
import fixedBottomClass from '../strings/fixedBottomClass';

/**
 * Returns an `Element` to be used as *options.container*
 * for `Tooltip` / `Popover` components when the target is included inside
 * a modal or a fixed navbar.
 *
 * @param {Element} element the target
 * @returns {Element} the query result
 */
export default function getTipContainer(element) {
  // maybe the element is inside a modal
  const modal = element.closest('.modal');

  // OR maybe the element is inside a fixed navbar
  const navbarFixed = element.closest(`.${fixedTopClass},.${fixedBottomClass}`);

  // set default container option appropriate for the context
  return modal || navbarFixed || document.body;
}
