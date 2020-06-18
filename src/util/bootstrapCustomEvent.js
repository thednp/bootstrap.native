export default function(eventName, componentName, related) {
  let OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName, {cancelable: true});
  OriginalCustomEvent.relatedTarget = related;
  return OriginalCustomEvent;
}