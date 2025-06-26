import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

// 设置运行时环境为Edge，充分利用Edge运行时的性能优势
export const runtime = 'edge'

// 设置路由段配置，优化重新验证策略
export const revalidate = 3600 // 1小时重新验证一次

// 简化字体加载策略，降低出错可能性
const loadFont = async (): Promise<ArrayBuffer | null> => {
  try {
    // 使用更稳定的Google Fonts CDN
    const res = await fetch(
      'https://fonts.gstatic.com/s/notosanssc/v38/k3kXo84MPvpLmixcA63oeALhLOCT-xWNm8Hqd37g1OkDVyZt0Kvt.woff2',
      { cache: 'force-cache' }
    )
    if (!res.ok) {
      throw new Error(`Failed to load font: ${res.status}`)
    }
    return await res.arrayBuffer()
  } catch (error) {
    console.error('Error loading font:', error)
    return null
  }
}

// 使用 JSDoc 增强类型安全和文档化
/**
 * 生成OG图片
 * @param {NextRequest} request - 请求对象
 * @returns {Promise<ImageResponse>} 生成的图片响应
 */
export async function GET(request: NextRequest): Promise<ImageResponse | Response> {
  try {
    // 记录请求信息，便于调试X.com爬虫
    const userAgent = request.headers.get('user-agent') || 'unknown'
    console.log('OG Image request from:', userAgent)
    
    // 使用Next.js 15推荐的URL解析方式
    const { searchParams } = new URL(request.url)
    
    // 使用严格类型断言和默认值
    const title = searchParams.get('title')?.slice(0, 100) || '水木易'
    const subtitle = searchParams.get('subtitle')?.slice(0, 200) || '总是站在科技与人文的十字路口'
    const type = searchParams.has('type') ? searchParams.get('type') : 'default'
    const date = searchParams.get('date') || ''
    const category = searchParams.get('category') || ''
    
    console.log('Generating OG image for:', { title, subtitle, type })
    
    // 尝试加载字体，但即使失败也能继续
    const fontData = await loadFont()
    
    // 使用更简单的样式，确保更高的兼容性
    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f6f6f6, #e9e9f9)',
            padding: 40,
            fontFamily: '"NotoSansSC", "Noto Sans SC", sans-serif',
          }}
        >
          {/* 简化的卡片布局 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: 'white',
              borderRadius: 12,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: 48,
              width: '90%',
              maxWidth: 900,
            }}
          >
            {/* 网站标识 */}
            <div
              style={{
                fontSize: 18,
                color: '#666',
                marginBottom: 24,
                fontWeight: 'normal',
              }}
            >
              shuimuyi.com
            </div>
            
            {/* 标题 */}
            <h1
              style={{
                fontSize: type === 'article' ? 48 : 56,
                fontWeight: 'bold',
                margin: '0 0 16px',
                color: '#8B5CF6',
                maxWidth: 800,
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            
            {/* 副标题 */}
            <p
              style={{
                fontSize: 24,
                margin: '0 0 24px',
                color: '#4B5563',
                maxWidth: 800,
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </p>
            
            {/* 文章元数据 */}
            {type === 'article' && date && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 20,
                  color: '#8B5CF6',
                  padding: '8px 16px',
                  backgroundColor: '#F3E8FF',
                  borderRadius: 24,
                }}
              >
                {date} {category && `· ${category}`}
              </div>
            )}
            
            {/* 分类页面标识 */}
            {type === 'category' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 18,
                  color: '#059669',
                  padding: '6px 12px',
                  backgroundColor: '#D1FAE5',
                  borderRadius: 20,
                }}
              >
                分类
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // 简化字体配置，只在字体成功加载时使用
        ...(fontData && {
          fonts: [
            {
              name: 'NotoSansSC',
              data: fontData,
              weight: 400,
              style: 'normal',
            }
          ]
        }),
        // 优化头部，特别针对X.com爬虫
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Content-Type': 'image/png',
          'X-Content-Type-Options': 'nosniff',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cross-Origin-Resource-Policy': 'cross-origin',
        },
      },
    )
    
    console.log('OG image generated successfully')
    return imageResponse
  } catch (error: unknown) {
    console.error('Error generating OG image:', error instanceof Error ? error.message : String(error))
    
    // 出错时返回一个简单的图片
    try {
      return new ImageResponse(
        (
          <div style={{ 
            display: 'flex', 
            height: '100%', 
            width: '100%', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: '#f0f0f0',
            fontFamily: 'system-ui, sans-serif',
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '80%', 
              background: 'white', 
              padding: 40, 
              borderRadius: 10,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              <h1 style={{ 
                fontSize: 48, 
                textAlign: 'center', 
                color: '#333',
                margin: '0 0 16px 0',
                fontWeight: 'bold',
              }}>水木易</h1>
              <p style={{ 
                fontSize: 24, 
                textAlign: 'center', 
                color: '#666',
                margin: 0,
              }}>总是站在科技与人文的十字路口</p>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          headers: {
            'Cache-Control': 'public, max-age=60',
            'Content-Type': 'image/png',
            'X-Content-Type-Options': 'nosniff',
            'Cross-Origin-Resource-Policy': 'cross-origin',
          },
        }
      )
    } catch {
      // 如果备用图片也失败，返回错误文本
      return new Response(`Failed to generate OG image: ${error instanceof Error ? error.message : 'Unknown error'}`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      })
    }
  }
} 