## Tristan Douville — Product Manager Portfolio

This repository contains the source for my personal portfolio site, hosted via **GitHub Pages** at `https://trstndvll.github.io`.  

---

### Overview

The site is a single-page, responsive marketing-style page built with:

- **HTML5** for structure
- **CSS3** for layout and visual design (no framework)
- A small amount of **vanilla JavaScript** for:
  - Mobile navigation (hamburger menu)
  - Dynamically setting the current year in the footer

The layout is optimized for readability on both desktop and mobile and is intended to be fast-loading and easy to maintain.

---

### Tech Stack

- **Frontend**: Plain HTML, CSS, and minimal JavaScript.
- **Styling**:
  - `css/styles.css` contains all custom styles.
  - Uses CSS custom properties for colors, spacing, and radii.
  - Responsive layout via media queries (mobile-friendly).
- **Fonts**:
  - [Google Fonts](https://fonts.google.com/) — `DM Sans` and `DM Serif Display`.
- **Hosting**:
  - [GitHub Pages](https://pages.github.com/) from the `trstndvll.github.io` repository.

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
