# appletechie.dev redesign plan

Status: proposal for Andrew's review; no implementation or deployment is authorized by this document. Baseline source: df6aa1b. Mockup: [desktop and mobile](mockup.html). Current-state captures are in [current/](current/).

## Goals and priorities

Keep the macOS desktop as the site's personality while making Andrew's work immediately understandable, navigable and usable on touch. Priorities, in order:

1. Open directly to a portfolio window: eliminate the compulsory three-second boot and login. Offer the simulation as an optional experience.
2. Put selected work, a concise introduction and a clear contact action in the first view; make projects and their outcomes easy to scan.
3. Replace desktop-sized floating windows on narrow screens with full-width, scrollable app views and labeled touch navigation.
4. Make every primary action keyboard and screen-reader operable, with visible focus, reduced motion and clear window titles.
5. Reduce startup work: lazy-load secondary apps and media, defer integrations, and measure real desktop and mobile performance before and after.

## Current map

There is one UI route, `/`, containing boot, login, desktop, sleep and shutdown states. The app registry supplies Safari, Mail, Notes, VS Code, Terminal, GitHub, Weather, Spotify, FaceTime, Music, Snake and Settings. YouTube exists but is not registered. Menubar, Dock, Spotlight, Launchpad, control center and movable windows form the shared shell. The API routes are `/api/fs`, `/api/github`, `/api/mail`, `/api/mail/[id]`, `/api/notes`, `/api/notes/[id]`, `/api/spotify`, `/api/system`, `/api/tracks`, and `/api/weather`. Sources include bundled mail and notes, a generated filesystem snapshot, GitHub, Open-Meteo/Nominatim and Spotify, with fallbacks and local preferences. Do not expose private operational details or unverified project claims from the portfolio inventory: only use independently public, verified descriptions, links and roles; omit anything uncertain pending approval.

**Deploy map:** `wrangler.jsonc` configures Cloudflare Worker `appletechie-macos`, entry `vinext/server/app-router-entry`; `vite.config.ts` uses vinext and Cloudflare's Vite plugin. `npm run deploy` generates a filesystem snapshot then invokes `vinext deploy`. GitHub default branch is `main`; there are no repository GitHub Actions workflows. The live Cloudflare production branch and trigger are **unconfirmed**; do not infer that a push to any branch deploys. Confirm via read-only Cloudflare dashboard/API before any future implementation or deploy.

Graphify code-only run: `graphify update .` exited 0, producing 891 nodes and 1,934 edges across 70 communities; it excludes semantic documents and some unsupported files. Generated graph is local research output, excluded from this plan PR.

## Baseline observations

Production `/` was captured in headless Chromium at 1440 and 390 pixels. The mobile desktop screenshot shows clipped menu bar and Dock; the initial boot and login delay access to work. One mobile Lighthouse run on the initial lock screen exited 0: Performance 75, Accessibility 75, FCP 0.9 s, LCP 9.3 s, TBT 0 ms, CLS 0; unused JavaScript estimate 135 KiB. A single desktop run scored Performance 93 and Accessibility 75, with LCP 1.7 s and CLS 0. These single runs are directional and do not measure the app windows or field INP. See `current/` for captures; raw Lighthouse reports are not included in this plan-only PR.

## Experience and copy

### Home / desktop

Retain the wallpaper, menu bar, traffic lights and Dock. Open a focused, accessible “Portfolio” window by default. Its left sidebar offers Work, About and Contact; the main area begins with “Hi, I'm Andrew.” followed by a short factual role line once verified. Primary action: “View projects”; secondary: “Get in touch”. Avoid simulated login and loading for first-time visitors. Make the playful desktop available through “Explore desktop”. Use system fonts, a restrained translucent title bar, blue focus accents and solid readable surfaces. Proposed palette: wallpaper navy `#172c4c`, window `#f7f8fa`, text `#1d2735`, muted `#586679`, action `#2164d8`, border `#d7dde6`.

### Work

Curate 3–6 verified public projects. Each row shows project name, one concrete sentence, Andrew's verified role and a link to a live public project or repository; clearly label unavailable links. Use an index with optional category filter when enough projects exist. Do not convert internal inventory names, statuses, customer relationships or metrics into public claims. The inventory is a lead source, not publishable copy. A project detail view can open inside the window with problem, contribution, outcome and links only when public evidence exists. Mockup project entries are generic layout examples, not proposed public claims.

### About and contact

Replace hidden biography in Notes with short, verified introduction and links; keep Notes as an optional app. Contact provides a direct, existing public contact method and accessible external links; no fabricated email or new form. Use descriptive link labels and disclose external destinations.

### Secondary apps and mobile

Keep the existing registry, Dock, window manager and Spotlight where appropriate. De-emphasize weather, music, games and system controls until requested; load them on demand. On mobile, use a compact top bar and full-screen sheet with close/back controls, vertical scrolling, 44px minimum touch targets and no drag requirement. Desktop windows remain draggable with keyboard-operable alternatives; maintain focus and restore it on close. Direct links and browser history should open Work, About and Contact without breaking the desktop shell.

## Design references

CoS supplied these Mobbin MCP `search_sections` references on 2026-11-08; they are patterns, not templates to copy:

- [Unseen Studio selected projects](https://mobbin.com/sites/sections/79d328bc-800b-4830-9de1-7ef8fd2dd00f): filters and visual hierarchy for selected work.
- [ramp.design work grid](https://mobbin.com/sites/sections/f61f66c0-5b44-471b-9ef7-f382746d4f76): varied tile sizes for a desktop window.
- [Wild project cards](https://mobbin.com/sites/sections/bd58336d-6de6-4678-aafd-10089a509897): succinct tool tags on work entries.
- [Locomotive project index](https://mobbin.com/sites/sections/280c1a2d-41d4-4495-a4bd-816763c93ad3): compact scannable list for many projects.
- [Koto next project and contact](https://mobbin.com/sites/sections/10dc8f2a-0856-4dc6-ba1a-8afe85c48738): a clear end-of-project next step.
- [Pentagram work](https://mobbin.com/sites/sections/0964cb3b-e8a4-4e57-a6d1-e2ecfe445497): image-led work paired with brief descriptions.
- [Runner founder workflows](https://mobbin.com/sites/sections/27da0b6f-088c-47be-b8ff-8eeef510ee0b): concise two-column project summaries.
- [AI in Design organisations](https://mobbin.com/sites/sections/78ba0192-f792-44a6-9d28-d28aacdf062e): alternating visual and factual project context.

## React Bits audit and choices

The dates below are upstream **commit dates**, not independently verified package release dates. Free TS + Tailwind variants are preferred; evaluate dependencies and accessibility before adopting. [Upstream commits](https://github.com/DavidHDev/react-bits/commits/main/) and [React Bits](https://reactbits.dev/).

| Upstream introduction | Component | Decision |
| --- | --- | --- |
| 2026-10-08 | [HoloCard](https://github.com/DavidHDev/react-bits/commit/7e0220aa) | Exclude shader-heavy decoration from critical paths. |
| 2026-09-30 | [PatternWaves](https://github.com/DavidHDev/react-bits/commit/e1bbb696) | Exclude animated background. |
| 2026-09-29 | [CircularCarousel](https://github.com/DavidHDev/react-bits/commit/056aa235) | Exclude; work should scan as a list. |
| 2026-09-27 | [MicroSlats](https://github.com/DavidHDev/react-bits/commit/2408c15b) | Exclude decorative motion. |
| 2026-09-26 | [Flex Carousel](https://github.com/DavidHDev/react-bits/commit/5d0c00e7) | Optional project detail gallery only after profiling; static semantic list on mobile and reduced motion. |
| 2026-09-25 | [ElectricLogo](https://github.com/DavidHDev/react-bits/commit/54807080) | Exclude. |
| 2026-09-24 | [TechText](https://github.com/DavidHDev/react-bits/commit/9b7921e0) | Optional desktop wordmark, static text on touch/reduced motion; no delayed content. |
| 2026-09-23 | [DitherVeil](https://github.com/DavidHDev/react-bits/commit/b6666e9f) | Exclude mobile-critical WebGL. |
| 2026-09-22 | [Shredder](https://github.com/DavidHDev/react-bits/commit/c5df8610) | Exclude. |
| 2026-09-20 | [Paper Crumple](https://github.com/DavidHDev/react-bits/commit/9481af75) | Exclude. |
| 2026-09-19 | [Flip Card and Tear Ticket](https://github.com/DavidHDev/react-bits/commit/377034ce) | Exclude; avoid hiding project information. |
| 2026-09-18 | [30 Micro components](https://github.com/DavidHDev/react-bits/commit/125e04d8) | Explore FolderFloat for optional desktop folder affordance only with keyboard parity. |
| 2026-09-15 | [ShapeWaves](https://github.com/DavidHDev/react-bits/commit/c96bdb05) | Exclude background animation. |

Existing [Dock](https://reactbits.dev/components/dock) was [updated 2026-10-08](https://github.com/DavidHDev/react-bits/commit/8f6effa3): use as an interaction reference; keep the existing Dock unless a size and accessibility comparison proves a replacement worthwhile. The optional ideas are not requirements and no paid Pro component is selected.

## Targets and acceptance

- Record three Lighthouse mobile and desktop runs on the same URL, throttling and browser, report medians and compare against the baseline. Aim for Performance and Accessibility ≥90, LCP ≤2.5s, CLS ≤0.1 and INP ≤200ms at the 75th percentile where field data exists. Do not present lab TBT as field INP.
- First meaningful portfolio content is available immediately without timers, login, third-party API response or animation. No horizontal overflow at 390px.
- WCAG 2.2 AA: keyboard-only completion of navigation, project links and contact; meaningful focus order and names, contrast ≥4.5:1 for normal text, focus visible, reduced motion, touch targets at least 44px where practical. Test screen reader and zoom at 200%.
- Verify mobile and desktop captures, network failure and reduced-motion flows, window close/focus restoration, direct links and integration fallbacks. Compare JS transfer and image sizes; avoid WebGL on the critical mobile path.

## Build order after separate approval

1. Confirm deploy path and baseline, public project facts and copy; audit keyboard/mobile flows.
2. Build accessible portfolio window and direct navigation; remove mandatory boot/login.
3. Add curated work, about and contact content with verified links and empty/failure states.
4. Adapt shell for touch; lazy-load secondary apps and external integrations.
5. Profile, accessibility-test, capture matching views and iterate; review before any separately authorized deployment.
