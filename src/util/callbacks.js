import { componentsInit } from './globals.js'
import { tryWrapper } from 'shorter-js/src/misc/tryWrapper.js';


/* Native JavaScript for Bootstrap | Initialize Data API
-------------------------------------------------------- */
function initializeDataAPI( Constructor, collection ){
  Array.from(collection).map(x=>new Constructor(x))
}
export function initCallback (lookUp){
  lookUp = lookUp || document;
  for (let component in componentsInit) {
    tryWrapper(
      () => initializeDataAPI( componentsInit[component][0], lookUp.querySelectorAll (componentsInit[component][1]) ),
      `BSN.${component}`
    )
  }
}

/* Native JavaScript for Bootstrap | Remove Data API
---------------------------------------------------- */
function removeElementDataAPI( ConstructorName, collection ){
  Array.from(collection).map(x=>x[ConstructorName].dispose())
}
export function removeDataAPI (lookUp) {
  lookUp = lookUp || document;
  for (let component in componentsInit) {
    tryWrapper(
      () => removeElementDataAPI( component, lookUp.querySelectorAll (componentsInit[component][1]) ),
      `BSN.${component}`
    )
  }  
}
