import Data from 'shorter-js/src/misc/data';
import ObjectKeys from 'shorter-js/src/misc/ObjectKeys';
import parentNodes from 'shorter-js/src/selectors/parentNodes';
import getElementsByTagName from 'shorter-js/src/selectors/getElementsByTagName';
import matches from 'shorter-js/src/selectors/matches';

import { addListener } from 'event-listener.js';

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
 * @param {NodeListOf<HTMLElement | Element> | (HTMLElement | Element)[]} collection
 */
function initComponentDataAPI(callback, collection) {
  [...collection].forEach((x) => callback(x));
}

/**
 * Remove one component from a target container element or all in the page.
 * @param {string} component the component name
 * @param {(Element | HTMLElement | Document)=} context parent `Element`
 */
function removeComponentDataAPI(component, context) {
  const compData = Data.getAllFor(component);

  if (compData) {
    [...compData].forEach((x) => {
      const [element, instance] = x;
      if (context && context.contains(element)) instance.dispose();
    });
  }
}

/**
 * Initialize all BSN components for a target container.
 * @param {(Element | HTMLElement | Document)=} context parent `Element`
 */
export function initCallback(context) {
  const lookUp = context && parentNodes.some((x) => context instanceof x)
    ? context : undefined;
  const elemCollection = [...getElementsByTagName('*', lookUp)];

  ObjectKeys(componentsList).forEach((comp) => {
    const { init, selector } = componentsList[comp];
    initComponentDataAPI(init, elemCollection.filter((item) => matches(item, selector)));
  });
}

/**
 * Remove all BSN components for a target container.
 * @param {(Element | HTMLElement | Document)=} context parent `Element`
 */
export function removeDataAPI(context) {
  const lookUp = context && parentNodes.some((x) => context instanceof x)
    ? context : undefined;

  ObjectKeys(componentsList).forEach((comp) => {
    removeComponentDataAPI(comp, lookUp);
  });
}

// bulk initialize all components
if (document.body) initCallback();
else {
  addListener(document, 'DOMContentLoaded', () => initCallback(), { once: true });
}
