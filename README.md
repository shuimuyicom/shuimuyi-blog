# 水木易

这是一个使用Next.js 15和Tailwind CSS构建的个人网站。

## 功能特点

- 响应式设计，适配各种设备
- 博主信息展示
- 文章发布和展示
- 文章分类功能
- 关于页面

## 页面结构

- **首页**：上半部分是博主信息展示，下半部分是最新文章列表
- **文章页面**：显示完整文章内容
- **分类页面**：按类别展示文章
- **关于页面**：详细介绍博客和作者

## 技术栈

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS

## 开发指南

首先，运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 部署

该项目配置为可以直接部署到Vercel平台。

```bash
npm run build
npm run start
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 文章Slug自动生成

项目包含一个专门用于为文章自动生成slug的脚本，确保所有文章都有有效的URL友好标识符。

### 使用方法

```bash
npm run slugs
```

该命令会扫描所有文章，为没有有效slug的文章自动生成，支持中英文标题。

### 功能特点

- 自动检测并跳过已有有效slug的文章
- **智能中文到英文翻译**，生成更有意义的URL
- 多级备选方案确保每篇文章都能获得有效的slug：
  1. 智能术语映射：将常见中文术语映射为英文（如"紫微斗数"→"zi-wei-dou-shu"）
  2. 文件名和分类组合：作为最后的回退方案
- 详细的执行日志，便于追踪处理过程

### 配置与自定义

脚本位于`scripts/generate-slugs.js`，您可以：

- 扩展术语映射表，添加更多特定领域词汇
- 自定义slug格式和生成规则
# 强制部署更新 - 2025年 6月25日 星期三 15时15分07秒 CST
