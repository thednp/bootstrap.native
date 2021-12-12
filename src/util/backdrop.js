import queryElement from 'shorter-js/src/misc/queryElement';
import addClass from 'shorter-js/src/class/addClass';
import removeClass from 'shorter-js/src/class/removeClass';
import reflow from 'shorter-js/src/misc/reflow';

import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import { resetScrollbar } from './scrollbar';

const modalBackdropClass = 'modal-backdrop';
const offcanvasBackdropClass = 'offcanvas-backdrop';
const modalActiveSelector = `.modal.${showClass}`;
const offcanvasActiveSelector = `.offcanvas.${showClass}`;
const overlay = document.createElement('div');

/**
 * Returns the current active modal / offcancas element.
 * @returns {Element} the requested element
 */
function getCurrentOpen() {
  return queryElement(`${modalActiveSelector},${offcanvasActiveSelector}`);
}

/**
 * Toogles from a Modal overlay to an Offcanvas, or vice-versa.
 * @param {boolean | number} isModal
 */
function toggleOverlayType(isModal) {
  const targetClass = isModal ? modalBackdropClass : offcanvasBackdropClass;
  [modalBackdropClass, offcanvasBackdropClass].forEach((c) => {
    removeClass(overlay, c);
  });
  addClass(overlay, targetClass);
}

/**
 * Append the overlay to DOM.
 * @param {boolean | number} hasFade
 * @param {boolean | number} isModal
 */
function appendOverlay(hasFade, isModal) {
  toggleOverlayType(isModal);
  document.body.append(overlay);
  if (hasFade) addClass(overlay, fadeClass);
}

/**
 * Shows the overlay to the user.
 */
function showOverlay() {
  addClass(overlay, showClass);
  reflow(overlay);
}

/**
 * Hides the overlay from the user.
 */
function hideOverlay() {
  removeClass(overlay, showClass);
}

/**
 * Removes the overlay from DOM.
 */
function removeOverlay() {
  if (!getCurrentOpen()) {
    removeClass(overlay, fadeClass);
    overlay.remove();
    resetScrollbar();
  }
}

export {
  overlay,
  offcanvasBackdropClass,
  modalBackdropClass,
  modalActiveSelector,
  offcanvasActiveSelector,
  toggleOverlayType,
  appendOverlay,
  showOverlay,
  hideOverlay,
  getCurrentOpen,
  removeOverlay,
};
