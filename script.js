/* Face Value — shared script (vanilla JS, no build step). */
(function () {
  "use strict";

  /* ---------- Info page content: edit here ----------
     `INFO_TITLE` is the grey heading at the top. `INFO_SECTIONS` has one entry per section, in
     page order; `title` is what the Index shows. `blocks` run top to bottom:
       { text: [paragraph, ...] }
       { image: src, alt, size: [w, h], caption }   size = px in Figma; the 550 px column is full width
       { video: webm, gif, poster, alt, size, caption }   a muted loop (scripts/make_loop.py);
         the GIF plays where WebM can't, and only the poster (first frame) shows with reduced motion
     Wrap words in *asterisks* to set them in italics (text and captions).
     Every block is the same distance apart (--info-gap in styles.css). */

  var INFO_TITLE = ["Face Value", "Isabella Hutabarat"];

  var INFO_SECTIONS = [
    {
      title: "Introduction",
      blocks: [
        { text: [
          "I keep coming back to a few questions about AI technology and how it interacts with humans. How does recognition become information? When a machine looks at a face, what is it actually doing, and what gets lost in that translation? And who decided what it should be looking for in the first place?",
          "That last question is what led me to the inherent classification biases that exist across today’s emerging technologies. These biases come out of AI well beyond ordinary image recognition, but are especially pertinent in facial recognition, where they show up across gender, stereotypes, and race. And even more pressing in our current world and climate is the very discourse of the biases and assumptions embedded in AI training sets and systems. Things that are framed as scientific foundations, as objective, actually operate as political interventions. AI is built on classifications and training systems that are inherently biased, so what does that mean for us and the technologies we’re building? Are we essentially shaping ourselves and our views of the world based on how we treat these advancements?"
        ] }
      ]
    },
    {
      title: "ImageNet Roulette",
      blocks: [
        { image: "images/info-imgs/main-images-heroherodownload.jpg", size: [547, 163],
          alt: "ImageNet Roulette", caption: "ImageNet Roulette" },
        { image: "images/info-imgs/Screen_Shot_2019_09_16_at_4.16.jpg", size: [547, 406],
          alt: "ImageNet Roulette", caption: "ImageNet Roulette" },
        { text: [
          "Trevor Paglen and Kate Crawford write about this in *Excavating AI*, which looks back at the early histories of AI through ImageNet. Their project *ImageNet Roulette* turned the dataset on its own users: upload a selfie and see how the AI might classify you. Some of the labels made sense, like “skier,” “flutist,” or “mediator.” But there was also “first offender,” “non-smoker,” “orphan”? Crawford and Paglen, both in suits, got “newsreader” and “microeconomist.” One label reads “failure, loser, non-starter, unsuccessful person,” and misogynistic and racist slurs. A few days after the project went viral, ImageNet announced it would remove hundreds of these categories and around 600,000 images. But does getting rid of the biases, or the offensive terms, actually help, or does it only hide the problem? Does it erase groups of people from being recognized in the systems? It raises the question of who gets to decide what images mean, and how they relate to words.",
          "Training systems that focus primarily on white, Eurocentric faces push marginalized groups into worse outcomes in policing, security, and crime. Hito Steyerl’s idea of “mean images” gets at the same thing: an image built from the average of its data, and mean in the unkind sense too."
        ] }
      ]
    },
    {
      title: "JAFFE Dataset",
      blocks: [
        { image: "images/info-imgs/images%20(22).jpg", size: [390, 172],
          alt: "Images from the JAFFE database",
          caption: "The Japanese Female Facial Expression (JAFFE) Database" },
        { text: [
          "For this project, I wanted to take that idea in a more specific direction, using myself as the dataset, with my own consent, and training AI on emotion recognition. This matters to classification bias because AI can increasingly recognize facial structures and expressions, but emotions need context. Facial recognition systems sort marginalized people into boxes without any true context, and emotion recognition does the same thing to feelings.",
          "The JAFFE dataset is one of the sets that has been used to train emotion recognition. It has around 200 images of Japanese models, and I wanted to make a dataset of myself in response. JAFFE uses the standard list of emotions most AI is trained on, with about thirty images for each: happiness, sadness, surprise, anger, disgust, fear, and neutral.",
          "Other systems break emotion down differently. FACS, the Facial Action Coding System, describes a face as a set of individual muscle movements instead of naming the feeling behind them. The circumplex model places emotion on two axes, valence (how positive or negative) and arousal (how high or low the energy). I use the circumplex model in my work, measuring positive and negative energy levels."
        ] }
      ]
    },
    {
      title: "Time Clock Piece",
      blocks: [
        { image: "images/info-imgs/time-clock-piece-cover-.jpg", size: [550, 462],
          alt: "Tehching Hsieh, One Year Performance 1980–1981",
          caption: "Tehching Hsieh, One Year Performance 1980–1981" },
        { image: "images/info-imgs/213.jpg", size: [400, 267],
          alt: "Tehching Hsieh, One Year Performance 1980–1981, installation view at the 2017 Venice Biennale",
          caption: "Tehching Hsieh, One Year Performance 1980–1981,\nInstallation View at 2017 Venice Biennale" },
        { text: [
          "Across all of these models, recognizing a face is not the same as understanding a person.",
          "What happens when I am required to continuously turn myself into data?",
          "In *Time Clock Piece*, Tehching Hsieh punched a time clock in his studio every hour for one full year, documenting himself each time. He forced himself into this intensive format of performance and documentation as a way of talking about life as a life sentence (see also Out of Now). This forced use of the self, and what it does to you, makes me think about my own relationship with technology. It also makes me think about how AI is force-fed to us today. It’s built into our search bars, our phones, and our tools, and we are essentially punching the clock without having agreed to it."
        ] }
      ]
    },
    {
      title: "Evidence Locker",
      blocks: [
        { image: "images/info-imgs/jill-magid-evidence-locker-2004.jpg", size: [550, 187],
          alt: "Jill Magid, Evidence Locker, 2004", caption: "Jill Magid, *Evidence Locker*, 2004" },
        { text: [
          "Jill Magid’s *Evidence Locker* is a portrait of her relationship with herself, the police, and the city. It is a kind of self-surveillance, and it shows things you didn’t know about yourself when you aren’t paying attention. As surveillance becomes more daunting and is implemented into our daily lives, we have to wonder how these recognition systems and language models sort each of us."
        ] }
      ]
    },
    {
      title: "Myself as Data",
      blocks: [
        { text: [
          "So I come back to the question: what does it mean when I turn myself into data? I’ve created a biometric profile of myself whenever I’m online, yet I know very little about who I actually am. Looking back at this dataset, I can see things I never noticed. I stick my tongue out when I’m focused. I play guitar almost every day for more hours than I should have readily available. I can see the times I procrastinated, watched shows, worked on school and my job, or have laid down with my laptop open and untouched. I look blankly at a screen; I look “angry,” and I look genuinely scared even though I’m probably relatively calm. I learn all of this from looking at myself as a dataset that comes from myself. But the data being pulled by these systems doesn’t tell me any of that, so what does the machine actually know about me?"
        ] },
        { video: "assets/face-value-loop.webm", gif: "assets/face-value-loop.gif",
          poster: "assets/face-value-loop-poster.jpg", size: [388, 218],
          alt: "self-portrait photos from the study, shown in sequence",
          caption: "Isabella Hutabarat, *Face Value* images, 2026" }
      ]
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
    var index = buildIndex(keys.map(function (k) { return { label: k, key: k }; }), "not all");

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
      // One line per row: "Emotion class: value" (wraps under itself if the line is too long).
      INFO_ROWS.forEach(function (row) {
        var line = el("div");
        line.appendChild(el("dt", null, row[0]));
        line.appendChild(document.createTextNode(" "));
        line.appendChild(el("dd", null, value(p[row[1]])));
        info.appendChild(line);
      });
      fit();
      // Preload the neighbours so previous/next switch instantly.
      [i - 1, i + 1].forEach(function (j) {
        if (photos[j]) new Image().src = photos[j].large || photos[j].image;
      });
    }

    // Fit the block in the window without ever scrolling, on a 16-column grid (same margin
    // and gutters as the 8-column grid): photo columns 4-11, text columns 12-13. Under 850 px the
    // text goes under a photo that always spans margin to margin, and the arrows sit at the bottom. If the window is too short, only the photo shrinks
    // (keeping 16:9); the text keeps its size. The arrows sit level with the photo's middle.
    var phone = window.matchMedia("(max-width: 849px)");
    var GUTTER = 13;
    function fit() {
      if (openIndex === -1) return;
      var margin = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--margin")) || 13;
      var cs = getComputedStyle(body);
      var availH = body.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      var W = root.clientWidth;
      var col = (W - margin) / 16;                         // one column + gutter
      var w;
      if (phone.matches) {
        var full = W - 2 * margin;
        text.style.width = full + "px";
        text.style.minHeight = "";
        w = full;                                           // always margin to margin
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
    // (Under 850 px the overlay itself may scroll up and down when its content is taller.)
    root.addEventListener("wheel", function (e) { if (!phone.matches) e.preventDefault(); }, { passive: false });

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
    function referenceLine() { return 450; }

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
    }), "not all");
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
    // "*word*" -> <em>word</em>; "\n" -> line break. Built as nodes, never as HTML.
    function rich(parent, str) {
      str.split("\n").forEach(function (line, li) {
        if (li) parent.appendChild(el("br"));
        line.split("*").forEach(function (part, pi) {
          if (!part) return;
          parent.appendChild(pi % 2 ? el("em", null, part) : document.createTextNode(part));
        });
      });
      return parent;
    }

    var title = el("p", "info-title");
    rich(title, INFO_TITLE.join("\n"));
    content.appendChild(title);

    var firstImage = true;
    var sections = INFO_SECTIONS.map(function (s, i) {
      var sec = el("section", "info-section");
      sec.id = "section-" + (i + 1);
      sec.setAttribute("aria-labelledby", sec.id + "-title");
      var h = el("h2", "visually-hidden", s.title);
      h.id = sec.id + "-title";
      sec.appendChild(h);

      s.blocks.forEach(function (b) {
        if (b.image || b.video) {
          var fig = el("figure", "info-figure");
          fig.style.width = (b.size[0] / 550 * 100) + "%";
          var im = el("img");
          im.src = b.image;
          if (b.video) {
            im.src = reduceMotion.matches ? b.poster : b.gif;
            var v = el("video");
            if (!reduceMotion.matches && v.canPlayType('video/webm; codecs="vp9"')) {
              v.muted = true;
              v.autoplay = v.loop = v.playsInline = true;
              v.setAttribute("muted", "");
              v.setAttribute("playsinline", "");
              v.poster = b.poster;
              v.src = b.video;
              v.setAttribute("role", "img");
              v.setAttribute("aria-label", b.alt);
              im = v;
            }
          }
          if (im.tagName === "IMG") im.alt = b.alt || "";
          im.width = b.size[0];
          im.height = b.size[1];
          im.loading = firstImage ? "eager" : "lazy";
          firstImage = false;
          fig.appendChild(im);
          if (b.caption) fig.appendChild(rich(el("figcaption", "info-caption"), b.caption));
          sec.appendChild(fig);
        } else if (b.text) {
          var t = el("div", "info-text");
          b.text.forEach(function (para) { t.appendChild(rich(el("p"), para)); });
          sec.appendChild(t);
        }
      });
      content.appendChild(sec);
      return sec;
    });

    // The info Index stays in column 1 at every width (never a tap-to-open list).
    var index = buildIndex(INFO_SECTIONS.map(function (s) { return { label: s.title }; }),
                           "not all");

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

  /* ---------- About (home, phones) ----------
     "+ About" opens the description in a white box over the page. Click it again, press Escape
     or click outside the box to close. On larger screens the toggle is hidden. */
  function initAbout() {
    var intro = document.getElementById("intro");
    if (!intro) return;
    var toggle = intro.querySelector(".intro__toggle");
    function setOpen(open) {
      intro.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    toggle.addEventListener("click", function () { setOpen(!intro.classList.contains("is-open")); });
    // A click outside only closes the box; it doesn't also open a photo or follow a link.
    document.addEventListener("click", function (e) {
      if (!intro.classList.contains("is-open") || intro.contains(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    }, true);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && intro.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    onMediaChange(SMALL, function () { if (!SMALL.matches) setOpen(false); });
  }
  initAbout();

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
