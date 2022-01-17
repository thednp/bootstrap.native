import isMedia from 'shorter-js/src/is/isMedia';
import isRTL from 'shorter-js/src/is/isRTL';
import isFirefox from 'shorter-js/src/boolean/isFirefox';
import isSVGElement from 'shorter-js/src/is/isSVGElement';
import getElementStyle from 'shorter-js/src/get/getElementStyle';
import getBoundingClientRect from 'shorter-js/src/get/getBoundingClientRect';
import getNodeScroll from 'shorter-js/src/get/getNodeScroll';
import getRectRelativeToOffsetParent from 'shorter-js/src/get/getRectRelativeToOffsetParent';
import getDocumentElement from 'shorter-js/src/get/getDocumentElement';
import getWindow from 'shorter-js/src/get/getWindow';
import setElementStyle from 'shorter-js/src/misc/setElementStyle';

import tipClassPositions from './tipClassPositions';

/**
 * Style popovers and tooltips.
 * @param {BSN.Tooltip | BSN.Popover} self the `Popover` / `Tooltip` instance
 * @param {PointerEvent=} e event object
 */
export default function styleTip(self, e) {
  const tipClasses = /\b(top|bottom|start|end)+/;
  // @ts-ignore
  const tip = self.tooltip || self.popover;
  const tipPositions = { ...tipClassPositions };

  // reset tip style (top: 0, left: 0 works best)
  setElementStyle(tip, { top: '0px', left: '0px', right: '' });

  // @ts-ignore
  const isPopover = !!self.popover;
  const tipWidth = tip.offsetWidth;
  const tipHeight = tip.offsetHeight;
  const {
    // @ts-ignore
    element, options, arrow, offsetParent,
  } = self;
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
  const parentIsBody = container.tagName === 'BODY';
  const { left: parentLeft, right: parentRight } = getBoundingClientRect(container, true);
  const parentPosition = getElementStyle(container, 'position');
  // const absoluteParent = parentPosition === 'absolute';
  const fixedParent = parentPosition === 'fixed';
  const staticParent = parentPosition === 'static';
  const absoluteTarget = getElementStyle(element, 'position') === 'absolute';
  const leftBoundry = 0;
  const rightBoundry = container.clientWidth + parentLeft + (windowWidth - parentRight) - 1;
  const {
    width: elemWidth,
    height: elemHeight,
    left: elemRectLeft,
    right: elemRectRight,
    top: elemRectTop,
  } = getBoundingClientRect(element, true);
  const scroll = getNodeScroll(parentIsBody || staticParent ? getWindow(element) : container);
  const isSVG = isSVGElement(element);
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
  if (!tip.className.includes(placement)) {
    tip.className = tip.className.replace(tipClasses, tipPositions[placement]);
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
      arrowTop = elemHeight / 2 - arrowWidth;
    } else if (bottomExceed) {
      topPosition = y - tipHeight + elemHeight;
      arrowTop = tipHeight - elemHeight / 2 - arrowWidth;
    } else {
      topPosition = y - tipHeight / 2 + elemHeight / 2;
      arrowTop = tipHeight / 2 - arrowHeight / 2;
    }
  } else if (vertical.includes(placement)) {
    if (e && isMedia(element)) {
      let eX = 0;
      let eY = 0;

      if (parentIsBody || staticParent) {
        eX = e.pageX;
        eY = e.pageY;
      } else if (['sticky', 'fixed'].includes(parentPosition)) {
        eX = e.clientX + scroll.x;
        eY = e.clientY + scroll.y;
      // parentPosition === 'relative | static | absolute'
      } else {
        // @ts-ignore -- Firefix breaks here
        eX = e.layerX + ((isSVG && !isFirefox) || absoluteTarget ? x : 0);
        // @ts-ignore -- Firefix breaks here
        eY = e.layerY + ((isSVG && !isFirefox) || absoluteTarget ? y : 0);
      }
      // some weird RTL bug
      const scrollbarWidth = parentRight - container.clientWidth;
      eX -= RTL && fixedParent ? scrollbarWidth : 0;

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
  setElementStyle(tip, {
    top: `${topPosition}px`,
    left: leftPosition === 'auto' ? leftPosition : `${leftPosition}px`,
    right: rightPosition !== undefined ? `${rightPosition}px` : '',
  });

  // update arrow placement
  if (arrowTop !== undefined) {
    arrow.style.top = `${arrowTop}px`;
  }
  if (arrowLeft !== undefined) {
    arrow.style.left = `${arrowLeft}px`;
  } else if (arrowRight !== undefined) {
    arrow.style.right = `${arrowRight}px`;
  }
}
