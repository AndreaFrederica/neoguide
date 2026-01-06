---
title: 安装指南 - NovelHelperLite
published: 2025-12-02
description: 介绍如何安装和部署 ANH Lite。
tags: ["安装", "部署", "使用"]
category: 用户指南
draft: false
lang: "zh_cn"
---

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方为准**。

---

# 安装指南

ANH Lite 支持多种使用方式，您可以根据需要选择最适合的方式。

## Web 版本使用

### 在线访问

ANH Lite 作为 Web 应用，可以直接在浏览器中使用。只需访问应用的 URL，即可开始使用。

### 浏览器要求

ANH Lite 支持所有现代浏览器：

- **Chrome / Edge**：完全支持，推荐使用最新版本
- **Firefox**：完全支持，推荐使用最新版本
- **Safari**：完全支持，需要 Safari 14+
- **Opera**：完全支持，推荐使用最新版本

### 文件系统访问

在 Web 版本中，文件访问依赖于浏览器的 File System Access API：

- **Chrome / Edge**：完全支持 File System Access API
- **Firefox**：支持部分功能，需要用户授权
- **Safari**：支持有限，可能需要使用 IndexedDB 作为后备

如果浏览器不支持 File System Access API，应用会自动降级使用 IndexedDB 存储文件数据。

## 移动端安装

### Capacitor 应用

ANH Lite 通过 Capacitor 构建原生应用，支持 iOS 和 Android 平台。

#### iOS 安装

1. 从 App Store 下载 ANH Lite 应用（如果已发布）
2. 或通过 TestFlight 安装测试版本（如果有测试资格）

#### Android 安装

1. 从 Google Play 下载 ANH Lite 应用（如果已发布）
2. 或从官方渠道下载 APK 文件手动安装

#### 移动端特性

- **文件系统访问**：使用 @capacitor/filesystem 插件访问设备文件系统
- **私有工作区**：支持打开应用的私有工作区
- **触摸优化**：优化的触摸操作界面
- **虚拟键盘适配**：自动适配虚拟键盘

## 桌面端安装

### Electron 应用

ANH Lite 通过 Electron 构建桌面应用，支持 Windows、macOS 和 Linux。

#### Windows

1. 下载 Windows 安装包（.exe 或 .msi）
2. 运行安装程序，按照提示完成安装
3. 启动应用即可使用

#### macOS

1. 下载 macOS 安装包（.dmg）
2. 拖动应用到 Applications 文件夹
3. 从 Launchpad 启动应用

#### Linux

1. 下载 Linux 安装包（.AppImage、.deb 或 .rpm）
2. 根据发行版选择合适的安装方式：
   - **AppImage**：直接运行，无需安装
   - **deb**：`sudo dpkg -i anh-lite.deb`
   - **rpm**：`sudo rpm -i anh-lite.rpm`

#### 桌面端特性

- **原生文件系统**：直接访问本地文件系统
- **系统通知**：集成系统通知功能
- **文件关联**：可以关联文件类型，双击打开文件

## 开发环境安装

如果您想从源代码构建 ANH Lite，请按照以下步骤操作。

### 前置要求

- **Node.js**：18.0 或更高版本
- **pnpm**：8.0 或更高版本（推荐使用 pnpm）
- **Git**：用于克隆代码仓库

### 克隆仓库

```bash
git clone https://github.com/your-repo/novel-helper-lite.git
cd novel-helper-lite
```

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

应用会在 `http://localhost:9000` 启动。

### 构建生产版本

#### Web 版本

```bash
pnpm build
```

构建产物会输出到 `dist-spa` 目录。

#### Electron 桌面应用

```bash
pnpm build:electron
```

#### Capacitor 移动应用

```bash
# iOS
pnpm build:capacitor:ios

# Android
pnpm build:capacitor:android
```

## 配置

### 环境变量

在项目根目录创建 `.env` 文件，可以配置以下环境变量：

```env
# 应用配置
VITE_APP_NAME=ANH Lite
VITE_APP_VERSION=0.0.1

# API 配置
VITE_API_BASE_URL=https://api.example.com
```

### 工作区配置

首次使用时，需要选择工作区：

1. 点击侧边栏的"打开工作区"按钮
2. 选择要作为工作区的文件夹
3. 授权文件系统访问权限（如果需要）
4. 工作区会自动保存，下次打开时自动加载

## 权限要求

### Web 版本

- **文件系统访问**：需要用户授权才能访问本地文件系统
- **存储权限**：需要用户授权才能使用 IndexedDB

### 移动端

- **存储权限**：需要授予存储权限才能访问设备文件系统
- **相机权限**（可选）：如果需要上传图片

### 桌面端

- **文件系统访问**：需要授予文件系统访问权限
- **网络权限**（可选）：如果需要在线功能

## 常见问题

### 文件访问权限被拒绝

**问题**：打开文件或文件夹时提示权限被拒绝

**解决**：

1. 检查浏览器是否支持 File System Access API
2. 确保已授予文件系统访问权限
3. 尝试使用 HTTPS 协议（某些浏览器要求）
4. 尝试使用其他浏览器（推荐 Chrome 或 Edge）

### 文件无法保存

**问题**：编辑文件后无法保存

**解决**：

1. 检查文件句柄是否有效
2. 确保没有其他程序正在修改该文件
3. 尝试重新打开文件
4. 检查磁盘空间是否充足

### 移动端无法打开文件

**问题**：在移动端无法打开本地文件

**解决**：

1. 确保已授予存储权限
2. 检查文件路径是否正确
3. 尝试使用文件管理器选择文件
4. 确保应用有访问该位置的权限

### 应用无法启动

**问题**：应用无法启动或崩溃

**解决**：

1. 检查 Node.js 版本是否符合要求（18.0+）
2. 清除缓存：`pnpm clean`
3. 重新安装依赖：`rm -rf node_modules && pnpm install`
4. 查看控制台错误信息，根据错误信息排查

### 大文件编辑卡顿

**问题**：编辑大文件时界面卡顿

**解决**：

1. 在设置中调整"大文件阈值"，降低阈值以提前启用大文件优化
2. 关闭其他占用内存的应用程序
3. 尝试拆分大文件为多个小文件
4. 启用标签页 GC 功能，释放未使用标签页的内存

## 更新

### Web 版本

Web 版本会自动更新，无需手动操作。刷新页面即可获取最新版本。

### 移动端

移动端应用会通过应用商店自动更新：

- **iOS**：从 App Store 更新
- **Android**：从 Google Play 更新

### 桌面端

桌面端应用需要手动更新：

1. 下载最新版本的安装包
2. 运行安装程序，覆盖安装
3. 或使用内置的自动更新功能（如果支持）

### 开发版本

如果您使用开发版本，可以通过以下方式更新：

```bash
git pull origin main
pnpm install
pnpm dev
```

## 卸载

### Web 版本

Web 版本无需卸载，只需关闭浏览器标签页即可。

### 移动端

- **iOS**：长按应用图标，点击删除应用
- **Android**：进入设置 -> 应用，找到 ANH Lite，点击卸载

### 桌面端

- **Windows**：通过控制面板卸载，或运行卸载程序
- **macOS**：将应用拖到废纸篓
- **Linux**：使用包管理器卸载

**注意**：卸载应用不会删除您的工作区和文件数据，这些数据存储在本地文件系统中。
