# AutoGit

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

> ⚠️ **重要警告**：AutoGit 会**自动提交你的所有修改**。这可能导致：
> - 不完善的草稿被提交
> - 错误的修改被保存到历史记录
> - 失去对版本控制的精细控制
>
> **强烈建议**：作者应该**自己学会 Git 版本管理**，为自己的稿件负责。AutoGit 仅作为辅助工具，不应完全依赖它。

AutoGit 提供**自动 Git 提交**功能，可以自动将你的修改提交到版本控制系统。

## 准备工作

### Git 基础知识

在使用 AutoGit 之前，建议先了解 Git 基础：
- 什么是 Git 仓库
- 什么是提交（commit）
- 什么是推送（push）
- 如何查看 Git 历史
- 如何回滚到之前版本

> 💡 **学习资源**：
> - [Git 官方文档](https://git-scm.com/doc)
> - [Git 简易指南](https://rogerdudler.github.io/git-guide/index.zh.html)

### 安装 Git

1. 下载 Git：https://git-scm.com/downloads
2. 安装 Git
3. 配置用户信息：
   ```bash
   git config --global user.name "你的名字"
   git config --global user.email "你的邮箱"
   ```

### 初始化仓库

如果项目还没有 Git 仓库：
1. 在项目根目录打开终端
2. 运行 `git init`
3. 或使用项目初始化向导创建仓库

## 打开 AutoGit 面板

在 VS Code 左侧活动栏中，点击 **同步图标**（带 AutoGit 标签），即可打开 AutoGit 面板。

## AutoGit 状态

面板会显示当前状态：

```
📊 AutoGit 状态
━━━━━━━━━━━━━━━━━━━━━
✓ 已启用
✓ 监听中
📝 最后提交: 2 分钟前
📊 Git 状态: 干净
```

### 状态说明

| 状态 | 说明 |
|------|------|
| ✓ 已启用 | AutoGit 功能已启用 |
| ✗ 已禁用 | AutoGit 功能已禁用 |
| ✓ 监听中 | 正在监听文件变化 |
| 📝 有修改 | 有未提交的修改 |
| ✓ 干净 | 没有未提交的修改 |
| ⚠️ 冲突 | 存在合并冲突 |

## 功能说明

### 自动提交

启用后，当检测到文件修改时：
1. 等待一段时间（防抖）
2. 自动执行 `git add` 和 `git commit`
3. 使用配置的提交消息模板

### 自动推送

启用后，每次自动提交后：
1. 自动执行 `git push`
2. 推送到远程仓库

### 与 WebDAV 联动

如果同时配置了 WebDAV：
1. Git 提交完成后
2. 触发 WebDAV 同步
3. 双重备份保障

## 手动操作

### 手动提交

1. 点击面板中的 **立即提交** 按钮
2. 或使用命令面板：`Andrea Novel Helper: AutoGit 手动提交`

### 手动同步

1. 点击面板中的 **立即同步** 按钮
2. 或使用命令面板：`Andrea Novel Helper: AutoGit 手动同步`

同步过程：
1. 拉取远程更新（`git pull`）
2. 提交本地修改（`git commit`）
3. 推送到远程（`git push`）

### 查看状态

1. 点击面板中的 **显示状态** 按钮
2. 或使用命令面板：`Andrea Novel Helper: AutoGit 显示状态`
3. 或点击状态栏的同步状态

## 设置远程仓库

### 首次设置

1. 确保已有远程仓库（GitHub/Gitee 等）
2. 使用命令面板：`Andrea Novel Helper: AutoGit 设置远程仓库`
3. 输入远程仓库 URL：
   - HTTPS: `https://github.com/username/repo.git`
   - SSH: `git@github.com:username/repo.git`
4. 确认设置

### 手动设置（终端）

```bash
# 添加远程仓库
git remote add origin https://github.com/username/repo.git

# 推送到远程
git push -u origin main
```

## 提交消息模板

AutoGit 使用提交消息模板来创建提交。

### 默认模板

```
Auto commit: {date}
```

### 自定义模板

在 VS Code 设置中搜索 `AndreaNovelHelper.autoGit.commitMessage`：

可用的变量：
- `{date}` - 日期
- `{time}` - 时间
- `{files}` - 修改的文件数

示例：
```
Writing: {date} {time}
```

## 风险与注意事项

### ⚠️ 重要风险

1. **草稿被提交**：所有修改都会被提交，包括不完善的草稿
2. **失去精细控制**：无法选择性地提交某些修改
3. **历史混乱**：频繁提交可能使 Git 历史变得混乱
4. **冲突处理**：自动推送可能导致合并冲突

### 最佳实践

1. **定期检查 Git 历史**：
   ```bash
   git log --oneline
   ```

2. **学会回滚**：
   ```bash
   # 回滚到上一个提交
   git reset --hard HEAD~1
   ```

3. **使用分支**：
   - 在新分支上实验
   - 确认无误后再合并到主分支

4. **定期备份**：
   - 不要完全依赖 AutoGit
   - 定期手动创建重要节点的提交

### 何时禁用 AutoGit

建议在以下情况下禁用 AutoGit：
- 进行大规模修改时
- 实验性写作时
- 需要精细控制提交时
- 多人协作时

## 配置选项

在 VS Code 设置中搜索 `AndreaNovelHelper.autoGit`：

| 设置项 | 说明 | 默认值 |
|--------|------|--------|
| `enabled` | 启用 AutoGit | `false` |
| `autoCommit` | 自动提交 | `true` |
| `autoPush` | 自动推送 | `true` |
| `commitMessage` | 提交消息模板 | `Auto commit: {date}` |
| `compactStatus` | 简洁状态显示 | `false` |

## 常见问题

### AutoGit 没有工作？

1. 检查 Git 是否已安装
2. 确认当前目录是 Git 仓库
3. 检查 AutoGit 是否启用
4. 查看输出日志

### 推送失败？

1. 检查网络连接
2. 确认远程仓库 URL 正确
3. 检查认证信息
4. 先手动拉取：`git pull`

### 如何查看 Git 历史？

在终端中运行：
```bash
git log
# 或
git log --oneline
```

### 如何禁用 AutoGit？

1. 在 VS Code 设置中搜索 `AndreaNovelHelper.autoGit.enabled`
2. 取消勾选
3. 或在 AutoGit 面板中切换启用状态

## 建议的工作流程

### 推荐流程

1. **禁用 AutoGit**，手动管理 Git
2. 完成一个章节或重要节点后，手动提交
3. 写好有意义的提交消息
4. 定期推送到远程
5. 使用 WebDAV 作为额外备份

### 仅使用 AutoGit 的情况

如果你仍然选择使用 AutoGit：
1. 定期检查 Git 历史
2. 创建重要的里程碑标签
3. 定期手动创建有意义的提交
4. 保持远程仓库的备份

## 学习 Git

为了更好地管理你的稿件，建议学习 Git 基础：

### 基础命令

```bash
# 查看状态
git status

# 查看历史
git log

# 查看差异
git diff

# 创建提交
git add .
git commit -m "有意义的提交消息"

# 推送到远程
git push
```

### 图形化工具

- **GitHub Desktop** - https://desktop.github.com/
- **Sourcetree** - https://www.sourcetreeapp.com/
- **GitKraken** - https://www.gitkraken.com/

## 相关功能

- [WebDAV 同步](./webdav.md) - 云端备份
- [字数统计](./word-count.md) - 统计字数
- [基础工作流程](../getting-started/basic-workflow.md) - 写作流程
