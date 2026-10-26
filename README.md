# Gean T. Raz - CV website

Personal CV website built with Next.js 16, React 19 and Tailwind CSS 4, deployed on Vercel.

## Features

- Profile, basic information, education, skills, projects, GitHub, experience, achievements and contact sections
- Live GitHub repositories pulled from the GitHub API (cached hourly, with a static fallback)
- Project filter (web, mobile, games)
- Light and dark mode, remembered per browser
- Save as PDF with a dedicated print stylesheet
- Responsive from phones to desktops, keyboard accessible, respects reduced motion

## Editing content

All CV content lives in [`src/data/cv.ts`](src/data/cv.ts). Images live in `public/imgs/`.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.
