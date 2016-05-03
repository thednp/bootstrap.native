// Native Javascript for Bootstrap 3 | Popover
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
    window.Popover = factory();
  }

})(function(){

  // POPOVER DEFINITION
  // ===================
  var Popover = function( element,options ) {
    options = options || {};
    this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false; 
    this.link = typeof element === 'object' ? element : document.querySelector(element);
    this.title = this.link.getAttribute('data-title') || null;
    this.content = this.link.getAttribute('data-content') || null;
    this.popover = null;
    this.options = {};
    this.options.template = options.template ? options.template : null;
    this.options.trigger = options.trigger ? options.trigger : 'hover';
    this.options.animation = options.animation && options.animation !== 'true' ? options.animation : 'true';
    this.options.placement = options.placement ? options.placement : 'top';
    this.options.delay = parseInt(options.delay) || 100;
    this.options.dismiss = options.dismiss && options.dismiss === 'true' ? true : false;    
    this.duration = 150;
    this.options.duration = (this.isIE && this.isIE < 10) ? 0 : (options.duration || this.duration);
    this.options.container = document.body;
    if ( this.content || this.options.template ) this.init();
    this.timer = 0 // the link own event timer
    this.rect = null;
  }

  // POPOVER METHODS
  // ================
  Popover.prototype = {

    init : function() {
      this.actions();
      var events = ('onmouseleave' in this.link) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];

      if (this.options.trigger === 'hover') {
        this.link.addEventListener(events[0], this.open, false);
        if (!this.options.dismiss) { this.link.addEventListener(events[1], this.close, false); }
      } else if (this.options.trigger === 'click') {
        this.link.addEventListener('click', this.toggle, false);
        if (!this.options.dismiss) { this.link.addEventListener('blur', this.close, false); }
      } else if (this.options.trigger === 'focus') {
        this.link.addEventListener('focus', this.toggle, false);
        if (!this.options.dismiss) { this.link.addEventListener('blur', this.close, false);  }
      }
      
      if (this.options.dismiss) {  document.addEventListener('click', this.dismiss, false); }
        
      if (!(this.isIE && this.isIE < 9) ) { // dismiss on window resize 
        window.addEventListener('resize', this.close, false ); 
      } 
    },

    actions : function() {
      var self = this;

      this.toggle = function(e) {
        if (self.popover === null) {
          self.open()
        } else {
          self.close()
        }
      },
      this.open = function(e) {
        clearTimeout(self.link.getAttribute('data-timer'));
        self.timer = setTimeout( function() {
          if (self.popover === null) {
            self.createPopover();
            self.stylePopover();
            self.updatePopover()
          }
        }, self.options.duration );
        self.link.setAttribute('data-timer',self.timer);
      },
      this.dismiss = function(e) {
        if (self.popover && e.target === self.popover.querySelector('.close')) {          
          self.close();
        }
      },
      this.close = function(e) {
        clearTimeout(self.link.getAttribute('data-timer'));
        self.timer = setTimeout( function() {
          if (self.popover && self.popover !== null && /in/.test(self.popover.className)) {
            self.popover.className = self.popover.className.replace(' in','');
            setTimeout(function() {
              self.removePopover(); // for performance/testing reasons we can keep the popovers if we want
            }, self.options.duration);
          }

        }, self.options.delay + self.options.duration);
        self.link.setAttribute('data-timer',self.timer);
      },

      //remove the popover
      this.removePopover = function() {
        this.popover && this.options.container.removeChild(this.popover);
        this.popover = null;
        this.timer = null
      },

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
      },

      this.stylePopover = function(pos) {
        this.rect = this.getRect();
        var placement = pos || this.options.placement;
        var animation = this.options.animation === 'true' ? 'fade' : '';
        this.popover.setAttribute('class','popover '+placement+' '+animation);

        var linkDim = { w: this.link.offsetWidth, h: this.link.offsetHeight }; //link real dimensions

        // all popover dimensions
        var pd = this.popoverDimensions(this.popover);
        var toolDim = { w : pd.w, h: pd.h }; //popover real dimensions


        //window vertical and horizontal scroll

        var scrollYOffset = this.getScroll().y;
        var scrollXOffset =  this.getScroll().x;

        //apply styling
        if ( /top/.test(placement) ) { //TOP
          this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h + 'px';
          this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px'

        } else if ( /bottom/.test(placement) ) { //BOTTOM
          this.popover.style.top = this.rect.top + scrollYOffset + linkDim.h + 'px';
          this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px';

        } else if ( /left/.test(placement) ) { //LEFT
          this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
          this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w + 'px';

        } else if ( /right/.test(placement) ) { //RIGHT
          this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
          this.popover.style.left = this.rect.left + scrollXOffset + linkDim.w + 'px';
        }
      },

      this.updatePopover = function() {
        var placement = null;
        if ( !self.isElementInViewport(self.popover) ) {
          placement = self.updatePlacement();
        } else {
          placement = self.options.placement;
        }

        self.stylePopover(placement);

        self.popover.className += ' in';
      },
      this.updatePlacement = function() {
        var pos = this.options.placement;
        if ( /top/.test(pos) ) { //TOP
          return 'bottom';
        } else if ( /bottom/.test(pos) ) { //BOTTOM
          return 'top';
        } else if ( /left/.test(pos) ) { //LEFT
          return 'right';
        } else if ( /right/.test(pos) ) { //RIGHT
          return 'left';
        }
      },
      this.getRect = function() {
        return this.link.getBoundingClientRect()
      },
      this.getScroll = function() {
        return {
          y : window.pageYOffset || document.documentElement.scrollTop,
          x : window.pageXOffset || document.documentElement.scrollLeft
        }
      },
      this.popoverDimensions  = function(p) {//check popover width and height
        return {
          w : p.offsetWidth,
          h : p.offsetHeight
        }
      },
      this.isElementInViewport = function(t) { // check if this.popover is in viewport
        var r = t.getBoundingClientRect();
        return (
          r.top >= 0 &&
          r.left >= 0 &&
          r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          r.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
      }
    }
    }

  // POPOVER DATA API
  // =================
  var Popovers = document.querySelectorAll('[data-toggle=popover]'), i = 0, ppl = Popovers.length;
  for (i;i<ppl;i++){  
    var item = Popovers[i], options = {};
    options.trigger = item.getAttribute('data-trigger'); // click / hover / focus
    options.animation = item.getAttribute('data-animation'); // true / false
    options.duration = item.getAttribute('data-duration');
    options.placement = item.getAttribute('data-placement');
    options.dismiss = item.getAttribute('data-dismiss');
    options.delay = item.getAttribute('data-delay');
    new Popover(item,options);
  }

  return Popover;

});
