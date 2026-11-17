/* Face Value — shared script (vanilla JS, no build step). */
(function () {
  "use strict";

  /* ---------- Info page content: edit here ----------
     One entry per section. `title` is what the Index shows. `text` is a list of paragraphs.
     `image` is optional: { src, alt, size } where size is "large" (548 px), "medium" (415 px)
     or "small" (334 px). Leave out `src` to draw a grey placeholder box instead. */

  var INFO_TEXT = [
    "This website explores how facial expressions become data, and how systems of classification shape the way we interpret them. Using a series of self-portraits, this experiment examines how a single face can be categorized through different frameworks, including emotion labels, Facial Action Coding System (FACS) action units, and dimensions of valence and arousal. Each image is repeatedly interpreted and organized according to visible features, perceived emotions, and possible mental states.",
    "By becoming both the subject and the person classifying the images, I consider the distance between what a face displays, what others perceive, and what a person actually experiences. The project questions how much can be understood from an expression, and what gets lost when it is turned into information."
  ];

  var INFO_SECTIONS = [
    {
      title: "Section 1",
      image: {   // placeholder photo
        src: "images/large/2026-11-09/20261109-012639-609a.jpg",
        alt: "Self-portrait, November 9, 2026 at 01:26:39",
        size: "large"
      },
      text: INFO_TEXT
    },
    {
      title: "Section 2",
      image: { size: "medium" },   // grey placeholder box, no image yet
      text: INFO_TEXT
    },
    {
      title: "Section 3",
      image: {   // placeholder photo
        src: "images/2026-11-10/20261110-120356-fa30.jpg",
        alt: "Self-portrait, November 10, 2026 at 12:03:56",
        size: "small"
      }
    }
  ];

  /* ---------- Helpers ---------- */

  var pad = function (n) { return String(n).padStart(2, "0"); };
  var DASH = "—";
  var SMALL = window.matchMedia("(max-width: 699px)");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // Empty or missing values show a dash. Values are shown exactly as written.
  function value(v) {
    return v == null || String(v).trim() === "" ? DASH : String(v);
  }

  // "2026-11-09" -> "November 9, 2026" (built from parts, so no time-zone shift)
  function formatDate(iso) {
    var p = iso.split("-").map(Number);
    return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric"
    });
  }

  // "2026-11-09" + "17:48:51" -> "11-09-26/17:48:51"
  function indexLabel(p) {
    var d = p.date.split("-");
    return d[1] + "-" + d[2] + "-" + d[0].slice(2) + "/" + p.time;
  }

  function altText(p) {
    return "Self-portrait, " + formatDate(p.date) + " at " + p.time;
  }

  // Mouse hover only; touch taps go through click.
  function isMouse(e) { return !e.pointerType || e.pointerType === "mouse"; }

  /* ---------- Live clock (every page, visitor's local time) ---------- */

  function startClock() {
    var clock = document.querySelector(".clock");
    if (!clock) return;
    function tick() {
      var d = new Date();
      clock.textContent = pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
      // Re-align to the next real second so the display never drifts or skips.
      setTimeout(tick, 1000 - d.getMilliseconds() + 5);
    }
    tick();
  }

  // data/photos.js (written by the build script) sets window.FACE_VALUE_PHOTOS, so the site
  // also works when the HTML file is opened directly (file://), where fetch is blocked.
  function loadPhotos() {
    if (Array.isArray(window.FACE_VALUE_PHOTOS)) return Promise.resolve(window.FACE_VALUE_PHOTOS);
    return fetch("data/photos.json").then(function (r) {
      if (!r.ok) throw new Error("Could not load data/photos.json (" + r.status + ")");
      return r.json();
    });
  }

  /* ---------- Index (column 1 on home, archive and info) ---------- */

  // Older Safari only has addListener on media queries.
  function onMediaChange(mq, fn) {
    if (mq.addEventListener) mq.addEventListener("change", fn); else mq.addListener(fn);
  }

  // Builds one button per entry. `collapseQuery` is the media query under which the
  // Index becomes a tap-to-open list. Returns { rows, setCurrent(i), isListVisible() }.
  function buildIndex(entries, collapseQuery) {
    var collapse = collapseQuery ? window.matchMedia(collapseQuery) : SMALL;
    var nav = document.querySelector(".index");
    var label = nav.querySelector(".index__label");
    var list = nav.querySelector(".index__list");
    var rows = [];
    var current = -1;

    entries.forEach(function (entry, i) {
      var li = el("li");
      var b = el("button", "index__row btn-text");
      b.type = "button";
      b.dataset.i = i;
      // Allow a break after "/" when the column is too narrow for the whole entry.
      var parts = entry.label.split("/");
      parts.forEach(function (part, k) {
        if (k) { b.appendChild(document.createTextNode("/")); b.appendChild(el("wbr")); }
        b.appendChild(document.createTextNode(part));
      });
      if (entry.ariaLabel) b.setAttribute("aria-label", entry.ariaLabel);
      li.appendChild(b);
      list.appendChild(li);
      rows.push(b);
    });

    // Small screens: the label opens and closes the list. Large screens: always open.
    function syncToggle() {
      if (collapse.matches) {
        nav.setAttribute("data-collapsible", "");
        label.tabIndex = 0;
        if (!label.hasAttribute("data-touched")) label.setAttribute("aria-expanded", "false");
      } else {
        nav.removeAttribute("data-collapsible");
        label.tabIndex = -1;
        label.removeAttribute("data-touched");
        label.setAttribute("aria-expanded", "true");
      }
    }
    label.addEventListener("click", function () {
      if (!collapse.matches) return;
      label.setAttribute("data-touched", "");
      label.setAttribute("aria-expanded", label.getAttribute("aria-expanded") === "true" ? "false" : "true");
    });
    onMediaChange(collapse, syncToggle);
    syncToggle();

    return {
      rows: rows,
      setCurrent: function (i) {
        if (i === current) return;
        if (rows[current]) { rows[current].classList.remove("is-current"); rows[current].removeAttribute("aria-current"); }
        current = i;
        if (rows[i]) { rows[i].classList.add("is-current"); rows[i].setAttribute("aria-current", "true"); }
      },
      isListVisible: function () { return list.offsetParent !== null; }
    };
  }

  function photoIndexEntries(photos) {
    return photos.map(function (p) {
      return { label: indexLabel(p), ariaLabel: p.time + ", " + formatDate(p.date) };
    });
  }

  /* ---------- Photo page (overlay over home or archive) ---------- */

  var INFO_ROWS = [
    ["What are you doing right now?", "doing"],
    ["AI Description:", "description"],
    ["Emotion Classification:", "emotion"],
    ["Valence levels:", "valence"],
    ["Arousal levels:", "arousal"]
  ];

  function createPhotoPage(photos) {
    var root = document.getElementById("photo-page");
    var fraction = document.getElementById("photo-page-fraction");
    var title = document.getElementById("photo-page-title");
    var img = document.getElementById("photo-page-img");
    var info = document.getElementById("photo-page-info");
    var exit = document.getElementById("photo-page-exit");
    var behind = [document.querySelector(".site-header"), document.querySelector("main")];
    var byId = {};
    photos.forEach(function (p, i) { byId[p.id] = i; });

    var openIndex = -1;
    var savedY = 0;
    var opener = null;
    var pushed = false;   // true when opening added a history entry (so Back closes it)

    function render(i) {
      var p = photos[i];
      fraction.textContent = (i + 1) + "/" + photos.length;
      title.textContent = indexLabel(p);
      img.src = p.large || p.image;
      img.alt = altText(p);
      info.textContent = "";
      INFO_ROWS.forEach(function (row) {
        info.appendChild(el("dt", null, row[0]));
        info.appendChild(el("dd", null, value(p[row[1]])));
      });
    }

    function show(i) {
      if (openIndex === -1) {
        savedY = window.scrollY;
        document.documentElement.classList.add("is-locked");
        behind.forEach(function (b) { if (b) b.inert = true; });
      }
      openIndex = i;
      render(i);
      root.hidden = false;
      root.scrollTop = 0;
      exit.focus({ preventScroll: true });
    }

    function hide() {
      if (openIndex === -1) return;
      openIndex = -1;
      root.hidden = true;
      behind.forEach(function (b) { if (b) b.inert = false; });
      document.documentElement.classList.remove("is-locked");
      window.scrollTo(0, savedY);
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
      opener = null;
    }

    function idFromHash() {
      var m = /^#photo=(.+)$/.exec(location.hash);
      return m && byId.hasOwnProperty(decodeURIComponent(m[1])) ? decodeURIComponent(m[1]) : null;
    }

    function open(i, from) {
      opener = from || null;
      var hash = "#photo=" + encodeURIComponent(photos[i].id);
      if (location.hash !== hash) {
        history.pushState({ photo: photos[i].id }, "", hash);
        pushed = true;
      }
      show(i);
    }

    function close() {
      if (openIndex === -1) return;
      if (pushed) {
        pushed = false;
        history.back();               // popstate below hides the overlay
      } else {
        history.replaceState(null, "", location.pathname + location.search);
        hide();
      }
    }

    window.addEventListener("popstate", function () {
      var id = idFromHash();
      if (id) { show(byId[id]); } else { pushed = false; hide(); }
    });

    exit.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && openIndex !== -1) { e.preventDefault(); close(); }
    });

    // A link to a photo opens it straight away.
    var initial = idFromHash();
    if (initial) show(byId[initial]);

    return { open: open, isOpen: function () { return openIndex !== -1; } };
  }

  /* ---------- Home ---------- */

  function initHome(photos) {
    var timeline = document.getElementById("timeline");
    var img = document.getElementById("viewer-img");
    var viewer = document.getElementById("viewer");
    var answer = document.getElementById("viewer-answer");
    if (!photos.length) return;

    var index = buildIndex(photoIndexEntries(photos));
    var page = createPhotoPage(photos);

    // Day columns: group by date, in chronological order (photos.json is already sorted).
    var days = [];
    photos.forEach(function (p, i) {
      var last = days[days.length - 1];
      if (!last || last.date !== p.date) days.push(last = { date: p.date, items: [] });
      last.items.push(i);
    });

    var times = [];   // photo index -> time button
    days.forEach(function (day) {
      var section = el("section", "day");
      section.appendChild(el("h2", "day__date", formatDate(day.date)));
      var ol = el("ol", "day__times");
      day.items.forEach(function (i) {
        var li = el("li");
        var b = el("button", "time btn-text", photos[i].time);
        b.type = "button";
        b.dataset.i = i;
        b.setAttribute("aria-label", photos[i].time + ", " + formatDate(day.date));
        li.appendChild(b);
        ol.appendChild(li);
        times[i] = b;
      });
      section.appendChild(ol);
      timeline.appendChild(section);
    });

    var current = -1;
    function show(i) {
      if (i === current) return;
      current = i;
      var p = photos[i];
      img.src = p.image;
      img.alt = altText(p);
      answer.textContent = value(p.doing);   // exactly as written; dash if none
      index.setCurrent(i);
    }

    // Initial state: earliest photo. Then preload the rest so switching doesn't flicker.
    show(0);
    photos.forEach(function (p) { var im = new Image(); im.src = p.image; });

    var scrolling = false;
    var scrollTimer = 0;
    var TARGETS = ".time, .index__row";
    var main = document.querySelector("main");

    // Hover: wins while the pointer actually moves over a row. A row sliding under a
    // still pointer during a scroll doesn't count, so scroll leads once the pointer is idle.
    var lastX = null, lastY = null;
    main.addEventListener("pointermove", function (e) {
      if (!isMouse(e)) return;
      var moved = e.clientX !== lastX || e.clientY !== lastY;
      lastX = e.clientX; lastY = e.clientY;
      if (!moved || scrolling) return;
      var b = e.target.closest(TARGETS);
      if (b) show(Number(b.dataset.i));
    });

    // Keyboard focus behaves like hover.
    main.addEventListener("focusin", function (e) {
      var b = e.target.closest(TARGETS);
      if (b) show(Number(b.dataset.i));
    });

    // Click a time or an Index row: open the photo page.
    main.addEventListener("click", function (e) {
      var b = e.target.closest(TARGETS);
      if (b) page.open(Number(b.dataset.i), b);
    });

    // Scroll: follow the Index row at the reference line (y = 450, where the list starts).
    function referenceLine() {
      if (SMALL.matches) return viewer.getBoundingClientRect().bottom + 8;
      return 450;
    }

    function syncToScroll() {
      if (page.isOpen()) return;
      var line = referenceLine() + 1;
      var hit = -1;
      if (index.isListVisible()) {
        var rows = index.rows;
        for (var k = 0; k < rows.length; k++) {
          if (rows[k].getBoundingClientRect().top <= line) hit = k; else break;
        }
      } else {
        // Index collapsed (small screens): the lowest time row that has reached the line.
        var best = -Infinity;
        times.forEach(function (b, i) {
          var t = b.getBoundingClientRect().top;
          if (t <= line && t > best) { best = t; hit = i; }
        });
      }
      if (hit !== -1) show(hit);
    }

    var ticking = false;
    window.addEventListener("scroll", function () {
      scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () { scrolling = false; }, 150);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; syncToScroll(); });
    }, { passive: true });
  }

  /* ---------- Archive ---------- */

  function initArchive(photos) {
    var list = document.getElementById("archive");
    if (!photos.length) return;
    var index = buildIndex(photoIndexEntries(photos));
    var page = createPhotoPage(photos);
    var N = photos.length;

    var thumbs = [];
    var frag = document.createDocumentFragment();
    photos.forEach(function (p, i) {
      var li = el("li");
      var b = el("button", "thumb btn-text");
      b.type = "button";
      b.dataset.i = i;
      b.setAttribute("aria-label", (i + 1) + " of " + N + ", " + p.time + ", " + formatDate(p.date));
      var im = el("img");
      im.src = p.thumb;
      im.alt = "";
      im.width = 350;
      im.height = 197;
      im.loading = "lazy";
      im.decoding = "async";
      b.appendChild(im);
      b.appendChild(el("span", "thumb__cap", (i + 1) + "/" + N));
      li.appendChild(b);
      frag.appendChild(li);
      thumbs.push(b);
    });
    list.appendChild(frag);

    var hovered = -1;

    // Current photo: the hovered thumbnail, else the first photo in the top visible row.
    function topVisible() {
      for (var k = 0; k < thumbs.length; k++) {
        if (thumbs[k].getBoundingClientRect().bottom > 0) return k;
      }
      return 0;
    }
    function sync() { index.setCurrent(hovered !== -1 ? hovered : topVisible()); }

    list.addEventListener("pointerover", function (e) {
      if (!isMouse(e)) return;
      var b = e.target.closest(".thumb");
      hovered = b ? Number(b.dataset.i) : -1;
      sync();
    });
    list.addEventListener("pointerleave", function () { hovered = -1; sync(); });
    list.addEventListener("focusin", function (e) {
      var b = e.target.closest(".thumb");
      if (b) index.setCurrent(Number(b.dataset.i));
    });

    document.querySelector("main").addEventListener("click", function (e) {
      var b = e.target.closest(".thumb, .index__row");
      if (b) page.open(Number(b.dataset.i), b);
    });

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; if (hovered === -1) sync(); });
    }, { passive: true });

    sync();
  }

  /* ---------- Info ---------- */

  function initInfo() {
    var content = document.getElementById("info-content");
    var sections = INFO_SECTIONS.map(function (s, i) {
      var sec = el("section", "info-section" + (s.text && s.text.length ? "" : " info-section--image-only"));
      sec.id = "section-" + (i + 1);
      sec.setAttribute("aria-labelledby", sec.id + "-title");
      var h = el("h2", "visually-hidden", s.title);
      h.id = sec.id + "-title";
      sec.appendChild(h);

      if (s.image) {
        var fig = el("figure", "info-figure info-figure--" + (s.image.size || "large"));
        if (s.image.src) {
          var im = el("img");
          im.src = s.image.src;
          im.alt = s.image.alt || "";
          im.loading = i === 0 ? "eager" : "lazy";
          fig.appendChild(im);
        } else {
          var box = el("div", "info-figure__placeholder");
          box.setAttribute("role", "img");
          box.setAttribute("aria-label", "Image to come");
          fig.appendChild(box);
        }
        sec.appendChild(fig);
      }

      if (s.text && s.text.length) {
        var t = el("div", "info-text");
        s.text.forEach(function (para) { t.appendChild(el("p", null, para)); });
        sec.appendChild(t);
      }
      content.appendChild(sec);
      return sec;
    });

    // The info Index stays in column 1 down to 480 px; only phones get the tap-to-open list.
    var index = buildIndex(INFO_SECTIONS.map(function (s) { return { label: s.title }; }),
                           "(max-width: 479px)");

    index.rows.forEach(function (b, i) {
      b.addEventListener("click", function () {
        sections[i].scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
        index.setCurrent(i);
      });
    });

    // The section in view: the last one whose top has passed 40% of the viewport,
    // or the last section once the page is scrolled to the bottom.
    function sync() {
      var line = window.innerHeight * 0.4;
      var hit = 0;
      sections.forEach(function (s, i) { if (s.getBoundingClientRect().top <= line) hit = i; });
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && window.scrollY > 0) hit = sections.length - 1;
      index.setCurrent(hit);
    }

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; sync(); });
    }, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  }

  /* ---------- Boot ---------- */

  startClock();

  var pageName = document.body.dataset.page;
  if (pageName === "info") {
    initInfo();
  } else if (pageName === "home" || pageName === "archive") {
    loadPhotos()
      .then(function (photos) {
        if (pageName === "home") initHome(photos); else initArchive(photos);
      })
      .catch(function (err) { console.error(err); });
  }
})();
