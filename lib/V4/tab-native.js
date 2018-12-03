
/* Native Javascript for Bootstrap 4 | Tab
-----------------------------------------*/

// TAB DEFINITION
// ==============
var Tab = function( element, options ) {

  // initialization element
  element = queryElement(element);

  // DATA API
  var heightData = element[getAttribute](dataHeight),
    
      // strings
      component = 'tab', height = 'height', float = 'float', isAnimating = 'isAnimating';
      
  // set options
  options = options || {};
  this[height] = supportTransitions ? (options[height] || heightData === 'true') : false;

  // bind, event targets
  var self = this, next,
    tabs = getClosest(element,'.nav'),
    tabsContentContainer = false,
    dropdown = tabs && queryElement('.dropdown-toggle',tabs),
    activeTab, activeContent, nextContent, containerHeight, equalContents, nextHeight,
    
    // trigger
    triggerEnd = function(){
      tabsContentContainer[style][height] = '';
      removeClass(tabsContentContainer,collapsing);
      tabs[isAnimating] = false;
    },
    triggerShow = function() {
      if (tabsContentContainer) { // height animation
        if ( equalContents ) {
          triggerEnd();
        } else {
          setTimeout(function(){ // enables height animation
            tabsContentContainer[style][height] = nextHeight + 'px'; // height animation
            tabsContentContainer[offsetWidth];
            emulateTransitionEnd(tabsContentContainer, triggerEnd);
          },50);
        }
      } else {
        tabs[isAnimating] = false; 
      }
      bootstrapCustomEvent.call(next, shownEvent, component, activeTab);
    },
    triggerHide = function() {
      if (tabsContentContainer) {
        activeContent[style][float] = left;
        nextContent[style][float] = left;        
        containerHeight = activeContent[scrollHeight];
      }
        
      addClass(nextContent,active);
      bootstrapCustomEvent.call(next, showEvent, component, activeTab);

      removeClass(activeContent,active);
      bootstrapCustomEvent.call(activeTab, hiddenEvent, component, next);
      
      if (tabsContentContainer) {
        nextHeight = nextContent[scrollHeight];
        equalContents = nextHeight === containerHeight;
        addClass(tabsContentContainer,collapsing);
        tabsContentContainer[style][height] = containerHeight + 'px'; // height animation
        tabsContentContainer[offsetHeight];
        activeContent[style][float] = '';
        nextContent[style][float] = '';
      }

      if ( hasClass(nextContent, 'fade') ) {
        setTimeout(function(){
          addClass(nextContent,showClass);
          emulateTransitionEnd(nextContent,triggerShow);
        },20);
      } else { triggerShow(); }        
    };

  if (!tabs) return; // invalidate

  // set default animation state
  tabs[isAnimating] = false;    
        
  // private methods
  var getActiveTab = function() {
      var activeTabs = getElementsByClassName(tabs,active), activeTab;
      if ( activeTabs[length] === 1 && !hasClass(activeTabs[0][parentNode],'dropdown') ) {
        activeTab = activeTabs[0];
      } else if ( activeTabs[length] > 1 ) {
        activeTab = activeTabs[activeTabs[length]-1];
      }
      return activeTab;
    },
    getActiveContent = function() {
      return queryElement(getActiveTab()[getAttribute]('href'));
    },
    // handler 
    clickHandler = function(e) {
      e[preventDefault]();
      next = e[currentTarget];
      !tabs[isAnimating] && !hasClass(next,active) && self.show();
    };

  // public method
  this.show = function() { // the tab we clicked is now the next tab
    next = next || element;
    nextContent = queryElement(next[getAttribute]('href')); //this is the actual object, the next tab content to activate
    activeTab = getActiveTab(); 
    activeContent = getActiveContent();
    
    tabs[isAnimating] = true;
    removeClass(activeTab,active);
    activeTab[setAttribute](ariaSelected,'false');
    addClass(next,active);
    next[setAttribute](ariaSelected,'true');    

    if ( dropdown ) {
      if ( !hasClass(element[parentNode],'dropdown-menu') ) {
        if (hasClass(dropdown,active)) removeClass(dropdown,active);
      } else {
        if (!hasClass(dropdown,active)) addClass(dropdown,active);
      }
    }
    
    bootstrapCustomEvent.call(activeTab, hideEvent, component, next);

    if (hasClass(activeContent, 'fade')) {
      removeClass(activeContent,showClass);
      emulateTransitionEnd(activeContent, triggerHide);
    } else { triggerHide(); }
  };

  // init
  if ( !(stringTab in element) ) { // prevent adding event handlers twice
    on(element, clickEvent, clickHandler);
  }
  if (self[height]) { tabsContentContainer = getActiveContent()[parentNode]; }
  element[stringTab] = self;
};

// TAB DATA API
// ============
supports[push]( [ stringTab, Tab, '['+dataToggle+'="tab"]' ] );

