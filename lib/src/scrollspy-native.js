
/* Native JavaScript for Bootstrap 4 | ScrollSpy
-----------------------------------------------*/

// IMPORTS
import { supports } from './util/globals.js';
import { hasClass, addClass, removeClass } from './util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off, passiveHandler } from './util/event.js';
import { queryElement, getElementsByClassName } from './util/selector.js';
import { getScroll } from './util/misc.js';

// SCROLLSPY DEFINITION
// ====================
export default class ScrollSpy {

  constructor (element,options){

    // initialization element, the element we spy on
    element = queryElement(element);

    // reset on re-init
    element.ScrollSpy && element.ScrollSpy.destroy();

    // set options
    options = options || {};

    // bind, event targets, constants
    const 
      self = this,
      // DATA API
      targetData = queryElement(element.getAttribute('data-target')),
      offsetData = element.getAttribute('data-offset'),
      spyTarget = options.target && queryElement(options.target) || targetData,
      links = spyTarget && spyTarget.getElementsByTagName('A'),
      offset = parseInt(options.offset || offsetData) || 10,
      // determine which is the real scrollTarget
      scrollTarget = element.offsetHeight < element.scrollHeight ? element : window,
      isWindow = scrollTarget === window;

    let 
      items = [],
      targetItems = [],
      scrollOffset;

    // populate items and targets
    for (let i=0, il=links.length; i<il; i++) {
      const href = links[i].getAttribute('href'),
        targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);
      if ( targetItem ) {
        items.push(links[i]);
        targetItems.push(targetItem);
      }
    }

    // set instance options
    self.options = {};
    self.options.target = spyTarget;
    self.options.offset = offset;

    // private methods
    const 
      updateItem = index => {
        const 
          item = items[index], // the menu item targets this element
          targetItem = targetItems[index],
          dropdown = item.parentNode.parentNode,
          dropdownLink = hasClass(dropdown,'dropdown') && dropdown.getElementsByTagName('A')[0],
          targetRect = isWindow && targetItem.getBoundingClientRect(),
          isActive = hasClass(item,'active') || false,
          topEdge = (isWindow ? targetRect.top + scrollOffset : targetItem.offsetTop) - self.options.offset,
          bottomEdge = isWindow ? targetRect.bottom + scrollOffset - self.options.offset : targetItems[index+1] ? targetItems[index+1].offsetTop - self.options.offset : element.scrollHeight,
          inside = scrollOffset >= topEdge && bottomEdge > scrollOffset;

        if ( !isActive && inside ) {
          if ( !hasClass(item,'active') ) {
            addClass(item,'active');
            if (dropdownLink && !hasClass(dropdownLink,'active') ) {
              addClass(dropdownLink,'active');
            }
            dispatchCustomEvent.call(element, bootstrapCustomEvent( 'activate', 'scrollspy', items[index]));
          }
        } else if ( !inside ) {
          if ( hasClass(item,'active') ) {
            removeClass(item,'active');
            if (dropdownLink && hasClass(dropdownLink,'active') && !getElementsByClassName(item.parentNode,'active').length  ) {
              removeClass(dropdownLink,'active');
            }
          }
        } else if ( !inside && !isActive || isActive && inside ) {
          return;
        }
      },
      toggleEvents = action => {
        action( scrollTarget, 'scroll', self.refresh, passiveHandler );
        action( window, 'resize', self.refresh, passiveHandler );
      },
      updateItems = () => {
        scrollOffset = isWindow ? getScroll().y : element.scrollTop;
        for (let i=0, itl=items.length; i<itl; i++) {
          updateItem(i);
        }
      };

    // public method
    self.refresh = () => {
      updateItems();
    }
    self.destroy = () => {
      toggleEvents(off);
      delete element.ScrollSpy;
    }

    // invalidate
    if ( !self.options.target ) { return; }

    // init
    if ( !element.ScrollSpy ) { // prevent adding event handlers twice
      toggleEvents(on);
    }
    self.refresh();

    // associate target with init object
    self.element = element;
    element.ScrollSpy = self;
  }
};

// SCROLLSPY DATA API
// ==================
supports.push( [ 'ScrollSpy', ScrollSpy, '[data-spy="scroll"]' ] );

