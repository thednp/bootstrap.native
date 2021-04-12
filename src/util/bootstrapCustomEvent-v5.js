export default function bootstrapCustomEvent(namespacedEventType, eventProperties) {
  const OriginalCustomEvent = new CustomEvent(namespacedEventType, { cancelable: true });

  if (eventProperties instanceof Object) {
    Object.keys(eventProperties).forEach((key) => {
      Object.defineProperty(OriginalCustomEvent, key, {
        value: eventProperties[key],
      });
    });
  }
  return OriginalCustomEvent;
}
