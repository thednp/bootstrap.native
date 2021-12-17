import hasClass from 'shorter-js/src/class/hasClass';
import fixedTopClass from '../strings/fixedTopClass';
import fixedBottomClass from '../strings/fixedBottomClass';
import stickyTopClass from '../strings/stickyTopClass';

const fixedItems = [
  ...document.getElementsByClassName(fixedTopClass),
  ...document.getElementsByClassName(fixedBottomClass),
  ...document.getElementsByClassName(stickyTopClass),
  ...document.getElementsByClassName('is-fixed'),
];

/**
 * Removes *padding* and *overflow* from the `<body>`
 * and all spacing from fixed items.
 */
export function resetScrollbar() {
  const bd = document.body;
  bd.style.paddingRight = '';
  bd.style.overflow = '';

  if (fixedItems.length) {
    fixedItems.forEach((fixed) => {
      // @ts-ignore
      fixed.style.paddingRight = '';
      // @ts-ignore
      fixed.style.marginRight = '';
    });
  }
}

/**
 * Returns the scrollbar width if the body does overflow
 * the window.
 * @returns {number} the value
 */
export function measureScrollbar() {
  const { clientWidth } = document.documentElement;
  return Math.abs(window.innerWidth - clientWidth);
}

/**
 * Sets the `<body>` and fixed items style when modal / offcanvas
 * is shown to the user.
 *
 * @param {number} scrollbarWidth the previously measured scrollbar width
 * @param {boolean | number} overflow body does overflow or not
 */
export function setScrollbar(scrollbarWidth, overflow) {
  const bd = document.body;
  const bdStyle = getComputedStyle(bd);
  const bodyPad = parseInt(bdStyle.paddingRight, 10);
  const isOpen = bdStyle.overflow === 'hidden';
  const sbWidth = isOpen && bodyPad ? 0 : scrollbarWidth;

  if (overflow) {
    bd.style.overflow = 'hidden';
    bd.style.paddingRight = `${bodyPad + sbWidth}px`;

    if (fixedItems.length) {
      fixedItems.forEach((fixed) => {
        const isSticky = hasClass(fixed, stickyTopClass);
        const itemPadValue = getComputedStyle(fixed).paddingRight;
        // @ts-ignore
        fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`;
        if (isSticky) {
          const itemMValue = getComputedStyle(fixed).marginRight;
          // @ts-ignore
          fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
        }
      });
    }
  }
}
