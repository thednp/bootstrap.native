/*!
  * Native JavaScript for Bootstrap ScrollSpy v3.0.14 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2020 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ScrollSpy = factory());
}(this, (function () { 'use strict';

  var supportPassive = (function () {
    var result = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function() {
          result = true;
        }
      });
      document.addEventListener('DOMContentLoaded', function wrap(){
        document.removeEventListener('DOMContentLoaded', wrap, opts);
      }, opts);
    } catch (e) {}
    return result;
  })();

  var passiveHandler = supportPassive ? { passive: true } : false;

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

  function getScroll() {
    return {
      y : window.pageYOffset || document.documentElement.scrollTop,
      x : window.pageXOffset || document.documentElement.scrollLeft
    }
  }

  function ScrollSpy(element,options) {
    options = options || {};
    var self = this,
      vars,
      targetData,
      offsetData,
      spyTarget,
      scrollTarget,
      ops = {};
    function updateTargets(){
      var links = spyTarget.getElementsByTagName('A');
      if (vars.length !== links.length) {
        vars.items = [];
        vars.targets = [];
        Array.from(links).map(function (link){
          var href = link.getAttribute('href'),
            targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);
          if ( targetItem ) {
            vars.items.push(link);
            vars.targets.push(targetItem);
          }
        });
        vars.length = links.length;
      }
    }
    function updateItem(index) {
      var item = vars.items[index],
        targetItem = vars.targets[index],
        dropmenu = item.classList.contains('dropdown-item') && item.closest('.dropdown-menu'),
        dropLink = dropmenu && dropmenu.previousElementSibling,
        nextSibling = item.nextElementSibling,
        activeSibling = nextSibling && nextSibling.getElementsByClassName('active').length,
        targetRect = vars.isWindow && targetItem.getBoundingClientRect(),
        isActive = item.classList.contains('active') || false,
        topEdge = (vars.isWindow ? targetRect.top + vars.scrollOffset : targetItem.offsetTop) - ops.offset,
        bottomEdge = vars.isWindow ? targetRect.bottom + vars.scrollOffset - ops.offset
                   : vars.targets[index+1] ? vars.targets[index+1].offsetTop - ops.offset
                   : element.scrollHeight,
        inside = activeSibling || vars.scrollOffset >= topEdge && bottomEdge > vars.scrollOffset;
       if ( !isActive && inside ) {
        item.classList.add('active');
        if (dropLink && !dropLink.classList.contains('active') ) {
          dropLink.classList.add('active');
        }
        dispatchCustomEvent.call(element, bootstrapCustomEvent( 'activate', 'scrollspy', { relatedTarget: vars.items[index] }));
      } else if ( isActive && !inside ) {
        item.classList.remove('active');
        if (dropLink && dropLink.classList.contains('active') && !item.parentNode.getElementsByClassName('active').length ) {
          dropLink.classList.remove('active');
        }
      } else if ( isActive && inside || !inside && !isActive ) {
        return;
      }
    }
    function updateItems() {
      updateTargets();
      vars.scrollOffset = vars.isWindow ? getScroll().y : element.scrollTop;
      vars.items.map(function (l,idx){ return updateItem(idx); });
    }
    function toggleEvents(action) {
      action = action ? 'addEventListener' : 'removeEventListener';
      scrollTarget[action]('scroll', self.refresh, passiveHandler );
      window[action]( 'resize', self.refresh, passiveHandler );
    }
    self.refresh = function () {
      updateItems();
    };
    self.dispose = function () {
      toggleEvents();
      delete element.ScrollSpy;
    };
    element = queryElement(element);
    element.ScrollSpy && element.ScrollSpy.dispose();
    targetData = element.getAttribute('data-target');
    offsetData = element.getAttribute('data-offset');
    spyTarget = queryElement(options.target || targetData);
    scrollTarget = element.offsetHeight < element.scrollHeight ? element : window;
    if (!spyTarget) { return }
    ops.target = spyTarget;
    ops.offset = parseInt(options.offset || offsetData) || 10;
    vars = {};
    vars.length = 0;
    vars.items = [];
    vars.targets = [];
    vars.isWindow = scrollTarget === window;
    if ( !element.ScrollSpy ) {
      toggleEvents(1);
    }
    self.refresh();
    element.ScrollSpy = self;
  }

  return ScrollSpy;

})));
