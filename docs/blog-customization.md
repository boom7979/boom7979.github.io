# 博客模板替换清单

逐项记录 ShokaX 默认设置的替换进度。已替换表示已在本地 develop 分支配置。

| 优先级 | 项目 | 状态 | 当前值或下一步 | 配置位置 |
|---|---|---|---|---|
| 第一批 | 导航和首页品牌名 | 已替换 | blossom | `_config.shokax.yml` → `alternate` |
| 第一批 | 站点标题 | 已替换 | 路漫漫其修远兮，吾将上下而求索 | `_config.yml` → `title` |
| 第一批 | 副标题 | 已确认保留 | 空白 | `_config.yml` → `subtitle` |
| 第一批 | 站点简介 | 已确认保留 | 记录编程与学习笔记 | `_config.yml` → `description` |
| 第一批 | 作者名 | 已替换 | yy，原为 John Doe。用于侧栏、文章和页脚 | `_config.yml` → `author` |
| 第一批 | GitHub 图标 | 已替换 | 指向 [博客仓库](https://github.com/boom7979/boom7979.github.io) | `_config.shokax.yml` → `social.github` |
| 第一批 | 作者头像 | 已替换 | 个人头像存放在 `source/_data/assets/avatar.jpg`，构建后可通过 `/assets/avatar.jpg` 访问 | `sidebar.avatar` |
| 第一批 | 打赏及收款码 | 待处理 | 打赏默认开启，微信和支付宝二维码图片缺失。可先关闭，或提供公开收款码后替换 | `reward.enable`、`reward.account` |
| 第二批 | 浏览器图标和苹果设备图标 | 已确认保留 | ShokaX 自带图标 | `icon` |
| 第二批 | 首页头图和文章封面 | 已替换 | 首页固定使用 1.jpg 转换的 WebP，文章按封面列表顺序循环 | `source/_data/images.yml`、`scripts/blog-covers.js` |
| 第二批 | 页脚年份和主题署名 | 已更新 | 起始年为 2026，保留 Hexo 和 ShokaX 署名 | `footer.since`、`footer.powered` |
| 第二批 | 文章授权声明 | 已确认保留 | 原创文章沿用 CC BY-NC-SA 4.0 | `creative_commons` |
| 第三批 | 导航 | 已更新 | 首页、学习笔记、项目经历、归档、标签、关于、友链 | `menu` |
| 第三批 | 站内搜索 | 已更新 | ShokaX 全屏搜索样式，按标题和标签做部分匹配，支持空格组合关键词 | `scripts/blog-search.js`、`source/js/blog-search.js`、`source/css/blog.css` |
| 第三批 | 关于页 | 已接入 | 简短介绍及博客仓库链接 | `source/about/index.md` |
| 第三批 | 友链页 | 已接入 | 已列出五个常逛的博客和本站信息 | `source/friends/index.md` |
| 第三批 | 评论 | 暂缓 | Twikoo 和 Waline 均未启用 | `twikoo`、`waline` |
| 第三批 | 音乐播放器 | 暂缓 | 默认开启但未配置歌单，已知会出现初始化错误 | `modules.player`、`audio` |
| 第三批 | 项目经历 | 已恢复为公开页面 | 首页展示项目摘要，深度学习视觉处理可视化平台和 SelfAOI 各有独立详情页 | `source/projects/` |
| 第三批 | 字体、配色和动效 | 已确认保留 | 沿用主题字体、侧栏位置、深色模式、加载动画和点击烟花 | `font`、`sidebar`、`darkmode`、`loader`、`fireworks` |

表中未注明文件的主题配置项，可在项目根目录的 `_config.shokax.yml` 中覆盖。
