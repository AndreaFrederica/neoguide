# 开发指南

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

## 开发环境设置

### 前置要求

- **Node.js**: >= 16.x
- **npm**: >= 8.x
- **Pixi**: 包管理工具
- **VS Code**: >= 1.100.0
- **Git**: 版本控制

### 安装步骤

#### 1. 克隆仓库

```bash
git clone https://github.com/your-repo/andrea-novel-helper.git
cd andrea-novel-helper
```

#### 2. 安装 Pixi

```bash
# Windows (PowerShell)
irm https://pixi.sh/install.ps1 | iex

# macOS/Linux
curl -fsSL https://pixi.sh/install.sh | bash
```

#### 3. 安装依赖

```bash
pixi install
```

#### 4. 编译 TypeScript

```bash
pixi run compile
```

#### 5. 运行扩展

按 `F5` 启动扩展开发主机，或使用命令：

```bash
pixi run watch
```

## 项目结构

### 源码目录

```
src/
├── activate.ts                    # 扩展激活入口
├── extension.ts                   # 核心类型定义
├── commands/                      # 命令实现
├── Provider/                      # VS Code 提供器
├── services/                      # 业务服务
├── utils/                         # 工具函数
├── sync/                          # 同步服务
├── database/                      # 数据库层
└── types/                         # 类型定义
```

### 代码规范

#### TypeScript 配置

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "Node16",
        "lib": ["ES2022"],
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    }
}
```

#### ESLint 规则

```json
{
    "rules": {
        "curly": "off",
        "@typescript-eslint/no-var-requires": "off"
    }
}
```

## 扩展开发

### 创建新命令

#### 1. 在 `commands/` 目录创建命令文件

```typescript
// src/commands/myCommand.ts
import * as vscode from 'vscode';

export async function myCommand() {
    const input = await vscode.window.showInputBox({
        prompt: '请输入内容',
        placeHolder: '输入...'
    });

    if (input) {
        vscode.window.showInformationMessage(`你输入了: ${input}`);
    }
}
```

#### 2. 在 `activate.ts` 中注册命令

```typescript
import { myCommand } from './commands/myCommand';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('andrea.myCommand', myCommand)
    );
}
```

#### 3. 在 `package.json` 中声明命令

```json
{
    "contributes": {
        "commands": [
            {
                "command": "andrea.myCommand",
                "title": "我的命令",
                "category": "Andrea Novel Helper"
            }
        ]
    }
}
```

### 创建自定义视图

#### 1. 实现 TreeDataProvider

```typescript
// src/Provider/view/myViewProvider.ts
import * as vscode from 'vscode';

export class MyViewProvider implements vscode.TreeDataProvider<MyItem> {
    private _onDidChangeTreeData = new vscode.EventEmitter<MyItem | undefined | null | void>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: MyItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: MyItem): Thenable<MyItem[]> {
        if (!element) {
            // 返回根级项目
            return Promise.resolve([
                new MyItem('项目1', vscode.TreeItemCollapsibleState.None),
                new MyItem('项目2', vscode.TreeItemCollapsibleState.None),
            ]);
        }
        return Promise.resolve([]);
    }
}

class MyItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }
}
```

#### 2. 注册视图提供器

```typescript
// 在 activate.ts 中
import { MyViewProvider } from './Provider/view/myViewProvider';

export function activate(context: vscode.ExtensionContext) {
    const myViewProvider = new MyViewProvider();
    vscode.window.createTreeView('myView', {
        treeDataProvider: myViewProvider
    });
}
```

#### 3. 在 `package.json` 中声明视图

```json
{
    "contributes": {
        "views": {
            "andrea-novel-helper": [
                {
                    "id": "myView",
                    "name": "我的视图"
                }
            ]
        }
    }
}
```

### 创建自定义编辑器

#### 1. 实现 CustomTextEditorProvider

```typescript
// src/Provider/editor/MyCustomEditorProvider.ts
import * as vscode from 'vscode';

export class MyCustomEditorProvider implements vscode.CustomTextEditorProvider {
    constructor(private context: vscode.ExtensionContext) {}

    async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        token: vscode.CancellationToken
    ): Promise<void> {
        webviewPanel.webview.options = {
            enableScripts: true,
        };

        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

        const updateWebview = () => {
            webviewPanel.webview.postMessage({
                type: 'update',
                text: document.getText(),
            });
        };

        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
            if (e.document.uri.toString() === document.uri.toString()) {
                updateWebview();
            }
        });

        webviewPanel.onDidDispose(() => {
            changeDocumentSubscription.dispose();
        });

        updateWebview();
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Editor</title>
</head>
<body>
    <div id="content"></div>
    <script>
        const vscode = acquireVsCodeApi();
        window.addEventListener('message', event => {
            const message = event.data;
            if (message.type === 'update') {
                document.getElementById('content').textContent = message.text;
            }
        });
    </script>
</body>
</html>`;
    }
}

export function activate(context: vscode.ExtensionContext) {
    const provider = new MyCustomEditorProvider(context);
    context.subscriptions.push(
        vscode.window.registerCustomEditorProvider(
            'andrea.customEditor',
            provider,
            {
                webviewOptions: {
                    retainContextWhenHidden: true,
                },
            }
        )
    );
}
```

#### 2. 在 `package.json` 中声明编辑器

```json
{
    "contributes": {
        "customEditors": [
            {
                "viewType": "andrea.customEditor",
                "displayName": "我的自定义编辑器",
                "selector": [
                    {
                        "filenamePattern": "*.custom"
                    }
                ]
            }
        ]
    }
}
```

## 测试

### 单元测试

使用 Jest 进行单元测试：

```bash
pixi run test
```

#### 创建测试文件

```typescript
// src/test/myTest.test.ts
import { myFunction } from '../utils/myUtils';

describe('myFunction', () => {
    it('should return expected result', () => {
        expect(myFunction('input')).toBe('output');
    });
});
```

### 集成测试

运行集成测试：

```bash
pixi run test:integration
```

### 扩展测试

使用 VS Code 扩展测试运行器：

```bash
pixi run test:extension
```

## 调试

### 调试配置

在 `.vscode/launch.json` 中配置：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "运行扩展",
            "type": "extensionHost",
            "request": "launch",
            "args": [
                "--extensionDevelopmentPath=${workspaceFolder}"
            ],
            "outFiles": [
                "${workspaceFolder}/out/**/*.js"
            ],
            "preLaunchTask": "${defaultBuildTask}"
        },
        {
            "name": "扩展测试",
            "type": "extensionHost",
            "request": "launch",
            "args": [
                "--extensionDevelopmentPath=${workspaceFolder}",
                "--extensionTestsPath=${workspaceFolder}/out/test/suite/index"
            ],
            "outFiles": [
                "${workspaceFolder}/out/test/**/*.js"
            ],
            "preLaunchTask": "${defaultBuildTask}"
        }
    ]
}
```

### 日志输出

使用输出通道进行调试：

```typescript
const outputChannel = vscode.window.createOutputChannel('Andrea Novel Helper');
outputChannel.appendLine('Debug message');
outputChannel.show(); // 显示输出面板
```

### 错误处理

```typescript
try {
    // 你的代码
} catch (error) {
    if (error instanceof Error) {
        vscode.window.showErrorMessage(`操作失败: ${error.message}`);
        outputChannel.appendLine(error.stack);
    }
}
```

## 发布

### 准备发布

#### 1. 更新版本号

在 `package.json` 中更新版本：

```json
{
    "version": "0.4.54"
}
```

#### 2. 编译生产版本

```bash
pixi run build
```

#### 3. 打包扩展

```bash
pixi run package
```

### 发布到 VS Code Marketplace

#### 1. 安装 vsce

```bash
npm install -g vsce
```

#### 2. 发布

```bash
vsce publish
```

### 发布到 Open VSX

```bash
vsce publish -o openvsx
```

## 构建脚本

### Pixi 任务

在 `pixi.toml` 中定义的任务：

```toml
[tasks.build]
command = "npm"
args = ["run", "compile"]

[tasks.watch]
command = "npm"
args = ["run", "watch"]

[tasks.test]
command = "npm"
args = ["run", "test"]

[tasks.package]
command = "npm"
args", ["run", "vsce:package"]
```

### NPM 脚本

在 `package.json` 中定义的脚本：

```json
{
    "scripts": {
        "compile": "tsc -p ./",
        "watch": "tsc -watch -p ./",
        "pretest": "npm run compile",
        "test": "node ./out/test/runTest.js",
        "vsce:package": "vsce package"
    }
}
```

## 最佳实践

### 1. 使用异步操作

```typescript
// 好的做法
async function myCommand() {
    const result = await someAsyncOperation();
    return result;
}

// 避免
function myCommand() {
    someAsyncOperation().then(result => {
        return result;
    });
}
```

### 2. 正确处理资源清理

```typescript
export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.workspace.onDidChangeTextDocument(() => {
        // 处理文档变更
    });

    context.subscriptions.push(disposable);
}
```

### 3. 使用类型安全

```typescript
// 好的做法
interface MyOptions {
    enabled: boolean;
    count: number;
}

function myFunction(options: MyOptions) {
    // ...
}

// 避免
function myFunction(options: any) {
    // ...
}
```

### 4. 错误处理

```typescript
async function myFunction() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        if (error instanceof Error) {
            vscode.window.showErrorMessage(`操作失败: ${error.message}`);
            console.error('[MyFunction]', error);
        }
        throw error;
    }
}
```

### 5. 配置管理

```typescript
// 获取配置
const config = vscode.workspace.getConfiguration('AndreaNovelHelper');
const enabled = config.get<boolean>('myFeature.enabled', false);

// 监听配置变更
context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('AndreaNovelHelper.myFeature.enabled')) {
            // 重新加载配置
            reloadConfig();
        }
    })
);
```

## 常见问题

### Q: 如何调试 Worker 线程？

A: Worker 线程无法直接调试，可以使用日志输出：

```typescript
// Worker 中
console.log('[Worker] Debug message:', data);
```

### Q: 如何处理文件系统事件？

A: 使用 FileSystemWatcher：

```typescript
const watcher = vscode.workspace.createFileSystemWatcher(
    new vscode.RelativePattern(folder, '**/*.md')
);

watcher.onDidChange(uri => {
    console.log('File changed:', uri.fsPath);
});

watcher.onDidCreate(uri => {
    console.log('File created:', uri.fsPath);
});

watcher.onDidDelete(uri => {
    console.log('File deleted:', uri.fsPath);
});

context.subscriptions.push(watcher);
```

### Q: 如何实现撤销/重做？

A: 使用 VS Code 的 TextEditor 编辑功能：

```typescript
const edit = new vscode.WorkspaceEdit();
edit.insert(document.uri, new vscode.Position(0, 0), 'text');
await vscode.workspace.applyEdit(edit);
```

## 贡献指南

### 提交代码

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码审查

- 遵循现有代码风格
- 添加必要的注释
- 更新相关文档
- 确保所有测试通过

## 许可证

本项目的所有贡献都将遵循 MPL-2.0 许可证。
