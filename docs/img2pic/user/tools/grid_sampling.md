# grid_sampling_pixelize.py 工具

`grid_sampling_pixelize.py` 是基于峰值检测的网格识别和采样工具，提供多尺度边缘增强和相似颜色合并功能。

## 功能特点

- **多尺度边缘增强**：使用多个核大小的 Sobel 和 Laplacian 算子
- **峰值检测网格识别**：基于 scipy.signal.find_peaks 的精确峰值检测
- **规律网格生成**：从不规则的检测线生成规律网格
- **相似颜色合并**：可配置的颜色相似度合并
- **调试可视化**：生成显示网格线和采样点的调试图像

## 核心算法

### 多尺度边缘增强

```python
edges_combined = np.zeros_like(gray, dtype=float)

# 尝试不同的核大小
for ksize in [3, 5, 7]:
    # Sobel边缘检测
    sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=ksize)
    sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=ksize)

    # 计算梯度幅值
    sobel_magnitude = np.sqrt(sobel_x**2 + sobel_y**2)

    # 拉普拉斯边缘检测
    laplacian = cv2.Laplacian(gray, cv2.CV_64F, ksize=ksize)
    laplacian = np.abs(laplacian)

    # Canny边缘检测
    canny = cv2.Canny(gray, 50, 150)

    # 组合所有边缘
    edges_combined += sobel_magnitude + laplacian + canny
```

### 峰值检测

```python
# 找峰值
peaks, properties = find_peaks(
    projection,
    distance=min_distance,
    prominence=peak_prominence * projection.max()
)

# 添加边界
grid_lines = np.concatenate([[0], peaks, [edges_2d.shape[axis]]])
```

### 规律网格生成

```python
# 计算网格间距
spacings = np.diff(grid_lines)

# 找到最常见的间距（众数）
common_spacing = mode(spacings, keepdims=True).mode[0]

# 创建规律网格
regular_grid = np.arange(0, image_size, common_spacing)
```

### 相似颜色合并

```python
# 对每个像素，找到最接近的已存在的颜色
for i, pixel in enumerate(pixels):
    for ref_color_key in unique_colors:
        ref_color = np.array(ref_color_key.split(','), dtype=float)
        distance = np.linalg.norm(pixel_float - ref_color)

        if distance <= threshold:
            merged_pixels[i] = (ref_color * 255).astype(np.uint8)
            break
```

## 使用方法

### 基本使用

```bash
# 基本使用
python grid_sampling_pixelize.py --in input.png
```

### 调整检测参数

```bash
# 调整边缘检测和峰值检测参数
python grid_sampling_pixelize.py --in input.png \
  --edge-threshold 0.05 \
  --peak-prominence 0.1 \
  --min-distance 5
```

### 颜色合并

```bash
# 启用颜色合并
python grid_sampling_pixelize.py --in input.png \
  --color-threshold 0.15
```

### 放大和颜色量化

```bash
# 放大并限制颜色数
python grid_sampling_pixelize.py --in input.png \
  --upscale 4 \
  --colors 64
```

### 调试模式

```bash
# 保存调试图像
python grid_sampling_pixelize.py --in input.png --debug
```

## 参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--in` | 输入图像路径 | 必填 |
| `--out` | 输出图像路径 | `out/<name>_grid_pixel.png` |
| `--edge-threshold` | 边缘检测阈值（0.0-1.0） | 0.05 |
| `--peak-prominence` | 峰值显著性阈值（0.0-1.0） | 0.1 |
| `--min-distance` | 网格线最小间距（像素） | 5 |
| `--upscale` | 放大倍数（1=保持原始像素大小） | 1 |
| `--colors` | 调色板大小 | 256 |
| `--no-quant` | 跳过颜色量化 | false |
| `--color-threshold` | 颜色相似度阈值（0.0-1.0，0=禁用） | 0.0 |
| `--debug` | 保存调试图像 | false |

## 输出说明

`grid_sampling_pixelize.py` 会生成以下输出文件：

| 文件 | 说明 |
|------|------|
| `*_grid_pixel.png` | 像素化结果 |
| `*_grid_debug.png` | 调试图像（如果启用 `--debug`），显示网格线（绿色）和采样点（红色） |

## 参数详解

### --edge-threshold

边缘检测阈值，控制哪些边缘被认为是网格线。

```bash
# 低阈值 - 检测更多边缘
python grid_sampling_pixelize.py --in image.png --edge-threshold 0.02

# 高阈值 - 只检测强边缘
python grid_sampling_pixelize.py --in image.png --edge-threshold 0.1
```

### --peak-prominence

峰值显著性阈值，控制峰值的突出程度。

```bash
# 低显著性 - 检测更多峰值
python grid_sampling_pixelize.py --in image.png --peak-prominence 0.05

# 高显著性 - 只检测突出峰值
python grid_sampling_pixelize.py --in image.png --peak-prominence 0.2
```

### --min-distance

网格线之间的最小间距，防止检测到过于密集的网格线。

```bash
# 小间距 - 精细网格
python grid_sampling_pixelize.py --in image.png --min-distance 3

# 大间距 - 粗糙网格
python grid_sampling_pixelize.py --in image.png --min-distance 10
```

### --color-threshold

颜色相似度阈值，用于合并相似的颜色。

- **0.0**：禁用颜色合并
- **0.1-0.2**：适度合并，减少颜色数
- **0.3+**：激进合并，大幅减少颜色数

```bash
# 禁用颜色合并
python grid_sampling_pixelize.py --in image.png --color-threshold 0.0

# 适度合并
python grid_sampling_pixelize.py --in image.png --color-threshold 0.15

# 激进合并
python grid_sampling_pixelize.py --in image.png --color-threshold 0.3
```

## 使用示例

### 示例 1：基本使用

```bash
python grid_sampling_pixelize.py --in image.png
```

输出：
```
Original image size: 512 x 512
Detected grid: 64 x 64 pixels
Saved: out/image_grid_pixel.png
```

### 示例 2：精细检测 + 颜色合并

```bash
python grid_sampling_pixelize.py --in image.png \
  --edge-threshold 0.03 \
  --peak-prominence 0.08 \
  --min-distance 4 \
  --color-threshold 0.1
```

输出：
```
Original image size: 512 x 512
Detected grid: 64 x 64 pixels
Merging similar colors with threshold: 0.1
Unique colors after merging: 128
Saved: out/image_grid_pixel.png
```

### 示例 3：高清输出 + 颜色量化

```bash
python grid_sampling_pixelize.py --in image.png \
  --upscale 1 \
  --colors 32
```

### 示例 4：调试模式

```bash
python grid_sampling_pixelize.py --in image.png \
  --edge-threshold 0.05 \
  --peak-prominence 0.1 \
  --min-distance 5 \
  --debug
```

会生成两个文件：
- `out/image_grid_pixel.png` - 像素化结果
- `out/image_grid_debug.png` - 调试图像（绿色网格线 + 红色采样点）

## 适用场景

### 推荐使用 grid_sampling_pixelize.py：

- **需要多尺度边缘检测**：不同尺度的网格线
- **不规则网格**：需要从检测线生成规律网格
- **需要颜色合并**：减少颜色数量
- **需要调试可视化**：查看采样点位置

### 不推荐使用：

- 简单的规则网格（推荐使用 `demo_pixelize.py`）
- 需要方向性增强（推荐使用 `energ`）
- 需要最高精度网格检测

## 性能特点

| 特性 | 值 |
|------|-----|
| 处理速度 | 中等 |
| 检测精度 | 高 |
| 自适应能力 | 中 |
| 颜色处理 | 支持相似颜色合并 |

## 与其他工具对比

| 特性 | grid_sampling | edge_detect | energ |
|------|--------------|-------------|-------|
| 多尺度检测 | ✅ | ❌ | ❌ |
| 峰值检测 | ✅ | ❌ | ✅ |
| 颜色合并 | ✅ | ❌ | ❌ |
| 速度 | 中 | 快 | 中 |
| 精度 | 高 | 中 | 高 |

---

[← 返回用户指南](../)
