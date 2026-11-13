# Muiz Anthony — Portfolio

Personal portfolio site for Muiz Anthony (Operations Specialist), live at https://muizanthonyportfolio.vercel.app

## How this site works

The site is a single self-contained static file: `index.html`. It is deployed to Vercel by uploading that file (Vercel Drop) into the existing `muizanthonyportfolio` project. There is no build step and no framework.

The downloadable CV is embedded directly in `index.html` as a base64 data URI, so the file works on its own.

## Files

- `index.html` — the whole site (content, styles, scripts, embedded CV PDF)
- `public/` — original images (headshot, project screenshots) embedded in the page

## Editing

Edit `index.html` directly, then redeploy it to Vercel. The old React/Vite app that used to live here was replaced on 13 Nov 2026; its history is still in git.
