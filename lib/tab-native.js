// Native Javascript for Bootstrap 3 | Tab
// by dnp_theme

// TAB DEFINITION
// ===================
var Tab = function( element,options ) {
  options = options || {};
  this.tab = typeof element === 'object' ? element : document.querySelector(element);
  this.tabs = this.tab.parentNode.parentNode;
  this.dropdown = this.tabs.querySelector('.dropdown');
  if ( /\bdropdown-menu/.test(this.tabs.className) ) {
    this.dropdown = this.tabs.parentNode;
    this.tabs = this.tabs.parentNode.parentNode;
  }
  this.options = options;

  // default tab transition duration
  this.duration = 150;
  this.options.duration = (isIE && isIE < 10)  ? 0 : (options.duration || this.duration);

  var self = this;

  this.handle = function(e) {
    e = e || window.e; e.preventDefault();
    var next = e.target; //the tab we clicked is now the next tab
    var nextContent = document.getElementById(next.getAttribute('href').replace('#','')); //this is the actual object, the next tab content to activate

    // get current active tab and content
    var activeTab = self.getActiveTab();
    var activeContent = self.getActiveContent();

    if ( !/\bactive/.test(next.parentNode.className) ) {
      // toggle "active" class name
      removeClass(activeTab,'active');
      addClass(next.parentNode,'active');

      // handle dropdown menu "active" class name
      if ( self.dropdown ) {
        if ( !(/\bdropdown-menu/.test(self.tab.parentNode.parentNode.className)) ) {
          if (/\bactive/.test(self.dropdown.className)) removeClass(self.dropdown,'active');
        } else {
          if (!/\bactive/.test(self.dropdown.className)) addClass(self.dropdown,'active');
        }
      }

      //1. hide current active content first
      removeClass(activeContent,'in');

      setTimeout(function() {
        //2. toggle current active content from view
        removeClass(activeContent,'active');
        addClass(nextContent,'active');
      }, self.options.duration);
      setTimeout(function() {
        //3. show next active content
        addClass(nextContent,'in');
      }, self.options.duration*2);
    }
  };
  this.getActiveTab = function() {
    var activeTabs = this.tabs.querySelectorAll('.active');
    if ( activeTabs.length === 1 && !/\bdropdown/.test(activeTabs[0].className) ) {
      return activeTabs[0]
    } else if ( activeTabs.length > 1 ) {
      return activeTabs[activeTabs.length-1]
    }
  };
  this.getActiveContent = function() {
    var active = this.getActiveTab().getElementsByTagName('A')[0].getAttribute('href').replace('#','');
    return active && document.getElementById(active)
  };

  // init
  this.tab.addEventListener('click', this.handle, false);
};

// TAB DATA API
// =================
var Tabs = document.querySelectorAll("[data-toggle='tab'], [data-toggle='pill']");
for ( var tb = 0, tbl = Tabs.length; tb<tbl; tb++ ) {
  var tab = Tabs[tb], options = {};
  options.duration = tab.getAttribute('data-duration') && tab.getAttribute('data-duration') || false;
  new Tab(tab,options);
}
