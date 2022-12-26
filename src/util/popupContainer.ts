import { getDocumentBody, isNode, createElement } from '@thednp/shorty';

// the default container for Modal, Offcanvas, Popover and Tooltip
const popupContainer = createElement({ tagName: 'div' }) as HTMLElement;

const appendPopup = (target?: HTMLElement, customContainer?: ParentNode) => {
  const lookup = isNode(customContainer) && customContainer.nodeName !== 'BODY' ? customContainer : popupContainer;
  const BODY =
    isNode(customContainer) && customContainer.nodeName === 'BODY' ? customContainer : getDocumentBody(target);

  if (isNode(target)) {
    if (
      (!customContainer && !BODY.contains(popupContainer)) ||
      (isNode(customContainer) && customContainer.nodeName === 'BODY')
    ) {
      BODY.append(popupContainer);
    }
    lookup.append(target);
  }
};

const removePopup = (target?: HTMLElement, customContainer?: ParentNode) => {
  if (isNode(target)) {
    target.remove();

    if (!customContainer && !popupContainer.children.length) {
      popupContainer.remove();
    }
  }
};

const hasPopup = (target: HTMLElement, customContainer?: ParentNode) => {
  const lookup = isNode(customContainer) && customContainer.nodeName !== 'BODY' ? customContainer : popupContainer;
  return lookup.contains(target);
};

export { popupContainer, appendPopup, removePopup, hasPopup };
