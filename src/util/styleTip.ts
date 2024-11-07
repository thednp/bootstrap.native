import {
  createCustomEvent,
  dispatchEvent,
  getBoundingClientRect,
  getDocumentElement,
  getElementStyle,
  getNodeScroll,
  getRectRelativeToOffsetParent,
  isHTMLElement,
  isRTL,
  setElementStyle,
  toLowerCase,
} from "@thednp/shorty";

import tipClassPositions from "./tipClassPositions";
import Tooltip from "../components/tooltip";
import type { TooltipEvent } from "../interface/tooltip";
import type { PopoverEvent } from "../interface/popover";

/**
 * Style popovers and tooltips.
 *
 * @param self the `Popover` / `Tooltip` instance
 */
const styleTip = (self: Tooltip) => {
  requestAnimationFrame(() => {
    const tipClasses = /\b(top|bottom|start|end)+/;
    const { element, tooltip, container, offsetParent, options, arrow } = self;

    // istanbul ignore if @preserve
    if (!tooltip) return;
    const RTL = isRTL(element);
    const { x: scrollLeft, y: scrollTop } = getNodeScroll(offsetParent);

    // reset tooltip style (top: 0, left: 0 works best)
    setElementStyle(tooltip, {
      top: "",
      left: "",
      right: "",
      bottom: "",
    });
    const { offsetWidth: tipWidth, offsetHeight: tipHeight } = tooltip;
    const { clientWidth: htmlcw, clientHeight: htmlch, offsetWidth: htmlow } =
      getDocumentElement(element);
    let { placement } = options;
    const { clientWidth: parentCWidth, offsetWidth: parentOWidth } = container;
    const parentPosition = getElementStyle(
      container,
      "position",
    );
    const fixedParent = parentPosition === "fixed";
    const scrollbarWidth = fixedParent
      ? Math.abs(parentCWidth - parentOWidth)
      : Math.abs(htmlcw - htmlow);
    const leftBoundry = RTL && fixedParent
      ? /* istanbul ignore next @preserve */ scrollbarWidth
      : 0;
    const rightBoundry = htmlcw - (!RTL ? scrollbarWidth : 0) - 1;

    // reuse observer entry bounding box
    const observerEntry = self._observer.getEntry(element);
    const {
      width: elemWidth,
      height: elemHeight,
      left: elemRectLeft,
      right: elemRectRight,
      top: elemRectTop,
    } = observerEntry?.boundingClientRect ||
      getBoundingClientRect(element, true);

    const {
      x: elemOffsetLeft,
      y: elemOffsetTop,
    } = getRectRelativeToOffsetParent(
      element,
      offsetParent,
      { x: scrollLeft, y: scrollTop },
    );

    // reset arrow style
    setElementStyle(arrow as HTMLElement, {
      top: "",
      left: "",
      right: "",
      bottom: "",
    });
    let topPosition: number | string = 0;
    let bottomPosition: number | string = "";
    let leftPosition: number | string = 0;
    let rightPosition: number | string = "";
    let arrowTop: number | string = "";
    let arrowLeft: number | string = "";
    let arrowRight: number | string = "";

    const arrowWidth = arrow.offsetWidth || 0;
    const arrowHeight = arrow.offsetHeight || 0;
    const arrowAdjust = arrowWidth / 2;

    // check placement
    let topExceed = elemRectTop - tipHeight - arrowHeight < 0;
    let bottomExceed =
      elemRectTop + tipHeight + elemHeight + arrowHeight >= htmlch;
    let leftExceed = elemRectLeft - tipWidth - arrowWidth < leftBoundry;
    let rightExceed =
      elemRectLeft + tipWidth + elemWidth + arrowWidth >= rightBoundry;

    const horizontals = ["left", "right"];
    const verticals = ["top", "bottom"];

    topExceed = horizontals.includes(placement)
      ? elemRectTop + elemHeight / 2 - tipHeight / 2 - arrowHeight < 0
      : topExceed;
    bottomExceed = horizontals.includes(placement)
      ? elemRectTop + tipHeight / 2 + elemHeight / 2 + arrowHeight >= htmlch
      : bottomExceed;
    leftExceed = verticals.includes(placement)
      ? elemRectLeft + elemWidth / 2 - tipWidth / 2 < leftBoundry
      : leftExceed;
    rightExceed = verticals.includes(placement)
      ? elemRectLeft + tipWidth / 2 + elemWidth / 2 >= rightBoundry
      : rightExceed;

    // first remove side positions if both left and right limits are exceeded
    // we usually fall back to top|bottom
    placement = horizontals.includes(placement) && leftExceed && rightExceed
      ? "top"
      : placement;
    // recompute placement
    placement = placement === "top" && topExceed ? "bottom" : placement;
    placement = placement === "bottom" && bottomExceed ? "top" : placement;
    placement = placement === "left" && leftExceed ? "right" : placement;
    placement = placement === "right" && rightExceed
      ? "left"
      // istanbul ignore next @preserve
      : placement;

    // update tooltip/popover class
    // istanbul ignore else @preserve
    if (!tooltip.className.includes(placement)) {
      tooltip.className = tooltip.className.replace(
        tipClasses,
        tipClassPositions[placement],
      );
    }

    // compute tooltip / popover coordinates
    // istanbul ignore else @preserve
    if (horizontals.includes(placement)) {
      // secondary|side positions
      if (placement === "left") {
        // LEFT
        leftPosition = elemOffsetLeft - tipWidth - arrowWidth;
      } else {
        // RIGHT
        leftPosition = elemOffsetLeft + elemWidth + arrowWidth;
      }

      // adjust top and arrow
      if (topExceed && bottomExceed) {
        topPosition = 0;
        bottomPosition = 0;
        arrowTop = elemOffsetTop + elemHeight / 2 - arrowHeight / 2;
      } else if (topExceed) {
        topPosition = elemOffsetTop;
        bottomPosition = "";
        arrowTop = elemHeight / 2 - arrowWidth;
      } else if (bottomExceed) {
        topPosition = elemOffsetTop - tipHeight + elemHeight;
        bottomPosition = "";
        arrowTop = tipHeight - elemHeight / 2 - arrowWidth;
      } else {
        topPosition = elemOffsetTop - tipHeight / 2 + elemHeight / 2;
        arrowTop = tipHeight / 2 - arrowHeight / 2;
      }
    } else if (verticals.includes(placement)) {
      if (placement === "top") {
        topPosition = elemOffsetTop - tipHeight - arrowHeight;
      } else {
        // BOTTOM
        topPosition = elemOffsetTop + elemHeight + arrowHeight;
      }

      // adjust left | right and also the arrow
      if (leftExceed) {
        leftPosition = 0;
        arrowLeft = elemOffsetLeft + elemWidth / 2 - arrowAdjust;
      } else if (rightExceed) {
        leftPosition = "auto";
        rightPosition = 0;
        arrowRight = elemWidth / 2 + rightBoundry - elemRectRight - arrowAdjust;
      } else {
        leftPosition = elemOffsetLeft - tipWidth / 2 + elemWidth / 2;
        arrowLeft = tipWidth / 2 - arrowAdjust;
      }
    }

    // apply style to tooltip/popover
    setElementStyle(tooltip, {
      top: `${topPosition}px`,
      bottom: bottomPosition === "" ? "" : `${bottomPosition}px`,
      left: leftPosition === "auto" ? leftPosition : `${leftPosition}px`,
      right: rightPosition !== "" ? `${rightPosition}px` : "",
    });

    // update arrow placement
    // istanbul ignore else @preserve
    if (isHTMLElement(arrow)) {
      if (arrowTop !== "") {
        arrow.style.top = `${arrowTop}px`;
      }
      if (arrowLeft !== "") {
        arrow.style.left = `${arrowLeft}px`;
      } else if (arrowRight !== "") {
        arrow.style.right = `${arrowRight}px`;
      }
    }
    const updatedTooltipEvent = createCustomEvent<
      Record<string, unknown>,
      TooltipEvent | PopoverEvent
    >(
      `updated.bs.${toLowerCase(self.name)}`,
    );
    dispatchEvent(element, updatedTooltipEvent);
  });
};

export default styleTip;
