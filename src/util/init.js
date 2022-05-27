import Data from '@thednp/shorty/src/misc/data';
import ObjectKeys from '@thednp/shorty/src/misc/ObjectKeys';
import getElementsByTagName from '@thednp/shorty/src/selectors/getElementsByTagName';
import matches from '@thednp/shorty/src/selectors/matches';

import { addListener } from '@thednp/event-listener/src/event-listener';

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

/** @type {Record<string, any>} */
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

/**
 * Initialize all matched `Element`s for one component.
 * @param {BSN.InitCallback<any>} callback
 * @param {NodeList | Node[]} collection
 */
function initComponentDataAPI(callback, collection) {
  [...collection].forEach((x) => callback(x));
}

/**
 * Remove one component from a target container element or all in the page.
 * @param {string} component the component name
 * @param {ParentNode} context parent `Node`
 */
function removeComponentDataAPI(component, context) {
  const compData = Data.getAllFor(component);

  if (compData) {
    [...compData].forEach((x) => {
      const [element, instance] = x;
      if (context.contains(element)) instance.dispose();
    });
  }
}

/**
 * Initialize all BSN components for a target container.
 * @param {ParentNode=} context parent `Node`
 */
export function initCallback(context) {
  const lookUp = context && context.nodeName ? context : document;
  const elemCollection = [...getElementsByTagName('*', lookUp)];

  ObjectKeys(componentsList).forEach((comp) => {
    const { init, selector } = componentsList[comp];
    initComponentDataAPI(init, elemCollection.filter((item) => matches(item, selector)));
  });
}

/**
 * Remove all BSN components for a target container.
 * @param {ParentNode=} context parent `Node`
 */
export function removeDataAPI(context) {
  const lookUp = context && context.nodeName ? context : document;

  ObjectKeys(componentsList).forEach((comp) => {
    removeComponentDataAPI(comp, lookUp);
  });
}

// bulk initialize all components
if (document.body) initCallback();
else {
  addListener(document, 'DOMContentLoaded', () => initCallback(), { once: true });
}
