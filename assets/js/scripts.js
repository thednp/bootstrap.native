var myModal = document.getElementById('myModal'); // we need a blank modal to fill up and target our object function
myModal.addEventListener('show.bs.modal', function(e) {
	e.target && console.log('show.bs.modal triggered for #'+e.target.id);
	e.relatedTarget && console.log('event.relatedTarget is '+e.relatedTarget.tagName+'.'+e.relatedTarget.className.replace(/\s/g,'.'));
}, false);
myModal.addEventListener('shown.bs.modal', function(e) {
	e.target && console.log('shown.bs.modal triggered for #'+e.target.id);
	e.relatedTarget && console.log('event.relatedTarget is '+e.relatedTarget.tagName+'.'+e.relatedTarget.className.replace(/\s/g,'.'));
}, false);
myModal.addEventListener('hide.bs.modal', function(e) {
	e.target && console.log('hide.bs.modal triggered for #'+e.target.id);
	e.relatedTarget && console.log('event.relatedTarget is '+e.relatedTarget.tagName+'.'+e.relatedTarget.className.replace(/\s/g,'.'));
}, false);
myModal.addEventListener('hidden.bs.modal', function(e) {
	e.target && console.log('hidden.bs.modal triggered for #'+e.target.id);
	e.relatedTarget && console.log('event.relatedTarget is '+e.relatedTarget.tagName+'.'+e.relatedTarget.className.replace(/\s/g,'.'));
}, false);


// Modal initialized with JavaScript
var myModalJS = document.getElementById('myModalJS'); // we need a blank modal to fill up and target our object function
var btnModal = document.getElementById('openModalViaJS');
var firstModalContent = '<div class="modal-header">'
		+'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
		+'<h4 class="modal-title" id="myModalJSLabel">Modal title</h4>'
		+'</div>'
		+'<div class="modal-body">'
		+'<p>This is a damn awesome modal content template configured via Javascript, using the specific modal events like <code>show.bs.modal</code>, so please open your console and check the log entries.</p>'
		+'</div>'
		+'<div class="modal-footer">'
		+'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
		+'<button type="button" class="btn btn-primary">Save changes</button>'
		+'</div>';

// init the modal
var modalInitJS = new Modal(myModalJS, {
	content: firstModalContent,
	backdrop: 'static'
});

btnModal.addEventListener('click',function(e){
	modalInitJS.show();
},false);

// another button
var btnModal2 = document.getElementById('openModalViaJS2');
var externalModalContent = {
	title: 'Some title coming from space, a custom variable',
	content: 'This example also uses the specific modal events like <code>show.bs.modal</code>, so please open your console and check the logs. This is also a variable here, efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
};

// set new content for the modal and show it
btnModal2.addEventListener('click', function() {
	//template content for modal example 2
	modalInitJS.setContent('<div class="modal-header">'
		+'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
		+'<h4 class="modal-title" id="myModalJSLabel">'+externalModalContent.title+'</h4>'
		+'</div>'
		+'<div class="modal-body">'
		+'<p>'+externalModalContent.content+'</p>'
		+'</div>'
		+'<div class="modal-footer">'
		+'<button type="button" class="btn btn-danger">Delete</button>'
		+'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
		+'</div>');
	modalInitJS.show();
}, false);

// another button to be used to reset modal content
var btnModalNotTrigger = document.getElementById('modalNotTriggerJS');
btnModalNotTrigger.addEventListener('click', function(e) {
	e.preventDefault();
	modalInitJS.setContent(firstModalContent);
	modalInitJS.show();
}, false);

// NEW added events to Modal
myModalJS.addEventListener('show.bs.modal', function(e) {
	var related = ', relatedTarget: '+ (e.relatedTarget ?  e.relatedTarget.tagName + '.'+e.relatedTarget.className.replace(/\s/g,'.') : 'null');
	console.log( 'The "show.bs.modal" event fired for #' + e.target.id + related ); 
}, false);
myModalJS.addEventListener('shown.bs.modal', function(e) {
	var related = ', relatedTarget: '+ (e.relatedTarget ?  e.relatedTarget.tagName + '.'+e.relatedTarget.className.replace(/\s/g,'.') : 'null');
	console.log( 'The "shown.bs.modal" event fired for #' + e.target.id + related ); 
}, false);
myModalJS.addEventListener('hide.bs.modal', function(e) { console.log( 'The "hide.bs.modal" event fired for #' + e.target.id ); }, false);
myModalJS.addEventListener('hidden.bs.modal', function(e) { console.log( 'The "hidden.bs.modal" event fired for #' + e.target.id ); }, false);

// updating modal while visible
var modalUpdate = document.getElementById('modalUpdate'), // the trigger
	anotherStaticModal = document.getElementById('anotherStaticModal'), // the modal
	currentStaticModalBody = anotherStaticModal.querySelector('.modal-body'), // the body of the current modal
	currentStaticModalBodyContent = currentStaticModalBody.innerHTML, // we cache the content of the body
	modalUpdateInit = modalUpdate.Modal, // the initialization
	changeModal1 = document.getElementById('changeModal1'), // the change buttons
	changeModal2 = document.getElementById('changeModal2');

changeModal1.addEventListener('click', function(){
	if (!/scroll/i.test(currentStaticModalBody.innerHTML)){
		changeModal1.className += ' hidden';
		changeModal2.className = changeModal2.className.replace(new RegExp('(\\s|^)hidden(\\s|$)','g'),'');
		currentStaticModalBody.innerHTML = currentStaticModalBodyContent; // set
		modalUpdateInit.update(); // trigger the update
	}
}, false);

changeModal2.addEventListener('click', function(){
	if (/scroll/i.test(currentStaticModalBody.innerHTML)){
		changeModal2.className += ' hidden';
		changeModal1.className = changeModal1.className.replace(new RegExp('(\\s|^)hidden(\\s|$)','g'),' ');
		currentStaticModalBody.innerHTML = '<h4>This modal changed via JavaScript</h4><p>OK now this is a different content.</p>';
		modalUpdateInit.update();
	}
}, false);


// Dropdown init via JS
var makeMeDropdown = document.getElementById('makeMeDropdown');
var myDropdownTemplate = '<div class="dropdown btn-group">'
	+'<button id="formDropdown" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false" tabindex="0">Login <span class="caret"></span></button>'
	+'<form class="form-vertical dropdown-menu">'
		+'<div class="form-group">'
			+'<label for="inputEmail3" class="control-label">Email</label>'
			+'<div class="">'
				+'<input type="email" class="form-control" id="inputEmail3" placeholder="Email">'
			+'</div>'
		+'</div>'
		+'<div class="form-group">'
			+'<label for="inputPassword3" class="control-label">Password</label>'
			+'<div class="">'
				+'<input type="password" class="form-control" id="inputPassword3" placeholder="Password">'
			+'</div>'
		+'</div>'
		+'<div class="form-group">'
			+'<div class="">'
				+'<div class="checkbox">'
					+'<label>'
						+'<input type="checkbox"> Remember me'
					+'</label>'
				+'</div>'
			+'</div>'
		+'</div>'
		+'<div class="form-group">'
			+'<div class="">'
				+'<button type="submit" class="btn btn-default">Sign in</button>'
			+'</div>'
		+'</div>'
	+'</form>'
+'</div>';

makeMeDropdown.addEventListener('click', function(e){
	e.preventDefault();

	if ( !/\bdisabled/.test(makeMeDropdown.className) ){

		// invalidate the makeMeDropdown
		this.setAttribute('disabled',true);
		this.className = 'btn btn-default disabled';
		this.innerHTML = 'All done';

		this.parentNode.innerHTML += myDropdownTemplate;

		//get the new dropdown
		var formDropdown = document.getElementById('formDropdown');

		// initiate with option
		var DropdownInit = new Dropdown(formDropdown, true);

		// NEW: attach Dropdown original events
		formDropdown.parentNode.addEventListener('show.bs.dropdown', function(e){
			var related = null;
			related = ', relatedTarget: '+ (e.relatedTarget ?  e.relatedTarget.tagName + '.'+e.relatedTarget.className.replace(/\s/g,'.') : 'null');
			console.log('The show.bs.dropdown event fired for parent of #' + formDropdown.id + related ); 
		}, false);
		formDropdown.parentNode.addEventListener('shown.bs.dropdown', function(e){
			var related = null;
			related = ', relatedTarget: '+ (e.relatedTarget ?  e.relatedTarget.tagName + '.'+e.relatedTarget.className.replace(/\s/g,'.') : 'null');
			console.log('The shown.bs.dropdown event fired for parent of #' + formDropdown.id + related ); 
		}, false);
		formDropdown.parentNode.addEventListener('hide.bs.dropdown', function(e){
			var related = null;
			related = ', relatedTarget: '+ (e.relatedTarget ?  e.relatedTarget.tagName + '.'+e.relatedTarget.className.replace(/\s/g,'.') : 'null');
			console.log('The hide.bs.dropdown event fired for parent of #' + formDropdown.id + related ); 
		}, false);
		formDropdown.parentNode.addEventListener('hidden.bs.dropdown', function(e){
			var related = null;
			related = ', relatedTarget: '+ (e.relatedTarget ?  e.relatedTarget.tagName + '.'+e.relatedTarget.className.replace(/\s/g,'.') : 'null');
			console.log('The hidden.bs.dropdown event fired for parent of #' + formDropdown.id + related ); 
		}, false);
	}
}, false);


//switch views for tabs
var exampleTab = document.getElementById('exampleTab');
var tabsToggleView = document.getElementById('tabSwitcher');
var tabsDemo = document.getElementById('myTab');
tabsToggleView.addEventListener('click', function(e){
	e.preventDefault();
	if ( e.target.tagName === 'A' && e.target.getAttribute('data-nclass') !== undefined ) {
		tabsDemo.className = e.target.getAttribute('data-nclass'); tabsToggleView.querySelector('button').innerHTML = 'Viewing ' + e.target.innerHTML
	} else {
		return false;
	}
});

//demo alert fun
var dangerAlert = document.querySelector('.alert-danger'),
	siblings = dangerAlert.parentNode.childNodes;
dangerAlert.addEventListener('closed.bs.alert', function(e) {
	var successAlert = document.createElement('div');
	successAlert.setAttribute('class','alert alert-success fade');
	successAlert.setAttribute('role','alert');
	successAlert.innerHTML = '<h4>Wow you REALLY got no error!</h4><p>Javascript isn\'t fun? Well, think again.</p>';
	successAlert.innerHTML += '<p>I just didn\'t want this section to be empty, looks awful..</p>';
	dangerAlert.parentNode.insertBefore(successAlert,siblings[siblings.length-2]);
	if (successAlert.classList) {
		successAlert.classList.add('in');
	} else {
		successAlert.className += ' in';
	}
});

// NEW Alert events
document.getElementById('alertDemo').addEventListener('close.bs.alert', function(e) {	console.log( 'The "close.bs.alert" event fired for #' + e.target.id ); });
document.getElementById('alertDemo').addEventListener('closed.bs.alert', function(e) {	console.log( 'The "closed.bs.alert" event fired for #' + e.target.id ); });


//demo popover. trigger via click
var popover1 = new Popover('#popover-via-click', { trigger: 'click'} );

// demo popover, using template
var someTitleFromOtherCode = 'Popover via JavaScript <span class="label label-primary">FOCUS</span>';
var someContentFromOuterSpace = '<p>Some sample message from outer space wrapped in &lt;p&gt; tags. You can add your own functions to combine with Popover template as you wish.</p>';
var popover2 = new Popover('.popover-via-template', {
	trigger: 'focus',
	template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title">'+someTitleFromOtherCode+'</h3><div class="popover-content">'+someContentFromOuterSpace+'</div></div>'
});

// new Popover events
var popoverEvents = document.getElementById('popoverWithEvents');
popoverEvents.addEventListener('show.bs.popover', function(){ console.log('The show.bs.popover event fired for #' + popoverEvents.id); }, false);
popoverEvents.addEventListener('shown.bs.popover', function(){ console.log('The shown.bs.popover event fired for #' + popoverEvents.id); }, false);
popoverEvents.addEventListener('hide.bs.popover', function(){ console.log('The hide.bs.popover event fired for #' + popoverEvents.id); }, false);
popoverEvents.addEventListener('hidden.bs.popover', function(){ console.log('The hidden.bs.popover event fired for #' + popoverEvents.id); }, false);


//demo button
var btn = document.getElementById('myButton');
var success = document.getElementById('successButton'),	successOuter = success.outerHTML;

btn.addEventListener('click', function() {
	Button(btn,'loading');
	setTimeout(function() {
		if ( !document.getElementById('successButton') ) {

			var newSuccess = document.createElement('div');
			btn.parentNode.parentNode.insertBefore(newSuccess, btn.parentNode.nextSibling);
			newSuccess.outerHTML = successOuter;

			// reidentify the new alert and reinit alert
			success = document.getElementById('successButton');
			new Alert(success.querySelector('[data-dismiss="alert"]')); // initialize if not already
		}

		success.style.display = 'block';
		setTimeout(function(){
			success.className += ' in';
		}, 10)

		Button(btn,'reset');
	}, 2000)
});

//demo carousel-example-generic demonstrating the slid and slide events
var genericCarousel = document.getElementById('carousel-example-generic');
genericCarousel.addEventListener('slide.bs.carousel', function(e) {
	console.log( 'The #' + e.target.id + ' is about to slide, and this was the "slide" event, direction: ' + genericCarousel.Carousel.direction + ', relatedTarget: ' + e.relatedTarget.tagName + '.' + e.relatedTarget.className );
});
genericCarousel.addEventListener('slid.bs.carousel', function(e) {
	console.log( 'The #' + e.target.id + ' has finished the slide transition, and this was the "slid" event, direction: ' + genericCarousel.Carousel.direction + ', relatedTarget: ' + e.relatedTarget.tagName + '.' + e.relatedTarget.className );	
});

//demo myCarousel demonstrating the slid and slide events
var mainSlider = document.getElementById('myCarousel');
var mainSliderItems = mainSlider.querySelectorAll('.item');

mainSlider.addEventListener('slide.bs.carousel', function(e) {
	var currentActive = mainSlider.Carousel.getActiveIndex();
	var activeCaption = mainSliderItems[currentActive].querySelector('.carousel-caption');
	activeCaption.classList.remove('slide');
});
mainSlider.addEventListener('slid.bs.carousel', function(e) {
	var activeCaption = e.relatedTarget.querySelector('.carousel-caption');
	activeCaption.classList.add('slide');
});

// JS init for carousel example
// var exampleCarousel = document.getElementById('carousel-example-generic');
// var exampleCarouselInit = new Carousel(exampleCarousel);

/* side-nav autoresize on window scroll and resize */
var sideNav = document.getElementById('side-nav');
if ( document.documentElement && !/ie/.test(document.documentElement.className) ) {
	function resetNav() {
		document.getElementById('nav-scrollspy').style.width = '';
	}
	function adjustNav() {
		var ww = window.innerWidth || document.documentElement.clientWidth;
		if ( ww >= 768 ) {
			document.getElementById('nav-scrollspy').style.width = (sideNav.offsetWidth - 15) + 'px';
		} else { resetNav() }
	}
	adjustNav();
	window.addEventListener('resize', adjustNav, false)// adjust on resize
}

// scrollTo
var sideLinks = sideNav.getElementsByTagName("A"), 
		browserString = navigator.userAgent, 
		scrollTarget = /(EDGE|Mac)/i.test(browserString) ? document.body : document.documentElement;

for (var i=0, sll=sideLinks.length; i<sll; i++) {
	sideLinks[i].addEventListener('click', scrollTo = function(e){
		var target = document.getElementById(e.target.getAttribute('href').replace('#',''));
		
		e.preventDefault();
		scrollTarget.scrollTop = target.getBoundingClientRect().top + (window.pageYOffset||document.documentElement.scrollTop) - (i===0?0:60);
	}, false);
}

// scrollSpy stuff
var mainContainerSpy = document.querySelector('[data-target="#side-nav"]');
mainContainerSpy.addEventListener('activate.bs.scrollspy', function(e){
	var navScrollspy = document.getElementById('nav-scrollspy');
	var componentsItem = navScrollspy.querySelector('li.list11');
	var target = e.relatedTarget;
	if ( componentsItem === target.parentNode || componentsItem.querySelector('li.active') === target.parentNode ) {
		if ( componentsItem.querySelector('.list5.active') ){
			componentsItem.classList.add('additional');
		} else {
			componentsItem.classList.remove('additional');
		}
	}
}, false);

/* BOOTSTRAP ORIGINAL EVENTS 
---------------------------*/

// demo for Button toggle, renamed from bs.button.change to change.bs.button
var checkboxes = document.getElementById('checkboxButtons'); // checkboxes grpup
var radioButtons = document.getElementById('radioButtons'); // radioButtons grpup
var checkBtns = checkboxes.querySelectorAll('input[type="checkbox"]'); // checkboxes
var radioBtns = radioButtons.querySelectorAll('input[type="radio"]'); // radios
checkboxes.addEventListener('change.bs.button', function() { console.log( 'The button group with CHECKBOXES changed' ); });
checkBtns[0].addEventListener('change.bs.button',function() {	console.log( 'Hopa! This handler is bound by the "change" of the FIRST CHECKBOX only.' ); });
document.getElementById('radioButtons').addEventListener('change.bs.button', function() { console.log( 'The button group with RADIOS changed' ); });
radioBtns[0].addEventListener('change.bs.button', function() { console.log( 'This handler is bound by the "change" of the FIRST RADIO button only.' ); });


// new Affix events, well some of them
var navScrollspy = document.getElementById('nav-scrollspy');
navScrollspy.addEventListener('affix.bs.affix', function(e) {	console.log( 'The "affix.bs.affix" event fired for #' + e.target.id );}, false );
navScrollspy.addEventListener('affix-top.bs.affix', function(e) {	console.log( 'The "affix-top.bs.affix" event fired for #' + e.target.id );}, false );
navScrollspy.addEventListener('affix-bottom.bs.affix', function(e) { console.log( 'The "affix-bottom.bs.affix" event fired for #' + e.target.id ); }, false );

// new Collapse events
var collapseExample = document.getElementById('collapseExample');
collapseExample.addEventListener('show.bs.collapse', function(){ console.log('The show.bs.collapse event fired for #' + collapseExample.id); },false);
collapseExample.addEventListener('shown.bs.collapse', function(){ console.log('The shown.bs.collapse event fired for #' + collapseExample.id); },false);
collapseExample.addEventListener('hide.bs.collapse', function(){ console.log('The hide.bs.collapse event fired for #' + collapseExample.id); },false);
collapseExample.addEventListener('hidden.bs.collapse', function(){ console.log('The hidden.bs.collapse event fired for #' + collapseExample.id); },false);

// new ScrollSpy events
var scrollSpyElement = document.querySelector('[data-target="#navbar-example"]');
scrollSpyElement.addEventListener('activate.bs.scrollspy', function(e){
	var related = e.relatedTarget ? (' by relatedTarget: ' + e.relatedTarget.tagName + '.' + e.relatedTarget.getAttribute('href') ) : '';
	console.log('The activate.bs.scrollspy event fired for div[data-target="#navbar-example"]' + related ); 
}, false);

// new Tab events
var tabEventsExample = document.getElementById('tabEventsExample'),
	tabEventsExampleInit = new Tab(tabEventsExample, {preserve: true});
tabEventsExample.addEventListener('show.bs.tab', function() { console.log('The show.bs.tab event fired for #' + tabEventsExample.id); }, false);
tabEventsExample.addEventListener('shown.bs.tab', function() { console.log('The shown.bs.tab event fired for #' + tabEventsExample.id); }, false);
tabEventsExample.addEventListener('hide.bs.tab', function() { console.log('The hide.bs.tab event fired for #' + tabEventsExample.id); }, false);
tabEventsExample.addEventListener('hidden.bs.tab', function() { console.log('The hidden.bs.tab event fired for #' + tabEventsExample.id); }, false);


// new Tooltip events
var tooltipEvents = document.getElementById('tooltipWithEvents');
tooltipEvents.addEventListener('show.bs.tooltip', function(){ console.log('The show.bs.tooltip event fired for #' + tooltipEvents.id); }, false);
tooltipEvents.addEventListener('shown.bs.tooltip', function(){ console.log('The shown.bs.tooltip event fired for #' + tooltipEvents.id); }, false);
tooltipEvents.addEventListener('hide.bs.tooltip', function(){ console.log('The hide.bs.tooltip event fired for #' + tooltipEvents.id); }, false);
tooltipEvents.addEventListener('hidden.bs.tooltip', function(){ console.log('The hidden.bs.tooltip event fired for #' + tooltipEvents.id); }, false);


// transparent navbar
var navbar = document.querySelector('.navbar-fixed-top'), scrollTimer = null,
		  mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];
navbar.style.backfaceVisibility = 'hidden';
navbar.style.transition = 'opacity 0.5s linear 0s';
navbar.style.WebkitTransition = 'opacity 0.5s linear 0s';

function setNavbarOpacity(){
	clearTimeout(scrollTimer);
	scrollTimer = !navbar.classList.contains('HOVER') ? setTimeout(function(){
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if ( scrollTop < 120 ){
			navbar.style.opacity = 1
		} else {
			navbar.style.opacity = 0.7
		}
	},50) : function() {return false;}
}

function setNavbarOpacityOnEnter(){
	clearTimeout(scrollTimer);
	scrollTimer = setTimeout(function(){
		if (!navbar.classList.contains('HOVER')) {
			navbar.classList.add('HOVER');
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			if ( scrollTop > 120 ){
				navbar.style.opacity = 1
			}
		}
	},0)
}

function setNavbarOpacityOnLeave(){
	clearTimeout(scrollTimer);
	scrollTimer = setTimeout(function(){
		if (navbar.classList.contains('HOVER')) {
			navbar.classList.remove('HOVER');
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			if ( scrollTop > 120 ){
				navbar.style.opacity = 0.7
			}
		}
	},0)
}

document.addEventListener('DOMContentLoaded', setNavbarOpacity, false);
window.addEventListener('scroll', setNavbarOpacity, false);
navbar.addEventListener(mouseHover[0],setNavbarOpacityOnEnter,false);
navbar.addEventListener(mouseHover[1],setNavbarOpacityOnLeave,false);

