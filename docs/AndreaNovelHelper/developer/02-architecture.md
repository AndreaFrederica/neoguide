# 架构设计

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

## 整体架构

Andrea Novel Helper 采用分层架构设计，各层职责清晰，便于维护和扩展。

```
┌─────────────────────────────────────────────────────────┐
│                    VS Code Extension API                 │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐ ┌────────▼────────┐ ┌───────▼────────┐
│  UI Layer      │ │  Provider Layer │ │  Command Layer │
│  - Webview     │ │  - TreeView     │ │  - Commands    │
│  - StatusBar   │ │  - FileSystem   │ │  - Actions     │
└────────────────┘ └─────────────────┘ └────────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐ ┌────────▼────────┐ ┌───────▼────────┐
│  Service Layer │ │  Utility Layer  │ │  Database Layer│
│  - Sync        │ │  - Parser       │ │  - SQLite      │
│  - NameGen     │ │  - Segmenter    │ │  - Migration   │
└────────────────┘ └─────────────────┘ └────────────────┘
```

## 目录结构

```
andrea-novel-helper/
├── src/
│   ├── activate.ts                    # 扩展激活入口
│   ├── extension.ts                   # 核心类型定义
│   │
│   ├── commands/                      # 命令实现
│   │   ├── nameGenerator/            # 名字生成命令
│   │   ├── nameGeneratorCommands.ts  # 名字生成注册
│   │   ├── databaseCommands.ts       # 数据库命令
│   │   ├── relationshipCommands.ts   # 关系管理命令
│   │   ├── typstExport.ts            # Typst 导出
│   │   └── ...
│   │
│   ├── Provider/                      # VS Code 提供器
│   │   ├── editor/                   # 自定义编辑器
│   │   │   ├── RoleJson5EditorProvider.ts
│   │   │   ├── RelationshipJson5EditorProvider.ts
│   │   │   └── TimelineJson5EditorProvider.ts
│   │   ├── fileSystem/               # 文件系统提供器
│   │   │   ├── outlineFSProvider.ts
│   │   │   ├── MemoryOutlineFSProvider.ts
│   │   │   ├── TypstMemoryProvider.ts
│   │   │   └── webdavFileSystemProvider.ts
│   │   ├── view/                     # 视图提供器
│   │   │   ├── wordCountProvider.ts
│   │   │   ├── roleTreeView.ts
│   │   │   ├── webdavTreeView.ts
│   │   │   ├── autoGitTreeView.ts
│   │   │   ├── commentsTreeView.ts
│   │   │   └── ...
│   │   └── utils/                    # 提供器工具
│   │
│   ├── services/                      # 业务服务
│   │   └── nameGeneratorService.ts
│   │
│   ├── utils/                         # 工具函数
│   │   ├── AhoCorasick/              # 多模式匹配
│   │   ├── Git/                      # Git 集成
│   │   ├── Order/                    # 排序管理
│   │   ├── segmenter/                # 中文分词
│   │   ├── tracker/                  # 文件追踪
│   │   ├── WordCount/                # 字数统计
│   │   └── ...
│   │
│   ├── sync/                          # 同步服务
│   │   ├── webdavSync.ts
│   │   ├── autoGitService.ts
│   │   ├── accountManager.ts
│   │   └── webdavSyncStatusManager.ts
│   │
│   ├── database/                      # 数据库层
│   │   ├── IDatabaseBackend.ts
│   │   ├── SQLiteBackend.ts
│   │   ├── JSONBackend.ts
│   │   ├── DatabaseFactory.ts
│   │   └── DatabaseMigration.ts
│   │
│   ├── languageServices/              # 语言服务
│   ├── typeset/                       # 排版功能
│   ├── heatmap/                       # 热力图
│   ├── typo/                          # 错别字检测
│   ├── comments/                      # 批注系统
│   ├── projectConfig/                 # 项目配置
│   ├── roleUsage/                     # 角色引用索引
│   └── ...
│
├── packages/
│   ├── webview/                       # Vue 前端
│   └── enigo-keyboard/                # Rust 键盘模块
│
├── l10n/                              # 国际化
├── templates/                         # 模板
└── ...
```

## 核心组件设计

### 1. 扩展激活流程 (activate.ts)

扩展的激活流程采用分阶段初始化策略：

```typescript
export async function activate(context: vscode.ExtensionContext) {
    // 1. 初始化 i18n
    initI18n(context.extensionPath);

    // 2. 检查工作区禁用状态
    if (workspaceDisabled) return;

    // 3. 注册核心提供器
    registerFileSystemProviders();     // 大纲、Typst、WebDAV

    // 4. 注册编辑器提供器
    registerCustomEditors();           // 角色、关系、时间线

    // 5. 注册排版功能
    registerAutoPairs();
    registerSmartEnter();
    registerFormat();

    // 6. 注册视图提供器
    registerTreeViewProviders();       // 字数、角色、同步等

    // 7. 初始化服务
    initializeServices();              // 同步、追踪等

    // 8. 注册命令
    registerCommands();

    // 9. 启动后台任务
    startBackgroundTasks();
}
```

### 2. 角色系统架构

#### 加载流程
```
loadRoles()
    ↓
扫描角色文件 (JSON5/MD/TXT)
    ↓
批量解析 (分批异步)
    ↓
触发 _onDidChangeRoles 事件
    ↓
重建 AC 自动机
    ↓
刷新装饰和补全
    ↓
触发 _onDidFinishRoles 事件
```

#### 匹配引擎
- **Aho-Corasick 自动机**: 多模式字符串匹配
- **分词过滤**: 避免单字误匹配
- **正则表达式**: 支持复杂模式
- **优先级系统**: 控制匹配顺序

### 3. 大纲系统架构

#### 文件系统抽象
```typescript
// 虚拟文件系统
andrea-outline://outline/outline_dir.md   // 目录大纲
andrea-outline://outline/outline_file.md  // 文件大纲
andrea-typst://typst/document.typst        // Typst 预览
anh-webdav://accountId/path/to/file        // WebDAV 文件
```

#### 内存文件系统提供器
- 使用 `MemoryOutlineFSProvider` 管理大纲内容
- 支持读写操作
- 实时同步编辑器内容

### 4. 字数统计架构

#### 统计流程
```
WordCountProvider
    ↓
遍历文件系统 (递归)
    ↓
解析 .gitignore / .wcignore
    ↓
计算字数 (含标点/不含标点/词计)
    ↓
缓存到 SQLite 数据库
    ↓
构建树视图
```

#### 排序管理
- **自动模式**: 按文件名/时间排序
- **手动模式**: 用户自定义顺序
- **索引分配**: 小数索引系统

### 5. 同步系统架构

#### WebDAV 同步
```
WebDAVSyncService
    ↓
创建 Worker 线程
    ↓
扫描本地文件
    ↓
获取远程文件列表
    ↓
比较文件元数据
    ↓
执行同步操作 (上传/下载/跳过)
    ↓
更新同步时间
```

#### 侧车元数据
```typescript
interface SidecarData {
    uuid: string;              // 文件 UUID
    mtime: number;             // 修改时间
    size: number;              // 文件大小
    hash?: string;             // 内容哈希 (可选)
}
```

### 6. 数据库架构

#### 后端抽象
```typescript
interface IDatabaseBackend {
    get(path: string): Promise<FileMetadata | undefined>;
    set(path: string, meta: FileMetadata): Promise<void>;
    delete(path: string): Promise<void>;
    list(): Promise<string[]>;
}
```

#### 分片存储
- 按文件 UUID 分片
- 懒加载机制
- 自动迁移

### 7. 命令系统架构

#### 命令注册
```typescript
context.subscriptions.push(
    vscode.commands.registerCommand('command.id', handler)
);
```

#### 命令分类
- **视图命令**: 打开/切换视图
- **编辑命令**: 文本操作
- **导航命令**: 跳转/查找
- **配置命令**: 设置管理

## 数据流

### 角色匹配流程
```
用户输入
    ↓
DocumentChange 事件
    ↓
asyncRoleMatcher (Worker 线程)
    ↓
AC 自动机匹配
    ↓
返回匹配结果
    ↓
updateDecorations (主线程)
    ↓
渲染高亮
```

### 文件同步流程
```
文件保存
    ↓
onDidSaveTextDocument 事件
    ↓
检查同步配置
    ↓
触发同步服务
    ↓
WebDAV 同步 / Git 提交
    ↓
更新状态栏
```

## 并发模型

### Worker 线程
- **同步 Worker**: WebDAV 同步操作
- **匹配 Worker**: 角色异步匹配
- **统计 Worker**: 字数统计计算

### 异步处理
```typescript
// 防抖处理
let timer: ReturnType<typeof setTimeout> | undefined;
const scheduleUpdate = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => updateDecorations(), 200);
};
```

## 状态管理

### 全局状态
```typescript
// 全局角色列表
export let roles: Role[] = [];

// 敏感词源文件
export const sensitiveSourceFiles = new Set<string>();

// Hover 范围
export let hoverRanges: { range: vscode.Range; role: Role }[] = [];

// 装饰类型
export let decorationTypes: Map<string, vscode.TextEditorDecorationType>;
```

### 事件系统
```typescript
// 角色列表变更事件
export const _onDidChangeRoles = new vscode.EventEmitter<void>();
export const onDidChangeRoles = _onDidChangeRoles.event;

// 角色加载完成事件
export const _onDidFinishRoles = new vscode.EventEmitter<void>();
export const onDidFinishRoles = _onDidFinishRoles.event;
```

## 扩展点

### 文件系统
- 实现 `vscode.FileSystemProvider` 接口
- 支持自定义 URI scheme

### 编辑器
- 实现 `vscode.CustomTextEditorProvider` 接口
- 支持自定义编辑器视图

### 语言功能
- 实现 `vscode.CompletionItemProvider`
- 实现 `vscode.CodeActionProvider`
- 实现 `vscode.DefinitionProvider`

### 视图
- 实现 `vscode.TreeDataProvider`
- 实现 `vscode.WebviewViewProvider`
