import initCallback from './initCallback.js'
import componentsInit from './componentsInit.js'

import Alert from '../components-v5/alert-native.js'
import Button from '../components-v5/button-native.js'
import Carousel from '../components-v5/carousel-native.js'
import Collapse from '../components-v5/collapse-native.js'
import Dropdown from '../components-v5/dropdown-native.js'
import Modal from '../components-v5/modal-native.js'
import Popover from '../components-v5/popover-native.js'
import ScrollSpy from '../components-v5/scrollspy-native.js'
import Tab from '../components-v5/tab-native.js'
import Toast from '../components-v5/toast-native.js'
import Tooltip from '../components-v5/tooltip-native.js'

componentsInit.Alert = [ Alert, '[data-bs-dismiss="alert"]']
componentsInit.Button = [ Button, '[data-bs-toggle="buttons"]' ]
componentsInit.Carousel = [ Carousel, '[data-bs-ride="carousel"]' ]
componentsInit.Collapse = [ Collapse, '[data-bs-toggle="collapse"]' ]
componentsInit.Dropdown = [ Dropdown, '[data-bs-toggle="dropdown"]']
componentsInit.Modal = [ Modal, '[data-bs-toggle="modal"]' ]
componentsInit.Popover = [ Popover, '[data-bs-toggle="popover"],[data-tip="popover"]' ]
componentsInit.ScrollSpy = [ ScrollSpy, '[data-bs-spy="scroll"]' ]
componentsInit.Tab = [ Tab, '[data-bs-toggle="tab"]' ]
componentsInit.Toast = [ Toast, '[data-bs-dismiss="toast"]' ]
componentsInit.Tooltip = [ Tooltip, '[data-bs-toggle="tooltip"],[data-tip="tooltip"]' ]

// bulk initialize all components
document.body ? initCallback() : document.addEventListener( 'DOMContentLoaded', function initWrapper(){
	initCallback()
	document.removeEventListener('DOMContentLoaded',initWrapper,false)
}, false );
