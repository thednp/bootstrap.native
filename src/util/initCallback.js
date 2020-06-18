import componentsInit from './componentsInit.js'

/* Native JavaScript for Bootstrap | Initialize Data API
-------------------------------------------------------- */
function initializeDataAPI( Constructor, collection ){
  Array.from(collection).map(x=>new Constructor(x))
}
export default function(lookUp){
  lookUp = lookUp || document;
  for (let component in componentsInit) {
    initializeDataAPI( componentsInit[component][0], lookUp.querySelectorAll (componentsInit[component][1]) )
  }
}