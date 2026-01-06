# 配置说明

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

## 扩展配置项

Andrea Novel Helper 的所有配置都在 VS Code 的 `settings.json` 中进行管理。

## 基础配置

### workspaceDisabled

禁用/启用扩展（工作区级别）。

```json
{
    "AndreaNovelHelper.workspaceDisabled": false
}
```

- **类型**: `boolean`
- **默认值**: `false`
- **作用域**: Workspace

### rolesFile

角色文件目录路径。

```json
{
    "AndreaNovelHelper.rolesFile": "novel-helper/roles"
}
```

- **类型**: `string`
- **默认值**: `"novel-helper/roles"`
- **作用域**: Workspace

### outlinePath

大纲文件目录路径。

```json
{
    "AndreaNovelHelper.outlinePath": "novel-helper/outline"
}
```

- **类型**: `string`
- **默认值**: `"novel-helper/outline"`
- **作用域**: Workspace

## 字数统计配置

### wordCount.order.step

手动排序索引步长。

```json
{
    "AndreaNovelHelper.wordCount.order.step": 10
}
```

- **类型**: `number`
- **默认值**: `10`
- **作用域**: Workspace

### wordCount.order.padWidth

索引显示宽度。

```json
{
    "AndreaNovelHelper.wordCount.order.padWidth": 3
}
```

- **类型**: `number`
- **默认值**: `3`
- **作用域**: Workspace

### wordCount.order.autoResequence

自动重新排序。

```json
{
    "AndreaNovelHelper.wordCount.order.autoResequence": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### wordCount.order.showIndexInLabel

在标签中显示索引。

```json
{
    "AndreaNovelHelper.wordCount.order.showIndexInLabel": false
}
```

- **类型**: `boolean`
- **默认值**: `false`
- **作用域**: Workspace

## 大纲配置

### outline.lazyMode

大纲懒加载模式。

```json
{
    "AndreaNovelHelper.outline.lazyMode": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

说明：启用后，大纲仅在其可见时才刷新，提高性能。

## 排版配置

### typeset.autoPairs

自动补全符号对。

```json
{
    "AndreaNovelHelper.typeset.autoPairs": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### typeset.smartEnter

启用智能回车。

```json
{
    "AndreaNovelHelper.typeset.smartEnter": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### typeset.autoBlankLines

自动空行数量。

```json
{
    "AndreaNovelHelper.typeset.autoBlankLines": 1
}
```

- **类型**: `number`
- **默认值**: `1`
- **作用域**: Workspace

### typeset.formatOnSave

保存时自动格式化。

```json
{
    "AndreaNovelHelper.typeset.formatOnSave": false
}
```

- **类型**: `boolean`
- **默认值**: `false`
- **作用域**: Workspace

## 错别字检测配置

### typo.enabled

启用错别字检测。

```json
{
    "AndreaNovelHelper.typo.enabled": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### typo.checkSameSound

检查同音字。

```json
{
    "AndreaNovelHelper.typo.checkSameSound": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### typo.checkSimilarShape

检查形近字。

```json
{
    "AndreaNovelHelper.typo.checkSimilarShape": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

## WebDAV 同步配置

### webdav.sync.strategy

同步策略。

```json
{
    "AndreaNovelHelper.webdav.sync.strategy": "timestamp"
}
```

- **类型**: `"timestamp" | "size" | "both" | "content"`
- **默认值**: `"timestamp"`
- **作用域**: Workspace

策略说明：
- `timestamp`: 基于修改时间比较
- `size`: 基于文件大小比较
- `both`: 同时考虑时间和大小
- `content`: 基于内容哈希比较

### webdav.sync.timeTolerance

时间容差（毫秒）。

```json
{
    "AndreaNovelHelper.webdav.sync.timeTolerance": 15000
}
```

- **类型**: `number`
- **默认值**: `15000` (15秒)
- **作用域**: Workspace

### webdav.sync.enableSmartComparison

启用智能比较。

```json
{
    "AndreaNovelHelper.webdav.sync.enableSmartComparison": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### webdav.sync.enableMetadataSidecar

启用元数据侧车文件。

```json
{
    "AndreaNovelHelper.webdav.sync.enableMetadataSidecar": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### webdav.sync.metadataSidecarSuffix

元数据侧车文件后缀。

```json
{
    "AndreaNovelHelper.webdav.sync.metadataSidecarSuffix": ".anhmeta.json"
}
```

- **类型**: `string`
- **默认值**: `".anhmeta.json"`
- **作用域**: Workspace

### webdav.sync.ignoredDirectories

忽略的目录列表。

```json
{
    "AndreaNovelHelper.webdav.sync.ignoredDirectories": [
        ".git",
        "node_modules",
        ".pixi",
        ".venv",
        "__pycache__",
        "target",
        "build",
        "dist"
    ]
}
```

- **类型**: `string[]`
- **默认值**: (预定义列表)
- **作用域**: Workspace

### webdav.sync.ignoredFiles

忽略的文件列表。

```json
{
    "AndreaNovelHelper.webdav.sync.ignoredFiles": [
        ".DS_Store",
        "Thumbs.db",
        "*.tmp",
        "*.log"
    ]
}
```

- **类型**: `string[]`
- **默认值**: (预定义列表)
- **作用域**: Workspace

### webdav.sync.ignoreAppDataDirectories

忽略应用数据目录。

```json
{
    "AndreaNovelHelper.webdav.sync.ignoreAppDataDirectories": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

## AutoGit 配置

### autoGit.enabled

启用 AutoGit。

```json
{
    "AndreaNovelHelper.autoGit.enabled": false
}
```

- **类型**: `boolean`
- **默认值**: `false`
- **作用域**: Workspace

### autoGit.autoCommit

自动提交。

```json
{
    "AndreaNovelHelper.autoGit.autoCommit": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### autoGit.autoPush

自动推送。

```json
{
    "AndreaNovelHelper.autoGit.autoPush": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### autoGit.commitMessage

提交消息模板。

```json
{
    "AndreaNovelHelper.autoGit.commitMessage": "Auto commit: {date}"
}
```

- **类型**: `string`
- **默认值**: `"Auto commit: {date}"`
- **作用域**: Workspace

### autoGit.compactStatus

简洁状态显示。

```json
{
    "AndreaNovelHelper.autoGit.compactStatus": false
}
```

- **类型**: `boolean`
- **默认值**: `false`
- **作用域**: Workspace

## 名字生成器配置

### nameGenerator.defaultCulture

默认文化背景。

```json
{
    "AndreaNovelHelper.nameGenerator.defaultCulture": "zh_CN"
}
```

- **类型**: `string`
- **默认值**: `"zh_CN"`
- **作用域**: User

### nameGenerator.defaultGender

默认性别。

```json
{
    "AndreaNovelHelper.nameGenerator.defaultGender": "any"
}
```

- **类型**: `"male" | "female" | "neutral" | "any"`
- **默认值**: `"any"`
- **作用域**: User

### nameGenerator.defaultStyle

默认风格。

```json
{
    "AndreaNovelHelper.nameGenerator.defaultStyle": "modern"
}
```

- **类型**: `string`
- **默认值**: `"modern"`
- **作用域**: User

## Typst 配置

### typst.enabled

启用 Typst 集成。

```json
{
    "AndreaNovelHelper.typst.enabled": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### typst.templatePath

模板文件路径。

```json
{
    "AndreaNovelHelper.typst.templatePath": "novel-helper/templates"
}
```

- **类型**: `string`
- **默认值**: `"novel-helper/templates"`
- **作用域**: Workspace

## 批注配置

### comments.enabled

启用批注系统。

```json
{
    "AndreaNovelHelper.comments.enabled": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### comments.storage

批注存储方式。

```json
{
    "AndreaNovelHelper.comments.storage": "frontmatter"
}
```

- **类型**: `"frontmatter" | "json" | "database"`
- **默认值**: `"frontmatter"`
- **作用域**: Workspace

## 热力图配置

### heatmap.enabled

启用热力图。

```json
{
    "AndreaNovelHelper.heatmap.enabled": true
}
```

- **类型**: `boolean`
- **默认值**: `true`
- **作用域**: Workspace

### heatmap.colorScheme

热力图配色方案。

```json
{
    "AndreaNovelHelper.heatmap.colorScheme": "warm"
}
```

- **类型**: `"warm" | "cool" | "viridis"`
- **默认值**: `"warm"`
- **作用域**: Workspace

## 颜色配置

### defaultColor

默认角色颜色。

```json
{
    "AndreaNovelHelper.defaultColor": "#007AFF"
}
```

- **类型**: `string`
- **默认值**: `"#007AFF"`
- **作用域**: Workspace

### colorScheme

配色方案。

```json
{
    "AndreaNovelHelper.colorScheme": "default"
}
```

- **类型**: `string`
- **默认值**: `"default"`
- **作用域**: Workspace

可用方案：
- `default`: 默认配色
- `pastel`: 柔和配色
- `vibrant`: 鲜艳配色
- `dark`: 深色配色

## 高级配置

### minChars

最小匹配字符数。

```json
{
    "AndreaNovelHelper.minChars": 2
}
```

- **类型**: `number`
- **默认值**: `2`
- **作用域**: Workspace

### maxMatches

最大匹配数量。

```json
{
    "AndreaNovelHelper.maxMatches": 1000
}
```

- **类型**: `number`
- **默认值**: `1000`
- **作用域**: Workspace

### debugMode

调试模式。

```json
{
    "AndreaNovelHelper.debugMode": false
}
```

- **类型**: `boolean`
- **默认值**: `false`
- **作用域**: Workspace

## 项目配置文件

### project-config.json5

工作区根目录的配置文件，用于覆盖默认设置。

```json5
{
    // 角色配置
    roles: {
        file: "novel-helper/roles",
        autoLoad: true,
    },

    // 大纲配置
    outline: {
        path: "novel-helper/outline",
        lazyMode: true,
    },

    // 字数统计配置
    wordCount: {
        ignore: [
            "**/draft/**",
            "**/temp/**",
        ],
        sortBy: "order",
    },

    // 同步配置
    sync: {
        webdav: {
            enabled: false,
            accountId: "",
        },
        autoGit: {
            enabled: false,
        },
    },

    // 排版配置
    typeset: {
        autoPairs: true,
        smartEnter: true,
        autoBlankLines: 1,
    },
}
```

## 忽略文件

### .wcignore

字数统计忽略文件，遵循 `.gitignore` 语法。

```gitignore
# 忽略草稿目录
draft/

# 忽略临时文件
temp/
*.tmp

# 忽略特定文件
notes.txt
backup/
```

## 环境变量

### ANH_WEBDAV_PASSWORD

WebDAV 密码环境变量（可选）。

```bash
export ANH_WEBDAV_PASSWORD="your_password"
```

### ANH_LOG_LEVEL

日志级别环境变量。

```bash
export ANH_LOG_LEVEL="debug"
```

可用级别：
- `debug`
- `info`
- `warn`
- `error`
