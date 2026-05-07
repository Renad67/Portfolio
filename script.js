/* =============================================
   RENAD ABDULLAH — PORTFOLIO
   script.js
   ============================================= */

"use strict";

/* ─── CUSTOM CURSOR ─────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById("cursor");
  const trail = document.getElementById("cursorTrail");
  if (!cursor || !trail) return;

  let mouseX = 0,
    mouseY = 0;
  let trailX = 0,
    trailY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    trail.style.left = trailX + "px";
    trail.style.top = trailY + "px";
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Grow on hoverable elements
  const hoverables =
    "a, button, .skill-tag, .cert-card, .project-card, .contact-link-card, .skill-category";
  document.querySelectorAll(hoverables).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
      trail.style.transform = "translate(-50%, -50%) scale(1.5)";
      trail.style.opacity = "0.2";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      trail.style.transform = "translate(-50%, -50%) scale(1)";
      trail.style.opacity = "0.4";
    });
  });
})();

/* ─── NAVBAR SCROLL EFFECT ───────────────────── */
(function initNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  let lastY = 0;

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 40);

      // Hide nav on fast scroll down, show on scroll up
      if (y > lastY + 8 && y > 200) {
        nav.style.transform = "translateY(-100%)";
      } else if (y < lastY - 4) {
        nav.style.transform = "translateY(0)";
      }
      lastY = y;
    },
    { passive: true },
  );

  nav.style.transition =
    "background 0.3s, border-color 0.3s, transform 0.4s cubic-bezier(0.4,0,0.2,1)";
})();

/* ─── MOBILE HAMBURGER ───────────────────────── */
(function initHamburger() {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);

    // Animate bars
    const bars = btn.querySelectorAll("span");
    if (open) {
      bars[0].style.cssText = "transform: translateY(6.5px) rotate(45deg)";
      bars[1].style.cssText = "opacity: 0; transform: scaleX(0)";
      bars[2].style.cssText = "transform: translateY(-6.5px) rotate(-45deg)";
    } else {
      bars.forEach((b) => (b.style.cssText = ""));
    }
  });

  // Close on link click
  menu.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", false);
      btn.querySelectorAll("span").forEach((b) => (b.style.cssText = ""));
    });
  });
})();

/* ─── SMOOTH SCROLL FOR NAV LINKS ───────────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const navH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
      ) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* ─── SCROLL REVEAL ──────────────────────────── */
(function initReveal() {
  const elements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
  );

  // Apply delay classes
  elements.forEach((el) => {
    const delay = el.dataset.delay || 0;
    el.classList.add(`delay-${delay}`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ─── HERO NUMBER COUNTER ────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll(".stat-number[data-count]");
  if (!counters.length) return;

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((el) => observer.observe(el));
})();

/* ─── SKILL BAR FILL ─────────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll(".skill-bar-fill");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width = target.dataset.width || "0";
          // Slight delay for stagger
          const idx = Array.from(bars).indexOf(target);
          setTimeout(() => {
            target.style.width = width + "%";
          }, idx * 120);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.3 },
  );

  bars.forEach((bar) => observer.observe(bar));
})();

/* ─── ACTIVE NAV LINK HIGHLIGHT ──────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;
      const navH = 72;

      sections.forEach((section) => {
        const top = section.offsetTop - navH - 80;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const active = document.querySelector(
            `.nav-link[href="#${section.id}"]`,
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { passive: true },
  );
})();

/* ─── TERMINAL TYPING EFFECT (profile card) ─── */
(function initTyping() {
  const codeBlock = document.querySelector(".terminal-code code");
  if (!codeBlock) return;

  const originalHTML = codeBlock.innerHTML;
  codeBlock.innerHTML = "";

  // Reveal the terminal code character by character using a text reveal
  // We'll fade it in line-by-line for a cleaner effect
  const lines = originalHTML.split("\n");
  let lineIndex = 0;

  function revealNextLine() {
    if (lineIndex >= lines.length) return;
    const tempDiv = document.createElement("span");
    tempDiv.style.opacity = "0";
    tempDiv.style.transition = "opacity 0.3s ease";
    tempDiv.innerHTML =
      lines[lineIndex] + (lineIndex < lines.length - 1 ? "\n" : "");
    codeBlock.appendChild(tempDiv);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        tempDiv.style.opacity = "1";
      });
    });

    lineIndex++;
    if (lineIndex < lines.length) {
      setTimeout(revealNextLine, 80);
    }
  }

  // Trigger when terminal card is visible
  const card = document.querySelector(".card-terminal");
  if (!card) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(revealNextLine, 300);
        observer.unobserve(card);
      }
    },
    { threshold: 0.4 },
  );

  observer.observe(card);
})();

/* ─── TILT EFFECT ON PROJECT CARD ────────────── */
(function initTilt() {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -4;
      const rotateY = ((x - cx) / cx) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.transition =
        "transform 0.05s linear, border-color 0.3s, box-shadow 0.3s";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition =
        "transform 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.3s";
    });
  });
})();

/* ─── FLOATING PARTICLES IN HERO ─────────────── */
(function initParticles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const count = 18;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = `
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
      opacity: ${Math.random() * 0.25 + 0.05};
      width:  ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: ${Math.random() > 0.5 ? "var(--accent)" : "#fff"};
      left:   ${Math.random() * 100}%;
      top:    ${Math.random() * 100}%;
      animation: floatDot ${Math.random() * 12 + 8}s ease-in-out infinite;
      animation-delay: -${Math.random() * 10}s;
    `;
    hero.appendChild(dot);
  }

  // Inject keyframes if not already present
  if (!document.getElementById("particle-style")) {
    const style = document.createElement("style");
    style.id = "particle-style";
    style.textContent = `
      @keyframes floatDot {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        25%       { transform: translateY(-18px) translateX(8px); }
        50%       { transform: translateY(-8px) translateX(-12px); }
        75%       { transform: translateY(-24px) translateX(4px); }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ─── CERT CARD SHIMMER ON HOVER ─────────────── */
(function initShimmer() {
  const cards = document.querySelectorAll(".cert-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--shimmer-x", x + "%");
      card.style.setProperty("--shimmer-y", y + "%");
      card.style.background = `
        radial-gradient(
          circle at ${x}% ${y}%,
          rgba(0,229,160,0.07) 0%,
          var(--surface) 60%
        )
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.background = "";
    });
  });
})();

/* ─── GLITCH EFFECT ON HERO NAME (random) ───── */
(function initGlitch() {
  const nameLines = document.querySelectorAll(".hero-name .name-line");
  if (!nameLines.length) return;

  const glitchChars =
    "!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function glitchText(el) {
    const original = el.textContent;
    let iterations = 0;
    const maxIter = original.length * 3;

    const interval = setInterval(() => {
      el.textContent = original
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iterations / 3) return char;
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        })
        .join("");

      iterations++;
      if (iterations > maxIter) {
        el.textContent = original;
        clearInterval(interval);
      }
    }, 28);
  }

  // Trigger glitch every ~8 seconds on the first name line
  function scheduleGlitch() {
    const delay = 8000 + Math.random() * 4000;
    setTimeout(() => {
      glitchText(nameLines[0]);
      scheduleGlitch();
    }, delay);
  }

  // Start after initial load animation
  setTimeout(scheduleGlitch, 3000);
})();

/* ─── SCROLL PROGRESS BAR ────────────────────── */
(function initProgressBar() {
  const bar = document.createElement("div");
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: var(--accent);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s linear;
    pointer-events: none;
    box-shadow: 0 0 8px var(--accent);
  `;
  document.body.appendChild(bar);

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollH =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollH > 0 ? (scrollTop / scrollH) * 100 : 0;
      bar.style.width = pct + "%";
    },
    { passive: true },
  );
})();

/* ─── CONTACT FORM EMAIL LINK COPY ───────────── */
(function initEmailCopy() {
  const emailLink = document.querySelector('a[href^="mailto"]');
  if (!emailLink) return;

  // Optional: add copy-to-clipboard on long press / right-click
  emailLink.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const email = emailLink.href.replace("mailto:", "");
    navigator.clipboard
      .writeText(email)
      .then(() => {
        showToast("Email copied to clipboard!");
      })
      .catch(() => {});
  });
})();

/* ─── TOAST NOTIFICATION ─────────────────────── */
function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: var(--surface);
    border: 1px solid var(--accent);
    color: var(--accent);
    padding: 12px 24px;
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 13px;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    pointer-events: none;
    letter-spacing: 0.04em;
    box-shadow: 0 8px 30px rgba(0,229,160,0.15);
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

/* ─── ACTIVE NAV INDICATOR CSS INJECTION ─────── */
(function injectActiveNavStyle() {
  const style = document.createElement("style");
  style.textContent = `
    .nav-link.active {
      color: var(--accent) !important;
    }
    .nav-link.active::after {
      width: 100% !important;
    }
  `;
  document.head.appendChild(style);
})();

/* ─── INITIAL LOAD ANIMATION ─────────────────── */
(function initLoadAnimation() {
  // Slight delay to ensure fonts loaded
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  window.addEventListener("load", () => {
    document.body.style.opacity = "1";

    // Trigger hero reveals immediately
    document
      .querySelectorAll(".hero .reveal-up, .hero .reveal-right")
      .forEach((el) => {
        const delay = parseFloat(el.dataset.delay || 0) * 150;
        setTimeout(() => el.classList.add("revealed"), delay + 100);
      });
  });
})();
