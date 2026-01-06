# 开发者文档

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

---

欢迎参与 LibGuideBook 的开发！

## 项目概述

LibGuideBook 是一个基于 Quasar Framework 的交互式指南书籍应用。

### 技术栈

- **前端**：Vue 3 + TypeScript + Quasar 2.16
- **状态管理**：Pinia 3.0
- **路由**：Vue Router 4.0
- **国际化**：Vue I18n 11.0
- **HTTP 客户端**：Axios 1.2
- **代码编辑器**：Monaco Editor
- **构建工具**：Vite
- **部署平台**：Cloudflare Workers

### 目录结构

```
LibGuideBook/
├── src/
│   ├── pages/           # 页面组件
│   │   ├── IndexPage.vue
│   │   ├── ManualListPage.vue
│   │   ├── ManualEditorPage.vue
│   │   └── ManualRunnerPage.vue
│   ├── components/      # 可复用组件
│   │   └── tools/       # 工具组件
│   ├── stores/          # Pinia 状态管理
│   ├── models/          # TypeScript 类型定义
│   ├── router/          # 路由配置
│   ├── boot/            # 启动配置
│   ├── utils/           # 工具函数
│   └── presets/         # 预设手册
├── public/              # 静态资源
├── workers/             # Cloudflare Worker
└── dist/                # 构建输出
```

## 开发指南

- [开发环境搭建](./development.md)
- [项目架构](./architecture.md)
- [数据模型](./models.md)
- [部署指南](./deployment.md)

## 开发资源

- [Quasar 文档](https://v2.quasar.dev/)
- [Vue 3 文档](https://vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Monaco Editor 文档](https://microsoft.github.io/monaco-editor/)

## 获取帮助

- **Bug 报告**：[GitHub Issues](https://github.com/AndreaFrederica/LibGuideBook/issues)
- **功能讨论**：[GitHub Discussions](https://github.com/AndreaFrederica/LibGuideBook/discussions)

---

[← 返回首页](../)
