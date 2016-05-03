// Native Javascript for Bootstrap 3 | Tab
// by dnp_theme

(function(factory){

  // CommonJS/RequireJS and "native" compatibility
  if(typeof module !== "undefined" && typeof exports == "object") {
    // A commonJS/RequireJS environment
    if(typeof window != "undefined") {
      // Window and document exist, so return the factory's return value.
      module.exports = factory();
    } else {
      // Let the user give the factory a Window and Document.
      module.exports = factory;
    }
  } else {
    // Assume a traditional browser.
    window.Tab = factory();
  }

})(function(){

  // TAB DEFINITION
  // ===================
  var Tab = function( element,options ) {
    options = options || {};
    this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false; 
    this.tab = typeof element === 'object' ? element : document.querySelector(element);
    this.tabs = this.tab.parentNode.parentNode;
    this.dropdown = this.tabs.querySelector('.dropdown');
    if ( /dropdown-menu/.test(this.tabs.className) ) {
      this.dropdown = this.tabs.parentNode;
      this.tabs = this.tabs.parentNode.parentNode;
    }
    this.options = options;

    // default tab transition duration
    this.duration = 150;
    this.options.duration = (this.isIE && this.isIE < 10)  ? 0 : (options.duration || this.duration);
    this.init();
  }

  // TAB METHODS
  // ================
  Tab.prototype = {

    init : function() {
      this.actions();
      this.tab.addEventListener('click', this.action, false);
    },

    actions : function() {
      var self = this;

      this.action = function(e) {
        e = e || window.e; e.preventDefault();
        var next = e.target; //the tab we clicked is now the next tab
        var nextContent = document.getElementById(next.getAttribute('href').replace('#','')); //this is the actual object, the next tab content to activate
        var isDropDown = new RegExp('(?:^|\\s)'+ 'dropdown-menu' +'(?!\\S)');
        
        // get current active tab and content
        var activeTab = self.getActiveTab();
        var activeContent = self.getActiveContent();

        if ( !/active/.test(next.parentNode.className) ) {
          // toggle "active" class name
          self.removeClass(activeTab,'active');
          self.addClass(next.parentNode,'active');    
  
          // handle dropdown menu "active" class name    
          if ( self.dropdown ) {
            if ( !(isDropDown.test(self.tab.parentNode.parentNode.className)) ) {
              if (/active/.test(self.dropdown.className)) self.removeClass(self.dropdown,'active');
            } else {
              if (!/active/.test(self.dropdown.className)) self.addClass(self.dropdown,'active');
            }
          }
  
          //1. hide current active content first
          self.removeClass(activeContent,'in');
          
          setTimeout(function() { // console.log(self)
            //2. toggle current active content from view
            self.removeClass(activeContent,'active');
            self.addClass(nextContent,'active');
          }, self.options.duration);
          setTimeout(function() {
            //3. show next active content
            self.addClass(nextContent,'in');
          }, self.options.duration*2);
        }
      },
      this.addClass = function(el,c) {
        if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; }
      },
      this.removeClass = function(el,c) {
        if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,''); }
      },
      this.getActiveTab = function() {
        var activeTabs = this.tabs.querySelectorAll('.active');
        if ( activeTabs.length === 1 && !/dropdown/.test(activeTabs[0].className) ) {
          return activeTabs[0]
        } else if ( activeTabs.length > 1 ) {
          return activeTabs[activeTabs.length-1]
        }
      },
      this.getActiveContent = function() {
        var a = this.getActiveTab().getElementsByTagName('A')[0].getAttribute('href').replace('#','');
        return a && document.getElementById(a)
      }
    }
  }


  // TAB DATA API
  // =================
  var Tabs = document.querySelectorAll("[data-toggle='tab'], [data-toggle='pill']"), tbl = Tabs.length, i=0;
  for ( i;i<tbl;i++ ) {
    var tab = Tabs[i], options = {};
    options.duration = tab.getAttribute('data-duration') && tab.getAttribute('data-duration') || false;
    new Tab(tab,options);
  }

  return Tab;

});
