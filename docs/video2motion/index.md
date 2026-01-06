# Video2Motion 文档

> **⚠️ 免责声明**：本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方文档为准**。

---

欢迎使用 Video2Motion 文档！这是一套将 GIF 或视频转换为安卓 Motion Photo 格式的完整解决方案。

## 在线体验

**[网页版 (v2mp.sirrus.cc)](https://v2mp.sirrus.cc)** - 无需安装，直接在浏览器中使用

## 项目概述

Video2Motion 提供两种实现方式：

### video2mjpg-web（纯前端版）
- 基于 FFmpeg.wasm 的纯前端实现
- 所有处理在浏览器中完成，无需后端服务器
- 适合隐私敏感场景和小规模使用
- 处理速度受限于客户端性能

### video2ajpg（后端版）
- 基于 FastAPI + FFmpeg 的后端服务
- 支持 RESTful API 调用
- 适合服务端部署和大规模使用
- 处理速度更快，支持更复杂的转码需求

## 文档导航

### 📖 用户文档

如果你是用户，想要使用 Video2Motion 转换视频，请查看：

**[→ 进入用户文档](./user/)**

用户文档包含：
- 项目介绍
- 在线使用指南
- 本地部署说明
- 功能使用说明
- 常见问题解答

### 👨‍💻 开发者文档

如果你是开发者，想要了解内部实现或参与开发，请查看：

**[→ 进入开发者文档](./developer/)**

开发者文档包含：
- 项目概述
- 代码架构
- API 参考
- 部署指南

## 项目基本信息

| 属性 | 值 |
|------|-----|
| 版本 | 0.1.0 |
| 许可证 | MPL-2.0 |
| 开发语言 | TypeScript (前端) / Python (后端) |

## 技术栈

### 前端 (video2mjpg-web)
- **框架** - Vue 3 (Composition API) + TypeScript
- **UI 框架** - Quasar
- **视频处理** - FFmpeg.wasm
- **构建工具** - Vite
- **样式** - SCSS

### 后端 (video2ajpg)
- **框架** - FastAPI
- **视频处理** - FFmpeg
- **包管理** - uv
- **运行时** - Python 3.14+

## 核心功能

### 1. 多格式输入支持
- GIF 动图
- MP4 视频
- WebM 视频
- QuickTime (MOV) 视频
- Matroska (MKV) 视频

### 2. Motion Photo 输出
- 生成符合安卓 Motion Photo 规范的 JPEG 文件
- 包含封面图（JPEG）
- 嵌入视频片段（MP4）
- 自动生成缩略图

### 3. 时间轴编辑
- 直观的视觉化时间轴
- 拖拽设置片头、封面、片尾
- DaVinci Resolve 风格的缩略图预览
- 实时预览编辑结果

### 4. 速度控制
- 根据目标时长自动计算速度
- 手动调整播放速度倍数
- 精确控制输出时长

## 两种实现对比

| 特性 | video2mjpg-web (前端) | video2ajpg (后端) |
|------|---------------------|------------------|
| 部署方式 | 静态网站 | 服务器应用 |
| 隐私性 | 完全本地处理 | 需上传到服务器 |
| 处理速度 | 受客户端性能限制 | 服务器性能 |
| 可扩展性 | 受限于浏览器资源 | 易于横向扩展 |
| API 支持 | 无 | RESTful API |
| 离线使用 | 支持 | 需要服务器连接 |
| 适用场景 | 个人使用、隐私敏感 | 服务部署、批量处理 |

## 官方链接

- **GitHub**: [video2mjpg_web](https://github.com/AndreaFrederica/video2mjpg_web)
- **网页版**: [v2mp.sirrus.cc](https://v2mp.sirrus.cc)
- **博客**: [blog.sirrus.cc](https://blog.sirrus.cc)

## 许可证

MPL-2.0 License

**简单说明：**
- 可自由使用、修改和分发
- 可用于商业项目
- 修改的代码必须开源
- 必须保留版权声明
