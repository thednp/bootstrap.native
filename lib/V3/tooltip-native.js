
/* Native JavaScript for Bootstrap 3 | Tooltip
---------------------------------------------*/

// TOOLTIP DEFINITION
// ==================
var Tooltip = function( element,options ) {

  // initialization element
  element = queryElement(element);

  // set options
  options = options || {};

  // DATA API
  var animationData = element[getAttribute](dataAnimation),
      placementData = element[getAttribute](dataPlacement),
      delayData = element[getAttribute](dataDelay),
      containerData = element[getAttribute](dataContainer),
      
      // strings
      component = 'tooltip',
      classString = 'class',
      title = 'title',
      fade = 'fade',
      div = 'div',
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
  this[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
  this[placement] = options[placement] ? options[placement] : placementData || top;
  this[delay] = parseInt(options[delay] || delayData) || 200;
  this[container] = containerElement ? containerElement 
                  : containerDataElement ? containerDataElement 
                  : navbarFixedTop ? navbarFixedTop
                  : navbarFixedBottom ? navbarFixedBottom
                  : modal ? modal : DOC[body];

  // bind, event targets, title and constants
  var self = this, timer = 0, placementSetting = this[placement], tooltip = null,
    titleString = element[getAttribute](title) || element[getAttribute](dataTitle) || element[getAttribute](dataOriginalTitle);

  if ( !titleString || titleString == "" ) return; // invalidate

  // private methods
  var removeToolTip = function() {
      self[container].removeChild(tooltip);
      tooltip = null; timer = null;
    },
    createToolTip = function() {
      titleString = element[getAttribute](title) || element[getAttribute](dataTitle) || element[getAttribute](dataOriginalTitle); // read the title again
      if ( !titleString || titleString == "" ) return false; // invalidate
      
      tooltip = DOC[createElement](div);
      tooltip[setAttribute]('role',component);

      var tooltipArrow = DOC[createElement](div), tooltipInner = DOC[createElement](div);
      tooltipArrow[setAttribute](classString, component+'-arrow'); tooltipInner[setAttribute](classString,component+'-inner');

      tooltip[appendChild](tooltipArrow); tooltip[appendChild](tooltipInner);

      tooltipInner[innerHTML] = titleString;

      self[container][appendChild](tooltip);
      tooltip[setAttribute](classString, component + ' ' + placementSetting + ' ' + self[animation]);
    },
    updateTooltip = function () {
      styleTip(element,tooltip,placementSetting,self[container]);
    },
    showTooltip = function () {
      !hasClass(tooltip,inClass) && ( addClass(tooltip,inClass) );
    },
    // triggers
    showTrigger = function() {
      !isIE8 && on( globalObject, resizeEvent, self.hide, passiveHandler );      
      dispatchCustomEvent.call(element, shownCustomEvent);
    },
    hideTrigger = function() {
      !isIE8 && off( globalObject, resizeEvent, self.hide, passiveHandler );      
      removeToolTip();
      dispatchCustomEvent.call(element, hiddenCustomEvent);
    };

  // public methods
  this.show = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (tooltip === null) {
        dispatchCustomEvent.call(element, showCustomEvent);
        if (showCustomEvent[defaultPrevented]) return; 
        placementSetting = self[placement]; // we reset placement in all cases
        if(createToolTip() == false) return;
        updateTooltip();
        showTooltip();
        !!self[animation] ? emulateTransitionEnd(tooltip, showTrigger) : showTrigger();
      }
    }, 20 );
  };
  this.hide = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (tooltip && hasClass(tooltip,inClass)) {
        dispatchCustomEvent.call(element, hideCustomEvent);
        if (hideCustomEvent[defaultPrevented]) return; 
        removeClass(tooltip,inClass);
        !!self[animation] ? emulateTransitionEnd(tooltip, hideTrigger) : hideTrigger();
      }
    }, self[delay]);
  };
  this.toggle = function() {
    if (!tooltip) { self.show(); } 
    else { self.hide(); }
  };

  // init
  if ( !(stringTooltip in element) ) { // prevent adding event handlers twice
    element[setAttribute](dataOriginalTitle,titleString);
    element.removeAttribute(title);
    on(element, mouseHover[0], self.show);
    on(element, mouseHover[1], self.hide);
  }
  element[stringTooltip] = self;
};

// TOOLTIP DATA API
// =================
supports[push]( [ stringTooltip, Tooltip, '['+dataToggle+'="tooltip"]' ] );

