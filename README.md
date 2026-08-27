# Odyssey Visuals — Site Guide

This is a static site (plain HTML/CSS/JS, no build step). Everything below tells you how to update it without breaking anything.

## The one file you'll edit most: `content.js`

Nearly every piece of text and every link on the site lives in `content.js`. Open it and you'll find plain, commented objects and arrays:

| To change...                          | Edit this in `content.js` |
|----------------------------------------|----------------------------|
| Pack version number, MC version        | `SITE.version`, `SITE.minecraftVersion` |
| CurseForge / MCPEDL / Discord links    | `SITE.links` |
| Contact form endpoint                  | `SITE.formEndpoint` |
| Contact form backup endpoint (auto-used if Formspree is blocked/slow) | `SITE.web3formsAccessKey` |
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

1. Drop your screenshot into `assets/` (e.g. `assets/swamp-odyssey.webp`).
2. Add a line to `GALLERY` in `content.js`:
   ```js
   { src: "assets/swamp-odyssey.webp", label: "MISTY SWAMP" },
   ```
   Use `size: "large"` or `size: "wide"` on at most one or two tiles for visual variety.

## Replacing the placeholder screenshots

**This is the single biggest thing you can do for page speed.** `hero-banner.webp` loads behind the very top of every page, and the four `GALLERY` screenshots all load on the homepage — if these are uncompressed PNG screenshots (several MB each, which is normal for a raw Minecraft screenshot), they will dominate your load time far more than any code-level optimization can fix.

The images in `assets/` are placeholders. Swap them for real Minecraft screenshots and WebP versions of the logo/favicon/icons — the whole site uses WebP now, no PNG or SVG for photos:

1. Take screenshots at 1200×675 or similar 16:9 ratio for best results.
2. Save them into `assets/` as WebP (keep file sizes under ~250KB each — compress with [squoosh.app](https://squoosh.app) if needed; WebP at quality ~80 usually looks identical to PNG at a fraction of the size).
3. Update the paths in `content.js`'s `GALLERY` array to point at the new filenames (already set to `.webp`).
4. Also set a real photo at `assets/hero-banner.webp`, used as the hero background in `styles.css` (`.hero-banner`). This one especially matters, since it loads on every single page.
5. The favicon (`assets/favicon.webp`) and Open Graph share-image (`assets/forest-odyssey.webp`, referenced in each page's `og:image`) are also WebP now. If you ever see a broken preview when sharing a link on an older app, that app likely doesn't support WebP — swap that one specific image back to PNG/JPG as a fallback.

## Before going live — checklist

- [ ] Replace all placeholder screenshots in `assets/` with real ones
- [ ] Set real URLs in `SITE.links` (CurseForge, MCPEDL, Discord) in `content.js`
- [ ] Set up a [Formspree](https://formspree.io) form (or your own backend) and put the URL in `SITE.formEndpoint`
- [ ] Set up a free [Web3Forms](https://web3forms.com) access key and put it in `SITE.web3formsAccessKey` — this is the backup contact-form service. Formspree is blocked outright on some networks/in some countries, so the contact form (in `script.js`) sends to Formspree first and automatically falls back to Web3Forms if Formspree doesn't respond within 6 seconds or errors. Skipping this means visitors on a network that blocks Formspree simply can't reach you.
- [ ] Set `SITE.url` in `content.js` to your real domain, and replace every `https://odysseyvisuals.example.com` in the `<link rel="canonical">` tags and `sitemap.xml`/`robots.txt` with that domain
- [ ] Replace `assets/favicon.webp` if you want a custom icon
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








changelog format:

  {
    version: "2.0.0",
    date: "21 June 2026",
    title: "Update 2.0",
    notes: "Overall Polish with many overhauls and improvements.",
    sections: [
      {
        heading: "New",
        items: [
          "Added new title image when the pack is enabled",
          "Made adjustments to fog for all biomes based on the time of day",
          "Made water and under water fog for swamp & mangrove swamp murky green",
          "Added new border fog for the swamp, deser and the mesa",
        ],
      },
      {
        heading: "Changes",
        items: [
          'Removed the "Experimental" subpack until further notice.',
          { note: "This subpack contained the original PBR for the pack, the reason it was removed was due to it taking too long to finish. However, the plan is to bring it back at some point in the future" },
          'Made the "Non-PBR/Compatibility" subpack the default subpack',
          "Made adjustments to the colourgrading to be more realistic and natural",
          "Slightly reduced the overall warmth of the pack",
          "Made small tweaks to the fog of some biomes to be more visually pleasing",
        ],
      },
      {
        heading: "Fixes",
        items: [
          "Fixed a compatibility warning that was being shown to some users [mainly mobile]",
        ],
      },
    ],
  },