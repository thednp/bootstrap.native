import { g as i, a, b as s, U as o, H as h } from "./shorty-f5e32a8f.js";
const l = "5.0.0-alpha1", m = l;
class p {
  element;
  options;
  constructor(e, r) {
    const t = i(e);
    if (!t)
      throw a(e) ? Error(`${this.name} Error: "${e}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const n = s.get(t, this.name);
    n && n.dispose(), this.element = t, this.defaults && o(this.defaults).length && (this.options = h(t, this.defaults, r || {}, "bs")), s.set(t, this.name, this);
  }
  get version() {
    return m;
  }
  get name() {
    return "BaseComponent";
  }
  get defaults() {
    return {};
  }
  dispose() {
    s.remove(this.element, this.name), o(this).forEach((e) => {
      delete this[e];
    });
  }
}
export {
  p as default
};
//# sourceMappingURL=base-component.mjs.map
