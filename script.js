/* Navigation, scroll reveals, gallery lightbox, and contact form handling. */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  function initMenu() {
    const menu = $(".menu-toggle");
    const links = $(".nav-links");
    if (!menu || !links) return;
    menu.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      menu.setAttribute("aria-expanded", String(open));
    });
    $$(".nav-links a", document).forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("is-open"))
    );
  }

  function initReveal() {
    const targets = $$(".reveal");
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.12 }
    );
    targets.forEach((el) => io.observe(el));
  }

  function initLightbox() {
    const dialog = $(".lightbox");
    if (!dialog) return;
    $$(".gallery-item").forEach((item) =>
      item.addEventListener("click", () => {
        const img = $("img", item);
        const target = $(".lightbox img");
        target.src = item.dataset.full;
        target.alt = img.alt;
        dialog.showModal();
      })
    );
    $(".lightbox-close")?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  function initDownloadModal() {
    const trigger = $("#download-trigger");
    const dialog = $(".download-modal");
    if (!trigger || !dialog) return;
    trigger.addEventListener("click", () => dialog.showModal());
    $(".lightbox-close", dialog)?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  function initContactForm() {
    const form = $("form[data-form]");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      const status = $(".form-status", form);
      if (form.action.includes("YOUR_FORM_ID")) {
        e.preventDefault();
        if (status) status.textContent = "Form is not connected yet — add your Formspree form ID in content.js to enable sending.";
        return;
      }
      if (status) status.textContent = "Sending…";
    });
  }

  function initChangelogModal() {
    const dialog = $(".changelog-modal");
    const items = $$(".change[data-index]");
    if (!dialog || !items.length) return;
    const body = $("#changelog-modal-body", dialog);

    function openEntry(index) {
      const c = CHANGELOG[index];
      if (!c) return;
      const details = c.details && c.details.length ? c.details : [c.notes];
      body.innerHTML = `
        <b>V${c.version} · ${c.date.toUpperCase()}</b>
        <h3>${c.title}</h3>
        <ul class="change-details">${details.map((d) => `<li>${d}</li>`).join("")}</ul>`;
      dialog.showModal();
    }

    items.forEach((item) => {
      item.addEventListener("click", () => openEntry(Number(item.dataset.index)));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openEntry(Number(item.dataset.index));
        }
      });
    });
    $(".lightbox-close", dialog)?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  function initInteractions() {
    initMenu();
    initReveal();
    initLightbox();
    initChangelogModal();
    initDownloadModal();
    initContactForm();
  }

  // site.js runs before this file in every page, so the shared markup is
  // already present by the time this script loads. Calling the initializer
  // directly prevents the custom event from being missed. The event listener
  // is retained for any future dynamic re-render.
  initInteractions();
  document.addEventListener("site:rendered", initInteractions);
})();