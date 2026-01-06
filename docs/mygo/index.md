# MyGO 文档

> **⚠️ 这是一个玩笑项目！仅供研究和教育目的，请勿在生产环境使用！**

---

<p align="center">
  <img src="https://raw.githubusercontent.com/AndreaFrederica/Python-Dream-It-s-MyGO/4fa21421a356aa2f8c3108dd0f4e6ce1486cf410/logo.svg" alt="mygo logo" width="200"/>
</p>

> "迷子でもいいじゃないか、僕らはまだどこかへ行ける"</br> "即使是迷路的孩子也没关系，我们还能去往某个地方"

**MyGO** - 在 Python 中实现 goto 功能的库，就像五个少女在音乐中寻找自己的方向。

---

## 项目简介

**I**nteractive **T**oolset **S**upporting **M**ulti-directional **Y**ielding **G**oto **O**perations

**I**mplementation **T**hat **S**imulates **M**ind-bending **Y**et **G**lorious **O**perations

这是一个使用 AST 转换技术在 Python 中实现 label/goto 功能的库。

### 核心功能

- `label("NAME")` - 记录一个可跳转的"标签行"
- `goto("NAME")` - 跳转到指定的标签行

### 技术实现

使用 AST（抽象语法树）转换技术：
1. 在第一遍遍历中收集标签位置
2. 在第二遍遍历中将 goto 语句重写为目标行号
3. 将转换后的 AST 编译回可执行代码

### 使用限制

与 pdb j 相同的限制：
- 只能在同一函数内跳转，不能跨函数/跨栈
- 不能跨越 with/try/except/finally/yield/await 等结构性边界
- 目标行必须有真实字节码

---

## 多语言 README

### 📖 English

[README.md](https://github.com/AndreaFrederica/Python-Dream-It-s-MyGO/blob/master/README.md)

**I**nteractive **T**oolset **S**upporting **M**ulti-directional **Y**ielding **G**oto **O**perations - A Python package that provides simple label/goto capabilities within the same function using AST transformation.

### 📖 中文

[README_zh_CN.md](https://github.com/AndreaFrederica/Python-Dream-It-s-MyGO/blob/master/README_zh_CN.md)

在 Python 中实现 goto 功能，就像 MyGO 的成员们一样，即使迷失方向也能找到前进的道路！

### 📖 reStructuredText

[README.rst](https://github.com/AndreaFrederica/Python-Dream-It-s-MyGO/blob/master/README.rst)

在同一函数（同一 code object）内提供简易的 label/goto 能力。

---

## 代码示例

### 基础用法

```python
from mygo import enable_goto, label, goto

@enable_goto
def demo():
    print("A")
    label("L")
    print("B-before")
    goto("L")
    print("C-after")  # 这行永远不会执行

demo()
```

### 示例文件

| 文件 | 说明 | 风险等级 |
|------|------|----------|
| [`basic_mygo_example.py`](https://github.com/AndreaFrederica/Python-Dream-It-s-MyGO/blob/master/examples/basic_mygo_example.py) | 基础循环示例 | ⚠️ 无限循环 |
| [`escape_relationship_hell.py`](https://github.com/AndreaFrederica/Python-Dream-It-s-MyGO/blob/master/examples/escape_relationship_hell.py) | 跳出多层循环 | ⚠️ 难以维护 |
| [`ave_mujica_timeline.py`](https://github.com/AndreaFrederica/Python-Dream-It-s-MyGO/blob/master/examples/ave_mujica_timeline.py) | match-case 跳转 | 🔥 极度混乱 |
| [`mygo_mujica_hell.py`](https://github.com/AndreaFrederica/Python-Dream-It-s-MyGO/blob/master/examples/mygo_mujica_hell.py) | 混合嵌套地狱 | 💀 地狱级 |

> 详见 [examples/README.md](https://github.com/AndreaFrederica/Python-Dream-It-s-MyGO/blob/master/examples/README.md)

---

## 安装

### 从 PyPI 安装

```bash
pip install mygo
```

### 从源码安装

```bash
git clone https://github.com/AndreaFrederica/Python-Dream-It-s-MyGO.git
cd Python-Dream-It-s-MyGO
uv sync
```

---

## 项目信息

| 属性 | 值 |
|------|-----|
| 版本 | 0.1.0 |
| 许可证 | MPL-2.0 |
| Python 版本 | 3.12+ |
| 包管理器 | uv |

---

## 官方链接

- **GitHub**: [Python-Dream-It-s-MyGO](https://github.com/AndreaFrederica/Python-Dream-It-s-MyGO)
- **PyPI**: [mygo](https://pypi.org/project/mygo/)

---

## 名字来源

> **MyGO** 的名字来源于 BanG Dream! 的乐队 **MyGO!!!!!**

MyGO!!!!! 是一个由五个迷失方向的少女组成的乐队，她们在音乐中寻找自己的方向。就像这个库在 Python 中寻找 goto 的方向一样——充满了不确定性、混乱，但也有其独特的魅力。

**成员：**
- 高松灯 (Vo.) - 沉默的迷茫者
- 千早爱音 (Gt.) - 努力的冒失鬼
- 要乐奈 (Gt.) - 自由的天才
- 椚凛世 (Ba.) - 稳重的支持者
- 纲架拓梦 (Dr.) - 温柔的推手

**主题曲：** 迷路込んだり、迷い出たり
**登场作：** BanG Dream! It's MyGO!!!!!

---

## 警告

> **⚠️ 使用此库可能导致：**
> - 代码可读性降低
> - 维护难度增加
> - 团队协作障碍
> - 精神健康风险
>
> **如果你珍爱你的代码、你的团队和你的理智，请不要使用此库！**

---

## 许可证

MPL-2.0 License

---

> "迷子でも、前を向いて"</br> "即使是迷路的孩子，也要向前看"

**MyGO!!!!!** - 一个在 Python 中实现 goto 功能的玩笑项目，就像五个少女在音乐中寻找自己的方向，但可能导致你的代码走向毁灭。
