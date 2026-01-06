# edge_detect_pixelize.py 工具

`edge_detect_pixelize.py` 是基于 Sobel 边缘检测的简化网格识别工具，适合快速处理边缘清晰的图像。

## 功能特点

- **简单快速的边缘检测**：使用 Sobel 算子检测图像边缘
- **基于投影的网格线检测**：将边缘投影到一维空间进行峰值检测
- **颜色量化**：支持调色板大小控制
- **调试模式可视化**：生成调试图像显示检测到的网格线

## 核心算法

### Sobel 边缘检测

```python
# 计算水平和垂直梯度
sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)

# 归一化到 0-1
sobel_x = np.abs(sobel_x) / np.max(sobel_x)
sobel_y = np.abs(sobel_y) / np.max(sobel_y)

# 应用阈值
edges_x = (sobel_x > threshold).astype(np.uint8)
edges_y = (sobel_y > threshold).astype(np.uint8)
```

### 投影峰值检测

```python
# 投影到一维
projection = np.sum(edges, axis=0)

# 平滑处理
kernel = np.ones(kernel_size) / kernel_size
smoothed = np.convolve(projection, kernel, mode='same')

# 找到局部最大值
for i in range(1, len(smoothed) - 1):
    if smoothed[i] > smoothed[i-1] and smoothed[i] > smoothed[i+1]:
        if smoothed[i] > np.mean(smoothed) * 0.5:
            lines.append(i)
```

## 使用方法

### 基本使用

```bash
# 基本使用（使用默认参数）
python edge_detect_pixelize.py --in input.png
```

### 调整参数

```bash
# 调整边缘检测阈值和网格尺寸
python edge_detect_pixelize.py --in input.png \
  --edge-threshold 0.1 \
  --min-grid-size 4 \
  --max-grid-size 16 \
  --upscale 4 \
  --colors 16
```

### 调试模式

```bash
# 保存调试图像
python edge_detect_pixelize.py --in input.png --debug
```

### 跳过颜色量化

```bash
# 保留原始颜色
python edge_detect_pixelize.py --in input.png --no-quant
```

## 参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--in` | 输入图像路径 | 必填 |
| `--out` | 输出图像路径 | `out/<name>_edge_pixel.png` |
| `--edge-threshold` | 边缘检测阈值（0.0-1.0） | 0.1 |
| `--min-grid-size` | 最小网格尺寸（像素） | 2 |
| `--max-grid-size` | 最大网格尺寸（像素） | 20 |
| `--upscale` | 放大倍数 | 4 |
| `--colors` | 调色板大小 | 32 |
| `--no-quant` | 跳过颜色量化 | false |
| `--debug` | 保存调试图像 | false |

## 输出说明

`edge_detect_pixelize.py` 会生成以下输出文件：

| 文件 | 说明 |
|------|------|
| `*_edge_pixel.png` | 像素化结果 |
| `*_debug.png` | 调试图像（如果启用 `--debug`），显示检测到的网格线 |

## 参数详解

### --edge-threshold

边缘检测阈值，控制边缘检测的敏感度。

- **较低值（如 0.05）**：检测更多边缘，可能产生噪声
- **较高值（如 0.2）**：只检测强边缘，可能漏掉弱边缘

```bash
# 低阈值 - 检测更多边缘
python edge_detect_pixelize.py --in image.png --edge-threshold 0.05

# 高阈值 - 只检测强边缘
python edge_detect_pixelize.py --in image.png --edge-threshold 0.2
```

### --min-grid-size 和 --max-grid-size

控制检测的网格尺寸范围。

```bash
# 小像素网格（4-8 像素）
python edge_detect_pixelize.py --in image.png \
  --min-grid-size 4 --max-grid-size 8

# 大像素网格（10-20 像素）
python edge_detect_pixelize.py --in image.png \
  --min-grid-size 10 --max-grid-size 20
```

### --upscale

控制输出图像的放大倍数。

```bash
# 原始分辨率
python edge_detect_pixelize.py --in image.png --upscale 1

# 放大 4 倍
python edge_detect_pixelize.py --in image.png --upscale 4

# 放大 8 倍
python edge_detect_pixelize.py --in image.png --upscale 8
```

### --colors

控制颜色量化的调色板大小。

```bash
# 16 色调色板（复古风格）
python edge_detect_pixelize.py --in image.png --colors 16

# 64 色调色板（中等细节）
python edge_detect_pixelize.py --in image.png --colors 64

# 256 色调色板（高细节）
python edge_detect_pixelize.py --in image.png --colors 256
```

### --debug

生成调试图像，可视化检测过程。

调试图像会用蓝色线条标注检测到的网格线，帮助理解算法工作原理。

```bash
python edge_detect_pixelize.py --in image.png --debug
```

## 使用示例

### 示例 1：基本像素化

```bash
python edge_detect_pixelize.py --in image.png
```

### 示例 2：精细网格

```bash
python edge_detect_pixelize.py --in image.png \
  --min-grid-size 3 --max-grid-size 6 \
  --upscale 2
```

### 示例 3：复古风格

```bash
python edge_detect_pixelize.py --in image.png \
  --edge-threshold 0.15 \
  --colors 16 \
  --upscale 4
```

### 示例 4：调试模式

```bash
python edge_detect_pixelize.py --in image.png \
  --edge-threshold 0.1 \
  --min-grid-size 4 \
  --max-grid-size 12 \
  --debug
```

## 适用场景

### 推荐使用 edge_detect_pixelize.py：

- **简单的像素风格图像**：网格规则、边缘清晰
- **需要快速处理**：处理速度优先
- **边缘清晰的图像**：图像对比度高
- **需要调试可视化**：想要查看检测过程

### 不推荐使用：

- 复杂的 AI 生成图像（推荐使用 `energ`）
- 网格不规则的图像
- 需要高精度网格检测

## 性能特点

| 特性 | 值 |
|------|-----|
| 处理速度 | 快 |
| 检测精度 | 中等 |
| 自适应能力 | 弱（固定参数） |
| 内存占用 | 低 |

## 与其他工具对比

相比 `energ`：

| 特性 | edge_detect_pixelize.py | energ |
|------|------------------------|-------|
| 检测精度 | 中 | 高 |
| 速度 | 快 | 中等 |
| 参数复杂度 | 低 | 高 |
| 自适应能力 | 弱 | 强 |
| 调试功能 | 有 | 有 |

---

[← 返回用户指南](../)
