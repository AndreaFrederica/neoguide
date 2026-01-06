# 用户文档

欢迎来到 YukariConnect 用户文档！本指南将帮助你使用 YukariConnect 进行 Minecraft LAN 联机。

## 目录

- [快速开始](#快速开始)
- [主机模式](#主机模式)
- [访客模式](#访客模式)
- [WebUI 使用](#webui-使用)
- [常见问题](#常见问题)

---

## 快速开始

### 前置要求

1. **Minecraft Java Edition** - 支持 LAN 世界的任意版本
2. **YukariConnect** - 从 [GitHub Releases](https://github.com/andrea-novel-helper/YukariConnect/releases) 下载
3. **网络连接** - 所有玩家需要稳定的互联网连接

### 下载与安装

#### Windows
1. 下载 `YukariConnect-win-x64.zip`
2. 解压到任意目录
3. 运行 `YukariConnect.exe`

#### Linux
1. 下载 `YukariConnect-linux-x64.tar.gz`
2. 解压：`tar -xzf YukariConnect-linux-x64.tar.gz`
3. 运行：`./YukariConnect`

#### macOS
1. 下载 `YukariConnect-osx-x64.zip`
2. 解压并运行 `YukariConnect`

### 首次启动

首次启动时，YukariConnect 会：
1. 自动生成 `machine_id.txt`（唯一标识符）
2. 创建默认配置文件 `yukari.json`
3. 启动 Web UI（默认 `http://localhost:5062`）

---

## 主机模式

### 启动主机

#### 方法 1: 使用 Web UI

1. 打开 `http://localhost:5062`
2. 点击「创建房间」
3. 输入玩家名称
4. 选择公共服务器（或使用自定义）
5. 点击「启动主机」

#### 方法 2: 使用 API

```bash
curl "http://localhost:5062/state/scanning?player=MyName"
```

### 主机状态流程

1. **Host_Prepare** - 准备启动
2. **Host_EasyTierStarting** - 启动 P2P 网络
3. **Host_MinecraftDetecting** - 扫描 Minecraft 服务器
4. **Host_Running** - 运行中

### 获取房间代码

主机启动成功后，会生成房间代码：

```
U/AB12-CD34-EF56-GH78
```

将此代码分享给要加入的朋友。

### 在 Minecraft 中开启 LAN

1. 在你的 Minecraft 世界中打开游戏
2. 按 `Esc` 打开菜单
3. 点击「对局域网开放」
4. 选择游戏模式
5. 点击「创建局域网世界」

YukariConnect 会自动检测到你的服务器。

---

## 访客模式

### 加入房间

#### 方法 1: 使用 Web UI

1. 打开 `http://localhost:5062`
2. 点击「加入房间」
3. 输入房间代码（如 `U/AB12-CD34-EF56-GH78`）
4. 输入玩家名称
5. 点击「加入」

#### 方法 2: 使用 API

```bash
curl "http://localhost:5062/state/guesting?room=U/AB12-CD34-EF56-GH78&player=MyName"
```

### 访客状态流程

1. **Guest_Prepare** - 准备加入
2. **Guest_EasyTierStarting** - 连接 P2P 网络
3. **Guest_DiscoveringCenter** - 发现主机
4. **Guest_ConnectingScaffolding** - 连接 Scaffolding
5. **Guest_Running** - 运行中

### 连接到 Minecraft

连接成功后：

1. 打开 Minecraft
2. 在多人游戏中，你应该能在 LAN 世界列表中看到主机的服务器
3. 双击加入即可

---

## WebUI 使用

### 界面概览

WebUI 提供以下功能：

| 功能 | 说明 |
|------|------|
| **状态面板** | 显示当前状态和角色 |
| **房间代码** | 显示或输入房间代码 |
| **玩家列表** | 显示所有已连接玩家 |
| **日志面板** | 实时查看运行日志 |
| **配置设置** | 修改网络和其他配置 |

### 主机界面

1. **创建房间** - 设置玩家名称和端口
2. **房间信息** - 查看房间代码和玩家列表
3. **Minecraft 服务器** - 查看检测到的服务器信息
4. **网络状态** - 查看 P2P 连接状态

### 访客界面

1. **加入房间** - 输入房间代码和玩家名称
2. **连接状态** - 查看连接进度
3. **玩家列表** - 查看房间内所有玩家
4. **日志** - 查看连接详细日志

---

## 常见问题

### Q: 找不到 LAN 世界？

**A:** 可能的原因：
1. 主机未正确开启 LAN 世界
2. 防火墙阻止了连接
3. P2P 网络未正确连接

**解决方法：**
1. 确认主机在 Minecraft 中开启了 LAN
2. 检查防火墙设置，允许 YukariConnect 通过
3. 在 WebUI 中查看网络连接状态

### Q: 连接超时怎么办？

**A:**
1. 检查互联网连接是否稳定
2. 尝试更换公共服务器
3. 检查房间代码是否正确
4. 查看日志面板了解详细错误

### Q: 能和 Terracotta 用户一起玩吗？

**A:** 可以！YukariConnect 完全兼容 Scaffolding 协议，可以和 Terracotta 用户无缝联机。

### Q: 支持多少玩家？

**A:** 理论上没有限制，但建议：
- **2-4 人**：最佳体验
- **5-10 人**：良好体验
- **10+ 人**：取决于网络条件和服务器性能

### Q: 需要端口转发吗？

**A:** 不需要。YukariConnect 使用 P2P 打洞技术，无需手动配置端口转发。

### Q: 可以同时加入多个房间吗？

**A:** 不可以。每个实例只能加入一个房间。如需加入多个房间，请运行多个 YukariConnect 实例（使用不同的配置目录）。

### Q: Linux 上权限问题？

**A:** 如果遇到权限错误：
```bash
chmod +x YukariConnect
chmod +x resource/easytier-core
```

### Q: 房间代码无效？

**A:** 确认：
1. 房间代码格式正确：`U/XXXX-XXXX-XXXX-XXXX`
2. 字符集只包含：`0-9A-HJ-NP-Z`
3. 主机仍在运行

### Q: 如何查看详细日志？

**A:**
1. 在 WebUI 中查看实时日志
2. 或访问 `http://localhost:5062/log` 获取 SSE 日志流
3. 查看日志文件（如果配置了文件日志）

### Q: 能自定义玩家名称吗？

**A:** 可以。在创建/加入房间时输入任意名称，或使用 API 的 `player` 参数。

### Q: 支持哪些 Minecraft 版本？

**A:** 支持 Java Edition 所有版本的 LAN 功能。不支持 Bedrock Edition。

### Q: 网络延迟高怎么办？

**A:**
1. 选择地理位置更近的公共服务器
2. 确保所有玩家网络稳定
3. 关闭其他占用带宽的应用

### Q: 如何停止房间？

**A:**
1. WebUI：点击「停止房间」
2. API：`POST /room/stop`
3. 直接关闭应用（会自动清理）

---

## 配置文件

### yukari.json

```json
{
  "Port": 5062,
  "ScaffoldingPort": 13448,
  "WebuiUrl": "http://localhost:5062",
  "PublicServerUrl": "",
  "MachineIdPath": "resource/machine_id.txt",
  "EasytierCorePath": "resource/easytier-core",
  "EasytierCliPath": "resource/easytier-cli",
  "LauncherCustomString": ""
}
```

### 配置项说明

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `Port` | Web UI 端口 | 5062 |
| `ScaffoldingPort` | Scaffolding 服务器端口 | 13448 |
| `WebuiUrl` | Web UI URL | http://localhost:5062 |
| `PublicServerUrl` | 自定义公共服务器 | "" |
| `MachineIdPath` | Machine ID 文件路径 | resource/machine_id.txt |
| `EasytierCorePath` | EasyTier 核心路径 | resource/easytier-core |
| `EasytierCliPath` | EasyTier CLI 路径 | resource/easytier-cli |
| `LauncherCustomString` | 自定义 Vendor 字符串 | "" |

---

## 技术支持

如遇到问题：
1. 查看 [开发者文档](../developer/)
2. 提交 [GitHub Issue](https://github.com/andrea-novel-helper/YukariConnect/issues)
3. 查看 [Scaffolding 协议文档](../developer/#scaffolding-协议)

---

*祝你们联机愉快！🌸*
