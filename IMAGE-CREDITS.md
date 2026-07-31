# IMAGE CREDITS

## Summary

**This site contains no photographs.** Every visual asset is original vector work created for this
project and is released under the MIT licence together with the code.

## Why there are no photographs

The brief permitted Pinterest as a discovery tool, Marriott press assets, and Wikimedia Commons.
Each was assessed and declined:

| Source considered | Decision | Reason |
|---|---|---|
| Pinterest | Rejected | Blocks hotlinking and rewrites CDN paths; images 404 within days. Only ever usable to *find* an image, never to serve one. |
| Marriott press / newsroom assets | Rejected | Licensed for editorial coverage *of Marriott*, not for reuse by an unaffiliated third-party website. Permission was not sought or granted. |
| Wikimedia Commons — Bill Marriott portraits | Rejected | Provenance and licence status of the available files could not be established with confidence. The project rule is: if the licence cannot be verified, the image is not used. |
| AI-generated portraits | Prohibited | The brief forbids synthetic photographs of real living people. Correctly so. |

Rather than ship a legally doubtful photograph or an empty placeholder, the site uses designed
alternatives throughout. There are no image slots, therefore no broken images and no fallbacks needed.

## Asset inventory

| File | Description | Author | Licence |
|---|---|---|---|
| `assets/img/favicon.svg` | Monogram favicon, Marriott red field | This project | MIT |
| `assets/img/share-card.svg` | 1200×630 Open Graph / Twitter share card | This project | MIT |
| *(inline in `index.html`)* | Hero emblem — a hotel key fob engraved `JWM / 1957 / TWIN BRIDGES`, with key and ring | This project | MIT |
| *(inline in `index.html`)* | `feTurbulence` paper-grain filter over the hero | This project | MIT |
| *(inline in `index.html`)* | Own-vs-manage comparison diagram (asset-light model) | This project | MIT |
| *(CSS + markup)* | Starwood bidding bar chart — hand-built, no charting library | This project | MIT |

## Accessibility of graphics

- The hero emblem carries `role="img"` and a full Vietnamese `aria-label` describing what it depicts.
- Purely decorative graphics (grain filter, pull-quote marks, timeline dots) carry `aria-hidden="true"`.
- The Starwood chart is built from real text nodes, so it is readable by screen readers and selectable
  as text — it is not an image of a chart.

## If photographs are added later

1. Obtain written permission, or confirm a licence that permits non-commercial third-party reuse.
2. Download locally to `assets/img/` — never hotlink.
3. Convert to WebP with a JPEG fallback; generate `srcset` at 480 / 960 / 1440 / 1920px.
4. Set explicit `width` and `height` to prevent layout shift; `loading="lazy"` below the fold.
5. Give every image a Vietnamese `alt` description and a visible Vietnamese caption.
6. Add a row to this file recording file name, source URL, photographer, licence and date accessed.

The footer already carries the required notice:
*"Hình ảnh thuộc bản quyền của các tác giả/tổ chức tương ứng, được sử dụng với mục đích minh họa
phi thương mại."*
