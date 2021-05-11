export default function isVisible(element) {
  return getComputedStyle(element).visibility !== 'hidden'
    && element.offsetParent !== null;
}
