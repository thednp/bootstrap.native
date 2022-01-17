import getElementsByClassName from 'shorter-js/src/selectors/getElementsByClassName';
import setElementStyle from 'shorter-js/src/misc/setElementStyle';
import hasClass from 'shorter-js/src/class/hasClass';
// import getDocument from 'shorter-js/src/get/getDocument';
import getDocumentBody from 'shorter-js/src/get/getDocumentBody';
import getElementStyle from 'shorter-js/src/get/getElementStyle';
import getDocumentElement from 'shorter-js/src/get/getDocumentElement';
import getWindow from 'shorter-js/src/get/getWindow';

import fixedTopClass from '../strings/fixedTopClass';
import fixedBottomClass from '../strings/fixedBottomClass';
import stickyTopClass from '../strings/stickyTopClass';
import positionStickyClass from '../strings/positionStickyClass';

/** @param {(HTMLElement | Element | Document)=} parent */
const getFixedItems = (parent) => [
  ...getElementsByClassName(fixedTopClass, parent),
  ...getElementsByClassName(fixedBottomClass, parent),
  ...getElementsByClassName(stickyTopClass, parent),
  ...getElementsByClassName(positionStickyClass, parent),
  ...getElementsByClassName('is-fixed', parent),
];

/**
 * Removes *padding* and *overflow* from the `<body>`
 * and all spacing from fixed items.
 * @param {(HTMLElement | Element)=} element the target modal/offcanvas
 */
export function resetScrollbar(element) {
  const bd = getDocumentBody(element);
  setElementStyle(bd, {
    paddingRight: '',
    overflow: '',
  });

  const fixedItems = getFixedItems(bd);

  if (fixedItems.length) {
    fixedItems.forEach((fixed) => {
      setElementStyle(fixed, {
        paddingRight: '',
        marginRight: '',
      });
    });
  }
}

/**
 * Returns the scrollbar width if the body does overflow
 * the window.
 * @param {(HTMLElement | Element)=} element
 * @returns {number} the value
 */
export function measureScrollbar(element) {
  const { clientWidth } = getDocumentElement(element);
  const { innerWidth } = getWindow(element);
  return Math.abs(innerWidth - clientWidth);
}

/**
 * Sets the `<body>` and fixed items style when modal / offcanvas
 * is shown to the user.
 *
 * @param {HTMLElement | Element} element the target modal/offcanvas
 * @param {boolean=} overflow body does overflow or not
 */
export function setScrollbar(element, overflow) {
  const bd = getDocumentBody(element);
  const bodyPad = parseInt(getElementStyle(bd, 'paddingRight'), 10);
  const isOpen = getElementStyle(bd, 'overflow') === 'hidden';
  const sbWidth = isOpen && bodyPad ? 0 : measureScrollbar(element);
  const fixedItems = getFixedItems(bd);

  if (overflow) {
    setElementStyle(bd, {
      overflow: 'hidden',
      paddingRight: `${bodyPad + sbWidth}px`,
    });

    if (fixedItems.length) {
      fixedItems.forEach((fixed) => {
        const itemPadValue = getElementStyle(fixed, 'paddingRight');
        // @ts-ignore
        fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`;
        if ([stickyTopClass, positionStickyClass].some((c) => hasClass(fixed, c))) {
          const itemMValue = getElementStyle(fixed, 'marginRight');
          // @ts-ignore
          fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
        }
      });
    }
  }
}
