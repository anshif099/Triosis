var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/RuntimeProvider.tsx
import { useState, useEffect } from "react";
import { CMSProvider, EditableRegistryContext, MessageBus as MessageBus2, editableSync } from "@anshif.rainhopes/reactcms-sdk";

// src/RuntimeContext.tsx
import { createContext } from "react";
var RuntimeContext = createContext(null);

// src/registration/registerWebsite.ts
import { ref, update } from "firebase/database";
import { getFirebaseDatabase } from "@anshif.rainhopes/reactcms-sdk";
import { paths, CURRENT_SDK_VERSION, CURRENT_RUNTIME_VERSION } from "@anshif.rainhopes/shared";
async function registerWebsite(websiteId, apiKey) {
  try {
    const db = getFirebaseDatabase(apiKey);
    const runtimeRef = ref(db, paths.registryRuntime(websiteId));
    await update(runtimeRef, {
      status: "online",
      heartbeat: (/* @__PURE__ */ new Date()).toISOString(),
      sdkVersion: CURRENT_SDK_VERSION,
      runtimeVersion: CURRENT_RUNTIME_VERSION,
      compatibility: "ok"
    });
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register website runtime status:", error);
  }
}

// src/registration/registerRoutes.ts
import { ref as ref2, update as update2 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase2 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths2 } from "@anshif.rainhopes/shared";

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
    const db = getFirebaseDatabase2(apiKey);
    const discovered = discoverRoutes(routesConfig);
    const routesRef = ref2(db, paths2.registryRoutes(websiteId));
    const updates = {};
    discovered.forEach((route) => {
      const cleanRoute = JSON.parse(JSON.stringify(route));
      updates[route.id] = cleanRoute;
    });
    if (Object.keys(updates).length > 0) {
      await update2(routesRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register website routes:", error);
  }
}

// src/registration/registerLayouts.ts
import { ref as ref3, update as update3 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase3 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths3 } from "@anshif.rainhopes/shared";
async function registerLayouts(websiteId, apiKey, layouts) {
  try {
    const db = getFirebaseDatabase3(apiKey);
    const layoutsRef = ref3(db, paths3.registryLayouts(websiteId));
    const updates = {};
    Object.entries(layouts).forEach(([id, layout]) => {
      updates[id] = JSON.parse(JSON.stringify(layout));
    });
    if (Object.keys(updates).length > 0) {
      await update3(layoutsRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register layouts:", error);
  }
}

// src/registration/registerNavigation.ts
import { ref as ref4, update as update4 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase4 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths4 } from "@anshif.rainhopes/shared";
async function registerNavigation(websiteId, apiKey, navigations) {
  try {
    const db = getFirebaseDatabase4(apiKey);
    const navRef = ref4(db, paths4.registryNav(websiteId));
    const updates = {};
    Object.entries(navigations).forEach(([id, nav]) => {
      updates[id] = JSON.parse(JSON.stringify(nav));
    });
    if (Object.keys(updates).length > 0) {
      await update4(navRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register navigation menus:", error);
  }
}

// src/registration/registerTheme.ts
import { ref as ref5, set } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase5 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths5 } from "@anshif.rainhopes/shared";
async function registerTheme(websiteId, apiKey, theme) {
  if (!theme) return;
  try {
    const db = getFirebaseDatabase5(apiKey);
    const themeRef = ref5(db, paths5.registryTheme(websiteId));
    const cleanTheme = JSON.parse(JSON.stringify(theme));
    await set(themeRef, cleanTheme);
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register theme tokens:", error);
  }
}

// src/registration/registerEditableRegions.ts
import { ref as ref6, set as set2 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase6 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths6, encodeFirebaseKey } from "@anshif.rainhopes/shared";
async function registerEditableRegions(websiteId, apiKey, pageId, regions) {
  try {
    const db = getFirebaseDatabase6(apiKey);
    const regionsRef = ref6(db, paths6.registryRegions(websiteId, pageId));
    const cleanRegions = {};
    Object.entries(regions || {}).forEach(([regionId, reg]) => {
      if (reg && reg.id && reg.type) {
        const encodedKey = encodeFirebaseKey(regionId);
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
    await set2(regionsRef, cleanRegions);
  } catch (error) {
    console.error(`[ReactCMS Runtime] Failed to register editable regions for page ${pageId}:`, error);
  }
}

// src/heartbeat/heartbeatService.ts
import { ref as ref7, update as update5 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase7 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths7 } from "@anshif.rainhopes/shared";
var HeartbeatService = class {
  static start(websiteId, apiKey) {
    this.stop();
    const ping = async () => {
      try {
        const db = getFirebaseDatabase7(apiKey);
        const runtimeRef = ref7(db, paths7.registryRuntime(websiteId));
        await update5(runtimeRef, {
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
import { ref as ref8, update as update6 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase8 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths8, CURRENT_SDK_VERSION as CURRENT_SDK_VERSION2, CURRENT_RUNTIME_VERSION as CURRENT_RUNTIME_VERSION2, CURRENT_DASHBOARD_VERSION } from "@anshif.rainhopes/shared";
async function reportVersions(websiteId, apiKey) {
  try {
    const db = getFirebaseDatabase8(apiKey);
    const versionsRef = ref8(db, `${paths8.registry(websiteId)}/versions`);
    await update6(versionsRef, {
      sdk: CURRENT_SDK_VERSION2,
      runtime: CURRENT_RUNTIME_VERSION2,
      dashboard: CURRENT_DASHBOARD_VERSION
    });
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to report versions:", error);
  }
}

// src/messaging/runtimeMessageHandler.ts
import { MessageBus, getElementComputedStyle } from "@anshif.rainhopes/reactcms-sdk";
function setupRuntimeMessageHandler(websiteId, callbacks) {
  return MessageBus.subscribe((msg) => {
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
            const computedStyle = getElementComputedStyle(el);
            MessageBus.send("rcms/v1/region-selected", websiteId, {
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
import { jsx } from "react/jsx-runtime";
function RuntimeProvider({
  websiteId,
  apiKey,
  routes,
  theme = null,
  children
}) {
  const [layouts, setLayouts] = useState({});
  const [navigations, setNavigations] = useState({});
  const [regions, setRegions] = useState({});
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
  useEffect(() => {
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
        const publishedRegions = await editableSync.getPublishedRegions(apiKey, websiteId, currentPageId);
        if (Object.keys(publishedRegions).length > 0) {
          Object.entries(publishedRegions).forEach(([regionId, value]) => {
            MessageBus2.setStoredRegionValue(currentPageId, regionId, value);
            MessageBus2.send("rcms/v1/field-update", websiteId, { pageId: currentPageId, regionId, value });
          });
        }
      } catch (err) {
        console.warn("[ReactCMS Runtime] Failed to hydrate published regions:", err);
      }
    };
    runStartup();
    const unsubscribePublished = editableSync.subscribeToPublishedRegions(
      apiKey,
      websiteId,
      currentPageId,
      (publishedRegions) => {
        Object.entries(publishedRegions).forEach(([regionId, value]) => {
          MessageBus2.setStoredRegionValue(currentPageId, regionId, value);
          MessageBus2.send("rcms/v1/field-update", websiteId, { pageId: currentPageId, regionId, value });
        });
      }
    );
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
      unsubscribeMessages();
    };
  }, [websiteId, apiKey, routes]);
  useEffect(() => {
    if (Object.keys(layouts).length > 0) {
      registerLayouts(websiteId, apiKey, layouts);
    }
  }, [layouts, websiteId, apiKey]);
  useEffect(() => {
    if (Object.keys(navigations).length > 0) {
      registerNavigation(websiteId, apiKey, navigations);
    }
  }, [navigations, websiteId, apiKey]);
  useEffect(() => {
    Object.entries(regions).forEach(([pageId, pageRegions]) => {
      registerEditableRegions(websiteId, apiKey, pageId, pageRegions);
      MessageBus2.send("rcms/v1/regions-registered", websiteId, { pageId, regions: pageRegions });
    });
  }, [regions, websiteId, apiKey]);
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx(
        EditableRegistryContext.Provider,
        {
          value: {
            registerRegion,
            unregisterRegion
          },
          children: /* @__PURE__ */ jsx(CMSProvider, { websiteId, apiKey, environment: "production", children })
        }
      )
    }
  );
}

// src/CMSLayout.tsx
import { useContext, useEffect as useEffect2 } from "react";
function CMSLayout({
  id,
  label,
  isDefault = false,
  slots = ["main"]
}) {
  const context = useContext(RuntimeContext);
  useEffect2(() => {
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
import { useContext as useContext2, useEffect as useEffect3 } from "react";
function CMSNavigation({ id, label, items }) {
  const context = useContext2(RuntimeContext);
  useEffect3(() => {
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
import { useEffect as useEffect4, useState as useState2 } from "react";
import { Routes, Route } from "react-router-dom";
import { ref as ref9, onValue } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase9 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths9 } from "@anshif.rainhopes/shared";

// src/routing/dynamicPageRenderer.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function DynamicPageRenderer({ slug }) {
  return /* @__PURE__ */ jsxs("div", { style: { padding: "2rem", fontFamily: "sans-serif" }, children: [
    /* @__PURE__ */ jsx2("h1", { children: "CMS Generated Page" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "This page (slug: ",
      /* @__PURE__ */ jsx2("code", { children: slug }),
      ") is dynamically served from the ReactCMS registry."
    ] })
  ] });
}

// src/RouteRegistry.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function RouteRegistry({ websiteId, apiKey }) {
  const [dynamicRoutes, setDynamicRoutes] = useState2([]);
  useEffect4(() => {
    const db = getFirebaseDatabase9(apiKey);
    const routesRef = ref9(db, paths9.registryRoutes(websiteId));
    const unsubscribe = onValue(routesRef, (snapshot) => {
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
  return /* @__PURE__ */ jsx3(Routes, { children: dynamicRoutes.map((route) => /* @__PURE__ */ jsx3(
    Route,
    {
      path: route.path,
      element: /* @__PURE__ */ jsx3(DynamicPageRenderer, { slug: route.path })
    },
    route.id
  )) });
}
export {
  CMSLayout,
  CMSNavigation,
  RouteRegistry,
  RuntimeProvider
};
//# sourceMappingURL=index.js.map