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

Rebuild: `python3 scripts/build_data.py`

The script reads its two inputs from `scripts/paths.json` (full paths; JSON strings, so spaces are fine):

```json
{
  "metadata_csv": "/full/path/to/photo_study/data/metadata.csv",
  "edits_dir": "/full/path/to/edited photos"
}
```

Export each edited photo into any folder inside `edits_dir`, named `<image_id>.jpg` (the same as its row in the CSV), then rebuild. If either path is missing or wrong, the script says which one and stops without changing anything. Nothing reads `dataset/` any more; it is an old copy kept for reference.

The script:
- writes `data/photos.json` (and the same data as `data/photos.js`) with `id`, `date`, `time`, `thumb`, `image`, `large` and `doing`, plus `description`, `emotion`, `valence` and `arousal` when the CSV has a value for them (shown on the photo page; a dash otherwise). The CSV columns used for those four are set in `ANNOTATIONS` at the top of the script. `self_reported_emotion`, `context`, `reviewed`, `filename`, `path` and local paths are never written.
- writes resized copies to `images/thumbs/<date>/` (350 px wide, archive), `images/<date>/` (830 px, home page photo) and `images/large/<date>/` (1472 px, photo page). It never touches the originals, and it skips copies that are already up to date at the right width. It uses macOS's built-in `sips`.
- leaves out the photos listed in `EXCLUDE`, and can show one date's photos under another date via `MERGE_DATES` (empty now), sorted by time.
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

Don't upload `dataset/`, `photo_study_edits/`, `Test Söhne copy/` or `scripts/`. `dataset/` is an old copy of the raw CSV/JSON and colour originals, and `scripts/paths.json` holds local paths.
