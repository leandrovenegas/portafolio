# Graph Report - Z:\proyects\portafolio  (2026-07-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 339 nodes · 307 edges · 83 communities (69 shown, 14 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ce16596b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- route.ts
- route.ts
- polyfills.js
- page.ts
- layout.ts
- layout.ts
- treeHelpers.js
- edge-runtime-webpack.js
- webpack.js
- routes.d.ts
- routes.d.ts
- restore.js
- page.js
- process_diff2.js
- registry.js
- AvatarTextSection.jsx
- validator.ts
- validator.ts
- AvatarTextSection.js
- process_diff.js
- restore_lines_2.js
- do_recover.js
- do_recover2.js
- recover.js
- recover2.js
- recover3.js
- refactor_ui.js
- fix_syntax.js
- reconstruct.js
- refactor_activeGridId.js
- stitch.js
- package.json
- cache-life.d.ts
- package.json
- package.json
- supabase_pages_schema.sql

## God Nodes (most connected - your core abstractions)
1. `ib()` - 8 edges
2. `setStatus()` - 6 edges
3. `hotCheck()` - 6 edges
4. `setStatus()` - 6 edges
5. `hotCheck()` - 6 edges
6. `createModuleHotObject()` - 5 edges
7. `internalApply()` - 5 edges
8. `e()` - 5 edges
9. `createModuleHotObject()` - 5 edges
10. `internalApply()` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (83 total, 14 thin omitted)

### Community 0 - "route.ts"
Cohesion: 0.11
Nodes (16): Diff, FirstArg, LayoutProps, MaybeField, Negative, NonNegative, Numeric, OmitWithTag (+8 more)

### Community 1 - "route.ts"
Cohesion: 0.11
Nodes (16): Diff, FirstArg, LayoutProps, MaybeField, Negative, NonNegative, Numeric, OmitWithTag (+8 more)

### Community 2 - "polyfills.js"
Cohesion: 0.22
Nodes (9): e(), eb(), ib(), nb(), ob(), rb(), sb(), t() (+1 more)

### Community 3 - "page.ts"
Cohesion: 0.12
Nodes (14): Diff, FirstArg, LayoutProps, MaybeField, Negative, NonNegative, Numeric, OmitWithTag (+6 more)

### Community 4 - "layout.ts"
Cohesion: 0.12
Nodes (14): Diff, FirstArg, LayoutProps, MaybeField, Negative, NonNegative, Numeric, OmitWithTag (+6 more)

### Community 5 - "layout.ts"
Cohesion: 0.12
Nodes (14): Diff, FirstArg, LayoutProps, MaybeField, Negative, NonNegative, Numeric, OmitWithTag (+6 more)

### Community 6 - "treeHelpers.js"
Cohesion: 0.16
Nodes (4): extractComponent(), insertComponentIntoParent(), moveComponentInTree(), performMove()

### Community 7 - "edge-runtime-webpack.js"
Cohesion: 0.32
Nodes (12): applyHandler(), applyInvalidatedModules(), createModuleHotObject(), createRequire(), hotApply(), hotCheck(), internalApply(), setStatus() (+4 more)

### Community 8 - "webpack.js"
Cohesion: 0.32
Nodes (12): applyHandler(), applyInvalidatedModules(), createModuleHotObject(), createRequire(), hotApply(), hotCheck(), internalApply(), setStatus() (+4 more)

### Community 9 - "routes.d.ts"
Cohesion: 0.14
Nodes (13): AppRouteHandlerRoutes, AppRoutes, LayoutProps, LayoutRoutes, LayoutSlotMap, PageProps, PageRoutes, ParamMap (+5 more)

### Community 10 - "routes.d.ts"
Cohesion: 0.14
Nodes (13): AppRouteHandlerRoutes, AppRoutes, LayoutProps, LayoutRoutes, LayoutSlotMap, PageProps, PageRoutes, ParamMap (+5 more)

### Community 11 - "restore.js"
Cohesion: 0.25
Nodes (7): code, fs, lines, code, fs, menuOpenIndex, recoveredLines

### Community 12 - "page.js"
Cohesion: 0.40
Nodes (5): faqSchema, getPageComponents(), Home(), localBusinessSchema, metadata

### Community 13 - "process_diff2.js"
Cohesion: 0.33
Nodes (5): data, fs, line, lines, recoveredLines

### Community 15 - "registry.js"
Cohesion: 0.50
Nodes (3): COMPONENT_DEFINITIONS, COMPONENT_REGISTRY, ContainerSection()

### Community 16 - "AvatarTextSection.jsx"
Cohesion: 0.50
Nodes (3): AvatarTextSection(), DEFAULT_INNER_LAYOUT, toInlineStyle()

### Community 18 - "validator.ts"
Cohesion: 0.40
Nodes (4): AppPageConfig, __Check, __IsExpected, __Unused

### Community 19 - "validator.ts"
Cohesion: 0.40
Nodes (4): AppPageConfig, __Check, __IsExpected, __Unused

### Community 20 - "AvatarTextSection.js"
Cohesion: 0.60
Nodes (4): AvatarTextSection(), DEFAULT_INNER_LAYOUT, InnerCanvas(), toInlineStyle()

### Community 21 - "process_diff.js"
Cohesion: 0.40
Nodes (4): diffText, fs, lines, recoveredLines

### Community 22 - "restore_lines_2.js"
Cohesion: 0.40
Nodes (4): code, fs, lines, saveSuccessIndex

### Community 28 - "refactor_ui.js"
Cohesion: 0.50
Nodes (3): code, fs, startIndex

## Knowledge Gaps
- **158 isolated node(s):** `COMPONENT_REGISTRY`, `COMPONENT_DEFINITIONS`, `fs`, `diffText`, `lines` (+153 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 4 inferred relationships involving `ib()` (e.g. with `e()` and `nb()`) actually correct?**
  _`ib()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `COMPONENT_REGISTRY`, `COMPONENT_DEFINITIONS`, `fs` to the rest of the system?**
  _158 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `page.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `layout.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `layout.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._