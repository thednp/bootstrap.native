import { OriginalEvent } from '@thednp/shorty';
import { BaseOptions } from './baseComponent';

export interface TooltipOptions extends BaseOptions {
  template: string | HTMLElement;
  title: string | HTMLElement;
  customClass: string;
  trigger: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  sanitizeFn?: (str: string) => string;
  animation: boolean;
  delay: number;
  // ------ Popover
  content: string | HTMLElement;
  dismissible: boolean;
  btnClose: string | HTMLElement;
}

export interface TooltipEvent extends OriginalEvent {
  readonly type:
    | string
    | 'show.bs.tooltip'
    | 'shown.bs.tooltip'
    | 'hide.bs.tooltip'
    | 'hidden.bs.tooltip'
    | 'updated.bs.tooltip';
}
