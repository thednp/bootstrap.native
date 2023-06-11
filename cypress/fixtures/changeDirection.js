/**
 * Sets the `dir` attribute for `<html>` element.
 * @param {HTMLElement} element target
 * @param {string=} requestedDir requested language direction
 */
export default function changeDirection(element, requestedDir) {
  const doc = element.ownerDocument;
  const dir = requestedDir === 'rtl' ? 'rtl' : '';
  const HTML = doc.documentElement;
  const STYLE = doc.querySelector('link');
  let HREF = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css';
  // set RTL mode
  if (dir) {
    HTML.setAttribute('dir', 'rtl');
    STYLE.setAttribute('href', HREF.replace('.min', '.rtl.min'));
  } else {
    HTML.removeAttribute('dir');
    STYLE.setAttribute('href', HREF);
  }
}