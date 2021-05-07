/* Native JavaScript for Bootstrap 4 | Dropdown
----------------------------------------------- */
import queryElement from 'shorter-js/src/misc/queryElement.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v4.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';
import setFocus from '../util/setFocus.js';

// DROPDOWN DEFINITION
// ===================

export default function Dropdown(elem, option) {
  let element;

  // bind
  const self = this;

  // custom events
  let showCustomEvent;
  let shownCustomEvent;
  let hideCustomEvent;
  let hiddenCustomEvent;
  // targets
  let relatedTarget = null;
  let parent; let menu; const menuItems = [];
  // option
  let persist;

  // preventDefault on empty anchor links
  function preventEmptyAnchor(anchor) {
    if ((anchor.href && anchor.href.slice(-1) === '#') || (anchor.parentNode && anchor.parentNode.href
      && anchor.parentNode.href.slice(-1) === '#')) this.preventDefault();
  }
  // toggle dismissible events
  function toggleDismiss() {
    const action = element.open ? 'addEventListener' : 'removeEventListener';
    document[action]('click', dismissHandler, false);
    document[action]('keydown', preventScroll, false);
    document[action]('keyup', keyHandler, false);
    document[action]('focus', dismissHandler, false);
  }
  // handlers
  function dismissHandler(e) {
    const eventTarget = e.target;
    if (!eventTarget.getAttribute) return; // some weird FF bug #409
    const hasData = ((eventTarget && (eventTarget.getAttribute('data-toggle')))
                                || (eventTarget.parentNode && eventTarget.parentNode.getAttribute
                                && eventTarget.parentNode.getAttribute('data-toggle')));
    if (e.type === 'focus' && (eventTarget === element || eventTarget === menu || menu.contains(eventTarget))) {
      return;
    }
    if ((eventTarget === menu || menu.contains(eventTarget)) && (persist || hasData)) { return; }

    relatedTarget = eventTarget === element || element.contains(eventTarget) ? element : null;
    self.hide();

    preventEmptyAnchor.call(e, eventTarget);
  }
  function clickHandler(e) {
    relatedTarget = element;
    self.show();
    preventEmptyAnchor.call(e, e.target);
  }
  function preventScroll(e) {
    const key = e.which || e.keyCode;
    if (key === 38 || key === 40) { e.preventDefault(); }
  }
  function keyHandler(e) {
    const key = e.which || e.keyCode;
    const activeItem = document.activeElement;
    const isSameElement = activeItem === element;
    const isInsideMenu = menu.contains(activeItem);
    const isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu;
    let idx = menuItems.indexOf(activeItem);

    if (isMenuItem) { // navigate up | down
      if (isSameElement) {
        idx = 0;
      } else if (key === 38) {
        idx = idx > 1 ? idx - 1 : 0;
      } else if (key === 40) {
        idx = idx < menuItems.length - 1 ? idx + 1 : idx;
      }

      if (menuItems[idx]) setFocus(menuItems[idx]);
    }
    if (((menuItems.length && isMenuItem) // menu has items
          || (!menuItems.length && (isInsideMenu || isSameElement)) // menu might be a form
          || !isInsideMenu) // or the focused element is not in the menu at all
          && element.open && key === 27 // menu must be open
    ) {
      self.toggle();
      relatedTarget = null;
    }
  }

  // public methods
  self.show = () => {
    showCustomEvent = bootstrapCustomEvent('show', 'dropdown', { relatedTarget });
    dispatchCustomEvent.call(parent, showCustomEvent);
    if (showCustomEvent.defaultPrevented) return;

    menu.classList.add('show');
    parent.classList.add('show');
    element.setAttribute('aria-expanded', true);
    element.open = true;
    element.removeEventListener('click', clickHandler, false);
    setTimeout(() => {
      setFocus(menu.getElementsByTagName('INPUT')[0] || element); // focus the first input item | element
      toggleDismiss();
      shownCustomEvent = bootstrapCustomEvent('shown', 'dropdown', { relatedTarget });
      dispatchCustomEvent.call(parent, shownCustomEvent);
    }, 1);
  };
  self.hide = () => {
    hideCustomEvent = bootstrapCustomEvent('hide', 'dropdown', { relatedTarget });
    dispatchCustomEvent.call(parent, hideCustomEvent);
    if (hideCustomEvent.defaultPrevented) return;

    menu.classList.remove('show');
    parent.classList.remove('show');
    element.setAttribute('aria-expanded', false);
    element.open = false;
    toggleDismiss();
    setFocus(element);
    setTimeout(() => {
      // only re-attach handler if the init is not disposed
      if (element.Dropdown) element.addEventListener('click', clickHandler, false);
    }, 1);

    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'dropdown', { relatedTarget });
    dispatchCustomEvent.call(parent, hiddenCustomEvent);
  };
  self.toggle = () => {
    if (parent.classList.contains('show') && element.open) { self.hide(); } else { self.show(); }
  };
  self.dispose = () => {
    if (parent.classList.contains('show') && element.open) { self.hide(); }
    element.removeEventListener('click', clickHandler, false);
    delete element.Dropdown;
  };

  // init

  // initialization element
  element = queryElement(elem);

  // reset on re-init
  if (element.Dropdown) element.Dropdown.dispose();

  // set  targets
  parent = element.parentNode;
  menu = queryElement('.dropdown-menu', parent);

  Array.from(menu.children).forEach((child) => {
    if (child.children.length && child.children[0].tagName === 'A') {
      menuItems.push(child.children[0]);
    }
    if (child.tagName === 'A') menuItems.push(child);
  });

  // prevent adding event handlers twice
  if (!element.Dropdown) {
    if (!('tabindex' in menu)) menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome | Safari
    element.addEventListener('click', clickHandler, false);
  }

  // set option
  persist = option === true || element.getAttribute('data-persist') === 'true' || false;

  // set initial state to closed
  element.open = false;

  // associate element with init object
  element.Dropdown = self;
}
