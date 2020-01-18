
/* Native JavaScript for Bootstrap 4 | ScrollSpy
------------------------------------------------ */

import { hasClass, addClass, removeClass } from './util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off, passiveHandler } from './util/event.js';
import { queryElement } from './util/selector.js';
import { getScroll } from './util/misc.js';

// SCROLLSPY DEFINITION
// ====================

export default function ScrollSpy(element,options) {

  // initialization element, the element we spy on
  element = queryElement(element);

  // reset on re-init
  element.ScrollSpy && element.ScrollSpy.dispose();

  // set options
  options = options || {};

  // bind, event targets, constants
  const 
    self = this,
    // DATA API
    targetData = element.getAttribute('data-target'),
    offsetData = element.getAttribute('data-offset'),
    // targets
    spyTarget = queryElement(options.target || targetData),
    // determine which is the real scrollTarget
    scrollTarget = element.offsetHeight < element.scrollHeight ? element : window;

  if (!spyTarget) return;

  // set instance options
  self.options = {};
  self.options.target = spyTarget;
  self.options.offset = parseInt(options.offset || offsetData) || 10;

  // set instance priority variables
  self.vars = {}
  self.vars.length = 0
  self.vars.items = []
  self.vars.targets = []
  self.vars.isWindow = scrollTarget === window

  // private methods
  // populate items and targets
  function updateTargets(){
    const links = spyTarget.getElementsByTagName('A');
    if (self.vars.length !== links.length) {
      // reset arrays
      self.vars.items = []
      self.vars.targets = []
      for (let i=0, il=links.length; i<il; i++) {
        const href = links[i].getAttribute('href'),
          targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);
        if ( targetItem ) {
          self.vars.items.push(links[i]);
          self.vars.targets.push(targetItem);
        }
      }
      self.vars.length = links.length
    }
  }

  // item update
  function updateItem(index) {
    const item = self.vars.items[index], // the menu item targets this element
      targetItem = self.vars.targets[index],
      dropdown = item.parentNode.parentNode,
      dropdownLink = hasClass(dropdown,'dropdown') && dropdown.getElementsByTagName('A')[0],
      parentNav = item.closest('.nav-item'),
      navLink = parentNav && parentNav.contains(item) && parentNav.getElementsByTagName('A')[0],
      targetRect = self.vars.isWindow && targetItem.getBoundingClientRect(),
      isActive = hasClass(item,'active') || false,
      topEdge = (self.vars.isWindow ? targetRect.top + self.vars.scrollOffset : targetItem.offsetTop) - self.options.offset,
      bottomEdge = self.vars.isWindow ? targetRect.bottom + self.vars.scrollOffset - self.options.offset : self.vars.targets[index+1] ? self.vars.targets[index+1].offsetTop - self.options.offset : element.scrollHeight,
      inside = self.vars.scrollOffset >= topEdge && bottomEdge > self.vars.scrollOffset;

    if ( !isActive && inside ) {
      addClass(item,'active');
      if (dropdownLink && !hasClass(dropdownLink,'active') ) {
        addClass(dropdownLink,'active');
      }
      if (navLink && !hasClass(navLink,'active') ) {
        addClass(navLink,'active');
      }
      dispatchCustomEvent.call(element, bootstrapCustomEvent( 'activate', 'scrollspy', self.vars.items[index]));
    } else if ( isActive && !inside ) {
      removeClass(item,'active');
      if (dropdownLink && hasClass(dropdownLink,'active') && !item.parentNode.getElementsByClassName('active').length ) {
        removeClass(dropdownLink,'active');
      }
      if (navLink && hasClass(navLink,'active') && !item.parentNode.getElementsByClassName('active').length ) {
        removeClass(navLink,'active');
      }
    } else if ( !inside && !isActive || isActive && inside ) {
      return;
    }
  }
  // update all items
  function updateItems() {
    updateTargets();
    self.vars.scrollOffset = self.vars.isWindow ? getScroll().y : element.scrollTop;
    for (let i=0, itl=self.vars.items.length; i<itl; i++) {
      updateItem(i);
    }
  }
  function toggleEvents(action) {
    action( scrollTarget, 'scroll', self.refresh, passiveHandler );
    action( window, 'resize', self.refresh, passiveHandler );
  }

  // public method
  self.refresh = () => {
    updateItems();
  }
  self.dispose = () => {
    toggleEvents(off);
    delete element.ScrollSpy;
  }

  // init
  if ( !element.ScrollSpy ) { // prevent adding event handlers twice
    toggleEvents(on);
  }
  self.refresh();

  // associate target with init object
  self.element = element;
  element.ScrollSpy = self;

}

