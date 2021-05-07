/* Native JavaScript for Bootstrap 4 | Tab
------------------------------------------ */
import supportTransition from 'shorter-js/src/boolean/supportTransition.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import reflow from 'shorter-js/src/misc/reflow.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v4.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';

// TAB DEFINITION
// ==============

export default function Tab(elem, opsInput) {
  let element;
  // set options
  const options = opsInput || {};

  // bind
  const self = this;

  // event targets
  let tabs;
  let dropdown;

  // custom events
  let showCustomEvent;
  let shownCustomEvent;
  let hideCustomEvent;
  let hiddenCustomEvent;

  // more GC material
  let next;
  let tabsContentContainer = false;
  let activeTab;
  let activeContent;
  let nextContent;
  let containerHeight;
  let equalContents;
  let nextHeight;

  // triggers
  function triggerEnd() {
    tabsContentContainer.style.height = '';
    tabsContentContainer.classList.remove('collapsing');
    tabs.isAnimating = false;
  }
  function triggerShow() {
    if (tabsContentContainer) { // height animation
      if (equalContents) {
        triggerEnd();
      } else {
        setTimeout(() => { // enables height animation
          tabsContentContainer.style.height = `${nextHeight}px`; // height animation
          reflow(tabsContentContainer);
          emulateTransitionEnd(tabsContentContainer, triggerEnd);
        }, 50);
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
    if (showCustomEvent.defaultPrevented) return;

    nextContent.classList.add('active');

    activeContent.classList.remove('active');

    if (tabsContentContainer) {
      nextHeight = nextContent.scrollHeight;
      equalContents = nextHeight === containerHeight;
      tabsContentContainer.classList.add('collapsing');
      tabsContentContainer.style.height = `${containerHeight}px`; // height animation
      reflow(tabsContentContainer);
      activeContent.style.float = '';
      nextContent.style.float = '';
    }

    if (nextContent.classList.contains('fade')) {
      setTimeout(() => {
        nextContent.classList.add('show');
        emulateTransitionEnd(nextContent, triggerShow);
      }, 20);
    } else { triggerShow(); }

    dispatchCustomEvent.call(activeTab, hiddenCustomEvent);
  }
  // private methods
  function getActiveTab() {
    const activeTabs = tabs.getElementsByClassName('active');

    if (activeTabs.length === 1 && !activeTabs[0].parentNode.classList.contains('dropdown')) {
      [activeTab] = activeTabs;
    } else if (activeTabs.length > 1) {
      activeTab = activeTabs[activeTabs.length - 1];
    }
    return activeTab;
  }
  function getActiveContent() { return queryElement(getActiveTab().getAttribute('href')); }
  // handler
  function clickHandler(e) {
    e.preventDefault();
    next = e.currentTarget;
    if (!tabs.isAnimating) self.show();
  }

  // public method
  self.show = () => { // the tab we clicked is now the next tab
    next = next || element;

    if (!next.classList.contains('active')) {
      nextContent = queryElement(next.getAttribute('href')); // this is the actual object, the next tab content to activate
      activeTab = getActiveTab();
      activeContent = getActiveContent();

      hideCustomEvent = bootstrapCustomEvent('hide', 'tab', { relatedTarget: next });
      dispatchCustomEvent.call(activeTab, hideCustomEvent);
      if (hideCustomEvent.defaultPrevented) return;

      tabs.isAnimating = true;
      activeTab.classList.remove('active');
      activeTab.setAttribute('aria-selected', 'false');
      next.classList.add('active');
      next.setAttribute('aria-selected', 'true');

      if (dropdown) {
        if (!element.parentNode.classList.contains('dropdown-menu')) {
          if (dropdown.classList.contains('active')) dropdown.classList.remove('active');
        } else if (!dropdown.classList.contains('active')) dropdown.classList.add('active');
      }

      if (activeContent.classList.contains('fade')) {
        activeContent.classList.remove('show');
        emulateTransitionEnd(activeContent, triggerHide);
      } else { triggerHide(); }
    }
  };
  self.dispose = () => {
    element.removeEventListener('click', clickHandler, false);
    delete element.Tab;
  };

  // INIT
  // initialization element
  element = queryElement(elem);

  // reset on re-init
  if (element.Tab) element.Tab.dispose();

  // DATA API
  const heightData = element.getAttribute('data-height');
  // event targets
  tabs = element.closest('.nav');
  dropdown = tabs && queryElement('.dropdown-toggle', tabs);

  // instance options
  const animateHeight = !(!supportTransition || (options.height === false || heightData === 'false'));

  // set default animation state
  tabs.isAnimating = false;

  // init
  if (!element.Tab) { // prevent adding event handlers twice
    element.addEventListener('click', clickHandler, false);
  }

  if (animateHeight) { tabsContentContainer = getActiveContent().parentNode; }

  // associate target with init object
  element.Tab = self;
}
