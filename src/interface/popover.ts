import { OriginalEvent } from '@thednp/shorty/src/interface/originalEvent';
import { TooltipOptions } from './tooltip';

export interface PopoverOptions extends TooltipOptions {
  title: string;
  content: string;
  btnClose: string;
  dismissible: boolean;
}

export interface PopoverEvent extends OriginalEvent {
  readonly type: string | 'show.bs.popover' | 'shown.bs.popover' | 'hide.bs.popover' | 'hidden.bs.popover';
}
