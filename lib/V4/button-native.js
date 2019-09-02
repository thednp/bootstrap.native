
/* Native JavaScript for Bootstrap 4 | Button
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
      LABEL = 'LABEL',
      INPUT = 'INPUT',

      // changeEvent
      changeCustomEvent = bootstrapCustomEvent(changeEvent, component),

    // private methods
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

      dispatchCustomEvent.call(input, changeCustomEvent); // trigger the change for the input
      dispatchCustomEvent.call(element, changeCustomEvent); // trigger the change for the btn-group

      // manage the dom manipulation
      if ( input.type === 'checkbox' ) { //checkboxes
        if ( changeCustomEvent[defaultPrevented] ) return; // discontinue when defaultPrevented is true

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
        }
      }

      if ( input.type === 'radio' && !toggled ) { // radio buttons
        if ( changeCustomEvent[defaultPrevented] ) return;
        // don't trigger if already active (the OR condition is a hack to check if the buttons were selected with key press and NOT mouse click)
        if ( !input[checked] || (e.screenX === 0 && e.screenY == 0) ) {
          addClass(label,active);
          addClass(label,focusEvent);
          input[setAttribute](checked,checked);
          input[checked] = true;

          toggled = true;
          for (var i = 0, ll = labels[length]; i<ll; i++) {
            var otherLabel = labels[i], otherInput = otherLabel[getElementsByTagName](INPUT)[0];
            if ( otherLabel !== label && hasClass(otherLabel,active) )  {
              dispatchCustomEvent.call(otherInput, changeCustomEvent); // trigger the change
              removeClass(otherLabel,active);
              otherInput.removeAttribute(checked);
              otherInput[checked] = false;
            }
          }
        }
      }
      setTimeout( function() { toggled = false; }, 50 );
    },
    focusHandler = function(e) {
      addClass(e[target][parentNode],focusEvent);
    },
    blurHandler = function(e) {
      removeClass(e[target][parentNode],focusEvent);
    };

  // init
  if ( !( stringButton in element ) ) { // prevent adding event handlers twice
    on( element, clickEvent, toggle );
    on( element, keyupEvent, keyHandler ), on( element, keydownEvent, preventScroll );

    var allBtns = getElementsByClassName(element, 'btn');
    for (var i=0; i<allBtns.length; i++) {
      var input = allBtns[i][getElementsByTagName](INPUT)[0];
      on( input, focusEvent, focusHandler), on( input, 'blur', blurHandler);
    }    
  }

  // activate items on load
  var labelsToACtivate = getElementsByClassName(element, 'btn'), lbll = labelsToACtivate[length];
  for (var i=0; i<lbll; i++) {
    !hasClass(labelsToACtivate[i],active) && queryElement('input:checked',labelsToACtivate[i]) 
                                          && addClass(labelsToACtivate[i],active);
  }
  element[stringButton] = this;
};

// BUTTON DATA API
// =================
supports[push]( [ stringButton, Button, '['+dataToggle+'="buttons"]' ] );

