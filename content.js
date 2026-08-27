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
  formEndpoint: "https://formspree.io/f/moeqarqb",

  // Fallback endpoint used automatically if Formspree doesn't respond within
  // 6 seconds (Formspree is blocked by some ISPs/countries). Get a free
  // access key at https://web3forms.com — no account needed for the key
  // itself, just an email to receive submissions at. REPLACE the value below.
  web3formsAccessKey: "8f6f648b-45ad-47a2-ace0-e4d22ffd7c55",

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
// - For the full popup, use EITHER "sections" OR "details" (not both):
//     "sections" groups bullets under headings like "New", "Changes", "Fixes"
//     — the format used for most Odyssey changelogs. Each section is:
//       { heading: "New", items: [ "bullet one", "bullet two" ] }
//     An item can also be a highlighted note instead of a normal bullet,
//     shown in bold without a bullet point, e.g. for call-out remarks:
//       { note: "This subpack contained the original PBR..." }
//     "details" is the older flat array of bullet points, with no headings.
//     If you omit both, the "notes" line is reused as the only bullet.
const CHANGELOG = [
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
          'Removed all subpacks from the pack due the incomplete state of them',
          'Slightly improved sky during sunset/sunrise',
          "Made some compatability changes to look better with addons that custom biomes",
          "Adjusted the colour grading to be less harsh and to prefer less contrast",
          "Improved water waves",
          "Made nether slightly less dark to help with gameplay",
          "Improved the visuals of the end ",
          "Changed Mip-mapping to improve performance and lower flickering ",
          "Adjusted the colour for leaf litter in the jungle biome to be less dark",
        ],
      },
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
// "label" is the small tag shown on the grid tile itself.
// "tag" is optional — if set, it's shown instead of "label" as the caption
// at the top of the full-size popup (e.g. crediting a screenshot tool or
// giving more detail than the short grid label). If omitted, "label" is
// reused for the popup too.
const GALLERY = [
  { src: "/assets/image1.webp", label: "Taiga at night", tag: "Captured with CoreCraft Addon" },
  { src: "/assets/image2.webp", label: "Mushroom Island", tag: "Captured with CoreCraft Addon" },
  { src: "/assets/image3.webp", label: "Warped Forest", tag: "Captured with CoreCraft Addon" },
  { src: "/assets/image4.webp", label: "End City", tag: "Captured with CoreCraft Addon" },
];

// Installation guides, one card per platform.
// Each guide has a "setup" array instead of plain "steps" so the numbered
// steps can have bold "Step N:" labels and an in-between highlighted note,
// matching the format of the setup guides posted on Discord/CurseForge.
// An item is either:
//   { step: 1, text: "..." }              — a numbered step
//   { note: "..." }                        — a bold highlighted callout
const GUIDES = [
  {
    platform: "▣ WINDOWS",
    title: "MINECRAFT FOR WINDOWS",
    setup: [
      { step: 1, text: 'Download the pack and then open it by double-click it. This will open up Minecraft. [You can also right click the file and then click on open with, then select Minecraft / Minecraft Preview.]' },
      { step: 2, text: 'Once the game opens, go to settings>video and enable "In-Game Graphics Mode Switching". Then change the graphics mode from Fancy or Simple to "Vibrant Visuals".' },
      { note: 'If the "Vibrant Visuals" graphics mode is grey and you cant enable it then your device is not supported and cant run Vibrant Visuals .' },
      { step: 3, text: 'Now you can enable the pack either in a world resource pack or in the global resource pack section. [Additionally, you can enable the experimental feature called "Render Dragon Features for creators" to get features like point light that gives colored lighting]' },
    ],
  },
  {
    platform: "▣ ANDROID",
    title: "ANDROID",
    setup: [
      { step: 1, text: 'Download the pack and then open it by longpressing the file and then clicking open/open with and then select Minecraft /Minecraft Preview or Beta.' },
      { step: 2, text: 'Once the game opens, go to settings>video and enable "In-Game Graphics Mode Switching". Then change the graphics mode from Fancy or Simple to "Vibrant Visuals".' },
      { note: 'If the "Vibrant Visuals" graphics mode is grey and you cant enable it then your device is not supported and cant run Vibrant Visuals .' },
      { step: 3, text: 'Now you can enable the pack either in a world resource pack or in the global resource pack section. [Additionally, you can enable the experimental feature called "Render Dragon Features for creators" to get features like point light that gives colored lighting]' },
    ],
  },
  {
    platform: "▣ IOS",
    title: "IPHONE & IPAD",
    setup: [
      { step: 1, text: 'Download the pack and then open it in Minecraft / Minecraft Beta/Preview.' },
      { step: 2, text: 'Once the game opens, go to settings>video and enable "In-Game Graphics Mode Switching". Then change the graphics mode from Fancy or Simple to "Vibrant Visuals".' },
      { note: 'If the "Vibrant Visuals" graphics mode is grey and you cant enable it then your device is not supported and cant run Vibrant Visuals .' },
      { step: 3, text: 'Now you can enable the pack either in a world resource pack or in the global resource pack section. [Additionally, you can enable the experimental feature called "Render Dragon Features for creators" to get features like point light that gives colored lighting]' },
    ],
  },
];

// Frequently asked questions on the guides page.
const FAQ = [
  {
    q: "CAN MY DEVICE RUN THIS PACK?",
    a: `Odyssey and all other Vibrant Visuals packs share the same requirements set by Mojang:
      <ul class="faq-list">
        <li>Xbox Series X|S, Xbox One</li>
        <li>PlayStation 4/5</li>
        <li>Android — Adreno 640, Mali-G68, Mali-G77, or Xclipse 530 or higher</li>
        <li>iOS / iPadOS — A12, M1, or higher chip</li>
        <li>Windows — Minecraft running on DirectX 12 (some older DirectX 12 cards may still be incompatible)</li>
      </ul>
      These requirements can change at any time.
      <a class="faq-link" href="https://help.minecraft.net/hc/en-us/articles/37413608357773" target="_blank" rel="noreferrer">See the latest info on Minecraft Help <span class="mc-icon-arrow"></span></a>`,
  },
  {
    q: "DOES IT WORK WITH ADD-ONS AND OTHER RESOURCE PACKS?",
    a: "Odyssey should be compatible with most add-ons and resource packs, but you may still run into occasional issues, as 100% compatibility isn't always possible.",
  },
];