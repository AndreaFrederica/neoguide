# 开发者文档

欢迎来到 Video2Motion 开发者文档！本文档面向希望了解项目内部实现或参与开发的开发者。

## 目录

- [项目概述](#项目概述)
- [前端架构](#前端架构)
- [后端架构](#后端架构)
- [API 参考](#api-参考)
- [部署指南](#部署指南)

---

## 项目概述

Video2Motion 由两个独立的项目组成：

### video2mjpg-web（前端）
- **仓库**：[video2mjpg_web](https://github.com/AndreaFrederica/video2mjpg_web)
- **技术栈**：Vue 3 + TypeScript + FFmpeg.wasm
- **部署**：静态网站托管

### video2ajpg（后端）
- **仓库**：[video2ajpg](https://github.com/andrea-novel-helper/video2ajpg)
- **技术栈**：FastAPI + FFmpeg + Python
- **部署**：服务器应用

---

## 前端架构

### 项目结构

```
video2mjpg_web/
├── src/
│   ├── components/          # Vue 组件
│   ├── composables/         # 组合式函数
│   ├── stores/              # 状态管理
│   ├── utils/               # 工具函数
│   ├── types/               # TypeScript 类型定义
│   └── main.ts              # 入口文件
├── public/                  # 静态资源
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 核心模块

#### 1. FFmpeg 客户端
```typescript
// src/utils/ffmpeg.ts
interface FFmpegClient {
  // 加载 FFmpeg.wasm
  load(): Promise<void>

  // 转码源文件
  transcodeSource(file: File): Promise<TranscodeResult>

  // 生成 Motion Photo
  convertClipAndFrames(params: ConvertParams): Promise<Uint8Array>
}
```

#### 2. 后端客户端
```typescript
// src/utils/backend.ts
interface BackendClient {
  // 上传并转码
  transcodeSource(file: File): Promise<PrepareResult>

  // 生成 Motion Photo
  convertClipAndFrames(params: ConvertParams): Promise<Blob>

  // 清理文件
  cleanupFiles(sessionId: string): Promise<void>

  // 健康检查
  checkHealth(): Promise<boolean>
}
```

#### 3. 时间轴组件
```vue
<!-- src/components/TimelineEditor.vue -->
<template>
  <div class="timeline">
    <ThumbnailStrip />
    <TimeRuler />
    <Playhead />
    <Markers>
      <StartMarker />
      <EndMarker />
      <CoverMarker />
    </Markers>
  </div>
</template>
```

### 状态管理

使用 Pinia 进行状态管理：

```typescript
// src/stores/ffmpeg.ts
export const useFFmpegStore = defineStore('ffmpeg', {
  state: () => ({
    mode: 'wasm' as 'wasm' | 'backend',
    backendUrl: '',
    isLoaded: false,
    isProcessing: false,
    progress: 0,
  }),

  actions: {
    async initialize() { /* ... */ },
    async transcode(file: File) { /* ... */ },
    async convert(params: ConvertParams) { /* ... */ },
  },
})
```

### 构建配置

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

---

## 后端架构

### 项目结构

```
video2ajpg/
├── ffmpeg_service.py       # FastAPI 服务
├── motion_photo.py          # Motion Photo 核心逻辑
├── app_backend.py           # 应用入口
├── motion_sessions/         # 临时文件存储
├── static/                  # 静态资源
├── pyproject.toml
└── uv.lock
```

### 核心模块

#### 1. FastAPI 服务
```python
# ffmpeg_service.py
from fastapi import FastAPI, File, UploadFile, Form

app = FastAPI(title="FFmpeg Backend Service")

@app.post("/prepare")
async def prepare(
    file: UploadFile = File(...),
    authorization: Optional[str] = Header(None),
):
    # 上传并转码视频
    ...

@app.post("/convert")
async def convert(
    session_id: str = Form(...),
    range_start: float = Form(...),
    range_end: float = Form(...),
    cover_time: float = Form(...),
    speed: float = Form(...),
):
    # 生成 Motion Photo
    ...
```

#### 2. Motion Photo 生成
```python
# motion_photo.py
def make_motion_photo_from_mp4(
    video_path: Path,
    cover_time: float,
    range_start: float,
    range_end: float,
    speed: float,
) -> bytes:
    """
    从 MP4 视频生成 Motion Photo

    返回包含 JPEG + MP4 + 缩略图的完整 Motion Photo 字节
    """
    # 1. 提取封面帧
    cover_jpeg = extract_cover_frame(video_path, cover_time)

    # 2. 截取视频片段
    video_segment = cut_video_segment(
        video_path, range_start, range_end, speed
    )

    # 3. 生成缩略图
    thumbnail = generate_thumbnail(cover_jpeg)

    # 4. 合成为 Motion Photo
    return merge_motion_photo(cover_jpeg, video_segment, thumbnail)
```

#### 3. Session 管理
```python
@dataclass
class SessionInfo:
    video_path: Path
    created_at: float
    duration_ms: int

# 全局 Session 存储
SESSIONS: dict[str, SessionInfo] = {}

def purge_expired_sessions():
    """清理过期的 Session"""
    now = time.time()
    expired_ids = [
        sid for sid, info in SESSIONS.items()
        if now - info.created_at > SESSION_TTL_SECONDS
    ]
    for sid in expired_ids:
        shutil.rmtree(SESSIONS[sid].video_path.parent, ignore_errors=True)
        SESSIONS.pop(sid, None)
```

### FFmpeg 命令

#### 转码为 MP4
```bash
ffmpeg -y \
  -i input.gif \
  -movflags +faststart \
  -pix_fmt yuv420p \
  -c:v libx264 \
  -profile:v baseline \
  -level 3.1 \
  -r 30 \
  -vf "scale=ceil(iw/2)*2:ceil(ih/2)*2" \
  output.mp4
```

#### 截取视频片段
```bash
ffmpeg -y \
  -i input.mp4 \
  -ss {start} \
  -t {duration} \
  -filter:v "setpts={1/speed}*PTS" \
  -movflags +faststart \
  output.mp4
```

#### 提取封面帧
```bash
ffmpeg -y \
  -ss {cover_time} \
  -i input.mp4 \
  -frames:v 1 \
  -q:v 2 \
  cover.jpg
```

---

## API 参考

### 基础信息

| 属性 | 值 |
|------|-----|
| 基础 URL | `http://localhost:8000` |
| 响应格式 | JSON / 二进制 |
| 字符编码 | UTF-8 |

### 鉴权

所有接口可选支持 Bearer Token 鉴权：

```http
Authorization: Bearer {your_token_here}
```

设置环境变量 `FFMPEG_SERVICE_TOKEN` 启用鉴权。

### API 端点

#### 1. 健康检查

```http
HEAD /health
```

**响应**
- `200 OK`: 服务可用
- `401 Unauthorized`: Token 无效
- `503 Service Unavailable`: 服务不可用

---

#### 2. 上传并转码

```http
POST /prepare
Content-Type: multipart/form-data
```

**请求参数**
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| file | File | 是 | 视频/GIF 文件 |

**响应 (200 OK)**
```json
{
  "session_id": "abc123...",
  "preview_url": "http://localhost:8000/preview/abc123....mp4",
  "duration": 10.5
}
```

**错误响应**
```json
{
  "detail": "错误描述信息"
}
```

---

#### 3. 获取预览视频

```http
GET /preview/{session_id}.mp4
```

**响应**
- `200 OK`: 视频文件 (video/mp4)
- `404 Not Found`: Session 不存在

---

#### 4. 生成 Motion Photo

```http
POST /convert
Content-Type: application/x-www-form-urlencoded
```

**请求参数**
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| session_id | string | 是 | Session ID |
| range_start | number | 是 | 开始时间（秒） |
| range_end | number | 是 | 结束时间（秒） |
| cover_time | number | 是 | 封面时间（秒） |
| speed | number | 是 | 播放速度倍数 |

**响应**
- `200 OK`: Motion Photo 文件 (image/jpeg)
- `400 Bad Request`: 参数错误
- `404 Not Found`: Session 不存在

---

#### 5. 生成缩略图

```http
POST /thumbnail
Content-Type: application/json
```

**请求体**
```json
{
  "session_id": "abc123...",
  "timestamp": 2.5
}
```

**响应**
- `200 OK`: 缩略图文件 (image/jpeg)
- `422 Unprocessable Entity`: 时间戳超出范围

---

#### 6. 清理 Session

```http
POST /cleanup
Content-Type: application/json
```

**请求体**
```json
{
  "session_id": "abc123..."
}
```

**响应 (200 OK)**
```json
{
  "message": "清理成功"
}
```

---

## 部署指南

### 前端部署

#### Cloudflare Pages

1. **连接 GitHub 仓库**
2. **配置构建设置**
   - 构建命令: `pnpm run build`
   - 输出目录: `dist`
3. **配置环境变量（可选）**
   ```env
   VITE_PUBLIC_PATH=/
   ```
4. **部署**

详见 [CLOUDFLARE_PAGES.md](https://github.com/AndreaFrederica/video2mjpg_web/blob/main/CLOUDFLARE_PAGES.md)

#### Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

#### Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 后端部署

#### Railway

1. 连接 GitHub 仓库
2. 配置环境变量
3. 部署

#### Render

1. 创建新的 Web Service
2. 连接 GitHub 仓库
3. 配置启动命令: `uv run uvicorn ffmpeg_service:app --host 0.0.0.0 --port $PORT`
4. 部署

#### Docker

```dockerfile
FROM python:3.14-slim

# 安装 FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# 安装 uv
RUN pip install uv

# 复制项目文件
WORKDIR /app
COPY . .

# 安装依赖
RUN uv sync --frozen

# 暴露端口
EXPOSE 8000

# 启动服务
CMD ["uv", "run", "uvicorn", "ffmpeg_service:app", "--host", "0.0.0.0", "--port", "8000"]
```

构建并运行：
```bash
docker build -t video2motion-backend .
docker run -p 8000:8000 -e FFMPEG_SERVICE_TOKEN=your_token video2motion-backend
```

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| FFMPEG_SERVICE_TOKEN | Bearer Token | 无（不启用鉴权） |
| SESSION_TTL_SECONDS | Session 保留时间 | 86400（24小时） |

### CORS 配置

后端默认允许所有来源的跨域请求：

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

生产环境建议限制来源：

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "HEAD", "OPTIONS"],
    allow_headers=["*"],
)
```

---

## 开发指南

### 前端开发

```bash
# 克隆仓库
git clone https://github.com/AndreaFrederica/video2mjpg_web.git
cd video2mjpg_web

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 类型检查
pnpm run type-check

# 构建
pnpm run build
```

### 后端开发

```bash
# 克隆仓库
git clone https://github.com/andrea-novel-helper/video2ajpg.git
cd video2ajpg

# 安装依赖
uv sync

# 启动开发服务器
uv run uvicorn ffmpeg_service:app --reload

# 运行测试
uv run pytest
```

---

## 许可证

MPL-2.0 License

**开发者请注意：**
- 修改的代码必须开源
- 必须保留版权声明
- 可以用于商业项目
