# Sauce and kimchi AEO release — 2026-11-14

This source release improves product selection, factual consistency and machine-readable coverage. It is not a claim of deployment, indexing, citation growth or first-place rankings. Production deployment is assigned to Raymond Lee / 李旭清. Delivery is through source branch `aeo/sauces-kimchi-20261114` and [PR #12](https://github.com/wjzta10018545-afk/deesheng-food/pull/12); the author does not merge or deploy it.

## Final scope

- **272 catalogue cards**, including 151 in the target scope: 88 sauce/paste, 26 supporting ingredients and 37 kimchi/pickled-vegetable entries. These counts include packaging and flavor variants, not unique recipes.
- **33 detailed product pages and 54 sitemap URLs**. The details comprise 21 Korean sauce/product pages, 7 kimchi family pages, 3 chili/seasoning pages and 2 existing frozen-vegetable pages.
- Product-family guidance covers 14 sauce/supporting groups and 4 kimchi groups. Every catalogue card has a stable citation target, and existing card identities remain intact.

## Kimchi specifications and architecture

The user-supplied workbook contains 45 product records and 46 images. Twenty-eight records provide 59 pack rows; 58 carton dimensions are usable as written. One suspect dimension is omitted, never silently corrected. The sheet does not provide shelf life, storage temperature, measured carton weights, ingredients, allergens, certification scope, MOQ, lead time or prices.

The selected [Profound architecture proposal](https://platform.tryprofound.com/documents/01a1da3e-5fa7-7933-9ef5-9923de836208) results in **six new family pages and two upgraded pages**. It does not create a page for every pack size:

| Action | Path | Coverage |
|---|---|---|
| Upgrade | `/products/kimchi/` | 37 cards: 27 with supplemental pack specifications plus 10 separate legacy cards |
| Upgrade | `/product/korean-cabbage-kimchi/` | Whole, mat cut and mini mat diced; 5 pack rows |
| New | `/product/cabbage-kimchi-jars/` | Mat cut retail jars; 3 pack rows |
| New | `/product/white-washed-stir-fried-kimchi/` | Three separately named preparations; 3 pack rows |
| New | `/product/radish-kimchi/` | Chonggak and kkakdugi; 6 pack rows |
| New | `/product/scallion-kimchi/` | Jjokpa and daepa, distinguished by Korean name; 3 pack rows |
| New | `/product/garlic-sprout-pickles/` | Seasoned, soy sauce and sweet-and-sour; 9 pack rows |
| New | `/product/pickled-green-pepper/` | Seasoned, soy sauce and sweet-and-sour; 9 pack rows |

The seven detail pages cover 17 source products with **38 variant-specific packaging rows and 31 differentiated FAQs**. Each includes an English title, description, direct buyer answer and related links. Variant labels prevent equal pack sizes from being mistaken for a shared product specification. Grouping related products does not assert identical recipes or storage conditions.

The catalogue integrates 27 supported plant-product records: **58 pack rows and 57 carton dimensions**. Fourteen records correspond to existing named cards; 13 add separately named cards and original source PNG photos. Each photograph is associated with its own source product. The catalogue shows Korean names and expandable pack/dimension tables; public JSON and LLM references carry the same facts. All new source-based shelf-life and storage fields require confirmation for the selected product and pack.

The other 18 source records remain documented without introducing unsupported detail pages: 17 lack packing data, while source #34 has a pack but awaits seafood/mixed-product classification. That distinction corrects a factual omission in the external planning response. The original 24 catalogue identities remain, including 10 legacy entries not definitively matched by this source. Older pack formats absent from the new sheet are not declared discontinued. The former 1 kg cabbage bag format is identified as requiring its own current specification; it does not inherit the new retail-jar or bulk specifications.

See [the complete 45-record source audit](kimchi-source-audit-20261114.md) for worksheet cells, naming, matching decisions and gaps. See [the integrated catalogue register](aeo-catalog-coverage-20261114.md) for per-card mappings.

## Combined sauce and technical changes

- Preserve the 18 detailed sauce records and their 67 pack rows, including pack-specific honey-mustard shelf lives and exceptional carton weights. Unknown logistics wording improves on the 17 non-gochujang records.
- Enrich six other existing lightweight sauce/seasoning details with titles, direct buyer answers, packing tables and targeted FAQs using their established product facts. The kimchi page is now replaced by the source-specific family content described above.
- Remove automatic 12-month/ambient defaults for sauce catalogue records missing those fields. Remove unsupported blanket cabbage shelf-life and temperature statements from updated product, category, market and machine-readable content.
- Remove category-driven HALAL title prefixes while retaining existing expressly written titles and product-specific document checks. No new certification coverage is asserted.
- Generate both LLM reference files from the integrated public catalogue. `catalog:check` detects stale files and runs with `npm test`. JSON uses explicit allowed fields, including variant-specific specifications and FAQs.
- Preserve existing inquiry attribution and analytics behavior. The existing gtag Arguments queue is documented by an ESLint annotation.

The private source workbook, raw extraction, header/address information, quotations and account-level monitoring data are not included in the repository or site. The new photographs are product images reviewed for visible pricing and factory address information; they do not establish ingredients or certifications.

## Gochujang observation window

The `/product/gochujang/` page remains frozen through the planned November 20 review. Its product record, metadata and rendered component HTML match base source commit `be97808c79684479d735c044f16652c6c1c3e186`. The related extra-hot description is retained to prevent an indirect change.

Independent React server-render comparison:

- Component HTML: 16,458 bytes; SHA256 `0b395d50494e4960d5510ff28a4f6aa7050a8488ba7b58297b0d485e5196efa9`.
- Metadata JSON: 1,050 bytes; SHA256 `e24d460486382db40f6682809c99451f0bc9b9bc488009987dc4b6f2ac3fd781`.
- The gochujang sitemap last-modified date remains unchanged. This comparison concerns page output, not framework build IDs or generated JavaScript filenames.

## Validation

- `npm test`: all 48 tests passed, including independently transcribed kimchi variant/pack/carton fixtures and public anomaly checks.
- `npm run export:canonical`: Next static export and TypeScript checks passed.
- `npm run export:verify`: 54 sitemap pages, 33 details, 272 catalogue targets, 371 matching FAQ pairs and 409 local resource/link targets passed.
- `npm run lint`: no errors; 21 existing image and unused-variable warnings remain.
- Independent kimchi fixtures check actual workbook values, variant/pack associations, missing fields and exclusion of the suspect dimension from public output. Shared checks cover complete visible/schema FAQ parity, public field lists, inquiry behavior and price exclusion.

These are source/build checks. They do not constitute production acceptance, search indexing or AI citation measurements.

## Deployment handoff for Raymond

Use the full reviewed source commit from the final handoff or PR head, not an unverified current `main` or old `gh-pages` archive. The source branch is `aeo/sauces-kimchi-20261114`.

1. Fetch and check out that exact commit in an isolated checkout. Confirm `git rev-parse HEAD` equals the supplied full SHA.
2. With Node >= 22.13, run:

   ```bash
   npm ci
   npm test
   npm run export:canonical
   npm run export:verify
   ```

3. Deploy the complete generated `out/` to a new release directory. This export targets `https://deesheng.food/` at the domain root and must not contain the GitHub Pages `/deesheng-food` path prefix.
4. Record the full source commit in the release manifest. Confirm the actual production host and entry point before switching; retain the previous release for rollback.
5. After switching, verify 54 unique sitemap URLs, all 33 detail pages, the 37-card kimchi category and its pack tables, current `catalog.json`, both LLM reference files and referenced assets. Check canonical URLs and compare public content with this release. Roll back if acceptance fails.

The existing workflow updates `gh-pages` when `main` receives a push. This PR is not merged or deployed by the author. If Raymond uses that workflow, verify the generated artifact and domain-root paths before deployment.

## Follow-up measurement

Record the actual deployment time and source commit first. Check fetchability/index status and compare observations with the same saved prompts, engine, language and region as the baseline. A successful HTTP response is not evidence of indexing or AI citation.

At the planned November 20 review, compare matched answers and cited URLs before selecting another content change. Evaluate fire-noodle variants and kimchi separately. New country/language samples form separate cohorts; an existing US sample must not be described as global coverage. Use observed citations, qualified inquiry attribution and repeated observations without promising a rank or growth percentage.
