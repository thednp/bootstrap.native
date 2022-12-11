import { isHTMLElement } from '@thednp/shorty';

/**
 * @param tip target
 * @param container parent container
 * @returns the check result
 */
const isVisibleTip = (tip: HTMLElement, container: ParentNode) => {
  return isHTMLElement(tip) && container.contains(tip);
};
export default isVisibleTip;
