import { NextRequest, NextResponse } from "next/server";
import { 
  getAllCategories, 
  getSavedCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory,
  Category
} from "@/lib/categories";

/**
 * 获取所有分类
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeCount = searchParams.get('includeCount') === 'true';
  
  try {
    const categories = includeCount 
      ? getAllCategories() 
      : getSavedCategories();
      
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: "Error fetching categories" }, 
      { status: 500 }
    );
  }
}

/**
 * 添加新分类
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id || !body.name) {
      return NextResponse.json(
        { error: "Category ID and name are required" }, 
        { status: 400 }
      );
    }
    
    const newCategory: Category = {
      id: body.id,
      name: body.name,
      description: body.description || undefined
    };
    
    const categories = addCategory(newCategory);
    return NextResponse.json({ categories }, { status: 201 });
  } catch (error) {
    console.error('Error adding category:', error);
    return NextResponse.json(
      { error: "Error adding category" }, 
      { status: 500 }
    );
  }
}

/**
 * 更新现有分类
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: "Category ID is required" }, 
        { status: 400 }
      );
    }
    
    const updatedCategory: Category = {
      id: body.id,
      name: body.name,
      description: body.description
    };
    
    const categories = updateCategory(updatedCategory);
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: "Error updating category" }, 
      { status: 500 }
    );
  }
}

/**
 * 删除分类
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" }, 
        { status: 400 }
      );
    }
    
    const categories = deleteCategory(id);
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: "Error deleting category" }, 
      { status: 500 }
    );
  }
} 