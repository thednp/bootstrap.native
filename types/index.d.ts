export as namespace BSN;

import './bsn';
export {default as Alert} from "bootstrap.native/src/components/alert-native";
export {default as Button} from "bootstrap.native/src/components/button-native";
export {default as Carousel} from "bootstrap.native/src/components/carousel-native";
export {default as Collapse} from "bootstrap.native/src/components/collapse-native";
export {default as Dropdown} from "bootstrap.native/src/components/dropdown-native";
export {default as Modal} from "bootstrap.native/src/components/modal-native";
export {default as Offcanvas} from "bootstrap.native/src/components/offcanvas-native";
export {default as Popover} from "bootstrap.native/src/components/popover-native";
export {default as ScrollSpy} from "bootstrap.native/src/components/scrollspy-native";
export {default as Tab} from "bootstrap.native/src/components/tab-native";
export {default as Toast} from "bootstrap.native/src/components/toast-native";
export {default as Tooltip} from "bootstrap.native/src/components/tooltip-native";
export {initCallback, removeDataAPI} from "bootstrap.native/src/util/init";
export {default as Version} from "bootstrap.native/src/version";

declare module "bootstrap.native/dist/components/alert-native" {
  export {default as Alert} from 'bootstrap.native/src/components/alert-native';
}
declare module "bootstrap.native/dist/components/alert-native.esm" {
  export {default as Alert} from 'bootstrap.native/src/components/alert-native';
}

declare module "bootstrap.native/dist/components/button-native" {
  export {default as Button} from 'bootstrap.native/src/components/button-native';
}
declare module "bootstrap.native/dist/components/button-native.esm" {
  export {default as Button} from 'bootstrap.native/src/components/button-native';
}

declare module "bootstrap.native/dist/components/carousel-native" {
  export {default as Carousel} from 'bootstrap.native/src/components/carousel-native';
}
declare module "bootstrap.native/dist/components/carousel-native.esm" {
  export {default as Carousel} from 'bootstrap.native/src/components/carousel-native';
}

declare module "bootstrap.native/dist/components/collapse-native" {
  export {default as Collapse} from 'bootstrap.native/src/components/collapse-native';
}
declare module "bootstrap.native/dist/components/collapse-native.esm" {
  export {default as Collapse} from 'bootstrap.native/src/components/collapse-native';
}

declare module "bootstrap.native/dist/components/dropdown-native" {
  export {default as Dropdown} from 'bootstrap.native/src/components/dropdown-native';
}
declare module "bootstrap.native/dist/components/dropdown-native.esm" {
  export {default as Dropdown} from 'bootstrap.native/src/components/dropdown-native';
}

declare module "bootstrap.native/dist/components/modal-native" {
  export {default as Modal} from 'bootstrap.native/src/components/modal-native';
}
declare module "bootstrap.native/dist/components/modal-native.esm" {
  export {default as Modal} from 'bootstrap.native/src/components/modal-native';
}

declare module "bootstrap.native/dist/components/offcanvas-native" {
  export {default as Offcanvas} from 'bootstrap.native/src/components/offcanvas-native';
}
declare module "bootstrap.native/dist/components/offcanvas-native.esm" {
  export {default as Offcanvas} from 'bootstrap.native/src/components/offcanvas-native';
}

declare module "bootstrap.native/dist/components/popover-native" {
  export {default as Popover} from 'bootstrap.native/src/components/popover-native';
}
declare module "bootstrap.native/dist/components/popover-native.esm" {
  export {default as Popover} from 'bootstrap.native/src/components/popover-native';
}

declare module "bootstrap.native/dist/components/scrollspy-native" {
  export {default as ScrollSpy} from 'bootstrap.native/src/components/scrollspy-native';
}
declare module "bootstrap.native/dist/components/scrollspy-native.esm" {
  export {default as ScrollSpy} from 'bootstrap.native/src/components/scrollspy-native';
}

declare module "bootstrap.native/dist/components/tab-native" {
  export {default as Tab} from 'bootstrap.native/src/components/tab-native';
}
declare module "bootstrap.native/dist/components/tab-native.esm" {
  export {default as Tab} from 'bootstrap.native/src/components/tab-native';
}

declare module "bootstrap.native/dist/components/toast-native" {
  export {default as Toast} from 'bootstrap.native/src/components/toast-native';
}
declare module "bootstrap.native/dist/components/toast-native.esm" {
  export {default as Toast} from 'bootstrap.native/src/components/toast-native';
}

declare module "bootstrap.native/dist/components/tooltip-native" {
  export {default as Tooltip} from 'bootstrap.native/src/components/tooltip-native';
}
declare module "bootstrap.native/dist/components/tooltip-native.esm" {
  export {default as Tooltip} from 'bootstrap.native/src/components/tooltip-native';
}

declare module "bootstrap.native" {
  import Alert from "bootstrap.native/src/components/alert-native";
  import Button from "bootstrap.native/src/components/button-native";
  import Carousel from "bootstrap.native/src/components/carousel-native";
  import Collapse from "bootstrap.native/src/components/collapse-native";
  import Dropdown from "bootstrap.native/src/components/dropdown-native";
  import Modal from "bootstrap.native/src/components/modal-native";
  import Popover from "bootstrap.native/src/components/popover-native";
  import ScrollSpy from "bootstrap.native/src/components/scrollspy-native";
  import Tab from "bootstrap.native/src/components/tab-native";
  import Toast from "bootstrap.native/src/components/toast-native";
  import {initCallback, removeDataAPI} from "bootstrap.native/src/util/init";
  import Version from "bootstrap.native/src/version";

  interface Components {
    Alert: typeof Alert;
    Button: typeof Button;
    Carousel: typeof Carousel;
    Collapse: typeof Collapse;
    Dropdown: typeof Dropdown;
    Modal: typeof Modal;
    Popover: typeof Popover;
    ScrollSpy: typeof ScrollSpy;
    Tab: typeof Tab;
    Toast: typeof Toast;
  }

  interface BSN extends Components {
    initCallback: typeof initCallback;
    removeDataAPI: typeof removeDataAPI;
    Version: typeof Version;
  }
  const BSN: BSN;
  export default BSN;
}

// internal types
export {
  // generic typings
  GetInstance,
  InitCallback,
  ComponentOptions,
  Event,
  Options,
  OriginalEvent,
} from './more/types';

declare global {
  interface HTMLElement {
    addEventListener(
      type: BSN.Event.Carousel,
      listener: (this: HTMLElement, ev: BSN.Event.Carousel) => any,
      options?: boolean | AddEventListenerOptions,
    ): void;
  }
}

// dependency
export * as SHORTER from "shorter-js";
