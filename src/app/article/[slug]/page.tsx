import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/posts";
import ScrollToTop from "@/components/ScrollToTop";

// 使用www子域名确保与重定向一致
const SITE_URL = "https://www.shuimuyi.com";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "文章不存在",
      description: "找不到您请求的文章",
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      publishedTime: post.date,
      authors: ["水木易"],
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.excerpt || "")}&type=article&date=${encodeURIComponent(post.date || "")}&category=${encodeURIComponent(post.category?.name || "")}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.excerpt || "")}&type=article&date=${encodeURIComponent(post.date || "")}&category=${encodeURIComponent(post.category?.name || "")}`,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
        }
      ],
      site: "@shuimuyi",
      creator: "@shuimuyi",
    },
  };
}

// 生成静态路径
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function ArticlePage(props: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { params } = props;
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  // 获取推荐文章（随机选择3篇不包括当前文章的文章）
  const allPosts = getAllPosts();
  const recommendedPosts = allPosts
    .filter(p => p.id !== post.id)
    .sort(() => 0.5 - Math.random()) // 随机排序
    .slice(0, 3); // 取前3篇
  
  const mainClasses = "min-h-screen bg-gray-50 dark:bg-sumi-950";
  
  return (
    <main className={mainClasses}>
      <div className="max-w-6xl mx-auto bg-card-50 dark:bg-ink-900 min-h-screen shadow-xl">
        <div id="top" className="px-4 sm:px-6 py-6 sm:py-8 md:py-20">
          <div className="max-w-4xl mx-auto">
            {/* 文章布局容器 */}
            <div className="flex flex-col md:flex-row">
              {/* 桌面端左侧导航区 */}
              <div className="hidden md:flex md:w-12 justify-center">
                <Link href="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-bg-100/80 dark:bg-ink-800/80 text-ink-600 dark:text-bg-200 hover:text-accent-600 dark:hover:text-accent-300 transition-all hover:bg-bg-200/80 dark:hover:bg-ink-700/80 group sticky top-24">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" 
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
                </Link>
              </div>

              {/* 右侧文章内容区 */}
              <div className="flex-1 flex justify-center">
                <article className="w-full max-w-2xl">
                  {/* 文章头部 */}
                  <header className="mb-6 md:mb-8 animate-fadeInUp">
                    <h1 className="text-2xl sm:text-2xl md:text-2xl font-semibold mb-3 md:mb-4 text-ink-900 dark:text-bg-50 leading-[1.8] tracking-tight">
                      {post.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-sm">
                      <Link href={`/categories/${post.category.id}`}>
                        <span className="text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors">
                          {post.category.name}
                        </span>
                      </Link>

                      <time className="inline-flex items-center text-ink-400 dark:text-ink-500">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mr-2" 
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {post.date}
                      </time>
                    </div>
                  </header>
                  
                  {/* 文章内容 - 优化文字灰度和排版 */}
                  <div className="prose prose-lg dark:prose-invert prose-headings:font-medium prose-strong:text-ink-800 dark:prose-strong:text-bg-50 prose-img:rounded-md prose-img:shadow-md dark:prose-img:shadow-none prose-p:text-justify prose-li:text-justify max-w-3xl mx-auto sm:px-0 px-1">
                    <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} className="animate-[fadeIn_0.5s_ease-in-out]" />
                  </div>
                  
                  {/* 文章导航 */}
                  <div className="flex flex-wrap justify-between items-center pt-8 border-t border-bg-200 dark:border-ink-700 mt-8 gap-y-4">
                    <Link href="/" className="text-ink-500 dark:text-ink-400 hover:text-accent-600 dark:hover:text-accent-300 transition-colors flex items-center text-sm group">
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
                      返回文章列表
                    </Link>
                    
                    <ScrollToTop />
                  </div>
                  
                  {/* 推荐阅读模块 */}
                  {recommendedPosts.length > 0 && (
                    <div className="mt-12 sm:mt-16 animate-fadeIn">
                      <h2 className="text-lg font-medium mb-6 text-ink-800 dark:text-bg-100 pb-2 border-b border-bg-200 dark:border-ink-700">
                        推荐阅读
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {recommendedPosts.map((recommendedPost) => (
                          <Link 
                            key={recommendedPost.id} 
                            href={`/article/${recommendedPost.slug}`}
                            className="group"
                          >
                            <div className="bg-bg-50 dark:bg-ink-800 p-4 sm:p-5 border border-bg-200 dark:border-ink-700 hover:border-bg-300 dark:hover:border-ink-600 transition-all shadow-sm hover:shadow-md h-full rounded-sm">
                              <h3 className="text-base font-medium mb-2 text-ink-800 dark:text-bg-100 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors line-clamp-2">
                                {recommendedPost.title}
                              </h3>
                              <div className="flex items-center space-x-3 text-xs text-ink-400 dark:text-ink-400">
                                <span>{recommendedPost.category.name}</span>
                                <span>•</span>
                                <span>{recommendedPost.date}</span>
                              </div>
                              {recommendedPost.excerpt && (
                                <p className="mt-3 text-sm text-ink-600 dark:text-ink-300 line-clamp-2">
                                  {recommendedPost.excerpt}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 