
/* Native Javascript for Bootstrap 4 | Tooltip
---------------------------------------------*/

// TOOLTIP DEFINITION
// ==================
var Tooltip = function( element,options ) {

  // initialization element
  element = queryElement(element);

  // DATA API
  var animationData = element[getAttribute](dataAnimation);
      placementData = element[getAttribute](dataPlacement);
      delayData = element[getAttribute](dataDelay),
      containerData = element[getAttribute](dataContainer),
      
      // strings
      component = 'tooltip',
      classString = 'class',
      title = 'title',
      fade = 'fade',
      div = 'div',

      // maybe the element is inside a modal
      modal = getClosest(element,'.modal'),
      
      // maybe the element is inside a fixed navbar
      navbarFixedTop = getClosest(element,fixedTop),
      navbarFixedBottom = getClosest(element,fixedBottom);

  // set options
  options = options || {};
  this[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
  this[placement] = options[placement] ? options[placement] : placementData || top;
  this[delay] = parseInt(options[delay] || delayData) || 200;
  this[container] = queryElement(options[container]) ? queryElement(options[container]) 
                  : queryElement(containerData) ? queryElement(containerData) 
                  : navbarFixedTop ? navbarFixedTop
                  : navbarFixedBottom ? navbarFixedBottom
                  : modal ? modal : body;

  // bind, event targets, title and constants
  var self = this, timer = 0, placementSetting = this[placement], tooltip = null,
    titleString = element[getAttribute](title) || element[getAttribute](dataOriginalTitle);

  if ( !titleString ) return; // invalidate

  // private methods
  var removeToolTip = function() {
      self[container].removeChild(tooltip);
      tooltip = null; timer = null;
    },
    createToolTip = function() {
      titleString = element[getAttribute](title) || element[getAttribute](dataOriginalTitle); // read the title again
      tooltip = document.createElement(div);
      tooltip[setAttribute]('role',component);
  
      var tooltipInner = document.createElement(div);
      tooltipInner[setAttribute](classString,component+'-inner');
      tooltip.appendChild(tooltipInner);
      tooltipInner.innerHTML = titleString;

      self[container].appendChild(tooltip);
      tooltip[setAttribute](classString, component + ' ' + component+'-'+placementSetting + ' ' + self[animation]);
    },
    updateTooltip = function () {
      styleTip(element,tooltip,placementSetting,self[container]);
      if (!isElementInViewport(tooltip) ) { 
        placementSetting = updatePlacement(placementSetting); 
        styleTip(element,tooltip,placementSetting,self[container]); 
      }
    },
    showTooltip = function () {
      !hasClass(tooltip,showClass) && ( addClass(tooltip,showClass) );
    };

  // public methods
  this.show = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (tooltip === null) {
        placementSetting = self[placement]; // we reset placement in all cases
        createToolTip();
        updateTooltip();
        showTooltip();
        bootstrapCustomEvent.call(element, showEvent, component);
        emulateTransitionEnd(tooltip, function() {
          bootstrapCustomEvent.call(element, shownEvent, component);
        });
      }
    }, 20 );
  };
  this.hide = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (tooltip && tooltip !== null && hasClass(tooltip,showClass)) {
        bootstrapCustomEvent.call(element, hideEvent, component);
        removeClass(tooltip,showClass);
        emulateTransitionEnd(tooltip, function() {
          removeToolTip();
          bootstrapCustomEvent.call(element, hiddenEvent, component);
        });
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
    on(element, mouseHover[0], this.show);
    on(element, mouseHover[1], this.hide);
  }
  element[stringTooltip] = this;
};

// TOOLTIP DATA API
// =================
initializeDataAPI(stringTooltip, Tooltip, dataToggle);

