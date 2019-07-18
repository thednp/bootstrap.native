
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
          element[setAttribute](dataOriginalText, element[innerHTML].trim()); // trim the text
        }
        element[innerHTML] = element[getAttribute]('data-'+option+'-text');
      }
    },
    resetState = function() {
      if (element[getAttribute](dataOriginalText)) {
        if ( hasClass(element,disabled) || element[getAttribute](disabled) === disabled ) {
          removeClass(element,disabled);
          element.removeAttribute(disabled);
        }
        element[innerHTML] = element[getAttribute](dataOriginalText);
      }
    },
    keyHandler = function(e){ 
      var key = e.which || e.keyCode;
      key === 32 && e[target] === DOC.activeElement && toggle(e);
    },
    preventScroll = function(e){ 
      var key = e.which || e.keyCode;
      key === 32 && e[preventDefault]();
    },    
    toggle = function(e) {
      var label = e[target].tagName === LABEL ? e[target] : e[target][parentNode].tagName === LABEL ? e[target][parentNode] : null; // the .btn label
      
      if ( !label ) return; //react if a label or its immediate child is clicked

      var labels = getElementsByClassName(label[parentNode],'btn'), // all the button group buttons
        input = label[getElementsByTagName](INPUT)[0];

      if ( !input ) return; // return if no input found

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
        // don't trigger if already active (the OR condition is a hack to check if the buttons were selected with key press and NOT mouse click)
        if ( !input[checked] || (e.screenX === 0 && e.screenY == 0) ) {
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
  } else { // if ( hasClass(element,'btn-group') ) // we allow the script to work outside btn-group component
    
    if ( !( stringButton in element ) ) { // prevent adding event handlers twice
      on( element, clickEvent, toggle );
      on( element, keyupEvent, keyHandler ), on( element, keydownEvent, preventScroll );
    }

    // activate items on load
    var labelsToACtivate = getElementsByClassName(element, 'btn'), lbll = labelsToACtivate[length];
    for (var i=0; i<lbll; i++) {
      !hasClass(labelsToACtivate[i],active) && queryElement('input',labelsToACtivate[i])[getAttribute](checked)
                                            && addClass(labelsToACtivate[i],active);
    }
    element[stringButton] = this;
  }
};

// BUTTON DATA API
// =================
supports[push]( [ stringButton, Button, '['+dataToggle+'="buttons"]' ] );

