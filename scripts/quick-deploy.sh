#!/bin/bash

# 快速部署脚本
echo "🚀 开始快速部署到Vercel..."

# 检查是否有未提交的更改
if [[ `git status --porcelain` ]]; then
  echo "📝 发现未提交的更改，正在提交..."
  git add .
  git commit -m "🔄 快速部署更新 - $(date '+%Y-%m-%d %H:%M:%S')"
  git push origin main
  echo "✅ 代码已推送到GitHub"
fi

# 执行Vercel部署
echo "🚀 开始Vercel部署..."
npx vercel --prod

echo "✨ 部署完成！" 