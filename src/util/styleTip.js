import isMedia from 'shorter-js/src/is/isMedia';
import isRTL from 'shorter-js/src/is/isRTL';
import getElementStyle from 'shorter-js/src/get/getElementStyle';
import getBoundingClientRect from 'shorter-js/src/get/getBoundingClientRect';
import getNodeScroll from 'shorter-js/src/get/getNodeScroll';
import getRectRelativeToOffsetParent from 'shorter-js/src/get/getRectRelativeToOffsetParent';
import getDocumentElement from 'shorter-js/src/get/getDocumentElement';
import setElementStyle from 'shorter-js/src/misc/setElementStyle';

import popoverComponent from '../strings/popoverComponent';
import tipClassPositions from './tipClassPositions';

/**
 * Style popovers and tooltips.
 * @param {BSN.Tooltip | BSN.Popover} self the `Popover` / `Tooltip` instance
 * @param {PointerEvent=} e event object
 */
export default function styleTip(self, e) {
  const tipClasses = /\b(top|bottom|start|end)+/;
  const {
    element, tooltip, options, arrow, offsetParent,
  } = self;
  const tipPositions = { ...tipClassPositions };

  // reset tooltip style (top: 0, left: 0 works best)
  setElementStyle(tooltip, { top: '0px', left: '0px', right: '' });
  // @ts-ignore
  const isPopover = self.name === popoverComponent;
  const tipWidth = tooltip.offsetWidth;
  const tipHeight = tooltip.offsetHeight;
  const RTL = isRTL(element);
  if (RTL) {
    tipPositions.left = 'end';
    tipPositions.right = 'start';
  }
  const documentElement = getDocumentElement(element);
  const windowWidth = documentElement.clientWidth;
  const windowHeight = documentElement.clientHeight;
  const { container } = options;
  let { placement } = options;
  const {
    left: parentLeft, right: parentRight, top: parentTop,
  } = getBoundingClientRect(container, true);
  const parentWidth = container.clientWidth;
  const scrollbarWidth = Math.abs(parentWidth - container.offsetWidth);
  const parentPosition = getElementStyle(container, 'position');
  // const absoluteParent = parentPosition === 'absolute';
  const fixedParent = parentPosition === 'fixed';
  const staticParent = parentPosition === 'static';
  const stickyParent = parentPosition === 'sticky';
  const isSticky = stickyParent && parentTop === parseFloat(getElementStyle(container, 'top'));
  // const absoluteTarget = getElementStyle(element, 'position') === 'absolute';
  // const stickyFixedParent = ['sticky', 'fixed'].includes(parentPosition);
  const leftBoundry = RTL && fixedParent ? scrollbarWidth : 0;
  const rightBoundry = fixedParent ? parentWidth + parentLeft + (RTL ? scrollbarWidth : 0)
    : parentWidth + parentLeft + (windowWidth - parentRight) - 1;
  const {
    width: elemWidth,
    height: elemHeight,
    left: elemRectLeft,
    right: elemRectRight,
    top: elemRectTop,
  } = getBoundingClientRect(element, true);

  const scroll = getNodeScroll(offsetParent);
  const { x, y } = getRectRelativeToOffsetParent(element, offsetParent, scroll);
  // reset arrow style
  setElementStyle(arrow, { top: '', left: '', right: '' });
  let topPosition;
  let leftPosition;
  let rightPosition;
  let arrowTop;
  let arrowLeft;
  let arrowRight;

  const arrowWidth = arrow.offsetWidth || 0;
  const arrowHeight = arrow.offsetHeight || 0;
  const arrowAdjust = arrowWidth / 2;

  // check placement
  let topExceed = elemRectTop - tipHeight - arrowHeight < 0;
  let bottomExceed = elemRectTop + tipHeight + elemHeight
    + arrowHeight >= windowHeight;
  let leftExceed = elemRectLeft - tipWidth - arrowWidth < leftBoundry;
  let rightExceed = elemRectLeft + tipWidth + elemWidth
    + arrowWidth >= rightBoundry;

  const horizontal = ['left', 'right'];
  const vertical = ['top', 'bottom'];
  topExceed = horizontal.includes(placement)
    ? elemRectTop + elemHeight / 2 - tipHeight / 2 - arrowHeight < 0
    : topExceed;
  bottomExceed = horizontal.includes(placement)
    ? elemRectTop + tipHeight / 2 + elemHeight / 2 + arrowHeight >= windowHeight
    : bottomExceed;
  leftExceed = vertical.includes(placement)
    ? elemRectLeft + elemWidth / 2 - tipWidth / 2 < leftBoundry
    : leftExceed;
  rightExceed = vertical.includes(placement)
    ? elemRectLeft + tipWidth / 2 + elemWidth / 2 >= rightBoundry
    : rightExceed;

  // recompute placement
  // first, when both left and right limits are exceeded, we fall back to top|bottom
  placement = (horizontal.includes(placement)) && leftExceed && rightExceed ? 'top' : placement;
  placement = placement === 'top' && topExceed ? 'bottom' : placement;
  placement = placement === 'bottom' && bottomExceed ? 'top' : placement;
  placement = placement === 'left' && leftExceed ? 'right' : placement;
  placement = placement === 'right' && rightExceed ? 'left' : placement;

  // update tooltip/popover class
  if (!tooltip.className.includes(placement)) {
    tooltip.className = tooltip.className.replace(tipClasses, tipPositions[placement]);
  }

  // compute tooltip / popover coordinates
  if (horizontal.includes(placement)) { // secondary|side positions
    if (placement === 'left') { // LEFT
      leftPosition = x - tipWidth - (isPopover ? arrowWidth : 0);
    } else { // RIGHT
      leftPosition = x + elemWidth + (isPopover ? arrowWidth : 0);
    }

    // adjust top and arrow
    if (topExceed) {
      topPosition = y;
      topPosition += (isSticky ? -parentTop - scroll.y : 0);

      arrowTop = elemHeight / 2 - arrowWidth;
    } else if (bottomExceed) {
      topPosition = y - tipHeight + elemHeight;
      topPosition += (isSticky ? -parentTop - scroll.y : 0);

      arrowTop = tipHeight - elemHeight / 2 - arrowWidth;
    } else {
      topPosition = y - tipHeight / 2 + elemHeight / 2;
      topPosition += (isSticky ? -parentTop - scroll.y : 0);

      arrowTop = tipHeight / 2 - arrowHeight / 2;
    }
  } else if (vertical.includes(placement)) {
    if (e && isMedia(element)) {
      let eX = 0;
      let eY = 0;
      if (staticParent) {
        eX = e.pageX;
        eY = e.pageY;
      } else { // fixedParent | stickyParent
        eX = e.clientX - parentLeft + (fixedParent ? scroll.x : 0);
        eY = e.clientY - parentTop + (fixedParent ? scroll.y : 0);
      }

      // some weird RTL bug
      eX -= RTL && fixedParent && scrollbarWidth ? scrollbarWidth : 0;

      if (placement === 'top') {
        topPosition = eY - tipHeight - arrowWidth;
      } else {
        topPosition = eY + arrowWidth;
      }

      // adjust (left | right) and also the arrow
      if (e.clientX - tipWidth / 2 < leftBoundry) {
        leftPosition = 0;
        arrowLeft = eX - arrowAdjust;
      } else if (e.clientX + tipWidth / 2 > rightBoundry) {
        leftPosition = 'auto';
        rightPosition = 0;
        arrowRight = rightBoundry - eX - arrowAdjust;
        arrowRight -= fixedParent ? parentLeft + (RTL ? scrollbarWidth : 0) : 0;

      // normal top/bottom
      } else {
        leftPosition = eX - tipWidth / 2;
        arrowLeft = tipWidth / 2 - arrowAdjust;
      }
    } else {
      if (placement === 'top') {
        topPosition = y - tipHeight - (isPopover ? arrowHeight : 0);
      } else { // BOTTOM
        topPosition = y + elemHeight + (isPopover ? arrowHeight : 0);
      }

      // adjust left | right and also the arrow
      if (leftExceed) {
        leftPosition = 0;
        arrowLeft = x + elemWidth / 2 - arrowAdjust;
      } else if (rightExceed) {
        leftPosition = 'auto';
        rightPosition = 0;
        arrowRight = elemWidth / 2 + rightBoundry - elemRectRight - arrowAdjust;
      } else {
        leftPosition = x - tipWidth / 2 + elemWidth / 2;
        arrowLeft = tipWidth / 2 - arrowAdjust;
      }
    }
  }

  // apply style to tooltip/popover
  setElementStyle(tooltip, {
    top: `${topPosition}px`,
    left: leftPosition === 'auto' ? leftPosition : `${leftPosition}px`,
    right: rightPosition !== undefined ? `${rightPosition}px` : '',
  });

  // update arrow placement
  if (arrow instanceof HTMLElement) {
    if (arrowTop !== undefined) {
      arrow.style.top = `${arrowTop}px`;
    }
    if (arrowLeft !== undefined) {
      arrow.style.left = `${arrowLeft}px`;
    } else if (arrowRight !== undefined) {
      arrow.style.right = `${arrowRight}px`;
    }
  }
}
