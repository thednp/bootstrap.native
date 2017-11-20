
/* Native Javascript for Bootstrap 3 | Dropdown
----------------------------------------------*/

// DROPDOWN DEFINITION
// ===================
var Dropdown = function( element, option ) {
    
  // initialization element
  element = queryElement(element);

  // set option
  this.persist = option === true || element[getAttribute]('data-persist') === 'true' || false;

  // constants, event targets, strings
  var self = this, tabindex = 'tabindex', children = 'children',
    parent = element[parentNode],
    component = 'dropdown', open = 'open',
    relatedTarget = null,
    menu = queryElement('.dropdown-menu', parent),
    menuItems = (function(){
      var set = nodeListToArray(menu[children]);
      for ( var i=0; i<set[length]; i++ ){
        if ( !set[i][children][length] ) set.splice(i,1);
      }
      return set;
    })(),

    // preventDefault on empty anchor links
    preventEmptyAnchor = function(anchor){
      (/\#$/.test(anchor.href) || anchor[parentNode] && /\#$/.test(anchor[parentNode].href)) 
                               && this[preventDefault]();      
    },

    // toggle dismissible events
    toggleDismiss = function(){
      var type = element[open] ? on : off;
      type(DOC, clickEvent, dismissHandler); 
      type(DOC, keydownEvent, preventScroll);
      type(DOC, keyupEvent, keyHandler);
    },

    // handlers
    dismissHandler = function(e) {
      var eventTarget = e[target], hasData = eventTarget && stringDropdown in eventTarget;
      if ( (eventTarget === menu || menu.contains(eventTarget)) && (self.persist || hasData) ) { return; }
      else {
        relatedTarget = eventTarget === element || element.contains(eventTarget) ? element : null;
        hide();
      }
      preventEmptyAnchor.call(e,eventTarget);
    },
    clickHandler = function(e) {
      relatedTarget = element;
      show();
      preventEmptyAnchor.call(e,e[target]);
    },
    preventScroll = function(e){
      var key = e.which || e.keyCode;
      if( key === 38 || key === 40 ) { e[preventDefault](); }
    },
    keyHandler = function(e){
      var eventTarget = e[target], key = e.which || e.keyCode, 
          activeItem = DOC.activeElement,
          idx = menuItems[indexOf](activeItem[parentNode]);
      
      if ( activeItem[parentNode][parentNode] === menu || activeItem === menu) { // navigate up | down
        idx = key === 38 ? (idx>1?idx-1:0) : key === 40 ? (idx<menuItems[length]-1?idx+1:idx) : idx;
        setFocus(menuItems[idx][children][0]);
      }

      if ( activeItem[parentNode][parentNode] === menu && element[open] && key === 27 ) { // dismiss on ESC
        self.toggle();
        relatedTarget = null;
      }
    },  

    // private methods
    show = function() {
      bootstrapCustomEvent.call(parent, showEvent, component, relatedTarget);
      addClass(parent,open);
      menu[setAttribute](ariaExpanded,true);
      bootstrapCustomEvent.call(parent, shownEvent, component, relatedTarget);
      element[open] = true;
      off(element, clickEvent, clickHandler);
      // focus the first menu item | menu
      menu[getElementsByTagName]('A')[length] ? setFocus( menu[getElementsByTagName]('A')[0] ) 
                                              : setFocus(menu);
      setTimeout(function(){ toggleDismiss(); },1);
    },
    hide = function() {
      bootstrapCustomEvent.call(parent, hideEvent, component, relatedTarget);
      removeClass(parent,open);
      menu[setAttribute](ariaExpanded,false);
      bootstrapCustomEvent.call(parent, hiddenEvent, component, relatedTarget);
      element[open] = false;
      toggleDismiss();
      setFocus(element);
      setTimeout(function(){ on(element, clickEvent, clickHandler); },1);
    };

  // set initial state to closed
  element[open] = false;

  // public methods
  this.toggle = function() {
    if (hasClass(parent,open) && element[open]) { hide(); } 
    else { show(); }
  };

  // init
  if (!(stringDropdown in element)) { // prevent adding event handlers twice
    !tabindex in menu && menu[setAttribute](tabindex, '0'); // Fix onblur on Chrome | Safari
    on(element, clickEvent, clickHandler);
  }

  element[stringDropdown] = this;
};

// DROPDOWN DATA API
// =================
initializeDataAPI( stringDropdown, Dropdown, DOC[querySelectorAll]('['+dataToggle+'="dropdown"]') );

