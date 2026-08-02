"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from "react";
import { ResponsiveGridLayout, useContainerWidth } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
function toInlineStyle(styleObj) {
  if (!styleObj) return {};
  const s = {};
  if (styleObj.fontSize) s.fontSize = `${styleObj.fontSize}px`;
  if (styleObj.color) s.color = styleObj.color;
  if (styleObj.fontWeight) s.fontWeight = styleObj.fontWeight;
  if (styleObj.fontStyle) s.fontStyle = styleObj.fontStyle;
  if (styleObj.fontFamily) s.fontFamily = styleObj.fontFamily;
  if (styleObj.textAlign) s.textAlign = styleObj.textAlign;
  if (styleObj.textDecoration) s.textDecoration = styleObj.textDecoration;
  if (styleObj.textTransform && styleObj.textTransform !== "none")
    s.textTransform = styleObj.textTransform;
  if (styleObj.letterSpacing !== void 0 && styleObj.letterSpacing !== "")
    s.letterSpacing = `${styleObj.letterSpacing}em`;
  if (styleObj.lineHeight !== void 0 && styleObj.lineHeight !== "")
    s.lineHeight = styleObj.lineHeight;
  if (styleObj.paddingTop !== void 0 && styleObj.paddingTop !== "")
    s.paddingTop = `${styleObj.paddingTop}px`;
  if (styleObj.paddingBottom !== void 0 && styleObj.paddingBottom !== "")
    s.paddingBottom = `${styleObj.paddingBottom}px`;
  return s;
}
const DEFAULT_INNER_LAYOUT = {
  avatar: { x: 0, y: 0, w: 4, h: 8 },
  title: { x: 4, y: 0, w: 8, h: 4 },
  description: { x: 4, y: 4, w: 8, h: 4 }
};
function InnerCanvas({ slots, layout, onLayoutChange, selectedSubId, setSelectedSubId, isEditorActive }) {
  const { width, containerRef, mounted } = useContainerWidth();
  const [hoveredId, setHoveredId] = useState(null);
  const rglLayout = Object.keys(layout).map((key) => ({
    i: key,
    x: layout[key].x,
    y: layout[key].y,
    w: layout[key].w,
    h: layout[key].h,
    minW: 1,
    minH: 1
  }));
  return /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w-full relative", style: { minHeight: "200px" }, children: mounted && /* @__PURE__ */ jsx(
    ResponsiveGridLayout,
    {
      width,
      className: "layout",
      layouts: { desktop: rglLayout, tablet: rglLayout, mobile: rglLayout },
      breakpoints: { desktop: 1024, tablet: 768, mobile: 0 },
      cols: { desktop: 12, tablet: 12, mobile: 12 },
      rowHeight: 24,
      isDraggable: isEditorActive,
      isResizable: isEditorActive,
      useCSSTransforms: true,
      compactType: null,
      preventCollision: false,
      onLayoutChange: (currentLayout) => {
        if (!onLayoutChange) return;
        const updated = {};
        currentLayout.forEach(({ i, x, y, w, h }) => {
          updated[i] = { x, y, w, h };
        });
        onLayoutChange(updated);
      },
      draggableCancel: ".no-drag, input, textarea, button, [contenteditable]",
      children: Object.keys(slots).map((key) => {
        const content = slots[key];
        if (!content) return null;
        const isSelected = selectedSubId === key;
        const isHovered = hoveredId === key && !isSelected;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative",
            style: { cursor: isEditorActive ? "grab" : "default" },
            onMouseEnter: () => isEditorActive && setHoveredId(key),
            onMouseLeave: () => setHoveredId(null),
            onClick: (e) => {
              if (!isEditorActive) return;
              e.stopPropagation();
              setSelectedSubId(isSelected ? null : key);
            },
            children: [
              isEditorActive && (isHovered || isSelected) && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `absolute inset-0 pointer-events-none z-10 transition-all duration-100
                      ${isSelected ? "ring-2 ring-accent ring-inset" : "ring-1 ring-dashed ring-accent/60 ring-inset"}`
                  }
                ),
                isHovered && !isSelected && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute top-1 left-0 right-0 h-px bg-accent/30 pointer-events-none z-10" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-1 left-0 right-0 h-px bg-accent/30 pointer-events-none z-10" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 bottom-0 left-1 w-px bg-accent/30 pointer-events-none z-10" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 bottom-0 right-1 w-px bg-accent/30 pointer-events-none z-10" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0.5 left-0.5 w-2.5 h-2.5 border-t border-l border-accent/70 pointer-events-none z-10" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0.5 right-0.5 w-2.5 h-2.5 border-t border-r border-accent/70 pointer-events-none z-10" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-0.5 left-0.5 w-2.5 h-2.5 border-b border-l border-accent/70 pointer-events-none z-10" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-0.5 right-0.5 w-2.5 h-2.5 border-b border-r border-accent/70 pointer-events-none z-10" })
                ] })
              ] }),
              isEditorActive && isSelected && /* @__PURE__ */ jsx("div", { className: "absolute bottom-full left-0 mb-0.5 bg-accent text-bg text-[9px] font-bold px-2 py-0.5 rounded-t z-[100] pointer-events-none uppercase tracking-wider", children: key }),
              /* @__PURE__ */ jsx("div", { className: "w-full h-full overflow-hidden flex items-center justify-center", children: content })
            ]
          },
          key
        );
      })
    }
  ) });
}
export default function AvatarTextSection({
  title,
  avatarSrc,
  avatarAlt,
  paragraphs,
  description,
  showAccentBar = true,
  _styles,
  forceBp = null,
  // Layout interno guardado: { avatar: {x,y,w,h}, title: {x,y,w,h}, description: {x,y,w,h} }
  innerLayout,
  // ── CMS / Editor props ──
  onPropChange = null,
  activeGridId = null,
  id = null
}) {
  const [bp, setBp] = useState(forceBp || "desktop");
  useEffect(() => {
    if (forceBp) {
      setBp(forceBp);
      return;
    }
    const check = () => {
      const w = window.innerWidth;
      setBp(w >= 1024 ? "desktop" : w >= 768 ? "tablet" : "mobile");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [forceBp]);
  const fieldStyle = (fieldName) => {
    if (!_styles || !_styles[fieldName]) return {};
    return toInlineStyle(_styles[fieldName][bp]);
  };
  const isEditorActive = typeof onPropChange === "function" && activeGridId === id;
  const isEditable = typeof onPropChange === "function";
  const [selectedSubId, setSelectedSubId] = useState(null);
  const currentInnerLayout = innerLayout || DEFAULT_INNER_LAYOUT;
  const handleInnerLayoutChange = useCallback((updatedLayout) => {
    onPropChange?.("innerLayout", updatedLayout);
  }, [onPropChange]);
  const bodyText = description !== void 0 ? description : paragraphs ? paragraphs.join("\n\n") : "";
  const editableOutline = isEditable ? {
    outline: "1.5px dashed rgba(250, 204, 21, 0.55)",
    outlineOffset: "3px",
    borderRadius: "2px",
    cursor: "text",
    minWidth: "2rem"
  } : {};
  const titleNode = title ? /* @__PURE__ */ jsx("div", { className: `w-full h-full flex items-center ${showAccentBar ? "border-l-[4px] border-accent pl-4" : ""}`, children: /* @__PURE__ */ jsx(
    "h2",
    {
      "data-field": "title",
      contentEditable: isEditable,
      suppressContentEditableWarning: true,
      onBlur: (e) => onPropChange?.("title", e.currentTarget.innerText),
      className: "font-display font-bold leading-tight text-white w-full",
      style: { textTransform: "none", ...fieldStyle("title"), ...isEditable ? editableOutline : {} },
      children: title
    }
  ) }) : null;
  const avatarNode = avatarSrc ? /* @__PURE__ */ jsx("div", { className: "relative w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,204,0,0.15)] w-full h-full max-w-[192px] max-h-[192px] mx-auto", children: /* @__PURE__ */ jsx(
    "img",
    {
      src: avatarSrc,
      alt: avatarAlt || "Avatar",
      className: "w-full h-full object-cover",
      "data-field": "avatarSrc"
    }
  ) }) }) : isEditable ? /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center border-2 border-dashed border-accent/30 rounded-lg text-muted text-xs", children: "Sin imagen" }) : null;
  const descNode = bodyText ? /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-start", children: /* @__PURE__ */ jsx(
    "p",
    {
      "data-field": "description",
      contentEditable: isEditable,
      suppressContentEditableWarning: true,
      onBlur: (e) => onPropChange?.("description", e.currentTarget.innerText),
      className: "font-body text-white/80 text-base leading-relaxed w-full",
      style: { whiteSpace: "pre-wrap", ...fieldStyle("description"), ...isEditable ? editableOutline : {} },
      children: bodyText
    }
  ) }) : null;
  if (isEditable) {
    const slots = {
      avatar: avatarNode,
      title: titleNode,
      description: descNode
    };
    return /* @__PURE__ */ jsxs("section", { className: "w-full relative", children: [
      !isEditorActive && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-transparent group-hover/cell:bg-black/5 pointer-events-none", children: /* @__PURE__ */ jsx("span", { className: "opacity-0 group-hover:opacity-100 text-[10px] text-muted bg-s1/80 px-2 py-1 rounded border border-border transition-opacity", children: "Doble clic para editar internamente" }) }),
      /* @__PURE__ */ jsx(
        InnerCanvas,
        {
          slots,
          layout: currentInnerLayout,
          onLayoutChange: handleInnerLayoutChange,
          selectedSubId,
          setSelectedSubId,
          isEditorActive
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("section", { className: "w-full flex flex-col gap-6", children: [
    title && /* @__PURE__ */ jsx("div", { className: showAccentBar ? "border-l-[5px] border-accent pl-5" : "", children: /* @__PURE__ */ jsx(
      "h2",
      {
        className: "font-display font-bold leading-[1.1] text-white max-w-3xl whitespace-pre-line",
        style: { textTransform: "none", ...fieldStyle("title") },
        children: title
      }
    ) }),
    avatarSrc && /* @__PURE__ */ jsx("div", { className: "flex justify-center my-8", children: /* @__PURE__ */ jsx("div", { className: "relative w-48 h-48 rounded-full overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,204,0,0.15)] transition-all duration-300 hover:scale-105", children: /* @__PURE__ */ jsx("img", { src: avatarSrc, alt: avatarAlt || "Avatar", className: "w-full h-full object-cover" }) }) }),
    bodyText && /* @__PURE__ */ jsx("div", { className: "w-full max-w-3xl", children: bodyText.split("\n").map((p, i) => {
      if (!p.trim()) return /* @__PURE__ */ jsx("br", {}, i);
      return /* @__PURE__ */ jsx("p", { className: "font-body text-white/80 text-lg md:text-xl leading-relaxed mb-6 last:mb-0", style: fieldStyle("description"), children: p }, i);
    }) })
  ] });
}
