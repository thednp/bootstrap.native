
/* Native JavaScript for Bootstrap 4 | Collapse
-----------------------------------------------*/

import { supports } from './util/globals.js';
import { hasClass, addClass, removeClass } from './util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off } from './util/event.js';
import { queryElement } from './util/selector.js';
import { emulateTransitionEnd } from './util/transition.js';

// COLLAPSE DEFINITION
// ===================

export default function Collapse(element,options) {

  // initialization element
  element = queryElement(element);

  // reset on re-init
  element.Collapse && element.Collapse.dispose();

  // set options
  options = options || {};

  // target practice
  let accordion = null,
      collapse = null,
      activeCollapse,
      activeElement;

  // bind, event targets and constants
  const self = this,
        // DATA API
        accordionData = element.getAttribute('data-parent'),

        // custom events
        showCustomEvent = bootstrapCustomEvent('show', 'collapse'),
        shownCustomEvent = bootstrapCustomEvent('shown', 'collapse'),
        hideCustomEvent = bootstrapCustomEvent('hide', 'collapse'),
        hiddenCustomEvent = bootstrapCustomEvent('hidden', 'collapse'),

  // private methods
  openAction = (collapseElement, toggle) => {
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
  },

  closeAction = (collapseElement, toggle) => {
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
  },

  getTarget = () => {
    const href = element.href && element.getAttribute('href'), 
          parent = element.getAttribute('data-target'), 
          id = href || ( parent && parent.charAt(0) === '#' ) && parent;
    return id && queryElement(id);
  };

  // public methods
  self.toggle = e => {
    e.preventDefault();
    if (!hasClass(collapse,'show')) { self.show(); } 
    else { self.hide(); }
  };
  self.hide = () => {
    if ( collapse.isAnimating ) return;    
    closeAction(collapse,element);
    addClass(element,'collapsed');
  };
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
  };
  self.dispose = () => {
    off(element, 'click', self.toggle);
    delete element.Collapse;
  }

  // init
  // prevent adding event handlers twice
  
  if ( !element.Collapse ) { 
    on(element, 'click', self.toggle);
  }

  // determine targets

  collapse = getTarget();
  collapse.isAnimating = false;  
  accordion = queryElement(options.parent) || accordionData && element.closest(accordionData);

  // associations
  collapse && (self.collapse = collapse);
  accordion && (self.options = {}, self.options.parent = accordion);

  // associate target to init object
  self.element = element;
  element.Collapse = self;

}

