import getWindow from '@thednp/shorty/src/get/getWindow';
import isHTMLElement from '@thednp/shorty/src/is/isHTMLElement';
import isNodeList from '@thednp/shorty/src/is/isNodeList';
import isString from '@thednp/shorty/src/is/isString';
import isFunction from '@thednp/shorty/src/is/isFunction';
import isArray from '@thednp/shorty/src/is/isArray';
import isNode from '@thednp/shorty/src/is/isNode';

/**
 * Append an existing `Element` to Popover / Tooltip component or HTML
 * markup string to be parsed & sanitized to be used as popover / tooltip content.
 *
 * @param {HTMLElement} element target
 * @param {Node | string} content the `Element` to append / string
 * @param {ReturnType<any>} sanitizeFn a function to sanitize string content
 */
export default function setHtml(element, content, sanitizeFn) {
  /* istanbul ignore next */
  if (!isHTMLElement(element) || (isString(content) && !content.length)) return;

  /* istanbul ignore else */
  if (isString(content)) {
    let dirty = content.trim(); // fixing #233
    if (isFunction(sanitizeFn)) dirty = sanitizeFn(dirty);

    const win = getWindow(element);
    const domParser = new win.DOMParser();
    const tempDocument = domParser.parseFromString(dirty, 'text/html');
    element.append(...[...tempDocument.body.childNodes]);
  } else if (isHTMLElement(content)) {
    element.append(content);
  } else if (isNodeList(content)
    || (isArray(content) && content.every(isNode))) {
    element.append(...[...content]);
  }
}
