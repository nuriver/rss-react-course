var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest,
});
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import * as isbotModule from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { jsxDEV } from 'react/jsx-dev-runtime';
var ABORT_DELAY = 5e3;
function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
  loadContext
) {
  return isBotRequest(request.headers.get('user-agent')) ||
    remixContext.isSpaMode
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}
function isBotRequest(userAgent) {
  return userAgent
    ? 'isbot' in isbotModule && typeof isbotModule.isbot == 'function'
      ? isbotModule.isbot(userAgent)
      : 'default' in isbotModule && typeof isbotModule.default == 'function'
      ? isbotModule.default(userAgent)
      : !1
    : !1;
}
function handleBotRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1,
      { pipe, abort } = renderToPipeableStream(
        /* @__PURE__ */ jsxDEV(
          RemixServer,
          {
            context: remixContext,
            url: request.url,
            abortDelay: ABORT_DELAY,
          },
          void 0,
          !1,
          {
            fileName:
              'node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx',
            lineNumber: 66,
            columnNumber: 7,
          },
          this
        ),
        {
          onAllReady() {
            shellRendered = !0;
            let body = new PassThrough(),
              stream = createReadableStreamFromReadable(body);
            responseHeaders.set('Content-Type', 'text/html'),
              resolve(
                new Response(stream, {
                  headers: responseHeaders,
                  status: responseStatusCode,
                })
              ),
              pipe(body);
          },
          onShellError(error) {
            reject(error);
          },
          onError(error) {
            (responseStatusCode = 500), shellRendered && console.error(error);
          },
        }
      );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1,
      { pipe, abort } = renderToPipeableStream(
        /* @__PURE__ */ jsxDEV(
          RemixServer,
          {
            context: remixContext,
            url: request.url,
            abortDelay: ABORT_DELAY,
          },
          void 0,
          !1,
          {
            fileName:
              'node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx',
            lineNumber: 116,
            columnNumber: 7,
          },
          this
        ),
        {
          onShellReady() {
            shellRendered = !0;
            let body = new PassThrough(),
              stream = createReadableStreamFromReadable(body);
            responseHeaders.set('Content-Type', 'text/html'),
              resolve(
                new Response(stream, {
                  headers: responseHeaders,
                  status: responseStatusCode,
                })
              ),
              pipe(body);
          },
          onShellError(error) {
            reject(error);
          },
          onError(error) {
            (responseStatusCode = 500), shellRendered && console.error(error);
          },
        }
      );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
});
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { jsxDEV as jsxDEV2 } from 'react/jsx-dev-runtime';
function App() {
  return /* @__PURE__ */ jsxDEV2(
    'html',
    {
      children: [
        /* @__PURE__ */ jsxDEV2(
          'head',
          {
            children: [
              /* @__PURE__ */ jsxDEV2(
                'link',
                {
                  rel: 'icon',
                  href: 'data:image/x-icon;base64,AA',
                },
                void 0,
                !1,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 12,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ jsxDEV2(
                Meta,
                {},
                void 0,
                !1,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 16,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ jsxDEV2(
                Links,
                {},
                void 0,
                !1,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 17,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: 'app/root.tsx',
            lineNumber: 11,
            columnNumber: 7,
          },
          this
        ),
        /* @__PURE__ */ jsxDEV2(
          'body',
          {
            children: [
              /* @__PURE__ */ jsxDEV2(
                'h1',
                { children: 'Hello world!' },
                void 0,
                !1,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 20,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ jsxDEV2(
                Outlet,
                {},
                void 0,
                !1,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 21,
                  columnNumber: 9,
                },
                this
              ),
              /* @__PURE__ */ jsxDEV2(
                Scripts,
                {},
                void 0,
                !1,
                {
                  fileName: 'app/root.tsx',
                  lineNumber: 23,
                  columnNumber: 9,
                },
                this
              ),
            ],
          },
          void 0,
          !0,
          {
            fileName: 'app/root.tsx',
            lineNumber: 19,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    !0,
    {
      fileName: 'app/root.tsx',
      lineNumber: 10,
      columnNumber: 5,
    },
    this
  );
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = {
  entry: {
    module: '/build/entry.client-ZYYMC3H5.js',
    imports: [
      '/build/_shared/chunk-O4BRYNJ4.js',
      '/build/_shared/chunk-XGOTYLZ5.js',
      '/build/_shared/chunk-VYZRAVYK.js',
      '/build/_shared/chunk-U4FRFQSK.js',
      '/build/_shared/chunk-7M6SC7J5.js',
      '/build/_shared/chunk-FYS7CAFP.js',
      '/build/_shared/chunk-UWV35TSL.js',
      '/build/_shared/chunk-PNG5AS42.js',
    ],
  },
  routes: {
    root: {
      id: 'root',
      parentId: void 0,
      path: '',
      index: void 0,
      caseSensitive: void 0,
      module: '/build/root-XPDVDL67.js',
      imports: void 0,
      hasAction: !1,
      hasLoader: !1,
      hasClientAction: !1,
      hasClientLoader: !1,
      hasErrorBoundary: !1,
    },
  },
  version: '32749510',
  hmr: {
    runtime: '/build/_shared\\chunk-FYS7CAFP.js',
    timestamp: 1723234301396,
  },
  url: '/build/manifest-32749510.js',
};

// server-entry-module:@remix-run/dev/server-build
var mode = 'development',
  assetsBuildDirectory = 'public\\build',
  future = {
    v3_fetcherPersist: !1,
    v3_relativeSplatPath: !1,
    v3_throwAbortReason: !1,
    unstable_singleFetch: !1,
    unstable_lazyRouteDiscovery: !1,
  },
  publicPath = '/build/',
  entry = { module: entry_server_node_exports },
  routes = {
    root: {
      id: 'root',
      parentId: void 0,
      path: '',
      index: void 0,
      caseSensitive: void 0,
      module: root_exports,
    },
  };
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes,
};
//# sourceMappingURL=index.js.map
