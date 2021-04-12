import componentsInit from './componentsInit.js';

/* Native JavaScript for Bootstrap | Remove Data API
---------------------------------------------------- */
function removeElementDataAPI(ConstructorName, collection) {
  Array.from(collection).map((x) => x[ConstructorName].dispose());
}
export default function removeDataAPI(context) {
  const lookUp = context instanceof Element ? context : document;
  Object.keys(componentsInit).forEach((component) => {
    removeElementDataAPI(component, lookUp.querySelectorAll(componentsInit[component][1]));
  });
}
