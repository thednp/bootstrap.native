import { OriginalEvent } from '@thednp/shorty';
import { BaseOptions } from './baseComponent';

export interface ModalOptions extends BaseOptions {
  backdrop: boolean | 'static';
  keyboard: boolean;
}

export interface ModalEvent extends OriginalEvent {
  readonly type: string | 'show.bs.modal' | 'shown.bs.modal' | 'hide.bs.modal' | 'hidden.bs.modal';
}
