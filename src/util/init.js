import Alert from '../components/alert-native.js';
import Button from '../components/button-native.js';
import Carousel from '../components/carousel-native.js';
import Collapse from '../components/collapse-native.js';
import Dropdown from '../components/dropdown-native.js';
import Modal from '../components/modal-native.js';
import Offcanvas from '../components/offcanvas-native.js';
import Popover from '../components/popover-native.js';
import ScrollSpy from '../components/scrollspy-native.js';
import Tab from '../components/tab-native.js';
import Toast from '../components/toast-native.js';
import Tooltip from '../components/tooltip-native.js';

// import { alertInit } from '../components/alert-native.js';
// import { buttonInit } from '../components/button-native.js';
// import { carouselInit } from '../components/carousel-native.js';
// import { collapseInit } from '../components/collapse-native.js';
// import { dropdownInit } from '../components/dropdown-native.js';
// import { modalInit } from '../components/modal-native.js';
// import { offcanvasInit } from '../components/offcanvas-native.js';
// import { popoverInit } from '../components/popover-native.js';
// import { scrollSpyInit } from '../components/scrollspy-native.js';
// import { tabInit } from '../components/tab-native.js';
// import { toastInit } from '../components/toast-native.js';
// import { tooltipInit } from '../components/tooltip-native.js';

const componentsInit = {
  Alert: Alert.init,
  Button: Button.init,
  Carousel: Carousel.init,
  Collapse: Collapse.init,
  Dropdown: Dropdown.init,
  Modal: Modal.init,
  Offcanvas: Offcanvas.init,
  Popover: Popover.init,
  ScrollSpy: ScrollSpy.init,
  Tab: Tab.init,
  Toast: Toast.init,
  Tooltip: Tooltip.init,
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
