// @ts-nocheck
import queryElement from 'shorter-js/src/misc/queryElement';

import dataBsTarget from '../strings/dataBsTarget';
import dataBsParent from '../strings/dataBsParent';
import dataBsContainer from '../strings/dataBsContainer';

/**
 * Returns the `Element` that THIS one targets
 * via `data-bs-target`, `href`, `data-bs-parent` or `data-bs-container`.
 *
 * @param {Element} element the target element
 * @returns {Element?} the query result
 */
export default function getTargetElement(element) {
  return queryElement(element.getAttribute(dataBsTarget) || element.getAttribute('href'))
  || element.closest(element.getAttribute(dataBsParent))
        || queryElement(element.getAttribute(dataBsContainer));
}
