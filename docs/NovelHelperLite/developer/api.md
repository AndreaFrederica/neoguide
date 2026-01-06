---
title: API 参考
description: NovelHelperLite 扩展开发 API 参考文档
published: 2025-12-02
tags: ["API", "接口", "扩展开发"]
category: 扩展开发
draft: false
lang: "zh_cn"
---

# API 参考

本文档是 NovelHelperLite 扩展开发 API 的完整参考，列出了所有可用于扩展开发的接口、类型定义和事件。通过这些 API，开发者可以创建自定义编辑器插件、扩展应用功能或与外部系统集成。

## 核心 API

### 应用实例

 NovelHelperLite 提供了一个全局的应用实例，通过 `NovelHelper` 命名空间访问。该实例包含了应用的所有核心功能。

```typescript
namespace NovelHelper {
  // 获取应用实例
  const app: NovelHelperInstance;
}
```

### NovelHelperInstance 接口

应用实例实现了 `NovelHelperInstance` 接口，提供了对应用核心功能的访问：

```typescript
interface NovelHelperInstance {
  // 版本信息
  readonly version: string;
  
  // 配置信息
  readonly config: AppConfig;
  
  // 编辑器管理器
  readonly editor: EditorManager;
  
  // 项目管理器
  readonly project: ProjectManager;
  
  // 存储管理器
  readonly storage: StorageManager;
  
  // 主题管理器
  readonly theme: ThemeManager;
  
  // 事件系统
  readonly events: EventSystem;
}
```

## 编辑器 API

### EditorManager

编辑器管理器负责管理所有编辑器实例。

```typescript
interface EditorManager {
  // 获取当前活动的编辑器实例
  getActiveEditor(): EditorInstance | null;
  
  // 获取所有编辑器实例
  getAllEditors(): EditorInstance[];
  
  // 注册新的编辑器类型
  registerEditorType(type: string, factory: EditorFactory): void;
  
  // 创建编辑器实例
  createEditor(options: EditorOptions): Promise<EditorInstance>;
}
```

### EditorInstance

编辑器实例代表一个具体的编辑器，提供编辑操作接口：

```typescript
interface EditorInstance {
  // 编辑器唯一标识
  readonly id: string;
  
  // 编辑器类型
  readonly type: string;
  
  // 编辑器内容
  content: string;
  
  // 编辑器选中区域
  selection: Selection;
  
  // 获取编辑器容器元素
  getContainer(): HTMLElement;
  
  // 设置编辑器内容
  setContent(content: string): void;
  
  // 获取编辑器内容
  getContent(): string;
  
  // 插入文本
  insertText(text: string): void;
  
  // 删除选中区域
  deleteSelection(): void;
  
  // 设置选中区域
  setSelection(selection: Selection): void;
  
  // 获取选中区域
  getSelection(): Selection;
  
  // 撤销操作
  undo(): void;
  
  // 重做操作
  redo(): void;
  
  // 格式化文档
  format(): void;
  
  // 添加事件监听
  on(event: string, handler: Function): void;
  
  // 移除事件监听
  off(event: string, handler: Function): void;
}
```

### Selection 接口

```typescript
interface Selection {
  // 起始位置
  start: Position;
  
  // 结束位置
  end: Position;
  
  // 选中文本
  text: string;
}
```

### Position 接口

```typescript
interface Position {
  // 行号（从 0 开始）
  line: number;
  
  // 列号（从 0 开始）
  column: number;
  
  // 偏移量（从 0 开始）
  offset: number;
}
```

## 项目 API

### ProjectManager

项目管理器负责项目的创建、加载和保存。

```typescript
interface ProjectManager {
  // 当前打开的项目
  readonly currentProject: Project | null;
  
  // 所有项目列表
  readonly projects: Project[];
  
  // 创建新项目
  createProject(options: ProjectOptions): Promise<Project>;
  
  // 打开项目
  openProject(projectId: string): Promise<Project>;
  
  // 保存项目
  saveProject(project?: Project): Promise<void>;
  
  // 关闭项目
  closeProject(project?: Project): Promise<void>;
  
  // 删除项目
  deleteProject(projectId: string): Promise<void>;
  
  // 导出项目
  exportProject(project: Project, format: string): Promise<Blob>;
  
  // 导入项目
  importProject(data: Blob): Promise<Project>;
}
```

### Project 接口

```typescript
interface Project {
  // 项目唯一标识
  readonly id: string;
  
  // 项目名称
  name: string;
  
  // 项目描述
  description: string;
  
  // 项目创建时间
  readonly createdAt: Date;
  
  // 项目最后修改时间
  readonly updatedAt: Date;
  
  // 项目文档列表
  documents: Document[];
  
  // 项目设置
  settings: ProjectSettings;
  
  // 添加文档
  addDocument(document: Document): void;
  
  // 移除文档
  removeDocument(documentId: string): void;
  
  // 获取文档
  getDocument(documentId: string): Document | undefined;
  
  // 更新设置
  updateSettings(settings: Partial<ProjectSettings>): void;
}
```

### Document 接口

```typescript
interface Document {
  // 文档唯一标识
  readonly id: string;
  
  // 文档标题
  title: string;
  
  // 文档内容
  content: string;
  
  // 文档类型
  type: DocumentType;
  
  // 文档元数据
  metadata: DocumentMetadata;
  
  // 保存文档
  save(): Promise<void>;
  
  // 重命名
  rename(newTitle: string): void;
}
```

## 存储 API

### StorageManager

存储管理器提供数据的持久化存储接口。

```typescript
interface StorageManager {
  // 存储键值对
  set(key: string, value: any): Promise<void>;
  
  // 获取存储的值
  get(key: string): Promise<any>;
  
  // 删除存储的值
  remove(key: string): Promise<void>;
  
  // 清空所有存储
  clear(): Promise<void>;
  
  // 获取所有键
  keys(): Promise<string[]>;
  
  // 批量存储
  setBatch(items: Record<string, any>): Promise<void>;
  
  // 批量获取
  getBatch(keys: string[]): Promise<Record<string, any>>;
}
```

## 主题 API

### ThemeManager

主题管理器负责应用主题的切换和管理。

```typescript
interface ThemeManager {
  // 当前主题
  readonly currentTheme: Theme;
  
  // 所有可用主题
  readonly themes: Theme[];
  
  // 设置主题
  setTheme(themeName: string): void;
  
  // 注册主题
  registerTheme(theme: Theme): void;
  
  // 删除主题
  unregisterTheme(themeName: string): void;
  
  // 监听主题变化
  onThemeChange(handler: (theme: Theme) => void): void;
}
```

### Theme 接口

```typescript
interface Theme {
  // 主题名称
  name: string;
  
  // 主题显示名称
  displayName: string;
  
  // 主题类型
  type: 'light' | 'dark' | 'custom';
  
  // 主题颜色配置
  colors: ThemeColors;
  
  // 是否为默认主题
  isDefault: boolean;
}
```

## 事件系统

### EventSystem

事件系统提供了组件间和模块间的通信机制。

```typescript
interface EventSystem {
  // 发布事件
  emit(event: string, payload?: any): void;
  
  // 订阅事件
  on(event: string, handler: EventHandler): void;
  
  // 取消订阅
  off(event: string, handler?: EventHandler): void;
  
  // 只订阅一次
  once(event: string, handler: EventHandler): void;
  
  // 订阅匹配的事件
  onAny(handler: (event: string, payload: any) => void): void;
}
```

### 预定义事件

应用定义了以下预定义事件：

| 事件名称 | 描述 | 载荷类型 |
|---------|------|---------|
| `app:ready` | 应用准备就绪 | 无 |
| `app:shutdown` | 应用关闭 | 无 |
| `project:created` | 项目创建 | `Project` |
| `project:opened` | 项目打开 | `Project` |
| `project:saved` | 项目保存 | `Project` |
| `project:closed` | 项目关闭 | `Project` |
| `document:created` | 文档创建 | `Document` |
| `document:opened` | 文档打开 | `Document` |
| `document:saved` | 文档保存 | `Document` |
| `document:closed` | 文档关闭 | `Document` |
| `editor:changed` | 编辑器切换 | `EditorInstance` |
| `theme:changed` | 主题切换 | `Theme` |

## 扩展点 API

### ExtensionPoint

应用提供了多个扩展点，允许插件扩展应用功能：

```typescript
interface ExtensionPoint {
  // 注册编辑器插件
  registerEditorPlugin(plugin: EditorPlugin): void;
  
  // 注册工具栏按钮
  registerToolbarButton(button: ToolbarButton): void;
  
  // 注册菜单项
  registerMenuItem(item: MenuItem): void;
  
  // 注册快捷键
  registerShortcut(shortcut: Shortcut): void;
  
  // 注册设置面板
  registerSettingsPanel(panel: SettingsPanel): void;
}
```

---

*最后更新：2025年12月*
