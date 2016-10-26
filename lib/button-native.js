// Native Javascript for Bootstrap 3 | Button
// by dnp_theme

// BUTTON DEFINITION
// ===================
var Button = function( element, option ) {
  this.btn = typeof element === 'object' ? element : document.querySelector(element);
  this.option = typeof option === 'string' ? option : null;

  var self = this,
    changeEvent = (('CustomEvent' in window) && window.dispatchEvent)
      ? new CustomEvent('bs.button.change') : null; // The custom event that will be triggered on demand

  // assign event to a trigger function
  function triggerChange(t) { if (changeEvent) { t.dispatchEvent(changeEvent); } }

  this.setState = function() {
    if ( this.option === 'loading' ) {
      addClass(this.btn,'disabled');
      this.btn.setAttribute('disabled','disabled');
    }
    this.btn.innerHTML = this.state;
  };

  this.reset = function() {
    if ( /\bdisabled/.test(this.btn.className) || this.btn.getAttribute('disabled') === 'disabled' ) {
      removeClass(this.btn,'disabled');
      this.btn.removeAttribute('disabled');
    }
    this.btn.innerHTML = this.btn.getAttribute('data-original-text');
  };

  this.toggle = function(e) {
    var parent = e.target.parentNode,
      label = e.target.tagName === 'LABEL' ? e.target : parent.tagName === 'LABEL' ? parent : null; // the .btn label

    if ( !label ) return; //react if a label or its immediate child is clicked

    var target = this, //e.currentTarget || e.srcElement; // the button group, the target of the handler function
      labels = target.querySelectorAll('.btn'), ll = labels.length, i = 0, // all the button group buttons
      input = label.getElementsByTagName('INPUT')[0];

    if ( !input ) return; //return if no input found

    //manage the dom manipulation
    if ( input.type === 'checkbox' ) { //checkboxes
      if ( !input.checked ) {
        addClass(label,'active');
        input.getAttribute('checked');
        input.setAttribute('checked','checked');
        input.checked = true;
      } else {
        removeClass(label,'active');
        input.getAttribute('checked');
        input.removeAttribute('checked');
        input.checked = false;
      }
      triggerChange(input); //trigger the change for the input
      triggerChange(self.btn); //trigger the change for the btn-group
    }

    if ( input.type === 'radio' ) { // radio buttons
      if ( !input.checked ) { // don't trigger if already active
        addClass(label,'active');
        input.setAttribute('checked','checked');
        input.checked = true;
        triggerChange(self.btn);
        triggerChange(input); //trigger the change

        for (i;i<ll;i++) {
          var l = labels[i];
          if ( l !== label && /\bactive/.test(l.className) )  {
            var inp = l.getElementsByTagName('INPUT')[0];
            removeClass(l,'active');
            inp.removeAttribute('checked');
            inp.checked = false;
            triggerChange(inp); // trigger the change
          }
        }
      }
    }
  };

  // init
  if ( /\bbtn/.test(this.btn.className) ) {
    if ( this.option && this.option !== 'reset' ) {

      this.state = this.btn.getAttribute('data-'+this.option+'-text') || null;

      !this.btn.getAttribute('data-original-text') && this.btn.setAttribute('data-original-text',self.btn.innerHTML.replace(/^\s+|\s+$/g, ''));
      this.setState();

    } else if ( this.option === 'reset' ) {
      this.reset();
    }
  }
  if ( /\bbtn-group/.test(this.btn.className) ) {
    this.btn.addEventListener('click', this.toggle, false);
  }
};

// BUTTON DATA API
// =================
var Buttons = document.querySelectorAll('[data-toggle=button]');
for (var b=0, btl = Buttons.length; b<btl; b++) {
  new Button(Buttons[b]);
}

var ButtonGroups = document.querySelectorAll('[data-toggle=buttons]');
for (var g=0, bgl = ButtonGroups.length; g<bgl; g++) {
  new Button(ButtonGroups[g]);
}
