// MISC
// scrollTo
const container = document.getElementById('container'),
		sideNav = document.getElementById('side-nav'),
		mobileNav = document.getElementById('mobile-nav'),
		sideLinks = Array.from(sideNav.getElementsByTagName("A"))
			.concat(Array.from(mobileNav.getElementsByTagName("A"))),
		mobileNavParent = mobileNav.closest('nav'),
		mobileNavOffcanvas = mobileNav.closest('.offcanvas'),
		scrollTarget = document.documentElement;

function setOffset() {
	if (window.pageYOffset >= container.offsetTop) {
		mobileNavOffcanvas.style.top = mobileNavParent.offsetHeight + 'px';
	} else {
		mobileNavOffcanvas.style.top = '';
	}
}
mobileNavOffcanvas.addEventListener('show.bs.offcanvas', function(){
	setOffset();
	window.addEventListener('scroll', setOffset);
});
mobileNavOffcanvas.addEventListener('hidden.bs.offcanvas', function(){
	mobileNavOffcanvas.style.top = '';
	window.removeEventListener('scroll', setOffset)

});

sideLinks.forEach( function(x,i) {x.addEventListener('click', function(e){ 
	const target = document.getElementById(x.getAttribute('href').replace('#', ''));
	const offset =  document.body.offsetWidth <= 768 ? 70 : 0;
	e.preventDefault();
	scrollTarget.scrollTop = target.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - offset;
	if (mobileNav.contains(e.target)) BSN.Offcanvas.getInstance(mobileNavOffcanvas).hide();
})}) 

// COMPONENTS
// ==========

// demo alert fun
const dangerAlert = document.querySelector('.alert-danger'),
	alertParent = dangerAlert.parentNode,
	siblings = dangerAlert.parentNode.childNodes;

dangerAlert.addEventListener('closed.bs.alert', function(e) {
	const successAlert = document.createElement('div');
	successAlert.setAttribute('class','alert alert-success fade');
	successAlert.setAttribute('role','alert');
	successAlert.innerHTML = '<h4>Wow you REALLY got no error!</h4><p>Javascript isn\'t fun? Well, think again.</p>';
	successAlert.innerHTML += '<p>I just didn\'t want this section to be empty, looks awful..</p>';
	alertParent.insertBefore(successAlert,siblings[siblings.length-2]);
	successAlert.classList.add('show');
});

// Alert events
document.getElementById('alertDemo').addEventListener('close.bs.alert', function(e) {	
	console.log( 'The "close.bs.alert" event fired for #' + e.target.id );
	console.log( 'The "event.relatedTarget" is ' + (e.relatedTarget ? (e.relatedTarget.tagName + '.' + e.relatedTarget.className) : null) );
});
document.getElementById('alertDemo').addEventListener('closed.bs.alert', function(e) {
	console.log( 'The "closed.bs.alert" event fired for #' + e.target.id ); 
	console.log( 'The "event.relatedTarget" is ' + (e.relatedTarget ? (e.relatedTarget.tagName + '.' + e.relatedTarget.className) : null) );
});

// MODAL
var myModal = document.getElementById('myModal'); // we need a blank modal to fill up and target our object function
myModal.addEventListener('show.bs.modal', function (e) {
	e.target && console.log('show.bs.modal triggered for #' + e.target.id);
	console.log( 'The "event.relatedTarget" is ' + (e.relatedTarget ? (e.relatedTarget.tagName + '.' + e.relatedTarget.className) : null) );
}, false);
myModal.addEventListener('shown.bs.modal', function (e) {
	e.target && console.log('shown.bs.modal triggered for #' + e.target.id);
	console.log( 'The "event.relatedTarget" is ' + (e.relatedTarget ? (e.relatedTarget.tagName + '.' + e.relatedTarget.className) : null) );
}, false);
myModal.addEventListener('hide.bs.modal', function (e) {
	e.target && console.log('hide.bs.modal triggered for #' + e.target.id);
	console.log( 'The "event.relatedTarget" is ' + (e.relatedTarget ? (e.relatedTarget.tagName + '.' + e.relatedTarget.className) : null) );
}, false);
myModal.addEventListener('hidden.bs.modal', function (e) {
	e.target && console.log('hidden.bs.modal triggered for #' + e.target.id);
	console.log( 'The "event.relatedTarget" is ' + (e.relatedTarget ? (e.relatedTarget.tagName + '.' + e.relatedTarget.className) : null) );
}, false);

// Modal initialized with JavaScript
// wrap 
document.addEventListener('DOMContentLoaded', function(){
	var btnModal = document.getElementById('openModalViaJS');
	var myModalJS = document.getElementById('myModalJS');
	var modalInitJS = new BSN.Modal(myModalJS, {
		backdrop: 'static'
	});
	btnModal.addEventListener('click', function(){
		modalInitJS.show();
	}, false);
}, {once: true})


// Tab events
var tabEventsExample = document.getElementById('tabEventsExample'),
		tabEventsExampleInit = new BSN.Tab(tabEventsExample, {preserve: true});
tabEventsExample.addEventListener('show.bs.tab', function() { console.log('The show.bs.tab event fired for #' + tabEventsExample.id); }, false);
tabEventsExample.addEventListener('shown.bs.tab', function() { console.log('The shown.bs.tab event fired for #' + tabEventsExample.id); }, false);
tabEventsExample.addEventListener('hide.bs.tab', function() { console.log('The hide.bs.tab event fired for #' + tabEventsExample.id); }, false);
tabEventsExample.addEventListener('hidden.bs.tab', function() { console.log('The hidden.bs.tab event fired for #' + tabEventsExample.id); }, false);


// Tooltip events
var tooltipEvents = document.getElementById('tooltipWithEvents');
tooltipEvents.addEventListener('show.bs.tooltip', function(){ console.log('The show.bs.tooltip event fired for #' + tooltipEvents.id); }, false);
tooltipEvents.addEventListener('shown.bs.tooltip', function(){ console.log('The shown.bs.tooltip event fired for #' + tooltipEvents.id); }, false);
tooltipEvents.addEventListener('hide.bs.tooltip', function(){ console.log('The hide.bs.tooltip event fired for #' + tooltipEvents.id); }, false);
tooltipEvents.addEventListener('hidden.bs.tooltip', function(){ console.log('The hidden.bs.tooltip event fired for #' + tooltipEvents.id); }, false);
// Tooltip template example
var tooltipTemplateExample = new BSN.Tooltip('#tooltipTemplateExample', {
	template: '<div class="tooltip custom-class" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
	position: 'top',
	container: '#tooltipExamples',
	sanitizeFn: function(dirty){
		return DOMPurify.sanitize( dirty );
	}	
});

// Tooltip HTMLElement as title option
var tooltipElementContent = document.getElementById('tooltipElementContent');
var tooltipTitle = document.createElement('span'); tooltipTitle.innerHTML = '<b>Tooltip on LEFT</b> <span class="badge bg-danger">HOT</span><br>This tooltip uses a title set via JavaScript as <code>HTMLElement</code> elements.<br>This feature is JavaScript only.';
new BSN.Tooltip(tooltipElementContent, { title: tooltipTitle });

// Popover 
var popover1 = new BSN.Popover('#popover-via-click', { container: '#popoverExamples',	trigger: 'click' } );

// demo popover, using template
var someTitleFromOtherCode = 'Popover via JavaScript <span class="badge bg-primary">Template</span>';
var someContentFromOuterSpace = document.createElement('p');
someContentFromOuterSpace.innerHTML = 'This Popover is using FOCUS event option. Some sample message from outer space wrapped in &lt;p&gt; tags.';
var samplePopoverTemplate = '<div class="popover border-dark" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header bg-dark border-secondary text-white"></h3><div class="popover-body bg-secondary text-light"></div></div>';

var popover2 = new BSN.Popover('.popover-via-template', {
	trigger: 'focus',
	// trigger: 'click',
	title: someTitleFromOtherCode,
	content: someContentFromOuterSpace,
	template: samplePopoverTemplate,
	sanitizeFn: function(dirty){
		return DOMPurify.sanitize( dirty );
	}
});

var popoverEvents = document.getElementById('popoverWithEvents');
popoverEvents.addEventListener('show.bs.popover', function(){ console.log('The show.bs.popover event fired for #' + popoverEvents.id); }, false);
popoverEvents.addEventListener('shown.bs.popover', function(){ console.log('The shown.bs.popover event fired for #' + popoverEvents.id); }, false);
popoverEvents.addEventListener('hide.bs.popover', function(){ console.log('The hide.bs.popover event fired for #' + popoverEvents.id); }, false);
popoverEvents.addEventListener('hidden.bs.popover', function(){ console.log('The hidden.bs.popover event fired for #' + popoverEvents.id); }, false);

var popoverElementContents = document.getElementById('popoverElementContents');
var popoverTitle = document.createElement('span'); popoverTitle.innerHTML = 'Popover on RIGHT <span class="badge bg-danger">HOT</span>';
var popoverContent = document.createElement('span'); popoverContent.innerHTML = 'This popover uses a custom <code>class</code> set via <code>data-bs-custom-class</code> attribute, but the title and content are set via JavaScript as <code>HTMLElement</code> elements. This feature is JavaScript only.';
new BSN.Popover(popoverElementContents, {
	title: popoverTitle,
	content: popoverContent
});

// TOAST
var toastBTN = document.getElementById('myTastyToastBTN');
var toastElement = toastBTN.closest('.toast');
var showToastBTN = document.getElementById('showToastBTN');

toastElement.addEventListener('show.bs.toast',function(e){
	console.log( 'The "show.bs.toast" event fired for #' + toastElement.id );
},false)
toastElement.addEventListener('shown.bs.toast',function(e){
	console.log( 'The "shown.bs.toast" event fired for #' + toastElement.id );
	// showToastBTN.classList.add('d-none')
},false)
toastElement.addEventListener('hide.bs.toast',function(e){
	console.log( 'The "hide.bs.toast" event fired for #' + toastElement.id );
},false)
toastElement.addEventListener('hidden.bs.toast',function(e){
	console.log( 'The "hidden.bs.toast" event fired for #' + toastElement.id );
	// showToastBTN.classList.remove('d-none')
},false)

showToastBTN.addEventListener('click',function(){
	const inst = BSN.Toast.getInstance(toastElement);
	inst ? inst.show() : console.log( 'DISPOSED!' )
}, false)

// ScrollSpy
var disposableSpy = document.getElementById('disposableSpy');
var scrollSpyEventCallback = function(e){
	const { tagName, classList } = e.relatedTarget;
	var scrollSpyLog = 'The "activate.bs.scrollspy" event fired for #' + disposableSpy.id
		+ '\nevent.relatedTarget: ' + (e.relatedTarget ? (tagName + '.' + [...classList].join('.')) : 'null');
	console.log(scrollSpyLog);
}
disposableSpy.addEventListener('activate.bs.scrollspy', scrollSpyEventCallback);

function toggleScrollSpy(){
	var spyInstance = BSN.ScrollSpy.getInstance(disposableSpy);

	if ( spyInstance ){
		disposableSpy.removeEventListener('activate.bs.scrollspy', scrollSpyEventCallback);
		spyInstance.dispose()
		this.innerHTML = 'Init'
		this.classList.remove( 'btn-outline-danger' )
		this.classList.add( 'btn-outline-primary' )
	} else {
		new BSN.ScrollSpy(disposableSpy)
		disposableSpy.addEventListener('activate.bs.scrollspy', scrollSpyEventCallback);
		this.innerHTML = 'Dispose'
		this.classList.remove( 'btn-outline-primary' )                        
		this.classList.add( 'btn-outline-danger' )
	}
}

// offcanvas
var offcanvasExample = document.getElementById('offcanvasExample');
offcanvasExample.addEventListener('show.bs.offcanvas', function(e){
	var related = e.relatedTarget;
	var relatedTarget = '\nevent.relatedTarget is: ' +  (related ? related.tagName + '.' + related.className.replace(/\s/,'.') : 'null');
	console.log('The show.bs.offcanvas event fired for #' + offcanvasExample.id + relatedTarget);
}, false);
offcanvasExample.addEventListener('shown.bs.offcanvas', function(e){
	var related = e.relatedTarget;
	var relatedTarget = '\nevent.relatedTarget is: ' +  (related ? related.tagName + '.' + related.className.replace(/\s/,'.') : 'null');
	console.log('The shown.bs.offcanvas event fired for #' + offcanvasExample.id + relatedTarget);
}, false);
offcanvasExample.addEventListener('hide.bs.offcanvas', function(e){
	var related = e.relatedTarget;
	var relatedTarget = '\nevent.relatedTarget is: ' +  (related ? related.tagName + '.' + related.className.replace(/\s/,'.') : 'null');
	console.log('The hide.bs.offcanvas event fired for #' + offcanvasExample.id + relatedTarget);
}, false);
offcanvasExample.addEventListener('hidden.bs.offcanvas', function(e){
	var related = e.relatedTarget;
	var relatedTarget = '\nevent.relatedTarget is: ' +  (related ? related.tagName + '.' + related.className.replace(/\s/,'.') : 'null');
	console.log('The hidden.bs.offcanvas event fired for #' + offcanvasExample.id + relatedTarget);
}, false);

// carousel
const carouselGenericExample = document.getElementById('carouselGenericExample');
carouselGenericExample.addEventListener('slide.bs.carousel', function(e) {
	var related = `\n> relatedTarget <div class="${Array.from(e.relatedTarget.classList).join(' ')}">\n`;
	var from = `\n> from index ${e.from}`;
	var to = `\n> to index ${e.to}`;
	var direction = `\n> with direction ${e.direction}`;
	console.log('The "slide.bs.carousel" event fired for <div id="' + carouselGenericExample.id + '"> ' + direction + from + to + related);
}, false);
carouselGenericExample.addEventListener('slid.bs.carousel', function(e) {
	var related = `\n> relatedTarget <div class="${Array.from(e.relatedTarget.classList).join(' ')}">\n`;
	var from = `\n> from index ${e.from}`;
	var to = `\n> to index ${e.to}`;
	var direction = `\n> with direction ${e.direction}`;
	console.log('The "slid.bs.carousel" event fired for <div id="' + carouselGenericExample.id + '"> ' + direction + from + to + related);
}, false);

// RTL play
function switchDirection() {
	var isRTL = document.documentElement.dir === 'rtl';
	var bsCSS = document.getElementById('bsCSS');
	var href = bsCSS.getAttribute('href');

	if (isRTL) {
		bsCSS.href = href.replace('bootstrap.rtl.min', 'bootstrap.min');
		document.documentElement.removeAttribute('dir');
		this.innerText = 'RTL';
	} else {
		bsCSS.href = href.replace('bootstrap.min', 'bootstrap.rtl.min');
		document.documentElement.setAttribute('dir', 'rtl');
		this.innerText = 'LTR';
	}
}
