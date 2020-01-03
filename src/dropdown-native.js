
/* Native JavaScript for Bootstrap 4 | Dropdown
----------------------------------------------- */

import { setFocus } from './util/misc.js';
import { hasClass, addClass, removeClass } from './util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off } from './util/event.js';
import { queryElement } from './util/selector.js';


// DROPDOWN DEFINITION
// ===================

export default function Dropdown(element,option) {
  
  // initialization element
  element = queryElement(element);

  // reset on re-init
  element.Dropdown && element.Dropdown.dispose();    

  // custom events
  let showCustomEvent,
      shownCustomEvent,
      hideCustomEvent,
      hiddenCustomEvent,
      relatedTarget = null;

  // constants
  const self = this,

    // targets
    parent = element.parentNode,
    menu = queryElement('.dropdown-menu', parent),
    menuItems = (() => {
      const set = menu.children, newSet = [];
      for ( let i=0; i<set.length; i++ ){
        set[i].children.length && (set[i].children[0].tagName === 'A' && newSet.push(set[i].children[0]));
        set[i].tagName === 'A' && newSet.push(set[i]);
      }
      return newSet;
    })(),
    // preventDefault on empty anchor links
    preventEmptyAnchor = function(anchor){
      (anchor.href && anchor.href.slice(-1) === '#' || anchor.parentNode && anchor.parentNode.href 
        && anchor.parentNode.href.slice(-1) === '#') && this.preventDefault();    
    },
    // toggle dismissible events
    toggleDismiss = () => {
      const action = element.open ? on : off;
      action(document, 'click', dismissHandler); 
      action(document, 'keydown', preventScroll);
      action(document, 'keyup', keyHandler);
      action(document, 'focus', dismissHandler, true);
    },
    // handlers
    dismissHandler = e => {
      const eventTarget = e.target,
            hasData = eventTarget && (eventTarget.getAttribute('data-toggle') 
                                  || eventTarget.parentNode && eventTarget.parentNode.getAttribute
                                  && eventTarget.parentNode.getAttribute('data-toggle'));
      if ( e.type === 'focus' && (eventTarget === element || eventTarget === menu || menu.contains(eventTarget) ) ) {
        return;
      }
      if ( (eventTarget === menu || menu.contains(eventTarget)) && (self.options.persist || hasData) ) { return; }
      else {
        relatedTarget = eventTarget === element || element.contains(eventTarget) ? element : null;
        self.hide();
      }
      preventEmptyAnchor.call(e,eventTarget);
    },
    clickHandler = e => {
      relatedTarget = element;
      self.show();
      preventEmptyAnchor.call(e,e.target);
    },
    preventScroll = e => {
      const key = e.which || e.keyCode;
      if( key === 38 || key === 40 ) { e.preventDefault(); }
    },
    keyHandler = ({which, keyCode}) => {
      const key = which || keyCode,
            activeItem = document.activeElement,
            isSameElement = activeItem === element,
            isInsideMenu = menu.contains(activeItem),
            isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu;
      let idx = menuItems.indexOf(activeItem);

      if ( isMenuItem ) { // navigate up | down
        idx = isSameElement ? 0 
                            : key === 38 ? (idx>1?idx-1:0)
                            : key === 40 ? (idx<menuItems.length-1?idx+1:idx) : idx;
        menuItems[idx] && setFocus(menuItems[idx]);
      }
      if ( (menuItems.length && isMenuItem // menu has items
            || !menuItems.length && (isInsideMenu || isSameElement)  // menu might be a form
            || !isInsideMenu ) // or the focused element is not in the menu at all
            && element.open && key === 27  // menu must be open
      ) {
        self.toggle();
        relatedTarget = null;
      }
    };

  // public methods
  self.show = () => {
    showCustomEvent = bootstrapCustomEvent('show', 'dropdown', relatedTarget);
    dispatchCustomEvent.call(parent, showCustomEvent);
    if ( showCustomEvent.defaultPrevented ) return;

    addClass(menu,'show');
    addClass(parent,'show');
    element.setAttribute('aria-expanded',true);
    element.open = true;
    off(element, 'click', clickHandler);
    setTimeout(() => {
      setFocus( menu.getElementsByTagName('INPUT')[0] || element ); // focus the first input item | element
      toggleDismiss();
      shownCustomEvent = bootstrapCustomEvent( 'shown', 'dropdown', relatedTarget);
      dispatchCustomEvent.call(parent, shownCustomEvent);        
    },1);
  }
  self.hide = () => {
    hideCustomEvent = bootstrapCustomEvent('hide', 'dropdown', relatedTarget);
    dispatchCustomEvent.call(parent, hideCustomEvent);
    if ( hideCustomEvent.defaultPrevented ) return;

    removeClass(menu,'show');
    removeClass(parent,'show');
    element.setAttribute('aria-expanded',false);
    element.open = false;
    toggleDismiss();
    setFocus(element);
    setTimeout(() => {
      // only re-attach handler if the init is not disposed
      element.Dropdown && on(element, 'click', clickHandler); 
    },1);

    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'dropdown', relatedTarget);
    dispatchCustomEvent.call(parent, hiddenCustomEvent);
  }
  self.toggle = () => {
    if (hasClass(parent,'show') && element.open) { self.hide(); } 
    else { self.show(); }
  }
  self.dispose = () => {
    if (hasClass(parent,'show') && element.open) { self.hide(); }
    off(element, 'click', clickHandler);
    delete element.Dropdown;
  }

  // init
  // prevent adding event handlers twice
  if ( !element.Dropdown ) { 
    !('tabindex' in menu) && menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome | Safari
    on(element, 'click', clickHandler);
  }

  // set option
  self.options = {};
  self.options.persist = option === true || element.getAttribute('data-persist') === 'true' || false;

  // set initial state to closed
  element.open = false;

  // associate element with init object 
  self.element = element;
  element.Dropdown = self;

}

