/* Navigation, scroll reveals, gallery lightbox, and contact form handling. */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  function initNoImageDrag() {
    document.addEventListener("dragstart", (e) => {
      if (e.target.tagName === "IMG") e.preventDefault();
    });
  }

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

  // Prevents the page from visibly moving when a <dialog> opens. showModal()
  // moves focus into the dialog, and some browsers scroll the page to keep
  // the focused element in view; because html{scroll-behavior:smooth} is set
  // globally, that scroll (even a 1px correction) animates and is visible as
  // a jump. Forcing scroll-behavior to "auto" for the duration of the open
  // call makes any such adjustment instant/invisible, then restores the
  // smooth behavior afterward for normal in-page navigation.
  function openDialogWithoutScroll(dialog) {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const y = window.scrollY || window.pageYOffset || 0;
    dialog.showModal();
    window.scrollTo(0, y);
    // restore after the browser has finished any focus-driven scrolling
    requestAnimationFrame(() => {
      window.scrollTo(0, y);
      html.style.scrollBehavior = prev;
    });
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
    const dialog = $(".lightbox:not(.download-modal):not(.changelog-modal)");
    if (!dialog) return;
    $$(".gallery-item").forEach((item) =>
      item.addEventListener("click", () => {
        const img = $("img", item);
        const target = $("img", dialog);
        const tag = $(".lightbox-tag", dialog);
        target.src = item.dataset.full;
        target.alt = img.alt;
        if (tag) tag.textContent = item.dataset.tag || img.alt || "";
        openDialogWithoutScroll(dialog);
      })
    );
    $(".lightbox-close", dialog)?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  function initDownloadModal() {
    const trigger = $("#download-trigger");
    const dialog = $(".download-modal");
    if (!trigger || !dialog) return;
    trigger.addEventListener("click", () => {
      openDialogWithoutScroll(dialog);
    });
    $(".lightbox-close", dialog)?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  // Fetches with a hard timeout. Rejects with a timeout error if `ms`
  // passes before the request settles, and aborts the underlying request
  // so it doesn't keep running in the background.
  function fetchWithTimeout(url, options, ms) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    return fetch(url, { ...options, signal: controller.signal }).finally(() =>
      clearTimeout(timer)
    );
  }

  // Submits to Formspree, which is blocked outright in some countries. If it
  // hasn't responded within FORMSPREE_TIMEOUT, or it errors/is blocked, we
  // fall back to Web3Forms with the same field data instead of leaving the
  // user stuck on a spinner.
  const FORMSPREE_TIMEOUT = 6000;

  async function submitToFormspree(formData) {
    const res = await fetchWithTimeout(
      SITE.formEndpoint,
      {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      },
      FORMSPREE_TIMEOUT
    );
    if (!res.ok) throw new Error("Formspree request failed");
    return res;
  }

  async function submitToWeb3Forms(formData) {
    formData.append("access_key", SITE.web3formsAccessKey);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Web3Forms request failed");
    return res;
  }

  function initContactForm() {
    const form = $("form[data-form]");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = $(".form-status", form);

      if (form.action.includes("YOUR_FORM_ID") || SITE.formEndpoint.includes("YOUR_FORM_ID")) {
        if (status) status.textContent = "Form is not connected yet — add your Formspree form ID in content.js to enable sending.";
        return;
      }

      if (status) status.textContent = "Sending…";
      const formData = new FormData(form);
      const submitBtn = $("button[type=submit]", form);
      if (submitBtn) submitBtn.disabled = true;

      try {
        try {
          await submitToFormspree(formData);
        } catch (primaryErr) {
          // Formspree either errored or didn't answer within the timeout
          // (likely blocked) — retry the same data via Web3Forms.
          if (status) status.textContent = "Retrying via backup service…";
          await submitToWeb3Forms(new FormData(form));
        }
        if (status) status.textContent = "Thanks — your message was sent!";
        form.reset();
      } catch (err) {
        if (status) status.textContent = "Something went wrong sending your message. Please try again or reach us on Discord.";
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  function initChangelogModal() {
    const dialog = $(".changelog-modal");
    const items = $$(".change[data-index]");
    if (!dialog || !items.length) return;
    const body = $("#changelog-modal-body", dialog);

    function renderItem(item) {
      if (typeof item === "object" && item !== null && "note" in item) {
        return `<li class="change-note">${item.note}</li>`;
      }
      return `<li>${item}</li>`;
    }

    function renderBody(c) {
      if (c.sections && c.sections.length) {
        return c.sections.map(
          (s) => `
            <div class="change-section">
              <h4>${s.heading}</h4>
              <ul class="change-details">${s.items.map(renderItem).join("")}</ul>
            </div>`
        ).join("");
      }
      const details = c.details && c.details.length ? c.details : [c.notes];
      return `<ul class="change-details">${details.map(renderItem).join("")}</ul>`;
    }

    function openEntry(index) {
      const c = CHANGELOG[index];
      if (!c) return;
      body.innerHTML = `
        <b>V${c.version} · ${c.date.toUpperCase()}</b>
        <h3>${c.title}</h3>
        ${renderBody(c)}`;
      openDialogWithoutScroll(dialog);
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
    initNoImageDrag();
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