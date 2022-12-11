import { OriginalEvent } from '@thednp/shorty/src/interface/originalEvent';
import { BaseOptions } from './baseComponent';

export interface TooltipOptions extends BaseOptions {
  template: string;
  title: string;
  customClass: string;
  trigger: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  sanitizeFn?: (str: string) => string;
  animation: boolean;
  delay: number;
  /** @deprecated */
  container: ParentNode | Window;
  // ------ Popover
  content: string;
  dismissible: boolean;
  btnClose: string;
}

export interface TooltipEvent extends OriginalEvent {
  readonly type: string | 'show.bs.tooltip' | 'shown.bs.tooltip' | 'hide.bs.tooltip' | 'hidden.bs.tooltip';
}
