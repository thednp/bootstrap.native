//Vanilla JS script | Affix for Bootstrap 3
//by dnp_theme

//AFFIX DEFINITION
function affix(element,options) {
	this.element = (typeof(element) === 'object') ? element : document.querySelector(element);
	this.target = (options.target) ? ((typeof(options.target) === 'object') ? options.target : document.querySelector(options.target)) : document.querySelector(this.element.getAttribute('data-target'));
	this.targetOffset = (this.target) ? (this.target.offsetTop - this.target.scrollTop + this.target.parentNode.offsetTop - this.target.parentNode.scrollTop) : this.element.getAttribute('data-offset-top');
	if (this.element && (this.target || (this.options && this.options.offset.top) || this.element.getAttribute('data-offset-top') )) { this.init(); }
}

//AFFIX METHODS
affix.prototype = {
	init: function () {
		this.affixed = false;
		this.getPinnedOffset = 0;
		
		//events
		this.checkPosition();
		this.updateAffix();
		this.scrollEvent();
		this.resizeEvent();
		
	},
	offsetTop: function () {
		return (this.targetOffset||null) || (this.options.offset.top||null) || (this.element.getAttribute('data-offset-top')||null) || 0;
	},
	checkPosition: function () {
		this.getPinnedOffset = this.offsetTop;
	},
	scrollOffset: function () {
		return window.pageYOffset;
	},
	pin: function () {
		var reg = new RegExp("(\\s|^)" + 'affix' + "(\\s|$)");
		if ( this.element.className && !reg.test(this.element.className) ) this.element.className += ' affix';
		this.affixed = true;
	},
	unPin: function () { 
		var reg = new RegExp("(\\s|^)" + 'affix' + "(\\s|$)");
		if ( this.element.className && reg.test(this.element.className) ) this.element.className = this.element.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
		this.affixed = false;
	},

	updatePin: function () {
		if (this.affixed === false && (parseInt(this.offsetTop(),0) - parseInt(this.scrollOffset(),0) < 0)) {
			this.pin();
		} else if (this.affixed === true && (parseInt(this.scrollOffset(),0) <= parseInt(this.getPinnedOffset(),0) )) {
			this.unPin();
		}
	},
	updateAffix : function () {
		// Unpin and check position again
		this.unPin();
		this.checkPosition();

		// If any case update values again
		this.updatePin();
	},
	scrollEvent : function(){
		var el = this;
		window.onscroll = function () {
			el.updatePin();
		};
	},
	resizeEvent : function(){
		var el = this;
		window.onresize = function () {
			setTimeout(function(){
				el.updateAffix();
			},100);
		};
	}
};
			
//DATA API
window.onload = function () {
	var spy = document.querySelectorAll('[data-spy="affix"]');
	if (spy) {
		for ( var i=0; i<spy.length; i++) {
			if ( spy[i].getAttribute('data-offset-top') !== null || spy[i].getAttribute('data-target') !== null ) {
				var $spy = spy[i];
				var data = {};
				data.offsetTop	= $spy.getAttribute('data-offset-top') || {};
				data.target		= $spy.getAttribute('data-target') || null;

				if (data.offsetTop		  != null) data.offsetTop    = data.offsetTop;
				if (data.target			  != null) data.target  	  = data.target;

				return new affix($spy, data);
			}
		}
	}
}
