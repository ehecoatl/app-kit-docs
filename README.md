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
