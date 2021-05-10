import queryElement from 'shorter-js/src/misc/queryElement.js';
import addClass from 'shorter-js/src/class/addClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import reflow from 'shorter-js/src/misc/reflow.js';

import fadeClass from '../strings/fadeClass.js';
import showClass from '../strings/showClass.js';
import { resetScrollbar } from './scrollbar.js';

const modalOpenClass = 'modal-open';
const modalBackdropClass = 'modal-backdrop';
const modalActiveSelector = `.modal.${showClass}`;
const offcanvasActiveSelector = `.offcanvas.${showClass}`;

const overlay = document.createElement('div');
overlay.setAttribute('class', `${modalBackdropClass}`);

function getCurrentOpen() {
  return queryElement(`${modalActiveSelector},${offcanvasActiveSelector}`);
}

function appendOverlay(hasFade) {
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
    removeClass(bd, modalOpenClass);
    bd.removeChild(overlay);
    resetScrollbar();
  }
}

export {
  overlay,
  modalOpenClass,
  modalBackdropClass,
  modalActiveSelector,
  offcanvasActiveSelector,
  appendOverlay,
  showOverlay,
  hideOverlay,
  getCurrentOpen,
  removeOverlay,
};
