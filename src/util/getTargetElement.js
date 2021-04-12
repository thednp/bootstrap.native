import queryElement from 'shorter-js/src/misc/queryElement.js';

import dataBsTarget from '../strings/dataBsTarget.js';
import dataBsParent from '../strings/dataBsParent.js';
import dataBsContainer from '../strings/dataBsContainer.js';

export default function getTargetElement(element) {
  return queryElement(element.getAttribute(dataBsTarget) || element.getAttribute('href'))
        || element.closest(element.getAttribute(dataBsParent))
        || queryElement(element.getAttribute(dataBsContainer));
}
