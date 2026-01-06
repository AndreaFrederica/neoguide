# API 参考

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

## 核心接口

### Role 接口

角色对象的核心数据结构。

```typescript
export interface Role {
    /** 插入的主名称 */
    name: string;

    /** 角色类型 */
    type: '主角' | '配角' | '联动角色' | '敏感词' | '词汇' | '正则表达式' | string;

    /** 角色唯一标识符 (UUID v7) */
    uuid?: string;

    /** 从属标签，如所属阵营、组织等 */
    affiliation?: string;

    /** 可选别名数组 */
    aliases?: string[];

    /** 补全列表中显示的简介 */
    description?: string;

    /** 颜色十六进制，如 '#E60033' */
    color?: string;

    /** 是否启用分词过滤，避免单字误匹配 */
    wordSegmentFilter?: boolean;

    /** 角色所在的包路径（相对于 novel-helper 目录） */
    packagePath?: string;

    /** 角色来源文件路径（完整路径） */
    sourcePath?: string;

    /** 正则表达式模式（仅适用于正则表达式角色） */
    regex?: string;

    /** 正则表达式标志，如 'gi' */
    regexFlags?: string;

    /** 着色器优先级（数字越小优先级越高，默认为999） */
    priority?: number;

    /** 敏感词可替换修复候选 */
    fixes?: string[];

    /** 自定义字段 */
    [key: string]: any;
}
```

## 命令 API

### 角色相关命令

#### andrea-novel-helper.generateRandomNames

打开名字生成对话框。

```typescript
vscode.commands.executeCommand('andrea-novel-helper.generateRandomNames');
```

#### AndreaNovelHelper.addRoleFromSelection

从选中文本创建角色。

```typescript
vscode.commands.executeCommand(
    'AndreaNovelHelper.addRoleFromSelection',
    uri?: vscode.Uri
);
```

#### AndreaNovelHelper.refreshRoles

刷新角色列表。

```typescript
vscode.commands.executeCommand('AndreaNovelHelper.refreshRoles');
```

### 大纲相关命令

#### AndreaNovelHelper.openDoubleOutline

打开双重大纲视图。

```typescript
vscode.commands.executeCommand('AndreaNovelHelper.openDoubleOutline');
```

#### AndreaNovelHelper.refreshOutlineDir

刷新目录大纲。

```typescript
vscode.commands.executeCommand('AndreaNovelHelper.refreshOutlineDir');
```

#### AndreaNovelHelper.refreshOutlineFile

刷新文件大纲。

```typescript
vscode.commands.executeCommand('AndreaNovelHelper.refreshOutlineFile');
```

### 字数统计命令

#### AndreaNovelHelper.refreshWordCount

刷新字数统计。

```typescript
vscode.commands.executeCommand('AndreaNovelHelper.refreshWordCount');
```

#### AndreaNovelHelper.wordCount.forceRecountAll

强制重新统计所有文件。

```typescript
vscode.commands.executeCommand('AndreaNovelHelper.wordCount.forceRecountAll');
```

#### AndreaNovelHelper.wordCount.forceRecountHere

强制重新统计当前文件。

```typescript
vscode.commands.executeCommand(
    'AndreaNovelHelper.wordCount.forceRecountHere',
    node?: WordCountItem
);
```

### 同步相关命令

#### andrea.webdav.manageAccounts

管理 WebDAV 账户。

```typescript
vscode.commands.executeCommand('andrea.webdav.manageAccounts');
```

#### andrea.webdav.syncNow

立即执行 WebDAV 同步。

```typescript
vscode.commands.executeCommand('andrea.webdav.syncNow');
```

#### andrea.autoGit.manualCommit

手动执行 Git 提交。

```typescript
vscode.commands.executeCommand('andrea.autoGit.manualCommit');
```

#### andrea.autoGit.manualSync

手动执行 Git 同步。

```typescript
vscode.commands.executeCommand('andrea.autoGit.manualSync');
```

### Typst 相关命令

#### andrea.typst.openPreview

打开 Typst 预览。

```typescript
vscode.commands.executeCommand('andrea.typst.openPreview');
```

#### andrea.typst.refreshTemplates

刷新 Typst 模板列表。

```typescript
vscode.commands.executeCommand('andrea.typst.refreshTemplates');
```

### 排版相关命令

#### andrea.format

格式化当前文档。

```typescript
vscode.commands.executeCommand('andrea.format');
```

#### andrea.quickSettings

打开快速设置。

```typescript
vscode.commands.executeCommand('andrea.quickSettings');
```

## Provider API

### WordCountProvider

字数统计树视图数据提供器。

```typescript
export class WordCountProvider implements vscode.TreeDataProvider<WordCountItem> {
    constructor(
        workspaceState: vscode.Memento,
        orderManager?: WordCountOrderManager
    );

    // 刷新树视图
    refresh(): void;

    // 获取排序管理器
    getOrderManager(): WordCountOrderManager | undefined;

    // 强制重新统计所有文件
    forceRecountAll(): Promise<void>;

    // 强制重新统计指定路径
    forceRecountPath(path: string): Promise<void>;

    // 获取元素
    getChildren(element?: WordCountItem): Promise<WordCountItem[]>;

    // 获取树视图项
    getTreeItem(element: WordCountItem): vscode.TreeItem;
}
```

### OutlineFSProvider

大纲文件系统提供器。

```typescript
export class MemoryOutlineFSProvider implements vscode.FileSystemProvider {
    constructor(rootPath: string);

    // 刷新目录大纲
    refreshDir(): void;

    // 刷新文件大纲
    refreshFile(): void;

    // 获取源文件路径
    getSourceFileFsPath(): string | undefined;

    // FileSystemProvider 接口实现
    watch(uri: vscode.Uri): vscode.Disposable;
    stat(uri: vscode.Uri): vscode.FileStat | Promise<vscode.FileStat>;
    readDirectory(uri: vscode.Uri): [string, vscode.FileType][] | Promise<[string, vscode.FileType][]>;
    readFile(uri: vscode.Uri): Uint8Array | Promise<Uint8Array>;
    writeFile(uri: vscode.Uri, content: Uint8Array, options: { create: boolean; overwrite: boolean; }): void | Promise<void>;
    delete(uri: vscode.Uri): void | Promise<void>;
    rename(oldUri: vscode.Uri, newUri: vscode.Uri, options: { overwrite: boolean; }): void | Promise<void>;
}
```

### WebDAVFileSystemProvider

WebDAV 文件系统提供器。

```typescript
export class WebDAVFileSystemProvider implements vscode.FileSystemProvider {
    constructor(context: vscode.ExtensionContext);

    // FileSystemProvider 接口实现
    watch(uri: vscode.Uri): vscode.Disposable;
    stat(uri: vscode.Uri): vscode.FileStat | Promise<vscode.FileStat>;
    readDirectory(uri: vscode.Uri): [string, vscode.FileType][] | Promise<[string, vscode.FileType][]>;
    readFile(uri: vscode.Uri): Uint8Array | Promise<Uint8Array>;
    writeFile(uri: vscode.Uri, content: Uint8Array, options: { create: boolean; overwrite: boolean; }): void | Promise<void>;
    delete(uri: vscode.Uri): void | Promise<void>;
    rename(oldUri: vscode.Uri, newUri: vscode.Uri, options: { overwrite: boolean; }): void | Promise<void>;
}
```

## Service API

### NameGeneratorService

名字生成服务。

```typescript
export class NameGeneratorService {
    // 生成名字
    async generateNames(options: NameGenerationOptions): Promise<GeneratedName[]>;

    // 获取支持的文化列表
    getSupportedCultures(): CultureInfo[];

    // 获取可用风格列表
    getAvailableStyles(culture: string): string[];

    // 获取统计信息
    getStats(): NameGeneratorStats;

    // 重置统计信息
    resetStats(): void;
}

interface NameGenerationOptions {
    culture: string;
    gender: 'male' | 'female' | 'neutral' | 'any';
    style: string;
    count: number;
    includeSurname: boolean;
}

interface GeneratedName {
    name: string;
    culture: string;
    gender: string;
    style: string;
}

interface CultureInfo {
    code: string;
    displayName: string;
}

interface NameGeneratorStats {
    totalGenerated: number;
    byCulture: Record<string, number>;
    byGender: Record<string, number>;
}
```

### WebDAVSyncService

WebDAV 同步服务。

```typescript
export class WebDAVSyncService {
    constructor(context: vscode.ExtensionContext);

    // 立即同步
    async syncNow(
        direction: SyncDirection,
        customPath?: string,
        progressCallback?: SyncProgressCallback
    ): Promise<void>;

    // 获取文件列表
    async getFileList(accountId: string): Promise<any[]>;

    // 获取文件内容
    async getFileContent(accountId: string, remotePath: string): Promise<string>;

    // 获取目录文件列表
    async getDirectoryFileList(accountId: string, dirPath: string): Promise<any[]>;

    // 设置加密密钥
    async setEncryptionKey(key: string): Promise<void>;

    // 清除加密密钥
    async clearEncryptionKey(): Promise<void>;

    // 释放资源
    dispose(): void;
}

type SyncDirection = 'two-way' | 'push' | 'pull';

interface SyncProgressCallback {
    onProgress?(current: number, total: number, message: string): void;
    onComplete?(success: boolean, message: string): void;
    onError?(error: string): void;
}
```

### AutoGitService

自动 Git 服务。

```typescript
export class AutoGitService {
    constructor(context: vscode.ExtensionContext, rootPath: string);

    // 启动服务
    async start(): Promise<void>;

    // 停止服务
    async stop(): Promise<void>;

    // 手动提交
    async manualCommit(): Promise<void>;

    // 手动同步
    async manualSync(): Promise<void>;

    // 获取状态
    async getStatus(): Promise<AutoGitStatus>;

    // 设置远程仓库
    async setupRemoteRepository(url: string): Promise<void>;

    // 设置 WebDAV 同步服务
    setWebDAVSyncService(service: WebDAVSyncService): void;
}

interface AutoGitStatus {
    enabled: boolean;
    monitorRunning: boolean;
    lastCheck?: Date;
    gitStatus?: {
        hasChanges: boolean;
        branch?: string;
    };
    lastCommit?: {
        message: string;
        date: Date;
    };
}
```

## 事件 API

### 角色相关事件

```typescript
// 角色列表变更事件
export const onDidChangeRoles: vscode.Event<void>;

// 角色加载完成事件
export const onDidFinishRoles: vscode.Event<void>;
```

使用示例：

```typescript
import { onDidChangeRoles, onDidFinishRoles } from 'andrea-novel-helper';

// 监听角色变更
const disposable = onDidChangeRoles(() => {
    console.log('角色列表已更新');
});

// 监听角色加载完成
const disposable2 = onDidFinishRoles(() => {
    console.log('角色加载完成');
});
```

## 工具函数 API

### 角色加载

```typescript
// 加载角色
export async function loadRoles(forceReload: boolean = false): Promise<void>;

// 清空角色列表
export function cleanRoles(): void;

// 设置 Hover 范围
export function setHoverRanges(ranges: { range: vscode.Range; role: Role }[]): void;
```

### AC 自动机

```typescript
// 初始化自动机
export function initAutomaton(): void;

// 查找匹配
export function findMatches(text: string): MatchResult[];

interface MatchResult {
    match: string;
    start: number;
    end: number;
    role: Role;
}
```

### 大纲工具

```typescript
// 判断文件是否为内容文件
function isContentEditor(editor?: vscode.TextEditor): boolean;

// 刷新打开的大纲
export function refreshOpenOutlines(): void;

// 重定向大纲到当前位置
export function redirectOutlineHere(): void;
```

### 文件追踪

```typescript
// 初始化全局文件追踪
export function initializeGlobalFileTracking(
    context: vscode.ExtensionContext
): void;

// 获取所有已追踪文件
export function getAllTrackedFilesAsync(): Promise<FileMetadata[]>;

// 注册文件变更回调
export function registerFileChangeCallback(
    id: string,
    callback: (event: FileChangeEvent) => void
): void;

// 取消注册文件变更回调
export function unregisterFileChangeCallback(
    id: string,
    callback: (event: FileChangeEvent) => void
): void;

interface FileChangeEvent {
    type: 'create' | 'update' | 'delete' | 'rename';
    filePath: string;
    oldPath?: string;
}

interface FileMetadata {
    uuid: string;
    filePath: string;
    fileName: string;
    fileExtension: string;
    size: number;
    mtime: number;
    ctime: number;
    isDirectory: boolean;
}
```

## 配置 API

### 获取配置

```typescript
// 获取扩展配置
const config = vscode.workspace.getConfiguration('AndreaNovelHelper');

// 获取角色文件路径
const rolesFile = config.get<string>('rolesFile');

// 获取大纲路径
const outlinePath = config.get<string>('outlinePath', 'novel-helper/outline');
```

### 监听配置变更

```typescript
context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration('AndreaNovelHelper.rolesFile')) {
            // 处理角色文件配置变更
            loadRoles(true);
        }
    })
);
```

## 类型定义

### WordCountItem

字数统计树视图项。

```typescript
interface WordCountItem extends vscode.TreeItem {
    id: string;
    resourceUri: vscode.Uri;
    collapsibleState: vscode.TreeItemCollapsibleState;
    wordCount?: number;
    wordCountNoPunc?: number;
    wordCountWordBased?: number;
    contextValue?: string;
}
```

### FileChangeEvent

文件变更事件。

```typescript
interface FileChangeEvent {
    type: 'create' | 'update' | 'delete' | 'rename';
    filePath: string;
    oldPath?: string;
}
```

### SyncDirection

同步方向。

```typescript
type SyncDirection = 'two-way' | 'push' | 'pull';
```

### SyncStrategy

同步策略。

```typescript
type SyncStrategy = 'timestamp' | 'size' | 'both' | 'content';
```

### RoleType

角色类型。

```typescript
type RoleType =
    | '主角'
    | '配角'
    | '联动角色'
    | '敏感词'
    | '词汇'
    | '正则表达式';
```

### CommentType

批注类型。

```typescript
type CommentType = 'comment' | 'foreshadowing' | 'todo';
```

### CirclePackingData

圆形堆积图数据。

```typescript
interface CirclePackingData {
    roleReferences: {
        items: CirclePackingItem[];
        totalReferences: number;
    };
    fileTimeline: {
        files: TimelineFile[];
        totalFiles: number;
        totalWordCount: number;
    };
}

interface CirclePackingItem {
    id: string;
    label: string;
    group: string;
    count: number;
    timeSeriesData?: TimeSeriesPoint[];
}

interface TimelineFile {
    id: string;
    label: string;
    order: number;
    wordCount: number;
}

interface TimeSeriesPoint {
    fileIndex: number;
    value: number;
}
```
