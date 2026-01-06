---
title: 编辑器功能 - NovelHelperLite
published: 2025-12-02
description: 详细介绍 ANH Lite 支持的各种编辑器及其功能。
tags: ["编辑器", "Monaco", "Milkdown", "编辑"]
category: 用户指南
draft: false
lang: "zh_cn"
---

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方为准**。

---

# 编辑器功能

ANH Lite 集成了多种专业编辑器，每种编辑器都针对特定的使用场景进行了优化。本文档将详细介绍各种编辑器的功能和使用方法。

## 编辑器系统概述

ANH Lite 根据文件类型自动选择合适的编辑器。系统支持以下编辑器类型：

- **Monaco Editor**：代码和文本编辑器，支持多种编程语言的语法高亮
- **Milkdown Editor**：Markdown 编辑器，提供所见即所得的编辑体验
- **图片查看器**：查看 JPG、PNG、GIF、WebP 等图片格式
- **PDF 查看器**：在线预览 PDF 文件

编辑器选择基于文件扩展名和 MIME 类型进行匹配。如果有多个编辑器可以处理该文件类型，系统会显示选择器让您选择。

## Monaco Editor

Monaco Editor 是 VS Code 的核心编辑器组件，为 ANH Lite 提供了专业级的代码和文本编辑体验。

### 核心功能

Monaco Editor 支持完整的代码编辑功能，包括语法高亮显示、代码折叠、小地图导航、多光标编辑、查找替换等。

### 语言支持

Monaco Editor 自动根据文件扩展名或 MIME 类型检测语言，支持以下语言：

**Web 开发**：
- TypeScript、JavaScript、JSX、TSX
- HTML、HTM、CSS、SCSS、SASS、Less

**数据格式**：
- JSON、JSONC、XML、YAML、YML、TOML、INI、Conf

**编程语言**：
- Python、Java、C、C++、Rust、Go、Ruby、PHP
- Shell、Bash、Zsh、PowerShell

**其他**：
- Markdown、SQL、GraphQL、纯文本

### 大文件优化

当文件内容长度超过设置的大文件阈值（默认 500KB）时，Monaco Editor 会自动优化性能：

- **禁用语法高亮**：使用纯文本模式
- **禁用代码折叠**：禁用代码折叠功能
- **禁用小地图**：隐藏右侧小地图
- **禁用空白字符渲染**：不显示空格和制表符
- **禁用缩进参考线**：隐藏缩进参考线
- **保持行号**：保留行号显示

这些优化可以显著提升大文件的编辑性能。当检测到大文件时，会在控制台输出日志提示。

### 编辑器设置

以下设置会影响 Monaco Editor 的行为：

- **字体大小**：设置编辑器字体大小（默认 14px）
- **字体家族**：设置编辑器字体（默认 Monaco, Consolas, "Courier New", monospace）
- **Tab 大小**：设置 Tab 键插入的空格数量（默认 4）
- **自动换行**：启用或禁用自动换行（默认启用）
- **主题**：根据应用主题自动切换明亮或暗色模式

### 编辑器命令

Monaco Editor 注册了以下命令：

- **剪切**：`Ctrl+X` 或工具栏剪切按钮
- **复制**：`Ctrl+C` 或工具栏复制按钮
- **粘贴**：`Ctrl+V` 或工具栏粘贴按钮
- **保存**：`Ctrl+S` / `Cmd+S` 保存文件

每个打开的文件会注册独立的剪贴板命令，确保剪贴板操作正常工作。

### 视图状态保存

Monaco Editor 会保存以下视图状态：

- **光标位置**：光标所在的行和列
- **滚动位置**：编辑器的垂直和水平滚动位置
- **折叠状态**：代码块的折叠/展开状态

这些状态会在关闭标签页时保存，再次打开文件时自动恢复。

### 移动端优化

#### 虚拟键盘适配

- **自动布局调整**：虚拟键盘弹出时编辑器自动调整布局
- **自动滚动**：光标移动时自动滚动，确保光标始终在可视区域内
- **滚动边距**：设置 120px 的滚动边距，避免光标紧贴屏幕边缘

#### 移动端选区手柄

- **触摸选区**：在有触摸支持的移动设备上显示选区手柄
- **手柄拖动**：拖动开始或结束手柄可以调整选区
- **反向拖动**：支持反向拖动，开始手柄可以拖过结束手柄
- **自动更新**：手柄位置随编辑器滚动自动更新
- **桌面端不显示**：仅在有触摸支持的设备上显示，桌面端不显示

选区手柄功能通过检测移动设备来实现：

```javascript
function isMobileDevice(): boolean {
  const ua = navigator.userAgent || '';
  const hasTouch = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  return hasTouch &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}
```

## Milkdown Editor

Milkdown Editor 是基于 ProseMirror 的所见即所得 Markdown 编辑器，专为写作场景设计。

### 核心特性

- **所见即所得**：在编辑时实时预览 Markdown 渲染效果
- **流畅编辑**：基于 ProseMirror 的高性能编辑器
- **Markdown 支持**：支持标准 Markdown 语法

### 只读保护

对于没有文件句柄的文件（例如从 URL 打开的文件），Milkdown Editor 会自动设置为只读模式，防止用户编辑无法保存的内容。

### 编辑器命令

Milkdown Editor 支持保存快捷键：

- **保存**：`Ctrl+S` / `Cmd+S` 保存文件

## 图片查看器

图片查看器基于 v-viewer 库，支持查看常见图片格式。

### 支持的格式

- JPG / JPEG
- PNG
- GIF
- WebP
- 其他浏览器支持的图片格式

### 核心功能

- **图片预览**：快速查看工作区中的图片文件
- **缩放操作**：支持放大、缩小、适应屏幕
- **旋转功能**：任意角度旋转图片
- **显示缩放中心**：设置选项，在缩放时显示中心点标记

### 图片查看器设置

在设置中可以配置：

- **显示缩放中心**：启用后在缩放时显示中心点标记

## PDF 查看器

PDF 查看器支持在线预览 PDF 文件。

### 核心功能

- **PDF 预览**：支持预览 PDF 格式的文档和电子书
- **快速加载**：使用 Blob URL 加载 PDF 文件
- **在线查看**：无需下载即可在线预览

### PDF 处理

当打开 PDF 文件时：

1. 使用 `Fs.getBlob()` 获取 PDF 文件的 Blob
2. 创建 Blob URL (`URL.createObjectURL(blob)`)
3. 在 PDF 查看器中加载并显示

## 编辑器切换

### 自动选择

系统会根据文件类型自动选择合适的编辑器：

- **文本文件**（.txt、.log 等）：Monaco Editor
- **代码文件**（.js、.ts、.py、.java 等）：Monaco Editor
- **Markdown 文件**（.md、.markdown）：优先 Milkdown Editor
- **图片文件**（.jpg、.png、.gif、.webp 等）：图片查看器
- **PDF 文件**（.pdf）：PDF 查看器

### 手动切换

如果需要使用其他编辑器打开文件，可以手动选择。系统会显示选择器，让您选择偏好的编辑器。

### 编辑器模式

每个打开的文件会记录使用的编辑器模式，存储在 `editorMode` 属性中：

```typescript
type EditorMode = 'monaco' | 'milkdown';
```

下次打开文件时，会自动使用上次的编辑器模式。
