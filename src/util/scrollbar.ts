import {
  getWindow,
  getDocumentElement,
  getElementStyle,
  getDocumentBody,
  hasClass,
  setElementStyle,
  getElementsByClassName,
} from '@thednp/shorty';

import fixedTopClass from '../strings/fixedTopClass';
import fixedBottomClass from '../strings/fixedBottomClass';
import stickyTopClass from '../strings/stickyTopClass';
import positionStickyClass from '../strings/positionStickyClass';

const getFixedItems = (parent?: ParentNode) => [
  ...getElementsByClassName(fixedTopClass, parent),
  ...getElementsByClassName(fixedBottomClass, parent),
  ...getElementsByClassName(stickyTopClass, parent),
  ...getElementsByClassName(positionStickyClass, parent),
  ...getElementsByClassName('is-fixed', parent),
];

/**
 * Removes *padding* and *overflow* from the `<body>`
 * and all spacing from fixed items.
 *
 * @param element the target modal/offcanvas
 */
export const resetScrollbar = (element?: HTMLElement) => {
  const bd = getDocumentBody(element);
  setElementStyle(bd, {
    paddingRight: '',
    overflow: '',
  });

  const fixedItems = getFixedItems(bd);

  if (fixedItems.length) {
    fixedItems.forEach(fixed => {
      setElementStyle(fixed, {
        paddingRight: '',
        marginRight: '',
      });
    });
  }
};

/**
 * Returns the scrollbar width if the body does overflow
 * the window.
 *
 * @param element target element
 * @returns the scrollbar width value
 */
export const measureScrollbar = (element: HTMLElement) => {
  const { clientWidth } = getDocumentElement(element);
  const { innerWidth } = getWindow(element);
  return Math.abs(innerWidth - clientWidth);
};

/**
 * Sets the `<body>` and fixed items style when modal / offcanvas
 * is shown to the user.
 *
 * @param element the target modal/offcanvas
 * @param overflow body does overflow or not
 */
export const setScrollbar = (element: HTMLElement, overflow?: boolean) => {
  const bd = getDocumentBody(element);
  const bodyPad = parseInt(getElementStyle(bd, 'paddingRight'), 10);
  const isOpen = getElementStyle(bd, 'overflow') === 'hidden';
  const sbWidth = isOpen && bodyPad ? 0 : measureScrollbar(element);
  const fixedItems = getFixedItems(bd);

  /* istanbul ignore else */
  if (overflow) {
    setElementStyle(bd, {
      overflow: 'hidden',
      paddingRight: `${bodyPad + sbWidth}px`,
    });

    /* istanbul ignore else */
    if (fixedItems.length) {
      fixedItems.forEach(fixed => {
        const itemPadValue = getElementStyle(fixed, 'paddingRight');
        fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`;
        /* istanbul ignore else */
        if ([stickyTopClass, positionStickyClass].some(c => hasClass(fixed, c))) {
          const itemMValue = getElementStyle(fixed, 'marginRight');
          fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
        }
      });
    }
  }
};
