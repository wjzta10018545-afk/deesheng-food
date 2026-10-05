# Deesheng Food

Official export website source for **Qingdao Deesheng Hengxin Food Co., Ltd.**

**GitHub Pages production website:** https://wjzta10018545-afk.github.io/deesheng-food/  
**Application origin:** https://deesheng-food.wjzta10018545.chatgpt.site  
**Canonical domain:** https://deesheng.food  
**Contact:** Kevin Wang · WhatsApp +86 156 2108 9573 · info@deesheng.food

## Product ranges

- HALAL Korean sauces and gochujang
- Korean kimchi
- Korean chili powder and dry seasonings
- IQF frozen vegetables

The website provides individual product pages, OEM/private-label information, downloadable catalogues, certification information, buyer resources, structured data, `llms.txt`, `llms-full.txt`, sitemap and machine-readable catalogue data for search and AI discovery.

## Quality and certification

The public website presents the factory's certification and audit scope, including BRCGS Grade A, HACCP, HALAL, OU Kosher, SMETA, FDA registration support and ASTA-related quality information. Buyers should confirm the current certificate and exact product/formula scope before ordering.

## Technology

### MAMAZAN Legend game

The standalone browser game lives in `public/game/` and is available at `/game/` wherever the public assets are served. It introduces five catalogue-backed sauces and lets business buyers request a selected sample. The game keeps existing scores and tutorial preferences on the player's device; it does not save sample-request contact details in browser storage.

Sample requests use the existing Gmail destination through FormSubmit. Only an explicit successful service response shows the submitted screen; failure or a 15-second timeout preserves the form and provides an email fallback. Service acceptance is not proof of inbox delivery or sample dispatch. A new hosting origin may require FormSubmit email activation. X sharing links directly back to the current game route with campaign attribution.

Run the game conversion checks independently with `node --test tests/game-conversion.test.mjs`. These checks isolate network responses and do not send real sample requests. The separately hosted `mamazan-legend.vercel.app` deployment must be updated through its existing deployment connection; committing this folder does not prove that Vercel has updated.

### Agreed game direction — planned, not implemented

Kevin's goal is a game people choose to play, revisit and share, supported by Deesheng's real food supply chain, deliverable physical rewards and qualified business inquiries. The working concept is **MAMAZAN Global Food Street / MAMAZAN 全球美食街**. The current conversion changes above are a foundation; the systems below are a product roadmap, not shipped features.

- **Play and return:** short cooking challenges, saved shop progression, useful recipe collections, daily challenges and asynchronous friend orders. Test repeat play and next-day return before expanding the number of shops.
- **Discover real restaurants:** a country/city food map and restaurant cards showing owner-approved photos, location, signature dishes and links. A real restaurant may host a signature-dish challenge and contribute a collectible city/food badge. Discovery follows the player's interests; a store's appearance does not imply a Deesheng supply relationship.
- **Restaurant participation:** owners can apply to join, claim their listing, submit their own materials and share a dedicated shop/challenge link. Publish listings and marks only after reviewing the source and owner claim; keep fictional player shops and real restaurant listings visibly identifiable.
- **Real products and rewards:** use catalogue-backed sauces, kimchi, seasonings and vegetables in suitable recipes. Keep the full product catalogue and professional sample request accessible. Physical tasting kits need a stated inventory, eligibility, delivery area and redemption process before being offered; game points are not a promise of shipment.
- **Business conversion:** store participation is separate from a qualified purchase inquiry. A restaurant owner, importer or distributor can voluntarily request product information or samples and provide their business needs. Track actual received and qualified inquiries separately from clicks, registrations and prepared forms.

Roll out in stages: first validate a complete fried-chicken-shop experience; then pilot a small set of owner-approved real restaurants (a proposed initial cohort is five stores); then expand city discovery and participation using observed return, sharing and business-inquiry results. The long-term aim is to support restaurants worldwide, growing city by city rather than promising complete global coverage at launch.

The application uses Vinext/Vite for OpenAI Sites and a static Next.js export for GitHub Pages. GitHub Pages hosts the complete public catalogue, product routes, buyer resources, downloads and browser-side WhatsApp inquiry flow directly; it does not redirect to the application origin.

The contact form opens WhatsApp immediately and records a **prepared** inquiry in the Sites D1 database in the background using keepalive. Source labels in the prepared message help sales reconcile the conversation. A prepared row is not proof that the visitor pressed send in WhatsApp or that the lead qualified. If the recording endpoint is unavailable, WhatsApp still opens and the page states that the request was not saved. GA4 loads only after analytics consent and uses the standard arguments-object command queue; consent also works for the current page when browser storage is unavailable. Form fields are not sent to GA4.

Website WhatsApp and email links include the session's source, medium, campaign, ad variant (`utm_content`) and entry page in the editable message. The same details accompany the quotation draft even if database recording fails. A new explicitly tagged visit replaces the session source; ordinary internal navigation preserves it. These labels are attribution hints and may be removed by the visitor; they are not verified conversions or cross-device attribution. Meta ads that open WhatsApp directly must be reconciled using Meta/WhatsApp's own ad referral information. GA4 inquiry events carry the source labels only after analytics consent.

The public `deesheng.food` domain is served by a separately managed static server. Updating GitHub Pages or the Sites application does **not** establish that the canonical domain was updated. Build the canonical export without `GITHUB_PAGES=true`, synchronize the complete `out/` directory through the authorized production deployment channel, then verify the live contact links. The server synchronization is managed separately from this repository's GitHub Pages workflow.

The GitHub `production` environment validates every commit to `main` against the full production build.

```bash
npm ci
npm run build
npm test
```

## Commercial baseline

B2B export · Standard OEM MOQ 200 cartons per item · FOB Qingdao · Typical standard-product lead time about 14 days after final confirmation.

All specifications, availability, certification scope and commercial terms remain subject to final written confirmation.
