# Berug0 Site

Personal blog - static HTML site using jQuery + Tailwind CSS (both via CDN).

## Tech Stack
- **Tailwind CSS**: Play CDN (`cdn.tailwindcss.com`)
- **jQuery 3.7.1**: CDN - renders shared navbar + footer components
- **Prism.js**: CDN - code syntax highlighting (Tomorrow theme)
- **Inter font**: Google Fonts CDN
- **Hosting**: GitHub Pages via `peaceiris/actions-gh-pages@v4`
- **Analytics**: Google Analytics (`G-R9B3CPPMVE`)

## Structure
```
index.html                              # Home - hero + posts list
404.html                                # Error page
posts/development/.../index.html        # Blog post
tags/index.html                         # Tags grid
js/components.js                        # Shared navbar + footer (jQuery)
images/                                 # Logo, favicons
manifest.json                           # PWA manifest
.github/workflows/gh-pages.yml          # CI/CD
```

## Design
- Base: `bg-slate-950`, text: `text-slate-300`, headings: `text-white`
- Accent: `emerald-400` (#34d399), gradient to `cyan-400`
- Tags use distinct colors: emerald, cyan, violet, amber
- Glassmorphism navbar: `backdrop-blur-xl bg-slate-950/80`
- Cards: `border-white/5 bg-white/[0.02]` with hover glow effects
- Font: Inter (Google Fonts)
- `renderNavbar()` and `renderFooter()` in `js/components.js`

## Adding a Post
1. Create `posts/<category>/<slug>/index.html`
2. Copy page shell from existing post (head, navbar, footer)
3. Add post card entry to `index.html`
4. Update tag counts in `tags/index.html` if needed
