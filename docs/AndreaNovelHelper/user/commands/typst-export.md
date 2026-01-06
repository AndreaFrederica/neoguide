# Typst 导出

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

Typst 导出功能可以将 Markdown 文档导出为 PDF 或其他格式。

## 功能说明

Typst 是一种现代化的排版系统，小说助手集成了 Typst 导出功能。

### 支持的输出格式

- **PDF** - 便携式文档格式（默认）
- **PNG** - 图片格式
- **SVG** - 矢量图格式

### 支持的 Markdown 元素

- 标题（各级）
- 段落
- 列表（有序、无序）
- 代码块
- 引用块
- 图片
- 水平分割线
- YAML 元数据

## 使用方法

### 导出当前文档

1. 打开要导出的 Markdown 文档
2. 按 `Ctrl+Shift+P` 打开命令面板
3. 输入 `Andrea Novel Helper: Typst 导出当前文档`
4. 选择模板
5. 选择主标题来源
6. 选择输出位置
7. 等待编译完成

### 选择模板

如果有多个模板，会显示模板选择面板：

```
┌─────────────────────────┐
│ 选择 Typst 模板         │
├─────────────────────────┤
│ sample                  │
│ novel                   │
│ report                  │
└─────────────────────────┘
```

### 选择主标题来源

导出时会询问主标题来源：

```
┌─────────────────────────┐
│ 选择主标题来源          │
├─────────────────────────┐
│ 提取主标题（第一个一级标题）│
│ 首个标题（任意级别）     │
│ 文件名（无扩展名）      │
│ 不提取主标题（不渲染）  │
└─────────────────────────┘
```

## 配置选项

在 VS Code 设置中搜索 `andrea.typst`：

| 设置项 | 说明 | 默认值 |
|--------|------|--------|
| `cliPath` | Typst CLI 路径 | `typst` |
| `templatesDir` | 模板目录 | `templates/typst` |
| `defaultTemplate` | 默认模板 | `sample` |
| `output.format` | 输出格式 | `pdf` |
| `output.ppi` | PNG 输出分辨率 | `144` |
| `output.pages` | 导出页面范围 | `""` |
| `font.paths` | 字体路径 | `[]` |
| `cleanupTemp` | 清理临时文件 | `false` |

### 配置示例

```json
{
  "andrea.typst.cliPath": "typst",
  "andrea.typst.templatesDir": "templates/typst",
  "andrea.typst.defaultTemplate": "novel",
  "andrea.typst.output.format": "pdf",
  "andrea.typst.output.ppi": 144,
  "andrea.typst.font.paths": ["C:/Fonts"],
  "andrea.typst.cleanupTemp": true
}
```

## 输出位置

### PDF 格式

会弹出保存对话框，可以选择保存位置。

### PNG/SVG 格式

自动保存到文档所在目录，文件名格式：
- `文档名-1.png`
- `文档名-2.png`
- ...

## 模板系统

### 模板位置

默认模板位置：`工作区/templates/typst/`

### 模板格式

Typst 模板使用 Liquid 模板语言：

```typst
#set page(width: 21cm, height: 29.7cm, margin: 2cm)

{{#if meta.title}}
#heading(level: 1, [{{meta.title}}])
{{/if}}

{{#each blocks}}
  {{#if (eq this.type "heading")}}
#heading(level: {{this.level}}, [{{this.text}}])
  {{/if}}
{{/each}}
```

### 可用变量

- `meta.title` - 主标题
- `meta.*` - YAML 元数据
- `blocks` - 文档内容块数组

## 实时预览

导出后，Typst 内容会映射到内存：
- 可以使用 VSCode Typst 插件预览
- 自动更新预览
- 无需手动刷新

## 输出日志

导出过程会显示在输出面板：
- 选择 `ANH: Typst` 频道
- 查看编译日志
- 调试问题

## 常见问题

### Typst 未安装？

1. 下载 Typst CLI：https://typst.app/docs/install/
2. 配置 `cliPath` 指向 Typst 可执行文件
3. 或确保 Typst 在系统 PATH 中

### 编译失败？

1. 查看输出面板的错误信息
2. 检查 Markdown 语法
3. 尝试使用默认模板
4. 检查字体是否可用

### 中文显示不正常？

1. 配置中文字体路径：`font.paths`
2. 确保字体文件存在
3. 尝试不同的字体

### 如何自定义模板？

1. 在 `templates/typst/` 创建模板目录
2. 编写 Typst 模板文件
3. 在导出时选择模板

### 临时文件太多？

设置 `cleanupTemp` 为 `true` 自动清理临时文件。

## 相关功能

- [Typst 预览](../views/typst-preview.md) - 实时预览 Typst 文档
- [基础工作流程](../getting-started/basic-workflow.md) - 写作流程
