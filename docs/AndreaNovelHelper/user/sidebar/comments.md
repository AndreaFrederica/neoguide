# 批注管理

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

批注功能让你在写作时添加批注和备注，支持**批注线程**（多消息讨论）和**自动锚点定位**，批注存储与源文件分离但保持关联。

## 打开批注管理

在 VS Code 左侧活动栏中，点击 **批注图标**（💬 图标），即可打开批注管理面板。

批注管理提供两个视图：
- **侧边栏树视图** (`andrea.commentsExplorer`) - 显示所有文件的批注
- **批注面板** (`andrea.commentsPanelView`) - 当前文档的批注详情和交互界面

## 功能概述

### 批注线程（Thread）

每个批注是一个"线程"，包含：
- **锚点位置** - 批注关联的文本位置（支持多选范围）
- **状态** - `open`（活跃）或 `resolved`（已解决）
- **消息列表** - 支持多消息讨论，每条消息包含作者、时间、内容

### 界面结构

```
📊 批注概览 (75% 已完成)
──────────────────────────────────────
✅ 第一章.md [████████░░] 80%
  ✅ 第15行 (2条消息)
  🔄 第20行 (3条消息)

🟠 第二章.md [██░░░░░░░] 25%
  🔄 第10行 (1条消息)
```

## 添加批注

### 方法一：命令添加

1. 在文档中选中要批注的文本（可选）
2. 使用命令 `Andrea Novel Helper: 添加批注` (`andrea.comments.add`)
3. 输入批注内容
4. 批注会创建到当前选区或光标位置

### 方法二：在批注面板中添加

1. 打开批注面板
2. 点击添加按钮
3. 输入批注内容
4. 批注会关联到当前文档

## 批注状态

| 状态 | 图标 | 说明 |
|------|------|------|
| 活跃 | 🔄 / 💬 | 待处理的批注 |
| 已解决 | ✅ | 已完成的批注 |

### 切换状态

- 使用命令 `Andrea Novel Helper: 解决批注` (`andrea.comments.resolve`)
- 使用命令 `Andrea Novel Helper: 重新打开批注` (`andrea.comments.reopen`)
- 或在树视图中右键点击批注线程切换状态

## 查看批注

### 在树视图中查看

树视图按层级显示：

```
📊 批注概览
  ├─ 统计详情（已解决、待处理、涉及文件、总计）
├─ ──────────────────────────
├─ ✅ 第一章.md [████████░░] 80%
  │  ├─ ✅ 第15行 (2条消息)
  │  │  ├─ 💬 作者A (2小时前): 第一条消息
  │  │  └─ 💬 作者B (1小时前): 回复内容
  │  └─ 🔄 第20行 (3条消息)
```

- 点击文件名 → 展开该文件的所有批注线程
- 点击批注线程 → 展开该线程的所有消息
- 点击消息 → 跳转到批注位置

### 在批注面板中查看

批注面板提供更详细的交互界面：
- 显示当前文档的所有批注
- 支持添加新消息到线程
- 支持编辑和删除批注
- 自动同步编辑器滚动位置

## 搜索和过滤

### 搜索批注

使用命令 `Andrea Novel Helper: 搜索批注` (`andrea.commentsExplorer.search`)：
- 输入关键词搜索批注内容、作者或文件名
- 实时过滤显示匹配结果

### 状态过滤

使用命令 `Andrea Novel Helper: 按状态过滤` (`andrea.commentsExplorer.filterByStatus`)：
| 选项 | 效果 |
|------|------|
| 显示全部 | 显示所有批注 |
| 仅显示活跃批注 | 只显示待处理的批注 |
| 仅显示已解决批注 | 只显示已完成的批注 |

### 清除过滤

使用命令 `Andrea Novel Helper: 清除过滤条件` (`andrea.commentsExplorer.clearFilter`) 清除所有过滤。

## 编辑器装饰

批注会在编辑器中以装饰形式显示：

| 装饰类型 | 说明 |
|----------|------|
| 下划线 | 标识批注关联的文本范围 |
| 高亮背景 | 突出显示批注位置 |
| 侧边栏图标 | 在行号栏显示批注图标 |

装饰样式可在 VS Code 设置中配置（`AndreaNovelHelper.comments` 相关设置）。

## 批注存储

### 存储位置

批注数据存储在项目目录的 `novel-helper/comments/` 下：

```
workspace/
└── novel-helper/
    └── comments/
        ├── data/           # 批注元数据（JSON）
        │   ├── {commentId}.json
        │   └── ...
        ├── content/        # 批注内容（Markdown）
        │   ├── {commentId}.md
        │   ├── {docUuid}.md  # 文档级批注文件
        │   └── ...
        └── {docUuid}.json  # 文档索引
```

### 存储格式

#### JSON 元数据（`data/{commentId}.json`）

```json5
{
  version: '2.0',
  id: 'uuid-v4',
  status: 'open',  // 或 'resolved'
  createdAt: 1234567890,
  updatedAt: 1234567890,
  docUuid: 'document-uuid',
  anchor: {
    ranges: [{ start: { line, character }, end: { line, character } }],
    para: { startIndex, endIndex },
    selTexts: ['选中文本'],
    contexts: [{ before: '前文...', after: '后文...' }]
  },
  contentFile: '{commentId}.md',
  messages: [
    { id: 'msg-id', author: '作者名', body: '批注内容', createdAt: 1234567890 }
  ]
}
```

#### Markdown 内容（`content/{docUuid}.md`）

```markdown
# 注解

## 注解线程 {threadId}

### 消息 {id} - {author} ({timestamp})

**作者**: {author}
**时间**: {timestamp}

批注内容
```

### 文档关联

批注通过 `docUuid`（文档唯一标识符）与源文件关联。即使文件移动或重命名，批注仍能正确关联。

## 批注导出

使用命令 `Andrea Novel Helper: 导出批注` (`andrea.commentsExplorer.exportComments`) 可导出批注数据：

| 格式 | 说明 |
|------|------|
| Markdown | 包含格式化的批注报告 |
| JSON | 结构化数据，可用于进一步处理 |
| 纯文本 | 简单文本格式 |

## 批注迁移

### 迁移单个批注线程

如果文件被移动或重命名，批注可以自动重新关联。

### 迁移整个文档的批注

使用命令 `Andrea Novel Helper: 迁移批注到文档` (`andrea.commentsExplorer.rebindFileToDocument`)：
1. 右键点击文件项
2. 选择迁移命令
3. 选择目标文档
4. 该文档的所有批注会迁移到新文档

## 右键菜单

在树视图中右键点击：

| 位置 | 菜单项 | 说明 |
|------|--------|------|
| 文件项 | 迁移批注到文档 | 将该文件的所有批注迁移到另一个文档 |
| 批注线程 | 切换状态 | 在活跃/已解决之间切换 |
| 批注线程 | 跳转到批注 | 跳转到批注位置 |
| 任意位置 | 刷新 | 重新扫描批注文件 |

## 跳转到定义

在文档中右键点击批注关联的文本，选择 **转到定义** 可以跳转到批注定义。

## 自动同步

### 编辑器滚动同步

- 编辑器滚动 → 批注面板自动更新高亮
- 批注面板点击 → 编辑器跳转到批注位置
- 双向同步，700ms 心跳保底

### 文档变化自动重链

当文档内容变化时，批注会自动尝试重新关联到正确的位置（250ms 防抖）。

## 持久化

批注面板支持 VS Code 的持久化机制：
- 关闭 VS Code 后重新打开，批注面板自动恢复
- 每个文档的批注展开状态会保存
- 最后查看的文档会记住

## 命令列表

| 命令 ID | 说明 |
|---------|------|
| `andrea.comments.open` | 打开批注面板 |
| `andrea.comments.add` | 添加批注 |
| `andrea.comments.resolve` | 解决批注（标记为已解决） |
| `andrea.comments.reopen` | 重新打开批注（标记为活跃） |
| `andrea.commentsExplorer.refresh` | 刷新批注列表 |
| `andrea.commentsExplorer.search` | 搜索批注 |
| `andrea.commentsExplorer.filterByStatus` | 按状态过滤 |
| `andrea.commentsExplorer.clearFilter` | 清除过滤条件 |
| `andrea.commentsExplorer.exportComments` | 导出批注 |
| `andrea.commentsExplorer.exportToMarkdown` | 导出为 Markdown |
| `andrea.commentsExplorer.exportToJson` | 导出为 JSON |

## 常见问题

### 批注没有显示？

1. 确认文件已被文件追踪器追踪（有 docUuid）
2. 尝试刷新批注列表
3. 检查 `novel-helper/comments/` 目录是否存在

### 批注位置不准确？

批注使用锚点定位，支持多选范围和上下文。如果文档有大量修改：
- 批注会尝试自动重新关联
- 可以手动调整批注位置
- 极端情况下可以手动迁移批注

### 如何删除批注？

批注目前使用"软删除"机制：
- 删除的批注会被标记为 `deleted: true`
- 使用垃圾回收命令可物理删除已标记的批注
- 删除操作不可撤销，请谨慎

### 批注可以用于协作吗？

可以。批注存储在项目目录中：
- 可以通过 Git 追踪变更
- 团队成员可以共享和讨论批注
- 支持多作者消息线程

### 如何移动或重命名包含批注的文件？

文件移动后：
- 批注会自动重新关联（基于 docUuid）
- 如果自动关联失败，可以使用迁移命令手动关联

## 相关功能

- [大纲视图](./outline.md) - 编写章节大纲
- [角色管理](./roles.md) - 管理角色设定
- [文件追踪](../getting-started/file-tracking.md) - 文档 UUID 管理
