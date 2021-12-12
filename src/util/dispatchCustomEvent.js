/**
 * A quick shortcut for `dispatchEvent` v4.
 * @param {CustomEvent} customEvent the event object
 */
export default function dispatchCustomEvent(customEvent) {
  if (this) this.dispatchEvent(customEvent);
}
