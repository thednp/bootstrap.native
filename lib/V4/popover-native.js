
/* Native JavaScript for Bootstrap 4 | Popover
----------------------------------------------*/

// POPOVER DEFINITION
// ==================
var Popover = function( element, options ) {

  // initialization element
  element = queryElement(element);

  // reset on re-init
  element[stringPopover] && element[stringPopover].destroy();  

  // set options
  options = options || {};

  // bind, popover and timer
  var self = this, popover = null, timer = 0,
      // DATA API
      triggerData = element[getAttribute](dataTrigger), // click / hover / focus
      animationData = element[getAttribute](dataAnimation), // true / false
      placementData = element[getAttribute](dataPlacement),
      dismissibleData = element[getAttribute](dataDismissible),
      delayData = element[getAttribute](dataDelay),
      containerData = element[getAttribute](dataContainer),

      // internal strings
      component = 'popover',
      trigger = 'trigger',
      div = 'div',
      fade = 'fade',
      headerClass = component+'-header',
      bodyClass = component+'-body',
      dataContent = 'data-content',
      dismissible = 'dismissible',
      closeBtn = '<button type="button" class="close">×</button>',
      // custom events
      showCustomEvent = bootstrapCustomEvent(showEvent, component),
      shownCustomEvent = bootstrapCustomEvent(shownEvent, component),
      hideCustomEvent = bootstrapCustomEvent(hideEvent, component),
      hiddenCustomEvent = bootstrapCustomEvent(hiddenEvent, component),

      // check container
      containerElement = queryElement(options[container]),
      containerDataElement = queryElement(containerData),       
      
      // maybe the element is inside a modal
      modal = getClosest(element,'.modal'),
      
      // maybe the element is inside a fixed navbar
      navbarFixedTop = getClosest(element,'.'+fixedTop),
      navbarFixedBottom = getClosest(element,'.'+fixedBottom);

  // set instance options
  self[template] = options[template] ? options[template] : null; // JavaScript only
  self[trigger] = options[trigger] ? options[trigger] : triggerData || hoverEvent;
  self[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
  self[placement] = options[placement] ? options[placement] : placementData || top;
  self[delay] = parseInt(options[delay] || delayData) || 200;
  self[dismissible] = options[dismissible] || dismissibleData === 'true' ? true : false;
  self[container] = containerElement ? containerElement 
                  : containerDataElement ? containerDataElement 
                  : navbarFixedTop ? navbarFixedTop
                  : navbarFixedBottom ? navbarFixedBottom
                  : modal ? modal : DOC[body];
  
  // title and content
  var titleString, contentString,
      placementClass = 'bs-' + component+'-'+self[placement];

  // private methods
  // handlers
  var dismissibleHandler = function(e) {
      if (popover !== null && e[target] === queryElement('.close',popover)) {
        self.hide();
      }
    },

    // private methods
    getContents = function(){
      return {
        0 : options.title || element[getAttribute](dataTitle) || null,
        1 : options.content || element[getAttribute](dataContent) || null,        
      }
    },
    removePopover = function() {
      self[container].removeChild(popover);
      timer = null; popover = null; 
    },
    createPopover = function() {
      titleString = getContents()[0] || null;
      contentString = getContents()[1];
      // fixing https://github.com/thednp/bootstrap.native/issues/233
      contentString = !!contentString ? contentString.trim() : null;

      popover = DOC[createElement](div);

      // popover arrow
      var popoverArrow = DOC[createElement](div);
      addClass(popoverArrow,'arrow');
      popover[appendChild](popoverArrow);

      if ( contentString !== null && self[template] === null ) { //create the popover from data attributes

        popover[setAttribute]('role','tooltip');     

        if (titleString !== null) {
          var popoverTitle = DOC[createElement]('h3');
          addClass(popoverTitle,headerClass);
          popoverTitle[innerHTML] = self[dismissible] ? titleString + closeBtn : titleString;
          popover[appendChild](popoverTitle);
        }

        //set popover content
        var popoverBody = DOC[createElement](div);
        addClass(popoverBody,bodyClass);
        popoverBody[innerHTML] = self[dismissible] && titleString === null ? contentString + closeBtn : contentString;
        popover[appendChild](popoverBody);

      } else {  // or create the popover from template
        var popoverTemplate = DOC[createElement](div);
        popoverTemplate[innerHTML] = self[template].trim();
        popover.className = popoverTemplate.firstChild.className;
        popover[innerHTML] = popoverTemplate.firstChild[innerHTML];

        var popoverHeader = queryElement('.'+headerClass,popover),
            popoverBody = queryElement('.'+bodyClass,popover);

        // fill the template with content from data attributes
        !!titleString && popoverHeader && (popoverHeader[innerHTML] = titleString.trim());
        !!contentString && popoverBody && (popoverBody[innerHTML] = contentString.trim());
      }

      //append to the container
      self[container][appendChild](popover);
      popover[style].display = 'block';
      !hasClass(popover, component) && addClass(popover, component);
      !hasClass(popover, self[animation]) && addClass(popover, self[animation]);
      !hasClass(popover, placementClass) && addClass(popover, placementClass);      
    },
    showPopover = function () {
      !hasClass(popover,showClass) && ( addClass(popover,showClass) );
    },
    updatePopover = function() {
      styleTip(element, popover, self[placement], self[container]);
    },
    toggleEvents = function(action){
      if (self[trigger] === hoverEvent) {
        action( element, mouseHover[0], self.show );
        if (!self[dismissible]) { action( element, mouseHover[1], self.hide ); }
      } else if (clickEvent == self[trigger] || 'focus' == self[trigger]) {
        action( element, self[trigger], self.toggle );
      }
    },

    // event toggle
    dismissHandlerToggle = function(action){
      if (clickEvent == self[trigger] || 'focus' == self[trigger]) {
        !self[dismissible] && action( element, 'blur', self.hide );
      }
      self[dismissible] && action( DOC, clickEvent, dismissibleHandler );     
      action( globalObject, resizeEvent, self.hide, passiveHandler );
    },

    // triggers
    showTrigger = function() {
      dismissHandlerToggle(on);
      dispatchCustomEvent.call(element, shownCustomEvent);
    },
    hideTrigger = function() {
      dismissHandlerToggle(off);
      removePopover();
      dispatchCustomEvent.call(element, hiddenCustomEvent);
    };

  // public methods / handlers
  self.toggle = function() {
    if (popover === null) { self.show(); } 
    else { self.hide(); }
  };
  self.show = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (popover === null) {
        dispatchCustomEvent.call(element, showCustomEvent);
        if ( showCustomEvent[defaultPrevented] ) return;

        createPopover();
        updatePopover();
        showPopover();
        !!self[animation] ? emulateTransitionEnd(popover, showTrigger) : showTrigger();
      }
    }, 20 );
  };
  self.hide = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (popover && popover !== null && hasClass(popover,showClass)) {
        dispatchCustomEvent.call(element, hideCustomEvent);
        if ( hideCustomEvent[defaultPrevented] ) return;
        removeClass(popover,showClass);
        !!self[animation] ? emulateTransitionEnd(popover, hideTrigger) : hideTrigger();
      }
    }, self[delay] );
  };
  self.destroy = function() {
    self.hide();
    toggleEvents(off);
    delete element[stringPopover];
  };

  // invalidate
  titleString = getContents()[0];
  contentString = getContents()[1];
  if ( !contentString && !self[template] ) return; 

  // init
  if ( !element[stringPopover] ) { // prevent adding event handlers twice
    toggleEvents(on);
  }

  element[stringPopover] = self;
};

// POPOVER DATA API
// ================
supports[push]( [ stringPopover, Popover, '['+dataToggle+'="popover"]' ] );

