# 能量图算法

能量图算法是 `energ` 工具的核心，用于检测 AI 生成像素风格图像中的网格结构。

## 算法概述

能量图算法通过计算图像的梯度能量来识别像素网格的边界。网格边界通常具有较高的梯度能量，因为像素之间的颜色变化较大。

### 核心思想

```
高梯度能量 → 可能是网格边界
低梯度能量 → 像素内部
```

## 算法步骤

### 1. 梯度计算

计算图像在水平和垂直方向的梯度：

```python
# 使用 Sobel 算子计算梯度
gx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
gy = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)

# 计算梯度幅值
gradient_magnitude = np.sqrt(gx**2 + gy**2)
```

### 2. 能量图生成

将水平和垂直梯度组合成能量图：

```python
# 方法 1：简单求和
energy = np.abs(gx) + np.abs(gy)

# 方法 2：梯度幅值
energy = gradient_magnitude

# 方法 3：带方向权重
energy = np.abs(gx) * horizontal_weight + np.abs(gy) * vertical_weight
```

### 3. 能量增强

为了增强网格边界的能量，可以进行方向性增强：

```python
# 水平边缘增强
horizontal_enhancement = np.abs(gy) * (horizontal_factor - 1.0)

# 垂直边缘增强
vertical_enhancement = np.abs(gx) * (vertical_factor - 1.0)

# 组合增强
energy_enhanced = energy + horizontal_enhancement + vertical_enhancement
```

### 4. 投影分析

将二维能量图投影到一维空间：

```python
# 水平投影（垂直网格线）
horizontal_projection = energy.sum(axis=0)

# 垂直投影（水平网格线）
vertical_projection = energy.sum(axis=1)
```

### 5. 滑动窗口峰值检测

使用滑动窗口在投影中检测局部峰值：

```python
def sliding_window_peak_detection(profile, gap_size):
    window_size = max(gap_size, 5)
    step = max(1, gap_size // 2)  # 50% 重叠

    peaks = []
    for start in range(0, len(profile) - window_size + 1, step):
        end = start + window_size
        window = profile[start:end]

        # 在窗口内找局部最大值
        local_max = np.argmax(window)
        peak_pos = start + local_max

        # 检查是否满足条件
        if window[local_max] > min_energy * window.max():
            peaks.append(peak_pos)

    return peaks
```

### 6. 网格线插值

补全缺失的网格线：

```python
def interpolate_grid_lines(detected_lines, gap_size, tolerance):
    lines = sorted(detected_lines)

    # 找到常见的间距
    spacings = np.diff(lines)
    common_spacing = np.median(spacings)

    # 插值
    interpolated = []
    for i in range(len(lines) - 1):
        interpolated.append(lines[i])

        # 检查是否需要插值
        gap = lines[i + 1] - lines[i]
        expected_count = round(gap / common_spacing)

        if expected_count > 1:
            # 添加缺失的线
            for j in range(1, expected_count):
                new_line = lines[i] + j * common_spacing
                if abs(new_line - lines[i + 1]) > tolerance:
                    interpolated.append(new_line)

    interpolated.append(lines[-1])
    return interpolated
```

### 7. 网格采样

从检测到的网格中采样颜色值：

```python
def sample_from_grid(image, h_lines, v_lines, mode='weighted'):
    pixelated = np.zeros((len(h_lines) - 1, len(v_lines) - 1, 3), dtype=np.uint8)

    for i in range(len(h_lines) - 1):
        for j in range(len(v_lines) - 1):
            y1, y2 = h_lines[i], h_lines[i + 1]
            x1, x2 = v_lines[j], v_lines[j + 1]

            if mode == 'center':
                # 中心点采样
                pixelated[i, j] = image[(y1 + y2) // 2, (x1 + x2) // 2]

            elif mode == 'average':
                # 平均采样
                region = image[y1:y2, x1:x2]
                pixelated[i, j] = np.mean(region.reshape(-1, 3), axis=0)

            elif mode == 'weighted':
                # 加权采样（离中心越近权重越高）
                center_y = (y1 + y2) / 2
                center_x = (x1 + x2) / 2
                # ... 加权计算

    return pixelated
```

## 自相关算法

用于自动检测像素尺寸：

```python
def _detect_pixel_size(energy, min_s, max_s):
    # 计算投影
    px = energy.sum(axis=0)
    py = energy.sum(axis=1)

    # 去趋势
    px = _detrend_1d(px)
    py = _detrend_1d(py)

    # 自相关评分
    best_score = 0
    best_size = min_s

    for s in range(min_s, max_s + 1):
        score = _autocorr_score(px, s) + _autocorr_score(py, s)
        if score > best_score:
            best_score = score
            best_size = s

    return best_size

def _autocorr_score(signal, lag):
    """计算自相关分数"""
    signal = signal - np.mean(signal)
    autocorr = np.correlate(signal, signal, mode='full')
    autocorr = autocorr[len(autocorr) // 2:]
    return autocorr[lag] / autocorr[0]
```

## 算法优势

### 1. 局部峰值检测

传统方法使用全局阈值，无法检测局部能量尖峰。滑动窗口机制可以检测每个窗口内的局部峰值。

### 2. 方向性增强

针对不同类型的像素风格，可以增强特定方向的边缘：

```python
# 横向像素风格（水平线明显）
--enhance-horizontal 2.0

# 纵向像素风格（垂直线明显）
--enhance-vertical 2.0
```

### 3. 自适应尺寸检测

无需手动指定像素尺寸，算法自动检测最可能的网格尺寸。

### 4. 网格插值

即使某些网格线检测失败，插值算法可以补全缺失的线。

## 参数影响

### gap-size

预期的网格线间距，影响滑动窗口大小和插值。

```bash
# 小像素（4-8px）
--gap-size 6

# 大像素（12-20px）
--gap-size 16
```

### min-energy

最小能量阈值，过滤弱边缘。

```bash
# 低阈值 - 保留更多网格线
--min-energy 0.1

# 高阈值 - 只保留强边缘
--min-energy 0.2
```

### window-size

滑动窗口大小，影响局部峰值检测的敏感度。

```bash
# 小窗口 - 检测更多局部峰值
--window-size 8

# 大窗口 - 检测更明显的峰值
--window-size 20
```

## 适用场景

### 最适合

- AI 生成的像素风格图像
- 存在局部能量尖峰的图像
- 网格线能量分布不均匀的图像
- 需要自适应检测的场景

### 不适合

- 真实像素艺术（网格已经存在）
- 完全规则的图像（简单下采样即可）
- 极低质量的图像（能量图噪声太大）

## 性能考虑

- **时间复杂度**：O(W × H × window_size)
- **空间复杂度**：O(W × H)
- **可并行化**：投影分析和峰值检测可以并行

## 扩展可能性

1. **多尺度能量图**：结合不同尺度的高斯模糊
2. **自适应阈值**：根据局部能量分布动态调整阈值
3. **机器学习**：训练模型预测网格线位置
4. **迭代优化**：多次迭代优化网格线位置

---

[← 返回用户指南](../)
