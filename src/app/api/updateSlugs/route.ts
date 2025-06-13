import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 内容目录路径
const postsDirectory = path.join(process.cwd(), 'src/content/posts');

// 生成友好的URL slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-')     // 空格替换为连字符
    .replace(/-+/g, '-')      // 多个连字符替换为一个
    .trim();                   // 移除首尾空格
}

export async function GET() {
  try {
    // 获取文章目录下的所有文件
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json({ error: "Posts directory not found" }, { status: 404 });
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    const results: {fileName: string, slug: string, title: string}[] = [];
    
    // 处理每个文件
    fileNames.forEach(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // 解析frontmatter
      const { data, content } = matter(fileContents);
      
      // 如果已经有slug，跳过
      if (data.slug) {
        results.push({
          fileName,
          slug: data.slug,
          title: data.title || ''
        });
        return;
      }
      
      // 生成slug
      let slug = '';
      if (data.title) {
        slug = generateSlug(data.title);
      } else {
        slug = fileName.replace(/\.md$/, '');
      }
      
      // 添加slug到frontmatter
      data.slug = slug;
      
      // 重写文件
      const updatedFileContent = matter.stringify(content, data);
      fs.writeFileSync(fullPath, updatedFileContent);
      
      results.push({
        fileName,
        slug,
        title: data.title || ''
      });
    });
    
    return NextResponse.json({ 
      success: true, 
      message: `Updated ${results.length} files`,
      results 
    });
  } catch (error) {
    console.error('Error updating slugs:', error);
    return NextResponse.json({ 
      error: "Error updating slugs", 
      message: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}