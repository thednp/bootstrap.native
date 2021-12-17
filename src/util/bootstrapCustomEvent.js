/** Returns an original event for Bootstrap Native components. */
class OriginalEvent extends CustomEvent {
  /**
   * @param {string} EventType event.type
   * @param {Record<string, any>=} config Event.options | Event.properties
   */
  constructor(EventType, config) {
    super(EventType, config);
    /** @type {EventTarget?} */
    this.relatedTarget = null;
  }
}

/**
 * Returns a namespaced `CustomEvent` specific to each component.
 * @param {string} EventType Event.type
 * @param {Record<string, any>=} config Event.options | Event.properties
 * @returns {OriginalEvent} a new namespaced event
 */
export default function bootstrapCustomEvent(EventType, config) {
  const OriginalCustomEvent = new OriginalEvent(EventType, { cancelable: true, bubbles: true });

  if (config instanceof Object) {
    Object.assign(OriginalCustomEvent, config);
  }
  return OriginalCustomEvent;
}
