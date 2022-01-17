import getDocument from 'shorter-js/src/get/getDocument';
import querySelector from 'shorter-js/src/selectors/querySelector';
import dataBsTarget from '../strings/dataBsTarget';

/**
 * Returns an Element referenced by another Element's `data-bs-target`
 * or `href` attributes.
 *
 * @param {HTMLElement | Element} target the target element
 * @returns {(HTMLElement | Element)?} the query result
 */
export default function getElementFromTarget(target) {
  const doc = getDocument(target);
  return querySelector(`[${dataBsTarget}="#${target.id}"]`, doc)
    || querySelector(`[href="#${target.id}"]`, doc);
}
