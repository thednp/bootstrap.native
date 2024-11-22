import {
  getDocument,
  getElementStyle,
  getParentNode,
  isShadowRoot,
  isTableElement,
} from "@thednp/shorty";

/**
 * Returns an `HTMLElement` to be used as default value for *options.container*
 * for `Tooltip` / `Popover` components.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param element the target
 * @returns the query result
 */
const getElementContainer = (element: Element) => {
  const majorBlockTags = ["HTML", "BODY"];
  const containers: HTMLElement[] = [];
  let { parentNode } = element;

  while (parentNode && !majorBlockTags.includes(parentNode.nodeName)) {
    parentNode = getParentNode(parentNode) as HTMLElement;
    // istanbul ignore else @preserve
    if (!(isShadowRoot(parentNode) || isTableElement(parentNode))) {
      containers.push(parentNode as HTMLElement);
    }
  }

  return (
    containers.find((c, i) => {
      if (
        ((getElementStyle(c, "position") !== "relative" ||
          getElementStyle(c, "position") === "relative" &&
            c.offsetHeight !== c.scrollHeight) &&
          containers.slice(i + 1).every((r) =>
            getElementStyle(r, "position") === "static"
          ))
      ) {
        return c;
      }
      return null;
    }) ||
    /* istanbul ignore next: optional guard */
    getDocument(element).body
  );
};

export default getElementContainer;
