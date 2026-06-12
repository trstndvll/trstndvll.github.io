# CLAUDE.md

Canonical rulebook for Claude Code working in this repository. For onboarding and feature detail, see [README.md](README.md).

## Project overview

Personal PM portfolio — single-page static site hosted on GitHub Pages at `https://trstndvll.github.io` / `https://www.trstndvll.com`.

## Tech stack

| Layer | Technology |
|-------|------------|
| Structure | HTML5 (`index.html`) |
| Styles | CSS3 — no framework (`css/styles.css`) |
| Scripts | Vanilla JS — inline in `index.html` |
| Fonts | Google Fonts — DM Sans, DM Serif Display |
| Forms | [Formspree](https://formspree.io/) |
| Spam protection | reCAPTCHA v2 |
| Analytics | Google Analytics (gtag) |
| Hosting | GitHub Pages + custom domain via `CNAME` |

**No Node, no bundler, no package manager, no build step.**

## Directory structure

| Path | Purpose |
|------|---------|
| `index.html` | Entire site: structure, content, inline SVGs, inline JS |
| `css/styles.css` | All styles; CSS custom properties, responsive breakpoints |
| `images/` | Static assets — `tristan.png`, `favicon.png`, `opengraph.png` |
| `llms.txt` | LLM-oriented site summary per [llms.txt spec](https://llmstxt.org/) — served at `/llms.txt` |
| `index.html.md` | Full markdown mirror of `index.html` — served at `/index.html.md` |
| `sitemap.xml` | XML sitemap for search engines — served at `/sitemap.xml`; lists all crawlable URLs |
| `robots.txt` | Crawler directives — served at `/robots.txt`; points to `sitemap.xml` |
| `CNAME` | Custom domain (`www.trstndvll.com`) |
| `README.md` | Human-facing intro, local dev, deployment |
| `.gitignore` | Ignores `.DS_Store` |

## Accessibility — WCAG AA

**Standard:** This site targets **WCAG 2.x Level AA**. Treat AA as a hard constraint — not a nice-to-have.

**Colour contrast**
- Normal text: **4.5:1** minimum
- Large text / UI components: **3:1** minimum
- Use AA-safe tokens instead of one-off hex values:
  - `--blue-dark` — text/buttons on light backgrounds
  - `--muted-on-dark` — placeholder/footer text on dark backgrounds (`#contact`)

**CSS fix comments**
- Existing AA fixes use `/* WCAG AA fix — was: … */` in `css/styles.css` — preserve when editing
- Add the same comment pattern when adjusting colours for contrast

**HTML patterns (already in use)**
- Decorative SVGs: `aria-hidden="true"`
- Interactive controls: `aria-label`, `aria-expanded`, `aria-live`
- Content images: meaningful `alt` text; decorative tool icons: `alt=""`
- Form reCAPTCHA hidden until fields filled; `aria-hidden` toggled with visibility
- `scroll-margin-top: 56px` on sections so anchor nav doesn't hide headings

**Keyboard**
- Hamburger menu, form submit, and `<details>` case-study summaries must work without a mouse
- New interactive elements need visible focus states

**Rule:** Any colour or interactive change must not regress AA compliance.

## Coding conventions

### HTML

- 2-space indent; `lang="en-CA"`
- Section markers: `<!-- NAV -->`, `<!-- HERO -->`, etc.
- Anchor-based single-page nav (`#about`, `#skills`, `#case-studies`, …)
- Inline Feather-style SVG icons on nav and section titles
- Semantic layout: `<section id="…">` → `.container` wrapper
- Case studies: native `<details>/<summary>` (not JS accordion)
- Copy: Canadian English

### CSS

- Single file: `css/styles.css`
- Section headers: `/* ── SECTION NAME ── */`
- Design tokens in `:root` — **always use variables**, not hardcoded colours
- Class naming: kebab-case; BEM-style modifiers (`form-recaptcha--hidden`)
- Card pattern: white bg, `border: 1px solid var(--border)`, `border-radius: var(--radius)`
- Typography: DM Sans (body/UI), DM Serif Display (hero, contact, case study titles)
- Responsive breakpoints: `1024px` (nav → hamburger), `640px` (grid collapse)

### JavaScript

- Inline `<script>` at bottom of `index.html` — no separate JS file today
- DOM queries by ID, event listeners, async `fetch` to Formspree
- reCAPTCHA shown only after all form fields filled (`updateRecaptchaVisibility`)

### Assets

- Images live in `images/`
- Mixed path style today:
  - Favicon / OG meta: absolute `/images/…` or full `https://www.trstndvll.com/images/…`
  - Content images: relative `images/tristan.png`

### Third-party keys

Formspree endpoint, reCAPTCHA site key, and GA ID are committed in HTML. These are public client-side keys — acceptable for these services.

## LLM-friendly files

This site follows the [llms.txt](https://llmstxt.org/) convention for LLM-readable content:

- **`llms.txt`** — curated summary: elevator pitch, distilled skills/experience/case studies, links to site sections and profiles. Linked from the site footer (`LLM resources`).
- **`index.html.md`** — full-fidelity markdown of all page content for LLMs that need detail beyond the summary.

Both are static files at repo root; GitHub Pages serves them with no build step.

## Sitemap

`sitemap.xml` lists every **standalone, crawlable URL** on the site (canonical domain `https://www.trstndvll.com`). `robots.txt` references it via a `Sitemap:` directive.

**Currently listed:** `/`, `/llms.txt`, `/index.html.md`.

**Do not list** in-page section anchors (`#about`, `#skills`, …) — search engines treat the portfolio as a single page at `/`. Section URLs belong in `llms.txt` (`## Site sections`), not in the sitemap.

**When adding a new page** (new HTML file, or any new root-level resource served as its own URL): add a `<url>` block to `sitemap.xml` with `<loc>`, `<lastmod>` (ISO date), and appropriate `<changefreq>` / `<priority>`. Bump `<lastmod>` on existing entries when those files change materially.

## Run, test, build, deploy

| Action | Command |
|--------|---------|
| Local preview (recommended) | `python3 -m http.server 8000` → `http://localhost:8000` |
| Local preview (quick) | Open `index.html` in browser |
| Build | None |
| Test | None — manual browser check |
| Deploy | Commit + push to `main`; GitHub Pages rebuilds in ~1–2 min |

See [README.md](README.md) for step-by-step local dev and deployment instructions.

## Rules for Claude

### Always

- Keep changes minimal and scoped to the request
- Match existing HTML/CSS patterns (tokens, class names, section structure)
- **Maintain WCAG AA compliance** — do not regress contrast, keyboard access, or screen-reader support
- Use AA-safe tokens (`--blue-dark`, `--muted-on-dark`) instead of lighter/darker one-offs
- Add `/* WCAG AA fix */` comments when adjusting colours for contrast
- Preserve `aria-*` attributes, alt text, focus states, and `aria-live` feedback patterns
- Test locally with HTTP server before considering done
- Use Canadian English in copy edits
- When editing portfolio copy or structure in `index.html`, update `index.html.md` and `llms.txt` in the same pass — do not leave them stale
- After any content/structure edit: spot-check `llms.txt` and `index.html.md` reflect the same facts and section anchors as `index.html`
- When adding a new crawlable page or materially updating an existing one, update `sitemap.xml` (`<lastmod>` at minimum; new `<url>` entry for new pages)

### Never

- Introduce colour combinations that fail WCAG AA contrast
- Remove or weaken existing accessibility attributes to simplify markup
- Introduce frameworks (React, Tailwind, etc.) or build tooling without explicit request
- Split into multiple pages or add routing without explicit request
- Commit secrets that aren't already public client-side keys
- Create commits or push unless explicitly asked
- Duplicate README content into this file

### When editing content

- Hero, experience, case studies, skills: all inline in `index.html`
- New case study: copy existing `<details class="case-study">` structure (Context → Problem → Role → Decisions → Execution → Outcome)
- New nav item: add to both `.nav-links` and `.mobile-menu` with matching SVG icon
- **Keep LLM files in sync:** Any change to portfolio **content** or **structure** in `index.html` must also update `index.html.md` and `llms.txt` in the same change (or immediately follow-up commit)
- **`index.html.md`:** Mirror all copy changes — hero, about, skills, case studies, experience, volunteering, education, contact, footer. Match section order and headings to `index.html`
- **`llms.txt`:** Update the distilled body (skills, experience table, case study summaries, contact) and the `## Site sections` link list when sections are added, renamed, or removed. Keep the summary concise; do not paste full case study bodies here
- **New nav section:** Add anchor to both `.nav-links` / `.mobile-menu` in `index.html`, a matching section in `index.html.md`, an entry under `## Site sections` in `llms.txt`
- **New case study:** Add full `<details>` block in `index.html`, full section in `index.html.md`, one-line summary in `llms.txt` case studies list
- **New standalone page** (e.g. new `.html` or served static file at repo root): add a `<url>` entry in `sitemap.xml`; update `llms.txt` / `index.html.md` only if content belongs there
- **Homepage content change:** bump `<lastmod>` on the `/` entry in `sitemap.xml` when portfolio copy or structure changes

### When editing styles

- Add to `css/styles.css` in the appropriate section
- Use existing CSS variables; add new tokens to `:root` if needed
- Update responsive rules in the `@media` blocks at file bottom

## [SUGGESTED] conventions

Not yet enforced — review and accept/reject before treating as canonical.

- **[SUGGESTED] Commit messages:** Imperative, sentence-case (e.g. `Add volunteer section`, `Fix case study mobile padding`). Avoid kebab-case (`update-hero`).
- **[SUGGESTED] External links:** Always add `rel="noopener noreferrer"` on `target="_blank"` links (currently inconsistent).
- **[SUGGESTED] Image paths:** Standardize on relative `images/…` for portability; reserve absolute URLs for OG/Twitter meta only.
- **[SUGGESTED] JS extraction:** If JS grows beyond ~80 lines, move to `js/main.js` — not needed today.
- **[SUGGESTED] Pre-deploy checklist:** Nav (desktop + mobile), case study expand/collapse, contact form + reCAPTCHA, responsive at 640px/1024px, **WCAG AA contrast spot-check** on any changed colours (browser DevTools or [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)).
- **[SUGGESTED] Tooling:** Do not add ESLint/Prettier/CI unless the project grows significantly.

## Where README is the better reference

- Clone and setup instructions
- High-level architecture description
- Formspree and reCAPTCHA service explanations
