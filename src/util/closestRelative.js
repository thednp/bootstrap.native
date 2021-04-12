export default function closestRelative(element) {
  let retval = null;
  let el = element;
  while (el !== document.body) {
    el = el.parentElement;
    if (getComputedStyle(el).position === 'relative') {
      retval = el;
      break;
    }
  }
  return retval;
}
