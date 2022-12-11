import { OriginalEvent } from '@thednp/shorty/src/interface/originalEvent';
import { BaseOptions } from './baseComponent';

export interface TabOptions extends BaseOptions {
  parent?: HTMLElement;
}

export interface TabEvent extends OriginalEvent {
  readonly type: string | 'show.bs.tab' | 'shown.bs.tab' | 'hide.bs.tab' | 'hidden.bs.tab';
  // relatedTarget: EventTarget | null;
}
