# Fundamentals of Software Architecture
High-level reference for frontend developers based on Neal Ford's book, focusing on architectural principles, trade-offs, and decision-making. Built as a VitePress site with structured chapter notes and visual summaries.

## What's in this repo
- Site content in `docs/`, with chapters in `docs/chapter-*.md` (currently Chapters 1-27).
- VitePress config and theme in `docs/.vitepress/`.
- Custom components in `docs/.vitepress/theme/components` (for example `StyleRatings`, `ValueCard`, `ArchitectureHeatmap`).
- Data-backed comparisons in `architecture-styles.json` (used by the Style Comparison page).
- Entry page at `docs/index.md`.

## Key pages
- Home: `docs/index.md`
- Style Comparison: `docs/style-comparison.md`
- Chapter 1: `docs/chapter-1-introduction.md`

## Deployed site
`https://the-evise.github.io/fundamentals-of-software-architecture/`

## Run locally
```bash
pnpm install
pnpm docs:dev
```

## Build and preview
```bash
pnpm docs:build
pnpm docs:preview
```

## Contributions
Contributions are closed for now.
