# Resume variants (local only)

Per-application tailored resumes live in `resume-variants/` at the repo root. That directory is **gitignored** — never committed or published to GitHub Pages.

## Create a variant

1. Copy the shape below into `resume-variants/<name>.js` (lowercase letters, numbers, hyphens only).
2. Override **only** what changes. Nested objects merge key-by-key; any **array** present on the variant replaces the canonical array wholesale (no concat).
3. Add `{ name: '<name>', label: '… (local)' }` to [`local-variants.js`](local-variants.js) so the homepage Resume dropdown shows it on localhost.
4. **Always run the extract check** (below) before treating the variant as done. Agents creating or editing a variant must run it and summarize the `pdftotext` output against the intended copy.

```js
const resumeVariant = {
  header: { bio: "…" },
  selectedWork: [ /* full list replacement */ ],
  experience: [ /* full list replacement when bullets change */ ],
  skills: {
    "Product Leadership": [ /* replaces that category only */ ]
  }
};
```

Canonical content stays in [`resume-data.js`](resume-data.js).

## Render locally

```bash
python3 -m http.server 8000
```

| URL | What you get |
|-----|----------------|
| http://localhost:8000/resume/ | Canonical, full (all Selected Work) |
| http://localhost:8000/resume/?mode=compact | Canonical, compact (`includeInAts: false` items omitted) |
| http://localhost:8000/resume/?mode=full&variant=abebooks | Abebooks variant, full |

On localhost, the homepage **Resume** dropdown also lists registered local variants.

Published Full / Compact links never pass `?variant=`, so the live site always shows the canonical resume.

## Verify extract order (`pdftotext`)

Requires: local server on port 8000, [Google Chrome](https://www.google.com/chrome/), and `pdftotext` (`brew install poppler`).

```bash
# Canonical
./resume/verify-extract.sh full
./resume/verify-extract.sh compact

# Variant (example)
./resume/verify-extract.sh full abebooks
```

The script prints a Letter PDF via Chrome headless, runs `pdftotext -layout`, and checks that section headings appear top-to-bottom:

Selected Work → Product Experience → Skills & Tools → Education & Certifications → Volunteering

PDFs land at `resume/_verify-*.pdf` (gitignored). Agents should paste or summarize the extracted text in the reply so it can be checked against the pre-transform / intended variant copy for sense and completeness.

## Before submitting anywhere

1. Run `./resume/verify-extract.sh full <name>` (and compact if you will submit that mode).
2. Skim the extracted text: correct order, no missing sections, copy matches the application.
3. Optionally Cmd+P from the browser for a final visual PDF; keep PDFs local.
