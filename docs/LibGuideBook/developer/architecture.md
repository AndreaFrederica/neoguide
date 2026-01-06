# 项目架构

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

---

## 应用架构

LibGuideBook 采用经典的 Vue 3 单页应用架构。

### 核心模块

```
App.vue
    ↓
MainLayout.vue
    ↓
路由 (Vue Router)
    ↓
页面组件
    ├─ ManualListPage.vue   (手册列表)
    ├─ ManualEditorPage.vue (编辑器)
    └─ ManualRunnerPage.vue (运行器)
    ↓
工具组件
    ├─ TimerTool.vue
    ├─ CalculatorTool.vue
    └─ FormulaTool.vue
```

## 状态管理

使用 Pinia 进行全局状态管理。

### manual-store

手册数据管理：

```typescript
interface ManualStore {
  manuals: Manual[]           // 所有手册
  loaded: boolean             // 是否已加载

  // 操作
  load()                      // 从 localStorage 加载
  save()                      // 保存到 localStorage
  createManual()              // 创建新手册
  updateManual()              // 更新手册
  removeManual()              // 删除手册
  addStep()                   // 添加步骤
  updateStep()                // 更新步骤
  removeStep()                // 删除步骤
  addToolBinding()            // 添加工具绑定
  // ... 更多操作
}
```

### run-store

运行状态管理：

```typescript
interface RunStore {
  currentStepIndex: number    // 当前步骤索引
  toolStates: Record<string, unknown>  // 工具状态
  confirmations: Record<string, boolean> // 确认状态
}
```

## 路由配置

```typescript
const routes = [
  { path: '/', component: IndexPage },
  { path: '/manuals', component: ManualListPage },
  { path: '/manuals/:id/edit', component: ManualEditorPage },
  { path: '/manuals/:id/run', component: ManualRunnerPage },
  { path: '/:catchAll(.*)*', component: ErrorNotFound }
]
```

## 工具组件

### TimerTool

计时器组件，支持：
- 秒表模式
- 倒计时模式
- 从公式获取初始值

### CalculatorTool

计算器组件：
- 基础四则运算
- 历史记录
- 清空功能

### FormulaTool

公式工具组件：
- 表达式求值
- JavaScript 代码执行
- 参数配置
- 测试功能

## 工具函数

### math.ts

数学表达式求值：

```typescript
function evaluateExpression(expr: string): number
```

### jsEval.js

JavaScript 代码执行：

```typescript
function runJS(
  code: string,
  params: Record<string, number>,
  output: string,
  context: Record<string, unknown>
): unknown
```

### storage.ts

本地存储封装：

```typescript
function loadManuals<T>(): T | null
function saveManuals(data: unknown): void
```

## 数据流

### 编辑流程

```
用户操作
    ↓
ManualEditorPage.vue
    ↓
manual-store (Pinia)
    ↓
localStorage
```

### 运行流程

```
选择手册
    ↓
ManualRunnerPage.vue
    ↓
run-store (Pinia)
    ↓
工具组件
    ↓
更新状态
```

## 预设系统

预设手册存储在 `src/presets/*.json`：

```json
{
  "id": "preset-xxx",
  "name": "预设手册名称",
  "tags": ["preset"],
  "steps": [...]
}
```

预设手册：
- 应用启动时自动加载
- 不可删除
- 可以覆盖

---

[← 返回开发者文档](./)
