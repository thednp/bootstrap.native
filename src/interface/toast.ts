import { OriginalEvent } from '@thednp/shorty';
import { BaseOptions } from './baseComponent';

export interface ToastOptions extends BaseOptions {
  animation: boolean;
  autohide: boolean;
  delay: number;
}

export interface ToastEvent extends OriginalEvent {
  readonly type: string | 'show.bs.toast' | 'shown.bs.toast' | 'hide.bs.toast' | 'hidden.bs.toast';
}
