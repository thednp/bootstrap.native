import componentsInit from './componentsInit.js';

/* Native JavaScript for Bootstrap | Initialize Data API
-------------------------------------------------------- */
function initializeDataAPI(Constructor, collection) {
  Array.from(collection).map((x) => new Constructor(x));
}
export default function initCallback(context) {
  const lookUp = context instanceof Element ? context : document;
  Object.keys(componentsInit).forEach((component) => {
    initializeDataAPI(componentsInit[component][0],
      lookUp.querySelectorAll(componentsInit[component][1]));
  });
}
