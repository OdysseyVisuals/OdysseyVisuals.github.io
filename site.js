/*
  ODYSSEY VISUALS — SITE ENGINE
  ================================
  Builds the header, footer, and any [data-render] sections from content.js.
  You should not need to edit this file for routine content updates —
  edit content.js instead. This file only needs changes if you're adding a
  brand-new type of section to the site.
*/
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const page = document.body.dataset.page || "";

  // ---------- Header ----------
  const NAV_ITEMS = [
    { href: "/", label: "Home", key: "home" },
    { href: "/guides/", label: "Guides", key: "guides" },
    { href: "/changelog/", label: "Changelog", key: "changelog" },
    { href: "/contact/", label: "Contact", key: "contact" },
  ];

  function renderHeader() {
    const el = $("#site-header");
    if (!el) return;
    const links = NAV_ITEMS.map(
      (item) =>
        `<a href="${item.href}"${item.key === page ? ' class="active" aria-current="page"' : ""}>${item.label}</a>`
    ).join("");
    el.innerHTML = `
      <nav class="nav shell" aria-label="Main navigation">
        <a class="brand" href="/"><img src="/assets/logo.webp" alt="${SITE.name}"></a>
        <button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links"><i></i><i></i><i></i></button>
        <div class="nav-links" id="nav-links">${links}</div>
      </nav>`;
  }

  // ---------- Footer ----------
  function renderFooter() {
    const el = $("#site-footer");
    if (!el) return;
    const socialLinks = [];
    if (SITE.social.twitter) socialLinks.push(`<a href="${SITE.social.twitter}" target="_blank" rel="noreferrer">Twitter/X</a>`);
    if (SITE.social.youtube) socialLinks.push(`<a href="${SITE.social.youtube}" target="_blank" rel="noreferrer">YouTube</a>`);
    el.innerHTML = `
      <div class="shell footer-inner">
        <a class="brand footer-brand" href="/"><img src="/assets/logo.webp" alt="${SITE.name}"></a>
        ${socialLinks.length ? `<p class="footer-social">${socialLinks.join(" · ")}</p>` : ""}
        <p>&copy;&nbsp;<span id="year"></span>&nbsp;${SITE.name}. All rights reserved.</p>
      </div>`;
    $("#year").textContent = new Date().getFullYear();
  }

  // ---------- Homepage sections ----------
  function renderHero() {
    const el = $("#hero-actions");
    if (!el) return;
    el.innerHTML = `
      <button class="mc-button primary shine-btn download-trigger-btn" id="download-trigger" type="button"><span class="mc-icon-download"><img src="/assets/icon-download.webp" alt="" width="14" height="18"></span> DOWNLOAD</button>`;
    const stats = $("#hero-stats");
    if (stats) stats.innerHTML = `<span>✦ V${SITE.version}</span><span>▣ ${SITE.minecraftVersion}</span><span>⚡ DEFERRED</span>`;
  }

  // Sources shown in the download popup. Colors are each platform's brand
  // color, applied via inline CSS vars so styles.css doesn't need per-source
  // rules. Add a new object here to add a new download source.
  const DOWNLOAD_SOURCES = [
    { key: "curseforge", label: "CURSEFORGE", href: () => SITE.links.curseforge, color: "#f16436", colorDark: "#c8451f" },
    { key: "mcpedl", label: "MCPEDL", href: () => SITE.links.mcpedl, color: "#00b137", colorDark: "#00832a" },
  ];

  function renderDownloadOptions() {
    const el = $("#download-options");
    if (!el) return;
    el.innerHTML = DOWNLOAD_SOURCES.map(
      (s) => `
      <a class="mc-button download-source" style="--src:${s.color};--src-dark:${s.colorDark}"
         href="${s.href()}" target="_blank" rel="noreferrer">
        <span class="mc-icon-down"></span> ${s.label}
      </a>`
    ).join("");
  }

  function renderFeatures() {
    const el = $("#feature-grid");
    if (!el) return;
    el.innerHTML = FEATURES.map(
      (f) => `
      <article class="pixel-panel feature-card reveal">
        <span class="feature-icon">${f.icon}</span>
        <h3>${f.title}</h3>
        <p>${f.text}</p>
      </article>`
    ).join("");
  }

  // ---------- Promo banner ----------
  // Toggled entirely off content.js's PROMO_BANNER.enabled flag — when
  // false, the section is hidden and left empty rather than removed from
  // the page, so nothing else needs to change to turn it back on.
  function renderPromoBanner() {
    const el = $("#promo-banner");
    if (!el) return;

    if (!PROMO_BANNER || !PROMO_BANNER.enabled) {
      el.hidden = true;
      el.innerHTML = "";
      return;
    }

    const m = PROMO_BANNER.media || {};
    const media =
      m.type === "video"
        ? `<video class="promo-banner-media" autoplay muted loop playsinline${m.poster ? ` poster="${m.poster}"` : ""}>
             <source src="${m.videoSrc}" type="video/webm">
           </video>`
        : `<img class="promo-banner-media" src="${m.src}" alt="" loading="lazy">`;

    // Layout controls (all optional, from content.js) applied as CSS vars:
    //  - height / heightMobile: banner height (any CSS length, e.g. "320px", "40vh")
    //  - focalY / focalYMobile: vertical position of the image/video within
    //    the banner (0% = top of image shown, 50% = centered, 100% = bottom
    //    of image shown) — the image still fills the banner and stays
    //    horizontally centered via object-fit:cover, this only shifts which
    //    part of a taller-than-needed image is visible. focalYMobile applies
    //    at ≤520px wide and falls back to focalY if not set.
    //  - scrimTop / scrimBottom: darkening overlay colors (CSS color, can
    //    include alpha e.g. "#0a0c0d00" for none, or "transparent").
    //  - textColor: color of the headline + subtext.
    //  - textBorder: border around the text block. Either a full CSS
    //    border shorthand string (e.g. "2px solid #ffffff") or an object
    //    { width, style, color, radius, padding } if you want padding/
    //    radius control too. Omit for no border/box at all.
    const layout = PROMO_BANNER.layout || {};
    const vars = [];
    if (layout.height) vars.push(`--promo-height:${layout.height}`);
    if (layout.heightMobile) vars.push(`--promo-height-mobile:${layout.heightMobile}`);
    if (layout.focalY) vars.push(`--promo-focal-y:${layout.focalY}`);
    vars.push(`--promo-focal-y-mobile:${layout.focalYMobile || layout.focalY || "50%"}`);
    if (layout.scrimTop) vars.push(`--promo-scrim-top:${layout.scrimTop}`);
    if (layout.scrimBottom) vars.push(`--promo-scrim-bottom:${layout.scrimBottom}`);
    if (layout.textColor) vars.push(`--promo-text-color:${layout.textColor}`);

    let borderCss = "none";
    let borderRadius = null;
    let borderPadding = null;
    if (layout.textBorder) {
      if (typeof layout.textBorder === "string") {
        borderCss = layout.textBorder;
      } else {
        const b = layout.textBorder;
        borderCss = `${b.width || "2px"} ${b.style || "solid"} ${b.color || "#ffffff"}`;
        borderRadius = b.radius || null;
        borderPadding = b.padding || null;
      }
    }
    vars.push(`--promo-text-border:${borderCss}`);
    if (borderRadius) vars.push(`--promo-text-border-radius:${borderRadius}`);
    if (borderPadding) vars.push(`--promo-text-border-padding:${borderPadding}`);

    el.hidden = false;
    if (vars.length) el.style.cssText = vars.join(";");
    el.innerHTML = `
      ${media}
      <div class="promo-banner-scrim" aria-hidden="true"></div>
      <div class="shell promo-banner-inner">
        <h2 class="promo-banner-headline reveal">${PROMO_BANNER.headline}</h2>
        <p class="promo-banner-subtext reveal">${PROMO_BANNER.subtext}</p>
      </div>`;
  }

  // Splits GALLERY into two rows for the sliding marquee (alternating items
  // between row 1 and row 2). Each row's track is duplicated back-to-back so
  // the CSS animation can loop seamlessly from 0 to -50% and jump back
  // invisibly. Rows scroll in opposite directions for visual variety.
  function renderMarqueeRow(items) {
    const tile = (g) => `
      <button class="gallery-item" data-full="${g.src}" data-tag="${g.tag || g.label}">
        <img src="${g.src}" alt="${g.label}" loading="lazy" draggable="false">
      </button>`;
    return `<div class="marquee-track">${items.map(tile).join("")}${items.map(tile).join("")}</div>`;
  }

  function renderHomeGallery() {
    const el = $("#gallery-grid");
    if (!el) return;

    const rowA = [];
    const rowB = [];
    GALLERY.forEach((g, i) => {
      // Explicit "row" wins. Missing "row" falls back to alternating by
      // index so old-style entries (or ones you don't care to pin) still
      // split evenly between the two rows.
      const row = g.row === 1 || g.row === 2 ? g.row : (i % 2 === 0 ? 1 : 2);
      (row === 1 ? rowA : rowB).push(g);
    });

    if (GALLERY.length < 2 || !rowA.length || !rowB.length) {
      // Not enough images, or all images pinned to one row — fall back to
      // the plain static grid instead of an empty/broken marquee row.
      el.innerHTML = GALLERY.map(
        (g) => `
        <button class="gallery-item reveal" data-full="${g.src}" data-tag="${g.tag || g.label}">
          <img src="${g.src}" alt="${g.label}" loading="lazy">
        </button>`
      ).join("");
      return;
    }

    el.classList.add("marquee-gallery");
    el.innerHTML = `
      <div class="marquee-row marquee-row-left reveal">${renderMarqueeRow(rowA)}</div>
      <div class="marquee-row marquee-row-right reveal">${renderMarqueeRow(rowB)}</div>`;
  }

  function renderStats() {
    const el = $("#stats-strip");
    if (!el) return;
    el.innerHTML = STATS.map(
      (s, i) => `
      <div class="stat-block reveal" style="--i:${i}">
        <img class="stat-icon" src="${s.icon}" alt="" width="20" height="20">
        <span class="stat-text">
          <b>${s.value}</b>
          <span class="stat-label">${s.label}</span>
        </span>
      </div>`
    ).join("");
  }

  function renderUpdateStrip() {
    const el = $("#update-strip");
    if (!el) return;
    el.innerHTML = `
      <div class="shell update-inner">
        <div>
          <p class="pixel-tag">LATEST UPDATE</p>
          <h2>${LATEST_UPDATE.title.toUpperCase()}</h2>
          <p>${LATEST_UPDATE.summary}</p>
        </div>
        <a class="mc-button" href="/changelog/">READ CHANGELOG <span class="mc-icon-arrow"></span></a>
      </div>`;
  }

  // ---------- Guides page ----------
  function renderGuideItem(item) {
    if ("note" in item) {
      return `<li class="guide-note">${item.note}</li>`;
    }
    return `<li class="guide-step"><b>Step ${item.step}:</b> ${item.text}</li>`;
  }

  function renderGuides() {
    const el = $("#guides-grid");
    if (!el) return;
    el.innerHTML = GUIDES.map(
      (g, i) => `
      <details class="pixel-panel guide" name="guides-accordion"${i === 0 ? " open" : ""}>
        <summary>
          <span class="platform">${g.platform}</span>
          <h3>${g.title}</h3>
        </summary>
        <p class="guide-setup-label">Setup:</p>
        <ul class="guide-setup">${g.setup.map(renderGuideItem).join("")}</ul>
      </details>`
    ).join("");
  }

  function renderFAQ() {
    const el = $("#faq-list");
    if (!el) return;
    el.innerHTML = FAQ.map(
      (f, i) => `
      <details name="faq-accordion"${i === 0 ? " open" : ""}>
        <summary>${f.q}</summary>
        <p>${f.a}</p>
      </details>`
    ).join("");
  }

  // ---------- Changelog page ----------
  function renderChangelog() {
    const el = $("#changelog-list");
    if (!el) return;
    el.innerHTML = CHANGELOG.map(
      (c, i) => `
      <article class="change" data-index="${i}" tabindex="0" role="button" aria-haspopup="dialog">
        <b>V${c.version} · ${c.date.toUpperCase()}</b>
        <h3>${c.title}</h3>
        <p>${c.notes}</p>
        <span class="change-more">VIEW FULL CHANGELOG →</span>
      </article>`
    ).join("");
  }

  // ---------- Contact page ----------
  function renderContact() {
    const discordEl = $("#discord-link");
    if (discordEl) discordEl.href = SITE.links.discord;
    const form = $("form[data-form]");
    if (form) form.action = SITE.formEndpoint;
  }

  // ---------- Run ----------
  renderHeader();
  renderFooter();
  renderHero();
  renderDownloadOptions();
  renderPromoBanner();
  renderFeatures();
  renderUpdateStrip();
  renderStats();
  renderHomeGallery();
  renderGuides();
  renderFAQ();
  renderChangelog();
  renderContact();

  document.dispatchEvent(new CustomEvent("site:rendered"));
})();