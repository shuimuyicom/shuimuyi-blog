import Image from "next/image";

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap justify-center md:justify-start gap-3 ${className}`}>
      {/* 公众号 */}
      <a href="#" 
         className="social-link mp group relative flex items-center justify-center h-10 w-fit px-3 rounded-full bg-white dark:bg-ink-700 border border-gray-200 dark:border-ink-600 shadow-sm hover:shadow-md transition-all">
        <svg className="h-5 w-5 text-green-600 mr-1.5" viewBox="0 0 24 24" fill="none">
          <path d="M20.5 3.5h-17a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h17a2 2 0 0 0 2-2v-13a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8v8m-4-4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm text-gray-700 dark:text-gray-200">公众号</span>
        <div className="qr-tooltip">
          <div className="w-36 h-36 bg-white dark:bg-ink-800 p-2 rounded-lg shadow-lg">
            <div className="w-full h-full rounded-md qr-placeholder">
              <Image 
                src="/images/social/mp-qr.png" 
                alt="Official Account QR Code" 
                width={128} 
                height={128}
                className="w-full h-full rounded-md"
                priority
              />
            </div>
          </div>
          <div className="w-3 h-3 bg-white dark:bg-ink-800 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      </a>

      {/* B站 */}
      <a href="https://space.bilibili.com/1394172436" target="_blank" rel="noopener noreferrer" 
         className="social-link bilibili flex items-center justify-center h-10 w-fit px-3 rounded-full bg-white dark:bg-ink-700 border border-gray-200 dark:border-ink-600 shadow-sm hover:shadow-md transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"></path>
        </svg>
        <span className="text-sm text-gray-700 dark:text-gray-200">B站</span>
      </a>

      {/* 小红书 */}
      <a href="https://www.xiaohongshu.com/user/profile/67c43e27000000000601de46" target="_blank" rel="noopener noreferrer"
         className="social-link xiaohongshu flex items-center justify-center h-10 w-fit px-3 rounded-full bg-white dark:bg-ink-700 border border-gray-200 dark:border-ink-600 shadow-sm hover:shadow-md transition-all">
        <svg className="h-5 w-5 text-red-500 mr-1.5" viewBox="0 0 24 24" fill="none">
          <path d="M6 2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M17 2v20M7 2v20M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        <span className="text-sm text-gray-700 dark:text-gray-200">小红书</span>
      </a>

      {/* YouTube */}
      <a href="https://www.youtube.com/@shuimuyicom" target="_blank" rel="noopener noreferrer" 
         className="social-link youtube flex items-center justify-center h-10 w-fit px-3 rounded-full bg-white dark:bg-ink-700 border border-gray-200 dark:border-ink-600 shadow-sm hover:shadow-md transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
        <span className="text-sm text-gray-700 dark:text-gray-200">YouTube</span>
      </a>

      {/* X */}
      <a href="https://x.com/shuimuyicom" target="_blank" rel="noopener noreferrer" 
         className="social-link x flex items-center justify-center h-10 w-fit px-3 rounded-full bg-white dark:bg-ink-700 border border-gray-200 dark:border-ink-600 shadow-sm hover:shadow-md transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
        <span className="text-sm text-gray-700 dark:text-gray-200">X</span>
      </a>

      {/* 微信 */}
      <a href="#" 
         className="social-link wechat group relative flex items-center justify-center h-10 w-fit px-3 rounded-full bg-white dark:bg-ink-700 border border-gray-200 dark:border-ink-600 shadow-sm hover:shadow-md transition-all">
        <svg className="h-5 w-5 text-green-600 mr-1.5" viewBox="0 0 24 24" fill="none">
          <path d="M8.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="currentColor"/>
          <path d="M15.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="currentColor"/>
          <path d="M21.5 11c0-4.418-4.03-8-9-8s-9 3.582-9 8c0 2.21 1.008 4.187 2.583 5.584l-1.334 4.035 4.576-2.013A10.15 10.15 0 0 0 12.5 19c4.97 0 9-3.582 9-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm text-gray-700 dark:text-gray-200">微信</span>
        <div className="qr-tooltip">
          <div className="w-36 h-36 bg-white dark:bg-ink-800 p-2 rounded-lg shadow-lg">
            <div className="w-full h-full rounded-md qr-placeholder">
              <Image 
                src="/images/social/wechat-qr.png" 
                alt="WeChat QR Code" 
                width={128} 
                height={128}
                className="w-full h-full rounded-md"
                priority
              />
            </div>
          </div>
          <div className="w-3 h-3 bg-white dark:bg-ink-800 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      </a>
    </div>
  );
} 