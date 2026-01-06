# 常见问题

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能错误或不完整。
> **请以人工书写的官方文档为准**。

---

## 安装与启动

### Q: 启动器无法启动？

**A:** 检查以下事项：

1. **Java 版本**
   - 确认已安装 Java 8 或更高版本
   - 设置 `JAVA_HOME` 环境变量

2. **Windows 用户**
   - 安装 [Visual C++ Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe)
   - 确保杀毒软件没有拦截

3. **Linux 用户**
   - 检查文件权限：`chmod +x LunaLauncher`
   - 安装依赖：`sudo apt install qt6-base-dev`

### Q: 提示缺少 DLL 文件？

**A:** Windows 用户需要安装 Visual C++ Redistributable。

下载：[https://aka.ms/vs/17/release/vc_redist.x64.exe](https://aka.ms/vs/17/release/vc_redist.x64.exe)

## 下载与更新

### Q: 下载速度很慢？

**A:** 启用 BMCLAPI 镜像：

1. 设置 → 账户
2. 勾选"使用 BMCLAPI 镜像"
3. 应用更改

### Q: 下载失败？

**A:** 尝试以下方法：

1. 检查网络连接
2. 禁用镜像，使用官方源
3. 清理下载缓存：设置 → 账户 → "清理缓存"

## 游戏启动

### Q: 游戏启动崩溃？

**A:** 检查以下事项：

1. **Java 版本兼容性**
   - Minecraft 1.17+ 需要 Java 17
   - Minecraft 1.16.5 需要 Java 8
   - 在实例设置中配置正确的 Java

2. **内存分配**
   - 减少分配的内存量
   - 确保系统有足够可用内存

3. **Mod 冲突**
   - 移除最近添加的 Mod
   - 检查 Mod 兼容性

### Q: 游戏启动后黑屏？

**A:** 可能的原因：

1. **显卡驱动问题**
   - 更新显卡驱动
   - 切换窗口模式/全屏模式

2. **Mod 问题**
   - 禁用所有 Mod 测试
   - 逐个启用排查

## P2P 联机

### Q: 无法连接到朋友？

**A:** 检查以下事项：

1. 确认房间代码正确
2. 确认主机仍在运行
3. 检查防火墙设置
4. 尝试切换联机方案

### Q: 游戏内频繁掉线？

**A:** 可能的原因：

1. 网络不稳定
2. 主机性能不足
3. Mod 冲突

## 镜像下载

### Q: BMCLAPI 下载失败？

**A:** 镜像支持仍在完善：

1. 临时禁用镜像使用官方源
2. 等待镜像同步
3. 通过 [GitHub Issues](https://github.com/AndreaFrederica/LunaLauncher/issues) 反馈问题

## 获取帮助

如果以上方法无法解决问题：

1. **查看日志**
   - 设置 → 日志
   - 查看详细错误信息

2. **提交 Issue**
   - [GitHub Issues](https://github.com/AndreaFrederica/LunaLauncher/issues)
   - 附上日志文件和复现步骤

3. **社区讨论**
   - [GitHub Discussions](https://github.com/AndreaFrederica/LunaLauncher/discussions)

---

[← 返回用户指南](./)
