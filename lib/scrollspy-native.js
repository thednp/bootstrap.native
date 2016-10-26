// Native Javascript for Bootstrap 3 | ScrollSpy
// by dnp_theme

//SCROLLSPY DEFINITION
var ScrollSpy = function(element,item,options) {
  options = options || {};

  //this is the container element we spy it's elements on
  this.element = typeof element === 'object' ? element : document.querySelector(element);

  this.options = {};
  // this is the UL menu component our scrollSpy object will target, configure and required by the container element
  this.options.target = options.target ? (typeof options.target === 'object' ? options.target : document.querySelector(options.target)) : null;

  //we need to determine the index of each menu item
  this.items = this.options.target && this.options.target.getElementsByTagName('A');

  this.item = item;
  // the parent LI element
  this.parent = this.item.parentNode;

  // the upper level LI ^ UL ^ LI, this is required for dropdown menus
  this.parentParent = this.parent.parentNode.parentNode;

  this.tg = this.item.href && document.getElementById(this.item.getAttribute('href').replace('#',''));
  this.active = false;
  this.topEdge = 0;
  this.bottomEdge = 0;
  var self = this;

  //determine which is the real scrollTarget
  if ( this.element.offsetHeight < this.element.scrollHeight ) { // or this.scrollHeight()
    this.scrollTarget = this.element;
  } else {
    this.scrollTarget = window;
  }

  if ( !this.options.target ) { return; }

  this.topLimit = function () { // the target offset
    if ( this.scrollTarget === window ) {
      return this.tg.getBoundingClientRect().top + this.scrollOffset() - 5
    } else {
      return this.tg.offsetTop;
    }
  }
  this.bottomLimit = function () {
    return this.topLimit() + this.tg.clientHeight
  }
  this.checkEdges = function () {
    this.topEdge = this.topLimit();
    this.bottomEdge = this.bottomLimit()
  }
  this.scrollOffset = function () {
    if ( this.scrollTarget === window ) {
      return getScroll().y;
    } else {
      return this.element.scrollTop;
    }
  }
  this.activate = function () {
    if ( this.parent && this.parent.tagName === 'LI' && !/\bactive/.test(this.parent.className) ) {
      addClass(this.parent,'active');
      if ( this.parentParent && this.parentParent.tagName === 'LI' // activate the dropdown as well
        && /\bdropdown/.test(this.parentParent.className)
        && !/\bactive/.test(this.parentParent.className) ) { addClass(this.parentParent,'active'); }
      this.active = true
    }
  }
  this.deactivate = function () {
    if ( this.parent && this.parent.tagName === 'LI' && /\bactive/.test(this.parent.className) ) {
      removeClass(this.parent,'active');
      if ( this.parentParent && this.parentParent.tagName === 'LI' // deactivate the dropdown as well
        && /\bdropdown/.test(this.parentParent.className)
        && /\bactive/.test(this.parentParent.className) ) { removeClass(this.parentParent,'active'); }
      this.active = false
    }
  }
  this.toggle = function () {
    if ( this.active === false
      && ( this.bottomEdge > this.scrollOffset() && this.scrollOffset() >= this.topEdge )) { //regular use, scroll just entered the element's topLimit or bottomLimit
        this.activate();
    } else if (this.active === true && (this.bottomEdge <= this.scrollOffset() && this.scrollOffset() < this.topEdge )) {
      this.deactivate()
    }
  }
  this.refresh = function () { // check edges again
    this.deactivate();
    this.checkEdges();

    this.toggle() // If any case update values again
  }
  this.scrollEvent = function(){
    function onSpyScroll() {
      self.refresh();
    }
    this.scrollTarget.addEventListener('scroll', onSpyScroll, false);
  }
  this.resizeEvent = function(){
    function onSpyResize() {
      self.refresh()
    }
    window.addEventListener('resize', onSpyResize, false);
  }
  this.scrollHeight = function() {
    if ( this.scrollTarget === window ) {
      return Math.max( document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    } else {
      return this.element.scrollHeight
    }
  }

  // init
  if ( this.item.getAttribute('href') && this.item.getAttribute('href').indexOf('#') > -1 ) {
    //actions
    this.checkEdges();
    this.refresh()
    this.scrollEvent();
    if (!(isIE && isIE < 9)) { this.resizeEvent(); }
  }
};

//SCROLLSPY DATA API
//=============
var scrollSpyes = document.querySelectorAll('[data-spy="scroll"]'); // mostly is the document.body or a large container with many elements having id="not-null-id"
for (var s=0, ssl = scrollSpyes.length; s<ssl; s++) {
  var spy = scrollSpyes[s], options = {};
  options.target = spy.getAttribute('data-target') || null;  // this must be a .nav component with id="not-null"
  if ( options.target !== null ) {
    var menu = options.target === 'object' ?  options.target : document.querySelector(options.target),
      spyTriggers = menu.querySelectorAll('a');
    for (var tr=0, stl = spyTriggers.length; tr<stl; tr++) {
      var spyTrigger = spyTriggers[tr];
      if ( spyTrigger.href && spyTrigger.getAttribute('href') !== '#' )
      new ScrollSpy(spy, spyTrigger, options);
    }
  }
}
