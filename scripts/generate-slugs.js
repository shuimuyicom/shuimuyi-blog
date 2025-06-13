#!/usr/bin/env node

/**
 * 自动为所有文章生成slug的脚本
 * 使用方法: node scripts/generate-slugs.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const https = require('https');

// 内容目录路径
const postsDirectory = path.join(process.cwd(), 'src/content/posts');

/**
 * 使用术语映射将中文标题翻译为英文
 * 这是一个高效的方法，无需依赖外部API
 */
async function translateToEnglish(chineseTitle) {
  // 首先尝试从映射表中获取完整标题的翻译
  const smartTitle = getSmartEnglishTitle(chineseTitle);
  
  // 如果能获取到比较完整的智能映射，直接使用
  if (smartTitle.split('-').length > 3) {
    console.log(`   智能匹配翻译结果: "${smartTitle}"`);
    return cleanupSlug(smartTitle);
  }
  
  // 尝试递归分解长句子
  if (chineseTitle.length > 8) {
    const segments = segmentChineseText(chineseTitle);
    if (segments.length > 1) {
      // 尝试翻译各部分并组合
      const translatedSegments = segments.map(segment => {
        const smartSegment = getSmartEnglishTitle(segment);
        return smartSegment;
      });
      
      // 过滤掉空结果，并组合
      const combinedResult = translatedSegments
        .filter(seg => seg && seg.length > 0)
        .join('-');
        
      if (combinedResult && combinedResult.split('-').length > 3) {
        console.log(`   分段智能翻译结果: "${combinedResult}"`);
        return cleanupSlug(combinedResult);
      }
    }
  }
  
  // 如果分段翻译也不理想，返回原始智能匹配结果
  return cleanupSlug(smartTitle);
}

/**
 * 基于常见中文术语的智能英文映射
 */
function getSmartEnglishTitle(chineseText) {
  // 扩展映射表，特别针对易经相关术语
  const termMapping = {
    // 紫微斗数相关
    '紫微斗数': 'zi-wei-dou-shu',
    '紫微': 'zi-wei-astrology',
    '斗数': 'dou-shu',
    '命宫': 'life-palace',
    '身宫': 'body-palace',
    '命盘': 'horoscope',
    '排盘': 'astrology-chart',
    '运势': 'destiny',
    '推演': 'calculation',
    '浅谈': 'introduction-to',
    '天干地支': 'heavenly-stems-earthly-branches',
    '六十甲子': 'sixty-jiazi-cycle',
    
    // 八字命理
    '八字': 'bazi',
    '命理学': 'destiny-analysis',
    '命理': 'destiny-analysis',
    '生辰': 'birth-time',
    
    // 五行与易学
    '易经': 'i-ching',
    '八卦': 'bagua',
    '阴阳': 'yin-yang',
    '五行': 'five-elements',
    '易学': 'chinese-metaphysics',
    
    // 中医相关
    '中医': 'chinese-medicine',
    '理论': 'theory',
    '结合': 'integration',
    '应用': 'application',
    
    // 通用
    '中国': 'chinese',
    '传统': 'traditional',
    '文化': 'culture',
    '哲学': 'philosophy',
    '思想': 'thought',
    '研究': 'research',
    '探索': 'exploration',
    '分析': 'analysis',
    '关于': 'about',
    '如何': 'how-to',
    '为什么': 'why',
    '何时': 'when',
    '何地': 'where',
    '方法': 'method',
    '原理': 'principle',
    '系统': 'system',
    '天文': 'astronomy',
    '历法': 'calendar',
    '早晚子时': 'early-late-zi-hour',
    '子时': 'zi-hour',
    '生人': 'person-born',
    
    // 连接词
    '与': 'and',
    '和': 'and',
    '对': 'to',
    '在': 'in',
    '的': 'of',
    '之间': 'between',
    
    // 易经相关
    "六十四卦": "sixty-four-hexagrams",
    "卦象": "hexagram-symbols",
    "爻辞": "line-statements",
    "卦辞": "hexagram-statements",
    "周易": "book-of-changes",
    "太极": "tai-chi",
    "乾": "qian-heaven",
    "坤": "kun-earth",
    "震": "zhen-thunder",
    "艮": "gen-mountain",
    "离": "li-fire",
    "坎": "kan-water",
    "兑": "dui-lake",
    "巽": "xun-wind",
    "复卦": "return-hexagram",
    "坎卦": "water-hexagram",
    "需卦": "waiting-hexagram",
    "蒙卦": "youthful-folly-hexagram",
    "师卦": "army-hexagram",
    "未济": "not-yet-completed",
    "既济": "already-completed",
    
    // 心理学相关
    "心理学": "psychology",
    "映射关系": "mapping-relationship",
    "心理分析": "psychological-analysis",
    "荣格": "jung",
    "弗洛伊德": "freud",
    "集体无意识": "collective-unconscious",
    "原型": "archetypes",
    "个体化": "individuation",
    "阿尼玛": "anima",
    "阿尼姆斯": "animus",
    "同时性原理": "synchronicity",
    "投射": "projection",
    "现代心理学": "modern-psychology",
    
    // 新增复合词映射
    "易经与心理学": "i-ching-and-psychology",
    "六十四卦与心理学": "sixty-four-hexagrams-and-psychology",
    "易经六十四卦与现代心理学": "i-ching-sixty-four-hexagrams-and-modern-psychology",
    "六十四卦与现代心理学的映射关系": "mapping-between-sixty-four-hexagrams-and-modern-psychology",
    "易经六十四卦与现代心理学的映射关系": "mapping-between-i-ching-hexagrams-and-modern-psychology",
  };
  
  // 替换所有匹配的术语
  let englishTitle = chineseText;
  Object.keys(termMapping).forEach(key => {
    englishTitle = englishTitle.replace(new RegExp(key, 'g'), termMapping[key] + ' ');
  });
  
  // 移除剩余的中文字符
  englishTitle = englishTitle.replace(/[\u4e00-\u9fa5]/g, '');
  
  // 清理和格式化
  return formatSlug(englishTitle) || 'untitled';
}

/**
 * 生成友好的URL slug
 * @param {string} text 源文本
 * @param {string} fileName 文件名，作为备选
 * @return {string} 生成的slug
 */
async function generateSlug(text, fileName) {
  console.log(`   生成slug源文本: "${text}"`);
  
  // 默认备选slug - 使用文件名
  const defaultSlug = fileName.replace(/\.md$/, '');
  
  // 确保text不为空且为字符串
  if (!text || typeof text !== 'string') {
    console.log(`   警告: 输入为空或非字符串，使用文件名`);
    return defaultSlug;
  }
  
  // 处理中文标题
  if (/[\u4e00-\u9fa5]/.test(text)) {
    console.log(`   检测到中文标题，尝试翻译为英文`);
    
    // 使用术语映射将中文翻译为英文
    try {
      const translatedTitle = await translateToEnglish(text);
      if (translatedTitle && translatedTitle.trim() !== '') {
        console.log(`   翻译生成的slug: "${translatedTitle}"`);
        return translatedTitle;
      }
    } catch (error) {
      console.log(`   翻译处理失败: ${error.message}，尝试使用备选方案`);
    }
    
    // 备选：使用类别+文件名
    if (/^\d{6}/.test(defaultSlug)) {
      const category = getCategoryFromFile(fileName);
      if (category) {
        const dateBasedSlug = `${category.toLowerCase()}-${defaultSlug}`;
        console.log(`   使用类别+文件名生成slug: "${dateBasedSlug}"`);
        return dateBasedSlug;
      }
    }
    
    console.log(`   回退到使用文件名: "${defaultSlug}"`);
    return defaultSlug;
  }
  
  // 英文标题处理
  const slug = formatSlug(text);
  console.log(`   生成的原始slug: "${slug}"`);
  return slug || defaultSlug;
}

/**
 * 将文本格式化为有效的slug
 */
function formatSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-')     // 空格替换为连字符
    .replace(/-+/g, '-')      // 多个连字符替换为一个
    .replace(/-+$/, '')       // 移除结尾的连字符
    .trim();                   // 移除首尾空格
}

/**
 * 尝试从文件内容获取类别信息
 */
function getCategoryFromFile(fileName) {
  try {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return data.category || '';
  } catch (error) {
    console.error(`   无法读取文件 ${fileName} 的类别信息:`, error.message);
    return '';
  }
}

/**
 * 判断slug是否有效
 */
function isValidSlug(slug) {
  return slug && typeof slug === 'string' && slug.trim() !== '' && !/^[\d-]+$/.test(slug);
}

// 辅助函数：分割中文文本为更小的有意义片段
function segmentChineseText(text) {
  // 使用常见分隔符切分文本
  const segments = text.split(/[与和及、，。：；！？()（）【】]/);
  
  // 过滤掉空字符串并去除多余空格
  return segments
    .map(segment => segment.trim())
    .filter(segment => segment.length > 0);
}

// 辅助函数：优化生成的slug，去除不必要的连接词，并限制长度
function cleanupSlug(slug) {
  // 过滤掉常见的虚词和连接词
  const wordsToFilter = ['of', 'to', 'the', 'and', 'in', 'on', 'at', 'by', 'for', 'with'];
  
  // 分解slug
  let parts = slug.split('-');
  
  // 过滤掉不需要的词
  parts = parts.filter(part => !wordsToFilter.includes(part));
  
  // 限制slug长度（保留最重要的4-5个部分）
  if (parts.length > 6) {
    parts = parts.slice(0, 5);
  }
  
  // 重组slug
  return parts.join('-');
}

// 处理所有文章
async function updateAllSlugs() {
  console.log('开始处理文章slug...');
  
  if (!fs.existsSync(postsDirectory)) {
    console.error("文章目录不存在:", postsDirectory);
    process.exit(1);
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const results = {
    skipped: [],
    updated: [],
    errors: []
  };
  
  for (const fileName of fileNames) {
    try {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // 解析frontmatter
      const { data, content } = matter(fileContents);
      
      // 检查现有slug是否有效
      if (data.slug && isValidSlug(data.slug)) {
        console.log(`- ${fileName}: 已有有效slug '${data.slug}'，跳过`);
        results.skipped.push({
          fileName,
          slug: data.slug,
          title: data.title || ''
        });
        continue;
      }
      
      // 如果slug存在但无效（如空字符串），记录
      if (data.slug !== undefined) {
        console.log(`* ${fileName}: 现有slug '${data.slug}' 无效，将重新生成`);
      }
      
      // 生成slug
      let slug = '';
      if (data.title) {
        slug = await generateSlug(data.title, fileName);
      } else {
        slug = fileName.replace(/\.md$/, '');
        console.log(`   无标题，使用文件名 '${slug}' 作为slug`);
      }
      
      // 确保slug不为空，如果为空则使用文件名
      if (!isValidSlug(slug)) {
        slug = fileName.replace(/\.md$/, '');
        console.log(`   警告: 生成的slug无效，使用文件名 '${slug}' 代替`);
      }
      
      // 添加slug到frontmatter
      data.slug = slug;
      
      // 重写文件
      const updatedFileContent = matter.stringify(content, data);
      fs.writeFileSync(fullPath, updatedFileContent);
      
      console.log(`+ ${fileName}: 生成slug '${slug}'`);
      results.updated.push({
        fileName,
        slug,
        title: data.title || ''
      });
    } catch (error) {
      console.error(`! 处理 ${fileName} 时出错:`, error.message);
      results.errors.push({
        fileName,
        error: error.message
      });
    }
  }
  
  // 输出统计信息
  console.log(`\n处理完成！共处理 ${fileNames.length} 个文件:`);
  console.log(`- 跳过: ${results.skipped.length} 个（已有有效slug）`);
  console.log(`- 更新: ${results.updated.length} 个`);
  console.log(`- 错误: ${results.errors.length} 个`);
  
  return results;
}

// 执行更新
updateAllSlugs(); 