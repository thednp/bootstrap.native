export default function setHtml(element, content, sanitizeFn) {
  if (typeof content === 'string' && !content.length) return;

  if (content instanceof Element) {
    element.append(content);
  } else {
    let dirty = content.trim(); // fixing #233

    if (typeof sanitizeFn === 'function') dirty = sanitizeFn(dirty);

    const domParser = new DOMParser();
    const tempDocument = domParser.parseFromString(dirty, 'text/html');
    const method = tempDocument.children.length ? 'innerHTML' : 'innerText';
    element[method] = tempDocument.body[method];
  }
}
