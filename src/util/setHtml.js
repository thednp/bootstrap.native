/**
 * Append an existing `Element` to Popover / Tooltip component or HTML
 * markup string to be parsed & sanitized to be used as popover / tooltip content.
 *
 * @param {HTMLElement | Element} element target
 * @param {HTMLElement | Element | string} content the `Element` to append / string
 * @param {ReturnType<any>} sanitizeFn a function to sanitize string content
 */
export default function setHtml(element, content, sanitizeFn) {
  if (typeof content === 'string' && !content.length) return;

  if (typeof content === 'string') {
    let dirty = content.trim(); // fixing #233
    if (typeof sanitizeFn === 'function') dirty = sanitizeFn(dirty);

    const domParser = new DOMParser();
    const tempDocument = domParser.parseFromString(dirty, 'text/html');
    const { body } = tempDocument;
    const method = body.children.length ? 'innerHTML' : 'innerText';
    // @ts-ignore
    element[method] = body[method];
  } else if (content instanceof HTMLElement) {
    element.append(content);
  }
}
