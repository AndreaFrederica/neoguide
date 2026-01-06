# Andrea Novel Helper 文档

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

欢迎使用 Andrea Novel Helper 文档！本扩展是为小说作者设计的 VS Code 写作助手。

## 文档导航

### 📖 终端用户文档

如果你是小说作者，想要使用 Andrea Novel Helper 进行写作，请查看：

**[→ 进入用户文档](./user/README.md)**

用户文档包含：
- 安装与设置
- 快速入门指南
- 功能使用说明
- 常见问题解答

### 👨‍💻 开发者文档

如果你是开发者，想要了解扩展的内部实现或参与开发，请查看：

**[→ 进入开发者文档](./developer/README.md)**

开发者文档包含：
- 项目概述
- 架构设计
- API 参考
- 开发指南
- 配置说明

## 项目基本信息

| 属性 | 值 |
|------|-----|
| 版本 | 0.4.53+ |
| 许可证 | MPL-2.0 |
| 开发语言 | TypeScript |
| 目标平台 | VS Code Extension |
| 最低 VS Code 版本 | ^1.100.0 |

## 技术栈

### 核心技术
- **TypeScript** - 主要开发语言
- **Node.js** - 运行时环境
- **VS Code API** - 扩展开发接口

### 数据库
- **@vscode/sqlite3** - SQLite 数据库

### 前端组件
- **Vue** - Webview UI 框架
- **Quasar** - UI 组件库

### 原生模块
- **Rust (enigo-keyboard)** - 跨平台输入模拟

### 构建工具
- **Pixi** - 包管理和任务运行
- **npm** - 依赖管理

## 核心功能概览

### 1. 角色与设定管理
- 统一的对象模型支持角色、敏感词、词汇、正则表达式
- 多格式支持：JSON5、Markdown、TXT
- 可视化卡片编辑器
- 智能导航与引用分析

### 2. 大纲系统
- 目录大纲：项目级结构视图
- 文件大纲：文件级结构视图
- 懒加载与实时同步

### 3. 字数统计
- 实时 CJK 字符统计
- 多维度统计方式
- 写作速度监测
- 历史数据可视化

### 4. 排版辅助
- 智能回车
- 智能括号
- 自动空行
- 版式设置

### 5. 同步与备份
- WebDAV 同步
- AutoGit 自动提交
- 多账户管理

### 6. 其他功能
- 名字生成器
- Typst 集成
- 批注系统
- 错别字检测
- 热力图可视化

## 官方链接

- **VS Code 市场**: [Andrea Novel Helper](https://marketplace.visualstudio.com/items?itemName=AndreaNovelHelper.anh)
- **GitHub 仓库**: [andrea-novel-helper](https://github.com/yourusername/andrea-novel-helper)

## 许可证

MPL-2.0 License
