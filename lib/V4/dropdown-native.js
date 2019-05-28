
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
  var self = this, children = 'children',
    parent = element[parentNode],
    component = 'dropdown', open = 'open',
    relatedTarget = null,
    menu = queryElement('.dropdown-menu', parent),
    menuItems = (function(){
      var set = menu[children], newSet = [];
      for ( var i=0; i<set[length]; i++ ){
        set[i][children][length] && (set[i][children][0].tagName === 'A' && newSet[push](set[i][children][0]));
        set[i].tagName === 'A' && newSet[push](set[i]);
      }
      return newSet;
    })(),

    // preventDefault on empty anchor links
    preventEmptyAnchor = function(anchor){
      (anchor.href && anchor.href.slice(-1) === '#' || anchor[parentNode] && anchor[parentNode].href 
        && anchor[parentNode].href.slice(-1) === '#') && this[preventDefault]();    
    },

    // toggle dismissible events
    toggleDismiss = function(){
      var type = element[open] ? on : off;
      type(DOC, clickEvent, dismissHandler); 
      type(DOC, keydownEvent, preventScroll);
      type(DOC, keyupEvent, keyHandler);
      type(DOC, focusEvent, dismissHandler, true);
    },

    // handlers
    dismissHandler = function(e) {
      var eventTarget = e[target], hasData = eventTarget && (eventTarget[getAttribute](dataToggle) 
                            || eventTarget[parentNode] && getAttribute in eventTarget[parentNode] 
                            && eventTarget[parentNode][getAttribute](dataToggle));
      if ( e.type === focusEvent && (eventTarget === element || eventTarget === menu || menu[contains](eventTarget) ) ) {
        return;
      }
      if ( (eventTarget === menu || menu[contains](eventTarget)) && (self.persist || hasData) ) { return; }
      else {
        relatedTarget = eventTarget === element || element[contains](eventTarget) ? element : null;
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
      var key = e.which || e.keyCode,
        activeItem = DOC.activeElement,
        idx = menuItems[indexOf](activeItem),
        isSameElement = activeItem === element,
        isInsideMenu = menu[contains](activeItem),
        isMenuItem = activeItem[parentNode] === menu || activeItem[parentNode][parentNode] === menu;          

      if ( isMenuItem ) { // navigate up | down
        idx = isSameElement ? 0 
                            : key === 38 ? (idx>1?idx-1:0)
                            : key === 40 ? (idx<menuItems[length]-1?idx+1:idx) : idx;
        menuItems[idx] && setFocus(menuItems[idx]);
      }
      if ( (menuItems[length] && isMenuItem // menu has items
            || !menuItems[length] && (isInsideMenu || isSameElement)  // menu might be a form
            || !isInsideMenu ) // or the focused element is not in the menu at all
            && element[open] && key === 27  // menu must be open
      ) {
        self.toggle();
        relatedTarget = null;
      }
    },

    // private methods
    show = function() {
      bootstrapCustomEvent.call(parent, showEvent, component, relatedTarget);
      addClass(menu,showClass);
      addClass(parent,showClass);
      element[setAttribute](ariaExpanded,true);
      bootstrapCustomEvent.call(parent, shownEvent, component, relatedTarget);
      element[open] = true;
      off(element, clickEvent, clickHandler);
      setTimeout(function(){
        setFocus( menu[getElementsByTagName]('INPUT')[0] || element ); // focus the first input item | element
        toggleDismiss();
      },1);
    },
    hide = function() {
      bootstrapCustomEvent.call(parent, hideEvent, component, relatedTarget);
      removeClass(menu,showClass);
      removeClass(parent,showClass);
      element[setAttribute](ariaExpanded,false);
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
    if (hasClass(parent,showClass) && element[open]) { hide(); } 
    else { show(); }
  };

  // init
  if ( !(stringDropdown in element) ) { // prevent adding event handlers twice
    !tabindex in menu && menu[setAttribute](tabindex, '0'); // Fix onblur on Chrome | Safari
    on(element, clickEvent, clickHandler);
  }

  element[stringDropdown] = self;
};

// DROPDOWN DATA API
// =================
supports[push]( [stringDropdown, Dropdown, '['+dataToggle+'="dropdown"]'] );

