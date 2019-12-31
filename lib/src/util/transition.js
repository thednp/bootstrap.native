import { one } from 'event.js';

export const supportTransitions = 'webkitTransition' in document.body.style || 'transition' in document.body.style;
export const transitionEndEvent = 'webkitTransition' in document.body.style ? 'webkitTransitionEnd' : 'transitionend';
export const transitionDuration = 'webkitTransition' in document.body.style ? 'webkitTransitionDuration' : 'transitionDuration';

export function getTransitionDurationFromElement (element) {
	let duration = supportTransitions ? window.getComputedStyle(element)[transitionDuration] : 0;
	duration = parseFloat(duration);
	duration = typeof duration === 'number' && !isNaN(duration) ? duration * 1000 : 0;
	return duration; // we take a short offset to make sure we fire on the next frame after animation
}

export function emulateTransitionEnd (element,handler){ // emulateTransitionEnd since 2.0.4
	let called = 0, duration = getTransitionDurationFromElement(element);
	duration ? one(element, transitionEndEvent, function(e){ !called && handler(e), called = 1; })
					 : setTimeout(function() { !called && handler(), called = 1; }, 17);
}