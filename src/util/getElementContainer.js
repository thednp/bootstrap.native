import getParentNode from 'shorter-js/src/get/getParentNode';
import getElementStyle from 'shorter-js/src/get/getElementStyle';
import isTableElement from 'shorter-js/src/is/isTableElement';
import isShadowRoot from 'shorter-js/src/is/isShadowRoot';
import getDocumentBody from 'shorter-js/src/get/getDocumentBody';

/**
 * Returns an `HTMLElement` to be used as default value for *options.container*
 * for `Tooltip` / `Popover` components.
 *
 * @param {HTMLElement | Element} element the target
 * @returns {HTMLElement | HTMLBodyElement} the query result
 */
export default function getElementContainer(element) {
  const majorBlockTags = ['HTML', 'BODY'];

  /** @type {(HTMLElement)[]} */
  const containers = [];
  /** @type {any} */
  let { parentNode } = element;

  while (parentNode && !majorBlockTags.includes(parentNode.nodeName)) {
    parentNode = getParentNode(parentNode);
    if (!(isShadowRoot(parentNode) || !!parentNode.shadowRoot
      || isTableElement(parentNode))) {
      containers.push(parentNode);
    }
  }

  return containers.find((c, i) => {
    if (getElementStyle(c, 'position') !== 'relative'
      && containers.slice(i + 1).every((r) => getElementStyle(r, 'position') === 'static')) {
      return c;
    }
    return null;
  }) || getDocumentBody(element);
}
