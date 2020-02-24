// summon all utils together and export them to globals for better performance
import {getElementTransitionDuration,emulateTransitionEnd} from './transition.js'
import {getElementsByClassName,queryElement} from './selector.js'
import {addClass,removeClass,hasClass} from './class.js'
import {on,off,one,bootstrapCustomEvent, dispatchCustomEvent, passiveHandler} from './event.js'
import {setFocus,styleTip,getScroll} from './misc.js'

// for faster execution, export this object to global
export const Util = {
	// class
	addClass,
	removeClass,
	hasClass,
	// selector
	queryElement,
	getElementsByClassName,
	// transition
	getElementTransitionDuration,
	emulateTransitionEnd,
	// event 
	on,
	off,
	one,
	bootstrapCustomEvent,
	dispatchCustomEvent,
	passiveHandler,
	// misc
	setFocus,
	styleTip,
	getScroll
}