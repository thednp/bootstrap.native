import {
  createElement,
  getDocument,
  reflow,
  removeClass,
  hasClass,
  addClass,
  querySelector,
  getDocumentBody,
} from '@thednp/shorty';

import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import modalString from '../strings/modalString';
import offcanvasString from '../strings/offcanvasString';
import { resetScrollbar } from './scrollbar';
import { appendPopup, removePopup } from './popupContainer';

const backdropString = 'backdrop';
const modalBackdropClass = `${modalString}-${backdropString}`;
const offcanvasBackdropClass = `${offcanvasString}-${backdropString}`;
const modalActiveSelector = `.${modalString}.${showClass}`;
const offcanvasActiveSelector = `.${offcanvasString}.${showClass}`;

// any document would suffice
const overlay = createElement('div') as HTMLElement;

/**
 * Returns the current active modal / offcancas element.
 *
 * @param element the context element
 * @returns the requested element
 */
const getCurrentOpen = (element?: HTMLElement): HTMLElement | null => {
  return querySelector(`${modalActiveSelector},${offcanvasActiveSelector}`, getDocument(element));
};

/**
 * Toogles from a Modal overlay to an Offcanvas, or vice-versa.
 *
 * @param isModal
 */
const toggleOverlayType = (isModal?: boolean) => {
  const targetClass = isModal ? modalBackdropClass : offcanvasBackdropClass;
  [modalBackdropClass, offcanvasBackdropClass].forEach(c => {
    removeClass(overlay, c);
  });
  addClass(overlay, targetClass);
};

/**
 * Append the overlay to DOM.
 *
 * @param element
 * @param hasFade
 * @param isModal
 */
const appendOverlay = (element: HTMLElement, hasFade: boolean, isModal?: boolean) => {
  toggleOverlayType(isModal);
  appendPopup(overlay, getDocumentBody(element));
  if (hasFade) addClass(overlay, fadeClass);
};

/**
 * Shows the overlay to the user.
 */
const showOverlay = () => {
  if (!hasClass(overlay, showClass)) {
    addClass(overlay, showClass);
    reflow(overlay);
  }
};

/**
 * Hides the overlay from the user.
 */
const hideOverlay = () => {
  removeClass(overlay, showClass);
};

/**
 * Removes the overlay from DOM.
 *
 * @param element
 */
const removeOverlay = (element?: HTMLElement): void => {
  if (!getCurrentOpen(element)) {
    removeClass(overlay, fadeClass);
    removePopup(overlay, getDocumentBody(element));
    resetScrollbar(element);
  }
};

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
