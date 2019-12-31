import on from './event.js'

// globals
const globalObject = typeof global !== 'undefined' ? global : this||window;
const BSN = globalObject.BSN = {};
export const supports = globalObject.BSN.supports = [];


/* Native JavaScript for Bootstrap | Initialize Data API
--------------------------------------------------------*/
export const initializeDataAPI = function( constructor, collection ){
  for (let i=0, l=collection.length; i<l; i++) {
    new constructor(collection[i]);
  }
};

export const initCallback = BSN.initCallback = function(lookUp){
  lookUp = lookUp || document;
  for (let i=0, l=supports.length; i<l; i++) {
    initializeDataAPI( supports[i][1], lookUp.querySelectorAll (supports[i][2]) );
  }
};

// bulk initialize all components
document.body ? initCallback() : on( document, 'DOMContentLoaded', initCallback );


/* Native JavaScript for Bootstrap | Remove Data API
--------------------------------------------------------*/
export const removeElementDataAPI = function( constructor, collection ){
  for (let i=0, l=collection.length; i<l; i++) {
    collection[i][constructor] && (collection[i][constructor].destroy(), delete collection[i][constructor]);
  }
};

export const removeDataAPI = BSN.removeDataAPI = function(lookUp){
  lookUp = lookUp || document;
  for (let i=0, l=supports.length; i<l; i++) {
    removeElementDataAPI( supports[i][1], lookUp.querySelectorAll (supports[i][2]) );
  }
};
