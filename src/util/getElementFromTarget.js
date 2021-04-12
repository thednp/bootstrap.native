import queryElement from 'shorter-js/src/misc/queryElement.js';
import dataBsTarget from '../strings/dataBsTarget.js';

export default function getElementFromTarget(target) {
  return queryElement(`[${dataBsTarget}="#${target.id}"]`)
    || queryElement(`[href="#${target.id}"]`);
}
