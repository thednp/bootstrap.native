import { Ct as e, D as t, I as n, K as r, L as i, M as a, P as o, R as s, _ as c, m as l, n as u, ot as d, pt as f, r as p, t as m, vt as h, x as g, yt as _ } from "./base-component-Bm8KwB_I.mjs";
import { t as v } from "./isDisabled-CA05SUmE.mjs";
import { t as y } from "./activeClass-LUKCeUHG.mjs";
import { t as b } from "./dist-CAr49AgA.mjs";
//#region src/strings/scrollspyString.ts
var x = "scrollspy", S = "ScrollSpy", C = "[data-bs-spy=\"scroll\"]", w = "[href]", T = {
	offset: 10,
	target: void 0
}, E = (e) => f(e, S), D = (e) => new N(e), O = d(`activate.bs.${x}`), k = (e) => {
	let { target: t, _itemsLength: n, _observables: i } = e, o = a("A", t), s = r(t);
	!o.length || n === i.size || (i.clear(), Array.from(o).forEach((t) => {
		let n = c(t, "href")?.slice(1), r = n?.length ? s.getElementById(n) : null;
		r && !v(t) && e._observables.set(r, t);
	}), e._itemsLength = e._observables.size);
}, A = (e) => {
	Array.from(a("A", e)).forEach((e) => {
		s(e, "active") && i(e, y);
	});
}, j = (e, t) => {
	let { target: r, element: i } = e;
	A(r), e._activeItem = t, l(t, y);
	let a = t;
	for (; a !== r;) if (a = a.parentElement, [
		"nav",
		"dropdown-menu",
		"list-group"
	].some((e) => s(a, e))) {
		let e = a.previousElementSibling;
		e && !s(e, "active") && l(e, y);
	}
	O.relatedTarget = t, n(i, O);
}, M = (t, n) => {
	let { scrollTarget: r, element: i, options: a } = t;
	return (r === i ? n.offsetTop : e(n).top + r.scrollTop) - (a.offset || 10);
}, N = class extends m {
	static selector = C;
	static init = D;
	static getInstance = E;
	constructor(e, t) {
		super(e, t);
		let { element: n, options: i } = this, a = o(i.target, r(n));
		a && (this.target = a, this.scrollTarget = n.clientHeight < n.scrollHeight ? n : _(n), this._observables = /* @__PURE__ */ new Map(), this.refresh(), this._observer = new b(() => {
			requestAnimationFrame(() => this.refresh());
		}, { root: this.scrollTarget }), this._toggleEventListeners(!0));
	}
	get name() {
		return S;
	}
	get defaults() {
		return T;
	}
	refresh = () => {
		let { target: e, scrollTarget: t } = this;
		if (!e || e.offsetHeight === 0) return;
		k(this);
		let { _itemsLength: n, _observables: r, _activeItem: i } = this;
		if (!n) return;
		let a = r.entries().toArray(), { scrollTop: o, scrollHeight: s, clientHeight: c } = t;
		if (o >= s - c) {
			let e = a[n - 1]?.[1];
			i !== e && j(this, e);
			return;
		}
		let l = a[0]?.[0] ? M(this, a[0][0]) : null;
		if (l !== null && o < l && l > 0) {
			this._activeItem = null, A(e);
			return;
		}
		for (let e = 0; e < n; e += 1) {
			let [t, n] = a[e], r = M(this, t), s = a[e + 1]?.[0], c = s ? M(this, s) : null;
			if (i !== n && o >= r && (c === null || o < c)) {
				j(this, n);
				break;
			}
		}
	};
	_scrollTo = (e) => {
		let n = g(e.target, w), r = n && c(n, "href")?.slice(1), i = r && t(r, this.target);
		i && (this.scrollTarget.scrollTo({
			top: i.offsetTop,
			behavior: "smooth"
		}), e.preventDefault());
	};
	_toggleEventListeners = (e) => {
		let { target: t, _observables: n, _observer: r, _scrollTo: i } = this;
		(e ? u : p)(t, h, i), e ? n?.forEach((e, t) => r.observe(t)) : r.disconnect();
	};
	dispose() {
		this._toggleEventListeners(), super.dispose();
	}
};
//#endregion
export { N as default };

//# sourceMappingURL=scrollspy.mjs.map