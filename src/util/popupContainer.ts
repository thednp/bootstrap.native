import { createElement, getDocumentBody, isNode } from "@thednp/shorty";

// the default container for Modal, Offcanvas, Popover and Tooltip
const popupContainer = createElement({
  tagName: "div",
  className: "popup-container",
}) as HTMLElement;

const appendPopup = (target: Element, customContainer?: ParentNode) => {
  const containerIsBody = isNode(customContainer) &&
    customContainer.nodeName === "BODY";
  const lookup = isNode(customContainer) && !containerIsBody
    ? customContainer
    : popupContainer;
  const BODY = containerIsBody ? customContainer : getDocumentBody(target);

  // istanbul ignore else @preserve
  if (isNode(target)) {
    if (lookup === popupContainer) {
      BODY.append(popupContainer);
    }
    lookup.append(target);
  }
};

const removePopup = (target: Element, customContainer?: ParentNode) => {
  const containerIsBody = isNode(customContainer) &&
    customContainer.nodeName === "BODY";
  const lookup = isNode(customContainer) && !containerIsBody
    ? customContainer
    : popupContainer;

  // istanbul ignore else @preserve
  if (isNode(target)) {
    target.remove();

    if (lookup === popupContainer && !popupContainer.children.length) {
      popupContainer.remove();
    }
  }
};

const hasPopup = (target: Element, customContainer?: ParentNode) => {
  const lookup = isNode(customContainer) && customContainer.nodeName !== "BODY"
    ? customContainer
    : popupContainer;
  return isNode(target) && lookup.contains(target);
};

export { appendPopup, hasPopup, popupContainer, removePopup };
