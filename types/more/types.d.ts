// BSN Generic Types
export interface ComponentInstance extends SHORTER.Component {
  [x:string]: any
}

export interface ComponentOptions {
  options: ComponentInstance["options"];
}

export type GetInstance<T> = (element: string | Element) => T | null;
export type InitCallback<T> = (element: string | Element, config?: ComponentOptions) => T | null;


// BSN Component


/** Alert */
export namespace AlertEvent {
  enum Events {
    close = "close.bs.alert",
    closed = "closed.bs.carousel",
  }

  interface close extends CustomEvent {
    /** e.type */
    readonly type: Events.close;
    /** e.relatedTarget */
    readonly relatedTarget?: Element;
  }
  interface closed extends CustomEvent {
    /** e.type */
    readonly type: Events.closed;
    /** e.relatedTarget */
    readonly relatedTarget?: Element;
  }
}


/** Button */
// no custom events, options


/** Carousel */
export interface CarouselCustomEvent extends CustomEvent {
  /** e.relatedTarget */
  readonly relatedTarget: Element;
  /** e.direction */
  readonly direction: 'left' | 'right';
  /** e.from */
  readonly from: number;
  /** e.to */
  readonly to: number;
}
export namespace CarouselEvent {
  enum Events {
    slide = "slide.bs.carousel",
    slid = "slid.bs.carousel",
  }
  interface slide extends CarouselCustomEvent {
    /** e.type */
    readonly type: Events.slide;
  }
  interface slid extends CarouselCustomEvent {
    /** e.type */
    readonly type: Events.slid;
  }
}
export interface CarouselOptions extends ComponentOptions {
  /** @default 'hover' */
  pause?: boolean | 'hover',
  /** @default false  */
  keyboard?: boolean,
  /** @default true */
  touch?: boolean,
  /** @default 5000 */
  interval?: number | false,
}

/** Collapse */
export namespace CollapseEvent {
  enum Events {
    show = "show.bs.collapse",
    shown = "shown.bs.collapse",
    hide = "hide.bs.collapse",
    hidden = "hidden.bs.collapse",
  }
  interface show extends CustomEvent {
    /** e.type */
    readonly type: Events.show;
  }
  interface shown extends CustomEvent {
    /** e.type */
    readonly type: Events.shown;
  }
  interface hide extends CustomEvent {
    /** e.type */
    readonly type: Events.hide;
  }
  interface hidden extends CustomEvent {
    /** e.type */
    readonly type: Events.hidden;
  }
}
export interface CollapseOptions {
  /** @default null */
  parent?: Element
}

/** Dropdown */
export namespace DropdownEvent {
  enum Events {
    show = "show.bs.dropdown",
    shown = "shown.bs.dropdown",
    hide = "hide.bs.dropdown",
    hidden = "hidden.bs.dropdown",
  }
  interface show extends CustomEvent {
    /** e.type */
    readonly type: Events.show;
  }
  interface shown extends CustomEvent {
    /** e.type */
    readonly type: Events.shown;
  }
  interface hide extends CustomEvent {
    /** e.type */
    readonly type: Events.hide;
  }
  interface hidden extends CustomEvent {
    /** e.type */
    readonly type: Events.hidden;
  }
}
export interface DropdownOptions extends ComponentOptions {
  /** @default 5 usually px */
  offset?: number,
  /** @default 'dynamic' */
  display?: 'dynamic' | 'static',
}

/** Modal */
interface ModalCustomEvent extends CustomEvent {
  /** e.relatedTarget */
  readonly relatedTarget: Element;
}
export namespace ModalEvent {
  enum Events {
    show = "show.bs.modal",
    shown = "shown.bs.modal",
    hide = "hide.bs.modal",
    hidden = "hidden.bs.modal",
  }
  interface show extends ModalCustomEvent {
    /** e.type */
    readonly type: Events.show;
  }
  interface shown extends ModalCustomEvent {
    /** e.type */
    readonly type: Events.shown;
  }
  interface hide extends ModalCustomEvent {
    /** e.type */
    readonly type: Events.hide;
  }
  interface hidden extends ModalCustomEvent {
    /** e.type */
    readonly type: Events.hidden;
  }
}
export interface ModalOptions {
  /** @default true */
  backdrop?: boolean | 'static', // boolean|string
  /** @default true */
  keyboard?: boolean, // boolean
}


/** Offcanvas */
export namespace OffcanvasEvent {
  enum Events {
    show = "show.bs.offcanvas",
    shown = "shown.bs.offcanvas",
    hide = "hide.bs.offcanvas",
    hidden = "hidden.bs.offcanvas",
  }
  interface show extends CustomEvent {
    /** e.type */
    readonly type: Events.show;
  }
  interface shown extends CustomEvent {
    /** e.type */
    readonly type: Events.shown;
  }
  interface hide extends CustomEvent {
    /** e.type */
    readonly type: Events.hide;
  }
  interface hidden extends CustomEvent {
    /** e.type */
    readonly type: Events.hidden;
  }
}
export interface OffcanvasOptions {
  /** @default true */
  backdrop?: boolean,
  /** @default true */
  keyboard?: boolean,
  /** @default false */
  scroll?: boolean,
}

declare type tipPlacements = 'top' | 'bottom' | 'left' | 'right';

/** Popover */
export namespace PopoverEvent {
  enum Events {
    show = "show.bs.popover",
    shown = "shown.bs.popover",
    hide = "hide.bs.popover",
    hidden = "hidden.bs.popover",
  }
  interface show extends CustomEvent {
    /** e.type */
    readonly type: Events.show;
  }
  interface shown extends CustomEvent {
    /** e.type */
    readonly type: Events.shown;
  }
  interface hide extends CustomEvent {
    /** e.type */
    readonly type: Events.hide;
  }
  interface hidden extends CustomEvent {
    /** e.type */
    readonly type: Events.hidden;
  }
}
export interface PopoverOptions {
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
  container?: Element,
}


/** ScrollSpy */
export namespace ScrollSpyEvent {
  interface activate extends CustomEvent {
    /** e.type */
    readonly type: 'activate.bs.scrollspy';
  }
}
export interface ScrollspyOptions {
  /** @default 10 */
  offset?: number,
  /** @default null */
  target?: Element,
}


/** Tab */
interface TabCustomEvent extends CustomEvent {
  /** e.relatedTarget */
  readonly relatedTarget: Element;
}
export namespace TabEvent {
  enum Events {
    show = "show.bs.tab",
    shown = "shown.bs.tab",
    hide = "hide.bs.tab",
    hidden = "hidden.bs.tab",
  }
  interface show extends TabCustomEvent {
    /** e.type */
    readonly type: Events.show;
  }
  interface shown extends TabCustomEvent {
    /** e.type */
    readonly type: Events.shown;
  }
  interface hide extends TabCustomEvent {
    /** e.type */
    readonly type: Events.hide;
  }
  interface hidden extends TabCustomEvent {
    /** e.type */
    readonly type: Events.hidden;
  }
}


/** Toast */
export namespace ToastEvent {
  enum Events {
    show = "show.bs.toast",
    shown = "shown.bs.toast",
    hide = "hide.bs.toast",
    hidden = "hidden.bs.toast",
  }
  interface show extends CustomEvent {
    /** e.type */
    readonly type: Events.show;
  }
  interface shown extends CustomEvent {
    /** e.type */
    readonly type: Events.shown;
  }
  interface hide extends CustomEvent {
    /** e.type */
    readonly type: Events.hide;
  }
  interface hidden extends CustomEvent {
    /** e.type */
    readonly type: Events.hidden;
  }
}
export interface ToastOptions {
  /** @default true */
  animation?: boolean,
  /** @default true */
  autohide?: boolean,
  /** @default 500 */
  delay?: number,
}


/** Tooltip */
export namespace TooltipEvent {
  enum Events {
    show = "show.bs.tooltip",
    shown = "shown.bs.tooltip",
    hide = "hide.bs.tooltip",
    hidden = "hidden.bs.tooltip",
  }
  interface show extends CustomEvent {
    /** e.type */
    readonly type: Events.show;
  }
  interface shown extends CustomEvent {
    /** e.type */
    readonly type: Events.shown;
  }
  interface hide extends CustomEvent {
    /** e.type */
    readonly type: Events.hide;
  }
  interface hidden extends CustomEvent {
    /** e.type */
    readonly type: Events.hidden;
  }
}
export interface TooltipOptions {
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
  container?: Element,
}

