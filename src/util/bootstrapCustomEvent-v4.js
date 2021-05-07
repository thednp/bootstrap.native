export default function bootstrapCustomEvent(eventType, componentName, eventProperties) {
  const OriginalCustomEvent = new CustomEvent(`${eventType}.bs.${componentName}`, { cancelable: true });

  if (typeof eventProperties !== 'undefined') {
    Object.keys(eventProperties).forEach((key) => {
      Object.defineProperty(OriginalCustomEvent, key, {
        value: eventProperties[key],
      });
    });
  }
  return OriginalCustomEvent;
}
