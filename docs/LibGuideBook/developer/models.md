# 数据模型

> **⚠️ 免责声明**：本文档由 **MiniMax-M2.1** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方为准**。

---

本文档介绍 LibGuideBook 的核心数据模型和类型定义。

## 手册结构

### 手册 (Manual)

```typescript
interface Manual {
  id: string;           // 手册唯一标识
  title: string;        // 手册标题
  description: string;  // 手册描述
  steps: Step[];        // 步骤列表
  createdAt: Date;      // 创建时间
  updatedAt: Date;      // 更新时间
}
```

### 步骤 (Step)

```typescript
interface Step {
  id: string;           // 步骤唯一标识
  title: string;        // 步骤标题
  content: string;      // 步骤内容（Markdown）
  tools: Tool[];        // 嵌入的工具
  todos: Todo[];        // 待办事项
  order: number;        // 步骤顺序
}
```

### 待办事项 (Todo)

```typescript
interface Todo {
  id: string;           // 待办唯一标识
  text: string;         // 待办内容
  completed: boolean;   // 完成状态
}
```

### 工具 (Tool)

```typescript
interface Tool {
  id: string;           // 工具唯一标识
  type: ToolType;       // 工具类型
  config: object;       // 工具配置
}
```

## 工具类型

| 类型 | 说明 |
|------|------|
| `timer` | 计时器 |
| `calculator` | 计算器 |
| `formula` | 公式计算 |

## 存储结构

数据存储在浏览器本地存储中，使用 `localStorage` 和 `IndexedDB`。

---

如需了解更多技术细节，请查看源码中的 `src/models/` 目录。
