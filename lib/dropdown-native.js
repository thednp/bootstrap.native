// Native Javascript for Bootstrap 3 | Dropdown
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
    window.Dropdown = factory();
  }

})(function(root){

  // DROPDOWN DEFINITION
  // ===================
  var Dropdown = function( element) {
    this.menu = typeof element === 'object' ? element : document.querySelector(element);
    var self = this;

    this.handle = function(e) { // fix some Safari bug with <button>
      var target = e.target || e.currentTarget,
          children = [], c = self.menu.parentNode.getElementsByTagName('*');
      /\#$/g.test(target.href) && e.preventDefault();

      for ( var i=0, l = c.length||0; i<l; i++) { l && children.push(c[i]); }
      if ( target === self.menu || target.parentNode === self.menu || target.parentNode.parentNode === self.menu ) {
        self.toggle(e);
      }  else if ( children && children.indexOf(target) > -1  ) {
        return;
      } else { self.close(); }
    }
    this.toggle = function(e) {
      if (/\bopen/.test(this.menu.parentNode.className)) {
        this.close();
        document.removeEventListener('keydown', this.key, false);
      } else {
        this.menu.parentNode.className += ' open';
        this.menu.setAttribute('aria-expanded',true);
        document.addEventListener('keydown', this.key, false);
      }
    }
    this.key = function(e) {
      if (e.which == 27) {self.close();}
    }
    this.close = function() {
      self.menu.parentNode.className = self.menu.parentNode.className.replace(/\bopen/,'');
      self.menu.setAttribute('aria-expanded',false);
    }
    this.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome | Safari
    document.addEventListener('click', this.handle, false);
  }

  // DROPDOWN DATA API
  // =================
  var Dropdowns = document.querySelectorAll('[data-toggle=dropdown]'), i = 0, ddl = Dropdowns.length;
  for (i;i<ddl;i++) {
    new Dropdown(Dropdowns[i]);
  }

  return Dropdown;

});
