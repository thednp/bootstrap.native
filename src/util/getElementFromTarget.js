import getDocument from '@thednp/shorty/src/get/getDocument';
import querySelector from '@thednp/shorty/src/selectors/querySelector';

import dataBsTarget from '../strings/dataBsTarget';

/**
 * Returns an Element referenced by another Element's `data-bs-target`
 * or `href` attributes.
 *
 * @param {HTMLElement} target the target element
 * @returns {HTMLElement?} the query result
 */
export default function getElementFromTarget(target) {
  const doc = getDocument(target);
  return querySelector(`[${dataBsTarget}="#${target.id}"]`, doc)
    || querySelector(`[href="#${target.id}"]`, doc);
}
