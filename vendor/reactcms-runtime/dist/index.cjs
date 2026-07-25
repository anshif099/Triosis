"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CMSLayout: () => CMSLayout,
  CMSNavigation: () => CMSNavigation,
  RouteRegistry: () => RouteRegistry,
  RuntimeProvider: () => RuntimeProvider
});
module.exports = __toCommonJS(index_exports);

// src/RuntimeProvider.tsx
var import_react2 = require("react");
var import_reactcms_sdk10 = require("@anshif.rainhopes/reactcms-sdk");

// src/RuntimeContext.tsx
var import_react = require("react");
var RuntimeContext = (0, import_react.createContext)(null);

// src/registration/registerWebsite.ts
var import_database = require("firebase/database");
var import_reactcms_sdk = require("@anshif.rainhopes/reactcms-sdk");
var import_shared = require("@anshif.rainhopes/shared");
async function registerWebsite(websiteId, apiKey) {
  try {
    const db = (0, import_reactcms_sdk.getFirebaseDatabase)(apiKey);
    const runtimeRef = (0, import_database.ref)(db, import_shared.paths.registryRuntime(websiteId));
    await (0, import_database.update)(runtimeRef, {
      status: "online",
      heartbeat: (/* @__PURE__ */ new Date()).toISOString(),
      sdkVersion: import_shared.CURRENT_SDK_VERSION,
      runtimeVersion: import_shared.CURRENT_RUNTIME_VERSION,
      compatibility: "ok"
    });
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register website runtime status:", error);
  }
}

// src/registration/registerRoutes.ts
var import_database2 = require("firebase/database");
var import_reactcms_sdk2 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared2 = require("@anshif.rainhopes/shared");

// src/routing/routeDiscovery.ts
function normalizePathToId(path) {
  if (!path || path === "/") return "home";
  return path.toLowerCase().replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function discoverRoutes(routes, parentPath = "") {
  const result = [];
  for (const route of routes) {
    let currentPath = route.path || "";
    if (route.index) {
      currentPath = "";
    }
    let fullPath = "";
    if (currentPath === "") {
      fullPath = parentPath || "/";
    } else {
      fullPath = `${parentPath.replace(/\/$/, "")}/${currentPath.replace(/^\//, "")}`;
      if (!fullPath.startsWith("/")) {
        fullPath = `/${fullPath}`;
      }
    }
    const routeId = normalizePathToId(fullPath);
    if (route.path !== void 0 || route.index) {
      const entry = {
        id: routeId,
        path: fullPath,
        title: route.title || route.id || routeId.charAt(0).toUpperCase() + routeId.slice(1),
        layout: route.layout || "default",
        source: "registered",
        published: true
      };
      if (route.contentModel) {
        entry.contentModel = route.contentModel;
      }
      if (route.createdAt) {
        entry.createdAt = route.createdAt;
      }
      result.push(entry);
    }
    if (route.children && Array.isArray(route.children)) {
      result.push(...discoverRoutes(route.children, fullPath));
    }
  }
  const seen = /* @__PURE__ */ new Set();
  return result.filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  });
}

// src/registration/registerRoutes.ts
async function registerRoutes(websiteId, apiKey, routesConfig) {
  try {
    const db = (0, import_reactcms_sdk2.getFirebaseDatabase)(apiKey);
    const discovered = discoverRoutes(routesConfig);
    const routesRef = (0, import_database2.ref)(db, import_shared2.paths.registryRoutes(websiteId));
    const updates = {};
    discovered.forEach((route) => {
      const cleanRoute = JSON.parse(JSON.stringify(route));
      updates[route.id] = cleanRoute;
    });
    if (Object.keys(updates).length > 0) {
      await (0, import_database2.update)(routesRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register website routes:", error);
  }
}

// src/registration/registerLayouts.ts
var import_database3 = require("firebase/database");
var import_reactcms_sdk3 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared3 = require("@anshif.rainhopes/shared");
async function registerLayouts(websiteId, apiKey, layouts) {
  try {
    const db = (0, import_reactcms_sdk3.getFirebaseDatabase)(apiKey);
    const layoutsRef = (0, import_database3.ref)(db, import_shared3.paths.registryLayouts(websiteId));
    const updates = {};
    Object.entries(layouts).forEach(([id, layout]) => {
      updates[id] = JSON.parse(JSON.stringify(layout));
    });
    if (Object.keys(updates).length > 0) {
      await (0, import_database3.update)(layoutsRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register layouts:", error);
  }
}

// src/registration/registerNavigation.ts
var import_database4 = require("firebase/database");
var import_reactcms_sdk4 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared4 = require("@anshif.rainhopes/shared");
async function registerNavigation(websiteId, apiKey, navigations) {
  try {
    const db = (0, import_reactcms_sdk4.getFirebaseDatabase)(apiKey);
    const navRef = (0, import_database4.ref)(db, import_shared4.paths.registryNav(websiteId));
    const updates = {};
    Object.entries(navigations).forEach(([id, nav]) => {
      updates[id] = JSON.parse(JSON.stringify(nav));
    });
    if (Object.keys(updates).length > 0) {
      await (0, import_database4.update)(navRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register navigation menus:", error);
  }
}

// src/registration/registerTheme.ts
var import_database5 = require("firebase/database");
var import_reactcms_sdk5 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared5 = require("@anshif.rainhopes/shared");
async function registerTheme(websiteId, apiKey, theme) {
  if (!theme) return;
  try {
    const db = (0, import_reactcms_sdk5.getFirebaseDatabase)(apiKey);
    const themeRef = (0, import_database5.ref)(db, import_shared5.paths.registryTheme(websiteId));
    const cleanTheme = JSON.parse(JSON.stringify(theme));
    await (0, import_database5.set)(themeRef, cleanTheme);
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register theme tokens:", error);
  }
}

// src/registration/registerEditableRegions.ts
var import_database6 = require("firebase/database");
var import_reactcms_sdk6 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared6 = require("@anshif.rainhopes/shared");
async function registerEditableRegions(websiteId, apiKey, pageId, regions) {
  try {
    const db = (0, import_reactcms_sdk6.getFirebaseDatabase)(apiKey);
    const regionsRef = (0, import_database6.ref)(db, import_shared6.paths.registryRegions(websiteId, pageId));
    const cleanRegions = {};
    Object.entries(regions || {}).forEach(([regionId, reg]) => {
      if (reg && reg.id && reg.type) {
        const encodedKey = (0, import_shared6.encodeFirebaseKey)(regionId);
        cleanRegions[encodedKey] = {
          id: reg.id,
          type: reg.type,
          label: reg.label || reg.id,
          editable: reg.editable !== void 0 ? reg.editable : true,
          ...reg.defaultValue !== void 0 ? { defaultValue: reg.defaultValue } : {},
          registeredAt: reg.registeredAt || Date.now()
        };
      }
    });
    await (0, import_database6.set)(regionsRef, cleanRegions);
  } catch (error) {
    console.error(`[ReactCMS Runtime] Failed to register editable regions for page ${pageId}:`, error);
  }
}

// src/heartbeat/heartbeatService.ts
var import_database7 = require("firebase/database");
var import_reactcms_sdk7 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared7 = require("@anshif.rainhopes/shared");
var HeartbeatService = class {
  static start(websiteId, apiKey) {
    this.stop();
    const ping = async () => {
      try {
        const db = (0, import_reactcms_sdk7.getFirebaseDatabase)(apiKey);
        const runtimeRef = (0, import_database7.ref)(db, import_shared7.paths.registryRuntime(websiteId));
        await (0, import_database7.update)(runtimeRef, {
          heartbeat: (/* @__PURE__ */ new Date()).toISOString(),
          status: "online"
        });
      } catch (error) {
        console.error("[ReactCMS Runtime] Heartbeat ping failed:", error);
      }
    };
    ping();
    this.intervalId = setInterval(ping, 3e4);
  }
  static stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
};
__publicField(HeartbeatService, "intervalId", null);

// src/version/versionReporter.ts
var import_database8 = require("firebase/database");
var import_reactcms_sdk8 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared8 = require("@anshif.rainhopes/shared");
async function reportVersions(websiteId, apiKey) {
  try {
    const db = (0, import_reactcms_sdk8.getFirebaseDatabase)(apiKey);
    const versionsRef = (0, import_database8.ref)(db, `${import_shared8.paths.registry(websiteId)}/versions`);
    await (0, import_database8.update)(versionsRef, {
      sdk: import_shared8.CURRENT_SDK_VERSION,
      runtime: import_shared8.CURRENT_RUNTIME_VERSION,
      dashboard: import_shared8.CURRENT_DASHBOARD_VERSION
    });
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to report versions:", error);
  }
}

// src/messaging/runtimeMessageHandler.ts
var import_reactcms_sdk9 = require("@anshif.rainhopes/reactcms-sdk");
function setupRuntimeMessageHandler(websiteId, callbacks) {
  return import_reactcms_sdk9.MessageBus.subscribe((msg) => {
    if (msg.websiteId !== websiteId) return;
    switch (msg.type) {
      case "rcms/v1/enter-edit-mode":
        if (callbacks.onEnterEditMode) callbacks.onEnterEditMode();
        break;
      case "rcms/v1/exit-edit-mode":
        if (callbacks.onExitEditMode) callbacks.onExitEditMode();
        break;
      case "rcms/v1/theme-update":
        if (callbacks.onThemeUpdate) callbacks.onThemeUpdate(msg.payload);
        break;
      case "rcms/v1/navigation-update":
        if (callbacks.onNavigationUpdate) callbacks.onNavigationUpdate(msg.payload);
        break;
      case "rcms/v1/field-update":
        if (callbacks.onFieldUpdate) callbacks.onFieldUpdate(msg.payload);
        break;
      case "rcms/v1/region-selected":
        if (callbacks.onRegionSelected) callbacks.onRegionSelected(msg.payload);
        break;
      case "rcms/v1/open-inspector": {
        const payload = msg.payload || {};
        if (payload.regionId && typeof document !== "undefined") {
          const el = document.querySelector(`[data-rcms-region="${payload.regionId}"]`);
          if (el) {
            const computedStyle = (0, import_reactcms_sdk9.getElementComputedStyle)(el);
            import_reactcms_sdk9.MessageBus.send("rcms/v1/region-selected", websiteId, {
              regionId: payload.regionId,
              computedStyle
            });
          }
        }
        if (callbacks.onOpenInspector) callbacks.onOpenInspector(msg.payload);
        break;
      }
    }
  });
}

// src/RuntimeProvider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function RuntimeProvider({
  websiteId,
  apiKey,
  routes,
  theme = null,
  children
}) {
  const [layouts, setLayouts] = (0, import_react2.useState)({});
  const [navigations, setNavigations] = (0, import_react2.useState)({});
  const [regions, setRegions] = (0, import_react2.useState)({});
  const registerLayout = (layout) => {
    setLayouts((prev) => ({ ...prev, [layout.id]: layout }));
  };
  const unregisterLayout = (id) => {
    setLayouts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };
  const registerNavigation2 = (nav) => {
    setNavigations((prev) => ({ ...prev, [nav.id]: nav }));
  };
  const unregisterNavigation = (id) => {
    setNavigations((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };
  const registerRegion = (pageId, regionId, type, label, defaultValue) => {
    console.log(`Registered region:
  Page: ${pageId}
  Region: ${regionId}
  Type: ${type}`);
    setRegions((prev) => {
      const pageRegions = prev[pageId] || {};
      const existing = pageRegions[regionId];
      if (existing && existing.type === type && existing.label === label && JSON.stringify(existing.defaultValue) === JSON.stringify(defaultValue)) {
        return prev;
      }
      return {
        ...prev,
        [pageId]: {
          ...pageRegions,
          [regionId]: {
            id: regionId,
            type,
            label,
            editable: true,
            ...defaultValue !== void 0 ? { defaultValue } : {},
            registeredAt: existing?.registeredAt || Date.now()
          }
        }
      };
    });
  };
  const unregisterRegion = (pageId, regionId) => {
    setRegions((prev) => {
      const pageRegions = prev[pageId] ? { ...prev[pageId] } : {};
      delete pageRegions[regionId];
      return {
        ...prev,
        [pageId]: pageRegions
      };
    });
  };
  (0, import_react2.useEffect)(() => {
    const resolveCurrentPageId = () => {
      if (typeof window === "undefined") return "global";
      const search = window.location.search;
      if (search) {
        try {
          const params = new URLSearchParams(search);
          const q = params.get("page");
          if (q) return q;
        } catch {
        }
      }
      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, "");
      return rawPath || "home";
    };
    const currentPageId = resolveCurrentPageId();
    const runStartup = async () => {
      await registerWebsite(websiteId, apiKey);
      await reportVersions(websiteId, apiKey);
      await registerRoutes(websiteId, apiKey, routes);
      if (theme) {
        await registerTheme(websiteId, apiKey, theme);
      }
      HeartbeatService.start(websiteId, apiKey);
      try {
        const publishedRegions = await import_reactcms_sdk10.editableSync.getPublishedRegions(apiKey, websiteId, currentPageId);
        if (Object.keys(publishedRegions).length > 0) {
          Object.entries(publishedRegions).forEach(([regionId, value]) => {
            import_reactcms_sdk10.MessageBus.setStoredRegionValue(currentPageId, regionId, value);
            import_reactcms_sdk10.MessageBus.send("rcms/v1/field-update", websiteId, { pageId: currentPageId, regionId, value });
          });
        }
      } catch (err) {
        console.warn("[ReactCMS Runtime] Failed to hydrate published regions:", err);
      }
    };
    runStartup();
    const unsubscribePublished = import_reactcms_sdk10.editableSync.subscribeToPublishedRegions(
      apiKey,
      websiteId,
      currentPageId,
      (publishedRegions) => {
        Object.entries(publishedRegions).forEach(([regionId, value]) => {
          import_reactcms_sdk10.MessageBus.setStoredRegionValue(currentPageId, regionId, value);
          import_reactcms_sdk10.MessageBus.send("rcms/v1/field-update", websiteId, { pageId: currentPageId, regionId, value });
        });
      }
    );
    const isPreviewMode = typeof window !== "undefined" && (window.self !== window.top || window.location.search.includes("rcms_preview") || window.location.search.includes("rcms_edit"));
    let unsubscribeDraft = () => {
    };
    if (isPreviewMode) {
      unsubscribeDraft = import_reactcms_sdk10.editableSync.subscribeToDraftRegions(
        apiKey,
        websiteId,
        currentPageId,
        (draftRegions) => {
          Object.entries(draftRegions).forEach(([regionId, value]) => {
            import_reactcms_sdk10.MessageBus.setStoredRegionValue(currentPageId, regionId, value);
            import_reactcms_sdk10.MessageBus.dispatchLocal({
              rcms: true,
              version: "v1",
              type: "rcms/v1/field-update",
              websiteId,
              payload: { pageId: currentPageId, regionId, value },
              timestamp: Date.now()
            });
          });
        }
      );
    }
    const unsubscribeMessages = setupRuntimeMessageHandler(websiteId, {
      onThemeUpdate: (updatedTheme) => {
        registerTheme(websiteId, apiKey, updatedTheme);
      },
      onNavigationUpdate: (updatedNavs) => {
        const navMap = {};
        updatedNavs.forEach((n) => {
          navMap[n.id] = n;
        });
        registerNavigation(websiteId, apiKey, navMap);
      }
    });
    return () => {
      HeartbeatService.stop();
      unsubscribePublished();
      unsubscribeDraft();
      unsubscribeMessages();
    };
  }, [websiteId, apiKey, routes]);
  (0, import_react2.useEffect)(() => {
    if (Object.keys(layouts).length > 0) {
      registerLayouts(websiteId, apiKey, layouts);
    }
  }, [layouts, websiteId, apiKey]);
  (0, import_react2.useEffect)(() => {
    if (Object.keys(navigations).length > 0) {
      registerNavigation(websiteId, apiKey, navigations);
    }
  }, [navigations, websiteId, apiKey]);
  (0, import_react2.useEffect)(() => {
    Object.entries(regions).forEach(([pageId, pageRegions]) => {
      registerEditableRegions(websiteId, apiKey, pageId, pageRegions);
      import_reactcms_sdk10.MessageBus.send("rcms/v1/regions-registered", websiteId, { pageId, regions: pageRegions });
    });
  }, [regions, websiteId, apiKey]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    RuntimeContext.Provider,
    {
      value: {
        layouts,
        navigations,
        registerLayout,
        unregisterLayout,
        registerNavigation: registerNavigation2,
        unregisterNavigation
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_reactcms_sdk10.EditableRegistryContext.Provider,
        {
          value: {
            registerRegion,
            unregisterRegion
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_reactcms_sdk10.CMSProvider, { websiteId, apiKey, environment: "production", children })
        }
      )
    }
  );
}

// src/CMSLayout.tsx
var import_react3 = require("react");
function CMSLayout({
  id,
  label,
  isDefault = false,
  slots = ["main"]
}) {
  const context = (0, import_react3.useContext)(RuntimeContext);
  (0, import_react3.useEffect)(() => {
    if (context) {
      context.registerLayout({
        id,
        label,
        slots,
        isDefault,
        registeredAt: Date.now()
      });
    }
    return () => {
      if (context) {
        context.unregisterLayout(id);
      }
    };
  }, [context, id, label, isDefault, slots]);
  return null;
}

// src/CMSNavigation.tsx
var import_react4 = require("react");
function CMSNavigation({ id, label, items }) {
  const context = (0, import_react4.useContext)(RuntimeContext);
  (0, import_react4.useEffect)(() => {
    if (context) {
      context.registerNavigation({
        id,
        label,
        items,
        registeredAt: Date.now()
      });
    }
    return () => {
      if (context) {
        context.unregisterNavigation(id);
      }
    };
  }, [context, id, label, items]);
  return null;
}

// src/RouteRegistry.tsx
var import_react5 = require("react");
var import_react_router_dom = require("react-router-dom");
var import_database9 = require("firebase/database");
var import_reactcms_sdk11 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared9 = require("@anshif.rainhopes/shared");

// src/routing/dynamicPageRenderer.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function DynamicPageRenderer({ slug }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { padding: "2rem", fontFamily: "sans-serif" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { children: "CMS Generated Page" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
      "This page (slug: ",
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: slug }),
      ") is dynamically served from the ReactCMS registry."
    ] })
  ] });
}

// src/RouteRegistry.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function RouteRegistry({ websiteId, apiKey }) {
  const [dynamicRoutes, setDynamicRoutes] = (0, import_react5.useState)([]);
  (0, import_react5.useEffect)(() => {
    const db = (0, import_reactcms_sdk11.getFirebaseDatabase)(apiKey);
    const routesRef = (0, import_database9.ref)(db, import_shared9.paths.registryRoutes(websiteId));
    const unsubscribe = (0, import_database9.onValue)(routesRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.values(val).filter((r) => r.source === "cms-generated");
        setDynamicRoutes(list);
      } else {
        setDynamicRoutes([]);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [websiteId, apiKey]);
  if (dynamicRoutes.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_router_dom.Routes, { children: dynamicRoutes.map((route) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_react_router_dom.Route,
    {
      path: route.path,
      element: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DynamicPageRenderer, { slug: route.path })
    },
    route.id
  )) });
}
//# sourceMappingURL=index.cjs.map