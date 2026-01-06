# 开发者文档

欢迎来到 Patchouli.js 开发者文档！本文档面向希望了解项目内部实现或参与开发的开发者。

## 目录

- [项目架构](#项目架构)
- [分页引擎](#分页引擎)
- [组件说明](#组件说明)
- [开发环境](#开发环境)
- [API 参考](#api-参考)

---

## 项目架构

### 整体架构

```
patchouli.js
├── src/
│   ├── components/        # Vue 组件
│   │   ├── PatchouliReader.vue    # 主阅读器组件
│   │   ├── FloatingControls.vue   # 浮动控制面板
│   │   ├── NavigateViewer.vue     # 导航查看器
│   │   ├── AboutWidget.vue        # 关于组件
│   │   └── NcxDecoder.ts          # NCX 解码器
│   ├── views/             # 页面视图
│   ├── stores/            # Pinia 状态管理
│   ├── router/            # Vue Router 路由
│   ├── assets/            # 静态资源
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── public/
│   └── epub.py            # EPUB 开发测试服务器
└── dev/                   # 开发相关文件
```

### 核心组件

#### PatchouliReader.vue

主阅读器组件，包含：
- 文档渲染
- 分页逻辑
- 模式切换
- 状态管理

#### FloatingControls.vue

浮动控制面板，包含：
- 翻页按钮
- 字体设置
- 模式切换
- 其他阅读选项

#### NavigateViewer.vue

导航查看器，提供：
- 目录导航
- 章节跳转
- 进度显示

#### NcxDecoder.ts

NCX 文件解码器，用于解析 EPUB 导航结构。

---

## 分页引擎

### 引擎类型

#### 1. 源生成引擎

**工作原理：**
通过解析 HTML 和 CSS 来重新生成新的 HTML 和 CSS。

**子模块：**

| 模块 | 状态 | 说明 |
|------|------|------|
| HTML 生成器 | ✅ 可用 | Basic 级别实现 |
| CSS 生成器 | ⏳ 计划中 | 尚未实现 |

**特点：**
- 更好的控制力
- 可能的 CSS 兼容性问题

#### 2. 指针引擎

**工作原理：**
通过分页指针进行分页，对 CSS 兼容性更好。

**子模块：**

| 模块 | 状态 | 说明 |
|------|------|------|
| 基础解析 | ✅ 可用 | Basic 级别 |
| 模板生成 | ✅ 可用 | Middle 级别 |
| 复杂嵌套 | ⏳ 计划中 | Advance 级别 |

**特点：**
- 更好的 CSS 兼容性
- 支持复杂布局
- 在线图片预缓存

### 公共组件

#### 段落切分器

```typescript
// Basic 级别
- ✅ 基础切分
- ⏳ 标点挤压（暂无计划）
```

#### CSS 处理器

```typescript
// Basic 级别
- ✅ 自动引入
- ✅ 自动循环引用
- ⏳ CSS 自定义
- ⏳ 流处理 CSS
- ⏳ 额外 CSS
```

#### 生命周期钩子

```typescript
- ✅ afterRender
- ⏳ 导入接口
- ⏳ 从书籍导入
```

---

## 组件说明

### PatchouliReader.vue

核心阅读器组件，主要功能：

```typescript
interface PatchouliReaderProps {
  // 文档内容
  content: string

  // 阅读模式
  mode: 'flow' | 'high-paginated' | 'low-paginated'

  // 字体设置
  fontSize: number

  // 分页引擎
  engine: 'source' | 'pointer'
}
```

**核心方法：**
- `renderDocument()` - 渲染文档
- `paginate()` - 分页处理
- `navigateToPage()` - 页面跳转
- `updateSettings()` - 更新设置

### FloatingControls.vue

浮动控制面板，主要功能：

```typescript
interface FloatingControlsProps {
  // 当前页码
  currentPage: number

  // 总页数
  totalPages: number

  // 字体大小
  fontSize: number

  // 阅读模式
  mode: string
}
```

**事件：**
- `@previous-page` - 上一页
- `@next-page` - 下一页
- `@font-size-change` - 字体大小改变
- `@mode-change` - 模式切换

### NavigateViewer.vue

导航查看器，主要功能：

```typescript
interface NavigateViewerProps {
  // 目录结构
  toc: TOCItem[]

  // 当前章节
  currentChapter: string
}

interface TOCItem {
  id: string
  label: string
  children?: TOCItem[]
}
```

---

## 开发环境

### 前置要求

- Node.js 18+
- npm / pnpm
- Python 3（用于测试服务器）

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 pnpm
pnpm install
```

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 代码格式化
npm run format

# 单元测试
npm run test:unit

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 测试

使用提供的 EPUB 测试服务器：

```bash
# 启动 Python 测试服务器
python public/epub.py

# 然后启动开发服务器
npm run dev
```

---

## API 参考

### 核心接口

#### PatchouliReader

```typescript
import { PatchouliReader } from 'patchouli.js'

// 创建阅读器实例
const reader = new PatchouliReader({
  mode: 'high-paginated',
  engine: 'pointer',
  fontSize: 16
})

// 加载文档
await reader.loadDocument(htmlContent)

// 跳转页面
reader.goToPage(5)

// 获取当前页
const currentPage = reader.getCurrentPage()

// 设置字体大小
reader.setFontSize(18)
```

#### EPUB 加载

```typescript
import { loadEPUB } from 'patchouli.js'

// 加载 EPUB 文件
const epub = await loadEPUB(file)

// 获取目录
const toc = epub.getTableOfContents()

// 获取章节内容
const chapter = await epub.getChapter(chapterId)

// 获取封面
const cover = await epub.getCover()
```

### 状态管理

使用 Pinia 进行状态管理：

```typescript
import { useReaderStore } from 'patchouli.js'

// 获取 store
const readerStore = useReaderStore()

// 访问状态
console.log(readerStore.currentPage)
console.log(readerStore.totalPages)

// 调用操作
readerStore.goToPage(10)
readerStore.setFontSize(20)
```

---

## 待办事项

### 高优先级

- [ ] 完善 EPUB 3.0 支持
- [ ] 修复低阶分页器的超长段落问题
- [ ] 添加书签功能
- [ ] 添加阅读进度保存

### 中优先级

- [ ] 实现完整的弹出工具栏
- [ ] 添加上/下状态栏
- [ ] 支持注解
- [ ] 性能优化

### 低优先级

- [ ] JavaScript 支持
- [ ] 排版规则
- [ ] 显示区域调整
- [ ] 更多主题支持

---

## 贡献指南

### 开发流程

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

### 代码规范

- 使用 TypeScript
- 遵循 Vue 3 组合式 API
- 使用 Prettier 格式化
- 通过 ESLint 检查

### 测试要求

- 为新功能添加单元测试
- 确保所有测试通过
- 测试不同阅读模式

---

## 许可证

MPL-2.0 License

---

*在代码的世界中，构建属于你的知识殿堂。📚*
