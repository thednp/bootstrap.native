
/* Native JavaScript for Bootstrap 4 | Alert
-------------------------------------------*/

// ALERT DEFINITION
// ================
var Alert = function( element ) {
  
  // initialization element
  element = queryElement(element);

  // bind, target alert, duration and stuff
  var self = element[stringAlert] || this, component = 'alert',
    // custom events
    closeCustomEvent = bootstrapCustomEvent(closeEvent, component),
    closedCustomEvent = bootstrapCustomEvent(closedEvent, component),
    alert = getClosest(element,'.'+component),
    triggerHandler = function(){ hasClass(alert,'fade') ? emulateTransitionEnd(alert,transitionEndHandler) : transitionEndHandler(); },
    // handlers
    clickHandler = function(e){
      alert = getClosest(e[target],'.'+component);
      element = queryElement('['+dataDismiss+'="'+component+'"]',alert);
      element && alert && (element === e[target] || element[contains](e[target])) && self.close();
    },
    transitionEndHandler = function(){
      off(element, clickEvent, clickHandler); // detach it's listener
      alert[parentNode].removeChild(alert);
      dispatchCustomEvent.call(alert,closedCustomEvent);
    };
  
  // public method
  self.close = function() {
    if ( alert && element && hasClass(alert,showClass) ) {
      dispatchCustomEvent.call(alert,closeCustomEvent);
      if ( closeCustomEvent[defaultPrevented] ) return;
      self.destroy();
    }
  };
  self.destroy = function() {
    removeClass(alert,showClass);
    alert && triggerHandler();
    off(element, clickEvent, clickHandler);
    delete element[stringAlert];
  };

  // init
  if ( !(stringAlert in element ) ) { // prevent adding event handlers twice
    on(element, clickEvent, clickHandler);
  }
  element[stringAlert] = self;
};

// ALERT DATA API
// ==============
supports[push]([stringAlert, Alert, '['+dataDismiss+'="alert"]']);

