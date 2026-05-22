# Codex Arcana

A free static website starter for compiling lost, forbidden, disputed, and forgotten knowledge.

## Open Locally

Open `index.html` in a browser. No server is required.

## Free Hosting Options

- GitHub Pages: good if you want a simple `username.github.io` site.
- Netlify: very easy drag-and-drop hosting for this folder.
- Cloudflare Pages: fast free hosting with a `pages.dev` subdomain.
- Vercel: simple free hosting, especially if you later turn this into a React app.

## Add a New Entry

1. Copy one file from `entries/`.
2. Rename it, such as `entries/emerald-tablet.html`.
3. Edit the title, shelf, reliability, notes, and open questions.
4. Add a matching card to `archive.html`.
5. Optionally add it to the recent additions list in `index.html`.

## Current Structure

- `index.html`: home page
- `archive.html`: browse and filter entries
- `about.html`: archive purpose and submission notes
- `submit.html`: Netlify-ready suggestion form
- `thanks.html`: form confirmation page
- `entries/`: individual knowledge entries
- `assets/`: image, CSS, and JavaScript

## Enable The Suggestion Form

The form is set up for Netlify Forms. After deploying the site on Netlify:

1. Open the site in Netlify.
2. Go to Forms.
3. Enable form detection if Netlify asks for it.
4. Redeploy the site.
5. Submissions will appear under the `fragment-suggestion` form.
