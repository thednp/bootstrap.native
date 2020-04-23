// custom events
export function bootstrapCustomEvent (eventName, componentName, related) {
  let OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName, {cancelable: true});
  OriginalCustomEvent.relatedTarget = related;
  return OriginalCustomEvent;
}
export function dispatchCustomEvent (customEvent){
  this && this.dispatchEvent(customEvent);
}

