import {
  E as y,
  c as g,
  r as t,
  i as E,
  d as F,
  a as $,
  m as S,
  s as k,
  b as O,
  e as P,
  f as H,
  g as j,
  h as B,
  u as D,
  R as L,
  j as z,
  k as A,
  l as T,
  n as p,
} from './components-De1Nnuln.js';
/**
 * @remix-run/react v2.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function I(l) {
  if (!l) return null;
  let x = Object.entries(l),
    s = {};
  for (let [i, e] of x)
    if (e && e.__type === 'RouteErrorResponse')
      s[i] = new y(e.status, e.statusText, e.data, e.internal === !0);
    else if (e && e.__type === 'Error') {
      if (e.__subType) {
        let o = window[e.__subType];
        if (typeof o == 'function')
          try {
            let u = new o(e.message);
            (u.stack = e.stack), (s[i] = u);
          } catch {}
      }
      if (s[i] == null) {
        let o = new Error(e.message);
        (o.stack = e.stack), (s[i] = o);
      }
    } else s[i] = e;
  return s;
}
/**
 * @remix-run/react v2.11.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ let n,
  r,
  c = !1;
let R,
  N = new Promise((l) => {
    R = l;
  }).catch(() => {});
function W(l) {
  if (!r) {
    let o = window.__remixContext.url,
      u = window.location.pathname;
    if (o !== u && !window.__remixContext.isSpaMode) {
      let d = `Initial URL (${o}) does not match URL at time of hydration (${u}), reloading page...`;
      return (
        console.error(d),
        window.location.reload(),
        t.createElement(t.Fragment, null)
      );
    }
    if (window.__remixContext.future.unstable_singleFetch) {
      if (!n) {
        let d = window.__remixContext.stream;
        E(d, 'No stream found for single fetch decoding'),
          (window.__remixContext.stream = void 0),
          (n = F(d, window)
            .then((_) => {
              (window.__remixContext.state = _.value), (n.value = !0);
            })
            .catch((_) => {
              n.error = _;
            }));
      }
      if (n.error) throw n.error;
      if (!n.value) throw n;
    }
    let M = $(
        window.__remixManifest.routes,
        window.__remixRouteModules,
        window.__remixContext.state,
        window.__remixContext.future,
        window.__remixContext.isSpaMode
      ),
      a;
    if (!window.__remixContext.isSpaMode) {
      a = {
        ...window.__remixContext.state,
        loaderData: { ...window.__remixContext.state.loaderData },
      };
      let d = S(M, window.location, window.__remixContext.basename);
      if (d)
        for (let _ of d) {
          let m = _.route.id,
            f = window.__remixRouteModules[m],
            w = window.__remixManifest.routes[m];
          f &&
          k(w, f, window.__remixContext.isSpaMode) &&
          (f.HydrateFallback || !w.hasLoader)
            ? (a.loaderData[m] = void 0)
            : w && !w.hasLoader && (a.loaderData[m] = null);
        }
      a && a.errors && (a.errors = I(a.errors));
    }
    let { enabled: b, patchRoutesOnMiss: C } = O(
      window.__remixManifest,
      window.__remixRouteModules,
      window.__remixContext.future,
      window.__remixContext.isSpaMode,
      window.__remixContext.basename
    );
    (r = P({
      routes: M,
      history: H(),
      basename: window.__remixContext.basename,
      future: {
        v7_normalizeFormMethod: !0,
        v7_fetcherPersist: window.__remixContext.future.v3_fetcherPersist,
        v7_partialHydration: !0,
        v7_prependBasename: !0,
        v7_relativeSplatPath: window.__remixContext.future.v3_relativeSplatPath,
        v7_skipActionErrorRevalidation:
          window.__remixContext.future.unstable_singleFetch === !0,
      },
      hydrationData: a,
      mapRouteProperties: j,
      unstable_dataStrategy: window.__remixContext.future.unstable_singleFetch
        ? B(window.__remixManifest, window.__remixRouteModules)
        : void 0,
      ...(b ? { unstable_patchRoutesOnMiss: C } : {}),
    })),
      r.state.initialized && ((c = !0), r.initialize()),
      (r.createRoutesForHMR = g),
      (window.__remixRouter = r),
      R && R(r);
  }
  let [x, s] = t.useState(void 0),
    [i, e] = t.useState(r.state.location);
  return (
    t.useLayoutEffect(() => {
      c || ((c = !0), r.initialize());
    }, []),
    t.useLayoutEffect(
      () =>
        r.subscribe((o) => {
          o.location !== i && e(o.location);
        }),
      [i]
    ),
    D(
      r,
      window.__remixManifest,
      window.__remixRouteModules,
      window.__remixContext.future,
      window.__remixContext.isSpaMode
    ),
    t.createElement(
      t.Fragment,
      null,
      t.createElement(
        L.Provider,
        {
          value: {
            manifest: window.__remixManifest,
            routeModules: window.__remixRouteModules,
            future: window.__remixContext.future,
            criticalCss: x,
            isSpaMode: window.__remixContext.isSpaMode,
          },
        },
        t.createElement(
          z,
          { location: i },
          t.createElement(A, {
            router: r,
            fallbackElement: null,
            future: { v7_startTransition: !0 },
          })
        )
      ),
      window.__remixContext.future.unstable_singleFetch
        ? t.createElement(t.Fragment, null)
        : null
    )
  );
}
var v,
  h = T;
h.createRoot, (v = h.hydrateRoot);
t.startTransition(() => {
  v(document, p.jsx(t.StrictMode, { children: p.jsx(W, {}) }));
});
