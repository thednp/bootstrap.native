import { St as e, et as t } from "./base-component-Bm8KwB_I.mjs";
//#region node_modules/.pnpm/@thednp+position-observer@1.1.0/node_modules/@thednp/position-observer/dist/index.mjs
var n = "1.1.0", r = [
	"all",
	"intersecting",
	"update"
], i = "PositionObserver Error", a = class {
	entries;
	static version = n;
	_t;
	_r;
	_cm;
	_w;
	_h;
	_rm;
	_th;
	_c;
	constructor(n, a) {
		if (!e(n)) throw Error(`${i}: ${n} is not a function.`);
		this.entries = /* @__PURE__ */ new Map(), this._c = n, this._t = 0;
		let o = t(a?.root) ? a.root : document?.documentElement;
		this._r = o, this._rm = a?.rootMargin, this._th = a?.threshold, this._cm = r.indexOf(a?.callbackMode || "intersecting"), this._w = o.clientWidth, this._h = o.clientHeight;
	}
	observe = (e) => {
		if (!t(e)) throw Error(`${i}: ${e} is not an instance of Element.`);
		this._r.contains(e) && this._n(e).then((t) => {
			/* istanbul ignore else @preserve */
			t.boundingClientRect && !this.getEntry(e) && this.entries.set(e, t), this._t ||= requestAnimationFrame(this._rc);
		});
	};
	unobserve = (e) => {
		/* istanbul ignore else @preserve */
		this.entries.has(e) && this.entries.delete(e);
	};
	_rc = () => {
		/* istanbul ignore if @preserve - a guard must be set */
		if (!this.entries.size) {
			this._t = 0;
			return;
		}
		let { clientWidth: e, clientHeight: t } = this._r, n = new Promise((n) => {
			let r = [];
			this.entries.forEach(({ target: n, boundingClientRect: i, isIntersecting: a }) => {
				this._r.contains(n) && this._n(n).then((o) => {
					/* istanbul ignore if @preserve - make sure to only count visible entries */
					if (!o.isIntersecting) {
						if (this._cm === 1) return;
						if (this._cm === 2) {
							a && (this.entries.set(n, o), r.push(o));
							return;
						}
					}
					let { left: s, top: c } = o.boundingClientRect;
					/* istanbul ignore else @preserve - only schedule entries that changed position */
					(i.top !== c || i.left !== s || this._w !== e || this._h !== t) && (this.entries.set(n, o), r.push(o));
				});
			}), this._w = e, this._h = t, n(r);
		});
		this._t = requestAnimationFrame(async () => {
			let e = await n;
			e.length && this._c(e, this), this._rc();
		});
	};
	_n = (e) => new Promise((t) => {
		new IntersectionObserver(([e], n) => {
			n.disconnect(), t(e);
		}, {
			threshold: this._th,
			rootMargin: this._rm
		}).observe(e);
	});
	getEntry = (e) => this.entries.get(e);
	disconnect = () => {
		cancelAnimationFrame(this._t), this.entries.clear(), this._t = 0;
	};
};
//#endregion
export { a as t };

//# sourceMappingURL=dist-CAr49AgA.mjs.map