import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';

/**
 * Returns a namespaced `CustomEvent` specific to each component.
 * @param {string} EventType Event.type
 * @param {Record<string, any>=} config Event.options | Event.properties
 * @returns {BSN.OriginalEvent} a new namespaced event
 */
export default function bootstrapCustomEvent(EventType, config) {
  const OriginalCustomEvent = new CustomEvent(EventType, { cancelable: true, bubbles: true });

  if (config instanceof Object) {
    ObjectAssign(OriginalCustomEvent, config);
  }
  return OriginalCustomEvent;
}
