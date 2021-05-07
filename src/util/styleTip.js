import tipClassPositions from './tipClassPositions.js';
import isMedia from './isMedia.js';
import closestRelative from './closestRelative';

// both popovers and tooltips (this, event)
export default function styleTip(self, e) {
  const tipClasses = /\b(top|bottom|start|end)+/;
  const tip = self.tooltip || self.popover;
  // reset tip style
  tip.style.top = '';
  tip.style.left = '';
  tip.style.right = '';
  // continue with metrics
  const isPopover = !!self.popover;
  let tipDimensions = { w: tip.offsetWidth, h: tip.offsetHeight };
  const windowWidth = (document.documentElement.clientWidth || document.body.clientWidth);
  const windowHeight = (document.documentElement.clientHeight || document.body.clientHeight);
  const { element, options, arrow } = self;
  let { container, placement } = options;
  let parentIsBody = container === document.body;
  const targetPosition = getComputedStyle(element).position;
  const parentPosition = getComputedStyle(container).position;
  const staticParent = !parentIsBody && parentPosition === 'static';
  let relativeParent = !parentIsBody && parentPosition === 'relative';
  const relContainer = staticParent && closestRelative(container);
  // static containers should refer to another relative container or the body
  container = relContainer || container;
  relativeParent = staticParent && relContainer ? 1 : relativeParent;
  parentIsBody = container === document.body;
  const parentRect = container.getBoundingClientRect();
  const leftBoundry = relativeParent ? parentRect.left : 0;
  const rightBoundry = relativeParent ? parentRect.right : windowWidth;
  // this case should not be possible
  // absoluteParent = !parentIsBody && parentPosition === 'absolute',
  // this case requires a container with placement: relative
  const absoluteTarget = targetPosition === 'absolute';
  const targetRect = element.getBoundingClientRect();
  const scroll = parentIsBody
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: container.scrollLeft, y: container.scrollTop };
  const elemDimensions = { w: element.offsetWidth, h: element.offsetHeight };
  const top = relativeParent ? element.offsetTop : targetRect.top;
  const left = relativeParent ? element.offsetLeft : targetRect.left;
  // reset arrow style
  arrow.style.top = '';
  arrow.style.left = '';
  arrow.style.right = '';
  let topPosition;
  let leftPosition;
  let rightPosition;
  let arrowTop;
  let arrowLeft;
  let arrowRight;

  // check placement
  let topExceed = targetRect.top - tipDimensions.h < 0;
  let bottomExceed = targetRect.top + tipDimensions.h + elemDimensions.h >= windowHeight;
  let leftExceed = targetRect.left - tipDimensions.w < leftBoundry;
  let rightExceed = targetRect.left + tipDimensions.w + elemDimensions.w >= rightBoundry;

  topExceed = ['left', 'right'].includes(placement)
    ? targetRect.top + elemDimensions.h / 2 - tipDimensions.h / 2 < 0
    : topExceed;
  bottomExceed = ['left', 'right'].includes(placement)
    ? targetRect.top + tipDimensions.h / 2 + elemDimensions.h / 2 >= windowHeight
    : bottomExceed;
  leftExceed = ['top', 'bottom'].includes(placement)
    ? targetRect.left + elemDimensions.w / 2 - tipDimensions.w / 2 < leftBoundry
    : leftExceed;
  rightExceed = ['top', 'bottom'].includes(placement)
    ? targetRect.left + tipDimensions.w / 2 + elemDimensions.w / 2 >= rightBoundry
    : rightExceed;

  // recompute placement
  // first, when both left and right limits are exceeded, we fall back to top|bottom
  placement = (['left', 'right'].includes(placement)) && leftExceed && rightExceed ? 'top' : placement;
  placement = placement === 'top' && topExceed ? 'bottom' : placement;
  placement = placement === 'bottom' && bottomExceed ? 'top' : placement;
  placement = placement === 'left' && leftExceed ? 'right' : placement;
  placement = placement === 'right' && rightExceed ? 'left' : placement;

  // update tooltip/popover class
  if (!tip.className.includes(placement)) {
    tip.className = tip.className.replace(tipClasses, tipClassPositions[placement]);
  }
  // if position has changed, update tip dimensions
  tipDimensions = { w: tip.offsetWidth, h: tip.offsetHeight };

  // we check the computed width & height and update here
  const arrowWidth = arrow.offsetWidth || 0;
  const arrowHeight = arrow.offsetHeight || 0;
  const arrowAdjust = arrowWidth / 2;

  // compute tooltip / popover coordinates
  if (['left', 'right'].includes(placement)) { // secondary|side positions
    if (placement === 'left') { // LEFT
      leftPosition = left + scroll.x - tipDimensions.w - (isPopover ? arrowWidth : 0);
    } else { // RIGHT
      leftPosition = left + scroll.x + elemDimensions.w + (isPopover ? arrowWidth : 0);
    }

    // adjust top and arrow
    if (topExceed) {
      topPosition = top + scroll.y;
      arrowTop = elemDimensions.h / 2 - arrowWidth;
    } else if (bottomExceed) {
      topPosition = top + scroll.y - tipDimensions.h + elemDimensions.h;
      arrowTop = tipDimensions.h - elemDimensions.h / 2 - arrowWidth;
    } else {
      topPosition = top + scroll.y - tipDimensions.h / 2 + elemDimensions.h / 2;
      arrowTop = tipDimensions.h / 2 - arrowHeight / 2;
    }
  } else if (['top', 'bottom'].includes(placement)) {
    if (e && isMedia(element)) {
      const eX = !relativeParent ? e.pageX : e.layerX + (absoluteTarget ? element.offsetLeft : 0);
      const eY = !relativeParent ? e.pageY : e.layerY + (absoluteTarget ? element.offsetTop : 0);

      if (placement === 'top') {
        topPosition = eY - tipDimensions.h - (isPopover ? arrowWidth : arrowHeight);
      } else {
        topPosition = eY + arrowHeight;
      }

      // adjust left | right and also the arrow
      if (e.clientX - tipDimensions.w / 2 < leftBoundry) { // when exceeds left
        leftPosition = 0;
        arrowLeft = eX - arrowAdjust;
      } else if (e.clientX + tipDimensions.w * 0.51 >= rightBoundry) { // when exceeds right
        leftPosition = 'auto';
        rightPosition = 0;
        arrowLeft = tipDimensions.w - (rightBoundry - eX) - arrowAdjust;
      } else { // normal top/bottom
        leftPosition = eX - tipDimensions.w / 2;
        arrowLeft = tipDimensions.w / 2 - arrowAdjust;
      }
    } else {
      if (placement === 'top') {
        topPosition = top + scroll.y - tipDimensions.h - (isPopover ? arrowHeight : 0);
      } else { // BOTTOM
        topPosition = top + scroll.y + elemDimensions.h + (isPopover ? arrowHeight : 0);
      }

      // adjust left | right and also the arrow
      if (leftExceed) {
        leftPosition = 0;
        arrowLeft = left + elemDimensions.w / 2 - arrowAdjust;
      } else if (rightExceed) {
        leftPosition = 'auto';
        rightPosition = 0;
        arrowRight = elemDimensions.w / 2 + (parentRect.right - targetRect.right) - arrowAdjust;
      } else {
        leftPosition = left + scroll.x - tipDimensions.w / 2 + elemDimensions.w / 2;
        arrowLeft = tipDimensions.w / 2 - arrowAdjust;
      }
    }
  }

  // apply style to tooltip/popover and its arrow
  tip.style.top = `${topPosition}px`;
  tip.style.left = leftPosition === 'auto' ? leftPosition : `${leftPosition}px`;
  tip.style.right = rightPosition !== undefined ? `${rightPosition}px` : '';
  // update arrow placement or clear side
  if (arrowTop !== undefined) {
    arrow.style.top = `${arrowTop}px`;
  }

  if (arrowLeft !== undefined) {
    arrow.style.left = `${arrowLeft}px`;
  } else if (arrowRight !== undefined) {
    arrow.style.right = `${arrowRight}px`;
  }
}
