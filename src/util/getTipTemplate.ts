import tooltipString from '../strings/tooltipString';

/**
 * Returns a template for Popover / Tooltip.
 *
 * @param tipType the expected markup type
 * @returns the template markup
 */
const getTipTemplate = (tipType: string) => {
  const isTooltip = tipType === tooltipString;
  const bodyClass = isTooltip ? `${tipType}-inner` : `${tipType}-body`;
  const header = !isTooltip ? `<h3 class="${tipType}-header"></h3>` : '';
  const arrow = `<div class="${tipType}-arrow"></div>`;
  const body = `<div class="${bodyClass}"></div>`;
  return `<div class="${tipType}" role="${tooltipString}">${header + arrow + body}</div>`;
};

export default getTipTemplate;
