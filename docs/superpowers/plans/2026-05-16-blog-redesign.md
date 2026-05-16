# Rhine's Blog Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild ban-code-art.github.io as a Hexo + Butterfly blog with blue-white anime aesthetic, dark mode, TOC, and local search.

**Architecture:** Clean the existing Jekyll repo, initialize a fresh Hexo project, install Butterfly theme via npm, configure the theme for blue-white anime style with all required features, create navigation pages, migrate the existing post, and set up GitHub Actions for automated deployment.

**Tech Stack:** Hexo 7.x, hexo-theme-butterfly (latest), hexo-generator-searchdb, Node.js 18+, GitHub Actions

---

## File Structure

```
ban-code-art.github.io/
├── .github/workflows/deploy.yml
├── .gitignore
├── _config.yml                    # Hexo main config
├── _config.butterfly.yml          # Butterfly theme config
├── package.json
├── source/
│   ├── _posts/
│   │   └── hello-blog.md
│   ├── about/index.md
│   ├── categories/index.md
│   ├── tags/index.md
│   └── link/index.md
├── scaffolds/
│   ├── post.md
│   ├── page.md
│   └── draft.md
└── docs/superpowers/              # Design docs (preserved)
```

---

### Task 1: Clean repo and initialize Hexo project

**Files:**
- Delete: `Gemfile`, `_config.yml`, `index.md`, `README.md`, `_posts/`
- Create: `package.json`, `_config.yml`, `.gitignore`, `scaffolds/post.md`, `scaffolds/page.md`, `scaffolds/draft.md`

- [ ] **Step 1: Remove old Jekyll files**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
rm -f Gemfile _config.yml index.md README.md
rm -rf _posts
```

- [ ] **Step 2: Initialize Hexo project**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
npm init -y
npm install hexo@^7 hexo-cli hexo-renderer-ejs hexo-renderer-marked hexo-renderer-stylus hexo-generator-searchdb hexo-server
```

- [ ] **Step 3: Create .gitignore**

Create `.gitignore`:

```
node_modules/
public/
.deploy_git/
db.json
*.log
.DS_Store
Thumbs.db
```

- [ ] **Step 4: Create Hexo main config `_config.yml`**

```yaml
title: Rhine's Blog
subtitle: 学习与记录
description: 代码与思考的记录
keywords:
author: Rhine
language: zh-CN
timezone: Asia/Shanghai

url: https://ban-code-art.github.io
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
pretty_urls:
  trailing_index: true
  trailing_html: true

source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

new_post_name: :title.md
default_layout: post
titlecase: false
external_link:
  enable: true
  field: site
  exclude: ''
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true

highlight:
  enable: false
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false

prismjs:
  enable: false

index_generator:
  path: ''
  per_page: 10
  order_by: -date

default_category: uncategorized
category_map:
tag_map:

meta_generator: true

date_format: YYYY-MM-DD
time_format: HH:mm:ss
updated_option: mtime

per_page: 10
pagination_dir: page

theme: butterfly

deploy:
  type: ''

search:
  path: search.xml
  field: post
  content: true
  format: html
```

- [ ] **Step 5: Create scaffolds**

Create `scaffolds/post.md`:

```markdown
---
title: {{ title }}
date: {{ date }}
tags:
categories:
cover:
---
```

Create `scaffolds/page.md`:

```markdown
---
title: {{ title }}
date: {{ date }}
---
```

Create `scaffolds/draft.md`:

```markdown
---
title: {{ title }}
tags:
categories:
---
```

- [ ] **Step 6: Create source directory structure**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
mkdir -p source/_posts source/about source/categories source/tags source/link
```

- [ ] **Step 7: Verify Hexo initializes correctly**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
npx hexo version
```

Expected: Hexo version output (7.x.x)

- [ ] **Step 8: Commit**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
git add .gitignore package.json package-lock.json _config.yml scaffolds/
git commit -m "feat: initialize Hexo project structure"
```

---

### Task 2: Install and configure Butterfly theme

**Files:**
- Create: `_config.butterfly.yml`
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install Butterfly theme via npm**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
npm install hexo-theme-butterfly
```

- [ ] **Step 2: Create `_config.butterfly.yml` with blue-white anime style**

```yaml
# Navigation
nav:
  logo:
  display_title: true
  fixed: true

menu:
  首页: / || fas fa-home
  归档: /archives/ || fas fa-archive
  标签: /tags/ || fas fa-tags
  分类: /categories/ || fas fa-folder-open
  友链: /link/ || fas fa-link
  关于: /about/ || fas fa-heart

# Code Blocks
highlight_theme: mac
highlight_copy: true
highlight_lang: true
highlight_height_limit: false
code_word_wrap: false

highlight_shrink: false

# Social links (sidebar)
social:
  fab fa-github: https://github.com/ban-code-art || Github

# Favicon
favicon: /img/favicon.png

# Avatar
avatar:
  img: https://avatars.githubusercontent.com/u/ban-code-art
  effect: false

# Disable top_img for cleaner look on sub-pages (override per page if needed)
disable_top_img: false

# Home page cover/banner
index_img: https://cdn.jsdelivr.net/gh/ban-code-art/blog-assets@main/img/banner.jpg

# Default cover for posts without a cover image
default_cover: https://cdn.jsdelivr.net/gh/ban-code-art/blog-assets@main/img/default_cover.jpg

# Archive page
archive_img: false

# Tag page
tag_img: false

# Category page
category_img: false

# Top image for pages
about_img: false
link_img: false

# Cover settings
cover:
  index_enable: true
  aside_enable: true
  archives_enable: true
  position: both
  default_cover:

# Table of Contents (TOC)
toc:
  post: true
  page: false
  number: true
  expand: false
  style_simple: false
  scroll_percent: true

# Post meta display
post_meta:
  page:
    date_type: both
    date_format: relative
    categories: true
    tags: true
    label: true
  post:
    date_type: both
    date_format: relative
    categories: true
    tags: true
    label: true

# Post copyright
post_copyright:
  enable: true
  decode: false
  author_href:
  license: CC BY-NC-SA 4.0
  license_url: https://creativecommons.org/licenses/by-nc-sa/4.0/

# Aside / Sidebar
aside:
  enable: true
  hide: false
  button: true
  mobile: true
  position: right
  display:
    archive: true
    tag: true
    category: true
  card_author:
    enable: true
    description: 代码与思考的记录
    button:
      enable: true
      icon: fab fa-github
      text: GitHub
      link: https://github.com/ban-code-art
  card_announcement:
    enable: true
    content: 欢迎来到 Rhine 的学习博客
  card_recent_post:
    enable: true
    limit: 5
    sort: date
    sort_order:
  card_categories:
    enable: true
    limit: 8
    expand: none
    sort_order:
  card_tags:
    enable: true
    limit: 40
    color: true
    orderby: random
    order: 1
    sort_order:
  card_archives:
    enable: true
    type: monthly
    format: MMMM YYYY
    order: -1
    limit: 8
    sort_order:
  card_webinfo:
    enable: true
    post_count: true
    last_push_date: true
    sort_order:

# Bottom area
footer:
  owner:
    enable: true
    since: 2026
  custom_text:
  copyright: true

# Dark mode
darkmode:
  enable: true
  button: true
  autoChangeMode: false

# Reading mode
readmode: true

# Font settings
font:
  global-font-size:
  code-font-size:
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Lato, Roboto, "PingFang SC", "Microsoft YaHei", sans-serif
  code-font-family: "JetBrains Mono", Consolas, Monaco, "Courier New", monospace

# Theme color - Blue-white anime style
theme_color:
  enable: true
  main: "#4c9bff"
  paginator: "#4c9bff"
  button_hover: "#6366f1"
  text_selection: "#a0d8ef"
  link_color: "#4c9bff"
  meta_color: "#858585"
  hr_color: "#a0d8ef"
  code_foreground: "#333333"
  code_background: "#f7f9fe"
  toc_color: "#4c9bff"
  blockquote_padding_color: "#4c9bff"
  blockquote_background_color: "#f7f9fe"
  scrollbar_color: "#4c9bff"
  meta_theme_color_light: "#ffffff"
  meta_theme_color_dark: "#1a1b2e"

# Background
background: "#f7f9fe"

# Footer background
footer_bg: true

# Preloader
preloader:
  enable: false
  source: 1
  pace_css_url:

# Wordcount
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
  total_wordcount: true

# Busuanzi (page view counter)
busuanzi:
  site_uv: false
  site_pv: false
  page_pv: false

# Local search
local_search:
  enable: true
  preload: false
  CDN:

# Image lazy load
lazyload:
  enable: true
  field: site
  placeholder:
  blur: false

# Lightbox (image viewer)
lightbox: fancybox

# Page transition
pjax:
  enable: true

# Inject custom head/bottom
inject:
  head:
  bottom:

# CDN settings
CDN:
  third_party_provider: cdnjs
  option:
```

- [ ] **Step 3: Verify theme loads**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
npx hexo generate
```

Expected: No errors, `public/` directory created with HTML files.

- [ ] **Step 4: Commit**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
git add _config.butterfly.yml package.json package-lock.json
git commit -m "feat: add Butterfly theme with blue-white anime config"
```

---

### Task 3: Create navigation pages

**Files:**
- Create: `source/categories/index.md`, `source/tags/index.md`, `source/about/index.md`, `source/link/index.md`

- [ ] **Step 1: Create categories page**

Create `source/categories/index.md`:

```markdown
---
title: 分类
date: 2026-05-16 00:00:00
type: "categories"
---
```

- [ ] **Step 2: Create tags page**

Create `source/tags/index.md`:

```markdown
---
title: 标签
date: 2026-05-16 00:00:00
type: "tags"
---
```

- [ ] **Step 3: Create about page**

Create `source/about/index.md`:

```markdown
---
title: 关于我
date: 2026-05-16 00:00:00
type: "about"
---

## Rhine

一个热爱学习和记录的开发者。

### 技能

- 编程语言：学习中...
- 工具：Git, VS Code, Linux

### 联系方式

- GitHub: [ban-code-art](https://github.com/ban-code-art)
```

- [ ] **Step 4: Create link (friends) page**

Create `source/link/index.md`:

```markdown
---
title: 友链
date: 2026-05-16 00:00:00
type: "link"
---
```

- [ ] **Step 5: Commit**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
git add source/categories/ source/tags/ source/about/ source/link/
git commit -m "feat: add navigation pages (categories, tags, about, links)"
```

---

### Task 4: Migrate existing blog post

**Files:**
- Create: `source/_posts/hello-blog.md`

- [ ] **Step 1: Create the migrated post**

Create `source/_posts/hello-blog.md`:

```markdown
---
title: Hello, Blog
date: 2026-05-13 18:30:00
categories:
  - 博客
tags:
  - 随笔
---

这是我的第一篇博客文章。

今后会在这里记录技术笔记、项目心得以及日常思考。
```

- [ ] **Step 2: Verify the post renders**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
npx hexo clean && npx hexo generate
```

Expected: No errors. Check `public/index.html` contains "Hello, Blog".

- [ ] **Step 3: Commit**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
git add source/_posts/hello-blog.md
git commit -m "feat: migrate hello-blog post from Jekyll"
```

---

### Task 5: Configure GitHub Actions deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create workflow directory**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
mkdir -p .github/workflows
```

- [ ] **Step 2: Create deploy.yml**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Hexo to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npx hexo generate

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ github.event.repository.html_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Commit**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow for Hexo deployment"
```

---

### Task 6: Local verification and final push

- [ ] **Step 1: Run full build to verify everything works**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
npx hexo clean && npx hexo generate
```

Expected: No errors. `public/` directory contains the full site.

- [ ] **Step 2: Start local server and verify in browser**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
npx hexo server -p 4000
```

Open `http://localhost:4000` in browser. Verify:
- Homepage loads with blog title "Rhine's Blog"
- Navigation bar shows all 6 menu items
- Dark mode toggle works
- Article card for "Hello, Blog" is visible
- Categories, Tags, About, Links pages are accessible
- Search button opens search dialog

- [ ] **Step 3: Stop server and do final commit for any fixes**

Press Ctrl+C to stop server. If any fixes were needed:

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
git add -A
git commit -m "fix: address issues found during local testing"
```

- [ ] **Step 4: Force push to remote (replaces old Jekyll content)**

```bash
cd "D:/CCguiPlay/GithubIO/ban-code-art.github.io"
git push --force origin main
```

- [ ] **Step 5: Verify GitHub Actions deployment**

Check the Actions tab at `https://github.com/ban-code-art/ban-code-art.github.io/actions` to confirm the workflow runs successfully.

After deployment completes, verify the live site at `https://ban-code-art.github.io/`.

- [ ] **Step 6: Configure GitHub Pages source**

In the repository Settings > Pages, ensure:
- Source is set to "GitHub Actions" (not "Deploy from a branch")

This is required for the `actions/deploy-pages` workflow to work.
