import { t as r } from "./tooltipString-23f00c61.js";
const n = (o) => {
  const s = o === r, a = s ? `${o}-inner` : `${o}-body`, d = s ? "" : `<h3 class="${o}-header"></h3>`, t = `<div class="${o}-arrow"></div>`, c = `<div class="${a}"></div>`;
  return `<div class="${o}" role="${r}">${d + t + c}</div>`;
};
export {
  n as default
};
//# sourceMappingURL=getTipTemplate.mjs.map
