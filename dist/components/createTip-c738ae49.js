import { p as A, r as a, a3 as d, F as y, g as h, M as c, k as $ } from "./shorty-f5e32a8f.js";
import { t as P } from "./tooltipString-23f00c61.js";
import { f as B } from "./fadeClass-0d50d035.js";
import D from "./tipClassPositions.mjs";
import e from "./setHtml.mjs";
const k = "popover", E = "Tooltip", O = (s) => {
  const m = s.name === E, { id: M, element: S, options: x } = s, { title: n, placement: F, template: N, animation: H, customClass: g, sanitizeFn: i, dismissible: z, content: f, btnClose: p } = x, u = m ? P : k, T = { ...D };
  let l = [], r = [];
  A(S) && (T.left = "end", T.right = "start");
  const w = `bs-${u}-${T[F]}`;
  let C;
  if (a(N))
    C = N;
  else {
    const o = d("div");
    e(o, N, i), C = o.firstChild;
  }
  s.tooltip = a(C) ? C.cloneNode(!0) : void 0;
  const { tooltip: t } = s;
  if (!t)
    return;
  y(t, "id", M), y(t, "role", P);
  const j = m ? `${P}-inner` : `${k}-body`, v = m ? null : h(`.${k}-header`, t), b = h(`.${j}`, t);
  s.arrow = h(`.${u}-arrow`, t);
  const { arrow: q } = s;
  if (a(n))
    l = [n.cloneNode(!0)];
  else {
    const o = d("div");
    e(o, n, i), l = [...o.childNodes];
  }
  if (a(f))
    r = [f.cloneNode(!0)];
  else {
    const o = d("div");
    e(o, f, i), r = [...o.childNodes];
  }
  if (z)
    if (n)
      if (a(p))
        l = [...l, p.cloneNode(!0)];
      else {
        const o = d("div");
        e(o, p, i), l = [...l, o.firstChild];
      }
    else if (v && v.remove(), a(p))
      r = [...r, p.cloneNode(!0)];
    else {
      const o = d("div");
      e(o, p, i), r = [...r, o.firstChild];
    }
  m ? n && b && e(b, n, i) : (n && v && e(v, l, i), f && b && e(b, r, i), s.btn = h(".btn-close", t) || void 0), c(t, "position-fixed"), c(q, "position-absolute"), $(t, u) || c(t, u), H && !$(t, B) && c(t, B), g && !$(t, g) && c(t, g), $(t, w) || c(t, w);
};
export {
  O as c,
  k as p,
  E as t
};
//# sourceMappingURL=createTip-c738ae49.js.map
