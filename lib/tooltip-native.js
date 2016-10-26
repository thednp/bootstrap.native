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

  var self = this, timer = 0, placement = this.options.placement;

  this.open = function(e) {
    clearTimeout(timer);
    timer = setTimeout( function() {
      placement = self.options.placement; // we reset placement in all cases
      if (self.tooltip === null) {
        self.createToolTip();
        self.updateTooltip();
        self.showTooltip();
      }
    }, 20 );
  };
  this.close = function(e) {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (self.tooltip && self.tooltip !== null) {
        removeClass(self.tooltip,'in');
        setTimeout(function() {
          self.removeToolTip();
        }, self.options.duration);
      }
    }, self.options.delay + self.options.duration);
  };
  //remove the tooltip
  this.removeToolTip = function() {
    this.tooltip && this.options.container.removeChild(this.tooltip);
    this.tooltip = null;
  };
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
    this.tooltip.setAttribute('class', 'tooltip ' + placement + ' ' + this.options.animation);
  };
  this.styleTooltip = function() {
    var rect = this.link.getBoundingClientRect(), scroll = getScroll(), // link rect | window vertical and horizontal scroll
        linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top }, //link real dimensions
        tooltipDimensions = { w : this.tooltip.offsetWidth, h: this.tooltip.offsetHeight }; //tooltip real dimensions

    //apply styling
    if ( /top/.test(placement) ) { //TOP
      this.tooltip.style.top = rect.top + scroll.y - tooltipDimensions.h + 'px';
      this.tooltip.style.left = rect.left + scroll.x - tooltipDimensions.w/2 + linkDimensions.w/2 + 'px'

    } else if ( /bottom/.test(placement) ) { //BOTTOM
      this.tooltip.style.top = rect.top + scroll.y + linkDimensions.h + 'px';
      this.tooltip.style.left = rect.left + scroll.x - tooltipDimensions.w/2 + linkDimensions.w/2 + 'px';

    } else if ( /left/.test(placement) ) { //LEFT
      this.tooltip.style.top = rect.top + scroll.y - tooltipDimensions.h/2 + linkDimensions.h/2 + 'px';
      this.tooltip.style.left = rect.left + scroll.x - tooltipDimensions.w + 'px';

    } else if ( /right/.test(placement) ) { //RIGHT
      this.tooltip.style.top = rect.top + scroll.y - tooltipDimensions.h/2 + linkDimensions.h/2 + 'px';
      this.tooltip.style.left = rect.left + scroll.x + linkDimensions.w + 'px';
    }
    this.tooltip.className.indexOf(placement) === -1 && (this.tooltip.className = this.tooltip.className.replace(tipPositions,placement));
  };
  this.updateTooltip = function () {
    this.styleTooltip();
    if (!isElementInViewport(this.tooltip) ) { placement = this.updatePlacement(); this.styleTooltip(); }
  };
  this.showTooltip = function () {
    !/\bin/.test(this.tooltip.className) && ( addClass(this.tooltip,'in') );
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
  this.link.addEventListener(mouseHover[0], this.open, false);
  this.link.addEventListener(mouseHover[1], this.close, false);
  //remove title from link
  this.link.setAttribute('data-original-title',this.title);
  this.link.removeAttribute('title');
};

// TOOLTIP DATA API
// =================
var Tooltips = document.querySelectorAll('[data-toggle=tooltip]');
for (var t=0, tpl = Tooltips.length; t<tpl; t++){
  var tooltip = Tooltips[t], options = {};
  options.animation = tooltip.getAttribute('data-animation');
  options.placement = tooltip.getAttribute('data-placement');
  options.duration = tooltip.getAttribute('data-duration');
  options.delay = tooltip.getAttribute('data-delay');
  new Tooltip(tooltip,options);
}
