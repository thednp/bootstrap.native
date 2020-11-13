export default function(eventName, componentName, eventProperties) {
  let OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName, {cancelable: true});
  if (typeof eventProperties !== 'undefined') {
    Object.keys(eventProperties).forEach(key => {
      Object.defineProperty(OriginalCustomEvent, key, {
        value: eventProperties[key]
      });
    });
  }
  return OriginalCustomEvent;
}
