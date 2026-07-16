# Graph Report - Z:\proyects\portafolio  (2026-07-13)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 550 nodes · 696 edges · 69 communities (38 shown, 31 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `93be0c93`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- registry.js
- dependencies
- page.js
- compilerOptions
- page.js
- supabase.js
- LandingClient.tsx
- package.json
- layout.js
- page.js
- page.tsx
- page.js
- page.tsx
- readPageConfig
- publish-version.js
- page.js
- diagnostic.js
- check-bunny.js
- page.js
- compilerOptions
- update_videos.js
- page.js
- route.js
- page.jsx
- page.jsx
- page.jsx
- page.jsx
- next.config.mjs
- check_active_home.js
- view_active_home_components.js
- test-supabase-script.js
- page.js
- route.js
- page.tsx
- page.jsx
- page.jsx
- page.jsx
- page.jsx
- page.jsx
- page.jsx
- page.jsx
- page.jsx
- page.js
- page.jsx
- page.jsx
- middleware.js
- fetch_live.js
- get-org-data.mjs
- test_products.mjs
- test-resend-script.js
- portfolio.js
- videos.js
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `supabase` - 14 edges
3. `readVideoConfig()` - 13 edges
4. `fetchBunnyVideos()` - 13 edges
5. `useDraggable()` - 9 edges
6. `getLabPosts()` - 9 edges
7. `parseMarkdown()` - 8 edges
8. `useCart()` - 7 edges
9. `getLabPostBySlug()` - 7 edges
10. `readPageConfig()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `fetchBunnyVideos()`  [EXTRACTED]
  app/api/bunny-video-slug/route.js → lib/bunny.js
- `GET()` --calls--> `readPageConfig()`  [EXTRACTED]
  app/api/page-config/route.js → lib/pageConfig.js
- `GET()` --calls--> `readVideoConfig()`  [EXTRACTED]
  app/api/video-config/route.js → lib/videoConfig.js
- `generateStaticParams()` --calls--> `getLabPosts()`  [EXTRACTED]
  app/blog/[slug]/page.js → lib/lab.js
- `generateMetadata()` --calls--> `getLabPostBySlug()`  [EXTRACTED]
  app/blog/[slug]/page.js → lib/lab.js

## Import Cycles
- None detected.

## Communities (69 total, 31 thin omitted)

### Community 0 - "registry.js"
Cohesion: 0.07
Nodes (27): AvatarSection(), CellPhoneCTASection(), CTASection(), CTAWhatsapp(), EstrelasSection(), toInlineStyle(), FAQSection(), FinalCTASection() (+19 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (39): @anthropic-ai/sdk, @google/generative-ai, hls.js, lucide-react, marked, @mdx-js/loader, @mdx-js/react, next (+31 more)

### Community 2 - "page.js"
Cohesion: 0.11
Nodes (24): LabPage(), metadata, generateMetadata(), generateStaticParams(), LabPostPage(), LabPage(), metadata, generateMetadata() (+16 more)

### Community 3 - "compilerOptions"
Cohesion: 0.06
Nodes (32): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+24 more)

### Community 4 - "page.js"
Cohesion: 0.14
Nodes (23): GET(), GET(), GET(), PATCH(), PUT(), getPageComponents(), metadata, VideosPage() (+15 more)

### Community 5 - "supabase.js"
Cohesion: 0.09
Nodes (3): AvatarTextSection(), toInlineStyle(), supabase

### Community 6 - "LandingClient.tsx"
Cohesion: 0.11
Nodes (20): getSupabase(), logCtaClick(), registerPageVisit(), resend, submitEmailLead(), gtag(), LandingClient(), LandingClientProps (+12 more)

### Community 7 - "package.json"
Cohesion: 0.07
Nodes (27): browserslist, devDependencies, @types/node, typescript, name, packageManager, pnpm, supportedArchitectures (+19 more)

### Community 8 - "layout.js"
Cohesion: 0.12
Nodes (13): CartContent(), formatCLP(), dmMono, instrumentSans, metadata, AddToCartButton(), CartButton(), CartContext (+5 more)

### Community 9 - "page.js"
Cohesion: 0.15
Nodes (12): VisualEditorContent(), GlobalTypographyPanel(), HistoryPanel(), COMPONENT_DEFINITIONS, BREAKPOINTS, HERO_EDITORIAL_TEXT_FIELDS, SmartPropertiesPanel(), StylesPanel() (+4 more)

### Community 10 - "page.tsx"
Cohesion: 0.15
Nodes (13): faqSchema, getPageComponents(), Home(), localBusinessSchema, metadata, getSistemaComponents(), metadata, SistemaPage() (+5 more)

### Community 11 - "page.js"
Cohesion: 0.31
Nodes (6): fmtDate(), formatCLP(), OrdersTab(), ProductsTab(), STATUS_COLORS, STATUS_LABELS

### Community 12 - "page.tsx"
Cohesion: 0.33
Nodes (6): formatCLP(), getProducts(), metadata, PreciosPage(), Product, waUrl()

### Community 13 - "readPageConfig"
Cohesion: 0.46
Nodes (6): GET(), PATCH(), configPath, getPageText(), readPageConfig(), writePageConfig()

### Community 14 - "publish-version.js"
Cohesion: 0.25
Nodes (6): args, { createClient }, envPath, fs, path, supabase

### Community 15 - "page.js"
Cohesion: 0.33
Nodes (3): metadata, PHASES, ProcesoTimeline()

### Community 16 - "diagnostic.js"
Cohesion: 0.38
Nodes (6): checkImage(), { createClient }, https, run(), supabase, testSupabase()

### Community 17 - "check-bunny.js"
Cohesion: 0.29
Nodes (6): checks, envContent, envPath, envVars, fs, path

### Community 19 - "page.js"
Cohesion: 0.60
Nodes (3): generateMetadata(), getOrganization, OrganizacionPage()

### Community 20 - "compilerOptions"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, ./*, @/*

### Community 21 - "update_videos.js"
Cohesion: 0.40
Nodes (4): contentDir, files, fs, path

### Community 28 - "next.config.mjs"
Cohesion: 0.50
Nodes (3): cspHeader, nextConfig, withMDX

## Knowledge Gaps
- **157 isolated node(s):** `metadata`, `STATUS_LABELS`, `STATUS_COLORS`, `CONTENT_DIR`, `metadata` (+152 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `supabase` connect `supabase.js` to `page.js`, `page.tsx`, `page.js`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `Nav()` connect `layout.js` to `page.js`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `metadata`, `STATUS_LABELS`, `STATUS_COLORS` to the rest of the system?**
  _157 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `registry.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06565656565656566 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `page.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10634920634920635 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._