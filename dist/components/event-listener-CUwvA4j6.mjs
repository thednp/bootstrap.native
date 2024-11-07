const a = {}, i = (s) => {
  const { type: o, currentTarget: r } = s;
  a[o].forEach((n, t) => {
    r === t && n.forEach((e, c) => {
      c.apply(t, [s]), typeof e == "object" && e.once && p(t, o, c, e);
    });
  });
}, E = (s, o, r, n) => {
  a[o] || (a[o] = /* @__PURE__ */ new Map());
  const t = a[o];
  t.has(s) || t.set(s, /* @__PURE__ */ new Map());
  const e = t.get(
    s
  ), { size: c } = e;
  e.set(r, n), c || s.addEventListener(
    o,
    i,
    n
  );
}, p = (s, o, r, n) => {
  const t = a[o], e = t && t.get(s), c = e && e.get(r), d = c !== void 0 ? c : n;
  e && e.has(r) && e.delete(r), t && (!e || !e.size) && t.delete(s), (!t || !t.size) && delete a[o], (!e || !e.size) && s.removeEventListener(
    o,
    i,
    d
  );
};
export {
  E,
  p as r
};
//# sourceMappingURL=event-listener-CUwvA4j6.mjs.map
