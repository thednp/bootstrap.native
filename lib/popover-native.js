// Native Javascript for Bootstrap 3 | Popover
// by dnp_theme

// POPOVER DEFINITION
// ===================
var Popover = function( element,options ) {
  options = options || {};
  this.link = typeof element === 'object' ? element : document.querySelector(element);
  this.title = this.link.getAttribute('data-title') || null;
  this.content = this.link.getAttribute('data-content') || null;
  this.popover = null;
  this.options = {};
  this.options.template = options.template ? options.template : null;
  this.options.trigger = options.trigger ? options.trigger : 'hover';
  this.options.animation = options.animation && options.animation !== 'fade' ? options.animation : 'fade';
  this.options.placement = options.placement ? options.placement : 'top';
  this.options.delay = parseInt(options.delay) || 100;
  this.options.dismiss = options.dismiss && options.dismiss === 'true' ? true : false;
  this.duration = 150;
  this.options.duration = (isIE && isIE < 10) ? 0 : (options.duration || this.duration);
  this.options.container = document.body;
  if ( !this.content && !this.options.template ) return;

  var self = this, timer = 0, placement = this.options.placement;

  this.toggle = function(e) {
    if (self.popover === null) {
      self.open()
    } else {
      self.close()
    }
  };
  this.dismiss = function(e) {
    if (self.popover && e.target === self.popover.querySelector('.close')) {
      self.close();
    }
  };
  this.open = function(e) {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (self.popover === null) {
        placement = self.options.placement; // we reset placement in all cases
        self.createPopover();
        self.updatePopover();
        self.showPopover();
      }
    }, 20 );
  };
  this.close = function(e) {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (self.popover && self.popover !== null && /\bin/.test(self.popover.className)) {
        removeClass(self.popover,'in');
        setTimeout(function() {
          self.removePopover();
        }, self.options.duration);
      }

    }, self.options.delay + self.options.duration);
  };
  //remove the popover
  this.removePopover = function() {
    this.popover && this.options.container.removeChild(this.popover);
    this.popover = null;
    timer = null
  };
  this.createPopover = function() {
    this.popover = document.createElement('div');

    if ( this.content !== null && this.options.template === null ) { //create the popover from data attributes

      this.popover.setAttribute('role','tooltip');

      var popoverArrow = document.createElement('div');
      popoverArrow.setAttribute('class','arrow');

      if (this.title !== null) {
        var popoverTitle = document.createElement('h3');
        popoverTitle.setAttribute('class','popover-title');

        if (this.options.dismiss) {
          popoverTitle.innerHTML = this.title + '<button type="button" class="close">×</button>';
        } else {
          popoverTitle.innerHTML = this.title;
        }
        this.popover.appendChild(popoverTitle);
      }

      var popoverContent = document.createElement('div');
      popoverContent.setAttribute('class','popover-content');

      this.popover.appendChild(popoverArrow);
      this.popover.appendChild(popoverContent);

      //set popover content
      if (this.options.dismiss && this.title === null) {
        popoverContent.innerHTML = this.content + '<button type="button" class="close">×</button>';
      } else {
        popoverContent.innerHTML = this.content;
      }

    } else {  // or create the popover from template
      var template = document.createElement('div');
      template.innerHTML = this.options.template;
      this.popover.innerHTML = template.firstChild.innerHTML;
    }

    //append to the container
    this.options.container.appendChild(this.popover);
    this.popover.style.display = 'block';
    this.popover.setAttribute('class', 'popover ' + placement + ' ' + this.options.animation);
  };
  this.showPopover = function () {
    !/\bin/.test(this.popover.className) && ( addClass(this.popover,'in') );
  };
  this.stylePopover = function() {
    var rect = this.link.getBoundingClientRect(), scroll = getScroll(), // link rect | window vertical and horizontal scroll
        linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top }, //link real dimensions
        popoverDimensions = { w : this.popover.offsetWidth, h: this.popover.offsetHeight }; //popover real dimensions

    //apply styling
    if ( /top/.test(placement) ) { //TOP
      this.popover.style.top = rect.top + scroll.y - popoverDimensions.h + 'px';
      this.popover.style.left = rect.left + scroll.x - popoverDimensions.w/2 + linkDimensions.w/2 + 'px'

    } else if ( /bottom/.test(placement) ) { //BOTTOM
      this.popover.style.top = rect.top + scroll.y + linkDimensions.h + 'px';
      this.popover.style.left = rect.left + scroll.x - popoverDimensions.w/2 + linkDimensions.w/2 + 'px';

    } else if ( /left/.test(placement) ) { //LEFT
      this.popover.style.top = rect.top + scroll.y - popoverDimensions.h/2 + linkDimensions.h/2 + 'px';
      this.popover.style.left = rect.left + scroll.x - popoverDimensions.w + 'px';

    } else if ( /right/.test(placement) ) { //RIGHT
      this.popover.style.top = rect.top + scroll.y - popoverDimensions.h/2 + linkDimensions.h/2 + 'px';
      this.popover.style.left = rect.left + scroll.x + linkDimensions.w + 'px';
    }
    this.popover.className.indexOf(placement) === -1 && (this.popover.className = this.popover.className.replace(tipPositions,placement));
  };
  this.updatePopover = function() {
    this.stylePopover();
    if (!isElementInViewport(this.popover) ) { placement = this.updatePlacement(); this.stylePopover(); }
  };
  this.updatePlacement = function() {
    if ( /top/.test(placement) ) { //TOP
      return 'bottom';
    } else if ( /bottom/.test(placement) ) { //BOTTOM
      return 'top';
    } else if ( /left/.test(placement) ) { //LEFT
      return 'right';
    } else if ( /right/.test(placement) ) { //RIGHT
      return 'left';
    }
  };

  // init
  if (this.options.trigger === 'hover') {
    this.link.addEventListener(mouseHover[0], this.open, false);
    if (!this.options.dismiss) { this.link.addEventListener(mouseHover[1], this.close, false); }
  } else if (this.options.trigger === 'click') {
    this.link.addEventListener('click', this.toggle, false);
    if (!this.options.dismiss) { this.link.addEventListener('blur', this.close, false); }
  } else if (this.options.trigger === 'focus') {
    this.link.addEventListener('focus', this.toggle, false);
    if (!this.options.dismiss) { this.link.addEventListener('blur', this.close, false);  }
  }

  if (this.options.dismiss) {  document.addEventListener('click', this.dismiss, false); }

  if (!(isIE && isIE < 9) ) { // dismiss on window resize
    window.addEventListener('resize', this.close, false );
  }
};

// POPOVER DATA API
// =================
var Popovers = document.querySelectorAll('[data-toggle=popover]');
for (var p=0, ppl = Popovers.length; p<ppl; p++){
  var popover = Popovers[p], options = {};
  options.trigger = popover.getAttribute('data-trigger'); // click / hover / focus
  options.animation = popover.getAttribute('data-animation'); // true / false
  options.duration = popover.getAttribute('data-duration');
  options.placement = popover.getAttribute('data-placement');
  options.dismiss = popover.getAttribute('data-dismiss');
  options.delay = popover.getAttribute('data-delay');
  new Popover(popover,options);
}
