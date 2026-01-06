# 核心功能模块

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

## 角色系统

### 角色定义 (Role)

核心数据结构定义在 `src/extension.ts`:

```typescript
export interface Role {
    name: string;                    // 插入的主名称
    type: string;                    // 类型
    uuid?: string;                   // 唯一标识符 (UUID v7)
    affiliation?: string;            // 从属标签
    aliases?: string[];              // 可选别名数组
    description?: string;            // 补全列表中显示的简介
    color?: string;                  // 颜色十六进制
    wordSegmentFilter?: boolean;     // 是否启用分词过滤
    packagePath?: string;            // 角色所在的包路径
    sourcePath?: string;             // 角色来源文件路径
    regex?: string;                  // 正则表达式模式
    regexFlags?: string;             // 正则表达式标志
    priority?: number;               // 着色器优先级
    fixes?: string[];                // 敏感词修复候选
    [key: string]: any;              // 自定义字段
}
```

### 角色类型

| 类型 | 说明 | 颜色 |
|------|------|------|
| 主角 | 主要角色 | #E60033 |
| 配角 | 次要角色 | #FF9500 |
| 联动角色 | 跨作品角色 | #AF52DE |
| 敏感词 | 需要标记的词汇 | #FF0000 |
| 词汇 | 普通词汇 | #007AFF |
| 正则表达式 | 正则模式匹配 | #5856D6 |

### 角色加载器

**文件位置**: `src/utils/utils.ts`

```typescript
export async function loadRoles(forceReload: boolean = false): Promise<void>
```

**加载流程**:
1. 扫描 `rolesFile` 配置指定的目录
2. 识别 `.json5`, `.md`, `.txt` 文件
3. 分批解析文件内容
4. 触发 `_onDidChangeRoles` 事件
5. 重建 AC 自动机
6. 触发 `_onDidFinishRoles` 事件

### AC 自动机匹配

**文件位置**: `src/utils/AhoCorasick/`

用于多模式字符串匹配，支持：
- 大量关键词同时匹配
- 时间复杂度 O(n + m)
- 支持别名匹配

```typescript
// 初始化自动机
export function initAutomaton(): void

// 查找匹配
export function findMatches(text: string): MatchResult[]
```

### 分词过滤

**文件位置**: `src/utils/segmentFilter.ts`

避免单字误匹配：

```typescript
export function shouldFilterBySegment(
    text: string,
    keyword: string
): boolean
```

使用 `Intl.Segmenter` 进行中文分词：
```typescript
export const segmenter = new Intl.Segmenter('zh', {
    granularity: 'word'
});
```

## 大纲系统

### 大纲文件系统提供器

**文件位置**: `src/Provider/fileSystem/MemoryOutlineFSProvider.ts`

#### 目录大纲

虚拟文件路径：`andrea-outline://outline/outline_dir.md`

功能：
- 显示项目所有章节文件
- 支持文件夹层级结构
- 可点击导航

#### 文件大纲

虚拟文件路径：`andrea-outline://outline/outline_file.md`

功能：
- 解析当前文档的标题结构
- 支持多种标题格式（Markdown #, Txt ===等）
- 实时同步编辑器内容

### 大纲刷新机制

**文件位置**: `src/events/refreshOpenOutlines.ts`

```typescript
export function refreshOpenOutlines(): void
```

刷新条件：
- 切换编辑器
- 保存文档
- 轮询检查（1000ms间隔）

懒加载模式：
- 配置项：`AndreaNovelHelper.outline.lazyMode`
- 仅当大纲可见时才刷新

## 字数统计系统

### 字数提供器

**文件位置**: `src/Provider/view/wordCountProvider.ts`

```typescript
export class WordCountProvider implements vscode.TreeDataProvider<WordCountItem>
```

#### 统计方式

| 方式 | 说明 |
|------|------|
| 含标点 | 包含所有标点符号 |
| 不含标点 | 排除标点符号 |
| 词计 | 基于分词的词汇数 |

#### 忽略规则

支持 `.gitignore` 和 `.wcignore` 文件：
```gitignore
# 忽略 node_modules 目录
node_modules/

# 忽略特定文件
draft.txt
```

### 排序管理

**文件位置**: `src/utils/Order/wordCountOrder.ts`

```typescript
export class WordCountOrderManager {
    // 启用/禁用手动排序
    toggleManual(dir: string): boolean

    // 获取索引
    getIndex(path: string): number | undefined

    // 设置索引
    setIndex(path: string, index: number): void

    // 分配索引（用于插入）
    allocateBetween(dir: string, before?: number, after?: number): number
}
```

#### 排序模式

**自动模式**:
- 按文件名排序
- 按修改时间排序
- 按创建时间排序

**手动模式**:
- 使用小数索引系统
- 默认步长：10
- 支持中间插入

### 拖拽排序

实现 `vscode.TreeDragAndDropController` 接口：

```typescript
const dndController: vscode.TreeDragAndDropController<any> = {
    dragMimeTypes: ['application/vnd.andrea.wordcount.item'],
    dropMimeTypes: ['application/vnd.andrea.wordcount.item'],
    async handleDrag(source, data) { /* ... */ },
    async handleDrop(target, data) { /* ... */ }
};
```

## 排版辅助系统

### 智能回车

**文件位置**: `src/typeset/smartEnter.ts`

#### 功能

- 自动处理段落换行
- 智能缩进管理
- 对话格式识别

#### 与 Markdown All in One 集成

```typescript
export function forwardEnterToMaioOrNative(): void {
    if (hasMaioAvailability()) {
        // 转发给 MAIO
        vscode.commands.executeCommand('markdown.extension.onEnterKey');
    } else {
        // 使用原生回车
        vscode.commands.executeCommand('type', { source: 'keyboard', text: '\n' });
    }
}
```

### 智能括号

**文件位置**: `src/typeset/autoPairs.ts`

#### 配置

```typescript
interface PairsConfig {
    pairs: Map<string, string>;     // 符号对映射
    strictMode: boolean;             // 严格模式
    autoClose: boolean;              // 自动闭合
}
```

#### 默认符号对

| 左符号 | 右符号 |
|--------|--------|
| 「 | 」 |
| 『 | 』 |
| " | " |
| ' | ' |
| （ | ） |
| 《 | 》 |

### 格式化

**文件位置**: `src/typeset/format.ts`

```typescript
export async function formatDocument(
    document: vscode.TextDocument
): Promise<void>
```

功能：
- 段间自动空行
- 段首段尾标点处理
- 对话格式调整

## 同步系统

### WebDAV 同步

**文件位置**: `src/sync/webdavSync.ts`

#### 同步服务

```typescript
export class WebDAVSyncService {
    // 立即同步
    async syncNow(
        direction: SyncDirection,
        customPath?: string,
        progressCallback?: SyncProgressCallback
    ): Promise<void>

    // 获取文件列表
    async getFileList(accountId: string): Promise<any[]>

    // 获取文件内容
    async getFileContent(accountId: string, remotePath: string): Promise<string>
}
```

#### 同步方向

| 方向 | 说明 |
|------|------|
| two-way | 双向同步（较新者覆盖） |
| push | 仅推送（本地覆盖远端） |
| pull | 仅拉取（远端覆盖本地） |

#### 同步策略

```typescript
type SyncStrategy = 'timestamp' | 'size' | 'both' | 'content';
```

- **timestamp**: 基于修改时间
- **size**: 基于文件大小
- **both**: 同时考虑时间和大小
- **content**: 基于内容哈希

#### 侧车元数据

用于增强同步准确性：

```typescript
interface SidecarData {
    uuid: string;              // 文件 UUID
    mtime: number;             // 修改时间
    size: number;              // 文件大小
    hash?: string;             // 内容哈希
}
```

### AutoGit

**文件位置**: `src/sync/autoGitService.ts`

#### 自动提交

```typescript
export class AutoGitService {
    // 启动服务
    async start(): Promise<void>

    // 手动提交
    async manualCommit(): Promise<void>

    // 手动同步
    async manualSync(): Promise<void>

    // 设置远程仓库
    async setupRemoteRepository(url: string): Promise<void>
}
```

#### 与 WebDAV 联动

```typescript
autoGitService.setWebDAVSyncService(webdavSyncService);
```

同步顺序：
1. Git 提交本地变更
2. Git 推送到远程
3. WebDAV 同步到云端

## 名字生成器

### 名字生成服务

**文件位置**: `src/services/nameGeneratorService.ts`

```typescript
export class NameGeneratorService {
    // 生成名字
    async generateNames(options: NameGenerationOptions): Promise<GeneratedName[]>

    // 获取支持的文化
    getSupportedCultures(): CultureInfo[]

    // 获取可用风格
    getAvailableStyles(culture: string): string[]

    // 获取统计信息
    getStats(): NameGeneratorStats
}
```

### 支持的文化

| 代码 | 名称 |
|------|------|
| zh_CN | 简体中文 |
| zh_TW | 繁體中文 |
| en_US | English (US) |
| ja | 日本語 |
| ko | 한국어 |
| fantasy | Fantasy |

### 生成选项

```typescript
interface NameGenerationOptions {
    culture: string;           // 文化背景
    gender: 'male' | 'female' | 'neutral' | 'any';
    style: string;             // 风格
    count: number;             // 数量 (1-50)
    includeSurname: boolean;   // 是否包含姓氏
}
```

## Typst 集成

### Typst 内存提供器

**文件位置**: `src/Provider/fileSystem/TypstMemoryProvider.ts`

```typescript
export class TypstMemoryProvider {
    // 更新文档内容
    updateDocument(uri: vscode.Uri, content: string): void

    // 获取文档内容
    getDocument(uri: vscode.Uri): string | undefined
}
```

### Typst 预览

**文件位置**: `src/commands/typstPreview.ts`

```typescript
export function registerTypstPreviewCommands(
    context: vscode.ExtensionContext,
    typstFS: TypstMemoryProvider,
    log: (msg: string, err?: any) => void
): void
```

功能：
- 实时预览 Typst 文档
- 模板系统支持
- 导出为 PDF

### 模板注册表

**文件位置**: `src/typst/templateRegistry.ts`

```typescript
export class TemplateRegistry {
    // 初始化模板
    init(context: vscode.ExtensionContext): void

    // 获取模板
    getTemplate(name: string): Template | undefined

    // 扫描模板
    scan(): void
}
```

## 批注系统

### 批注控制器

**文件位置**: `src/comments/controller.ts`

```typescript
export function registerCommentsFeature(
    context: vscode.ExtensionContext
): CommentsController
```

### 批注类型

```typescript
type CommentType =
    | 'comment'        // 普通批注
    | 'foreshadowing'  // 伏笔
    | 'todo';          // 待办
```

### 批注存储

支持多种存储方式：
- Markdown Frontmatter
- 独立 JSON 文件
- 数据库存储

## 错别字检测

### 错别字服务

**文件位置**: `src/typo/typoService.ts`

```typescript
export function registerTypoFeature(
    context: vscode.ExtensionContext
): void
```

### 检测类型

- 同音字检测
- 形近字检测
- 常见错误模式

### 快速修复

实现 `vscode.CodeActionProvider` 接口：

```typescript
export class TypoCodeActionProvider implements vscode.CodeActionProvider {
    provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range
    ): vscode.CodeAction[]
}
```

## 数据可视化

### 热力图

**文件位置**: `src/heatmap/heatmapProvider.ts`

```typescript
export function activateHeatmap(
    context: vscode.ExtensionContext,
    dataProvider: ICirclePackingDataProvider
): void
```

### 圆形堆积图

**文件位置**: `src/data/circlePackingDataProvider.ts`

```typescript
export function createCirclePackingDataProvider(
    roles: Role[],
    wordCountProvider: WordCountProvider
): ICirclePackingDataProvider
```

数据类型：
- 角色引用数据
- 文件时间线数据
- 完整数据集

## 文件追踪系统

### 全局文件追踪

**文件位置**: `src/utils/tracker/globalFileTracking.ts`

```typescript
// 初始化
export function initializeGlobalFileTracking(
    context: vscode.ExtensionContext
): void

// 获取已追踪文件
export function getAllTrackedFilesAsync(): Promise<FileMetadata[]>

// 注册变更回调
export function registerFileChangeCallback(
    id: string,
    callback: (event: FileChangeEvent) => void
): void
```

### 文件元数据

```typescript
interface FileMetadata {
    uuid: string;              // 唯一标识符
    filePath: string;          // 文件路径
    fileName: string;          // 文件名
    fileExtension: string;     // 扩展名
    size: number;              // 文件大小
    mtime: number;             // 修改时间
    ctime: number;             // 创建时间
    isDirectory: boolean;      // 是否目录
}
```

### 分片存储

数据库按 UUID 分片存储：
- 每个分片最多 1000 个文件
- 懒加载机制
- 自动合并小分片
