"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useMemo } from "react";
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
  const isInteractive = activeGridId === parentId;
  const someChildIsActiveInner = activeGridId !== null && activeGridId !== parentId && components.some((c) => c.id === activeGridId);
  const generateLayout = (bp) => {
    return components.map((comp) => {
      let l = comp.layout?.[bp];
      if (!l) {
        l = { x: 0, y: 0, w: 24, h: 4 };
      } else if (l.w === 12 && l.x === 0) {
        l = { ...l, w: 24 };
      }
      const isEditingInternally = comp.id === activeGridId;
      return {
        i: comp.id,
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
        minW: 2,
        minH: 1,
        static: isEditingInternally || !isInteractive
      };
    });
  };
  const layouts = useMemo(() => ({
    desktop: generateLayout("desktop"),
    tablet: generateLayout("tablet"),
    mobile: generateLayout("mobile")
  }), [components, activeGridId, isInteractive]);
  const handleLayoutChange = (currentLayout, allLayouts) => {
    if (onLayoutChange) {
      if (parentId) {
        onLayoutChange(parentId, allLayouts);
      } else {
        onLayoutChange(allLayouts);
      }
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "w-full h-full relative",
      style: { minHeight: "800px" },
      onDoubleClick: (e) => {
        if (e.target === e.currentTarget && activeGridId) {
          setActiveGridId(null);
        }
      },
      children: [
        mounted && /* @__PURE__ */ jsx(
          ResponsiveGridLayout,
          {
            width,
            className: "layout",
            layouts,
            breakpoints: { desktop: 1024, tablet: 768, mobile: 0 },
            cols: { desktop: 24, tablet: 24, mobile: 12 },
            rowHeight: 30,
            onLayoutChange: handleLayoutChange,
            isDraggable: isInteractive && !someChildIsActiveInner,
            isResizable: isInteractive && !someChildIsActiveInner,
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
              const isEditingInternally = comp.id === activeGridId;
              const isLockedByOther = someChildIsActiveInner && !isEditingInternally;
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  style: isEditingInternally ? { pointerEvents: "none" } : {},
                  className: `relative group bg-transparent transition-all
                ${isEditingInternally ? "ring-2 ring-accent/40 ring-inset z-30" : isLockedByOther ? "opacity-40 z-10" : isSelected ? "ring-4 ring-accent ring-inset z-30" : "hover:ring-2 hover:ring-accent/40 hover:ring-inset z-20 border border-dashed border-border"}
              `,
                  onClick: (e) => {
                    e.stopPropagation();
                    if (!isInteractive || isEditingInternally || isLockedByOther) return;
                    const fieldElement = e.target.closest("[data-field]");
                    const fieldKey = fieldElement ? fieldElement.getAttribute("data-field") : null;
                    onSelectComponent(comp.id, fieldKey);
                  },
                  onDoubleClick: (e) => {
                    e.stopPropagation();
                    if (isInteractive && !isEditingInternally) {
                      setActiveGridId(comp.id);
                    }
                  },
                  children: [
                    isSelected && !isEditingInternally && /* @__PURE__ */ jsx("div", { className: "absolute bottom-full left-0 mb-1 bg-accent text-bg text-[10px] font-bold px-3 py-1 rounded-t-md shadow-lg z-[100] pointer-events-none uppercase tracking-wider", children: "Editando" }),
                    isEditingInternally && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-full left-0 mb-1 bg-accent/80 text-bg text-[10px] font-bold px-3 py-1 rounded-t-md shadow-lg z-[100] pointer-events-none uppercase tracking-wider flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-bg animate-pulse" }),
                      "Editando internamente \u2014 Esc o clic fuera para salir"
                    ] }),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w-full h-full overflow-hidden",
                        style: isEditingInternally ? { pointerEvents: "all" } : {},
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
        ),
        someChildIsActiveInner && /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 z-0",
            style: { pointerEvents: "all" },
            onClick: (e) => {
              if (e.target === e.currentTarget) {
                setActiveGridId(parentId);
              }
            },
            onKeyDown: (e) => {
              if (e.key === "Escape") setActiveGridId(parentId);
            },
            tabIndex: -1
          }
        )
      ]
    }
  );
}
