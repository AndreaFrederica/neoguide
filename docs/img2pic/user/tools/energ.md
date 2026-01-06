# energ 工具

`energ` 是 img2pic 工具集中的核心工具，基于梯度能量图和滑动窗口峰值检测的高级网格识别系统。

## 功能特点

- **自动像素尺寸检测**：使用自相关算法自动检测图像中的像素尺寸
- **滑动窗口峰值检测**：在局部窗口内检测能量尖峰，解决全局阈值无法检测局部峰值的问题
- **网格线插值补全**：自动补全缺失的网格线
- **方向性能量增强**：针对不同方向的边缘进行优化
- **多种采样模式**：支持中心点、平均、加权等采样方式
- **智能颜色量化**：支持自动颜色数和强制颜色数

## 核心算法

### 能量计算

```python
E = |∇x| + |∇y|
```

其中 `∇x` 和 `∇y` 分别是图像在水平和垂直方向的梯度。

### 滑动窗口机制

```python
window_size = max(gap_size, 5)  # 自动模式
step = max(1, gap_size // 2)    # 50% 重叠

# 滑动检测
for start in range(0, len(profile) - window_size + 1, step):
    window = profile[start:end]
    # 在窗口内找局部最大值
```

### 自相关算法

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
    for s in range(min_s, max_s + 1):
        score = _autocorr_score(px, s) + _autocorr_score(py, s)
```

## 使用方法

### 基本使用

```bash
# 基本使用
python energ --in input.png --out output.png

# 自动检测像素尺寸
python energ --in input.png --pixel-size 0
```

### 高级参数

```bash
# 手动指定参数
python energ --in input.png \
  --gap-size 8 \
  --gap-tolerance 2 \
  --min-energy 0.15 \
  --window-size 16 \
  --enhance-energy \
  --enhance-directional \
  --enhance-horizontal 2.0 \
  --enhance-vertical 1.5
```

### 生成像素艺术

```bash
# 生成像素艺术
python energ --in input.png --sample \
  --sample-mode weighted \
  --sample-weight-ratio 0.6

# 输出原生分辨率像素图（每个采样点1个像素）
python energ --in input.png --sample --upscale 1

# 自定义升采样倍数（放大3倍）
python energ --in input.png --sample --upscale 3
```

### 颜色量化

```bash
# 智能颜色量化（自动颜色数）
python energ --in input.png --sample --quantize

# 强制16色调色板
python energ --in input.png --sample --quantize --colors 16

# 完整组合使用
python energ --in input.png \
  --sample \
  --upscale 3 \
  --quantize \
  --quantize-mode smart \
  --colors 32
```

### 调试模式

```bash
# 输出纯能量图（用于调试）
python energ --in input.png --save-energy

# 结合其他参数使用
python energ --in input.png \
  --save-energy \
  --enhance-energy \
  --window-size 16 \
  --sample
```

## 参数说明

### 输入输出参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--in` | 输入图像路径 | 必填 |
| `--out` | 输出图像路径 | `out/<name>_energy_grid.png` |
| `--pixel-size` | 像素尺寸（0=自动检测） | 0 |

### 网格检测参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--gap-size` | 预期的网格线间距（像素） | 8 |
| `--gap-tolerance` | 间距容差（±像素） | 2 |
| `--min-energy` | 最小能量阈值（0~1） | 0.15 |
| `--window-size` | 滑动窗口大小（0=自动） | 0 |

### 能量增强参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--enhance-energy` | 启用能量增强 | false |
| `--enhance-directional` | 方向性增强 | false |
| `--enhance-horizontal` | 水平边缘增强倍数 | 2.0 |
| `--enhance-vertical` | 垂直边缘增强倍数 | 1.5 |

### 采样参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--sample` | 生成像素艺术 | false |
| `--sample-mode` | 采样模式（center/average/weighted） | weighted |
| `--sample-weight-ratio` | 加权采样的权重比例（0~1） | 0.6 |
| `--upscale` | 像素图升采样倍数 | 0 |

### 颜色量化参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--quantize` | 启用像素艺术颜色量化 | false |
| `--quantize-mode` | 量化模式（smart/force） | smart |
| `--colors` | 目标颜色数量（0=自动） | 0 |
| `--similarity-threshold` | 智能合并模式的相似度阈值 | 0.8 |

### 输出选项

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--save-energy` | 保存纯能量图用于调试 | false |
| `--native-res` | 输出原生分辨率像素图 | false |

## 输出说明

`energ` 会生成以下输出文件：

| 文件 | 说明 |
|------|------|
| `*_energy_grid.png` | 能量图 + 检测的网格线 + 网格中心点 |
| `*_pure_energy.png` | 纯能量图（如果启用 `--save-energy`） |
| `*_energy_grid_pixel_art.png` | 生成的像素艺术（如果启用 `--sample`） |

## 使用示例

### 示例 1：基本使用

```bash
python energ --in image.png --out result.png
```

### 示例 2：自动检测 + 像素艺术

```bash
python energ --in image.png --sample --upscale 4
```

### 示例 3：自定义参数 + 颜色量化

```bash
python energ --in image.png \
  --gap-size 12 \
  --enhance-energy \
  --sample \
  --upscale 2 \
  --quantize \
  --colors 32
```

### 示例 4：调试模式

```bash
python energ --in image.png \
  --save-energy \
  --enhance-directional \
  --enhance-horizontal 2.5 \
  --enhance-vertical 2.0
```

## 采样模式对比

### center（中心点采样）

直接采样网格中心点的颜色值，速度快但可能不够准确。

```bash
python energ --in image.png --sample --sample-mode center
```

### average（平均采样）

计算网格内所有像素的平均颜色，结果更平滑。

```bash
python energ --in image.png --sample --sample-mode average
```

### weighted（加权采样）

根据距离网格中心的远近进行加权采样，平衡准确性和平滑度。

```bash
python energ --in image.png --sample --sample-mode weighted --sample-weight-ratio 0.6
```

## 颜色量化模式

### smart（智能合并）

自动合并相似颜色，保留图像的主要色彩。

```bash
python energ --in image.png --sample --quantize --quantize-mode smart
```

### force（强制颜色数）

强制使用指定的颜色数量，适合需要严格控制调色板大小的场景。

```bash
python energ --in image.png --sample --quantize --quantize-mode force --colors 16
```

## 性能优化建议

1. **大图像处理**：对于大图像，可以先缩小处理后再放大
2. **参数调整**：根据图像特点调整 `--gap-size` 和 `--min-energy`
3. **能量增强**：对于网格不明显的图像，启用 `--enhance-energy`
4. **批量处理**：使用脚本批量处理多个图像

---

[← 返回用户指南](../)
