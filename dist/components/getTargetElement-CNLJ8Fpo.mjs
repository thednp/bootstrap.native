import { K as e, P as t, _ as n, x as r } from "./base-component-Bm8KwB_I.mjs";
//#region src/strings/dataBsTarget.ts
var i = "data-bs-target", a = "data-bs-parent", o = "data-bs-container", s = (s) => {
	let c = [
		i,
		a,
		o,
		"href"
	], l = e(s);
	return c.map((e) => {
		let i = n(s, e);
		return i ? e === "data-bs-parent" ? r(s, i) : t(i, l) : null;
	}).filter((e) => e)[0];
};
//#endregion
export { i as n, s as t };

//# sourceMappingURL=getTargetElement-CNLJ8Fpo.mjs.map