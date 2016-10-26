// Native Javascript for Bootstrap 3 | Modal
// by dnp_theme

//MODAL DEFINITION
// ===============
var Modal = function(element, options) { // element is the is the modal
  options = options || {};
  this.modal = typeof element === 'object' ? element : document.querySelector(element);
  this.options = {};
  this.options.backdrop = options.backdrop === 'false' ? false : true;
  this.options.keyboard = options.keyboard === 'false' ? false : true;
  this.options.content = options.content;
  this.duration = options.duration || 300; // the default modal fade duration option
  this.options.duration = (isIE && isIE < 10) ? 0 : this.duration;
  this.scrollbarWidth = 0;
  this.dialog = this.modal.querySelector('.modal-dialog');

  var self = this, timer = 0,
    getWindowWidth = function() {
      var htmlRect = document.documentElement.getBoundingClientRect(),
        fullWindowWidth = window.innerWidth || (htmlRect.right - Math.abs(htmlRect.left));
      return fullWindowWidth;
    },
    setScrollbar = function () {
      var bodyStyle = window.getComputedStyle(document.body), bodyPad = parseInt((bodyStyle.paddingRight), 10);
      if (self.bodyIsOverflowing) { document.body.style.paddingRight = (bodyPad + self.scrollbarWidth) + 'px'; }
    },
    resetScrollbar = function () {
      document.body.style.paddingRight = '';
    },
    measureScrollbar = function () { // thx walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = 'modal-scrollbar-measure';
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    },
    checkScrollbar = function () {
      self.bodyIsOverflowing = document.body.clientWidth < getWindowWidth();
      self.modalIsOverflowing = self.modal.scrollHeight > document.documentElement.clientHeight;
      self.scrollbarWidth = measureScrollbar();
    };

  this.open = function() {
    var currentOpen = document.querySelector('.modal.in');
    if (currentOpen){
      clearTimeout(currentOpen.getAttribute('data-timer'));
      removeClass(currentOpen,'in');
      setTimeout( function() {
        currentOpen.setAttribute('aria-hidden', true);
        currentOpen.style.display = '';
      }, this.options.duration/2);
    }

    if ( this.options.backdrop ) {
      this.createOverlay();
    } else { this.overlay = null }

    if ( this.overlay ) {
      setTimeout( function() {
        addClass(self.overlay,'in');
      }, 0);
    }

    clearTimeout(timer);
    timer = setTimeout( function() {
      self.modal.style.display = 'block';

      checkScrollbar();
      self.adjustDialog();
      setScrollbar();

      self.resize();
      self.dismiss();
      self.keydown();

      addClass(document.body,'modal-open');
      addClass(self.modal,'in');
      self.modal.setAttribute('aria-hidden', false);
    }, this.options.duration/2);
  };
  this.close = function() {

    if ( this.overlay ) {
      removeClass(this.overlay,'in');
    }
    removeClass(this.modal,'in');
    this.modal.setAttribute('aria-hidden', true);

    clearTimeout(timer);
    timer = setTimeout( function() {
      removeClass(document.body,'modal-open');
      self.resize();
      self.resetAdjustments();
      resetScrollbar();

      self.dismiss();
      self.keydown();
      self.modal.style.display = '';
    }, this.options.duration/2);

    setTimeout( function() {
      if (!document.querySelector('.modal.in')) {  self.removeOverlay(); }
    }, this.options.duration);
  };
  this.content = function( content ) {
    return this.modal.querySelector('.modal-content').innerHTML = content;
  };
  this.createOverlay = function() {
    var backdrop = document.createElement('div'), overlay = document.querySelector('.modal-backdrop');
    backdrop.setAttribute('class','modal-backdrop fade');

    if ( overlay ) {
      this.overlay = overlay;
    } else {
      this.overlay = backdrop;
      document.body.appendChild(backdrop);
    }
  };
  this.removeOverlay = function() {
    var overlay = document.querySelector('.modal-backdrop');
    if ( overlay !== null && overlay !== undefined ) {
      document.body.removeChild(overlay)
    }
  };
  this.keydown = function() {
    function keyHandler(e) {
      if (self.options.keyboard && e.which == 27) {
        self.close();
      }
    }
    if (!/\bin/.test(this.modal.className)) {
      document.addEventListener('keydown', keyHandler, false);
    } else {
      document.removeEventListener('keydown', keyHandler, false);
    }
  };
  this.trigger = function() {
    var triggers = document.querySelectorAll('[data-toggle="modal"]'), tgl = triggers.length, i = 0;
    for ( i;i<tgl;i++ ) {
      triggers[i].addEventListener('click', function(e) {
        e.preventDefault();
        var b = this, // var b = e.target,
        s = b.getAttribute('data-target') && b.getAttribute('data-target').replace('#','')
        || b.getAttribute('href') && b.getAttribute('href').replace('#','');
        if ( document.getElementById( s ) === self.modal ) {
          self.open()
        }
      })
    }
  };
  this._resize = function() {
    var overlay = this.overlay||document.querySelector('.modal-backdrop'),
      dim = { w: document.documentElement.clientWidth + 'px', h: document.documentElement.clientHeight + 'px' };
    if ( overlay !== null && /\bin/.test(overlay.className) ) {
      overlay.style.height = dim.h; overlay.style.width = dim.w;
    }
  };
  this.oneResize = function() {
    function oneResize() {
      self._resize();
      self.handleUpdate();
      window.removeEventListener('resize', oneResize, false);
    }
    window.addEventListener('resize', oneResize, false);
  };
  this.resize = function() {
    function resizeHandler() {
      self._resize();
      self.handleUpdate();
    }

    if (!/\bin/.test(this.modal.className)) {
      window.addEventListener('resize', this.oneResize, false);
    } else {
      window.removeEventListener('resize', this.oneResize, false);
    }
  };
  this.dismiss = function() {
    function dismissHandler(e) {
      if ( e.target.parentNode.getAttribute('data-dismiss') === 'modal' || e.target.getAttribute('data-dismiss') === 'modal' || e.target === self.modal ) {
        e.preventDefault(); self.close()
      }
    }
    if (!/\bin/.test(this.modal.className)) {
      this.modal.addEventListener('click', dismissHandler, false);
    } else {
      this.modal.removeEventListener('click', dismissHandler, false);
    }
  };
  // these following methods are used to handle overflowing modals
  this.handleUpdate = function () {
    this.adjustDialog();
  };
  this.adjustDialog = function () {
    this.modal.style.paddingLeft = !this.bodyIsOverflowing && this.modalIsOverflowing ? this.scrollbarWidth + 'px' : '';
    this.modal.style.paddingRight = this.bodyIsOverflowing && !this.modalIsOverflowing ? this.scrollbarWidth + 'px' : '';
  };
  this.resetAdjustments = function () {
    this.modal.style.paddingLeft = '';
    this.modal.style.paddingRight = '';
  };
  //init
  this.trigger();
  if ( this.options.content && this.options.content !== undefined ) {
    this.content( this.options.content );
  }
};

// DATA API
var Modals = document.querySelectorAll('.modal');
for ( var m = 0, mdl = Modals.length; m<mdl; m++ ) {
  var modal = Modals[m], options = {};
  options.keyboard = modal.getAttribute('data-keyboard');
  options.backdrop = modal.getAttribute('data-backdrop');
  options.duration = modal.getAttribute('data-duration');
  new Modal(modal,options)
}
