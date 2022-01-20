import querySelector from 'shorter-js/src/selectors/querySelector';
import addClass from 'shorter-js/src/class/addClass';
import removeClass from 'shorter-js/src/class/removeClass';
import reflow from 'shorter-js/src/misc/reflow';
import getDocument from 'shorter-js/src/get/getDocument';

import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import modalString from '../strings/modalString';
import offcanvasString from '../strings/offcanvasString';
import { resetScrollbar } from './scrollbar';

const backdropString = 'backdrop';
const modalBackdropClass = `${modalString}-${backdropString}`;
const offcanvasBackdropClass = `${offcanvasString}-${backdropString}`;
const modalActiveSelector = `.${modalString}.${showClass}`;
const offcanvasActiveSelector = `.${offcanvasString}.${showClass}`;

// any document would suffice
const overlay = getDocument().createElement('div');

/**
 * Returns the current active modal / offcancas element.
 * @param {(HTMLElement | Element)=} element the context element
 * @returns {(HTMLElement | Element)?} the requested element
 */
function getCurrentOpen(element) {
  return querySelector(`${modalActiveSelector},${offcanvasActiveSelector}`, getDocument(element));
}

/**
 * Toogles from a Modal overlay to an Offcanvas, or vice-versa.
 * @param {boolean=} isModal
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
 * @param {HTMLElement | Element} container
 * @param {boolean} hasFade
 * @param {boolean=} isModal
 */
function appendOverlay(container, hasFade, isModal) {
  toggleOverlayType(isModal);
  container.append(overlay);
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
 * @param {(HTMLElement | Element)=} element
 */
function removeOverlay(element) {
  if (!getCurrentOpen(element)) {
    removeClass(overlay, fadeClass);
    overlay.remove();
    resetScrollbar(element);
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
