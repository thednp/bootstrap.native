import { p as _, H as Q, j as S, B as Dt, G as it, q as f, b as Y, Q as Z, I as T, Z as z, t as Ct, v as m, J as $t, U as xt, Y as J, F as H, S as yt, K as At, N as R, d as j, O as V, m as W, L as dt, o as Ht, M as It, f as Pt, P as St, T as F, V as L, W as Tt } from "./base-component-Jx2aafTJ.mjs";
import { E as at, r as ct } from "./event-listener-CUwvA4j6.mjs";
import { s as h } from "./showClass-C8hdJfjQ.mjs";
import { d as lt } from "./dataBsToggle-B84TS15h.mjs";
import { d as D } from "./dropdownClasses-CdCdZ-PX.mjs";
const pt = "Dropdown", ut = "dropdown-menu", ft = (n) => {
  const t = _(n, "A");
  return n.tagName === "A" && Q(n, "href") && S(n, "href").slice(-1) === "#" || t && Q(t, "href") && S(t, "href").slice(-1) === "#";
}, [p, M, N, O] = D, ht = `[${lt}="${p}"]`, u = (n) => Ct(n, pt), Ft = (n) => new Bt(n), Lt = `${ut}-end`, X = [p, M], tt = [N, O], et = ["A", "BUTTON"], Mt = {
  offset: 5,
  display: "dynamic"
}, I = m(
  `show.bs.${p}`
), nt = m(
  `shown.bs.${p}`
), P = m(
  `hide.bs.${p}`
), ot = m(`hidden.bs.${p}`), mt = m(`updated.bs.${p}`), gt = (n) => {
  const { element: t, menu: e, parentElement: r, options: s } = n, { offset: o } = s;
  if ($t(e, "position") !== "static") {
    const i = xt(t), d = J(e, Lt);
    ["margin", "top", "bottom", "left", "right"].forEach((c) => {
      const K = {};
      K[c] = "", H(e, K);
    });
    let a = D.find(
      (c) => J(r, c)
    ) || p;
    const wt = {
      dropdown: [o, 0, 0],
      dropup: [0, 0, o],
      dropstart: i ? [-1, 0, 0, o] : [-1, o, 0],
      dropend: i ? [-1, o, 0] : [-1, 0, 0, o]
    }, g = {
      dropdown: { top: "100%" },
      dropup: { top: "auto", bottom: "100%" },
      dropstart: i ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
      dropend: i ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
      menuStart: i ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
      menuEnd: i ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
    }, { offsetWidth: w, offsetHeight: $ } = e, { clientWidth: B, clientHeight: k } = yt(t), {
      left: E,
      top: x,
      width: U,
      height: Et
    } = At(t), y = E - w - o < 0, A = E + w + U + o >= B, vt = x + $ + o >= k, q = x + $ + Et + o >= k, G = x - $ - o < 0, v = (!i && d || i && !d) && E + U - w < 0, b = (i && d || !i && !d) && E + w >= B;
    if (tt.includes(a) && y && A && (a = p), a === N && (i ? A : y) && (a = O), a === O && (i ? y : A) && (a = N), a === M && G && !q && (a = p), a === p && q && !G && (a = M), tt.includes(a) && vt && R(g[a], {
      top: "auto",
      bottom: 0
    }), X.includes(a) && (v || b)) {
      let c = { left: "auto", right: "auto" };
      !v && b && !i && (c = { left: "auto", right: 0 }), v && !b && i && (c = { left: 0, right: "auto" }), c && R(g[a], c);
    }
    const bt = wt[a];
    H(e, {
      ...g[a],
      margin: `${bt.map((c) => c && `${c}px`).join(" ")}`
    }), X.includes(a) && d && d && H(e, g[!i && v || i && b ? "menuStart" : "menuEnd"]), f(r, mt);
  }
}, Nt = (n) => Array.from(n.children).map((t) => {
  if (t && et.includes(t.tagName)) return t;
  const { firstElementChild: e } = t;
  return e && et.includes(e.tagName) ? e : null;
}).filter((t) => t), st = (n) => {
  const { element: t, options: e, menu: r } = n, s = n.open ? at : ct, o = j(t);
  s(o, W, rt), s(o, dt, rt), s(o, Ht, _t), s(o, It, jt), e.display === "dynamic" && (n.open ? n._observer.observe(r) : n._observer.disconnect());
}, C = (n) => {
  const t = [...D, "btn-group", "input-group"].map(
    (e) => it(`${e} ${h}`, j(n))
  ).find((e) => e.length);
  if (t && t.length)
    return [...t[0].children].find(
      (e) => D.some((r) => r === S(e, lt))
    );
}, rt = (n) => {
  const { target: t, type: e } = n;
  if (!Pt(t)) return;
  const r = C(t), s = r && u(r);
  if (!s) return;
  const { parentElement: o, menu: i } = s, d = o && o.contains(t) && (t.tagName === "form" || _(t, "form") !== null);
  [W, St].includes(e) && ft(t) && n.preventDefault(), !d && e !== dt && t !== r && t !== i && s.hide();
}, Ot = (n) => {
  const { target: t } = n, e = t && _(t, ht), r = e && u(e);
  r && (n.stopPropagation(), r.toggle(), e && ft(e) && n.preventDefault());
}, _t = (n) => {
  [F, L].includes(n.code) && n.preventDefault();
};
function jt(n) {
  const { code: t } = n, e = C(this);
  if (!e) return;
  const r = u(e), { activeElement: s } = j(e);
  if (!r || !s) return;
  const { menu: o, open: i } = r, d = Nt(o);
  if (d && d.length && [F, L].includes(t)) {
    let l = d.indexOf(s);
    s === e ? l = 0 : t === L ? l = l > 1 ? l - 1 : 0 : t === F && (l = l < d.length - 1 ? l + 1 : l), d[l] && T(d[l]);
  }
  Tt === t && i && (r.toggle(), T(e));
}
function Wt(n) {
  const t = C(n), e = t && u(t);
  e && e.open && gt(e);
}
class Bt extends Dt {
  static selector = ht;
  static init = Ft;
  static getInstance = u;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(t, e) {
    super(t, e);
    const { parentElement: r } = this.element, [s] = it(
      ut,
      r
    );
    s && (this.parentElement = r, this.menu = s, this._observer = new IntersectionObserver(
      ([o]) => Wt(o.target),
      { threshold: 1 }
    ), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return pt;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Mt;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: e, menu: r, parentElement: s } = this;
    if (e) return;
    const o = C(t), i = o && u(o);
    i && i.hide(), [I, nt, mt].forEach(
      (d) => {
        d.relatedTarget = t;
      }
    ), f(s, I), !I.defaultPrevented && (Y(r, h), Y(s, h), Z(t, V, "true"), gt(this), this.open = !e, T(t), st(this), f(s, nt));
  }
  hide() {
    const { element: t, open: e, menu: r, parentElement: s } = this;
    e && ([P, ot].forEach((o) => {
      o.relatedTarget = t;
    }), f(s, P), !P.defaultPrevented && (z(r, h), z(s, h), Z(t, V, "false"), this.open = !e, st(this), f(s, ot)));
  }
  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param add when `true`, it will add the event listener
   */
  _toggleEventListeners = (t) => {
    (t ? at : ct)(this.element, W, Ot);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
export {
  Bt as default
};
//# sourceMappingURL=dropdown.mjs.map
