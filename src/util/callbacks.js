import { componentsInit } from './globals.js'

/* Native JavaScript for Bootstrap | Initialize Data API
-------------------------------------------------------- */
function initializeDataAPI( Constructor, collection ){
  Array.from(collection).map(x=>new Constructor(x))
}
export const initCallback = function (lookUp){
  lookUp = lookUp || document;
  for (let component in componentsInit) {
    initializeDataAPI( componentsInit[component][0], lookUp.querySelectorAll (componentsInit[component][1]) );
  }
};

/* Native JavaScript for Bootstrap | Remove Data API
---------------------------------------------------- */
function removeElementDataAPI( ConstructorName, collection ){
  Array.from(collection).map(x=>x[ConstructorName].dispose())
}
export const removeDataAPI = function (lookUp) {
  lookUp = lookUp || document;
  for (let component in componentsInit) {
    removeElementDataAPI( component, lookUp.querySelectorAll (componentsInit[component][1]) );
  }  
};
