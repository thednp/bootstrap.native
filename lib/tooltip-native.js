// Native Javascript for Bootstrap 3 | Tooltip
// by dnp_theme

// TOOLTIP DEFINITION
// ===================
var Tooltip = function( element,options ) {
  options = options || {};

  this.link = typeof element === 'object' ? element : document.querySelector(element);
  this.title = this.link.getAttribute('title') || this.link.getAttribute('data-original-title');
  this.tooltip = null;
  this.options = {};
  this.options.animation = options.animation && options.animation !== 'fade' ? options.animation : 'fade';
  this.options.placement = options.placement ? options.placement : 'top';
  this.options.delay = parseInt(options.delay) || 100;
  this.duration = 150;
  this.options.duration = isIE && isIE < 10 ? 0 : (options.duration || this.duration);
  this.options.container = options.container || document.body;
  if ( !this.title ) return;
  this.timer = 0 // the link own event timer

  var self = this, events = ('onmouseleave' in this.link) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];

  this.open = function(e) {
    clearTimeout(self.link.getAttribute('data-timer'));
    self.timer = setTimeout( function() {
      if (self.tooltip === null) {
        self.createToolTip();
        self.styleTooltip();
        self.updateTooltip()
      }
    }, self.options.duration );
    self.link.setAttribute('data-timer',self.timer);
  }
  this.close = function(e) {
    clearTimeout(self.link.getAttribute('data-timer'));
    self.timer = setTimeout( function() {
      if (self.tooltip && self.tooltip !== null) {
        self.tooltip.className = self.tooltip.className.replace(' in','');
        setTimeout(function() {
          self.removeToolTip(); // for performance/testing reasons we can keep the tooltips if we want
        }, self.options.duration);
      }
    }, self.options.delay + self.options.duration);
    self.link.setAttribute('data-timer',self.timer);
  }
  //remove the tooltip
  this.removeToolTip = function() {
    this.tooltip && this.options.container.removeChild(this.tooltip);
    this.tooltip = null;
  }
  //create the tooltip structure
  this.createToolTip = function() {
    this.tooltip = document.createElement('div');
    this.tooltip.setAttribute('role','tooltip');

    var tooltipArrow = document.createElement('div');
    tooltipArrow.setAttribute('class','tooltip-arrow');
    var tooltipInner = document.createElement('div');
    tooltipInner.setAttribute('class','tooltip-inner');

    this.tooltip.appendChild(tooltipArrow);
    this.tooltip.appendChild(tooltipInner);

    //set tooltip content
    tooltipInner.innerHTML = this.title;

    //append to the container
    this.options.container.appendChild(this.tooltip);
  }
  this.styleTooltip = function(pos) {
    var rect = this.link.getBoundingClientRect(),
        placement = pos || this.options.placement;

    this.tooltip.setAttribute('class','tooltip '+placement+' '+this.options.animation);

    var ld = { w: rect.right - rect.left, h: rect.bottom - rect.top }, //link real dimensions
        td = { w : this.tooltip.offsetWidth, h: this.tooltip.offsetHeight }, //tooltip real dimensions
        sYo = this.getScroll().y, sXo = this.getScroll().x; //window vertical and horizontal scroll

    //apply styling
    if ( /top/.test(placement) ) { //TOP
      this.tooltip.style.top = rect.top + sYo - td.h + 'px';
      this.tooltip.style.left = rect.left + sXo - td.w/2 + ld.w/2 + 'px'

    } else if ( /bottom/.test(placement) ) { //BOTTOM
      this.tooltip.style.top = rect.top + sYo + ld.h + 'px';
      this.tooltip.style.left = rect.left + sXo - td.w/2 + ld.w/2 + 'px';

    } else if ( /left/.test(placement) ) { //LEFT
      this.tooltip.style.top = rect.top + sYo - td.h/2 + ld.h/2 + 'px';
      this.tooltip.style.left = rect.left + sXo - td.w + 'px';

    } else if ( /right/.test(placement) ) { //RIGHT
      this.tooltip.style.top = rect.top + sYo - td.h/2 + ld.h/2 + 'px';
      this.tooltip.style.left = rect.left + sXo + ld.w + 'px';
    }
  }
  this.updateTooltip = function() {
    var placement = null;
    if ( !isElementInViewport(this.tooltip) ) {
      placement = this.updatePlacement();
    } else {
      placement = this.options.placement;
    }
    this.styleTooltip(placement);
    this.tooltip.className += ' in';
  }
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
  }
  this.getScroll = function() {
    return {
      y : window.pageYOffset || document.documentElement.scrollTop,
      x : window.pageXOffset || document.documentElement.scrollLeft
    }
  }
  // init
  this.link.addEventListener(events[0], this.open, false);
  this.link.addEventListener(events[1], this.close, false);
  //remove title from link
  this.link.setAttribute('data-original-title',this.title);
  this.link.removeAttribute('title');
};

(function () {
  // TOOLTIP DATA API
  // =================
  var Tooltips = document.querySelectorAll('[data-toggle=tooltip]'), i = 0, tpl = Tooltips.length;
  for (i;i<tpl;i++){
    var item = Tooltips[i], options = {};
    options.animation = item.getAttribute('data-animation');
    options.placement = item.getAttribute('data-placement');
    options.duration = item.getAttribute('data-duration');
    options.delay = item.getAttribute('data-delay');
    new Tooltip(item,options);
  }
})();
