# BUILD LOG

**Project:** Bill Marriott: Cuộc đời của một người phục vụ
**Built:** 31 July 2026

---

## 1. Corrections made to the research leads in the brief

The brief explicitly said its research anchors were leads, not facts, and asked for corrections to be
logged. Five mattered.

### 1.1 The boat fire was 1985, not 1989 — and the date is the whole point

The brief listed "the 1989 boat fire in which he was severely burned." It was **Saturday 24 August 1985**,
on Lake Winnipesaukee, New Hampshire. Confirmed twice: in the authorized biography, and independently
in UPI's contemporaneous wire report of 26 August 1985.

This is not a trivia correction. **J. Willard Marriott Sr. died on 13 August 1985.** The explosion happened
eleven days later, with the family still gathered from the funeral. At the wrong date it is an accident; at
the right date it is the hinge of the whole life — in two weeks he lost his father and nearly lost himself,
and came out of hospital as the first Marriott to run the company with nobody above him. That is why it
became the Prologue rather than a timeline entry.

### 1.2 Donna Garff Marriott died on 30 December 2025

The brief was written while she was living ("a ~70-year marriage; she is central, not a footnote").
She died aged 90, days after the couple's 70th anniversary. Confirmed by Marriott's own newsroom
(31 Dec 2025) and Deseret News (2 Jan 2026).

Section 10 was rewritten around this. The brief's instruction to give her real weight was followed —
she gets her own biography inside that section, not a date.

### 1.3 The famous maxim is the father's, not Bill's

The brief flagged this for verification. It is J. Willard Marriott **Sr.**'s. The site attributes it to him
explicitly and states on the page that the wording varies between sources, including on Marriott's own
website. Bill's contribution was operationalising it at global scale, which is the more interesting claim
anyway.

### 1.4 Courtyard launched June 1983 after three years of development

The brief said "~1983". The three-year secret development programme, and the prototype built inside the
grounds of the Gaithersburg Marriott, are what make it the first hotel brand designed from customer data
rather than intuition. That detail is the section.

### 1.5 Ritz-Carlton was a 49% stake in 1995

The brief said "Ritz-Carlton stake" without figures.

### Also verified and left as-is
Twin Bridges opening (16 Jan 1957), the 1993 spin-off, the 1964 presidency at 32, the Starwood close date
and price, Sorenson's death, Capuano's appointment, the May 2022 chairmanship transition, the Bridges
programme.

---

## 2. Things I could not verify, and what I did about them

| Item | Status | Handling |
|---|---|---|
| English original of the 1956 father/son exchange | Only have the published Vietnamese translation | Printed in Vietnamese, labelled on the page as translated with the English unverified |
| Twin Bridges room count | Sources say 360, 365, 375 | "Khoảng 365 phòng" with the range stated inline |
| Twin Bridges nightly rate | Contemporary record says $8+$1/person; Bill's own recollection is $9 | Used Bill's figure, attributed to him |
| Hotels visited per year | 120 / 200 / 250 / 265 / 320 across different years | Used the verbatim "250" quote, noted that it moved |
| Total brand count | Marriott's 2025 report describes tiers rather than giving a headline number | "hơn 30" — the figure the company used at the Starwood close |
| Current market capitalisation | Moves daily | **Omitted.** A live figure on a static page is wrong within a week |

The `caveat` field in `data/quotes.json` and the conflict table in `SOURCES.md` exist because of these.

---

## 3. Key decisions

**Prologue is the 1985 explosion, not the 1957 hotel bet.** The brief offered both. The explosion is a
better opening because it carries the succession theme without stating it, and because the eleven-day gap
does narrative work that no amount of exposition would.

**No photographs at all.** The brief permitted Pinterest as a discovery tool and press photos for editorial
use. Working through it honestly: Marriott's press images are licensed for use in coverage *of Marriott*,
not for an unaffiliated third-party site; Wikimedia's Bill Marriott images have thin or unclear provenance;
and the brief forbids AI portraits of real people, correctly.

So the site ships **zero photographs** and instead uses original vector work — a hotel key fob engraved
`JWM / 1957 / TWIN BRIDGES` as the hero emblem, an SVG grain filter for paper texture, a two-column
diagram for the asset-light model, and a hand-built bar chart for the Starwood bidding. The brief's own
rule applies: a beautiful licensed alternative beats a legally dubious photo. There are no empty image
slots and no broken-image icons because there are no image slots.

**Business explanation over business jargon.** The asset-light section is the strategic core, and it is
written for someone who has never read a balance sheet. Terms get Vietnamese first with English in
parentheses on first mention, then Vietnamese only.

**The data breach gets real space, and so do the failures.** The 1976 theme parks Bill later called a
mistake, the near-death of the company around 1990, the union relations, the four-year Starwood intrusion
and the $52m settlement. A hagiography would not have been credible to the hospitality professionals this
is written for.

**Vietnamese written natively, not translated.** Source material was read, understood, then written fresh
in Vietnamese. Sentence lengths vary deliberately. Clichés the brief flagged (*huyền thoại*, *đế chế*,
*biểu tượng sống*) are used sparingly or not at all — *đế chế* appears only where it is quoting the
biography's own framing.

---

## 4. Testing performed

The sandbox could not finish downloading a headless Chromium (network timed out repeatedly at ~60% of
177 MB) and the Chrome extension was not connected, so **no pixel screenshots were taken.** This is the
one item in the brief's §8.3 that was not completed as specified, and it is stated plainly rather than
glossed.

What *was* done instead — a real functional test, not a read-through:

**JSDOM render + interaction harness** (`index.html` + `main.js` executed against a live DOM):

```
  14 rail items          35 timeline cards       12 detail toggles
   6 era filter chips     4 brand tabs/panels    22 brand cards
   8 stat blocks          6 quote cards           4 deal bars filled
  15 citation links      14 sections w/ data-nav
```

- Expand/collapse toggle verified through a full open→close cycle (`aria-expanded` and `hidden` both flip)
- Brand tabs verified for roving tabindex (`0,-1,-1,-1` → `-1,-1,0,-1`) and single-visible-panel invariant
- Vietnamese number formatting verified in output: `hơn 9.800`, `gần 1,78 triệu` (period thousands, comma decimal)
- **Zero console errors or warnings**

**Static validation:** all four JSON files parse; `node --check` passes on the JS; HTML tag-balance parser
reports no unclosed or mismatched elements.

**Contrast, computed numerically** across 16 foreground/background pairs. Two failed and were fixed:

| Pair | Before | After |
|---|---|---|
| `--ink-faint` on `--paper-2` | 4.21 ✗ | 4.96 ✓ (`#7A6F65` → `#6E645B`) |
| Footer fine print on `--ink` | 3.82 ✗ | 5.55 ✓ (`#7A7068` → `#968B81`) |

All 16 pairs now pass 4.5:1. The `--ink-faint` change was checked against all three paper tints (5.45 / 4.96 / 4.50).

**Markup issues found and fixed during audit:**

1. `<h3>` inside `<button>` — invalid content model (button takes phrasing content only). Timeline cards
   restructured to `<article role="listitem">` with a real `<button>` toggle inside.
2. `aria-pressed` on `role="tab"` — invalid ARIA. Removed; tabs use `aria-selected` only.
3. Missing roving tabindex on the tablist. Added.
4. Collapsed detail hidden by CSS only — switched to the `hidden` attribute so it is hidden from
   assistive tech too, with a print override to expand it.

**Vietnamese copy sweep:** 4,905 words of visible prose. No stray English outside proper nouns, loanwords
and English-language source titles. Terminology consistent (`tỉ` 7×, `tỷ` 0×). No English-style thousands
separators. No double spaces, no space-before-punctuation. Curly quotes balanced (38 open / 34 close +
4 decorative pull-quote marks).

---

## 5. Not done

- **GitHub repo creation and Pages deployment.** No `gh` CLI in the environment and no Git credentials.
  The repo is initialised and committed locally; `README.md` has the exact push-and-enable steps.
- **Lighthouse scores.** Requires a real browser. The build is structurally set up for high scores —
  no framework, no jQuery, two subsetted fonts, zero raster images, explicit dimensions on inline SVG —
  but I have not measured it and will not claim a number I did not observe.
- **Sub-pages** (standalone timeline page, photo gallery, print-only biography). The brief marked these
  optional. The gallery is moot with no photographs; the print stylesheet covers the printable biography.

---

## 6. What I would do next, in priority order

1. **Run Lighthouse and a screen-reader pass** (NVDA or VoiceOver) on the deployed URL. The keyboard paths
   are built and unit-tested, but nothing substitutes for hearing the timeline read aloud.
2. **Test the horizontal timeline on a real phone.** It is the highest-risk component on mobile — the brief
   flagged this correctly. Cards are `flex-basis: clamp(240px, 74vw, 340px)` with scroll-snap, which should
   behave, but should is not tested.
3. **Self-host the two fonts.** Removes two DNS lookups and the render-blocking Google Fonts request,
   and makes the site independent of a third party. Worth ~200–400ms on LCP.
4. **Seek permission for two or three photographs.** Marriott's press office may well grant use for a
   non-commercial educational project. A single archival image of Twin Bridges in 1957 would lift the
   1957 section substantially. Worth asking; not worth assuming.
5. **A short "sources disagree" panel on the page itself.** The conflict table currently lives only in
   `SOURCES.md`. Surfacing it in the UI would make the site's honesty visible rather than buried.
6. **Expand the Vietnam section with named local examples.** It currently argues structurally. Naming
   actual Vietnamese groups and their brand-versus-asset positions would make it sharper — but requires
   research I did not have time to source to the same standard as the rest.
