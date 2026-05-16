# Rhine's Blog 设计文档

## 概述

将 ban-code-art.github.io 从基础 Jekyll + minima 博客重新设计为 Hexo + Butterfly 主题的蓝白动漫风学习记录博客。

## 技术架构

- **框架**：Hexo 7.x
- **主题**：hexo-theme-butterfly（最新版）
- **部署**：GitHub Pages（通过 GitHub Actions 自动构建部署）
- **仓库**：ban-code-art.github.io
- **Node.js**：18.x 或更高版本

## 视觉风格

### 配色方案 — 蓝白动漫风

| 用途 | 亮色模式 | 暗色模式 |
|------|----------|----------|
| 主色 | `#4c9bff`（天蓝色） | `#4c9bff` |
| 辅色 | `#a0d8ef`（浅蓝） | `#5b8bd4` |
| 背景 | `#ffffff` / `#f7f9fe` | `#1a1b2e` |
| 文字 | `#333333` | `#e2e8f0` |
| 强调色 | `#6366f1`（靛蓝） | `#818cf8` |
| 卡片背景 | `#ffffff` | `#252642` |

### 字体

- 中文：系统默认（思源黑体 / 苹方 / Microsoft YaHei）
- 英文正文：系统默认 sans-serif
- 代码：JetBrains Mono

### 首页 Banner

- 大尺寸动漫风背景图（蓝白色调）
- 打字机效果显示个人签名/座右铭
- 向下滚动箭头引导

## 页面结构

### 导航栏

顶部固定，滚动时带毛玻璃效果（backdrop-filter: blur）。

菜单项：
- 首页（Home）
- 归档（Archives）
- 分类（Categories）
- 标签（Tags）
- 友链（Links）
- 关于（About）

右侧功能按钮：
- 搜索（本地搜索）
- 深色/亮色模式切换

### 首页

- 顶部 Banner：动漫风背景 + 博客标题「Rhine's Blog」+ 副标题
- 文章列表：卡片式布局，每张卡片包含：
  - 文章封面图（可选）
  - 标题
  - 摘要（前 200 字）
  - 发布日期
  - 分类标签
- 右侧边栏：
  - 个人信息卡片（头像、昵称 Rhine、个人签名）
  - 公告栏
  - 最近文章
  - 分类列表
  - 标签云（精简版）

### 文章页

- 顶部文章封面图（可选，默认使用主题默认图）
- 文章元信息：标题、日期、分类、标签、字数、预计阅读时间
- 正文区域：Markdown 渲染
- 右侧 TOC 目录：滚动跟随高亮当前章节
- 代码块：带语言标识 + 一键复制按钮 + atom-one-dark 主题
- 底部：上一篇/下一篇文章导航
- 版权声明（CC BY-NC-SA 4.0）

### 归档页

- 时间线布局，按年份分组
- 每条记录显示日期和标题

### 分类页

- 分类卡片/列表展示
- 点击进入该分类下的文章列表

### 标签页

- 标签云展示（大小反映文章数量）
- 点击进入该标签下的文章列表

### 友链页

- 卡片式友链展示
- 每张卡片：头像、名称、描述、链接

### 关于我页

- 个人介绍
- 技能标签
- 联系方式 / 社交链接

## 功能配置

### 本地搜索

- 插件：hexo-generator-searchdb
- 触发方式：导航栏搜索按钮，弹出搜索框
- 搜索范围：文章标题 + 正文内容

### TOC 目录

- Butterfly 内置功能
- 位置：文章页右侧悬浮
- 行为：滚动跟随高亮，点击跳转

### 深色模式

- Butterfly 内置切换按钮
- 位置：导航栏右侧
- 行为：点击切换，记住用户偏好（localStorage）

### 代码高亮

- 引擎：highlight.js
- 主题：atom-one-dark
- 功能：语言标识、行号（可选）、一键复制

### 其他

- 图片懒加载：Butterfly 内置
- 页面过渡动画：淡入效果
- 回到顶部按钮
- 页脚：版权信息 + 驱动信息（Hexo + Butterfly）

## 部署方式

### GitHub Actions 自动部署

- 触发条件：push 到 main 分支
- 构建流程：
  1. checkout 代码
  2. 安装 Node.js 18.x
  3. npm install
  4. hexo generate
  5. 部署到 gh-pages 分支
- 好处：无需本地构建，直接编辑 Markdown 推送即可发布

## 目录结构

```
ban-code-art.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── source/
│   ├── _posts/                 # 博客文章（Markdown）
│   │   └── hello-blog.md      # 迁移的第一篇文章
│   ├── about/
│   │   └── index.md            # 关于我页面
│   ├── link/
│   │   └── index.md            # 友链页面
│   ├── categories/
│   │   └── index.md            # 分类页面
│   └── tags/
│       └── index.md            # 标签页面
├── scaffolds/                  # 文章模板
│   ├── post.md
│   ├── page.md
│   └── draft.md
├── _config.yml                 # Hexo 主配置
├── _config.butterfly.yml       # Butterfly 主题配置
├── package.json
├── .gitignore
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-05-16-blog-redesign-design.md  # 本文档
```

## 个人信息配置

- **博客标题**：Rhine's Blog
- **副标题**：学习与记录
- **作者昵称**：Rhine
- **描述**：代码与思考的记录
- **语言**：zh-CN
- **时区**：Asia/Shanghai

## 迁移计划

1. 清空当前仓库内容（保留 .git）
2. 初始化 Hexo 项目
3. 安装 Butterfly 主题
4. 配置主题（蓝白动漫风配色、功能开关）
5. 迁移现有文章（hello-blog.md）
6. 创建各页面（关于、友链、分类、标签）
7. 配置 GitHub Actions 自动部署
8. 推送并验证
