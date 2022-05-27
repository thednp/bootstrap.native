import isHTMLElement from '@thednp/shorty/src/is/isHTMLElement';

/**
 * @param {HTMLElement} tip target
 * @param {ParentNode} container parent container
 * @returns {boolean}
 */
export default function isVisibleTip(tip, container) {
  return isHTMLElement(tip) && container.contains(tip);
}
