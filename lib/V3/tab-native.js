
/* Native Javascript for Bootstrap 3 | Tab
-----------------------------------------*/

// TAB DEFINITION
// ==============
var Tab = function( element, options ) {

  // initialization element
  element = queryElement(element);

  // DATA API
  var durationData = element[getAttribute](dataDuration),
      heightData = element[getAttribute](dataHeight),
    
      // strings
      component = 'tab', height = 'height', isAnimating = 'isAnimating';

  // set default animation state
  element[isAnimating] = false;

  // set options
  options = options || {};
  this[duration] = (isIE && isIE < 10)  ? 0 : parseInt(options[duration] || durationData) || 150; // default tab transition duration
  this[height] = (isIE && isIE < 10)  ? false : (options[height] || heightData === 'true') || false; // filter legacy browsers

  // bind, event targets
  var self = this, next,
    tabs = getClosest(element,'.nav'),
    tabsContentContainer,
    dropdown = queryElement('.dropdown',tabs);

  // private methods
  var getActiveTab = function() {
      var activeTabs = getElementsByClassName(tabs,active), activeTab;
      if ( activeTabs[length] === 1 && !hasClass(activeTabs[0],'dropdown') ) {
        activeTab = activeTabs[0];
      } else if ( activeTabs[length] > 1 ) {
        activeTab = activeTabs[activeTabs[length]-1];
      }
      return activeTab[getElementsByTagName]('A')[0];
    },
    getActiveContent = function() {
      return queryElement(getActiveTab()[getAttribute]('href'));
    },
    // handler 
    clickHandler = function(e) {
      e.preventDefault();
      next = e[target];
      self.show();
    };

  // public method
  this.show = function() { // the tab we clicked is now the next tab
    var nextContent = queryElement(next[getAttribute]('href')), //this is the actual object, the next tab content to activate
      activeTab = getActiveTab(), activeContent = getActiveContent();
    
    if ( (!activeTab[isAnimating] || !next[isAnimating]) && !hasClass(next[parentNode],active) ) {
      activeTab[isAnimating] = next[isAnimating] = true;
      removeClass(activeTab[parentNode],active);
      addClass(next[parentNode],active);

      if ( dropdown ) {
        if ( !hasClass(element[parentNode][parentNode],'dropdown-menu') ) {
          if (hasClass(dropdown,active)) removeClass(dropdown,active);
        } else {
          if (!hasClass(dropdown,active)) addClass(dropdown,active);
        }
      }
      
      if (tabsContentContainer) tabsContentContainer.style[height] = getMaxHeight(activeContent) + 'px'; // height animation

      bootstrapCustomEvent.call(activeTab, hideEvent, component, next);

      setTimeout(function() {
        removeClass(activeContent,'in');
      }, 10);

      setTimeout(function() {
        if (tabsContentContainer) addClass(tabsContentContainer,collapsing);
        removeClass(activeContent,active);
        addClass(nextContent,active);
        setTimeout(function() {
          addClass(nextContent,'in');
        }, 10);

        bootstrapCustomEvent.call(next, showEvent, component, activeTab);
        bootstrapCustomEvent.call(activeTab, hiddenEvent, component, next);

        if(tabsContentContainer) tabsContentContainer.style[height] = getMaxHeight(nextContent) + 'px'; // height animation
      }, self[duration]*.7);

      setTimeout(function() {
        bootstrapCustomEvent.call(next, shownEvent, component, activeTab);

        if (tabsContentContainer) { // height animation
          removeClass(tabsContentContainer,collapsing);
          tabsContentContainer.style[height] =  ''; 
        }
        activeTab[isAnimating] = next[isAnimating] = false;
      }, self[duration]*1.5);
    }
  };

  // init
  if ( !(stringTab in element) ) { // prevent adding event handlers twice
    on(element, clickEvent, clickHandler);
  }
  if (this[height]) { tabsContentContainer = getActiveContent()[parentNode]; }
  element[stringTab] = this;
};

// TAB DATA API
// ============
initializeDataAPI(stringTab, Tab, dataToggle);

