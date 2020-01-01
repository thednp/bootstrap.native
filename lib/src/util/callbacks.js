import on from './event.js'

// globals
const globalObject = typeof global !== 'undefined' ? global : this||window;
const BSN = globalObject.BSN = {};
export const supports = globalObject.BSN.supports = [];


/* Native JavaScript for Bootstrap | Initialize Data API
--------------------------------------------------------*/
export const initCallback = BSN.initCallback = function(lookUp){
  lookUp = lookUp || document;
  const initializeDataAPI = function( constructor, collection ){
    for (let i=0, cl=collection.length; i<cl; i++) {
      new constructor(collection[i]);
    }
  };
  for (let j=0, sl=supports.length; j<sl; j++) {
    initializeDataAPI( supports[j][1], lookUp.querySelectorAll (supports[j][2]) );
  }
};

// bulk initialize all components
document.body ? initCallback() : on( document, 'DOMContentLoaded', initCallback );


/* Native JavaScript for Bootstrap | Remove Data API
--------------------------------------------------------*/
export const removeDataAPI = BSN.removeDataAPI = function(lookUp){
  lookUp = lookUp || document;
  const removeElementDataAPI = function( constructor, collection ){
    for (let i=0, cl=collection.length; i<cl; i++) {
      if (collection[i][constructor]) {
        collection[i][constructor].destroy();
        delete collection[i][constructor];
      } 
    }
  };  
  for (let j=0, sl=supports.length; j<sl; j++) {
    removeElementDataAPI( supports[j][1], lookUp.querySelectorAll (supports[j][2]) );
  }
};
