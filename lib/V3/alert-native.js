
/* Native Javascript for Bootstrap 3 | Alert
-------------------------------------------*/

// ALERT DEFINITION
// ================
var Alert = function( element ) {
  
  // initialization element
  element = queryElement(element);

  // bind, target alert, duration and stuff
  var self = this, component = 'alert',
    alert = getClosest(element,'.'+component),
    triggerHandler = function(){ hasClass(alert,'fade') ? emulateTransitionEnd(alert,transitionEndHandler) : transitionEndHandler(); },
    // handlers
    clickHandler = function(e){
      var eventTarget = e[target];
      eventTarget = eventTarget[hasAttribute](dataDismiss) ? eventTarget : eventTarget[parentNode];
      if (eventTarget && eventTarget[hasAttribute](dataDismiss)) { // we double check the data attribute, it's important
        alert = getClosest(eventTarget,'.'+component);
        element = queryElement('['+dataDismiss+'="'+component+'"]',alert);
        (element === eventTarget || element === eventTarget[parentNode]) && alert && self.close();
      }
    },
    transitionEndHandler = function(){
      bootstrapCustomEvent.call(alert, closedEvent, component);
      off(element, clickEvent, clickHandler); // detach it's listener
      alert[parentNode].removeChild(alert);
    };
  
  // public method
  this.close = function() {
    if ( alert && element && hasClass(alert,inClass) ) {
      bootstrapCustomEvent.call(alert, closeEvent, component);
      removeClass(alert,inClass);
      alert && triggerHandler();
    }
  };

  // init
  if ( !(stringAlert in element ) ) { // prevent adding event handlers twice
    on(element, clickEvent, clickHandler);
  }
  element[stringAlert] = this;
};

// ALERT DATA API
// ==============
initializeDataAPI ( stringAlert, Alert, dataDismiss );

