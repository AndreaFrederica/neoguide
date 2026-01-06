# Andrea's Wiki

Andrea 和 Sirrus 的项目文档站点

## 简介

这是 Andrea 和 Sirrus 的开源项目文档汇总站点，基于 VitePress 构建。

## 包含的项目

- **Andrea Novel Helper** - VS Code 小说写作增强扩展
- **img2pic** - AI 像素风格图像转换工具
- **Video2Motion** - Motion Photo 视频转换工具
- **Luna Launcher** - Minecraft 启动器（Prism Launcher 增强分支）
- **YukariConnect** - P2P 联机解决方案
- **LibGuideBook** - 交互式指南书籍应用
- **MyGO** - MyGO 项目相关资源
- **Patchouli.js** - Patchouli 文档系统的 JavaScript 实现

## 技术栈

- **静态站点生成**：VitePress
- **包管理**：pnpm
- **版本控制**：Git

## 本地开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm docs:dev
```

访问 `http://localhost:5173`

### 构建

```bash
pnpm docs:build
```

### 预览构建结果

```bash
pnpm docs:preview
```

## 目录结构

```
neoguide/
├── docs/                   # 文档源文件
│   ├── .vitepress/         # VitePress 配置
│   ├── AndreaNovelHelper/  # ANH 文档
│   ├── img2pic/            # img2pic 文档
│   ├── video2motion/       # Video2Motion 文档
│   ├── LunaLauncher/       # Luna Launcher 文档
│   ├── YukariConnect/      # YukariConnect 文档
│   ├── LibGuideBook/       # LibGuideBook 文档
│   ├── mygo/               # MyGO 文档
│   ├── patchouli.js/       # Patchouli.js 文档
│   └── index.md            # 首页
├── package.json
└── pnpm-lock.yaml
```

## 添加新项目文档

1. 在 `docs/` 下创建新项目目录
2. 创建项目首页 `index.md`
3. 创建用户文档目录 `user/`
4. 创建开发者文档目录 `developer/`
5. 更新 `.vitepress/config.mts` 添加导航和侧边栏

## 许可证

本项目采用 MPL-2.0 许可证。

## 联系

- GitHub: [AndreaFrederica](https://github.com/AndreaFrederica)
