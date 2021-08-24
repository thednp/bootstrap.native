import queryElement from 'shorter-js/src/misc/queryElement.js';
import addClass from 'shorter-js/src/class/addClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import reflow from 'shorter-js/src/misc/reflow.js';

import fadeClass from '../strings/fadeClass.js';
import showClass from '../strings/showClass.js';
import { resetScrollbar } from './scrollbar.js';

const modalBackdropClass = 'modal-backdrop';
const offcanvasBackdropClass = 'offcanvas-backdrop';
const modalActiveSelector = `.modal.${showClass}`;
const offcanvasActiveSelector = `.offcanvas.${showClass}`;
const overlay = document.createElement('div');

function getCurrentOpen() {
  return queryElement(`${modalActiveSelector},${offcanvasActiveSelector}`);
}

function toggleOverlayType(isModal) {
  const targetClass = isModal ? modalBackdropClass : offcanvasBackdropClass;
  [modalBackdropClass, offcanvasBackdropClass].forEach((c) => {
    removeClass(overlay, c);
  });
  addClass(overlay, targetClass);
}

function appendOverlay(hasFade, isModal) {
  toggleOverlayType(isModal);
  document.body.appendChild(overlay);
  if (hasFade) addClass(overlay, fadeClass);
}

function showOverlay() {
  addClass(overlay, showClass);
  reflow(overlay);
}

function hideOverlay() {
  removeClass(overlay, showClass);
}

function removeOverlay() {
  const bd = document.body;
  const currentOpen = getCurrentOpen();

  if (!currentOpen) {
    removeClass(overlay, fadeClass);
    bd.removeChild(overlay);
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
