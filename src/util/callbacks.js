import { supports } from './globals.js'

/* Native JavaScript for Bootstrap | Initialize Data API
--------------------------------------------------------*/
export const initCallback = function (lookUp){
  lookUp = lookUp || document;
  const initializeDataAPI = function( Constructor, collection ){
    for (let i=0, cl=collection.length; i<cl; i++) {
      new Constructor(collection[i]);
    }
  };
  for (let component in supports) {
    initializeDataAPI( supports[component][0], lookUp.querySelectorAll (supports[component][1]) );
  }
};

/* Native JavaScript for Bootstrap | Remove Data API
--------------------------------------------------------*/
export const removeDataAPI = function (lookUp) {
  lookUp = lookUp || document;
  const removeElementDataAPI = function( Constructor, collection ){
    for (let i=0, cl=collection.length; i<cl; i++) {
      if (collection[i][Constructor]) {
        collection[i][Constructor].dispose();
      } 
    }
  };  

  for (let component in supports) {
    removeElementDataAPI( supports[component][0], lookUp.querySelectorAll (supports[component][1]) );
  }  
};
