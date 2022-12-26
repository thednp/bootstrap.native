import { r as p, a as i, a2 as m, aj as e, ak as l, a4 as o } from "./shorty-f5e32a8f.js";
const h = (r, a, d) => {
  if (!(!p(r) || i(a) && !a.length))
    if (i(a)) {
      let s = a.trim();
      m(d) && (s = d(s));
      const f = new DOMParser().parseFromString(s, "text/html");
      r.append(...f.body.childNodes);
    } else
      p(a) ? r.append(a) : (e(a) || l(a) && a.every(o)) && r.append(...a);
};
export {
  h as default
};
//# sourceMappingURL=setHtml.mjs.map
