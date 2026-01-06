# 时间线编辑器

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

时间线编辑器用于管理和可视化故事的时间线。支持事件、连接、嵌套节点、角色和文章绑定等高级功能。

## 打开方式

### 方法一：从包管理器打开（推荐）

1. 在 VS Code 左侧活动栏中点击 **包图标**（📦）
2. 在包管理器中找到时间线文件：
   - `.tjson5` 文件（如 `story-timeline.tjson5`）
3. **双击文件**即可用时间线编辑器打开

> 双击 `.tjson5` 文件会自动使用时间线编辑器打开。

### 方法二：双击文件

在文件资源管理器中双击 `.tjson5` 文件，会自动使用时间线编辑器打开。

### 方法三：命令面板

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 `Andrea Novel Helper: 打开时间线编辑器`
3. 编辑器会在新列中打开

## 支持的文件格式

| 扩展名 | 类型 | 说明 |
|--------|------|------|
| `.tjson5` | 时间线文件 | 专用时间线格式 |

## 数据格式

### 完整数据结构

```json5
{
  events: [...],
  connections: [...]
}
```

### 事件 (Event)

每个事件包含以下字段：

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 事件唯一标识符 |
| `title` | string | ✅ | 事件标题 |
| `group` | string | ✅ | 事件所属组 |
| `type` | string | ✅ | 事件类型：`main`（主线）/ `side`（支线） |
| `date` | string | ✅ | 事件日期 |
| `endDate` | string | ❌ | 结束日期（用于时间区间） |
| `description` | string | ✅ | 事件描述 |
| `timeless` | boolean | ❌ | 是否为无时间事件 |
| `position` | object | ❌ | 自定义位置 `{x, y}` |
| `bindings` | array | ❌ | 绑定的资源（角色/文章/地点/物品） |
| `color` | string | ❌ | 节点颜色（支持 hex、rgb、rgba 等 CSS 颜色） |
| `data.type` | string | ❌ | 节点数据类型：`main` / `side` / `condition` |
| `parentNode` | string | ❌ | 父节点 ID（用于嵌套） |
| `width` | number | ❌ | 节点宽度（仅对父节点有效） |
| `height` | number | ❌ | 节点高度（仅对父节点有效） |
| `extent` | string | ❌ | 设置为 `'parent'` 限制子节点在父节点内移动 |
| `expandParent` | boolean | ❌ | 拖动子节点时自动扩展父节点 |

### 事件示例

```json5
{
  id: "event-1",
  title: "初遇",
  group: "第一章",
  type: "main",
  date: "2024-01-01",
  endDate: "2024-01-02",
  description: "主角首次相遇",
  timeless: false,
  position: { x: 100, y: 200 },
  bindings: [
    { uuid: "role-123", type: "character", label: "主角" },
    { uuid: "article-456", type: "article", documentTitle: "第一章.md" }
  ],
  color: "#E60033"
}
```

### 连接 (Connection)

每个连接包含以下字段：

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 连接唯一标识符 |
| `source` | string | ✅ | 源节点 ID |
| `target` | string | ✅ | 目标节点 ID |
| `sourceHandle` | string | ❌ | 源节点手柄 ID（如条件节点的 `'true'` 或 `'false'`） |
| `targetHandle` | string | ❌ | 目标节点手柄 ID |
| `label` | string | ❌ | 连接标签 |
| `connectionType` | string | ❌ | 连接类型 |

### 连接类型

| 类型 | 说明 |
|------|------|
| `normal` | 普通连接 |
| `time-travel` | 时间旅行 |
| `reincarnation` | 转世 |
| `parallel` | 平行世界 |
| `dream` | 梦境 |
| `flashback` | 闪回 |
| `other` | 其他 |

### 连接示例

```json5
{
  id: "conn-1",
  source: "event-1",
  target: "event-2",
  sourceHandle: "true",
  label: "导致",
  connectionType: "flashback"
}
```

### 绑定 (Binding)

绑定可以将事件与资源关联：

| 类型 | 说明 |
|------|------|
| `character` | 角色 |
| `article` | 文章/章节 |
| `location` | 地点 |
| `item` | 物品 |
| `other` | 其他 |

## 界面功能

### 时间线画布

- 可视化显示事件和连接
- 支持缩放和平移
- 拖拽节点调整位置
- 实时数据同步

### 节点操作

| 操作 | 说明 |
|------|------|
| 添加节点 | 点击添加按钮或拖拽创建 |
| 编辑节点 | 双击节点或右键编辑 |
| 删除节点 | 选中后按 Delete 或右键删除 |
| 连接节点 | 从一个节点拖拽到另一个节点 |
| 断开连接 | 选中连接后按 Delete |
| 嵌套节点 | 将节点拖入父节点 |

### 资源绑定

| 功能 | 说明 |
|------|------|
| 绑定角色 | 从角色列表中选择并绑定 |
| 绑定文章 | 从文章列表中选择并绑定 |
| 查看绑定 | 悬停显示所有绑定 |
| 跳转到定义 | 点击绑定的资源跳转 |

### 条件节点

- 类型设置为 `condition`
- 有两个输出手柄：`true` 和 `false`
- 用于表示分支剧情

### 嵌套节点

- 设置 `parentNode` 将节点嵌套到父节点
- `extent: 'parent'` 限制子节点在父节点内
- `expandParent: true` 拖动子节点时自动扩展父节点

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Delete` | 删除选中的节点或连接 |
| `Ctrl+Z` | 撤销 |
| `Ctrl+Y` / `Ctrl+Shift+Z` | 重做 |
| `Ctrl+S` | 保存 |
| `Ctrl+鼠标滚轮` | 缩放 |
| `空格+拖拽` | 平移画布 |

## 高级功能

### 时间区间

使用 `date` 和 `endDate` 表示持续一段时间的事件：

```json5
{
  id: "event-long",
  title: "旅程",
  date: "2024-01-01",
  endDate: "2024-01-31"
}
```

### 无时间事件

设置 `timeless: true` 表示不在时间线上的事件（如背景设定）。

### 条件分支

使用条件节点表示分支剧情：

```json5
{
  id: "choice-1",
  title: "选择",
  type: "condition",
  data: { type: "condition" }
}
```

连接时使用 `sourceHandle`：
- `sourceHandle: "true"` - 条件为真的分支
- `sourceHandle: "false"` - 条件为假的分支

### 特殊连接类型

使用 `connectionType` 表示特殊的时间关系：

```json5
{
  id: "conn-flashback",
  source: "current-event",
  target: "past-event",
  connectionType: "flashback",
  label: "回忆"
}
```

## 数据同步

### 实时同步

- 编辑器中的更改实时同步到文件
- 文件更改实时反映到编辑器
- 自动触发 VS Code 的 dirty 状态

### 自动保存

根据 VS Code 的自动保存设置：
- `on` - 自动保存模式
- `off` - 手动保存模式

### 手动保存

- 按 `Ctrl+S` 保存
- 或点击保存按钮

## 资源集成

### 角色集成

- 从全局角色库中选择
- 显示角色颜色和类型
- 支持跳转到角色定义

### 文章集成

- 从文件追踪系统获取文章列表
- 支持 `.md` 和 `.txt` 文件
- 排除大纲文件和 `novel-helper` 目录

### 跳转功能

| 跳转类型 | 说明 |
|----------|------|
| 跳转到角色 | 打开角色定义文件 |
| 跳转到文章 | 打开文章文件 |

## 常见问题

### 如何创建时间区间？

设置 `date` 和 `endDate` 字段：

```json5
{
  date: "2024-01-01",
  endDate: "2024-01-31"
}
```

### 如何创建分支剧情？

1. 创建条件节点（`type: "condition"`）
2. 使用 `sourceHandle: "true"` 或 `"false"` 连接
3. 为连接设置标签说明条件

### 如何嵌套节点？

1. 创建父节点（设置 `width` 和 `height`）
2. 设置子节点的 `parentNode` 为父节点 ID
3. 可选：设置 `extent: "parent"` 限制移动范围

### 如何自定义节点颜色？

设置 `color` 字段：

```json5
{
  color: "#E60033"
}
```

### 绑定的文章找不到？

- 确保文章已被文件追踪系统追踪
- 文件必须是 `.md` 或 `.txt` 格式
- 排除 `novel-helper` 目录下的文件

## 相关功能

- [角色管理](../sidebar/roles.md) - 管理角色定义
- [关系图编辑器](./relationship-editor.md) - 管理角色关系
- [文件追踪](../getting-started/file-tracking.md) - 文档 UUID 管理
