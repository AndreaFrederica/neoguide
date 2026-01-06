# 开发者文档

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

---

欢迎参与 Luna Launcher 的开发！

## 项目概述

Luna Launcher 是 Prism Launcher 的增强分支，使用 C++ 和 Qt 框架开发。

### 技术栈

- **语言**：C++17
- **框架**：Qt 6 / Qt 5
- **构建系统**：CMake
- **包管理**：vcpkg / MSYS2 / Pixi

### 目录结构

```
LunaLauncher/
├── launcher/           # 启动器核心代码
│   ├── Application.cpp # 主应用程序
│   ├── minecraft/      # Minecraft 相关逻辑
│   ├── ui/             # 用户界面
│   └── icons/          # 图标资源
├── libraries/          # 第三方库
│   ├── cmark/          # Markdown 解析
│   ├── katabasis/      # OAuth 认证
│   ├── libnbtplusplus/ # NBT 数据格式
│   ├── quazip/         # ZIP 压缩
│   └── ...
├── tests/              # 单元测试
├── docs/               # 文档
├── website/            # 官方网站
└── program_info/       # 程序信息和图标
```

## 开发指南

- [构建指南](./build.md) - 如何在不同平台上构建项目
- [架构设计](./architecture.md) - 项目架构和模块说明
- [BMCLAPI 集成](./bmclapi.md) - 镜像下载实现原理
- [贡献指南](./contributing.md) - 如何贡献代码

## 开发资源

### 相关项目

- [Prism Launcher](https://github.com/PrismLauncher/PrismLauncher) - 上游项目
- [MultiMC](https://github.com/MultiMC/Launcher) - 原始项目
- [Terracotta](https://github.com/burningtnt/Terracotta) - P2P 联机
- [YukariConnect](https://github.com/ElicaseTech/YukariConnect) - P2P 联机替代

### 工具

- [Qt Creator](https://www.qt.io/product/development-tools) - IDE
- [CLion](https://www.jetbrains.com/clion/) - JetBrains C++ IDE
- [VS Code](https://code.visualstudio.com/) - 轻量级编辑器

## 获取帮助

- **Bug 报告**：[GitHub Issues](https://github.com/AndreaFrederica/LunaLauncher/issues)
- **功能讨论**：[GitHub Discussions](https://github.com/AndreaFrederica/LunaLauncher/discussions)

---

[← 返回首页](../)
