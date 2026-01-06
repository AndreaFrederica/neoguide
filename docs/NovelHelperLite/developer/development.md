---
title: 开发环境搭建
description: 配置本地开发环境，开始 NovelHelperLite 开发之旅
published: 2025-12-02
tags: ["开发环境", "配置", "搭建"]
category: 开发指南
draft: false
lang: "zh_cn"
---

# 开发环境搭建

本文档将详细介绍如何配置本地开发环境，帮助开发者快速开始 NovelHelperLite 的开发和调试工作。遵循本指南，您将能够在本地机器上成功运行项目，并准备好进行代码修改和功能开发。

## 系统要求

在开始配置之前，请确保您的开发环境满足以下要求。NovelHelperLite 是一个基于现代 Web 技术栈构建的跨平台应用，因此对开发环境有一定的要求。操作系统方面，项目支持 Windows 10/11、macOS 10.15+ 以及 Linux 主流发行版（如 Ubuntu 20.04+、Fedora 35+ 等）。无论您使用哪种操作系统，只要满足以下硬件和软件要求，都能够顺利完成开发环境的配置。

硬件要求方面，建议内存不少于 8GB，因为前端开发工具和 Node.js 运行时需要消耗一定的内存资源。处理器方面，推荐使用多核处理器以获得更好的编译和打包性能。磁盘空间方面，请确保至少有 10GB 的可用空间，用于存放项目代码、依赖包以及构建产物。浏览器方面，您需要安装 Chrome、Firefox 或 Edge 的最新版本，用于应用的功能测试和调试。

## 必需软件安装

### Node.js 环境

NovelHelperLite 基于 Node.js 构建，因此首先需要安装 Node.js 运行时。项目支持的 Node.js 版本包括 20、22、24、26 和 28 LTS 版本。我们建议使用 LTS（长期支持）版本，以获得更好的稳定性和兼容性。您可以通过以下方式安装 Node.js：

如果您使用 Windows 系统，推荐通过 Node.js 官方网站下载安装包进行安装，或者使用 Winget 包管理器执行 `winget install OpenJS.NodeJS.LTS` 命令完成安装。对于 macOS 用户，可以使用 Homebrew 包管理器执行 `brew install node` 命令，或者通过 nvm（Node Version Manager）来管理多个 Node.js 版本。Linux 用户可以通过系统包管理器安装，或者使用 nvm 进行版本管理。

安装完成后，打开终端执行以下命令验证安装是否成功：

```bash
node --version
npm --version
```

如果命令返回版本号而非错误信息，说明 Node.js 已成功安装。请确保 Node.js 版本在项目支持的版本范围内。

### 包管理器

项目使用 pnpm 作为包管理器，相比 npm 和 yarn，pnpm 具有更快的安装速度和更高效的磁盘空间利用率。请通过以下命令安装 pnpm：

```bash
npm install -g pnpm
```

或者使用 corepack（Node.js 内置的包管理器管理器）启用 pnpm：

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

安装完成后，执行 `pnpm --version` 验证安装。pnpm 的版本应与项目根目录下的 `.nvmrc` 或 `package.json` 中指定的版本兼容。

### 版本控制工具

项目使用 Git 进行版本控制，因此需要安装 Git 客户端。您可以从 Git 官方网站下载安装包，或者通过系统包管理器进行安装。安装完成后，请配置用户信息：

```bash
git config --global user.name "您的用户名"
git config --global user.email "您的邮箱@example.com"
```

### 代码编辑器

虽然您可以使用任何代码编辑器进行开发，但我们强烈推荐使用 Visual Studio Code，因为它提供了最佳的开发体验和生态支持。VS Code 拥有丰富的扩展生态，能够提供智能代码补全、语法高亮、代码导航、调试支持等功能，这些都将显著提升开发效率。

安装 VS Code 后，建议安装以下扩展以优化开发体验：Vue - Official（Vue 3 官方扩展）、ESLint（代码检查）、Prettier（代码格式化）、GitLens（增强 Git 功能）。这些扩展在打开项目时会有提示引导您安装。

## 项目初始化

### 获取源代码

首先，您需要将项目仓库克隆到本地。进入您希望存放项目的目录，执行以下命令：

```bash
git clone https://github.com/AndreaFrederica/neoguide.git
```

或者，如果您已经配置了 SSH 密钥，可以使用 SSH 协议进行克隆：

```bash
git clone git@github.com:AndreaFrederica/neoguide.git
```

克隆完成后，进入项目目录：

```bash
cd neoguide
```

### 安装依赖

在项目根目录下，执行 pnpm install 命令安装所有项目依赖：

```bash
pnpm install
```

pnpm 会根据 `package.json` 和 `pnpm-lock.yaml` 文件中的配置，自动下载并安装所有必要的依赖包。这个过程可能需要几分钟时间，具体取决于您的网络速度和系统性能。安装完成后，所有依赖将保存在 `node_modules` 目录中。

### 环境变量配置

某些功能可能需要环境变量支持。请复制 `.env.example` 文件（如果存在）并重命名为 `.env`，然后根据您的本地环境配置相关变量：

```bash
cp .env.example .env
```

常见的配置项包括 API 密钥、调试开关等。请注意，某些敏感信息不应提交到版本控制系统中。

## 运行项目

### 开发模式

在开发模式下，项目会以热重载的方式运行，任何代码修改都会自动更新浏览器中的内容。执行以下命令启动开发服务器：

```bash
pnpm dev
```

启动成功后，终端会显示访问地址（通常是 `http://localhost:5173`）。在浏览器中打开该地址即可查看应用。开发模式下会启用 Source Map，方便调试源代码。

### 构建生产版本

如果您需要构建生产环境可用的版本，执行以下命令：

```bash
pnpm build
```

构建产物会生成在 `dist` 目录中。您可以使用 `pnpm preview` 命令预览构建后的版本，验证构建是否成功。

### 运行测试

项目包含单元测试和端到端测试，确保代码质量。执行以下命令运行测试：

```bash
# 运行所有测试
pnpm test

# 仅运行单元测试
pnpm test:unit

# 仅运行端到端测试
pnpm test:e2e

# 运行测试并生成覆盖率报告
pnpm test:coverage
```

在提交代码之前，请确保所有测试用例都通过，并且代码覆盖率保持在可接受的水平。

## 开发工具配置

### ESLint 和 Prettier

项目集成了 ESLint 进行代码检查，Prettier 进行代码格式化。在保存文件时，编辑器会自动格式化代码，确保代码风格一致。如果您希望在命令行中手动执行检查和格式化，可以使用以下命令：

```bash
# 检查代码问题
pnpm lint

# 自动修复可修复的问题
pnpm lint:fix

# 格式化代码
pnpm format
```

### Git Hooks

项目使用 Husky 和 lint-staged 实现了 Git Hooks，在提交代码前自动运行检查和格式化。这确保了只有符合规范的代码才能提交到仓库。请确保在安装依赖后 Husky 已正确初始化（通常在 `postinstall` 脚本中自动完成）。

## 常见问题

### 问题一：依赖安装失败

如果 `pnpm install` 过程中断或失败，首先检查网络连接，然后尝试删除 `node_modules` 目录和 `pnpm-lock.yaml` 文件后重新安装：

```bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### 问题二：开发服务器启动失败

如果 `pnpm dev` 命令报错，请检查端口 5173 是否被其他程序占用。您可以通过设置 `PORT` 环境变量来使用其他端口：

```bash
PORT=3000 pnpm dev
```

### 问题三：构建速度慢

首次构建可能需要较长时间，后续构建会快得多。如果构建速度持续很慢，可以尝试增加 Node.js 的内存限制：

```bash
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

---

*最后更新：2025年12月*
