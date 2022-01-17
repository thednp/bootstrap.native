/**
 * @param {(HTMLElement | Element)?} tip target
 * @param {HTMLElement | ParentNode} container parent container
 * @returns {boolean}
 */
export default function isVisibleTip(tip, container) {
  return tip instanceof HTMLElement && container.contains(tip);
}
