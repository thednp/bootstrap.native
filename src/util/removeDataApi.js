import componentsInit from './componentsInit.js'

/* Native JavaScript for Bootstrap | Remove Data API
---------------------------------------------------- */
function removeElementDataAPI( ConstructorName, collection ){
  Array.from(collection).map(x=>x[ConstructorName].dispose())
}
export default function(lookUp) {
  lookUp = lookUp || document;
  for (let component in componentsInit) {
    removeElementDataAPI( component, lookUp.querySelectorAll (componentsInit[component][1]) )
  }  
}
