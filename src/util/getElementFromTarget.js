import queryElement from 'shorter-js/src/misc/queryElement';
import dataBsTarget from '../strings/dataBsTarget';

/**
 * Returns an Element referenced by another Element's `data-bs-target`
 * or `href` attributes.
 *
 * @param {Element} target the target element
 * @returns {?Element} the query result
 */
export default function getElementFromTarget(target) {
  return queryElement(`[${dataBsTarget}="#${target.id}"]`)
    || queryElement(`[href="#${target.id}"]`);
}
