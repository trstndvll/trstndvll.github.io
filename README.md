## Tristan Douville — Product Manager Portfolio

This repository contains the source for my personal portfolio site, hosted via **GitHub Pages** at `https://trstndvll.github.io` and `https://www.trstndvll.com` (custom domain via [`CNAME`](CNAME)).

---

### Overview

The site is a single-page, responsive marketing-style page built with:

- **HTML5** for structure
- **CSS3** for layout and visual design (no framework)
- A small amount of **vanilla JavaScript** for:
  - Mobile navigation (hamburger menu)
  - Floating nav bar on scroll
  - Desktop active-section highlighting in nav
  - Dynamically setting the current year in the footer
  - Contact form submission via Formspree (with conditional reCAPTCHA)

The layout is optimized for readability on both desktop and mobile and is intended to be fast-loading and easy to maintain.

---

### AI agent resources

| Resource | Purpose |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | **Canonical rulebook** — coding conventions, WCAG AA, workflow, LLM file sync, and rules for AI agents working in this repo |
| [.cursor/rules/](.cursor/rules/) | **Cursor project rules** — always-applied instructions that point Agent at [CLAUDE.md](CLAUDE.md) as the source of truth ([Cursor rules docs](https://cursor.com/docs/rules)) |

Use CLAUDE.md when working with Claude Code or any AI assistant editing this codebase. Cursor loads `.cursor/rules/canonical-rules.mdc` automatically in every Agent session.

---

### Tech Stack

- **Frontend**: Plain HTML, CSS, and minimal JavaScript.
- **Styling**:
  - `css/styles.css` contains all custom styles.
  - Uses CSS custom properties for colors, spacing, and radii.
  - Responsive layout via media queries (mobile-friendly).
- **Fonts**:
  - [Google Fonts](https://fonts.google.com/) — `DM Sans` and `DM Serif Display`.
- **Contact form**:
  - [Formspree](https://formspree.io/) — form submissions are sent via POST to Formspree; you receive and manage them in the Formspree dashboard.
  - [reCAPTCHA v2](https://www.google.com/recaptcha/about/) — "I'm not a robot" checkbox to reduce spam.
- **Analytics**:
  - [Google Analytics](https://analytics.google.com/) (gtag) — page view tracking.
- **Hosting**:
  - [GitHub Pages](https://pages.github.com/) from the `trstndvll.github.io` repository, with custom domain `www.trstndvll.com`.

---

### LLM-friendly files

This site follows the [llms.txt](https://llmstxt.org/) convention for LLM-readable content:

| File | URL | Purpose |
|------|-----|---------|
| `llms.txt` | `https://www.trstndvll.com/llms.txt` | Curated summary for LLMs |
| `index.html.md` | `https://www.trstndvll.com/index.html.md` | Full markdown mirror of the portfolio page |

**When updating site content** (hero, case studies, experience, skills, nav sections, contact, etc.), update both files so they stay in sync with `index.html`. See [CLAUDE.md](CLAUDE.md) for the full sync checklist.

---

### SEO & discovery

| File | URL | Purpose |
|------|-----|---------|
| `sitemap.xml` | `https://www.trstndvll.com/sitemap.xml` | XML sitemap — lists all crawlable pages (`/`, `/llms.txt`, `/index.html.md`) |
| `robots.txt` | `https://www.trstndvll.com/robots.txt` | Crawler directives; references the sitemap |
| `404.html` | (served for missing URLs) | Custom GitHub Pages error page — styled consistently, `noindex`, not in the sitemap |

When you add a new standalone page or change portfolio content, update `sitemap.xml` per [CLAUDE.md](CLAUDE.md). In-page section anchors (`#about`, etc.) are not separate sitemap entries.

---

### Local Development

You can view or tweak the site locally in a few ways:

1. **Open directly in a browser**
   - Clone the repo:
     ```bash
     git clone https://github.com/trstndvll/trstndvll.github.io.git
     cd trstndvll.github.io
     ```
   - Open `index.html` in your browser (double-click or drag into a tab).

2. **Serve with a simple local HTTP server (recommended)**
   - Using Python 3:
     ```bash
     cd trstndvll.github.io
     python3 -m http.server 8000
     ```
   - Then open `http://localhost:8000` in your browser.

This avoids any cross-origin quirks and more closely matches how GitHub Pages will serve the site.

---

### GitHub Pages Deployment

Because this repository is named `trstndvll.github.io`, GitHub automatically serves the content from the **default branch** (typically `main`) at:

- `https://trstndvll.github.io`
- `https://www.trstndvll.com` (custom domain via [`CNAME`](CNAME))

To deploy updates:

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Update portfolio site"
   ```
2. Push to the default branch:
   ```bash
   git push origin main
   ```
3. Wait a minute or two for GitHub Pages to rebuild. Then refresh the live URL.

If you changed portfolio copy or added/renamed sections, confirm `llms.txt`, `index.html.md`, and `sitemap.xml` (`<lastmod>`) were updated too. Add a new `<url>` entry when introducing a new crawlable page.

---

### Resume

A print-ready resume page lives at `resume/index.html`. It uses the same design tokens as the main site and is intended to be opened in Chrome and saved as PDF via Cmd+P → Save as PDF.

The resume is linked from the hero section (`resume/`) but is intentionally excluded from nav, sitemap, and LLM files.

PDFs are excluded from version control via `.gitignore` (`resume/*.pdf`). Distribute the PDF directly — do not host it publicly.

To export:
1. Open `resume/index.html` in Chrome (via local server or directly)
2. Cmd+P → Destination: Save as PDF → Paper size: Letter → Save
3. Name the file descriptively (e.g. `tristan-douville-resume-2026.pdf`) and keep it locally
