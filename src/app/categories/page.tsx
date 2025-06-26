import { Metadata } from "next";
import Link from "next/link";
import { getAllCategories } from "@/lib/categories";

// 使用www子域名确保与重定向一致
const SITE_URL = "https://www.shuimuyi.com";

export const metadata: Metadata = {
  title: "文章分类 | 水木易",
  description: "探索不同主题的文章，点击以浏览相关内容",
  openGraph: {
    title: "文章分类 | 水木易",
    description: "探索不同主题的文章，点击以浏览相关内容",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("文章分类")}&subtitle=${encodeURIComponent("探索不同主题的文章")}&type=category`,
        width: 1200,
        height: 630,
        alt: "文章分类 | 水木易",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "文章分类 | 水木易",
    description: "探索不同主题的文章，点击以浏览相关内容",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("文章分类")}&subtitle=${encodeURIComponent("探索不同主题的文章")}&type=category`,
        width: 1200,
        height: 630,
        alt: "文章分类 | 水木易",
        type: "image/png",
      }
    ],
    site: "@shuimuyi",
    creator: "@shuimuyi",
  },
};

export default function Categories() {
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-sumi-950">
      <div className="max-w-6xl mx-auto bg-card-50 dark:bg-ink-900 min-h-screen shadow-xl">
        <div className="px-6 py-16 md:py-24">
          <header className="mb-16 text-center">
            <h1 className="text-3xl md:text-4xl mb-6 text-ink-800 dark:text-bg-100">所有分类</h1>
            <p className="max-w-2xl mx-auto text-ink-500 dark:text-ink-400">
              探索不同主题的文章，点击以浏览相关内容
            </p>
          </header>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="bg-card-50 dark:bg-ink-800 border border-bg-200 dark:border-ink-700 p-6 md:p-8 hover:border-bg-300 dark:hover:border-ink-600 transition-all shadow-surface dark:shadow-none group"
                >
                  <h2 className="text-xl mb-2 text-ink-800 dark:text-bg-100 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-sm text-ink-400 dark:text-ink-500">
                    {category.count} 
                    {category.count !== 1 ? " 篇文章" : " 篇文章"}
                  </p>
                  {category.description && (
                    <p className="mt-3 text-sm text-ink-500 dark:text-ink-400 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-bg-300 dark:text-ink-700 mb-4" 
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <p className="text-ink-500 dark:text-ink-400 text-lg">暂无分类</p>
              <p className="text-ink-400 dark:text-ink-500 text-sm mt-2">请稍后查看</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 