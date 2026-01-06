# 同步设置

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

WebDAV 和 AutoGit 同步相关设置。

## WebDAV 设置

### 基本设置

在 VS Code 设置中搜索 `AndreaNovelHelper.webdav`：

#### 同步策略 (strategy)

- **类型**: `string`
- **可选值**: `timestamp`, `size`, `both`, `content`
- **默认值**: `timestamp`

比较文件的方式：

| 策略 | 说明 |
|------|------|
| `timestamp` | 基于修改时间比较 |
| `size` | 基于文件大小比较 |
| `both` | 同时考虑时间和大小 |
| `content` | 基于内容哈希比较 |

```json
{
  "AndreaNovelHelper.webdav.sync.strategy": "timestamp"
}
```

#### 时间容差 (timeTolerance)

- **类型**: `number`
- **默认值**: `15000` (15秒)

避免小的时间差异导致冲突。

```json
{
  "AndreaNovelHelper.webdav.sync.timeTolerance": 15000
}
```

#### 智能比较 (enableSmartComparison)

- **类型**: `boolean`
- **默认值**: `true`

启用智能文件比较。

```json
{
  "AndreaNovelHelper.webdav.sync.enableSmartComparison": true
}
```

#### 侧车元数据 (enableMetadataSidecar)

- **类型**: `boolean`
- **默认值**: `true`

使用 `.anhmeta.json` 文件存储元数据。

```json
{
  "AndreaNovelHelper.webdav.sync.enableMetadataSidecar": true
}
```

#### 元数据后缀 (metadataSidecarSuffix)

- **类型**: `string`
- **默认值**: `.anhmeta.json`

元数据文件的后缀。

```json
{
  "AndreaNovelHelper.webdav.sync.metadataSidecarSuffix": ".anhmeta.json"
}
```

### 忽略规则

#### 忽略的目录 (ignoredDirectories)

- **类型**: `string[]`
- **默认值**: 见下表

默认忽略的目录：

| 目录 | 说明 |
|------|------|
| `.git` | Git 仓库 |
| `node_modules` | Node.js 依赖 |
| `.vscode` | VS Code 配置 |
| `.pixi` | Pixi 环境 |
| `.venv` | Python 虚拟环境 |
| `venv` | Python 虚拟环境 |
| `__pycache__` | Python 缓存 |
| `.idea` | JetBrains IDE |
| `.vs` | Visual Studio |

#### 忽略的文件 (ignoredFiles)

- **类型**: `string[]`
- **默认值**: 见下表

默认忽略的文件模式：

| 模式 | 说明 |
|------|------|
| `*.tmp` | 临时文件 |
| `*.log` | 日志文件 |
| `*.bak` | 备份文件 |
| `.DS_Store` | macOS 系统文件 |
| `Thumbs.db` | Windows 缩略图 |

#### 忽略应用数据目录 (ignoreAppDataDirectories)

- **类型**: `boolean`
- **默认值**: `true`

忽略常见的应用数据目录。

```json
{
  "AndreaNovelHelper.webdav.sync.ignoreAppDataDirectories": true
}
```

## AutoGit 设置

> ⚠️ **警告**: AutoGit 是很方便的功能，但建议您学习版本管理，为自己的稿件负责。

### 基本设置

在 VS Code 设置中搜索 `AndreaNovelHelper.autoGit`：

#### 启用 AutoGit (enabled)

- **类型**: `boolean`
- **默认值**: `false`

是否启用 AutoGit 功能。

```json
{
  "AndreaNovelHelper.autoGit.enabled": false
}
```

#### 自动提交 (autoCommit)

- **类型**: `boolean`
- **默认值**: `false`

文件更改时自动提交。

```json
{
  "AndreaNovelHelper.autoGit.autoCommit": false
}
```

#### 自动推送 (autoPush)

- **类型**: `boolean`
- **默认值**: `false`

提交后自动推送到远程。

```json
{
  "AndreaNovelHelper.autoGit.autoPush": false
}
```

#### 提交消息 (commitMessage)

- **类型**: `string`
- **默认值**: `"AutoGit: 自动提交"`

自动提交时使用的消息。

```json
{
  "AndreaNovelHelper.autoGit.commitMessage": "AutoGit: 自动提交"
}
```

### 高级设置

#### 监控文件变化

- 监控工作区文件变化
- 检测到更改自动提交
- 支持 HEAD 变化检测

#### 提交间隔

- 立即提交更改
- 无延迟
- 防止冲突

### 建议配置

如果您决定使用 AutoGit，建议：

1. **定期备份**: 不要完全依赖 AutoGit
2. **学习 Git**: 了解基本 Git 操作
3. **查看提交**: 定期检查提交历史
4. **分支管理**: 使用分支管理不同版本

## 配置示例

### 完整 WebDAV 配置

```json
{
  "AndreaNovelHelper.webdav.sync.strategy": "timestamp",
  "AndreaNovelHelper.webdav.sync.timeTolerance": 15000,
  "AndreaNovelHelper.webdav.sync.enableSmartComparison": true,
  "AndreaNovelHelper.webdav.sync.enableMetadataSidecar": true,
  "AndreaNovelHelper.webdav.sync.ignoredDirectories": [
    ".git",
    "node_modules",
    ".vscode"
  ],
  "AndreaNovelHelper.webdav.sync.ignoredFiles": [
    "*.tmp",
    "*.log"
  ]
}
```

### 保守 AutoGit 配置

```json
{
  "AndreaNovelHelper.autoGit.enabled": true,
  "AndreaNovelHelper.autoGit.autoCommit": true,
  "AndreaNovelHelper.autoGit.autoPush": false,
  "AndreaNovelHelper.autoGit.commitMessage": "AutoGit: 自动提交"
}
```

## 常见问题

### WebDAV 同步冲突？

1. 调整同步策略
2. 增加时间容差
3. 使用内容哈希比较

### AutoGit 提交太多？

1. 禁用自动提交
2. 手动执行提交
3. 调整提交消息

### 如何忽略特定文件？

1. 添加到 `ignoredFiles` 列表
2. 或添加到 `ignoredDirectories`
3. 刷新同步设置

## 相关功能

- [WebDAV 同步](../sidebar/webdav.md) - 云端备份
- [AutoGit](../sidebar/autogit.md) - Git 自动管理
- [同步状态](../statusbar/sync-status.md) - 查看同步状态
