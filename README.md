# Bill Marriott: Cuộc đời của một người phục vụ

A Vietnamese-language longform biographical website about **J.W. "Bill" Marriott Jr.** (b. 1932), the man
who turned his family's restaurant chain into the largest hotel company in the world.

All user-facing content is in Vietnamese. All code, comments and documentation are in English.

**Independent, non-commercial, educational.** Not affiliated with, sponsored by, or endorsed by
Marriott International.

---

## Tech stack

Vanilla HTML + CSS + JavaScript. **No build step, no dependencies, no framework.** It deploys to GitHub
Pages by dropping the folder in a repo and switching Pages on.

- Modern CSS: custom properties, `clamp()`, logical properties, `text-wrap: balance/pretty`
- `IntersectionObserver` for scroll reveals, scrollspy and count-up stats
- Content lives in `data/*.json` and is rendered client-side
- Two webfonts from Google Fonts, subset to `vietnamese,latin`

## Local development

`fetch()` cannot read `file://` URLs, so open the site through a local server rather than
double-clicking `index.html`:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works (`npx serve`, `php -S localhost:8000`, VS Code Live Server).

## Project structure

```
.
├── index.html              # the whole site — one page, 15 sections
├── assets/
│   ├── css/main.css        # design tokens + all layout
│   ├── js/main.js          # rendering, interaction, scroll behaviour
│   └── img/                # original SVG only (favicon, share card)
├── data/
│   ├── timeline.json       # 35 events, 5 eras
│   ├── brands.json         # brand portfolio by tier
│   ├── quotes.json         # verified quotations with provenance
│   └── stats.json          # headline figures with as-of dates
├── SOURCES.md              # numbered bibliography + source conflicts
├── IMAGE-CREDITS.md        # image provenance and licensing
└── BUILD-LOG.md            # decisions, corrections, what's next
```

## Editing content without touching markup

Most of what you'd want to change lives in `data/`.

**Add a timeline event** — append to `events` in `data/timeline.json`:

```json
{
  "year": "1998",
  "era": "de-che",
  "title": "Tiêu đề ngắn",
  "text": "Một đến hai câu mô tả.",
  "detail": "Tuỳ chọn. Nếu có, thẻ sẽ hiện nút “Đọc thêm”.",
  "sources": [5]
}
```

`era` must match an `id` in the `eras` array. Events render in file order — keep them chronological.

**Change a statistic** — in `data/stats.json`, never update `value` without also updating `asOf` and
`sources`. Hotel and room counts move every quarter; a number without a date is a liability.

**Add a quotation** — in `data/quotes.json`. `kind` must be one of:

| `kind` | Meaning | Rendering |
|---|---|---|
| `verbatim` | English original traced to a primary or reputable source | Vietnamese + English original |
| `translated` | From the published Vietnamese edition; English original not verified | Vietnamese + a visible warning badge |
| `paraphrase` | Not a direct quotation | Vietnamese + a visible warning badge |

**Never add a quotation you cannot source.** See the accuracy rules below.

## Editorial rules this project follows

Bill Marriott is a living person. The site holds to these:

1. No invented anecdotes, dialogue, internal thoughts, or composite scenes.
2. Every direct quotation is real and traceable. Anything not verified verbatim is labelled on the page.
3. Two-source rule for every date, figure, dollar amount, and superlative.
4. Where sources genuinely conflict, the page says so in Vietnamese rather than picking silently.
5. Honest about the difficult parts — the 2018 data breach, labour relations, the failed ventures.
6. No AI-generated portraits of real people. Illustrative graphics are original vector work.

## Typography

Vietnamese stacks diacritics (ế, ộ, ữ, ằ), which most display faces handle badly. Both families here
ship a verified `vietnamese` subset:

- **Be Vietnam Pro** — headings, UI, captions. Drawn by a Vietnamese type designer.
- **Lora** — body copy. Serif, editorial warmth, good at long measures.

Hard constraints baked into `main.css`: body `line-height` never below 1.7, headings never below 1.2,
no ALL CAPS on Vietnamese body text (tone marks collide with capitals), measure held at 68ch.

## Accessibility

Targets WCAG 2.1 AA.

- Semantic landmarks, no heading-level skips, skip-to-content link
- Full keyboard support: timeline arrow-key scrolling, expand/collapse toggles, roving-tabindex brand tabs
- All text meets 4.5:1 contrast (verified numerically — see BUILD-LOG)
- `prefers-reduced-motion: reduce` disables every animation, the sticky figure, and scroll-snap
- Print stylesheet expands all collapsed content so the page prints as a complete document

## Deploying to GitHub Pages

```bash
git remote add origin https://github.com/<user>/bill-marriott-cuoc-doi.git
git push -u origin main
```

Then **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.

No Actions workflow is needed — there is nothing to build. `.nojekyll` is included so Jekyll doesn't
interfere. After the first deploy, update the canonical URL in `index.html`, `sitemap.xml` and
`robots.txt` to the real Pages URL.

## Licence

- **Code** (`assets/css`, `assets/js`, HTML structure): MIT — see `LICENSE`.
- **Editorial content** (all Vietnamese prose, `data/*.json`, `SOURCES.md`): **not** MIT licensed.
  All rights reserved. It may be quoted with attribution but not republished wholesale.
- **Graphics** in `assets/img/` are original vector work by this project, released under MIT with the code.

Marriott, Courtyard, Ritz-Carlton, Bonvoy and all other marks belong to their respective owners.
