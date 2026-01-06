# 贡献指南

> **⚠️ 免责声明**：本文档由 **MiniMax-M2.1** 自动生成，内容可能存在错误或不完整之处。**请以人工书写的官方为准**。

---

感谢你考虑为 LibGuideBook 贡献代码！

## 如何贡献

### 报告 Bug

1. 搜索现有的 Bug 报告，避免重复
2. 创建新的 Issue，包含：
   - Bug 描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 截图或日志

### 提出功能建议

1. 搜索现有建议，避免重复
2. 创建新的 Issue，描述：
   - 功能需求
   - 使用场景
   - 预期效果

### 提交代码

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m "Add your feature"`
4. 推送到分支：`git push origin feature/your-feature`
5. 创建 Pull Request

## 代码规范

### JavaScript/TypeScript

- 使用 ESLint 进行代码检查
- 遵循项目现有的代码风格
- 添加必要的类型注解

### Vue 组件

- 使用 Composition API
- 遵循 Vue 3 最佳实践
- 组件名使用 PascalCase

### 提交信息

使用规范化的提交信息：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建或辅助工具更新

## 开发环境

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm run test

# 构建生产版本
npm run build
```

---

我们欢迎各种形式的贡献，包括但不限于代码、文档、翻译、测试等。
