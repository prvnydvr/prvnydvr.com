# Praveen Yadav — Personal Portfolio

A minimal, admissions-ready portfolio for Praveen Yadav ([@prvnydvr](https://github.com/prvnydvr)), showcasing projects, writing, 3D work, technical experiments, and resume timeline.

Website: [https://prvnydvr.com](https://prvnydvr.me)  
Repository: [https://github.com/prvnydvr/prvnydvr.com](https://github.com/prvnydvr/prvnydvr.com)

## Overview

This repository contains the source code for Praveen Yadav's personal portfolio website. The site is designed to present student-builder work clearly for college applications, project review, mentorship, collaboration, and technical credibility.

The portfolio focuses on honest project documentation, readable case-study previews, clean writing sections, 3D design practice, and a structured resume timeline.

## Features

- Minimal editorial portfolio interface
- Project directory with case-study pages
- Writing/blog section
- 3D design library section
- Resume and learning timeline
- Contact page with personal and work contact details
- Route-aware SEO metadata
- Open Graph and Twitter/X social preview images
- Sitemap and robots.txt
- Clean internal links for key pages and project routes

## Tech Stack

- React 19
- Vite 6
- TypeScript
- Tailwind CSS 4
- Motion
- Lucide React
- Node.js / npm
- Custom SEO prerender script for route-specific metadata shells

## Pages

- Home
- Projects
- Project detail pages
- Blog / Writing
- 3D Library
- About
- Resume
- Contact
- 404 page

## Projects Featured

- Peernest
- Parchhain
- Temp Clipboard
- Finger Cursor Controller
- School Inventory Management System
- Student Tools Hub
- 3D Design Library
- Research and Writing

## SEO Setup

The portfolio includes a technical SEO setup for a React/Vite SPA:

- Route-specific titles and meta descriptions
- Canonical URLs using `https://prvnydvr.com`
- Open Graph metadata
- Twitter/X card metadata
- JSON-LD structured data
- Sitemap at `/sitemap.xml`
- Robots file at `/robots.txt`
- Placeholder OG images in `/public/og/`
- Build-time route metadata generation through `scripts/prerender_seo.mjs`

This improves discoverability and social sharing while preserving the current Vite SPA structure.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Run TypeScript checks:

```bash
npm run typecheck
```

## Deployment

The site is prepared for deployment at:

[https://prvnydvr.me](https://prvnydvr.me)

The repository includes:

- `vercel.json` for SPA rewrites on Vercel
- `public/_redirects` for static-host fallback rewrites
- `public/sitemap.xml`
- `public/robots.txt`
- `public/site.webmanifest`

## Contact

- Personal email: [praveenyadav.contact@gmail.com](mailto:praveenyadav.contact@gmail.com)
- Work email: [work.praveenyadav@gmail.com](mailto:work.praveenyadav@gmail.com)
- GitHub: [https://github.com/prvnydvr](https://github.com/prvnydvr)
- LinkedIn: [https://www.linkedin.com/in/prvnydvr/](https://www.linkedin.com/in/prvnydvr/)
- Instagram: [https://www.instagram.com/prvnydvr/](https://www.instagram.com/prvnydvr/)
