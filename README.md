# 水木易

这是一个使用Next.js 15和Tailwind CSS构建的个人网站。

## 功能特点

- 响应式设计，适配各种设备
- 博主信息展示
- 文章发布和展示
- 文章分类功能
- 关于页面
- **完整的Markdown样式支持**，包含所有标题级别的正确层次结构
- **动态缩略图生成**，确保在社交媒体平台的完美展示

## 页面结构

- **首页**：上半部分是博主信息展示，下半部分是最新文章列表
- **文章页面**：显示完整文章内容
- **分类页面**：按类别展示文章
- **关于页面**：详细介绍博客和作者

## 技术栈

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Next.js OG 图片生成

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

## Markdown样式系统优化 - 2025年1月20日

### 修复的问题
- ✅ **修复了四级标题字体比三级标题大的问题**
- ✅ 完善了所有标题级别（h1-h6）的样式定义
- ✅ 建立了正确的视觉层次结构

### 新增的Markdown元素支持
- **标题层次**: h1(24px) > h2(22px) > h3(20px) > h4(18px) > h5(16px) > h6(14px，大写)
- **文本样式**: 粗体、斜体、删除线、高亮标记、上下标
- **交互元素**: 键盘输入样式、缩写提示、任务列表
- **代码**: 行内代码、代码块、语法高亮
- **表格**: 水墨风格设计，悬停效果
- **列表**: 有序、无序、定义列表、嵌套列表
- **引用**: 多级引用块支持
- **脚注**: 完整的脚注系统
- **图片**: 图片标题、圆角边框、阴影效果
- **警告框**: 多种类型的提示框（注意、警告、危险等）
- **数学公式**: KaTeX支持（如果启用）

### 样式特色
- 🎨 **水墨风格设计**：继承网站整体的东方美学
- 🌓 **明暗主题适配**：完美支持主题切换
- 📱 **响应式设计**：移动端友好的字体大小调整
- ♿ **可访问性优化**：合理的对比度和键盘导航支持

### 使用建议
1. 请按照语义层次使用标题级别（h1→h2→h3→h4→h5→h6）
2. 建议文章使用h2作为主要章节标题（h1已用于文章标题）
3. 可以使用测试文档 `/article/markdown-style-test` 来预览所有样式效果

---
**🔄 Vercel自动部署测试 - 2025年1月20日 22:05:00**  
**✅ 第二次测试：如果您在线上看到这个时间戳，说明自动部署完全正常！**  
**🎯 Git作者信息已修复，Vercel集成已重新配置**

## 🖼️ 动态缩略图优化 - 2025年6月26日

### 💡 优化背景
在分享链接到X.com（前Twitter）等社交媒体平台时，发现缩略图无法正确显示。经过分析发现，虽然项目已配置了动态OG图片生成API，但多数页面仍在使用静态图片，导致社交媒体爬虫无法正确获取图片。

### 🛠️ 解决方案
1. **全面使用动态生成**：将所有页面的OG图片改为使用`/api/og`端点动态生成
2. **增强X.com兼容性**：
   - 添加明确的`Content-Type: image/png`头部
   - 设置`X-Content-Type-Options: nosniff`防止MIME类型嗅探
   - 添加`Access-Control-Allow-Origin: *`支持跨域访问
   - 优化缓存策略：`Cache-Control: public, max-age=31536000, immutable`
3. **删除冗余文件**：移除不再使用的静态OG图片文件

### ✅ 重构内容
- **src/app/layout.tsx**：主布局页面OG图片改为动态生成
- **src/app/page.tsx**：首页OG图片改为动态生成  
- **src/app/article/[slug]/page.tsx**：文章页面已使用动态生成（无需修改）
- **src/app/about/page.tsx**：关于页面已使用动态生成（无需修改）
- **src/app/categories/page.tsx**：分类列表页面添加动态OG图片
- **src/app/categories/[category]/page.tsx**：分类页面添加动态OG图片
- **src/app/api/og/route.tsx**：优化图片生成逻辑，增强社交媒体兼容性
- **删除文件**：`public/images/og/screenshot.png`、`public/images/og/default-og.svg`及整个`og`目录

### 🎯 预期效果
- ✅ **X.com分享**：链接分享到X.com时能正确显示动态生成的缩略图
- ✅ **其他社交平台**：Facebook、LinkedIn等平台的兼容性得到增强
- ✅ **SEO优化**：每个页面都有独特、相关的OG图片
- ✅ **性能提升**：移除静态文件，减少不必要的资源加载
- ✅ **维护简化**：无需手动创建和管理静态OG图片

### 📝 技术细节
- 使用Next.js 15的`next/og`包进行图片生成
- Edge Runtime确保快速响应
- 字体回退机制保证生成稳定性
- 分类型设计：default、article、category三种样式
- 严格的错误处理和备用方案

**🚀 现在所有页面的缩略图都是动态生成的，确保在X.com等社交媒体平台上的完美展示！**

## 🔍 Vercel部署问题解决方案记录

### 📋 问题原因
经过测试发现，**GitHub仓库的可见性设置**是影响Vercel自动部署的关键因素：

- **私有仓库**：可能导致Vercel自动部署失效，需要特殊配置或付费计划
- **公开仓库**：Vercel自动部署工作正常，集成更稳定

### 🛠️ 解决方案总结
1. ✅ **最终解决方案**：将GitHub仓库设置为公开模式
2. ✅ **配置Git作者信息**：使用GitHub关联的邮箱地址
3. ✅ **重新初始化Vercel项目**：清除旧配置，重新建立连接

### 💡 经验教训
对于个人博客项目，推荐使用公开仓库以获得：
- 更稳定的自动部署
- 更简单的集成配置  
- 更好的社区可见性

## 🚀 Node.js升级记录 - 2025年1月20日

### 升级详情
- **升级前版本**：Node.js v20.19.2 + npm v10.8.2
- **升级后版本**：Node.js v22.17.0 + npm v10.9.2
- **升级原因**：使用最新的LTS版本，获得更好的性能和长期支持
- **升级方式**：通过nvm进行版本管理

### 升级验证
✅ **依赖安装**：无任何安全漏洞  
✅ **项目构建**：编译成功，生成34个静态页面  
✅ **开发环境**：Next.js dev命令正常工作  
✅ **生产部署**：Vercel自动部署兼容

### Node.js v22 LTS优势
- **长期支持**：支持到2027年4月30日
- **性能提升**：包含最新的V8引擎优化
- **安全更新**：定期接收安全补丁
- **生态兼容**：与Next.js 15完美兼容
