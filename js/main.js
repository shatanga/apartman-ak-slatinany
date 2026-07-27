/* Apartmán AK Slatiňany — interakce webu */
(function () {
  "use strict";

  /* ---------- Mobilní menu ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
      var open = nav.classList.contains("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // zavřít po kliknutí na odkaz
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("is-open"); });
    });
  }

  /* ---------- Filtr galerie ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var galleryItems = document.querySelectorAll(".gallery-grid .gitem");
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var cat = btn.getAttribute("data-filter");
        galleryItems.forEach(function (item) {
          var show = cat === "all" || item.getAttribute("data-cat") === cat;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCounter = lb.querySelector(".lightbox__counter");
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    var current = 0;

    function visibleTriggers() {
      return triggers.filter(function (t) {
        var host = t.closest(".gitem");
        return !host || host.style.display !== "none";
      });
    }

    function open(index) {
      var list = visibleTriggers();
      current = index;
      var t = list[current];
      lbImg.src = t.getAttribute("data-full") || t.getAttribute("href") || t.querySelector("img").src;
      lbImg.alt = t.getAttribute("data-alt") || "";
      if (lbCounter) lbCounter.textContent = (current + 1) + " / " + list.length;
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    function step(dir) {
      var list = visibleTriggers();
      current = (current + dir + list.length) % list.length;
      open(current);
    }

    triggers.forEach(function (t) {
      t.addEventListener("click", function (e) {
        e.preventDefault();
        open(visibleTriggers().indexOf(t));
      });
    });
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.querySelector(".lightbox__nav--prev").addEventListener("click", function () { step(-1); });
    lb.querySelector(".lightbox__nav--next").addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  /* ---------- Rok v patičce ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
