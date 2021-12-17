/**
 * Returns the closest parentElement with `position: relative`.
 * @param {Element} element target element
 * @returns {?Element} the closest match
 */
export default function closestRelative(element) {
  let retval = null;
  let el = element;
  while (el !== document.body) {
    // @ts-ignore
    el = el.parentElement;
    if (getComputedStyle(el).position === 'relative') {
      retval = el;
      break;
    }
  }
  return retval;
}
