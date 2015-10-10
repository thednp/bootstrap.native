// Native Javascript for Bootstrap 3 | Modal
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
		window.Modal = factory();
	}

})(function(){

	//MODAL DEFINITION
    var Modal = function(element, options) { // element is the trigger button / options.target is the modal
        options = options || {};
        
        this.opened = false;
        this.modal = typeof element === 'object' ? element : document.querySelector(element);
        this.options = {};
		this.options.backdrop = options.backdrop === 'false' ? false : true;
		this.options.keyboard = options.keyboard === 'false' ? false : true;
		this.options.content = options.content;
		this.duration = options.duration || 300; // the default modal fade duration option
		this.options.duration = /ie/.test(document.documentElement.className) ? 0 : this.duration;

        this.dialog = this.modal.querySelector('.modal-dialog');
		this.timer = 0;

		this.init()
    }

    Modal.prototype.init = function() {
		if ( this.options.content && this.options.content !== undefined ) {
			this.content( this.options.content );
		}
		this.dismiss();
		this.keydown();
		this.trigger();
		if (!/ie8/.test(document.documentElement.className)) { this.resize(); }
	}

    Modal.prototype.open = function() {
        this._open();
    }

    Modal.prototype.close = function() {
        this._close();
    }

    Modal.prototype._open = function() {
        var self = this;

		if ( this.options.backdrop ) {
			this.createOverlay();
		} else { this.overlay = null }

		document.body.className += ' modal-open';
		this.modal.style.display = 'block';

		clearTimeout(self.modal.getAttribute('data-timer'));
		this.timer = setTimeout( function() {

			if ( self.overlay !== null ) {
				self._resize();
				self.overlay.className += ' in';
			}
			self.modal.className += ' in';
			self.modal.setAttribute('aria-hidden', false);
		}, self.options.duration/2);
		this.modal.setAttribute('data-timer',self.timer);

        this.opened = true;
    }

    Modal.prototype._close = function() {
        var self = this;

        this.modal.className = this.modal.className.replace(' in','');
		this.modal.setAttribute('aria-hidden', true);

        if ( this.overlay ) { this.overlay.className = this.overlay.className.replace(' in',''); }
        document.body.className = document.body.className.replace(' modal-open','');

		clearTimeout(self.modal.getAttribute('data-timer'));
		this.timer = setTimeout( function() {
            self.modal.style.display = 'none';
			self.removeOverlay();
        }, self.options.duration/2);
		this.modal.setAttribute('data-timer',self.timer);

        this.opened = false;
    }

    Modal.prototype.content = function( content ) {
        return this.modal.querySelector('.modal-content').innerHTML = content;
    }

    Modal.prototype.createOverlay = function() {
		var backdrop = document.createElement('div'), overlay = document.querySelector('.modal-backdrop');
		backdrop.setAttribute('class','modal-backdrop fade');

		if ( overlay ) {
			this.overlay = overlay;
		} else {
			this.overlay = backdrop;
			document.body.appendChild(backdrop);
		}
	}

    Modal.prototype.removeOverlay = function() {
		var overlay = document.querySelector('.modal-backdrop');
		if ( overlay !== null && overlay !== undefined ) {
			document.body.removeChild(overlay)
		}
	}

    Modal.prototype.keydown = function() {
		var self = this;
		document.addEventListener('keydown', function(e) {
			if (self.options.keyboard && e.which == 27) {
				self.close();
			}
		}, false);
    }

    Modal.prototype.trigger = function() {
		var self = this;
		var triggers = document.querySelectorAll('[data-toggle="modal"]'), tgl = triggers.length, i = 0;
		for ( i;i<tgl;i++ ) {
			triggers[i].addEventListener('click', function(e) {
				var b = e.target,
				s = b.getAttribute('data-target') && b.getAttribute('data-target').replace('#','')
				 || b.getAttribute('href') && b.getAttribute('href').replace('#','');
				if ( document.getElementById( s ) === self.modal ) {
					self.open()
				}
			})
		}
    }

    Modal.prototype._resize = function() {
		var self = this, overlay = this.overlay||document.querySelector('.modal-backdrop'),
			dim = { w: document.documentElement.clientWidth + 'px', h: document.documentElement.clientHeight + 'px' };
		setTimeout(function() {
			if ( overlay !== null && /in/.test(overlay.className) ) {
				overlay.style.height = dim.h; overlay.style.width = dim.w
			}
		}, self.options.duration/2)
    }

    Modal.prototype.resize = function() {
		var self = this;
		window.addEventListener('resize',  function() {
			setTimeout(function() {
				self._resize()
			}, 100)
		}, false);
    }

    Modal.prototype.dismiss = function() {
		var self = this;
		this.modal.addEventListener('click', function(e){
			if ( e.target.parentNode.getAttribute('data-dismiss') === 'modal' || e.target.getAttribute('data-dismiss') === 'modal' || e.target === self.modal ) {
				e.preventDefault(); self.close()
			}
		})
    }

	var Modals = document.querySelectorAll('.modal'), mdl = Modals.length, i = 0;
	for ( i;i<mdl;i++ ) {
		var modal = Modals[i], options = {};
		options.keyboard = modal.getAttribute('data-keyboard');
		options.backdrop = modal.getAttribute('data-backdrop');
		options.duration = modal.getAttribute('data-duration');
		new Modal(modal,options)
	}

	return Modal;

});
