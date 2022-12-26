import { p as Q, w as Y, y as S, x as U, C as V, a5 as Z, r as _ } from "./shorty-f5e32a8f.js";
import tt from "./tipClassPositions.mjs";
const et = "Popover", lt = (j, g) => {
  const O = /\b(top|bottom|start|end)+/, { element: R, tooltip: c, container: k, options: D, arrow: r } = j;
  if (!c)
    return;
  const F = { ...tt }, h = Q(R);
  Y(c, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  const $ = j.name === et, { offsetWidth: e, offsetHeight: i } = c, { clientWidth: q, clientHeight: z, offsetWidth: G } = S(R);
  let { placement: t } = D;
  const { clientWidth: I, offsetWidth: J } = k, C = U(k, "position") === "fixed", d = Math.abs(C ? I - J : q - G), N = h && C ? d : 0, u = q - (h ? 0 : d) - 1, {
    width: p,
    height: l,
    left: x,
    right: K,
    top: w
  } = V(R, !0), { x: E, y: W } = {
    x,
    y: w
  };
  Y(r, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  let n = 0, o = 0, v = "", b = "", f = "", P = "";
  const s = r.offsetWidth || 0, a = r.offsetHeight || 0, m = s / 2;
  let T = w - i - a < 0, X = w + i + l + a >= z, y = x - e - s < N, H = x + e + p + s >= u;
  const L = ["left", "right"], B = ["top", "bottom"];
  if (T = L.includes(t) ? w + l / 2 - i / 2 - a < 0 : T, X = L.includes(t) ? w + i / 2 + l / 2 + a >= z : X, y = B.includes(t) ? x + p / 2 - e / 2 < N : y, H = B.includes(t) ? x + e / 2 + p / 2 >= u : H, t = L.includes(t) && y && H ? "top" : t, t = t === "top" && T ? "bottom" : t, t = t === "bottom" && X ? "top" : t, t = t === "left" && y ? "right" : t, t = t === "right" && H ? "left" : t, c.className.includes(t) || (c.className = c.className.replace(O, F[t])), L.includes(t))
    t === "left" ? o = E - e - ($ ? s : 0) : o = E + p + ($ ? s : 0), T ? (n = W, b = l / 2 - s) : X ? (n = W - i + l, b = i - l / 2 - s) : (n = W - i / 2 + l / 2, b = i / 2 - a / 2);
  else if (B.includes(t))
    if (g && Z(R)) {
      const M = g.clientX, A = g.clientY;
      t === "top" ? n = A - i - s : n = A + s, g.clientX - e / 2 < N ? (o = h ? d : 0, f = M - m, f -= C && h ? d : 0) : g.clientX + e / 2 > u ? (o = "auto", v = h ? 0 : d, P = u - M - m, P += C && h ? d : 0) : (o = M - e / 2, f = e / 2 - m);
    } else
      t === "top" ? n = W - i - ($ ? a : 0) : n = W + l + ($ ? a : 0), y ? (o = 0, f = E + p / 2 - m) : H ? (o = "auto", v = 0, P = p / 2 + u - K - m) : (o = E - e / 2 + p / 2, f = e / 2 - m);
  Y(c, {
    top: `${n}px`,
    left: o === "auto" ? o : `${o}px`,
    right: v !== "" ? `${v}px` : ""
  }), _(r) && (b !== "" && (r.style.top = `${b}px`), f !== "" ? r.style.left = `${f}px` : P !== "" && (r.style.right = `${P}px`));
};
export {
  et as p,
  lt as s
};
//# sourceMappingURL=styleTip-2726b8f9.js.map
