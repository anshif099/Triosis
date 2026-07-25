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
  CMSContext: () => CMSContext,
  CMSProvider: () => CMSProvider,
  CMSSEOProvider: () => CMSSEOProvider,
  CMSThemeProvider: () => CMSThemeProvider,
  EditableButton: () => EditableButton,
  EditableImage: () => EditableImage,
  EditableRegistryContext: () => EditableRegistryContext,
  EditableRepeater: () => EditableRepeater,
  EditableRichText: () => EditableRichText,
  EditableSection: () => EditableSection,
  EditableText: () => EditableText,
  EditableVideo: () => EditableVideo,
  MessageBus: () => MessageBus,
  NavigationContext: () => NavigationContext,
  PageContext: () => PageContext,
  SEOContext: () => SEOContext,
  ThemeContext: () => ThemeContext,
  editableSync: () => editableSync,
  getElementComputedStyle: () => getElementComputedStyle,
  getFirebaseApp: () => getFirebaseApp,
  getFirebaseDatabase: () => getFirebaseDatabase,
  postMessageBridge: () => postMessageBridge,
  setupFirebaseBridge: () => setupFirebaseBridge,
  useCMS: () => useCMS,
  useEditable: () => useEditable,
  useLivePreview: () => useLivePreview,
  useNavigation: () => useNavigation,
  usePage: () => usePage,
  usePlugins: () => usePlugins,
  useSEO: () => useSEO,
  useTheme: () => useTheme
});
module.exports = __toCommonJS(index_exports);

// src/providers/CMSProvider.tsx
var import_react6 = require("react");

// src/context/CMSContext.tsx
var import_react = require("react");
var CMSContext = (0, import_react.createContext)(null);

// src/context/PageContext.tsx
var import_react2 = require("react");
var PageContext = (0, import_react2.createContext)(null);

// src/context/ThemeContext.tsx
var import_react3 = require("react");
var ThemeContext = (0, import_react3.createContext)(null);

// src/context/NavigationContext.tsx
var import_react4 = require("react");
var NavigationContext = (0, import_react4.createContext)(null);

// src/context/SEOContext.tsx
var import_react5 = require("react");
var SEOContext = (0, import_react5.createContext)(null);

// src/messaging/MessageBus.ts
function getGlobalStore() {
  if (typeof window !== "undefined") {
    if (!window.__RCMS_REGION_STORE__) {
      window.__RCMS_REGION_STORE__ = /* @__PURE__ */ new Map();
    }
    return window.__RCMS_REGION_STORE__;
  }
  return /* @__PURE__ */ new Map();
}
function getGlobalListeners() {
  if (typeof window !== "undefined") {
    if (!window.__RCMS_LISTENERS__) {
      window.__RCMS_LISTENERS__ = /* @__PURE__ */ new Set();
    }
    return window.__RCMS_LISTENERS__;
  }
  return /* @__PURE__ */ new Set();
}
var _MessageBus = class _MessageBus {
  static get listeners() {
    return getGlobalListeners();
  }
  static get regionValuesStore() {
    return getGlobalStore();
  }
  static start(websiteId) {
    if (this.isListening) return;
    this.isListening = true;
    window.addEventListener("message", (event) => {
      const data = event.data;
      if (!data || typeof data !== "object" || data.rcms !== true || data.version !== "v1") {
        return;
      }
      if (!data.websiteId || data.websiteId === websiteId) {
        if (data.type === "rcms/v1/field-update" && data.payload && typeof data.payload === "object") {
          const p = data.payload;
          if (p.regionId && p.value !== void 0) {
            _MessageBus.setStoredRegionValue(p.pageId || "global", p.regionId, p.value);
          }
        }
        this.listeners.forEach((listener) => listener(data));
      }
    });
  }
  static setStoredRegionValue(pageId, regionId, value) {
    this.regionValuesStore.set(`${pageId}:${regionId}`, value);
    this.regionValuesStore.set(regionId, value);
  }
  static getStoredRegionValue(pageId, regionId) {
    if (this.regionValuesStore.has(`${pageId}:${regionId}`)) {
      return this.regionValuesStore.get(`${pageId}:${regionId}`);
    }
    return this.regionValuesStore.get(regionId);
  }
  static dispatchLocal(message) {
    if (message.type === "rcms/v1/field-update" && message.payload && typeof message.payload === "object") {
      const p = message.payload;
      if (p.regionId && p.value !== void 0) {
        this.setStoredRegionValue(p.pageId || "global", p.regionId, p.value);
      }
    }
    this.listeners.forEach((listener) => listener(message));
  }
  static send(type, websiteId, payload) {
    const message = {
      rcms: true,
      version: "v1",
      type,
      websiteId,
      payload,
      timestamp: Date.now()
    };
    if (type === "rcms/v1/field-update" && payload && typeof payload === "object") {
      const p = payload;
      if (p.regionId && p.value !== void 0) {
        this.setStoredRegionValue(p.pageId || "global", p.regionId, p.value);
      }
    }
    this.listeners.forEach((listener) => listener(message));
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      window.parent.postMessage(message, "*");
    }
  }
  static subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  static isValidRCMSMessage(data) {
    if (!data || typeof data !== "object") return false;
    const msg = data;
    return msg.rcms === true && msg.version === "v1" && typeof msg.type === "string" && typeof msg.websiteId === "string";
  }
};
__publicField(_MessageBus, "isListening", false);
var MessageBus = _MessageBus;

// src/providers/CMSProvider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function CMSProvider({
  websiteId,
  apiKey,
  environment = "production",
  children
}) {
  const [editMode, setEditMode] = (0, import_react6.useState)(() => {
    if (typeof window !== "undefined") {
      try {
        const isIframe = window.self !== window.top;
        const search = window.location.search;
        if (isIframe || search.includes("rcms_preview") || search.includes("rcms_edit")) {
          return true;
        }
      } catch {
        return true;
      }
    }
    return false;
  });
  const [isConnected, setIsConnected] = (0, import_react6.useState)(false);
  const [currentPage] = (0, import_react6.useState)(null);
  const [locale, setLocale] = (0, import_react6.useState)("en");
  const [theme, setTheme] = (0, import_react6.useState)(null);
  const [menus, setMenus] = (0, import_react6.useState)({});
  const [seo, setSEO] = (0, import_react6.useState)(null);
  (0, import_react6.useEffect)(() => {
    MessageBus.start(websiteId);
    const unsubscribe = MessageBus.subscribe((msg) => {
      if (msg.type === "rcms/v1/enter-edit-mode") {
        setEditMode(true);
      } else if (msg.type === "rcms/v1/exit-edit-mode") {
        setEditMode(false);
      } else if (msg.type === "rcms/v1/theme-update") {
        setTheme(msg.payload);
      } else if (msg.type === "rcms/v1/navigation-update") {
        const payload = msg.payload;
        const menusRecord = {};
        payload.forEach((menu) => {
          menusRecord[menu.id] = menu;
        });
        setMenus(menusRecord);
      }
    });
    setIsConnected(true);
    MessageBus.send("rcms/v1/runtime-ready", websiteId, {
      ready: true,
      timestamp: Date.now()
    });
    return () => {
      unsubscribe();
    };
  }, [websiteId]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    CMSContext.Provider,
    {
      value: {
        websiteId,
        apiKey,
        environment,
        editMode,
        isConnected,
        setEditMode
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        PageContext.Provider,
        {
          value: {
            currentPage,
            locale,
            setLocale
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value: { theme, setTheme }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationContext.Provider, { value: { menus, setMenus }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEOContext.Provider, { value: { seo, setSEO }, children }) }) })
        }
      )
    }
  );
}

// src/providers/CMSThemeProvider.tsx
var import_react7 = require("react");

// src/utils/cssVars.ts
function themeTokensToCssVars(theme) {
  const vars = {};
  vars["--rcms-color-primary"] = theme.colors.primary;
  vars["--rcms-color-secondary"] = theme.colors.secondary;
  vars["--rcms-color-accent"] = theme.colors.accent;
  vars["--rcms-color-background"] = theme.colors.background;
  vars["--rcms-color-text"] = theme.colors.text;
  vars["--rcms-color-dark-background"] = theme.colors.darkBackground;
  vars["--rcms-color-dark-text"] = theme.colors.darkText;
  vars["--rcms-font-heading"] = theme.typography.headingFont;
  vars["--rcms-font-body"] = theme.typography.bodyFont;
  vars["--rcms-font-size-base"] = theme.typography.baseSize;
  vars["--rcms-line-height"] = theme.typography.lineHeight;
  vars["--rcms-letter-spacing"] = theme.typography.letterSpacing;
  vars["--rcms-spacing-xs"] = theme.spacing.xs;
  vars["--rcms-spacing-sm"] = theme.spacing.sm;
  vars["--rcms-spacing-md"] = theme.spacing.md;
  vars["--rcms-spacing-lg"] = theme.spacing.lg;
  vars["--rcms-spacing-xl"] = theme.spacing.xl;
  vars["--rcms-spacing-xxl"] = theme.spacing.xxl;
  vars["--rcms-radius-sm"] = theme.borderRadius.sm;
  vars["--rcms-radius-md"] = theme.borderRadius.md;
  vars["--rcms-radius-lg"] = theme.borderRadius.lg;
  vars["--rcms-radius-full"] = theme.borderRadius.full;
  vars["--rcms-container-sm"] = theme.containerWidth.sm;
  vars["--rcms-container-md"] = theme.containerWidth.md;
  vars["--rcms-container-lg"] = theme.containerWidth.lg;
  vars["--rcms-container-xl"] = theme.containerWidth.xl;
  vars["--rcms-container-full"] = theme.containerWidth.full;
  vars["--rcms-button-radius"] = theme.buttons.borderRadius;
  vars["--rcms-button-weight"] = theme.buttons.fontWeight;
  vars["--rcms-button-px"] = theme.buttons.paddingX;
  vars["--rcms-button-py"] = theme.buttons.paddingY;
  return vars;
}

// src/providers/CMSThemeProvider.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function CMSThemeProvider({ children }) {
  const context = (0, import_react7.useContext)(ThemeContext);
  (0, import_react7.useEffect)(() => {
    if (!context || !context.theme) return;
    const root = document.documentElement;
    const vars = themeTokensToCssVars(context.theme);
    Object.entries(vars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
  }, [context?.theme]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children });
}

// src/providers/CMSSEOProvider.tsx
var import_react8 = require("react");

// src/utils/seoInjector.ts
function injectSEO(seo) {
  if (typeof document === "undefined") return;
  if (seo.metaTitle) {
    document.title = seo.metaTitle;
  }
  const getOrCreateMeta = (nameAttr, attrValue) => {
    let el = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(nameAttr, attrValue);
      document.head.appendChild(el);
    }
    return el;
  };
  if (seo.metaDescription) {
    getOrCreateMeta("name", "description").content = seo.metaDescription;
  }
  if (seo.ogTitle) getOrCreateMeta("property", "og:title").content = seo.ogTitle;
  if (seo.ogDescription) getOrCreateMeta("property", "og:description").content = seo.ogDescription;
  if (seo.ogImage) getOrCreateMeta("property", "og:image").content = seo.ogImage;
  if (seo.robots) {
    getOrCreateMeta("name", "robots").content = seo.robots;
  }
  if (seo.canonicalUrl) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = seo.canonicalUrl;
  }
}

// src/providers/CMSSEOProvider.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function CMSSEOProvider({ children }) {
  const context = (0, import_react8.useContext)(SEOContext);
  (0, import_react8.useEffect)(() => {
    if (context && context.seo) {
      injectSEO(context.seo);
    }
  }, [context?.seo]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children });
}

// src/hooks/useCMS.ts
var import_react9 = require("react");
function useCMS() {
  const context = (0, import_react9.useContext)(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}

// src/hooks/usePage.ts
var import_react10 = require("react");
function usePage() {
  const context = (0, import_react10.useContext)(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a CMSProvider");
  }
  return context;
}

// src/hooks/useTheme.ts
var import_react11 = require("react");
function useTheme() {
  const context = (0, import_react11.useContext)(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a CMSProvider");
  }
  return context;
}

// src/hooks/useSEO.ts
var import_react12 = require("react");
function useSEO() {
  const context = (0, import_react12.useContext)(SEOContext);
  if (!context) {
    throw new Error("useSEO must be used within a CMSProvider");
  }
  return context;
}

// src/hooks/useNavigation.ts
var import_react13 = require("react");
function useNavigation() {
  const context = (0, import_react13.useContext)(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a CMSProvider");
  }
  return context;
}

// src/hooks/useEditable.ts
var import_react15 = require("react");

// src/context/EditableRegistryContext.tsx
var import_react14 = require("react");
var EditableRegistryContext = (0, import_react14.createContext)(null);

// src/firebase/editableSync.ts
var import_database2 = require("firebase/database");

// src/firebase/firebaseClient.ts
var import_app = require("firebase/app");
var import_database = require("firebase/database");
var firebaseApp = null;
var firebaseDatabase = null;
var DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDX2mOPJqAUguPJNPGj9sxEVVr1dA1_8CQ",
  authDomain: "react-cms-pro.firebaseapp.com",
  projectId: "react-cms-pro",
  storageBucket: "react-cms-pro.firebasestorage.app",
  databaseURL: "https://react-cms-pro-default-rtdb.firebaseio.com"
};
function getFirebaseApp(apiKey) {
  if (firebaseApp) return firebaseApp;
  const apps = (0, import_app.getApps)();
  if (apps.length > 0) {
    firebaseApp = apps[0];
    return firebaseApp;
  }
  const config = {
    ...DEFAULT_FIREBASE_CONFIG,
    ...apiKey ? { apiKey } : {}
  };
  firebaseApp = (0, import_app.initializeApp)(config, "reactcms-sdk-app");
  return firebaseApp;
}
function getFirebaseDatabase(apiKey) {
  if (firebaseDatabase) return firebaseDatabase;
  const app = getFirebaseApp(apiKey);
  firebaseDatabase = (0, import_database.getDatabase)(app);
  return firebaseDatabase;
}

// src/firebase/editableSync.ts
var import_shared = require("@anshif.rainhopes/shared");
function decodeRegionsSnapshot(raw) {
  const regionsRaw = raw.regions && typeof raw.regions === "object" ? raw.regions : raw;
  const decoded = {};
  Object.entries(regionsRaw).forEach(([k, v]) => {
    if (k === "id" || k === "updatedAt" || k === "publishedAt") return;
    decoded[(0, import_shared.decodeFirebaseKey)(k)] = v;
  });
  return decoded;
}
var editableSync = {
  /** Write a single region value to the draft path */
  async saveDraftRegion(apiKey, websiteId, pageId, regionId, value) {
    try {
      const db = getFirebaseDatabase(apiKey);
      const encodedRegionId = (0, import_shared.encodeFirebaseKey)(regionId);
      const regionRef = (0, import_database2.ref)(db, `${import_shared.paths.contentDraft(websiteId, pageId)}/regions/${encodedRegionId}`);
      await (0, import_database2.set)(regionRef, value);
    } catch (err) {
      console.error(`[ReactCMS SDK] Failed to write draft value for region ${regionId}:`, err);
    }
  },
  /** One-time fetch of draft region values for a page */
  async getDraftRegions(apiKey, websiteId, pageId) {
    try {
      const db = getFirebaseDatabase(apiKey);
      let draftRef = (0, import_database2.ref)(db, import_shared.paths.contentDraft(websiteId, pageId));
      let snapshot = await (0, import_database2.get)(draftRef);
      if (!snapshot.exists() && pageId !== "home") {
        draftRef = (0, import_database2.ref)(db, import_shared.paths.contentDraft(websiteId, "home"));
        snapshot = await (0, import_database2.get)(draftRef);
      }
      if (!snapshot.exists()) return {};
      return decodeRegionsSnapshot(snapshot.val());
    } catch (err) {
      console.error(`[ReactCMS SDK] Failed to get draft regions for page ${pageId}:`, err);
      return {};
    }
  },
  /** One-time fetch of published region values for a page (used on live site initial hydration) */
  async getPublishedRegions(apiKey, websiteId, pageId) {
    try {
      const db = getFirebaseDatabase(apiKey);
      let publishedRef = (0, import_database2.ref)(db, import_shared.paths.contentPublished(websiteId, pageId));
      let snapshot = await (0, import_database2.get)(publishedRef);
      if (!snapshot.exists() && pageId !== "home") {
        publishedRef = (0, import_database2.ref)(db, import_shared.paths.contentPublished(websiteId, "home"));
        snapshot = await (0, import_database2.get)(publishedRef);
      }
      if (!snapshot.exists()) return {};
      return decodeRegionsSnapshot(snapshot.val());
    } catch (err) {
      console.error(`[ReactCMS SDK] Failed to get published regions for page ${pageId}:`, err);
      return {};
    }
  },
  /** Subscribe to real-time draft region changes (used in preview/edit mode) */
  subscribeToDraftRegions(apiKey, websiteId, pageId, callback) {
    try {
      const db = getFirebaseDatabase(apiKey);
      const draftRef = (0, import_database2.ref)(db, import_shared.paths.contentDraft(websiteId, pageId));
      return (0, import_database2.onValue)(draftRef, (snapshot) => {
        if (!snapshot.exists()) {
          callback({});
          return;
        }
        callback(decodeRegionsSnapshot(snapshot.val()));
      });
    } catch (err) {
      console.error(`[ReactCMS SDK] Failed to subscribe to draft regions for page ${pageId}:`, err);
      return () => {
      };
    }
  },
  /** Subscribe to published region value changes (used on live site for real-time publish updates) */
  subscribeToPublishedRegions(apiKey, websiteId, pageId, callback) {
    try {
      const db = getFirebaseDatabase(apiKey);
      const publishedRef = (0, import_database2.ref)(db, import_shared.paths.contentPublished(websiteId, pageId));
      return (0, import_database2.onValue)(publishedRef, (snapshot) => {
        if (!snapshot.exists()) return;
        callback(decodeRegionsSnapshot(snapshot.val()));
      });
    } catch (err) {
      console.error(`[ReactCMS SDK] Failed to subscribe to published regions for page ${pageId}:`, err);
      return () => {
      };
    }
  }
};

// src/hooks/useEditable.ts
function resolvePageId(pageContext) {
  if (pageContext?.currentPage) {
    if (pageContext.currentPage.id) return pageContext.currentPage.id;
    if (pageContext.currentPage.slug) return pageContext.currentPage.slug;
    if (pageContext.currentPage.route) {
      const clean = pageContext.currentPage.route.replace(/^\/+|\/+$/g, "");
      return clean || "home";
    }
  }
  if (typeof window !== "undefined" && window.location) {
    if (window.location.search) {
      try {
        const params = new URLSearchParams(window.location.search);
        const queryPage = params.get("page");
        if (queryPage) return queryPage;
      } catch {
      }
    }
    if (window.location.pathname) {
      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, "");
      if (rawPath) return rawPath;
      return "home";
    }
  }
  return "global";
}
function useEditable(regionId, defaultValue, type, label) {
  const cms = (0, import_react15.useContext)(CMSContext);
  const page = (0, import_react15.useContext)(PageContext);
  const registry = (0, import_react15.useContext)(EditableRegistryContext);
  const pageId = resolvePageId(page);
  const storedInitial = MessageBus.getStoredRegionValue(pageId, regionId);
  const [value, setLocalValue] = (0, import_react15.useState)(
    storedInitial !== void 0 ? storedInitial : defaultValue
  );
  (0, import_react15.useEffect)(() => {
    if (pageId === "global") {
      console.warn(`[ReactCMS SDK] Warning: Region "${regionId}" registered under fallback "global" because no page context was resolved.`);
    }
    const currentStored = MessageBus.getStoredRegionValue(pageId, regionId);
    if (currentStored !== void 0 && currentStored !== value) {
      setLocalValue(currentStored);
    }
    if (registry) {
      registry.registerRegion(pageId, regionId, type, label, defaultValue);
    }
    return () => {
      if (registry) {
        registry.unregisterRegion(pageId, regionId);
      }
    };
  }, [registry, pageId, regionId, type, label]);
  (0, import_react15.useEffect)(() => {
    const unsubscribe = MessageBus.subscribe((msg) => {
      if (msg.type === "rcms/v1/field-update") {
        const payload = msg.payload;
        if (payload.regionId === regionId) {
          setLocalValue(payload.value);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [regionId]);
  const setValue = (newValue) => {
    setLocalValue(newValue);
    MessageBus.setStoredRegionValue(pageId, regionId, newValue);
    if (cms?.websiteId) {
      MessageBus.send("rcms/v1/field-update", cms.websiteId, {
        pageId,
        regionId,
        value: newValue
      });
      if (cms.apiKey) {
        editableSync.saveDraftRegion(cms.apiKey, cms.websiteId, pageId, regionId, newValue);
      }
    }
  };
  return [value, setValue];
}

// src/hooks/useLivePreview.ts
var import_react16 = require("react");

// src/messaging/firebaseBridge.ts
function setupFirebaseBridge(apiKey, websiteId, pageId) {
  if (!apiKey || !websiteId || !pageId) return () => {
  };
  const unsubscribe = editableSync.subscribeToDraftRegions(apiKey, websiteId, pageId, (values) => {
    Object.entries(values).forEach(([regionId, val]) => {
      MessageBus.send("rcms/v1/field-update", websiteId, {
        regionId,
        value: val
      });
    });
  });
  return unsubscribe;
}

// src/hooks/useLivePreview.ts
function useLivePreview(pageIdOverride) {
  const cms = (0, import_react16.useContext)(CMSContext);
  const page = (0, import_react16.useContext)(PageContext);
  const websiteId = cms?.websiteId || "";
  const apiKey = cms?.apiKey || "";
  const pageId = pageIdOverride || page?.currentPage?.id || "global";
  const [values, setValues] = (0, import_react16.useState)({});
  (0, import_react16.useEffect)(() => {
    if (!websiteId) return;
    const unsubscribeBus = MessageBus.subscribe((msg) => {
      if (msg.websiteId !== websiteId) return;
      if (msg.type === "rcms/v1/field-update") {
        const payload = msg.payload;
        if (payload.regionId) {
          setValues((prev) => ({
            ...prev,
            [payload.regionId]: payload.value
          }));
        }
      }
    });
    const unsubscribeBridge = apiKey ? setupFirebaseBridge(apiKey, websiteId, pageId) : () => {
    };
    return () => {
      unsubscribeBus();
      unsubscribeBridge();
    };
  }, [websiteId, apiKey, pageId]);
  const updateRegion = (regionId, newValue) => {
    setValues((prev) => ({ ...prev, [regionId]: newValue }));
    if (websiteId) {
      MessageBus.send("rcms/v1/field-update", websiteId, {
        regionId,
        value: newValue
      });
    }
  };
  return {
    editMode: cms?.editMode || false,
    values,
    updateRegion
  };
}

// src/hooks/usePlugins.ts
function usePlugins() {
  return {
    plugins: [],
    invoke: async () => {
      throw new Error("Plugins are not supported in ReactCMS Platform v1. Upgrading to v2 is required.");
    }
  };
}

// src/messaging/postMessageBridge.ts
var postMessageBridge = {
  enterEditMode(cb) {
    return MessageBus.subscribe((msg) => {
      if (msg.type === "rcms/v1/enter-edit-mode") {
        cb();
      }
    });
  },
  exitEditMode(cb) {
    return MessageBus.subscribe((msg) => {
      if (msg.type === "rcms/v1/exit-edit-mode") {
        cb();
      }
    });
  },
  onFieldUpdate(cb) {
    return MessageBus.subscribe((msg) => {
      if (msg.type === "rcms/v1/field-update") {
        const payload = msg.payload;
        cb(payload.regionId, payload.fieldKey, payload.value);
      }
    });
  }
};

// src/components/EditableText.tsx
var import_react17 = require("react");

// src/utils/domStyles.ts
function rgbToHex(colorStr) {
  if (!colorStr) return null;
  if (colorStr.startsWith("#")) return colorStr;
  const match = colorStr.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  const r = parseInt(match[1], 10).toString(16).padStart(2, "0");
  const g = parseInt(match[2], 10).toString(16).padStart(2, "0");
  const b = parseInt(match[3], 10).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}
function getElementComputedStyle(el) {
  if (!el || typeof window === "undefined") return {};
  try {
    const cs = window.getComputedStyle(el);
    const colorHex = rgbToHex(cs.color) || cs.color;
    return {
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      color: colorHex,
      align: cs.textAlign
    };
  } catch {
    return {};
  }
}

// src/components/EditableText.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function EditableText({
  regionId,
  defaultValue,
  label = regionId,
  as: Component = "span",
  className = "",
  style = {}
}) {
  const cms = (0, import_react17.useContext)(CMSContext);
  const page = (0, import_react17.useContext)(PageContext);
  const [value, setValue] = useEditable(regionId, defaultValue, "text", label);
  const editMode = cms?.editMode || false;
  const pageId = page?.currentPage?.id || "global";
  const [isSelected, setIsSelected] = (0, import_react17.useState)(false);
  const [isDragging, setIsDragging] = (0, import_react17.useState)(false);
  const [dragOffset, setDragOffset] = (0, import_react17.useState)({ x: 0, y: 0 });
  const dragStartRef = (0, import_react17.useRef)(null);
  const [isResizing, setIsResizing] = (0, import_react17.useState)(false);
  const [resizeWidth, setResizeWidth] = (0, import_react17.useState)(null);
  const resizeStartRef = (0, import_react17.useRef)(null);
  const isRich = typeof value === "object" && value !== null;
  const displayValue = isRich ? value.text !== void 0 ? value.text : "" : value;
  const textStyle = {};
  if (isRich) {
    if (value.fontSize) textStyle.fontSize = value.fontSize;
    if (value.fontWeight) textStyle.fontWeight = value.fontWeight;
    if (value.color) textStyle.color = value.color;
    if (value.width) textStyle.width = value.width;
    if (value.maxWidth) textStyle.maxWidth = value.maxWidth;
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
    let resolvedAlign;
    if (vw < 768 && value.alignMobile) {
      resolvedAlign = value.alignMobile;
    } else if (vw < 1024 && value.alignTablet) {
      resolvedAlign = value.alignTablet;
    } else if (value.align) {
      resolvedAlign = value.align;
    }
    if (resolvedAlign) textStyle.textAlign = resolvedAlign;
    const offX = isDragging ? dragOffset.x : value.offsetX || 0;
    const offY = isDragging ? dragOffset.y : value.offsetY || 0;
    if (offX || offY) {
      textStyle.transform = `translate(${offX}px, ${offY}px)`;
    }
  } else if (isDragging && (dragOffset.x || dragOffset.y)) {
    textStyle.transform = `translate(${dragOffset.x}px, ${dragOffset.y}px)`;
  }
  if (resizeWidth) {
    textStyle.width = `${resizeWidth}px`;
    textStyle.maxWidth = "100%";
    textStyle.display = "inline-block";
  }
  const handleUpdateAlign = (newAlign) => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
    let alignKey = "align";
    if (vw < 768) alignKey = "alignMobile";
    else if (vw < 1024) alignKey = "alignTablet";
    const baseObj = isRich ? { ...value } : { text: displayValue };
    baseObj[alignKey] = newAlign;
    setValue(baseObj);
  };
  const handleResetPosition = () => {
    const baseObj = isRich ? { ...value } : { text: displayValue };
    delete baseObj.offsetX;
    delete baseObj.offsetY;
    delete baseObj.width;
    setDragOffset({ x: 0, y: 0 });
    setResizeWidth(null);
    setValue(baseObj);
  };
  const handleResizeMouseDown = (e) => {
    if (!editMode) return;
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    const targetEl = e.currentTarget.parentElement;
    const startWidth = targetEl ? targetEl.getBoundingClientRect().width : 300;
    resizeStartRef.current = {
      startX: e.clientX,
      startWidth
    };
    const handleMouseMove = (moveEv) => {
      if (!resizeStartRef.current) return;
      const dx = moveEv.clientX - resizeStartRef.current.startX;
      const newWidth = Math.max(120, Math.round(resizeStartRef.current.startWidth + dx));
      setResizeWidth(newWidth);
    };
    const handleMouseUp = (upEv) => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (resizeStartRef.current) {
        const dx = upEv.clientX - resizeStartRef.current.startX;
        const finalWidth = Math.max(120, Math.round(resizeStartRef.current.startWidth + dx));
        const baseObj = isRich ? { ...value } : { text: displayValue };
        baseObj.width = `${finalWidth}px`;
        setValue(baseObj);
      }
      setIsResizing(false);
      resizeStartRef.current = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseDown = (e) => {
    if (!editMode) return;
    e.stopPropagation();
    setIsSelected(true);
    if (cms?.websiteId) {
      const computedStyle = getElementComputedStyle(e.currentTarget);
      MessageBus.send("rcms/v1/region-selected", cms.websiteId, {
        regionId,
        type: "text",
        pageId,
        value,
        computedStyle
      });
      MessageBus.send("rcms/v1/open-inspector", cms.websiteId, {
        regionId,
        type: "text",
        pageId
      });
    }
    const initX = (isRich ? value.offsetX : 0) || 0;
    const initY = (isRich ? value.offsetY : 0) || 0;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX,
      initY
    };
    const handleMouseMove = (moveEv) => {
      if (!dragStartRef.current) return;
      const dx = moveEv.clientX - dragStartRef.current.startX;
      const dy = moveEv.clientY - dragStartRef.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        setIsDragging(true);
        setDragOffset({
          x: dragStartRef.current.initX + dx,
          y: dragStartRef.current.initY + dy
        });
      }
    };
    const handleMouseUp = (upEv) => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (dragStartRef.current) {
        const dx = upEv.clientX - dragStartRef.current.startX;
        const dy = upEv.clientY - dragStartRef.current.startY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          const finalX = dragStartRef.current.initX + dx;
          const finalY = dragStartRef.current.initY + dy;
          const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
          let alignKey = "align";
          if (vw < 768) alignKey = "alignMobile";
          else if (vw < 1024) alignKey = "alignTablet";
          let newAlign = (isRich ? value[alignKey] : void 0) || "left";
          if (dx < -40) newAlign = "left";
          else if (dx > 40) newAlign = "right";
          const baseObj = isRich ? { ...value } : { text: displayValue };
          baseObj[alignKey] = newAlign;
          baseObj.offsetX = finalX;
          baseObj.offsetY = finalY;
          setValue(baseObj);
        }
      }
      setIsDragging(false);
      dragStartRef.current = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  if (!editMode) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Component, { className, style: { ...style, ...textStyle }, children: displayValue });
  }
  const activeAlign = textStyle.textAlign || "left";
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    Component,
    {
      className: `rcms-editable-region rcms-editable-text ${className}`,
      style: {
        ...style,
        ...textStyle,
        outline: isSelected ? "2px solid #3b82f6" : "2px dashed #3b82f6",
        outlineOffset: "2px",
        position: "relative",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none"
      },
      onMouseDown: handleMouseDown,
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
      "data-rcms-region": regionId,
      "data-rcms-type": "text",
      children: [
        displayValue,
        isSelected && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "span",
          {
            style: {
              position: "absolute",
              top: "-42px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 99999,
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "4px 8px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.6)",
              whiteSpace: "nowrap",
              pointerEvents: "auto",
              fontFamily: "sans-serif",
              fontSize: "11px"
            },
            onMouseDown: (e) => e.stopPropagation(),
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { style: { color: "#94a3b8", fontSize: "10px", fontWeight: 700, paddingRight: "4px", borderRight: "1px solid #334155" }, children: typeof window !== "undefined" && window.innerWidth < 768 ? "\u{1F4F1} Mobile" : typeof window !== "undefined" && window.innerWidth < 1024 ? "\u{1F4BB} Tablet" : "\u{1F5A5}\uFE0F Desktop" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "button",
                {
                  type: "button",
                  title: "Align Left",
                  onClick: () => handleUpdateAlign("left"),
                  style: {
                    background: activeAlign === "left" ? "#3b82f6" : "#1e293b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    cursor: "pointer",
                    fontWeight: 600
                  },
                  children: "\u2B05\uFE0F Left"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "button",
                {
                  type: "button",
                  title: "Align Center",
                  onClick: () => handleUpdateAlign("center"),
                  style: {
                    background: activeAlign === "center" ? "#3b82f6" : "#1e293b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    cursor: "pointer",
                    fontWeight: 600
                  },
                  children: "\u2194\uFE0F Center"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "button",
                {
                  type: "button",
                  title: "Align Right",
                  onClick: () => handleUpdateAlign("right"),
                  style: {
                    background: activeAlign === "right" ? "#3b82f6" : "#1e293b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    cursor: "pointer",
                    fontWeight: 600
                  },
                  children: "\u27A1\uFE0F Right"
                }
              ),
              isRich && (value.offsetX || value.offsetY) ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "button",
                {
                  type: "button",
                  title: "Reset Position Offset",
                  onClick: handleResetPosition,
                  style: {
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    cursor: "pointer",
                    fontWeight: 700
                  },
                  children: "\u21BA Reset Pos"
                }
              ) : null,
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "button",
                {
                  type: "button",
                  title: "Close",
                  onClick: () => setIsSelected(false),
                  style: {
                    background: "transparent",
                    color: "#64748b",
                    border: "none",
                    padding: "0 4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold"
                  },
                  children: "\u2715"
                }
              )
            ]
          }
        ),
        editMode && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "span",
          {
            title: "Drag handle to resize text area width",
            style: {
              position: "absolute",
              bottom: "-6px",
              right: "-6px",
              width: "12px",
              height: "12px",
              background: isResizing ? "#2563eb" : "#3b82f6",
              border: "2px solid #ffffff",
              borderRadius: "3px",
              cursor: "se-resize",
              zIndex: 99999,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)"
            },
            onMouseDown: handleResizeMouseDown,
            onClick: (e) => {
              e.stopPropagation();
              e.preventDefault();
            }
          }
        )
      ]
    }
  );
}

// src/components/EditableImage.tsx
var import_react18 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
function EditableImage({
  regionId,
  defaultValue,
  label = regionId,
  className = "",
  style = {},
  alt
}) {
  const cms = (0, import_react18.useContext)(CMSContext);
  const page = (0, import_react18.useContext)(PageContext);
  const defaultImgObj = typeof defaultValue === "string" ? { src: defaultValue, alt: alt || "" } : defaultValue;
  const [value, setValue] = useEditable(regionId, defaultImgObj, "image", label);
  const editMode = cms?.editMode || false;
  const pageId = page?.currentPage?.id || "global";
  const [isDragging, setIsDragging] = (0, import_react18.useState)(false);
  const [dragOffset, setDragOffset] = (0, import_react18.useState)({ x: 0, y: 0 });
  const dragStartRef = (0, import_react18.useRef)(null);
  const imgSrc = typeof value === "string" ? value : value?.src || "";
  const imgAlt = typeof value === "string" ? alt || "" : value?.alt || alt || "";
  const imgStyle = { ...style };
  if (typeof value === "object" && value !== null) {
    if (value.width) imgStyle.width = value.width;
    if (value.height) imgStyle.height = value.height;
    const offX = isDragging ? dragOffset.x : value.offsetX || 0;
    const offY = isDragging ? dragOffset.y : value.offsetY || 0;
    if (offX || offY) {
      imgStyle.transform = `translate(${offX}px, ${offY}px)`;
    }
  } else if (isDragging && (dragOffset.x || dragOffset.y)) {
    imgStyle.transform = `translate(${dragOffset.x}px, ${dragOffset.y}px)`;
  }
  const handleMouseDown = (e) => {
    if (!editMode) return;
    e.stopPropagation();
    if (cms?.websiteId) {
      MessageBus.send("rcms/v1/region-selected", cms.websiteId, {
        regionId,
        type: "image",
        pageId,
        value
      });
      MessageBus.send("rcms/v1/open-inspector", cms.websiteId, {
        regionId,
        type: "image",
        pageId
      });
    }
    const isObj = typeof value === "object" && value !== null;
    const initX = (isObj ? value.offsetX : 0) || 0;
    const initY = (isObj ? value.offsetY : 0) || 0;
    dragStartRef.current = { startX: e.clientX, startY: e.clientY, initX, initY };
    const handleMouseMove = (moveEv) => {
      if (!dragStartRef.current) return;
      const dx = moveEv.clientX - dragStartRef.current.startX;
      const dy = moveEv.clientY - dragStartRef.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        setIsDragging(true);
        setDragOffset({ x: dragStartRef.current.initX + dx, y: dragStartRef.current.initY + dy });
      }
    };
    const handleMouseUp = (upEv) => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (dragStartRef.current) {
        const dx = upEv.clientX - dragStartRef.current.startX;
        const dy = upEv.clientY - dragStartRef.current.startY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          const finalX = dragStartRef.current.initX + dx;
          const finalY = dragStartRef.current.initY + dy;
          const baseObj = typeof value === "object" ? { ...value } : { src: imgSrc, alt: imgAlt };
          baseObj.offsetX = finalX;
          baseObj.offsetY = finalY;
          setValue(baseObj);
        }
      }
      setIsDragging(false);
      dragStartRef.current = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  if (!editMode) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("img", { src: imgSrc, alt: imgAlt, className, style: imgStyle });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "img",
    {
      src: imgSrc,
      alt: imgAlt,
      className: `rcms-editable-region rcms-editable-image ${className}`,
      style: {
        ...imgStyle,
        outline: "2px dashed #3b82f6",
        outlineOffset: "2px",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none"
      },
      onMouseDown: handleMouseDown,
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
      "data-rcms-region": regionId,
      "data-rcms-type": "image"
    }
  );
}

// src/components/EditableButton.tsx
var import_react19 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
function EditableButton({
  regionId,
  defaultValue,
  label = regionId,
  className = "",
  style = {},
  onClick,
  as: Component = "button"
}) {
  const cms = (0, import_react19.useContext)(CMSContext);
  const page = (0, import_react19.useContext)(PageContext);
  const defaultBtnObj = typeof defaultValue === "string" ? { text: defaultValue } : defaultValue;
  const [value] = useEditable(regionId, defaultBtnObj, "button", label);
  const editMode = cms?.editMode || false;
  const pageId = page?.currentPage?.id || "global";
  const btnText = typeof value === "string" ? value : value?.text || "";
  const btnHref = typeof value === "object" ? value?.href : void 0;
  const handleClick = (e) => {
    if (editMode && cms?.websiteId) {
      e.preventDefault();
      e.stopPropagation();
      MessageBus.send("rcms/v1/region-selected", cms.websiteId, {
        regionId,
        type: "button",
        pageId,
        value
      });
      MessageBus.send("rcms/v1/open-inspector", cms.websiteId, {
        regionId,
        type: "button",
        pageId
      });
    } else if (onClick) {
      onClick(e);
    }
  };
  const Tag = btnHref && !editMode ? "a" : Component;
  const tagProps = Tag === "a" ? { href: btnHref } : {};
  if (!editMode) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Tag, { ...tagProps, className, style, onClick, children: btnText });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    Tag,
    {
      ...tagProps,
      className: `rcms-editable-region rcms-editable-button ${className}`,
      style: {
        ...style,
        outline: "2px dashed #3b82f6",
        outlineOffset: "2px",
        cursor: "pointer"
      },
      onClick: handleClick,
      "data-rcms-region": regionId,
      "data-rcms-type": "button",
      children: btnText
    }
  );
}

// src/components/EditableSection.tsx
var import_react20 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
function EditableSection({
  regionId,
  defaultValue = {},
  label = regionId,
  className = "",
  style = {},
  children,
  as: Component = "section"
}) {
  const cms = (0, import_react20.useContext)(CMSContext);
  const page = (0, import_react20.useContext)(PageContext);
  const [value] = useEditable(regionId, defaultValue, "section", label);
  const editMode = cms?.editMode || false;
  const pageId = page?.currentPage?.id || "global";
  const handleClick = (e) => {
    if (editMode && cms?.websiteId) {
      const target = e.target;
      if (target && target.closest(".rcms-editable-region") !== e.currentTarget) {
        return;
      }
      e.stopPropagation();
      MessageBus.send("rcms/v1/region-selected", cms.websiteId, {
        regionId,
        type: "section",
        pageId,
        value
      });
      MessageBus.send("rcms/v1/open-inspector", cms.websiteId, {
        regionId,
        type: "section",
        pageId
      });
    }
  };
  if (!editMode) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Component, { className, style, children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    Component,
    {
      className: `rcms-editable-region rcms-editable-section ${className}`,
      style: {
        ...style,
        outline: "2px dashed #3b82f6",
        outlineOffset: "4px",
        position: "relative",
        cursor: "pointer"
      },
      onClick: handleClick,
      "data-rcms-region": regionId,
      "data-rcms-type": "section",
      children
    }
  );
}

// src/components/EditableRichText.tsx
var import_react21 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
function EditableRichText({
  regionId,
  defaultValue,
  label = regionId,
  className = "",
  style = {},
  as: Component = "div"
}) {
  const cms = (0, import_react21.useContext)(CMSContext);
  const page = (0, import_react21.useContext)(PageContext);
  const [value] = useEditable(regionId, defaultValue, "richtext", label);
  const editMode = cms?.editMode || false;
  const pageId = page?.currentPage?.id || "global";
  const handleClick = (e) => {
    if (editMode && cms?.websiteId) {
      e.stopPropagation();
      MessageBus.send("rcms/v1/region-selected", cms.websiteId, {
        regionId,
        type: "richtext",
        pageId,
        value
      });
      MessageBus.send("rcms/v1/open-inspector", cms.websiteId, {
        regionId,
        type: "richtext",
        pageId
      });
    }
  };
  if (!editMode) {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      Component,
      {
        className,
        style,
        dangerouslySetInnerHTML: { __html: value }
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    Component,
    {
      className: `rcms-editable-region rcms-editable-richtext ${className}`,
      style: {
        ...style,
        outline: "2px dashed #3b82f6",
        outlineOffset: "2px",
        position: "relative",
        cursor: "pointer"
      },
      onClick: handleClick,
      dangerouslySetInnerHTML: { __html: value },
      "data-rcms-region": regionId,
      "data-rcms-type": "richtext"
    }
  );
}

// src/components/EditableRepeater.tsx
var import_react22 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
function EditableRepeater({
  regionId,
  defaultValue,
  label = regionId,
  className = "",
  style = {},
  children
}) {
  const cms = (0, import_react22.useContext)(CMSContext);
  const page = (0, import_react22.useContext)(PageContext);
  const [value] = useEditable(regionId, defaultValue, "repeater", label);
  const editMode = cms?.editMode || false;
  const pageId = page?.currentPage?.id || "global";
  const items = Array.isArray(value) ? value : defaultValue;
  const handleClick = (e) => {
    if (editMode && cms?.websiteId) {
      e.stopPropagation();
      MessageBus.send("rcms/v1/region-selected", cms.websiteId, {
        regionId,
        type: "repeater",
        pageId,
        value: items
      });
      MessageBus.send("rcms/v1/open-inspector", cms.websiteId, {
        regionId,
        type: "repeater",
        pageId
      });
    }
  };
  if (!editMode) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className, style, children: children(items) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "div",
    {
      className: `rcms-editable-region rcms-editable-repeater ${className}`,
      style: {
        ...style,
        outline: "2px dashed #3b82f6",
        outlineOffset: "4px",
        position: "relative",
        cursor: "pointer"
      },
      onClick: handleClick,
      "data-rcms-region": regionId,
      "data-rcms-type": "repeater",
      children: children(items)
    }
  );
}

// src/components/EditableVideo.tsx
var import_react23 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
function EditableVideo({
  regionId,
  defaultValue,
  label = regionId,
  className = "",
  style = {}
}) {
  const cms = (0, import_react23.useContext)(CMSContext);
  const page = (0, import_react23.useContext)(PageContext);
  const defaultVidObj = typeof defaultValue === "string" ? { url: defaultValue } : defaultValue;
  const [value] = useEditable(regionId, defaultVidObj, "video", label);
  const editMode = cms?.editMode || false;
  const pageId = page?.currentPage?.id || "global";
  const videoUrl = typeof value === "string" ? value : value?.url || "";
  const handleClick = (e) => {
    if (editMode && cms?.websiteId) {
      e.stopPropagation();
      MessageBus.send("rcms/v1/region-selected", cms.websiteId, {
        regionId,
        type: "video",
        pageId,
        value
      });
      MessageBus.send("rcms/v1/open-inspector", cms.websiteId, {
        regionId,
        type: "video",
        pageId
      });
    }
  };
  const isEmbed = videoUrl.includes("youtube") || videoUrl.includes("vimeo");
  if (!editMode) {
    if (isEmbed) {
      return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("iframe", { src: videoUrl, title: label, className, style, allowFullScreen: true });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("video", { src: videoUrl, controls: true, className, style });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      className: `rcms-editable-region rcms-editable-video ${className}`,
      style: {
        ...style,
        outline: "2px dashed #3b82f6",
        outlineOffset: "2px",
        position: "relative",
        cursor: "pointer"
      },
      onClick: handleClick,
      "data-rcms-region": regionId,
      "data-rcms-type": "video",
      children: isEmbed ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("iframe", { src: videoUrl, title: label, className, style: { ...style, pointerEvents: "none" } }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("video", { src: videoUrl, className, style: { ...style, pointerEvents: "none" } })
    }
  );
}
//# sourceMappingURL=index.js.map