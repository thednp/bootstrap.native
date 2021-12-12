import Alert from './components-v4/alert-native';
import Button from './components-v4/button-native';
import Carousel from './components-v4/carousel-native';
import Collapse from './components-v4/collapse-native';
import Dropdown from './components-v4/dropdown-native';
import Modal from './components-v4/modal-native';
import Popover from './components-v4/popover-native';
import ScrollSpy from './components-v4/scrollspy-native';
import Tab from './components-v4/tab-native';
import Toast from './components-v4/toast-native';
import Tooltip from './components-v4/tooltip-native';

import './util/init-v4';
import initCallback from './util/initCallback-v4';
import removeDataAPI from './util/removeDataAPI-v4';
import componentsInit from './util/componentsInit-v4';
import Version from './version';

const BSN = {
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

export default BSN;
