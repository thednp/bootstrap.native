import { getDocumentBody, isNode, createElement } from '@thednp/shorty';

// the default container for Modal, Offcanvas, Popover and Tooltip
const popupContainer = createElement({ tagName: 'div', className: 'popup-container' }) as HTMLElement;

const appendPopup = (target: HTMLElement, customContainer?: ParentNode) => {
  const containerIsBody = isNode(customContainer) && customContainer.nodeName === 'BODY';
  const lookup = isNode(customContainer) && !containerIsBody ? customContainer : popupContainer;
  const BODY = containerIsBody ? customContainer : getDocumentBody(target);

  if (isNode(target)) {
    if (lookup === popupContainer) {
      BODY.append(popupContainer);
    }
    lookup.append(target);
  }
};

const removePopup = (target: HTMLElement, customContainer?: ParentNode) => {
  const containerIsBody = isNode(customContainer) && customContainer.nodeName === 'BODY';
  const lookup = isNode(customContainer) && !containerIsBody ? customContainer : popupContainer;

  if (isNode(target)) {
    target.remove();

    if (lookup === popupContainer && !popupContainer.children.length) {
      popupContainer.remove();
    }
  }
};

const hasPopup = (target: HTMLElement, customContainer?: ParentNode) => {
  const lookup = isNode(customContainer) && customContainer.nodeName !== 'BODY' ? customContainer : popupContainer;
  return isNode(target) && lookup.contains(target);
};

export { popupContainer, appendPopup, removePopup, hasPopup };
