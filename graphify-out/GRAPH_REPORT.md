# Graph Report - Z:\proyects\portafolio  (2026-07-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 559 nodes · 703 edges · 69 communities (37 shown, 32 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `93be0c93`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- page.js
- page.js
- registry.js
- dependencies
- compilerOptions
- LandingClient.tsx
- supabase.js
- package.json
- fetchBunnyVideos
- layout.js
- merge_mdx.js
- page.js
- page.tsx
- publish-version.js
- page.js
- diagnostic.js
- check-bunny.js
- page.js
- TituloAnimado.tsx
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
- update_links.js
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
2. `supabase` - 13 edges
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

## Communities (69 total, 32 thin omitted)

### Community 0 - "page.js"
Cohesion: 0.08
Nodes (33): GET(), PATCH(), LabPage(), metadata, generateMetadata(), generateStaticParams(), LabPostPage(), LabPage() (+25 more)

### Community 1 - "page.js"
Cohesion: 0.08
Nodes (25): VisualEditorContent(), faqSchema, getPageComponents(), Home(), localBusinessSchema, metadata, getSistemaComponents(), metadata (+17 more)

### Community 2 - "registry.js"
Cohesion: 0.08
Nodes (23): AvatarSection(), CellPhoneCTASection(), CTASection(), CTAWhatsapp(), EstrelasSection(), toInlineStyle(), FAQSection(), FinalCTASection() (+15 more)

### Community 3 - "dependencies"
Cohesion: 0.05
Nodes (39): @anthropic-ai/sdk, @google/generative-ai, hls.js, lucide-react, marked, @mdx-js/loader, @mdx-js/react, next (+31 more)

### Community 4 - "compilerOptions"
Cohesion: 0.06
Nodes (32): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+24 more)

### Community 5 - "LandingClient.tsx"
Cohesion: 0.11
Nodes (20): getSupabase(), logCtaClick(), registerPageVisit(), resend, submitEmailLead(), gtag(), LandingClient(), LandingClientProps (+12 more)

### Community 6 - "supabase.js"
Cohesion: 0.10
Nodes (3): AvatarTextSection(), toInlineStyle(), supabase

### Community 7 - "package.json"
Cohesion: 0.07
Nodes (27): browserslist, devDependencies, @types/node, typescript, name, packageManager, pnpm, supportedArchitectures (+19 more)

### Community 8 - "fetchBunnyVideos"
Cohesion: 0.16
Nodes (20): GET(), GET(), GET(), PATCH(), PUT(), generateMetadata(), VideoPage(), VideoPageViewer() (+12 more)

### Community 9 - "layout.js"
Cohesion: 0.12
Nodes (13): CartContent(), formatCLP(), dmMono, instrumentSans, metadata, AddToCartButton(), CartButton(), CartContext (+5 more)

### Community 10 - "merge_mdx.js"
Cohesion: 0.20
Nodes (9): contentDir, crazyAudio, crazyMain, crazyProd, fs, incoAudio, incoMain, incoTv (+1 more)

### Community 11 - "page.js"
Cohesion: 0.31
Nodes (6): fmtDate(), formatCLP(), OrdersTab(), ProductsTab(), STATUS_COLORS, STATUS_LABELS

### Community 12 - "page.tsx"
Cohesion: 0.33
Nodes (6): formatCLP(), getProducts(), metadata, PreciosPage(), Product, waUrl()

### Community 13 - "publish-version.js"
Cohesion: 0.25
Nodes (6): args, { createClient }, envPath, fs, path, supabase

### Community 14 - "page.js"
Cohesion: 0.33
Nodes (3): metadata, PHASES, ProcesoTimeline()

### Community 15 - "diagnostic.js"
Cohesion: 0.38
Nodes (6): checkImage(), { createClient }, https, run(), supabase, testSupabase()

### Community 16 - "check-bunny.js"
Cohesion: 0.29
Nodes (6): checks, envContent, envPath, envVars, fs, path

### Community 18 - "page.js"
Cohesion: 0.60
Nodes (3): generateMetadata(), getEntityData, PortafolioSlugPage()

### Community 19 - "TituloAnimado.tsx"
Cohesion: 0.50
Nodes (4): AnimationToken, TituloAnimado(), TituloAnimadoProps, toInlineStyle()

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
- **168 isolated node(s):** `metadata`, `STATUS_LABELS`, `STATUS_COLORS`, `CONTENT_DIR`, `metadata` (+163 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `supabase` connect `supabase.js` to `page.js`, `page.js`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `Nav()` connect `layout.js` to `page.js`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `metadata`, `STATUS_LABELS`, `STATUS_COLORS` to the rest of the system?**
  _168 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08067375886524823 - nodes in this community are weakly interconnected._
- **Should `page.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07862679955703211 - nodes in this community are weakly interconnected._
- **Should `registry.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07564102564102564 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._