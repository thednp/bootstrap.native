type SelectorOrReference = string | Element;
type Placement = "top" | "bottom" | "left" | "right";

declare module "bootstrap.native/src/components/alert-native.js" {
  export default class Alert {
    constructor(element: SelectorOrReference)

    close(): void;

    dispose(): void;
  }
}

declare module "bootstrap.native/dist/components/alert-native.esm.js" {
  export {default} from "bootstrap.native/src/components/alert-native.js"
}

declare module "bootstrap.native/src/components/button-native.js" {
  export default class Button {
    constructor(element: SelectorOrReference);

    toggle(): void;

    dispose(): void;
  }
}

declare module "bootstrap.native/dist/components/button-native.esm.js" {
  export {default} from "bootstrap.native/src/components/button-native.js"
}

declare module "bootstrap.native/src/components/carousel-native.js" {
  export default class Carousel {
    constructor(element: SelectorOrReference, options?: CarouselOptions);

    cycle(): void;

    pause(): void;

    to(index: number): void;

    prev(): void;

    next(): void;

    dispose(): void;
  }

  export interface CarouselOptions {
    /** @default true */
    keyboard?: boolean;

    /** @default hover */
    pause?: boolean | "hover";

    /** @default true */
    touch?: boolean;

    /** @default 5000 */
    interval?: boolean | number;
  }
}

declare module "bootstrap.native/dist/components/carousel-native.esm.js" {
  export {default, CarouselOptions} from "bootstrap.native/src/components/carousel-native.js"
}

declare module "bootstrap.native/src/components/collapse-native.js" {
  export default class Collapse {
    constructor(element: SelectorOrReference, options?: CollapseOptions);

    show(): void;

    hide(): void;

    toggle(): void;

    dispose(): void;
  }

  export interface CollapseOptions {
    parent?: SelectorOrReference;
    target?: SelectorOrReference;
  }
}

declare module "bootstrap.native/dist/components/collapse-native.esm.js" {
  export {default, CollapseOptions} from "bootstrap.native/src/components/collapse-native.js"
}

declare module "bootstrap.native/src/components/dropdown-native.js" {
  export default class Dropdown {
    constructor(element: SelectorOrReference, options?: DropdownOptions);

    show(): void;

    hide(): void;

    toggle(): void;

    dispose(): void;
  }

  export interface DropdownOptions {
    /** @default dynamic */
    display?: string;

    /** @default 5 */
    offset?: number;
  }  
}

declare module "bootstrap.native/dist/components/dropdown-native.esm.js" {
  export {default} from "bootstrap.native/src/components/dropdown-native.js"
}

declare module "bootstrap.native/src/components/modal-native.js" {
  export default class Modal {
    constructor(element: SelectorOrReference, options?: ModalOptions);

    show(): void;

    hide(): void;

    toggle(): void;

    update(): void;

    dispose(): void;
  }

  export interface ModalOptions {
    /** @default true */
    backdrop?: boolean | "static";

    /** @default true */
    keyboard?: boolean;
  }
}

declare module "bootstrap.native/dist/components/modal-native.esm.js" {
  export {default, ModalOptions} from "bootstrap.native/src/components/modal-native.js"
}

declare module "bootstrap.native/src/components/offcanvas-native.js" {
  export default class Offcanvas {
    constructor(element: SelectorOrReference, options?: OffcanvasOptions);

    show(): void;

    hide(): void;

    toggle(): void;

    update(): void;

    dispose(): void;
  }

  export interface OffcanvasOptions {
    /** @default true */
    backdrop?: boolean;

    /** @default true */
    keyboard?: boolean;

    /** @default false */
    scroll?: boolean;
  }
}

declare module "bootstrap.native/dist/components/offcanvas-native.esm.js" {
  export {default} from "bootstrap.native/src/components/offcanvas-native.js"
}

declare module "bootstrap.native/src/components/popover-native.js" {
  export default class Popover {
    constructor(element: SelectorOrReference, options?: PopoverOptions);

    show(): void;

    hide(): void;

    toggle(): void;

    enable(): void;

    disable(): void;

    toggleEnabled(): void;

    update(): void;

    dispose(): void;
  }

  export interface PopoverOptions {
    template?: string;

    content?: string;

    title?: string;

    /** @default false */
    dismissible?: boolean;

    /** @default hover */
    trigger?: string;

    /** @default null */
    sanitizeFn?: function;

    /** @default true */
    animation?: boolean;

    /** @default top */
    placement?: Placement;

    /** @default 200 */
    delay?: number;

    /** @default null */
    customClass?: string;

    /** @default document.body */
    container?: SelectorOrReference;
  }
}

declare module "bootstrap.native/dist/components/popover-native.esm.js" {
  export {default, PopoverOptions} from "bootstrap.native/src/components/popover-native.js"
}

declare module "bootstrap.native/src/components/scrollspy-native.js" {
  export default class ScrollSpy {
    constructor(element: SelectorOrReference, options?: ScrollSpyOptions);

    refresh(): void;

    dispose(): void;
  }

  export interface ScrollSpyOptions {
    target?: SelectorOrReference;

    /** @default 10 */
    offset: number;
  }
}

declare module "bootstrap.native/dist/components/scrollspy-native.esm.js" {
  export {default, ScrollSpyOptions} from "bootstrap.native/src/components/scrollspy-native.js"
}

declare module "bootstrap.native/src/components/tab-native.js" {
  export default class Tab {
    constructor(element: SelectorOrReference);

    show(): void;

    dispose(): void;
  }
}

declare module "bootstrap.native/dist/components/tab-native.esm.js" {
  export {default, TabOptions} from "bootstrap.native/src/components/tab-native.js"
}

declare module "bootstrap.native/src/components/toast-native.js" {
  export default class Toast {
    constructor(element: SelectorOrReference, options?: ToastOptions);

    show(): void;

    hide(): void;

    dispose(): void;
  }

  export interface ToastOptions {
    /** @default true */
    animation?: boolean;

    /** @default true */
    autohide?: boolean;

    /** @default 500 */
    delay?: number;
  }
}

declare module "bootstrap.native/dist/components/toast-native.esm.js" {
  export {default, ToastOptions} from "bootstrap.native/src/components/toast-native.js"
}

declare module "bootstrap.native/src/components/tooltip-native.js" {
  export default class Tooltip {
    constructor(element: SelectorOrReference, options?: TooltipOptions);

    show(): void;

    hide(): void;

    toggle(): void;

    enable(): void;

    disable(): void;

    toggleEnabled(): void;

    update(): void;

    dispose(): void;
  }

  export interface TooltipOptions {
    template?: string;

    /** @default true */
    animation?: boolean;

    /** @default top */
    placement?: Placement;

    /** @default 200 */
    delay?: number;

    /** @default null */
    customClass?: string;

    /** @default null */
    sanitizeFn?: function;

    /** @default document.body */
    container?: SelectorOrReference;
  }
}

declare module "bootstrap.native/dist/components/tooltip-native.esm.js" {
  export {default, TooltipOptions} from "bootstrap.native/src/components/tooltip-native.js"
}

declare module "bootstrap.native" {
  import Alert from "bootstrap.native/src/components/alert-native.js";
  import Button from "bootstrap.native/src/components/button-native.js";
  import Carousel from "bootstrap.native/src/components/carousel-native.js";
  import Collapse from "bootstrap.native/src/components/collapse-native.js";
  import Dropdown from "bootstrap.native/src/components/dropdown-native.js";
  import Modal from "bootstrap.native/src/components/modal-native.js";
  import Popover from "bootstrap.native/src/components/popover-native.js";
  import ScrollSpy from "bootstrap.native/src/components/scrollspy-native.js";
  import Tab from "bootstrap.native/src/components/tab-native.js";
  import Toast from "bootstrap.native/src/components/toast-native.js";
  import Tooltip from "bootstrap.native/src/components/tooltip-native.js";

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
    Tooltip: typeof Tooltip;
  }

  interface BSN extends Components {
    initCallback(
      /** @default document */
      element?: Element
    ): void;

    removeDataAPI(
      /** @default document */
      container?: Element
    ): void;

    Version: string;
    componentsInit: object;
  }

  const BSN: BSN;

  export default BSN;
}
