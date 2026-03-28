# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js App Router portfolio site. Route files live in `app/` (`app/page.tsx`, `app/about/page.tsx`, `app/notebooks/[slug]/page.tsx`). Reusable UI primitives live in `components/ui/`, shared layout pieces in `components/shared/`, and feature-specific components in folders such as `components/home/`, `components/experience/`, `components/research/`, and `components/notebook/`. Content is stored as typed data modules in `data/` (`profile.ts`, `papers.ts`, `experience.ts`). Shared helpers belong in `lib/`, shared types in `types/`, and static assets in `public/images`, `public/papers`, and `public/notebooks`.

## Build, Test, and Development Commands
Use `npm run dev` to start the local dev server. Use `npm run build` to create a production build and catch route, type, and bundling issues. Use `npm run start` to serve the built app locally. Use `npm run lint` to run ESLint with the Next.js core-web-vitals and TypeScript rules configured in `eslint.config.mjs`.

## Coding Style & Naming Conventions
Write TypeScript with strict-mode compatibility and 2-space indentation. Follow the surrounding file style; most app code uses double quotes and semicolons. Use `PascalCase` for React component files (`Navbar.tsx`, `Hero.tsx`), `camelCase` for helpers and exported data objects, and lowercase folder names for route segments under `app/`. Keep page-level route files as `page.tsx`, prefer named exports for reusable components, and keep Tailwind utility classes inline unless the pattern is reused globally in `app/globals.css`.

## Testing Guidelines
There is no dedicated test runner or coverage gate configured yet. Until one is added, treat `npm run lint` and `npm run build` as the required validation steps for every change. For UI edits, manually verify the affected route in both desktop and mobile layouts, plus light/dark theme behavior when relevant.

## Commit & Pull Request Guidelines
Current history uses short, imperative, lowercase subjects such as `fixing burgermenu and layouting on research`. Keep commit messages concise and specific, ideally under 72 characters, for example `fix mobile navbar overlay`. Pull requests should include a short summary, the affected routes/components, linked issues when available, screenshots for visual changes, and the validation steps you ran.

## Content & Asset Updates
Prefer editing portfolio content in `data/` instead of hardcoding copy inside page components. Add new PDFs, notebook exports, and images under the matching `public/` subfolder and reference them with absolute site paths such as `/papers/my-paper.pdf` or `/images/profile.jpg`.
