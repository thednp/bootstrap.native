import Alert from './components-v4/alert-native.js';
import Button from './components-v4/button-native.js';
import Carousel from './components-v4/carousel-native.js';
import Collapse from './components-v4/collapse-native.js';
import Dropdown from './components-v4/dropdown-native.js';
import Modal from './components-v4/modal-native.js';
import Popover from './components-v4/popover-native.js';
import ScrollSpy from './components-v4/scrollspy-native.js';
import Tab from './components-v4/tab-native.js';
import Toast from './components-v4/toast-native.js';
import Tooltip from './components-v4/tooltip-native.js';

import './util/init-v4.js';
import initCallback from './util/initCallback.js';
import removeDataAPI from './util/removeDataAPI.js';
import componentsInit from './util/componentsInit.js';
import { version as Version } from '../package.json';

export default {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,

  initCallback,
  removeDataAPI,
  componentsInit,
  Version,
};
