# 18 款酱料 AEO 内容同步清单

整理日期：2026-11-12（北京时间）。本文件是代码交付与上线核对说明，不是上线或优化效果证明。

## 交付范围

将 Profound 已交付的 9 款及 AthenaHQ 已交付的 9 款正文建议、后续包装规格校正落实到网站。包含上一版已处理的韩式辣椒酱、经典火鸡面酱、奶香火鸡面酱，共 18 款；本次不把其余仅分配、尚未交付的产品算作完成。

保留已有 9 个产品 URL，新增 9 个独立详情页；全站产品详情共 27 页。价格表只使用获准的非价格规格，没有将价格、原始工作簿、平台账号资料或内部原始报告加入仓库。

| 来源 | 产品编号 | 产品 | 详情路径 | 页面处理 |
| --- | --- | --- | --- | --- |
| Profound | DS-015 | 经典火鸡面酱 | `/product/classic-buldak-sauce/` | 更新，保留 URL |
| Profound | DS-017 | 微辣火鸡面酱 | `/product/mild-spicy-fire-noodle-sauce/` | 新增 |
| Profound | DS-021 | 辣味烤肉蘸酱 | `/product/spicy-bbq-dipping-sauce/` | 新增 |
| Profound | DS-032 | 嫩豆腐汤酱 | `/product/soft-tofu-soup-sauce/` | 新增 |
| Profound | DS-040 | 经典炒年糕酱 | `/product/tteokbokki-sauce/` | 更新，明确经典款 |
| Profound | DS-049 | 蒜香酱油炸鸡酱 | `/product/soy-garlic-fried-chicken-sauce/` | 更新，保留 URL |
| Profound | DS-050 | 甜辣炸鸡酱 | `/product/sweet-spicy-fried-chicken-sauce/` | 更新，保留 URL |
| Profound | DS-054 | 韩式辣椒酱 | `/product/gochujang/` | 更新，保留 URL |
| Profound | DS-056 | 韩式蒜蓉酱 | `/product/korean-garlic-sauce/` | 更新，保留 URL |
| AthenaHQ | DS-016 | 奶香火鸡面酱 | `/product/creamy-buldak-sauce/` | 更新，保留 URL |
| AthenaHQ | DS-022 | 不辣烤肉蘸酱 | `/product/non-spicy-bbq-dipping-sauce/` | 新增 |
| AthenaHQ | DS-023 | 韩式烧烤酱 | `/product/korean-bbq-sauce/` | 更新，保留 URL |
| AthenaHQ | DS-035 | 经典部队火锅酱 | `/product/classic-budae-jjigae-sauce/` | 新增 |
| AthenaHQ | DS-036 | 不辣部队火锅酱 | `/product/non-spicy-budae-jjigae-sauce/` | 新增 |
| AthenaHQ | DS-039 | 辣炒五花肉酱 | `/product/spicy-pork-belly-sauce/` | 新增 |
| AthenaHQ | DS-041 | 奶香炒年糕酱 | `/product/creamy-tteokbokki-sauce/` | 新增 |
| AthenaHQ | DS-043 | 蜂蜜芥末酱 | `/product/honey-mustard-sauce/` | 更新，按包装列保质期 |
| AthenaHQ | DS-055 | 韩式大酱 | `/product/korean-doenjang/` | 新增 |

## 已落实的建议

- 每款有独立 SEO 标题、描述、产品标题、顶部采购直答、应用说明、询盘入口及 8 条采购 FAQ，共 144 条。英文内容面向全球进口商、分销商、餐饮及私标采购。
- 67 组包装配置在可见规格表中逐行列出保质期、储存要求及已确认的箱净重、毛重和尺寸。缺失的物流数据明确要求确认。
- 每款关联 3 个产品，并连接 OEM、进口采购及产品文件指南；保留既有有效 URL，新增页面连接对应产品册图片。
- 25 张相关目录卡片已匹配详情页和适用规格；目录仍保留 114 张酱料卡片，不把不同味型、干蘸料或汤料误并为同一产品。
- FAQ JSON-LD 与页面正文使用同一数据源；保留公司、网页、B2B 服务及面包屑结构化数据。不编造价格、Offer、评分或评价。
- `catalog.json`、`llms.txt`、`llms-full.txt` 和 XML sitemap 已同步。站点地图共 48 个唯一页面 URL，其中产品详情为 27 个。
- 所有内容仍通过原有联系入口询盘，不新增支付、订阅或外发消息流程。

## 必须保留的规格边界

| 项目 | 本次处理 |
| --- | --- |
| 1 kg × 10 与 × 12 | 并列为不同配置；不把 × 12 的箱体数据套给 × 10 |
| 嫩豆腐汤酱、辣炒五花肉酱 | × 12 的毛重为 12.9 kg，未套用其他酱料的 12.85 kg |
| 烤肉蘸酱、部队火锅酱 | 只将已确认的子款包装列入该味型规格表；系列其他包装需味型对应确认 |
| 蜂蜜芥末酱 | 180 g × 24、320 g × 24、360 g × 24、1 kg × 12 为 12 个月；1 kg × 10、40 g × 300、360 g × 30 为 9 个月；后两者储存要求待确认 |
| 甜辣炸鸡酱小包装 | 原产品册的 40/48 g 读取疑点尚未消除，没有作为已确认规格发布；仍可询问小包装 |
| 韩式辣椒酱小零售包装 | 200 g 净含量疑点未消除，目录保留为需确认的零售包装询问；详情确认规格为 500 g × 20 和 14 kg/箱 |
| 火鸡面酱与奶香命名 | 不从名称推断含火鸡肉、含奶、无奶或固定辣度；按选定配方和样品确认 |
| 蒜蓉酱、大酱及汤酱 | 分别保留独立产品身份，不凭相近名称推断配方等同 |
| 成分、认证、MOQ、交期 | 不从包装信息推断；以实际配方、证书范围及订单确认 |

## 验证与上线交接

验证包括 Next.js canonical 静态导出、Vinext 构建、全套 42 项测试，以及 18 页实际生成 HTML 的采购问答、规格表、图片、canonical 和内链核对。修改的 TS/TSX 和测试文件 ESLint 无错误；产品与分类模板保留 3 条既有 `<img>` 性能提示。

此前站点地图数量、日期和分类页标题的旧测试断言已更新；新增集成检查覆盖实际页面及机器可读目录的一致性，特别检查 9/12 个月保质期、12.9 kg 专属箱重、味型与包装边界和价格字段。

代码保存在 PR #11 分支，合并及上线由 Kevin 操作。仓库生产工作流在 `main` 更新时运行，本次没有合并或手动触发部署。

上线后核对上述 18 页、目录入口、站点地图、`catalog.json`、图片与询盘入口，再记录实际发布时间作为 D0。当前不能把草稿完成、构建通过或 GitHub 同步视为已收录、已被 AI 引用或排名提升。

效果复测沿用此前建议：锁定问题原文、引擎、国家、语言及统计窗口，在上线核实后的 D0、D+14、D+28 对比品牌提及、网站引用、自然搜索展示及有效询盘。新增产品未实际运行的监测不得写成已完成。本次未开启监测、购买服务或创建定时任务。
