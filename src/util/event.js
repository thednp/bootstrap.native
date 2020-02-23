// event names
export const mouseEvents = { down: 'mousedown', up: 'mouseup' }
export const touchEvents = { start: 'touchstart', end: 'touchend', move:'touchmove', cancel:'touchcancel' }
export const mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ]

// attach | detach handlers
export function on (element, event, handler, options) {
  options = options || false;
  element.addEventListener(event, handler, options);
}
export function off (element, event, handler, options) {
  options = options || false;
  element.removeEventListener(event, handler, options);
}
export function one (element, event, handler, options) {
  on(element, event, function handlerWrapper(e){
    if (e.target === element) {
      handler(e);
      off(element, event, handlerWrapper, options);
    }
  }, options);
}

// custom events
export function bootstrapCustomEvent (eventName, componentName, related) {
  let OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName, {cancelable: true});
  OriginalCustomEvent.relatedTarget = related;
  return OriginalCustomEvent;
}
export function dispatchCustomEvent (customEvent){
  this && this.dispatchEvent(customEvent);
}

// determine support for passive events
export const supportPassive = (() => {
  // Test via a getter in the options object to see if the passive property is accessed
  let result = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        result = true;
      }
    });
    one(document, 'DOMContentLoaded', ()=>{}, opts);
  } catch (e) {}

  return result;
})()

// event options
// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
export const passiveHandler = supportPassive ? { passive: true } : false
