import getParentNode from '@thednp/shorty/src/get/getParentNode';
import getElementStyle from '@thednp/shorty/src/get/getElementStyle';
import isTableElement from '@thednp/shorty/src/is/isTableElement';
import isShadowRoot from '@thednp/shorty/src/is/isShadowRoot';
import isHTMLElement from '@thednp/shorty/src/is/isHTMLElement';
import getWindow from '@thednp/shorty/src/get/getWindow';
import getDocumentBody from '@thednp/shorty/src/get/getDocumentBody';

/**
 * Returns an `HTMLElement` to be used as default value for *options.container*
 * for `Tooltip` / `Popover` components.
 *
 * When `getOffset` is *true*, it returns the `offsetParent` for tooltip/popover
 * offsets computation similar to **floating-ui**.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement} element the target
 * @param {boolean=} getOffset when *true* it will return an `offsetParent`
 * @returns {ParentNode | Window} the query result
 */
export default function getElementContainer(element, getOffset) {
  const majorBlockTags = ['HTML', 'BODY'];

  if (getOffset) {
    /** @type {any} */
    let { offsetParent } = element;
    const win = getWindow(element);

    while (offsetParent && (isTableElement(offsetParent)
      || (isHTMLElement(offsetParent)
        // we must count for both fixed & sticky
        && !['sticky', 'fixed'].includes(getElementStyle(offsetParent, 'position'))))) {
      offsetParent = offsetParent.offsetParent;
    }

    if (!offsetParent || (majorBlockTags.includes(offsetParent.tagName)
        || getElementStyle(offsetParent, 'position') === 'static')) {
      offsetParent = win;
    }
    return offsetParent;
  }

  /** @type {ParentNode[]} */
  const containers = [];
  /** @type {ParentNode} */
  let { parentNode } = element;

  while (parentNode && !majorBlockTags.includes(parentNode.nodeName)) {
    parentNode = getParentNode(parentNode);
    /* istanbul ignore else */
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
