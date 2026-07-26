# Muiz Anthony — Portfolio

## Run locally
```
npm install
npm run dev
```

## Deploy to Vercel

**Easiest path (no GitHub needed):**
1. Install the Vercel CLI: `npm install -g vercel`
2. From this folder, run: `vercel`
3. Follow the prompts (log in, confirm project settings — framework = Vite, it auto-detects).
4. Run `vercel --prod` to push it live.

**Recommended path (GitHub, so future edits auto-deploy):**
1. Create a new repo on GitHub (e.g. `muiz-portfolio`).
2. In this folder: `git init && git add . && git commit -m "Initial portfolio"`
3. `git remote add origin <your-repo-url>` then `git push -u origin main`
4. Go to vercel.com → New Project → Import your GitHub repo.
5. Vercel auto-detects Vite. Click Deploy.
6. Every future `git push` auto-deploys.
