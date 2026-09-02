<img src="public/logo.svg" alt="Apollo Labs" width="216">

# Apollo Labs Website

Marketing site for **Apollo Labs** — a student-led organization where high school
students collaborate on research projects.

## Community

The Discord server is the primary way to join and the main call to action across
the site: **https://discord.gg/pvgqDxX2NE**

It's linked from the nav, the hero, the mobile menu, the "Join us" panel, the
footer, and the 404 page. The invite lives in one place — `DISCORD_URL` in
[`lib/data.js`](lib/data.js).

## Identity

The mark is "the orbit completes the A": a chevron with a chamfered apex is the
letter, and the tilted ring sweeping through it is at once the crossbar, an
orbit, and a research trajectory. The ring passes **in front of** the left leg
and **behind** the right one, so the two forms read as one woven object rather
than a letter with a circle around it. The blue bead caps the low end of the
orbit, so the trajectory reads as ascending away from it.

**One source of geometry: [`lib/mark.js`](lib/mark.js).** Everything that draws
the mark imports from there, so a change to the shape lands everywhere at once.
The React component takes its color from `currentColor` (and
`--apollo-mark-bead` for the bead), so it inverts for free — dark on the nav,
light on the intro. Callers set a height; width follows the viewBox.

| Where | What |
| --- | --- |
| [`lib/mark.js`](lib/mark.js) | The geometry, plus `markSvg()` / `markDataUri()` for contexts that can't render React. |
| [`ApolloMark.jsx`](components/ApolloMark.jsx) | The mark as a component. `variant="glyph"` drops the ring and bead for contexts that supply their own orbit. |
| [`ApolloLogo.jsx`](components/ApolloLogo.jsx) | Mark + wordmark lockup — "Apollo" in the display serif, "Labs" as a tracked sans qualifier. `size="sm"` for nav, footer, and mobile menu; `"lg"` for the intro. |
| [`app/icon.svg`](app/icon.svg) | Favicon: the mark on a dark tile, optically centered so it survives 16px. |
| [`app/apple-icon.jsx`](app/apple-icon.jsx) | 180×180 home-screen icon, generated from `markSvg()`. |
| [`app/opengraph-image.jsx`](app/opengraph-image.jsx) | 1200×630 social card. |
| [`public/logo.svg`](public/logo.svg) | Standalone lockup for READMEs and decks. |
| `public/*.png` | The raster set — see below. |

### Raster assets

Anywhere that can't take an SVG — Discord, Google Workspace, slide decks, print —
uses the PNGs in `public/`. They are generated, not hand-exported:

```bash
npm run logos
```

| File | Size | Use |
| --- | --- | --- |
| `logo.png` | 680×190 | Lockup, dark ink, transparent |
| `logo-light.png` | 680×190 | Lockup, white ink, for dark backgrounds |
| `mark.png` | 512×512 | Mark alone, dark ink, transparent |
| `mark-light.png` | 512×512 | Mark alone, white ink, transparent |
| `icon.png` | 512×512 | Mark on the dark tile — server icons, org avatars |

[`scripts/render-logo-pngs.mjs`](scripts/render-logo-pngs.mjs) renders them from
the same geometry, so changing the shape in [`lib/mark.js`](lib/mark.js) and
re-running is all it takes. It goes through `next/og` (satori + resvg), which
ships with Next, so there is no extra dependency — and it is the only rasterizer
here that can embed Instrument Serif, which a generic SVG converter would
substitute with whatever serif the machine happens to have.

The lockup's proportions are not arbitrary: the mark's **ink** height is matched
to the wordmark's cap height, which is why the mark box is scaled up past the
type size (its ink fills only ~71% of the tight viewBox).

Icons and the social card use Next's `app/` file conventions, so the `<link>`
and `og:image` tags are generated with content hashes. Do not add `icons` to
`metadata` in [`app/layout.jsx`](app/layout.jsx) — it overrides the conventions
and silently drops the apple-touch-icon.

`app/icon.svg` and `public/logo.svg` are the only files that duplicate the path
data — they are static SVGs read outside React. If the geometry in
[`lib/mark.js`](lib/mark.js) changes, those two need the same edit by hand;
everything else regenerates.

The social card and the logo PNGs fetch Instrument Serif and Inter from Google
via [`lib/google-font.js`](lib/google-font.js) and fall back to system faces if
that fetch fails, so an offline build still ships a card. `npm run logos` warns
when it falls back, since a wordmark in the wrong serif should not be committed.

## Editing content

All copy lives in [`lib/data.js`](lib/data.js): team members, projects, mission
pillars, research tags, join options, contact email, Calendly URL, the
submission checklist, and the Discord invite. No component holds hard-coded
copy.

## The research gallery

The Projects section is a gallery of cover cards. Clicking one opens a preview
with the abstract; "Read the full paper" goes to `/projects/<slug>`, a
statically generated page with the full write-up, its own social card, and
JSON-LD for search engines.

A project is a gallery entry from the day it starts. `paper` is what gets
filled in once a write-up clears review:

```js
{
  slug: 'optimus',
  authors: ['Samanyu Goyal'],
  status: 'in-progress',
  paper: null,          // { pdf, published, doi } once approved
  cover: null,          // '/covers/optimus.png', or null for a generated one
  // ... title, topic, category, overview (the abstract), highlights, detail
}
```

Setting `paper.pdf` flips the card to Published, adds the download button and
an inline PDF viewer, and upgrades the structured data to `ScholarlyArticle`.
Leaving `cover` as `null` draws a generated gradient cover keyed to the slug,
so the gallery never shows a missing image.

### Publishing an approved paper

1. Put the PDF in `public/papers/` (and a cover image in `public/covers/`).
2. Add or update the entry in `PROJECTS` with `paper.pdf` and
   `paper.published` set.

That is the whole job — the project page, its social card, and its
`sitemap.xml` entry all follow from the data.

## Paper submissions

`SubmitPaperSection` posts to `/api/submit-paper`, the site's only server
route. It sends the reviewer the submission along with **Approve** and
**Request changes** buttons — `mailto:` links carrying a pre-written reply — and
sends the student a receipt. There is no database and no admin page: approving
a paper happens in the reviewer's own mail client.

Set `RESEND_API_KEY` to turn it on; see [`.env.example`](.env.example). Without
it the route returns 503 and the form points students at the contact email
instead, so a missing key degrades rather than dead-ends.

One caveat worth knowing: until a sending domain is verified in Resend, the
default sender only delivers to the Resend account owner. The reviewer copy
arrives and the student's receipt does not — the route logs that and still
reports success, because the submission did go through. Verify a domain and set
`RESEND_FROM` to send receipts.

## Team

- Samanyu Goyal — Co-Founder
- Ram Rithvik Pagadala — Co-Founder
- Ashmit Pai — Co-Founder

## Run locally

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. To replay the intro animation, clear the
`apollo-labs-seen` key in `sessionStorage` and reload.

## Build

```bash
npm run build
```

```bash
npm start
```

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the production origin (e.g.
`https://apollolabs.org`). It drives `metadataBase`, the canonical URL, Open
Graph tags, `robots.txt`, and `sitemap.xml`. On Vercel it falls back to the
project production URL automatically; without either it defaults to
`http://localhost:3000`.

Set `RESEND_API_KEY` (and ideally `RESEND_FROM`) to enable paper submissions.
Copy [`.env.example`](.env.example) to `.env.local` for local development, and
add the same variables in the Vercel project settings.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS v4 over a custom `.apollo-*` CSS-variable design system
- Framer Motion
- Fonts: EB Garamond, Inter, Instrument Serif, JetBrains Mono, Great Vibes

## Notes on the front end

- **The page is server-rendered.** Content always renders; the intro is an
  overlay on top of it, gated by a pre-paint inline script in
  [`app/layout.jsx`](app/layout.jsx) that sets `.apollo-preload` on `<html>`.
  The script self-clears after 6s so a hydration failure can never leave a
  blank screen.
- **The intro only plays on the home page.** A shared link to a paper should
  land on the paper, not on an intro.
- **The intro respects `prefers-reduced-motion`** and is skipped entirely when
  set, along with all ambient animation (marquee, orbits, float, shimmer).
  Because it never mounts in that case, the mark's assemble animation
  (`.apollo-mark-intro` in `globals.css`) needs no reduced-motion variant.
- **Dialogs** use the shared [`components/Modal.jsx`](components/Modal.jsx):
  focus trap, focus restore, Escape to close, and scroll lock that compensates
  for scrollbar width so the page doesn't shift.
- **Tailwind v4 caveat:** utilities live in `@layer utilities`, so an unlayered
  `.apollo-*` rule beats a utility of the same property. If a `md:hidden` (or
  similar) appears to do nothing, check for a competing rule in `globals.css`.
