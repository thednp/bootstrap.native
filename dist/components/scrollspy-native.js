/*!
  * Native JavaScript for Bootstrap ScrollSpy v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScrollSpy = factory());
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

  function bootstrapCustomEvent( eventType, componentName, eventProperties ) {
    var OriginalCustomEvent = new CustomEvent( eventType + '.bs.' + componentName, { cancelable: true } );
    if ( typeof eventProperties !== 'undefined' ) {
      Object.keys( eventProperties ).forEach( function (key) {
        Object.defineProperty( OriginalCustomEvent, key, {
          value: eventProperties[key]
        });
      });
    }
    return OriginalCustomEvent
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
      vars, links,
      targetData,
      offsetData,
      spyTarget,
      scrollTarget,
      ops = {};
    function updateTargets(){
      links = spyTarget.getElementsByTagName( 'A' );
      vars.scrollTop = vars.isWindow ? getScroll().y : element.scrollTop;
      if ( vars.length !== links.length || getScrollHeight() !== vars.scrollHeight ) {
        var href, targetItem, rect;
        vars.items = [];
        vars.offsets = [];
        vars.scrollHeight = getScrollHeight();
        vars.maxScroll = vars.scrollHeight - getOffsetHeight();
        Array.from( links ).map( function (link) {
          href = link.getAttribute( 'href' );
          targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement( href );
          if ( targetItem ) {
            vars.items.push( link );
            rect = targetItem.getBoundingClientRect();
            vars.offsets.push( ( vars.isWindow ? rect.top + vars.scrollTop : targetItem.offsetTop ) - ops.offset );
          }
        });
        vars.length = vars.items.length;
      }
    }
    function toggleEvents(action) {
      action = action ? 'addEventListener' : 'removeEventListener';
      scrollTarget[action]( 'scroll', self.refresh, passiveHandler );
      window[action]( 'resize', self.refresh, passiveHandler );
    }
    function getScrollHeight(){
      return scrollTarget.scrollHeight || Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight)
    }
    function getOffsetHeight(){
      return !vars.isWindow ? element.getBoundingClientRect().height : window.innerHeight
    }
    function clear(){
      Array.from( links ).map( function (item) { return item.classList.contains( 'active' ) && item.classList.remove( 'active' ); } );
    }
    function activate( item ){
      clear();
      vars.activeItem = item;
      item.classList.add( 'active' );
      var parents = [];
      while (item.parentNode !== document.body) {
        item = item.parentNode;
        [ 'dropdown-menu', 'nav' ].some( function (pc) { return item.classList.contains( pc ); } ) && parents.push(item);
      }
      parents.map( function (menuItem) {
        var parentLink = menuItem.previousElementSibling;
        if ( parentLink && !parentLink.classList.contains( 'active' ) ) {
          parentLink.classList.add( 'active' );
        }
      });
      dispatchCustomEvent.call( element, bootstrapCustomEvent( 'activate', 'scrollspy', { relatedTarget: vars.activeItem } ) );
    }
    self.refresh = function () {
      updateTargets();
      if ( vars.scrollTop >= vars.maxScroll ) {
        var newActiveItem = vars.items[vars.length - 1];
        if ( vars.activeItem !== newActiveItem ) {
          activate( newActiveItem );
        }
        return
      }
      if ( vars.activeItem && vars.scrollTop < vars.offsets[0] && vars.offsets[0] > 0 ) {
        vars.activeItem = null;
        clear();
        return
      }
      for ( var i = vars.length; i--; ) {
        if ( vars.activeItem !== vars.items[i] && vars.scrollTop >= vars.offsets[i]
          && (typeof vars.offsets[i + 1] === 'undefined' || vars.scrollTop < vars.offsets[i + 1] ) ) {
            activate( vars.items[i] );
        }
      }
    };
    self.dispose = function () {
      toggleEvents();
      delete element.ScrollSpy;
    };
    element = queryElement(element);
    element.ScrollSpy && element.ScrollSpy.dispose();
    targetData = element.getAttribute( 'data-target' );
    offsetData = element.getAttribute( 'data-offset' );
    spyTarget = queryElement( options.target || targetData );
    scrollTarget = element.clientHeight < element.scrollHeight ? element : window;
    if ( !spyTarget ) { return }
    ops.offset = +(options.offset || offsetData) || 10;
    vars = {};
    vars.length = 0;
    vars.items = [];
    vars.offsets = [];
    vars.isWindow = scrollTarget === window;
    vars.activeItem = null;
    vars.scrollHeight = 0;
    vars.maxScroll = 0;
    !element.ScrollSpy && toggleEvents(1);
    self.refresh();
    element.ScrollSpy = self;
  }

  return ScrollSpy;

})));
