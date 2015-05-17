// Native Javascript for Bootstrap 3 | Button
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
		window.Button = factory();
	}

})(function(){

	// BUTTON DEFINITION
	// ===================
	var Button = function( element, option ) {
		this.btn = typeof element === 'object' ? element : document.querySelector(element);
		this.option = typeof option === 'string' ? option : null;

		this.init();
	}

	// BUTTON METHODS
	// ================
	Button.prototype = {

		init : function() {
			var self = this;
			this.actions();

			if ( this.btn.classList.contains('btn') ) {
				if ( this.option && this.option !== 'reset' ) {

					this.state = this.btn.getAttribute('data-'+this.option+'-text') || null;

					!this.btn.getAttribute('data-original-text') && this.btn.setAttribute('data-original-text',self.btn.innerHTML.replace(/^\s+|\s+$/g, ''));
					this.setState();

				} else if ( this.option === 'reset' ) {
					this.reset();
				}
			}

			if (this.btn.classList.contains('btn-group')) {
				this.btn.addEventListener('click', this.toggle, false);
			}
		},

		actions : function() {
			var self = this;

			this.setState = function() {
				if ( self.option === 'loading' ) {
					self.btn.classList.add('disabled');
					self.btn.setAttribute('disabled','disabled');
				}
				self.btn.innerHTML = self.state;
			},

			this.reset = function() {
				if ( self.btn.classList.contains('disabled') || self.btn.getAttribute('disabled') === 'disabled' ) {
					self.btn.classList.remove('disabled');
					self.btn.removeAttribute('disabled');
				}
				self.btn.innerHTML = self.btn.getAttribute('data-original-text');
			},

			this.toggle = function(e) {
				var parent = e.target.parentNode;
				var label = e.target.tagName === 'LABEL' ? e.target : parent.tagName === 'LABEL' ? parent : null; // the .btn label
				if ( !label ) return; //react if a label or its immediate child is clicked
				var target = e.currentTarget || e.srcElement; // the button group, the target of the Button function
				var labels = target.querySelectorAll('.btn'); // all the button group buttons
				var input = label.getElementsByTagName('INPUT')[0];

				// The built in event that will be triggered on demand
				var changeEvent;
				if ( Event !== undefined && typeof Event === 'function' && typeof Event !== 'object' ) {
					changeEvent = new Event('change');
				} else { // define event type, new Event('type') does not work in any IE
					changeEvent = document.createEvent('HTMLEvents');
					changeEvent.initEvent('change', true, true);
				}

				// assign event to a trigger function
				function triggerChange(t) { t.dispatchEvent(changeEvent) }

				//manage the dom manipulation
				if ( input.type === 'checkbox' ) { //checkboxes

					if ( input.checked )  {
						label.classList.remove('active');
						input.removeAttribute('checked');
					} else {
						label.classList.add('active');
						input.setAttribute('checked','checked');
					}
					triggerChange(input); //trigger the change for the input
					triggerChange(self.btn) //trigger the change for the btn-group
				}

				if ( input.type === 'radio' ){ // radio buttons

					if ( !input.checked ) { // don't trigger if already active
						label.classList.add('active');
						input.setAttribute('checked','checked');

						triggerChange(input); //trigger the change
						triggerChange(self.btn);

						[].forEach.call(labels, function(l) {
							if ( l !== label && l.classList.contains('active') )  {
								var inp = l.getElementsByTagName('INPUT')[0];
								l.classList.remove('active');
								inp.removeAttribute('checked');
								triggerChange(inp)	//trigger the change
							}
						})
					}
				}
			}
		}
    }

	// BUTTON DATA API
	// =================
    var Buttons = document.querySelectorAll('[data-toggle=button]');
	[].forEach.call(Buttons, function (b) {
		return new Button(b);
	})
    var ButtonGroups = document.querySelectorAll('[data-toggle=buttons]');
	[].forEach.call(ButtonGroups, function(g) {
		return new Button(g);
	})

	return Button;

});
