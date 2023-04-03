import {
  isHTMLElement,
  setElementStyle,
  getDocumentElement,
  getBoundingClientRect,
  getElementStyle,
  isRTL,
  toLowerCase,
  createCustomEvent,
  dispatchEvent,
} from '@thednp/shorty';

import popoverComponent from '../strings/popoverComponent';
import tipClassPositions from './tipClassPositions';
import Tooltip from '../components/tooltip';
import type { TooltipEvent } from '../interface/tooltip';
import type { PopoverEvent } from '../interface/popover';

/**
 * Style popovers and tooltips.
 *
 * @param self the `Popover` / `Tooltip` instance
 */
const styleTip = <T extends Tooltip>(self: T) => {
  const tipClasses = /\b(top|bottom|start|end)+/;
  const { element, tooltip, container, options, arrow } = self;

  /* istanbul ignore else */
  if (tooltip) {
    const tipPositions = { ...tipClassPositions };
    const RTL = isRTL(element);

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
    const { clientWidth: htmlcw, clientHeight: htmlch, offsetWidth: htmlow } = getDocumentElement(element);
    let { placement } = options;
    const { clientWidth: parentCWidth, offsetWidth: parentOWidth } = container as HTMLElement;
    const parentPosition = getElementStyle(container as HTMLElement, 'position');
    const fixedParent = parentPosition === 'fixed';
    const scrollbarWidth = fixedParent ? Math.abs(parentCWidth - parentOWidth) : Math.abs(htmlcw - htmlow);
    const leftBoundry = RTL && fixedParent ? /* istanbul ignore next */ scrollbarWidth : 0;
    const rightBoundry = htmlcw - (!RTL ? scrollbarWidth : 0) - 1;
    const {
      width: elemWidth,
      height: elemHeight,
      left: elemRectLeft,
      right: elemRectRight,
      top: elemRectTop,
    } = getBoundingClientRect(element, true);
    const { x, y } = {
      x: elemRectLeft,
      y: elemRectTop,
    };
    // reset arrow style
    setElementStyle(arrow as HTMLElement, {
      top: '',
      left: '',
      right: '',
      bottom: '',
    });
    let topPosition: number | string = 0;
    let bottomPosition: number | string = '';
    let leftPosition: number | string = 0;
    let rightPosition: number | string = '';
    let arrowTop: number | string = '';
    let arrowLeft: number | string = '';
    let arrowRight: number | string = '';

    const arrowWidth = (arrow as HTMLElement).offsetWidth || 0;
    const arrowHeight = (arrow as HTMLElement).offsetHeight || 0;
    const arrowAdjust = arrowWidth / 2;

    // check placement
    let topExceed = elemRectTop - tipHeight - arrowHeight < 0;
    let bottomExceed = elemRectTop + tipHeight + elemHeight + arrowHeight >= htmlch;
    let leftExceed = elemRectLeft - tipWidth - arrowWidth < leftBoundry;
    let rightExceed = elemRectLeft + tipWidth + elemWidth + arrowWidth >= rightBoundry;

    const horizontals = ['left', 'right'];
    const verticals = ['top', 'bottom'];

    topExceed = horizontals.includes(placement)
      ? elemRectTop + elemHeight / 2 - tipHeight / 2 - arrowHeight < 0
      : topExceed;
    bottomExceed = horizontals.includes(placement)
      ? elemRectTop + tipHeight / 2 + elemHeight / 2 + arrowHeight >= htmlch
      : bottomExceed;
    leftExceed = verticals.includes(placement) ? elemRectLeft + elemWidth / 2 - tipWidth / 2 < leftBoundry : leftExceed;
    rightExceed = verticals.includes(placement)
      ? elemRectLeft + tipWidth / 2 + elemWidth / 2 >= rightBoundry
      : rightExceed;

    // first remove side positions if both left and right limits are exceeded
    // we usually fall back to top|bottom
    placement = horizontals.includes(placement) && leftExceed && rightExceed ? 'top' : placement;
    // recompute placement
    placement = placement === 'top' && topExceed ? 'bottom' : placement;
    placement = placement === 'bottom' && bottomExceed ? 'top' : placement;
    placement = placement === 'left' && leftExceed ? 'right' : placement;
    placement = placement === 'right' && rightExceed ? /* istanbul ignore next */ 'left' : placement;

    // update tooltip/popover class
    if (!tooltip.className.includes(placement)) {
      tooltip.className = tooltip.className.replace(tipClasses, tipPositions[placement]);
    }

    // compute tooltip / popover coordinates
    /* istanbul ignore else */
    if (horizontals.includes(placement)) {
      // secondary|side positions
      if (placement === 'left') {
        // LEFT
        leftPosition = x - tipWidth - (isPopover ? arrowWidth : 0);
      } else {
        // RIGHT
        leftPosition = x + elemWidth + (isPopover ? arrowWidth : 0);
      }

      // adjust top and arrow
      if (topExceed && bottomExceed) {
        topPosition = 0;
        bottomPosition = 0;
        arrowTop = elemRectTop + elemHeight / 2 - arrowHeight / 2;
      } else if (topExceed) {
        topPosition = y;
        bottomPosition = '';
        arrowTop = elemHeight / 2 - arrowWidth;
      } else if (bottomExceed) {
        topPosition = y - tipHeight + elemHeight;
        bottomPosition = '';
        arrowTop = tipHeight - elemHeight / 2 - arrowWidth;
      } else {
        topPosition = y - tipHeight / 2 + elemHeight / 2;
        arrowTop = tipHeight / 2 - arrowHeight / 2;
      }
    } else if (verticals.includes(placement)) {
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

    // apply style to tooltip/popover
    setElementStyle(tooltip, {
      top: `${topPosition}px`,
      bottom: bottomPosition === '' ? '' : `${bottomPosition}px`,
      left: leftPosition === 'auto' ? leftPosition : `${leftPosition}px`,
      right: rightPosition !== '' ? `${rightPosition}px` : '',
    });

    // update arrow placement
    /* istanbul ignore else */
    if (isHTMLElement(arrow)) {
      if (arrowTop !== '') {
        arrow.style.top = `${arrowTop}px`;
      }
      if (arrowLeft !== '') {
        arrow.style.left = `${arrowLeft}px`;
      } else if (arrowRight !== '') {
        arrow.style.right = `${arrowRight}px`;
      }
    }
    const updatedTooltipEvent = createCustomEvent<TooltipEvent | PopoverEvent>(`updated.bs.${toLowerCase(self.name)}`);
    dispatchEvent(element, updatedTooltipEvent);
  }
};

export default styleTip;
