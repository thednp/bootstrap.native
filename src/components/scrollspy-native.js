
/* Native JavaScript for Bootstrap 4 | ScrollSpy
------------------------------------------------ */
import { hasClass, addClass, removeClass } from '../util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off, passiveHandler } from '../util/event.js';
import { queryElement } from '../util/selector.js';
import { componentInit, getScroll } from '../util/misc.js';

// SCROLLSPY DEFINITION
// ====================

export default function ScrollSpy(element,options) {

  // set options
  options = options || {};

  // bind
  let self = this

  // bind, event targets, constants
  let 
    // DATA API
    targetData,
    offsetData,
    // targets
    spyTarget,
    // determine which is the real scrollTarget
    scrollTarget;

  // private methods
  // populate items and targets
  function updateTargets(){
    const links = spyTarget.getElementsByTagName('A');
    if (self.vars.length !== links.length) {
      // reset arrays
      self.vars.items = [];
      self.vars.targets = [];

      [].slice.call(links).map(link=>{
        const href = link.getAttribute('href'),
          targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);
        if ( targetItem ) {
          self.vars.items.push(link);
          self.vars.targets.push(targetItem);
        }
      })
      self.vars.length = links.length
    }
  }

  // item update
  function updateItem(index) {
    const item = self.vars.items[index], // the menu item targets this element
      targetItem = self.vars.targets[index],
      // parent = hasClass(item,'dropdown-item') ? item.closest('.dropdown-menu')  // child looking up
      //        : hasClass(item,'nav-link')      ? item.closest('.nav') : 0,
      dropmenu = hasClass(item,'dropdown-item') && item.closest('.dropdown-menu'),
      dropLink = dropmenu && dropmenu.previousElementSibling,
      // parentLink = parent && parent.previousElementSibling,
      nextSibling = item.nextElementSibling,
      activeSibling = nextSibling && nextSibling.getElementsByClassName('active').length, // parent looking down
      targetRect = self.vars.isWindow && targetItem.getBoundingClientRect(),
      isActive = hasClass(item,'active') || false,
      topEdge = (self.vars.isWindow ? targetRect.top + self.vars.scrollOffset : targetItem.offsetTop) - self.options.offset,
      bottomEdge = self.vars.isWindow ? targetRect.bottom + self.vars.scrollOffset - self.options.offset 
                 : self.vars.targets[index+1] ? self.vars.targets[index+1].offsetTop - self.options.offset 
                 : element.scrollHeight,
      inside = activeSibling || self.vars.scrollOffset >= topEdge && bottomEdge > self.vars.scrollOffset;

     if ( !isActive && inside ) {
      addClass(item,'active');
      if (dropLink && !hasClass(dropLink,'active') ) {
        addClass(dropLink,'active');
      }
      dispatchCustomEvent.call(element, bootstrapCustomEvent( 'activate', 'scrollspy', self.vars.items[index]));
    } else if ( isActive && !inside ) {
      removeClass(item,'active');

      if (dropLink && hasClass(dropLink,'active') && !item.parentNode.getElementsByClassName('active').length ) {
        removeClass(dropLink,'active');
      }
    } else if ( isActive && inside || !inside && !isActive ) {
      return;
    }
  }
  // update all items
  function updateItems() {
    updateTargets();
    self.vars.scrollOffset = self.vars.isWindow ? getScroll().y : element.scrollTop;
    self.vars.items.map((l,idx)=>updateItem(idx))
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
  componentInit(()=>{

    // initialization element, the element we spy on
    element = queryElement(element);

    // reset on re-init
    element.ScrollSpy && element.ScrollSpy.dispose();

    // event targets, constants   
    // DATA API
    targetData = element.getAttribute('data-target')
    offsetData = element.getAttribute('data-offset')
    // targets
    spyTarget = queryElement(options.target || targetData)
    // determine which is the real scrollTarget
    scrollTarget = element.offsetHeight < element.scrollHeight ? element : window

    if (!spyTarget) return

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

    // prevent adding event handlers twice
    if ( !element.ScrollSpy ) { 
      toggleEvents(on)
    }
    self.refresh()
  
    // associate target with init object
    self.element = element
    element.ScrollSpy = self
  })

}

