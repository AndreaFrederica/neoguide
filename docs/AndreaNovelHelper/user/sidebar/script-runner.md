# 脚本运行器

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

脚本运行器允许你**运行自定义脚本**，扩展小说助手的功能。

## 打开脚本运行器

在 VS Code 左侧活动栏中，点击 **脚本图标**（类似代码图标），即可打开脚本运行器面板。

## 界面说明

脚本运行器面板显示：

```
📧 MCP 服务器
  ✓ server1
  ✗ server2

+ 新建脚本...

📁 scripts/
  📄 example.js
  📄 myscript.ts
```

## 脚本位置

脚本默认存放在项目的 `scripts/` 目录下：

```
项目根目录/
└── scripts/
    ├── example.js
    └── myscript.ts
```

## 创建脚本

### 新建脚本

1. 在脚本运行器面板中，点击 **+ 新建脚本...**
2. 选择脚本位置
3. 输入脚本名称
4. 脚本文件会自动创建并打开

### 脚本模板

```javascript
// 示例脚本
function main(context) {
    // context 包含：
    // - editor: 当前编辑器
    // - document: 当前文档
    // - selection: 当前选择

    const editor = context.editor;
    if (!editor) {
        console.log('没有打开的编辑器');
        return;
    }

    const document = editor.document;
    const text = document.getText();

    // 处理文本...
    console.log('文档长度:', text.length);
}

module.exports = { main };
```

## 运行脚本

### 方法一：右键菜单

1. 在脚本运行器面板中右键点击脚本
2. 选择 **运行脚本**
3. 查看输出结果

### 方法二：双击打开

双击脚本文件会打开编辑器，可以编辑后再运行。

## MCP 服务器

### 什么是 MCP？

MCP (Model Context Protocol) 服务器提供额外的功能和扩展。

### 管理服务器

在脚本运行器面板中：
- 展开 **MCP 服务器** 节点
- 查看所有已配置的服务器
- ✓ 表示已启用
- ✗ 表示已禁用

### 启用/禁用服务器

1. 点击服务器名称
2. 会切换启用/禁用状态
3. 已启用的服务器显示 ✓

## 脚本 API

脚本可以访问以下上下文：

```javascript
function main(context) {
    // 当前编辑器
    const editor = context.editor;

    // 当前文档
    const document = context.document;

    // 当前选择
    const selection = context.selection;

    // VS Code API
    const vscode = context.vscode;

    // 使用示例
    if (editor) {
        const text = document.getText();
        console.log('文档长度:', text.length);
    }
}
```

## 脚本示例

### 统计词频

```javascript
function main(context) {
    const editor = context.editor;
    if (!editor) return;

    const text = editor.document.getText();
    const words = text.split(/\s+/);
    const freq = {};

    words.forEach(word => {
        freq[word] = (freq[word] || 0) + 1;
    });

    const sorted = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    console.log('词频统计:', sorted);
}

module.exports = { main };
```

### 提取对话

```javascript
function main(context) {
    const editor = context.editor;
    if (!editor) return;

    const text = editor.document.getText();
    const dialogues = text.match(/「.*?」/g) || [];

    console.log('找到 ' + dialogues.length + ' 处对话');
    return dialogues;
}

module.exports = { main };
```

## 查看输出

### 输出面板

脚本运行结果会显示在输出面板中：
1. 点击 **查看** > **输出**
2. 选择 **Andrea Scripts** 频道
3. 查看脚本输出

### console.log

脚本中的 `console.log()` 会输出到输出面板。

## 右键菜单

在脚本运行器面板中右键点击：

| 菜单项 | 说明 |
|--------|------|
| 打开 | 在编辑器中打开脚本 |
| 运行脚本 | 运行选中的脚本 |
| 删除 | 删除脚本文件 |
| 刷新 | 刷新脚本列表 |

## 常见问题

### 脚本没有出现在列表中？

1. 确认脚本在 `scripts/` 目录下
2. 检查文件扩展名是否为 `.js` 或 `.ts`
3. 尝试刷新面板

### 脚本运行失败？

1. 查看输出面板了解错误
2. 检查脚本语法
3. 确认导出了 `main` 函数

### 如何访问项目数据？

通过 `context` 参数：
- `context.editor` - 当前编辑器
- `context.document` - 当前文档
- `context.vscode` - VS Code API

## 相关功能

- [命令面板功能](../commands/) - 使用命令执行操作
- [字数统计](./word-count.md) - 获取项目数据
- [角色管理](./roles.md) - 访问角色数据
