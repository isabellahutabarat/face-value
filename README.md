# Face Value

A three-page static site (`index.html`, `archive.html`, `info.html`) showing the self-portrait dataset as a time-indexed archive. Plain HTML, CSS and vanilla JS: no framework, no build tool.

## Run the site

From this folder:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

You can also open `index.html` directly (double-click it). The photo data also comes from `data/photos.js`, so the pages work without a server. Some browsers (Chrome in particular) refuse to load the font from a `file://` page, so it may show in Helvetica that way. Use the server to check the real typeface.

## Add new photos

1. Export the edited photo into a folder inside `photo_study_edits/` (the folder name doesn't matter). Name it `<image_id>.jpg`, the same as its row in `dataset/metadata.csv`.
2. Re-run the build script:

   ```sh
   python3 scripts/build_data.py
   ```

The script:
- writes `data/photos.json` (and the same data as `data/photos.js`) with `id`, `date`, `time`, `thumb`, `image`, `large` and `doing`, plus `description`, `emotion`, `valence` and `arousal` when the CSV has a value for them (shown on the photo page; a dash otherwise). The CSV columns used for those four are set in `ANNOTATIONS` at the top of the script. `self_reported_emotion`, `context`, `reviewed`, `filename`, `path` and local paths are never written.
- writes resized copies to `images/thumbs/<date>/` (350 px wide, archive), `images/<date>/` (830 px, home page photo) and `images/large/<date>/` (1472 px, photo page). It never touches the originals, and it skips copies that are already up to date at the right width. It uses macOS's built-in `sips`.
- prints the photo count per date, the rows left out because they have no edited photo yet, any edited photo with no CSV row, and any identical (duplicate) edited photos.

A new date gets its own column on the home page automatically.

## Font

The site uses ABC Diatype Medium from `assets/fonts/` (`ABCDiatype-Medium-Trial.woff2`, with `.woff` as a fallback). These are Dinamo's trial files, so check that the trial licence covers publishing. If the font can't load, the site falls back to Helvetica Neue / Helvetica / Arial.

## Info page content

The info page sections (Index titles, text and images) are in `INFO_SECTIONS` at the top of `script.js`.

## Publishing

The site only needs these files:

```
index.html  archive.html  info.html  styles.css  script.js
data/photos.json  images/  assets/
```

Don't upload `dataset/`, `photo_study_edits/`, `Test Söhne copy/` or `scripts/`. `dataset/` holds the raw CSV/JSON with all annotations, plus the colour originals.
