# ComfyUI 节点开发文档

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

本文档介绍 img2pic ComfyUI 自定义节点的实现细节。

## 目录结构

```
ComfyUI-custom_nodes/
└── Pixelize/
    ├── __init__.py       # 节点注册
    ├── nodes.py          # 节点定义
    └── backend.py        # 核心算法实现
```

## 架构设计

### 模块职责

```
┌─────────────────────────────────────┐
│   __init__.py                       │
│   - 节点注册 (NODE_CLASS_MAPPINGS)   │
│   - 显示名称 (NODE_DISPLAY_NAME_...) │
├─────────────────────────────────────┤
│   nodes.py                          │
│   - ComfyUI 节点类定义              │
│   - 参数声明 (INPUT_TYPES)           │
│   - 张量/PIL 转换                   │
│   - 节点主逻辑 (run)                 │
├─────────────────────────────────────┤
│   backend.py                        │
│   - 能量图算法                       │
│   - 网格检测算法                     │
│   - 像素化渲染                       │
│   - 颜色量化算法                     │
└─────────────────────────────────────┘
```

## 核心实现

### 1. 节点注册 (`__init__.py`)

```python
from .nodes import Img2PicEnergyPixelize

NODE_CLASS_MAPPINGS = {
    "Img2PicEnergyPixelize": Img2PicEnergyPixelize,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "Img2PicEnergyPixelize": "Img2Pic - 能量网格像素化",
}
```

ComfyUI 通过这两个字典来：
- `NODE_CLASS_MAPPINGS`：映射节点名称到类
- `NODE_DISPLAY_NAME_MAPPINGS`：设置节点在 UI 中的显示名称

### 2. 张量转换 (`nodes.py`)

ComfyUI 使用 `[B, H, W, C]` 格式的 torch.Tensor，值范围 `[0, 1]`：

```python
def _image_to_pil(image):
    """ComfyUI IMAGE Tensor -> PIL Image"""
    if isinstance(image, torch.Tensor):
        t = image
        if t.ndim == 4:
            t = t[0]  # 移除批次维度
        t = t.detach().cpu()
        # 0-1 转换为 0-255 uint8
        arr = (t.clamp(0, 1) * 255).to(torch.uint8).numpy()
    else:
        arr = image  # 已经是 numpy
        if arr.ndim == 4:
            arr = arr[0]
        arr = np.clip(arr, 0, 1)
        arr = (arr * 255).astype(np.uint8)
    return Image.fromarray(arr, mode="RGB")

def _pil_to_tensor(img_rgb):
    """PIL Image -> ComfyUI IMAGE Tensor"""
    arr = np.array(img_rgb).astype(np.float32) / 255.0
    return torch.from_numpy(arr[None, ...])  # [1, H, W, C]
```

### 3. 节点类定义 (`nodes.py`)

```python
class Img2PicEnergyPixelize:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                # ... 参数定义
            }
        }

    RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE")
    RETURN_NAMES = ("energy_only", "energy_grid_debug", "pixelized")
    FUNCTION = "run"
    CATEGORY = "PixelArt/Img2Pic"
```

ComfyUI 节点必须实现：
- `INPUT_TYPES()`：声明输入和参数
- `RETURN_TYPES`：输出类型元组
- `FUNCTION`：执行函数名称
- `CATEGORY`：节点分类

### 4. 能量图算法 (`backend.py`)

```python
def _energy_map(gray_f32):
    """使用 Sobel 算子计算能量图"""
    # Sobel 核
    kx = np.array([[-1,0,1],[-2,0,2],[-1,0,1]], dtype=np.float32)
    ky = np.array([[-1,-2,-1],[0,0,0],[1,2,1]], dtype=np.float32)

    # 填充
    g = np.pad(gray_f32, ((1,1),(1,1)), mode="edge")
    H, W = gray_f32.shape

    # 卷积
    gx = np.zeros((H,W), dtype=np.float32)
    gy = np.zeros((H,W), dtype=np.float32)
    for dy in range(3):
        for dx in range(3):
            w = kx[dy,dx]
            if w != 0:
                gx += w * g[dy:dy+H, dx:dx+W]
            # ... gy 同理

    e = np.sqrt(gx*gx + gy*gy)
    # 归一化到 0-1
    m = float(e.max())
    if m > 1e-8:
        e = e / m
    return e
```

### 5. 网格检测流程

```
输入图像
    ↓
灰度转换 (L mode)
    ↓
能量图计算 (_energy_map)
    ↓
阈值过滤 (min_energy)
    ↓
投影 (sum over axis)
    ↓
平滑 (_smooth_1d)
    ↓
峰值检测 (_find_peaks_1d)
    ↓
主间隙计算 (_dominant_gap)
    ↓
网格插值 (_interpolate_lines)
    ↓
网格中心计算
    ↓
返回网格信息
```

### 6. 像素化渲染 (`backend.py`)

```python
def pixelize_by_grid(img_rgb, grid_info, mode="center", weight_ratio=0.6):
    arr = np.array(img_rgb).astype(np.float32)  # HWC
    H, W, _ = arr.shape
    x_all = grid_info["x_all"]
    y_all = grid_info["y_all"]

    out = np.zeros_like(arr)

    # 高斯权重预计算（用于 weighted 模式）
    def weights(h, w, ratio):
        cy = (h-1)/2.0
        cx = (w-1)/2.0
        yy, xx = np.mgrid[0:h, 0:w]
        sigma = max(0.5, min(h,w) * ratio * 0.35)
        ww = np.exp(-((yy-cy)**2 + (xx-cx)**2) / (2*sigma*sigma))
        s = ww.sum()
        if s > 1e-6:
            ww /= s
        return ww.astype(np.float32)

    # 遍历所有网格
    for yi in range(len(y_all)-1):
        y0, y1 = y_all[yi], y_all[yi+1]
        for xi in range(len(x_all)-1):
            x0, x1 = x_all[xi], x_all[xi+1]
            block = arr[y0:y1, x0:x1, :]

            if mode == "average":
                color = block.mean(axis=(0,1))
            elif mode == "weighted":
                h, w = block.shape[0], block.shape[1]
                ww = weights(h, w, weight_ratio)
                color = (block * ww[..., None]).sum(axis=(0,1))
            else:  # center
                cy = (y0+y1)//2
                cx = (x0+x1)//2
                color = arr[min(cy,H-1), min(cx,W-1), :]

            out[y0:y1, x0:x1, :] = color

    return Image.fromarray(out.clip(0,255).astype(np.uint8), mode="RGB")
```

### 7. 颜色量化 (`backend.py`)

```python
def quantize_pil(img_rgb, mode="smart", colors=32, similarity_threshold=0.9):
    if mode == "force":
        # 强制精确颜色数
        q = img_rgb.quantize(colors=colors, method=Image.MEDIANCUT)
        return q.convert("RGB")

    # Smart 模式：自适应 + 颜色合并
    q = img_rgb.quantize(colors=colors, method=Image.FASTOCTREE)
    pal = q.getpalette()[:colors*3]
    pal = np.array(pal, dtype=np.float32).reshape(-1,3)

    # 相似度阈值转换为 RGB 距离
    max_dist = 441.67295593
    dist_th = (1.0 - float(similarity_threshold)) * max_dist

    # 并查集合并相似颜色
    parent = np.arange(len(pal), dtype=np.int32)

    def find(a):
        while parent[a] != a:
            parent[a] = parent[parent[a]]
            a = parent[a]
        return a

    for i in range(len(pal)):
        for j in range(i+1, len(pal)):
            d = np.linalg.norm(pal[i]-pal[j])
            if d <= dist_th:
                ri, rj = find(i), find(j)
                if ri != rj:
                    parent[rj] = ri

    # 计算合并后的颜色
    merged = pal.copy()
    for i in range(len(pal)):
        r = find(i)
        # 将所有同一组的颜色设为组平均值
        # ...

    return q2.convert("RGB")
```

## 数据结构

### 网格信息字典

```python
grid_info = {
    "gap": int,              # 网格间隙（像素）
    "x_det": list[int],      # 检测到的垂直线
    "y_det": list[int],      # 检测到的水平线
    "x_intp": list[int],     # 插值的垂直线
    "y_intp": list[int],     # 插值的水平线
    "x_all": list[int],      # 所有垂直线
    "y_all": list[int],      # 所有水平线
    "centers": list[tuple]   # 网格中心点 [(x, y), ...]
}
```

## 调试技巧

### 1. 查看能量图

```python
energy = _energy_map(gray)
energy_img = render_energy_image(energy)
```

### 2. 叠加网格可视化

```python
debug_img = render_debug_overlay(energy_img, grid_info)
# 红色 = 检测线
# 蓝色 = 插值线
# 绿色 = 中心点
```

### 3. 打印网格信息

```python
print(f"Detected gap: {grid_info['gap']}")
print(f"X lines: {len(grid_info['x_all'])}")
print(f"Y lines: {len(grid_info['y_all'])}")
print(f"Centers: {len(grid_info['centers'])}")
```

## 性能优化

### 当前实现

- 使用 NumPy 矢量化操作
- 避免不必要的类型转换
- 预计算高斯权重

### 潜在优化

1. **CUDA 加速**：将能量图计算移到 GPU
2. **多线程**：水平和垂直方向并行处理
3. **缓存**：缓存中间结果（如能量图）
4. **降采样**：大图先缩小处理

## 扩展开发

### 添加新的采样模式

在 `pixelize_by_grid()` 中添加新的 mode 分支：

```python
elif mode == "median":
    color = np.median(block, axis=(0,1))
```

### 添加新的量化方法

创建新函数并在 `quantize_pil()` 中添加 mode 分支。

### 添加调试输出

在 `run()` 函数中添加新的 RETURN_TYPES：

```python
RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE", "IMAGE")
RETURN_NAMES = ("energy_only", "energy_grid_debug", "pixelized", "new_output")
```

## 依赖版本

```
torch >= 1.9
numpy >= 1.20
Pillow >= 9.0
ComfyUI >= 0.1.0
```

---

[← 返回开发者文档](./)
