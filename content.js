/*
  ODYSSEY VISUALS — SITE CONTENT
  ================================
  Edit this file to update the site. You should never need to touch the
  HTML files for routine updates — add a changelog entry, a gallery photo,
  or change a download link here and every page updates automatically.

  After editing, just re-upload this file (and any new images in /assets).
*/

const SITE = {
  name: "Odyssey Visuals",
  tagline: "Minecraft Bedrock visual pack",
  version: "2.4.0",
  minecraftVersion: "1.21+",
  description: "Odyssey Visuals is a cinematic visual pack for Minecraft Bedrock: softer light, atmospheric skies, and hand-tuned biome color, built for Deferred and Vibrant Visuals rendering.",
  url: "https://odysseyvisuals.github.io/",

  // Primary download links — shown as buttons on the homepage.
  links: {
    curseforge: "https://www.curseforge.com/minecraft-bedrock/texture-packs/odyssey", // REPLACE with your CurseForge project URL
    mcpedl: "https://mcpedl.com/odyssey/",              // REPLACE with your MCPEDL post URL
    discord: "https://discord.gg/39Sq4hkMdG",             // REPLACE with your Discord invite
  },

  // Contact form endpoint. See contact.html comments for setup instructions.
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // REPLACE once you create a Formspree form

  social: {
    twitter: "",   // e.g. "https://x.com/yourhandle" — leave blank to hide
    youtube: "",    // e.g. "https://youtube.com/@yourhandle"
  },
};

// Latest update banner shown on the homepage.
const LATEST_UPDATE = {
  title: "Update 2.0",
  summary: "The pack was updated with lots of changes",
};

// Full changelog. Newest entry first. Add a new object to the top of this
// array whenever you ship an update.
// - "notes" is the short one-line summary shown in the collapsed list.
// - "details" is an array of bullet points shown when someone clicks the
//   entry to expand it. If you omit "details", the notes line is reused
//   as the only bullet.
const CHANGELOG = [
  {
    version: "2.4.0",
    date: "August 2026",
    title: "Update 2.0",
    notes: "The pack was updated with lots of changes",
    details: [
      "The pack was updated with lots of changes.",
      "Add specific bullet points here describing each change in this release.",
      "Replace this list in content.js with your real 2.4.0 release notes.",
    ],
  },
  {
    version: "2.3.1",
    date: "July 2026",
    title: "Cloud tuning",
    notes: "Balanced cloud contrast and light scatter for calmer, more readable skies.",
    details: [
      "Reduced cloud contrast for a softer daytime sky.",
      "Tuned light scatter so sunsets read more clearly through cloud layers.",
      "Minor color balance pass across all biomes to match the new sky tone.",
    ],
  },
  {
    version: "2.3.0",
    date: "June 2026",
    title: "Grove update",
    notes: "Reworked foliage light response and improved cherry-grove color balance.",
    details: [
      "Reworked how foliage responds to direct and ambient light.",
      "Improved cherry-grove color balance for a warmer, more petal-soft look.",
      "General pass over grass and leaf color across temperate biomes.",
    ],
  },
];

// Homepage stats strip, shown between the hero and the showcase gallery.
// Update these numbers whenever download counts or ratings change — no
// HTML editing needed.
const STATS = [
  { icon: "/assets/icon-downloads.svg", value: "300K+", label: "DOWNLOADS" },
  { icon: "/assets/icon-rating.svg", value: "3.8", label: "MCPEDL RATING" },
];

// Homepage gallery. Every tile is shown at a fixed 16:9 crop, so use real
// screenshots (PNG) at 1200x675 or similar — not SVG, which upscales
// poorly and won't show photographic detail from in-game screenshots.
const GALLERY = [
  { src: "/assets/forest-odyssey.png", label: "VERDANT MORNING" },
  { src: "/assets/ocean-odyssey.png", label: "RIVER BLUE" },
  { src: "/assets/desert-odyssey.png", label: "SUNLIT SANDS" },
  { src: "/assets/nether-odyssey.png", label: "CRIMSON BELOW" },
];

// Installation guides, one card per platform.
const GUIDES = [
  {
    platform: "▣ WINDOWS",
    title: "MINECRAFT FOR WINDOWS",
    steps: [
      "Download the latest .mcpack file from Curseforge or MCPEDL",
      "Double-click the downloaded file to open Minecraft",
      "Once the pack is Imported into Minecraft, open Settings → Global Resources → My Packs",
      "Enable Odyssey in Global Resources.",
    ],
  },
  {
    platform: "▣ ANDROID",
    title: "ANDROID / GOOGLE PLAY",
    steps: [
      "Download the .mcpack file.",
      "Open it from Downloads.",
      "Select Minecraft if prompted.",
      "Activate it under Global Resources.",
    ],
  },
  {
    platform: "▣ IOS / IPADOS",
    title: "IPHONE & IPAD",
    steps: [
      "Download the pack in Safari.",
      "Use Share → Open in Minecraft.",
      "Allow the import to complete.",
      "Enable it in Global Resources.",
    ],
  },
];

// Frequently asked questions on the guides page.
const FAQ = [
  {
    q: "WHERE DO I ENABLE THE PACK?",
    a: "Open Settings, then Global Resources, then My Packs. Select Odyssey Visuals and choose Activate.",
  },
  {
    q: "DOES IT WORK IN EXISTING WORLDS?",
    a: "Usually, yes. Make a world backup before making visual changes, then follow the release notes for the current version.",
  },
  {
    q: "WHICH RENDERER DOES ODYSSEY NEED?",
    a: "Odyssey is built for Deferred / Vibrant Visuals rendering. On unsupported devices the pack still applies textures and color, but skies and lighting effects will be reduced.",
  },
];