
/* Native JavaScript for Bootstrap 4 | Button
---------------------------------------------*/
import { hasClass, addClass, removeClass  } from '../util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off  } from '../util/event.js';
import { queryElement } from '../util/selector.js';
import { componentInit } from '../util/misc.js';

// BUTTON DEFINITION
// =================

export default function Button(element) {

  // bind and labels
  let self = this, labels

  // changeEvent
  const changeCustomEvent = bootstrapCustomEvent('change', 'button')

  // private methods
  function activateItems() {
    [].slice.call(self.buttons).map(btn=>{
      !hasClass(btn,'active') 
        && queryElement('input:checked',btn)
        && addClass(btn,'active');
      hasClass(btn,'active') 
        && !queryElement('input:checked',btn)
        && removeClass(btn,'active');
    })
  }
  function toggle(e) {
    const label = e.target.tagName === 'LABEL' ? e.target : e.target.closest('LABEL') ? e.target.closest('LABEL') : null; // the .btn label

    // invalidate if no label
    if ( !label ) return; 

    // current input
    const input = label.getElementsByTagName('INPUT')[0];

    // invalidate if no input
    if ( !input ) return; 

    dispatchCustomEvent.call(input, changeCustomEvent); // trigger the change for the input
    dispatchCustomEvent.call(element, changeCustomEvent); // trigger the change for the btn-group

    // manage the dom manipulation
    if ( input.type === 'checkbox' ) { //checkboxes
      if ( changeCustomEvent.defaultPrevented ) return; // discontinue when defaultPrevented is true

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

      if (!element.toggled) { // prevent triggering the event twice
        element.toggled = true;
      }
    }

    if ( input.type === 'radio' && !element.toggled ) { // radio buttons
      if ( changeCustomEvent.defaultPrevented ) return;
      // don't trigger if already active (the OR condition is a hack to check if the buttons were selected with key press and NOT mouse click)
      if ( !input.checked || (e.screenX === 0 && e.screenY == 0) ) {
        addClass(label,'active');
        addClass(label,'focus');
        input.setAttribute('checked','checked');
        input.checked = true;

        element.toggled = true;
        [].slice.call(self.buttons).map(otherLabel=>{
          const otherInput = otherLabel.getElementsByTagName('INPUT')[0];
          if ( otherLabel !== label && hasClass(otherLabel,'active') )  {
            dispatchCustomEvent.call(otherInput, changeCustomEvent); // trigger the change
            removeClass(otherLabel,'active');
            otherInput.removeAttribute('checked');
            otherInput.checked = false;
          }
        })
      }
    }
    setTimeout( () => { element.toggled = false; }, 50 );
  }

  // handlers
  function keyHandler(e) {
    const key = e.which || e.keyCode;
    key === 32 && e.target === document.activeElement && toggle(e);
  }
  function preventScroll(e) { 
    const key = e.which || e.keyCode;
    key === 32 && e.preventDefault();
  }
  function focusToggle(e) {
    const action = e.type === 'focusin' ? addClass : removeClass;
    if (e.target.tagName === 'INPUT' ) {
      action(e.target.closest('.btn'),'focus');
    }
  }
  function toggleEvents(action) {
    action( element, 'click', toggle );
    action( element, 'keyup', keyHandler ), action( element, 'keydown', preventScroll );
    action( element, 'focusin', focusToggle), action( element, 'focusout', focusToggle);
  }

  // public method
  self.dispose = () => {
    toggleEvents(off);
    delete element.Button;
  }

  // init
  componentInit(()=>{

    // initialization element
    element = queryElement(element);

    // reset on re-init
    element.Button && element.Button.dispose();
  
    labels = element.getElementsByClassName('btn')

    // invalidate
    if (!labels.length) return;

    // prevent adding event handlers twice
    if ( !element.Button ) { 
      toggleEvents(on);
    }
  
    // set initial toggled state
    // toggled makes sure to prevent triggering twice the change.bs.button events
    element.toggled = false;  
    
    // associate target with init object
    self.element = element;
    self.buttons = labels;
    element.Button = self;
  
    // activate items on load
    activateItems();
  })
}

