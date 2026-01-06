# img2pic 开发者文档

欢迎阅读 img2pic 开发者文档！这里包含项目的内部实现细节、架构设计和开发指南。

## 文档目录

### 核心概念

| 文档 | 说明 |
|------|------|
| [项目概述](./overview.md) | 项目介绍、设计理念和技术栈 |

### 开发指南

| 主题 | 说明 |
|------|------|
| [项目结构](#项目结构) | 源代码组织和模块划分 |
| [开发环境](#开发环境) | 环境设置和依赖管理 |

## 项目结构

```
img2pic/
├── energ                          # 主要的能量图网格检测工具
├── edge_detect_pixelize.py        # 简化的边缘检测工具
├── grid_sampling_pixelize.py      # 网格采样像素化工具
├── sample_from_grid_centers.py    # 从网格中心采样工具
├── demo_pixelize.py               # 演示脚本
├── generate_e                     # 生成脚本
├── sample                         # 采样相关脚本
├── pixi.toml                      # 项目依赖配置
├── README.md                      # 项目文档
├── LICENSE                        # MPL-2.0 许可证
├── image/                         # 图像目录
├── out/                           # 输出目录
└── web/                           # 网页版源码
```

## 技术栈

### 核心技术

- **Python 3.14+** - 主要开发语言
- **NumPy** - 数值计算和数组操作
- **OpenCV** - 图像处理和边缘检测
- **Pillow** - 图像 I/O 和基本操作
- **SciPy** - 信号处理和峰值检测

### 构建工具

- **Pixi** - 包管理和任务运行

## 核心模块

### 1. energ

主要工具，实现能量图网格检测算法。

**核心功能**：
- 梯度能量计算
- 滑动窗口峰值检测
- 网格线插值
- 方向性能量增强
- 多种采样模式
- 智能颜色量化

**关键算法**：
```python
def detect_grid(energy, gap_size, window_size):
    # 滑动窗口峰值检测
    peaks = []
    for start in range(0, len(profile) - window_size + 1, step):
        window = profile[start:start + window_size]
        # 在窗口内找局部最大值
    return peaks
```

### 2. edge_detect_pixelize.py

简化的边缘检测工具。

**核心功能**：
- Sobel 边缘检测
- 投影峰值检测
- 网格线生成
- 颜色量化

**关键算法**：
```python
def detect_edges(image, threshold):
    sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
    sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
    edges_x = (sobel_x > threshold).astype(np.uint8)
    edges_y = (sobel_y > threshold).astype(np.uint8)
    return edges_x, edges_y
```

### 3. grid_sampling_pixelize.py

基于峰值检测的网格识别工具。

**核心功能**：
- 多尺度边缘增强
- 峰值检测网格识别
- 规律网格生成
- 相似颜色合并

**关键算法**：
```python
def enhance_edges(image):
    edges_combined = np.zeros_like(gray, dtype=float)
    for ksize in [3, 5, 7]:
        sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=ksize)
        sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=ksize)
        edges_combined += sobel_magnitude + laplacian + canny
    return edges_combined
```

## 开发环境

### 前置要求

- Python >= 3.14.2
- Pixi 包管理工具
- Git

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/andrea-novel-helper/img2pic.git
cd img2pic

# 安装 Pixi（如果还没有安装）
# Windows (PowerShell)
irm https://pixi.sh/install.ps1 | iex

# Linux/macOS
curl -fsSL https://pixi.sh/install.sh | bash

# 安装依赖
pixi install

# 运行工具
pixi run energ --in image.png --out result.png
```

### 开发工作流

```bash
# 创建新功能分支
git checkout -b feature/new-feature

# 进行开发
# ...

# 运行测试
python edge_detect_pixelize.py --in test.png --debug

# 提交更改
git add .
git commit -m "Add new feature"

# 推送到远程
git push origin feature/new-feature
```

## 代码规范

### 命名约定

- **函数名**：snake_case，如 `detect_edges`
- **变量名**：snake_case，如 `edge_threshold`
- **常量**：UPPER_CASE，如 `MAX_GRID_SIZE`
- **类名**：PascalCase，如 `EdgeDetector`

### 文档字符串

使用 Google 风格的文档字符串：

```python
def detect_edges(image: np.ndarray, threshold: float) -> tuple[np.ndarray, np.ndarray]:
    """检测水平和垂直边缘

    Args:
        image: 输入图像，RGB 格式
        threshold: 边缘检测阈值，0.0-1.0

    Returns:
        包含水平和垂直边缘的元组
    """
    pass
```

### 类型注解

使用 Python 类型注解：

```python
from typing import Tuple
import numpy as np

def detect_grid(
    image: np.ndarray,
    gap_size: int,
    min_energy: float
) -> Tuple[list[int], list[int]]:
    """检测像素网格"""
    pass
```

## 测试

### 单元测试

```bash
# 运行测试（需要先设置测试框架）
python -m pytest tests/
```

### 手动测试

```bash
# 测试 energ
python energ --in image/test.png --sample --debug

# 测试边缘检测
python edge_detect_pixelize.py --in image/test.png --debug

# 测试网格采样
python grid_sampling_pixelize.py --in image/test.png --debug
```

## 性能优化

### 1. 使用 NumPy 向量化

```python
# 慢：循环
for i in range(height):
    for j in range(width):
        result[i, j] = image[i, j] * 2

# 快：向量化
result = image * 2
```

### 2. 避免不必要的复制

```python
# 创建视图而不是复制
view = array[:, :]  # 视图
copy = array.copy()  # 复制
```

### 3. 使用合适的数据类型

```python
# 使用最小够用的数据类型
array_uint8 = array.astype(np.uint8)
array_float32 = array.astype(np.float32)
```

## 贡献指南

欢迎贡献代码和提出建议！

### 提交 Pull Request

1. Fork 仓库
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 开启 Pull Request

### 报告 Bug

在 GitHub Issues 中报告 bug，请包含：
- 操作系统
- Python 版本
- 复现步骤
- 预期行为
- 实际行为

## 许可证

MPL-2.0 License

---

[← 返回主文档](../)
