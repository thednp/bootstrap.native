import { getDocument, isShadowRoot, isTableElement, getParentNode, getElementStyle } from '@thednp/shorty';

/**
 * Returns an `HTMLElement` to be used as default value for *options.container*
 * for `Tooltip` / `Popover` components.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param element the target
 * @returns the query result
 */
const getElementContainer = (element: HTMLElement): ParentNode => {
  const majorBlockTags = ['HTML', 'BODY'];
  const containers: ParentNode[] = [];
  let { parentNode } = element as Node;

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
    }) || /* istanbul ignore next: optional guard */ getDocument(element).body
  );
};

export default getElementContainer;
