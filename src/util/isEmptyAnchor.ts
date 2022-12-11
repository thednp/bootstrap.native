import { hasAttribute, closest } from '@thednp/shorty';

/**
 * Checks if an *event.target* or its parent has an `href="#"` value.
 * We need to prevent jumping around onclick, don't we?
 *
 * @param element the target element
 * @returns the query result
 */
const isEmptyAnchor = (element: HTMLElement) => {
  // `EventTarget` must be `HTMLElement`
  const parentAnchor = closest(element, 'A');
  return (
    (element.tagName === 'A' &&
      // anchor href starts with #
      hasAttribute(element, 'href') &&
      (element as HTMLAnchorElement).href.slice(-1) === '#') ||
    // OR a child of an anchor with href starts with #
    (parentAnchor && hasAttribute(parentAnchor, 'href') && (parentAnchor as HTMLAnchorElement).href.slice(-1) === '#')
  );
};
export default isEmptyAnchor;
