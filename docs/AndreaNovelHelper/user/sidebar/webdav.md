# WebDAV 同步

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

WebDAV 同步功能可以将你的小说项目**备份到云端**，实现多设备同步。

## 准备工作

### 获取 WebDAV 服务

你需要一个支持 WebDAV 的云存储服务。推荐的服务：

| 服务 | 说明 |
|------|------|
| **坚果云** | 国内服务，稳定可靠（推荐） |
| **iCloud** | 苹果用户可用 |
| **Nextcloud** | 自建云存储 |
| **ownCloud** | 自建云存储 |

### 获取连接信息

从服务提供商获取：
- 服务器地址（URL）
- 用户名
- 密码
- 根路径（可选）

## 打开 WebDAV 面板

在 VS Code 左侧活动栏中，点击 **同步图标**（带 WebDAV 标签），即可打开 WebDAV 面板。

## 首次设置

### 添加 WebDAV 账户

1. 打开 WebDAV 面板
2. 点击 **登录账户**
3. 填写账户信息：
   - **账户名称** - 自定义名称，如"坚果云"
   - **服务器地址** - WebDAV 服务器 URL
   - **用户名** - 登录用户名
   - **密码** - 登录密码
   - **根路径** - 可选，服务器上的根目录
4. 点击 **保存**

### 测试连接

保存后，扩展会自动测试连接。如果失败，请检查：
- 服务器地址是否正确
- 用户名和密码是否正确
- 网络连接是否正常

### 关联项目（推荐）

关联项目后，同步会使用指定的账户和路径：

1. 点击 **关联项目**
2. 选择要使用的账户
3. 设置远程路径（服务器上的文件夹名）
4. 点击 **确定**

> 💡 **提示**：关联项目后，同步会自动使用正确的路径，更方便。

## 同步操作

### 手动同步

#### 方法一：使用面板按钮

1. 打开 WebDAV 面板
2. 点击 **立即同步** 按钮
3. 选择同步方向

#### 方法二：使用命令

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 `Andrea Novel Helper: WebDAV 立即同步`
3. 选择同步方向

### 同步方向

| 方向 | 说明 |
|------|------|
| **双向同步** | 较新的文件覆盖较旧的 |
| **仅推送** | 本地覆盖服务器 |
| **仅拉取** | 服务器覆盖本地 |

### 查看同步进度

同步时，面板会显示：
- 当前正在同步的文件
- 同步进度（x/y）
- 成功/失败数量

### 查看同步日志

点击面板顶部的 **查看日志** 按钮，会显示详细日志。

## 同步策略

在 VS Code 设置中搜索 `AndreaNovelHelper.webdav.sync.strategy`：

| 策略 | 说明 |
|------|------|
| **timestamp** | 基于修改时间比较（默认） |
| **size** | 基于文件大小比较 |
| **both** | 同时考虑时间和大小 |
| **content** | 基于内容哈希比较 |

### 时间容差

可以设置时间容差（毫秒），避免小的时间差异导致冲突：
- 默认值：15000 毫秒（15 秒）
- 设置路径：`AndreaNovelHelper.webdav.sync.timeTolerance`

## 忽略文件和文件夹

### 默认忽略

以下文件和文件夹默认不同步：
- `.git` - Git 仓库
- `node_modules` - Node.js 依赖
- `.vscode` - VS Code 配置
- `.pixi` - Pixi 环境
- 等等

### 自定义忽略规则

在 VS Code 设置中：
1. 搜索 `AndreaNovelHelper.webdav.sync.ignoredDirectories`
2. 添加要忽略的目录

或搜索 `AndreaNovelHelper.webdav.sync.ignoredFiles`
3. 添加要忽略的文件模式

### 忽略应用数据目录

可以设置忽略常见的应用数据目录：
- 设置路径：`AndreaNovelHelper.webdav.sync.ignoreAppDataDirectories`
- 默认值：`true`

## 侧车元数据

### 什么是侧车元数据？

每个文件的额外信息（`.anhmeta.json`），用于提高同步准确性：
- 文件 UUID
- 修改时间
- 文件大小
- 内容哈希

### 启用/禁用

在 VS Code 设置中：
1. 搜索 `AndreaNovelHelper.webdav.sync.enableMetadataSidecar`
2. 设置为 `true` 启用，`false` 禁用
3. 默认值为 `true`

## 账户管理

### 管理账户

1. 打开 WebDAV 面板
2. 点击 **管理账户**
3. 可以：
   - 查看所有账户
   - 编辑账户信息
   - 删除账户
   - 添加新账户

### 切换账户

如果项目关联了错误的账户：
1. 点击 **解除关联**
2. 重新关联正确的账户

## 推荐服务：坚果云

坚果云是国内稳定的 WebDAV 服务：

### 开启第三方应用密码

1. 登录坚果云网页版
2. 点击 **账户信息** > **安全选项**
3. 开启 **第三方应用密码**
4. 生成应用密码

### 连接信息

```
服务器地址: https://dav.jianguoyun.com/dav/
用户名: 坚果云账号
密码: 应用密码（不是登录密码）
```

### 注意事项

- 使用应用密码，不是登录密码
- 应用密码可以在安全选项中生成
- 建议定期更换应用密码

## 常见问题

### 同步失败？

1. 检查网络连接
2. 检查账户信息
3. 查看同步日志
4. 尝试重新登录

### 文件冲突？

当本地和远程都有修改时：
- 双向同步会比较修改时间
- 较新的文件会覆盖较旧的
- 建议先手动解决冲突

### 同步速度慢？

1. 启用增量同步（默认启用）
2. 减少同步的文件数量
3. 使用更快的网络
4. 调整同步策略

### 如何在手机上访问？

1. 确保已同步到服务器
2. 使用支持 WebDAV 的应用：
   - iOS: Files、Documents by Readdle
   - Android: Solid Explorer、FX File Explorer
3. 添加 WebDAV 账户
4. 访问文件

## 相关设置

在 VS Code 设置中搜索 `AndreaNovelHelper.webdav.sync`：

| 设置项 | 说明 | 默认值 |
|--------|------|--------|
| `strategy` | 同步策略 | `timestamp` |
| `timeTolerance` | 时间容差（毫秒） | `15000` |
| `enableSmartComparison` | 智能比较 | `true` |
| `enableMetadataSidecar` | 侧车元数据 | `true` |
| `metadataSidecarSuffix` | 元数据文件后缀 | `.anhmeta.json` |
| `ignoredDirectories` | 忽略的目录列表 | 见默认列表 |
| `ignoredFiles` | 忽略的文件列表 | 见默认列表 |
| `ignoreAppDataDirectories` | 忽略应用数据目录 | `true` |

## 相关功能

- [AutoGit](./autogit.md) - Git 自动提交
- [字数统计](./word-count.md) - 统计字数
- [基础工作流程](../getting-started/basic-workflow.md) - 写作流程
