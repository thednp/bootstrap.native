import hasAttribute from '@thednp/shorty/src/attr/hasAttribute';
import closest from '@thednp/shorty/src/selectors/closest';
import isHTMLElement from '@thednp/shorty/src/is/isHTMLElement';

/**
 * Checks if an *event.target* or its parent has an `href="#"` value.
 * We need to prevent jumping around onclick, don't we?
 *
 * @param {Node} element the target element
 * @returns {boolean} the query result
 */
export default function isEmptyAnchor(element) {
  // `EventTarget` must be `HTMLElement`
  const parentAnchor = closest(element, 'A');
  return isHTMLElement(element)
    // anchor href starts with #
    && ((hasAttribute(element, 'href') && element.href.slice(-1) === '#')
    // OR a child of an anchor with href starts with #
    || (parentAnchor && hasAttribute(parentAnchor, 'href')
    && parentAnchor.href.slice(-1) === '#'));
}
