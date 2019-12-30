
/* Native JavaScript for Bootstrap 4 | Tooltip
---------------------------------------------*/

// TOOLTIP DEFINITION
// ==================
var Tooltip = function( element,options ) {

  // initialization element
  element = queryElement(element);

  // set options
  options = options || {};

  // reset on re-init
  element[stringTooltip] && element[stringTooltip].destroy();

  // bind, timer and tooltip
  var self = this, timer = 0, tooltip = null,

      // DATA API
      animationData = element[getAttribute](dataAnimation),
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
  self[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
  self[placement] = options[placement] ? options[placement] : placementData || top;
  self[template] = options[template] ? options[template] : null; // JavaScript only
  self[delay] = parseInt(options[delay] || delayData) || 200;
  self[container] = containerElement ? containerElement 
                  : containerDataElement ? containerDataElement
                  : navbarFixedTop ? navbarFixedTop
                  : navbarFixedBottom ? navbarFixedBottom
                  : modal ? modal : DOC[body];

  // title and placement class
  var titleString, placementClass = 'bs-' + component + '-' + self[placement];

  // private methods
  var getTitle = function() {
      return element[getAttribute](title) || element[getAttribute](dataTitle) || element[getAttribute](dataOriginalTitle);
    },
    removeToolTip = function() {
      self[container].removeChild(tooltip);
      tooltip = null; timer = null;
    },
    createToolTip = function() {
      titleString = getTitle(); // read the title again
      if ( !!titleString ) { // invalidate, maybe markup changed
        // create tooltip
        tooltip = DOC[createElement](div);
        
        // set markup
        if (self[template]) {
          var tooltipMarkup = DOC[createElement](div);
          tooltipMarkup[innerHTML] = self[template].trim();

          tooltip.className = tooltipMarkup.firstChild.className;
          tooltip[innerHTML] = tooltipMarkup.firstChild[innerHTML];

          queryElement('.'+component+'-inner',tooltip)[innerHTML] = titleString.trim();
        } else {
          // tooltip arrow
          var tooltipArrow = DOC[createElement](div);
          tooltipArrow[setAttribute](classString,'arrow');
          tooltip[appendChild](tooltipArrow);
          // tooltip inner
          var tooltipInner = DOC[createElement](div);
          tooltipInner[setAttribute](classString,component+'-inner');
          tooltip[appendChild](tooltipInner);
          tooltipInner[innerHTML] = titleString;
        }
        // reset position
        tooltip[style][left] = '0';
        tooltip[style][top] = '0';
        // set class and role attribute
        tooltip[setAttribute]('role',component);
        !hasClass(tooltip, component) && addClass(tooltip, component);
        !hasClass(tooltip, self[animation]) && addClass(tooltip, self[animation]);
        !hasClass(tooltip, placementClass) && addClass(tooltip, placementClass);
        // append to container
        self[container][appendChild](tooltip);
      }
    },
    updateTooltip = function () {
      styleTip(element, tooltip, self[placement], self[container]);
    },
    showTooltip = function () {
      !hasClass(tooltip,showClass) && ( addClass(tooltip,showClass) );
    },
    // triggers
    showAction = function() {
      on( globalObject, resizeEvent, self.hide, passiveHandler );
      dispatchCustomEvent.call(element, shownCustomEvent);
    },
    hideAction = function() {
      off( globalObject, resizeEvent, self.hide, passiveHandler );
      removeToolTip();
      dispatchCustomEvent.call(element, hiddenCustomEvent);
    },
    toggleEvents = function(action){
      action(element, mouseHover[0], self.show);
      action(element, mouseHover[1], self.hide);
    };

  // public methods
  self.show = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (tooltip === null) {
        dispatchCustomEvent.call(element, showCustomEvent);
        if (showCustomEvent[defaultPrevented]) return;        
        // if(createToolTip() == false) return;
        if(createToolTip() !== false) {
          updateTooltip();
          showTooltip();
          !!self[animation] ? emulateTransitionEnd(tooltip, showAction) : showAction();          
        }
      }
    }, 20 );
  };
  self.hide = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (tooltip && hasClass(tooltip,showClass)) {
        dispatchCustomEvent.call(element, hideCustomEvent);
        if (hideCustomEvent[defaultPrevented]) return;
        removeClass(tooltip,showClass);
        !!self[animation] ? emulateTransitionEnd(tooltip, hideAction) : hideAction();
      }
    }, self[delay]);
  };
  self.toggle = function() {
    if (!tooltip) { self.show(); } 
    else { self.hide(); }
  };
  self.destroy = function() {
    toggleEvents(off);
    self.hide();
    element[setAttribute](title, element[getAttribute](dataOriginalTitle));
    element[removeAttribute](dataOriginalTitle);
    delete element[stringTooltip];
  };

  // invalidate
  titleString = getTitle();
  if ( !titleString ) return;

  // init
  if (!element[stringTooltip]){ // prevent adding event handlers twice
    element[setAttribute](dataOriginalTitle,titleString);
    element[removeAttribute](title);
    toggleEvents(on);
  }

  element[stringTooltip] = self;
};

// TOOLTIP DATA API
// =================
supports[push]( [ stringTooltip, Tooltip, '['+dataToggle+'="tooltip"]' ] );

