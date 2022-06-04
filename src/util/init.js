import initCallback from './initCallback';
import componentsInit from './componentsInit';

import Alert from '../components/alert-native';
import Button from '../components/button-native';
import Carousel from '../components/carousel-native';
import Collapse from '../components/collapse-native';
import Dropdown from '../components/dropdown-native';
import Modal from '../components/modal-native';
import Popover from '../components/popover-native';
import ScrollSpy from '../components/scrollspy-native';
import Tab from '../components/tab-native';
import Toast from '../components/toast-native';
import Tooltip from '../components/tooltip-native';

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
