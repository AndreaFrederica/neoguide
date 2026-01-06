# demo_pixelize.py 工具

`demo_pixelize.py` 是一个简单的演示工具，展示基本的像素化处理流程。适合快速实现简单的像素化效果。

## 功能特点

- **简单的下采样**：使用盒式滤波器（box filtering）缩小图像
- **颜色量化**：使用 PIL 的快速量化方法
- **最近邻放大**：保持硬像素边缘

## 核心算法

### 盒式滤波下采样

```python
# 使用盒式滤波器缩小到目标尺寸
downscaled = image.resize((grid_w, grid_h), resample=Image.Resampling.BOX)
```

### 颜色量化

```python
# 快速八叉树颜色量化
downscaled = downscaled.quantize(colors=colors, method=Image.FASTOCTREE)
```

### 最近邻放大

```python
# 使用最近邻插值放大，保持硬边缘
upscaled = downscaled.resize((out_w, out_h), resample=Image.Resampling.NEAREST)
```

## 使用方法

### 基本使用

```bash
# 使用默认参数
python demo_pixelize.py --in input.png
```

### 指定缩放比例

```bash
# 下采样 4 倍，然后放大 4 倍
python demo_pixelize.py --in input.png --scale 4 --upscale 4
```

### 指定目标尺寸

```bash
# 指定输出像素网格尺寸
python demo_pixelize.py --in input.png --target-width 64 --target-height 64

# 只指定宽度，高度按比例计算
python demo_pixelize.py --in input.png --target-width 64
```

### 控制颜色数

```bash
# 使用 16 色调色板
python demo_pixelize.py --in input.png --colors 16

# 使用 64 色调色板
python demo_pixelize.py --in input.png --colors 64
```

### 跳过颜色量化

```bash
# 只进行下采样和放大，保留原始颜色
python demo_pixelize.py --in input.png --no-quant
```

### 指定输出路径

```bash
python demo_pixelize.py --in input.png --out result.png
```

## 参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--in` | 输入图像路径 | 必填 |
| `--out` | 输出图像路径 | `out/<name>_pixel.png` |
| `--scale` | 下采样比例 | 4 |
| `--upscale` | 放大倍数 | 4 |
| `--target-width` | 目标像素网格宽度 | 0（使用 --scale） |
| `--target-height` | 目标像素网格高度 | 0（使用 --scale） |
| `--colors` | 调色板大小 | 32 |
| `--no-quant` | 跳过颜色量化 | false |

## 使用示例

### 示例 1：基本像素化

```bash
python demo_pixelize.py --in image.png
```

效果：
1. 图像缩小到 1/4
2. 颜色量化到 32 色
3. 放大 4 倍

### 示例 2：高分辨率像素艺术

```bash
python demo_pixelize.py --in image.png --scale 8 --upscale 2
```

效果：
1. 图像缩小到 1/8
2. 颜色量化到 32 色
3. 放大 2 倍

### 示例 3：指定像素网格尺寸

```bash
python demo_pixelize.py --in image.png --target-width 64 --target-height 64 --upscale 8
```

效果：
1. 缩小到 64x64 像素
2. 颜色量化到 32 色
3. 放大 8 倍

### 示例 4：复古 16 色

```bash
python demo_pixelize.py --in image.png --colors 16 --upscale 4
```

效果：复古 16 色像素风格

### 示例 5：不进行颜色量化

```bash
python demo_pixelize.py --in image.png --no-quant
```

效果：保留原始颜色，只进行像素化

## 适用场景

### 推荐使用 demo_pixelize.py：

- **学习像素化基本原理**：简单易懂的实现
- **快速预览效果**：不需要复杂的网格检测
- **规则像素化**：不需要检测现有网格
- **自定义像素尺寸**：明确知道想要的像素网格大小

### 不推荐使用：

- 需要检测 AI 生成的伪像素网格（推荐使用 `energ`）
- 需要保留原始网格结构
- 图像中有不规则的像素网格

## 工作流程

```
原始图像 (512x512)
    ↓
[下采样] 使用盒式滤波器
    ↓
小图像 (128x128)
    ↓
[颜色量化] 32色调色板
    ↓
量化图像 (128x128, 32色)
    ↓
[放大] 最近邻插值
    ↓
输出图像 (512x512, 32色)
```

## 尺寸计算

### 使用 --scale

```python
grid_w = max(1, image.width // scale)
grid_h = max(1, image.height // scale)
```

### 使用 --target-width/--target-height

```python
# 同时指定宽度和高度
grid_w = target_width
grid_h = target_height

# 只指定宽度
grid_w = target_width
grid_h = max(1, round(height * (target_width / width)))

# 只指定高度
grid_w = max(1, round(width * (target_height / height)))
grid_h = target_height
```

### 输出尺寸

```python
out_w = grid_w * upscale
out_h = grid_h * upscale
```

## 与其他工具对比

| 特性 | demo_pixelize | edge_detect | grid_sampling | energ |
|------|--------------|-------------|--------------|-------|
| 网格检测 | ❌ | ✅ | ✅ | ✅ |
| 处理速度 | 最快 | 快 | 中 | 中 |
| 参数复杂度 | 最低 | 低 | 中 | 高 |
| 适用场景 | 规则像素化 | 简单网格 | 不规则网格 | 复杂网格 |
| 颜色量化 | ✅ | ✅ | ✅ | ✅ |

## 限制

1. **不检测现有网格**：直接下采样，不保留原始网格结构
2. **固定缩放比例**：无法自适应检测像素尺寸
3. **无方向性处理**：不考虑图像的方向性特征

## 扩展建议

如果 `demo_pixelize.py` 的功能不够用，可以尝试：

- **需要检测网格**：使用 `edge_detect_pixelize.py`
- **不规则网格**：使用 `grid_sampling_pixelize.py`
- **复杂 AI 图像**：使用 `energ`

---

[← 返回用户指南](../)
