
/* Native JavaScript for Bootstrap 3 | Collapse
-----------------------------------------------*/

// COLLAPSE DEFINITION
// ===================
var Collapse = function( element, options ) {

  // initialization element
  element = queryElement(element);

  // set options
  options = options || {};

  // event targets and constants
  var accordion = null, collapse = null, self = this,
    accordionData = element[getAttribute]('data-parent'),
    activeCollapse, activeElement,

    // component strings
    component = 'collapse',
    collapsed = 'collapsed',
    isAnimating = 'isAnimating',

    // custom events
    showCustomEvent = bootstrapCustomEvent(showEvent, component),
    shownCustomEvent = bootstrapCustomEvent(shownEvent, component),
    hideCustomEvent = bootstrapCustomEvent(hideEvent, component),
    hiddenCustomEvent = bootstrapCustomEvent(hiddenEvent, component),

      // private methods
    openAction = function(collapseElement,toggle) {
      dispatchCustomEvent.call(collapseElement, showCustomEvent);
      if ( showCustomEvent[defaultPrevented] ) return;
      collapseElement[isAnimating] = true;
      addClass(collapseElement,collapsing);
      removeClass(collapseElement,component);
      collapseElement[style][height] = collapseElement[scrollHeight] + 'px';
      
      emulateTransitionEnd(collapseElement, function() {
        collapseElement[isAnimating] = false;
        collapseElement[setAttribute](ariaExpanded,'true');
        toggle[setAttribute](ariaExpanded,'true');          
        removeClass(collapseElement,collapsing);
        addClass(collapseElement, component);
        addClass(collapseElement, inClass);
        collapseElement[style][height] = '';
        dispatchCustomEvent.call(collapseElement, shownCustomEvent);
        // if ( shownCustomEvent[defaultPrevented] ) return; // TO BE DECIDED
      });
    },
    closeAction = function(collapseElement,toggle) {
      dispatchCustomEvent.call(collapseElement, hideCustomEvent);
      if ( hideCustomEvent[defaultPrevented] ) return;
      collapseElement[isAnimating] = true;
      collapseElement[style][height] = collapseElement[scrollHeight] + 'px'; // set height first
      removeClass(collapseElement,component);
      removeClass(collapseElement, inClass);
      addClass(collapseElement, collapsing);
      collapseElement[offsetWidth]; // force reflow to enable transition
      collapseElement[style][height] = '0px';
      
      emulateTransitionEnd(collapseElement, function() {
        collapseElement[isAnimating] = false;
        collapseElement[setAttribute](ariaExpanded,'false');
        toggle[setAttribute](ariaExpanded,'false');
        removeClass(collapseElement,collapsing);
        addClass(collapseElement,component);
        collapseElement[style][height] = '';
        dispatchCustomEvent.call(collapseElement, hiddenCustomEvent);
        // if ( hiddenCustomEvent[defaultPrevented] ) return; // TO BE DECIDED
      });
    },
    getTarget = function() {
      var href = element.href && element[getAttribute]('href'),
        parent = element[getAttribute](dataTarget),
        id = href || ( parent && parent.charAt(0) === '#' ) && parent;
      return id && queryElement(id);
    };
  
  // public methods
  this.toggle = function(e) {
    e[preventDefault]();
    if (!hasClass(collapse,inClass)) { self.show(); } 
    else { self.hide(); }
  };
  this.hide = function() {
    if ( collapse[isAnimating] ) return;
    closeAction(collapse,element);
    addClass(element,collapsed);
  };
  this.show = function() {
    if ( accordion ) {
      activeCollapse = queryElement('.'+component+'.'+inClass,accordion);
      activeElement = activeCollapse && (queryElement('['+dataTarget+'="#'+activeCollapse.id+'"]', accordion)
                    || queryElement('[href="#'+activeCollapse.id+'"]',accordion) );
    }

    if ( !collapse[isAnimating] || activeCollapse && !activeCollapse[isAnimating] ) {
      if ( activeElement && activeCollapse !== collapse ) {
        closeAction(activeCollapse,activeElement);
        addClass(activeElement,collapsed); 
      }
      openAction(collapse,element);
      removeClass(element,collapsed);
    }
  };

  // init
  if ( !(stringCollapse in element ) ) { // prevent adding event handlers twice
    on(element, clickEvent, self.toggle);
  }
  collapse = getTarget();
  collapse[isAnimating] = false;  // when true it will prevent click handlers  
  accordion = queryElement(options.parent) || accordionData && getClosest(element, accordionData);
  element[stringCollapse] = self;
};

// COLLAPSE DATA API
// =================
supports[push]( [ stringCollapse, Collapse, '['+dataToggle+'="collapse"]' ] );

