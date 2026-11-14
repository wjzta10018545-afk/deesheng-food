# Sauce and kimchi AEO release — 2026-11-14

This source release improves product selection, factual consistency and machine-readable coverage. It is not a claim of deployment, indexing, citation growth or first-place rankings. Production deployment is assigned to Raymond Lee / 李旭清; this change is delivered as a separate branch and pull request.

## Changes and scope

- Retain 138 target catalogue entries: 88 sauce/paste, 26 supporting ingredients and 24 kimchi/pickled-vegetable entries. These include packaging and flavor variants, not 138 unique recipes.
- Add product-family guidance to 14 sauce/supporting groups and 4 kimchi groups, with a stable reference link for each card. The shared renderer also gives the other existing catalogue cards stable links; all 259 cards remain present.
- Keep 27 detail pages: 25 in the sauce/kimchi/supporting scope and 2 existing frozen-vegetable pages. No new standalone flavor pages were created without sufficient specifications.
- Add titles, direct buyer answers, pack tables and targeted FAQs to 7 existing lightweight details. Their 22 pack rows use already-listed pack/shelf-life/storage data; carton weights and dimensions have not been inferred.
- Preserve the 18 existing detailed sauce records and their 67 pack rows, including pack-specific honey-mustard shelf lives and the 12.9 kg exceptions. Improve unknown logistics wording on the 17 non-gochujang sauce records.
- Remove automatic 12-month/ambient defaults for sauce catalogue records missing those fields. Remove the unsupported blanket cabbage shelf-life statement from product, market and machine-readable content.
- Separate cabbage retail jars from the 1 kg bag/10 kg bulk detail page, correct the product image and link the whole/mat bulk selections appropriately.
- Remove category-driven HALAL title prefixes; retain product-specific document checks and existing expressly written titles. No new certification coverage is asserted.
- Generate both LLM reference files from the same public catalogue data. `catalog:check` detects stale files and now runs with `npm test`. JSON exports use explicit public field lists, including nested specifications and FAQs.
- Preserve existing inquiry attribution. An ESLint annotation documents why the existing gtag queue deliberately uses an Arguments object; analytics behavior is unchanged.

See [the full catalogue coverage register](aeo-catalog-coverage-20261114.md) for per-item mappings and remaining specification work. No private quotations, supplier workbooks, platform account exports or account-level monitoring data are included.

## Gochujang observation window

The `/product/gochujang/` page remains frozen through the planned November 20 review. Its product record, metadata and rendered component HTML match the base source commit `be97808c79684479d735c044f16652c6c1c3e186`. The related extra-hot description was retained to avoid an indirect change to this page.

Independent old/new React server-render comparison:

- Component HTML: 16,458 bytes; SHA256 `0b395d50494e4960d5510ff28a4f6aa7050a8488ba7b58297b0d485e5196efa9`.
- Metadata JSON: 1,050 bytes; SHA256 `e24d460486382db40f6682809c99451f0bc9b9bc488009987dc4b6f2ac3fd781`.
- Its sitemap last-modified date remains unchanged. This comparison concerns the page output, not framework build IDs or JavaScript chunk filenames.

## Validation

- `npm test`: all 45 tests passed, including complete visible/schema FAQ text, pack-specific values, stable card citations, allowed public fields and existing inquiry behavior.
- `npm run export:canonical`: Next static export and TypeScript checks passed.
- `npm run export:verify`: 48 sitemap pages, 27 details, 259 catalogue targets, 348 matching FAQ pairs and 390 local resource/link targets passed.
- `npm run lint`: no errors; existing image and unused-variable warnings remain.
- Price checks cover rendered text, structured data and public catalogue JSON. Existing PDF/image contents were not re-audited by this release; no binary assets were changed.

## Deployment handoff for Raymond

Use the exact reviewed source commit from the pull request/final handoff, not an unverified current `main` or an old `gh-pages` archive. The source branch is `aeo/sauces-kimchi-20261114`.

1. Fetch and check out that full commit SHA in an isolated checkout. Confirm `git rev-parse HEAD` matches it.
2. With Node >= 22.13, run:

   ```bash
   npm ci
   npm test
   npm run export:canonical
   npm run export:verify
   ```

3. Deploy the entire generated `out/` directory to a new production release directory. The canonical export is for `https://deesheng.food/` at the domain root; it must not carry the GitHub Pages `/deesheng-food` prefix.
4. Record the full source commit in the release manifest. Verify the actual production entry point before switching; preserve the current release for rollback.
5. After the switch, check the public sitemap (48 unique URLs), all 27 detail pages, category citation anchors, current `catalog.json`, both LLM reference files and referenced assets. Verify canonical URLs and that public content matches this release. On failure, restore the previous release and investigate the actual host/cache path.

The existing workflow updates `gh-pages` on a push to `main`. This pull request is not merged or deployed by the author. If Raymond chooses that release workflow, verify the resulting artifact and its root-domain paths before deploying it.

## Follow-up measurement

Record the actual deployment time and source commit first. Check fetchability/index status and collect observations using the same saved prompts, engine, language and region as the baseline. A successful HTTP response is not evidence of indexing or AI citation.

At the planned November 20 review, compare matched prompt answers and cited URLs before choosing one further content change. Evaluate fire-noodle variants and kimchi separately. Add new country/language samples as separate cohorts; do not describe an existing US sample as global coverage. Judge changes using observed citations, qualified inquiry attribution and sufficient repeated observations, without guaranteeing a rank or growth percentage.
