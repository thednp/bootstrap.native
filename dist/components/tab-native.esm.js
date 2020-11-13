/*!
  * Native JavaScript for Bootstrap Tab v3.0.14 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2020 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
var supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

var transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

var transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

var transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

function getElementTransitionDuration(element) {
  var computedStyle = getComputedStyle(element),
      property = computedStyle[transitionProperty],
      duration = supportTransition && property && property !== 'none'
               ? parseFloat(computedStyle[transitionDuration]) : 0;
  return !isNaN(duration) ? duration * 1000 : 0;
}

function emulateTransitionEnd(element,handler){
  var called = 0, duration = getElementTransitionDuration(element);
  duration ? element.addEventListener( transitionEndEvent, function transitionEndWrapper(e){
              !called && handler(e), called = 1;
              element.removeEventListener( transitionEndEvent, transitionEndWrapper);
            })
           : setTimeout(function() { !called && handler(), called = 1; }, 17);
}

function queryElement(selector, parent) {
  var lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}

function bootstrapCustomEvent(eventName, componentName, eventProperties) {
  var OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName, {cancelable: true});
  if (typeof eventProperties !== 'undefined') {
    Object.keys(eventProperties).forEach(function (key) {
      Object.defineProperty(OriginalCustomEvent, key, {
        value: eventProperties[key]
      });
    });
  }
  return OriginalCustomEvent;
}

function dispatchCustomEvent(customEvent){
  this && this.dispatchEvent(customEvent);
}

function Tab(element,options) {
  options = options || {};
  var self = this,
    heightData,
    tabs, dropdown,
    showCustomEvent,
    shownCustomEvent,
    hideCustomEvent,
    hiddenCustomEvent,
    next,
    tabsContentContainer = false,
    activeTab,
    activeContent,
    nextContent,
    containerHeight,
    equalContents,
    nextHeight,
    animateHeight;
  function triggerEnd() {
    tabsContentContainer.style.height = '';
    tabsContentContainer.classList.remove('collapsing');
    tabs.isAnimating = false;
  }
  function triggerShow() {
    if (tabsContentContainer) {
      if ( equalContents ) {
        triggerEnd();
      } else {
        setTimeout(function () {
          tabsContentContainer.style.height = nextHeight + "px";
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
    if ( showCustomEvent.defaultPrevented ) { return; }
    nextContent.classList.add('active');
    activeContent.classList.remove('active');
    if (tabsContentContainer) {
      nextHeight = nextContent.scrollHeight;
      equalContents = nextHeight === containerHeight;
      tabsContentContainer.classList.add('collapsing');
      tabsContentContainer.style.height = containerHeight + "px";
      tabsContentContainer.offsetHeight;
      activeContent.style.float = '';
      nextContent.style.float = '';
    }
    if ( nextContent.classList.contains('fade') ) {
      setTimeout(function () {
        nextContent.classList.add('show');
        emulateTransitionEnd(nextContent,triggerShow);
      },20);
    } else { triggerShow(); }
    dispatchCustomEvent.call(activeTab, hiddenCustomEvent);
  }
  function getActiveTab() {
    var activeTabs = tabs.getElementsByClassName('active'), activeTab;
    if ( activeTabs.length === 1 && !activeTabs[0].parentNode.classList.contains('dropdown') ) {
      activeTab = activeTabs[0];
    } else if ( activeTabs.length > 1 ) {
      activeTab = activeTabs[activeTabs.length-1];
    }
    return activeTab;
  }
  function getActiveContent() { return queryElement(getActiveTab().getAttribute('href')) }
  function clickHandler(e) {
    e.preventDefault();
    next = e.currentTarget;
    !tabs.isAnimating && self.show();
  }
  self.show = function () {
    next = next || element;
    if (!next.classList.contains('active')) {
      nextContent = queryElement(next.getAttribute('href'));
      activeTab = getActiveTab();
      activeContent = getActiveContent();
      hideCustomEvent = bootstrapCustomEvent( 'hide', 'tab', { relatedTarget: next });
      dispatchCustomEvent.call(activeTab, hideCustomEvent);
      if (hideCustomEvent.defaultPrevented) { return; }
      tabs.isAnimating = true;
      activeTab.classList.remove('active');
      activeTab.setAttribute('aria-selected','false');
      next.classList.add('active');
      next.setAttribute('aria-selected','true');
      if ( dropdown ) {
        if ( !element.parentNode.classList.contains('dropdown-menu') ) {
          if (dropdown.classList.contains('active')) { dropdown.classList.remove('active'); }
        } else {
          if (!dropdown.classList.contains('active')) { dropdown.classList.add('active'); }
        }
      }
      if (activeContent.classList.contains('fade')) {
        activeContent.classList.remove('show');
        emulateTransitionEnd(activeContent, triggerHide);
      } else { triggerHide(); }
    }
  };
  self.dispose = function () {
    element.removeEventListener('click',clickHandler,false);
    delete element.Tab;
  };
  element = queryElement(element);
  element.Tab && element.Tab.dispose();
  heightData = element.getAttribute('data-height');
  tabs = element.closest('.nav');
  dropdown = tabs && queryElement('.dropdown-toggle',tabs);
  animateHeight = !supportTransition || (options.height === false || heightData === 'false') ? false : true;
  tabs.isAnimating = false;
  if ( !element.Tab ) {
    element.addEventListener('click',clickHandler,false);
  }
  if (animateHeight) { tabsContentContainer = getActiveContent().parentNode; }
  element.Tab = self;
}

export default Tab;
