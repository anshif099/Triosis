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
  BuilderSections: () => BuilderSections,
  CMSLayout: () => CMSLayout,
  CMSNavigation: () => CMSNavigation,
  RouteRegistry: () => RouteRegistry,
  RuntimeProvider: () => RuntimeProvider
});
module.exports = __toCommonJS(index_exports);

// src/RuntimeProvider.tsx
var import_react3 = require("react");
var import_reactcms_sdk11 = require("@anshif.rainhopes/reactcms-sdk");

// src/RuntimeContext.tsx
var import_react = require("react");
var RuntimeContext = (0, import_react.createContext)(null);

// src/BuilderSections.tsx
var import_react2 = require("react");
var import_react_dom = require("react-dom");
var import_database = require("firebase/database");
var import_reactcms_renderer = require("@anshif.rainhopes/reactcms-renderer");
var import_shared = require("@anshif.rainhopes/shared");
var import_reactcms_sdk = require("@anshif.rainhopes/reactcms-sdk");
var import_jsx_runtime = require("react/jsx-runtime");
var BUILDER_BLOCKS_REGION = "__rcms_builder_blocks__";
var NATIVE_PAGE_TREE_FIELD = "tree";
function resolvePageId() {
  if (typeof window === "undefined") return "home";
  try {
    const queryPage = new URLSearchParams(window.location.search).get("page");
    if (queryPage) return queryPage;
  } catch {
  }
  return window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";
}
function resolveLocale() {
  if (typeof window === "undefined") return "en";
  try {
    return new URLSearchParams(window.location.search).get("rcms_locale") || document.documentElement.lang || "en";
  } catch {
    return "en";
  }
}
function decodePublishedTree(raw, pageId, locale) {
  if (!raw || typeof raw !== "object") return null;
  const decoded = (0, import_shared.decodeFirebaseObject)(raw);
  if ((0, import_reactcms_renderer.isPageComponentTree)(decoded[NATIVE_PAGE_TREE_FIELD])) {
    return decoded[NATIVE_PAGE_TREE_FIELD];
  }
  const regions = decoded.regions && typeof decoded.regions === "object" ? decoded.regions : {};
  const blocks = Array.isArray(regions[BUILDER_BLOCKS_REGION]) ? regions[BUILDER_BLOCKS_REGION] : [];
  return blocks.length ? (0, import_reactcms_renderer.blocksToPageTree)(blocks, {
    id: pageId,
    title: decoded.title,
    locale
  }) : null;
}
function decodeRuntimeAdditions(raw) {
  if (!raw || typeof raw !== "object") return null;
  const decoded = (0, import_shared.decodeFirebaseObject)(raw);
  const regions = decoded.regions && typeof decoded.regions === "object" ? decoded.regions : {};
  return (0, import_reactcms_renderer.isPageComponentTree)(regions[import_reactcms_renderer.RUNTIME_ADDITIONS_REGION]) ? regions[import_reactcms_renderer.RUNTIME_ADDITIONS_REGION] : null;
}
function decodeRuntimeAdditionsForMode(publishedRaw, draftRaw, editMode) {
  return decodeRuntimeAdditions(editMode ? draftRaw : publishedRaw);
}
function findNode(nodes, nodeId) {
  for (const node of nodes) {
    if (node.id === nodeId) return node;
    const child = findNode(node.children || [], nodeId);
    if (child) return child;
  }
  return null;
}
function setAtPath(source, path, value) {
  if (!path.length) return value;
  const [head, ...tail] = path;
  const next = Array.isArray(source) ? [...source] : { ...source || {} };
  next[head] = setAtPath(next[head], tail, value);
  return next;
}
function updateNode(nodes, nodeId, path, value) {
  return nodes.map((node) => {
    if (node.id === nodeId) return setAtPath(node, path, value);
    if (!node.children?.length) return node;
    return { ...node, children: updateNode(node.children, nodeId, path, value) };
  });
}
function removeNode(nodes, nodeId) {
  return nodes.filter((node) => node.id !== nodeId).map((node) => node.children?.length ? { ...node, children: removeNode(node.children, nodeId) } : node);
}
function insertNode(nodes, targetId, position, addition) {
  const targetIndex = nodes.findIndex((node) => node.id === targetId);
  if (targetIndex >= 0) {
    if (position === "inside") {
      return nodes.map((node, index) => index === targetIndex ? { ...node, children: [...node.children || [], addition] } : node);
    }
    const next = [...nodes];
    next.splice(position === "before" ? targetIndex : targetIndex + 1, 0, addition);
    return next;
  }
  return nodes.map((node) => {
    if (!node.children?.length) return node;
    const children = insertNode(node.children, targetId, position, addition);
    return children === node.children ? node : { ...node, children };
  });
}
function reorderNode(nodes, nodeId, direction) {
  const index = nodes.findIndex((node) => node.id === nodeId);
  if (index >= 0) {
    const destination = index + direction;
    if (destination < 0 || destination >= nodes.length) return nodes;
    const next = [...nodes];
    [next[index], next[destination]] = [next[destination], next[index]];
    return next;
  }
  return nodes.map((node) => {
    if (!node.children?.length) return node;
    const children = reorderNode(node.children, nodeId, direction);
    return children === node.children ? node : { ...node, children };
  });
}
function refreshNodeIds(node, suffix) {
  return {
    ...node,
    id: `${node.id}_${suffix}`,
    children: node.children?.map((child, index) => refreshNodeIds(child, `${suffix}_${index}`))
  };
}
function normalizedRuntimePlacement(value) {
  if (!value || typeof value !== "object") return { position: "footer" };
  const candidate = value;
  const anchorRegionId = String(candidate.anchorRegionId || "").trim();
  const position = ["before", "inside", "after"].includes(String(candidate.position)) ? candidate.position : "footer";
  return anchorRegionId && position !== "footer" ? { anchorRegionId, position } : { position: "footer" };
}
function placementKey(placement) {
  return placement.anchorRegionId ? `${placement.position}:${placement.anchorRegionId}` : "footer";
}
function makeRuntimeNode(type, locale, placement = { position: "footer" }) {
  const safeType = type || "section";
  const id = `${safeType.replace(/[^a-zA-Z0-9_-]/g, "_")}_${Date.now().toString(36)}`;
  const field = ["input", "textarea-field", "select-field", "checkbox"].includes(safeType);
  return {
    id,
    type: safeType,
    label: safeType.split("-").map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(" "),
    props: {
      locales: {
        [locale]: field ? { label: "New field", placeholder: "Enter a value" } : { title: "New section", text: "Double-click this text to edit it." }
      },
      design: {}
    },
    children: [],
    ...placement.anchorRegionId ? { metadata: { runtimePlacement: placement } } : {}
  };
}
function RuntimeAdditionsPortal({
  websiteId,
  pageId,
  locale,
  tree,
  nodes,
  placement,
  hostKey,
  theme,
  editMode,
  onTreeChange
}) {
  const [host, setHost] = (0, import_react2.useState)(null);
  const [selectedIds, setSelectedIds] = (0, import_react2.useState)([]);
  const [hoveredId, setHoveredId] = (0, import_react2.useState)(null);
  const clipboard = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (typeof document === "undefined") return void 0;
    let portalHost = Array.from(document.querySelectorAll("[data-rcms-runtime-additions-host]")).find((candidate) => candidate.dataset.rcmsRuntimeAdditionsHost === hostKey) || null;
    let created = false;
    const attach = () => {
      if (!portalHost) {
        portalHost = document.createElement("div");
        portalHost.dataset.rcmsRuntimeAdditionsHost = hostKey;
        created = true;
      }
      const anchor = placement.anchorRegionId ? Array.from(document.querySelectorAll("[data-rcms-region]")).find((candidate) => candidate.dataset.rcmsRegion === placement.anchorRegionId) : null;
      if (anchor) {
        if (placement.position === "inside") {
          if (portalHost.parentElement !== anchor) anchor.appendChild(portalHost);
          setHost(portalHost);
          return;
        }
        const parent2 = anchor.parentElement;
        if (parent2 && placement.position === "before") {
          if (portalHost.parentElement !== parent2 || portalHost.nextSibling !== anchor) {
            parent2.insertBefore(portalHost, anchor);
          }
          setHost(portalHost);
          return;
        }
        if (parent2 && placement.position === "after") {
          if (portalHost.parentElement !== parent2 || anchor.nextSibling !== portalHost) {
            parent2.insertBefore(portalHost, anchor.nextSibling);
          }
          setHost(portalHost);
          return;
        }
      }
      const footer = document.querySelector(
        'footer, [data-rcms-type="footer"], .footer-section'
      );
      const parent = footer?.parentElement || document.querySelector("#root") || document.body;
      attachRuntimeHostFallback(portalHost, parent, footer);
      setHost(portalHost);
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (created) portalHost?.remove();
    };
  }, [hostKey, placement.anchorRegionId, placement.position]);
  const commit = (0, import_react2.useCallback)((next) => {
    onTreeChange(next);
    import_reactcms_sdk.MessageBus.send("rcms/v1/field-update", websiteId, {
      pageId,
      regionId: import_reactcms_renderer.RUNTIME_ADDITIONS_REGION,
      value: next
    });
  }, [onTreeChange, pageId, websiteId]);
  const addNode = (0, import_react2.useCallback)((componentType = "section", targetId = "", position = "after") => {
    const addition = makeRuntimeNode(componentType, locale, placement);
    const children = targetId ? insertNode(tree.children, targetId, position, addition) : [...tree.children, addition];
    commit({ ...tree, children });
    setSelectedIds([addition.id]);
  }, [commit, locale, placement, tree]);
  const handleMutation = (0, import_react2.useCallback)((mutation) => {
    commit({
      ...tree,
      children: updateNode(tree.children, mutation.nodeId, mutation.path, mutation.value)
    });
  }, [commit, tree]);
  const handleSelect = (0, import_react2.useCallback)((nodeId, additive = false) => {
    const node = findNode(tree.children, nodeId);
    if (!node) return;
    setSelectedIds((current) => additive ? current.includes(nodeId) ? current.filter((id) => id !== nodeId) : [...current, nodeId] : [nodeId]);
    import_reactcms_sdk.MessageBus.send("rcms/v1/region-selected", websiteId, {
      regionId: import_reactcms_renderer.RUNTIME_ADDITIONS_REGION,
      type: "runtime-component",
      pageId,
      value: tree,
      componentId: nodeId,
      componentType: node.type,
      label: node.label || node.type,
      additive
    });
    import_reactcms_sdk.MessageBus.send("rcms/v1/open-inspector", websiteId, {
      regionId: import_reactcms_renderer.RUNTIME_ADDITIONS_REGION,
      type: "runtime-component",
      pageId,
      componentId: nodeId
    });
  }, [pageId, tree, websiteId]);
  const handleCommand = (0, import_react2.useCallback)((command, nodeId) => {
    const node = findNode(tree.children, nodeId);
    if (!node) return;
    if (command === "copy") {
      clipboard.current = structuredClone(node);
      return;
    }
    if (command === "paste" && clipboard.current) {
      const addition = refreshNodeIds(structuredClone(clipboard.current), `copy_${Date.now().toString(36)}`);
      commit({ ...tree, children: insertNode(tree.children, nodeId, "after", addition) });
      setSelectedIds([addition.id]);
      return;
    }
    if (command === "delete") {
      commit({ ...tree, children: removeNode(tree.children, nodeId) });
      setSelectedIds((current) => current.filter((id) => id !== nodeId));
      return;
    }
    if (command === "duplicate") {
      const addition = refreshNodeIds(structuredClone(node), `copy_${Date.now().toString(36)}`);
      commit({ ...tree, children: insertNode(tree.children, nodeId, "after", addition) });
      setSelectedIds([addition.id]);
      return;
    }
    if (command === "move-up" || command === "move-down") {
      commit({
        ...tree,
        children: reorderNode(tree.children, nodeId, command === "move-up" ? -1 : 1)
      });
    }
  }, [commit, tree]);
  const handleMove = (0, import_react2.useCallback)((nodeId, targetId, position) => {
    const node = findNode(tree.children, nodeId);
    if (!node || findNode(node.children || [], targetId)) return;
    const without = removeNode(tree.children, nodeId);
    commit({ ...tree, children: insertNode(without, targetId, position, node) });
  }, [commit, tree]);
  if (!host) return null;
  return (0, import_react_dom.createPortal)(
    nodes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_reactcms_renderer.RuntimeRenderer,
      {
        tree: { ...tree, children: nodes },
        locale,
        responsiveMode: "desktop",
        mode: editMode ? "edit" : "runtime",
        theme,
        selectedIds,
        hoveredId,
        onSelect: handleSelect,
        onHover: setHoveredId,
        onMutation: handleMutation,
        onMove: handleMove,
        onInsert: addNode,
        onCommand: handleCommand
      }
    ) : editMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        "data-rcms-empty-additions": "true",
        style: {
          margin: "20px auto",
          maxWidth: "1120px",
          padding: "16px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          border: "1px dashed #60a5fa",
          borderRadius: "12px",
          background: "rgba(37, 99, 235, .06)",
          color: "#1d4ed8",
          font: "600 12px Inter, system-ui, sans-serif"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CMS insertion area above the footer" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => addNode("section"), children: "+ Section" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => addNode("input"), children: "+ Input field" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => addNode("textarea-field"), children: "+ Message field" })
        ]
      }
    ) : null,
    host
  );
}
function attachRuntimeHostFallback(portalHost, parent, footer) {
  if (portalHost.parentElement === parent) return false;
  if (footer?.parentElement === parent) {
    parent.insertBefore(portalHost, footer);
  } else {
    parent.appendChild(portalHost);
  }
  return true;
}
function BuilderSections({
  websiteId,
  apiKey,
  pageId: pageIdOverride,
  fallback = null,
  layout: Layout = null,
  preserveApplicationPage = false
}) {
  const pageId = (0, import_react2.useMemo)(
    () => pageIdOverride?.replace(/^\/+|\/+$/g, "") || resolvePageId(),
    [pageIdOverride]
  );
  const locale = (0, import_react2.useMemo)(resolveLocale, []);
  const cms = (0, import_react2.useContext)(import_reactcms_sdk.CMSContext);
  const editMode = Boolean(cms?.editMode);
  const [tree, setTree] = (0, import_react2.useState)(null);
  const [runtimeAdditions, setRuntimeAdditions] = (0, import_react2.useState)(null);
  const [theme, setTheme] = (0, import_react2.useState)(null);
  const [resolved, setResolved] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    const database = (0, import_reactcms_sdk.getFirebaseDatabase)(apiKey);
    const publishedRef = (0, import_database.ref)(database, import_shared.paths.contentPublished(websiteId, pageId));
    const draftRef = editMode ? (0, import_database.ref)(database, import_shared.paths.contentDraft(websiteId, pageId)) : null;
    const themeRef = (0, import_database.ref)(database, import_shared.paths.contentTheme(websiteId));
    const unsubscribePage = (0, import_database.onValue)(
      publishedRef,
      (snapshot) => {
        const value = snapshot.exists() ? snapshot.val() : null;
        setTree(value ? decodePublishedTree(value, pageId, locale) : null);
        if (!editMode) {
          setRuntimeAdditions(decodeRuntimeAdditionsForMode(value, null, false));
        }
        setResolved(true);
      },
      (error) => {
        console.error("[ReactCMS Runtime] Native page subscription failed:", error);
        setResolved(true);
      }
    );
    const unsubscribeDraft = draftRef ? (0, import_database.onValue)(
      draftRef,
      (snapshot) => {
        const value = snapshot.exists() ? snapshot.val() : null;
        setRuntimeAdditions(decodeRuntimeAdditionsForMode(null, value, true));
      },
      (error) => {
        console.error("[ReactCMS Runtime] Draft additions subscription failed:", error);
      }
    ) : () => {
    };
    const unsubscribeTheme = (0, import_database.onValue)(themeRef, (snapshot) => {
      setTheme(snapshot.exists() ? (0, import_shared.decodeFirebaseObject)(snapshot.val()) : null);
    });
    return () => {
      unsubscribePage();
      unsubscribeDraft();
      unsubscribeTheme();
    };
  }, [apiKey, editMode, locale, pageId, websiteId]);
  (0, import_react2.useEffect)(() => import_reactcms_sdk.MessageBus.subscribe((message) => {
    if (message.type !== "rcms/v1/field-update") return;
    const payload = message.payload;
    if (payload?.regionId === import_reactcms_renderer.RUNTIME_ADDITIONS_REGION && (!payload.pageId || payload.pageId === pageId) && (0, import_reactcms_renderer.isPageComponentTree)(payload.value)) {
      setRuntimeAdditions(payload.value);
    }
  }), [pageId]);
  const additionsTree = runtimeAdditions || (0, import_reactcms_renderer.createRuntimeAdditionsTree)(pageId, locale);
  const additionGroups = (0, import_react2.useMemo)(() => {
    const groups = /* @__PURE__ */ new Map();
    additionsTree.children.forEach((node) => {
      const placement = normalizedRuntimePlacement(node.metadata?.runtimePlacement);
      const key = placementKey(placement);
      const group = groups.get(key) || { key, placement, nodes: [] };
      group.nodes.push(node);
      groups.set(key, group);
    });
    if (!groups.size && cms?.editMode) {
      groups.set("footer", {
        key: "footer",
        placement: { position: "footer" },
        nodes: []
      });
    }
    return Array.from(groups.values());
  }, [additionsTree, cms?.editMode]);
  const additions = additionGroups.length ? additionGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    RuntimeAdditionsPortal,
    {
      websiteId,
      pageId,
      locale,
      tree: additionsTree,
      nodes: group.nodes,
      placement: group.placement,
      hostKey: group.key,
      theme,
      editMode: Boolean(cms?.editMode),
      onTreeChange: setRuntimeAdditions
    },
    group.key
  )) : null;
  if (preserveApplicationPage) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    fallback,
    additions
  ] });
  if (!resolved || !tree) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    fallback,
    additions
  ] });
  const page = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_reactcms_renderer.RuntimeRenderer,
      {
        tree,
        locale,
        responsiveMode: "desktop",
        mode: cms?.editMode ? "edit" : "runtime",
        theme
      }
    ),
    additions
  ] });
  return Layout ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: page }) : page;
}

// src/heartbeat/heartbeatService.ts
var import_database2 = require("firebase/database");
var import_reactcms_sdk2 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared2 = require("@anshif.rainhopes/shared");
var HeartbeatService = class {
  static start(websiteId, apiKey) {
    this.stop();
    const ping = async () => {
      try {
        const db = (0, import_reactcms_sdk2.getFirebaseDatabase)(apiKey);
        const runtimeRef = (0, import_database2.ref)(db, import_shared2.paths.registryRuntime(websiteId));
        await (0, import_database2.update)(runtimeRef, {
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

// src/registration/registerEditableRegions.ts
var import_database3 = require("firebase/database");
var import_reactcms_sdk3 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared3 = require("@anshif.rainhopes/shared");
async function registerEditableRegions(websiteId, apiKey, pageId, regions) {
  try {
    const db = (0, import_reactcms_sdk3.getFirebaseDatabase)(apiKey);
    const regionsRef = (0, import_database3.ref)(db, import_shared3.paths.registryRegions(websiteId, pageId));
    const cleanRegions = {};
    Object.entries(regions || {}).forEach(([regionId, reg]) => {
      if (reg && reg.id && reg.type) {
        const encodedKey = (0, import_shared3.encodeFirebaseKey)(regionId);
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
    await (0, import_database3.set)(regionsRef, cleanRegions);
  } catch (error) {
    console.error(`[ReactCMS Runtime] Failed to register editable regions for page ${pageId}:`, error);
  }
}

// src/registration/registerLayouts.ts
var import_database4 = require("firebase/database");
var import_reactcms_sdk4 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared4 = require("@anshif.rainhopes/shared");
async function registerLayouts(websiteId, apiKey, layouts) {
  try {
    const db = (0, import_reactcms_sdk4.getFirebaseDatabase)(apiKey);
    const layoutsRef = (0, import_database4.ref)(db, import_shared4.paths.registryLayouts(websiteId));
    const updates = {};
    Object.entries(layouts).forEach(([id, layout]) => {
      updates[id] = JSON.parse(JSON.stringify(layout));
    });
    if (Object.keys(updates).length > 0) {
      await (0, import_database4.update)(layoutsRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register layouts:", error);
  }
}

// src/registration/registerNavigation.ts
var import_database5 = require("firebase/database");
var import_reactcms_sdk5 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared5 = require("@anshif.rainhopes/shared");
async function registerNavigation(websiteId, apiKey, navigations) {
  try {
    const db = (0, import_reactcms_sdk5.getFirebaseDatabase)(apiKey);
    const navRef = (0, import_database5.ref)(db, import_shared5.paths.registryNav(websiteId));
    const updates = {};
    Object.entries(navigations).forEach(([id, nav]) => {
      updates[id] = JSON.parse(JSON.stringify(nav));
    });
    if (Object.keys(updates).length > 0) {
      await (0, import_database5.update)(navRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register navigation menus:", error);
  }
}

// src/registration/registerPageTrees.ts
var import_database6 = require("firebase/database");
var import_reactcms_sdk6 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared6 = require("@anshif.rainhopes/shared");
function normalizePageKey(value) {
  return value.split("?")[0].replace(/^\/+|\/+$/g, "") || "home";
}
async function registerPageTrees(websiteId, apiKey, pageTrees) {
  const database = (0, import_reactcms_sdk6.getFirebaseDatabase)(apiKey);
  await Promise.all(Object.entries(pageTrees).map(([pageKey, tree]) => (0, import_database6.set)((0, import_database6.ref)(database, import_shared6.paths.registryPageTree(websiteId, normalizePageKey(pageKey))), tree)));
}

// src/registration/registerRoutes.ts
var import_database7 = require("firebase/database");
var import_reactcms_sdk7 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared7 = require("@anshif.rainhopes/shared");

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
    const db = (0, import_reactcms_sdk7.getFirebaseDatabase)(apiKey);
    const discovered = discoverRoutes(routesConfig);
    const routesRef = (0, import_database7.ref)(db, import_shared7.paths.registryRoutes(websiteId));
    const updates = {};
    discovered.forEach((route) => {
      const cleanRoute = JSON.parse(JSON.stringify(route));
      updates[route.id] = cleanRoute;
    });
    if (Object.keys(updates).length > 0) {
      await (0, import_database7.update)(routesRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register website routes:", error);
  }
}

// src/registration/registerTheme.ts
var import_database8 = require("firebase/database");
var import_reactcms_sdk8 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared8 = require("@anshif.rainhopes/shared");
async function registerTheme(websiteId, apiKey, theme) {
  if (!theme) return;
  try {
    const db = (0, import_reactcms_sdk8.getFirebaseDatabase)(apiKey);
    const themeRef = (0, import_database8.ref)(db, import_shared8.paths.registryTheme(websiteId));
    const cleanTheme = JSON.parse(JSON.stringify(theme));
    await (0, import_database8.set)(themeRef, cleanTheme);
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register theme tokens:", error);
  }
}

// src/registration/registerWebsite.ts
var import_database9 = require("firebase/database");
var import_reactcms_sdk9 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared9 = require("@anshif.rainhopes/shared");
async function registerWebsite(websiteId, apiKey) {
  try {
    const db = (0, import_reactcms_sdk9.getFirebaseDatabase)(apiKey);
    const runtimeRef = (0, import_database9.ref)(db, import_shared9.paths.registryRuntime(websiteId));
    await (0, import_database9.update)(runtimeRef, {
      status: "online",
      heartbeat: (/* @__PURE__ */ new Date()).toISOString(),
      sdkVersion: import_shared9.CURRENT_SDK_VERSION,
      runtimeVersion: import_shared9.CURRENT_RUNTIME_VERSION,
      compatibility: "ok"
    });
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register website runtime status:", error);
  }
}

// src/version/versionReporter.ts
var import_database10 = require("firebase/database");
var import_reactcms_sdk10 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared10 = require("@anshif.rainhopes/shared");
async function reportVersions(websiteId, apiKey) {
  try {
    const db = (0, import_reactcms_sdk10.getFirebaseDatabase)(apiKey);
    const versionsRef = (0, import_database10.ref)(db, `${import_shared10.paths.registry(websiteId)}/versions`);
    await (0, import_database10.update)(versionsRef, {
      sdk: import_shared10.CURRENT_SDK_VERSION,
      runtime: import_shared10.CURRENT_RUNTIME_VERSION,
      dashboard: import_shared10.CURRENT_DASHBOARD_VERSION
    });
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to report versions:", error);
  }
}

// src/RuntimeProvider.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function resolveCurrentPageId() {
  if (typeof window === "undefined") return "global";
  const pageOverride = new URLSearchParams(window.location.search).get("page");
  if (pageOverride) return pageOverride;
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return pathname || "home";
}
function dispatchRegionValue(websiteId, pageId, regionId, value) {
  import_reactcms_sdk11.MessageBus.setStoredRegionValue(pageId, regionId, value);
  import_reactcms_sdk11.MessageBus.dispatchLocal({
    rcms: true,
    version: "v1",
    type: "rcms/v1/field-update",
    websiteId,
    payload: { pageId, regionId, value },
    timestamp: Date.now()
  });
}
function runtimeRegionContentSource(editMode) {
  return editMode ? "draft" : "published";
}
function registerEditableRegionState(current, pageId, regionId, type, label, defaultValue) {
  const pageRegions = current[pageId] || {};
  const existing = pageRegions[regionId];
  if (existing?.type === type && existing.label === label && JSON.stringify(existing.defaultValue) === JSON.stringify(defaultValue)) {
    return current;
  }
  return {
    ...current,
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
}
function unregisterEditableRegionState(current, pageId, regionId) {
  const currentPageRegions = current[pageId];
  if (!currentPageRegions || !Object.prototype.hasOwnProperty.call(currentPageRegions, regionId)) {
    return current;
  }
  const pageRegions = { ...currentPageRegions };
  delete pageRegions[regionId];
  return { ...current, [pageId]: pageRegions };
}
function RegionContentHydrator({
  websiteId,
  apiKey
}) {
  const cms = (0, import_react3.useContext)(import_reactcms_sdk11.CMSContext);
  const pageId = (0, import_react3.useMemo)(resolveCurrentPageId, []);
  const source = runtimeRegionContentSource(Boolean(cms?.editMode));
  (0, import_react3.useEffect)(() => {
    let active = true;
    const hydrate = source === "draft" ? import_reactcms_sdk11.editableSync.getDraftRegions(apiKey, websiteId, pageId) : import_reactcms_sdk11.editableSync.getPublishedRegions(apiKey, websiteId, pageId);
    void hydrate.then((regions) => {
      if (!active) return;
      Object.entries(regions).forEach(([regionId, value]) => {
        dispatchRegionValue(websiteId, pageId, regionId, value);
      });
    });
    const subscribe = source === "draft" ? import_reactcms_sdk11.editableSync.subscribeToDraftRegions : import_reactcms_sdk11.editableSync.subscribeToPublishedRegions;
    const unsubscribe = subscribe(
      apiKey,
      websiteId,
      pageId,
      (regions) => {
        if (!active) return;
        Object.entries(regions).forEach(([regionId, value]) => {
          dispatchRegionValue(websiteId, pageId, regionId, value);
        });
      }
    );
    return () => {
      active = false;
      unsubscribe();
    };
  }, [apiKey, pageId, source, websiteId]);
  return null;
}
function RuntimeProvider({
  websiteId,
  apiKey,
  routes,
  theme = null,
  pageTrees,
  preserveApplicationPage = false,
  children
}) {
  const [layouts, setLayouts] = (0, import_react3.useState)({});
  const [navigations, setNavigations] = (0, import_react3.useState)({});
  const [regions, setRegions] = (0, import_react3.useState)({});
  const registerLayout = (0, import_react3.useCallback)((layout) => {
    setLayouts((current) => ({ ...current, [layout.id]: layout }));
  }, []);
  const unregisterLayout = (0, import_react3.useCallback)((id) => {
    setLayouts((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);
  const registerNavigation2 = (0, import_react3.useCallback)((navigation) => {
    setNavigations((current) => ({ ...current, [navigation.id]: navigation }));
  }, []);
  const unregisterNavigation = (0, import_react3.useCallback)((id) => {
    setNavigations((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);
  const defaultLayout = (0, import_react3.useMemo)(() => Object.values(layouts).find((layout) => layout.isDefault) || layouts.default || Object.values(layouts)[0] || null, [layouts]);
  const runtimeContextValue = (0, import_react3.useMemo)(() => ({
    layouts,
    navigations,
    registerLayout,
    unregisterLayout,
    registerNavigation: registerNavigation2,
    unregisterNavigation
  }), [
    layouts,
    navigations,
    registerLayout,
    registerNavigation2,
    unregisterLayout,
    unregisterNavigation
  ]);
  const registerRegion = (0, import_react3.useCallback)((pageId, regionId, type, label, defaultValue) => {
    setRegions((current) => registerEditableRegionState(
      current,
      pageId,
      regionId,
      type,
      label,
      defaultValue
    ));
  }, []);
  const unregisterRegion = (0, import_react3.useCallback)((pageId, regionId) => {
    setRegions((current) => unregisterEditableRegionState(current, pageId, regionId));
  }, []);
  const editableRegistryValue = (0, import_react3.useMemo)(() => ({
    registerRegion,
    unregisterRegion
  }), [registerRegion, unregisterRegion]);
  (0, import_react3.useEffect)(() => {
    const start = async () => {
      await registerWebsite(websiteId, apiKey);
      await reportVersions(websiteId, apiKey);
      await registerRoutes(websiteId, apiKey, routes);
      if (theme) await registerTheme(websiteId, apiKey, theme);
      HeartbeatService.start(websiteId, apiKey);
    };
    void start();
    return () => {
      HeartbeatService.stop();
    };
  }, [websiteId, apiKey, routes, theme]);
  (0, import_react3.useEffect)(() => {
    if (Object.keys(layouts).length > 0) {
      void registerLayouts(websiteId, apiKey, layouts);
    }
  }, [layouts, websiteId, apiKey]);
  (0, import_react3.useEffect)(() => {
    if (Object.keys(navigations).length > 0) {
      void registerNavigation(websiteId, apiKey, navigations);
    }
  }, [navigations, websiteId, apiKey]);
  (0, import_react3.useEffect)(() => {
    if (pageTrees && Object.keys(pageTrees).length > 0) {
      void registerPageTrees(websiteId, apiKey, pageTrees);
    }
  }, [apiKey, pageTrees, websiteId]);
  (0, import_react3.useEffect)(() => {
    Object.entries(regions).forEach(([pageId, pageRegions]) => {
      void registerEditableRegions(websiteId, apiKey, pageId, pageRegions);
    });
  }, [regions, websiteId, apiKey]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RuntimeContext.Provider, { value: runtimeContextValue, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_reactcms_sdk11.EditableRegistryContext.Provider, { value: editableRegistryValue, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_reactcms_sdk11.CMSProvider, { websiteId, apiKey, environment: "production", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RegionContentHydrator, { websiteId, apiKey }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      BuilderSections,
      {
        websiteId,
        apiKey,
        fallback: children,
        layout: defaultLayout?.component,
        preserveApplicationPage
      }
    )
  ] }) }) });
}

// src/CMSLayout.tsx
var import_react4 = require("react");
var DEFAULT_SLOTS = ["main"];
function CMSLayout({
  id,
  label,
  component,
  isDefault = false,
  slots = DEFAULT_SLOTS
}) {
  const context = (0, import_react4.useContext)(RuntimeContext);
  const registerLayout = context?.registerLayout;
  (0, import_react4.useEffect)(() => {
    if (registerLayout) {
      registerLayout({
        id,
        label,
        component,
        slots,
        isDefault,
        registeredAt: Date.now()
      });
    }
  }, [component, id, isDefault, label, registerLayout, slots]);
  return null;
}

// src/CMSNavigation.tsx
var import_react5 = require("react");
function CMSNavigation({ id, label, items }) {
  const context = (0, import_react5.useContext)(RuntimeContext);
  const registerNavigation2 = context?.registerNavigation;
  (0, import_react5.useEffect)(() => {
    if (registerNavigation2) {
      registerNavigation2({
        id,
        label,
        items,
        registeredAt: Date.now()
      });
    }
  }, [id, items, label, registerNavigation2]);
  return null;
}

// src/RouteRegistry.tsx
var import_react6 = require("react");
var import_react_router_dom = require("react-router-dom");
var import_database11 = require("firebase/database");
var import_reactcms_sdk12 = require("@anshif.rainhopes/reactcms-sdk");
var import_shared11 = require("@anshif.rainhopes/shared");
var import_jsx_runtime3 = require("react/jsx-runtime");
function RouteRegistry({ websiteId, apiKey }) {
  const [dynamicRoutes, setDynamicRoutes] = (0, import_react6.useState)([]);
  const runtime = (0, import_react6.useContext)(RuntimeContext);
  (0, import_react6.useEffect)(() => {
    const db = (0, import_reactcms_sdk12.getFirebaseDatabase)(apiKey);
    const routesRef = (0, import_database11.ref)(db, import_shared11.paths.registryRoutes(websiteId));
    const unsubscribe = (0, import_database11.onValue)(routesRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.values(val).filter(
          (r) => r.source === "cms-generated" || r.source === "cms" || r.source === "generated"
        );
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_router_dom.Routes, { children: dynamicRoutes.map((route) => {
    const defaultLayout = Object.values(runtime?.layouts || {}).find(
      (layout2) => layout2.isDefault
    );
    const layout = runtime?.layouts?.[route.layout || ""] || defaultLayout || runtime?.layouts?.default;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_react_router_dom.Route,
      {
        path: route.path,
        element: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          BuilderSections,
          {
            websiteId,
            apiKey,
            pageId: route.path,
            layout: layout?.component
          }
        )
      },
      route.id
    );
  }) });
}
//# sourceMappingURL=index.cjs.map