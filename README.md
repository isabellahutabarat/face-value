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
- leaves out the photos listed in `EXCLUDE`, shows single photos under the date given in `PHOTO_DATES` (time and answer stay as in the CSV), and can show one date's photos under another date via `MERGE_DATES` (empty now), sorted by time.
- prints the photo count per date, the rows left out because they have no edited photo yet, any edited photo with no CSV row, and any identical (duplicate) edited photos.

A new date gets its own column on the home page automatically.

## AI annotations (description, emotion, valence, arousal)

`scripts/ai_annotate.py` makes the four AI fields on the photo page. It runs entirely on this Mac: no photo is sent anywhere. It analyses the **colour originals** in `originals_dir` (a third key in `scripts/paths.json`), never the edited black-and-white photos, and writes a separate file, `ai_annotations.csv`, next to `metadata.csv`. It never touches `metadata.csv` (the capture app owns it) or your own columns (`activity`, `self_reported_emotion`, and so on).

| Column | What it is |
|---|---|
| `ai_description` | One or two sentences from a local vision model in Ollama, `gemma3:4b` (set by `DESCRIPTION_MODEL` at the top of the script). |
| `ai_emotion_classification` | One of Anger, Contempt, Disgust, Fear, Happiness, Neutral, Sadness, Surprise (HSEmotion `enet_b0_8_va_mtl` on the face found by OpenCV's YuNet detector). |
| `valence`, `arousal` | From the same HSEmotion model, rounded to 2 decimals. The model was trained on AffectNet, where both run from **-1 to 1** (valence: negative to positive; arousal: calm to excited). The raw outputs aren't clamped, so a value can occasionally be slightly outside that range. |
| `ai_status` | `ok`; `no_face` (no face found, so the three emotion fields are empty); or `error` (retried on the next run). |
| `ai_description_model`, `ai_emotion_model`, `ai_run_at` | Which models made the row, and when. |

### One-time setup

1. Install Ollama: download it from <https://ollama.com/download>, drag it to Applications and open it once. It runs in the menu bar.
2. Download the vision model (about 3.3 GB, once):  `ollama pull gemma3:4b`. If you change `DESCRIPTION_MODEL`, pull that model instead.
3. In Terminal, in this folder, make a Python environment and install the packages:
   ```sh
   /usr/bin/python3 -m venv .venv
   .venv/bin/pip install -r scripts/requirements-ai.txt
   ```
   `timm` is pinned to 0.9.16 on purpose: the HSEmotion model files don't work with timm 1.x. On first use, HSEmotion downloads its model (about 16 MB) into `~/.hsemotion/`. The face detector model is already in `scripts/models/`.

### Every time there are new photos

```sh
.venv/bin/python scripts/ai_annotate.py            # only photos not done yet
python3 scripts/build_data.py                      # merge into data/photos.json
```

Add `--limit 3` to try just a few. The script saves after every photo, so you can stop it with Ctrl+C and run it again later to carry on. Ollama must be open while it runs.

`build_data.py` copies `ai_description` → `description`, `ai_emotion_classification` → `emotion`, `valence` → `valence` and `arousal` → `arousal` (see `AI_FIELDS` at the top of the script). A field that's empty is left out, and the photo page shows a dash.

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
