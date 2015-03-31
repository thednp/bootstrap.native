//Vanilla JS script | Modal for Bootstrap 3
//by dnp_theme


// (function () {
	
	//MODAL DEFINITION
    var Modal = function(element, options) { // element is the trigger button / options.target is the modal
        this.opened = false;

        this.modal = typeof element === 'object' ? element : document.querySelector(element);
		
        this.options = {};
		this.options.backdrop = options.backdrop === 'false' ? false : true;
		this.options.keyboard = options.keyboard === 'false' ? false : true;
		this.options.content = options.content;
		this.duration = options.duration || 300; // the default modal fade duration option
		this.options.duration = document.documentElement.classList.contains('ie') ? 0 : this.duration;
						
        this.dialog = this.modal.querySelector('.modal-dialog');	
		
        if ( this.options.content !== undefined ) {
            this.content( this.options.content );
        }
		
		if ( this.options.backdrop ) {
			if ( this.modal.querySelector('.modal-backdrop') === null ) {
				
				var backdrop = document.createElement('div');
				backdrop.setAttribute('class','modal-backdrop fade');
				this.overlay = backdrop;
			
				this.modal.insertBefore(backdrop, this.dialog);
			} else { this.overlay = this.modal.querySelector('.modal-backdrop') }
		} else { this.overlay = null }

		this.resize();
		this.dismiss();
		this.keydown();
		this.trigger();
    }

    Modal.prototype.open = function() {
        this._open();
    }

    Modal.prototype._open = function() {
        var self = this;
	
        document.body.classList.add('modal-open');	
        this.modal.style.display = 'block';
		if ( self.overlay !== null ) { self._resize(); self.overlay.classList.add('in'); }
	
		setTimeout(function() {
			self.modal.classList.add('in');
			self.modal.setAttribute('aria-hidden', false);   
		}, self.options.duration/2);

        this.opened = true;
    }

    Modal.prototype.close = function() {
        this._close();
    }

    Modal.prototype._close = function() {
        var self = this;

        this.modal.classList.remove('in');
        if ( this.overlay !== null ) this.overlay.classList.remove('in');
		this.modal.setAttribute('aria-hidden', true);

        document.body.classList.remove('modal-open');

        setTimeout(function() {
            self.modal.style.display = 'none';
        }, self.options.duration);
        this.opened = false;
    }

    Modal.prototype.content = function( content ) {
        return this.modal.querySelector('.modal-content').innerHTML = content;
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
		var triggers = document.querySelectorAll('[data-toggle="modal"]');
		[].forEach.call(triggers, function(btn,idx) {
			btn.addEventListener('click', function(e) {
				var b = e.target, 
				s = b.getAttribute('data-target') && b.getAttribute('data-target').replace('#','') 
				 || b.getAttribute('href') && b.getAttribute('href').replace('#','');
				if ( document.getElementById( s ) === self.modal ) {
					self.open()
				}
			})	
		})		
    }

    Modal.prototype._resize = function() {
		var self = this, overlay = this.overlay, dim = { w: document.documentElement.clientWidth + 'px', h: document.documentElement.clientHeight + 'px' };
		setTimeout(function() {
			if ( overlay !== null && overlay.classList.contains('in') ) { 
				overlay.style.height = dim.h; overlay.style.width = dim.w 
			}
		},self.options.duration/2)
    }

    Modal.prototype.resize = function() {
		var self = this;
		window.addEventListener('resize',  function() {
			setTimeout(function() {
				if (self.modal.classList.contains('in')) { 
					self._resize()
				}
			}, 50)
		}, false);
    }

    Modal.prototype.dismiss = function() {
		var self = this;
		this.modal.addEventListener('click', function(e){
			if ( e.target.parentNode.getAttribute('data-dismiss') === 'modal' || e.target.getAttribute('data-dismiss') === 'modal' || self.overlay && e.target === self.overlay ) {
				self.close()
			} else { e.stopPropagation(); e.preventDefault(); }
		})
    }

	var Modals = document.querySelectorAll('.modal');
	[].forEach.call(Modals,function(modal,idx) {
		var options = {};
		options.keyboard = modal.getAttribute('data-keyboard') && modal.getAttribute('data-keyboard');
		options.backdrop = modal.getAttribute('data-backdrop') && modal.getAttribute('data-backdrop');
		options.duration = modal.getAttribute('data-duration') && modal.getAttribute('data-duration');
		return new Modal(modal,options)
	})
// })();
