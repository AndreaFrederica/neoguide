# 用户文档

本文档面向使用 KosuzuEngine 开发视觉小说游戏的开发者。

## 目录

- [安装](#安装)
- [快速开始](#快速开始)
- [创建场景](#创建场景)
- [角色系统](#角色系统)
- [对话系统](#对话系统)
- [音频系统](#音频系统)
- [国际化](#国际化)
- [存档系统](#存档系统)
- [配置](#配置)

## 安装

### 前置要求

- Node.js 18+
- pnpm (推荐) 或 npm/yarn

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/KosuzuEngine/KosuzuEngine.git
cd KosuzuEngine
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发服务器

```bash
quasar dev
```

## 快速开始

### 创建第一个场景

在 `src/game/scenes/` 目录下创建场景文件：

```typescript
// src/game/scenes/myScene.ts
import { createScene } from "@/engine";
import { createJosei06Sailor } from "@/game/actors";

export const myScene = createScene("myScene", async (ctx) => {
  // 显示背景
  ctx.stage.showBackground("haikei_01_sora");

  // 显示角色
  const sailor = await ctx.stage.showActor(createJosei06Sailor());

  // 对话
  await ctx.dialog.say("josei06sailor.name", "你好，我是第一个场景！");

  // 播放 BGM
  ctx.audio.playBGM("bgm_01");

  // 选择
  const choice = await ctx.dialog.choice("你想做什么？", ["继续", "离开"]);

  if (choice === 0) {
    await ctx.dialog.say("josei06sailor.name", "好的，让我们继续！");
  } else {
    await ctx.navigation.navigate("end");
  }
});

// 在 src/game/scenes/index.ts 中注册
export const scenes = [
  // ... 其他场景
  myScene,
];
```

### 注册场景

在 `src/game/scenes/index.ts` 中注册你的场景：

```typescript
import { createSceneRegistry } from "@/game/scenes/registry";
import { myScene } from "./myScene";

export const sceneRegistry = createSceneRegistry([
  // ... 其他场景
  myScene,
]);
```

## 创建场景

### 场景生命周期

场景是一个异步函数，接收 `EngineContext` 作为参数：

```typescript
export const myScene = createScene("myScene", async (ctx) => {
  // 1. 初始化场景
  ctx.stage.showBackground("background_name");

  // 2. 显示角色
  const actor = await ctx.stage.showActor(createCharacter());

  // 3. 执行对话和互动
  await ctx.dialog.say("character.name", "对话内容");

  // 4. 用户选择
  const choice = await ctx.dialog.choice("问题", ["选项A", "选项B"]);

  // 5. 根据选择跳转
  if (choice === 0) {
    await ctx.navigation.navigate("nextScene");
  }
});
```

### 场景动作

#### 显示角色

```typescript
const actor = await ctx.stage.showActor(createCharacter());
```

#### 隐藏角色

```typescript
ctx.stage.hideActor(actor.id);
```

#### 移动角色

```typescript
ctx.stage.moveActor(actor.id, { x: 100, y: 200 });
```

#### 切换背景

```typescript
ctx.stage.showBackground("new_background");
```

#### 对话

```typescript
await ctx.dialog.say("character.name", "对话内容");
```

#### 选择

```typescript
const choice = await ctx.dialog.choice("问题", ["选项1", "选项2", "选项3"]);
```

#### 跳转场景

```typescript
await ctx.navigation.navigate("targetScene");
```

## 角色系统

### 创建角色定义

在 `src/game/actors/` 目录下创建角色定义：

```typescript
// src/game/actors/myCharacter.ts
import { CharacterActor, registerAtlas } from "@/engine";

// 注册精灵图集
registerAtlas("myCharacter", {
  normal: "/public/assets/characters/myCharacter/normal.png",
  happy: "/public/assets/characters/myCharacter/happy.png",
  sad: "/public/assets/characters/myCharacter/sad.png",
  angry: "/public/assets/characters/myCharacter/angry.png",
});

export function createMyCharacter() {
  return new CharacterActor("myCharacter", {
    name: "myCharacter",
    defaultPose: "normal",
    width: 800,
    height: 1200,
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  });
}
```

### 角色动作

#### 切换姿态

```typescript
actor.pose("happy");
```

#### 移动

```typescript
actor.move({ x: 100, y: 200 }, 500); // 移动到 (100, 200)，持续 500ms
```

#### 缩放

```typescript
actor.scale(1.5);
```

#### 设置透明度

```typescript
actor.opacity(0.5);
```

#### 淡入淡出

```typescript
actor.fadeIn(500); // 淡入
actor.fadeOut(500); // 淡出
```

#### 抖动效果

```typescript
actor.shake(300); // 抖动 300ms
```

#### 跳跃效果

```typescript
actor.jump(300); // 跳跃动画 300ms
```

#### 聚焦

```typescript
actor.focus(true); // 聚焦
actor.focus(false); // 取消聚焦（变暗）
```

## 对话系统

### 基础对话

```typescript
await ctx.dialog.say("character.name", "对话内容");
```

### 对话设置

```typescript
await ctx.dialog.say("character.name", "对话内容", {
  voice: "path/to/voice.wav", // 语音文件
  speed: 50, // 打字速度（可选）
  waitForClick: true, // 等待点击继续（默认 true）
});
```

### 多页对话

```typescript
await ctx.dialog.say("character.name", "第一页对话...");
await ctx.dialog.say("character.name", "第二页对话...");
await ctx.dialog.say("character.name", "第三页对话...");
```

### 对话历史

所有对话都会自动记录到历史记录中，可以通过历史面板查看。

## 音频系统

### 播放 BGM

```typescript
ctx.audio.playBGM("bgm_name", {
  volume: 0.8,
  fadeIn: 1000, // 淡入时间
});
```

### 停止 BGM

```typescript
ctx.audio.stopBGM({
  fadeOut: 1000, // 淡出时间
});
```

### 播放音效

```typescript
ctx.audio.playSFX("sfx_name", {
  volume: 0.5,
});
```

### 播放语音

```typescript
await ctx.dialog.say("character.name", "对话", {
  voice: "path/to/voice.wav",
});
```

### 音频通道

KosuzuEngine 支持多个音频通道，可以同时播放不同的音频：

- **BGM 通道**: 背景音乐（循环播放）
- **SFX 通道**: 音效（单次播放）
- **Voice 通道**: 语音（每个角色独立通道）

## 国际化

### 添加新语言

1. 在 `src/game/i18n/locales/` 创建语言文件：

```typescript
// src/game/i18n/locales/en-US.ts
import type { LocaleData } from "@/engine/i18n/types";

export default {
  "character.name": {
    text: "Character Name",
    voice: null,
    tts: null,
  },
  "dialog.hello": {
    text: "Hello, world!",
    voice: "path/to/en/voice.wav",
    tts: null,
  },
} satisfies LocaleData;
```

2. 在 `src/game/i18n/index.ts` 中注册：

```typescript
import enUS from "./locales/en-US";
// ...

export const gameLocales = {
  "zh-CN": zhCN,
  "en-US": enUS,
  // ...
};
```

### 使用国际化文本

在场景中使用国际化 key：

```typescript
await ctx.dialog.say("character.name", "dialog.hello");
```

引擎会自动根据当前语言显示对应的文本。

## 存档系统

### 自动存档

游戏会自动保存当前进度，下次启动时会自动加载。

### 手动存档

```typescript
ctx.save();
```

### 手动读档

```typescript
ctx.load();
```

### 快速存档

KosuzuEngine 支持 3 个快速存档槽位（QS1、QS2、QS3），可以在游戏中通过快捷键或界面操作。

### 存档结构

存档包含以下数据：

- 引擎状态（背景、BGM、角色位置等）
- 当前场景
- 对话历史
- 用户设置

## 配置

### 文本设置

在 `src/game/config.ts` 中配置文本相关设置：

```typescript
export const gameConfig = {
  text: {
    typewriterEnabled: true,
    typewriterSpeed: 50,
    autoPageBreak: true,
  },
  // ... 其他配置
};
```

### 音频设置

```typescript
export const gameConfig = {
  audio: {
    bgmVolume: 0.8,
    sfxVolume: 0.5,
    voiceVolume: 0.7,
  },
  // ... 其他配置
};
```

### 显示设置

```typescript
export const gameConfig = {
  display: {
    screenWidth: 1280,
    screenHeight: 720,
    fullscreen: false,
  },
  // ... 其他配置
};
```

## 常见问题

### Q: 如何添加新的角色？

A: 在 `src/game/actors/` 创建角色定义，注册精灵图集，然后在场景中使用 `ctx.stage.showActor()` 显示。

### Q: 如何切换语言？

A: 使用设置面板或调用 `ctx.i18n.setLocale('en-US')`。

### Q: 如何自定义对话框样式？

A: 修改 `src/engine/render/DialogBox.vue` 组件的样式。

### Q: 如何添加新的背景转场效果？

A: 在 `src/engine/render/StageView.vue` 中的 `backgroundTransition` 对象中添加新的效果。

### Q: 如何调试游戏？

A: 使用内置的脚本控制台（快捷键 `~` 或通过工具栏打开），可以查看和修改游戏状态。

## 示例项目

查看 `src/game/scenes/scene1.ts` 了解完整的场景示例。

## 更多帮助

- 查看 [开发者文档](../developer/index.md) 了解引擎架构和 API
- 提交 [GitHub Issues](https://github.com/KosuzuEngine/KosuzuEngine/issues) 报告问题
