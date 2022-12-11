import { getDocumentBody, isNode, createElement } from '@thednp/shorty';

// the default container for Modal, Offcanvas, Popover and Tooltip
const popupContainer = createElement({ tagName: 'DIV' }) as HTMLElement;

const appendPopup = (target?: HTMLElement) => {
  const BODY = getDocumentBody(target);
  if (isNode(target)) {
    if (!BODY.contains(popupContainer)) {
      BODY.append(popupContainer);
    }
    popupContainer.append(target);
  }
};

const removePopup = (target?: HTMLElement) => {
  if (isNode(target)) {
    target.remove();

    if (!popupContainer.children.length) {
      popupContainer.remove();
    }
  }
};

const hasPopup = (target: HTMLElement) => {
  return popupContainer.contains(target);
};

export { popupContainer, appendPopup, removePopup, hasPopup };
