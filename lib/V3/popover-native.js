
/* Native Javascript for Bootstrap 3 | Popover
----------------------------------------------*/

// POPOVER DEFINITION
// ==================
var Popover = function( element, options ) {

  // initialization element
  element = queryElement(element);

  // set options
  options = options || {};

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
      dataContent = 'data-content',
      dismissible = 'dismissible',
      closeBtn = '<button type="button" class="close">×</button>',

      // check container
      containerElement = queryElement(options[container]),
      containerDataElement = queryElement(containerData),      
      
      // maybe the element is inside a modal
      modal = getClosest(element,'.modal'),
      
      // maybe the element is inside a fixed navbar
      navbarFixedTop = getClosest(element,'.'+fixedTop),
      navbarFixedBottom = getClosest(element,'.'+fixedBottom);

  // set instance options
  this[template] = options[template] ? options[template] : null; // JavaScript only
  this[trigger] = options[trigger] ? options[trigger] : triggerData || hoverEvent;
  this[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
  this[placement] = options[placement] ? options[placement] : placementData || top;
  this[delay] = parseInt(options[delay] || delayData) || 200;
  this[dismissible] = options[dismissible] || dismissibleData === 'true' ? true : false;
  this[container] = containerElement ? containerElement 
                  : containerDataElement ? containerDataElement 
                  : navbarFixedTop ? navbarFixedTop
                  : navbarFixedBottom ? navbarFixedBottom
                  : modal ? modal : DOC[body];

  // bind, content
  var self = this, 
    titleString = options.title || element[getAttribute](dataTitle) || null,
    contentString = options.content || element[getAttribute](dataContent) || null;

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
      titleString = options.title || element[getAttribute](dataTitle);
      contentString = options.content || element[getAttribute](dataContent);
      // fixing https://github.com/thednp/bootstrap.native/issues/233
      contentString = !!contentString ? contentString.replace(/^\s+|\s+$/g, '') : null;

      popover = DOC[createElement](div);

      if ( contentString !== null && self[template] === null ) { //create the popover from data attributes

        popover[setAttribute]('role','tooltip');

        if (titleString !== null) {
          var popoverTitle = DOC[createElement]('h3');
          popoverTitle[setAttribute](classString,component+'-title');

          popoverTitle[innerHTML] = self[dismissible] ? titleString + closeBtn : titleString;
          popover[appendChild](popoverTitle);
        }

        var popoverArrow = DOC[createElement](div), popoverContent = DOC[createElement](div);
        popoverArrow[setAttribute](classString,'arrow'); popoverContent[setAttribute](classString,component+'-content');
        popover[appendChild](popoverArrow); popover[appendChild](popoverContent);

        //set popover content
        popoverContent[innerHTML] = self[dismissible] && titleString === null ? contentString + closeBtn : contentString;

      } else {  // or create the popover from template
        var popoverTemplate = DOC[createElement](div);
        self[template] = self[template].replace(/^\s+|\s+$/g, '');
        popoverTemplate[innerHTML] = self[template];
        popover[innerHTML] = popoverTemplate.firstChild[innerHTML];
      }

      //append to the container
      self[container][appendChild](popover);
      popover[style].display = 'block';
      popover[setAttribute](classString, component+ ' ' + placementSetting + ' ' + self[animation]);
    },
    showPopover = function () {
      !hasClass(popover,inClass) && ( addClass(popover,inClass) );
    },
    updatePopover = function() {
      styleTip(element,popover,placementSetting,self[container]);
    },
    
    // event toggle
    dismissHandlerToggle = function(type){
      if (clickEvent == self[trigger] || 'focus' == self[trigger]) {
        !self[dismissible] && type( element, 'blur', self.hide );
      }
      self[dismissible] && type( DOC, clickEvent, dismissibleHandler );
      !isIE8 && type( globalObject, resizeEvent, self.hide, passiveHandler );
    },

    // triggers
    showTrigger = function() {
      dismissHandlerToggle(on);
      bootstrapCustomEvent.call(element, shownEvent, component);
    },
    hideTrigger = function() {
      dismissHandlerToggle(off);
      removePopover();
      bootstrapCustomEvent.call(element, hiddenEvent, component);
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
        !!self[animation] ? emulateTransitionEnd(popover, showTrigger) : showTrigger();
      }
    }, 20 );
  };
  this.hide = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (popover && popover !== null && hasClass(popover,inClass)) {
        bootstrapCustomEvent.call(element, hideEvent, component);
        removeClass(popover,inClass);
        !!self[animation] ? emulateTransitionEnd(popover, hideTrigger) : hideTrigger();
      }
    }, self[delay] );
  };

  // init
  if ( !(stringPopover in element) ) { // prevent adding event handlers twice
    if (self[trigger] === hoverEvent) {
      on( element, mouseHover[0], self.show );
      if (!self[dismissible]) { on( element, mouseHover[1], self.hide ); }
    } else if (clickEvent == self[trigger] || 'focus' == self[trigger]) {
      on( element, self[trigger], self.toggle );
    }    
  }
  element[stringPopover] = self;
};

// POPOVER DATA API
// ================
supports[push]( [ stringPopover, Popover, '['+dataToggle+'="popover"]' ] );

