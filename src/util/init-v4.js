import initCallback from './initCallback-v4';
import componentsInit from './componentsInit-v4';

import Alert from '../components-v4/alert-native';
import Button from '../components-v4/button-native';
import Carousel from '../components-v4/carousel-native';
import Collapse from '../components-v4/collapse-native';
import Dropdown from '../components-v4/dropdown-native';
import Modal from '../components-v4/modal-native';
import Popover from '../components-v4/popover-native';
import ScrollSpy from '../components-v4/scrollspy-native';
import Tab from '../components-v4/tab-native';
import Toast from '../components-v4/toast-native';
import Tooltip from '../components-v4/tooltip-native';

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
