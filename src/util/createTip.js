import isRTL from '@thednp/shorty/src/is/isRTL';
import isHTMLElement from '@thednp/shorty/src/is/isHTMLElement';
import querySelector from '@thednp/shorty/src/selectors/querySelector';
import setAttribute from '@thednp/shorty/src/attr/setAttribute';
import hasClass from '@thednp/shorty/src/class/hasClass';
import addClass from '@thednp/shorty/src/class/addClass';
import getDocument from '@thednp/shorty/src/get/getDocument';

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
  } = options;
  let { title, content } = options;
  const isTooltip = self.name === tooltipComponent;
  const tipString = isTooltip ? tooltipString : popoverString;
  const { template, btnClose } = options;
  const tipPositions = { ...tipClassPositions };

  if (isRTL(element)) {
    tipPositions.left = 'end';
    tipPositions.right = 'start';
  }

  // set initial popover class
  const placementClass = `bs-${tipString}-${tipPositions[placement]}`;

  // load template
  /** @type {HTMLElement?} */
  let popoverTemplate;
  if (isHTMLElement(template)) {
    popoverTemplate = template;
  } else {
    const htmlMarkup = getDocument(element).createElement('div');
    setHtml(htmlMarkup, template, sanitizeFn);
    popoverTemplate = htmlMarkup.firstElementChild;
  }

  // set popover markup
  self.tooltip = isHTMLElement(popoverTemplate) && popoverTemplate.cloneNode(true);

  const { tooltip } = self;

  // set id and role attributes
  setAttribute(tooltip, 'id', id);
  setAttribute(tooltip, 'role', tooltipString);

  const bodyClass = isTooltip ? `${tooltipString}-inner` : `${popoverString}-body`;
  const tooltipHeader = isTooltip ? null : querySelector(`.${popoverString}-header`, tooltip);
  const tooltipBody = querySelector(`.${bodyClass}`, tooltip);

  // set arrow and enable access for styleTip
  self.arrow = querySelector(`.${tipString}-arrow`, tooltip);

  // set dismissible button
  if (dismissible) {
    if (title) {
      if (isHTMLElement(title)) setHtml(title, btnClose, sanitizeFn);
      else title += btnClose;
    } else {
      if (tooltipHeader) tooltipHeader.remove();
      if (isHTMLElement(content)) setHtml(content, btnClose, sanitizeFn);
      else content += btnClose;
    }
  }

  // fill the template with content from options / data attributes
  // also sanitize title && content
  if (!isTooltip) {
    if (title && tooltipHeader) setHtml(tooltipHeader, title, sanitizeFn);
    if (content && tooltipBody) setHtml(tooltipBody, content, sanitizeFn);
    // set btn
    self.btn = querySelector('.btn-close', tooltip);
  } else if (title && tooltipBody) setHtml(tooltipBody, title, sanitizeFn);

  // set popover animation and placement
  if (!hasClass(tooltip, tipString)) addClass(tooltip, tipString);
  if (animation && !hasClass(tooltip, fadeClass)) addClass(tooltip, fadeClass);
  if (customClass && !hasClass(tooltip, customClass)) {
    addClass(tooltip, customClass);
  }
  if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
}
