import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 内容目录路径
const postsDirectory = path.join(process.cwd(), 'src/content/posts');
const categoriesFilePath = path.join(process.cwd(), 'src/content/categories.json');

export interface Category {
  id: string;
  name: string;
  description?: string;
  count?: number;
  slug?: string;
  order?: number; // 用于控制分类的显示顺序
}

// 预定义的分类列表
const predefinedCategories: Category[] = [
  { id: 'uncategorized', name: '未分类', description: '未分类的文章', order: 9999 },
];

/**
 * 初始化分类JSON文件
 */
function initCategoriesFile(): void {
  if (!fs.existsSync(path.dirname(categoriesFilePath))) {
    fs.mkdirSync(path.dirname(categoriesFilePath), { recursive: true });
  }
  
  if (!fs.existsSync(categoriesFilePath)) {
    fs.writeFileSync(categoriesFilePath, JSON.stringify(predefinedCategories, null, 2), 'utf8');
  }
}

/**
 * 获取保存的所有分类
 */
export function getSavedCategories(): Category[] {
  initCategoriesFile();
  
  try {
    const fileContents = fs.readFileSync(categoriesFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading categories file:', error);
    return predefinedCategories;
  }
}

/**
 * 保存分类到JSON文件
 */
export function saveCategories(categories: Category[]): void {
  try {
    fs.writeFileSync(categoriesFilePath, JSON.stringify(categories, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving categories:', error);
  }
}

/**
 * 添加新分类
 */
export function addCategory(category: Category): Category[] {
  const categories = getSavedCategories();
  
  // 检查是否已存在同ID的分类
  if (!categories.some(c => c.id === category.id)) {
    categories.push(category);
    saveCategories(categories);
  }
  
  return categories;
}

/**
 * 更新分类
 */
export function updateCategory(updatedCategory: Category): Category[] {
  const categories = getSavedCategories();
  const index = categories.findIndex(c => c.id === updatedCategory.id);
  
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updatedCategory };
    saveCategories(categories);
  }
  
  return categories;
}

/**
 * 删除分类
 */
export function deleteCategory(categoryId: string): Category[] {
  const categories = getSavedCategories().filter(c => c.id !== categoryId);
  saveCategories(categories);
  return categories;
}

/**
 * 获取所有分类（包含文章数量）
 */
export function getAllCategories(): Category[] {
  const categories = getSavedCategories();
  
  // 获取所有文章
  if (!fs.existsSync(postsDirectory)) {
    return categories.map(cat => ({ ...cat, count: 0 })).filter(cat => cat.count > 0);
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.md')); // 只处理.md文件
  
  const categoryCounts = new Map<string, number>();
  
  // 计算每个分类的文章数量
  fileNames.forEach(fileName => {
    try {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      let categoryId = 'uncategorized';
      
      if (matterResult.data.category) {
        if (typeof matterResult.data.category === 'string') {
          categoryId = matterResult.data.category;
        } else if (typeof matterResult.data.category === 'object') {
          categoryId = matterResult.data.category.id || 'uncategorized';
        }
      }
      
      categoryCounts.set(categoryId, (categoryCounts.get(categoryId) || 0) + 1);
    } catch (error) {
      console.error(`Error processing file ${fileName}:`, error);
      // 出错时继续处理下一个文件
    }
  });
  
  // 更新分类的文章计数并严格过滤掉没有文章的分类
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    count: categoryCounts.get(category.id) || 0
  }));
  
  // 严格过滤掉没有文章的分类
  return categoriesWithCounts
    .filter(cat => cat.count > 0)
    .sort((a, b) => {
      // 如果没有order字段，默认给一个非常大的值，保证它排在后面
      const orderA = a.order !== undefined ? a.order : 1000;
      const orderB = b.order !== undefined ? b.order : 1000;
      return orderA - orderB;
    });
}

/**
 * 根据ID获取分类
 */
export function getCategoryById(id: string): Category | undefined {
  const categories = getSavedCategories();
  return categories.find(category => category.id === id);
}

/**
 * 根据ID获取分类名称
 */
export function getCategoryNameById(id?: string): string {
  if (!id) return '未分类';
  
  const category = getCategoryById(id);
  return category ? category.name : '未分类';
}

/**
 * 更新分类顺序
 * @param categoryOrders 包含分类ID和顺序值的数组
 */
export function updateCategoriesOrder(categoryOrders: {id: string, order: number}[]): Category[] {
  const categories = getSavedCategories();
  
  // 更新每个分类的order值
  categoryOrders.forEach(item => {
    const category = categories.find(c => c.id === item.id);
    if (category) {
      category.order = item.order;
    }
  });
  
  // 保存更新后的分类
  saveCategories(categories);
  
  return categories;
} 