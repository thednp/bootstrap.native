export default Util;
declare namespace Util {
    export { queryElement };
    export { getElementTransitionDuration };
    export { emulateTransitionEnd };
    export { bootstrapCustomEvent };
    export { dispatchCustomEvent };
    export { mouseClickEvents };
    export { mouseHoverEvents };
    export { passiveHandler };
    export { setFocus };
    export { styleTip };
    export { getScroll };
}
import bootstrapCustomEvent from "./bootstrapCustomEvent.js";
import dispatchCustomEvent from "./dispatchCustomEvent.js";
import setFocus from "./setFocus.js";
import styleTip from "./styleTip.js";
import getScroll from "./getScroll.js";
