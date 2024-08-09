import { require_jsx_dev_runtime } from '/build/_shared/chunk-XGOTYLZ5.js';
import { Links, Meta, Outlet, Scripts } from '/build/_shared/chunk-VYZRAVYK.js';
import '/build/_shared/chunk-U4FRFQSK.js';
import '/build/_shared/chunk-7M6SC7J5.js';
import { createHotContext } from '/build/_shared/chunk-FYS7CAFP.js';
import '/build/_shared/chunk-UWV35TSL.js';
import { __toESM } from '/build/_shared/chunk-PNG5AS42.js';

// app/root.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn(
    'remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.'
  );
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\root.tsx"' + id);
  };
  window.$RefreshSig$ =
    window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    'app\\root.tsx'
  );
  import.meta.hot.lastModified = '1723234300987.5916';
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    'html',
    {
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'head',
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                'link',
                { rel: 'icon', href: 'data:image/x-icon;base64,AA' },
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 25,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Meta,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 26,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Links,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 27,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: 'app/root.tsx',
            lineNumber: 24,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          'body',
          {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                'h1',
                { children: 'Hello world!' },
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 30,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Outlet,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 31,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Scripts,
                {},
                void 0,
                false,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 33,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: 'app/root.tsx',
            lineNumber: 29,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'app/root.tsx',
      lineNumber: 23,
      columnNumber: 10,
    },
    this
  );
}
_c = App;
var _c;
$RefreshReg$(_c, 'App');
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export { App as default };
//# sourceMappingURL=/build/root-XPDVDL67.js.map
