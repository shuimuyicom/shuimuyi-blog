import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import SocialLinks from "@/components/SocialLinks";

// 定义网站URL常量，确保使用与layout.tsx相同的配置
const SITE_URL = "https://www.shuimuyi.com";

export const metadata: Metadata = {
  title: "水木易 | 科学搞玄，哲学命理学研究",
  description: "科学搞玄，哲学命理学研究",
  openGraph: {
    title: "水木易 | 科学搞玄，哲学命理学研究",
    description: "科学搞玄，哲学命理学研究",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("水木易")}&subtitle=${encodeURIComponent("科学搞玄，哲学命理学研究")}&type=default`,
        width: 1200,
        height: 630,
        alt: '水木易 - 个人网站首页',
        type: 'image/png',
      }
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "水木易 | 科学搞玄，哲学命理学研究",
    description: "科学搞玄，哲学命理学研究",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("水木易")}&subtitle=${encodeURIComponent("科学搞玄，哲学命理学研究")}&type=default`,
        width: 1200,
        height: 630,
        alt: '水木易 - 个人网站首页',
        type: 'image/png',
      }
    ],
    creator: '@shuimuyi',
  }
};

export default function Home() {
  // 获取所有文章
  const allPosts = getAllPosts();
  
  // 按分类分组文章
  const postsByCategory = allPosts.reduce((acc, post) => {
    if (!acc[post.category.id]) {
      acc[post.category.id] = [];
    }
    
    // 每个分类最多保留2篇文章
    if (acc[post.category.id].length < 2) {
      acc[post.category.id].push(post);
    }
    
    return acc;
  }, {} as Record<string, typeof allPosts>);
  
  // 从分组后的文章中获取最终显示的文章列表，最多6篇
  const latestPosts = Object.values(postsByCategory)
    .flat()
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-sumi-950">
      <div className="max-w-6xl mx-auto bg-card-50 dark:bg-ink-900 min-h-screen shadow-xl">
        {/* 简介部分  */}
        <section className="relative pt-16 pb-16 px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* 左侧头像区域 */}
            <div className="relative w-72 h-72 flex-shrink-0">
              <div className="absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-500/30 dark:to-purple-500/30">
                <Image
                  src="/images/avatar.png"
                  alt="水木易"
                  fill
                  sizes="288px"
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
            
            {/* 右侧内容区域 */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl text-violet-600 dark:text-violet-400 font-bold mb-4 text-center md:text-left">
                水木易
              </h1>
              
              <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 text-center md:text-left">
                📚 终身学习者｜🚀 中华国学探索者｜🧩 产品经理 ｜🤔 哲学硕士
              </div>
              
              {/* 成就/标签列表 */}
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-sky-500">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-gray-700 dark:text-gray-200">
                    终身学习是我的人生底色；
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-violet-500">
                      <path d="m8 3 4 8 5-5 5 15H2L8 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-gray-700 dark:text-gray-200">
                    享受在思辨的乐趣与创造的激情之间自由切换；
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-amber-500">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-gray-700 dark:text-gray-200">
                    致力于打造既有深度又不乏温度的产品体验；
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-emerald-500">
                      <rect width="18" height="18" x="3" y="3" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 7h10M7 12h10M7 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-gray-700 dark:text-gray-200">
                    咨询交流请扫码添加微信
                  </div>
                </div>
              </div>
              
              {/* 社交媒体链接 */}
              <div className="mt-8">
                <SocialLinks />
              </div>
            </div>
          </div>
        </section>

        <div className="px-6 py-16 md:py-24">
          {/* 分隔线 */}
          <div className="max-w-xs mx-auto mb-24">
            <hr className="border-bg-300 dark:border-ink-700" />
          </div>
          
          {/* 最新文章部分 */}
          <section>
            <h2 className="text-2xl text-ink-800 dark:text-bg-100 mb-12 text-center">最新文章</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => (
                  <article 
                    key={post.id} 
                    className="bg-card-50 dark:bg-ink-800 border border-bg-200 dark:border-ink-700 shadow-surface dark:shadow-none overflow-hidden group hover:border-bg-300 dark:hover:border-ink-600 transition-all"
                  >
                    <div className="p-6 md:p-8">
                      <Link href={`/categories/${post.category.id}`} className="inline-block mb-4">
                        <span className="text-xs uppercase tracking-wider font-medium text-ink-400 dark:text-ink-400">
                          {post.category.name}
                        </span>
                      </Link>
                      
                      <Link href={`/article/${post.slug}`}>
                        <h3 className="text-xl mb-3 text-ink-800 dark:text-bg-100 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <time className="text-sm text-ink-400 dark:text-ink-500 mb-4 block">{post.date}</time>
                      
                      <p className="text-ink-500 dark:text-ink-300 mb-5 line-clamp-2">{post.excerpt}</p>
                      
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
                ))
              ) : (
                <div className="col-span-full py-16 flex flex-col items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-16 w-16 text-bg-300 dark:text-ink-700 mb-4" 
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M12 18v-6"></path>
                    <path d="M8 15h8"></path>
                  </svg>
                  <p className="text-center text-ink-500 dark:text-ink-300 text-lg">暂无文章</p>
                  <p className="text-center text-ink-400 dark:text-ink-500 mt-2 text-sm">敬请期待内容更新</p>
                </div>
              )}
            </div>
            
            {latestPosts.length > 0 && (
              <div className="flex justify-center mt-16">
                <Link 
                  href="/categories" 
                  className="inline-flex items-center text-ink-500 dark:text-ink-400 hover:text-accent-600 dark:hover:text-accent-300 transition-colors"
                >
                  查看所有分类
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
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
