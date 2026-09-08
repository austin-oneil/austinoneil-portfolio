# austinoneil.me

Personal site and technical blog for Austin O'Neil, developer and technical SEO
specialist in Denver.

Next.js App Router, TypeScript in strict mode, Tailwind v4, MDX content, built
for Vercel. The site is itself a work sample, so the SEO surface and the
performance budget are treated as part of the deliverable rather than as
polish.

## Local development

Requires Node 20 or newer.

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:3100>.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3100. Draft posts are visible. |
| `npm run build` | Production build. Drafts excluded. |
| `npm run build:preview` | Production build with `SHOW_DRAFTS=1`, so drafts render. For a Vercel preview deployment only. |
| `npm start` | Serves the production build on port 3200. |
| `npm run lint` | ESLint. |
| `npm run typecheck` | `tsc --noEmit`. |

`/design-system` renders the tokens, type scale and primitives. It is
development only and returns a 404 in production.

## Adding a blog post

Create one file. Never edit a component.

1. Add `content/blog/your-slug.mdx`. The filename becomes the URL:
   `/blog/your-slug`.
2. Give it frontmatter:

```yaml
---
title: What I found in the theme folder
date: "2026-08-18"          # publish date, YYYY-MM-DD
updated: "2026-09-01"       # optional
excerpt: One or two sentences. Used for the card, the meta description and the OG image.
tags: ["WordPress", "Security", "PHP"]
draft: true                 # set false to publish
coverImage: ""              # optional
---
```

3. Write the body in MDX. Available beyond standard markdown:
   - Fenced code blocks are highlighted by Shiki at build time and get a copy
     button. Add a language: ` ```php `.
   - `<Callout>text</Callout>` for an aside, `<Callout type="warning">` for a
     stronger one.
   - `##` and `###` headings automatically get ids, anchor links, and an entry
     in the sticky table of contents.
   - Images go through `next/image`; write them as normal markdown images.

`readingTime` is computed from the body. Do not put it in frontmatter.

**Drafts.** `draft: true` renders in development so you can work on the post in
place, and is excluded from the production build, the blog index, the sitemap,
the RSS feed and `/llms.txt`. A draft that is somehow reachable also carries
`noindex`. Flip to `draft: false` to publish; nothing else needs changing.

## Adding a project

Same shape. Add `content/projects/your-slug.mdx`:

```yaml
---
title: Rebuilding a prayer hours system after finding it exposed
summary: One or two sentences, used on cards and as the meta description.
client: Vocation Action Network
context: Tangent Apps        # Prospecta Marketing | Tangent Apps | All City Media | Interview take-home
period: "2025 - present"     # hyphens, never en dashes
order: 95                    # higher sorts first
featured: true               # optional
tags: ["Dev", "Full-Stack"]  # Dev | SEO | AI | Full-Stack, enforced at build
stack: ["PHP", "MySQL"]
url: https://example.com     # omit when the site is offline or not public
note: A caveat rendered under the title.
---
```

An unknown tag fails the build rather than silently dropping the project from
the filter.

Structure the body as **Problem, Constraints, What I built, Decisions, Outcome**.
The Decisions section is the point of these pages: it is where judgment shows,
and it is what a reviewer actually reads. The Stack section is rendered by the
template from frontmatter, so do not write it in the body.

Add a cover image at `public/placeholder/your-slug.jpg` (16:9) and register it
in `lib/images.ts`.

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel, **Add New Project**, import the repo. The framework is detected;
   no build settings need changing and no `vercel.json` is required.
3. Set one environment variable, for Production and Preview:

   ```
   NEXT_PUBLIC_SITE_URL=https://austinoneil.me
   ```

   Every canonical URL, OG image URL, sitemap entry and `llms.txt` link derives
   from it. Without it the build falls back to the default in `lib/site.ts`.

4. Add the domain under **Settings, Domains** and point DNS at Vercel.
5. Do **not** set `SHOW_DRAFTS` on the production environment. It exists only
   for preview deployments where a draft needs review on real infrastructure.

After the first deploy, submit `https://austinoneil.me/sitemap.xml` in Google
Search Console.

## How it is put together

```
app/                    routes; sitemap.ts, robots.ts, rss.xml, llms.txt
  design-system/        token and primitive reference, dev only
components/             UI, layout, MDX overrides, subway line
content/projects/*.mdx  case studies
content/blog/*.mdx      posts
lib/                    typed loaders, MDX pipeline, JSON-LD builders, site config
types/                  shared content types
public/placeholder/     stand-in imagery, see below
```

A few decisions worth knowing before changing things:

**Theme.** Tokens are CSS custom properties on `:root`, overridden under
`[data-theme="dark"]`. An inline script in `<head>` stamps the attribute before
first paint, so there is no flash of the wrong theme. The toggle holds no React
state; it reads the attribute at click time and CSS picks the icon.

**Radius.** Two stops, 6px for small chips and inline code, 10px for everything
else. Applied without exception. Adding a third would be a decision, not a
detail.

**Motion.** Scroll reveals use Motion through `LazyMotion` with the
`domAnimation` feature set, which keeps roughly 30 KiB of unused runtime out of
the bundle. Everything honors `prefers-reduced-motion`.

**The subway line.** `components/subway-line.tsx` measures every `[data-stop]`
section on the home page and draws one SVG path through them, lighting stations
as you scroll. Cards marked `[data-tunnel]` get headlight and taillight glows
where the track crosses them. It reads scroll through Motion's `useScroll` and
writes results straight to the DOM, so scrolling the page causes no React
re-renders. It is desktop only, and under reduced motion it renders fully drawn
and static.

Tuning is per-section, via data attributes on the section:
`data-stop-fx` is the rail's x as a fraction of the container width,
`data-stop-dy` is the station's offset from the section top. A section whose
content is a card the line should pass *under* must not use `rail-indent`, or
the rail runs beside the card instead of beneath it.

**SEO.** Metadata comes from `generateMetadata` per route. JSON-LD is built in
`lib/schema.ts` so the graph is defined once: `Person` and `WebSite` on home,
`CreativeWork` on case studies, `BlogPosting` on posts, `BreadcrumbList` on
nested routes. OG images are generated by `next/og` at build time from the same
frontmatter. `robots.ts` names GPTBot, ClaudeBot, PerplexityBot and the rest as
allowed, and `/llms.txt` is generated from the content files, including an
accuracy section so a summarising model does not turn an interview take-home
into a job.

## Measured

Lighthouse against the production build, all three required route types.

| Preset | Route | Perf | A11y | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop | `/` | 100 | 100 | 100 | 100 | 0.6s | 0 |
| Desktop | `/projects/[slug]` | 100 | 100 | 100 | 100 | 0.6s | 0 |
| Desktop | `/blog/[slug]` | 100 | 100 | 100 | 100 | 0.5s | 0 |
| Mobile | `/` | 97 | 100 | 100 | 100 | 2.6s | 0 |
| Mobile | `/projects/[slug]` | 96 | 100 | 100 | 100 | 2.8s | 0 |
| Mobile | `/blog/[slug]` | 97 | 100 | 100 | 100 | 2.6s | 0 |

CLS is 0 and total blocking time is at most 10ms everywhere. Mobile LCP sits
above the 2.0s goal; the LCP element is the hero image, and the number is
dominated by Lighthouse's simulated slow-4G queueing rather than by real work
(the measured load duration is single-digit milliseconds). Re-measure on Vercel
with the real portrait in place before deciding whether it needs more.

## Assets still needed

The headshot at `public/austin-oneil.jpg` is real and done.

Everything still under `public/placeholder/` is a stand-in at the correct aspect
ratio. Layout, cropping and loading behaviour are all real; the pictures are
not. Replace them and update `lib/images.ts`.

| File | Ratio | Used on | What it should be |
| --- | --- | --- | --- |
| `basecamp-ai-agent.jpg` | 16:9, 1600x900 | Card and case study | Screenshot of the agent's output email, or an architecture diagram. Redact client names. |
| `prayer-hours-plugin.jpg` | 16:9 | Card and case study | The admin dashboard or the FullCalendar month view. Redact member data. |
| `dnvr-phnx.jpg` | 16:9 | Card and case study | DNVR or PHNX front end as built. |
| `kharon-news-app.jpg` | 16:9 | Card and case study | The `/brief/[slug]` route, or the rich result. |
| `van-user-dashboard.jpg` | 16:9 | Card and case study | The account management screen. |
| `lacroix-drill-house.jpg` | 16:9 | Card and case study | The booking flow. |
| `agency-cms-architecture.jpg` | 16:9 | Card and case study | Anonymized. A location-page layout with no identifying branding. |
| `ahead-of-the-curve-media.jpg` | 16:9 | Card and case study | An archive screenshot if you have one. The site is offline, so do not link it. |

Also outstanding:

- **Favicon and app icons.** `app/favicon.ico` is still the Next.js default.
- **A social OG fallback** is generated by `next/og` and needs no file, but if
  you want a designed card instead, replace `app/opengraph-image.tsx`.

## Content still needed

Search the repo for `TODO(austin)`. Each one marks a place where the brief had
no factual answer and a plausible-sounding one would have been a fabrication.

```bash
grep -rn "TODO(austin)" content lib app
```

At the time of writing: outcome figures on four case studies, the `/uses`
editor and terminal entries, and the five blog post bodies.
