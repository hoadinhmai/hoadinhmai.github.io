# hoadinhmai.github.io

Personal site and tech blog for [hoamai.click](https://hoamai.click), built with
[Astro](https://astro.build) and deployed to GitHub Pages via GitHub Actions.

## Stack

- Astro 5 (static output) + MDX
- Content collection for posts (`src/content/blog/*.mdx`)
- Light/dark theme, Shiki code highlighting
- Custom domain `hoamai.click` (DNS via DNSControl → Route53)

## Develop

```bash
npm install
npm run dev       # local dev server
npm run check     # type + content validation
npm test          # unit tests (vitest)
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/content/blog/   Blog posts as .mdx files
src/components/     Astro/HTML components
src/layouts/        Page layout templates
src/pages/          Route pages
src/styles/         Global CSS
src/utils/          Shared utilities
public/             Static assets
```

## Writing a post

Add a Markdown/MDX file under `src/content/blog/` with frontmatter:
`title`, `description`, `pubDate`, `tags` (array), `draft` (bool).

## Deploy

Push to the default branch. The `Deploy to GitHub Pages` Action builds and
publishes automatically. Pages Source must be set to "GitHub Actions" in repo
settings.
