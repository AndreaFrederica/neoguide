# 包管理器

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

包管理器用于管理小说项目中的角色包、资源文件等。支持外部角色包、拖放操作、智能文件打开等功能。

## 打开包管理器

在 VS Code 左侧活动栏中，点击 **包图标**（📦 图标），即可打开包管理器面板。

## 界面结构

```
🔧 引用维护和热力图
────────────────────────────────────
📁 第一卷/                    # 外部角色包
📁 第二卷/
────────────────────────────────────
📁 novel-helper/
  📄 character-gallery.json5   # 角色库
  📄 main-characters.ojson5    # 角色文件
  📄 relationships.rjson5      # 关系文件
  📄 story-timeline.tjson5     # 时间线文件
  📄 sensitive-words.json5     # 敏感词库
  📄 vocabulary.json5          # 词汇库
  📄 regex-patterns.json5      # 正则表达式库
  📄 roles.md                  # Markdown 角色库
  📁 子文件夹/
    📁 资源图片.png
    📁 资料文档.pdf
```

## 功能概述

### 自动扫描

包管理器会自动扫描：
- `novel-helper` 目录下的所有文件和文件夹
- 项目根目录下的外部角色包（包含 `__init__.ojson5` 的文件夹）
- 支持的文件扩展名：`.json5`, `.ojson5`, `.rjson5`, `.tjson5`, `.txt`, `.md`

### 外部角色包识别

在项目根目录或子目录下，如果文件夹包含 `__init__.ojson5` 文件，会被识别为外部角色包：

```
项目根目录/
├── novel-helper/
├── 第一卷/
│   ├── __init__.ojson5       ← 包标识文件
│   └── characters.json5
├── 第二卷/
│   ├── __init__.ojson5       ← 包标识文件
│   └── characters.json5
└── 角色资料/
    ├── __init__.ojson5       ← 包标识文件
    └── main-roles.ojson5
```

### 排除的目录

默认排除以下目录（可在设置中配置）：
- `.git`, `.vscode`, `.idea`, `node_modules`
- `dist`, `build`, `out`
- `.DS_Store`, `Thumbs.db`
- `novel-helper/outline`, `novel-helper/comments`, `novel-helper/typo`
- `novel-helper/.anh-fsdb`

## 文件类型

| 扩展名 | 类型 | 说明 |
|--------|------|------|
| `.ojson5` | 角色文件 | 专用角色格式，支持角色卡管理器 |
| `.json5` | 角色库 | JSON5 格式的角色集合 |
| `.rjson5` | 关系文件 | 角色关系定义 |
| `.tjson5` | 时间线文件 | 故事时间线配置 |
| `.md` | Markdown | Markdown 格式的角色/敏感词/词汇库 |
| `.txt` | 纯文本 | 一行一个条目，支持注释 |

## 文件和文件夹操作

### 创建文件

#### 创建角色库/敏感词库/词汇库

1. 右键点击 **书籍根目录** 或任意文件夹
2. 选择以下命令之一：
   - **创建角色库** - 创建 `character-gallery.json5`
   - **创建敏感词库** - 创建 `sensitive-words.json5`
   - **创建词汇库** - 创建 `vocabulary.json5`
3. 选择文件格式（json5 / txt / md）
4. 输入基础文件名（留空使用默认名称）
5. 文件自动创建并打开

#### 创建专用文件

| 命令 | 文件类型 | 扩展名 |
|------|----------|--------|
| 创建角色文件 | 角色文件 | `.ojson5` |
| 创建关系文件 | 关系文件 | `.rjson5` |
| 创建时间线文件 | 时间线文件 | `.tjson5` |
| 创建正则表达式库 | 正则表达式 | `.json5` |

#### 创建子文件夹

1. 右键点击父文件夹或 **书籍根目录**
2. 选择 **创建子包**
3. 输入文件夹名称

### 打开文件

| 方式 | 说明 |
|------|------|
| 双击文件 | 根据文件类型和设置选择打开方式 |
| 右键 → 打开文件 | 使用默认方式打开 |
| 右键 → 打开方式 | 选择打开方式 |

#### 智能文件打开

对于 `.json5` 和 `.ojson5` 文件：
- 默认使用**角色卡管理器**打开（可在设置中配置）
- 可设置全局或每文件偏好
- 支持右键快速切换打开方式

### 重命名

#### 文件重命名

支持智能重命名，自动检测文件类型：

1. 右键点击文件
2. 选择 **重命名**
3. 选择文件类型（角色 / 敏感词 / 词汇）
4. 输入自定义名称（留空使用默认名称）
5. 系统自动生成符合规范的文件名

**文件名生成规则**：
- Markdown: `{自定义名称}_角色_角色卡.md` 或使用默认名称
- JSON5/TXT: `{自定义名称}_character-gallery.json5` 或使用默认名称

#### 文件夹重命名

1. 右键点击文件夹
2. 选择 **重命名**
3. 输入新名称

### 删除

1. 右键点击文件或文件夹
2. 选择 **删除**
3. 确认删除操作

> ⚠️ **警告**：删除操作不可撤销，请谨慎操作！

## 复制、剪切和粘贴

包管理器支持剪贴板操作，可以在不同目录间移动文件。

### 复制

1. 右键点击文件或文件夹
2. 选择 **复制**
3. 导航到目标位置
4. 右键选择 **粘贴**

### 剪切

1. 右键点击文件或文件夹
2. 选择 **剪切**
3. 导航到目标位置
4. 右键选择 **粘贴**

### 拖放

支持拖放操作：
- 拖动文件/文件夹到其他目录
- 拖动到外部角色包会弹出确认对话框
- 自动处理文件名冲突

### 文件名冲突处理

粘贴时如果目标位置已有同名文件：
- 自动添加序号：`文件名 (1).扩展名`
- 对于重命名操作，使用时间戳：`文件名_YYYYMMDD_HHmmss.扩展名`

## 普通资源文件

包管理器也支持普通资源文件（不触发角色数据更新）：

| 类型 | 扩展名 | 图标 |
|------|--------|------|
| 图片 | `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.svg`, `.webp` | 📷 |
| 文档 | `.doc`, `.docx`, `.pdf`, `.txt`, `.rtf` | 📄 |
| 网页 | `.html`, `.htm`, `.xml` | 📄 |
| 压缩包 | `.zip`, `.rar`, `.7z`, `.tar`, `.gz` | 📦 |

## 引用维护和热力图

点击面板底部的 **引用维护和热力图** 节点，打开维护面板：

| 选项 | 说明 |
|------|------|
| 清理数据库中的绝对路径 | 扫描所有角色文件，将绝对路径转换为相对路径 |
| 重建角色引用索引 | 重新分析并建立角色之间的引用关系 |
| 打开角色引用热力图 | 可视化查看角色之间的引用关系强度 |

## 展开状态持久化

包管理器会记住文件夹的展开/折叠状态：
- 关闭 VS Code 后重新打开，展开状态自动恢复
- 状态保存在工作区状态中

## 自动刷新

### 文件变化监听

包管理器使用**全局文件追踪系统**监听文件变化：
- 文件创建 → 自动刷新树视图
- 文件修改 → 自动刷新树视图
- 文件删除 → 自动刷新树视图
- 文件重命名 → 自动刷新树视图

### 角色数据更新

当角色相关文件变化时：
- 自动触发角色数据更新（增量或全量）
- 自动触发编辑器装饰更新
- 显示通知提示变化文件名

### 排监听的目录

以下目录变化不会触发刷新：
- `novel-helper/outline` - 大纲目录
- `novel-helper/comments` - 批注目录
- `novel-helper/typo` - 校对目录
- `novel-helper/.anh-fsdb` - 内部数据库

## 右键菜单

### 文件/文件夹菜单

| 菜单项 | 说明 |
|--------|------|
| 打开文件 | 使用默认方式打开 |
| 打开方式 | 选择打开方式 |
| 在文件管理器中显示 | 在系统文件管理器中定位 |
| 重命名 | 重命名文件或文件夹 |
| 创建角色库/敏感词库/词汇库 | 创建新的资源文件 |
| 创建角色文件 | 创建 `.ojson5` 角色文件 |
| 创建关系文件 | 创建 `.rjson5` 关系文件 |
| 创建时间线文件 | 创建 `.tjson5` 时间线文件 |
| 创建正则表达式库 | 创建正则表达式文件 |
| 创建子包 | 创建新文件夹 |
| 复制 | 复制到剪贴板 |
| 剪切 | 剪切到剪贴板 |
| 删除 | 删除文件或文件夹 |

### 角色文件特殊菜单

对于 `.json5` 和 `.ojson5` 文件：
- **切换角色卡管理器打开方式** - 快速切换全局设置

## 配置选项

在 VS Code 设置中搜索 `AndreaNovelHelper`：

### 文件夹扫描

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `externalFolder.ignoredDirectories` | 扫描时忽略的目录列表 | `.git`, `.vscode`, `.idea`, `node_modules`, `dist`, `build`, `out`, `.DS_Store`, `Thumbs.db` |

### 文件打开方式

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `andrea.roleJson5.openWithRoleManager` | 是否使用角色卡管理器打开 JSON5 文件 | `true` |

## 命令列表

| 命令 ID | 说明 |
|---------|------|
| `AndreaNovelHelper.createCharacterGallery` | 创建角色库 |
| `AndreaNovelHelper.createSensitiveWords` | 创建敏感词库 |
| `AndreaNovelHelper.createVocabulary` | 创建词汇库 |
| `AndreaNovelHelper.createRoleFile` | 创建角色文件 (`.ojson5`) |
| `AndreaNovelHelper.createRelationshipFile` | 创建关系文件 (`.rjson5`) |
| `AndreaNovelHelper.createTimelineFile` | 创建时间线文件 (`.tjson5`) |
| `AndreaNovelHelper.createRegexPatterns` | 创建正则表达式库 |
| `AndreaNovelHelper.createSubPackage` | 创建子文件夹 |
| `AndreaNovelHelper.renamePackage` | 重命名文件或文件夹 |
| `AndreaNovelHelper.deleteNode` | 删除文件或文件夹 |
| `AndreaNovelHelper.openFile` | 打开文件 |
| `AndreaNovelHelper.openWith` | 选择打开方式 |
| `AndreaNovelHelper.revealInExplorer` | 在文件管理器中显示 |
| `AndreaNovelHelper.package.copy` | 复制 |
| `AndreaNovelHelper.package.cut` | 剪切 |
| `AndreaNovelHelper.package.paste` | 粘贴 |
| `AndreaNovelHelper.toggleRoleManagerOpenForFile` | 切换角色卡管理器打开方式 |
| `AndreaNovelHelper.showReferenceMaintenance` | 打开引用维护和热力图 |

## 常见问题

### 外部角色包没有显示？

1. 确认文件夹包含 `__init__.ojson5` 文件
2. 检查文件夹是否在忽略列表中
3. 确认文件夹不在 `novel-helper` 目录下
4. 尝试刷新面板

### 文件操作不生效？

1. 检查是否有文件读写权限
2. 尝试刷新面板
3. 查看 VS Code 输出日志

### 如何创建角色包？

1. 在项目根目录或任意位置创建文件夹
2. 在文件夹中创建 `__init__.ojson5` 文件（内容可以为空）
3. 在文件夹中创建角色文件
4. 包会自动出现在包管理器中

### JSON5 文件打开方式不对？

1. 右键点击文件
2. 选择 **切换角色卡管理器打开方式**
3. 或在设置中修改 `andrea.roleJson5.openWithRoleManager`

### 如何排除某个目录不被扫描？

1. 打开 VS Code 设置
2. 搜索 `AndreaNovelHelper.externalFolder.ignoredDirectories`
3. 添加要排除的目录名称

## 相关功能

- [角色管理](./roles.md) - 管理角色设定
- [角色卡片编辑器](../views/role-cards.md) - 可视化编辑角色
- [热力图](../views/heatmap.md) - 角色引用热力图
- [关系图编辑器](../views/relationship-editor.md) - 管理角色关系
- [时间线编辑器](../views/timeline-editor.md) - 管理故事时间线
