export function getElementsByClassName (element,classNAME) { // returns Array
	return [].slice.call(element.getElementsByClassName( classNAME ));
}

export default function queryElement (selector, parent) {
	var lookUp = parent ? parent : document;
	return selector instanceof Element ? selector : lookUp.querySelector(selector);
}