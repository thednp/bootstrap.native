import isElement from 'shorter-js/src/misc/isElement';

/**
 * Append an existing `Element` to Popover / Tooltip component or HTML
 * markup string to be parsed & sanitized to be used as popover / tooltip content.
 *
 * @param {Element} element target
 * @param {Element | string} content the `Element` to append / string
 * @param {function} sanitizeFn a function to sanitize string content
 */
export default function setHtml(element, content, sanitizeFn) {
  if (typeof content === 'string' && !content.length) return;

  if (isElement(content)) {
    element.append(content);
  } else {
    // @ts-ignore
    let dirty = content.trim(); // fixing #233

    if (typeof sanitizeFn === 'function') dirty = sanitizeFn(dirty);

    const domParser = new DOMParser();
    const tempDocument = domParser.parseFromString(dirty, 'text/html');
    const { body } = tempDocument;
    const method = body.children.length ? 'innerHTML' : 'innerText';
    // @ts-ignore
    element[method] = body[method];
  }
}
