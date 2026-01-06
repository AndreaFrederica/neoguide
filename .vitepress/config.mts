import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    srcDir: "docs",

    title: "Andrea's Wiki",
    description: "Andrea and Sirrus projects wiki",
    head: [
      ['link', { rel: 'icon', href: '/icon.png' }]
    ],
    lastUpdated: true,
    cleanUrls: true,
    lang: "zh-CN",

    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      
      // 页面图标
      logo: '/icon.png',
      
      // 本地搜索配置
      search: {
        provider: 'local',
        options: {
          locales: {
            zh: {
              translations: {
                button: {
                  buttonText: '搜索文档',
                  buttonAriaLabel: '搜索文档'
                },
                modal: {
                  noResultsText: '无法找到相关结果',
                  resetButtonTitle: '清除查询条件',
                  displayDetails: '显示详细',
                  backButtonTitle: '返回',
                  footer: {
                    selectText: '选择',
                    navigateText: '切换',
                    closeText: '关闭'
                  }
                }
              }
            }
          },
          miniSearch: {
            searchOptions: {
              fuzzy: 0.2,
              prefix: true,
              boost: { title: 4, text: 2, titles: 1 }
            }
          }
        }
      },
      
      // 目录配置
      outline: {
        label: '目录',
        level: 'deep'
      },
      
      // 文档页脚
      docFooter: {
        prev: '上一页',
        next: '下一页'
      },
      
      // 其他UI文本配置
      outlineTitle: '目录',
      darkModeSwitchLabel: '外观',
      sidebarMenuLabel: '文档目录',
      returnToTopLabel: '返回顶部',
      langMenuLabel: '语言',
      lastUpdated: {
        text: '更新于'
      },
      
      // 导航栏 - 优化后
      nav: [
        { text: '首页', link: '/' },
        {
          text: '项目',
          items: [
            { text: 'Andrea Novel Helper', link: '/AndreaNovelHelper/' },
            { text: 'img2pic', link: '/img2pic/' },
            { text: 'Video2Motion', link: '/video2motion/' },
            { text: 'Luna Launcher', link: '/LunaLauncher/' },
            { text: 'YukariConnect', link: '/YukariConnect/' },
            { text: 'LibGuideBook', link: '/LibGuideBook/' },
            { text: 'MyGO', link: '/mygo/' },
            { text: 'Patchouli.js', link: '/patchouli.js/' }
          ]
        },
        { text: '博客', link: 'https://blog.sirrus.cc' }
      ],

    sidebar: {
      '/': [
        {
          text: 'Andrea Novel Helper',
          items: [
            {
              text: '开始',
              items: [
                { text: '项目介绍', link: '/AndreaNovelHelper/' },
                { text: '用户指南', link: '/AndreaNovelHelper/user/' },
                { text: '开发者文档', link: '/AndreaNovelHelper/developer/' },
              ]
            },
            {
              text: '用户文档',
              collapsed: true,
              items: [
                {
                  text: '新手入门',
                  collapsed: true,
                  items: [
                    { text: '产品介绍', link: '/AndreaNovelHelper/user/introduction.md' },
                    { text: '安装与设置', link: '/AndreaNovelHelper/user/getting-started/installation.md' },
                    { text: 'Git 使用指南', link: '/AndreaNovelHelper/user/getting-started/git-guide.md' },
                    { text: '图文教程', link: '/AndreaNovelHelper/user/getting-started/visual-guide.md' },
                    { text: '初次使用向导', link: '/AndreaNovelHelper/user/getting-started/first-run.md' },
                    { text: '基础工作流程', link: '/AndreaNovelHelper/user/getting-started/basic-workflow.md' },
                  ]
                },
                {
                  text: '侧边栏功能',
                  collapsed: true,
                  items: [
                    { text: '字数统计', link: '/AndreaNovelHelper/user/sidebar/word-count.md' },
                    { text: '角色管理', link: '/AndreaNovelHelper/user/sidebar/roles.md' },
                    { text: '包管理器', link: '/AndreaNovelHelper/user/sidebar/packages.md' },
                    { text: '大纲视图', link: '/AndreaNovelHelper/user/sidebar/outline.md' },
                    { text: 'WebDAV 同步', link: '/AndreaNovelHelper/user/sidebar/webdav.md' },
                    { text: 'AutoGit', link: '/AndreaNovelHelper/user/sidebar/autogit.md' },
                    { text: '批注管理', link: '/AndreaNovelHelper/user/sidebar/comments.md' },
                    { text: '脚本运行器', link: '/AndreaNovelHelper/user/sidebar/script-runner.md' },
                  ]
                },
                {
                  text: '状态栏功能',
                  collapsed: true,
                  items: [
                    { text: '写作统计', link: '/AndreaNovelHelper/user/statusbar/writing-stats.md' },
                    { text: '版式信息', link: '/AndreaNovelHelper/user/statusbar/layout-info.md' },
                    { text: '同步状态', link: '/AndreaNovelHelper/user/statusbar/sync-status.md' },
                    { text: '标签组锁', link: '/AndreaNovelHelper/user/statusbar/tab-lock.md' },
                  ]
                },
                {
                  text: '编辑器功能',
                  collapsed: true,
                  items: [
                    { text: '智能回车', link: '/AndreaNovelHelper/user/editor/smart-enter.md' },
                    { text: '自动配对', link: '/AndreaNovelHelper/user/editor/auto-pairs.md' },
                    { text: '角色高亮', link: '/AndreaNovelHelper/user/editor/character-highlight.md' },
                    { text: '错别字检测', link: '/AndreaNovelHelper/user/editor/typo-detection.md' },
                    { text: '自动补全', link: '/AndreaNovelHelper/user/editor/completions.md' },
                    { text: '格式化', link: '/AndreaNovelHelper/user/editor/formatting.md' },
                  ]
                },
                {
                  text: '命令面板功能',
                  collapsed: true,
                  items: [
                    { text: '名字生成器', link: '/AndreaNovelHelper/user/commands/name-generator.md' },
                    { text: 'Typst 导出', link: '/AndreaNovelHelper/user/commands/typst-export.md' },
                    { text: '数据库管理', link: '/AndreaNovelHelper/user/commands/database.md' },
                    { text: '关系管理', link: '/AndreaNovelHelper/user/commands/relationships.md' },
                  ]
                },
                {
                  text: '独立视图',
                  collapsed: true,
                  items: [
                    { text: '角色卡片编辑器', link: '/AndreaNovelHelper/user/views/role-cards.md' },
                    { text: '关系图编辑器', link: '/AndreaNovelHelper/user/views/relationship-editor.md' },
                    { text: '时间线编辑器', link: '/AndreaNovelHelper/user/views/timeline-editor.md' },
                    { text: '预览面板', link: '/AndreaNovelHelper/user/views/preview.md' },
                    { text: '热力图', link: '/AndreaNovelHelper/user/views/heatmap.md' },
                    { text: 'Typst 预览', link: '/AndreaNovelHelper/user/views/typst-preview.md' },
                  ]
                },
                {
                  text: '设置',
                  collapsed: true,
                  items: [
                    { text: '快速设置', link: '/AndreaNovelHelper/user/settings/quick-settings.md' },
                    { text: '常规设置', link: '/AndreaNovelHelper/user/settings/general-settings.md' },
                    { text: '角色设置', link: '/AndreaNovelHelper/user/settings/role-settings.md' },
                    { text: '同步设置', link: '/AndreaNovelHelper/user/settings/sync-settings.md' },
                  ]
                },
              ]
            },
            {
              text: '开发者文档',
              collapsed: true,
              items: [
                { text: '项目概述', link: '/AndreaNovelHelper/developer/01-overview.md' },
                { text: '架构设计', link: '/AndreaNovelHelper/developer/02-architecture.md' },
                { text: '核心模块', link: '/AndreaNovelHelper/developer/03-core-modules.md' },
                { text: 'API 参考', link: '/AndreaNovelHelper/developer/04-api-reference.md' },
                { text: '配置说明', link: '/AndreaNovelHelper/developer/05-configuration.md' },
                { text: '开发指南', link: '/AndreaNovelHelper/developer/06-development-guide.md' },
              ]
            },
            {
              text: '版本日志',
              collapsed: true,
              items: [
                { text: '全部版本日志', link: '/AndreaNovelHelper/user/changelog.md' },
                { text: 'v0.3.25', link: '/AndreaNovelHelper/user/changelog/novel-helper0325/' },
                { text: 'v0.3.24', link: '/AndreaNovelHelper/user/changelog/novel-helper0324/' },
              ]
            },
          ]
        },
        {
          text: 'img2pic',
          items: [
            {
              text: '开始',
              items: [
                { text: '项目介绍', link: '/img2pic/' },
                { text: '用户指南', link: '/img2pic/user/' },
                { text: '开发者文档', link: '/img2pic/developer/' },
              ]
            },
            {
              text: '用户文档',
              collapsed: true,
              items: [
                { text: '项目介绍', link: '/img2pic/user/introduction.md' },
                { text: '安装指南', link: '/img2pic/user/installation.md' },
                {
                  text: '命令行工具',
                  collapsed: true,
                  items: [
                    { text: 'energ 工具', link: '/img2pic/user/tools/energ.md' },
                    { text: '边缘检测工具', link: '/img2pic/user/tools/edge_detect.md' },
                    { text: '网格采样工具', link: '/img2pic/user/tools/grid_sampling.md' },
                    { text: '演示工具', link: '/img2pic/user/tools/demo.md' },
                  ]
                },
                { text: '网页版', link: '/img2pic/user/web-version.md' },
                { text: 'ComfyUI 节点', link: '/img2pic/user/comfyui.md' },
                {
                  text: '算法说明',
                  collapsed: true,
                  items: [
                    { text: '能量图算法', link: '/img2pic/user/algorithms/energy_map.md' },
                    { text: '边缘检测算法', link: '/img2pic/user/algorithms/edge_detection.md' },
                  ]
                },
                { text: '工具对比', link: '/img2pic/user/comparison.md' },
              ]
            },
            {
              text: '开发者文档',
              collapsed: true,
              items: [
                { text: '项目概述', link: '/img2pic/developer/overview.md' },
                { text: 'ComfyUI 节点', link: '/img2pic/developer/comfyui.md' },
              ]
            },
          ]
        },
        {
          text: 'Video2Motion',
          items: [
            {
              text: '开始',
              items: [
                { text: '项目介绍', link: '/video2motion/' },
                { text: '用户指南', link: '/video2motion/user/' },
                { text: '开发者文档', link: '/video2motion/developer/' },
              ]
            },
            {
              text: '用户文档',
              collapsed: true,
              items: [
                { text: '使用指南', link: '/video2motion/user/' },
              ]
            },
            {
              text: '开发者文档',
              collapsed: true,
              items: [
                { text: '开发指南', link: '/video2motion/developer/' },
              ]
            },
          ]
        },
        {
          text: 'YukariConnect',
          items: [
            {
              text: '开始',
              items: [
                { text: '项目介绍', link: '/YukariConnect/' },
                { text: '用户指南', link: '/YukariConnect/user/' },
                { text: '开发者文档', link: '/YukariConnect/developer/' },
              ]
            },
            {
              text: '用户文档',
              collapsed: true,
              items: [
                { text: '使用指南', link: '/YukariConnect/user/' },
              ]
            },
            {
              text: '开发者文档',
              collapsed: true,
              items: [
                { text: '开发指南', link: '/YukariConnect/developer/' },
              ]
            },
          ]
        },
        {
          text: 'LibGuideBook',
          items: [
            {
              text: '开始',
              items: [
                { text: '项目介绍', link: '/LibGuideBook/' },
                { text: '用户指南', link: '/LibGuideBook/user/' },
                { text: '开发者文档', link: '/LibGuideBook/developer/' },
              ]
            },
            {
              text: '用户文档',
              collapsed: true,
              items: [
                { text: '用户指南', link: '/LibGuideBook/user/' },
                { text: '创建手册', link: '/LibGuideBook/user/creating-manuals.md' },
                { text: '运行手册', link: '/LibGuideBook/user/running.md' },
                {
                  text: '交互工具',
                  collapsed: true,
                  items: [
                    { text: '工具概览', link: '/LibGuideBook/user/tools/index.md' },
                    { text: '计时器', link: '/LibGuideBook/user/tools/timer.md' },
                    { text: '计算器', link: '/LibGuideBook/user/tools/calculator.md' },
                    { text: '公式工具', link: '/LibGuideBook/user/tools/formula.md' },
                  ]
                },
              ]
            },
            {
              text: '开发者文档',
              collapsed: true,
              items: [
                { text: '开发者指南', link: '/LibGuideBook/developer/' },
                { text: '开发环境', link: '/LibGuideBook/developer/development.md' },
                { text: '项目架构', link: '/LibGuideBook/developer/architecture.md' },
              ]
            },
          ]
        },
        {
          text: 'Luna Launcher',
          items: [
            {
              text: '开始',
              items: [
                { text: '项目介绍', link: '/LunaLauncher/' },
                { text: '用户指南', link: '/LunaLauncher/user/' },
                { text: '开发者文档', link: '/LunaLauncher/developer/' },
              ]
            },
            {
              text: '用户文档',
              collapsed: true,
              items: [
                { text: '用户指南', link: '/LunaLauncher/user/' },
                { text: '安装指南', link: '/LunaLauncher/user/installation.md' },
                { text: '功能特性', link: '/LunaLauncher/user/features.md' },
                { text: 'P2P 联机', link: '/LunaLauncher/user/p2p.md' },
                { text: '镜像下载', link: '/LunaLauncher/user/mirrors.md' },
                { text: '主题与界面', link: '/LunaLauncher/user/themes.md' },
                { text: '常见问题', link: '/LunaLauncher/user/troubleshooting.md' },
              ]
            },
            {
              text: '开发者文档',
              collapsed: true,
              items: [
                { text: '开发者指南', link: '/LunaLauncher/developer/' },
                { text: '构建指南', link: '/LunaLauncher/developer/build.md' },
                { text: '架构设计', link: '/LunaLauncher/developer/architecture.md' },
                { text: 'BMCLAPI 集成', link: '/LunaLauncher/developer/bmclapi.md' },
              ]
            },
          ]
        },
        {
          text: 'MyGO',
          items: [
            { text: '项目介绍', link: '/mygo/' },
          ]
        },
        {
          text: 'Patchouli.js',
          items: [
            {
              text: '开始',
              items: [
                { text: '项目介绍', link: '/patchouli.js/' },
                { text: '用户指南', link: '/patchouli.js/user/' },
                { text: '开发者文档', link: '/patchouli.js/developer/' },
              ]
            },
            {
              text: '用户文档',
              collapsed: true,
              items: [
                { text: '使用指南', link: '/patchouli.js/user/' },
              ]
            },
            {
              text: '开发者文档',
              collapsed: true,
              items: [
                { text: '开发指南', link: '/patchouli.js/developer/' },
              ]
            },
          ]
        },
        // 在这里添加其他软件的文档
        // {
        //   text: 'Another Software',
        //   items: [...]
        // }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AndreaFrederica/neoguide' }
    ]
    },

    /* Vite PWA 配置 */
    pwa: {
      mode: 'development',
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      includeAssets: ['icon.png', 'favicon.ico'],
      manifest: {
        name: "Andrea's Wiki",
        short_name: 'AndreaWiki',
        description: 'Andrea and Sirrus projects wiki',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        type: 'module',
        navigateFallback: '/',
      },
    },
  })
)
