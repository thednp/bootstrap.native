
/* Native Javascript for Bootstrap 4 | Dropdown
----------------------------------------------*/

// DROPDOWN DEFINITION
// ===================
var Dropdown = function( element, option ) {
    
  // initialization element
  element = queryElement(element);

  // set option
  this.persist = option === true || element[getAttribute]('data-persist') === 'true' || false;

  // constants, event targets, strings
  var self = this,
    parent = element[parentNode],
    component = 'dropdown', open = 'open',
    relatedTarget = null,
    menu = queryElement('.dropdown-menu', parent),

    // preventDefault on empty anchor links
    preventEmptyAnchor = function(anchor){
      (/\#$/.test(anchor.href) || anchor[parentNode] && /\#$/.test(anchor[parentNode].href)) && this[preventDefault](); // should be here to prevent jumps        
    },

    // toggle dismissible events
    toggleDismiss = function(){
      var type = element[open] ? on : off;
      type(DOC, keydownEvent, keyHandler);
      type(DOC, clickEvent, dismissHandler); 
    },

    // handlers
    dismissHandler = function(e) {
      var eventTarget = e[target],
        hasData = eventTarget && (eventTarget[getAttribute](dataToggle) 
                              || eventTarget[parentNode] && getAttribute in eventTarget[parentNode] 
                              && eventTarget[parentNode][getAttribute](dataToggle));
      
      if ( (eventTarget === menu || menu.contains(eventTarget)) && (self.persist || hasData) ) { return; }
      else {
        relatedTarget = eventTarget === element || element.contains(eventTarget) ? element : null;
        hide();
      }
      preventEmptyAnchor.call(e,eventTarget);
    },
    keyHandler = function(e) {
      if ( element[open] && e.which === 27 ) { relatedTarget = null; hide(); }
    },
    clickHandler = function(e) {
      relatedTarget = element;
      show();
      preventEmptyAnchor.call(e,e[target]);
    },

    // private methods
    show = function() {
      bootstrapCustomEvent.call(parent, showEvent, component, relatedTarget);
      addClass(menu,showClass);
      addClass(parent,showClass);
      menu[setAttribute](ariaExpanded,true);
      bootstrapCustomEvent.call(parent, shownEvent, component, relatedTarget);
      element[open] = true;
      off(element, clickEvent, clickHandler);
      setTimeout(function(){ toggleDismiss(); },1);
    },
    hide = function() {
      bootstrapCustomEvent.call(parent, hideEvent, component, relatedTarget);
      removeClass(menu,showClass);
      removeClass(parent,showClass);
      menu[setAttribute](ariaExpanded,false);
      bootstrapCustomEvent.call(parent, hiddenEvent, component, relatedTarget);
      element[open] = false;
      toggleDismiss();
      setTimeout(function(){ on(element, clickEvent, clickHandler); },1);
    };

  // set initial state to closed
  element[open] = false;

  // public methods
  this.toggle = function() {
    if (hasClass(parent,showClass) && element[open]) { hide(); } 
    else { show(); }
  };

  // init
  if ( !(stringDropdown in element) ) { // prevent adding event handlers twice
    menu[setAttribute]('tabindex', '0'); // Fix onblur on Chrome | Safari
    on(element, clickEvent, clickHandler);
  }

  element[stringDropdown] = this;
};

// DROPDOWN DATA API
// =================
initializeDataAPI( stringDropdown, Dropdown, DOC[querySelectorAll]('['+dataToggle+'="dropdown"]') );

