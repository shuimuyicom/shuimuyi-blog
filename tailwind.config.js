/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 和纸色系
        washi: {
          50: "#FDFBF7",   // 最浅的和纸色
          100: "#F7F4ED",  // 浅和纸色
          200: "#EFE9DB",  // 中浅和纸色
          300: "#E5DBc9",  // 中和纸色
          400: "#D6C9B3",  // 中深和纸色
          500: "#C5B59B",  // 深和纸色
        },
        // 墨色系
        sumi: {
          50: "#F9F9F9",   // 最浅的墨色
          100: "#F2F2F2",  // 极浅墨色
          200: "#E6E6E6",  // 浅墨色
          300: "#D1D1D1",  // 中浅墨色
          400: "#A3A3A3",  // 中墨色
          500: "#737373",  // 中深墨色
          600: "#525252",  // 深墨色
          700: "#404040",  // 很深墨色
          800: "#262626",  // 极深墨色
          900: "#171717",  // 近黑墨色
          950: "#0A0A0A",  // 纯墨色
        },
        // 黑白灰配色
        bg: {
          50: "#FAFAFA",    // 最浅的背景色
          100: "#F5F5F5",   // 极淡的背景色
          200: "#EEEEEE",   // 浅背景色
          300: "#E0E0E0",   // 中浅背景色
          900: "#212121",   // 深背景色
          950: "#121212",   // 近黑背景色
        },
        card: {
          50: "#FFFFFF",    // 卡片基础色（亮色模式）
          100: "#F9F9F9",   // 卡片次级色
          900: "#1A1A1A",   // 卡片深色（暗色模式）
          950: "#0F0F0F",   // 卡片最深色
        },
        ink: {
          100: "#E5E5E5",   // 最浅墨色
          200: "#C9C9C9",   // 浅墨色
          300: "#A3A3A3",   // 中浅墨色
          400: "#787878",   // 中墨色
          500: "#525252",   // 次深墨色
          600: "#404040",   // 深墨色
          700: "#2E2E2E",   // 很深墨色
          800: "#1F1F1F",   // 极深墨色
          900: "#171717",   // 近黑墨色
        },
        accent: {
          100: "#E9E4F4",   // 淡藤色
          200: "#D4CAE9",   // 浅藤色
          300: "#BFB0DE",   // 藤色
          500: "#937CC8",   // 标准藤色
          600: "#7A62BD",   // 深藤色
          700: "#624AA1",   // 更深藤色
        },
      },
      fontFamily: {
        // 中文字体优先，按不同操作系统优化排序
        sans: [
          // 中文字体
          'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', 'Noto Sans SC', 
          // 西文字体
          '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 
          'Helvetica Neue', 'Arial', 'sans-serif', 
          // Emoji字体
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'
        ],
        // 纯西文字体，需要时可单独使用
        latin: [
          '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 
          'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'
        ],
        // 中文衬线字体
        serif: [
          'Songti SC', 'Source Han Serif SC', 'Noto Serif SC', 'SimSun', 
          'Georgia', 'Times New Roman', 'serif'
        ],
        // 等宽字体
        mono: [
          'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 
          'Liberation Mono', 'Courier New', 'monospace'
        ],
      },
      boxShadow: {
        'surface': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: theme('colors.ink.700'),
            lineHeight: '1.75',
            '>*': {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
              lineHeight: '1.75',
              textAlign: 'justify',
              hyphens: 'auto',
              '@media (max-width: 640px)': {
                fontSize: '1rem',
                lineHeight: '1.7',
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.ink.800'),
              fontWeight: '600',
              '@media (max-width: 640px)': {
                lineHeight: '1.4',
              },
            },
            h1: {
              fontSize: '2.25em',
              letterSpacing: '-0.025em',
              '@media (max-width: 640px)': {
                fontSize: '1.75em',
              },
            },
            h2: {
              fontSize: '1.75em',
              letterSpacing: '-0.025em',
              borderBottom: `1px solid ${theme('colors.bg.200')}`,
              paddingBottom: '0.5rem',
              '@media (max-width: 640px)': {
                fontSize: '1.5em',
              },
            },
            h3: {
              fontSize: '1.5em',
            },
            h4: {
              fontSize: '1.25em',
            },
            a: {
              color: theme('colors.accent.600'),
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': {
                color: theme('colors.accent.500'),
              },
            },
            code: {
              color: theme('colors.ink.700'),
              backgroundColor: theme('colors.bg.100'),
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.ink.800'),
              color: theme('colors.bg.100'),
              borderRadius: '0.25rem',
              overflowX: 'auto',
              fontSize: '0.875em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              fontSize: 'inherit',
              padding: '0',
            },
            blockquote: {
              fontStyle: 'normal',
              color: theme('colors.ink.600'),
              borderLeftColor: theme('colors.accent.400'),
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginLeft: '0',
              paddingLeft: '1.5em',
              '@media (max-width: 640px)': {
                fontSize: '0.95em',
              },
            },
            'blockquote p:first-of-type::before': {
              content: 'open-quote',
            },
            'blockquote p:last-of-type::after': {
              content: 'close-quote',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5em',
            },
            ol: {
              paddingLeft: '1.5em',
            },
            'ul li, ol li': {
              marginTop: '0.5em',
              marginBottom: '0.5em',
              color: theme('colors.ink.700'),
              '@media (max-width: 640px)': {
                fontSize: '1rem',
              },
            },
            img: {
              marginTop: '2em',
              marginBottom: '2em',
              borderRadius: '0.25rem',
            },
            hr: {
              marginTop: '2em',
              marginBottom: '2em',
              borderColor: theme('colors.bg.200'),
            },
            table: {
              fontSize: '0.875em',
              lineHeight: '1.5',
            },
            'thead tr': {
              borderBottomWidth: '2px',
              borderBottomColor: theme('colors.bg.300'),
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.bg.200'),
            },
            'tbody tr:last-child': {
              borderBottomWidth: '0',
            },
            'th, td': {
              padding: '0.75rem 1rem',
              textAlign: 'left',
            },
            th: {
              fontWeight: '600',
              color: theme('colors.ink.800'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.bg.100'),
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.bg.50'),
            },
            h2: {
              borderBottomColor: theme('colors.ink.700'),
            },
            a: {
              color: theme('colors.accent.300'),
              '&:hover': {
                color: theme('colors.accent.200'),
              },
            },
            code: {
              color: theme('colors.bg.50'),
              backgroundColor: theme('colors.ink.700'),
            },
            pre: {
              backgroundColor: theme('colors.ink.800'),
              color: theme('colors.bg.50'),
            },
            blockquote: {
              color: theme('colors.bg.200'),
              borderLeftColor: theme('colors.accent.500'),
            },
            'thead tr': {
              borderBottomColor: theme('colors.ink.600'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.ink.700'),
            },
            th: {
              color: theme('colors.bg.50'),
              fontWeight: '600',
            },
            hr: {
              borderColor: theme('colors.ink.700'),
            },
            'ul li, ol li': {
              color: theme('colors.bg.100'),
            },
          },
        },
      }),
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        fadeInUp: 'fadeInUp 0.4s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

