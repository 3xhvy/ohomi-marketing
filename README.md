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

This repo is its **own** compose project. It does not live in `owen-backend`'s
compose file. nginx on the VPS proxies `127.0.0.1:3001`; that is the only
coupling.

### Local image (no VPS)

```bash
docker build -t ohomi-marketing .
docker run -p 3001:3001 \
  -e NUXT_PUBLIC_API_BASE=https://ohomi.net \
  -e NUXT_PUBLIC_SITE_URL=https://ohomi.vn \
  ohomi-marketing
```

### CI/CD (GitHub Actions → GHCR → `/opt/ohomi-marketing`)

Push to `main` (or **Actions → Deploy marketing → Run workflow**) will typecheck,
build `ghcr.io/<owner>/ohomi-marketing:<branch>-<sha>` plus `latest`, rsync
`docker-compose.yml` and `scripts/deploy.sh` to the VPS, then `compose pull &&
up -d` **only this stack**. A rollback is the same workflow with `image_tag` set
to a previous sha tag.

**One-time VPS setup** — clone and build, no rsync:

```bash
ssh -p 24700 deploy@YOUR_VM
sudo mkdir -p /opt/ohomi-marketing
sudo chown deploy:deploy /opt/ohomi-marketing
git clone git@github.com:3xhvy/ohomi-marketing.git /opt/ohomi-marketing
cd /opt/ohomi-marketing
docker compose up -d --build
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3001/privacy
```

Later updates are `git pull && docker compose up -d --build` until Actions is wired.
After the first GHCR image exists, grant the VM's existing PAT read access on the
`ohomi-marketing` package (or make the package public) so CI can `compose pull`.

Optional `/opt/ohomi-marketing/.env` if you need to override the compose
defaults. The deploy script only writes `IMAGE_TAG` and `GITHUB_REPOSITORY`:

```
NUXT_PUBLIC_API_BASE=https://ohomi.net
NUXT_PUBLIC_SITE_URL=https://ohomi.vn
NUXT_PUBLIC_APP_URL=https://host.ohomi.net
```

**GitHub repo settings** (this repo, not `owen-backend`):

| Kind | Name | Value |
|---|---|---|
| Variable | `VM_HOST` | VPS hostname or IP |
| Variable | `VM_USERNAME` | `deploy` |
| Variable | `VM_SSH_PORT` | `24700` (optional; that is the default) |
| Secret | `VM_SSH_KEY` | Same deploy private key the app pipeline uses |
| Secret | `TELEGRAM_BOT_TOKEN` | Optional; skip notify if unset |
| Secret | `TELEGRAM_CHAT_ID` | Optional |

Also: **Settings → Actions → General → Workflow permissions → Read and write**
so the job can push to GHCR.

nginx + TLS for `ohomi.vn` are still Plan 2 in `owen-backend`. Until that flip,
the container can be healthy on `:3001` while `https://ohomi.vn` still 301s to
`.net`.

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
