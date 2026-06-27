# Abdul Aziz — Frontend Developer Portfolio

A modern, accessible portfolio website built with semantic HTML, CSS custom properties, and vanilla JavaScript. Features a dark/light theme system, custom cursor, keyboard shortcuts, and a data-driven project showcase.

## Table of Contents

- [Quick Start: Adding / Updating Projects](#quick-start-adding--updating-projects)
- [Project Data Format Reference](#project-data-format-reference)
- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [File Structure](#file-structure)
- [Setup Instructions](#setup-instructions)
- [Deployment Guide](#deployment-guide)
- [Contact Information](#contact-information)

## Quick Start: Adding / Updating Projects

All projects are stored in one file: **`js/projects-data.js`**.
You do **not** need to touch `index.html` or `projects.html`.

### Add a new project

1. Open `js/projects-data.js`.
2. Scroll to the `projects` array (starts at line 1).
3. Copy the template below, paste it **before** the closing `];`, and fill in your details.
4. Save a screenshot to `assets/images/` (recommended `800×450px`, 16:9 ratio).
5. Refresh the browser — the new project appears automatically on both pages.

### Update an existing project

Find the project object inside the `projects` array and change any property (`title`, `summary`, `image`, `tech`, `liveUrl`, `githubUrl`, etc.).

### Remove a project

Delete the entire object from the array. Make sure commas between remaining objects are still valid.

## Project Data Format Reference

Every project is a JavaScript object inside the `projects` array.

### Required fields

| Field | Type | Purpose |
|---|---|---|
| `id` | string | Unique anchor used in URLs (`projects.html#my-project`). |
| `number` | string | Display number on the project detail page (e.g. `"06"`). |
| `title` | string | Project name shown on cards and detail pages. |
| `summary` | string | One-line description shown on the home page grid. |
| `category` | string | One of: `educational`, `corporate`, `design-system`, `interactive`, `form-design`. |
| `image` | string | Path to the screenshot in `assets/images/`. |
| `tech` | array | List of technologies, e.g. `["HTML", "CSS", "JavaScript"]`. |
| `liveUrl` | string | Live demo URL — use `"#"` if not deployed. |
| `githubUrl` | string | GitHub repository URL. |
| `details` | array | Rich content blocks rendered on `projects.html`. |

### `details` block formats

Use **either** `content` (paragraphs / HTML) **or** `list` (bullet points):

```javascript
// Paragraph format (supports HTML tags like <p> and <strong>)
{
  heading: "<i class=\"fa-solid fa-bullseye\"></i> The Real Problem",
  content: "Describe the problem in one or more paragraphs."
}

// List format (auto-bolds text before the first colon)
{
  heading: "<i class=\"fa-solid fa-lightbulb\"></i> Key Solutions Delivered",
  list: [
    "Feature One: What was built and why it matters.",
    "Feature Two: How it helps the end user."
  ]
}
```

### Quick copy-paste template

```javascript
{
  id: "your-project-id",
  number: "07",
  title: "Project Title",
  summary: "One sentence describing what this project does and who it helps.",
  category: "interactive",
  image: "assets/images/your-screenshot.png",
  tech: ["HTML", "CSS", "JavaScript"],
  liveUrl: "#",
  githubUrl: "https://github.com/yourusername/your-repo",
  details: [
    {
      heading: "<i class=\"fa-solid fa-bullseye\"></i> The Real Problem",
      content: "What problem does this solve for users?"
    },
    {
      heading: "<i class=\"fa-solid fa-building\"></i> How I Approached It",
      content: "<p><strong>Step 1:</strong> What you did first.</p><p><strong>Step 2:</strong> How you structured it.</p>"
    },
    {
      heading: "<i class=\"fa-solid fa-lightbulb\"></i> Key Solutions Delivered",
      list: [
        "Solution 1: What feature was built.",
        "Solution 2: What benefit it provides.",
        "Solution 3: How it helps users."
      ]
    },
    {
      heading: "<i class=\"fa-solid fa-rocket\"></i> What I Learned as a Developer",
      content: "<p>Your key learnings from this project.</p>"
    }
  ]
}
```

### Rules to avoid common errors

- **Commas**: Add `,` after every project object **except** the last one in the array.
- **Unique IDs**: Every `id` must be unique across all projects.
- **Image paths**: The `image` path must match the actual file inside `assets/images/`.
- **Valid categories**: Use only the five predefined categories listed above.
- **Quotes**: Keep all string values wrapped in quotes.

---

## Introduction

This portfolio represents the professional work of Inusah Abdul Aziz, an IT student and frontend developer focused on building structured, meaningful digital solutions. The website serves as both a showcase of technical skills and a demonstration of engineering principles applied to web development.

### Key Characteristics

- **Clean Architecture**: Component-based CSS with semantic HTML
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Performance Focused**: Preconnected fonts, preloaded critical CSS, lazy-loaded images
- **Accessible**: Semantic markup, skip links, keyboard navigation, ARIA labels
- **Maintainable**: Well-documented code with clear organization
- **Theme System**: Dark and light theme support via CSS custom properties

---

## Tech Stack

### Frontend Technologies

- **HTML5**: Semantic markup and accessibility standards
- **CSS3**: Modern layout techniques (Grid, Flexbox, Custom Properties)
- **JavaScript (ES6+)**: Vanilla JS for interactive functionality

### Design & Workflow Tools

- **Figma**: UI/UX design and prototyping
- **Git & GitHub**: Version control and collaboration
- **VS Code**: Development environment
- **Netlify / Vercel**: Deployment and hosting platforms

### Currently Learning

- **React**: Component-based frontend frameworks
- **Tailwind CSS**: Utility-first CSS framework
- **Node.js**: Server-side JavaScript runtime
- **REST APIs**: Backend integration fundamentals

---

## Design System

### Visual Identity

- **Theme**: Dark-first design with full light mode toggle
- **Accent**: Teal/emerald (`#6ee7b7`) for interactive elements and highlights
- **Typography**: Inter system font stack
- **Style**: Soft borders, lift-on-hover cards, restrained glow effects

### Color System

```css
:root {
  --background: #060a08;
  --surface: #0c1210;
  --card: #101a16;
  --border: rgba(255, 255, 255, 0.07);
  --text: #edf2f0;
  --text-secondary: #9caea8;
  --text-muted: #5f736b;
  --accent: #6ee7b7;
  --accent-deep: #34d399;
}

[data-theme="light"] {
  --background: #f8faf9;
  --surface: #ffffff;
  --card: #ffffff;
  --border: rgba(0, 0, 0, 0.08);
  --text: #0f1a16;
  --accent: #059669;
  --accent-deep: #047857;
}
```

### Design Principles

- **Dark Theme**: Layered surfaces with subtle depth
- **Light Theme**: Clean white surfaces with refined accents
- **Structured**: Consistent spacing and typography hierarchy
- **Performance**: Preconnected fonts, preloaded critical CSS, lazy-loaded images
- **Accessible**: Semantic HTML, keyboard navigation, focus styling

---

## File Structure

```
portfolio/
├── index.html                 # Main portfolio page (projects load dynamically)
├── projects.html              # Dedicated projects showcase page with filters
├── resume.html                # Auto-generated resume page
├── documentation.html         # Technical documentation website
├── README.md                  # This file
├── package.json               # Scripts for dev server and image optimization
├── css/
│   ├── style.css              # All styles: variables, layout, components, responsive
│   └── docs.css               # Documentation page styles (dark-only sidebar layout)
├── js/
│   ├── script.js              # Mobile menu toggle, scroll reveal animations, filtering
│   ├── docs.js                # Documentation sidebar navigation
│   ├── projects-data.js       # Edit this file to add/update/remove projects
│   └── resume-data.js         # Resume data: skills, education, summary
├── assets/
│   ├── images/                # Screenshots and profile photos
│   │   ├── aziz-profile.jpeg
│   │   ├── my profile1.jpg
│   │   ├── my profile2.jpg
│   │   ├── symbols-screenshot.png
│   │   ├── revastech-screenshot.png
│   │   ├── calculator-screenshot.png
│   │   └── portfolio-screenshot.png
│   └── icons/
│       └── favicon.ico
├── scripts/
│   ├── optimize-images.js     # Image optimization script
│   └── minify-css.js          # CSS minification script
├── sitemap.xml
└── robots.txt
```

### Architecture Decisions

- **Single CSS File**: All main styles in `style.css` with logical sections
- **Component-Based**: Reusable patterns for cards, buttons, grids, tags
- **Data-Driven Projects**: Project content lives in `js/projects-data.js`; HTML is generated automatically
- **Auto-Generated Resume**: Resume page renders from `js/resume-data.js` merged with projects
- **Responsive Design**: Fluid layouts with max-width breakpoints
- **Performance**: Optimized images, IntersectionObserver for animations

---

## Setup Instructions

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Git for version control

### Local Development

1. **Clone the repository**
    ```bash
    git clone https://github.com/abdulaziz-cyber395/my-portfolio.git
    cd my-portfolio
    ```

2. **Start the dev server**
    ```bash
    npm run dev
    ```
    Then open `http://localhost:3000` in your browser. The server can also be started by opening `index.html` directly.

3. **Edit content**
    - Projects: `js/projects-data.js`
    - Resume data: `js/resume-data.js`
    - Main content: `index.html`
    - Styles: `css/style.css`

### Development Workflow

1. Edit data or styles in the relevant file
2. Refresh the browser to see changes (Live Server recommended for auto-refresh)
3. Test on multiple screen sizes
4. Commit and push when ready

---

## Deployment Guide

This is a static site with no build step required. Deploy by uploading the project folder contents.

### Netlify

1. Drag the portfolio folder onto [app.netlify.com/drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo for auto-deploys
3. Publish directory: `/`
4. No build command needed

### Vercel

1. Import your GitHub repo on [vercel.com](https://vercel.com)
2. Framework Preset: **Other**
3. Output directory: `/`

### GitHub Pages

1. Push your code to a repo named `username.github.io` (or enable Pages in repo settings)
2. Go to Settings → Pages → Source: **Deploy from branch**
3. Select `main` branch and `/` folder

### Pre-deployment Checklist

- [ ] Test all links and navigation
- [ ] Verify all images load
- [ ] Check that the contact form works (Formsubmit)
- [ ] Test dark/light theme toggle
- [ ] Preview on mobile
- [ ] Run `npm run optimize-images` if you added new images
- [ ] Verify the resume page at `resume.html`

---

## Contact Information

**Inusah Abdul Aziz**
- **Email**: abdulazizinusah82@gmail.com
- **GitHub**: [github.com/abdulaziz-cyber395](https://github.com/abdulaziz-cyber395)
- **LinkedIn**: [linkedin.com/in/inusah-abdul-aziz-988445328](https://www.linkedin.com/in/inusah-abdul-aziz-988445328)

---

*Built with HTML, CSS, and JavaScript • Designed for maintainability and performance • Focused on solving real-world problems through structured development*
