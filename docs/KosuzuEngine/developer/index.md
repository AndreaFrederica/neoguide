# 开发者文档

本文档面向参与 KosuzuEngine 开发或需要深入了解引擎内部原理的开发者。

## 目录

- [架构概述](#架构概述)
- [核心系统](#核心系统)
  - [EngineContext](#enginecontext)
  - [Runtime](#runtime)
  - [Persistence](#persistence)
  - [BaseActor](#baseactor)
- [状态管理](#状态管理)
- [渲染系统](#渲染系统)
- [音频系统](#音频系统)
- [国际化系统](#国际化系统)
- [调试工具](#调试工具)
- [API 参考](#api-参考)
- [开发指南](#开发指南)

## 架构概述

KosuzuEngine 采用模块化架构，主要分为以下几个层次：

```
┌─────────────────────────────────────┐
│         Vue 3 + Quasar Layer        │
├─────────────────────────────────────┤
│         Rendering Components        │
│  (StageView, DialogBox, Panels...)  │
├─────────────────────────────────────┤
│           State Management          │
│     (Pinia Stores, EngineState)     │
├─────────────────────────────────────┤
│             Core Engine             │
│  (EngineContext, Runtime, Actors)   │
├─────────────────────────────────────┤
│         Audio & I18n Systems         │
│   (AudioManager, I18nManager)       │
└─────────────────────────────────────┘
```

### 设计原则

1. **单一职责**: 每个模块只负责一个功能领域
2. **数据驱动**: 状态变化驱动 UI 更新
3. **可扩展性**: Actor 系统和场景系统支持扩展
4. **类型安全**: 使用 TypeScript 保证类型安全
5. **响应式**: 基于 Vue 3 Composition API 的响应式编程

## 核心系统

### EngineContext

`EngineContext` 是引擎的核心状态管理器，使用 Redux 模式的 reducer 管理 `EngineState`。

#### EngineState 接口

```typescript
interface EngineState {
  background: string | null;
  bgm: string | null;
  actors: Map<string, ActorState>;
  dialog: DialogState | null;
  choice: ChoiceState | null;
  history: HistoryItem[];
  // ... 其他状态
}
```

#### 主要方法

- `dispatch(action: EngineAction)`: 分发动作更新状态
- `getState()`: 获取当前状态
- `subscribe(listener: (state: EngineState) => void)`: 订阅状态变化

#### 动作类型

```typescript
type EngineAction =
  | { type: "BACKGROUND_CHANGE"; background: string }
  | { type: "ACTOR_SHOW"; actor: ActorState }
  | { type: "ACTOR_HIDE"; id: string }
  | { type: "ACTOR_UPDATE"; id: string; updates: Partial<ActorState> }
  | { type: "DIALOG_SAY"; dialog: DialogState }
  | { type: "CHOICE_SHOW"; choice: ChoiceState }
  | { type: "HISTORY_ADD"; item: HistoryItem }
  | { type: "BGM_PLAY"; bgm: string }
  | { type: "BGM_STOP" };
// ... 其他动作类型
```

### Runtime

`Runtime` 负责脚本执行和帧管理。

#### 核心功能

- **动作分发**: 将场景中的动作转换为 `EngineAction`
- **动作记录**: 记录所有动作用于重放
- **状态还原**: 从存档还原引擎状态
- **帧管理**: 支持帧回退和前进

#### 主要方法

```typescript
class Runtime {
  dispatch(action: EngineAction): void;
  replay(actions: EngineAction[]): void;
  hydrate(state: EngineState): void;
  getCurrentFrame(): number;
}
```

#### 单例模式

```typescript
const defaultRuntime = new Runtime();
export { defaultRuntime as runtime };
```

### Persistence

`Persistence` 负责存档系统的实现，使用 localStorage 存储游戏进度。

#### 主要方法

```typescript
// 加载持久化进度
function loadPersistedProgress(): {
  state: EngineState;
  history: HistoryItem[];
} | null;

// 加载特定存档
function loadPersistedState(slot: string): {
  state: EngineState;
  history: HistoryItem[];
} | null;

// 保存存档
function savePersistedState(
  slot: string,
  state: EngineState,
  history: HistoryItem[]
): void;

// 清除存档
function clearPersistedProgress(): void;

// 获取所有存档列表
function getSavedSlots(): SavedSlotInfo[];
```

#### 存档数据结构

```typescript
interface SavedSlotInfo {
  slot: string;
  timestamp: number;
  scene: string;
  thumbnail?: string;
}
```

### BaseActor

`BaseActor` 是所有 Actor 的基类，提供角色和背景的基本功能。

#### Actor 类型

```typescript
type ActorType = "character" | "background" | "audio";

interface ActorState {
  id: string;
  type: ActorType;
  name: string;
  pose: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  opacity: number;
  visible: boolean;
  focused: boolean;
  zIndex: number;
  // ... 其他属性
}
```

#### CharacterActor

角色 Actor，支持多种姿态和变换。

```typescript
class CharacterActor extends BaseActor {
  constructor(id: string, config: CharacterConfig);
  show(): void;
  hide(): void;
  move(target: { x: number; y: number }, duration?: number): void;
  pose(newPose: string): void;
  scale(newScale: number): void;
  opacity(newOpacity: number): void;
  fadeIn(duration?: number): void;
  fadeOut(duration?: number): void;
  shake(duration?: number): void;
  jump(duration?: number): void;
  focus(isFocused: boolean): void;
}
```

#### BackgroundActor

背景 Actor，管理背景图像。

```typescript
class BackgroundActor extends BaseActor {
  constructor(id: string, config: BackgroundConfig);
  show(background: string): void;
  hide(): void;
}
```

#### ContextOps

提供便捷的上下文操作方法。

```typescript
class ContextOps {
  static say(name: string, text: string, options?: SayOptions): Promise<void>;
  static choice(question: string, options: string[]): Promise<number>;
  static show(actor: BaseActor): Promise<void>;
  static hide(actor: BaseActor): void;
  static move(
    actor: BaseActor,
    target: { x: number; y: number },
    duration?: number
  ): void;
  static pose(actor: BaseActor, newPose: string): void;
  // ... 更多方法
}
```

## 状态管理

KosuzuEngine 使用 Pinia 进行状态管理。

### engine-store

主引擎 store，提供全局引擎状态访问。

```typescript
export const useEngineStore = defineStore("engine", () => {
  const state = ref<EngineState>(createInitialEngineState());

  const background = computed(() => state.value.background);
  const bgm = computed(() => state.value.bgm);
  const dialog = computed(() => state.value.dialog);
  const choice = computed(() => state.value.choice);
  const history = computed(() => state.value.history);
  const actorIds = computed(() => Array.from(state.value.actors.keys()));

  function dispatch(action: EngineAction) {
    state.value = engineReducer(state.value, action);
  }

  function back() {
    // 回退到上一帧
  }

  function advance() {
    // 前进到下一帧
  }

  function save(slot: string) {
    // 保存存档
  }

  function load(slot: string) {
    // 加载存档
  }

  function choose(index: number) {
    // 选择选项
  }

  return {
    state,
    background,
    bgm,
    dialog,
    choice,
    history,
    actorIds,
    dispatch,
    back,
    advance,
    save,
    load,
    choose,
  };
});
```

### settings-store

用户设置 store，管理游戏设置。

```typescript
export const useSettingsStore = defineStore("settings", () => {
  const text = ref<TextSettings>({
    typewriterEnabled: true,
    typewriterSpeed: 50,
    autoPageBreak: true,
  });

  const audio = ref<AudioSettings>({
    bgmVolume: 0.8,
    sfxVolume: 0.5,
    voiceVolume: 0.7,
  });

  const voice = ref<VoiceSettings>({
    enabled: true,
    autoPlay: true,
  });

  const display = ref<DisplaySettings>({
    width: 1280,
    height: 720,
    fullscreen: false,
  });

  const locale = ref<LocaleSettings>({
    language: "zh-CN",
  });

  // 设置持久化
  watch(
    [text, audio, voice, display, locale],
    () => {
      saveSettings();
    },
    { deep: true }
  );

  function resetToDefaults() {
    // 重置为默认设置
  }

  return {
    text,
    audio,
    voice,
    display,
    locale,
    resetToDefaults,
  };
});
```

## 渲染系统

### StageView

主要舞台视图，负责渲染背景和角色。

#### 背景转场效果

```typescript
const backgroundTransition = {
  fade: "fade",
  wipeLeft: "wipe-left",
  wipeRight: "wipe-right",
  zoom: "zoom",
  blurFade: "blur-fade",
};
```

#### 角色渲染

```vue
<template>
  <div class="stage-view">
    <transition :name="currentTransition">
      <div
        v-if="background"
        class="background"
        :style="{ backgroundImage: `url(${backgroundUrl})` }"
      />
    </transition>

    <div
      v-for="actor in visibleActors"
      :key="actor.id"
      class="actor"
      :class="{
        'actor-focused': actor.focused,
        'actor-dimmed': !actor.focused && hasFocusedActor,
        'actor-shaking': actor.isShaking,
        'actor-jumping': actor.isJumping,
      }"
      :style="actorStyle(actor)"
    >
      <img :src="actorPoseUrl(actor)" :alt="actor.name" />
    </div>
  </div>
</template>
```

#### CSS 动画

```css
.actor-shaking {
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

.actor-jumping {
  animation: jump 0.3s ease-in-out;
}

@keyframes jump {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
```

### DialogBox

对话框组件，显示对话文本。

#### 打字机效果

```vue
<template>
  <div class="dialog-box">
    <div class="speaker-name">{{ speakerName }}</div>
    <TypewriterText
      :text="dialog.text"
      :speed="typewriterSpeed"
      :enabled="typewriterEnabled"
      @complete="onTypewriterComplete"
    />
    <div v-if="canContinue" class="continue-button" @click="onContinueClick">
      ▼
    </div>
  </div>
</template>
```

#### 文本优化

使用文本 diff 优化渲染性能：

```typescript
function computeTextDiff(oldText: string, newText: string) {
  // 简单的文本 diff 算法
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");

  // 找出变化的行
  const changes: { line: number; added: string; removed?: string }[] = [];

  for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
    if (oldLines[i] !== newLines[i]) {
      changes.push({
        line: i,
        removed: oldLines[i],
        added: newLines[i],
      });
    }
  }

  return changes;
}
```

### TypewriterText

打字机文本组件，支持自动分页。

#### 分页算法

```typescript
function pagedEnginePointerHighLevel(
  text: string,
  maxHeight: number,
  lineHeight: number
): string[] {
  const lines: string[] = [];
  const paragraphs = text.split("\n\n");

  for (const paragraph of paragraphs) {
    const words = paragraph.split(" ");
    let currentPage = "";

    for (const word of words) {
      const testPage = currentPage ? `${currentPage} ${word}` : word;

      if (calculateHeight(testPage, lineHeight) > maxHeight) {
        if (currentPage) {
          lines.push(currentPage.trim());
          currentPage = word;
        } else {
          // 单个词就超过页面高度，需要强制分页
          const pages = splitLongWord(word, maxHeight, lineHeight);
          lines.push(...pages);
          currentPage = "";
        }
      } else {
        currentPage = testPage;
      }
    }

    if (currentPage) {
      lines.push(currentPage.trim());
    }
  }

  return lines;
}
```

#### 动画实现

```vue
<template>
  <div class="typewriter-text">
    {{ displayedText }}<span v-if="cursorVisible" class="cursor">|</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  text: string;
  speed: number;
  enabled: boolean;
}>();

const emit = defineEmits<{
  complete: [];
}>();

const displayedText = ref("");
const currentIndex = ref(0);
const cursorVisible = ref(true);
let intervalId: number | null = null;

function startTypewriter() {
  if (intervalId) clearInterval(intervalId);

  intervalId = window.setInterval(() => {
    if (currentIndex.value < props.text.length) {
      currentIndex.value++;
      displayedText.value = props.text.slice(0, currentIndex.value);
    } else {
      clearInterval(intervalId!);
      emit("complete");
    }
  }, props.speed);
}

function completeImmediately() {
  if (intervalId) clearInterval(intervalId);
  currentIndex.value = props.text.length;
  displayedText.value = props.text;
  emit("complete");
}

watch(
  () => props.text,
  () => {
    currentIndex.value = 0;
    displayedText.value = "";
    if (props.enabled) {
      startTypewriter();
    } else {
      completeImmediately();
    }
  }
);

onMounted(() => {
  if (props.enabled) {
    startTypewriter();
  } else {
    completeImmediately();
  }
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>
```

## 音频系统

### AudioManager

音频管理器，负责多通道音频管理。

#### 通道类型

```typescript
type ChannelType = "bgm" | "sfx" | "voice";
```

#### 创建通道

```typescript
class AudioManager {
  createChannel(type: ChannelType, id: string): AudioChannel {
    const channel = new AudioChannel(type, id);
    this.channels.set(id, channel);
    return channel;
  }

  play(url: string, channelId: string, options?: PlayOptions): void {
    const channel = this.channels.get(channelId);
    if (!channel) {
      throw new Error(`Channel ${channelId} not found`);
    }
    channel.play(url, options);
  }

  stop(channelId: string): void {
    const channel = this.channels.get(channelId);
    if (channel) {
      channel.stop();
    }
  }

  setVolume(channelId: string, volume: number): void {
    const channel = this.channels.get(channelId);
    if (channel) {
      channel.volume = volume;
    }
  }
}
```

#### 播放方法

```typescript
class AudioManager {
  playBGM(url: string, options?: PlayOptions): void {
    const channel = this.createChannel("bgm", "main-bgm");
    channel.play(url, {
      loop: true,
      ...options,
    });
  }

  stopBGM(options?: StopOptions): void {
    const channel = this.channels.get("main-bgm");
    if (channel) {
      channel.stop(options);
    }
  }

  playSFX(url: string, options?: PlayOptions): void {
    const id = `sfx-${Date.now()}`;
    const channel = this.createChannel("sfx", id);
    channel.play(url, options);

    // 自动清理 SFX 通道
    channel.element.onended = () => {
      this.channels.delete(id);
    };
  }

  playVoice(url: string, characterId: string): void {
    const channelId = `voice-${characterId}`;
    const channel = this.createChannel("voice", channelId);
    channel.play(url, {
      volume: this.voiceVolume,
    });
  }
}
```

### AudioChannel

音频通道，控制单个音频播放。

#### Web Audio API 集成

```typescript
class AudioChannel {
  private audioContext: AudioContext;
  private sourceNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode;
  private analyser: AnalyserNode;

  constructor(type: ChannelType, id: string) {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.analyser = this.audioContext.createAnalyser();

    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
  }

  async play(url: string, options?: PlayOptions): Promise<void> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = audioBuffer;
    this.sourceNode.loop = options?.loop || false;
    this.sourceNode.connect(this.gainNode);
    this.sourceNode.start();

    this.volume = options?.volume || 1.0;

    if (options?.fadeIn) {
      this.fadeIn(options.fadeIn);
    }
  }

  stop(options?: StopOptions): void {
    if (options?.fadeOut) {
      this.fadeOut(options.fadeOut, () => {
        this.sourceNode?.stop();
      });
    } else {
      this.sourceNode?.stop();
    }
  }

  fadeIn(duration: number): void {
    const currentTime = this.audioContext.currentTime;
    this.gainNode.gain.cancelScheduledValues(currentTime);
    this.gainNode.gain.setValueAtTime(0, currentTime);
    this.gainNode.gain.linearRampToValueAtTime(
      this.volume,
      currentTime + duration / 1000
    );
  }

  fadeOut(duration: number, callback?: () => void): void {
    const currentTime = this.audioContext.currentTime;
    this.gainNode.gain.cancelScheduledValues(currentTime);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, currentTime);
    this.gainNode.gain.linearRampToValueAtTime(
      0,
      currentTime + duration / 1000
    );

    if (callback) {
      setTimeout(callback, duration);
    }
  }

  get currentLevel(): number {
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    // 计算平均音量
    const sum = dataArray.reduce((a, b) => a + b, 0);
    return sum / dataArray.length;
  }
}
```

### CharacterAudioManager

每个角色的语音管理器。

```typescript
interface CharacterVoiceChannel {
  channel: AudioChannel;
  lastUsed: number;
}

class CharacterAudioManager {
  private channels: Map<string, CharacterVoiceChannel[]> = new Map();
  private maxChannelsPerCharacter = 3;

  playVoice(characterId: string, url: string): void {
    const characterChannels = this.channels.get(characterId) || [];

    // 如果超过最大通道数，清理最旧的
    if (characterChannels.length >= this.maxChannelsPerCharacter) {
      const oldest = characterChannels[0];
      oldest.channel.stop();
      characterChannels.shift();
    }

    const channel = audioManager.createChannel(
      "voice",
      `voice-${characterId}-${Date.now()}`
    );
    channel.play(url);

    characterChannels.push({
      channel,
      lastUsed: Date.now(),
    });

    this.channels.set(characterId, characterChannels);
  }

  stopVoice(characterId: string): void {
    const characterChannels = this.channels.get(characterId);
    if (characterChannels) {
      characterChannels.forEach(({ channel }) => channel.stop());
      this.channels.delete(characterId);
    }
  }
}

export const characterAudioRegistry = new Map<string, CharacterAudioManager>();
```

## 国际化系统

### I18nManager

国际化管理器，管理多语言文本。

#### 注册语言

```typescript
interface LocaleData {
  [key: string]: {
    text: string;
    voice: string | null;
    tts: string | null;
  };
}

class I18nManager {
  private currentLocale = ref<string>("zh-CN");
  private locales = ref<Map<string, LocaleData>>(new Map());

  registerLocale(code: string, data: LocaleData): void {
    this.locales.value.set(code, data);
  }

  setLocale(code: string): void {
    if (this.locales.value.has(code)) {
      this.currentLocale.value = code;
    } else {
      console.warn(`Locale ${code} not found`);
    }
  }

  getText(key: string): string {
    const locale = this.locales.value.get(this.currentLocale.value);
    return locale?.[key]?.text || key;
  }

  getVoice(key: string): string | null {
    const locale = this.locales.value.get(this.currentLocale.value);
    return locale?.[key]?.voice || null;
  }
}

export const i18nManager = new I18nManager();
```

### VoiceManager

语音管理器，管理角色语音。

```typescript
interface VoiceInfo {
  character: string;
  line: string;
  voiceFile: string;
}

class VoiceManager {
  private voices = ref<Map<string, VoiceInfo>>(new Map());

  registerVoice(key: string, voiceInfo: VoiceInfo): void {
    this.voices.value.set(key, voiceInfo);
  }

  getVoice(key: string): string | null {
    const voiceInfo = this.voices.value.get(key);
    return voiceInfo?.voiceFile || null;
  }

  playVoice(key: string): void {
    const voiceFile = this.getVoice(key);
    if (voiceFile) {
      const voiceInfo = this.voices.value.get(key);
      if (voiceInfo) {
        characterAudioRegistry
          .get(voiceInfo.character)
          ?.playVoice(voiceInfo.character, voiceFile);
      }
    }
  }
}

export const voiceManager = new VoiceManager();
```

## 调试工具

### ContextViewer

调试面板，显示引擎状态。

```vue
<template>
  <div class="context-viewer">
    <h3>Engine State</h3>

    <div class="section">
      <h4>Background</h4>
      <pre>{{ background }}</pre>
    </div>

    <div class="section">
      <h4>BGM</h4>
      <pre>{{ bgm }}</pre>
    </div>

    <div class="section">
      <h4>Actors</h4>
      <ul>
        <li v-for="actor in actors" :key="actor.id">
          {{ actor.name }} ({{ actor.pose }})
        </li>
      </ul>
    </div>

    <div class="section">
      <h4>Raw State</h4>
      <pre>{{ JSON.stringify(state, null, 2) }}</pre>
    </div>
  </div>
</template>
```

### ScriptConsole

交互式脚本控制台。

```vue
<template>
  <div class="script-console">
    <XTerm ref="terminalRef" @data="onTerminalInput" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const terminalRef = ref<Terminal>();
const commandHistory: string[] = [];
let historyIndex = -1;

onMounted(() => {
  terminalRef.value?.write('KosuzuEngine Script Console\n');
  terminalRef.value?.write('Type :help for available commands\n\n');
});

function onTerminalInput(data: string) {
  const command = data.trim();

  if (command === '') return;

  if (command.startsWith(':')) {
    handleSpecialCommand(command);
  } else {
    handleJavaScriptCommand(command);
  }

  commandHistory.push(command);
  historyIndex = commandHistory.length;
}

function handleSpecialCommand(command: string) {
  const parts = command.split(' ');
  const cmd = parts[0];

  switch (cmd) {
    case ':help':
      terminalRef.value?.write(`
Available commands:
  :help       - Show this help
  :state      - Show current engine state
  :scene      - Show current scene
  :actors     - Show all actors
  :back       - Go back one frame
  :restart    - Restart current scene
      `);
      break;

    case ':state':
      terminalRef.value?.write(JSON.stringify(store.state, null, 2));
      break;

    case ':actors':
      const actors = store.state.actors;
      terminalRef.value?.write(JSON.stringify(Array.from(actors.entries()), null, 2));
      break;

    case ':back':
      store.back();
      terminalRef.value?.write('Went back one frame\n');
      break;

    case ':restart':
      runtime.replay([]);
      terminalRef.value?.write('Restarted current scene\n');
      break;

    default:
      terminalRef.value?.write(`Unknown command: ${cmd}\n`);
  }
}

function handleJavaScriptCommand(code: string) {
  try {
    // 暴露全局变量
    const ctx = store.state;
    const stage = { showActor: () => {}, hideActor: () => {}, ... };
    const runtime = defaultRuntime;
    const store = useEngineStore();

    const result = eval(code);
    terminalRef.value?.write(`${result}\n`);
  } catch (error) {
    terminalRef.value?.write(`Error: ${error}\n`);
  }
}
</script>
```

## API 参考

### 全局 API

#### ctx.say()

显示对话。

```typescript
function say(name: string, text: string, options?: SayOptions): Promise<void>;
```

**参数:**

- `name`: 说话人名称
- `text`: 对话文本
- `options`: 可选配置
  - `voice`: 语音文件路径
  - `speed`: 打字速度
  - `waitForClick`: 是否等待点击继续

**示例:**

```typescript
await ctx.say("character.name", "你好，世界！");
await ctx.say("character.name", "你好，世界！", {
  voice: "/path/to/voice.wav",
  speed: 50,
});
```

#### ctx.choice()

显示选择选项。

```typescript
function choice(question: string, options: string[]): Promise<number>;
```

**参数:**

- `question`: 问题文本
- `options`: 选项数组

**返回值:** 用户选择的选项索引

**示例:**

```typescript
const choice = await ctx.choice("你想做什么？", ["继续", "离开"]);
if (choice === 0) {
  // 用户选择了"继续"
}
```

#### ctx.stage.showActor()

显示角色。

```typescript
function showActor(actor: BaseActor): Promise<void>;
```

**参数:**

- `actor`: Actor 实例

**示例:**

```typescript
const actor = createCharacter();
await ctx.stage.showActor(actor);
```

#### ctx.stage.hideActor()

隐藏角色。

```typescript
function hideActor(actorId: string): void;
```

**参数:**

- `actorId`: Actor ID

**示例:**

```typescript
ctx.stage.hideActor("character-id");
```

#### ctx.stage.showBackground()

显示背景。

```typescript
function showBackground(background: string): void;
```

**参数:**

- `background`: 背景名称

**示例:**

```typescript
ctx.stage.showBackground("haikei_01_sora");
```

#### ctx.audio.playBGM()

播放 BGM。

```typescript
function playBGM(bgm: string, options?: PlayOptions): void;
```

**参数:**

- `bgm`: BGM 名称
- `options`: 可选配置
  - `volume`: 音量 (0-1)
  - `fadeIn`: 淡入时间

**示例:**

```typescript
ctx.audio.playBGM("bgm_01", {
  volume: 0.8,
  fadeIn: 1000,
});
```

#### ctx.audio.stopBGM()

停止 BGM。

```typescript
function stopBGM(options?: StopOptions): void;
```

**参数:**

- `options`: 可选配置
  - `fadeOut`: 淡出时间

**示例:**

```typescript
ctx.audio.stopBGM({
  fadeOut: 1000,
});
```

#### ctx.audio.playSFX()

播放音效。

```typescript
function playSFX(sfx: string, options?: PlayOptions): void;
```

**参数:**

- `sfx`: 音效名称
- `options`: 可选配置
  - `volume`: 音量 (0-1)

**示例:**

```typescript
ctx.audio.playSFX("se_click", {
  volume: 0.5,
});
```

#### ctx.navigation.navigate()

跳转到指定场景。

```typescript
function navigate(sceneId: string): void;
```

**参数:**

- `sceneId`: 场景 ID

**示例:**

```typescript
await ctx.navigation.navigate("scene2");
```

### BaseActor API

#### show()

显示 Actor。

```typescript
function show(): void;
```

#### hide()

隐藏 Actor。

```typescript
function hide(): void;
```

#### move()

移动 Actor。

```typescript
function move(target: { x: number; y: number }, duration?: number): void;
```

**参数:**

- `target`: 目标位置
- `duration`: 动画持续时间（毫秒）

#### pose()

切换姿态。

```typescript
function pose(newPose: string): void;
```

**参数:**

- `newPose`: 姿态名称

#### scale()

设置缩放。

```typescript
function scale(newScale: number): void;
```

**参数:**

- `newScale`: 缩放比例

#### opacity()

设置透明度。

```typescript
function opacity(newOpacity: number): void;
```

**参数:**

- `newOpacity`: 透明度 (0-1)

#### fadeIn()

淡入。

```typescript
function fadeIn(duration?: number): void;
```

**参数:**

- `duration`: 淡入时间（毫秒）

#### fadeOut()

淡出。

```typescript
function fadeOut(duration?: number): void;
```

**参数:**

- `duration`: 淡出时间（毫秒）

#### shake()

抖动效果。

```typescript
function shake(duration?: number): void;
```

**参数:**

- `duration`: 抖动时间（毫秒）

#### jump()

跳跃效果。

```typescript
function jump(duration?: number): void;
```

**参数:**

- `duration`: 跳跃时间（毫秒）

#### focus()

聚焦/取消聚焦。

```typescript
function focus(isFocused: boolean): void;
```

**参数:**

- `isFocused`: 是否聚焦

## 开发指南

### 添加新功能

#### 1. 添加新的动作类型

在 `src/engine/core/ActorAction.ts` 中添加新的动作类型：

```typescript
export type EngineAction =
  // ... 现有动作类型
  { type: "CUSTOM_ACTION"; payload: CustomPayload };
```

在 `src/engine/core/EngineContext.ts` 中的 reducer 中处理新动作：

```typescript
function engineReducer(state: EngineState, action: EngineAction): EngineState {
  switch (action.type) {
    // ... 现有 case
    case "CUSTOM_ACTION":
      return handleCustomAction(state, action.payload);
    default:
      return state;
  }
}
```

#### 2. 添加新的 Actor 类型

在 `src/engine/core/BaseActor.ts` 中扩展：

```typescript
class NewActor extends BaseActor {
  constructor(id: string, config: NewActorConfig) {
    super(id, config);
  }

  customMethod(): void {
    // 自定义方法
  }
}
```

#### 3. 添加新的转场效果

在 `src/engine/render/StageView.vue` 中添加新的转场：

```typescript
const backgroundTransition = {
  // ... 现有转场
  newTransition: "new-transition",
};
```

在 CSS 中添加动画：

```css
.new-transition-enter-active,
.new-transition-leave-active {
  transition: all 1s ease;
}

.new-transition-enter-from {
  opacity: 0;
  transform: scale(1.2);
}

.new-transition-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
```

### 测试

#### 单元测试

```typescript
import { describe, it, expect } from "vitest";
import {
  createEngineContext,
  engineReducer,
} from "@/engine/core/EngineContext";

describe("EngineContext", () => {
  it("should handle BACKGROUND_CHANGE action", () => {
    const context = createEngineContext();
    const action = { type: "BACKGROUND_CHANGE" as const, background: "new-bg" };

    context.dispatch(action);

    expect(context.getState().background).toBe("new-bg");
  });
});
```

#### 集成测试

```typescript
import { describe, it, expect } from "vitest";
import { createScene } from "@/engine";
import { useEngineStore } from "@/stores/engine-store";

describe("Scene Execution", () => {
  it("should execute scene and update state", async () => {
    const store = useEngineStore();

    const scene = createScene("test-scene", async (ctx) => {
      ctx.stage.showBackground("test-bg");
      await ctx.dialog.say("test", "Hello");
    });

    await scene.execute(store);

    expect(store.background).toBe("test-bg");
  });
});
```

### 性能优化

#### 1. 使用 computed 缓存计算

```typescript
const filteredActors = computed(() => {
  return Array.from(actors.value.entries())
    .filter(([_, actor]) => actor.visible)
    .sort((a, b) => a[1].zIndex - b[1].zIndex);
});
```

#### 2. 避免不必要的重新渲染

```typescript
// 使用 shallowRef 避免深层响应
const largeData = shallowRef<LargeDataType>({});

// 使用 markRaw 标记不需要响应式的对象
const staticData = markRaw(someLargeObject);
```

#### 3. 虚拟滚动长列表

对于历史记录等长列表，使用虚拟滚动：

```vue
<template>
  <VirtualList :data-sources="history" :data-key="'id'" :keeps="30">
    <template #default="{ data }">
      <HistoryItem :item="data" />
    </template>
  </VirtualList>
</template>
```

### 调试技巧

#### 1. 使用 Vue DevTools

安装 Vue DevTools 浏览器扩展，可以实时查看组件状态和事件。

#### 2. 使用 console.log 和 debugger

在关键位置添加调试代码：

```typescript
console.log("Current state:", store.state);
debugger; // 浏览器会在此处暂停
```

#### 3. 使用性能分析

使用 Chrome DevTools Performance 面板分析性能瓶颈。

#### 4. 使用脚本控制台

使用内置的脚本控制台（快捷键 `~`）实时执行代码：

```javascript
:state  // 查看当前状态
:actors // 查看所有 Actor
ctx.stage.showActor(createCharacter()) // 显示角色
```

### 贡献指南

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 代码风格

- 使用 2 空格缩进
- 使用单引号
- 使用分号
- 遵循 ESLint 规则

### 文档

更新文档时，确保：

- 更新相关的 API 文档
- 添加使用示例
- 更新 TypeScript 类型定义
- 确保文档与代码同步

## 常见问题

### Q: 如何添加新的动作类型？

A: 在 `ActorAction.ts` 中添加类型定义，在 `EngineContext.ts` 的 reducer 中处理。

### Q: 如何优化大量 Actor 的渲染性能？

A: 使用虚拟滚动、懒加载、减少不必要的响应式数据。

### Q: 如何处理音频自动播放问题？

A: 浏览器要求用户交互后才能播放音频。在首次用户点击后再播放音频。

### Q: 如何扩展国际化系统？

A: 在 `i18n/locales/` 添加新的语言文件，在 `I18nManager` 中注册。

## 更多资源

- [Vue 3 文档](https://vuejs.org/)
- [Quasar 文档](https://quasar.dev/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
