import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

// 更新网站URL，使用www子域名确保与重定向一致
const SITE_URL = "https://www.shuimuyi.com";
const SITE_TITLE = "水木易";
const SITE_DESCRIPTION = "总是站在科技与人文的十字路口";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  // 使用动态生成的OG图片，确保社交媒体平台正确读取
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_TITLE,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(SITE_TITLE)}&subtitle=${encodeURIComponent(SITE_DESCRIPTION)}&type=default`,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE} | ${SITE_DESCRIPTION}`,
    description: "用智慧帮你渡过困境，用格局助你站得更高",
    images: [{
      url: `${SITE_URL}/api/og?title=${encodeURIComponent(SITE_TITLE)}&subtitle=${encodeURIComponent(SITE_DESCRIPTION)}&type=default`,
      width: 1200,
      height: 630,
      alt: `${SITE_TITLE} - 个人网站首页`,
      type: "image/png",
    }],
    site: "@shuimuyicom",
    creator: "@shuimuyicom",
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "google-site-verification=123",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LEQPGCJ8VH"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LEQPGCJ8VH');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="container m-auto min-h-screen px-4 sm:px-8 py-4 sm:py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
