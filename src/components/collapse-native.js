
/* Native JavaScript for Bootstrap 4 | Collapse
----------------------------------------------- */
import { hasClass, addClass, removeClass } from '../util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off } from '../util/event.js';
import { queryElement } from '../util/selector.js';
import { emulateTransitionEnd } from '../util/transition.js';
import { componentInit } from '../util/misc.js';

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
    if (e && e.target.tagName === 'A') {e.preventDefault();}
    if (!hasClass(collapse,'show')) { self.show(); } 
    else { self.hide(); }
  }
  self.hide = () => {
    if ( collapse.isAnimating ) return;    
    closeAction(collapse,element);
    addClass(element,'collapsed');
  }
  self.show = () => {
    if ( accordion ) {
      activeCollapse = queryElement(`.collapse.show`,accordion);
      activeElement = activeCollapse && (queryElement(`[data-target="#${activeCollapse.id}"]`,accordion)
                    || queryElement(`[href="#${activeCollapse.id}"]`,accordion) );
    }

    if ( !collapse.isAnimating || activeCollapse && !activeCollapse.isAnimating ) {
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
  componentInit(()=>{
  
    // initialization element
    element = queryElement(element);

    // reset on re-init
    element.Collapse && element.Collapse.dispose();

    // DATA API
    const accordionData = element.getAttribute('data-parent')

    // custom events
    showCustomEvent = bootstrapCustomEvent('show', 'collapse')
    shownCustomEvent = bootstrapCustomEvent('shown', 'collapse')
    hideCustomEvent = bootstrapCustomEvent('hide', 'collapse')
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'collapse')

    // determine targets
    collapse = queryElement(options.target || element.getAttribute('data-target') || element.getAttribute('href'));
  
    // invalidate
    // if (!collapse) return;
  
    collapse.isAnimating = false;  
    accordion = element.closest(options.parent || accordionData);
  
    // associations
    collapse && (self.collapse = collapse);
    accordion && (self.options = {}, self.options.parent = accordion);
    // prevent adding event handlers twice
    if ( !element.Collapse ) { 
      on(element, 'click', self.toggle);
    }
  
    // associate target to init object
    self.element = element;
    element.Collapse = self;
  })
}

