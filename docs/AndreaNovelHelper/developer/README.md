# Andrea Novel Helper - 开发者文档

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

欢迎阅读 Andrea Novel Helper 开发者文档！这里包含扩展的内部实现细节、API 参考和开发指南。

## 文档目录

### 核心概念

| 文档 | 说明 |
|------|------|
| [项目概述](./01-overview.md) | 项目介绍、设计理念和技术栈 |
| [架构设计](./02-architecture.md) | 整体架构和模块划分 |
| [核心模块](./03-core-modules.md) | 各核心模块的详细说明 |

### API 参考

| 文档 | 说明 |
|------|------|
| [API 参考](./04-api-reference.md) | 核心 API、命令、Provider、Service |

### 配置与开发

| 文档 | 说明 |
|------|------|
| [配置说明](./05-configuration.md) | 扩展配置项详解 |
| [开发指南](./06-development-guide.md) | 开发环境设置、构建、发布 |

## 项目结构

```
andrea-novel-helper/
├── src/                    # 主要源代码
│   ├── activate.ts         # 扩展激活入口
│   ├── extension.ts        # 核心类型定义
│   ├── commands/           # 命令实现
│   ├── Provider/           # VS Code 提供器
│   ├── services/           # 业务服务
│   ├── utils/              # 工具函数
│   ├── sync/               # 同步服务
│   ├── database/           # 数据库层
│   └── types/              # 类型定义
├── packages/               # 子包
│   ├── webview/           # Vue 前端
│   └── enigo-keyboard/    # Rust 键盘模块
├── l10n/                  # 国际化文件
├── templates/             # 模板文件
├── package.json           # 扩展配置
├── tsconfig.json         # TypeScript 配置
└── pixi.toml             # 构建配置
```

## 技术栈

### 核心技术
- **TypeScript** - 主要开发语言
- **Node.js** - 运行时环境
- **VS Code API** - 扩展开发接口

### 数据库
- **@vscode/sqlite3** - SQLite 数据库
- **JSON** - JSON 文件存储

### 前端组件
- **Vue 3** - Webview UI 框架
- **Quasar** - UI 组件库

### 原生模块
- **Rust** - enigo-keyboard 键盘模块

### 构建工具
- **Pixi** - 包管理和任务运行
- **npm** - 依赖管理

## 核心模块

### 1. 激活与初始化
- **activate.ts** - 扩展激活入口
- **extension.ts** - 核心类型定义

### 2. 命令系统
- 角色相关命令
- 大纲相关命令
- 字数统计命令
- 同步相关命令
- Typst 相关命令

### 3. Provider
- **WordCountProvider** - 字数统计树视图
- **OutlineFSProvider** - 大纲文件系统
- **WebDAVFileSystemProvider** - WebDAV 文件系统
- **CommentsProvider** - 批注树视图

### 4. 服务层
- **NameGeneratorService** - 名字生成服务
- **WebDAVSyncService** - WebDAV 同步服务
- **AutoGitService** - Git 自动管理服务

### 5. 数据库
- **JSON 后端** - JSON 文件存储
- **SQLite 后端** - SQLite 数据库
- **数据迁移** - 后端切换与迁移

## 开发指南

### 环境设置

1. **前置要求**
   - Node.js >= 16.x
   - npm >= 8.x
   - Pixi 包管理工具
   - VS Code >= 1.100.0
   - Git

2. **安装步骤**
   ```bash
   # 克隆仓库
   git clone https://github.com/your-repo/andrea-novel-helper.git
   cd andrea-novel-helper

   # 安装 Pixi
   # Windows (PowerShell)
   irm https://pixi.sh/install.ps1 | iex

   # 安装依赖
   pixi install

   # 编译 TypeScript
   pixi run compile
   ```

3. **运行扩展**
   - 按 `F5` 启动扩展开发主机
   - 或使用 `pixi run watch`

### 创建新功能

1. **创建命令**
   - 在 `commands/` 目录创建命令文件
   - 在 `activate.ts` 中注册命令
   - 在 `package.json` 中声明命令

2. **创建视图**
   - 实现 TreeDataProvider
   - 注册视图提供器
   - 在 `package.json` 中声明视图

3. **创建编辑器**
   - 实现 CustomTextEditorProvider
   - 在 `package.json` 中声明编辑器

### 测试

- **单元测试**: `pixi run test`
- **集成测试**: `pixi run test:integration`
- **扩展测试**: `pixi run test:extension`

### 发布

1. 更新版本号
2. 编译生产版本: `pixi run build`
3. 打包扩展: `pixi run package`
4. 发布到市场: `vsce publish`

## 常见问题

### 调试技巧

1. 使用输出通道进行调试
2. 查看扩展主机日志
3. 使用开发者工具检查 Webview

### 性能优化

1. 使用增量刷新
2. 实现懒加载
3. 异步处理耗时操作

### 错误处理

1. 正确使用 try-catch
2. 提供有意义的错误信息
3. 记录错误日志

## 贡献指南

欢迎贡献代码和提出建议！

1. Fork 仓库
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 开启 Pull Request

## 许可证

MPL-2.0 License

---

[← 返回主文档](../README.md)
