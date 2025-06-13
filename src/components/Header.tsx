"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 检查系统主题偏好
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(isDark);
    
    // 从localStorage加载主题设置
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
    
    // 应用主题
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // 切换主题
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  // 导航链接
  const links = [
    { href: "/", label: "首页" },
    { href: "/categories", label: "分类" },
    { href: "/about", label: "关于" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-card-50/90 dark:bg-ink-900/90 supports-[backdrop-filter]:bg-card-50/75 supports-[backdrop-filter]:dark:bg-ink-900/75">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden relative">
                <Image
                  src="/images/avatar.png"
                  alt="水木易"
                  fill
                  sizes="32px"
                  className="object-cover"
                  priority
                />
              </div>
              <span className="ml-3 text-lg text-sumi-800 dark:text-bg-100">
                水木易
              </span>
            </Link>
          </div>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <nav className="flex space-x-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "text-accent-600 dark:text-accent-300 font-medium"
                      : "text-ink-500 dark:text-ink-300 hover:text-ink-700 dark:hover:text-bg-100"
                  } transition-colors text-sm px-1 py-1`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* 主题切换按钮 */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-ink-400 dark:text-ink-400 hover:text-ink-700 dark:hover:text-bg-100 hover:bg-bg-200 dark:hover:bg-ink-700 transition-colors focus:outline-none"
              aria-label={darkMode ? "切换到浅色模式" : "切换到深色模式"}
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-ink-400 dark:text-ink-400 hover:text-ink-700 dark:hover:text-bg-100 hover:bg-bg-200 dark:hover:bg-ink-700 transition-colors focus:outline-none"
            aria-label="打开菜单"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* 移动端导航 */}
        {isOpen && (
          <div className="md:hidden py-4 pb-6 border-t border-bg-200 dark:border-ink-700 mt-1 animate-fadeIn">
            <nav className="flex flex-col space-y-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "text-accent-600 dark:text-accent-300 font-medium"
                      : "text-ink-500 dark:text-ink-300 hover:text-ink-700 dark:hover:text-bg-100"
                  } px-2 py-1 transition-colors text-sm`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
} 