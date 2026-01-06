# 开发者文档

欢迎来到 YukariConnect 开发者文档！本文档面向希望了解项目内部实现或集成 YukariConnect 的开发者。

## 目录

- [项目架构](#项目架构)
- [API 参考](#api-参考)
- [Scaffolding 协议](#scaffolding-协议)
- [启动器集成](#启动器集成)
- [WebSocket API](#websocket-api)
- [开发环境](#开发环境)

---

## 项目架构

### 整体架构

```
YukariConnect
├── 后端 (.NET 8)
│   ├── Web API (ASP.NET Core)
│   ├── WebSocket 服务
│   ├── Scaffolding 协议实现
│   ├── Minecraft LAN 发现
│   └── 网络抽象层 (EasyTier)
│
└── 前端 (Vue 3 + Quasar)
    ├── 状态面板
    ├── 房间管理
    ├── 玩家列表
    └── 日志查看器
```

### 后端目录结构

```
YukariConnect/
├── Configuration/          # 配置管理
├── Endpoints/             # REST API 端点
│   ├── MetaEndpoints.cs
│   ├── StateEndpoints.cs
│   ├── RoomEndpoints.cs
│   ├── MinecraftEndpoints.cs
│   └── EasytierEndpoints.cs
├── Logging/               # 日志服务
├── Minecraft/             # Minecraft LAN 发现
│   ├── FakeServer.cs      # 虚拟服务器广播
│   └── LanListener.cs     # LAN 广播监听
├── Network/               # 网络抽象层
│   ├── INetworkNode.cs    # 节点操作接口
│   ├── IPeerDiscoveryService.cs  # 公共服务器发现
│   ├── INetworkProcess.cs # 进程生命周期
│   └── EasyTier/          # EasyTier 实现
├── Scaffolding/           # Scaffolding 协议
│   ├── Server.cs          # TCP 服务器
│   ├── Client.cs          # TCP 客户端
│   └── Protocol.cs        # 协议处理
├── Services/              # 核心服务
│   ├── RoomService.cs     # 房间管理
│   └── StateMachine.cs    # 状态机
├── WebSocket/             # WebSocket 服务
└── Program.cs             # 入口点
```

### 前端目录结构

```
Frontend/
├── src/
│   ├── components/        # Vue 组件
│   │   ├── StatusPanel.vue
│   │   ├── RoomControls.vue
│   │   ├── PlayerList.vue
│   │   └── LogViewer.vue
│   ├── composables/       # 组合式函数
│   │   ├── useRoom.ts
│   │   ├── useWebSocket.ts
│   │   └── useApi.ts
│   ├── stores/            # Pinia 状态管理
│   │   ├── room.ts
│   │   └── config.ts
│   └── types/             # TypeScript 类型
└── quasar.config.ts
```

---

## API 参考

### 基础信息

| 属性 | 值 |
|------|-----|
| 基础 URL | `http://localhost:5062` |
| 响应格式 | JSON |
| 字符编码 | UTF-8 |

### Meta 端点

#### 获取元数据

```http
GET /meta
```

**响应：**
```json
{
  "version": "0.1.0",
  "compileTimestamp": "2025-12-28T10:00:00Z",
  "easyTierVersion": "0.10.0",
  "yggdrasilPort": "13448",
  "targetTuple": "X64-X64-Windows",
  "targetArch": "X64",
  "targetVendor": "X64",
  "targetOS": "Microsoft Windows 10.0.26200",
  "targetEnv": ".NET 8.0.0"
}
```

### State 端点

#### 获取当前状态

```http
GET /state
```

**响应：**
```json
{
  "state": "waiting",
  "role": null,
  "room": null,
  "profileIndex": 0,
  "profiles": [
    {
      "name": "Player1",
      "machineId": "abc123...",
      "vendor": "YukariConnect 0.1.0",
      "kind": "HOST"
    }
  ],
  "url": null,
  "difficulty": null
}
```

**状态值：**
| 值 | 描述 |
|-------|-------------|
| `waiting` | 空闲，等待操作 |
| `host-scanning` | 主机：正在扫描 Minecraft 服务器 |
| `host-starting` | 主机：正在启动网络服务 |
| `host-ok` | 主机：运行成功 |
| `guest-connecting` | 客户端：正在连接房间 |
| `guest-starting` | 客户端：正在启动网络服务 |
| `guest-ok` | 客户端：连接成功 |
| `exception` | 发生错误 |

#### 启动主机 (Terracotta 兼容)

```http
GET /state/scanning?player=PlayerName
```

#### 加入房间 (Terracotta 兼容)

```http
GET /state/guesting?room=U/ABCD-EFGH-IJKL-MNOP&player=PlayerName
```

### Room 端点 (Yukari 扩展)

#### 获取房间状态

```http
GET /room/status
```

**响应：**
```json
{
  "state": "Host_Running",
  "role": "host",
  "error": null,
  "roomCode": "U/ABCD-EFGH-IJKL-MNOP",
  "players": [
    {
      "name": "Player1",
      "machineId": "abc123...",
      "vendor": "YukariConnect 0.1.0",
      "kind": "HOST"
    }
  ],
  "minecraftPort": 25565,
  "lastUpdate": "2025-12-28T10:30:00Z"
}
```

#### 启动主机

```http
POST /room/host/start
Content-Type: application/json

{
  "scaffoldingPort": 13448,
  "playerName": "Host",
  "launcherCustomString": "MyLauncher/1.0.0"
}
```

#### 启动客户端

```http
POST /room/guest/start
Content-Type: application/json

{
  "roomCode": "U/ABCD-EFGH-IJKL-MNOP",
  "playerName": "Guest",
  "launcherCustomString": "MyLauncher/1.0.0"
}
```

#### 停止房间

```http
POST /room/stop
```

#### 错误重试

```http
POST /room/retry
```

### Minecraft 端点

#### 列出所有服务器

```http
GET /minecraft/servers
```

**响应：**
```json
{
  "servers": [
    {
      "endPoint": "192.168.1.100:25565",
      "motd": "我的 Minecraft 服务器",
      "isVerified": true,
      "version": "1.20.1",
      "onlinePlayers": 3,
      "maxPlayers": 20
    }
  ],
  "count": 1
}
```

#### 获取 Minecraft 状态

```http
GET /minecraft/status
```

### 配置端点

#### 获取配置

```http
GET /config
```

#### 设置启动器自定义字符串

```http
POST /config/launcher
Content-Type: application/json

{
  "launcherCustomString": "MyLauncher/1.0.0"
}
```

### EasyTier 端点

#### 列出公共服务器

```http
GET /easytier/servers
```

**响应：**
```json
{
  "servers": [
    {
      "hostname": "public1.easytier.pub",
      "port": 22016
    }
  ]
}
```

---

## Scaffolding 协议

### 协议概述

Scaffolding 是一个自定义的 TCP 二进制协议，用于房间管理和玩家发现。

### 传输层规格

| 项目 | 值 |
|------|-----|
| 传输协议 | TCP |
| 默认端口 | 13448 |
| 超时时间 | 64 秒 |
| 编码方式 | 二进制协议 |
| 字节序 | Big Endian (网络字节序) |

### 数据包格式

#### 请求格式

```
┌─────────────┬───────────────────┬────────────────────┬──────────────────┐
│ Kind Length │ Kind (UTF-8)      │ Body Length (4B)   │ Body Data        │
│   1 byte    │  variable         │   Big Endian u32   │   variable       │
└─────────────┴───────────────────┴────────────────────┴──────────────────┘
```

#### 响应格式

```
┌───────────┬────────────────────┬──────────────────┐
│ Status    │ Data Length (4B)   │ Data             │
│  1 byte   │   Big Endian u32   │   variable       │
└───────────┴────────────────────┴──────────────────┘
```

### 协议命令

#### 1. `c:ping` - 连接验证

**请求：**
```
Kind: "c:ping"
Body: 16 bytes fingerprint
```

**Fingerprint 常量：**
```
0x41, 0x57, 0x48, 0x44, 0x86, 0x37, 0x40, 0x59,
0x57, 0x44, 0x92, 0x43, 0x96, 0x99, 0x85, 0x01
```

#### 2. `c:protocols` - 获取协议列表

**请求：**
```
Kind: "c:protocols"
Body: 空
```

**响应：**
```
"c:ping\0c:protocols\0c:server_port\0c:player_ping\0c:player_profiles_list"
```

#### 3. `c:server_port` - 获取 MC 服务器端口

**请求：**
```
Kind: "c:server_port"
Body: 空
```

**响应：**
```
[port_hi, port_lo]  // Big Endian u16
```

#### 4. `c:player_ping` - 玩家心跳/注册

**请求：**
```json
{
  "name": "PlayerName",
  "machine_id": "0123456789abcdef0123456789abcdef",
  "vendor": "Luna"
}
```

#### 5. `c:player_profiles_list` - 获取玩家列表

**请求：**
```
Kind: "c:player_profiles_list"
Body: 空
```

**响应：**
```json
[
  {
    "name": "HostPlayer",
    "machine_id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "vendor": "Luna",
    "kind": "HOST"
  }
]
```

---

## 启动器集成

### 集成步骤

#### 1. 检测 YukariConnect

检查 YukariConnect 是否正在运行：

```bash
curl http://localhost:5062/meta
```

#### 2. 设置自定义 Vendor

```bash
curl -X POST http://localhost:5062/config/launcher \
  -H "Content-Type: application/json" \
  -d '{"launcherCustomString": "MyLauncher/1.0.0"}'
```

#### 3. 启动主机

```bash
curl "http://localhost:5062/state/scanning?player=PlayerName"
```

#### 4. 加入房间

```bash
curl "http://localhost:5062/state/guesting?room=U/ABCD-EFGH-IJKL-MNOP&player=PlayerName"
```

### C# 集成示例

```csharp
using System.Net.Http;

class YukariConnectClient
{
    private readonly HttpClient _http = new();
    private const string BaseUrl = "http://localhost:5062";

    public async Task<bool> IsAvailableAsync()
    {
        try
        {
            var response = await _http.GetAsync($"{BaseUrl}/meta");
            return response.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }

    public async Task SetLauncherCustomStringAsync(string customString)
    {
        var payload = new { launcherCustomString = customString };
        var content = new StringContent(
            JsonSerializer.Serialize(payload),
            Encoding.UTF8,
            "application/json"
        );
        await _http.PostAsync($"{BaseUrl}/config/launcher", content);
    }

    public async Task StartHostAsync(string playerName)
    {
        await _http.GetAsync($"{BaseUrl}/state/scanning?player={playerName}");
    }

    public async Task JoinRoomAsync(string roomCode, string playerName)
    {
        await _http.GetAsync($"{BaseUrl}/state/guesting?room={roomCode}&player={playerName}");
    }

    public async Task<RoomStatus?> GetRoomStatusAsync()
    {
        var response = await _http.GetAsync($"{BaseUrl}/room/status");
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<RoomStatus>(json);
    }
}
```

### Python 集成示例

```python
import requests

class YukariConnectClient:
    BASE_URL = "http://localhost:5062"

    def is_available(self):
        try:
            r = requests.get(f"{self.BASE_URL}/meta")
            return r.status_code == 200
        except:
            return False

    def set_launcher_custom_string(self, custom_string):
        payload = {"launcherCustomString": custom_string}
        r = requests.post(f"{self.BASE_URL}/config/launcher", json=payload)
        r.raise_for_status()

    def start_host(self, player_name):
        r = requests.get(f"{self.BASE_URL}/state/scanning", params={"player": player_name})
        r.raise_for_status()

    def join_room(self, room_code, player_name):
        r = requests.get(f"{self.BASE_URL}/state/guesting",
                        params={"room": room_code, "player": player_name})
        r.raise_for_status()

    def get_room_status(self):
        r = requests.get(f"{self.BASE_URL}/room/status")
        r.raise_for_status()
        return r.json()
```

---

## WebSocket API

### 连接

```javascript
const ws = new WebSocket('ws://localhost:5062/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};
```

### 消息类型

#### 状态更新

```json
{
  "type": "state",
  "state": "host-ok",
  "role": "host",
  "room": "U/ABCD-EFGH-IJKL-MNOP"
}
```

#### 玩家列表更新

```json
{
  "type": "profiles",
  "profiles": [
    {
      "name": "Player1",
      "machineId": "abc123...",
      "vendor": "YukariConnect 0.1.0",
      "kind": "HOST"
    }
  ]
}
```

#### 日志消息

```json
{
  "type": "log",
  "level": "info",
  "message": "EasyTier started successfully",
  "timestamp": "2025-12-28T10:30:00Z"
}
```

---

## 开发环境

### 后端开发

#### 前置要求
- .NET 8 SDK
- Docker (可选，用于容器化)

#### 构建项目

```bash
cd YukariConnect
dotnet build
```

#### 运行项目

```bash
dotnet run
```

#### 运行测试

```bash
dotnet test
```

### 前端开发

#### 前置要求
- Node.js 18+
- pnpm 或 yarn

#### 安装依赖

```bash
cd Frontend
pnpm install
```

#### 启动开发服务器

```bash
quasar dev
```

#### 构建生产版本

```bash
quasar build
```

---

## 许可证

MPL-2.0 License

**开发者请注意：**
- 修改的代码必须开源
- 必须保留版权声明
- 可以用于商业项目

---

*让境界在代码中相连。🌸*
