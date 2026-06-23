# ABC Development — NGO Website

A modern, accessible NGO website for **ABC Development**, an organization empowering communities in Sierra Leone through education, healthcare, women empowerment, and sustainable development programs.

This project is a clean, editable recreation of the production bundle served at `arcada.app`, rebuilt with:

- ⚡ **Vite** — fast dev server and bundler
- ⚛️ **React 18** with **React Router v6**
- 🎨 **Tailwind CSS v3** — utility-first styling
- 🖼️ **lucide-react** — clean, consistent icons
- 📊 All content in editable JS data files (no CMS needed to start)

## 📁 Project structure

```
abc-development/
├── public/
│   ├── favicon.svg
│   └── images/              ← hero photos (replaceable)
├── src/
│   ├── components/          ← Navbar, Footer, Cards, Stats, PageHero…
│   ├── pages/               ← Home, About, Projects, News, Contact…
│   ├── data/
│   │   ├── site.js          ← Site info, stats, partners, testimonials
│   │   ├── projects.js      ← Projects + categories
│   │   └── news.js          ← News articles
│   ├── App.jsx              ← Router setup
│   ├── main.jsx             ← Entry
│   └── index.css            ← Tailwind + custom styles
├── index.html
├── package.json
└── tailwind.config.js
```

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in your browser
# http://localhost:5173
```

To build for production:

```bash
npm run build       # outputs to /dist
npm run preview     # preview the built site
```

## 📝 Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, mission, stats, focus areas, featured projects, testimonials, partners, news, donate/volunteer CTA |
| `/about` | About Us — mission, vision, values, goals, timeline |
| `/projects` | Project listing — filterable by category, searchable |
| `/projects/:slug` | Project detail page |
| `/news` | News listing — filterable by category |
| `/news/:slug` | News article page |
| `/impact` | Impact statistics and stories |
| `/get-involved` | Donate, Volunteer, Partner forms |
| `/resources` | Reports, publications, downloads |
| `/gallery` | Photo gallery with lightbox |
| `/contact` | Contact form + office details |
| `/admin` | Demo admin dashboard (no real backend) |

## 🎨 Customization

### Brand colors
Edit `tailwind.config.js` — the `brand` (green) and `accent` (blue) palettes match the original site.

### Content
- **Site name, mission, contact info, partners, testimonials** → `src/data/site.js`
- **Projects & categories** → `src/data/projects.js`
- **News articles** → `src/data/news.js`

All data is just JS — replace with API calls / Supabase queries when you're ready.

### Hero images
Drop new photos into `public/images/` keeping the same filenames, or update the paths in `src/data/projects.js` and `src/data/news.js`.

## 🔌 Wiring up a backend (optional)

The forms (donation, volunteer, partner, contact) currently log to the console. To wire them up:

- **Supabase** — replace `console.log` with `supabase.from('table').insert(...)`, then add auth on `/admin`
- **Email** — send via Resend, Postmark, or a serverless function
- **Payments** — Stripe Checkout for donations

## 🌐 Deploying

The site is a static SPA. Easiest options:

- **Vercel** — `vercel deploy`, zero config (matches original hosting)
- **Netlify** — `netlify deploy`
- **Cloudflare Pages** — connect your git repo

For client-side routing to work in production, configure a rewrite of all routes to `/index.html`:
- Vercel: auto-handled for SPAs
- Netlify: add a `_redirects` file with `/*  /index.html  200`
- Cloudflare Pages: add a `_redirects` file with the same

## 📜 License

MIT — use this as a starting point for your own NGO site.
