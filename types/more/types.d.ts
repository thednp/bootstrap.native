// BSN Generic Types
export type ComponentOptions = Record<string, any>;

export interface BaseComponent extends Record<string, any> {
  element: HTMLElement | Element,
  dispose: Function,
  // getters
  name: string,
  options?: ComponentOptions,
  defaults?: ComponentOptions,
  version: string,
}

export type GetInstance<T> = (element: string | HTMLElement | Element) => T | null;
export type InitCallback<T> = (element: string | HTMLElement | Element, config?: ComponentOptions) => T;

export interface OriginalEvent extends CustomEvent {
  relatedTarget?: HTMLElement | Element | null;
}


// BSN.Event
export namespace Event {
  enum AlertEvents {
    close = "close.bs.alert",
    closed = "closed.bs.alert"
  }
  interface Alert {
    /** e.type */
    readonly type: AlertEvents;
  }

  enum CarouselEvents {
    slide = "slide.bs.carousel",
    slid = "slid.bs.carousel",
  }
  interface Carousel {
    /** e.type */
    readonly type: CarouselEvents;
    /** e.direction */
    readonly direction: 'left' | 'right';
    /** e.from */
    readonly from: number;
    /** e.to */
    readonly to: number;
  }
  enum CollapseEvents {
    show = "show.bs.collapse",
    shown = "shown.bs.collapse",
    hide = "hide.bs.collapse",
    hidden = "hidden.bs.collapse",
  }
  interface Collapse {
    /** e.type */
    readonly type: CollapseEvents;
  }
  enum DropdownEvents {
    show = "show.bs.dropdown",
    shown = "shown.bs.dropdown",
    hide = "hide.bs.dropdown",
    hidden = "hidden.bs.dropdown",
  }
  interface Dropdown {
    /** e.type */
    readonly type: DropdownEvents;
  }
  enum ModalEvents {
    show = "show.bs.modal",
    shown = "shown.bs.modal",
    hide = "hide.bs.modal",
    hidden = "hidden.bs.modal",
  }
  interface Modal {
    /** e.type */
    readonly type: ModalEvents;
  }
  enum OffcanvasEvents {
    show = "show.bs.offcanvas",
    shown = "shown.bs.offcanvas",
    hide = "hide.bs.offcanvas",
    hidden = "hidden.bs.offcanvas",
  }
  interface Offcanvas {
    /** e.type */
    readonly type: OffcanvasEvents;
  }
  enum PopoverEvents {
    show = "show.bs.popover",
    shown = "shown.bs.popover",
    hide = "hide.bs.popover",
    hidden = "hidden.bs.popover",
  }
  interface Popover {
    /** e.type */
    readonly type: PopoverEvents;
  }
  interface ScrollSpy {
    /** e.type */
    readonly type: 'activate.bs.scrollspy';
  }
  enum TabEvents {
    show = "show.bs.tab",
    shown = "shown.bs.tab",
    hide = "hide.bs.tab",
    hidden = "hidden.bs.tab",
  }
  interface Tab {
    /** e.type */
    readonly type: TabEvents;
  }
  enum ToastEvents {
    show = "show.bs.toast",
    shown = "shown.bs.toast",
    hide = "hide.bs.toast",
    hidden = "hidden.bs.toast",
  }
  interface Toast {
    /** e.type */
    readonly type: ToastEvents;
  }
  enum TooltipEvents {
    show = "show.bs.tooltip",
    shown = "shown.bs.tooltip",
    hide = "hide.bs.tooltip",
    hidden = "hidden.bs.tooltip",
  }
  interface Tooltip {
    /** e.type */
    readonly type: TooltipEvents;
  }
}

// Popover / Tooltip
declare type tipPlacements = 'top' | 'bottom' | 'left' | 'right';

// BSN.Options

export namespace Options {
  interface Carousel extends ComponentOptions {
    /** @default 'hover' */
    pause?: boolean | 'hover',
    /** @default false  */
    keyboard?: boolean,
    /** @default true */
    touch?: boolean,
    /** @default 5000 */
    interval?: number | false,
  }
  interface Collapse {
    /** @default null */
    parent?: HTMLElement | Element
  }
  interface Dropdown extends ComponentOptions {
    /** @default 5 usually px */
    offset?: number,
    /** @default 'dynamic' */
    display?: 'dynamic' | 'static',
  }
  interface Modal extends ComponentOptions {
    /** @default true */
    backdrop?: boolean | 'static', // boolean|string
    /** @default true */
    keyboard?: boolean, // boolean
  }
  interface Offcanvas extends ComponentOptions {
    /** @default true */
    backdrop?: boolean,
    /** @default true */
    keyboard?: boolean,
    /** @default false */
    scroll?: boolean,
  }
  interface Popover extends ComponentOptions {
    /** @default '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>' */
    template?: string,
    /** @default null */
    title?: string,
    /** @default null */
    content?: string,
    /** @default null */
    customClass?: string,
    /** @default 'hover' */
    trigger?: string,
    /** @default 'top' */
    placement?: tipPlacements,
    /** @default '<button class="btn-close" aria-label="Close"></button>' */
    btnClose?: string,
    /** @default null */
    sanitizeFn?: Function,
    /** @default false */
    dismissible?: boolean,
    /** @default true */
    animation?: boolean,
    /** @default 200 */
    delay?: number,
    /** @default document.body */
    container?: HTMLElement | Element,
  }
  interface ScrollSpy extends ComponentOptions {
    /** @default 10 */
    offset?: number,
    /** @default null */
    target?: HTMLElement | Element,
  }
  interface Toast extends ComponentOptions {
    /** @default true */
    animation?: boolean,
    /** @default true */
    autohide?: boolean,
    /** @default 500 */
    delay?: number,
  }
  interface Tooltip extends ComponentOptions {
    /** @default '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' */
    template?: string,
    /** @default null */
    title?: string,
    /** @default null */
    content?: string,
    /** @default null */
    customClass?: string,
    /** @default 'hover' */
    trigger?: string,
    /** @default 'top' */
    placement?: tipPlacements,
    /** @default null */
    sanitizeFn?: Function,
    /** @default false */
    dismissible?: boolean,
    /** @default true */
    animation?: boolean,
    /** @default 200 */
    delay?: number,
    /** @default document.body */
    container?: HTMLElement | Element,
  }
}
