import isRTL from '@thednp/shorty/src/is/isRTL';
import isHTMLElement from '@thednp/shorty/src/is/isHTMLElement';
import querySelector from '@thednp/shorty/src/selectors/querySelector';
import setAttribute from '@thednp/shorty/src/attr/setAttribute';
import hasClass from '@thednp/shorty/src/class/hasClass';
import addClass from '@thednp/shorty/src/class/addClass';
import createElement from '@thednp/shorty/src/misc/createElement';

import tooltipComponent from '../strings/tooltipComponent';
import tooltipString from '../strings/tooltipString';
import popoverString from '../strings/popoverString';
import fadeClass from '../strings/fadeClass';
import tipClassPositions from './tipClassPositions';
import setHtml from './setHtml';

/**
 * Creates a new tooltip / popover.
 *
 * @param {BSN.Popover | BSN.Tooltip} self the `Tooltip` / `Popover` instance
 */
export default function createTip(self) {
  const { id, element, options } = self;
  const {
    animation, customClass, sanitizeFn, placement, dismissible,
    title, content, template, btnClose,
  } = options;
  const isTooltip = self.name === tooltipComponent;
  const tipString = isTooltip ? tooltipString : popoverString;
  const tipPositions = { ...tipClassPositions };
  let titleParts = [];
  let contentParts = [];

  if (isRTL(element)) {
    tipPositions.left = 'end';
    tipPositions.right = 'start';
  }

  // set initial popover class
  const placementClass = `bs-${tipString}-${tipPositions[placement]}`;

  // load template
  /** @type {HTMLElement?} */
  let tooltipTemplate;
  if (isHTMLElement(template)) {
    tooltipTemplate = template;
  } else {
    const htmlMarkup = createElement('div');
    setHtml(htmlMarkup, template, sanitizeFn);
    tooltipTemplate = htmlMarkup.firstChild;
  }

  // set popover markup
  self.tooltip = isHTMLElement(tooltipTemplate) && tooltipTemplate.cloneNode(true);

  const { tooltip } = self;

  // set id and role attributes
  setAttribute(tooltip, 'id', id);
  setAttribute(tooltip, 'role', tooltipString);

  const bodyClass = isTooltip ? `${tooltipString}-inner` : `${popoverString}-body`;
  const tooltipHeader = isTooltip ? null : querySelector(`.${popoverString}-header`, tooltip);
  const tooltipBody = querySelector(`.${bodyClass}`, tooltip);

  // set arrow and enable access for styleTip
  self.arrow = querySelector(`.${tipString}-arrow`, tooltip);
  const { arrow } = self;

  if (isHTMLElement(title)) titleParts = [title.cloneNode(true)];
  else {
    const tempTitle = createElement('div');
    setHtml(tempTitle, title, sanitizeFn);
    titleParts = [...[...tempTitle.childNodes]];
  }

  if (isHTMLElement(content)) contentParts = [content.cloneNode(true)];
  else {
    const tempContent = createElement('div');
    setHtml(tempContent, content, sanitizeFn);
    contentParts = [...[...tempContent.childNodes]];
  }

  // set dismissible button
  if (dismissible) {
    if (title) {
      if (isHTMLElement(btnClose)) titleParts = [...titleParts, btnClose.cloneNode(true)];
      else {
        const tempBtn = createElement('div');
        setHtml(tempBtn, btnClose, sanitizeFn);
        titleParts = [...titleParts, tempBtn.firstChild];
      }
    } else {
      /* istanbul ignore else */
      if (tooltipHeader) tooltipHeader.remove();
      if (isHTMLElement(btnClose)) contentParts = [...contentParts, btnClose.cloneNode(true)];
      else {
        const tempBtn = createElement('div');
        setHtml(tempBtn, btnClose, sanitizeFn);
        contentParts = [...contentParts, tempBtn.firstChild];
      }
    }
  }

  // fill the template with content from options / data attributes
  // also sanitize title && content
  /* istanbul ignore else */
  if (!isTooltip) {
    /* istanbul ignore else */
    if (title && tooltipHeader) setHtml(tooltipHeader, titleParts, sanitizeFn);
    /* istanbul ignore else */
    if (content && tooltipBody) setHtml(tooltipBody, contentParts, sanitizeFn);
    // set btn
    self.btn = querySelector('.btn-close', tooltip);
  } else if (title && tooltipBody) setHtml(tooltipBody, title, sanitizeFn);

  // Bootstrap 5.2.x
  addClass(tooltip, 'position-absolute');
  addClass(arrow, 'position-absolute');

  // set popover animation and placement
  /* istanbul ignore else */
  if (!hasClass(tooltip, tipString)) addClass(tooltip, tipString);
  /* istanbul ignore else */
  if (animation && !hasClass(tooltip, fadeClass)) addClass(tooltip, fadeClass);
  /* istanbul ignore else */
  if (customClass && !hasClass(tooltip, customClass)) {
    addClass(tooltip, customClass);
  }
  /* istanbul ignore else */
  if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
}
