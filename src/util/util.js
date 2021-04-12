// summon all utils together and export them to globals for better performance
import {
  mouseClickEvents, mouseHoverEvents, getElementTransitionDuration,
  emulateTransitionEnd, passiveHandler, queryElement,
} from 'shorter-js';
import bootstrapCustomEvent from './bootstrapCustomEvent.js';
import dispatchCustomEvent from './dispatchCustomEvent.js';
import setFocus from './setFocus.js';
import styleTip from './styleTip.js';
import getScroll from './getScroll.js';

// for faster execution
// export this object to global
const Util = {
  // selector
  queryElement,
  // transition
  getElementTransitionDuration,
  emulateTransitionEnd,
  bootstrapCustomEvent,
  dispatchCustomEvent,
  mouseClickEvents,
  mouseHoverEvents,
  passiveHandler,
  // misc
  setFocus,
  styleTip,
  getScroll,
};

export default Util;
