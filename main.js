/* =====================================================================
   CORONDA — Capital Nacional de la Frutilla
   Interacciones y animaciones
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Header: estado al hacer scroll ---------- */
  const header = document.getElementById("siteHeader");
  const toTop = document.getElementById("toTop");

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    header.classList.toggle("scrolled", y > 40);
    toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Botón volver arriba ---------- */
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Tema claro / oscuro ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const STORAGE_KEY = "coronda-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const iconUse = themeToggle.querySelector("use");
    if (iconUse) iconUse.setAttribute("href", theme === "dark" ? "#icon-sun" : "#icon-moon");
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  if (themeToggle) {
    let current = document.documentElement.getAttribute("data-theme");
    if (current !== "dark" && current !== "light") current = "light";
    applyTheme(current);

    themeToggle.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
      applyTheme(next);
    });
  }

  /* ---------- Menú móvil (hamburguesa) ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  // Cerrar el menú al elegir una opción
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Animaciones de aparición (IntersectionObserver) ---------- */
  const revealEls = Array.from(document.querySelectorAll(".reveal"));

  // Asignar un retardo escalonado a los elementos hermanos
  const groups = new Map();
  revealEls.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((list) => {
    list.forEach((el, i) => {
      el.style.setProperty("--d", Math.min(i * 80, 480) + "ms");
    });
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Contadores animados ---------- */
  const counters = Array.from(document.querySelectorAll(".stat-num[data-count]"));

  function formatNumber(n) {
    return n.toLocaleString("es-AR");
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const isInt = Number.isInteger(target);
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      // easing suave (easeOutCubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (isInt ? formatNumber(Math.round(value)) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterObserver.observe(c));
  } else {
    counters.forEach((c) => {
      const n = parseInt(c.dataset.count, 10);
      c.textContent = formatNumber(n) + (c.dataset.suffix || "");
    });
  }

  /* ---------- Lightbox de la galería ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

  function openLightbox(item) {
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.dataset.caption || "";
    lightboxCaption.textContent = item.dataset.caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryItems.forEach((item) => item.addEventListener("click", () => openLightbox(item)));
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------- Scrollspy: resaltar sección activa ---------- */
  const navLinks = Array.from(mainNav.querySelectorAll('a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spyObserver.observe(s));
  }

  /* ---------- Año del footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
