import isHTMLElement from '@thednp/shorty/src/is/isHTMLElement';
import getElementStyle from '@thednp/shorty/src/get/getElementStyle';

/**
 * @param {HTMLElement} element target
 * @returns {boolean}
 */
export default function isVisible(element) {
  return isHTMLElement(element)
    && getElementStyle(element, 'visibility') !== 'hidden'
    && element.offsetParent !== null;
}
