import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { getCategoryNameById } from './categories';

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

export interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  contentHtml: string;
  slug: string;  // 用于URL的友好字符串
  category: {
    id: string;
    name: string;
  };
}

// 获取所有文章数据
export function getAllPosts(): Post[] {
  // 获取posts目录下的所有文件名
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.md')); // 只处理.md文件
  
  const allPostsData = fileNames.map(fileName => {
    // 从文件名中删除".md"以获取id
    const id = fileName.replace(/\.md$/, '');
    
    // 将markdown文件读取为字符串
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // 使用gray-matter解析帖子元数据部分
    const matterResult = matter(fileContents);
    
    // 处理category，它可能是字符串或对象
    let categoryId = 'uncategorized';
    let categoryName = '未分类';
    
    if (matterResult.data.category) {
      if (typeof matterResult.data.category === 'string') {
        // 如果category是字符串，直接使用
        categoryId = matterResult.data.category;
        categoryName = getCategoryNameById(categoryId);
      } else if (typeof matterResult.data.category === 'object') {
        // 如果category是对象，尝试获取id和name
        categoryId = matterResult.data.category.id || 'uncategorized';
        // 如果提供了name就使用它，否则根据id查找name
        categoryName = matterResult.data.category.name || getCategoryNameById(categoryId);
      }
    }
    
    // 获取或生成slug
    let slug = '';
    if (matterResult.data.slug) {
      // 如果frontmatter中指定了slug，直接使用
      slug = matterResult.data.slug;
    } else if (matterResult.data.title) {
      // 否则从标题生成slug
      slug = generateSlug(matterResult.data.title);
    } else {
      // 如果没有标题，使用ID作为slug
      slug = id;
    }
    
    // 组合数据与id
    return {
      id,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      excerpt: matterResult.data.excerpt || '',
      contentHtml: '',
      slug,
      category: {
        id: categoryId,
        name: categoryName,
      },
    };
  });
  
  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 获取指定ID的文章数据
export async function getPostById(id: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // 使用gray-matter解析帖子元数据
    const matterResult = matter(fileContents);
    
    // 使用remark将markdown处理为HTML字符串
    const processedContent = await remark()
      .use(gfm)
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    
    // 处理category，它可能是字符串或对象
    let categoryId = 'uncategorized';
    let categoryName = '未分类';
    
    if (matterResult.data.category) {
      if (typeof matterResult.data.category === 'string') {
        // 如果category是字符串，直接使用
        categoryId = matterResult.data.category;
        categoryName = getCategoryNameById(categoryId);
      } else if (typeof matterResult.data.category === 'object') {
        // 如果category是对象，尝试获取id和name
        categoryId = matterResult.data.category.id || 'uncategorized';
        // 如果提供了name就使用它，否则根据id查找name
        categoryName = matterResult.data.category.name || getCategoryNameById(categoryId);
      }
    }
    
    // 获取或生成slug
    let slug = '';
    if (matterResult.data.slug) {
      // 如果frontmatter中指定了slug，直接使用
      slug = matterResult.data.slug;
    } else if (matterResult.data.title) {
      // 否则从标题生成slug
      slug = generateSlug(matterResult.data.title);
    } else {
      // 如果没有标题，使用ID作为slug
      slug = id;
    }
    
    // 组合数据与id
    return {
      id,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      excerpt: matterResult.data.excerpt || '',
      contentHtml,
      slug,
      category: {
        id: categoryId,
        name: categoryName,
      },
    };
  } catch (error) {
    console.error(`Error getting post by id ${id}:`, error);
    return null;
  }
}

// 通过slug获取文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const allPosts = getAllPosts();
  const post = allPosts.find(post => post.slug === slug);
  
  if (!post) {
    return null;
  }
  
  // 获取完整的文章内容
  return await getPostById(post.id);
}

// 获取所有文章的slugs
export function getAllPostSlugs(): string[] {
  const posts = getAllPosts();
  return posts.map(post => post.slug);
}

// 获取特定类别的所有文章
export function getPostsByCategory(categoryId: string): Post[] {
  const posts = getAllPosts();
  
  // 检查是否存在该分类下的文章
  const categoryPosts = posts.filter(post => post.category.id === categoryId);
  
  // 如果是uncategorized分类且没有文章，返回空数组
  if (categoryId === 'uncategorized' && categoryPosts.length === 0) {
    return [];
  }
  
  return categoryPosts;
} 