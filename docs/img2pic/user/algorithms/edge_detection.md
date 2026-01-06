# 边缘检测算法

边缘检测算法是 `edge_detect_pixelize.py` 和 `grid_sampling_pixelize.py` 的基础，用于识别图像中的像素网格边界。

## 算法概述

边缘检测算法通过寻找图像中梯度变化剧烈的位置来识别网格线。像素风格的图像通常在像素边界处有明显的梯度变化。

### 核心思想

```
高梯度 → 可能是像素边界
低梯度 → 像素内部
```

## Sobel 边缘检测

### 原理

Sobel 算子是一种离散微分算子，用于计算图像的梯度近似值。

### 水平 Sobel 算子

```
Gx = [-1  0  1]
     [-2  0  2]
     [-1  0  1]
```

检测垂直边缘（水平方向变化）。

### 垂直 Sobel 算子

```
Gy = [-1 -2 -1]
     [ 0  0  0]
     [ 1  2  1]
```

检测水平边缘（垂直方向变化）。

### 实现代码

```python
import cv2
import numpy as np

# 转换为灰度图
gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)

# 计算梯度
sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)

# 计算梯度幅值
sobel_magnitude = np.sqrt(sobel_x**2 + sobel_y**2)

# 归一化到 0-1
sobel_x = np.abs(sobel_x) / np.max(sobel_x)
sobel_y = np.abs(sobel_y) / np.max(sobel_y)
```

## 投影分析

### 原理

将二维边缘图投影到一维空间，简化峰值检测。

### 水平投影

```python
# 垂直边缘的水平投影（检测垂直网格线）
h_projection = np.sum(edges_x, axis=0)
```

### 垂直投影

```python
# 水平边缘的垂直投影（检测水平网格线）
v_projection = np.sum(edges_y, axis=1)
```

### 投影优势

1. **简化问题**：从二维降到一维
2. **抗噪声**：投影过程平均了噪声
3. **快速计算**：一维峰值检测更快

## 峰值检测

### 局部最大值检测

```python
def find_local_maxima(signal, min_distance):
    peaks = []
    for i in range(1, len(signal) - 1):
        if signal[i] > signal[i-1] and signal[i] > signal[i+1]:
            peaks.append(i)

    # 过滤太近的峰值
    filtered = []
    for peak in peaks:
        if not filtered or peak - filtered[-1] >= min_distance:
            filtered.append(peak)

    return filtered
```

### scipy.signal.find_peaks

更强大的峰值检测方法：

```python
from scipy.signal import find_peaks

peaks, properties = find_peaks(
    signal,
    distance=min_distance,           # 峰值之间的最小距离
    prominence=prominence_threshold,  # 峰值的显著性
    height=height_threshold            # 峰值的最小高度
)
```

### 平滑处理

```python
kernel_size = max_grid_size
kernel = np.ones(kernel_size) / kernel_size
smoothed = np.convolve(signal, kernel, mode='same')
```

平滑可以减少噪声对峰值检测的影响。

## 多尺度边缘检测

### 不同核大小

```python
edges_combined = np.zeros_like(gray, dtype=float)

for ksize in [3, 5, 7]:
    # Sobel边缘检测
    sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=ksize)
    sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=ksize)

    # 计算梯度幅值
    sobel_magnitude = np.sqrt(sobel_x**2 + sobel_y**2)

    edges_combined += sobel_magnitude

# 归一化
edges_combined = edges_combined / edges_combined.max()
```

### 优势

- **多尺度检测**：不同尺度的网格线
- **鲁棒性**：减少对单一核大小的依赖
- **完整性**：捕获不同粗细的边缘

## Laplacian 边缘检测

### 原理

Laplacian 算子检测二阶导数，对边缘变化更敏感。

```python
laplacian = cv2.Laplacian(gray, cv2.CV_64F, ksize=3)
laplacian = np.abs(laplacian)
```

### 特点

- 对噪声敏感
- 检测零交叉点
- 可以检测边缘的两侧

## Canny 边缘检测

### 原理

Canny 是一种多阶段边缘检测算法：

1. 高斯模糊降噪
2. Sobel 梯度计算
3. 非极大值抑制
4. 双阈值检测
5. 边缘跟踪

```python
canny = cv2.Canny(gray, 50, 150)
```

### 特点

- 检测细边缘
- 低错误率
- 良好的定位

## 网格线生成

### 从检测线到规律网格

```python
def create_regular_grid(detected_lines, image_size):
    # 计算网格间距
    spacings = np.diff(detected_lines)

    # 找到最常见的间距（众数）
    from scipy.stats import mode
    common_spacing = mode(spacings, keepdims=True).mode[0]

    # 创建规律网格
    regular_grid = np.arange(0, image_size, common_spacing)

    # 确保包含边界
    if regular_grid[-1] < image_size:
        regular_grid = np.append(regular_grid, image_size)

    return regular_grid.astype(int)
```

### 优势

- 将不规则的检测线转换为规律网格
- 填充整个图像
- 保持大致的网格密度

## 参数影响

### edge-threshold

边缘检测阈值，控制边缘的敏感度。

```python
# 低阈值
edges_x = (sobel_x > 0.05).astype(np.uint8)

# 高阈值
edges_x = (sobel_x > 0.2).astype(np.uint8)
```

### min-grid-size / max-grid-size

网格尺寸范围，控制检测的粒度。

```python
# 精细网格
min_grid_size = 2
max_grid_size = 8

# 粗糙网格
min_grid_size = 10
max_grid_size = 20
```

### peak-prominence

峰值显著性阈值，控制峰值的突出程度。

```python
# 低显著性
peaks = find_peaks(signal, prominence=0.05 * signal.max())

# 高显著性
peaks = find_peaks(signal, prominence=0.2 * signal.max())
```

### min-distance

峰值之间的最小距离，防止检测到过于密集的峰值。

```python
# 小间距
peaks = find_peaks(signal, distance=3)

# 大间距
peaks = find_peaks(signal, distance=10)
```

## 算法对比

| 方法 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| Sobel | 简单快速 | 对噪声敏感 | 规则网格 |
| Laplacian | 对边缘变化敏感 | 噪声敏感 | 清晰边缘 |
| Canny | 低错误率 | 参数多 | 复杂图像 |
| 多尺度 | 多尺度检测 | 计算量大 | 不规则网格 |

## 性能优化

### 1. 降采样

```python
# 先降采样再检测
small_gray = cv2.resize(gray, None, fx=0.5, fy=0.5)
# ... 检测
# 将结果放大回原始尺寸
lines = [line * 2 for line in detected_lines]
```

### 2. ROI 处理

```python
# 只处理感兴趣的区域
roi = gray[y1:y2, x1:x2]
# ... 检测
lines = [line + x1 for line in detected_lines]
```

### 3. 并行处理

```python
# 并行处理水平和垂直边缘
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=2) as executor:
    h_future = executor.submit(detect_horizontal_edges, gray)
    v_future = executor.submit(detect_vertical_edges, gray)
    h_lines = h_future.result()
    v_lines = v_future.result()
```

## 适用场景

### 最适合

- 边缘清晰的像素风格图像
- 规则或近似规则的网格
- 需要快速处理的场景
- 调试和可视化需求

### 不适合

- 极其模糊的图像
- 完全不规则的网格
- 复杂的 AI 生成图像（推荐使用能量图算法）

## 扩展可能性

1. **机器学习**：训练模型预测网格线
2. **深度学习**：使用 CNN 进行网格检测
3. **自适应阈值**：根据局部特性动态调整
4. **多模态融合**：结合多种边缘检测方法

---

[← 返回用户指南](../)
