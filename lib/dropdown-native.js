// Native Javascript for Bootstrap 3 | Dropdown
// by dnp_theme

// DROPDOWN DEFINITION
// ===================
var Dropdown = function( element) {
  this.menu = typeof element === 'object' ? element : document.querySelector(element);
  var self = this;

  this.handle = function(e) { // fix some Safari bug with <button>
    var target = e.target || e.currentTarget,
        children = [], c = self.menu.parentNode.getElementsByTagName('*');
    (/\#$/g.test(target.href) || /\#$/g.test(target.parentNode.href)) && e.preventDefault();

    for ( var i=0, l = c.length||0; i<l; i++) { l && children.push(c[i]); }
    if ( target === self.menu || target.parentNode === self.menu || target.parentNode.parentNode === self.menu ) {
      self.toggle(e);
    }  else if ( children && children.indexOf(target) > -1  ) {
      return;
    } else { self.close(); }
  };
  this.toggle = function(e) {
    if (/\bopen/.test(this.menu.parentNode.className)) {
      this.close();
      document.removeEventListener('keydown', this.key, false);
    } else {
      this.menu.parentNode.className += ' open';
      this.menu.setAttribute('aria-expanded',true);
      document.addEventListener('keydown', this.key, false);
    }
  };
  this.key = function(e) {
    if (e.which == 27) {self.close();}
  };
  this.close = function() {
    self.menu.parentNode.className = self.menu.parentNode.className.replace(/\bopen/,'');
    self.menu.setAttribute('aria-expanded',false);
  };
  this.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome | Safari
  document.addEventListener('click', this.handle, false);
};

// DROPDOWN DATA API
// =================
var Dropdowns = document.querySelectorAll('[data-toggle=dropdown]');
for (var d=0, ddl = Dropdowns.length; d<ddl; d++) {
  new Dropdown(Dropdowns[d]);
}
