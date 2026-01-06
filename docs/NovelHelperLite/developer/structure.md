---
title: 项目结构说明
description: 深入了解 NovelHelperLite 项目的目录结构和文件组织
published: 2025-12-02
tags: ["项目结构", "目录", "文件组织"]
category: 开发指南
draft: false
lang: "zh_cn"
---

# 项目结构说明

本文档详细介绍了 NovelHelperLite 项目的目录结构和文件组织方式，帮助开发者理解各个目录和文件的用途，从而更高效地进行开发和维护。良好的项目结构是保证代码可维护性的基础，了解项目结构将帮助您快速定位需要修改的代码。

## 根目录结构

项目根目录包含了所有核心文件和配置，以下是根目录主要文件和目录的说明：

```
neoguide/
├── .vitepress/            # VitePress 文档配置
├── docs/                  # 文档目录
├── node_modules/          # 项目依赖（自动生成）
├── public/                # 静态资源目录
├── dev-dist/              # 开发相关分发文件
├── img2pic/               # 图片处理模块文档
├── LibGuideBook/          # 库指南模块文档
├── LunaLauncher/          # 启动器模块文档
├── mygo/                  # mygo 模块文档
├── novel-helper/          # 主项目代码
├── NovelHelperLite/       # 轻量级编辑器模块文档
├── patchouli.js/          # patchouli 模块文档
├── video2motion/          # 视频处理模块文档
├── YukariConnect/         # 连接模块文档
├── icon.af                # 图标文件
├── LICENSE                # 许可证文件
├── package.json           # 项目配置
├── pnpm-lock.yaml         # pnpm 锁定文件
├── README.md              # 项目说明
└── tsconfig.json          # TypeScript 配置
```

## docs 目录结构

docs 目录包含了项目的所有文档，采用模块化组织方式，每个模块都有独立的文档目录：

```
docs/
├── AndreaNovelHelper/     # AndreaNovelHelper 模块文档
│   ├── developer/         # 开发者文档
│   ├── user/              # 用户文档
│   ├── README.md          # 模块说明
│   └── index.md           # 模块首页
├── NovelHelperLite/       # NovelHelperLite 模块文档
│   ├── developer/         # 开发者文档
│   ├── user/              # 用户文档
│   ├── README.md          # 模块说明
│   └── index.md           # 模块首页
├── img2pic/               # 图片处理模块文档
├── LibGuideBook/          # 库指南模块文档
├── LunaLauncher/          # 启动器模块文档
├── video2motion/          # 视频处理模块文档
├── YukariConnect/         # 连接模块文档
├── api-examples.md        # API 示例
├── markdown-examples.md   # Markdown 示例
└── index.md               # 文档首页
```

## NovelHelperLite 模块结构

以下是 NovelHelperLite 模块的详细目录结构：

```
NovelHelperLite/
├── index.md               # 模块首页
├── developer/             # 开发者文档
│   ├── index.md           # 开发者文档首页
│   ├── 01-development.md  # 开发环境搭建
│   ├── 02-structure.md    # 项目结构说明
│   ├── 03-architecture.md # 架构设计
│   ├── 04-components.md   # 组件说明
│   ├── 05-api.md          # API 参考
│   └── 06-extension.md    # 扩展开发
├── user/                  # 用户文档
│   ├── introduction.md    # 产品介绍
│   ├── installation.md    # 安装指南
│   ├── features.md        # 功能特性
│   ├── editor.md          # 编辑器使用
│   └── settings.md        # 设置指南
└── README.md              # 模块说明
```

## 关键文件说明

### package.json

`package.json` 是 Node.js 项目的核心配置文件，包含了项目元数据和依赖信息。关键字段包括：

- `name`：项目名称
- `version`：版本号
- `scripts`：可执行的 npm 脚本命令
- `dependencies`：生产环境依赖
- `devDependencies`：开发环境依赖
- `engines`：支持的 Node.js 版本

### pnpm-lock.yaml

`pnpm-lock.yaml` 是 pnpm 的锁定文件，确保所有开发者使用相同版本的依赖包。该文件应提交到版本控制中，不应手动修改。

### tsconfig.json

`tsconfig.json` 是 TypeScript 编译器的配置文件，定义了 TypeScript 编译选项和文件包含规则。关键配置包括目标 ECMAScript 版本、模块系统、严格类型检查选项等。

### .vitepress/config.mts

`.vitepress/config.mts` 是 VitePress 文档站点的配置文件，使用 TypeScript 语法。该文件定义了站点的标题、描述、主题配置、侧边栏、导航栏等。

## 代码组织原则

项目遵循以下代码组织原则：

**模块化设计**：每个功能模块都有独立的目录，模块内部遵循一致的目录结构。这种设计使得代码易于维护和扩展，新功能的添加不会影响现有功能。

**关注点分离**：视图层（View）、业务逻辑层（Model）和控制层（Controller）明确分离。这种分离使得代码易于测试和复用，也便于团队协作开发。

**约定优于配置**：项目遵循统一的命名约定和目录结构，减少配置文件的使用，提高开发效率。

**文档驱动**：代码与文档同步更新，重要的设计决策和架构变更都会记录在文档中。

## 资源目录

### public 目录

`public` 目录用于存放静态资源，这些资源会被直接复制到构建输出目录中。常见的用途包括：

- favicon.ico：网站图标
- robots.txt：搜索引擎爬虫规则
- 静态图片：不会被构建处理的图片资源
- 字体文件：自定义字体资源

### dev-dist 目录

`dev-dist` 目录包含开发相关的分发文件，通常包括：

- Service Worker 配置：支持 PWA 离线功能
- 清单文件：PWA 应用清单
- 构建产物：经过处理的资源文件

---

*最后更新：2025年12月*
