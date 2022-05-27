import getWindow from '@thednp/shorty/src/get/getWindow';
import isHTMLElement from '@thednp/shorty/src/is/isHTMLElement';
import isString from '@thednp/shorty/src/is/isString';
import isFunction from '@thednp/shorty/src/is/isFunction';

/**
 * Append an existing `Element` to Popover / Tooltip component or HTML
 * markup string to be parsed & sanitized to be used as popover / tooltip content.
 *
 * @param {HTMLElement} element target
 * @param {Node | string} content the `Element` to append / string
 * @param {ReturnType<String>} sanitizeFn a function to sanitize string content
 */
export default function setHtml(element, content, sanitizeFn) {
  if (isString(content) && !content.length) return;

  if (isString(content)) {
    let dirty = content.trim(); // fixing #233
    if (isFunction(sanitizeFn)) dirty = sanitizeFn(dirty);

    const win = getWindow(element);
    const domParser = new win.DOMParser();
    const tempDocument = domParser.parseFromString(dirty, 'text/html');
    const { body } = tempDocument;
    const method = body.children.length ? 'innerHTML' : 'innerText';
    element[method] = body[method];
  } else if (isHTMLElement(content)) {
    element.append(content);
  }
}
