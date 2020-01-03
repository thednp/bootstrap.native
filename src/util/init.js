import { initCallback } from './callbacks.js'
import { on } from './event.js'
import { supports } from './globals.js'

import Alert from './../alert-native.js'
import Button from './../button-native.js'
import Carousel from './../carousel-native.js'
import Collapse from './../collapse-native.js'
import Dropdown from './../dropdown-native.js'
import Modal from './../modal-native.js'
import Popover from './../popover-native.js'
import ScrollSpy from './../scrollspy-native.js'
import Tab from './../tab-native.js'
import Toast from './../toast-native.js'
import Tooltip from './../tooltip-native.js'

supports.Alert = [ Alert, '[data-dismiss="alert"]']
supports.Button = [ Button, '[data-toggle="buttons"]' ]
supports.Carousel = [ Carousel, '[data-ride="carousel"]' ]
supports.Collapse = [ Collapse, '[data-toggle="collapse"]' ]
supports.Dropdown = [ Dropdown, '[data-toggle="dropdown"]']
supports.Modal = [ Modal, '[data-toggle="modal"]' ]
supports.Popover = [ Popover, '[data-toggle="popover"],[data-tip="popover"]' ]
supports.ScrollSpy = [ ScrollSpy, '[data-spy="scroll"]' ]
supports.Tab = [ Tab, '[data-toggle="tab"]' ]
supports.Toast = [ Toast, '[data-dismiss="toast"]' ]
supports.Tooltip = [ Tooltip, '[data-toggle="tooltip"],[data-tip="tooltip"]' ]

// bulk initialize all components
document.body ? initCallback() : on( document, 'DOMContentLoaded', initCallback );
