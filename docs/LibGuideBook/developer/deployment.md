# 部署指南

> **⚠️ 免责声明**：本文档由 **MiniMax-M2.1** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方为准**。

---

本文档介绍如何将 LibGuideBook 部署到 Cloudflare Workers。

## 部署要求

- Node.js 18+
- npm 或 pnpm
- Cloudflare 账号
- Wrangler CLI

## 部署步骤

### 1. 安装依赖

```bash
npm install
```

### 2. 构建项目

```bash
npm run build
```

### 3. 配置 Wrangler

确保 `wrangler.toml` 文件已正确配置：

```toml
name = "libguidebook"
compatibility_date = "2024-01-01"
```

### 4. 部署到 Cloudflare

```bash
npx wrangler deploy
```

## 自定义域名

### 绑定自定义域名

```bash
npx wrangler route set "https://your-domain.com/*"
```

### 配置 HTTPS

Cloudflare Workers 自动提供 SSL 证书。

## 环境变量

| 变量 | 说明 |
|------|------|
| `ENVIRONMENT` | 部署环境（production/development） |

## 监控和日志

### 查看日志

```bash
npx wrangler tail
```

### 性能监控

通过 Cloudflare Dashboard 监控 Worker 性能。

---

如需更多部署帮助，请查看 [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)。
