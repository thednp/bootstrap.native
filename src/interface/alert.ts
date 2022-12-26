import { OriginalEvent } from '@thednp/shorty';

export interface AlertEvent extends OriginalEvent {
  readonly type: string | 'close.bs.alert' | 'closed.bs.alert';
}
