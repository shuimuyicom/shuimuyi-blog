"use client";

import Link from "next/link";

export default function ScrollToTop() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('top')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <Link 
      href="#top" 
      className="text-ink-500 dark:text-ink-400 hover:text-accent-600 dark:hover:text-accent-300 transition-colors flex items-center text-sm group"
      onClick={handleClick}
    >
      返回顶部
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 ml-2 group-hover:-translate-y-0.5 transition-transform" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </Link>
  );
} 