import {
  isHTMLElement,
  setElementStyle,
  getDocumentElement,
  getWindow,
  getBoundingClientRect,
  getElementStyle,
  isRTL,
  isMedia,
} from '@thednp/shorty';

import popoverComponent from '../strings/popoverComponent';
import tipClassPositions from './tipClassPositions';
// import TooltipInterface from '../interface/tooltip';
// import PopoverInterface from '../interface/popover';
import Tooltip from '../components/tooltip';
import { popupContainer } from './popupContainer';

// type FakeTip = {
//   name: string,
//   element: HTMLElement,
//   tooltip: HTMLElement,
//   options: TooltipInterface.Options | PopoverInterface.Options,
//   arrow: HTMLElement,
//   offsetParent: ParentNode
// }

/**
 * Style popovers and tooltips.
 *
 * @param self the `Popover` / `Tooltip` instance
 * @param e event object
 */
const styleTip = <T extends Tooltip>(self: T, e?: Event & PointerEvent) => {
  const tipClasses = /\b(top|bottom|start|end)+/;
  const { element, tooltip, options, arrow } = self;
  if (!tooltip) return;
  const tipPositions = { ...tipClassPositions };

  const RTL = isRTL(element);
  if (RTL) {
    tipPositions.left = 'end';
    tipPositions.right = 'start';
  }

  // reset tooltip style (top: 0, left: 0 works best)
  setElementStyle(tooltip, {
    // top: '0px', left: '0px', right: '', bottom: '',
    top: '',
    left: '',
    right: '',
    bottom: '',
  });
  const isPopover = self.name === popoverComponent;
  const { offsetWidth: tipWidth, offsetHeight: tipHeight } = tooltip;
  const { clientWidth: htmlcw, clientHeight: htmlch } = getDocumentElement(element);
  // const { container } = options;
  let { placement } = options;
  const { left: parentLeft, right: parentRight, top: parentTop } = getBoundingClientRect(popupContainer, true);
  const { clientWidth: parentCWidth, offsetWidth: parentOWidth } = popupContainer;
  const scrollbarWidth = Math.abs(parentCWidth - parentOWidth);
  // const tipAbsolute = getElementStyle(tooltip, 'position') === 'absolute';
  const parentPosition = getElementStyle(popupContainer, 'position');
  // const absoluteParent = parentPosition === 'absolute';
  const fixedParent = parentPosition === 'fixed';
  const staticParent = parentPosition === 'static';
  // const stickyParent = parentPosition === 'sticky';
  // const isSticky = stickyParent && parentTop === parseFloat(getElementStyle(popupContainer, 'top'));
  // const absoluteTarget = getElementStyle(element, 'position') === 'absolute';
  // const stickyFixedParent = ['sticky', 'fixed'].includes(parentPosition);
  const leftBoundry = RTL && fixedParent ? scrollbarWidth : 0;
  const rightBoundry = fixedParent
    ? parentCWidth + parentLeft + (RTL ? scrollbarWidth : 0)
    : parentCWidth + parentLeft + (htmlcw - parentRight) - 1;
  const {
    width: elemWidth,
    height: elemHeight,
    left: elemRectLeft,
    right: elemRectRight,
    top: elemRectTop,
  } = getBoundingClientRect(element, true);
  // console.log(getWindow(tooltip));
  const win = getWindow(tooltip);

  const scroll = { x: win.scrollX, y: win.scrollY };
  // const { x, y } = getRectRelativeToOffsetParent(element, win, scroll);
  const { x, y } = { x: elemRectLeft + scroll.x, y: elemRectTop + scroll.y };
  // reset arrow style
  setElementStyle(arrow as HTMLElement, {
    top: '',
    left: '',
    right: '',
    bottom: '',
  });
  let topPosition: number | string = 0;
  let leftPosition: number | string = 0;
  let rightPosition: number | string = 0;
  let arrowTop: number | string = 0;
  let arrowLeft: number | string = 0;
  let arrowRight: number | string = 0;

  const arrowWidth = (arrow as HTMLElement).offsetWidth || 0;
  const arrowHeight = (arrow as HTMLElement).offsetHeight || 0;
  const arrowAdjust = arrowWidth / 2;

  // check placement
  let topExceed = elemRectTop - tipHeight - arrowHeight < 0;
  let bottomExceed = elemRectTop + tipHeight + elemHeight + arrowHeight >= htmlch;
  let leftExceed = elemRectLeft - tipWidth - arrowWidth < leftBoundry;
  let rightExceed = elemRectLeft + tipWidth + elemWidth + arrowWidth >= rightBoundry;

  const horizontal = ['left', 'right'];
  const vertical = ['top', 'bottom'];

  topExceed = horizontal.includes(placement)
    ? elemRectTop + elemHeight / 2 - tipHeight / 2 - arrowHeight < 0
    : topExceed;
  bottomExceed = horizontal.includes(placement)
    ? elemRectTop + tipHeight / 2 + elemHeight / 2 + arrowHeight >= htmlch
    : bottomExceed;
  leftExceed = vertical.includes(placement) ? elemRectLeft + elemWidth / 2 - tipWidth / 2 < leftBoundry : leftExceed;
  rightExceed = vertical.includes(placement)
    ? elemRectLeft + tipWidth / 2 + elemWidth / 2 >= rightBoundry
    : rightExceed;

  // first remove side positions if both left and right limits are exceeded
  // we usually fall back to top|bottom
  placement = horizontal.includes(placement) && leftExceed && rightExceed ? 'top' : placement;
  // second, recompute placement
  placement = placement === 'top' && topExceed ? 'bottom' : placement;
  placement = placement === 'bottom' && bottomExceed ? 'top' : placement;
  placement = placement === 'left' && leftExceed ? 'right' : placement;
  placement = placement === 'right' && rightExceed ? 'left' : placement;

  // update tooltip/popover class
  if (!tooltip.className.includes(placement)) {
    tooltip.className = tooltip.className.replace(tipClasses, tipPositions[placement]);
  }

  // compute tooltip / popover coordinates
  /* istanbul ignore else */
  if (horizontal.includes(placement)) {
    // secondary|side positions
    if (placement === 'left') {
      // LEFT
      leftPosition = x - tipWidth - (isPopover ? arrowWidth : 0);
    } else {
      // RIGHT
      leftPosition = x + elemWidth + (isPopover ? arrowWidth : 0);
    }

    // adjust top and arrow
    if (topExceed) {
      topPosition = y;
      // topPosition += isSticky ? -parentTop - scroll.y : 0;

      arrowTop = elemHeight / 2 - arrowWidth;
    } else if (bottomExceed) {
      topPosition = y - tipHeight + elemHeight;
      // topPosition += isSticky ? -parentTop - scroll.y : 0;

      arrowTop = tipHeight - elemHeight / 2 - arrowWidth;
    } else {
      topPosition = y - tipHeight / 2 + elemHeight / 2;
      // topPosition += isSticky ? -parentTop - scroll.y : 0;

      arrowTop = tipHeight / 2 - arrowHeight / 2;
    }
  } else if (vertical.includes(placement)) {
    if (e && isMedia(element)) {
      let eX = 0;
      let eY = 0;
      if (staticParent) {
        eX = e.pageX;
        eY = e.pageY;
      } else {
        // fixedParent | stickyParent
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
      } else {
        // BOTTOM
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
  /* istanbul ignore else */
  if (isHTMLElement(arrow)) {
    if (arrowTop !== undefined) {
      arrow.style.top = `${arrowTop}px`;
    }
    if (arrowLeft !== undefined) {
      arrow.style.left = `${arrowLeft}px`;
    } else if (arrowRight !== undefined) {
      arrow.style.right = `${arrowRight}px`;
    }
  }
  // console.log(tooltip, leftPosition, rightPosition, arrowLeft);
};

export default styleTip;
