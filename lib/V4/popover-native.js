
/* Native Javascript for Bootstrap 4 | Popover
----------------------------------------------*/

// POPOVER DEFINITION
// ==================
var Popover = function( element, options ) {

  // initialization element
  element = queryElement(element);

  // DATA API
  var triggerData = element[getAttribute](dataTrigger), // click / hover / focus
      animationData = element[getAttribute](dataAnimation), // true / false
      placementData = element[getAttribute](dataPlacement),
      dismissibleData = element[getAttribute](dataDismissible),
      delayData = element[getAttribute](dataDelay),
      containerData = element[getAttribute](dataContainer),

      // internal strings
      component = 'popover',
      template = 'template',
      trigger = 'trigger',
      classString = 'class',
      div = 'div',
      fade = 'fade',
      title = 'title',
      content = 'content',
      dataTitle = 'data-title',
      dataContent = 'data-content',
      dismissible = 'dismissible',
      closeBtn = '<button type="button" class="close">×</button>',
      
      // maybe the element is inside a modal
      modal = getClosest(element,'.modal'),
      
      // maybe the element is inside a fixed navbar
      navbarFixedTop = getClosest(element,fixedTop),
      navbarFixedBottom = getClosest(element,fixedBottom);

  // set options
  options = options || {};
  this[template] = options[template] ? options[template] : null; // JavaScript only
  this[trigger] = options[trigger] ? options[trigger] : triggerData || hoverEvent;
  this[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
  this[placement] = options[placement] ? options[placement] : placementData || top;
  this[delay] = parseInt(options[delay] || delayData) || 200;
  this[dismissible] = options[dismissible] || dismissibleData === 'true' ? true : false;
  this[container] = queryElement(options[container]) ? queryElement(options[container]) 
                  : queryElement(containerData) ? queryElement(containerData) 
                  : navbarFixedTop ? navbarFixedTop
                  : navbarFixedBottom ? navbarFixedBottom
                  : modal ? modal : body;
  
  // bind, content
  var self = this, 
    titleString = element[getAttribute](dataTitle) || null,
    contentString = element[getAttribute](dataContent) || null;

  if ( !contentString && !this[template] ) return; // invalidate

  // constants, vars
  var popover = null, timer = 0, placementSetting = this[placement],
    
    // handlers
    dismissibleHandler = function(e) {
      if (popover !== null && e[target] === queryElement('.close',popover)) {
        self.hide();
      }
    },

    // private methods
    removePopover = function() {
      self[container].removeChild(popover);
      timer = null; popover = null; 
    },
    createPopover = function() {
      titleString = element[getAttribute](dataTitle); // check content again
      contentString = element[getAttribute](dataContent);

      popover = document.createElement(div);

      if ( contentString !== null && self[template] === null ) { //create the popover from data attributes

        popover[setAttribute]('role','tooltip');

        if (titleString !== null) {
          var popoverTitle = document.createElement('h3');
          popoverTitle[setAttribute](classString,component+'-title');

          popoverTitle.innerHTML = self[dismissible] ? titleString + closeBtn : titleString;
          popover.appendChild(popoverTitle);
        }

        //set popover content
        var popoverContent = document.createElement(div);
        popoverContent[setAttribute](classString,component+'-content');
        popoverContent.innerHTML = self[dismissible] && titleString === null ? contentString + closeBtn : contentString;
        popover.appendChild(popoverContent);

      } else {  // or create the popover from template
        var popoverTemplate = document.createElement(div);
        popoverTemplate.innerHTML = self[template];
        popover.innerHTML = popoverTemplate.firstChild.innerHTML;
      }

      //append to the container
      self[container].appendChild(popover);
      popover[style].display = 'block';
      popover[setAttribute](classString, component+ ' ' + component+'-'+placementSetting + ' ' + self[animation]);
    },
    showPopover = function () {
      !hasClass(popover,showClass) && ( addClass(popover,showClass) );
    },
    updatePopover = function() {
      styleTip(element,popover,placementSetting,self[container]);
      if (!isElementInViewport(popover) ) { 
        placementSetting = updatePlacement(placementSetting); 
        styleTip(element,popover,placementSetting,self[container]); 
      }
    };

  // public methods / handlers
  this.toggle = function() {
    if (popover === null) { self.show(); } 
    else { self.hide(); }
  };
  this.show = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (popover === null) {
        placementSetting = self[placement]; // we reset placement in all cases
        createPopover();
        updatePopover();
        showPopover();
        bootstrapCustomEvent.call(element, showEvent, component);
        emulateTransitionEnd(popover, function(){
          bootstrapCustomEvent.call(element, shownEvent, component);
        });
      }
    }, 20 );
  };
  this.hide = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (popover && popover !== null && hasClass(popover,showClass)) {
        bootstrapCustomEvent.call(element, hideEvent, component);
        removeClass(popover,showClass);
        emulateTransitionEnd(popover, function() {
          removePopover();
          bootstrapCustomEvent.call(element, hiddenEvent, component);
        });
      }
    }, self[delay] );
  };

  // init
  if ( !(stringPopover in element) ) { // prevent adding event handlers twice
    if (self[trigger] === hoverEvent) {
      on( element, mouseHover[0], self.show );
      if (!self[dismissible]) { on( element, mouseHover[1], self.hide ); }
    } else if (/^(click|focus)$/.test(self[trigger])) {
      on( element, self[trigger], self.toggle );
      if (!self[dismissible]) { on( element, 'blur', self.hide ); }
    }
    
    if (self[dismissible]) { on( document, clickEvent, dismissibleHandler ); }
  
    // dismiss on window resize
    on( globalObject, resizeEvent, self.hide );

  }
  element[stringPopover] = self;
};

// POPOVER DATA API
// ================
initializeDataAPI(stringPopover, Popover, dataToggle);

