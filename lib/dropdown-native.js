// Native Javascript for Bootstrap 3 | Dropdown
// by dnp_theme

// (function(w,d) {

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
	
// })(window,document);	