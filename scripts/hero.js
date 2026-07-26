/* ================================================================
   HERO SECTION — Animations & Interactions
   ================================================================ */
(function () {
  "use strict";

  /* ---------- Scroll Reveal for Hero Elements ---------- */
  var heroContent = document.querySelector("[data-animate='hero-content']");
  var heroVisual = document.querySelector("[data-animate='hero-visual']");

  function revealHero() {
    if (heroContent) heroContent.classList.add("is-visible");
    if (heroVisual) heroVisual.classList.add("is-visible");
  }

  /* Trigger on page load with a short delay for polish */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(revealHero, 120);
    });
  } else {
    setTimeout(revealHero, 120);
  }

  /* ---------- Mouse Parallax on Profile Card ---------- */
  var profileCard = document.getElementById("profileCard");
  var heroVisualWrap = document.querySelector(".hero-visual");

  if (profileCard && heroVisualWrap) {
    heroVisualWrap.addEventListener("mousemove", function (e) {
      var rect = heroVisualWrap.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;

      /* Subtle 3D tilt on the card */
      var rotateY = x * 12;
      var rotateX = -y * 12;
      profileCard.style.transform =
        "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-6px)";

      /* Move tech badges slightly opposite for depth */
      var badges = profileCard.querySelectorAll(".tech-badge");
      badges.forEach(function (badge, i) {
        var depth = 1 + (i % 3) * 0.5;
        var bx = -x * 8 * depth;
        var by = -y * 8 * depth;
        badge.style.transform = "translate(" + bx + "px, " + by + "px)";
      });
    });

    heroVisualWrap.addEventListener("mouseleave", function () {
      profileCard.style.transform = "";
      var badges = profileCard.querySelectorAll(".tech-badge");
      badges.forEach(function (badge) {
        badge.style.transform = "";
      });
    });
  }

  /* ---------- Cursor Glow Follower ---------- */
  var cursorGlow = document.getElementById("cursorGlow");

  if (cursorGlow && heroVisualWrap) {
    heroVisualWrap.addEventListener("mousemove", function (e) {
      var rect = heroVisualWrap.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      cursorGlow.style.left = x + "px";
      cursorGlow.style.top = y + "px";
    });
  }

  /* ---------- Floating Badge Randomised Delay ---------- */
  function randomiseBadgeDelays() {
    var badges = document.querySelectorAll(".tech-badge");
    badges.forEach(function (badge) {
      var delay = (Math.random() * -5).toFixed(2);
      badge.style.animationDelay = delay + "s";
    });
  }
  randomiseBadgeDelays();

  /* ---------- Smooth Scroll for Anchor Links in Hero ---------- */
  document.querySelectorAll(".hero-section a[href^='#']").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ---------- Parallax Glows on Scroll ---------- */
  var glows = document.querySelectorAll(".hero-glow");
  var ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        var scrollY = window.pageYOffset;
        glows.forEach(function (glow, i) {
          var speed = 0.15 + i * 0.05;
          glow.style.transform = "translateY(" + scrollY * speed + "px)";
        });
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
})();
