
/* Native JavaScript for Bootstrap 4 | Tab
-----------------------------------------*/

import { supports } from './util/globals.js';
import { hasClass, addClass, removeClass } from './util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off } from './util/event.js';
import { queryElement, getElementsByClassName } from './util/selector.js';
import { supportTransitions, emulateTransitionEnd } from './util/transition.js';

// TAB DEFINITION
// ==============

export default function Tab(element,options) {

  // initialization element
  element = queryElement(element);

  // reset on re-init
  element.Tab && element.Tab.destroy();

  // bind
  const self = this,

    // DATA API
    heightData = element.getAttribute('data-height'),
    // event targets
    tabs = element.closest('.nav'),
    dropdown = tabs && queryElement('.dropdown-toggle',tabs);

  // custom events
  let showCustomEvent,
    shownCustomEvent,
    hideCustomEvent,
    hiddenCustomEvent,

    // more GC material
    next,
    tabsContentContainer = false,
    activeTab,
    activeContent,
    nextContent,
    containerHeight,
    equalContents,
    nextHeight;

  // set options
  options = options || {};
  self.options = {};
  self.options.height = !supportTransitions || (options.height === false || heightData === 'false') ? false : true;

  // triggers
  const
    triggerEnd = () => {
      tabsContentContainer.style.height = '';
      removeClass(tabsContentContainer,'collapsing');
      tabs.isAnimating = false;
    },
    triggerShow = () => {
      if (tabsContentContainer) { // height animation
        if ( equalContents ) {
          triggerEnd();
        } else {
          setTimeout(() => { // enables height animation
            tabsContentContainer.style.height = `${nextHeight}px`; // height animation
            tabsContentContainer.offsetWidth;
            emulateTransitionEnd(tabsContentContainer, triggerEnd);
          },50);
        }
      } else {
        tabs.isAnimating = false; 
      }
      shownCustomEvent = bootstrapCustomEvent('shown', 'tab', activeTab);
      dispatchCustomEvent.call(next, shownCustomEvent);
    },
    triggerHide = () => {
      if (tabsContentContainer) {
        activeContent.style.float = 'left';
        nextContent.style.float = 'left';        
        containerHeight = activeContent.scrollHeight;
      }

      showCustomEvent = bootstrapCustomEvent('show', 'tab', activeTab);
      hiddenCustomEvent = bootstrapCustomEvent('hidden', 'tab', next);

      dispatchCustomEvent.call(next, showCustomEvent);
      if ( showCustomEvent.defaultPrevented ) return;
        
      addClass(nextContent,'active');

      removeClass(activeContent,'active');

      if (tabsContentContainer) {
        nextHeight = nextContent.scrollHeight;
        equalContents = nextHeight === containerHeight;
        addClass(tabsContentContainer,'collapsing');
        tabsContentContainer.style.height = `${containerHeight}px`; // height animation
        tabsContentContainer.offsetHeight;
        activeContent.style.float = '';
        nextContent.style.float = '';
      }

      if ( hasClass(nextContent, 'fade') ) {
        setTimeout(() => {
          addClass(nextContent,'show');
          emulateTransitionEnd(nextContent,triggerShow);
        },20);
      } else { triggerShow(); }

      dispatchCustomEvent.call(activeTab, hiddenCustomEvent);
    },
    // private methods
    getActiveTab = () => {
      const activeTabs = getElementsByClassName(tabs,'active');
      let activeTab;
      if ( activeTabs.length === 1 && !hasClass(activeTabs[0].parentNode,'dropdown') ) {
        activeTab = activeTabs[0];
      } else if ( activeTabs.length > 1 ) {
        activeTab = activeTabs[activeTabs.length-1];
      }
      return activeTab;
    },
    getActiveContent = () => queryElement(getActiveTab().getAttribute('href')),
    // handler 
    clickHandler = e => {
      e.preventDefault();
      next = e.currentTarget;
      !tabs.isAnimating && !hasClass(next,'active') && self.show();
    };

  // public method
  self.show = () => { // the tab we clicked is now the next tab
    next = next || element;
    nextContent = queryElement(next.getAttribute('href')); // this is the actual object, the next tab content to activate
    activeTab = getActiveTab(); 
    activeContent = getActiveContent();

    hideCustomEvent = bootstrapCustomEvent( 'hide', 'tab', next);
    dispatchCustomEvent.call(activeTab, hideCustomEvent);
    if (hideCustomEvent.defaultPrevented) return;    

    tabs.isAnimating = true;
    removeClass(activeTab,'active');
    activeTab.setAttribute('aria-selected','false');
    addClass(next,'active');
    next.setAttribute('aria-selected','true');    

    if ( dropdown ) {
      if ( !hasClass(element.parentNode,'dropdown-menu') ) {
        if (hasClass(dropdown,'active')) removeClass(dropdown,'active');
      } else {
        if (!hasClass(dropdown,'active')) addClass(dropdown,'active');
      }
    }

    if (hasClass(activeContent, 'fade')) {
      removeClass(activeContent,'show');
      emulateTransitionEnd(activeContent, triggerHide);
    } else { triggerHide(); }
  };
  self.destroy = () => {
    off(element, 'click', clickHandler);
    delete element.Tab;
  };

  if (!tabs) return; // invalidate

  // set default animation state
  tabs.isAnimating = false;

  // init
  if ( !element.Tab ) { // prevent adding event handlers twice
    on(element, 'click', clickHandler);
  }

  if (self.options.height) { tabsContentContainer = getActiveContent().parentNode; }

  // associate target with init object
  self.element = element;
  element.Tab = self;
};

// TAB DATA API
// ============
supports.push( [ 'Tab', Tab, '[data-toggle="tab"]' ] );

