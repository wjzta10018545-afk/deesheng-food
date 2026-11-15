# Kimchi source coverage and publication decisions — 2026-11-14

## Evidence and boundaries

This audit covers the user-supplied `产品明细(2).xlsx`, Sheet1, product rows 5–49. The table below references the original row and specification cells without publishing the source workbook, its company header, addresses, or private file paths. Source number **N** corresponds to worksheet row **N + 4**. Product names are in C, D and F; packing is in G; carton dimensions are in H. Images are tied to the product row through the workbook drawing/cell-image relationship.

The independent extraction checked all 45 rows against the original workbook XML and found no differences in Chinese, English or Korean names, packing, or dimensions. The source contains **45 records and 46 images**. **28 records have 59 packing variants**; 17 records lack packing data. There are 58 usable supplied carton-dimension entries. One suspect dimension for source #10's first pack is deliberately omitted rather than corrected by inference. Every multi-line packing cell has the same number of lines as its corresponding dimensions cell.

The source provides names, photographs, pack sizes and carton dimensions only. It does not supply shelf life, storage temperature, measured net weight, gross weight, ingredients, allergens, certifications, MOQ, lead times, or prices. Public records use “Confirm for the selected product and pack” for shelf life and storage. Multiplying pack weight by units is not presented as a measured carton weight. Dimensions retain the source sequence; the sheet does not establish which axis is length, width, or height.

`app/data/kimchi-specifications.json` contains all 45 normalized records. Empty `packSpecifications` arrays preserve missingness; they do not imply unavailable products. Only records with supported plant-product specifications are selected for the current catalogue expansion. **Source #34 has a valid 1 kg × 10 pack and carton dimensions.** It is held because it is a seafood-containing mixed product, not because its packing is missing. This corrects the omission in the external planning response.

## Selected page plan

The selected plan following the Profound consultation is **six new product-family pages and two upgrades**:

| Action | Page | Source numbers |
|---|---|---|
| Upgrade | `/products/kimchi/` | 27 plant-product source records with packs; retain separately supported legacy catalogue content |
| Upgrade | `/product/korean-cabbage-kimchi/` | #1–3; keep prior independently supported 1 kg bags separate from the new rows |
| New | `/product/cabbage-kimchi-jars/` | #4 |
| New | `/product/white-washed-stir-fried-kimchi/` | #5, #6, #11 |
| New | `/product/radish-kimchi/` | #7, #9 |
| New | `/product/scallion-kimchi/` | #8, #13 |
| New | `/product/garlic-sprout-pickles/` | #18–20 |
| New | `/product/pickled-green-pepper/` | #21–23 |

A family page must visibly identify the variant in every specification row and preserve distinct preparation methods. Grouping related items does not assert that their recipes, ingredients, storage requirements or shelf lives are identical. Pack-size differences alone do not require separate indexable pages. Other supported plant-product records remain catalogue entries in this release; the source does not justify 45 separate thin detail pages. These are content and architecture decisions, not evidence of improved rankings or AI citations.

## All 45 source decisions

The pack count below is a count of distinct lines in the supplied packing cell. Source cells use the original workbook row. “Catalogue only” means a supported product card with specifications, not a new independent detail page. “Hold” means the record is preserved in the source JSON but is not introduced into this category from this source in the current release.

| Source # | Product | Packs | Source cells | Current decision |
|---:|---|---:|---|---|
| 1 | Cabbage Kimchi — Whole | 3 | `Sheet1!G5:H5` | Family detail: `korean-cabbage-kimchi` |
| 2 | Cabbage Kimchi — Mat | 1 | `Sheet1!G6:H6` | Family detail: `korean-cabbage-kimchi` |
| 3 | Cabbage Kimchi — Mini Mat | 1 | `Sheet1!G7:H7` | Family detail: `korean-cabbage-kimchi` |
| 4 | Cabbage Kimchi — Retail Jars | 3 | `Sheet1!G8:H8` | Family detail: `cabbage-kimchi-jars` |
| 5 | White Kimchi | 1 | `Sheet1!G9:H9` | Family detail: `white-washed-stir-fried-kimchi` |
| 6 | Washed Kimchi | 1 | `Sheet1!G10:H10` | Family detail: `white-washed-stir-fried-kimchi` |
| 7 | Chonggak Radish Kimchi | 2 | `Sheet1!G11:H11` | Family detail: `radish-kimchi` |
| 8 | Spring Onion Kimchi | 2 | `Sheet1!G12:H12` | Family detail: `scallion-kimchi` |
| 9 | Kkakdugi Radish Kimchi | 4 | `Sheet1!G13:H13` | Family detail: `radish-kimchi` |
| 10 | Sweet and Sour Pickled Radish | 3 | `Sheet1!G14:H14` | Catalogue only; supported plant-product pack data |
| 11 | Stir-fried Kimchi | 1 | `Sheet1!G15:H15` | Family detail: `white-washed-stir-fried-kimchi` |
| 12 | Leaf Mustard Kimchi | 1 | `Sheet1!G16:H16` | Catalogue only; supported plant-product pack data |
| 13 | Scallion Kimchi (Daepa) | 1 | `Sheet1!G17:H17` | Family detail: `scallion-kimchi` |
| 14 | Seasoned Korean Bitter Greens | 1 | `Sheet1!G18:H18` | Catalogue only; supported plant-product pack data |
| 15 | Sweet and Sour Garlic Cloves | 0 | `Sheet1!G19:H19` | Hold: no packing or carton specification in this source |
| 16 | Seasoned Radish Strips | 1 | `Sheet1!G20:H20` | Catalogue only; supported plant-product pack data |
| 17 | Sweet and Sour Radish Slices | 0 | `Sheet1!G21:H21` | Hold: no packing or carton specification in this source |
| 18 | Seasoned Garlic Sprouts | 3 | `Sheet1!G22:H22` | Family detail: `garlic-sprout-pickles` |
| 19 | Soy Sauce Garlic Sprouts | 3 | `Sheet1!G23:H23` | Family detail: `garlic-sprout-pickles` |
| 20 | Sweet and Sour Garlic Sprouts | 3 | `Sheet1!G24:H24` | Family detail: `garlic-sprout-pickles` |
| 21 | Seasoned Green Pepper | 3 | `Sheet1!G25:H25` | Family detail: `pickled-green-pepper` |
| 22 | Soy Sauce Green Pepper | 3 | `Sheet1!G26:H26` | Family detail: `pickled-green-pepper` |
| 23 | Sweet and Sour Green Pepper | 3 | `Sheet1!G27:H27` | Family detail: `pickled-green-pepper` |
| 24 | Pickled Dried Radish | 2 | `Sheet1!G28:H28` | Catalogue only; supported plant-product pack data |
| 25 | Seasoned Dried Radish | 3 | `Sheet1!G29:H29` | Catalogue only; supported plant-product pack data |
| 26 | Seasoned Pepper Leaves | 2 | `Sheet1!G30:H30` | Catalogue only; supported plant-product pack data |
| 27 | Pickled Leaf Mustard | 0 | `Sheet1!G31:H31` | Hold: no packing or carton specification in this source |
| 28 | Pickled Celery | 0 | `Sheet1!G32:H32` | Hold: no packing or carton specification in this source |
| 29 | Pickled Gongcai Stems | 0 | `Sheet1!G33:H33` | Hold: no packing or carton specification in this source |
| 30 | Seasoned Perilla Leaves | 2 | `Sheet1!G34:H34` | Catalogue only; supported plant-product pack data |
| 31 | Soy Sauce Perilla Leaves | 3 | `Sheet1!G35:H35` | Catalogue only; supported plant-product pack data |
| 32 | Soy Sauce Mountain Onion Leaves | 2 | `Sheet1!G36:H36` | Catalogue only; supported plant-product pack data |
| 33 | Seasoned Cucumber | 0 | `Sheet1!G37:H37` | Hold: no packing or carton specification in this source |
| 34 | Korean Bitter Greens with Octopus Sauce | 1 | `Sheet1!G38:H38` | Hold for seafood/mixed-product classification; pack data exists |
| 35 | Cheongyang Chili Sauce | 0 | `Sheet1!G39:H39` | Hold: no packing or carton specification in this source |
| 36 | Pickled Mixed Vegetables | 0 | `Sheet1!G40:H40` | Hold: no packing or carton specification in this source |
| 37 | Stir-fried Seasoned Squid | 0 | `Sheet1!G41:H41` | Hold: no packing or carton specification in this source |
| 38 | Stir-fried Anchovy | 0 | `Sheet1!G42:H42` | Hold: no packing or carton specification in this source |
| 39 | Stir-fried Fish Cakes | 0 | `Sheet1!G43:H43` | Hold: no packing or carton specification in this source |
| 40 | Frozen Seasoned Bracken | 0 | `Sheet1!G44:H44` | Hold: no packing or carton specification in this source |
| 41 | Frozen Seasoned Balloon Flower Root | 0 | `Sheet1!G45:H45` | Hold: no packing or carton specification in this source |
| 42 | Frozen Seasoned Shredded Carrots | 0 | `Sheet1!G46:H46` | Hold: no packing or carton specification in this source |
| 43 | Frozen Seasoned Spinach | 0 | `Sheet1!G47:H47` | Hold: no packing or carton specification in this source |
| 44 | Frozen Seasoned Soybean Sprouts | 0 | `Sheet1!G48:H48` | Hold: no packing or carton specification in this source |
| 45 | Frozen Seasoned Osmund | 0 | `Sheet1!G49:H49` | Hold: no packing or carton specification in this source |

## Relationship to the previous 24-card kimchi catalogue

There are **14 direct named-product correspondences, 2 possible correspondences and 8 unmatched cards**. A named-product correspondence is not proof that formulas and packaging from different sources are interchangeable. An older pack absent from this sheet is uncorroborated by this source, not proven discontinued.

| Previous card | Source # | Evidence and treatment |
|---|---:|---|
| Cabbage Kimchi — Whole | 1 | Whole cut matches. Add 10 kg carton, 5 kg carton and 5 kg × 2 bags as distinct supplied pack rows. |
| Cabbage Kimchi — Mat | 2 | Mat cut matches; 10 kg carton. |
| Cabbage Kimchi — Mini Mat | 3 | Mini Mat name/cut matches; 10 kg carton. |
| Cabbage Kimchi — Retail Jar | 4 | Retail format matches. This source lists 300 g, 480 g and 1 kg; it does not corroborate the former 400 g option. |
| White Kimchi | 5 | Direct named-product match; 10 kg carton. |
| Seasoned Pepper Kimchi | 21, possible | Seasoned green pepper may be related, but exact SKU/formula identity is unconfirmed. Keep source-specific naming and do not silently transfer the older pack. |
| Chonggak Kimchi | 7 | Direct named-product match; new source lists 5 kg carton and 1 kg × 12, not the older 10 kg option. |
| Spring Onion Kimchi | 8 | Chinese 小葱 / Korean 쪽파; distinguish source #13. New source lists 5 kg carton and 1 kg × 12. |
| Kkakdugi Kimchi | 9 | Direct named-product match; 10 kg plus three retail sizes. |
| Pickled Radish | 10 | Direct product-family match. New source does not corroborate the older 2 kg × 6 bags. Omit suspect first-pack dimensions. |
| Soy Sauce Perilla Leaves | 31 | Chinese/Korean names match. New source lists 1 kg × 10, 180 g bags × 10 and 3 kg bags × 4; do not invent a bag type for the first entry. |
| Stir-fried Kimchi | 11 | Direct match; source lists 10 kg, not the older 5 kg option. |
| Leaf Mustard Kimchi | 12 | Direct match; 5 kg carton. |
| Green Onion Kimchi | 13 | Chinese 大葱 / Korean 대파; normalize as Scallion Kimchi (Daepa), distinct from #8. Source lists 5 kg carton. |
| Nabak Kimchi | — | Absent. Do not substitute white or washed kimchi. |
| Yeolmu Kimchi | — | Absent. Do not substitute chonggak. |
| Washed Kimchi | 6 | Direct match; source lists 10 kg, not the older 5 kg option. |
| Sweet & Sour Green Onion | — | Unmatched. Source #20 is garlic sprouts, not green onion. |
| Sweet & Sour Spring Onion | — | Unmatched. Do not map garlic sprouts to this card. |
| Soy Sauce Green Onion | — | Unmatched. Source #19 is garlic sprouts. |
| Soy Sauce Spring Onion | — | Unmatched. Source #32 is mountain onion leaves, a separately named product. |
| Pickled Lettuce | — | Unmatched. Korean bitter greens and pickled celery are not established as this SKU. |
| Pickled Yamakurage | 29, possible | Chinese 贡菜 / Korean 궁채 may correspond, but source English uses a conflicting botanical name. Use the neutral Chinese-derived “Gongcai Stems”; there are no supplied pack specifications. |
| Sweet & Sour Yamakurage | — | Absent. Do not infer this flavor from source #29. |

The previously supported 1 kg cabbage bags × 10 and the new 1 kg retail jars × 12 are separate formats. Carton dimensions and storage requirements must not be copied between them. Where the new source lacks a field, existing independently supported evidence may only remain attached to its applicable SKU/pack.

## Naming and image controls

- English names normalize capitalization and obvious spelling errors; Chinese and Korean names retain the source text with only surrounding whitespace removed. Source #29 avoids resolving an unsupported botanical identity. Frozen naming for #40–45 is supported by English and/or Korean source labels and does not establish a storage temperature.
- `瓶` is rendered as “bottle” when the exact container shape is not established. Source #4 uses “jar”, supported by its supplied retail jar photograph. `袋` is rendered as “bag”. A count with no container word remains a count with no invented container.
- Existing exact-product photographs are reused for source #1–13 and #31. New original PNG photographs are referenced for #14, #16, #18–26, #30 and #32 using `/media/catalog-products/kimchi/spec-N.png`.
- Each new photograph is associated with its exact source row; soy-sauce, sweet-and-sour, and seasoned variants do not borrow one another's images. Photo appearance is not ingredient or allergen evidence.
- The source retail jar image represents the photographed 300 g format; it is not proof of every retail size. Some provided photos contain clipped text or a patterned background. Preserve accurate image attribution and review their display at the intended crop.
- No source workbook header, factory identity/address, original private filesystem path, numerical pricing, or suspect dimension value is included in the public JSON. The unmodified workbook and raw extraction are not added to the repository.

## Checks completed for the source data

- 45 unique source numbers, exactly 1–45.
- 59 packing rows and 58 published supplied dimensions, with the one flagged dimension omitted.
- 27 plant-product records with packs and associated exact-product image references.
- 17 source records assigned to the selected family detail pages; other records have no invented detail page.
- #10 first pack and #31 first pack both remain `1 kg × 10`, with no invented bag type.
- Shelf-life and storage fields use confirmation placeholders throughout the new source data.
- No repository build or deployment is represented by this source audit; those are validated in the release workflow.
