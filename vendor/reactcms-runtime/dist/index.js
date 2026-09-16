var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/RuntimeProvider.tsx
import { useCallback as useCallback2, useContext as useContext2, useEffect as useEffect2, useMemo as useMemo2, useState as useState2 } from "react";
import {
  CMSContext as CMSContext2,
  CMSProvider,
  EditableRegistryContext,
  MessageBus as MessageBus2,
  editableSync
} from "@anshif.rainhopes/reactcms-sdk";

// src/RuntimeContext.tsx
import { createContext } from "react";
var RuntimeContext = createContext(null);

// src/BuilderSections.tsx
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { onValue, ref } from "firebase/database";
import {
  blocksToPageTree,
  createRuntimeAdditionsTree,
  isPageComponentTree,
  RUNTIME_ADDITIONS_REGION,
  RuntimeRenderer
} from "@anshif.rainhopes/reactcms-renderer";
import {
  decodeFirebaseObject,
  paths
} from "@anshif.rainhopes/shared";
import {
  CMSContext,
  getFirebaseDatabase,
  MessageBus
} from "@anshif.rainhopes/reactcms-sdk";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  const decoded = decodeFirebaseObject(raw);
  if (isPageComponentTree(decoded[NATIVE_PAGE_TREE_FIELD])) {
    return decoded[NATIVE_PAGE_TREE_FIELD];
  }
  const regions = decoded.regions && typeof decoded.regions === "object" ? decoded.regions : {};
  const blocks = Array.isArray(regions[BUILDER_BLOCKS_REGION]) ? regions[BUILDER_BLOCKS_REGION] : [];
  return blocks.length ? blocksToPageTree(blocks, {
    id: pageId,
    title: decoded.title,
    locale
  }) : null;
}
function decodeRuntimeAdditions(raw) {
  if (!raw || typeof raw !== "object") return null;
  const decoded = decodeFirebaseObject(raw);
  const regions = decoded.regions && typeof decoded.regions === "object" ? decoded.regions : {};
  return isPageComponentTree(regions[RUNTIME_ADDITIONS_REGION]) ? regions[RUNTIME_ADDITIONS_REGION] : null;
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
  const [host, setHost] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const clipboard = useRef(null);
  useEffect(() => {
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
  const commit = useCallback((next) => {
    onTreeChange(next);
    MessageBus.send("rcms/v1/field-update", websiteId, {
      pageId,
      regionId: RUNTIME_ADDITIONS_REGION,
      value: next
    });
  }, [onTreeChange, pageId, websiteId]);
  const addNode = useCallback((componentType = "section", targetId = "", position = "after") => {
    const addition = makeRuntimeNode(componentType, locale, placement);
    const children = targetId ? insertNode(tree.children, targetId, position, addition) : [...tree.children, addition];
    commit({ ...tree, children });
    setSelectedIds([addition.id]);
  }, [commit, locale, placement, tree]);
  const handleMutation = useCallback((mutation) => {
    commit({
      ...tree,
      children: updateNode(tree.children, mutation.nodeId, mutation.path, mutation.value)
    });
  }, [commit, tree]);
  const handleSelect = useCallback((nodeId, additive = false) => {
    const node = findNode(tree.children, nodeId);
    if (!node) return;
    setSelectedIds((current) => additive ? current.includes(nodeId) ? current.filter((id) => id !== nodeId) : [...current, nodeId] : [nodeId]);
    MessageBus.send("rcms/v1/region-selected", websiteId, {
      regionId: RUNTIME_ADDITIONS_REGION,
      type: "runtime-component",
      pageId,
      value: tree,
      componentId: nodeId,
      componentType: node.type,
      label: node.label || node.type,
      additive
    });
    MessageBus.send("rcms/v1/open-inspector", websiteId, {
      regionId: RUNTIME_ADDITIONS_REGION,
      type: "runtime-component",
      pageId,
      componentId: nodeId
    });
  }, [pageId, tree, websiteId]);
  const handleCommand = useCallback((command, nodeId) => {
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
  const handleMove = useCallback((nodeId, targetId, position) => {
    const node = findNode(tree.children, nodeId);
    if (!node || findNode(node.children || [], targetId)) return;
    const without = removeNode(tree.children, nodeId);
    commit({ ...tree, children: insertNode(without, targetId, position, node) });
  }, [commit, tree]);
  if (!host) return null;
  return createPortal(
    nodes.length ? /* @__PURE__ */ jsx(
      RuntimeRenderer,
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
    ) : editMode ? /* @__PURE__ */ jsxs(
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
          /* @__PURE__ */ jsx("span", { children: "CMS insertion area above the footer" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => addNode("section"), children: "+ Section" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => addNode("input"), children: "+ Input field" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => addNode("textarea-field"), children: "+ Message field" })
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
  const pageId = useMemo(
    () => pageIdOverride?.replace(/^\/+|\/+$/g, "") || resolvePageId(),
    [pageIdOverride]
  );
  const locale = useMemo(resolveLocale, []);
  const cms = useContext(CMSContext);
  const editMode = Boolean(cms?.editMode);
  const [tree, setTree] = useState(null);
  const [runtimeAdditions, setRuntimeAdditions] = useState(null);
  const [theme, setTheme] = useState(null);
  const [resolved, setResolved] = useState(false);
  useEffect(() => {
    const database = getFirebaseDatabase(apiKey);
    const publishedRef = ref(database, paths.contentPublished(websiteId, pageId));
    const draftRef = editMode ? ref(database, paths.contentDraft(websiteId, pageId)) : null;
    const themeRef = ref(database, paths.contentTheme(websiteId));
    const unsubscribePage = onValue(
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
    const unsubscribeDraft = draftRef ? onValue(
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
    const unsubscribeTheme = onValue(themeRef, (snapshot) => {
      setTheme(snapshot.exists() ? decodeFirebaseObject(snapshot.val()) : null);
    });
    return () => {
      unsubscribePage();
      unsubscribeDraft();
      unsubscribeTheme();
    };
  }, [apiKey, editMode, locale, pageId, websiteId]);
  useEffect(() => MessageBus.subscribe((message) => {
    if (message.type !== "rcms/v1/field-update") return;
    const payload = message.payload;
    if (payload?.regionId === RUNTIME_ADDITIONS_REGION && (!payload.pageId || payload.pageId === pageId) && isPageComponentTree(payload.value)) {
      setRuntimeAdditions(payload.value);
    }
  }), [pageId]);
  const additionsTree = runtimeAdditions || createRuntimeAdditionsTree(pageId, locale);
  const additionGroups = useMemo(() => {
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
  const additions = additionGroups.length ? additionGroups.map((group) => /* @__PURE__ */ jsx(
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
  if (preserveApplicationPage) return /* @__PURE__ */ jsxs(Fragment, { children: [
    fallback,
    additions
  ] });
  if (!resolved || !tree) return /* @__PURE__ */ jsxs(Fragment, { children: [
    fallback,
    additions
  ] });
  const page = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      RuntimeRenderer,
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
  return Layout ? /* @__PURE__ */ jsx(Layout, { children: page }) : page;
}

// src/heartbeat/heartbeatService.ts
import { ref as ref2, update } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase2 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths2 } from "@anshif.rainhopes/shared";
var HeartbeatService = class {
  static start(websiteId, apiKey) {
    this.stop();
    const ping = async () => {
      try {
        const db = getFirebaseDatabase2(apiKey);
        const runtimeRef = ref2(db, paths2.registryRuntime(websiteId));
        await update(runtimeRef, {
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
import { ref as ref3, set } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase3 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths3, encodeFirebaseKey } from "@anshif.rainhopes/shared";
async function registerEditableRegions(websiteId, apiKey, pageId, regions) {
  try {
    const db = getFirebaseDatabase3(apiKey);
    const regionsRef = ref3(db, paths3.registryRegions(websiteId, pageId));
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
    await set(regionsRef, cleanRegions);
  } catch (error) {
    console.error(`[ReactCMS Runtime] Failed to register editable regions for page ${pageId}:`, error);
  }
}

// src/registration/registerLayouts.ts
import { ref as ref4, update as update2 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase4 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths4 } from "@anshif.rainhopes/shared";
async function registerLayouts(websiteId, apiKey, layouts) {
  try {
    const db = getFirebaseDatabase4(apiKey);
    const layoutsRef = ref4(db, paths4.registryLayouts(websiteId));
    const updates = {};
    Object.entries(layouts).forEach(([id, layout]) => {
      updates[id] = JSON.parse(JSON.stringify(layout));
    });
    if (Object.keys(updates).length > 0) {
      await update2(layoutsRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register layouts:", error);
  }
}

// src/registration/registerNavigation.ts
import { ref as ref5, update as update3 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase5 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths5 } from "@anshif.rainhopes/shared";
async function registerNavigation(websiteId, apiKey, navigations) {
  try {
    const db = getFirebaseDatabase5(apiKey);
    const navRef = ref5(db, paths5.registryNav(websiteId));
    const updates = {};
    Object.entries(navigations).forEach(([id, nav]) => {
      updates[id] = JSON.parse(JSON.stringify(nav));
    });
    if (Object.keys(updates).length > 0) {
      await update3(navRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register navigation menus:", error);
  }
}

// src/registration/registerPageTrees.ts
import { ref as ref6, set as set2 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase6 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths6 } from "@anshif.rainhopes/shared";
function normalizePageKey(value) {
  return value.split("?")[0].replace(/^\/+|\/+$/g, "") || "home";
}
async function registerPageTrees(websiteId, apiKey, pageTrees) {
  const database = getFirebaseDatabase6(apiKey);
  await Promise.all(Object.entries(pageTrees).map(([pageKey, tree]) => set2(ref6(database, paths6.registryPageTree(websiteId, normalizePageKey(pageKey))), tree)));
}

// src/registration/registerRoutes.ts
import { ref as ref7, update as update4 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase7 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths7 } from "@anshif.rainhopes/shared";

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
    const db = getFirebaseDatabase7(apiKey);
    const discovered = discoverRoutes(routesConfig);
    const routesRef = ref7(db, paths7.registryRoutes(websiteId));
    const updates = {};
    discovered.forEach((route) => {
      const cleanRoute = JSON.parse(JSON.stringify(route));
      updates[route.id] = cleanRoute;
    });
    if (Object.keys(updates).length > 0) {
      await update4(routesRef, updates);
    }
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register website routes:", error);
  }
}

// src/registration/registerTheme.ts
import { ref as ref8, set as set3 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase8 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths8 } from "@anshif.rainhopes/shared";
async function registerTheme(websiteId, apiKey, theme) {
  if (!theme) return;
  try {
    const db = getFirebaseDatabase8(apiKey);
    const themeRef = ref8(db, paths8.registryTheme(websiteId));
    const cleanTheme = JSON.parse(JSON.stringify(theme));
    await set3(themeRef, cleanTheme);
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to register theme tokens:", error);
  }
}

// src/registration/registerWebsite.ts
import { ref as ref9, update as update5 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase9 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths9, CURRENT_SDK_VERSION, CURRENT_RUNTIME_VERSION } from "@anshif.rainhopes/shared";
async function registerWebsite(websiteId, apiKey) {
  try {
    const db = getFirebaseDatabase9(apiKey);
    const runtimeRef = ref9(db, paths9.registryRuntime(websiteId));
    await update5(runtimeRef, {
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

// src/version/versionReporter.ts
import { ref as ref10, update as update6 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase10 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths10, CURRENT_SDK_VERSION as CURRENT_SDK_VERSION2, CURRENT_RUNTIME_VERSION as CURRENT_RUNTIME_VERSION2, CURRENT_DASHBOARD_VERSION } from "@anshif.rainhopes/shared";
async function reportVersions(websiteId, apiKey) {
  try {
    const db = getFirebaseDatabase10(apiKey);
    const versionsRef = ref10(db, `${paths10.registry(websiteId)}/versions`);
    await update6(versionsRef, {
      sdk: CURRENT_SDK_VERSION2,
      runtime: CURRENT_RUNTIME_VERSION2,
      dashboard: CURRENT_DASHBOARD_VERSION
    });
  } catch (error) {
    console.error("[ReactCMS Runtime] Failed to report versions:", error);
  }
}

// src/RuntimeProvider.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function resolveCurrentPageId() {
  if (typeof window === "undefined") return "global";
  const pageOverride = new URLSearchParams(window.location.search).get("page");
  if (pageOverride) return pageOverride;
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return pathname || "home";
}
function dispatchRegionValue(websiteId, pageId, regionId, value) {
  MessageBus2.setStoredRegionValue(pageId, regionId, value);
  MessageBus2.dispatchLocal({
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
  const cms = useContext2(CMSContext2);
  const pageId = useMemo2(resolveCurrentPageId, []);
  const source = runtimeRegionContentSource(Boolean(cms?.editMode));
  useEffect2(() => {
    let active = true;
    const hydrate = source === "draft" ? editableSync.getDraftRegions(apiKey, websiteId, pageId) : editableSync.getPublishedRegions(apiKey, websiteId, pageId);
    void hydrate.then((regions) => {
      if (!active) return;
      Object.entries(regions).forEach(([regionId, value]) => {
        dispatchRegionValue(websiteId, pageId, regionId, value);
      });
    });
    const subscribe = source === "draft" ? editableSync.subscribeToDraftRegions : editableSync.subscribeToPublishedRegions;
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
  const [layouts, setLayouts] = useState2({});
  const [navigations, setNavigations] = useState2({});
  const [regions, setRegions] = useState2({});
  const registerLayout = useCallback2((layout) => {
    setLayouts((current) => ({ ...current, [layout.id]: layout }));
  }, []);
  const unregisterLayout = useCallback2((id) => {
    setLayouts((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);
  const registerNavigation2 = useCallback2((navigation) => {
    setNavigations((current) => ({ ...current, [navigation.id]: navigation }));
  }, []);
  const unregisterNavigation = useCallback2((id) => {
    setNavigations((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);
  const defaultLayout = useMemo2(() => Object.values(layouts).find((layout) => layout.isDefault) || layouts.default || Object.values(layouts)[0] || null, [layouts]);
  const runtimeContextValue = useMemo2(() => ({
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
  const registerRegion = useCallback2((pageId, regionId, type, label, defaultValue) => {
    setRegions((current) => registerEditableRegionState(
      current,
      pageId,
      regionId,
      type,
      label,
      defaultValue
    ));
  }, []);
  const unregisterRegion = useCallback2((pageId, regionId) => {
    setRegions((current) => unregisterEditableRegionState(current, pageId, regionId));
  }, []);
  const editableRegistryValue = useMemo2(() => ({
    registerRegion,
    unregisterRegion
  }), [registerRegion, unregisterRegion]);
  useEffect2(() => {
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
  useEffect2(() => {
    if (Object.keys(layouts).length > 0) {
      void registerLayouts(websiteId, apiKey, layouts);
    }
  }, [layouts, websiteId, apiKey]);
  useEffect2(() => {
    if (Object.keys(navigations).length > 0) {
      void registerNavigation(websiteId, apiKey, navigations);
    }
  }, [navigations, websiteId, apiKey]);
  useEffect2(() => {
    if (pageTrees && Object.keys(pageTrees).length > 0) {
      void registerPageTrees(websiteId, apiKey, pageTrees);
    }
  }, [apiKey, pageTrees, websiteId]);
  useEffect2(() => {
    Object.entries(regions).forEach(([pageId, pageRegions]) => {
      void registerEditableRegions(websiteId, apiKey, pageId, pageRegions);
    });
  }, [regions, websiteId, apiKey]);
  return /* @__PURE__ */ jsx2(RuntimeContext.Provider, { value: runtimeContextValue, children: /* @__PURE__ */ jsx2(EditableRegistryContext.Provider, { value: editableRegistryValue, children: /* @__PURE__ */ jsxs2(CMSProvider, { websiteId, apiKey, environment: "production", children: [
    /* @__PURE__ */ jsx2(RegionContentHydrator, { websiteId, apiKey }),
    /* @__PURE__ */ jsx2(
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
import { useContext as useContext3, useEffect as useEffect3 } from "react";
var DEFAULT_SLOTS = ["main"];
function CMSLayout({
  id,
  label,
  component,
  isDefault = false,
  slots = DEFAULT_SLOTS
}) {
  const context = useContext3(RuntimeContext);
  const registerLayout = context?.registerLayout;
  useEffect3(() => {
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
import { useContext as useContext4, useEffect as useEffect4 } from "react";
function CMSNavigation({ id, label, items }) {
  const context = useContext4(RuntimeContext);
  const registerNavigation2 = context?.registerNavigation;
  useEffect4(() => {
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
import { useContext as useContext5, useEffect as useEffect5, useState as useState3 } from "react";
import { Routes, Route } from "react-router-dom";
import { ref as ref11, onValue as onValue2 } from "firebase/database";
import { getFirebaseDatabase as getFirebaseDatabase11 } from "@anshif.rainhopes/reactcms-sdk";
import { paths as paths11 } from "@anshif.rainhopes/shared";
import { jsx as jsx3 } from "react/jsx-runtime";
function RouteRegistry({ websiteId, apiKey }) {
  const [dynamicRoutes, setDynamicRoutes] = useState3([]);
  const runtime = useContext5(RuntimeContext);
  useEffect5(() => {
    const db = getFirebaseDatabase11(apiKey);
    const routesRef = ref11(db, paths11.registryRoutes(websiteId));
    const unsubscribe = onValue2(routesRef, (snapshot) => {
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
  return /* @__PURE__ */ jsx3(Routes, { children: dynamicRoutes.map((route) => {
    const defaultLayout = Object.values(runtime?.layouts || {}).find(
      (layout2) => layout2.isDefault
    );
    const layout = runtime?.layouts?.[route.layout || ""] || defaultLayout || runtime?.layouts?.default;
    return /* @__PURE__ */ jsx3(
      Route,
      {
        path: route.path,
        element: /* @__PURE__ */ jsx3(
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
export {
  BuilderSections,
  CMSLayout,
  CMSNavigation,
  RouteRegistry,
  RuntimeProvider
};
//# sourceMappingURL=index.js.map