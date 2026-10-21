# Silver Squeeze Early-Warning Dashboard

COMEX silver squeeze early-warning board. **Status:** prototype. PRODUCT intent; not an incubated 7Ei venture.

Live (GitHub Pages): https://arturito7ei.github.io/silver-squeeze/

## Data

Numbers are a **public snapshot**, not a CME DataMine socket. Current print (compiled 2026-09-09):

- COMEX registered silver **99.39 Moz** (99,386,946 oz) as of **2026-09-04**
- Source: [The Vault Report](https://thevaultreport.com/metals/silver) citing CME COMEX warehouse reports

This is **not** the February Figma mock (47.2 Moz / risk 100). Chips follow the mock thresholds against the new print.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## CI / live Pages

- **`market-feeds`** (`.github/workflows/feeds.yml`) — weekday cron `16:00 UTC` Mon–Fri (+ `workflow_dispatch`). Ingests Vault/EIA/FRED into `public/data/**` and commits when data changes.
- **`github-pages`** (`.github/workflows/pages.yml`) — builds and deploys on human `push` to `main`, or on `workflow_dispatch`.

**Cascade:** Actions bot pushes with `GITHUB_TOKEN` do **not** fire other workflows' `on: push` triggers (GitHub recursion guard). After a successful `public/data/**` commit, `market-feeds` therefore runs `gh workflow run pages.yml` so live Pages refresh without a manual dispatch (issue #14). Use the workflow **file** name (`pages.yml`), not the display name — `github-pages.yml` 404s on the Actions API.
