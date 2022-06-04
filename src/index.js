import Alert from './components/alert-native';
import Button from './components/button-native';
import Carousel from './components/carousel-native';
import Collapse from './components/collapse-native';
import Dropdown from './components/dropdown-native';
import Modal from './components/modal-native';
import Popover from './components/popover-native';
import ScrollSpy from './components/scrollspy-native';
import Tab from './components/tab-native';
import Toast from './components/toast-native';
import Tooltip from './components/tooltip-native';

import './util/init';
import initCallback from './util/initCallback';
import removeDataAPI from './util/removeDataAPI';
import componentsInit from './util/componentsInit';
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
