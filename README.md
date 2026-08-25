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

The public website presents the factory's certification and audit scope, including BRCGS Grade A, HACCP, HALAL, OU Kosher, SMETA, FDA registration support, USDA Organic, EU Organic and ASTA-related quality information. Buyers should confirm the current certificate and exact product/formula scope before ordering.

## Technology

The application uses Vinext/Vite for OpenAI Sites and a static Next.js export for GitHub Pages. GitHub Pages hosts the complete public catalogue, product routes, buyer resources, downloads and browser-side WhatsApp inquiry flow directly; it does not redirect to the application origin.

The GitHub `production` environment validates every commit to `main` against the full production build.

```bash
npm ci
npm run build
npm test
```

## Commercial baseline

B2B export · Standard OEM MOQ 200 cartons per item · FOB Qingdao · Typical standard-product lead time about 14 days after final confirmation.

All specifications, availability, certification scope and commercial terms remain subject to final written confirmation.
