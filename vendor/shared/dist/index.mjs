// src/constants/eventTypes.ts
var EVENT_TYPES = {
  "enter-edit-mode": "rcms/v1/enter-edit-mode",
  "exit-edit-mode": "rcms/v1/exit-edit-mode",
  "field-update": "rcms/v1/field-update",
  "region-selected": "rcms/v1/region-selected",
  "open-inspector": "rcms/v1/open-inspector",
  "theme-update": "rcms/v1/theme-update",
  "navigation-update": "rcms/v1/navigation-update",
  "publish-page": "rcms/v1/publish-page",
  "heartbeat": "rcms/v1/heartbeat",
  "runtime-ready": "rcms/v1/runtime-ready",
  "regions-registered": "rcms/v1/regions-registered"
};

// src/constants/firebasePaths.ts
var FIREBASE_ROOTS = {
  registry: "registry",
  content: "content",
  pages: "pages",
  websites: "websites"
};

// src/constants/versions.ts
var CURRENT_SDK_VERSION = "1.0.0";
var CURRENT_RUNTIME_VERSION = "1.0.0";
var CURRENT_DASHBOARD_VERSION = "1.0.0";

// src/firebase/pathBuilders.ts
var paths = {
  // Registry (metadata)
  registry: (id) => `registry/${id}`,
  registryRuntime: (id) => `registry/${id}/runtime`,
  registryRoutes: (id) => `registry/${id}/routes`,
  registryLayouts: (id) => `registry/${id}/layouts`,
  registryNav: (id) => `registry/${id}/navigation`,
  registryTheme: (id) => `registry/${id}/theme`,
  registryModels: (id) => `registry/${id}/contentModels`,
  registryComponents: (id) => `registry/${id}/components`,
  registryRegions: (id, pageId) => `registry/${id}/editableRegions/${pageId}`,
  registryPlugins: (id) => `registry/${id}/plugins`,
  // Content (data — existing + extended)
  contentTheme: (id) => `content/${id}/theme`,
  contentSEO: (id) => `content/${id}/seo`,
  contentDraft: (id, pageId) => `content/${id}/sync/draft/pages/${pageId}`,
  contentPublished: (id, pageId) => `content/${id}/sync/published/pages/${pageId}`,
  contentEntry: (id, model, entryId) => `content/${id}/entries/${model}/${entryId}`,
  contentPlugin: (id, pluginId) => `content/${id}/plugins/${pluginId}`,
  // Pages (existing)
  pages: (id) => `pages/${id}`,
  page: (id, pageId) => `pages/${id}/${pageId}`
};

// src/validators/routeValidator.ts
function validateRoute(route) {
  if (!route || typeof route !== "object") return false;
  const r = route;
  return typeof r.id === "string" && typeof r.path === "string" && typeof r.title === "string" && (r.source === "registered" || r.source === "cms-generated") && typeof r.published === "boolean";
}

// src/validators/themeValidator.ts
function validateTheme(theme) {
  if (!theme || typeof theme !== "object") return false;
  const t = theme;
  return t.branding !== void 0 && t.colors !== void 0 && t.typography !== void 0 && t.spacing !== void 0 && t.borderRadius !== void 0 && t.containerWidth !== void 0 && t.breakpoints !== void 0 && t.buttons !== void 0 && t.darkMode !== void 0;
}

// src/validators/contentModelValidator.ts
function validateContentModel(model) {
  if (!model || typeof model !== "object") return false;
  const m = model;
  return typeof m.id === "string" && typeof m.label === "string" && Array.isArray(m.fields) && (m.slugRule === "title" || m.slugRule === "date-title" || m.slugRule === "id" || m.slugRule === "custom");
}

// src/validators/registryValidator.ts
function validateRegistry(registry) {
  if (!registry || typeof registry !== "object") return false;
  const r = registry;
  return r.meta !== void 0 && r.runtime !== void 0 && r.routes !== void 0 && r.layouts !== void 0 && r.navigation !== void 0 && r.theme !== void 0 && r.contentModels !== void 0;
}

// src/utils/keyUtils.ts
function encodeFirebaseKey(key) {
  if (!key || typeof key !== "string") return key;
  return key.replace(/~/g, "~7E").replace(/\./g, "~2E").replace(/#/g, "~23").replace(/\$/g, "~24").replace(/\//g, "~2F").replace(/\[/g, "~5B").replace(/\]/g, "~5D");
}
function decodeFirebaseKey(key) {
  if (!key || typeof key !== "string") return key;
  return key.replace(/~5D/g, "]").replace(/~5B/g, "[").replace(/~2F/g, "/").replace(/~24/g, "$").replace(/~23/g, "#").replace(/~2E/g, ".").replace(/~7E/g, "~");
}
function encodeFirebaseObject(obj) {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return obj;
  }
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    const encodedKey = encodeFirebaseKey(key);
    result[encodedKey] = val && typeof val === "object" && !Array.isArray(val) ? encodeFirebaseObject(val) : val;
  }
  return result;
}
function decodeFirebaseObject(obj) {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return obj;
  }
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    const decodedKey = decodeFirebaseKey(key);
    result[decodedKey] = val && typeof val === "object" && !Array.isArray(val) ? decodeFirebaseObject(val) : val;
  }
  return result;
}
export {
  CURRENT_DASHBOARD_VERSION,
  CURRENT_RUNTIME_VERSION,
  CURRENT_SDK_VERSION,
  EVENT_TYPES,
  FIREBASE_ROOTS,
  decodeFirebaseKey,
  decodeFirebaseObject,
  encodeFirebaseKey,
  encodeFirebaseObject,
  paths,
  validateContentModel,
  validateRegistry,
  validateRoute,
  validateTheme
};
//# sourceMappingURL=index.mjs.map