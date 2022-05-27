// summon all utils together and export them to globals for better performance
import {
  mouseClickEvents, mouseHoverEvents, getElementTransitionDuration,
  emulateTransitionEnd, passiveHandler, queryElement,
} from '@thednp/shorty';
import dispatchCustomEvent from './dispatchCustomEvent';
import styleTip from './styleTip';

// for faster execution
// export this object to global
const Util = {
  // selector
  queryElement,
  // transition
  getElementTransitionDuration,
  emulateTransitionEnd,
  dispatchCustomEvent,
  mouseClickEvents,
  mouseHoverEvents,
  passiveHandler,
  // misc
  styleTip,
};

export default Util;
