# 功能特性

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

---

Luna Launcher 在 Prism Launcher 的基础上增加了以下功能：

## 核心功能

### 实例隔离

每个 Minecraft 实例拥有独立的：
- Mods 文件夹
- 资源包
- 配置文件
- 存档世界

**优势：**
- 不同实例的设置互不干扰
- 旧版本启动不会破坏新版本配置
- 方便管理多个 Modpack

### 整包管理

支持从多种来源导入 Modpack：
- CurseForge
- Modrinth
- 直接导入压缩包

**功能：**
- 自动解析依赖关系
- 一键安装整包
- 保持实例目录整洁

## Luna 独有功能

### P2P 联机

内置支持 [Terracotta](https://github.com/burningtnt/Terracotta) 和 [YukariConnect](https://github.com/ElicaseTech/YukariConnect)。

**特性：**
- 无需端口映射
- 无需复杂网络配置
- 与朋友直接联机

**使用方法：**
1. 打开实例设置
2. 启用 P2P 联机
3. 邀请朋友加入

### 镜像 API 支持

内置支持 BMCLAPI 和其他社区镜像。

**优势：**
- 国内网络环境下载更快
- 减少下载失败率
- 自动故障转移

**设置方法：**
1. 打开设置 → 账户
2. 勾选"使用 BMCLAPI 镜像"

### Fluent 主题

内置现代化 Fluent Design 主题。

**主题选项：**
- Fluent Dark（深色）
- Fluent Light（浅色）

**切换方法：**
1. 打开设置 → 主题
2. 选择 "Fluent Dark" 或 "Fluent Light"

### 新 UI 布局

可选的三列布局（实验性功能）。

**启用方法：**
1. 打开设置 → 界面
2. 勾选"使用三列布局"
3. 重启启动器

### 服务器预览

从工具栏快速查看服务器状态。

**功能：**
- 实时显示在线玩家
- 一键连接服务器
- 服务器延迟显示

### 服务端管理（开发中）

直接从启动器管理 Minecraft 服务器。

**计划功能：**
- 下载服务端 JAR
- 配置服务器属性
- 启动/停止服务器
- 适合小型服务器和临时联机

### 自定义玩家模型

支持自定义玩家模型，包括 Yes Steve 模型。

### Schematic 文件管理

支持 Minecraft 原理图（Schematic）文件的资源管理。

## Prism Launcher 基础功能

Luna 继承了 Prism Launcher 的所有功能：

- 多实例管理
- 自动更新
- Mod 管理
- 资源包管理
- 自定义启动参数
- 日志查看
- 截图管理

---

[← 返回用户指南](./)
