# Berug0's Site

Personal blog about software development, retro games and movies from the good old 80s.

## Tech Stack

- **jQuery 3.7.1** (CDN) - shared sidebar component
- **Tailwind CSS** (Play CDN) - styling
- **Prism.js** (CDN) - code syntax highlighting
- **GitHub Pages** - hosting with automatic deployment

## How to Run Locally

Using any static file server:

```bash
# Option 1: Node.js
npx serve .

# Option 2: Python
python -m http.server
```

Then open `http://localhost:3000` (serve) or `http://localhost:8000` (Python).

## Deployment

Automatic via GitHub Actions on push to `main`. The workflow deploys the root directory to GitHub Pages using `peaceiris/actions-gh-pages@v4`.

## Adding a New Post

1. Create a directory: `posts/<category>/<slug>/`
2. Create `index.html` inside it - copy the page shell from an existing post (head, sidebar, main wrapper)
3. Write post content inside the `<div class="post-content">` section
4. Add a list entry in `index.html` (root) with title, date, and reading time
5. Update tag counts in `tags/index.html` if new tags are introduced
6. For code blocks, include the appropriate Prism.js language component CDN script
