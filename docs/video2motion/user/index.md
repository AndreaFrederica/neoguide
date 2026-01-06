# 用户文档

欢迎使用 Video2Motion 用户文档！本指南将帮助你使用 Video2Motion 将视频转换为安卓 Motion Photo 格式。

## 目录

- [在线使用](#在线使用)
- [本地部署](#本地部署)
- [使用指南](#使用指南)
- [常见问题](#常见问题)

---

## 在线使用

访问 **[v2mp.sirrus.cc](https://v2mp.sirrus.cc)** 即可直接在浏览器中使用，无需安装任何软件。

---

## 本地部署

### 前端版部署

#### 前置要求
- Node.js 18+
- pnpm 9+

#### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/AndreaFrederica/video2mjpg_web.git
cd video2mjpg_web
```

2. **安装依赖**
```bash
pnpm install
```

3. **启动开发服务器**
```bash
pnpm run dev
```

4. **访问应用**
打开浏览器访问 `http://localhost:5173`

#### 生产构建

```bash
pnpm run build
```

构建后的文件在 `dist/` 目录，可以部署到任何静态网站托管服务。

### 后端版部署

#### 前置要求
- Python 3.14+
- uv 包管理器
- FFmpeg（系统需安装）

#### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/andrea-novel-helper/video2ajpg.git
cd video2ajpg
```

2. **安装依赖**
```bash
uv sync
```

3. **启动服务**
```bash
uv run uvicorn ffmpeg_service:app --host 0.0.0.0 --port 8000
```

4. **配置环境变量（可选）**
```bash
# 设置 Bearer Token 鉴权
export FFMPEG_SERVICE_TOKEN=your_token_here

# 设置 Session 保留时间（秒）
export SESSION_TTL_SECONDS=86400
```

---

## 使用指南

### 基本流程

#### 1. 选择文件
点击上传区域或拖拽文件到界面中，支持以下格式：
- GIF 动图
- MP4 视频
- WebM 视频
- QuickTime (MOV) 视频
- Matroska (MKV) 视频

#### 2. 预览文件
文件上传后，可以预览视频内容并查看基本信息：
- 视频时长
- 分辨率
- 帧率

#### 3. 设置时间轴
使用视觉化时间轴设置三个关键时间点：

| 时间点 | 说明 | 操作 |
|--------|------|------|
| 🟢 片头 (Start) | 视频片段开始时间 | 拖拽绿色指针或点击"设置为片头" |
| 🔴 片尾 (End) | 视频片段结束时间 | 拖拽红色指针或点击"设置为片尾" |
| 🟡 封面 (Cover) | Motion Photo 封面时间 | 拖拽黄色指针或点击"设为封面" |

**操作技巧：**
- 播放视频到目标位置，点击相应按钮快速设置
- 拖拽指针进行微调
- 使用缩略图预览各时间点的画面

#### 4. 调整速度

**自动速度模式：**
- 设置目标时长
- 系统自动计算播放速度

**手动速度模式：**
- 直接输入速度倍数（如 1.5x、2.0x）
- 预览调整后的效果

#### 5. 生成 Motion Photo
点击"转换"或"生成"按钮，等待处理完成后下载生成的 Motion Photo 文件。

### 时间轴编辑功能

#### 拖拽操作
- **粗略调整**：直接拖拽时间轴指针
- **精确调整**：播放视频到目标位置，使用快捷按钮

#### 缩略图预览
- DaVinci Resolve 风格的时间轴设计
- 悬停查看任意时间点的画面
- 高亮显示当前选中的时间点

#### 播放控制
- 播放/暂停按钮
- 进度条拖拽
- 时间显示（当前位置 / 总时长）

### 速度调整详解

#### 目标时长计算
```
速度倍数 = 原始时长 / 目标时长
```

例如：
- 原始视频 10 秒，目标 5 秒 → 速度 2.0x
- 原始视频 8 秒，目标 4 秒 → 速度 2.0x

#### 速度限制
- 最低速度：0.1x（慢放）
- 最高速度：10.0x（快放）
- 建议范围：0.5x ~ 3.0x

### 输出格式

生成的 Motion Photo 文件包含：
1. **封面图**：JPEG 格式静态图片
2. **嵌入视频**：MP4 格式视频片段
3. **缩略图**：用于相册显示的预览图

兼容的安卓相册应用：
- Google Photos
- 小米相册
- 华为相册
- OPPO 相册
- vivo 相册

---

## 常见问题

### Q: 为什么我的 Motion Photo 无法在相册中播放动态效果？

**A:** 可能的原因：
1. 相册应用不支持 Motion Photo 格式
2. 文件未正确生成（尝试重新生成）
3. 嵌入的视频编码不兼容

### Q: 处理大文件时浏览器卡顿怎么办？

**A:**
1. 使用后端版服务（video2ajpg）
2. 缩短视频时长
3. 降低视频分辨率

### Q: 支持哪些输入格式？

**A:**
- GIF 动图
- MP4 视频
- WebM 视频
- MOV (QuickTime) 视频
- MKV (Matroska) 视频

### Q: 生成的文件大小是多少？

**A:** 文件大小取决于：
- 视频时长
- 视频分辨率
- 视频复杂度

一般来说，5 秒 1080p 视频生成的 Motion Photo 约为 2-5 MB。

### Q: 可以在手机上使用吗？

**A:**
- **在线版**：支持手机浏览器访问
- **本地版**：需要自行部署服务器

### Q: 后端版如何部署到 Cloudflare Pages？

**A:** 后端版不能直接部署到 Cloudflare Pages，需要部署到支持 Python 的服务器：
- Railway
- Render
- Fly.io
- 自有服务器

前端版可以部署到 Cloudflare Pages，详见 [前端部署文档](../developer/)。

### Q: 如何设置 Bearer Token？

**A:**
1. 设置环境变量 `FFMPEG_SERVICE_TOKEN`
2. 在请求头中添加 `Authorization: Bearer <token>`
3. 前端配置中填写 token

### Q: Session 有什么作用？

**A:**
- Session 用于管理上传的临时文件
- 默认保留 24 小时
- 可通过 `/cleanup` 接口手动清理
- 自动清理过期 Session

### Q: 如何提高处理速度？

**A:**
**前端版：**
- 使用性能更好的设备
- 缩短视频时长
- 降低分辨率

**后端版：**
- 使用性能更强的服务器
- 配置 FFmpeg 硬件加速
- 启用多进程处理

---

## 技术支持

如遇到问题：
1. 查看 [开发者文档](../developer/)
2. 提交 [GitHub Issue](https://github.com/AndreaFrederica/video2mjpg_web/issues)
3. 访问 [博客](https://blog.sirrus.cc) 查看更多教程
