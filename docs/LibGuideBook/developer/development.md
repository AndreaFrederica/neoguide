# 开发环境搭建

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

---

## 前置要求

- **Node.js** 16+
- **pnpm**（推荐）或 npm/yarn
- **Git**

## 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn
```

## 开发模式

启动开发服务器（热重载）：

```bash
quasar dev
```

应用将在 `http://localhost:9000` 启动。

## 代码规范

### Lint

```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint --fix
```

### Format

```bash
# 格式化代码
pnpm format
```

## 构建

构建生产版本：

```bash
quasar build
```

输出目录：`dist/spa`

## 部署到 Cloudflare Workers

```bash
# 构建
quasar build

# 部署
wrangler publish
```

## 开发工具推荐

- **IDE**：VS Code / WebStorm
- **浏览器**：Chrome DevTools
- **API 测试**：Postman / Thunder Client

## 项目配置

### quasar.config.ts

Quasar 框架配置文件，包含：
- 构建选项
- 扩展配置
- 框架插件

### wrangler.toml

Cloudflare Workers 配置：
```
name = 'guide-book'
main = "workers/worker.js"
assets = { directory = "dist/spa", binding = "ASSETS" }
```

---

[← 返回开发者文档](./)
