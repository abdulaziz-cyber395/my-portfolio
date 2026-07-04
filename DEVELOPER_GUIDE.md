# Portfolio Developer Guide

## Project Overview

A vanilla HTML/CSS/JS portfolio — no framework, no build step. Content for projects, the resume, and the Figma showcase is data-driven (JS arrays rendered into the DOM), so most updates only require editing a data file, not touching markup.

> For a friendlier, task-oriented version of this guide (written for future-you, not for other developers), see `documentation.html` — it's also linked from the site footer.

---

## Project Structure

```
my-portfolio/
├── index.html              # Homepage (hero, about, education, projects, figma designs, approach, skills, contact)
├── projects.html            # Full project detail pages (filterable)
├── resume.html               # Auto-generated resume — do not hand-edit, it's rendered from data files
├── documentation.html        # In-app maintenance guide (see css/docs.css, js/docs.js)
├── css/
│   ├── style.css            # Every design token + all component/layout styles for the main site
│   └── docs.css             # Styles for documentation.html only
├── js/
│   ├── projects-data.js     # Single source of truth for projects — feeds index.html, projects.html AND resume.html
│   ├── figma-designs.js     # Figma design showcase grid (index.html) — same array+render pattern as projects
│   ├── resume-data.js       # Personal info, skills, education for resume.html
│   ├── resume.js            # Merges projects-data.js + resume-data.js and renders resume.html
│   ├── script.js            # Shared interactions: theme toggle, nav, scroll spy, reveal animations, filtering, contact form
│   └── docs.js               # documentation.html interactions (sidebar nav, mobile toggle)
├── assets/
│   ├── images/                # Project screenshots + profile photos
│   ├── figma img/              # Figma design screenshots (used by js/figma-designs.js)
│   └── icons/favicon.ico
├── scripts/
│   ├── optimize-images.js    # Compresses assets/images + assets/figma img (sharp) — npm run optimize-images
│   └── minify-css.js         # Strips whitespace/comments from style.css in place — npm run css:build
├── optimize-images.ps1       # PowerShell fallback for the image script (Windows, no Node required)
└── send_email.php            # Not currently wired to the contact form (see below)
```

**Note on the contact form:** the form in `index.html` posts to Formsubmit (`action="https://formsubmit.co/..."`), not `send_email.php`. If you intend to use the PHP mailer instead, you'll need to update the form's `action` and host it somewhere PHP runs (Formsubmit and GitHub Pages/Netlify/Vercel static hosting won't execute it).

---

## CSS Architecture

Everything lives in **`css/style.css`** — one file, organized top-to-bottom by section (base resets → navbar → hero → cards/grids → forms → footer → responsive breakpoints at the bottom).

### Design tokens (`:root`)

| Variable | Value (dark) | Usage |
|---|---|---|
| `--background` | `#060a08` | Page background |
| `--surface` | `#0c1210` | Slightly raised surfaces (inputs, icon chips) |
| `--card` | `#101a16` | Card backgrounds |
| `--border` / `--border-strong` | translucent white | Default / emphasized borders |
| `--text` / `--text-secondary` / `--text-muted` | `#edf2f0` / `#9caea8` / `#5f736b` | Text hierarchy |
| `--accent` / `--accent-deep` | `#6ee7b7` / `#34d399` | Buttons, links, focus rings, highlights |
| `--radius` | `6px` | Standard corner radius |
| `--container` | `1100px` | Max content width |

`[data-theme="light"]` on `<html>` swaps these to a light palette (accent becomes `#059669`). The toggle button in the navbar flips `data-theme` and persists the choice to `localStorage` (see `script.js`).

### Typography

**Inter** (400/500/600) via Google Fonts, with `preconnect` + `preload` in `<head>` and a system-font fallback stack. There is no separate heading font — headings use the same family at higher weight.

### Grid layouts

Every content grid follows the same convention: 3 columns on desktop, 2 at `≤1080px`, 1 at `≤760px`.

```css
.projects-grid,      /* Selected Projects, index.html */
.figma-grid {         /* Figma Designs, index.html */
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.15rem;
}
```

When adding a new grid section, add its class name alongside `.projects-grid`/`.figma-grid` in both the `1080px` and `760px` media query blocks near the bottom of `style.css` — don't create a new standalone breakpoint block.

### Responsive breakpoints

| Breakpoint | Applies |
|---|---|
| `1080px` | Grids drop to 2 columns; mobile nav drawer takes over from the pill nav |
| `760px` | Grids drop to 1 column; hamburger menu appears; hero stacks |
| `520px` | Buttons/links go full-width; tighter section padding |

---

## Data-Driven Content

This is the core pattern of the codebase — **content lives in JS arrays, not HTML**, and a small render function injects markup into a container `<div>` on `DOMContentLoaded`.

### Projects (`js/projects-data.js`)

The `projects` array is the single source of truth. Adding a project here automatically:
- Adds a card to the homepage grid (`renderProjectCards`)
- Adds a full detail section to `projects.html` (`renderProjectDetails`)
- Adds an entry to the auto-generated resume (`resume.js` reads this same array)

Template:
```js
{
  id: "my-project",
  number: "06",
  title: "My Project",
  summary: "One sentence about what it does and who it helps.",
  category: "interactive", // educational | corporate | design-system | interactive | form-design
  image: "assets/images/my-project.png",
  tech: ["HTML", "CSS", "JavaScript"],
  liveUrl: "#",              // "#" hides the live-demo link on the resume
  githubUrl: "https://github.com/yourusername/your-repo",
  details: [
    { heading: '<i class="fa-solid fa-bullseye"></i> The Real Problem', content: "<p>...</p>" },
    { heading: '<i class="fa-solid fa-lightbulb"></i> Key Solutions Delivered', list: ["Point one: detail.", "Point two: detail."] }
  ]
}
```
Rendered `<img>` tags use `width="320" height="180" loading="lazy"` — keep new screenshots close to a 16:9 ratio so they don't look stretched inside `.project-image` (`aspect-ratio: 16/10`).

### Figma Designs (`js/figma-designs.js`)

Same pattern, simpler shape — powers the "Figma Designs" grid on `index.html`:
```js
{
  id: "figma-design-8",
  title: "Descriptive Title — What It Is",
  image: "assets/figma img/your-screenshot.png",
  liveUrl: "https://www.figma.com/proto/..." // prototype link, see note below
}
```

**Important — use a prototype link, not a file link.** Copy the link from the **"Share prototype"** button inside the prototype viewer (`figma.com/proto/...`), not the regular file/edit link. Prototype-only links let visitors click through the design with no access to the canvas or layers. Keep the share permission on **"can view"** (view-only already blocks editing); optionally disable "Viewers can copy, share, and export from this file" under Share → Advanced for extra protection against duplication (paid Figma plans).

Hover state ("See Live Design") and the darken/scale effect live in `style.css` under `.figma-card`, `.figma-card-image`, `.figma-card-overlay`.

### Resume (`js/resume-data.js` + `js/resume.js`)

`resume-data.js` holds everything NOT already covered by projects: name, title, contact info, summary, skills (technical/learning/soft), education. `resume.js` merges this with the `projects` array and renders `resume.html` — you never hand-edit `resume.html`.

---

## Script Loading Order

| Page | Order | Why |
|---|---|---|
| `index.html` | `projects-data.js` → `figma-designs.js` → `script.js` | Data files register `DOMContentLoaded` renderers; `script.js` handles interactions/animations after |
| `projects.html` | `projects-data.js` → `script.js` | Renders full project details + filtering |
| `resume.html` | `projects-data.js` → `resume-data.js` → `resume.js` → `script.js` | `resume.js` needs both data sources loaded first |
| `documentation.html` | `docs.js` | Self-contained, no shared data |

All scripts are plain (non-module) `<script>` tags at the end of `<body>`. Rendering happens inside `DOMContentLoaded` listeners — if you add a new dynamically-rendered element and want it to participate in the scroll-reveal fade-in (`script.js`'s `revealTargets`), note that top-level `querySelectorAll` calls in `script.js` run *before* those elements exist (same reason `.project-card` doesn't currently get the fade-in either). This is a pre-existing quirk, not something new sections need to solve individually.

---

## Performance Conventions

- **Images:** run `npm run optimize-images` before committing new screenshots (compresses `assets/images` and `assets/figma img` via `sharp` — resizes to a max of 1200px on the longest side, recompresses PNG/JPEG in place). A PowerShell equivalent (`optimize-images.ps1`) exists for Windows users without Node.
- **Layout shift:** grid images use a fixed `aspect-ratio` on their container (`.project-image`, `.figma-card-image`) so space is reserved before the image loads; standalone images (hero, about) carry explicit `width`/`height` attributes instead.
- **Lazy loading:** every image below the fold uses `loading="lazy"`. The hero/profile image is the exception — it's the LCP element, so it uses `fetchpriority="high"` plus a matching `<link rel="preload" as="image">` in `<head>`, and is never lazy-loaded.
- **Fonts/icons:** Google Fonts are preconnected + preloaded; Font Awesome is loaded with the `media="print" onload="this.media='all'"` trick so it doesn't block first render.
- **CSS:** `npm run css:build` (`scripts/minify-css.js`) strips comments/whitespace from `style.css` **in place** — there is no separate `dist` file. Only run this right before deploying a snapshot you don't intend to keep editing; run it on a copy/branch if you want to preserve the readable source for future edits.

---

## Adding a New Section

1. **HTML** — in `index.html`, follow the existing pattern: `<section id="..." class="section">` → `.container` → `.section-title` → content.
2. **Nav link** — add a matching `<li><a href="#your-id">Label</a></li>` in `#main-nav`.
3. **CSS** — style it in `style.css`, near a similar existing component.
4. **Scroll spy** — nothing extra needed; `script.js` matches nav links to sections by `id` automatically.

---

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge — last 2 versions). Relies on CSS Grid, `clamp()`, `aspect-ratio`, and custom properties. No IE11 support (intentional).

---

## Common Tasks

**Change the accent color** — edit `--accent` (and `--accent-deep`) in `style.css` `:root`, plus the light-theme equivalents under `[data-theme="light"]`.

**Add a project** — edit `js/projects-data.js` (see template above). It appears on the homepage, `projects.html`, and the resume automatically.

**Add a Figma design** — edit `js/figma-designs.js`, use a prototype link for `liveUrl` (see note above).

**Adjust breakpoints** — the three `@media` blocks near the bottom of `style.css` (`1080px`, `760px`, `520px`) are the canonical ones; there are a couple of small early standalone media queries for form-field spacing specifically — leave those alone unless you're touching the contact form.

---

## Troubleshooting

**Project/design not showing up** — check for a missing comma after the previous array entry, a duplicate `id`, or an image path that doesn't match the actual filename (case and spaces included).

**Images look broken** — open the browser console (F12) for 404s. Filenames in the data files must exactly match files in `assets/` — including capitalization, spaces, and extension.

**Resume shows a project twice / not at all** — `resume.js` deduplicates by `title`. Make sure the title in `projects-data.js` isn't also hand-duplicated in `resume-data.js`.

**Styles look wrong after editing `style.css`** — if you ran `npm run css:build`, the file is now minified on one line; that's expected, not broken.

---

**Last updated:** July 2026
**Maintained by:** Portfolio owner
