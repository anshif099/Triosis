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
  RUNTIME_ADDITIONS_REGION: () => RUNTIME_ADDITIONS_REGION,
  RuntimeComponentRegistry: () => RuntimeComponentRegistry,
  RuntimeRenderer: () => RuntimeRenderer,
  RuntimeRendererEngine: () => RuntimeRendererEngine,
  blockToComponentNode: () => blockToComponentNode,
  blocksToPageTree: () => blocksToPageTree,
  componentNodeToBlock: () => componentNodeToBlock,
  createRuntimeAdditionsTree: () => createRuntimeAdditionsTree,
  defaultComponentRegistry: () => defaultComponentRegistry,
  isPageComponentTree: () => isPageComponentTree,
  pageTreeToBlocks: () => pageTreeToBlocks,
  regionsToPageTree: () => regionsToPageTree
});
module.exports = __toCommonJS(index_exports);

// src/RuntimeRenderer.tsx
var import_react = require("react");

// src/registry.ts
var RuntimeComponentRegistry = class {
  constructor() {
    __publicField(this, "components", /* @__PURE__ */ new Map());
  }
  register(type, component) {
    this.components.set(type, component);
  }
  unregister(type) {
    this.components.delete(type);
  }
  get(type) {
    return this.components.get(type);
  }
  has(type) {
    return this.components.has(type);
  }
  entries() {
    return Array.from(this.components.entries());
  }
};
var defaultComponentRegistry = new RuntimeComponentRegistry();

// src/buttonDrag.ts
function buttonHorizontalPosition(pointerX, grabX, buttonWidth, left, width) {
  const travel = width - buttonWidth;
  return travel > 0 ? Math.max(0, Math.min(1, (pointerX - grabX - left) / travel)) : 0;
}
function contentBounds(element) {
  const rect = element.getBoundingClientRect();
  const style = element.ownerDocument.defaultView.getComputedStyle(element);
  const scale = element.offsetWidth > 0 ? rect.width / element.offsetWidth : 1;
  const leftInset = ((parseFloat(style.borderLeftWidth) || 0) + (parseFloat(style.paddingLeft) || 0)) * scale;
  const rightInset = ((parseFloat(style.borderRightWidth) || 0) + (parseFloat(style.paddingRight) || 0)) * scale;
  return { left: rect.left + leftInset, width: Math.max(0, rect.width - leftInset - rightInset), scale };
}
function findButtonDropTarget(frame, x, y) {
  const doc = frame.ownerDocument;
  const win = doc.defaultView;
  if (x < 0 || y < 0 || x > win.innerWidth || y > win.innerHeight) return null;
  let best = null;
  let distance = Infinity;
  for (const element of Array.from(doc.querySelectorAll("[data-rcms-node], [data-rcms-region]"))) {
    if (element === frame || frame.contains(element) || element.contains(frame) || element.closest("[data-rcms-drag-ghost]")) continue;
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height || rect.bottom < 0 || rect.top > win.innerHeight) continue;
    const horizontal = Math.max(rect.left - x, 0, x - rect.right);
    const inline = element.dataset.rcmsType === "button" && y >= rect.top && y <= rect.bottom;
    for (const position of ["before", "after"]) {
      const score = inline ? Math.abs(x - (position === "before" ? rect.left : rect.right)) : Math.hypot(horizontal, y - (position === "before" ? rect.top : rect.bottom));
      if (score < distance) {
        distance = score;
        best = { element, nodeId: element.dataset.rcmsNode || "", regionId: element.dataset.rcmsRegion || "", position };
      }
    }
  }
  return best;
}
function startButtonDrag(frame, start, onDrop) {
  const doc = frame.ownerDocument;
  const win = doc.defaultView;
  const rect = frame.getBoundingClientRect();
  const originalDisplay = frame.style.display;
  const originalPriority = frame.style.getPropertyPriority("display");
  let x = start.clientX;
  let y = start.clientY;
  let active = false;
  let ended = false;
  let ghost = null;
  let placeholder = null;
  let destination = null;
  let animation = 0;
  let lastTick = 0;
  let scrollHost = frame.parentElement;
  while (scrollHost) {
    if (/(auto|scroll)/.test(win.getComputedStyle(scrollHost).overflowY) && scrollHost.scrollHeight > scrollHost.clientHeight) break;
    scrollHost = scrollHost.parentElement;
  }
  const update = () => {
    if (!active || ended) return;
    Object.assign(ghost.style, { left: `${x - (start.clientX - rect.left)}px`, top: `${y - (start.clientY - rect.top)}px` });
    const slot = placeholder?.getBoundingClientRect();
    const next = slot && x >= slot.left && x <= slot.right && y >= slot.top && y <= slot.bottom ? destination : findButtonDropTarget(frame, x, y);
    const sameTarget = next?.element === destination?.element && next?.position === destination?.position;
    if (!sameTarget) placeholder?.remove();
    destination = next;
    if (!next?.element.parentElement) return;
    const parent = next.element.parentElement;
    const bounds = contentBounds(parent);
    const horizontalPosition = buttonHorizontalPosition(x, start.clientX - rect.left, rect.width, bounds.left, bounds.width);
    next.horizontalPosition = horizontalPosition;
    placeholder || (placeholder = doc.createElement("div"));
    placeholder.dataset.rcmsButtonDropPlaceholder = "true";
    Object.assign(placeholder.style, {
      boxSizing: "border-box",
      width: `${rect.width / (bounds.scale || 1)}px`,
      height: `${rect.height / (bounds.scale || 1)}px`,
      display: "block",
      position: "relative",
      margin: "0",
      maxWidth: "100%",
      left: `${horizontalPosition * 100}%`,
      translate: `${-horizontalPosition * 100}% 0`,
      border: "2px dashed #2563eb",
      borderRadius: "8px",
      background: "rgba(37,99,235,.1)",
      pointerEvents: "none"
    });
    if (!sameTarget || !placeholder.isConnected) {
      parent.insertBefore(placeholder, next.position === "before" ? next.element : next.element.nextSibling);
    }
  };
  const tick = (time) => {
    if (ended || !active) return;
    const bounds = scrollHost?.getBoundingClientRect();
    const top = Math.max(0, bounds?.top || 0);
    const bottom = Math.min(win.innerHeight, bounds?.bottom ?? win.innerHeight);
    const speed = y < top + 64 ? -Math.min(1, (top + 64 - y) / 64) : y > bottom - 64 ? Math.min(1, (y - bottom + 64) / 64) : 0;
    const delta = speed * Math.min(time - (lastTick || time), 32) * 0.7;
    lastTick = time;
    if (delta) {
      if (scrollHost) scrollHost.scrollTop += delta;
      else win.scrollBy(0, delta);
      update();
    }
    animation = win.requestAnimationFrame(tick);
  };
  const activate = () => {
    if (active) return;
    active = true;
    ghost = frame.cloneNode(true);
    ghost.dataset.rcmsDragGhost = "true";
    ghost.setAttribute("aria-hidden", "true");
    const originals = [frame, ...Array.from(frame.querySelectorAll("*"))];
    const clones = [ghost, ...Array.from(ghost.querySelectorAll("*"))];
    originals.forEach((element, index) => {
      const computed = win.getComputedStyle(element);
      for (const property of Array.from(computed)) clones[index].style.setProperty(property, computed.getPropertyValue(property));
      clones[index].removeAttribute("id");
      clones[index].removeAttribute("data-rcms-node");
      clones[index].removeAttribute("data-rcms-region");
      clones[index].style.setProperty("pointer-events", "none", "important");
    });
    Object.assign(ghost.style, {
      position: "fixed",
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      margin: "0",
      transform: "none",
      translate: "none",
      animation: "none",
      transition: "none",
      zIndex: "2147483646",
      opacity: ".85"
    });
    doc.body.appendChild(ghost);
    frame.style.setProperty("display", "none", "important");
    update();
    animation = win.requestAnimationFrame(tick);
  };
  const move = (event) => {
    if (event.pointerId !== start.pointerId) return;
    x = event.clientX;
    y = event.clientY;
    if (Math.hypot(x - start.clientX, y - start.clientY) >= 4) activate();
    update();
  };
  const scroll = () => {
    activate();
    update();
  };
  const cleanup = () => {
    if (ended) return;
    ended = true;
    win.cancelAnimationFrame(animation);
    win.removeEventListener("pointermove", move, true);
    win.removeEventListener("pointerup", finish, true);
    win.removeEventListener("pointercancel", cancel, true);
    win.removeEventListener("scroll", scroll, true);
    win.removeEventListener("blur", cleanup);
    win.removeEventListener("keydown", keydown, true);
    ghost?.remove();
    placeholder?.remove();
    if (originalDisplay) frame.style.setProperty("display", originalDisplay, originalPriority);
    else frame.style.removeProperty("display");
  };
  const finish = (event) => {
    if (event.pointerId !== start.pointerId) return;
    if (event.clientX !== x || event.clientY !== y) {
      x = event.clientX;
      y = event.clientY;
      update();
    }
    const target = destination;
    cleanup();
    if (active && target?.element.isConnected) onDrop(target);
  };
  const cancel = (event) => {
    if (event.pointerId === start.pointerId) cleanup();
  };
  const keydown = (event) => {
    if (event.key === "Escape") cleanup();
  };
  win.addEventListener("pointermove", move, true);
  win.addEventListener("pointerup", finish, true);
  win.addEventListener("pointercancel", cancel, true);
  win.addEventListener("scroll", scroll, true);
  win.addEventListener("blur", cleanup);
  win.addEventListener("keydown", keydown, true);
  return cleanup;
}

// src/RuntimeRenderer.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function localized(node, locale, key, fallback = "") {
  return node.props?.locales?.[locale]?.[key] ?? node.props?.locales?.en?.[key] ?? node.props?.[key] ?? fallback;
}
function cleanHtml(value) {
  return String(value || "").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "");
}
function responsiveStyle(node, mode) {
  return {
    ...node.styles?.base || {},
    ...node.styles?.desktop || {},
    ...mode === "laptop" ? node.styles?.laptop || {} : {},
    ...mode === "tablet" ? node.styles?.tablet || {} : {},
    ...mode === "mobile" ? node.styles?.mobile || {} : {}
  };
}
function responsiveTypographyStyle(node, mode) {
  const styles = responsiveStyle(node, mode);
  const keys = [
    "color",
    "fontFamily",
    "fontSize",
    "fontStyle",
    "fontWeight",
    "letterSpacing",
    "lineHeight",
    "textAlign",
    "textDecoration",
    "textTransform"
  ];
  return keys.reduce((result, key) => {
    if (styles[key] !== void 0) result[key] = styles[key];
    return result;
  }, {});
}
function inlinePath(locale, key) {
  return ["props", "locales", locale, key];
}
function InlineText({
  as = "span",
  value,
  html = false,
  editable,
  selected,
  style,
  className,
  onCommit,
  nodeId,
  field
}) {
  const [editing, setEditing] = (0, import_react.useState)(false);
  const [display, setDisplay] = (0, import_react.useState)(String(value ?? ""));
  const ref = (0, import_react.useRef)(null);
  const Tag = as;
  (0, import_react.useEffect)(() => {
    if (!editing) setDisplay(String(value ?? ""));
  }, [editing, value]);
  const finish = (commit) => {
    const next = ref.current?.innerText ?? display;
    setEditing(false);
    if (commit) {
      setDisplay(next);
      onCommit(next);
    } else {
      setDisplay(String(value ?? ""));
    }
  };
  const common = {
    ref,
    className,
    style: {
      ...style,
      cursor: editable ? editing ? "text" : style?.cursor || "text" : void 0,
      outline: editing ? "2px solid #2563eb" : void 0,
      outlineOffset: editing ? "3px" : void 0,
      minWidth: editable && selected ? "12px" : void 0
    },
    "data-rcms-inline": editable ? "true" : void 0,
    "data-rcms-node-id": nodeId,
    "data-rcms-field": field,
    contentEditable: editing,
    suppressContentEditableWarning: true,
    onDoubleClick: (event) => {
      if (!editable) return;
      event.preventDefault();
      event.stopPropagation();
      setEditing(true);
      window.setTimeout(() => {
        ref.current?.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        if (ref.current) {
          range.selectNodeContents(ref.current);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 0);
    },
    onBlur: () => editing && finish(true),
    onKeyDown: (event) => {
      if (!editing) return;
      if (event.key === "Escape") {
        event.preventDefault();
        finish(false);
      }
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        finish(true);
      }
    }
  };
  if (html && !editing) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { ...common, dangerouslySetInnerHTML: { __html: cleanHtml(display) } });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { ...common, children: display });
}
function buttonStyle(node) {
  const props = node.props || {};
  const color = props.color || "var(--rcms-color-primary, #2563eb)";
  const isOutline = props.variant === "outline";
  const isGhost = props.variant === "ghost";
  const isSecondary = props.variant === "secondary";
  const shadows = {
    none: "none",
    small: "0 5px 14px rgba(15,23,42,.12)",
    medium: "0 12px 28px rgba(15,23,42,.16)",
    large: "0 20px 45px rgba(15,23,42,.22)"
  };
  return {
    display: "inline-flex",
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    width: props.width || void 0,
    height: props.height || void 0,
    minHeight: props.size === "lg" ? "50px" : props.size === "sm" ? "36px" : "42px",
    padding: props.size === "lg" ? "0 26px" : props.size === "sm" ? "0 14px" : "0 20px",
    borderRadius: props.radius !== void 0 ? `${props.radius}px` : "var(--rcms-button-radius, 10px)",
    gap: "9px",
    cursor: "pointer",
    background: isOutline || isGhost ? "transparent" : isSecondary ? "#0f172a" : color,
    border: isGhost ? "1px solid transparent" : `1px solid ${isSecondary ? "#0f172a" : color}`,
    color: isOutline || isGhost ? color : "#fff",
    boxShadow: shadows[props.shadow || "medium"] || props.shadow,
    fontWeight: props.weight || "var(--rcms-button-weight, 700)",
    textDecoration: "none"
  };
}
function ButtonIcon({ name, src, size = 18 }) {
  if (src) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        src,
        alt: "",
        "aria-hidden": "true",
        style: { width: `${size}px`, height: `${size}px`, objectFit: "contain", flex: "0 0 auto" }
      }
    );
  }
  if (!name || name === "none") return null;
  const symbols = {
    "arrow-right": "\u2192",
    whatsapp: "WA",
    phone: "\u260E",
    mail: "\u2709",
    "external-link": "\u2197",
    download: "\u2193"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", style: { display: "inline-grid", placeItems: "center", minWidth: "1.1em", fontSize: name === "whatsapp" ? ".68em" : "1.05em", fontWeight: 800 }, children: symbols[name] || "\u2022" });
}
function cards(items, bodyKey = "description") {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "22px",
    marginTop: "30px"
  }, children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { style: {
    padding: "24px",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 12px 30px rgba(15,23,42,.06)"
  }, children: [
    item.image || item.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        src: item.image || item.avatar,
        alt: item.title || item.name || "",
        style: { width: "100%", aspectRatio: "16 / 10", objectFit: "cover", borderRadius: "12px" }
      }
    ) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { style: { margin: "12px 0 8px", color: "var(--rcms-color-text, #0f172a)", fontSize: "19px" }, children: item.title || item.name || `Item ${index + 1}` }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { margin: 0, color: "#64748b", lineHeight: 1.7 }, children: item[bodyKey] || item.quote || item.bio || item.excerpt || "" })
  ] }, item.id || index)) });
}
function BuiltinComponent({
  node,
  locale,
  mode,
  responsiveMode,
  selected,
  children,
  mutate
}) {
  const props = node.props || {};
  const edit = mode === "edit";
  const typography = responsiveTypographyStyle(node, responsiveMode);
  const text = (key, fallback = "") => localized(node, locale, key, fallback);
  const inline = (key, fallback, as, style, html = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    InlineText,
    {
      as,
      value: text(key, fallback),
      html,
      editable: edit && !node.locked,
      selected,
      style: { ...style, ...typography },
      onCommit: (value) => mutate(inlinePath(locale, key), value),
      nodeId: node.id,
      field: key
    }
  );
  if (["section", "container", "grid", "flex", "columns"].includes(node.type)) {
    const layout = node.type === "grid" || node.type === "columns" ? {
      display: "grid",
      gridTemplateColumns: `repeat(${props.columns || 2}, minmax(0, 1fr))`,
      gap: `${props.gap || 24}px`
    } : node.type === "flex" ? {
      display: "flex",
      flexDirection: props.direction || "row",
      flexWrap: "wrap",
      gap: `${props.gap || 20}px`
    } : {};
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...layout, minHeight: node.children?.length ? void 0 : mode === "edit" ? "90px" : void 0 }, children: node.children?.length ? children : mode === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { minHeight: "90px", display: "grid", placeItems: "center", border: "1px dashed #cbd5e1", borderRadius: "10px", color: "#94a3b8", fontSize: "12px" }, children: [
      "Drop components inside ",
      node.label || node.type
    ] }) : null });
  }
  switch (node.type) {
    case "hero":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
        minHeight: "500px",
        padding: "64px 28px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        background: props.image ? `linear-gradient(rgba(15,23,42,${props.overlayOpacity ?? 0.68}),rgba(15,23,42,${props.overlayOpacity ?? 0.68})),url(${props.image}) center/cover` : "linear-gradient(135deg,#0f172a,#1d4ed8 60%,#7c3aed)"
      }, children: [
        inline("title", "Build something remarkable", "h1", {
          margin: 0,
          maxWidth: "900px",
          fontSize: "clamp(40px,7vw,76px)",
          lineHeight: 1.02
        }),
        inline("subtitle", "Create beautiful experiences with a native visual workflow.", "p", {
          maxWidth: "680px",
          margin: "24px 0 30px",
          color: "#cbd5e1",
          fontSize: "18px",
          lineHeight: 1.7
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: buttonStyle({ ...node, props: { ...props, color: "#2563eb", size: "lg" } }), children: inline("buttonText", "Get Started", "span") })
      ] });
    case "heading": {
      const level = /^h[1-6]$/.test(props.level) ? props.level : "h2";
      return inline("text", "Section heading", level, {
        margin: 0,
        color: props.color || "var(--rcms-color-text, #0f172a)",
        textAlign: props.alignment || "left",
        fontSize: level === "h1" ? "52px" : level === "h2" ? "38px" : void 0,
        ...typography
      });
    }
    case "paragraph":
      return inline("text", "<p>Add your story here.</p>", "div", {
        color: "#475569",
        fontSize: "17px",
        lineHeight: 1.8,
        textAlign: props.alignment || "left",
        ...typography
      }, true);
    case "button": {
      const buttonIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonIcon, { name: props.icon, src: props.iconImage, size: props.iconSize || 18 });
      const buttonContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        props.iconPosition !== "right" ? buttonIcon : null,
        inline("label", "Learn More", "span", { cursor: mode === "edit" ? "grab" : void 0 }),
        props.iconPosition === "right" ? buttonIcon : null
      ] });
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { textAlign: props.alignment || "center" }, children: props.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "a",
        {
          href: mode === "edit" ? void 0 : props.url,
          target: props.newTab ? "_blank" : void 0,
          rel: props.newTab ? "noopener noreferrer" : void 0,
          style: buttonStyle(node),
          children: buttonContent
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: buttonStyle(node), children: buttonContent }) });
    }
    case "image":
      return props.src ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { style: { margin: 0, textAlign: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "img",
          {
            src: props.src,
            alt: text("alt", ""),
            style: {
              width: props.width || "100%",
              height: props.height || "auto",
              objectFit: props.objectFit || "cover",
              objectPosition: props.objectPosition || "50% 50%",
              borderRadius: `${props.radius || 0}px`
            }
          }
        ),
        text("caption") ? inline("caption", "", "figcaption", { marginTop: "10px", color: "#64748b" }) : null
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
        minHeight: "220px",
        border: "2px dashed #cbd5e1",
        borderRadius: "14px",
        display: "grid",
        placeItems: "center",
        color: "#64748b",
        background: "#f8fafc"
      }, children: "Choose an image in the Inspector" });
    case "gallery":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        text("title") ? inline("title", "", "h2", {
          margin: "0 0 10px",
          color: "#0f172a",
          fontSize: "38px",
          textAlign: "center"
        }) : null,
        text("subtitle") ? inline("subtitle", "", "p", {
          maxWidth: "760px",
          margin: "0 auto 28px",
          color: "#64748b",
          fontSize: "17px",
          lineHeight: 1.7,
          textAlign: "center"
        }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${props.columns === "4" ? "210px" : "250px"}),1fr))`,
          gap: `${props.gap || 16}px`
        }, children: (props.images || []).map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { style: {
          margin: 0,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          background: "#ffffff",
          boxShadow: "0 12px 28px rgba(15,23,42,.08)"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "img",
            {
              src: image.src,
              alt: image.alt || "",
              loading: "lazy",
              decoding: "async",
              style: { width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block" }
            }
          ),
          image.title || image.caption || image.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { style: { padding: "14px 16px 16px", color: "#475569", lineHeight: 1.55 }, children: [
            image.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { style: { display: "block", marginBottom: "5px", color: "#0f172a", fontSize: "15px" }, children: image.title }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "13px" }, children: image.description || image.caption })
          ] }) : null
        ] }, image.id || index)) })
      ] });
    case "video":
      return props.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", { src: props.url, poster: props.poster, controls: props.controls !== false, autoPlay: !!props.autoplay, style: { width: "100%", borderRadius: "16px", background: "#020617" } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { minHeight: "300px", borderRadius: "16px", background: "#0f172a", color: "#94a3b8", display: "grid", placeItems: "center" }, children: "Choose a video in the Inspector" });
    case "features":
    case "services":
    case "cards":
    case "testimonials":
    case "team":
    case "blog-posts": {
      const collectionKey = node.type === "cards" ? "cards" : node.type === "team" ? "members" : "items";
      const items = localized(node, locale, collectionKey, []);
      const body = node.type === "testimonials" ? "quote" : node.type === "team" ? "bio" : node.type === "blog-posts" ? "excerpt" : "description";
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        inline("title", node.type.replace(/-/g, " "), "h2", { margin: 0, color: "#0f172a", fontSize: "38px", textAlign: "center" }),
        text("subtitle") ? inline("subtitle", "", "p", { color: "#64748b", textAlign: "center", fontSize: "17px" }) : null,
        cards(items, body)
      ] });
    }
    case "pricing": {
      const plans = localized(node, locale, "plans", []);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        inline("title", "Simple pricing", "h2", { margin: 0, color: "#0f172a", fontSize: "38px", textAlign: "center" }),
        cards(plans.map((plan) => ({
          ...plan,
          title: `${plan.name || "Plan"} \u2014 $${plan.price || 0}/${plan.period || "month"}`,
          description: plan.features
        })))
      ] });
    }
    case "faq":
    case "accordion": {
      const items = localized(node, locale, "items", []);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        inline("title", "Frequently asked questions", "h2", { marginTop: 0, color: "#0f172a", fontSize: "36px" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gap: "10px" }, children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { style: { padding: "16px 18px", border: "1px solid #e2e8f0", borderRadius: "12px", background: "#fff" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { style: { cursor: "pointer", fontWeight: 700, color: "#0f172a" }, children: item.question || item.title || `Item ${index + 1}` }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { color: "#64748b", lineHeight: 1.7 }, children: item.answer || item.content })
        ] }, item.id || index)) })
      ] });
    }
    case "cta":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "56px 32px", borderRadius: "22px", textAlign: "center", color: "#fff", background: props.background || "linear-gradient(135deg,#1d4ed8,#7c3aed)" }, children: [
        inline("title", "Ready to get started?", "h2", { margin: 0, fontSize: "40px" }),
        inline("subtitle", "Take the next step today.", "p", { color: "#dbeafe", fontSize: "17px" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: buttonStyle({ ...node, props: { color: "#0f172a", size: "lg" } }), children: inline("primaryButtonText", "Get Started", "span") })
      ] });
    case "contact":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { maxWidth: "760px", margin: "0 auto" }, children: [
        inline("title", "Contact us", "h2", { color: "#0f172a", fontSize: "38px" }),
        inline("subtitle", "Tell us how we can help.", "p", { color: "#64748b" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", gap: "12px", marginTop: "22px" }, children: [
          (props.fields || [{ placeholder: "Your name" }, { placeholder: "Email address" }, { placeholder: "How can we help?" }]).map((field, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { readOnly: true, placeholder: field.placeholder || field.name, style: { height: "48px", padding: "0 14px", border: "1px solid #cbd5e1", borderRadius: "10px" } }, field.id || index)),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", style: { height: "48px", border: 0, borderRadius: "10px", background: "#2563eb", color: "#fff", fontWeight: 700 }, children: text("submitText", "Send Message") })
        ] })
      ] });
    case "newsletter":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "48px 28px", borderRadius: "20px", background: "#0f172a", color: "#fff", textAlign: "center" }, children: [
        inline("title", "Stay in the loop", "h2", { margin: 0, fontSize: "36px" }),
        inline("subtitle", "Get useful updates delivered to your inbox.", "p", { color: "#94a3b8" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", maxWidth: "520px", margin: "24px auto 0", gap: "10px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { readOnly: true, placeholder: text("placeholder", "you@example.com"), style: { flex: 1, height: "48px", borderRadius: "10px", border: "1px solid #334155", background: "#111827", color: "#fff", padding: "0 14px" } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", style: { padding: "0 20px", border: 0, borderRadius: "10px", background: "#2563eb", color: "#fff", fontWeight: 700 }, children: text("buttonText", "Subscribe") })
        ] })
      ] });
    case "input":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "grid", gap: "7px", color: "#334155", fontWeight: 600 }, children: [
        inline("label", "Name", "span"),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { readOnly: true, required: !!props.required, placeholder: text("placeholder", "Enter a value"), style: { height: "46px", padding: "0 13px", border: "1px solid #cbd5e1", borderRadius: "9px", fontSize: "15px" } })
      ] });
    case "textarea-field":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "grid", gap: "7px", color: "#334155", fontWeight: 600 }, children: [
        inline("label", "Message", "span"),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { readOnly: true, rows: props.rows || 5, placeholder: text("placeholder", "Enter your message"), style: { padding: "12px 13px", border: "1px solid #cbd5e1", borderRadius: "9px", fontSize: "15px", resize: "vertical" } })
      ] });
    case "checkbox":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "inline-flex", alignItems: "center", gap: "9px", color: "#334155", fontWeight: 600 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", readOnly: true, checked: !!props.checked }),
        inline("label", "I agree", "span")
      ] });
    case "select-field":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "grid", gap: "7px", color: "#334155", fontWeight: 600 }, children: [
        inline("label", "Choose an option", "span"),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { disabled: true, style: { height: "46px", padding: "0 13px", border: "1px solid #cbd5e1", borderRadius: "9px", background: "#fff" }, children: String(text("options", "First option, Second option")).split(",").map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: option.trim() }, option.trim())) })
      ] });
    case "slider": {
      const slides = localized(node, locale, "slides", []);
      const slide = slides[0] || {};
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { minHeight: "340px", padding: "42px", borderRadius: "18px", display: "grid", alignContent: "end", color: "#fff", background: slide.image ? `linear-gradient(transparent,rgba(15,23,42,.8)),url(${slide.image}) center/cover` : "linear-gradient(135deg,#0f172a,#334155)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: { margin: 0, fontSize: "38px" }, children: slide.title || "Slider" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { color: "#cbd5e1" }, children: slide.description || "Add slides in the Inspector." })
      ] });
    }
    case "embed":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: `${props.height || 420}px`, border: "1px dashed #94a3b8", borderRadius: "14px", display: "grid", placeItems: "center", textAlign: "center", color: "#64748b", background: "#f8fafc" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: text("title", "Embedded content") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: "6px", fontSize: "12px" }, children: props.url || "Add an embed URL" })
      ] }) });
    case "code":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { style: { margin: 0, padding: "22px", overflow: "auto", borderRadius: "12px", background: "#020617", color: "#cbd5e1", fontSize: "13px", lineHeight: 1.7 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: props.code || "// Add code" }) });
    case "dynamic":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "18px", borderRadius: "10px", background: "#eef2ff", color: "#3730a3" }, children: [
        text("fallback", "Dynamic content"),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "5px", fontSize: "10px", opacity: 0.65 }, children: [
          props.source || "Data source",
          " \u2192 ",
          props.path || "value.path"
        ] })
      ] });
    case "map":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: `${props.height || 420}px`, borderRadius: "16px", display: "grid", placeItems: "center", background: "#e2e8f0", color: "#64748b" }, children: text("address", "Add a map address") });
    case "spacer":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: `${props.height || 64}px` } });
    case "divider":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { style: { border: 0, borderTop: `1px ${props.style || "solid"} ${props.color || "#cbd5e1"}`, margin: `${props.margin || 24}px 0` } });
    case "html":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: cleanHtml(props.code) } });
    case "footer":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { style: { padding: "32px", borderRadius: "16px", textAlign: "center", background: "#0f172a", color: "#cbd5e1" }, children: inline("copyright", "\xA9 Your Company", "span") });
    case "custom-react":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "28px", border: "1px dashed #94a3b8", borderRadius: "14px", textAlign: "center", background: "#f8fafc", color: "#475569" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: props.componentId || "Custom React Component" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "12px", marginTop: "6px" }, children: "Registered runtime component slot" })
      ] });
    default:
      return children || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "24px", border: "1px dashed #cbd5e1", borderRadius: "12px", color: "#64748b" }, children: [
        "Configure ",
        node.label || node.type
      ] });
  }
}
function NodeFrame({
  node,
  mode,
  selected,
  hovered,
  onSelect,
  onHover,
  onMove,
  onInsert,
  onCommand,
  onResize,
  onRelocate,
  onRelocateNode,
  responsiveMode,
  children
}) {
  const [insertPosition, setInsertPosition] = (0, import_react.useState)(null);
  const [insertType, setInsertType] = (0, import_react.useState)("paragraph");
  const [insertText, setInsertText] = (0, import_react.useState)("");
  const [insertUrl, setInsertUrl] = (0, import_react.useState)("");
  const [insertAlt, setInsertAlt] = (0, import_react.useState)("");
  const [dropPosition, setDropPosition] = (0, import_react.useState)(null);
  const [resizePreview, setResizePreview] = (0, import_react.useState)(null);
  const dragCleanup = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => () => dragCleanup.current?.(), []);
  if (node.hidden && mode !== "edit") return null;
  const editable = mode === "edit";
  const responsiveVisible = node.props?.visibility?.[responsiveMode] !== false;
  const design = node.props?.design || {};
  const animation = node.metadata?.animation || {};
  const animationNames = {
    "fade-in": "rcms-fade-in",
    "slide-up": "rcms-slide-up",
    "scale-in": "rcms-scale-in",
    parallax: "rcms-slide-up"
  };
  const compactButton = node.type === "button";
  const horizontalPosition = compactButton && typeof node.props?.horizontalPosition === "number" && Number.isFinite(node.props.horizontalPosition) ? Math.max(0, Math.min(1, node.props.horizontalPosition)) : null;
  const offsetX = Number(node.props?.offsetX) || 0;
  const offsetY = Number(node.props?.offsetY) || 0;
  const shellStyle = {
    position: "relative",
    display: node.hidden ? "none" : compactButton && horizontalPosition === null ? "inline-block" : "block",
    left: horizontalPosition !== null ? `${horizontalPosition * 100}%` : void 0,
    translate: horizontalPosition !== null ? `${-horizontalPosition * 100}% 0` : void 0,
    verticalAlign: compactButton ? "top" : void 0,
    width: resizePreview ? `${resizePreview.width}px` : compactButton ? "fit-content" : void 0,
    height: resizePreview ? `${resizePreview.height}px` : void 0,
    maxWidth: compactButton ? "100%" : void 0,
    marginLeft: horizontalPosition !== null ? 0 : compactButton && offsetX ? `${offsetX}px` : void 0,
    marginRight: horizontalPosition !== null ? 0 : void 0,
    marginTop: compactButton && offsetY ? `${offsetY}px` : void 0,
    background: compactButton ? "transparent" : design.background,
    padding: compactButton ? 0 : `${design.paddingY ?? (["spacer", "divider"].includes(node.type) ? 0 : 36)}px 24px`,
    opacity: responsiveVisible ? node.props?.opacity ?? 1 : 0.32,
    borderRadius: design.radius ? `${design.radius}px` : void 0,
    boxShadow: design.shadow && design.shadow !== "none" ? design.shadow : void 0,
    transform: design.transform || void 0,
    animationName: animationNames[animation.name],
    animationDuration: animation.name && animation.name !== "none" ? `${animation.duration || 400}ms` : void 0,
    animationDelay: animation.name && animation.name !== "none" ? `${animation.delay || 0}ms` : void 0,
    animationFillMode: animation.name && animation.name !== "none" ? "both" : void 0,
    outline: selected ? "2px solid #2563eb" : hovered ? "2px solid rgba(37,99,235,.65)" : editable ? "1px solid transparent" : void 0,
    outlineOffset: selected || hovered ? "-2px" : void 0,
    transition: "outline-color 100ms ease, box-shadow 100ms ease",
    cursor: editable && compactButton ? "grab" : void 0,
    touchAction: editable && compactButton ? "none" : void 0
  };
  const determineDrop = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientY - rect.top) / Math.max(rect.height, 1);
    if (ratio < 0.25) return "before";
    if (ratio > 0.75) return "after";
    return ["section", "container", "grid", "flex", "columns"].includes(node.type) ? "inside" : "after";
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: shellStyle,
      "data-rcms-node": node.id,
      "data-rcms-type": node.type,
      "data-rcms-selected": selected ? "true" : void 0,
      "data-rcms-responsive-hidden": !responsiveVisible ? "true" : void 0,
      "aria-label": node.metadata?.accessibility?.ariaLabel,
      role: node.metadata?.accessibility?.role,
      tabIndex: node.metadata?.accessibility?.tabIndex,
      draggable: editable && !node.locked && !compactButton,
      onPointerDown: (event) => {
        if (!editable || !compactButton || node.locked || event.button !== 0) return;
        const target = event.target;
        if (target.closest('button,input,textarea,select,[contenteditable="true"],[data-rcms-resize-handle]')) return;
        event.preventDefault();
        event.stopPropagation();
        onSelect?.(node.id, event.metaKey || event.ctrlKey || event.shiftKey);
        dragCleanup.current?.();
        dragCleanup.current = startButtonDrag(event.currentTarget, event, (destination) => {
          if (destination.nodeId) onRelocateNode?.(destination.nodeId, destination.position, destination.horizontalPosition);
          else if (destination.regionId) onRelocate?.(destination.regionId, destination.position, destination.horizontalPosition);
        });
      },
      onDragStart: (event) => {
        event.stopPropagation();
        if (compactButton) {
          event.preventDefault();
          return;
        }
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("application/reactcms-node", node.id);
      },
      onDragOver: (event) => {
        if (!editable) return;
        event.preventDefault();
        event.stopPropagation();
        setDropPosition(determineDrop(event));
      },
      onDragLeave: () => setDropPosition(null),
      onDrop: (event) => {
        if (!editable) return;
        event.preventDefault();
        event.stopPropagation();
        const position = determineDrop(event);
        const sourceId = event.dataTransfer.getData("application/reactcms-node");
        const componentType = event.dataTransfer.getData("application/reactcms-component");
        setDropPosition(null);
        if (sourceId && sourceId !== node.id) onMove?.(sourceId, node.id, position);
        if (componentType) onInsert?.(componentType, node.id, position);
      },
      onMouseEnter: (event) => {
        event.stopPropagation();
        if (editable) onHover?.(node.id);
      },
      onMouseLeave: (event) => {
        event.stopPropagation();
        if (editable) onHover?.(null);
      },
      onClick: (event) => {
        if (!editable) return;
        event.preventDefault();
        event.stopPropagation();
        onSelect?.(node.id, event.metaKey || event.ctrlKey || event.shiftKey);
      },
      children: [
        dropPosition && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
          position: "absolute",
          zIndex: 1e3,
          pointerEvents: "none",
          left: dropPosition === "inside" ? "8px" : 0,
          right: dropPosition === "inside" ? "8px" : 0,
          top: dropPosition === "before" ? "-2px" : dropPosition === "inside" ? "8px" : void 0,
          bottom: dropPosition === "after" ? "-2px" : dropPosition === "inside" ? "8px" : void 0,
          height: dropPosition === "inside" ? "auto" : "4px",
          border: dropPosition === "inside" ? "2px solid #2563eb" : 0,
          background: dropPosition === "inside" ? "rgba(37,99,235,.08)" : "#2563eb",
          borderRadius: "4px"
        } }),
        selected && editable && compactButton && !node.locked && onResize && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            "data-rcms-resize-handle": "true",
            title: "Drag to resize button",
            "aria-label": "Resize button",
            onMouseDown: (event) => {
              event.preventDefault();
              event.stopPropagation();
              const frame = event.currentTarget.parentElement;
              if (!frame) return;
              const rect = frame.getBoundingClientRect();
              const startX = event.clientX;
              const startY = event.clientY;
              const startWidth = rect.width;
              const startHeight = rect.height;
              const padding = 0;
              const handleMove = (moveEvent) => {
                setResizePreview({
                  width: Math.max(72, startWidth + moveEvent.clientX - startX),
                  height: Math.max(36, startHeight + moveEvent.clientY - startY)
                });
              };
              const handleUp = (upEvent) => {
                const width = Math.round(Math.max(60, startWidth + upEvent.clientX - startX - padding));
                const height = Math.round(Math.max(28, startHeight + upEvent.clientY - startY - padding));
                window.removeEventListener("mousemove", handleMove);
                window.removeEventListener("mouseup", handleUp);
                setResizePreview(null);
                onResize(width, height);
              };
              window.addEventListener("mousemove", handleMove);
              window.addEventListener("mouseup", handleUp);
            },
            style: {
              position: "absolute",
              zIndex: 1100,
              right: "-5px",
              bottom: "-5px",
              width: "13px",
              height: "13px",
              border: "2px solid #fff",
              borderRadius: "3px",
              background: "#2563eb",
              boxShadow: "0 2px 8px rgba(15,23,42,.35)",
              cursor: "nwse-resize"
            }
          }
        ),
        (hovered || selected) && editable && onInsert && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
          ["before", { top: "-13px" }],
          ["after", { bottom: "-13px" }]
        ].map(([position, placement]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            "data-rcms-add-section": position,
            onClick: (event) => {
              event.preventDefault();
              event.stopPropagation();
              setInsertPosition(position);
            },
            style: {
              position: "absolute",
              zIndex: 1050,
              left: "50%",
              transform: "translateX(-50%)",
              height: "26px",
              padding: "0 10px",
              border: "1px solid #60a5fa",
              borderRadius: "999px",
              background: "#2563eb",
              color: "#fff",
              boxShadow: "0 6px 20px rgba(37,99,235,.3)",
              cursor: "pointer",
              font: "700 9px Inter,system-ui,sans-serif",
              ...placement
            },
            children: "+ Add section"
          },
          position
        )) }),
        insertPosition && editable && onInsert && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Add content",
            onClick: (event) => event.stopPropagation(),
            style: {
              position: "fixed",
              zIndex: 5e3,
              inset: 0,
              display: "grid",
              placeItems: "center",
              padding: "20px",
              background: "rgba(2,6,23,.72)",
              backdropFilter: "blur(5px)"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "form",
              {
                onSubmit: (event) => {
                  event.preventDefault();
                  const url = insertUrl.trim();
                  const value = insertText.trim();
                  if (insertType === "paragraph" && !value) return;
                  if (insertType !== "paragraph" && !url) return;
                  onInsert(
                    insertType,
                    node.id,
                    insertPosition,
                    insertType === "paragraph" ? { localized: { text: `<p>${value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />")}</p>` } } : insertType === "image" ? { props: { src: url, width: "100%", height: "auto", objectFit: "cover" }, localized: { alt: insertAlt.trim() } } : { props: { url, controls: true }, localized: { caption: insertAlt.trim() } }
                  );
                  setInsertPosition(null);
                  setInsertText("");
                  setInsertUrl("");
                  setInsertAlt("");
                },
                style: {
                  width: "min(520px, 100%)",
                  padding: "22px",
                  border: "1px solid #334155",
                  borderRadius: "18px",
                  background: "#0f172a",
                  color: "#f8fafc",
                  boxShadow: "0 28px 80px rgba(0,0,0,.5)",
                  font: "500 14px Inter,system-ui,sans-serif"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "18px", fontWeight: 800 }, children: "Add content" }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "4px", color: "#94a3b8", fontSize: "12px" }, children: [
                        "It will be inserted ",
                        insertPosition,
                        " this section."
                      ] })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", "aria-label": "Close", onClick: () => setInsertPosition(null), style: { width: "32px", height: "32px", border: 0, borderRadius: "8px", background: "#1e293b", color: "#cbd5e1", cursor: "pointer", fontSize: "18px" }, children: "\xD7" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", margin: "20px 0" }, children: ["paragraph", "image", "video"].map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: () => setInsertType(type),
                      style: {
                        height: "42px",
                        border: `1px solid ${insertType === type ? "#60a5fa" : "#334155"}`,
                        borderRadius: "10px",
                        background: insertType === type ? "#1d4ed8" : "#111827",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: 700,
                        textTransform: "capitalize"
                      },
                      children: type === "paragraph" ? "Text" : type
                    },
                    type
                  )) }),
                  insertType === "paragraph" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "grid", gap: "7px", color: "#cbd5e1", fontWeight: 700 }, children: [
                    "Text",
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { autoFocus: true, required: true, rows: 6, value: insertText, onChange: (event) => setInsertText(event.target.value), placeholder: "Write the text to add to this page\u2026", style: { padding: "12px 14px", border: "1px solid #334155", borderRadius: "10px", background: "#020617", color: "#f8fafc", font: "inherit", lineHeight: 1.6, resize: "vertical" } })
                  ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", gap: "14px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "grid", gap: "7px", color: "#cbd5e1", fontWeight: 700 }, children: [
                      insertType === "image" ? "Image URL" : "Video URL",
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { autoFocus: true, required: true, type: "url", value: insertUrl, onChange: (event) => setInsertUrl(event.target.value), placeholder: `https://example.com/${insertType === "image" ? "image.jpg" : "video.mp4"}`, style: { height: "44px", padding: "0 13px", border: "1px solid #334155", borderRadius: "10px", background: "#020617", color: "#f8fafc", font: "inherit" } })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "grid", gap: "7px", color: "#cbd5e1", fontWeight: 700 }, children: [
                      insertType === "image" ? "Alt text" : "Caption",
                      " ",
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#64748b", fontWeight: 500 }, children: "(optional)" }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { value: insertAlt, onChange: (event) => setInsertAlt(event.target.value), style: { height: "44px", padding: "0 13px", border: "1px solid #334155", borderRadius: "10px", background: "#020617", color: "#f8fafc", font: "inherit" } })
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "flex-end", gap: "9px", marginTop: "22px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => setInsertPosition(null), style: { height: "40px", padding: "0 16px", border: "1px solid #334155", borderRadius: "10px", background: "transparent", color: "#cbd5e1", cursor: "pointer", fontWeight: 700 }, children: "Cancel" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "submit", style: { height: "40px", padding: "0 18px", border: 0, borderRadius: "10px", background: "#2563eb", color: "#fff", cursor: "pointer", fontWeight: 800 }, children: "Add to page" })
                  ] })
                ]
              }
            )
          }
        ),
        selected && editable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            "data-rcms-toolbar": "true",
            style: {
              position: "absolute",
              zIndex: 1100,
              top: "-34px",
              right: "6px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              padding: "3px",
              borderRadius: "8px",
              background: "#0f172a",
              color: "#cbd5e1",
              boxShadow: "0 8px 24px rgba(15,23,42,.35)",
              font: "700 10px Inter,system-ui,sans-serif"
            },
            onClick: (event) => event.stopPropagation(),
            draggable: false,
            children: [
              ["move-up", "\u2191"],
              ["move-down", "\u2193"],
              ["duplicate", "Duplicate"],
              ["copy", "Copy"],
              ["paste", "Paste"],
              ["delete", "Delete"]
            ].map(([command, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: () => onCommand?.(command, node.id),
                style: {
                  height: "24px",
                  border: 0,
                  borderRadius: "5px",
                  padding: "0 7px",
                  background: "transparent",
                  color: command === "delete" ? "#fda4af" : "#cbd5e1",
                  cursor: "pointer",
                  font: "inherit"
                },
                children: label
              },
              command
            ))
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "100%", maxWidth: `${design.maxWidth || 1120}px`, margin: "0 auto" }, children })
      ]
    }
  );
}
function RenderNode({
  node,
  renderer
}) {
  const {
    locale,
    responsiveMode,
    mode,
    selectedIds = [],
    hoveredId,
    registry = defaultComponentRegistry,
    onMutation
  } = renderer;
  const selected = selectedIds.includes(node.id);
  if (node.props?.visibility?.[responsiveMode] === false && mode !== "edit") return null;
  const mutate = (path, value) => {
    onMutation?.({ nodeId: node.id, path, value });
  };
  const childNodes = (node.children || []).map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderNode, { node: child, renderer }, child.id));
  const Registered = registry.get(node.type);
  const componentProps = {
    node,
    locale,
    responsiveMode,
    mode,
    children: childNodes,
    mutate
  };
  const content = Registered ? (0, import_react.createElement)(Registered, componentProps) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    BuiltinComponent,
    {
      node,
      locale,
      mode,
      responsiveMode,
      selected,
      mutate,
      children: childNodes
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    NodeFrame,
    {
      node,
      mode,
      selected,
      hovered: hoveredId === node.id,
      onSelect: renderer.onSelect,
      onHover: renderer.onHover,
      onMove: renderer.onMove,
      onInsert: renderer.onInsert,
      onCommand: renderer.onCommand,
      onResize: (width, height) => {
        onMutation?.({
          nodeId: node.id,
          path: ["props"],
          value: { ...node.props || {}, width: `${width}px`, height: `${height}px` }
        });
      },
      onRelocate: (anchorRegionId, position, horizontalPosition) => {
        onMutation?.({
          nodeId: node.id,
          path: [],
          value: {
            ...node,
            props: { ...node.props || {}, offsetX: 0, offsetY: 0, horizontalPosition },
            metadata: {
              ...node.metadata || {},
              runtimePlacement: { anchorRegionId, position }
            }
          }
        });
      },
      onRelocateNode: (targetNodeId, position, horizontalPosition) => {
        renderer.onMove?.(node.id, targetNodeId, position, horizontalPosition);
      },
      responsiveMode,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: node.type === "button" ? { ...responsiveStyle(node, responsiveMode), width: "fit-content", maxWidth: "100%" } : responsiveStyle(node, responsiveMode), children: content })
    }
  );
}
function RuntimeRenderer({
  tree,
  locale = tree.locale || "en",
  responsiveMode = "desktop",
  mode = "runtime",
  theme = null,
  transparentBackground = false,
  ...callbacks
}) {
  const renderer = (0, import_react.useMemo)(() => ({
    locale,
    responsiveMode,
    mode,
    ...callbacks
  }), [callbacks, locale, mode, responsiveMode]);
  const themeStyle = {
    "--rcms-color-primary": theme?.colors?.primary || "#2563eb",
    "--rcms-color-secondary": theme?.colors?.secondary || "#1e293b",
    "--rcms-color-accent": theme?.colors?.accent || "#f59e0b",
    "--rcms-color-background": theme?.colors?.background || "#ffffff",
    "--rcms-color-text": theme?.colors?.text || "#0f172a",
    "--rcms-button-radius": theme?.buttons?.borderRadius || "10px",
    "--rcms-button-weight": theme?.buttons?.fontWeight || "700",
    width: "100%",
    minHeight: transparentBackground ? void 0 : "100%",
    color: "var(--rcms-color-text)",
    background: transparentBackground ? "transparent" : "var(--rcms-color-background)",
    fontFamily: theme?.typography?.bodyFont || "Inter, system-ui, sans-serif",
    fontSize: theme?.typography?.baseSize || "16px",
    ...responsiveStyle({ id: tree.id, type: "page", styles: tree.styles }, responsiveMode)
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      "data-rcms-page-tree": tree.id,
      "data-rcms-renderer-version": "2",
      style: themeStyle,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes rcms-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes rcms-slide-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rcms-scale-in { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }
      ` }),
        (tree.children || []).map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderNode, { node, renderer }, node.id))
      ]
    }
  );
}
function setAtPath(source, path, value) {
  if (!path.length) return value;
  const [head, ...tail] = path;
  const container = Array.isArray(source) ? [...source] : { ...source || {} };
  container[head] = setAtPath(container[head], tail, value);
  return container;
}
function mutateTreeNode(nodes, nodeId, path, value) {
  return nodes.map((node) => {
    if (node.id === nodeId) return setAtPath(node, path, value);
    if (!node.children?.length) return node;
    return { ...node, children: mutateTreeNode(node.children, nodeId, path, value) };
  });
}
var RuntimeRendererEngine = class {
  renderPage(tree, options = {}) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeRenderer, { tree, ...options });
  }
  renderTree(tree, options = {}) {
    return this.renderPage(tree, options);
  }
  renderComponent(node, options = {}) {
    const tree = { id: `component_${node.id}`, type: "page", version: 2, children: [node] };
    return this.renderPage(tree, options);
  }
  renderRegion(node, options = {}) {
    return this.renderComponent(node, options);
  }
  updateRegion(tree, nodeId, path, value) {
    return { ...tree, children: mutateTreeNode(tree.children, nodeId, path, value) };
  }
  rerender(tree) {
    return { ...tree, children: [...tree.children] };
  }
};

// src/treeConversion.ts
var RUNTIME_ADDITIONS_REGION = "__rcms_runtime_additions__";
function createRuntimeAdditionsTree(pageId = "page", locale = "en") {
  return {
    id: `runtime_additions_${String(pageId || "page").replace(/[^a-zA-Z0-9_-]/g, "_")}`,
    type: "page",
    version: 2,
    title: "Runtime additions",
    locale,
    children: [],
    metadata: {
      supplemental: true,
      placement: "before-footer"
    }
  };
}
function labelFromType(type) {
  return type.split(/[-_]/g).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function inferRegionNode(regionId, value, locale = "en") {
  const clean = regionId.toLowerCase();
  const definition = value && typeof value === "object" && value.id && value.type ? value : null;
  const actualValue = definition ? definition.defaultValue ?? definition.value ?? "" : value;
  const declaredType = String(definition?.type || "").toLowerCase();
  let type = "paragraph";
  let props = {
    locales: {
      [locale]: {
        text: typeof actualValue === "string" ? actualValue : actualValue?.text ?? JSON.stringify(actualValue)
      }
    }
  };
  if (declaredType === "section" || declaredType === "container") {
    type = declaredType;
    props = {
      design: typeof actualValue === "object" ? actualValue : {}
    };
  } else if (declaredType === "image" || clean.includes("image") || clean.includes("logo") || actualValue?.src) {
    type = "image";
    props = {
      src: actualValue?.src ?? actualValue ?? "",
      width: actualValue?.width,
      height: actualValue?.height,
      objectFit: actualValue?.objectFit,
      locales: {
        [locale]: {
          alt: actualValue?.alt ?? definition?.label ?? labelFromType(regionId)
        }
      }
    };
  } else if (declaredType === "button" || clean.includes("button") || clean.includes("cta") || actualValue?.href) {
    type = "button";
    props = {
      url: actualValue?.href ?? actualValue?.url ?? "#",
      color: actualValue?.color ?? "#2563eb",
      locales: {
        [locale]: {
          label: actualValue?.text ?? actualValue?.label ?? actualValue ?? "Learn More"
        }
      }
    };
  } else if (declaredType === "video") {
    type = "video";
    props = {
      url: actualValue?.url ?? actualValue?.src ?? actualValue ?? "",
      poster: actualValue?.poster,
      controls: actualValue?.controls ?? true
    };
  } else if (declaredType === "repeater" && Array.isArray(actualValue)) {
    type = "cards";
    props = {
      locales: {
        [locale]: {
          title: definition?.label || labelFromType(regionId),
          cards: actualValue
        }
      }
    };
  } else if (declaredType === "heading" || clean.includes("heading") || clean.includes("title")) {
    type = "heading";
    props = {
      locales: {
        [locale]: {
          text: actualValue?.text ?? actualValue ?? ""
        }
      },
      level: actualValue?.level || "h2"
    };
  }
  return {
    id: `region_${regionId.replace(/[^a-zA-Z0-9_-]/g, "_")}`,
    type,
    label: definition?.label || labelFromType(regionId),
    props,
    children: [],
    metadata: {
      regionId,
      ...definition ? { regionDefinition: definition } : {}
    }
  };
}
function blockToComponentNode(block) {
  const { id, type, children, ...props } = block;
  return {
    id: id || `node_${Math.random().toString(36).slice(2, 10)}`,
    type: type || "container",
    label: block.label || labelFromType(type || "container"),
    props,
    children: Array.isArray(children) ? children.map(blockToComponentNode) : [],
    hidden: !!block.hidden,
    locked: !!block.locked,
    metadata: block.metadata || {}
  };
}
function blocksToPageTree(blocks = [], options = {}) {
  return {
    id: options.id || "page",
    type: "page",
    version: 2,
    title: options.title,
    locale: options.locale || "en",
    children: blocks.map(blockToComponentNode),
    metadata: { migratedFrom: "blocks" }
  };
}
function componentNodeToBlock(node) {
  return {
    id: node.id,
    type: node.type,
    ...node.props || {},
    ...node.children?.length ? { children: node.children.map(componentNodeToBlock) } : {},
    ...node.hidden ? { hidden: true } : {},
    ...node.locked ? { locked: true } : {},
    ...node.metadata && Object.keys(node.metadata).length ? { metadata: node.metadata } : {}
  };
}
function pageTreeToBlocks(tree) {
  return (tree.children || []).map(componentNodeToBlock);
}
function regionsToPageTree(regions, options = {}) {
  const locale = options.locale || "en";
  const regionNodes = Object.entries(regions || {}).map(([id, value]) => inferRegionNode(id, value, locale));
  return {
    id: options.id || "page",
    type: "page",
    version: 2,
    title: options.title,
    locale,
    children: regionNodes.length ? [{
      id: "imported_content",
      type: "section",
      label: "Imported Content",
      props: {
        design: { paddingY: 64, maxWidth: 1120, background: "#ffffff" }
      },
      children: regionNodes,
      metadata: { migratedFrom: "editable-regions" }
    }] : [],
    metadata: { migratedFrom: "editable-regions" }
  };
}
function isPageComponentTree(value) {
  if (!value || typeof value !== "object") return false;
  const tree = value;
  return tree.type === "page" && tree.version === 2 && Array.isArray(tree.children);
}
//# sourceMappingURL=index.js.map