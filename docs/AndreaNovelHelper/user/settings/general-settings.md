# 通用设置

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

小说助手的通用设置项。

## 打开设置

### 方法一：VS Code 设置界面

1. 按 `Ctrl+,` 打开设置
2. 搜索 `AndreaNovelHelper`
3. 浏览和修改设置

### 方法二：JSON 设置

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 `Preferences: Open User Settings (JSON)`
3. 添加配置项

## 工作区设置

### workspaceDisabled

禁用扩展的工作区。

- **类型**: `boolean`
- **默认值**: `false`

当设置为 `true` 时：
- 扩展在工作区中禁用
- 不会显示侧边栏
- 不会执行任何命令

**用途**: 临时禁用扩展而不需要卸载。

```json
{
  "AndreaNovelHelper.workspaceDisabled": false
}
```

### enabled

扩展启用的全局开关。

- **类型**: `boolean`
- **默认值**: `true`

当设置为 `false` 时：
- 扩展完全禁用
- 不加载任何功能

```json
{
  "AndreaNovelHelper.enabled": true
}
```

## 语言和扩展

### supportedLanguages

支持的语言列表。

- **类型**: `string[]`
- **默认值**: `["markdown", "plaintext"]`

扩展功能在这些语言中生效：
- Markdown
- 纯文本

```json
{
  "AndreaNovelHelper.supportedLanguages": ["markdown", "plaintext"]
}
```

### supportedExtensions

支持的文件扩展名。

- **类型**: `string[]`
- **默认值**: `[".md", ".markdown", ".txt"]`

这些扩展名的文件会启用扩展功能。

```json
{
  "AndreaNovelHelper.supportedExtensions": [".md", ".markdown", ".txt"]
}
```

## 颜色设置

### defaultColor

默认颜色。

- **类型**: `string`
- **默认值**: `"#A0A0A0"`

用于：
- 角色默认颜色
- 标签默认颜色
- 未指定颜色的元素

```json
{
  "AndreaNovelHelper.defaultColor": "#A0A0A0"
}
```

## 性能设置

### hugeFile.thresholdBytes

大文件阈值。

- **类型**: `number`
- **默认值**: `51200` (50KB)

超过此大小的文件：
- 跳过角色匹配
- 禁用悬停提示
- 避免性能问题

```json
{
  "AndreaNovelHelper.hugeFile.thresholdBytes": 51200
}
```

## 自动补全设置

### minChars

触发自动补全的最小字符数。

- **类型**: `number`
- **默认值**: `1`

需要输入至少此数量的字符才会触发补全。

```json
{
  "AndreaNovelHelper.minChars": 1
}
```

### completion.triggerMode

自动补全触发模式。

- **类型**: `string`
- **可选值**: `loose`, `startsWith`, `symbolLoose`, `symbolStartsWith`
- **默认值**: `loose`

| 模式 | 说明 |
|------|------|
| `loose` | 宽松模式，包含匹配即可触发 |
| `startsWith` | 前缀匹配，必须开头匹配 |
| `symbolLoose` | 符号+宽松模式 |
| `symbolStartsWith` | 符号+前缀匹配 |

```json
{
  "AndreaNovelHelper.completion.triggerMode": "loose"
}
```

### completion.symbolPrefixes

触发符号列表。

- **类型**: `string[]`
- **默认值**: `["@"]`

使用符号模式时，这些符号会触发补全。

```json
{
  "AndreaNovelHelper.completion.symbolPrefixes": ["@", "＠"]
}
```

## 调试设置

### debug.completionLog

启用自动补全调试日志。

- **类型**: `boolean`
- **默认值**: `false`

启用后，在输出面板显示补全调试信息。

```json
{
  "AndreaNovelHelper.debug.completionLog": false
}
```

## 常见问题

### 设置没有生效？

1. 确认设置在正确的位置（用户/工作区）
2. 检查设置名称拼写
3. 重新加载 VS Code 窗口

### 如何重置设置？

1. 打开设置
2. 点击"在 settings.json 中编辑"
3. 删除对应的设置项
4. 或设置为默认值

### 工作区设置和用户设置的区别？

- **用户设置**: 全局生效，所有工作区
- **工作区设置**: 仅当前工作区生效

工作区设置优先级高于用户设置。

## 相关功能

- [快速设置](./quick-settings.md) - 快速访问常用设置
- [角色设置](./role-settings.md) - 角色相关设置
- [同步设置](./sync-settings.md) - 同步相关设置
