# Andrea Novel Helper 用户指南

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。
>
> 本文档仅作为参考，建议结合源码和官方文档一起使用。

---

欢迎使用 Andrea Novel Helper（小说助手）！这是一个专为小说作者设计的 VS Code 扩展，提供了从写作辅助到项目管理的全方位支持。

## 新手入门

如果你是第一次使用，建议按以下顺序阅读：

### 了解产品

1. [产品介绍](./introduction.md) - 全面了解 Andrea Novel Helper 的功能与优势

### 安装配置

2. [安装与设置](./getting-started/installation.md) - 如何安装扩展
3. [Git 使用指南](./getting-started/git-guide.md) - 版本管理与云同步入门
4. [图文教程](./getting-started/visual-guide.md) - 详细的图文安装和使用教程
5. [初次使用向导](./getting-started/first-run.md) - 第一次使用的配置步骤
6. [基础工作流程](./getting-started/basic-workflow.md) - 从头开始写小说的基本流程

## 功能列表

### 📁 侧边栏功能

侧边栏位于 VS Code 左侧，提供了项目管理的主要功能。

| 功能 | 说明 | 文档链接 |
|------|------|----------|
| **字数统计** | 实时统计章节字数，支持手动排序 | [查看详情](./sidebar/word-count.md) |
| **角色管理** | 管理小说角色，支持卡片视图编辑 | [查看详情](./sidebar/roles.md) |
| **包管理器** | 管理角色/设定包，支持导入导出 | [查看详情](./sidebar/packages.md) |
| **大纲视图** | 双重大纲系统，快速导航章节 | [查看详情](./sidebar/outline.md) |
| **WebDAV 同步** | 云端备份与多设备同步 | [查看详情](./sidebar/webdav.md) |
| **AutoGit** | 自动 Git 提交与版本管理 | [查看详情](./sidebar/autogit.md) |
| **批注管理** | 添加批注和伏笔标记 | [查看详情](./sidebar/comments.md) |
| **脚本运行器** | 运行自定义脚本 | [查看详情](./sidebar/script-runner.md) |
| **设置** | 快速访问扩展设置 | [查看详情](./settings/) |

### 📊 状态栏功能

状态栏位于 VS Code 底部，提供了实时状态信息。

| 功能 | 说明 | 文档链接 |
|------|------|----------|
| **写作统计** | 显示今日/本周写作字数和速度 | [查看详情](./statusbar/writing-stats.md) |
| **版式信息** | 显示当前段落的字数统计 | [查看详情](./statusbar/layout-info.md) |
| **同步状态** | 显示 WebDAV/Git 同步状态 | [查看详情](./statusbar/sync-status.md) |
| **智能标签组锁** | 显示标签组锁定状态 | [查看详情](./statusbar/tab-lock.md) |

### ✏️ 编辑器功能

编辑器中的辅助功能，让写作更流畅。

| 功能 | 说明 | 文档链接 |
|------|------|----------|
| **智能回车** | 自动处理段落换行和缩进 | [查看详情](./editor/smart-enter.md) |
| **自动配对** | 自动补全引号、括号等符号 | [查看详情](./editor/auto-pairs.md) |
| **角色高亮** | 自动高亮文档中的角色名称 | [查看详情](./editor/character-highlight.md) |
| **错别字检测** | 自动检测常见错别字 | [查看详情](./editor/typo-detection.md) |
| **自动补全** | 智能补全角色名称和词汇 | [查看详情](./editor/completions.md) |
| **格式化** | 一键格式化文档排版 | [查看详情](./editor/formatting.md) |

### 🎯 命令面板功能

通过命令面板（Ctrl+Shift+P / Cmd+Shift+P）访问的功能。

| 功能 | 说明 | 文档链接 |
|------|------|----------|
| **名字生成器** | 随机生成各种风格的角色名字 | [查看详情](./commands/name-generator.md) |
| **Typst 导出** | 将小说导出为排版精美的 PDF | [查看详情](./commands/typst-export.md) |
| **数据库管理** | 管理扩展的内部数据库 | [查看详情](./commands/database.md) |
| **关系管理** | 管理角色之间的关系 | [查看详情](./commands/relationships.md) |

### 🖼️ 独立视图

独立的可视化编辑器和预览窗口。

| 功能 | 说明 | 文档链接 |
|------|------|----------|
| **角色卡片编辑器** | 可视化编辑角色信息 | [查看详情](./views/role-cards.md) |
| **关系图编辑器** | 可视化编辑角色关系 | [查看详情](./views/relationship-editor.md) |
| **时间线编辑器** | 管理故事时间线 | [查看详情](./views/timeline-editor.md) |
| **预览面板** | 预览 Typst 渲染效果 | [查看详情](./views/preview.md) |
| **热力图** | 可视化角色引用分布 | [查看详情](./views/heatmap.md) |

## 按使用场景查找

### 我想...

- 📝 **开始写小说** → [基础工作流程](./getting-started/basic-workflow.md)
- 👥 **管理角色** → [角色管理](./sidebar/roles.md)
- 📊 **统计字数** → [字数统计](./sidebar/word-count.md)
- ☁️ **备份到云端** → [WebDAV 同步](./sidebar/webdav.md)
- 📖 **查看大纲** → [大纲视图](./sidebar/outline.md)
- 🎨 **美化排版** → [格式化](./editor/formatting.md)
- 📝 **生成名字** → [名字生成器](./commands/name-generator.md)
- 📄 **导出 PDF** → [Typst 导出](./commands/typst-export.md)
- ✏️ **添加批注** → [批注管理](./sidebar/comments.md)
- 🔗 **管理关系** → [关系图编辑器](./views/relationship-editor.md)

## 功能索引

### A-C
- AutoGit - [自动 Git 管理](./sidebar/autogit.md)
- 自动配对 - [编辑器功能](./editor/auto-pairs.md)
- 自动补全 - [编辑器功能](./editor/completions.md)
- 批注管理 - [侧边栏功能](./sidebar/comments.md)

### D-F
- 格式化 - [编辑器功能](./editor/formatting.md)
- 数据库管理 - [命令面板功能](./commands/database.md)

### G-L
- 关系管理 - [命令面板功能](./commands/relationships.md)
- 关系图编辑器 - [独立视图](./views/relationship-editor.md)
- 角色高亮 - [编辑器功能](./editor/character-highlight.md)
- 角色管理 - [侧边栏功能](./sidebar/roles.md)
- 角色卡片编辑器 - [独立视图](./views/role-cards.md)

### M-O
- 包管理器 - [侧边栏功能](./sidebar/packages.md)
- 名字生成器 - [命令面板功能](./commands/name-generator.md)
- 大纲视图 - [侧边栏功能](./sidebar/outline.md)

### P-R
- 排版设置 - [编辑器功能](./editor/formatting.md)
- 脚本运行器 - [侧边栏功能](./sidebar/script-runner.md)

### S
- 智能回车 - [编辑器功能](./editor/smart-enter.md)
- 智能标签组锁 - [状态栏功能](./statusbar/tab-lock.md)
- 设置 - [设置文档](./settings/)
- 写作统计 - [状态栏功能](./statusbar/writing-stats.md)

### T-Z
- 同步状态 - [状态栏功能](./statusbar/sync-status.md)
- 时间线编辑器 - [独立视图](./views/timeline-editor.md)
- Typst 导出 - [命令面板功能](./commands/typst-export.md)
- 版式信息 - [状态栏功能](./statusbar/layout-info.md)
- 错别字检测 - [编辑器功能](./editor/typo-detection.md)
- 字数统计 - [侧边栏功能](./sidebar/word-count.md)
- WebDAV 同步 - [侧边栏功能](./sidebar/webdav.md)
- 预览面板 - [独立视图](./views/preview.md)
- 热力图 - [独立视图](./views/heatmap.md)

## 常见问题

### 找不到功能？

1. 确认扩展已启用（检查扩展图标是否亮起）
2. 查看侧边栏是否有相关图标
3. 使用命令面板（Ctrl+Shift+P）搜索功能
4. 查看[设置文档](./settings/)确认功能是否开启

### 需要帮助？

- 查看[设置文档](./settings/)了解如何配置扩展
- 查看[常见问题](./faq/)（待完善）
- 在 GitHub 提交 Issue

## 快捷键参考

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+P` | 打开命令面板 |
| `Enter` | 智能回车（需启用） |
| `Tab` | 接受自动补全建议 |
| `Esc` | 关闭当前打开的面板 |

> 💡 **提示**：你可以在 VS Code 的键盘快捷方式设置中自定义这些快捷键。

## 版本日志

查看历史版本的更新说明：

- [v0.3.25](./changelog/novel-helper0325/index.md) - 自定义分组、角色展开功能
- [v0.3.24](./changelog/novel-helper0324/index.md) - wcignore 快速设置

## 资源文件

### Typst 模板

- [Typst 小说模板](./resources/typst-template/index.md) - 适用于小说排版的 Typst 模板

---

[← 返回主文档](../README.md)
