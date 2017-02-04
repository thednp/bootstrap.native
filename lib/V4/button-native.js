
/* Native Javascript for Bootstrap 4 | Button
---------------------------------------------*/

// BUTTON DEFINITION
// ===================
var Button = function( element ) {

  // initialization element
  element = queryElement(element);

  // constant
  var toggled = false, // toggled makes sure to prevent triggering twice the change.bs.button events

      // strings
      component = 'button',
      checked = 'checked',
      reset = 'reset',
      LABEL = 'LABEL',
      INPUT = 'INPUT',

    // private methods
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

