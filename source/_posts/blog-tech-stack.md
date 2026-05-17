---
title: 从零搭建个人博客：技术框架与落地实践
date: '2026-05-16 14:00:00 +0800'
tags:
  - Hexo
  - 博客搭建
  - GitHub Pages
  - Butterfly
categories: 技术
cover: 'https://img.001315.xyz/file/tg/1778931718760.webp'
abbrlink: 7b1e2ad1
---

## 前言

一直想拥有一个属于自己的博客，用来记录学习笔记和技术思考。经过一番调研，最终选择了 Hexo + Butterfly + GitHub Pages 的方案。这篇文章记录一下整个博客的技术框架和搭建思路，希望能给想做类似事情的朋友一些参考。

## 技术栈总览

| 层级 | 技术选型 | 作用 |
|------|----------|------|
| 静态站点生成器 | Hexo | 将 Markdown 转换为静态 HTML |
| 主题框架 | Butterfly | 提供页面布局和视觉风格 |
| 部署平台 | GitHub Pages | 免费托管静态网站 |
| 版本管理 | Git + GitHub | 源码管理与自动部署 |
| 看板娘 | Live2D | 页面右下角的互动角色 |
| 本地搜索 | hexo-generator-search | 站内文章搜索功能 |

## 项目结构

```
blog/
├── _config.yml              # Hexo 主配置
├── _config.butterfly.yml    # 主题配置
├── source/
│   ├── _posts/              # 文章目录（Markdown）
│   ├── css/custom.css       # 自定义样式
│   └── js/custom.js         # 自定义脚本
├── themes/                  # 主题目录
└── package.json             # 依赖管理
```

核心思路很简单：在 `source/_posts/` 下写 Markdown 文章，Hexo 负责把它们编译成静态网页，推送到 GitHub 后自动部署上线。

## 为什么选 Hexo

- 基于 Node.js，安装和使用门槛低
- 生态成熟，主题和插件丰富
- 生成纯静态文件，加载速度快
- 文章用 Markdown 书写，专注内容本身

## 为什么选 Butterfly 主题

- 开箱即用，配置项丰富
- 支持暗色模式、目录导航、文章版权声明
- 侧边栏可自定义卡片（作者信息、公告、标签云等）
- 社区活跃，文档完善

## 自定义改造

在默认主题基础上做了一些个性化调整：

- **毛玻璃卡片效果**：文章卡片和侧边栏使用 `backdrop-filter` 实现半透明磨砂质感
- **全屏背景图**：页面背景固定一张图片，内容区域透明，形成层次感
- **透明导航栏**：顶部导航默认透明，滚动后变为半透明毛玻璃
- **渐入动画**：文章卡片加载时带有淡入上移的动画效果
- **自定义配色**：以蓝白色系为主调，统一视觉风格

这些改造主要通过 `source/css/custom.css` 实现，不需要修改主题源码。

## 部署流程

```
写文章（Markdown） → git push → GitHub Pages 自动构建 → 博客更新
```

整个流程非常轻量，写完文章推送一下就完成发布，不需要服务器、不需要数据库。

## 用到的插件

- `hexo-generator-search`：生成站内搜索索引
- `hexo-wordcount`：文章字数统计和阅读时长
- `hexo-helper-live2d`：Live2D 看板娘

## 如何复刻

如果你也想搭建一个类似的博客，核心步骤：

1. 安装 Node.js 和 Git
2. `npm install -g hexo-cli` 安装 Hexo
3. `hexo init blog && cd blog` 初始化项目
4. 安装 Butterfly 主题并配置
5. 创建 GitHub Pages 仓库（`用户名.github.io`）
6. 写文章，推送，完成

整个过程不需要后端开发经验，有基本的命令行操作能力就能完成。配合 AI 辅助，从零到上线可以在一天内搞定。

## 总结

这套方案的优势在于：免费、快速、可定制、易维护。所有内容都是 Markdown 文件，迁移方便；部署在 GitHub 上，稳定可靠。对于想要一个轻量个人博客的开发者来说，是一个不错的选择。
