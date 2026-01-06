# 安装指南

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

---

## 系统要求

### 最低配置

| 组件 | 要求 |
|------|------|
| 操作系统 | Windows 10+, Linux, macOS |
| Java | Java 8 或更高版本 |
| 内存 | 2 GB 可用内存 |
| 硬盘 | 500 MB 可用空间 |

### 推荐配置

| 组件 | 要求 |
|------|------|
| 操作系统 | Windows 10/11, Ubuntu 20.04+, macOS 11+ |
| Java | Java 17 (Eclipse Adoptium 推荐) |
| 内存 | 4 GB+ 可用内存 |
| 硬盘 | 2 GB+ 可用空间 |

## 获取启动器

> **注意**：当前处于早期开发阶段，可能没有稳定的安装包。

### 方式一：自行构建（推荐）

参考[开发者文档 - 构建指南](../developer/build.md)

### 方式二：开发版本

从 [GitHub Actions](https://github.com/AndreaFrederica/LunaLauncher/actions) 下载最新的构建产物。

### 方式三：Releases

访问 [GitHub Releases](https://github.com/AndreaFrederica/LunaLauncher/releases) 查看是否有预览版本。

## 安装步骤

### Windows

1. 下载启动器压缩包（`.zip`）
2. 解压到任意目录
3. 运行 `LunaLauncher.exe`

### Linux

1. 下载启动器压缩包（`.tar.gz`）
2. 解压到任意目录
3. 运行 `LunaLauncher`

```bash
tar -xzf LunaLauncher-linux-*.tar.gz
cd LunaLauncher
./LunaLauncher
```

### macOS

1. 下载 `.dmg` 文件
2. 打开并拖拽到应用程序文件夹
3. 从启动器或应用程序文件夹运行

## 首次运行

### Java 配置

启动器会自动检测系统中的 Java 安装。

如果未检测到或需要使用特定版本：

1. 打开设置
2. 进入"Java"选项卡
3. 点击"浏览"选择 Java 安装路径
4. 点击"应用"

### 内存分配

为实例分配内存：

1. 右键点击实例 → "编辑"
2. 进入"设置" → "Java"
3. 调整"最大内存分配"（建议：2-4 GB）
4. 保存并重启实例

## 常见问题

### Q: 启动器无法启动？

**A:** 检查以下几点：
- 确认已安装 Java 8 或更高版本
- 确保 `JAVA_HOME` 环境变量已设置
- Windows 用户：确保安装了 Visual C++ Redistributable

### Q: 下载速度慢？

**A:** 启用镜像下载：
1. 打开设置
2. 进入"账户"
3. 勾选"使用 BMCLAPI 镜像"

### Q: 游戏启动崩溃？

**A:** 尝试以下步骤：
- 检查 Java 版本是否与 Minecraft 版本兼容
- 减少分配的内存
- 查看日志文件获取详细错误信息

---

[← 返回用户指南](./)
