/**
 * Checks if an element is an `<svg>`, `<img>` or `<video>`.
 * *Tooltip* / *Popover* works different with media elements.
 * @param {Element} element the target element
 * @returns {boolean} the query result
 */
export default function isMedia(element) {
  return [SVGElement, HTMLImageElement, HTMLVideoElement]
    .some((mediaType) => element instanceof mediaType);
}
