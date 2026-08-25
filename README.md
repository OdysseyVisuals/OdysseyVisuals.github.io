# Odyssey Visuals — Site Guide

This is a static site (plain HTML/CSS/JS, no build step). Everything below tells you how to update it without breaking anything.

## The one file you'll edit most: `content.js`

Nearly every piece of text and every link on the site lives in `content.js`. Open it and you'll find plain, commented objects and arrays:

| To change...                          | Edit this in `content.js` |
|----------------------------------------|----------------------------|
| Pack version number, MC version        | `SITE.version`, `SITE.minecraftVersion` |
| CurseForge / MCPEDL / Discord links    | `SITE.links` |
| Contact form endpoint                  | `SITE.formEndpoint` |
| Homepage "latest update" banner        | `LATEST_UPDATE` |
| Changelog page                         | `CHANGELOG` array — add a new entry to the **top** |
| Vanilla/Odyssey comparison sliders     | `COMPARISONS` array |
| Gallery photos                         | `GALLERY` array |
| Homepage feature cards                 | `FEATURES` array |
| Installation guide steps               | `GUIDES` array |
| FAQ                                    | `FAQ` array |

You never need to touch the `.html` files to add a changelog entry, swap a screenshot, or update a link. Just edit `content.js` and re-upload it.

### Example: adding a changelog entry

Each entry has a short `notes` line (shown in the collapsed list) and a `details` array (shown when someone clicks the entry to open the full changelog). If you skip `details`, the `notes` line is reused on its own.

```js
const CHANGELOG = [
  {
    version: "2.5.0",
    date: "September 2026",
    title: "Autumn Skies",
    notes: "New sunset gradient and warmer canopy tones.",
    details: [
      "New sunset gradient with warmer, longer golden hour.",
      "Retuned canopy colors for autumn biomes.",
      "Fixed a minor cloud flicker at high render distances.",
    ],
  },
  // ...older entries stay below
];
```

Also update `LATEST_UPDATE` at the top of the file so the homepage banner matches.

### Example: adding a gallery photo

1. Drop your screenshot into `assets/` (e.g. `assets/swamp-odyssey.png`).
2. Add a line to `GALLERY` in `content.js`:
   ```js
   { src: "assets/swamp-odyssey.png", label: "MISTY SWAMP" },
   ```
   Use `size: "large"` or `size: "wide"` on at most one or two tiles for visual variety.

## Replacing the placeholder screenshots

The images in `assets/` are placeholders. Swap them for real Minecraft screenshots and PNG versions of the logo/favicon/icons — the whole site uses PNG now, no SVG:

1. Take screenshots at 1200×675 or similar 16:9 ratio for best results.
2. Save them into `assets/` as PNG (keep file sizes under ~500KB each — compress with [squoosh.app](https://squoosh.app) if needed).
3. Update the paths in `content.js`'s `COMPARISONS` and `GALLERY` arrays to point at the new filenames.
4. Also set a real photo at `assets/hero-banner.png`, used as the hero background in `styles.css` (`.hero-banner`).

## Before going live — checklist

- [ ] Replace all placeholder screenshots in `assets/` with real ones
- [ ] Set real URLs in `SITE.links` (CurseForge, MCPEDL, Discord) in `content.js`
- [ ] Set up a [Formspree](https://formspree.io) form (or your own backend) and put the URL in `SITE.formEndpoint`
- [ ] Set `SITE.url` in `content.js` to your real domain, and replace every `https://odysseyvisuals.example.com` in the `<link rel="canonical">` tags and `sitemap.xml`/`robots.txt` with that domain
- [ ] Replace `assets/favicon.png` if you want a custom icon
- [ ] Double check the changelog and version number match your actual latest release

## File structure

```
index.html       Homepage shell (content injected by site.js)
gallery.html      Gallery page shell
guides.html       Install guides + FAQ shell
changelog.html    Changelog shell
contact.html      Contact form shell
404.html          Not-found page
content.js        ← Edit this for routine updates
site.js           Renders content.js into the page — don't need to touch this
script.js         Menu, lightbox, scroll animation, form behavior — don't need to touch this
styles.css        All visual styling
assets/           Images, screenshots, favicon
robots.txt        Search engine crawl rules
sitemap.xml       Search engine page list
```

## Adding a brand-new page

1. Copy an existing simple page (e.g. `changelog.html`) as a starting point.
2. Keep the `<header id="site-header">`, `<footer id="site-footer">`, and the three `<script>` tags at the bottom (`content.js`, `site.js`, `script.js`) — these build the shared nav/footer automatically.
3. Add a new entry to the `NAV_ITEMS` array near the top of `site.js` so it shows up in the navigation on every page.

## Hosting

This is a static site — it works on any static host: Cloudflare Pages, Netlify, GitHub Pages, Vercel. Just upload the whole folder. No build step, no server required.