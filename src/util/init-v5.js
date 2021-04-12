import { alertInit } from '../components-v5/alert-native.js';
import { buttonInit } from '../components-v5/button-native.js';
import { carouselInit } from '../components-v5/carousel-native.js';
import { collapseInit } from '../components-v5/collapse-native.js';
import { dropdownInit } from '../components-v5/dropdown-native.js';
import { modalInit } from '../components-v5/modal-native.js';
import { offcanvasInit } from '../components-v5/offcanvas-native.js';
import { popoverInit } from '../components-v5/popover-native.js';
import { scrollSpyInit } from '../components-v5/scrollspy-native.js';
import { tabInit } from '../components-v5/tab-native.js';
import { toastInit } from '../components-v5/toast-native.js';
import { tooltipInit } from '../components-v5/tooltip-native.js';

const componentsInit = {
  Alert: alertInit,
  Button: buttonInit,
  Carousel: carouselInit,
  Collapse: collapseInit,
  Dropdown: dropdownInit,
  Modal: modalInit,
  Offcanvas: offcanvasInit,
  Popover: popoverInit,
  ScrollSpy: scrollSpyInit,
  Tab: tabInit,
  Toast: toastInit,
  Tooltip: tooltipInit,
};

function initializeDataAPI(Konstructor, collection) {
  Array.from(collection).forEach((x) => new Konstructor(x));
}
function removeElementDataAPI(component, collection) {
  Array.from(collection).forEach((x) => {
    if (x[component]) x[component].dispose();
  });
}

export function initCallback(context) {
  const lookUp = context instanceof Element ? context : document;

  Object.keys(componentsInit).forEach((comp) => {
    const { constructor, selector } = componentsInit[comp];
    initializeDataAPI(constructor, lookUp.querySelectorAll(selector));
  });
}

export function removeDataAPI(context) {
  const lookUp = context instanceof Element ? context : document;

  Object.keys(componentsInit).forEach((comp) => {
    const { component, selector } = componentsInit[comp];
    removeElementDataAPI(component, lookUp.querySelectorAll(selector));
  });
}

// bulk initialize all components
if (document.body) initCallback();
else {
  document.addEventListener('DOMContentLoaded', () => initCallback(), { once: true });
}
