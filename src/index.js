import Alert from './components/alert-native.js'
import Button from './components/button-native.js'
import Carousel from './components/carousel-native.js'
import Collapse from './components/collapse-native.js'
import Dropdown from './components/dropdown-native.js'
import Modal from './components/modal-native.js'
import Popover from './components/popover-native.js'
import ScrollSpy from './components/scrollspy-native.js'
import Tab from './components/tab-native.js'
import Toast from './components/toast-native.js'
import Tooltip from './components/tooltip-native.js'

import './util/init.js'
import initCallback from './util/initCallback.js'
import removeDataAPI from './util/removeDataAPI.js'
import componentsInit from './util/componentsInit.js'
import {version as Version} from './../package.json'

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
  Version
}