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

  /* ---------- Emotion filter: edit here ----------
     The home Index lists the AI emotion classifications (photos.json `emotion`) that exist in the
     data, in the Figma order below. A value in the data that isn't listed here goes after these,
     A to Z. */

  var EMOTION_ORDER = ["Neutral", "Sadness", "Disgust", "Happiness", "Contempt", "Anger", "Surprise", "Fear"];

  /* ---------- Selection (home and archive) ----------
     `selected` holds what is underlined in green:
       home:    the selected emotions (exactly as in photos.json); several at once.
       archive: the id of the one selected photo, or nothing.
     Every change fires "facevalue:selectionchange" on document, with
     detail = { page: "home" | "archive", selected: [...] }. Also window.FaceValue.selected.
     Photos are never hidden or reordered by it. */

  var selected = new Set();
  window.FaceValue = { selected: selected };

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
  // Index becomes a tap-to-open list. Returns { list, rows, setCurrent(i) }.
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
      if (entry.key != null) b.dataset.key = entry.key;
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
      list: list,
      rows: rows,
      // Info page: the one current section (grey).
      setCurrent: function (i) {
        if (i === current) return;
        if (rows[current]) rows[current].removeAttribute("aria-current");
        current = i;
        if (rows[i]) rows[i].setAttribute("aria-current", "location");
      }
    };
  }

  function announce(pageName, keys) {
    document.dispatchEvent(new CustomEvent("facevalue:selectionchange", {
      detail: { page: pageName, selected: keys }
    }));
  }

  // Home: each Index item is a toggle (aria-pressed); selected ones are underlined in green.
  // "x Clear" sits under the last item while anything is selected. `onChange` runs after
  // every change (home uses it to underline the matching times).
  function buildSelectableIndex(keys, pageName, onChange) {
    var index = buildIndex(keys.map(function (k) { return { label: k, key: k }; }));

    var clearItem = el("li", "index__clear-item");
    var clear = el("button", "index__clear btn-text", "x Clear");
    clear.type = "button";
    clear.setAttribute("aria-label", "Clear selection");
    clearItem.hidden = true;
    clearItem.appendChild(clear);
    index.list.appendChild(clearItem);

    index.rows.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });

    function changed() {
      var keysNow = [];
      index.rows.forEach(function (b) {
        var on = selected.has(b.dataset.key);
        b.setAttribute("aria-pressed", on ? "true" : "false");
        if (on) keysNow.push(b.dataset.key);
      });
      clearItem.hidden = keysNow.length === 0;
      if (onChange) onChange();
      announce(pageName, keysNow);
    }

    index.list.addEventListener("click", function (e) {
      var b = e.target.closest(".index__row");
      if (!b) return;
      var k = b.dataset.key;
      if (selected.has(k)) selected.delete(k); else selected.add(k);
      changed();
    });

    clear.addEventListener("click", function () {
      selected.clear();
      changed();
      // The button disappears; keep keyboard focus in the Index.
      if (index.rows[0]) index.rows[0].focus({ preventScroll: true });
    });

    return index;
  }

  // Emotion values present in the data: Figma order first, then any others A to Z.
  function emotionKeys(photos) {
    var present = new Set();
    photos.forEach(function (p) {
      if (p.emotion != null && String(p.emotion).trim() !== "") present.add(p.emotion);
    });
    var known = EMOTION_ORDER.filter(function (e) { return present.has(e); });
    var extra = Array.from(present).filter(function (e) { return EMOTION_ORDER.indexOf(e) === -1; }).sort();
    return known.concat(extra);
  }

  /* ---------- Photo page (overlay over home or archive) ---------- */

  var INFO_ROWS = [
    ["Emotion class:", "emotion"],
    ["Valence level:", "valence"],
    ["Arousal level:", "arousal"]
  ];

  function createPhotoPage(photos) {
    var root = document.getElementById("photo-page");
    var fraction = document.getElementById("photo-page-fraction");
    var dateEl = document.getElementById("photo-page-date");
    var timeEl = document.getElementById("photo-page-time");
    var caption = document.getElementById("photo-page-caption");
    var doing = document.getElementById("photo-page-doing");
    var text = document.getElementById("photo-page-text");
    var prev = document.getElementById("photo-page-prev");
    var next = document.getElementById("photo-page-next");
    var img = document.getElementById("photo-page-img");
    var info = document.getElementById("photo-page-info");
    var exit = document.getElementById("photo-page-exit");
    var body = document.getElementById("photo-page-body");
    var content = document.getElementById("photo-page-content");
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
      dateEl.textContent = formatDate(p.date);
      timeEl.textContent = p.time;
      caption.textContent = value(p.description);
      doing.textContent = value(p.doing);
      prev.disabled = i === 0;
      next.disabled = i === photos.length - 1;
      img.src = p.large || p.image;
      img.alt = altText(p);
      info.textContent = "";
      INFO_ROWS.forEach(function (row) {
        info.appendChild(el("dt", null, row[0]));
        info.appendChild(el("dd", null, value(p[row[1]])));
      });
      fit();
      // Preload the neighbours so previous/next switch instantly.
      [i - 1, i + 1].forEach(function (j) {
        if (photos[j]) new Image().src = photos[j].large || photos[j].image;
      });
    }

    // Fit the block in the window without ever scrolling, on a 16-column grid (same margin
    // and gutters as the 8-column grid): photo columns 4-11, text columns 12-13. On phones the
    // text goes under a full-width photo. If the window is too short, only the photo shrinks
    // (keeping 16:9); the text keeps its size. The arrows sit level with the photo's middle.
    var phone = window.matchMedia("(max-width: 699px)");
    var GUTTER = 13;
    function fit() {
      if (openIndex === -1) return;
      var margin = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--margin")) || 13;
      var cs = getComputedStyle(body);
      var availH = body.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      var W = root.clientWidth;
      var col = (W - margin) / 16;                         // one column + gutter
      root.style.setProperty("--pp-col", col + "px");
      var w;
      if (phone.matches) {
        var full = W - 2 * margin;
        text.style.width = full + "px";
        text.style.minHeight = "";
        img.style.width = full + "px";
        var rest = content.offsetHeight - img.offsetHeight;   // text under the photo + gap
        w = Math.min(full, (availH - rest) * 16 / 9);
      } else {
        var textW = Math.max(2 * col - GUTTER, 175);
        var availW = W - 2 * 44;                            // keep clear of the arrows
        text.style.width = textW + "px";
        text.style.minHeight = "";
        w = Math.min(8 * col - GUTTER, availW - GUTTER - textW, (availH - 9) * 16 / 9);
      }
      w = Math.floor(Math.max(64, w));
      img.style.width = w + "px";
      // The text column runs from 5 px above the photo to 4 px below it (as in Figma).
      if (!phone.matches) text.style.minHeight = (w * 9 / 16 + 9) + "px";
      var r = img.getBoundingClientRect();
      root.style.setProperty("--pp-arrow-y", (r.top + r.height / 2) + "px");
    }

    var fitQueued = false;
    window.addEventListener("resize", function () {
      if (fitQueued) return;
      fitQueued = true;
      requestAnimationFrame(function () { fitQueued = false; fit(); });
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

    // Previous/next, in dataset order (the same order as the fraction). Stops at both ends.
    function go(step) {
      var j = openIndex + step;
      if (openIndex === -1 || j < 0 || j >= photos.length) return;
      openIndex = j;
      history.replaceState({ photo: photos[j].id }, "", "#photo=" + encodeURIComponent(photos[j].id));
      render(j);
    }

    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });

    // A click anywhere except the photo/text, the arrows or Exit closes the photo page.
    var swipedAt = 0;
    root.addEventListener("click", function (e) {
      if (Date.now() - swipedAt < 500) return;   // the tap that ended a swipe
      if (e.target.closest(".photo-page__content, .photo-page__arrow, #photo-page-exit")) return;
      close();
    });

    // Touch: swipe left for next, right for previous (anywhere on the overlay).
    var touch = null;
    root.addEventListener("touchstart", function (e) {
      touch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
    }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (!touch || e.changedTouches.length !== 1) return;
      var dx = e.changedTouches[0].clientX - touch.x;
      var dy = e.changedTouches[0].clientY - touch.y;
      touch = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        swipedAt = Date.now();
        go(dx < 0 ? 1 : -1);
      }
    }, { passive: true });
    // Nothing behind the overlay scrolls while it is open.
    root.addEventListener("wheel", function (e) { e.preventDefault(); }, { passive: false });

    function show(i) {
      if (openIndex === -1) {
        savedY = window.scrollY;
        document.documentElement.classList.add("is-locked");
        behind.forEach(function (b) { if (b) b.inert = true; });
      }
      openIndex = i;
      root.hidden = false;
      render(i);
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
      if (openIndex === -1) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
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

    var times = [];   // photo index -> time button
    // Emotion filter: the times of photos with a selected emotion are underlined.
    buildSelectableIndex(emotionKeys(photos), "home", function () {
      times.forEach(function (b, i) { b.classList.toggle("is-marked", selected.has(photos[i].emotion)); });
    });
    var page = createPhotoPage(photos);

    // Day columns: group by date, in chronological order (photos.json is already sorted).
    var days = [];
    photos.forEach(function (p, i) {
      var last = days[days.length - 1];
      if (!last || last.date !== p.date) days.push(last = { date: p.date, items: [] });
      last.items.push(i);
    });

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
    }

    // Initial state: earliest photo. Then preload the rest so switching doesn't flicker.
    show(0);
    photos.forEach(function (p) { var im = new Image(); im.src = p.image; });

    var scrolling = false;
    var scrollTimer = 0;
    var TARGETS = ".time";
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

    // Click a time: open the photo page.
    main.addEventListener("click", function (e) {
      var b = e.target.closest(TARGETS);
      if (b) page.open(Number(b.dataset.i), b);
    });

    // Scroll: follow the time row at the reference line (y = 450, where the times start).
    function referenceLine() {
      if (SMALL.matches) return viewer.getBoundingClientRect().bottom + 8;
      return 450;
    }

    function syncToScroll() {
      if (page.isOpen()) return;
      var line = referenceLine() + 1;
      // The lowest time row (in any day column) that has reached the line; the earliest
      // photo at the top of the page.
      var hit = 0;
      var best = -Infinity;
      times.forEach(function (b, i) {
        var t = b.getBoundingClientRect().top;
        if (t <= line && t > best) { best = t; hit = i; }
      });
      show(hit);
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
    var N = photos.length;
    // Index rows read "n/N": the photo's place in the chronological list / the total.
    var index = buildIndex(photos.map(function (p, i) {
      return { label: (i + 1) + "/" + N, ariaLabel: (i + 1) + " of " + N + ", " + p.time + ", " + formatDate(p.date) };
    }));
    var page = createPhotoPage(photos);

    // Thumbnails, captioned with the photo's emotion classification (dash if none).
    var caps = [];
    var thumbs = [];
    var frag = document.createDocumentFragment();
    photos.forEach(function (p, i) {
      var li = el("li");
      var b = el("button", "thumb btn-text");
      b.type = "button";
      b.dataset.i = i;
      b.setAttribute("aria-label", (i + 1) + " of " + N + ", " + p.time + ", " + formatDate(p.date) +
                     ", " + value(p.emotion));
      var im = el("img");
      im.src = p.thumb;
      im.alt = "";
      im.width = 350;
      im.height = 197;
      im.loading = "lazy";
      im.decoding = "async";
      b.appendChild(im);
      var cap = el("span", "thumb__cap", value(p.emotion));
      b.appendChild(cap);
      li.appendChild(b);
      frag.appendChild(li);
      caps.push(cap);
      thumbs.push(b);
    });
    list.appendChild(frag);

    // One selected photo at a time: its Index row and its caption are underlined in green.
    var current = -1;
    index.rows.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
    function select(i) {
      if (i === current) return;
      if (current !== -1) {
        index.rows[current].setAttribute("aria-pressed", "false");
        caps[current].classList.remove("is-marked");
      }
      current = i;
      selected.clear();
      if (i !== -1) {
        selected.add(photos[i].id);
        index.rows[i].setAttribute("aria-pressed", "true");
        caps[i].classList.add("is-marked");
      }
      announce("archive", Array.from(selected));
    }

    // Hover (or keyboard focus) on a photo or its Index row greys both, so you can see which
    // row belongs to which photo.
    var hovered = -1;
    function hover(i) {
      if (i === hovered) return;
      if (hovered !== -1) { index.rows[hovered].classList.remove("is-hover"); caps[hovered].classList.remove("is-hover"); }
      hovered = i;
      if (i !== -1) { index.rows[i].classList.add("is-hover"); caps[i].classList.add("is-hover"); }
    }
    var main = document.querySelector("main");
    var TARGETS = ".thumb, .index__row";
    main.addEventListener("pointerover", function (e) {
      if (!isMouse(e)) return;
      var b = e.target.closest(TARGETS);
      hover(b ? Number(b.dataset.i) : -1);
    });
    main.addEventListener("pointerleave", function () { hover(-1); });
    main.addEventListener("focusin", function (e) {
      var b = e.target.closest(TARGETS);
      hover(b ? Number(b.dataset.i) : -1);
    });
    main.addEventListener("focusout", function () { hover(-1); });

    // Index column (fixed, scrolls on its own): keep row i in view inside it, without
    // moving the page.
    var listBox = index.list;
    function revealRow(i) {
      var r = index.rows[i].getBoundingClientRect();
      var box = listBox.getBoundingClientRect();
      if (r.top < box.top) listBox.scrollTop -= box.top - r.top;
      else if (r.bottom > box.bottom) listBox.scrollTop += r.bottom - box.bottom;
    }

    // Scroll the page so photo i (image and caption) is fully visible, centred in the space
    // under the header. Nothing moves if it is already fully visible.
    var header = document.querySelector(".site-header");
    function revealPhoto(i) {
      var r = thumbs[i].getBoundingClientRect();
      var top = header ? header.getBoundingClientRect().bottom : 0;
      if (r.top >= top && r.bottom <= window.innerHeight) return;
      var y = window.scrollY + r.top - top - (window.innerHeight - top - r.height) / 2;
      window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion.matches ? "auto" : "smooth" });
    }

    // Photos and Index rows work the same way:
    //   click a photo or row     underline it (and its pair), moving the underline from any other
    //   click it again           open the photo page (it stays underlined)
    // There is no way to un-underline; clicking another photo moves the underline.
    // Clicking an Index row also scrolls the page to that photo; clicking a photo keeps its
    // Index row in view in the Index column.
    main.addEventListener("click", function (e) {
      var b = e.target.closest(TARGETS);
      if (!b) return;
      var i = Number(b.dataset.i);
      if (i === current) { page.open(i, b); return; }
      select(i);
      if (b.classList.contains("index__row")) revealPhoto(i); else revealRow(i);
    });
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

    // A click makes that section current straight away. While the scroll it starts is running
    // (until no scroll event for 150 ms), scrolling doesn't change the current section, so the
    // Index doesn't flick through the sections in between, and the clicked one stays current
    // even if the page can't scroll far enough to bring it to the reading line.
    var jumping = false;
    var jumpTimer = 0;
    function endJumpSoon() {
      clearTimeout(jumpTimer);
      jumpTimer = setTimeout(function () { jumping = false; }, 150);
    }
    index.rows.forEach(function (b, i) {
      b.addEventListener("click", function () {
        jumping = true;
        endJumpSoon();
        index.setCurrent(i);
        sections[i].scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
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
      if (jumping) { endJumpSoon(); return; }
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; if (!jumping) sync(); });
    }, { passive: true });
    window.addEventListener("resize", function () { if (!jumping) sync(); });
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
