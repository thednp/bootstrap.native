import { $ as e, E as t, I as n, L as r, P as i, R as a, U as o, V as s, ft as c, m as l, n as u, ot as d, pt as f, r as p, rt as m, s as h, t as g, vt as _, x as v } from "./base-component-Bm8KwB_I.mjs";
import "./fadeClass-Bzjdr13Y.mjs";
import { t as y } from "./showClass-CH6sh0pm.mjs";
import { t as b } from "./activeClass-LUKCeUHG.mjs";
import { t as x } from "./dataBsToggle-CeJMDTHb.mjs";
import { t as S } from "./getTargetElement-CNLJ8Fpo.mjs";
import { t as C } from "./collapsingClass-uyOZrepn.mjs";
import { t as w } from "./dropdownClasses-DJ-0Bzzu.mjs";
//#region src/components/tab.ts
var T = `[${x}="tab"]`, E = (e) => f(e, "Tab"), D = (e) => new z(e), O = d("show.bs.tab"), k = d("shown.bs.tab"), A = d("hide.bs.tab"), j = d("hidden.bs.tab"), M = /* @__PURE__ */ new Map(), N = (t) => {
	let { tabContent: n, nav: i } = t;
	n && a(n, "collapsing") && (n.style.height = "", r(n, C)), i && e.clear(i);
}, P = (t) => {
	let { element: r, tabContent: i, content: l, nav: u } = t, { tab: d } = s(u) && M.get(u) || { tab: null };
	if (i && l && a(l, "fade")) {
		let { currentHeight: e, nextHeight: n } = M.get(r) || {
			currentHeight: 0,
			nextHeight: 0
		};
		e === n ? N(t) : setTimeout(() => {
			i.style.height = `${n}px`, o(i), c(i, () => N(t));
		}, 50);
	} else u && e.clear(u);
	k.relatedTarget = d, n(r, k);
}, F = (e) => {
	let { element: t, content: i, tabContent: s, nav: u } = e, { tab: d, content: f } = u && M.get(u) || {
		tab: null,
		content: null
	}, p = 0;
	if (s && i && a(i, "fade") && ([f, i].forEach((e) => {
		e && l(e, "overflow-hidden");
	}), p = f ? f.scrollHeight : 0), O.relatedTarget = d, j.relatedTarget = t, n(t, O), !O.defaultPrevented) {
		if (i && l(i, b), f && r(f, b), s && i && a(i, "fade")) {
			let e = i.scrollHeight;
			M.set(t, {
				currentHeight: p,
				nextHeight: e,
				tab: null,
				content: null
			}), l(s, C), s.style.height = `${p}px`, o(s), [f, i].forEach((e) => {
				e && r(e, "overflow-hidden");
			});
		}
		i && i && a(i, "fade") ? setTimeout(() => {
			l(i, y), c(i, () => {
				P(e);
			});
		}, 1) : (i && l(i, y), P(e)), d && n(d, j);
	}
}, I = (e) => {
	let { nav: t } = e;
	if (!s(t)) return {
		tab: null,
		content: null
	};
	let n = m(b, t), r = null;
	n.length === 1 && !w.some((e) => a(n[0].parentElement, e)) ? [r] = n : n.length > 1 && (r = n[n.length - 1]);
	let i = s(r) ? S(r) : null;
	return {
		tab: r,
		content: i
	};
}, L = (e) => {
	if (!s(e)) return null;
	let t = v(e, `.${w.join(",.")}`);
	return t ? i(`.${w[0]}-toggle`, t) : null;
}, R = (e) => {
	let t = v(e.target, T), n = t && E(t);
	n && (e.preventDefault(), n.show());
}, z = class extends g {
	static selector = T;
	static init = D;
	static getInstance = E;
	constructor(e) {
		super(e);
		let { element: n } = this, r = S(n);
		if (!r) return;
		let a = v(n, ".nav"), o = v(r, ".tab-content");
		this.nav = a, this.content = r, this.tabContent = o, this.dropdown = L(n);
		let { tab: s } = I(this);
		if (a && !s) {
			let e = i(T, a), r = e && S(e);
			r && (l(e, b), l(r, y), l(r, b), t(n, h, "true"));
		}
		this._toggleEventListeners(!0);
	}
	get name() {
		return "Tab";
	}
	show() {
		let { element: i, content: o, nav: u, dropdown: d } = this;
		if (u && e.get(u) || a(i, "active")) return;
		let { tab: f, content: p } = I(this);
		if (u && f && M.set(u, {
			tab: f,
			content: p,
			currentHeight: 0,
			nextHeight: 0
		}), A.relatedTarget = i, !s(f) || (n(f, A), A.defaultPrevented)) return;
		l(i, b), t(i, h, "true");
		let m = s(f) && L(f);
		if (m && a(m, "active") && r(m, b), u) {
			let n = () => {
				f && (r(f, b), t(f, h, "false")), d && !a(d, "active") && l(d, b);
			};
			p && (a(p, "fade") || o && a(o, "fade")) ? e.set(u, n, 1) : n();
		}
		p && (r(p, y), a(p, "fade") ? c(p, () => F(this)) : F(this));
	}
	_toggleEventListeners = (e) => {
		(e ? u : p)(this.element, _, R);
	};
	dispose() {
		this._toggleEventListeners(), super.dispose();
	}
};
//#endregion
export { z as default };

//# sourceMappingURL=tab.mjs.map