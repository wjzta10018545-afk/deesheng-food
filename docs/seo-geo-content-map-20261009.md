# 德盛食品 SEO / GEO 内容更新记录

更新：2026-10-09（上海时间）。本次内容进入 GitHub；deesheng.food 的服务器同步由 Kevin 执行。以主域实际发布日作为后续效果观察起点。

## 这次实际更新

- 韩式酱料分类、OEM 页面和炸鸡裹粉产品页：明确批发采购定位、包装、标准 MOQ 和下一步询价信息。
- 裹粉页：增加专属采购说明，以及样品评估、搭配酱料采购两个问答。
- 六篇采购指南：将重复文章简介的“直接答案”替换为具体回答；增加对应产品和规格链接；按主题选择相关阅读。
- 六篇指南保留原有发布日期，记录实际修订日期，避免内容修订覆盖发布日期。
- 增加 `npm run export:canonical`，生成主域根路径版本的完整 `out/`，不执行服务器同步。

## 可借鉴的方法与依据

1. **以采购问题组织主题。** Google 的现行 AI 搜索指南说明，无需覆盖每一种长尾词写法；同义词可以被理解。围绕真实需求补内容，不为每个句式生成相似页面。[Google 官方指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
2. **先回答，再展示依据与采购入口。** Bing 产品团队建议标题、摘要、H1 保持主题一致，使用明确问答和易比较的规格，核心信息写在 HTML 中。这是平台建议，不是询盘增长保证。[Microsoft / Bing 指南](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers)
3. **增加真实产品证据。** 原创包装信息、样品测试记录、适用条件和有许可的案例，能为采购者提供泛泛介绍没有的信息。GEO 论文中的可见度实验不等于当前网站的点击、排名或成交提升。[GEO 原始研究](https://arxiv.org/html/2311.09735v3)
4. **把统计相关性与因果分开。** Ahrefs 的品牌研究观察到站外提及和 AI 可见度相关；这不能证明买提及就有效。其 JSON-LD 研究也未观察到明确的普遍引用提升，且样本是已获大量引用的页面。保留真实、与正文一致的结构化数据，不把加标签当增长承诺。[品牌研究](https://ahrefs.com/blog/ai-overview-brand-correlation/) · [结构化数据研究](https://ahrefs.com/blog/schema-ai-citations/)
5. **衡量引用、访问与采购结果。** iPullRank 提倡区分内容投入、渠道表现、业务结果；Bing AI Performance 提供引用及抽样检索词，不能将引用次数当成排名或销售额。[iPullRank 方法](https://ipullrank.com/ai-search-metrics) · [Bing 官方功能说明](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)

时效说明：Google 明确 llms.txt 不改变 Google 搜索可见度；Google FAQ 富结果已于 2026-05-07 停止展示。网站可以继续保留帮助采购者的 FAQ 正文和准确标记，但不能承诺获得 Google 问答富结果。[Google 更新记录](https://developers.google.com/search/updates)

## 产品采购意图与页面对应

下列英文词和句子是基于产品资料与采购流程提出的**候选主题**，不是搜索量报告，也不代表已获得对应排名。语义相近的需求由一个合适页面回答；只在需求、事实和内容足够独立时新建页面。

| 采购主题 | 候选搜索词或问句 | 对应页面与已覆盖内容 |
|---|---|---|
| 韩式酱料批发 | Korean sauce wholesale; Korean sauce supplier; Korean sauce manufacturer China | `/products/korean-sauces/`：产品选择、餐饮与零售包装、标准 MOQ、样品和询价 |
| OEM / 自有品牌 | private label Korean sauce; Korean sauce OEM MOQ; Is the MOQ per item? | `/oem-private-label/` 与 `/resources/korean-sauce-oem-guide/`：每款 200 箱的标准 MOQ、配方路线、样品到生产流程 |
| 韩式辣酱 | bulk gochujang supplier; private label gochujang; What gochujang packs are available? | `/product/gochujang/` 与对应指南：500 g × 20、14 kg、口味与文件确认 |
| 炸鸡裹粉 | fried chicken coating mix supplier; wholesale chicken coating powder; How should I evaluate a coating mix sample? | `/product/fried-chicken-coating-mix/`：1 kg × 10、12 个月、储存条件和测试需求 |
| 炸鸡组合采购 | Korean fried chicken sauce wholesale; soy garlic sauce foodservice; Can I source sauce and coating together? | `/resources/korean-fried-chicken-sauce-system/`：腌料、裹粉和挂酱的配套评估；链接具体产品 |
| HALAL 项目 | halal Korean sauce supplier; halal private label sauce; Which product and formula does the certificate cover? | `/resources/halal-korean-sauce-manufacturer/` 与认证页：确认当前文件及具体产品范围；不泛化至全部 SKU |
| 辣椒粉 | gochugaru wholesale; coarse Korean chili powder supplier; fine chili powder for sauce manufacturing | `/resources/korean-chili-powder-sourcing/` 与粗/细粉产品页：用途、粒度、颜色、辣度及真实包装 |
| 进口与报价 | import Korean sauces from China; mixed sauce container; What information is needed for a wholesale quotation? | `/resources/import-korean-sauces-from-china/`：产品、包装、数量、目的地、标签与运输条件 |
| 泡菜采购 | Korean kimchi wholesale; bulk cabbage kimchi supplier; What temperature should imported kimchi be kept at? | 已有 `/products/kimchi/` 和 `/product/korean-cabbage-kimchi/`：冷链、1 kg 与 10 kg 包装；本轮未改 |

## 值得继续补，但先需要真实资料

| 采购者的问题 | 发布前需要的资料 |
|---|---|
| How should this sauce be stored after opening? | 对应 SKU 开封后的储存及使用期限，不能套用未开封保质期 |
| What coating-to-chicken ratio and frying method should I use? | 指定鸡块、裹粉和炸制过程的测试记录 |
| How much sauce and coating mix is needed per serving? | 实测用量、损耗、成品重量；用于单份成本核算 |
| How many cartons fit on a pallet or in a container? | 实际外箱尺寸、重量、托盘及装柜方案 |
| How much shelf life remains when an order is dispatched? | 公司可承诺的批次日期和订单条件 |
| What batch documents support repeat wholesale orders? | 当前可提供的批次文件、批号与追溯流程 |

菲律宾、阿联酋可以成为后续采购指南的目标市场，但需要各自真实渠道、交付条件、标签与文件资料。不要复制同一篇正文只替换国家名，也不要在没有确认的情况下写当地库存、进口批准或固定运费。

## 观察方法

- 从 deesheng.food 实际上线日起，比较相同长度的完整周期，并记录 Google Search Console 的查询、页面、国家、展示、点击、CTR 和排名。小样本与同时改动会限制因果判断。
- 分开观察品牌词、非品牌采购词和主要产品页；使用有来源的数据验证上表中的候选需求。
- 如可访问 Bing AI Performance，再记录引用页面和检索词样本。手工 AI 问句检查须保存日期、产品版本、原始回答和引用链接；一次提及不能代表稳定可见度。
- 核对实际 WhatsApp 对话与采购身份。网站保存的 `prepared` 询盘只表示草稿准备，不表示已发送或有效采购。
- 每周 3,000 次展示与 10% CTR 对应 300 次点击；200 次点击对应约 6.67% CTR。目标统一为 3,000+ 展示、300+ 点击、10%+ CTR，并同时观察有效 B2B 询盘。该目标不是本次更新的效果承诺。
