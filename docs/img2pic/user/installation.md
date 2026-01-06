# 安装指南

本文介绍如何安装和配置 img2pic 工具集。

## 系统要求

- **Python**: 3.14.2 或更高版本
- **操作系统**: Windows, macOS, Linux
- **内存**: 建议 4GB 以上
- **磁盘空间**: 约 500MB

## 安装方法

### 方法一：使用 Pixi（推荐）

Pixi 是一个现代化的包管理工具，可以自动管理项目依赖。

1. **安装 Pixi**

   ```bash
   # Windows (PowerShell)
   irm https://pixi.sh/install.ps1 | iex

   # Linux/macOS
   curl -fsSL https://pixi.sh/install.sh | bash
   ```

2. **克隆仓库**

   ```bash
   git clone https://github.com/andrea-novel-helper/img2pic.git
   cd img2pic
   ```

3. **安装依赖**

   ```bash
   pixi install
   ```

4. **运行工具**

   ```bash
   pixi run energ --in input.png --out output.png
   ```

### 方法二：使用 pip

如果你已经安装了 Python，可以直接使用 pip 安装依赖。

1. **克隆仓库**

   ```bash
   git clone https://github.com/andrea-novel-helper/img2pic.git
   cd img2pic
   ```

2. **创建虚拟环境（推荐）**

   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **安装依赖**

   ```bash
   pip install numpy pillow opencv-python scipy
   ```

4. **运行工具**

   ```bash
   python energ --in input.png --out output.png
   ```

### 方法三：使用网页版

无需安装任何软件，直接在浏览器中使用：

**[i2p.sirrus.cc](https://i2p.sirrus.cc)**

## 验证安装

安装完成后，可以运行以下命令验证：

```bash
# 检查 Python 版本
python --version

# 检查依赖
python -c "import numpy, PIL, cv2, scipy; print('All dependencies installed!')"

# 运行演示
python demo_pixelize.py --in image/test.png
```

## 项目结构

安装后的项目结构：

```
img2pic/
├── energ                          # 主要的能量图网格检测工具
├── edge_detect_pixelize.py        # 简化的边缘检测工具
├── grid_sampling_pixelize.py      # 网格采样像素化工具
├── sample_from_grid_centers.py    # 从网格中心采样工具
├── demo_pixelize.py               # 演示脚本
├── pixi.toml                      # 项目依赖配置
├── README.md                      # 本文档
├── LICENSE                        # 许可证
├── image/                         # 图像目录
├── out/                           # 输出目录
└── web/                           # 网页版源码
```

## 常见问题

### Python 版本不兼容

确保你使用的是 Python 3.14.2 或更高版本：

```bash
python --version
```

如果版本不对，可以从 [Python 官网](https://www.python.org/) 下载安装。

### 依赖安装失败

如果遇到依赖安装失败，可以尝试：

1. **升级 pip**

   ```bash
   pip install --upgrade pip
   ```

2. **使用国内镜像源**

   ```bash
   pip install -i https://pypi.tuna.tsinghua.edu.cn/simple numpy pillow opencv-python scipy
   ```

3. **单独安装依赖**

   ```bash
   pip install numpy
   pip install pillow
   pip install opencv-python
   pip install scipy
   ```

### OpenCV 安装问题

OpenCV 有时会出现安装问题，可以尝试：

```bash
# 如果 opencv-python 安装失败，尝试
pip install opencv-python-headless
```

### Windows 下权限问题

在 Windows 下，如果遇到权限问题，可以：

1. 以管理员身份运行命令行
2. 或使用 `--user` 参数安装：

   ```bash
   pip install --user numpy pillow opencv-python scipy
   ```

## 升级

### 使用 Pixi

```bash
pixi install
```

### 使用 pip

```bash
pip install --upgrade numpy pillow opencv-python scipy
```

## 卸载

### 使用 Pixi

```bash
# 删除虚拟环境
pixi remove env default
```

### 使用 pip

```bash
pip uninstall numpy pillow opencv-python scipy
```

## 下一步

安装完成后，你可以：

1. 阅读[工具使用文档](./tools/energ.md)了解如何使用各个工具
2. 查看[算法说明](./algorithms/energy_map.md)了解处理原理
3. 阅读[工具对比](./comparison.md)选择适合你的工具

---

[← 返回用户指南](./)
