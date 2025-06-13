import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700">404</h1>
      <h2 className="text-3xl font-semibold mb-4">页面未找到</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
} 