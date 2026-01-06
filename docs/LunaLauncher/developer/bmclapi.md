# BMCLAPI 集成

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

---

## 背景

BMCLAPI 是国内常用的 Minecraft 资源镜像服务，可以显著提升国内用户的下载速度。

### 挑战

Prism Launcher 使用自定义的元数据格式（`index.json`），而 BMCLAPI/Mojang 使用标准格式（`version_manifest_v2.json`）。

**关键差异：**

| 特性 | Prism Meta | BMCLAPI/Mojang |
|------|------------|----------------|
| 依赖声明 | 显式（顶层声明） | 隐式（在版本 JSON 内） |
| 组件系统 | 支持（可混搭） | 不支持 |
| Mod 加载器 | 包含在元数据中 | 不包含 |

## 解决方案

Luna Launcher 采用**客户端 URL 重写**策略。

### 策略说明

1. **保持使用 Prism Meta 格式**作为版本索引
2. **拦截下载请求**，重写 URL 到镜像
3. **自动处理路径调整**

### 实现代码

#### Library 下载

`launcher/minecraft/Library.cpp`

```cpp
// 重写 Library URL 到 BMCLAPI
if (url.contains("libraries.minecraft.net")) {
    url = rewriteUrl(url, "https://bmclapi2.bangbang93.com/maven");
}
```

#### Asset 下载

`launcher/minecraft/update/AssetUpdateTask.cpp`

```cpp
// 重写 Asset URL 到 BMCLAPI
if (url.contains("resources.download.minecraft.net")) {
    url = rewriteUrl(url, "https://bmclapi2.bangbang93.com/assets");
}
```

#### Meta URL 重写

即使使用 Prism Meta，某些元数据 URL 仍指向 Mojang：

```cpp
// 重写 Meta URL
if (url.contains("piston-meta.mojang.com")) {
    url = rewriteUrl(url, "https://bmclapi2.bangbang93.com/v1");
}
```

## URL 重写规则

### Libraries

| 原始 URL | 重写后 |
|----------|--------|
| `https://libraries.minecraft.net/...` | `https://bmclapi2.bangbang93.com/maven/...` |
| `https://maven.fabricmc.net/...` | `https://bmclapi2.bangbang93.com/maven/...` |

### Assets

| 原始 URL | 重写后 |
|----------|--------|
| `https://resources.download.minecraft.net/...` | `https://bmclapi2.bangbang93.com/assets/...` |

### Meta

| 原始 URL | 重写后 |
|----------|--------|
| `https://piston-meta.mojang.com/...` | `https://bmclapi2.bangbang93.com/v1/...` |

## 测试

### 单元测试

`tests/BMCLAPITest.cpp`

验证 URL 重写逻辑：

```cpp
TEST(BMCLAPI, LibraryUrlRewrite) {
    QString original = "https://libraries.minecraft.net/com/mojang/...";
    QString rewritten = rewriteUrl(original);
    EXPECT_TRUE(rewritten.contains("bmclapi"));
}
```

### 集成测试

`tests/BMCLAPICompareTest.cpp`

验证镜像内容与官方一致：

```cpp
TEST(BMCLAPI, ContentMatch) {
    QByteArray official = downloadFromMojang(url);
    QByteArray mirror = downloadFromBMCLAPI(url);
    EXPECT_EQ(official, mirror);
}
```

## 故障转移

当镜像不可用时，自动回退到官方源：

```cpp
try {
    downloadFromMirror(url);
} catch (const NetworkException& e) {
    qDebug() << "Mirror failed, falling back to official";
    downloadFromOfficial(url);
}
```

## 已知问题

- 部分场景下 BMCLAPI 支持不完善
- 某些文件可能不在镜像中
- 镜像同步可能有延迟

## 贡献

如果发现 BMCLAPI 集成问题，请：

1. 提交 [GitHub Issue](https://github.com/AndreaFrederica/LunaLauncher/issues)
2. 附上日志文件
3. 描述复现步骤

---

[← 返回开发者文档](./)
