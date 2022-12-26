import { OriginalEvent } from '@thednp/shorty';
import { BaseOptions } from './baseComponent';

export interface CollapseOptions extends BaseOptions {
  parent: HTMLElement | null;
}

export interface CollapseEvent extends OriginalEvent {
  readonly type: string | 'show.bs.collapse' | 'shown.bs.collapse' | 'hide.bs.collapse' | 'hidden.bs.collapse';
}
