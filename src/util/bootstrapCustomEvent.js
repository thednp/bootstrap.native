/**
 * Returns a namespaced `CustomEvent` specific to each component.
 * @param {string} namespacedEventType Event.type
 * @param {AddEventListenerOptions | boolean} eventProperties Event.options | Event.properties
 * @returns {CustomEvent} a new namespaced event
 */
export default function bootstrapCustomEvent(namespacedEventType, eventProperties) {
  const OriginalCustomEvent = new CustomEvent(namespacedEventType, { cancelable: true });

  if (eventProperties instanceof Object) {
    Object.assign(OriginalCustomEvent, eventProperties);
  }
  return OriginalCustomEvent;
}
