import initCallback from './initCallback.js';
import componentsInit from './componentsInit.js';

import Alert from '../components-v4/alert-native.js';
import Button from '../components-v4/button-native.js';
import Carousel from '../components-v4/carousel-native.js';
import Collapse from '../components-v4/collapse-native.js';
import Dropdown from '../components-v4/dropdown-native.js';
import Modal from '../components-v4/modal-native.js';
import Popover from '../components-v4/popover-native.js';
import ScrollSpy from '../components-v4/scrollspy-native.js';
import Tab from '../components-v4/tab-native.js';
import Toast from '../components-v4/toast-native.js';
import Tooltip from '../components-v4/tooltip-native.js';

componentsInit.Alert = [Alert, '[data-dismiss="alert"]'];
componentsInit.Button = [Button, '[data-toggle="buttons"]'];
componentsInit.Carousel = [Carousel, '[data-ride="carousel"]'];
componentsInit.Collapse = [Collapse, '[data-toggle="collapse"]'];
componentsInit.Dropdown = [Dropdown, '[data-toggle="dropdown"]'];
componentsInit.Modal = [Modal, '[data-toggle="modal"]'];
componentsInit.Popover = [Popover, '[data-toggle="popover"],[data-tip="popover"]'];
componentsInit.ScrollSpy = [ScrollSpy, '[data-spy="scroll"]'];
componentsInit.Tab = [Tab, '[data-toggle="tab"]'];
componentsInit.Toast = [Toast, '[data-dismiss="toast"]'];
componentsInit.Tooltip = [Tooltip, '[data-toggle="tooltip"],[data-tip="tooltip"]'];

// bulk initialize all components
if (document.body) initCallback();
else {
  document.addEventListener('DOMContentLoaded', function initWrapper() {
    initCallback();
    document.removeEventListener('DOMContentLoaded', initWrapper, false);
  }, false);
}
