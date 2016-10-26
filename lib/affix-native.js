// Native Javascript for Bootstrap 3 | Affix
// by dnp_theme

//AFFIX DEFINITION
var Affix = function(element,options) {
  options = options || {};

  this.element = typeof element === 'object' ? element : document.querySelector(element);
  this.options = {};
  this.options.target = options.target ? ((typeof(options.target) === 'object') ? options.target : document.querySelector(options.target)) : null; // target is an object
  this.options.offsetTop = options.offsetTop && options.offsetTop ? ( options.offsetTop === 'function' ? options.offsetTop() : parseInt(options.offsetTop,0) ) : 0; // offset option is an integer number or function to determine that number
  this.options.offsetBottom = options.offsetBottom && options.offsetBottom ? ( options.offsetBottom === 'function' ? options.offsetBottom() : parseInt(options.offsetBottom,0) ) : null;

  if (!this.element && !(this.options.target || this.options.offsetTop || this.options.offsetBottom ) ) { return; }

  var self = this;

  this.processOffsetTop = function () {
    if ( this.options.target !== null ) {
      return this.options.target.getBoundingClientRect().top + getScroll().y;
    } else if ( this.options.offsetTop !== null ) {
      return this.options.offsetTop
    }
  };
  this.processOffsetBottom = function () {
    if ( this.options.offsetBottom !== null ) {
      var maxScroll = this.getMaxScroll();
      return maxScroll - this.element.offsetHeight - this.options.offsetBottom;
    }
  };
  this.checkPosition = function () {
    this.getPinOffsetTop = this.processOffsetTop;
    this.getPinOffsetBottom = this.processOffsetBottom;
  };
  this.pinTop = function () {
    if ( !/\baffix/.test(this.element.className) ) {
      this.element.className += ' affix';
      this.affixed = true
    }
  };
  this.unPinTop = function () {
    if ( /\baffix/.test(this.element.className) ) {
      this.element.className = this.element.className.replace(' affix','');
      this.affixed = false
    }
  };
  this.pinBottom = function () {
    if ( !/\baffix-bottom/.test(this.element.className) ) {
      this.element.className += ' affix-bottom';
      this.affixedBottom = true
    }
  };
  this.unPinBottom = function () {
    if ( /\baffix-bottom/.test(this.element.className) ) {
      this.element.className = this.element.className.replace(' affix-bottom','');
      this.affixedBottom = false
    }
  };
  this.updatePin = function () {
    if (this.affixed === false && (parseInt(this.processOffsetTop(),0) - parseInt(getScroll().y,0) < 0)) {
      this.pinTop();
    } else if (this.affixed === true && (parseInt(getScroll().y,0) <= parseInt(this.getPinOffsetTop(),0) )) {
      this.unPinTop()
    }

    if (this.affixedBottom === false && (parseInt(this.processOffsetBottom(),0) - parseInt(getScroll().y,0) < 0)) {
      this.pinBottom();
    } else if (this.affixedBottom === true && (parseInt(getScroll().y,0) <= parseInt(this.getPinOffsetBottom(),0) )) {
      this.unPinBottom()
    }
  };
  this.updateAffix = function () { // Unpin and check position again
    this.unPinTop();
    this.unPinBottom();
    this.checkPosition()

    this.updatePin() // If any case update values again
  };
  this.getMaxScroll = function(){
    return Math.max( document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )
  };
  this.scrollEvent = function(){
    window.addEventListener('scroll', function() {
      self.updatePin()
    }, false);
  };
  this.resizeEvent = function(){
    var dl = (isIE && isIE < 10) ? 500 : 50;
    window.addEventListener('resize', function () {
      setTimeout(function(){
        self.updateAffix()
      },dl);
    }, false);
  };
  // init
  this.affixed = false;
  this.affixedBottom = false;
  this.getPinOffsetTop = 0;
  this.getPinOffsetBottom = null;

  //actions
  this.checkPosition();
  this.updateAffix();
  this.scrollEvent();
  this.resizeEvent()
};

// AFFIX DATA API
// =================
var Affixes = document.querySelectorAll('[data-spy="affix"]');
for (var a=0, afl = Affixes.length; a<afl; a++) {
  var affix = Affixes[a], options = {};
    options.offsetTop     = affix.getAttribute('data-offset-top');
    options.offsetBottom  = affix.getAttribute('data-offset-bottom');
    options.target        = affix.getAttribute('data-target');

  if ( affix && (options.offsetTop !== null || options.offsetBottom !== null || options.target !== null) ) { //don't do anything unless we have something valid to pin
    new Affix(affix, options);
  }
}
