//Vanilla JS script | Affix for Bootstrap 3
//by dnp_theme

//AFFIX DEFINITION
function affix(element,options) {
	this.element = (typeof(element) === 'object') ? element : document.querySelector(element);
	this.target = (this.target) ? ((typeof(options.target) === 'object') ? options.target : document.querySelector(options.target)) : document.querySelector(this.element.dataset.target);
	this.targetOffset = (this.target) ? (this.target.offsetTop - this.target.scrollTop + this.target.parentNode.offsetTop - this.target.parentNode.scrollTop) : this.element.dataset.offsetTop;
	if (this.element && (this.target || (this.options && this.options.offset.top) || this.element.dataset.offsetTop)) { this.init(); }
	
}

//AFFIX METHODS
affix.prototype = {
	init: function () {
		this.docked = false;
		this.getPinnedOffset = 0;
		
		//events
		this.checkPosition();
		this.updateAffix();
		this.scrollEvent();
		this.resizeEvent();
		
	},
	offsetTop: function () {
		return this.element.dataset.offsetTop || this.targetOffset || this.options.offset.top || 0;
	},
	checkPosition: function () {
		this.getPinnedOffset = this.offsetTop;
	},
	scrollOffset: function () {
		return window.pageYOffset;
	},
	pin: function () {
		if (this.element.classList) this.element.classList.add('affix'); else this.element.className += 'affix';
		this.docked = true;
	},
	unPin: function () {
		if (this.element.classList) this.element.classList.remove('affix'); else this.element.className = '';
		this.docked = false;
	},

	updatePin: function () {
		if (this.docked === false && (parseInt(this.offsetTop(),0) - parseInt(this.scrollOffset(),0) < 0)) {
			this.pin();
		} else if (this.docked === true && (parseInt(this.scrollOffset(),0) <= parseInt(this.getPinnedOffset(),0) )) {
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
			var $spy = spy[i];
			var data = $spy.dataset;

			data.offset = data.offsetTop || {};
			data.target = data.target || null;

			if (data.offsetTop		  != null) data.offset.top    = data.offsetTop;
			if (data.target			  != null) data.target  	  = data.target;

			return new affix($spy, data);
		}
	}
}
