
/* Native JavaScript for Bootstrap 4 | Toast
---------------------------------------------*/

// IMPORTS
import { supports } from './util/callbacks.js';
import { hasClass, addClass, removeClass } from './util/class.js';
import { bootstrapCustomEvent, on, off } from './util/event.js';
import { queryElement } from './util/selector.js';
import { emulateTransitionEnd } from './util/transition.js';

// TOAST DEFINITION
// ==================
export default class Toast {

  constructor(element,options) {

    // initialization element
    element = queryElement(element);

    // reset on re-init
    element.Toast && element.Toast.destroy();

    // set options
    options = options || {};

    // toast, timer
    let toast = element.closest('.toast'), timer = 0;

    // bind, data api and events
    const self = this,

      // DATA API
      animationData = element.getAttribute('data-animation'),
      autohideData = element.getAttribute('data-autohide'),
      delayData = element.getAttribute('data-delay'),

      // custom events
      showCustomEvent = bootstrapCustomEvent('show', 'toast'),
      hideCustomEvent = bootstrapCustomEvent('hide', 'toast'),
      shownCustomEvent = bootstrapCustomEvent('shown', 'toast'),
      hiddenCustomEvent = bootstrapCustomEvent('hidden', 'toast');

    // set instance options
    self.options = {};
    self.options.animation = options.animation === false || animationData === 'false' ? 0 : 1; // true by default
    self.options.autohide = options.autohide === false || autohideData === 'false' ? 0 : 1; // true by default
    self.options.delay = parseInt(options.delay || delayData) || 500; // 500ms default

    // private methods
    const 
      showComplete = () => {
        removeClass( toast, 'showing' );
        addClass( toast, 'show' );
        if (self.options.autohide) { self.hide(); }
        dispatchCustomEvent.call(toast,shownCustomEvent);
      },
      hideComplete = () => {
        addClass( toast, 'hide' );
        dispatchCustomEvent.call(toast,hiddenCustomEvent);
      },
      close = () => {
        removeClass( toast,'show' );
        self.options.animation ? emulateTransitionEnd(toast, hideComplete) : hideComplete();
      },
      disposeComplete = () => {
        clearTimeout(timer); timer = null;
        addClass( toast, 'hide' );
        off(element, 'click', self.hide);
        delete element.Toast;
        element = null;
        toast = null;
      };

    // public methods
    self.show = () => {
      if (toast) {
        dispatchCustomEvent.call(toast,showCustomEvent);
        if (showCustomEvent.defaultPrevented) return;
        self.options.animation && addClass( toast,'fade' );
        removeClass( toast,'hide' );
        addClass( toast,'showing' );

        self.options.animation ? emulateTransitionEnd(toast, showComplete) : showComplete();
      }
    };
    self.hide = noTimer => {
      if (toast && hasClass(toast,'show')) {
        dispatchCustomEvent.call(toast,hideCustomEvent);
        if(hideCustomEvent.defaultPrevented) return;

        if (noTimer) {
          close();
        } else {
          timer = setTimeout( close, self.options.delay);
        }
      }
    };
    self.dispose = () => {
      if ( toast && hasClass(toast,'show') ) {
        removeClass( toast,'show' );
        self.options.animation ? emulateTransitionEnd(toast, disposeComplete) : disposeComplete();
      }
    };
    self.destroy = () => {
      self.hide();
      clearTimeout(timer);
      off(element, 'click', self.hide);
      delete element.Toast;
    };

    // init
    if ( !element.Toast ) { // prevent adding event handlers twice
      on(element, 'click', self.hide);
    }

    // associate targets to init object
    self.toast = toast;
    self.element = element;
    element.Toast = self;
  }
};

// TOAST DATA API
// =================
supports.push( [ 'Toast', Toast, '[data-dismiss="toast"]' ] );

