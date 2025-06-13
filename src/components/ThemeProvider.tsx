"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

/**
 * 主题提供者组件
 * 用于管理应用的主题状态（明亮/暗黑模式）
 * 
 * 支持的属性包括：
 * - attribute: 主题切换时修改的HTML属性，支持'class'或'data-*'
 * - defaultTheme: 默认主题，如'light'、'dark'或'system'
 * - enableSystem: 是否启用系统主题检测
 * - disableTransitionOnChange: 切换主题时是否禁用过渡动画
 * - storageKey: 存储主题设置的localStorage键名
 * - forcedTheme: 强制使用的主题
 * - themes: 可用主题列表
 */
export function ThemeProvider(props: ThemeProviderProps) {
  const { children, ...restProps } = props;
  return <NextThemesProvider {...restProps}>{children}</NextThemesProvider>;
} 