import Data from 'shorter-js/src/misc/data';

import Alert from '../components/alert-native';
import Button from '../components/button-native';
import Carousel from '../components/carousel-native';
import Collapse from '../components/collapse-native';
import Dropdown from '../components/dropdown-native';
import Modal from '../components/modal-native';
import Offcanvas from '../components/offcanvas-native';
import Popover from '../components/popover-native';
import ScrollSpy from '../components/scrollspy-native';
import Tab from '../components/tab-native';
import Toast from '../components/toast-native';
import Tooltip from '../components/tooltip-native';

/** @type {Object<string, any>} */
const componentsList = {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
};

const componentsKeys = Object.keys(componentsList);

/**
 * Initialize all matched `Element`s for one component.
 * @param {function} callback the component callback
 * @param {HTMLCollection | NodeList} collection the matched collection
 */
function initComponentDataAPI(callback, collection) {
  Array.from(collection).forEach((x) => callback(x));
}

/**
 * Remove one component from a target container element or all in the page.
 * @param {string} component the component name
 * @param {Element | Document} context parent `Element`
 */
function removeComponentDataAPI(component, context) {
  Array.from(Data.getAllFor(component)).forEach((x) => {
    const [element, instance] = x;
    if (context.contains(element)) instance.dispose();
  });
}

/**
 * Initialize all BSN components for a target container.
 * @param {Element=} context parent `Element`
 */
export function initCallback(context) {
  const lookUp = context instanceof Element ? context : document;

  componentsKeys.forEach((comp) => {
    const { init, selector } = componentsList[comp];
    initComponentDataAPI(init, lookUp.querySelectorAll(selector));
  });
}

/**
 * Remove all BSN components for a target container.
 * @param {Element=} context parent `Element`
 */
export function removeDataAPI(context) {
  const lookUp = context instanceof Element ? context : document;

  componentsKeys.forEach((comp) => {
    removeComponentDataAPI(comp, lookUp);
  });
}

// bulk initialize all components
if (document.body) initCallback();
else {
  document.addEventListener('DOMContentLoaded', () => initCallback(), { once: true });
}
