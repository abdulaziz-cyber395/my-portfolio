# Portfolio Developer Guide

## Project Overview

This is a modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. The design system uses fluid typography and spacing with CSS custom properties for consistent scaling across all viewport sizes.

---

## Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Design system variables and global styles
│   ├── layout.css         # Layout, sections, and component styles
│   └── responsive.css     # Media query breakpoints
├── js/
│   └── script.js          # Navigation toggle and interactions
└── assets/
    ├── images/
    │   └── profile.png    # Profile photo
    └── icons/
        └── favicon.ico
```

---

## CSS Architecture

### 1. main.css - Design Tokens

Defines all CSS custom properties (variables). This is your single source of truth for design decisions.

**Importance:** Always add new design tokens here first. All other CSS files reference these variables.

### 2. layout.css - Layout & Components

Contains all structural styles, component styling, and layout rules. Organizes styles by section and component type.

### 3. responsive.css - Breakpoints

Mobile-first approach. Defines breakpoints using `@media` queries that override base styles from main.css and layout.css.

---

## Spacing System (Simplified)

The spacing system uses **8 values** with intuitive names. Each is a fluid `clamp()` that scales smoothly between min/max values.

### Spacing Scale

| Variable | Min → Max | Range | When to Use |
|----------|-----------|-------|-------------|
| `--space-2xs` | 0.25rem → 0.5rem | 4–8px | Tiny gaps, icon spacing, border widths |
| `--space-xs` | 0.5rem → 1rem | 8–16px | Paragraph margins, input padding, tight gaps |
| `--space-sm` | 0.75rem → 1.25rem | 12–20px | Between related elements, button padding, card padding |
| `--space-md` | 1rem → 1.5rem | 16–24px | Standard spacing, form field padding, section headers |
| `--space-lg` | 1.5rem → 2rem | 24–32px | Between major sections, card margins, grid gaps |
| `--space-xl` | 2rem → 2.5rem | 32–40px | Container padding, component separation |
| `--space-2xl` | 3rem → 3rem | 48px | Large grid gaps (About section, feature grids) |
| `--space-3xl` | 4rem → 4rem | 64px | **Section vertical padding** (all `<section>` padding) |

### Quick Reference

```css
/* Vertical spacing hierarchy */
section               { padding: var(--space-3xl) 0; }  /* 64px */
.about-content        { gap: var(--space-xl); }         /* 32-40px */
.project-card         { padding: var(--space-lg); }     /* 24-32px */
.hero-buttons         { gap: var(--space-xs); }         /* 8-16px */
p, h1, h2, h3         { margin-bottom: var(--space-xs); }
nav ul                { gap: var(--space-lg); }         /* 24-32px */
```

### Adding New Spacing

If you need a spacing value not covered:

**Option A (Recommended):** Combine existing tokens
```css
.element {
  margin: var(--space-md) var(--space-lg); /* horizontal and vertical differ */
}
```

**Option B (Rarely needed):** Create a new token in `:root` in main.css
```css
--space-4xl: clamp(5rem, 10vw, 6rem);
```
Then document why you needed it.

---

## Color Palette

| Variable | Hex / HSL | Usage |
|----------|-----------|-------|
| `--bg-page` | `hsl(222, 47%, 7%)` | Page background (darkest) |
| `--bg-section-alt` | `hsl(222, 35%, 12%)` | Alternate section backgrounds |
| `--bg-card` | `hsl(222, 30%, 16%)` | Cards, inputs, nav |
| `--text-primary` | `hsl(210, 40%, 98%)` | Main text, headings |
| `--text-secondary` | `hsl(215, 20%, 65%)` | Body text, muted content |
| `--accent-green` | `hsl(155, 65%, 45%)` | Primary CTA buttons, links, borders |
| `--accent-hover` | `hsl(155, 65%, 52%)` | Hover states (12% lighter) |
| `--accent-soft` | `hsl(155, 55%, 70%)` | Subtle accents (rare) |

**Color contrast ratios:** All text meets WCAG AA standards (4.5:1 minimum).

---

## Typography

### Fonts
- **Space Grotesk:** Headings (h1, h2, h3), bold display text
- **Manrope:** Body text, UI elements, forms

### Fluid Type Scale

All font sizes use `clamp(min, preferred, max)` for smooth scaling:

| Variable | Example at 320px | Example at 1920px | Fixed Range |
|----------|-----------------|------------------|-------------|
| `--font-size-h1` | 2rem | 3rem | 32–48px |
| `--font-size-h2` | 1.5rem | 2.25rem | 24–36px |
| `--font-size-h3` | 1.25rem | 1.75rem | 20–28px |
| `--font-size-body` | 1rem | 1.125rem | 16–18px |

**Line heights:**
- Headings: `--line-height-heading` = 1.2
- Body: `--line-height-body` = 1.5

---

## Layout Patterns

### Container
```css
.container {
  max-width: clamp(300px, 90vw, 1200px);
  margin: 0 auto;
  padding: 0 var(--space-xs);
}
```
**Use:** Wrap all section content in `<div class="container">`.

### Grid Layouts

**Three-column grid** (Projects):
```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}
```

**Two-column grid** (About):
```css
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
}
```

**Four-column grid** (Skills):
```css
.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-sm);
}
```

---

## Responsive Breakpoints

| Breakpoint | Max Width | Styles Applied |
|------------|-----------|----------------|
| Desktop | 1024px+ | 3-col projects, 4-col skills |
| Tablet | 860px | Stack hero & about to single column |
| Mobile | 768px | Single column projects & skills, reduced section padding |
| Small Mobile | 480px | Tighter container padding, smaller avatars |

**Mobile-first:** Start with base styles (mobile), then add `@media (max-width: ...)` overrides for larger screens.

---

## Component Library

### Buttons
```html
<a href="#" class="btn">Primary</a>
<a href="#" class="btn btn-secondary">Secondary</a>
```
**Styles:**
- Primary: Green background, white text
- Secondary: Transparent, green border
- Padding: `var(--space-xs) var(--space-lg)`
- Radius: `var(--radius-md)`

### Cards (Projects)
```html
<article class="card project-card">
  <div class="project-image">
    <img src="assets/images/project-screenshot.png" alt="Project screenshot">
  </div>
  <h3>Project Title</h3>
  <p>Description...</p>
  <div class="project-tech">
    <span class="tech-tag">React</span>
  </div>
  <div class="project-links">
    <a href="#" class="project-link primary">Live Demo</a>
    <a href="#" class="project-link secondary">GitHub</a>
  </div>
</article>
```
**Structure:**
- `.project-image` container first (top of card)
- Image: 100% width, 180px height (160px mobile, 140px small mobile), `object-fit: cover`
- Hover effect: slight zoom on image
- Title (`h3`), description (`p`), tech tags, links below
- Padding: `var(--space-lg)`
- Gap between elements: `var(--space-xs)`
**Card padding:** `var(--space-lg)`  
**Card gap:** `var(--space-xs)` between description and tech tags

### Skill Chips
```html
<span class="skill-chip">React</span>
```
- Background: `var(--bg-section-alt)`
- Padding: `var(--space-md)`
- Hover: Green border & text

### Form Inputs
```css
input, textarea {
  padding: var(--space-md);
  border: var(--border-thin) solid rgba(255,255,255,0.08);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  color: var(--text-primary);
}
input:focus {
  border-color: var(--accent-green);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
}
```

---

## Adding a New Section

1. **HTML:** Add section in `index.html` before `</main>`
```html
<section id="new-section">
  <div class="container">
    <h2>Section Title</h2>
    <!-- Content -->
  </div>
</section>
```

2. **CSS:** Add background color in `layout.css` (alternate between `--bg-section-alt` and `--bg-card`):
```css
#new-section {
  background-color: var(--bg-card);
}
```

3. **Spacing:** Sections automatically get:
   - Vertical padding: `var(--space-3xl)` (defined in base `section` rule)
   - Bottom border: `var(--border-thin)` (for separation)

4. **Responsive:** No extra work needed unless layout changes at breakpoints.

---

## Media Query Best Practices

- **Order matters:** Base styles first, then `@media` overrides (max-width mobile-first)
- **Use spacing tokens inside media queries:**
```css
@media (max-width: 768px) {
  section { padding: var(--space-3xl) 0; } /* ✅ uses token */
}
```
- **Avoid fixed pixels** except for very specific design constraints (avatar sizes, image max-widths).

---

## Background Colors & Visual Separation

Sections alternate between two background colors for visual rhythm:

```css
/* Even sections: var(--bg-section-alt) - slightly lighter */
#hero, #projects, #contact { background: var(--bg-section-alt); }

/* Odd sections: inherit from body (var(--bg-page)) or var(--bg-card) */
#about, #skills, footer { background: var(--bg-card); }
```

Every section has a `border-bottom` (except last) to add subtle separation.

---

## Image Guidelines

| Image | Size | Shape | Border |
|-------|------|-------|--------|
| Profile photo (About) | `var(--avatar-size)` | `border-radius: 50%` | `var(--border-thickest) solid var(--accent-green)` |
| Project screenshots | 180px height (responsive) | `border-radius: var(--radius-md)` | No border (image fills card width) |

**Project images:**
- Aspect ratio: 16:9 (e.g., 800×450px)
- Sizing: `width: 100%`, `height: 180px`, `object-fit: cover`
- Location: First child inside `.project-card`
- Hover: subtle scale effect (1.03×)

---

## JavaScript

**Current:** Only one script - mobile navigation toggle in `js/script.js`.

**To add more JS:**
1. Create a new file in `js/` (e.g., `form-handler.js`)
2. Import at bottom of `index.html` before `</body>`
3. Use `DOMContentLoaded` event listener:
```js
document.addEventListener('DOMContentLoaded', () => {
  // Your code
});
```

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge) - last 2 versions
- CSS custom properties, `clamp()`, CSS Grid, Flexbox
- No IE11 support (intentional, modern-only)

---

## Performance Checklist

- ✅ All images optimized (PNG compressed, consider WebP)
- ✅ No external CSS frameworks (minimal file size)
- ✅ System fonts loaded via Google Fonts with proper preconnect
- ✅ Minimal JavaScript (no jQuery)
- ✅ CSS contained in 3 files for easy caching

---

## Common Tasks

### Change accent color
Edit `--accent-green` HSL value in `main.css :root`. All buttons, links, borders update automatically.

### Adjust section spacing
Modify `--space-3xl` value (section padding). Change in one place, updates everywhere.

### Add new project card
Copy existing `.project-card` HTML block in `index.html` → update title, description, tech tags.

### Modify breakpoints
Edit media query widths in `responsive.css`. Spacing inside breakpoints uses tokens, no math needed.

### Change navbar height
Update `--navbar-height` token. Also adjust mobile drawer `right` position if needed.

---

## Code Style

- **Indentation:** 2 spaces (consistent across HTML, CSS, JS)
- **Semicolons:** Required in CSS
- **Quotes:** Double quotes in HTML, single in JS
- **Naming:** kebab-case for classes, BEM-lite (block__element--modifier) for components
- **Comments:** Brief comments above sections in CSS, inline HTML comments for structure

---

## Git Workflow

```bash
# Feature branch
git checkout -b feature/new-section

# After changes
git add .
git commit -m "Add testimonials section with carousel"

# Push & PR
git push origin feature/new-section
```

**Commit message format:** Action + description (imperative mood).  
Examples: "Add contact form validation", "Fix hero spacing on mobile", "Update project descriptions".

---

## Troubleshooting

**Spacing looks wrong on one screen size?**  
→ Check you're using `var(--space-*)` tokens, not fixed pixels.

**Section colors blend together?**  
→ Ensure sections have alternating `background-color` set.

**Mobile menu not opening?**  
→ Check `script.js` loaded and `.menu-toggle` has click listener.

**Images misaligned?**  
→ Verify container has `display: flex/grid` with proper `align-items`.

---

## Future Enhancements

- [ ] Add dark/light theme toggle
- [ ] Implement contact form with Formspree or Netlify Forms
- [ ] Add project filtering by tech stack
- [ ] Add smooth scroll indicator
- [ ] Integrate analytics
- [ ] Add accessibility: skip-to-content link, ARIA labels

---

**Last updated:** May 2026  
**Maintained by:** Portfolio owner  
**Questions?** Refer to inline code comments or open an issue in the repo.
