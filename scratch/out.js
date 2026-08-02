"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useMemo, useEffect, useRef } from "react";
import { ResponsiveGridLayout, useContainerWidth } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
export default function GridEditor({
  components,
  onLayoutChange,
  forceBp = "desktop",
  onSelectComponent,
  selectedId,
  parentId = null,
  activeGridId = null,
  setActiveGridId = () => {
  },
  registry = {},
  onUpdateProp = null
}) {
  const { width, containerRef, mounted } = useContainerWidth();
  const wrapperRef = useRef(null);
  const isInteractive = activeGridId === parentId;
  const activeChildId = activeGridId !== null && activeGridId !== parentId ? components.find((c) => c.id === activeGridId)?.id ?? null : null;
  useEffect(() => {
    if (!activeChildId) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setActiveGridId(parentId);
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [activeChildId, parentId, setActiveGridId]);
  useEffect(() => {
    if (!activeChildId) return;
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setActiveGridId(parentId);
      }
    };
    const t = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside, true);
    }, 200);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [activeChildId, parentId, setActiveGridId]);
  const generateLayout = (bp) => {
    return components.map((comp) => {
      let l = comp.layout?.[bp];
      if (!l) {
        l = { x: 0, y: 0, w: 24, h: 4 };
      }
      return {
        i: comp.id,
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
        minW: 2,
        minH: 1
      };
    });
  };
  const layouts = useMemo(() => ({
    desktop: generateLayout("desktop"),
    tablet: generateLayout("tablet"),
    mobile: generateLayout("mobile")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [components]);
  const handleLayoutChange = (currentLayout, allLayouts) => {
    if (onLayoutChange) {
      if (parentId) {
        onLayoutChange(parentId, allLayouts);
      } else {
        onLayoutChange(allLayouts);
      }
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: (el) => {
        containerRef.current = el;
        wrapperRef.current = el;
      },
      className: "w-full h-full relative",
      style: { minHeight: "800px" },
      children: mounted && /* @__PURE__ */ jsx(
        ResponsiveGridLayout,
        {
          width,
          className: "layout",
          layouts,
          breakpoints: { desktop: 1024, tablet: 768, mobile: 0 },
          cols: { desktop: 24, tablet: 24, mobile: 12 },
          rowHeight: 30,
          onLayoutChange: handleLayoutChange,
          isDraggable: isInteractive && !activeChildId,
          isResizable: isInteractive && !activeChildId,
          useCSSTransforms: true,
          compactType: null,
          preventCollision: false,
          draggableCancel: ".no-drag, input, textarea, button, select, a, [contenteditable]",
          children: components.map((comp) => {
            const ComponentToRender = registry[comp.type] || (() => /* @__PURE__ */ jsxs("div", { children: [
              "Componente ",
              comp.type,
              " no encontrado"
            ] }));
            const isSelected = comp.id === selectedId;
            const isEditingInternally = comp.id === activeChildId;
            const isLockedByOther = !!activeChildId && !isEditingInternally;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                style: isEditingInternally ? { pointerEvents: "none" } : {},
                className: `relative group bg-transparent transition-opacity duration-150
                ${isLockedByOther ? "opacity-30 pointer-events-none" : "opacity-100"}
                ${isEditingInternally ? "ring-2 ring-accent/50 ring-inset z-30" : isSelected && !activeChildId ? "ring-4 ring-accent ring-inset z-30" : !isEditingInternally && !activeChildId ? "hover:ring-2 hover:ring-accent/40 hover:ring-inset z-20 border border-dashed border-border" : ""}
              `,
                onClick: (e) => {
                  if (!isInteractive || isEditingInternally || isLockedByOther) return;
                  e.stopPropagation();
                  const fieldElement = e.target.closest("[data-field]");
                  const fieldKey = fieldElement ? fieldElement.getAttribute("data-field") : null;
                  onSelectComponent(comp.id, fieldKey);
                },
                onDoubleClick: (e) => {
                  if (!isInteractive || isLockedByOther) return;
                  e.stopPropagation();
                  setActiveGridId(comp.id);
                },
                children: [
                  isSelected && !isEditingInternally && !activeChildId && /* @__PURE__ */ jsx("div", { className: "absolute bottom-full left-0 mb-1 bg-accent text-bg text-[10px] font-bold px-3 py-1 rounded-t-md shadow-lg z-[100] pointer-events-none uppercase tracking-wider", children: "Editando" }),
                  isEditingInternally && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-full left-0 mb-1 bg-accent/90 text-bg text-[10px] font-bold px-3 py-1 rounded-t-md shadow-lg z-[100] pointer-events-none uppercase tracking-wider flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-bg animate-pulse inline-block" }),
                    "Edici\xF3n interna \u2014 Esc o clic afuera para salir"
                  ] }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w-full h-full overflow-hidden",
                      style: isEditingInternally ? { pointerEvents: "auto" } : {},
                      onMouseDown: isEditingInternally ? (e) => e.stopPropagation() : void 0,
                      onTouchStart: isEditingInternally ? (e) => e.stopPropagation() : void 0,
                      children: /* @__PURE__ */ jsx(
                        ComponentToRender,
                        {
                          ...comp.props,
                          forceBp,
                          childrenComponents: comp.children,
                          id: comp.id,
                          onLayoutChange,
                          onSelectComponent,
                          selectedId,
                          activeGridId,
                          setActiveGridId,
                          registry,
                          onPropChange: onUpdateProp ? (field, value) => onUpdateProp(comp.id, field, value) : null
                        }
                      )
                    }
                  )
                ]
              },
              comp.id
            );
          })
        }
      )
    }
  );
}
