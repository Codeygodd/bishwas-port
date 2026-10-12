# Bishwas Pandey — The AI Lab (3D portfolio)

Interactive 3D portfolio built with **Next.js 16 · React 19 · TypeScript (strict) · Three.js r128**.
Scroll to tour the room; every object opens a real section (skills, projects, certificates, experience, blog, ideas, contact, CV, AI assistant, Kathmandu clock). `/classic` is a plain-text version for accessibility and devices without WebGL.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # strict TypeScript
npm run build && npm start
```

Requires Node 20.9+.

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. Vercel → **Add New → Project** → import the repo (Next.js is detected automatically).
3. Environment variables (all optional, see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` — your real URL (SEO, sitemap, API origin check).
   - `ANTHROPIC_API_KEY` — turns "Ask my AI" into a live Claude assistant that answers only from your profile data. Without it the built-in answer engine is used. Server-only: never prefix it with `NEXT_PUBLIC_`.
   - `NEXT_PUBLIC_EMAILJS_*` — your EmailJS ids (defaults already contain the ones from your old site).

## Contact form (EmailJS)

The form sends through EmailJS exactly like your old site, using service `service_9nomxlj`, template `template_vmlr5ax` and your public key. These three values are public by design.
**Do this once in the EmailJS dashboard:** Account → Security → set **Allowed domains** to your Vercel/custom domain so nobody else can use your quota, and consider enabling reCAPTCHA there.

## Edit your content

Everything lives in **`src/data/profile.ts`**: change it once and the 3D room, panels, AI assistant, SEO text and `/classic` update together.
Replace `public/Bishwas_Pandey_CV.pdf` to update the downloadable CV. The blog posts and ideas are drafts; replace them with your own.

## Security

- Strict **Content-Security-Policy**, HSTS, `X-Frame-Options: DENY`, `nosniff`, referrer and permissions policies (`next.config.mjs`).
- `/api/chat`: same-origin only, JSON-only, body-size cap, per-visitor and site-wide rate limits, input trimming, timeouts, no error details leaked, `no-store`.
- No secrets in client code; contact form has a honeypot, validation, control-character stripping and a client cooldown.
- No `innerHTML` / `eval`; JSON-LD is escaped; every external link uses `rel="noopener noreferrer"`.
- Dependencies: `npm audit --omit=dev` reports 0 vulnerabilities (Next.js 16).
- `public/.well-known/security.txt` included.

## Structure

```
src/
  app/            layout, page, /classic, API route (chat), SEO (robots, sitemap, OG image)
  components/     Lab (HUD, tour cards, panel shell), panels/* (sections, AI chat, contact form)
  data/           profile.ts (all content), stations.ts (camera tour)
  three/          kit helpers, room/decor/desk/shelf/boards/bird/ambience builders, lab.ts engine
  lib/            types, time, assistant (answer engine + Claude prompt), emailjs, security, rate limit
```
