import { jsxs as z, jsx as w } from "react/jsx-runtime";
import { useState as K, useRef as q, useCallback as d, useEffect as A } from "react";
function J({
  value: n,
  onRemove: i,
  parseToken: l,
  className: r,
  removeClassName: o
}) {
  return /* @__PURE__ */ z("span", { "data-testid": "token", className: r, children: [
    l ? l(n) : n,
    /* @__PURE__ */ w(
      "button",
      {
        type: "button",
        "data-testid": "token-remove",
        className: o,
        onClick: i,
        "aria-label": `Remove ${n}`,
        children: "×"
      }
    )
  ] });
}
function Q({
  value: n,
  selected: i,
  onSelect: l,
  onMouseEnter: r,
  parseOption: o,
  className: f,
  selectedClassName: p
}) {
  const u = [f, i ? p : ""].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ w(
    "li",
    {
      role: "option",
      "aria-selected": i,
      "data-testid": "option",
      className: u,
      onClick: () => l(n),
      onMouseEnter: () => r(n),
      children: o ? o(n) : n
    }
  );
}
function W({
  options: n,
  selectedIndex: i,
  onSelect: l,
  onMouseEnter: r,
  parseOption: o,
  className: f,
  optionClassName: p,
  optionSelectedClassName: u
}) {
  return n.length === 0 ? null : /* @__PURE__ */ w("ul", { role: "listbox", "data-testid": "options", className: f, children: n.map((h, b) => /* @__PURE__ */ w(
    Q,
    {
      value: h,
      selected: b === i,
      onSelect: l,
      onMouseEnter: r,
      parseOption: o,
      className: p,
      selectedClassName: u
    },
    h
  )) });
}
function X({
  options: n = [],
  defaultValues: i = [],
  threshold: l = 0,
  filterOptions: r = !0,
  simulateSelect: o = !1,
  limitToOptions: f = !1,
  parseCustom: p,
  onInputChange: u,
  onAdd: h,
  onRemove: b
} = {}) {
  const [s, E] = K(i), [a, L] = K(""), [g, S] = K(!1), [v, k] = K(0), x = q(null), D = q(null), m = d(() => {
    let e = n.filter((t) => !s.includes(t));
    if (r && a && (e = e.filter(
      (t) => t.toLowerCase().includes(a.toLowerCase())
    )), a && !f) {
      const t = p ? p(a) : a;
      !e.includes(t) && !s.includes(t) && (e = [t, ...e]);
    }
    return e;
  }, [n, s, a, r, f, p]), C = m(), $ = g && a.length >= l && C.length > 0, B = !o || s.length === 0, M = d(
    (e) => {
      L(e), k(0), u == null || u(e);
    },
    [u]
  ), N = d(
    (e) => {
      !e || s.includes(e) || (E(o ? [e] : (t) => [...t, e]), L(""), k(0), h == null || h(e));
    },
    [s, o, h]
  ), y = d(
    (e) => {
      const t = s[e];
      t !== void 0 && (E((c) => c.filter((O, U) => U !== e)), b == null || b(t, e));
    },
    [s, b]
  ), j = d(() => {
    const t = m()[v];
    t !== void 0 && N(t);
  }, [m, v, N]), R = d(() => {
    var e;
    S(!0), (e = x.current) == null || e.focus();
  }, []), V = d(() => {
    S(!1), k(0);
  }, []), F = d(
    (e) => {
      var t;
      switch (e.key) {
        case "Enter": {
          e.preventDefault(), j();
          break;
        }
        case "Escape": {
          V(), (t = x.current) == null || t.blur();
          break;
        }
        case "Backspace": {
          a === "" && s.length > 0 && y(s.length - 1);
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          const c = m();
          k(
            (O) => O < c.length - 1 ? O + 1 : O
          );
          break;
        }
        case "ArrowUp": {
          e.preventDefault(), k((c) => c > 0 ? c - 1 : 0);
          break;
        }
      }
    },
    [j, V, a, s.length, y, m]
  ), P = d(
    (e) => {
      const c = m().indexOf(e);
      c >= 0 && k(c);
    },
    [m]
  ), T = d(
    (e) => {
      N(e);
    },
    [N]
  );
  return A(() => {
    if (!g) return;
    const e = (t) => {
      D.current && !D.current.contains(t.target) && V();
    };
    return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
  }, [g, V]), {
    values: s,
    inputValue: a,
    focused: g,
    selectedIndex: v,
    availableOptions: C,
    showOptions: $,
    showInput: B,
    setInputValue: M,
    addValue: N,
    removeValue: y,
    focus: R,
    blur: V,
    handleKeyDown: F,
    handleOptionMouseEnter: P,
    handleOptionSelect: T,
    inputRef: x,
    containerRef: D
  };
}
function ee({
  options: n = [],
  defaultValues: i = [],
  placeholder: l = "",
  threshold: r = 0,
  processing: o = !1,
  autoFocus: f = !1,
  filterOptions: p = !0,
  simulateSelect: u = !1,
  limitToOptions: h = !1,
  parseOption: b,
  parseToken: s,
  parseCustom: E,
  onInputChange: a,
  onAdd: L,
  onRemove: g,
  className: S,
  inputClassName: v,
  tokenClassName: k,
  tokenRemoveClassName: x,
  optionsClassName: D,
  optionClassName: m,
  optionSelectedClassName: C,
  placeholderClassName: $,
  processingClassName: B
}) {
  const {
    values: M,
    inputValue: N,
    focused: y,
    selectedIndex: j,
    availableOptions: R,
    showOptions: V,
    showInput: F,
    setInputValue: P,
    removeValue: T,
    focus: e,
    handleKeyDown: t,
    handleOptionMouseEnter: c,
    handleOptionSelect: O,
    inputRef: U,
    containerRef: G
  } = X({
    options: n,
    defaultValues: i,
    threshold: r,
    filterOptions: p,
    simulateSelect: u,
    limitToOptions: h,
    parseCustom: E,
    onInputChange: a,
    onAdd: L,
    onRemove: g
  });
  A(() => {
    f && e();
  }, [f, e]);
  const H = M.length === 0 && N === "" && !y;
  return /* @__PURE__ */ z(
    "div",
    {
      ref: G,
      "data-testid": "token-autocomplete",
      className: S,
      onClick: e,
      children: [
        M.map((I, _) => /* @__PURE__ */ w(
          J,
          {
            value: I,
            onRemove: () => T(_),
            parseToken: s,
            className: k,
            removeClassName: x
          },
          `${I}-${_}`
        )),
        F && /* @__PURE__ */ w(
          "input",
          {
            ref: U,
            type: "text",
            "data-testid": "token-input",
            className: v,
            value: N,
            onChange: (I) => P(I.target.value),
            onFocus: e,
            onKeyDown: t
          }
        ),
        H && l && /* @__PURE__ */ w("span", { "data-testid": "placeholder", className: $, children: l }),
        o && /* @__PURE__ */ w("span", { "data-testid": "processing", className: B, "aria-label": "Loading" }),
        V && /* @__PURE__ */ w(
          W,
          {
            options: R,
            selectedIndex: j,
            onSelect: O,
            onMouseEnter: c,
            parseOption: b,
            className: D,
            optionClassName: m,
            optionSelectedClassName: C
          }
        )
      ]
    }
  );
}
export {
  Q as Option,
  W as Options,
  J as Token,
  ee as TokenAutocomplete,
  X as useTokenAutocomplete
};
