# 构建指南

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

---

本文档介绍如何在各个平台上构建 Luna Launcher。

## 前置要求

### 通用要求

- **Git** - 用于克隆源代码
- **CMake** - 构建系统
- **Java Development Kit 8+** - Minecraft 需要
- **Ninja** - 构建后端（推荐）

### 获取源代码

```bash
git clone --recursive https://github.com/AndreaFrederica/LunaLauncher.git
cd LunaLauncher
```

## Windows 构建

Luna Launcher 为 Windows 提供两个自动化构建环境。

### 方案 A：MSYS2 + GCC（推荐）

使用 MSYS2 的 UCRT64 GCC 工具链。

#### 方法 1：使用 Msys2Manager (m2m)

[m2m](https://github.com/AndreaFrederica/Msys2Manager/releases) 是专门用于管理 MSYS2 环境的 CLI 工具。

**步骤：**

```powershell
# 1. 设置 JAVA_HOME
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.12.101-hotspot"

# 2. 引导安装 MSYS2（仅首次）
m2m bootstrap

# 3. 配置和构建
m2m run configure
m2m run build

# 4. 安装
m2m run install
```

**常用命令：**

| 命令 | 说明 |
|------|------|
| `m2m init` | 初始化配置 |
| `m2m bootstrap` | 安装 MSYS2 |
| `m2m run configure` | 配置 CMake |
| `m2m run build` | 构建项目 |
| `m2m run install` | 安装 |
| `m2m shell` | 打开 shell |

#### 方法 2：使用 PowerShell 脚本

```powershell
# 1. 设置 JAVA_HOME
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.12.101-hotspot"

# 2. 初始化 MSYS2 环境（仅首次）
.\tools\msys2\bootstrap.ps1

# 3. 配置和构建
.\tools\msys2\run.ps1 configure
.\tools\msys2\run.ps1 build

# 4. 安装
.\tools\msys2\run.ps1 install
```

### 方案 B：Pixi + MSVC

使用 Pixi 配合 MSVC 工具链。

**前置要求：**
- Visual Studio 2022（或 Build Tools）
- [Pixi](https://pixi.sh/latest/installation/)

**重要：** 必须在 **x64 Native Tools Command Prompt for VS 2022** 中运行。

```powershell
# 在 x64 Native Tools Command Prompt 中：

# 1. 检查/配置 MSVC
pixi run check_msvc

# 2. 安装 Qt
pixi run install_qt

# 3. 安装 vcpkg
pixi run install_vcpkg

# 4. 配置
pixi run configure

# 5. 构建
pixi run build

# 6. 安装
pixi run install
```

## Linux 构建

参考 [Prism Launcher 构建说明](https://prismlauncher.org/wiki/development/)。

### Ubuntu/Debian

```bash
# 安装依赖
sudo apt update
sudo apt install build-essential cmake ninja-build \
    qt6-base-dev qt6-tools-dev \
    libqt6svg6-dev libqt6imageformats-dev \
    extra-cmake-modules ccache

# 配置
cmake -Bbuild -DCMAKE_INSTALL_PREFIX=install -G Ninja

# 构建
cmake --build build

# 安装
cmake --install build
```

### Fedora

```bash
# 安装依赖
sudo dnf install gcc-c++ cmake ninja-build \
    qt6-qtbase-devel qt6-qtsvg-devel \
    extra-cmake-modules ccache

# 配置和构建
cmake -Bbuild -DCMAKE_INSTALL_PREFIX=install -G Ninja
cmake --build build
cmake --install build
```

## macOS 构建

参考 [Prism Launcher 构建说明](https://prismlauncher.org/wiki/development/)。

### 使用 Homebrew

```bash
# 安装依赖
brew install cmake ninja qt@6 ccache

# 配置
cmake -Bbuild -DCMAKE_INSTALL_PREFIX=install -G Ninja

# 构建
cmake --build build

# 安装
cmake --install build
```

## 手动构建说明

### CMake 选项

```bash
# Debug 构建
cmake -Bbuild -DCMAKE_INSTALL_PREFIX=install \
    -DENABLE_LTO=ON -DCMAKE_BUILD_TYPE=Debug -G Ninja

# Release 构建
cmake -Bbuild -DCMAKE_INSTALL_PREFIX=install \
    -DENABLE_LTO=ON -DCMAKE_BUILD_TYPE=Release -G Ninja

# 使用 Qt 5
cmake -Bbuild -DLauncher_QT_VERSION_MAJOR=5 -G Ninja

# 使用 ccache
cmake -Bbuild -DCMAKE_CXX_COMPILER_LAUNCHER=ccache -G Ninja
```

### 便携版构建

```bash
cmake --install build --component portable
```

## IDE 配置

### VS Code

安装 [C/C++ 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)

配置 `.vscode/c_cpp_properties.json`：

```json
{
    "configurations": [{
        "name": "Windows (MSYS2)",
        "includePath": [
            "${workspaceFolder}/**",
            "C:/msys64/ucrt64/include/**"
        ],
        "compilerPath": "C:/msys64/ucrt64/bin/gcc.exe",
        "compileCommands": "${workspaceFolder}/build/compile_commands.json",
        "cppStandard": "c++17"
    }]
}
```

### Qt Creator

```bash
# 安装 Qt Creator
pacboy -S qt-creator:p

# 打开
qtcreator

# File → Open File or Project → 选择 CMakeLists.txt
```

## 故障排除

### Qt 未找到

确保 `CMAKE_PREFIX_PATH` 指向正确的 Qt 安装路径。

### OpenSSL 错误（Qt 5）

手动复制 OpenSSL DLL：

```bash
# Windows MSYS2
cp /ucrt64/bin/libcrypto-1_1-x64.dll /ucrt64/bin/libssl-1_1-x64.dll install

# Windows MSVC
robocopy C:\Qt\Tools\OpenSSL\Win_x64\bin\ install libcrypto-1_1-x64.dll libssl-1_1-x64.dll
```

---

[← 返回开发者文档](./)
