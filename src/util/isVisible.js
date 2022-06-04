import getElementStyle from '@thednp/shorty/src/get/getElementStyle';

/**
 * @param {HTMLElement | Element} element target
 * @returns {boolean}
 */
export default function isVisible(element) {
  return element && getElementStyle(element, 'visibility') !== 'hidden'
    // @ts-ignore
    && element.offsetParent !== null;
}
