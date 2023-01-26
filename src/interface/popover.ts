import { OriginalEvent } from '@thednp/shorty';
import { TooltipOptions } from './tooltip';

export interface PopoverOptions extends TooltipOptions {
  title: string | HTMLElement;
  content: string | HTMLElement;
  btnClose: string | HTMLElement;
  dismissible: boolean;
}

export interface PopoverEvent extends OriginalEvent {
  readonly type:
    | string
    | 'show.bs.popover'
    | 'shown.bs.popover'
    | 'hide.bs.popover'
    | 'hidden.bs.popover'
    | 'updated.bs.popover';
}
