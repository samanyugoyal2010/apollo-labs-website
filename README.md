# Collaborative Research Club

Website for Collaborative Research Club, a student-led research club at
California High School.

## Site structure

The home page presents the club's research process, current project records,
leadership, research limits, and Discord link. Each project also has a static
record at `/projects/<slug>`.

Club and project content is stored in [`lib/data.js`](lib/data.js). Shared
project URL and status helpers are stored in [`lib/projects.js`](lib/projects.js).

## Identity and motion

The official dragon asset is
[`public/brand/crc-dragon.png`](public/brand/crc-dragon.png). Navigation, page
icons, social cards, and the scroll animation all use that source image.

On the home page, the dragon crosses the viewport in response to page scroll.
The compact breakpoint uses a shorter path and lower opacity around body copy.
Visitors who request reduced motion see a quiet, fixed placement instead.

## Discord

Discord is linked only for announcements and events. The invite URL is stored
once as `DISCORD_URL` in [`lib/data.js`](lib/data.js).

## Run locally

Install dependencies:

```bash
npm ci
```

Start the local site:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```

## Production metadata

Set `NEXT_PUBLIC_SITE_URL` to the production origin. It supplies the canonical
URL, Open Graph URL, `robots.txt`, and `sitemap.xml`. When it is unset, the app
uses the Vercel production URL when present, then falls back to
`http://localhost:3000`.

## Stack

- Next.js 15 with the App Router
- React 19
- Tailwind CSS 4 and site-specific CSS
- Framer Motion
- Instrument Serif, IBM Plex Sans, and JetBrains Mono
