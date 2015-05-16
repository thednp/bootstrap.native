// Native Javascript for Bootstrap 3 | Dropdown
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module == "defined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			exports = factory(exports);
		} else {
			// Let the user give the factory a Window and Document.
			exports = factory;
		}
	} else {
		// Assume a traditional browser.
		factory(window);
	}

})(function(root){

	// DROPDOWN DEFINITION
	// ===================
	var Dropdown = root.Dropdown = function( element) {
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
				target.parentNode.classList.toggle('open');
				e.preventDefault();
				return false;
			}

			self.close = function(e) {
				var target = e.currentTarget || e.srcElement;

				setTimeout(function() { // links inside dropdown-menu don't fire without a short delay
					target.parentNode.classList.remove('open');
				}, 200);
			}
		}
    }

	// DROPDOWN DATA API
	// =================
    var Dropdowns = document.querySelectorAll('[data-toggle=dropdown]');
	[].forEach.call(Dropdowns, function (item,index) {
		return new Dropdown(item);
	})

});
