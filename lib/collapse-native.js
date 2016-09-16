// Native Javascript for Bootstrap 3 | Collapse
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
    window.Collapse = factory();
  }

})(function(){

  var isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false,
    getClosest = function (el, s) { //el is the element and s the selector of the closest item to find
      // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
      var f = s.charAt(0);
      for ( ; el && el !== document; el = el.parentNode ) {// Get closest match
        if ( f === '.' ) {// If selector is a class
          if ( document.querySelector(s) !== undefined ) { return el; }
        }
        if ( f === '#' ) { // If selector is an ID
          if ( el.id === s.substr(1) ) { return el; }
        }
      }
      return false;
    },
    addClass = function(el,c) { // where modern browsers fail, use classList  
      if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; el.offsetWidth; }
    },
    removeClass = function(el,c) {
      if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,''); }
    };

  // COLLAPSE DEFINITION
  // ===================
  var Collapse = function( element, options ) {
    options = options || {};
    
    this.btn = typeof element === 'object' ? element : document.querySelector(element);
    this.accordion = null;
    this.collapse = null;
    this.duration = 300; // default collapse transition duration
    this.options = {};
    this.options.duration = (isIE && isIE < 10) ? 0 : (options.duration || this.duration);
    var self = this;
    var getOuterHeight = function (el) {
      var s = el && (el.currentStyle || window.getComputedStyle(el)), // the getComputedStyle polyfill would do this for us, but we want to make sure it does
        btp = /px/.test(s.borderTopWidth) ? Math.round(s.borderTopWidth.replace('px','')) : 0,
        mtp = /px/.test(s.marginTop)  ? Math.round(s.marginTop.replace('px',''))    : 0,
        mbp = /px/.test(s.marginBottom)  ? Math.round(s.marginBottom.replace('px',''))  : 0,
        mte = /em/.test(s.marginTop)  ? Math.round(s.marginTop.replace('em','')    * parseInt(s.fontSize)) : 0,
        mbe = /em/.test(s.marginBottom)  ? Math.round(s.marginBottom.replace('em','')  * parseInt(s.fontSize)) : 0;
      return el.clientHeight + parseInt( btp ) + parseInt( mtp ) + parseInt( mbp ) + parseInt( mte ) + parseInt( mbe ); //we need an accurate margin value
    };

    this.toggle = function(e) {
      e.preventDefault();

      if (!/\bin/.test(self.collapse.className)) {
        self.open();
      } else {
        self.close();
      }
    },
    this.close = function() {
      this._close(this.collapse);
      addClass(this.btn,'collapsed');
    },
    this.open = function() {
      this._open(this.collapse);
      removeClass(this.btn,'collapsed');

      if ( this.accordion !== null ) {
        var active = this.accordion.querySelectorAll('.collapse.in'), al = active.length, i = 0;
        for (i;i<al;i++) {
          if ( active[i] !== this.collapse) this._close(active[i]);
        }
      }
    }
    this._open = function(c) {
      this.removeEvent();
      addClass(c,'in');
      c.setAttribute('aria-expanded','true');
      addClass(c,'collapsing');
      setTimeout(function() {
        c.style.height = self.getMaxHeight(c) + 'px'
        c.style.overflowY = 'hidden';
      }, 0);  
      setTimeout(function() {
        c.style.height = ''; 
        c.style.overflowY = '';
        removeClass(c,'collapsing');
        self.addEvent();
      }, this.options.duration);
    }
    this._close = function(c) {
      this.removeEvent();
      c.setAttribute('aria-expanded','false');
      c.style.height = this.getMaxHeight(c) + 'px'
      setTimeout(function() {
        c.style.height = '0px';    
        c.style.overflowY = 'hidden';
        addClass(c,'collapsing');
      }, 0);
      
      setTimeout(function() {
        removeClass(c,'collapsing');
        removeClass(c,'in'); 
        c.style.overflowY = '';
        c.style.height = '';          
        self.addEvent();
      }, this.options.duration);
    }
    this.getMaxHeight = function(l) { // get collapse trueHeight and border
      var h = 0;
      for (var k = 0, ll = l.children.length; k < ll; k++) {
        h += getOuterHeight(l.children[k]);
      }
      return h;
    }
    this.removeEvent = function() {
      this.btn.removeEventListener('click', this.toggle, false);
    }
    this.addEvent = function() {
      this.btn.addEventListener('click', this.toggle, false);
    }
    this.getTarget = function() {
      var t = this.btn,
        h = t.href && t.getAttribute('href').replace('#',''),
        d = t.getAttribute('data-target') && ( t.getAttribute('data-target') ),
        id = h || ( d && /#/.test(d)) && d.replace('#',''),
        cl = (d && d.charAt(0) === '.') && d, //the navbar collapse trigger targets a class
        c = id && document.getElementById(id) || cl && document.querySelector(cl);
      return c;
    }

    // init
    this.addEvent();
    this.collapse = this.getTarget();
    this.accordion = this.btn.getAttribute('data-parent') 
      && getClosest(this.btn, this.btn.getAttribute('data-parent'));
  };

  // COLLAPSE DATA API
  // =================
  var Collapses = document.querySelectorAll('[data-toggle="collapse"]'), i = 0, cll = Collapses.length;
  for (i;i<cll;i++) {
    var item = Collapses[i], options = {};
    options.duration = item.getAttribute('data-duration');
    new Collapse(item,options);
  }

  return Collapse;

});