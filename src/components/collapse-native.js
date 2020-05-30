
/* Native JavaScript for Bootstrap 4 | Collapse
----------------------------------------------- */
import { hasClass } from 'shorter-js/src/class/hasClass.js';
import { addClass } from 'shorter-js/src/class/addClass.js';
import { removeClass } from 'shorter-js/src/class/removeClass.js';
import { on } from 'shorter-js/src/event/on.js';
import { off } from 'shorter-js/src/event/off.js';
import { emulateTransitionEnd } from 'shorter-js/src/misc/emulateTransitionEnd.js';
import { queryElement } from 'shorter-js/src/misc/queryElement.js';
import { tryWrapper } from 'shorter-js/src/misc/tryWrapper.js';

import { bootstrapCustomEvent, dispatchCustomEvent } from '../util/event.js';

// COLLAPSE DEFINITION
// ===================

export default function Collapse(element,options) {

  // set options
  options = options || {}

  // bind
  let self = this

  // target practice
  let accordion = null,
      collapse = null,
      activeCollapse,
      activeElement,
      // custom events
      showCustomEvent,
      shownCustomEvent,
      hideCustomEvent,
      hiddenCustomEvent;

  // private methods
  function openAction(collapseElement, toggle) {
    dispatchCustomEvent.call(collapseElement, showCustomEvent);
    if ( showCustomEvent.defaultPrevented ) return;
    collapseElement.isAnimating = true;
    addClass(collapseElement,'collapsing');
    removeClass(collapseElement,'collapse');
    collapseElement.style.height = `${collapseElement.scrollHeight}px`;
    
    emulateTransitionEnd(collapseElement, () => {
      collapseElement.isAnimating = false;
      collapseElement.setAttribute('aria-expanded','true');
      toggle.setAttribute('aria-expanded','true');
      removeClass(collapseElement,'collapsing');
      addClass(collapseElement, 'collapse');
      addClass(collapseElement,'show');
      collapseElement.style.height = '';
      dispatchCustomEvent.call(collapseElement, shownCustomEvent);
    });
  }
  function closeAction(collapseElement, toggle) {
    dispatchCustomEvent.call(collapseElement, hideCustomEvent);
    if ( hideCustomEvent.defaultPrevented ) return;
    collapseElement.isAnimating = true;
    collapseElement.style.height = `${collapseElement.scrollHeight}px`; // set height first
    removeClass(collapseElement,'collapse');
    removeClass(collapseElement,'show');
    addClass(collapseElement,'collapsing');
    collapseElement.offsetWidth; // force reflow to enable transition
    collapseElement.style.height = '0px';
    
    emulateTransitionEnd(collapseElement, () => {
      collapseElement.isAnimating = false;
      collapseElement.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-expanded','false');
      removeClass(collapseElement,'collapsing');
      addClass(collapseElement,'collapse');
      collapseElement.style.height = '';
      dispatchCustomEvent.call(collapseElement, hiddenCustomEvent);
    });
  }

  // public methods
  self.toggle = e => {
    if (e && e.target.tagName === 'A' || element.tagName === 'A') {e.preventDefault();}
    if (element.contains(e.target) || e.target === element) {
      if (!hasClass(collapse,'show')) { self.show(); } 
      else { self.hide(); }
    }
  }
  self.hide = () => {
    if ( collapse.isAnimating ) return;    
    closeAction(collapse,element);
    addClass(element,'collapsed');
  }
  self.show = () => {
    if ( accordion ) {
      activeCollapse = accordion.getElementsByClassName(`collapse show`)[0];
      activeElement = activeCollapse && (queryElement(`[data-target="#${activeCollapse.id}"]`,accordion)
                    || queryElement(`[href="#${activeCollapse.id}"]`,accordion) );
    }

    if ( !collapse.isAnimating ) {
      if ( activeElement && activeCollapse !== collapse ) {
        closeAction(activeCollapse,activeElement); 
        addClass(activeElement,'collapsed');
      }
      openAction(collapse,element);
      removeClass(element,'collapsed');
    }
  }
  self.dispose = () => {
    off(element, 'click', self.toggle);
    delete element.Collapse;
  }

  // init
  tryWrapper(()=>{
  
    // initialization element
    element = queryElement(element);

    // reset on re-init
    element.Collapse && element.Collapse.dispose();

    // DATA API
    let accordionData = element.getAttribute('data-parent')

    // custom events
    showCustomEvent = bootstrapCustomEvent('show', 'collapse')
    shownCustomEvent = bootstrapCustomEvent('shown', 'collapse')
    hideCustomEvent = bootstrapCustomEvent('hide', 'collapse')
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'collapse')

    // determine targets
    collapse = queryElement(options.target || element.getAttribute('data-target') || element.getAttribute('href'));
    
    collapse.isAnimating = false;  
    accordion = element.closest(options.parent || accordionData);
  
    // prevent adding event handlers twice
    if ( !element.Collapse ) { 
      on(element, 'click', self.toggle);
    }
  
    // associate target to init object
    element.Collapse = self;
  },"BSN.Collapse")
}

