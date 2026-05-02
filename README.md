# Shreeyan Bejagam — Portfolio

Personal portfolio website: single-page experience with a 3D character, scroll-driven sections, and project case studies. Built with **Vite** and **React** (TypeScript).

---

## Important — how you may use this repository

This repository is published **for learning and reference only**.

**Please do not:**

- Clone this repository to **deploy it as your own portfolio** or pass it off as your work  
- Copy the layout, copy, animations, or overall site structure for another live site without permission  
- Use this project for **commercial work**, client deliverables, or templates sold/shared as a product  
- Strip attribution or republish a near-identical version under a different name  

**You may:**

- Read the code to understand patterns (Vite, React, Three.js, GSAP, etc.)  
- Take **small, generic** ideas (e.g. how a loading state works) and **reimplement** them in your own project with your own design and content  

If you want to reuse anything substantial, **ask first** and give clear credit where agreed.

---

## Tech stack

| Area | Technologies |
|------|----------------|
| App & tooling | [Vite](https://vitejs.dev/), React 18, TypeScript |
| 3D | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei) |
| Motion | [GSAP](https://gsap.com/) + ScrollTrigger, [Framer Motion](https://www.framer.com/motion/) (where used) |
| UI | CSS modules / component-scoped styles, `react-icons` |

---

## What’s in the repo (high level)

- `src/` — React app: landing, about, work/projects, tech stack section, contact, loading flow, 3D character integration  
- `public/models/` — GLB / related 3D assets and helpers used by the character  
- `public/images/` — Static images (avatars, project screenshots, etc.); some marketing images are bundled from `src/assets/` where noted in code  
- `index.html` — Vite entry HTML  

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)  
- **npm** (comes with Node)

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server (with `--host` in `package.json` for LAN access) |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Local development

From the project root (after you have a legitimate checkout of this codebase):

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (often `http://localhost:5173`).

---

## Production build

```bash
npm run build
npm run preview
```

Output is written to **`dist/`**. Use that folder for static hosting.

---

## Deploy (GitHub → Netlify / Vercel)

### Netlify

- **Build command:** `npm run build`  
- **Publish directory:** `dist`  
- Connect the repo and deploy from the `main` branch (or your default branch).

### Vercel

- Framework: **Vite** (or “Other” with build `npm run build`, output `dist`).

---

## Resume

The live site’s **RESUME** control points to a hosted PDF (Google Drive). That link is configured in the app source, not in this README, so you can update the destination without changing deploy settings.

---

## License

See the **`LICENSE`** file in this repository for the full terms that apply to this project.

---

## Contact

**Shreeyan Bejagam** — portfolio and inquiries: use the contact section on the deployed site or the email shown in the navbar.
