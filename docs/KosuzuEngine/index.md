<p align="center">
  <img src="./logo.png?url" alt="KosuzuEngine Logo" width="20%" />
</p>

<h1 align="center">KosuzuEngine</h1>

<div align="center">

::: warning
⚠️ 引擎仍在开发早期阶段，部分功能尚未完善，欢迎贡献代码和反馈问题。
:::

</div>

一个基于 Vue 3 + TypeScript 的视觉小说引擎。

## 简介

KosuzuEngine 是一个现代化的视觉小说引擎，专为 Web 环境设计。它提供了完整的视觉小说开发所需的核心功能，包括角色系统、对话系统、音频管理、存档系统等。

## 核心特性

- **Actor 系统**: 灵活的角色和背景管理，支持多种姿态和变换
- **多通道音频系统**: 支持 BGM、音效、语音的独立控制和管理
- **打字机效果**: 可配置的文本打字机效果，支持自动分页
- **存档系统**: 基于 localStorage 的存档系统，支持快速存档（QS1-3）
- **国际化**: 完整的 i18n 支持，轻松添加多语言
- **调试工具**: 内置脚本控制台和状态查看器，方便开发调试
- **响应式渲染**: 基于 Vue 3 Composition API 的高效渲染

## 技术栈

- **前端框架**: Vue 3 (Composition API) + TypeScript
- **UI 组件库**: Quasar Framework
- **状态管理**: Pinia
- **构建工具**: Vite
- **国际化**: vue-i18n
- **音频**: Web Audio API

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
quasar dev
```

### 构建生产版本

```bash
quasar build
```

## 项目结构

```
src/
├── engine/           # 核心引擎
│   ├── core/         # 核心系统
│   │   ├── EngineContext.ts    # 引擎上下文
│   │   ├── Runtime.ts          # 运行时
│   │   ├── Persistence.ts      # 存档系统
│   │   ├── BaseActor.ts        # Actor 基类
│   │   └── ActorAction.ts      # 动作类型
│   ├── render/       # 渲染组件
│   │   ├── StageView.vue       # 舞台视图
│   │   ├── DialogBox.vue       # 对话框
│   │   ├── TypewriterText.vue  # 打字机效果
│   │   ├── ChoicePanel.vue     # 选择面板
│   │   └── AudioManager.ts     # 音频管理器
│   ├── i18n/         # 国际化系统
│   │   ├── I18nManager.ts      # i18n 管理器
│   │   └── VoiceManager.ts     # 语音管理器
│   └── audio.ts, navigation.ts # 全局 API
├── game/            # 游戏内容
│   ├── actors/      # 角色定义
│   ├── scenes/      # 场景脚本
│   ├── ui/          # 游戏界面
│   └── i18n/        # 游戏翻译
├── stores/          # Pinia stores
├── pages/           # 页面组件
└── layouts/         # 布局组件
```

## 文档

- [用户文档](./user/index.md) - 安装、配置、游戏开发指南
- [开发者文档](./developer/index.md) - 架构设计、API 参考、核心系统详解

## 许可证

KosuzuEngine 使用的是MPL-2.0许可证，详情请参阅
[LICENSE](./LICENSE.md)  
您可以内嵌引擎到您的项目 但是您需要开源您修改了的引擎的部分代码，并且保留 KosuzuEngine 的署名。  
任何您使用 KosuzuEngine 开发的游戏内容均归您所有，KosuzuEngine 不会对您的游戏内容拥有任何权利。  
任何您使用 KosuzuEngine 开发的游戏内容均不得违反当地法律法规。  
任何位于games目录下的游戏内容均视为使用KosuzuEngine开发的游戏内容。  
任何您通过动态加载等方式使用KosuzuEngine引擎的行为均视为使用KosuzuEngine开发的游戏内容。  
我们建议您在游戏中显著位置标注“本游戏使用KosuzuEngine引擎开发”。  
如果您对许可证有任何疑问，请联系作者。  

## 参与贡献
我们欢迎任何形式的贡献！无论是代码、文档、测试还是反馈，您的参与都将帮助我们改进 KosuzuEngine。
- 提交 [GitHub Issue](https://github.com/AndreaFrederica/KosuzuEngine/issues) 报告 Bug 或提出功能请求
- 提交 [Pull Request](https://github.com/AndreaFrederica/KosuzuEngine/pulls) 贡献代码
- 参与讨论，暂时可通过加入 ANH（Andrea Novel Helper）的QQ群 （977737943）进行交流
- 编写和改进文档
- 测试新功能并提供反馈
- 分享您的使用经验和项目
- 帮助其他用户解决问题
- 翻译文档
- 宣传 KosuzuEngine
- 捐赠支持项目发展
- 编写教程和示例项目
- 设计图标和界面

## 可能的未来功能
- 可视化脚本编辑器
- 更多内置 UI 组件
- 插件系统
- 支持其他的的脚本语言

## 相关链接

- [GitHub](https://github.com/AndreaFrederica/KosuzuEngine)
- [示例项目](https://github.com/AndreaFrederica/KosuzuEngine)