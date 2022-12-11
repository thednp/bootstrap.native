import {
  getDocumentBody,
  getWindow,
  isHTMLElement,
  isShadowRoot,
  isTableElement,
  getParentNode,
  getElementStyle,
} from '@thednp/shorty';

/**
 * Returns an `HTMLElement` to be used as default value for *options.container*
 * for `Tooltip` / `Popover` components.
 *
 * When `getOffset` is *true*, it returns the `offsetParent` for tooltip/popover
 * offsets computation similar to **floating-ui**.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param element the target
 * @param getOffset when *true* it will return an `offsetParent`
 * @returns the query result
 */
const getElementContainer = (element: HTMLElement, getOffset?: boolean): ParentNode | Window => {
  const majorBlockTags = ['HTML', 'BODY'];

  if (getOffset) {
    let { offsetParent }: { offsetParent: ParentNode | Window | null } = element;
    const win = getWindow(element);

    while (
      offsetParent &&
      (isTableElement(offsetParent) ||
        (isHTMLElement(offsetParent) &&
          // we must count for both fixed & sticky
          !['sticky', 'fixed'].includes(getElementStyle(offsetParent, 'position'))))
    ) {
      offsetParent = offsetParent.offsetParent as HTMLElement;
    }

    if (
      !offsetParent ||
      (isHTMLElement(offsetParent) && majorBlockTags.includes(offsetParent.tagName)) ||
      getElementStyle(offsetParent as HTMLElement, 'position') === 'static'
    ) {
      offsetParent = win;
    }
    return offsetParent;
  }

  const containers: ParentNode[] = [];
  let { parentNode } = element as { parentNode: ParentNode };

  while (parentNode && !majorBlockTags.includes(parentNode.nodeName)) {
    parentNode = getParentNode(parentNode) as ParentNode;
    /* istanbul ignore else */
    if (!(isShadowRoot(parentNode) || isTableElement(parentNode))) {
      containers.push(parentNode);
    }
  }

  return (
    containers.find((c, i) => {
      if (
        getElementStyle(c as HTMLElement, 'position') !== 'relative' &&
        containers.slice(i + 1).every(r => getElementStyle(r as HTMLElement, 'position') === 'static')
      ) {
        return c;
      }
      return null;
    }) || getDocumentBody(element)
  );
};

export default getElementContainer;
