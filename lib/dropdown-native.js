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
			var self = this;
			self.actions();
			self.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome
			self.menu.addEventListener('click', self.toggle, false);
			self.menu.addEventListener('blur', self.close, false);
		},

		actions : function() {
			var self = this;

			self.toggle = function(e) {
				var target = e.currentTarget || e.srcElement;
				if (/open/.test(target.parentNode.className)) {
					target.parentNode.className = target.parentNode.className.replace(' open','');
				} else {
					target.parentNode.className += ' open';
				}
				
				e.preventDefault();
				return false;
			}

			self.close = function(e) {
				var target = e.currentTarget || e.srcElement;

				setTimeout(function() { // links inside dropdown-menu don't fire without a short delay
					target.parentNode.className = target.parentNode.className.replace(' open','');
				}, 200);
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
