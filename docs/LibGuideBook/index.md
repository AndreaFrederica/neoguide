# LibGuideBook 文档

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

---

LibGuideBook 是一个交互式指南书籍应用，支持在线创建、编辑和运行操作手册。

## 项目简介

LibGuideBook 是一个基于 Quasar Framework 构建的 Web 应用，让你可以创建包含交互式工具的操作手册。

### 核心特性

- **手册管理**：创建、编辑、删除操作手册
- **步骤式操作**：将复杂流程分解为可执行的步骤
- **交互式工具**：内置计算器、计时器、公式工具
- **子任务支持**：每个步骤可以包含多个子任务
- **数据持久化**：本地存储保存手册数据
- **导入导出**：支持 JSON 格式导入导出

### 适用场景

- 教程制作
- 操作指南编写
- 工作流程指导
- 实验步骤记录
- 任何需要分步执行的流程

## 快速链接

- [用户文档](./user/) - 使用指南
- [开发者文档](./developer/) - 开发和部署说明
- [在线体验](https://guides.sirrus.cc)
- [GitHub 仓库](https://github.com/AndreaFrederica/LibGuideBook)

## 技术栈

- **前端**：Vue 3 + TypeScript + Quasar 2.16
- **状态管理**：Pinia 3.0
- **代码编辑器**：Monaco Editor
- **构建工具**：Vite
- **部署平台**：Cloudflare Workers

## 数据结构

```typescript
// 手册
Manual {
  id: string
  name: string
  description?: string
  tags: string[]
  steps: Step[]
}

// 步骤
Step {
  id: string
  title: string
  content: string
  toolBindings: ToolBinding[]
  todos?: StepTodo[]
  groupId?: string
}

// 工具绑定
ToolBinding {
  id: string
  type: 'timer' | 'calculator' | 'formula'
  config?: Record<string, unknown>
}

// 子任务
StepTodo {
  id: string
  title: string
  description?: string
  done: boolean
  toolBindings?: ToolBinding[]
}
```

## 许可证

开源项目，遵循相关开源许可证。
