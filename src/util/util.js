// summon all utils together and export them to globals for better performance
import {addClass,removeClass,hasClass,mouseClickEvents,mouseHoverEvents,touchEvents,getElementTransitionDuration,emulateTransitionEnd,on,off,one,passiveHandler,queryElement} from 'shorter-js'
import {bootstrapCustomEvent, dispatchCustomEvent} from './event.js'
import {setFocus,styleTip,getScroll} from './misc.js'

// for faster execution
// export this object to global
export const Util = {
	// class
	addClass,
	removeClass,
	hasClass,
	// selector
	queryElement,
	// transition
	getElementTransitionDuration,
	emulateTransitionEnd,
	// event 
	on,
	off,
	one,
	bootstrapCustomEvent,
	dispatchCustomEvent,
	mouseClickEvents,
	mouseHoverEvents,
	touchEvents,
	passiveHandler,
	// misc
	setFocus,
	styleTip,
	getScroll
}