import { isHTMLElement, getElementStyle } from '@thednp/shorty';

/**
 * @param element target
 * @returns the check result
 */
const isVisible = (element: HTMLElement) => {
  return isHTMLElement(element) && getElementStyle(element, 'visibility') !== 'hidden' && element.offsetParent !== null;
};
export default isVisible;
