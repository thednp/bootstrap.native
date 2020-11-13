/*!
  * Native JavaScript for Bootstrap Button v3.0.14 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2020 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
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

function Button(element) {
  var self = this, labels,
      changeCustomEvent = bootstrapCustomEvent('change', 'button');
  function toggle(e) {
    var input,
        label = e.target.tagName === 'LABEL' ? e.target
              : e.target.closest('LABEL') ? e.target.closest('LABEL') : null;
    input = label && label.getElementsByTagName('INPUT')[0];
    if ( !input ) { return; }
    dispatchCustomEvent.call(input, changeCustomEvent);
    dispatchCustomEvent.call(element, changeCustomEvent);
    if ( input.type === 'checkbox' ) {
      if ( changeCustomEvent.defaultPrevented ) { return; }
      if ( !input.checked ) {
        label.classList.add('active');
        input.getAttribute('checked');
        input.setAttribute('checked','checked');
        input.checked = true;
      } else {
        label.classList.remove('active');
        input.getAttribute('checked');
        input.removeAttribute('checked');
        input.checked = false;
      }
      if (!element.toggled) {
        element.toggled = true;
      }
    }
    if ( input.type === 'radio' && !element.toggled ) {
      if ( changeCustomEvent.defaultPrevented ) { return; }
      if ( !input.checked || (e.screenX === 0 && e.screenY == 0) ) {
        label.classList.add('active');
        label.classList.add('focus');
        input.setAttribute('checked','checked');
        input.checked = true;
        element.toggled = true;
        Array.from(labels).map(function (otherLabel){
          var otherInput = otherLabel.getElementsByTagName('INPUT')[0];
          if ( otherLabel !== label && otherLabel.classList.contains('active') )  {
            dispatchCustomEvent.call(otherInput, changeCustomEvent);
            otherLabel.classList.remove('active');
            otherInput.removeAttribute('checked');
            otherInput.checked = false;
          }
        });
      }
    }
    setTimeout( function () { element.toggled = false; }, 50 );
  }
  function keyHandler(e) {
    var key = e.which || e.keyCode;
    key === 32 && e.target === document.activeElement && toggle(e);
  }
  function preventScroll(e) {
    var key = e.which || e.keyCode;
    key === 32 && e.preventDefault();
  }
  function focusToggle(e) {
    if (e.target.tagName === 'INPUT' ) {
      var action = e.type === 'focusin' ? 'add' : 'remove';
      e.target.closest('.btn').classList[action]('focus');
    }
  }
  function toggleEvents(action) {
    action = action ? 'addEventListener' : 'removeEventListener';
    element[action]('click',toggle,false );
    element[action]('keyup',keyHandler,false), element[action]('keydown',preventScroll,false);
    element[action]('focusin',focusToggle,false), element[action]('focusout',focusToggle,false);
  }
  self.dispose = function () {
    toggleEvents();
    delete element.Button;
  };
  element = queryElement(element);
  element.Button && element.Button.dispose();
  labels = element.getElementsByClassName('btn');
  if (!labels.length) { return; }
  if ( !element.Button ) {
    toggleEvents(1);
  }
  element.toggled = false;
  element.Button = self;
  Array.from(labels).map(function (btn){
    !btn.classList.contains('active')
      && queryElement('input:checked',btn)
      && btn.classList.add('active');
    btn.classList.contains('active')
      && !queryElement('input:checked',btn)
      && btn.classList.remove('active');
  });
}

export default Button;
