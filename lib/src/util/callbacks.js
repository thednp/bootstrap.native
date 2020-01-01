import { supports } from './globals.js'

/* Native JavaScript for Bootstrap | Initialize Data API
--------------------------------------------------------*/
export const initCallback = function(lookUp){
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

/* Native JavaScript for Bootstrap | Remove Data API
--------------------------------------------------------*/
export const removeDataAPI = function(lookUp){
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
