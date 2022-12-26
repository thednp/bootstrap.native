import { OriginalEvent } from '@thednp/shorty';
import { BaseOptions } from './baseComponent';

export interface CarouselOptions extends BaseOptions {
  pause: boolean | 'hover';
  keyboard: boolean;
  touch: boolean;
  interval: number | boolean;
}

export interface CarouselEvent extends OriginalEvent {
  readonly type: string | 'slide.bs.carousel' | 'slid.bs.carousel';
  readonly direction: 'left' | 'right';
  readonly from: number;
  readonly to: number;
}
