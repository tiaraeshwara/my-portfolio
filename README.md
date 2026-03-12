# Tiara Eshwara Portfolio

A modern, animated single-page portfolio built with Next.js, React, Tailwind CSS v4, Framer Motion, and GSAP.

The page focuses on a cinematic hero, interactive project/workflow timeline, skill visualization, certification feed, and an elegant contact experience.

## Project Overview

This portfolio is implemented mainly in `app/page.tsx` as a highly customized single-page experience.

Major sections:

- Hero (`CODE. BUILD. INNOVATE.`)
- Developments tag/pill row
- Workflow / projects timeline with previews
- Technical skills progress bars
- Language intelligence matrix
- Certifications rotating feed
- Contact + email handshake card with copy action
- Experience cards
- End footer with live local system time

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP + ScrollTrigger
- next-themes (theme support utility)

## Features

- Always-visible fixed navbar
- Scroll-linked hero transition effects
- Smooth section reveal animations
- Hover-rich interactions for cards and workflow items
- Copy-to-clipboard email action with feedback (`Copy ID` -> `Copied`)
- Live local time footer using system timezone
- Theme toggle in navbar
- Fully responsive layout behavior

## Folder Structure

```text
app/
	globals.css
	layout.tsx
	page.tsx
components/
	ThemeProvider.tsx
public/
	Images/
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open in browser:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production build
- `npm run lint` - run ESLint

## Customization Guide

Most content is centralized in `app/page.tsx`.

- Update project cards: edit `steps` array
- Update skill bars: edit `skills` array
- Update certifications: edit `certs` array inside `CertificationsSection`
- Update contact links: edit contact links array in `CONTACTS` section
- Update email copy behavior: `copyText(...)` and email card block
- Update footer time/name: footer section at end of `page.tsx`

## Animation Notes

- Framer Motion handles element reveals, hover states, and keyframe loops.
- GSAP ScrollTrigger animates workflow vertical line progress and item entrances.
- If adjusting animation intensity, start with:
	- `sectionReveal` config
	- `whileHover` values per section
	- GSAP trigger `start/end` points

## Metadata

Page metadata is configured in `app/layout.tsx`:

- Title: `Tiara Eshwara | Portfolio`
- Description: portfolio summary for SEO/social previews

## Deployment

Recommended deployment targets:

- Vercel (best fit for Next.js)
- Netlify (with Next.js adapter)
- Any Node-compatible hosting platform

Build command:

```bash
npm run build
```

## Author

Tiara Eshwara

