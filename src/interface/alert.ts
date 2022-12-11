// export default AlertInterface;
import { OriginalEvent } from '@thednp/shorty/src/interface/originalEvent';

export interface AlertEvent extends OriginalEvent {
  readonly type: string | 'close.bs.alert' | 'closed.bs.alert';
}
