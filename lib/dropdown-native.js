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
		this.init();
	}

	// DROPDOWN METHODS
	// ================
	Dropdown.prototype = {

		init : function() {
			this.actions();
			this.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome | Safari
      document.addEventListener('click', this.handle, false);
		},

		actions : function() {
      var self = this;
      
			this.handle = function(e) { // fix some Safari bug with <button>
        var target = e.target || e.currentTarget;
        if ( target === self.menu || target.parentNode === self.menu ) { self.toggle(e); } else { self.close(200); }
        /\#$/g.test(target.href) && e.preventDefault();
      } 
      
			this.toggle = function(e) {
				if (/open/.test(this.menu.parentNode.className)) {
          this.close(0);
          document.removeEventListener('keydown', this.key, false);
				} else {
					this.menu.parentNode.className += ' open';
					this.menu.setAttribute('aria-expanded',true);
          document.addEventListener('keydown', this.key, false);
				}
			}
      
      this.key = function(e) {
        if (e.which == 27) {self.close(0);}
      }
      
			this.close = function(t) {
				setTimeout(function() { // links inside dropdown-menu don't fire without a short delay
					self.menu.parentNode.className = self.menu.parentNode.className.replace(' open','');
					self.menu.setAttribute('aria-expanded',false);
				}, t);
			}
		}
  }

	// DROPDOWN DATA API
	// =================
  var Dropdowns = document.querySelectorAll('[data-toggle=dropdown]'), i = 0, ddl = Dropdowns.length;
	for (i;i<ddl;i++) {
		new Dropdown(Dropdowns[i]);
	}

	return Dropdown;
});
