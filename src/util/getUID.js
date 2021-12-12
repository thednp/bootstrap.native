let bsnUID = 1;

/**
 * Returns a unique identifier for popover, tooltip, scrollspy.
 *
 * @param {Element} element target element
 * @param {number} key predefined key
 * @returns {number} an existing or new unique key
 */
export default function getUID(element, key) {
  bsnUID += 1;
  return element[key] || bsnUID;
}
