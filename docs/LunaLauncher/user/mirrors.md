# 镜像下载加速

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

---

Luna Launcher 内置支持社区镜像 API，让国内用户享受更快的下载速度。

## BMCLAPI

BMCLAPI 是国内常用的 Minecraft 资源镜像服务。

### 支持的内容

- Minecraft 游戏文件
- Libraries（依赖库）
- Assets（资源文件）
- Meta 文件

### 启用 BMCLAPI

1. 打开 Luna Launcher
2. 进入"设置" → "账户"
3. 勾选"使用 BMCLAPI 镜像"
4. 点击"应用"

### 工作原理

Luna Launcher 使用**客户端 URL 重写**策略：

1. 保持使用 Prism Meta 格式的版本索引
2. 拦截下载请求
3. 将 Mojang 官方 URL 重写为 BMCLAPI 镜像 URL
4. 自动处理不同来源的路径调整

### 下载速度对比

| 内容类型 | 官方源 | BMCLAPI 镜像 |
|----------|--------|--------------|
| 游戏文件 | 较慢 | 快 |
| Libraries | 慢 | 快 |
| Assets | 慢 | 快 |

## 其他镜像

除了 BMCLAPI，Luna Launcher 还支持其他社区镜像。

### 添加自定义镜像

1. 打开设置 → 账户
2. 点击"添加镜像"
3. 输入镜像 URL
4. 保存

### 镜像故障转移

当镜像不可用时，启动器会自动回退到官方源，确保下载成功。

## 注意事项

### 镜像同步延迟

镜像可能存在短暂的同步延迟，通常几分钟到几小时。

如果遇到下载失败：
- 等待镜像同步
- 或临时禁用镜像使用官方源

### 部分场景不可用

BMCLAPI 支持仍在完善中，部分场景可能不可用。如果遇到问题，请通过 [GitHub Issues](https://github.com/AndreaFrederica/LunaLauncher/issues) 反馈。

---

[← 返回用户指南](./)
