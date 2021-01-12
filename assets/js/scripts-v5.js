// MISC
// scrollTo
var offCanvasCollapse = document.getElementsByClassName('offcanvas-collapse')[0],
		sideNav = document.getElementById('side-nav'),
		topNav = document.getElementById('top-nav'),
		sideLinks = Array.from(sideNav.getElementsByTagName("A")).concat(Array.from(topNav.getElementsByTagName("A"))),
		// scrollTarget = /(EDGE|Mac)/i.test(navigator.userAgent) ? document.body : document.documentElement;
		scrollTarget = document.documentElement;

sideLinks.map((x,i) => x.addEventListener('click', (e) => { 
	var target = document.getElementById(x.getAttribute('href').replace('#', ''));
	e.preventDefault();
	scrollTarget.scrollTop = target.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) -  70;
	topNav.contains(x) && offCanvasCollapse.classList.toggle('open')
})) 
// offcanvas
document.querySelector('[data-toggle="offcanvas"]').addEventListener('click', function () {
	offCanvasCollapse.classList.toggle('open')
})

// COMPONENTS
// ==========

//demo alert fun
var dangerAlert = document.querySelector('.alert-danger'),
	alertParent = dangerAlert.parentNode,
	siblings = dangerAlert.parentNode.childNodes;
dangerAlert.addEventListener('closed.bs.alert', function(e) {
	var successAlert = document.createElement('div');
	successAlert.setAttribute('class','alert alert-success fade');
	successAlert.setAttribute('role','alert');
	successAlert.innerHTML = '<h4>Wow you REALLY got no error!</h4><p>Javascript isn\'t fun? Well, think again.</p>';
	successAlert.innerHTML += '<p>I just didn\'t want this section to be empty, looks awful..</p>';
	alertParent.insertBefore(successAlert,siblings[siblings.length-2]);
	successAlert.classList.add('show');
});

// Alert events
document.getElementById('alertDemo').addEventListener('close.bs.alert', function(e) {	console.log( 'The "close.bs.alert" event fired for #' + e.target.id ); });
document.getElementById('alertDemo').addEventListener('closed.bs.alert', function(e) {	console.log( 'The "closed.bs.alert" event fired for #' + e.target.id ); });


// MODAL
var myModal = document.getElementById('myModal'); // we need a blank modal to fill up and target our object function
myModal.addEventListener('show.bs.modal', function (e) {
	e.target && console.log('show.bs.modal triggered for #' + e.target.id);
	e.relatedTarget && console.log('event.relatedTarget is ' + e.relatedTarget.tagName + '.' + e.relatedTarget.className.replace(/\s/g, '.'));
}, false);
myModal.addEventListener('shown.bs.modal', function (e) {
	e.target && console.log('shown.bs.modal triggered for #' + e.target.id);
	e.relatedTarget && console.log('event.relatedTarget is ' + e.relatedTarget.tagName + '.' + e.relatedTarget.className.replace(/\s/g, '.'));
}, false);
myModal.addEventListener('hide.bs.modal', function (e) {
	e.target && console.log('hide.bs.modal triggered for #' + e.target.id);
	e.relatedTarget && console.log('event.relatedTarget is ' + e.relatedTarget.tagName + '.' + e.relatedTarget.className.replace(/\s/g, '.'));
}, false);
myModal.addEventListener('hidden.bs.modal', function (e) {
	e.target && console.log('hidden.bs.modal triggered for #' + e.target.id);
	e.relatedTarget && console.log('event.relatedTarget is ' + e.relatedTarget.tagName + '.' + e.relatedTarget.className.replace(/\s/g, '.'));
}, false);


// Modal initialized with JavaScript
var myModalJS = document.getElementById('myModalJS'); // we need a blank modal to fill up and target our object function
var btnModal = document.getElementById('openModalViaJS');
var firstModalContent = '<div class="modal-header">'
	+ '<h4 class="modal-title" id="myModalJSLabel">Modal title</h4>'
	+ '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
	+ '</div>'
	+ '<div class="modal-body">'
	+ '<p>This is a damn awesome modal content template configured via Javascript, using the specific modal events like <code>show.bs.modal</code>, so please open your console and check the log entries.</p>'
	+ '</div>'
	+ '<div class="modal-footer">'
	+ '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'
	+ '<button type="button" class="btn btn-primary">Save changes</button>'
	+ '</div>';

// init the modal
var modalInitJS = new BSN.Modal(myModalJS, {
	content: firstModalContent,
	backdrop: 'static'
});

btnModal.addEventListener('click', function (e) {
	modalInitJS.show();
}, false);

// another button
var btnModal2 = document.getElementById('openModalViaJS2');
var externalModalContent = {
	title: 'Title from a custom variable',
	content: 'This example also uses the specific modal events like <code>show.bs.modal</code>, so please open your console and check the logs. This is also a variable here, efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
};

// set new content for the modal and show it
btnModal2.addEventListener('click', function () {
	//template content for modal example 2
	modalInitJS.setContent('<div class="modal-header">'
		+ '<h4 class="modal-title" id="myModalJSLabel">' + externalModalContent.title + '</h4>'
		+ '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
		+ '</div>'
		+ '<div class="modal-body">'
		+ '<p>' + externalModalContent.content + '</p>'
		+ '</div>'
		+ '<div class="modal-footer">'
		+ '<button type="button" class="btn btn-danger">Delete</button>'
		+ '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'
		+ '</div>');
	modalInitJS.show();
}, false);

// another button to be used to reset modal content
var btnModalNotTrigger = document.getElementById('modalNotTriggerJS');
btnModalNotTrigger.addEventListener('click', function (e) {
	e.preventDefault();
	modalInitJS.setContent(firstModalContent);
	modalInitJS.show();
}, false);

// NEW added events to Modal
myModalJS.addEventListener('show.bs.modal', function (e) {
	var related = ', relatedTarget: ' + (e.relatedTarget ? e.relatedTarget.tagName + '.' + e.relatedTarget.className.replace(/\s/g, '.') : 'null');
	console.log('The "show.bs.modal" event fired for #' + e.target.id + related);
}, false);
myModalJS.addEventListener('shown.bs.modal', function (e) {
	var related = ', relatedTarget: ' + (e.relatedTarget ? e.relatedTarget.tagName + '.' + e.relatedTarget.className.replace(/\s/g, '.') : 'null');
	console.log('The "shown.bs.modal" event fired for #' + e.target.id + related);
}, false);
myModalJS.addEventListener('hide.bs.modal', function (e) { console.log('The "hide.bs.modal" event fired for #' + e.target.id); }, false);
myModalJS.addEventListener('hidden.bs.modal', function (e) { console.log('The "hidden.bs.modal" event fired for #' + e.target.id); }, false);

// updating modal while visible
var modalUpdate = document.getElementById('modalUpdate'), // the trigger
	anotherStaticModal = document.getElementById('anotherStaticModal'), // the modal
	currentStaticModalBody = anotherStaticModal.querySelector('.modal-body'), // the body of the current modal
	currentStaticModalBodyContent = currentStaticModalBody.innerHTML, // we cache the content of the body
	modalUpdateInit = modalUpdate.Modal, // the initialization
	changeModal1 = document.getElementById('changeModal1'), // the change buttons
	changeModal2 = document.getElementById('changeModal2');

changeModal1.addEventListener('click', function () {
	if (!/scroll/i.test(currentStaticModalBody.innerHTML)) {
		changeModal1.className += ' hidden';
		changeModal2.className = changeModal2.className.replace(new RegExp('(\\s|^)hidden(\\s|$)', 'g'), '');
		currentStaticModalBody.innerHTML = currentStaticModalBodyContent; // set
		modalUpdateInit.update(); // trigger the update
	}
}, false);

changeModal2.addEventListener('click', function () {
	if (/scroll/i.test(currentStaticModalBody.innerHTML)) {
		changeModal2.className += ' hidden';
		changeModal1.className = changeModal1.className.replace(new RegExp('(\\s|^)hidden(\\s|$)', 'g'), ' ');
		currentStaticModalBody.innerHTML = '<h4>This modal changed via JavaScript</h4><p>OK now this is a different content.</p>';
		modalUpdateInit.update();
	}
}, false);

// Dropdown init via JS
var makeMeDropdown = document.getElementById('makeMeDropdown');
var myDropdownTemplate = '<div class="dropdown btn-group">'
	+ '<button id="formDropdown" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false" tabindex="0">Login <span class="caret"></span></button>'
	+ '<form class="form-vertical dropdown-menu px-3">'
	+ '<div class="mb-3">'
	+ '<label for="inputEmail3" class="control-label">Email</label>'
	+ '<div class="">'
	+ '<input type="email" class="form-control" id="inputEmail3" placeholder="Email">'
	+ '</div>'
	+ '</div>'
	+ '<div class="mb-3">'
	+ '<label for="inputPassword3" class="control-label">Password</label>'
	+ '<div class="">'
	+ '<input type="password" class="form-control" id="inputPassword3" placeholder="Password">'
	+ '</div>'
	+ '</div>'
	+ '<div class="mb-3">'
	+ '<div class="">'
	+ '<div class="checkbox">'
	+ '<label>'
	+ '<input type="checkbox"> Remember me'
	+ '</label>'
	+ '</div>'
	+ '</div>'
	+ '</div>'
	+ '<div class="mb-3">'
	+ '<div class="">'
	+ '<button type="submit" class="btn btn-secondary">Sign in</button>'
	+ '</div>'
	+ '</div>'
	+ '</form>'
	+ '</div>';

makeMeDropdown.addEventListener('click', function (e) {
	e.preventDefault();

	if (!/\bdisabled/.test(makeMeDropdown.className)) {

		// invalidate the makeMeDropdown
		this.setAttribute('disabled', true);
		this.className = 'btn btn-secondary disabled';
		this.innerHTML = 'All done';

		this.parentNode.innerHTML += myDropdownTemplate;

		//get the new dropdown
		var formDropdown = document.getElementById('formDropdown');

		// initiate with option
		var DropdownInit = new BSN.Dropdown(formDropdown, true);

		// NEW: attach Dropdown original events
		formDropdown.parentNode.addEventListener('show.bs.dropdown', function (e) {
			var related = null;
			related = ', relatedTarget: ' + (e.relatedTarget ? e.relatedTarget.tagName + '.' + e.relatedTarget.className.replace(/\s/g, '.') : 'null');
			console.log('The show.bs.dropdown event fired for parent of #' + formDropdown.id + related);
		}, false);
		formDropdown.parentNode.addEventListener('shown.bs.dropdown', function (e) {
			var related = null;
			related = ', relatedTarget: ' + (e.relatedTarget ? e.relatedTarget.tagName + '.' + e.relatedTarget.className.replace(/\s/g, '.') : 'null');
			console.log('The shown.bs.dropdown event fired for parent of #' + formDropdown.id + related);
		}, false);
		formDropdown.parentNode.addEventListener('hide.bs.dropdown', function (e) {
			var related = null;
			related = ', relatedTarget: ' + (e.relatedTarget ? e.relatedTarget.tagName + '.' + e.relatedTarget.className.replace(/\s/g, '.') : 'null');
			console.log('The hide.bs.dropdown event fired for parent of #' + formDropdown.id + related);
		}, false);
		formDropdown.parentNode.addEventListener('hidden.bs.dropdown', function (e) {
			var related = null;
			related = ', relatedTarget: ' + (e.relatedTarget ? e.relatedTarget.tagName + '.' + e.relatedTarget.className.replace(/\s/g, '.') : 'null');
			console.log('The hidden.bs.dropdown event fired for parent of #' + formDropdown.id + related);
		}, false);
	}
}, false);

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
	position: top
})

// Popover 
var popover1 = new BSN.Popover('#popover-via-click', { trigger: 'click'} );

// demo popover, using template
var someTitleFromOtherCode = 'Popover via JavaScript <span class="label label-primary">FOCUS</span>';
var someContentFromOuterSpace = '<p>Some sample message from outer space wrapped in &lt;p&gt; tags. You can add your own functions to combine with Popover template as you wish.</p>';
var popover2 = new BSN.Popover('.popover-via-template', {
	trigger: 'focus',
	template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header">'+someTitleFromOtherCode+'</h3><div class="popover-body">'+someContentFromOuterSpace+'</div></div>'
});
var popoverEvents = document.getElementById('popoverWithEvents');
popoverEvents.addEventListener('show.bs.popover', function(){ console.log('The show.bs.popover event fired for #' + popoverEvents.id); }, false);
popoverEvents.addEventListener('shown.bs.popover', function(){ console.log('The shown.bs.popover event fired for #' + popoverEvents.id); }, false);
popoverEvents.addEventListener('hide.bs.popover', function(){ console.log('The hide.bs.popover event fired for #' + popoverEvents.id); }, false);
popoverEvents.addEventListener('hidden.bs.popover', function(){ console.log('The hidden.bs.popover event fired for #' + popoverEvents.id); }, false);

// TOAST
var toastBTN = document.getElementById('myTastyToastBTN');
var showToastBTN = document.getElementById('showToastBTN');
toastBTN.closest('.toast').addEventListener('show.bs.toast',function(e){
	console.log( 'The "show.bs.toast" event fired for #' + toastBTN.id );
},false)
toastBTN.closest('.toast').addEventListener('shown.bs.toast',function(e){
	console.log( 'The "shown.bs.toast" event fired for #' + toastBTN.id );
	showToastBTN.classList.add('d-none')
},false)
toastBTN.closest('.toast').addEventListener('hide.bs.toast',function(e){
	console.log( 'The "hide.bs.toast" event fired for #' + toastBTN.id );
},false)
toastBTN.closest('.toast').addEventListener('hidden.bs.toast',function(e){
	console.log( 'The "hidden.bs.toast" event fired for #' + toastBTN.id );
	showToastBTN.classList.remove('d-none')
},false)

showToastBTN.addEventListener('click',function(){
	toastBTN.Toast.show();
},false)