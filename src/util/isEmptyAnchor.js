export default function isEmptyAnchor(elem) {
  const parentAnchor = elem.closest('A');
  // anchor href starts with #
  return elem && ((elem.href && elem.href.slice(-1) === '#')
    // OR a child of an anchor with href starts with #
    || (parentAnchor && parentAnchor.href && parentAnchor.href.slice(-1) === '#'));
}
