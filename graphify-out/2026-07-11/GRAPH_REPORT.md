# Graph Report - \\192.168.1.22\lv\proyects\portafolio  (2026-07-11)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 538 nodes · 727 edges · 59 communities (31 shown, 28 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e6d21a12`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- page.js
- registry.js
- dependencies
- page.js
- supabase.js
- compilerOptions
- layout.js
- package.json
- page.js
- LandingClient.tsx
- page.js
- page.js
- page.js
- page.tsx
- publish-version.js
- page.js
- diagnostic.js
- check-bunny.js
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
- page.jsx
- page.tsx
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
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `supabase` - 19 edges
2. `compilerOptions` - 18 edges
3. `readVideoConfig()` - 15 edges
4. `fetchBunnyVideos()` - 14 edges
5. `getLabPosts()` - 11 edges
6. `useCart()` - 9 edges
7. `useDraggable()` - 9 edges
8. `parseMarkdown()` - 8 edges
9. `HeroVideo()` - 7 edges
10. `getLabPostBySlug()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Proyecto()` --indirect_call--> `BunnyVideoPlayer()`  [INFERRED]
  app/proyectos/[slug]/page.js → components/BunnyVideoPlayer.jsx
- `GET()` --calls--> `fetchBunnyVideos()`  [EXTRACTED]
  app/api/bunny-video-slug/route.js → lib/bunny.js
- `GET()` --calls--> `readPageConfig()`  [EXTRACTED]
  app/api/page-config/route.js → lib/pageConfig.js
- `GET()` --calls--> `readVideoConfig()`  [EXTRACTED]
  app/api/video-config/route.js → lib/videoConfig.js
- `generateStaticParams()` --calls--> `getLabPosts()`  [EXTRACTED]
  app/blog/[slug]/page.js → lib/lab.js

## Import Cycles
- None detected.

## Communities (59 total, 28 thin omitted)

### Community 0 - "page.js"
Cohesion: 0.10
Nodes (32): GET(), GET(), GET(), PATCH(), GET(), PATCH(), PUT(), sitemap() (+24 more)

### Community 1 - "registry.js"
Cohesion: 0.07
Nodes (25): AvatarSection(), CellPhoneCTASection(), CTASection(), CTAWhatsapp(), EstrelasSection(), toInlineStyle(), FAQSection(), FinalCTASection() (+17 more)

### Community 2 - "dependencies"
Cohesion: 0.05
Nodes (39): @anthropic-ai/sdk, @google/generative-ai, hls.js, lucide-react, marked, @mdx-js/loader, @mdx-js/react, next (+31 more)

### Community 3 - "page.js"
Cohesion: 0.11
Nodes (23): LabPage(), metadata, generateMetadata(), generateStaticParams(), LabPostPage(), LabPage(), metadata, generateMetadata() (+15 more)

### Community 4 - "supabase.js"
Cohesion: 0.08
Nodes (4): metadata, AvatarTextSection(), toInlineStyle(), supabase

### Community 5 - "compilerOptions"
Cohesion: 0.06
Nodes (32): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+24 more)

### Community 6 - "layout.js"
Cohesion: 0.11
Nodes (15): CartContent(), formatCLP(), dmMono, instrumentSans, metadata, AddToCartButton(), CartButton(), CartContext (+7 more)

### Community 7 - "package.json"
Cohesion: 0.07
Nodes (27): browserslist, devDependencies, @types/node, typescript, name, packageManager, pnpm, supportedArchitectures (+19 more)

### Community 8 - "page.js"
Cohesion: 0.15
Nodes (12): VisualEditorContent(), GlobalTypographyPanel(), HistoryPanel(), COMPONENT_DEFINITIONS, BREAKPOINTS, HERO_EDITORIAL_TEXT_FIELDS, SmartPropertiesPanel(), StylesPanel() (+4 more)

### Community 9 - "LandingClient.tsx"
Cohesion: 0.15
Nodes (16): getSupabase(), logCtaClick(), registerPageVisit(), resend, submitEmailLead(), gtag(), LandingClient(), LandingClientProps (+8 more)

### Community 10 - "page.js"
Cohesion: 0.18
Nodes (12): faqSchema, getPageComponents(), Home(), metadata, getSistemaComponents(), metadata, SistemaPage(), VIDEOS (+4 more)

### Community 11 - "page.js"
Cohesion: 0.23
Nodes (8): generateMetadata(), getOrganization, OrganizacionPage(), Proyecto(), BunnyVideoPlayer(), slugify(), VideoReelSection(), VideoPlayer()

### Community 12 - "page.js"
Cohesion: 0.31
Nodes (6): fmtDate(), formatCLP(), OrdersTab(), ProductsTab(), STATUS_COLORS, STATUS_LABELS

### Community 13 - "page.tsx"
Cohesion: 0.33
Nodes (6): formatCLP(), getProducts(), metadata, PreciosPage(), Product, waUrl()

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

### Community 19 - "compilerOptions"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, ./*, @/*

### Community 20 - "update_videos.js"
Cohesion: 0.40
Nodes (4): contentDir, files, fs, path

### Community 27 - "next.config.mjs"
Cohesion: 0.50
Nodes (3): cspHeader, nextConfig, withMDX

## Knowledge Gaps
- **154 isolated node(s):** `metadata`, `STATUS_LABELS`, `STATUS_COLORS`, `CONTENT_DIR`, `metadata` (+149 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `supabase` connect `supabase.js` to `page.js`, `page.js`, `page.js`, `page.js`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `HeroVideo()` connect `page.js` to `page.js`, `layout.js`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `VideoPlayer()` connect `page.js` to `LandingClient.tsx`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `metadata`, `STATUS_LABELS`, `STATUS_COLORS` to the rest of the system?**
  _154 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09696969696969697 - nodes in this community are weakly interconnected._
- **Should `registry.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06968641114982578 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._