---
title: 扩展开发指南
description: 学习如何开发 NovelHelperLite 编辑器扩展和插件
published: 2025-12-02
tags: ["扩展", "插件", "开发指南"]
category: 扩展开发
draft: false
lang: "zh_cn"
---

# 扩展开发指南

本文档将指导您如何为 NovelHelperLite 开发自定义扩展。通过扩展机制，您可以添加新的编辑器功能、集成外部服务、创建自定义工具栏按钮等。扩展开发采用插件化架构，使得功能模块化、易于维护和分发。

## 扩展架构概述

NovelHelperLite 的扩展系统采用插件化架构设计。扩展是一个独立的 JavaScript/TypeScript 模块，通过定义好的接口与应用进行交互。应用在启动时加载注册的扩展，扩展根据其类型获得相应的能力和权限。

扩展系统基于以下核心概念构建：**扩展清单（Extension Manifest）**定义了扩展的元信息和能力声明；**扩展上下文（Extension Context）**提供了扩展与应用交互的接口；**生命周期钩子（Lifecycle Hooks）**允许扩展在应用的不同阶段执行特定逻辑。

## 创建扩展项目

### 项目结构

一个标准的扩展项目具有以下结构：

```
my-extension/
├── package.json           # 项目配置
├── src/
│   ├── index.ts           # 扩展入口
│   ├── manifest.ts        # 扩展清单
│   └── ...                # 其他源文件
├── dist/                  # 构建输出
└── README.md              # 说明文档
```

### package.json 配置

扩展的 `package.json` 应包含以下关键配置：

```json
{
  "name": "my-novel-extension",
  "version": "1.0.0",
  "description": "我的 NovelHelperLite 扩展",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "engines": {
    "novelhelper": ">=1.0.0"
  },
  "peerDependencies": {
    "vue": "^3.0.0"
  }
}
```

### 扩展清单

每个扩展必须提供一个扩展清单，声明扩展的元信息和能力：

```typescript
// src/manifest.ts
import { ExtensionManifest } from '@novel-helper/core';

export const manifest: ExtensionManifest = {
  // 扩展唯一标识（推荐使用反向域名格式）
  id: 'com.example.my-extension',
  
  // 扩展名称
  name: '我的扩展',
  
  // 版本号
  version: '1.0.0',
  
  // 描述
  description: '这是一个示例扩展',
  
  // 作者信息
  author: {
    name: '开发者姓名',
    email: 'developer@example.com'
  },
  
  // 扩展类型
  type: 'editor-plugin',
  
  // 能力声明
  capabilities: [
    'editor',
    'toolbar',
    'menu'
  ],
  
  // 入口文件
  main: 'index.js',
  
  // 资源文件
  resources: [
    'assets/**/*'
  ],
  
  // 依赖的扩展（可选）
  dependencies: [],
  
  // 兼容性声明
  engines: {
    novelhelper: '>=1.0.0'
  },
  
  // 许可证
  license: 'MIT'
};
```

## 开发编辑器插件

### 基础结构

编辑器插件是最常见的扩展类型，它为编辑器添加新功能。以下是创建一个简单编辑器插件的完整示例：

```typescript
// src/index.ts
import { EditorPlugin, ExtensionContext } from '@novel-helper/core';

export default class MyEditorPlugin implements EditorPlugin {
  // 插件名称
  name = 'my-editor-plugin';
  
  // 插件版本
  version = '1.0.0';
  
  // 插件初始化
  initialize(context: ExtensionContext): void {
    console.log('编辑器插件已初始化');
    
    // 注册编辑器扩展
    context.editor.registerExtension({
      name: this.name,
      version: this.version,
      // ... 其他配置
    });
  }
  
  // 插件激活
  activate(): void {
    // 订阅事件
    this.subscribeEvents();
  }
  
  // 插件停用
  deactivate(): void {
    // 清理资源
    this.cleanup();
  }
  
  private subscribeEvents(): void {
    // 订阅编辑器事件
  }
  
  private cleanup(): void {
    // 清理订阅和资源
  }
}

// 导出扩展工厂函数
export function createExtension() {
  return new MyEditorPlugin();
}
```

### 注册工具栏按钮

扩展可以向编辑器的工具栏添加自定义按钮：

```typescript
import { ToolbarButton, ExtensionContext } from '@novel-helper/core';

export class MyToolbarExtension {
  constructor(private context: ExtensionContext) {}
  
  registerToolbarButtons(): void {
    const button: ToolbarButton = {
      id: 'my-custom-button',
      icon: 'custom-icon',
      tooltip: '自定义功能',
      position: 'before:format-button',
      action: (editor) => {
        // 按钮点击处理逻辑
        this.handleButtonClick(editor);
      },
      visibility: (editor) => {
        // 按钮可见性条件
        return true;
      }
    };
    
    this.context.toolbar.registerButton(button);
  }
  
  private handleButtonClick(editor: EditorInstance): void {
    // 处理按钮点击
  }
}
```

### 添加菜单项

扩展可以向应用的菜单系统中添加新菜单项：

```typescript
import { MenuItem, ExtensionContext } from '@novel-helper/core';

export class MyMenuExtension {
  constructor(private context: ExtensionContext) {}
  
  registerMenuItems(): void {
    const menuItem: MenuItem = {
      id: 'my-menu-item',
      label: '我的功能',
      icon: 'my-icon',
      path: 'tools/my-function',
      shortcut: 'Ctrl+Shift+M',
      action: () => {
        this.executeFunction();
      },
      separator: false,
      submenu: []
    };
    
    this.context.menu.registerItem(menuItem);
  }
  
  private executeFunction(): void {
    // 执行菜单功能
  }
}
```

## 开发设置面板

扩展可以添加自定义设置面板：

```typescript
import { SettingsPanel, ExtensionContext } from '@novel-helper/core';

export class MySettingsPanel implements SettingsPanel {
  // 面板 ID
  id = 'my-settings-panel';
  
  // 面板标题
  title = '我的扩展设置';
  
  // 面板图标
  icon = 'settings-icon';
  
  // 面板顺序
  order = 100;
  
  // 渲染设置面板
  render(): VueComponent {
    return {
      components: { SettingInput, SettingToggle },
      template: `
        <div class="my-settings-panel">
          <SettingInput
            v-model="config.value1"
            label="设置项一"
            description="这是第一个设置项"
          />
          <SettingToggle
            v-model="config.value2"
            label="设置项二"
            description="这是第二个设置项"
          />
        </div>
      `,
      data() {
        return {
          config: {
            value1: '',
            value2: false
          }
        };
      }
    };
  }
  
  // 保存设置
  save(settings: Record<string, any>): void {
    // 保存设置到存储
  }
}
```

## 事件处理

扩展可以订阅应用事件：

```typescript
export class MyEventHandler {
  private unsubscribers: (() => void)[] = [];
  
  subscribeEvents(context: ExtensionContext): void {
    // 订阅项目变更事件
    const unsubProjectChange = context.events.on(
      'project:changed',
      (project) => {
        console.log('项目已变更:', project);
      }
    );
    this.unsubscribers.push(unsubProjectChange);
    
    // 订阅文档保存事件
    const unsubDocSave = context.events.on(
      'document:saved',
      (document) => {
        console.log('文档已保存:', document);
      }
    );
    this.unsubscribers.push(unsubDocSave);
  }
  
  unsubscribeAll(): void {
    this.unsubscribers.forEach(unsub => unsub());
    this.unsubscribers = [];
  }
}
```

## 样式和资源

扩展可以使用自定义样式：

```typescript
// src/styles.css
.my-extension-button {
  background-color: #42b883;
  color: white;
  border-radius: 4px;
  padding: 8px 16px;
}

.my-extension-panel {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
}
```

在清单中声明样式资源：

```typescript
export const manifest: ExtensionManifest = {
  // ... 其他配置
  resources: [
    'dist/styles.css',
    'assets/**/*.png'
  ]
};
```

## 测试扩展

### 单元测试

使用 Vitest 进行单元测试：

```typescript
// src/__tests__/extension.spec.ts
import { describe, it, expect, vi } from 'vitest';
import { MyExtension } from '../extension';

describe('MyExtension', () => {
  it('should initialize correctly', () => {
    const extension = new MyExtension();
    expect(extension.name).toBe('my-extension');
  });
  
  it('should handle button click', () => {
    const extension = new MyExtension();
    const mockEditor = { insertText: vi.fn() };
    
    extension.handleClick(mockEditor);
    
    expect(mockEditor.insertText).toHaveBeenCalled();
  });
});
```

### 集成测试

可以使用 Playwright 进行端到端测试，验证扩展在真实环境中的行为。

## 构建和发布

### 构建扩展

配置 Vite 进行构建：

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MyExtension',
      fileName: 'index'
    },
    rollupOptions: {
      // 确保外部化依赖
      external: ['vue', '@novel-helper/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@novel-helper/core': 'NovelHelperCore'
        }
      }
    }
  }
});
```

### 发布扩展

扩展可以通过以下方式分发：

1. **NPM 包发布**：将扩展发布到 NPM 仓库
2. **本地安装**：通过本地文件路径安装
3. **在线市场**：通过扩展市场分发（待支持）

---

*最后更新：2025年12月*
