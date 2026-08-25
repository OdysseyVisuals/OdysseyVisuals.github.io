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
    { href: "index.html", label: "Home", key: "home" },
    { href: "guides.html", label: "Guides", key: "guides" },
    { href: "changelog.html", label: "Changelog", key: "changelog" },
    { href: "contact.html", label: "Contact", key: "contact" },
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
        <a class="brand" href="index.html"><span>✦</span> ${SITE.name.toUpperCase()}</a>
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
        <a class="brand footer-brand" href="index.html"><img src="assets/logo.png" alt="${SITE.name}"></a>
        ${socialLinks.length ? `<p class="footer-social">${socialLinks.join(" · ")}</p>` : ""}
        <p>© <span id="year"></span> ${SITE.name}. All rights reserved.</p>
      </div>`;
    $("#year").textContent = new Date().getFullYear();
  }

  // ---------- Homepage sections ----------
  function renderHero() {
    const el = $("#hero-actions");
    if (!el) return;
    el.innerHTML = `
      <a class="mc-button primary" href="${SITE.links.curseforge}" target="_blank" rel="noreferrer">⬇ CURSEFORGE</a>
      <a class="mc-button" href="${SITE.links.mcpedl}" target="_blank" rel="noreferrer">⬇ MCPEDL</a>`;
    const stats = $("#hero-stats");
    if (stats) stats.innerHTML = `<span>✦ V${SITE.version}</span><span>▣ ${SITE.minecraftVersion}</span><span>⚡ DEFERRED</span>`;
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

  function renderHomeGallery() {
    const el = $("#gallery-grid");
    if (!el) return;
    el.innerHTML = GALLERY.map(
      (g) => `
      <button class="gallery-item reveal" data-full="${g.src}">
        <img src="${g.src}" alt="${g.label}">
      </button>`
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
        <a class="mc-button" href="changelog.html">READ CHANGELOG →</a>
      </div>`;
  }

  // ---------- Guides page ----------
  function renderGuides() {
    const el = $("#guides-grid");
    if (!el) return;
    el.innerHTML = GUIDES.map(
      (g) => `
      <article class="pixel-panel guide">
        <span class="platform">${g.platform}</span>
        <h3>${g.title}</h3>
        <ol>${g.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
      </article>`
    ).join("");
  }

  function renderFAQ() {
    const el = $("#faq-list");
    if (!el) return;
    el.innerHTML = FAQ.map(
      (f, i) => `
      <details${i === 0 ? " open" : ""}>
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
  renderFeatures();
  renderUpdateStrip();
  renderHomeGallery();
  renderGuides();
  renderFAQ();
  renderChangelog();
  renderContact();

  document.dispatchEvent(new CustomEvent("site:rendered"));
})();