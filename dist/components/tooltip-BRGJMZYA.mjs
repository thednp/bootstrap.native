import { $ as e, B as t, Ct as n, E as r, Et as i, H as a, I as o, K as s, L as c, N as l, O as u, P as d, R as f, S as p, St as m, V as h, Y as g, _, _t as v, at as y, b, bt as x, c as ee, d as S, f as C, ft as w, gt as T, h as te, i as E, it as ne, j as re, k as D, m as O, mt as k, n as ie, o as A, ot as j, pt as M, r as N, st as P, t as F, tt as I, ut as L, v as R, vt as z, wt as B, x as V, y as H, yt as ae, z as U } from "./base-component-C7gLasBW.mjs";
import { t as oe } from "./fadeClass-Bzjdr13Y.mjs";
import { t as W } from "./showClass-CH6sh0pm.mjs";
import { t as G } from "./dataBsToggle-CeJMDTHb.mjs";
import { t as K } from "./dist-BwSus0tm.mjs";
import { a as q, i as J, n as se, r as ce, t as le } from "./popupContainer-CsyRS4ZX.mjs";
//#region src/strings/popoverString.ts
var Y = "popover", ue = "Popover", X = "tooltip", de = (e) => {
	let t = e === X, n = t ? `${e}-inner` : `${e}-body`, r = t ? "" : `<h3 class="${e}-header"></h3>`, i = `<div class="${e}-arrow"></div>`, a = `<div class="${n}"></div>`;
	return `<div class="${e}" role="${X}">${r + i + a}</div>`;
}, fe = {
	top: "top",
	bottom: "bottom",
	left: "start",
	right: "end"
}, pe = (e) => {
	requestAnimationFrame(() => {
		let t = /\b(top|bottom|start|end)+/, { element: r, tooltip: i, container: a, offsetParent: s, options: c, arrow: l } = e;
		if (!i) return;
		let u = te(r), { x: d, y: f } = p(s);
		S(i, {
			top: "",
			left: "",
			right: "",
			bottom: ""
		});
		let { offsetWidth: m, offsetHeight: _ } = i, { clientWidth: v, clientHeight: y, offsetWidth: b } = ae(r), { placement: x } = c, { clientWidth: C, offsetWidth: w } = a, T = g(a, "position") === "fixed", E = T ? Math.abs(C - w) : Math.abs(v - b), ne = u && T ? E : 0, re = v - (u ? 0 : E) - 1, { width: D, height: O, left: k, right: ie, top: A } = e._observer.getEntry(r)?.boundingClientRect || n(r, !0), { x: M, y: N } = ee(r, s, {
			x: d,
			y: f
		});
		S(l, {
			top: "",
			left: "",
			right: "",
			bottom: ""
		});
		let P = 0, F = "", I = 0, L = "", R = "", z = "", V = "", H = l.offsetWidth || 0, U = l.offsetHeight || 0, oe = H / 2, W = A - _ - U < 0, G = A + _ + O + U >= y, K = k - m - H < ne, q = k + m + D + H >= re, J = ["left", "right"], se = ["top", "bottom"];
		W = J.includes(x) ? A + O / 2 - _ / 2 - U < 0 : W, G = J.includes(x) ? A + _ / 2 + O / 2 + U >= y : G, K = se.includes(x) ? k + D / 2 - m / 2 < ne : K, q = se.includes(x) ? k + m / 2 + D / 2 >= re : q, x = J.includes(x) && K && q ? "top" : x, x = x === "top" && W ? "bottom" : x, x = x === "bottom" && G ? "top" : x, x = x === "left" && K ? "right" : x, x = x === "right" && q ? "left" : x, i.className.includes(x) || (i.className = i.className.replace(t, fe[x])), J.includes(x) ? (I = x === "left" ? M - m - H : M + D + H, W && G ? (P = 0, F = 0, R = N + O / 2 - U / 2) : W ? (P = N, F = "", R = O / 2 - H) : G ? (P = N - _ + O, F = "", R = _ - O / 2 - H) : (P = N - _ / 2 + O / 2, R = _ / 2 - U / 2)) : se.includes(x) && (P = x === "top" ? N - _ - U : N + O + U, K ? (I = 0, z = M + D / 2 - oe) : q ? (I = "auto", L = 0, V = D / 2 + re - ie - oe) : (I = M - m / 2 + D / 2, z = m / 2 - oe)), S(i, {
			top: `${P}px`,
			bottom: F === "" ? "" : `${F}px`,
			left: I === "auto" ? I : `${I}px`,
			right: L === "" ? "" : `${L}px`
		}), h(l) && (R !== "" && (l.style.top = `${R}px`), z === "" ? V !== "" && (l.style.right = `${V}px`) : l.style.left = `${z}px`), o(r, j(`updated.bs.${B(e.name)}`));
	});
}, me = {
	template: de(X),
	title: "",
	customClass: "",
	trigger: "hover focus",
	placement: "top",
	sanitizeFn: void 0,
	animation: !0,
	delay: 200,
	container: document.body,
	content: "",
	dismissible: !1,
	btnClose: ""
}, he = "data-original-title", Z = "Tooltip", Q = (e, t, n) => {
	if (b(t) && t.length) {
		let r = t.trim();
		m(n) && (r = n(r));
		let i = new DOMParser().parseFromString(r, "text/html");
		e.append(...i.body.childNodes);
	} else h(t) ? e.append(t) : (l(t) || D(t) && t.every(k)) && e.append(...t);
}, ge = (e) => {
	let t = e.name === Z, { id: n, element: i, options: a } = e, { title: o, placement: s, template: c, animation: l, customClass: u, sanitizeFn: p, dismissible: m, content: g, btnClose: _ } = a, v = t ? X : Y, y = { ...fe }, b = [], x = [];
	te(i) && (y.left = "end", y.right = "start");
	let ee = `bs-${v}-${y[s]}`, S;
	if (h(c)) S = c;
	else {
		let e = L("div");
		Q(e, c, p), S = e.firstChild;
	}
	if (!h(S)) return;
	e.tooltip = S.cloneNode(!0);
	let { tooltip: C } = e;
	r(C, "id", n), r(C, "role", X);
	let w = t ? `${X}-inner` : `${Y}-body`, T = t ? null : d(`.${Y}-header`, C), E = d(`.${w}`, C);
	e.arrow = d(`.${v}-arrow`, C);
	let { arrow: ne } = e;
	if (h(o)) b = [o.cloneNode(!0)];
	else {
		let e = L("div");
		Q(e, o, p), b = [...[...e.childNodes]];
	}
	if (h(g)) x = [g.cloneNode(!0)];
	else {
		let e = L("div");
		Q(e, g, p), x = [...[...e.childNodes]];
	}
	if (m) if (o) if (h(_)) b = [...b, _.cloneNode(!0)];
	else {
		let e = L("div");
		Q(e, _, p), b = [...b, e.firstChild];
	}
	else if (T && T.remove(), h(_)) x = [...x, _.cloneNode(!0)];
	else {
		let e = L("div");
		Q(e, _, p), x = [...x, e.firstChild];
	}
	t ? o && E && Q(E, o, p) : (o && T && Q(T, b, p), g && E && Q(E, x, p), e.btn = d(".btn-close", C) || void 0), O(C, "position-absolute"), O(ne, "position-absolute"), f(C, v) || O(C, v), l && !f(C, "fade") && O(C, oe), u && !f(C, u) && O(C, u), f(C, ee) || O(C, ee);
}, _e = (e) => {
	let t = ["HTML", "BODY"], n = [], { parentNode: r } = e;
	for (; r && !t.includes(r.nodeName);) r = ne(r), y(r) || a(r) || n.push(r);
	return n.find((e, t) => (g(e, "position") !== "relative" || g(e, "position") === "relative" && e.offsetHeight !== e.scrollHeight) && n.slice(t + 1).every((e) => g(e, "position") === "static") ? e : null) || s(e).body;
}, ve = `[${G}="${X}"],[data-tip="${X}"]`, ye = "title", be = (e) => M(e, Z), xe = (e) => new ke(e), Se = (e) => {
	let { element: t, tooltip: n, container: r } = e;
	R(t, H), ce(n, r);
}, $ = (e) => {
	let { tooltip: t, container: n } = e;
	return t && se(t, n);
}, Ce = (e, t) => {
	let { element: n } = e;
	e._toggleEventListeners(), P(n, "data-original-title") && e.name === "Tooltip" && Oe(e), t && t();
}, we = (e, t) => {
	let n = t ? ie : N, { element: r } = e;
	n(s(r), u, e.handleTouch, v);
}, Te = (t) => {
	let { element: n } = t, r = j(`shown.bs.${B(t.name)}`);
	we(t, !0), o(n, r), e.clear(n, "in");
}, Ee = (t) => {
	let { element: n } = t, r = j(`hidden.bs.${B(t.name)}`);
	we(t), Se(t), o(n, r), e.clear(n, "out");
}, De = (e, t) => {
	let n = t ? ie : N, { element: r, tooltip: i } = e, a = V(r, `.${q}`), o = V(r, `.${J}`);
	t ? [r, i].forEach((t) => e._observer.observe(t)) : e._observer.disconnect(), a && n(a, `hide.bs.${q}`, e.handleHide), o && n(o, `hide.bs.${J}`, e.handleHide);
}, Oe = (e, t) => {
	let n = [he, ye], { element: i } = e;
	r(i, n[t ? 0 : 1], t || _(i, n[0]) || ""), R(i, n[t ? 1 : 0]);
}, ke = class extends F {
	static selector = ve;
	static init = xe;
	static getInstance = be;
	static styleTip = pe;
	constructor(e, t) {
		super(e, t);
		let { element: n } = this, r = this.name === Z, i = r ? X : Y, a = r ? Z : ue;
		be = (e) => M(e, a), this.enabled = !0, this.id = `${i}-${E(n, i)}`;
		let { options: o } = this;
		if (!o.title && r || !r && !o.content) return;
		re(me, { titleAttr: "" }), P(n, ye) && r && typeof o.title == "string" && Oe(this, o.title);
		let s = _e(n), c = [
			"sticky",
			"fixed",
			"relative"
		].some((e) => g(s, "position") === e) ? s : T(n);
		this.container = s, this.offsetParent = c, ge(this), this.tooltip && (this._observer = new K(() => this.update()), this._toggleEventListeners(!0));
	}
	get name() {
		return Z;
	}
	get defaults() {
		return me;
	}
	handleFocus = () => U(this.element);
	handleShow = () => this.show();
	show() {
		let { options: t, tooltip: n, element: i, container: a, id: s } = this, { animation: c } = t, l = e.get(i, "out");
		e.clear(i, "out"), n && !l && !$(this) && e.set(i, () => {
			let e = j(`show.bs.${B(this.name)}`);
			o(i, e), e.defaultPrevented || (le(n, a), r(i, H, `#${s}`), this.update(), De(this, !0), f(n, "show") || O(n, W), c ? w(n, () => Te(this)) : Te(this));
		}, 17, "in");
	}
	handleHide = () => this.hide();
	hide() {
		let { options: t, tooltip: n, element: r } = this, { animation: i, delay: a } = t;
		e.clear(r, "in"), n && $(this) && e.set(r, () => {
			let e = j(`hide.bs.${B(this.name)}`);
			o(r, e), e.defaultPrevented || (this.update(), c(n, W), De(this), i ? w(n, () => Ee(this)) : Ee(this));
		}, a + 17, "out");
	}
	update = () => {
		pe(this);
	};
	toggle = () => {
		let { tooltip: e } = this;
		e && !$(this) ? this.show() : this.hide();
	};
	enable() {
		let { enabled: e } = this;
		e || (this._toggleEventListeners(!0), this.enabled = !e);
	}
	disable() {
		let { tooltip: e, enabled: t } = this;
		t && (e && $(this) && this.hide(), this._toggleEventListeners(), this.enabled = !t);
	}
	toggleEnabled() {
		this.enabled ? this.disable() : this.enable();
	}
	handleTouch = ({ target: e }) => {
		let { tooltip: t, element: n } = this;
		t && t.contains(e) || e === n || e && n.contains(e) || this.hide();
	};
	_toggleEventListeners = (e) => {
		let n = e ? ie : N, { element: r, options: a, btn: o } = this, { trigger: c } = a, l = !!(this.name !== "Tooltip" && a.dismissible);
		c.includes("manual") || (this.enabled = !!e, c.split(" ").forEach((e) => {
			e === "hover" ? (n(r, C, this.handleShow), n(r, x, this.handleShow), l || (n(r, A, this.handleHide), n(s(r), u, this.handleTouch, v))) : e === "click" ? n(r, e, l ? this.handleShow : this.toggle) : e === "focus" && (n(r, t, this.handleShow), l || n(r, I, this.handleHide), i() && n(r, z, this.handleFocus)), l && o && n(o, z, this.handleHide);
		}));
	};
	dispose() {
		let { tooltip: e, options: t } = this, n = {
			...this,
			name: this.name
		}, r = () => setTimeout(() => Ce(n, () => super.dispose()), 17);
		t.animation && $(n) ? (this.options.delay = 0, this.hide(), w(e, r)) : r();
	}
};
//#endregion
export { ue as a, de as i, me as n, Y as o, pe as r, ke as t };

//# sourceMappingURL=tooltip-BRGJMZYA.mjs.map