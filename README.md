# Lakehead CCC website

The public website for the Lakehead University Concrete Canoe Team. It is a static Astro site with content stored in Markdown, designed to stay simple to maintain and easy to move to Cloudflare Pages and Pages CMS later.

## Local development

Requirements: Node.js 22 and npm.

```sh
npm install
npm run dev
```

Open `http://localhost:3030`.

## Content updates

- Main page copy: `src/content/pages/home.md`
- Competition archive: `src/content/competitions/`
- Sponsors: `src/content/sponsors/`
- Images: `public/images/`

Add another Markdown file to the appropriate folder to add a competition year or sponsor. The frontmatter at the top of the existing files shows the fields to use.

## Docker

```sh
docker compose up --build -d
```

The container serves the production site on port `3030`.

## Production build

```sh
npm run build
```

The static output is written to `dist/` and can be deployed directly to a static host such as Cloudflare Pages.
