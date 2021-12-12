/**
 * Checks if an *event.target* or its parent has an `href="#"` value.
 * We need to prevent jumping around onclick, don't we?
 *
 * @param {Element} elem the target element
 * @returns {boolean} the query result
 */
export default function isEmptyAnchor(elem) {
  const parentAnchor = elem.closest('A');
  // anchor href starts with #
  return elem && ((elem.hasAttribute('href') && elem.href.slice(-1) === '#')
    // OR a child of an anchor with href starts with #
    || (parentAnchor && parentAnchor.hasAttribute('href') && parentAnchor.href.slice(-1) === '#'));
}
