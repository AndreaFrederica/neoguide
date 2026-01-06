# 架构设计

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

---

## 项目架构

Luna Launcher 继承了 Prism Launcher 的架构，是一个基于 Qt 的模块化应用程序。

### 核心设计

- **组件系统**：所有模块（Minecraft、Mod 加载器、库）都是独立的组件
- **实例隔离**：每个实例完全独立，互不干扰
- **任务驱动**：异步任务系统处理所有耗时操作

## 模块结构

```
launcher/
├── Application.cpp          # 主应用程序入口
├── ui/                      # 用户界面层
│   ├── MainWindow.cpp       # 主窗口
│   ├── InstanceWindow.cpp   # 实例窗口
│   └── pages/               # 各个页面
├── minecraft/               # Minecraft 逻辑
│   ├── launch/              # 启动逻辑
│   ├── update/              # 更新逻辑
│   └── GameOptions.cpp      # 游戏选项
├── modplatform/             # Mod 平台支持
│   ├── atlauncher/          # ATLauncher
│   ├── flame/               # CurseForge
│   └── modrinth/            # Modrinth
├── meta/                    # 元数据管理
├── icons/                   # 图标管理
├── net/                     # 网络层
│   └── ByteArraySink.h      # 下载处理
├── tasks/                   # 任务系统
│   └── Task.cpp             # 异步任务
└── translations/            # 国际化
```

## 关键组件

### Application

主应用程序类，负责：
- 初始化 Qt 应用
- 加载配置
- 管理主题
- 初始化主窗口

### MainWindow

主窗口类，负责：
- 实例列表显示
- 主题切换
- 菜单栏
- 状态栏

### Instance

实例类，表示一个 Minecraft 实例：
- 实例配置
- Mod 列表
- 资源包
- 游戏设置

### Minecraft Launch

Minecraft 启动流程：

```
1. 检查 Java 版本
2. 验证游戏文件
3. 下载缺失文件
4. 处理 Libraries
5. 处理 Assets
6. 生成启动参数
7. 启动游戏进程
```

### 任务系统

异步任务系统，处理耗时操作：

```cpp
// 任务示例
class MyTask : public Task {
    void executeTask() override {
        setStatus("Processing...");
        // 执行操作
        emitSucceeded();
    }
};
```

## Luna 特有功能

### BMCLAPI 集成

**客户端 URL 重写策略：**

1. **Library 下载** (`launcher/minecraft/Library.cpp`)
   ```cpp
   // 重写 Library URL
   if (url.contains("libraries.minecraft.net")) {
       url = replaceWithMirror(url, "bmclapi");
   }
   ```

2. **Asset 下载** (`launcher/minecraft/update/AssetUpdateTask.cpp`)
   ```cpp
   // 重写 Asset URL
   if (url.contains("resources.download.minecraft.net")) {
       url = replaceWithMirror(url, "bmclapi-assets");
   }
   ```

3. **Meta URL 重写**
   ```cpp
   // 重写 Meta URL
   if (url.contains("piston-meta.mojang.com")) {
       url = replaceWithMirror(url, "bmclapi-meta");
   }
   ```

### P2P 联机

**集成方式：**
- 作为可选组件集成
- 启动时加载联机模块
- 与游戏进程通信

### Fluent 主题

**主题系统：**
- 基于 Qt 样式表
- 亚克力材质效果
- 圆角和阴影
- 自定义图标

## 依赖库

### 核心依赖

| 库 | 用途 |
|------|------|
| Qt | GUI 框架 |
| cmark | Markdown 解析 |
| quazip | ZIP 压缩 |
| libnbtplusplus | NBT 数据 |
| katabasis | OAuth 认证 |

### Git 子模块

所有依赖库通过 Git 子模块管理：

```bash
# 克隆时获取子模块
git clone --recursive https://github.com/AndreaFrederica/LunaLauncher.git

# 或后续更新
git submodule update --init --recursive
```

## 数据流

### 实例启动流程

```
用户点击启动
    ↓
检查实例配置
    ↓
验证游戏文件
    ↓
下载缺失文件（使用镜像）
    ↓
处理 Libraries
    ↓
处理 Assets
    ↓
生成启动参数
    ↓
启动游戏进程
    ↓
监控游戏状态
```

### Modpack 导入流程

```
用户选择文件
    ↓
检测文件类型
    ↓
解析 Modpack 格式
    ↓
创建新实例
    ↓
下载依赖文件
    ↓
安装 Mods
    ↓
完成导入
```

## 扩展开发

### 添加新功能

1. 确定功能所属模块
2. 创建或修改相关类
3. 更新 UI（如需要）
4. 添加翻译字符串
5. 编写测试

### 代码风格

- 遵循 Qt 代码风格
- 使用 C++17 特性
- 添加必要注释
- 编写单元测试

---

[← 返回开发者文档](./)
