# ComfyUI 节点使用指南

> **⚠️ 免责声明**
>
> 本文档由 **GLM4.7** 自动生成，内容可能存在错误或不完整之处。
> **请以人工书写的官方文档为准**。

img2pic 提供了 ComfyUI 自定义节点，可以在 ComfyUI 工作流中直接使用能量图像素化功能。

## 安装

### 方法一：复制到 ComfyUI 目录

```bash
# 复制整个 Pixelize 文件夹到 ComfyUI 的 custom_nodes 目录
cp -r ComfyUI-custom_nodes/Pixelize path/to/ComfyUI/custom_nodes/
```

### 方法二：符号链接（推荐）

```bash
# 在 ComfyUI 的 custom_nodes 目录中创建符号链接
cd path/to/ComfyUI/custom_nodes/
ln -s D:/Projcets/img2pic/ComfyUI-custom_nodes/Pixelize Pixelize
```

安装后重启 ComfyUI，节点会自动加载。

## 节点：Img2Pic - 能量网格像素化

节点名称：`Img2PicEnergyPixelize`
显示名称：`Img2Pic - 能量网格像素化`
分类：`PixelArt/Img2Pic`

### 输入

| 输入名称 | 类型 | 说明 |
|----------|------|------|
| image | IMAGE | ComfyUI 图像张量 (BHWC, 0-1) |

### 输出

| 输出名称 | 类型 | 说明 |
|----------|------|------|
| energy_only | IMAGE | 纯能量图（灰度转为 RGB） |
| energy_grid_debug | IMAGE | 能量图 + 网格线 + 中心点（调试可视化） |
| pixelized | IMAGE | 像素化结果（可选量化） |

## 参数说明

### 能量检测参数

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| min_energy | FLOAT | 0.0-1.0 | 0.15 | 最小能量阈值，低于此值的区域被忽略 |
| smooth_window | INT | 1-51 | 9 | 平滑窗口大小（奇数） |
| gap_tolerance | INT | 0-10 | 2 | 网格间隙容差（像素） |
| peak_min_dist | INT | 1-32 | 2 | 峰值间最小距离（像素） |

### 采样参数

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| sample_mode | 选项 | - | center | 采样模式：center（中心点）/ average（平均）/ weighted（加权） |
| weight_ratio | FLOAT | 0.0-1.0 | 0.6 | 加权采样的权重比率 |

### 颜色量化参数

| 参数 | 类型 | 范围 | 默认值 | 说明 |
|------|------|------|--------|------|
| enable_quantize | BOOLEAN | - | False | 是否启用颜色量化 |
| quantize_mode | 选项 | - | smart | 量化模式：smart（智能）/ force（强制） |
| colors | INT | 2-256 | 32 | 目标颜色数量 |
| similarity_threshold | FLOAT | 0.0-1.0 | 0.9 | 颜色合并相似度阈值 |

## 使用示例

### 基础工作流

```
Load Image → Img2PicEnergyPixelize → Preview Image
                          ↓
                    energy_only / energy_grid_debug / pixelized
```

### 带颜色量化的工作流

```
Load Image → Img2PicEnergyPixelize → Save Image
                         (enable_quantize = True)
```

### 调试工作流

```
Load Image → Img2PicEnergyPixelize → Preview Image (energy_grid_debug)
                         ↓
                    检查网格检测结果
```

## 输出说明

### energy_only（纯能量图）

灰度能量图转为 RGB 输出，显示图像中边缘和细节的强度分布：
- 亮色：高能量区域（边缘、细节）
- 暗色：低能量区域（平坦区域）

### energy_grid_debug（调试可视化）

在能量图基础上叠加可视化信息：
- **红色线条**：检测到的网格线
- **蓝色线条**：插值生成的网格线
- **绿色方块**：网格中心点

这个输出用于调试和优化参数设置。

### pixelized（像素化结果）

最终的像素化图像输出：
- 如果 `enable_quantize = False`：纯网格像素化
- 如果 `enable_quantize = True`：网格像素化 + 颜色量化

## 参数调优建议

### 简单图像（规则网格）

```
min_energy: 0.1-0.15
smooth_window: 5-9
gap_tolerance: 2-3
peak_min_dist: 2-4
```

### 复杂图像（不规则网格）

```
min_energy: 0.15-0.25
smooth_window: 9-15
gap_tolerance: 1-2
peak_min_dist: 1-2
```

### 细节保留

```
min_energy: 较低 (0.05-0.1)
smooth_window: 较小 (3-5)
peak_min_dist: 1
```

### 颜色量化设置

- **经典 8-bit 风格**：colors=16-32, similarity_threshold=0.85-0.9
- **现代像素艺术**：colors=32-64, similarity_threshold=0.9-0.95
- **极简风格**：colors=4-8, similarity_threshold=0.8-0.85

## 工作流技巧

1. **先用 debug 输出检查网格**：连接 `energy_grid_debug` 到预览节点，检查网格检测是否正确
2. **分步调参**：先调整能量检测参数，再调整采样参数，最后调整颜色量化
3. **保存中间结果**：可以同时保存三种输出用于对比
4. **与其他节点组合**：
   - 前置：Image Scale（调整尺寸）
   - 后置：Image Upscale（进一步放大）

---

[← 返回用户文档](./)
