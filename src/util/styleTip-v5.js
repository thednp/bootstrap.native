import tipClassPositions from './tipClassPositions.js'
import isMedia from './isMedia.js'

export default function( target, tip, position, parent, e ) { // both popovers and tooltips (target,tooltip,placement,elementToAppendTo)
  let tipClasses = /\b(top|bottom|start|end)+/,
      elementDimensions = { w : tip.offsetWidth, h: tip.offsetHeight },
      windowWidth = ( document.documentElement.clientWidth || document.body.clientWidth ),
      windowHeight = ( document.documentElement.clientHeight || document.body.clientHeight ),
      parentIsBody = parent === document.body,
      targetPosition = getComputedStyle(target).position,
      parentPosition = getComputedStyle(parent).position,
      staticParent = !parentIsBody && parentPosition === 'static',
      relativeParent = !parentIsBody && parentPosition === 'relative',
      // absoluteParent = !parentIsBody && parentPosition === 'absolute', // this case should not be possible
      absoluteTarget = targetPosition === 'absolute', // this case requires a container with position: relative
      targetRect = target.getBoundingClientRect(),
      scroll = parentIsBody 
              ? { x: window.pageXOffset, y: window.pageYOffset } 
              : { x: parent.scrollLeft, y: parent.scrollTop },
      linkDimensions = { w: targetRect.right - targetRect.left, h: targetRect.bottom - targetRect.top },
      top = relativeParent || staticParent ? target.offsetTop : targetRect.top,
      left = relativeParent || staticParent ? target.offsetLeft : targetRect.left,
      isPopover = tip.classList.contains( 'popover' ),
      arrow = tip.getElementsByClassName( `${isPopover?'popover':'tooltip'}-arrow` )[0],
      topPosition, leftPosition,
      arrowTop, arrowLeft, arrowWidth, arrowHeight,
      // check position
      halfTopExceed = targetRect.top + linkDimensions.h/2 - elementDimensions.h/2 < 0,
      halfLeftExceed = targetRect.left + linkDimensions.w/2 - elementDimensions.w/2 < 0,
      halfRightExceed = targetRect.left + elementDimensions.w/2 + linkDimensions.w/2 >= windowWidth,
      halfBottomExceed = targetRect.top + elementDimensions.h/2 + linkDimensions.h/2 >= windowHeight,
      topExceed = targetRect.top - elementDimensions.h < 0,
      leftExceed = targetRect.left - elementDimensions.w < 0,
      bottomExceed = targetRect.top + elementDimensions.h + linkDimensions.h >= windowHeight,
      rightExceed = targetRect.left + elementDimensions.w + linkDimensions.w >= windowWidth,
      arrowAdjust = 0

  // recompute position
  // first, when both left and right limits are exceeded, we fall back to top|bottom
  position = ( position === 'left' || position === 'right' ) && leftExceed && rightExceed ? 'top' : position 
  position = position === 'top' && topExceed ? 'bottom' : position
  position = position === 'bottom' && bottomExceed ? 'top' : position
  position = position === 'left' && leftExceed ? 'right' : position
  position = position === 'right' && rightExceed ? 'left' : position

  // update tooltip/popover class
  tip.className.indexOf(position) === -1 
    && ( tip.className = tip.className.replace( tipClasses, tipClassPositions[position] ) )

  // we check the computed width & height and update here
  arrowWidth = arrow ? arrow.offsetWidth : 0
  arrowHeight = arrow ? arrow.offsetHeight : 0
  arrowAdjust = ( isPopover ? arrowWidth*0.8 : arrowWidth/2 )

  // apply styling to tooltip / popover
  if ( position === 'left' || position === 'right' ) { // secondary|side positions
    if ( position === 'left' ) { // LEFT
      leftPosition = left + scroll.x - elementDimensions.w - ( isPopover ? arrowWidth : 0 )
    } else { // RIGHT
      leftPosition = left + scroll.x + linkDimensions.w
    }

    // adjust top and arrow
    if ( halfTopExceed ) {
      topPosition = top + scroll.y
      arrowTop = linkDimensions.h/2 - arrowWidth
    } else if ( halfBottomExceed ) {
      topPosition = top + scroll.y - elementDimensions.h + linkDimensions.h
      arrowTop = elementDimensions.h - linkDimensions.h/2 - arrowWidth
    } else {
      topPosition = top + scroll.y - elementDimensions.h/2 + linkDimensions.h/2
      arrowTop = elementDimensions.h/2 - ( isPopover ? arrowHeight*0.9 : arrowHeight/2 )
    }
    arrowLeft = null

  } else if ( position === 'top' || position === 'bottom' ) {

    if ( e && isMedia(target) ) {
      const eX = !relativeParent ? e.pageX : e.layerX + ( absoluteTarget ? target.offsetLeft : 0 ),
          eY = !relativeParent ? e.pageY : e.layerY + ( absoluteTarget ? target.offsetTop : 0 )

      if ( position === 'top' ) {
        topPosition = eY - elementDimensions.h - ( isPopover ? arrowWidth : arrowHeight )
      } else {
        topPosition = eY + arrowHeight
      }

      // adjust left | right and also the arrow
      if (e.clientX - elementDimensions.w/2 < 0) { // when exceeds left
        leftPosition = 0
        arrowLeft = eX - ( isPopover ? arrowWidth * 0.8 : arrowWidth/2 )
      } else if (e.clientX + elementDimensions.w * 0.51 > windowWidth) {  // when exceeds right
        leftPosition = windowWidth - elementDimensions.w * 1.009
        arrowLeft = elementDimensions.w - (windowWidth - eX) - arrowAdjust
      } else { // normal top/bottom
        leftPosition = eX - elementDimensions.w/2
        arrowLeft = elementDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 )
      }

    } else {

      if ( position === 'top' ) {
        topPosition =  top + scroll.y - elementDimensions.h - ( isPopover ? arrowHeight : 0 )
      } else { // BOTTOM
        topPosition = top + scroll.y + linkDimensions.h
      }

      // adjust left | right and also the arrow
      if ( halfLeftExceed ) {
        leftPosition = 0
        arrowLeft = left + linkDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 )
      } else if ( halfRightExceed ) {
        leftPosition = windowWidth - elementDimensions.w
        arrowLeft = elementDimensions.w - ( windowWidth - left ) + linkDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 )
      } else {
        leftPosition = left + scroll.x - elementDimensions.w/2 + linkDimensions.w/2
        arrowLeft = elementDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 )
      }
    }
    arrowTop = null

  }

  // apply style to tooltip/popover and its arrow
  tip.style.top = topPosition + 'px';
  tip.style.left = leftPosition + 'px';

  // update arrow position or clear side
  arrowTop !== null ? (arrow.style.top = arrowTop + 'px') : (arrow.style.top = '')
  arrowLeft !== null ? (arrow.style.left = arrowLeft + 'px') : (arrow.style.left = '')
}