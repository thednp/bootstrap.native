import {
  addClass,
  createElement,
  hasClass,
  isHTMLElement,
  isRTL,
  querySelector,
  setAttribute,
} from "@thednp/shorty";

import tooltipComponent from "../strings/tooltipComponent";
import tooltipString from "../strings/tooltipString";
import popoverString from "../strings/popoverString";
import fadeClass from "../strings/fadeClass";
import tipClassPositions from "./tipClassPositions";
import setHtml from "./setHtml";
import Tooltip from "../components/tooltip";
import Popover from "../components/popover";

/**
 * Creates a new tooltip / popover.
 *
 * @param self the `Tooltip` / `Popover` instance
 */
const createTip = (self: Tooltip | Popover) => {
  const isTooltip = self.name === tooltipComponent;

  const { id, element, options } = self;
  const {
    title,
    placement,
    template,
    animation,
    customClass,
    sanitizeFn,
    dismissible,
    content,
    btnClose,
  } = options;
  const tipString = isTooltip ? tooltipString : popoverString;
  const tipPositions = { ...tipClassPositions };
  let titleParts: Node[] = [];
  let contentParts: Node[] = [];

  if (isRTL(element)) {
    tipPositions.left = "end";
    tipPositions.right = "start";
  }

  // set initial popover class
  const placementClass = `bs-${tipString}-${tipPositions[placement]}`;

  // load template
  let tooltipTemplate: Node | string;
  if (isHTMLElement(template)) {
    tooltipTemplate = template;
  } else {
    const htmlMarkup = createElement("div") as HTMLElement;
    setHtml(htmlMarkup, template, sanitizeFn);
    tooltipTemplate = htmlMarkup.firstChild as HTMLElement;
  }

  /* istanbul ignore if @preserve */
  if (!isHTMLElement(tooltipTemplate)) return;

  // set popover markup
  self.tooltip = tooltipTemplate.cloneNode(true) as HTMLElement;
  const { tooltip } = self;

  // set id and role attributes
  setAttribute(tooltip, "id", id);
  setAttribute(tooltip, "role", tooltipString);

  const bodyClass = isTooltip
    ? `${tooltipString}-inner`
    : `${popoverString}-body`;
  const tooltipHeader = isTooltip
    ? null
    : querySelector<HTMLElement>(`.${popoverString}-header`, tooltip);
  const tooltipBody = querySelector<HTMLElement>(`.${bodyClass}`, tooltip);

  // set arrow and enable access for styleTip
  self.arrow = querySelector<HTMLElement>(
    `.${tipString}-arrow`,
    tooltip,
  ) as HTMLElement;
  const { arrow } = self;

  if (isHTMLElement(title)) titleParts = [title.cloneNode(true)];
  else {
    const tempTitle = createElement("div") as HTMLElement;
    setHtml(tempTitle, title, sanitizeFn);
    titleParts = [...[...tempTitle.childNodes]];
  }

  if (isHTMLElement(content)) contentParts = [content.cloneNode(true)];
  else {
    const tempContent = createElement("div") as HTMLElement;
    setHtml(tempContent, content, sanitizeFn);
    contentParts = [...[...tempContent.childNodes]];
  }

  // set dismissible button
  if (dismissible) {
    if (title) {
      if (isHTMLElement(btnClose)) {
        titleParts = [...titleParts, btnClose.cloneNode(true)];
      } else {
        const tempBtn = createElement("div") as HTMLElement;
        setHtml(tempBtn, btnClose, sanitizeFn);
        titleParts = [...titleParts, tempBtn.firstChild as Node];
      }
    } else {
      // istanbul ignore else @preserve
      if (tooltipHeader) tooltipHeader.remove();
      if (isHTMLElement(btnClose)) {
        contentParts = [...contentParts, btnClose.cloneNode(true)];
      } else {
        const tempBtn = createElement("div") as HTMLElement;
        setHtml(tempBtn, btnClose, sanitizeFn);
        contentParts = [...contentParts, tempBtn.firstChild as Node];
      }
    }
  }

  // fill the template with content from options / data attributes
  // also sanitize title && content
  // istanbul ignore else @preserve
  if (!isTooltip) {
    // istanbul ignore else @preserve
    if (title && tooltipHeader) {
      setHtml(tooltipHeader, titleParts, sanitizeFn);
    }
    // istanbul ignore else @preserve
    if (content && tooltipBody) {
      setHtml(tooltipBody, contentParts, sanitizeFn);
    }
    // set btn
    self.btn = querySelector<HTMLButtonElement>(".btn-close", tooltip) ||
      undefined;
  } else if (title && tooltipBody) setHtml(tooltipBody, title, sanitizeFn);

  // Bootstrap 5.2.x
  addClass(tooltip, "position-absolute");
  addClass(arrow, "position-absolute");

  // set popover animation and placement
  // istanbul ignore else @preserve
  if (!hasClass(tooltip, tipString)) addClass(tooltip, tipString);
  // istanbul ignore else @preserve
  if (animation && !hasClass(tooltip, fadeClass)) {
    addClass(tooltip, fadeClass);
  }
  // istanbul ignore else @preserve
  if (customClass && !hasClass(tooltip, customClass)) {
    addClass(tooltip, customClass);
  }
  // istanbul ignore else @preserve
  if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
};

export default createTip;
