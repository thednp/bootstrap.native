
/* Native Javascript for Bootstrap 3 | Tooltip
---------------------------------------------*/

// TOOLTIP DEFINITION
// ==================
var Tooltip = function( element,options ) {

  // initialization element
  element = queryElement(element);

  // DATA API
  var animationData = element[getAttribute](dataAnimation);
      placementData = element[getAttribute](dataPlacement);
      durationData = element[getAttribute](dataDuration);
      delayData = element[getAttribute](dataDelay),
      containerData = element[getAttribute](dataContainer),
      
      // strings
      component = 'tooltip',
      classString = 'class',
      title = 'title',
      fade = 'fade',
      div = 'div';

  // set options
  options = options || {};
  this[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
  this[placement] = options[placement] ? options[placement] : placementData || top;
  this[delay] = parseInt(options[delay] || delayData) || 100;
  this[duration] = (isIE && isIE < 10) ? 0 : parseInt(options[duration] || durationData) || 150;
  this[container] = queryElement(options[container]) || queryElement(containerData) || body;

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

      var tooltipArrow = document.createElement(div), tooltipInner = document.createElement(div);
      tooltipArrow[setAttribute](classString, component+'-arrow'); tooltipInner[setAttribute](classString,component+'-inner');

      tooltip.appendChild(tooltipArrow); tooltip.appendChild(tooltipInner);

      tooltipInner.innerHTML = titleString;

      self[container].appendChild(tooltip);
      tooltip[setAttribute](classString, component + ' ' + placementSetting + ' ' + self[animation]);
    },
    updateTooltip = function () {
      styleTip(element,tooltip,placementSetting,self[container]);
      if (!isElementInViewport(tooltip) ) { 
        placementSetting = updatePlacement(placementSetting); 
        styleTip(element,tooltip,placementSetting,self[container]); 
      }
    },
    showTooltip = function () {
      !hasClass(tooltip,'in') && ( addClass(tooltip,'in') );
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
        setTimeout(function() {
          bootstrapCustomEvent.call(element, shownEvent, component);
        }, self[duration]);
      }
    }, 20 );
  };
  this.hide = function() {
    clearTimeout(timer);
    timer = setTimeout( function() {
      if (tooltip && tooltip !== null && hasClass(tooltip,'in')) {
        bootstrapCustomEvent.call(element, hideEvent, component);
        removeClass(tooltip,'in');
        setTimeout(function() {
          removeToolTip();
          bootstrapCustomEvent.call(element, hiddenEvent, component);
        }, self[duration]);
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

