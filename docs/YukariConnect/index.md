# YukariConnect 文档

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

> **"境界与境界相连，即是缘。"</br>—— 八云紫 (Yakumo Yukari)</br>名字来源于东方Project的八云紫

欢迎使用 YukariConnect 文档！这是一套 Minecraft LAN 虚拟网络解决方案，让你和朋友通过互联网进行局域网联机。

## 项目概述

YukariConnect 是一个基于 P2P 网状网络的 Minecraft LAN 虚拟网络工具，兼容 Scaffolding 协议（与 Terracotta 完全兼容）。

### 核心功能

- **P2P 虚拟网络**：使用 EasyTier 创建网状网络，支持多节点互联
- **Scaffolding 协议**：与 Terracotta 完全兼容，支持房间代码和玩家发现
- **主机模式 (HostCenter)**：托管 Minecraft 服务器，通过房间代码邀请玩家
- **访客模式 (Guest)**：使用房间代码加入远程主机
- **Minecraft FakeServer**：将远程服务器广播到本地 LAN，实现无缝集成
- **网络抽象层**：清晰分离应用逻辑与网络实现
- **动态端口管理**：自动配置白名单和端口转发

## 文档导航

### 📖 用户文档

如果你是玩家，想要使用 YukariConnect 进行联机，请查看：

**[→ 进入用户文档](./user/)**

用户文档包含：
- 快速开始指南
- 主机模式使用
- 访客模式使用
- WebUI 使用说明
- 常见问题解答
- 故障排除

### 👨‍💻 开发者文档

如果你是开发者，想要了解内部实现或集成到你的启动器，请查看：

**[→ 进入开发者文档](./developer/)**

开发者文档包含：
- 项目架构
- API 参考
- Scaffolding 协议文档
- 启动器集成指南
- WebSocket API
- 开发环境配置

## 项目基本信息

| 属性 | 值 |
|------|-----|
| 版本 | 0.1.0 |
| 许可证 | MPL-2.0 |
| 后端语言 | C# (.NET 8) |
| 前端语言 | TypeScript (Vue 3) |
| 目标平台 | Windows, Linux, macOS |

## 技术栈

### 后端
- **.NET 8** - 主运行时
- **ASP.NET Core** - Web 框架
- **EasyTier** - P2P 网络层
- **Scaffolding** - 房间管理协议

### 前端
- **Vue 3** - 前端框架
- **Quasar** - UI 组件库
- **TypeScript** - 类型安全
- **Vite** - 构建工具

## 网络拓扑

```
                    Internet
                       |
                 [Public Servers]
                  /     |     \
                 /      |      \
           [Host]  ---- P2P Mesh ----  [Guest 1]
           10.144.144.1               10.144.144.2
                |
           [Guest 2]
           10.144.144.3
```

## 房间代码格式

YukariConnect 使用与 Terracotta 兼容的房间代码格式：

```
U/NNNN-NNNN-SSSS-SSSS
```

- `U/` - 协议前缀 (Universal)
- `NNNN-NNNN` - 网络名称标识 (校验和：能被 7 整除)
- `SSSS-SSSS` - 网络密钥 (校验和：能被 7 整除)

**字符集**: `0-9A-HJ-NP-Z` (排除 I、O 避免混淆)

**示例**: `U/AB12-CD34-EF56-GH78`

## 状态机

### 主机流程
```
Idle → Host_Prepare → Host_EasyTierStarting → Host_MinecraftDetecting → Host_Running
```

### 访客流程
```
Idle → Guest_Prepare → Guest_EasyTierStarting → Guest_DiscoveringCenter
→ Guest_ConnectingScaffolding → Guest_Running
```

## 兼容性

### 协议兼容
- **Scaffolding**: 与 Terracotta 完全兼容
- **REST API**: Terracotta 兼容端点 + Yukari 扩展端点

### 平台支持
- **Windows**: ✅ 完全支持
- **Linux**: ✅ 完全支持
- **macOS**: ✅ 完全支持

### Minecraft 版本
- **Java Edition**: ✅ 支持 LAN 世界
- **Bedrock Edition**: ❌ 暂不支持

## 与 Terracotta 的对比

| 特性 | YukariConnect | Terracotta |
|------|---------------|------------|
| Scaffolding 协议 | ✅ 兼容 | ✅ 原生 |
| REST API | ✅ 兼容 + 扩展 | ✅ 基础 |
| Web UI | ✅ Quasar Vue 3 | ✅ 嵌入式 |
| 网络实现 | EasyTier | EasyTier |
| 启动器集成 | ✅ 文档完善 | ✅ 原生 |
| 自定义 Vendor | ✅ 运行时 API | ❌ 不支持 |
| 开源协议 | MPL-2.0 | AGPL-3.0 |

## 官方链接

- **GitHub**: [YukariConnect](https://github.com/andrea-novel-helper/YukariConnect)
- **Scaffolding**: [Scaffolding-MC](https://github.com/Scaffolding-MC/Scaffolding-MC)
- **EasyTier**: [EasyTier](https://github.com/EasyTier/EasyTier)

## 名字来源

> **YukariConnect** 的名字来源于 **东方Project** 中的角色 **八云紫 (Yakumo Yukari)**。

八云紫是掌管「境界」的妖怪，拥有操纵任何境界的能力。她可以自由地开启和连接不同的空间，就像 YukariConnect 连接不同玩家的世界一样。

**能力：** 操纵境界</br>**主题曲：** 明日ハレの日、懐カイノ月</br>**登场作：** 东方妖妖梦 ～ Perfect Cherry Blossom.

## 许可证

MPL-2.0 License

**简单说明：**
- ✅ 可自由使用、修改和分发
- ✅ 可用于商业项目
- ✅ 修改的代码必须开源
- ✅ 必须保留版权声明

---

*让境界相连，让友情的 LAN 跨越互联网。* 🌸
