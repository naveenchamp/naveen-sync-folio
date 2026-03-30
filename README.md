# Naveen Sync Folio

Personal portfolio site for Naveen Reddy Tippasani. The app showcases experience, skills, resume content, and project highlights sourced from GitHub.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Firebase Hosting

## Scripts

```sh
npm run dev
npm run build
npm run preview
npm run lint
npm run deploy:firebase
npm run preview:firebase
```

## Local Development

```sh
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:8080`.

## Production Preview

```sh
npm run build
npm run preview
```

## Firebase Deployment

This project is configured for Firebase Hosting with SPA rewrites in `firebase.json`.

First-time setup:

```sh
npx firebase-tools login
npx firebase-tools use --add
```

When Firebase asks for an alias, use something like:

```sh
production
```

Deploy to production:

```sh
npm run deploy:firebase
```

Deploy to a preview channel:

```sh
npm run preview:firebase
```

## Project Structure

- `src/components/portfolio`: page sections and portfolio-specific UI
- `src/config/portfolio.ts`: personal info, links, and content configuration
- `src/hooks/useGitHubRepos.ts`: GitHub repository fetching and project shaping
- `public/`: static assets including the resume PDF

## Notes

- The projects section fetches public repositories from GitHub.
- If GitHub rate limits are hit, the UI falls back to sample project data.
- Firebase Hosting builds from `dist` and rewrites all routes to `index.html` for SPA navigation.
