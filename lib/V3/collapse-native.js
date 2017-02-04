
/* Native Javascript for Bootstrap 3 | Collapse
-----------------------------------------------*/

// COLLAPSE DEFINITION
// ===================
var Collapse = function( element, options ) {

  // initialization element
  element = queryElement(element);

  // set options
  options = options || {};
  options.duration = parseInt(options.duration || element[getAttribute](dataDuration));

  this[duration] = (isIE && isIE < 10) ? 0 : (options.duration || 300); // default collapse transition duration

  // event targets and constants
  var accordion = null, collapse = null, self = this, 
    isAnimating = false, // when true it will prevent click handlers
    accordionData = element[getAttribute]('data-parent'),

    // component strings
    component = 'collapse',
    collapsed = 'collapsed',

    // private methods
    openAction = function(collapseElement) {
      bootstrapCustomEvent.call(collapseElement, showEvent, component);
      isAnimating = true;
      removeClass(collapseElement,component);
      addClass(collapseElement,collapsing);
      collapseElement.style[height] = '0px';
      setTimeout(function() {
        collapseElement.style[height] = getMaxHeight(collapseElement) + 'px';
      }, 10);
      setTimeout(function() {
        removeClass(collapseElement,collapsing);
        addClass(collapseElement,component);
        addClass(collapseElement,'in');
        collapseElement.style[height] = '';
        isAnimating = false;
        collapseElement[setAttribute](ariaExpanded,'true');
        bootstrapCustomEvent.call(collapseElement, shownEvent, component);
      }, self[duration]);
    },
    closeAction = function(collapseElement) {
      bootstrapCustomEvent.call(collapseElement, hideEvent, component);
      isAnimating = true;
      removeClass(collapseElement,component);
      collapseElement.style[height] = getMaxHeight(collapseElement) + 'px';
      setTimeout(function() {
        addClass(collapseElement,collapsing);
        collapseElement.style[height] = '0px';
      }, 10);
      setTimeout(function() {
        removeClass(collapseElement,collapsing);
        removeClass(collapseElement,'in');
        addClass(collapseElement,component);
        collapseElement.style[height] = '';
        isAnimating = false;
        collapseElement[setAttribute](ariaExpanded,'false');
        bootstrapCustomEvent.call(collapseElement, hiddenEvent, component);
      }, self[duration]);
    },
    getTarget = function() {
      var href = element.href && element[getAttribute]('href'),
        parent = element[getAttribute](dataTarget),
        id = href || ( parent && /#/.test(parent) ) && parent;
      return id && queryElement(id);
    };
  
  // public methods
  this.toggle = function(e) {
    e.preventDefault();
    if (isAnimating) return;
    if (!hasClass(collapse,'in')) { self.show(); } 
    else { self.hide(); }
  };
  this.hide = function() {
    closeAction(collapse);
    addClass(element,collapsed);
  };
  this.show = function() {
    openAction(collapse);
    removeClass(element,collapsed);

    if ( accordion !== null ) {
      var activeCollapses = getElementsByClassName(accordion,component+' in');
      for (var i=0, al=activeCollapses[length]; i<al; i++) {
        if ( activeCollapses[i] !== collapse) closeAction(activeCollapses[i]);
      }
    }
  };

  // init
  if ( !(stringCollapse in element ) ) { // prevent adding event handlers twice
    on(element, clickEvent, this.toggle);
  }
  collapse = getTarget();
  accordion = queryElement(options.parent) || accordionData && getClosest(element, accordionData);
  element[stringCollapse] = this;
};

// COLLAPSE DATA API
// =================
initializeDataAPI(stringCollapse, Collapse, dataToggle);

