import EventListener from 'event-listener.js/src/event-listener';

import Alert from './components/alert-native';
import Button from './components/button-native';
import Carousel from './components/carousel-native';
import Collapse from './components/collapse-native';
import Dropdown from './components/dropdown-native';
import Modal from './components/modal-native';
import Offcanvas from './components/offcanvas-native';
import Popover from './components/popover-native';
import ScrollSpy from './components/scrollspy-native';
import Tab from './components/tab-native';
import Toast from './components/toast-native';
import Tooltip from './components/tooltip-native';

import Version from './version';
import { initCallback, removeDataAPI } from './util/init';

const BSN = {
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

  initCallback,
  removeDataAPI,
  Version,
  EventListener,
};

export default BSN;
