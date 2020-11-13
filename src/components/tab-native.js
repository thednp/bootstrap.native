
/* Native JavaScript for Bootstrap 4 | Tab
------------------------------------------ */
import supportTransition from 'shorter-js/src/boolean/supportTransition.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';

// TAB DEFINITION
// ==============

export default function Tab(element,options) {

  // set options
  options = options || {}

  // bind
  let self = this,

    // DATA API
    heightData,
    // event targets
    tabs, dropdown,

    // custom events
    showCustomEvent,
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
    nextHeight,
    animateHeight;

  // triggers
  function triggerEnd() {
    tabsContentContainer.style.height = '';
    tabsContentContainer.classList.remove('collapsing');
    tabs.isAnimating = false;
  }
  function triggerShow() {
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
    shownCustomEvent = bootstrapCustomEvent('shown', 'tab', { relatedTarget: activeTab });
    dispatchCustomEvent.call(next, shownCustomEvent);
  }
  function triggerHide() {
    if (tabsContentContainer) {
      activeContent.style.float = 'left';
      nextContent.style.float = 'left';        
      containerHeight = activeContent.scrollHeight;
    }

    showCustomEvent = bootstrapCustomEvent('show', 'tab', { relatedTarget: activeTab });
    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'tab', { relatedTarget: next });

    dispatchCustomEvent.call(next, showCustomEvent);
    if ( showCustomEvent.defaultPrevented ) return;
      
    nextContent.classList.add('active');

    activeContent.classList.remove('active');

    if (tabsContentContainer) {
      nextHeight = nextContent.scrollHeight;
      equalContents = nextHeight === containerHeight;
      tabsContentContainer.classList.add('collapsing');
      tabsContentContainer.style.height = `${containerHeight}px`; // height animation
      tabsContentContainer.offsetHeight;
      activeContent.style.float = '';
      nextContent.style.float = '';
    }

    if ( nextContent.classList.contains('fade') ) {
      setTimeout(() => {
        nextContent.classList.add('show');
        emulateTransitionEnd(nextContent,triggerShow);
      },20);
    } else { triggerShow(); }

    dispatchCustomEvent.call(activeTab, hiddenCustomEvent);
  }
  // private methods
  function getActiveTab() {
    let activeTabs = tabs.getElementsByClassName('active'), activeTab;
    if ( activeTabs.length === 1 && !activeTabs[0].parentNode.classList.contains('dropdown') ) {
      activeTab = activeTabs[0];
    } else if ( activeTabs.length > 1 ) {
      activeTab = activeTabs[activeTabs.length-1];
    }
    return activeTab;
  }
  function getActiveContent() { return queryElement(getActiveTab().getAttribute('href')) }
  // handler 
  function clickHandler(e) {
    e.preventDefault();
    next = e.currentTarget;
    !tabs.isAnimating && self.show();
  }

  // public method
  self.show = () => { // the tab we clicked is now the next tab
    next = next || element;

    if (!next.classList.contains('active')) {
      nextContent = queryElement(next.getAttribute('href')); // this is the actual object, the next tab content to activate
      activeTab = getActiveTab(); 
      activeContent = getActiveContent();
  
      hideCustomEvent = bootstrapCustomEvent( 'hide', 'tab', { relatedTarget: next });
      dispatchCustomEvent.call(activeTab, hideCustomEvent);
      if (hideCustomEvent.defaultPrevented) return;
  
  
      tabs.isAnimating = true;
      activeTab.classList.remove('active');
      activeTab.setAttribute('aria-selected','false');
      next.classList.add('active');
      next.setAttribute('aria-selected','true');    
  
      if ( dropdown ) {
        if ( !element.parentNode.classList.contains('dropdown-menu') ) {
          if (dropdown.classList.contains('active')) dropdown.classList.remove('active');
        } else {
          if (!dropdown.classList.contains('active')) dropdown.classList.add('active');
        }
      }
  
      if (activeContent.classList.contains('fade')) {
        activeContent.classList.remove('show');
        emulateTransitionEnd(activeContent, triggerHide);
      } else { triggerHide(); }
    }
  }
  self.dispose = () => {
    element.removeEventListener('click',clickHandler,false);
    delete element.Tab;
  }

  // INIT
  // initialization element
  element = queryElement(element);

  // reset on re-init
  element.Tab && element.Tab.dispose();

  // DATA API
  heightData = element.getAttribute('data-height')
  // event targets
  tabs = element.closest('.nav')
  dropdown = tabs && queryElement('.dropdown-toggle',tabs)

  // instance options
  animateHeight = !supportTransition || (options.height === false || heightData === 'false') ? false : true;

  // set default animation state
  tabs.isAnimating = false;

  // init
  if ( !element.Tab ) { // prevent adding event handlers twice
    element.addEventListener('click',clickHandler,false);
  }

  if (animateHeight) { tabsContentContainer = getActiveContent().parentNode; }

  // associate target with init object
  element.Tab = self;

}

