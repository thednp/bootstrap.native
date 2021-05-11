import hasClass from 'shorter-js/src/class/hasClass.js';
import fixedTopClass from '../strings/fixedTopClass.js';
import fixedBottomClass from '../strings/fixedBottomClass.js';
import stickyTopClass from '../strings/stickyTopClass.js';

const fixedItems = Array.from(document.getElementsByClassName(fixedTopClass))
  .concat(Array.from(document.getElementsByClassName(fixedBottomClass)))
  .concat(Array.from(document.getElementsByClassName(stickyTopClass)))
  .concat(Array.from(document.getElementsByClassName('is-fixed')));

export function resetScrollbar() {
  const bd = document.body;
  bd.style.paddingRight = '';
  bd.style.overflow = '';

  if (fixedItems.length) {
    fixedItems.forEach((fixed) => {
      fixed.style.paddingRight = '';
      fixed.style.marginRight = '';
    });
  }
}

export function measureScrollbar() {
  const windowWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - windowWidth);
}

export function setScrollbar(scrollbarWidth, overflow, isOpen) {
  const bd = document.body;
  const bodyPad = parseInt(getComputedStyle(bd).paddingRight, 10);
  const sbWidth = isOpen && bodyPad ? 0 : scrollbarWidth;

  if (overflow) {
    bd.style.paddingRight = `${bodyPad + sbWidth}px`;

    if (fixedItems.length) {
      fixedItems.forEach((fixed) => {
        const isSticky = hasClass(fixed, stickyTopClass);
        const itemPadValue = getComputedStyle(fixed).paddingRight;
        fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`;
        if (isSticky) {
          const itemMValue = getComputedStyle(fixed).marginRight;
          fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
        }
      });
    }
  }
}
