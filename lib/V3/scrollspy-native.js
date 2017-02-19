
/* Native Javascript for Bootstrap 3 | ScrollSpy
-----------------------------------------------*/

// SCROLLSPY DEFINITION
// ====================
var ScrollSpy = function(element, options) {

  // initialization element, the element we spy on
  element = queryElement(element); 

  // DATA API
  var targetData = queryElement(element[getAttribute](dataTarget));

  // set options
  options = options || {};
  if ( !options[target] && !targetData ) { return; } // invalidate

  // event targets, constants
  var spyTarget = options[target] && queryElement(options[target]) || targetData,
      links = spyTarget && spyTarget[getElementsByTagName]('A'), 
      items = [], targetItems = [], scrollOffset,
      scrollTarget = element[offsetHeight] < element[scrollHeight] ? element : globalObject, // determine which is the real scrollTarget
      isWindow = scrollTarget === globalObject;  

  // populate items and targets
  for (var i=0, il=links[length]; i<il; i++) {
    var href = links[i][getAttribute]('href'), 
        targetItem = href && targetsReg.test(href) && queryElement(href);
    if ( !!targetItem ) {
      items.push(links[i]);
      targetItems.push(targetItem);
    }
  }

  // private methods
  var updateItem = function(index) {
      var parent = items[index][parentNode], // item's parent LI element
        targetItem = targetItems[index], // the menu item targets this element
        dropdown = getClosest(parent,'.dropdown'),
        targetRect = isWindow && targetItem[getBoundingClientRect](),

        isActive = hasClass(parent,active) || false,

        topEdge = isWindow ? targetRect[top] + scrollOffset : targetItem[offsetTop] - (targetItems[index-1] ? 0 : 10),
        bottomEdge = isWindow ? targetRect[bottom] + scrollOffset : targetItems[index+1] ? targetItems[index+1][offsetTop] : element[scrollHeight],

        inside = scrollOffset >= topEdge && bottomEdge > scrollOffset;

      if ( !isActive && inside ) {
        if ( parent.tagName === 'LI' && !hasClass(parent,active) ) {
          addClass(parent,active);
          isActive = true;
          if (dropdown && !hasClass(dropdown,active) ) {
            addClass(dropdown,active);
          }
          bootstrapCustomEvent.call(element, 'activate', 'scrollspy', items[index]);
        }
      } else if ( !inside ) {
        if ( parent.tagName === 'LI' && hasClass(parent,active) ) {
          removeClass(parent,active);
          isActive = false;
          if (dropdown && hasClass(dropdown,active) && !getElementsByClassName(parent[parentNode],active).length ) {
            removeClass(dropdown,active);
          }
        }
      } else if ( !inside && !isActive || isActive && inside ) {
        return;
      }
    },
    updateItems = function(){
      scrollOffset = isWindow ? getScroll().y : element[scrollTop];
      for (var index=0, itl=items[length]; index<itl; index++) {
        updateItem(index)
      }
    };

  // public method
  this.refresh = function () {
    updateItems();
  }

  // init
  if ( !(stringScrollSpy in element) ) { // prevent adding event handlers twice
    on( scrollTarget, scrollEvent, this.refresh );
    !isIE8 && on( globalObject, resizeEvent, this.refresh ); 
  }
  this.refresh();
  element[stringScrollSpy] = this;
};

// SCROLLSPY DATA API
// ==================
initializeDataAPI(stringScrollSpy, ScrollSpy, dataSpy);

