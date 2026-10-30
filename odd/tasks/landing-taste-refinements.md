# Landing taste refinements
Implement the landing improvements approved with “vamos con ello”, preserving real photography, existing service routes, booking and map consent.
Branch: `feat/landing-taste-refinements` · Delivery: `single-pr` · Checks: Node/Playwright public-browser probes, `astro check`, `astro build`.

## Specs

S1 — User correction, verbatim: “si restaura la foto, y tambien quiero los murcielagos que habia”; “/home/zer0rg/Imágenes/screenshot_20261030_162819-region.png y esto mira como ha quedado para poner la calabaza ahi no la pongas y la araña dejala como estaba como encima del boton de reservar”. Restore the original flying bats and spider above the booking button; remove the pumpkin rather than relocating it. Preserve cookie-control visibility and reduced-motion behavior. This supersedes the earlier all-decoration-in-photo proposal.

S2 — User correction: “si restaura la foto”. Restore the previous Halloween nail photograph for the Halloween campaign; retain the original photograph for default. Keep the approved improvements: “Titular de dos líneas como máximo.”; “Explicar antes qué ofrecemos y dónde.”; “Una acción principal: **«Reservar por WhatsApp»**.” Example: “Manicura y pedicura en Rivas”; “En Nanci Nails, Centro Comercial Santa Mónica.” The campaign-photograph exception supersedes the earlier real-photo-only interpretation.

S3 — Approved proposal: “Mostrar una selección inicial de **6–8 trabajos**, conservando el resto mediante «Ver más trabajos».”; “Resumir los servicios por categorías, con acceso claro al detalle completo.”; “Presentar antes al equipo y el local.”; “**Portada → trabajos destacados → servicios → salón y equipo → ubicación y reserva.**” All existing photos and services must remain reachable; preserve the full service galleries and no-JavaScript reading fallback.

S4 — User correction, verbatim: “/home/zer0rg/Imágenes/screenshot_20261030_163256-region.png Y esta parte del equipo asi en grande siento que no queda bien”. Compact the oversized team photograph rather than removing it or cropping faces. Keep the established full-bleed photography, equal detail frames and shared alignment; preserve the shortened salon introduction without inventing names, claims or credentials. This supersedes the earlier full-width panoramic team proposal.

S5 — Approved proposal: “Hasta disponer de precios confirmados, lo llamaría **«Servicios»**.”; “Unificaría «Reservar mi manicura», «Pedir cita» y «Reservar por WhatsApp».” Preserve the existing `#tarifas` anchor for compatibility while visible labels say Servicios; use the same general booking label across the site, except the design-specific action in S6.

S6 — Approved proposal: “En el visor añadiría **«Consultar este diseño»**, preparando el mensaje con el nombre del trabajo elegido.” Reuse `enlaceWhatsapp` without changing its existing behavior; the real link must track the selected design when navigating, including filters, keyboard and swipe. Do not claim automatic photo attachments.

S7 — Approved preservation: “**Bodoni y Jost, las fotos reales, los encuadres a sangre, la galería y la reserva directa.**” Preserve Astro, self-hosted fonts, existing service routes and map consent. QA the production build at desktop, tablet and phone widths, including first-visit consent controls and section transitions. Task concerns the approved improvements, not installing taste-skill or applying every stylistic prohibition.

## Tasks

T1 | S1–S7 | done | Route: two parallel `gentle-ai-worker` units with disjoint surfaces, plus inline parent catalog/studio work. Checks: RED/GREEN and 36/36 per theme. Commits: hero `7b7642e`, gallery `58653c2`, parent catalog/studio `0922029`.
T2 | S1–S7 | done | Route: inline parent integration/readback; documentation, compact journey and public-route preservation checked. Commit: `0922029`.
T3 | S1–S7 | in_progress | Route: parent seam QA, independent verifier for shared component behavior, native review, reviewable local commits; no push, PR opening or merge in this task. Commit: pending.

## Log

L1 — User's original request for this phase, verbatim: “https://github.com/Leonxlnx/taste-skill // Usa esta skill leela y mira a ver si puedes con ese conocimiento proponer mejoras claras en la landing”.

L2 — User implementation approval, verbatim: “vamos con ello”. Specs S1–S7 quote the immediately preceding proposal that this approval accepted; quoted proposal text is not presented as the user's own wording.

L3 — Delivery selection: user selected “Una sola PR (menos recomendable)” with machine value `single-pr`. This fixes review organization and does not open or publish a PR. Preserve small local work-unit commits within that eventual single PR.

L4 — Starting state: prior studio-photo integration was already approved and acknowledged by native review (`review-ccc05e949b92acb6`). Preserved it as commit `044280412fd7eca6fd3d4d124528bc7ae75410d4` (`feat(studio): introduce real studio photography`) before starting new source changes. Original main/base tree was `d1269ff286354bf7f77317cbbda21a5ec331d55d`. Do not discard those photos or prior layout fixes.

L5 — Existing evidence: production audit at 390×844 measured 14,482 px total height; 17 service rows; 30 gallery photos; salon begins at 8,575 px. Pumpkin overlaps cookie Accept visually; spider overlaps hero CTA edge. Native skill scripts were not installed or run. Existing Chromium/Playwright is isolated under ignored `node_modules/.studio-qa/`; it is not a runtime dependency.

L6 — Routing: hero worker may edit Hero, Layout, seasonal CSS, campaign copy and its dedicated browser probe. Gallery worker may edit Galeria and its dedicated browser probe. Parent edits index, summary catalog, studio composition, navigation labels, general service CTA labels and README. No shared writer surfaces. All workers read this document until `## Log`, report covered S# and observe RED before fixes. Forecast: several reviewable local work units (~400 authored lines each); eventual delivery is one PR per L3.

L7 — Implementation evidence: hero worker `mvv0rvjc-3-458g` passed 25 focused tests; gallery worker's first mouse-drag probe timed out, then one bounded genuine-touch re-verification (`mvv165m6-5-6y4p`) passed without a source fix. Parent observed four RED journey tests, then three focused GREEN checks. Integrated job-13 passed types, build, 36/36 browser tests in Halloween and 36/36 in default, and diff check. Every service and photograph remains reachable. Visual screenshots and final independent/native reviews are still pending; commits not yet recorded.

L8 — Integration: production screenshots captured at 1440×900, 1024×768, 768×1024, 390×844 and 360×740. At 390 px, total height fell from 14,482 to 9,154 px; salon begins at 3,584 instead of 8,575 px; real hero photograph starts at 413 instead of about 688 px. Screenshot capture's first ad-hoc command had a syntax error; corrected capture job-15 passed. First-visit controls, compact catalog and joint salon/team composition visually inspected. No dependency manifest changes. Independent verifier `mvv1pslw-6-yly6` subsequently passed S1–S7 (2 focused public-browser tests, no blockers); native review remains pending.

L9 — Final visual correction: the eight-work preview left half a desktop row empty because featured cards spanned two columns. Parent reproduced the actual content-box mismatch (714 px vs 1374 px expected at1440), then scoped uniform 4:5 preview rows to `.mosaico:has(> .pieza[data-pospuesta])`. Full mosaics/service galleries/no-JavaScript fallback remain unchanged. New geometry/restore test passes at1440/768/390 in Halloween and default (job-16). No additional product scope. The parent is checking updated captures and final suites before native review.

L10 — User question, verbatim: “Por que has quitado la foto principal con las uñas estilo halloween, has vuelto a poner la foto original sin la campaña de halloween”. Agent acknowledged an overly broad interpretation and asked for confirmation; no source was changed in that explanatory turn.

L11 — User correction, verbatim: “si restaura la foto, y tambien quiero los murcielagos que habia”.

L12 — User correction, verbatim: “/home/zer0rg/Imágenes/screenshot_20261030_162819-region.png y esto mira como ha quedado para poner la calabaza ahi no la pongas y la araña dejala como estaba como encima del boton de reservar”. Screenshot inspected. S1/S2 updated and T1 reopened; unrelated catalog/gallery work remains complete. Route: narrow correction inline, reusing existing campaign asset and original bat component.

L13 — Before changing the frozen candidate, completed existing native review `review-633f2b8cbc2b727c` with risk/readability/reliability; native returned approved and exact acknowledgement burned authority for target `sha256:6e5d9f30fae98617ab48a4921471f5ce822cbbfef331d38438f439354df345dc`. This approves only the pre-restoration slice, not the new correction. Earlier final suites passed37/37 per theme; restoration needs fresh RED/GREEN and final QA.

L14 — User correction, verbatim: “/home/zer0rg/Imágenes/screenshot_20261030_163256-region.png Y esta parte del equipo asi en grande siento que no queda bien”. Screenshot inspected: the wide panorama enlarges all faces excessively. S4 revised; compact team and appointment into equal-width desktop columns, retaining their original 3:2 frames, stacked edge-to-edge on phones. T1 remains reopened; no new assets, services or product claims.

L15 — Correction implemented inline. Job19 reproduced all five requested rules as RED. Job21 passed33/34 focused checks; the remaining normal-motion probe sampled cookies before their0.5s entrance completed, with button centers outside the viewport. Public diagnostic confirmed both controls unobscured after click trial; no consent source change was needed. Job22 then passed34/34 focused checks per theme and both builds, plus screenshots at1920/1440/1024/768/390/360. Team/appointment each720×480 at1440 and960×640 at1920, with all three faces intact. Parent inspected desktop/mobile campaign, spider, team and default captures. Corrected a normal-motion screenshot captured before existing hero entrance completed; it is a capture synchronization issue, not a page defect. Full suite, isolated-base route comparison and final correction review remain pending. Risk: item3 (shared Layout/campaign styles reach existing public service routes and must preserve their visible content, links, booking and consent defaults).

L16 — Job23 exited0: astro check (no errors), final full suites46/46 in Halloween and46/46 in default, diff check. Built previous code from commit `c2052ed134288c1733cb503868de721471fdb070` in an isolated mktemp copy under ignored QA storage; public snapshots of manicure/pedicure/gel routes are byte-identical for HTTP status, visible text, all links, canonical, title and map/consent defaults (both snapshot commands exit0, empty stderr). No production dependency or lockfile change. Restarted Astro background server at http://localhost:4321/ to avoid stale local styles; corrected normal-motion captures confirm the visible hero and original bats after entrance animation. Independent verification and native review of this correction remain pending; no publication.
