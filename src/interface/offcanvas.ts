import { OriginalEvent } from '@thednp/shorty';
import { BaseOptions } from './baseComponent';

export interface OffcanvasOptions extends BaseOptions {
  backdrop: boolean | 'static';
  keyboard: boolean;
}

export interface OffcanvasEvent extends OriginalEvent {
  readonly type: string | 'show.bs.offcanvas' | 'shown.bs.offcanvas' | 'hide.bs.offcanvas' | 'hidden.bs.offcanvas';
}
