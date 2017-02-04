
/* Native Javascript for Bootstrap 3 | Button
---------------------------------------------*/

// BUTTON DEFINITION
// ===================
var Button = function( element, option ) {

  // initialization element
  element = queryElement(element);

  // set option
  option = option || null;

  // constant
  var toggled = false, // toggled makes sure to prevent triggering twice the change.bs.button events

      // strings
      component = 'button',
      checked = 'checked',
      reset = 'reset',
      LABEL = 'LABEL',
      INPUT = 'INPUT',

    // private methods
    setState = function() {
      if ( !! option && option !== reset ) {
        if ( option === loading ) {
          addClass(element,disabled);
          element[setAttribute](disabled,disabled);
        }
        element[setAttribute](dataOriginalText, element.innerHTML.replace(/^\s+|\s+$/g, '')); // trim the text
        element.innerHTML = element[getAttribute]('data-'+option+'-text');
      }
    },
    resetState = function() {
      if (element[getAttribute](dataOriginalText)) {
        if ( hasClass(element,disabled) || element[getAttribute](disabled) === disabled ) {
          removeClass(element,disabled);
          element.removeAttribute(disabled);
        }
        element.innerHTML = element[getAttribute](dataOriginalText);
      }
    },
    toggle = function(e) {
      var parent = e[target][parentNode],
        label = e[target].tagName === LABEL ? e[target] : parent.tagName === LABEL ? parent : null; // the .btn label

      if ( !label ) return; //react if a label or its immediate child is clicked

      var eventTarget = this, // the button group, the target of the handler function
        labels = getElementsByClassName(eventTarget,'btn'), // all the button group buttons
        input = label[getElementsByTagName](INPUT)[0];

      if ( !input ) return; //return if no input found

      // manage the dom manipulation
      if ( input.type === 'checkbox' ) { //checkboxes
        if ( !input[checked] ) {
          addClass(label,active);
          input[getAttribute](checked);
          input[setAttribute](checked,checked);
          input[checked] = true;
        } else {
          removeClass(label,active);
          input[getAttribute](checked);
          input.removeAttribute(checked);
          input[checked] = false;
        }

        if (!toggled) { // prevent triggering the event twice
          toggled = true;
          bootstrapCustomEvent.call(input, changeEvent, component); //trigger the change for the input
          bootstrapCustomEvent.call(element, changeEvent, component); //trigger the change for the btn-group
        }
      }

      if ( input.type === 'radio' && !toggled ) { // radio buttons
        if ( !input[checked] ) { // don't trigger if already active
          addClass(label,active);
          input[setAttribute](checked,checked);
          input[checked] = true;
          bootstrapCustomEvent.call(input, changeEvent, component); //trigger the change for the input
          bootstrapCustomEvent.call(element, changeEvent, component); //trigger the change for the btn-group

          toggled = true;
          for (var i = 0, ll = labels[length]; i<ll; i++) {
            var otherLabel = labels[i], otherInput = otherLabel[getElementsByTagName](INPUT)[0];
            if ( otherLabel !== label && hasClass(otherLabel,active) )  {
              removeClass(otherLabel,active);
              otherInput.removeAttribute(checked);
              otherInput[checked] = false;
              bootstrapCustomEvent.call(otherInput, changeEvent, component); // trigger the change
            }
          }
        }
      }
      setTimeout( function() { toggled = false; }, 50 );
    };

  // init
  if ( hasClass(element,'btn') ) { // when Button text is used we execute it as an instance method
    if ( option !== null ) {
      if ( option !== reset ) { setState(); } 
      else { resetState(); }
    }
  }
  if ( hasClass(element,'btn-group') ) {
    if ( !( stringButton in element ) ) { // prevent adding event handlers twice
      on( element, clickEvent, toggle );
    }
    element[stringButton] = this;
  }
};

// BUTTON DATA API
// =================
initializeDataAPI( stringButton, Button, dataToggle );

