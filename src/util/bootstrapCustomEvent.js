export default function(eventName, componentName, properties) {
  let OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName, {cancelable: true});
  if (typeof properties !== 'undefined') {
    Object.keys(properties).forEach(key => {
      Object.defineProperty(OriginalCustomEvent, key, {
        value: properties[key]
      });
    });
  }
  return OriginalCustomEvent;
}
