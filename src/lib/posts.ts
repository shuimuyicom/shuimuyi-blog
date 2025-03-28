import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 内容目录路径
const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  contentHtml: string;
  category: {
    id: string;
    name: string;
  };
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

// 分类描述
export const categoryDescriptions: Record<string, string> = {};

// 获取所有文章数据
export function getAllPosts(): Post[] {
  // 获取posts目录下的所有文件名
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  
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
    
    // 组合数据与id
    return {
      id,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      excerpt: matterResult.data.excerpt || '',
      contentHtml: '',
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
    
    // 组合数据与id
    return {
      id,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      excerpt: matterResult.data.excerpt || '',
      contentHtml,
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

// 根据id获取类别名称
function getCategoryNameById(id?: string): string {
  if (!id) return '未分类';
  
  // 尝试从所有文章中找到这个类别
  const posts = getAllPosts();
  for (const post of posts) {
    if (post.category.id === id) {
      return post.category.name;
    }
  }
  
  // 如果找不到匹配的类别，返回未分类
  return '未分类';
}

// 获取所有类别
export function getAllCategories(): Category[] {
  const posts = getAllPosts();
  
  // 创建一个Map来存储所有类别
  const categoryMap = new Map<string, Category>();
  
  // 从文章中收集所有类别
  posts.forEach(post => {
    const categoryId = post.category.id;
    const categoryName = post.category.name;
    
    if (!categoryMap.has(categoryId)) {
      // 如果是新类别，添加到Map中
      categoryMap.set(categoryId, { id: categoryId, name: categoryName, count: 0 });
    }
    
    // 增加该类别的文章计数
    const category = categoryMap.get(categoryId);
    if (category) {
      category.count++;
    }
  });
  
  // 只返回有文章的类别
  return Array.from(categoryMap.values()).filter(cat => cat.count > 0);
}

// 根据ID获取类别
export function getCategoryById(id: string): Category | null {
  // 尝试从所有类别中找到匹配的
  const allCategories = getAllCategories();
  const category = allCategories.find(cat => cat.id === id);
  
  if (!category) {
    return null;
  }
  
  return category;
}

// 获取特定类别的所有文章
export function getPostsByCategory(categoryId: string): Post[] {
  const posts = getAllPosts();
  return posts.filter(post => post.category.id === categoryId);
} 