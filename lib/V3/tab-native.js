
/* Native Javascript for Bootstrap 3 | Tab
-----------------------------------------*/

// TAB DEFINITION
// ==============
var Tab = function( element, options ) {

  // initialization element
  element = queryElement(element);

  // DATA API
  var heightData = element[getAttribute](dataHeight),
    
      // strings
      component = 'tab', height = 'height', isAnimating = 'isAnimating';

  // set default animation state
  element[isAnimating] = false;

  // set options
  options = options || {};
  this[height] = supportTransitions ? (options[height] || heightData === 'true') : false; // filter legacy browsers

  // bind, event targets
  var self = this, next,
    tabs = getClosest(element,'.nav'),
    tabsContentContainer = false,
    dropdown = tabs && queryElement('.dropdown',tabs),
    activeTab, activeContent, nextContent, containerHeight,

    // trigger
    triggerEnd = function(){
      tabsContentContainer[style][height] = '';
      activeContent[style].float = '';
      nextContent[style].float = '';
      removeClass(tabsContentContainer,collapsing);
      activeTab[isAnimating] = next[isAnimating] = false;
    },
    triggerShow = function() {
      if (tabsContentContainer) { // height animation
        console.log( Math.max(nextContent[scrollHeight],nextContent[offsetHeight],nextContent[clientHeight]) + ' ' 
        + Math.max( tabsContentContainer[offsetHeight], tabsContentContainer[scrollHeight], tabsContentContainer[clientHeight] ) )

        if ( nextContent[scrollHeight] !== containerHeight ) {
          nextContent[style].float = 'left';
          
          tabsContentContainer[style][height] = nextContent[scrollHeight] + 'px'; // height animation
          containerHeight = tabsContentContainer[scrollHeight]; // update new containerHeight value          
          
          setTimeout(function(){
            tabsContentContainer[offsetWidth];            
            emulateTransitionEnd(tabsContentContainer, triggerEnd);
          },1);
        } else { triggerEnd(); }
      } else {
        activeTab[isAnimating] = next[isAnimating] = false; 
      }
      bootstrapCustomEvent.call(next, shownEvent, component, activeTab);
    },
    triggerHide = function() {
      activeContent[style].float = 'left';
      containerHeight = activeContent[scrollHeight];
      
      addClass(nextContent,active);
      bootstrapCustomEvent.call(next, showEvent, component, activeTab);

      removeClass(activeContent,active);
      bootstrapCustomEvent.call(activeTab, hiddenEvent, component, next);
      
      if (tabsContentContainer) {
        addClass(tabsContentContainer,collapsing);
        
        tabsContentContainer[style][height] = containerHeight + 'px'; // height animation
        tabsContentContainer[offsetWidth];          
      }
      if ( hasClass(nextContent, 'fade') ) {
        setTimeout(function(){
          addClass(nextContent,inClass);
          nextContent[offsetWidth];          
          emulateTransitionEnd(nextContent,triggerShow);
        },1);
      } else { triggerShow(); }        
    };

  if (!tabs) return; // invalidate 

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
      next = e[target][getAttribute](dataToggle) === component || targetsReg.test(e[target][getAttribute]('href')) 
           ? e[target] : e[target][parentNode]; // allow for child elements like icons to use the handler
      self.show();
    };

  // public method
  this.show = function() { // the tab we clicked is now the next tab
    next = next || element;
    nextContent = queryElement(next[getAttribute]('href')); //this is the actual object, the next tab content to activate
    activeTab = getActiveTab(); 
    activeContent = getActiveContent();

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
      
      bootstrapCustomEvent.call(activeTab, hideEvent, component, next);
      
      if (hasClass(activeContent, 'fade')) {
        removeClass(activeContent,inClass);
        activeContent[offsetWidth];
        emulateTransitionEnd(activeContent, triggerHide);
      } else { triggerHide(); }
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

