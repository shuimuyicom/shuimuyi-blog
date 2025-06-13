import { NextRequest, NextResponse } from "next/server";
import { updateCategoriesOrder, getAllCategories } from "@/lib/categories";

/**
 * 更新分类顺序
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Expected an array of category orders" }, 
        { status: 400 }
      );
    }
    
    // 确保每个项目都有id和order字段
    const isValidFormat = body.every(item => 
      typeof item === 'object' && item !== null && 
      'id' in item && 'order' in item &&
      typeof item.id === 'string' && 
      typeof item.order === 'number'
    );
    
    if (!isValidFormat) {
      return NextResponse.json(
        { error: "Each item must have id (string) and order (number) fields" }, 
        { status: 400 }
      );
    }
    
    // 更新分类顺序
    updateCategoriesOrder(body);
    
    // 返回更新后的分类列表（包含文章数量和排序后）
    const categories = getAllCategories();
    
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('Error updating category order:', error);
    return NextResponse.json(
      { error: "Error updating category order" }, 
      { status: 500 }
    );
  }
} 