import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";

export async function generateMetadata(
  props: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const category = params.category;
  const categoryData = getCategoryById(category);
  
  if (!categoryData) {
    return {
      title: "分类不存在 | 水木易",
    };
  }
  
  const title = `${categoryData.name} | 水木易`;
  const description = `${categoryData.name}分类下的所有文章${categoryData.description ? `：${categoryData.description}` : ''}`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(categoryData.name)}&subtitle=${encodeURIComponent(description)}&type=category`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(categoryData.name)}&subtitle=${encodeURIComponent(description)}&type=category`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        }
      ],
      site: "@shuimuyi",
      creator: "@shuimuyi",
    },
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
}) {
  const params = await props.params;
  const categoryId = params.category;
  const category = getCategoryById(categoryId);
  
  if (!category) {
    notFound();
  }
  
  const posts = getPostsByCategory(categoryId);
  
  if (categoryId === 'uncategorized' && posts.length === 0) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-sumi-950">
      <div className="max-w-6xl mx-auto bg-card-50 dark:bg-ink-900 min-h-screen shadow-xl">
        <div className="px-6 py-16 md:py-20">
          <header className="mb-16">
            <div className="flex items-center mb-8">
              <Link href="/categories" className="text-ink-500 dark:text-ink-400 hover:text-accent-600 dark:hover:text-accent-300 transition-colors flex items-center text-sm group">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-2 group-hover:-translate-x-0.5 transition-transform" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                返回分类列表
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl mb-4 text-ink-800 dark:text-bg-100">
              {category.name}
            </h1>
            
            {category.description && (
              <p className="text-ink-600 dark:text-ink-300 mb-4">
                {category.description}
              </p>
            )}
            
            <p className="text-ink-500 dark:text-ink-400">
              该分类下有 {posts.length} 篇文章
            </p>
          </header>
          
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {posts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-card-50 dark:bg-ink-800 border border-bg-200 dark:border-ink-700 shadow-surface dark:shadow-none overflow-hidden group hover:border-bg-300 dark:hover:border-ink-600 transition-all"
                >
                  <div className="p-6 md:p-8">
                    <Link href={`/article/${post.slug}`}>
                      <h2 className="text-xl mb-3 text-ink-800 dark:text-bg-100 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <time className="text-sm text-ink-400 dark:text-ink-500 mb-4 block">{post.date}</time>
                    
                    <p className="text-ink-500 dark:text-ink-300 mb-5">{post.excerpt}</p>
                    
                    <Link 
                      href={`/article/${post.slug}`} 
                      className="inline-flex items-center text-sm text-accent-600 dark:text-accent-300 font-medium group-hover:translate-x-0.5 transition-transform"
                    >
                      阅读全文
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1" 
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-card-50 dark:bg-ink-800 border border-bg-200 dark:border-ink-700 p-8 text-center">
              <p className="text-ink-500 dark:text-ink-400">该分类下暂无文章</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 