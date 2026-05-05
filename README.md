# Ehecoatl App Kit Docs

Official Ehecoatl docs app template.

This repository contains the basic app-kit shape used by the public Ehecoatl documentation website. It is designed to be cloned, adapted, and reused as a versioned documentation app for Ehecoatl-based deployments.

Public reference:

- https://docs.ehecoatl.com.br

## What This Kit Provides

`app-kit-docs` is a ready documentation app template for publishing Markdown-based docs through Ehecoatl.

It provides:

- versioned documentation folders
- Markdown-to-HTML route handling
- summary-driven navigation
- breadcrumb generation
- previous/next page navigation
- sitemap generation
- static CSS and JavaScript assets
- favicon and robots.txt support
- reusable layout and SEO templates
- redirect support from `.md` URLs to `.htm` pages

This kit is intentionally focused on documentation delivery. It is not a generic application starter and does not include business logic, database models, auth flows, or product-specific services.

## External CDN Dependencies

This kit uses a small set of external frontend dependencies loaded from CDNJS / Cloudflare CDN. These dependencies are used by the default documentation layout.

| Dependency | Version | Source | Purpose |
|---|---:|---|---|
| Bootstrap | 5.3.8 | `https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/css/bootstrap.min.css` | Base responsive layout, components, utilities, and theme behavior |
| Bootstrap Bundle | 5.3.8 | `https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/js/bootstrap.bundle.min.js` | Bootstrap JavaScript components, including collapse behavior |
| Bootstrap Icons | 1.13.1 | `https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.13.1/font/bootstrap-icons.min.css` | UI icons used by navigation, theme toggle, and external links |
| Tocbot CSS | 4.32.2 | `https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.32.2/tocbot.min.css` | Table-of-contents styling |
| Tocbot JS | 4.32.2 | `https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.32.2/tocbot.min.js` | Table-of-contents generation from page headings |
| Highlight.js Theme | 11.11.1 | `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark.min.css` | Code block highlighting theme |
| Highlight.js Core | 11.11.1 | `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js` | Core syntax highlighting runtime |
| Highlight.js JSON Language | 11.11.1 | `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/json.min.js` | JSON syntax highlighting |
| Highlight.js Bash Language | 11.11.1 | `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/bash.min.js` | Bash syntax highlighting |
| Highlight.js JavaScript Language | 11.11.1 | `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/javascript.min.js` | JavaScript syntax highlighting |

The layout also loads the Sora font from Google Fonts:

- `https://fonts.googleapis.com`
- `https://fonts.gstatic.com`
- `https://fonts.googleapis.com/css2?family=Sora:wght@500&display=swap`

Local project assets are still served from this app kit through:

- `/css/{filename}.css`
- `/js/{filename}.js`

If you need fully self-hosted documentation pages, replace the CDN references in `assets/templates/docs-layout.e.htm` with local files under `assets/static/css/` and `assets/static/js/`.

## Frontend Assets and Dependencies

This kit includes static frontend assets used by the documentation layout.

Included assets:

- Bootstrap-related layout/theme helpers
- Tocbot CSS and initialization for generated table-of-contents behavior
- Custom documentation styles
- Custom AJAX navigation helpers
- Custom code highlighting helpers

## Repository Structure

```text
.
├── app/
│   ├── http/
│   │   ├── actions/
│   │   │   └── docs.js
│   │   └── middlewares/
│   ├── scripts/
│   ├── utils/
│   └── ws/
│       ├── actions/
│       └── middlewares/
│
├── assets/
│   ├── i18n/
│   ├── static/
│   │   ├── css/
│   │   │   ├── scrollbar.css
│   │   │   ├── style.css
│   │   │   └── tocbot.css
│   │   ├── docs/
│   │   │   ├── 0.0.7-alpha/
│   │   │   └── 0.1.0/
│   │   ├── favicon/
│   │   ├── js/
│   │   │   ├── bootstrap-ajax-loader.js
│   │   │   ├── core-bash-highlight-v1.js
│   │   │   ├── promise-value.js
│   │   │   └── toc-init.js
│   │   ├── inline-bootstrap-theme.htm
│   │   ├── inline-svg.htm
│   │   └── robots.txt
│   └── templates/
│       ├── docs-layout.e.htm
│       ├── json-ld-schema.e.htm
│       ├── navlinks.e.htm
│       ├── seo-head.e.htm
│       └── versions-menu.e.htm
│
├── config/
│   └── app.json
│
├── routes/
│   ├── http/
│   │   └── base.json
│   └── ws/
│
├── storage/
├── index.js
└── LICENSE
```

## App Config

The app config lives at:

```text
config/app.json
```

Current shape:

```json
{
  "appId": "lvg82b",
  "appName": "docs",
  "ehecoatlVersion": "0.1.x",
  "alias": [],
  "source": {}
}
```

When cloning this kit for another documentation app, usually update:

- `appName`
- `ehecoatlVersion`
- `alias`, when needed
- `source`, when your deployment process uses source metadata

## Routes

The HTTP route map lives at:

```text
routes/http/base.json
```

The default route behavior includes:

- `/` redirects to the default docs version
- `/robots.txt` serves the static robots file
- `/favicon/{filename}` serves favicon assets
- `/css/{filename}.css` serves static CSS
- `/js/{filename}.js` serves static JavaScript
- `/sitemap.xml` executes the docs sitemap action
- `/{version}/{filename}.htm` renders Markdown through the docs action
- `/{version}/{folder1}/{filename}.htm` renders nested Markdown docs
- `/{version}/{folder1}/{folder2}/{filename}.htm` renders deeper nested Markdown docs
- `.md` routes redirect to their `.htm` equivalent

Example:

```json
{
  "/": {
    "pointsTo": "redirect 301 > /0.0.7-alpha/index.htm",
    "cache": "no-cache"
  },
  "/sitemap.xml": {
    "pointsTo": "run > docs@sitemap",
    "cache": "no-cache"
  },
  "/{version}": {
    "/{filename}.htm": {
      "pointsTo": "run > docs@index",
      "cache": "no-cache"
    }
  }
}
```

When publishing a new default version, update the root redirect:

```json
{
  "/": {
    "pointsTo": "redirect 301 > /YOUR_VERSION/index.htm",
    "cache": "no-cache"
  }
}
```

## Docs Content

Versioned docs live under:

```text
assets/static/docs/{version}/
```

Example:

```text
assets/static/docs/0.1.0/
├── _config.json
└── index.md
```

Each version should include a `_config.json` file.

Minimal example:

```json
{
  "template": "templates/docs-layout.e.htm",
  "summary": [
    {
      "label": "Overview",
      "href": "index.htm",
      "children": [
        {
          "label": "Home",
          "href": "index.htm"
        }
      ]
    }
  ]
}
```

## Navigation Summary

The `_config.json` file controls the docs navigation.

Each `summary` item may define:

- `label`: visible navigation label
- `href`: target `.htm` page
- `slug`: optional grouping or semantic identifier
- `children`: nested navigation entries

Example:

```json
{
  "label": "Core Concepts",
  "slug": "core",
  "children": [
    {
      "label": "Summary",
      "href": "core-concepts/index.htm"
    },
    {
      "label": "Architecture",
      "href": "core-concepts/architecture.htm"
    },
    {
      "label": "Request Lifecycle",
      "href": "core-concepts/request-lifecycle.htm"
    }
  ]
}
```

The docs action uses this summary to build:

- menu tree
- active navigation state
- breadcrumbs
- previous page link
- next page link
- sitemap entries

## Markdown Pages

Markdown files should mirror the `.htm` route structure.

Example:

```text
assets/static/docs/1.0.0/index.md
assets/static/docs/1.0.0/getting-started.md
assets/static/docs/1.0.0/core-concepts/index.md
assets/static/docs/1.0.0/core-concepts/architecture.md
```

These pages are exposed as:

```text
/1.0.0/index.htm
/1.0.0/getting-started.htm
/1.0.0/core-concepts/index.htm
/1.0.0/core-concepts/architecture.htm
```

Direct `.md` requests redirect to `.htm` equivalents.

Example:

```text
/1.0.0/getting-started.md
```

redirects to:

```text
/1.0.0/getting-started.htm
```

## Templates

Templates live under:

```text
assets/templates/
```

Main templates:

- `docs-layout.e.htm`: primary docs page layout
- `seo-head.e.htm`: SEO metadata partial
- `json-ld-schema.e.htm`: structured data partial
- `navlinks.e.htm`: navigation links partial
- `versions-menu.e.htm`: version selector partial

The default template can be changed per docs version in that version's `_config.json`:

```json
{
  "template": "templates/docs-layout.e.htm"
}
```

## Static Assets

Static assets live under:

```text
assets/static/
```

Important folders:

```text
assets/static/css/
assets/static/js/
assets/static/favicon/
assets/static/docs/
```

The default route map exposes CSS and JS files through:

```text
/css/{filename}.css
/js/{filename}.js
```

## Sitemap

The sitemap route is:

```text
/sitemap.xml
```

It executes:

```text
run > docs@sitemap
```

The sitemap action scans available docs versions and reads each version's `_config.json` summary to generate sitemap entries.

## Caching

Rendered docs pages currently use cache headers intended for public caching:

```text
Cache-Control: public, max-age=3600, s-maxage=432000
```

This means:

- browser cache: 1 hour
- CDN/shared cache: 5 days

Routes that should remain fresh, such as root redirects and asset lookup routes, can be configured with:

```json
{
  "cache": "no-cache"
}
```

## Reusing This Kit

To reuse this docs app kit:

```bash
git clone https://github.com/ehecoatl/app-kit-docs.git my-docs-app
cd my-docs-app
```

Then customize:

1. Update `config/app.json`
2. Add or replace docs under `assets/static/docs/{version}/`
3. Update `assets/static/docs/{version}/_config.json`
4. Update the default redirect in `routes/http/base.json`
5. Customize templates under `assets/templates/`
6. Customize CSS and JS under `assets/static/`

## Creating a New Docs Version

Create a new version folder:

```text
assets/static/docs/1.0.0/
```

Add a `_config.json` file:

```json
{
  "template": "templates/docs-layout.e.htm",
  "summary": [
    {
      "label": "Overview",
      "href": "index.htm",
      "children": [
        {
          "label": "Home",
          "href": "index.htm"
        },
        {
          "label": "Getting Started",
          "href": "getting-started.htm"
        }
      ]
    }
  ]
}
```

Add Markdown files:

```text
assets/static/docs/1.0.0/index.md
assets/static/docs/1.0.0/getting-started.md
```

Then update the root redirect if this should become the default public version:

```json
{
  "/": {
    "pointsTo": "redirect 301 > /1.0.0/index.htm",
    "cache": "no-cache"
  }
}
```

## Entry Point

The root `index.js` exports the app boot surface.

Current minimal shape:

```js
'use strict';

module.exports = {
  boot() { },
};

Object.freeze(module.exports);
```

The docs rendering behavior is implemented in:

```text
app/http/actions/docs.js
```

## License

Apache-2.0.

See `LICENSE` for details.
