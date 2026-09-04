# ohomi-marketing

The Ohomi marketing site: `https://ohomi.vn`. Nuxt 4 in SSR mode, deployed as a
Node container behind the existing nginx on the VPS.

This repo owns everything a visitor sees before they log in — home, product,
about, demo, privacy, and the blog. The application itself (`ohomi.net` and its
`host` / `client` / `admin` subdomains) lives in `owen-backend` and is not
affected by changes here.

## Why this repo exists

The marketing pages used to be routes inside the `owen-backend` Vue SPA. Because
that app renders entirely in the browser, a crawler fetching a blog post got a
generic `<title>`, no `<meta description>`, and an empty body — so none of the
posts were indexed. Every page here is server-rendered instead, and blog pages
carry the post's real title, description, and full text in the first response.

## Running locally

```bash
npm install
npm run dev -- --port 3001
```

Port 3001 is not arbitrary: nginx proxies `ohomi.vn` to that port, and 3000 is
already taken by Gotenberg on the same host.

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `NUXT_PUBLIC_API_BASE` | `https://ohomi.net` | Backend that serves the public blog and lead endpoints |
| `NUXT_PUBLIC_SITE_URL` | `https://ohomi.vn` | This site's canonical origin, used for canonicals and the sitemap |
| `NUXT_PUBLIC_APP_URL` | `https://host.ohomi.net` | Where the nav "log in" link points |

**This repo holds no Notion credentials.** Blog content is read through
`GET /api/public/v1/blog/posts` and `/posts/{slug}` on the backend, which is the
only service that talks to Notion. Responses are cached there for 10 minutes, and
blog routes here revalidate on the same 600-second ISR window — a published post
appears within roughly ten minutes with no redeploy.

## Content ownership

| What | Where |
|---|---|
| Blog posts | Notion, via the backend API |
| Marketing copy, both languages | `app/i18n/{en,vi}.ts` |
| Privacy policy text | `app/content/privacy.{en,vi}.json` |
| Page titles and meta descriptions | the `seo` block in `app/i18n/{en,vi}.ts` |

Vietnamese is the default and is what gets server-rendered; the language switch
applies after hydration. Any new visitor-facing string needs an entry in **both**
`app/i18n/en.ts` and `app/i18n/vi.ts` — the `LandingDict` type in
`app/i18n/types.ts` enforces this at build time.

## Deploying

```bash
docker build -t ohomi-marketing .
docker run -p 3001:3001 \
  -e NUXT_PUBLIC_API_BASE=https://ohomi.net \
  -e NUXT_PUBLIC_SITE_URL=https://ohomi.vn \
  ohomi-marketing
```

The container listens on 3001 and answers `GET /` with 200 once healthy, which is
what the compose healthcheck uses.

## Things worth knowing before you change code

Server-rendering changes what is safe to write. Three patterns from the original
SPA had to be reworked, and reintroducing them will break requests:

- **No module-level mutable state.** On the server a module is shared by every
  request, so a top-level `ref` leaks one visitor's data into another's response.
  Use `useState`, as `app/composables/useLandingI18n.ts` does.
- **No `window` or `document` during setup.** Put browser access in `onMounted`,
  or wrap the component in `<ClientOnly>`. `app/composables/useScrollY.ts` exists
  because `useScroll(window)` from `@vueuse/core` crashed server rendering.
- **No `import.meta.url` for asset paths.** It resolves against the built server
  bundle at runtime. Files that are referenced dynamically belong in `public/`.

Content that matters for search must render on the server. Anything inside
`<ClientOnly>` is invisible to crawlers, which is fine for the decorative scroll
indicator and the hero animation, but not for copy.

## Known follow-ups

- `public/logo.png` is 1024×1024 but displays at 118×30. Resizing it would cut
  another ~200 KB from first paint.
- `/product` has no `<h1>`; it inherited that from the original page.
- Notion `heading_2` renders as `<h3>`, so posts skip `<h2>` entirely.
