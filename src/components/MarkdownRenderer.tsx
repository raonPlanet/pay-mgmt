'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 간단한 마크다운 파싱 및 렌더링
  const parseMarkdown = (text: string) => {
    // 제목 처리
    let html = text
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-800 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-gray-800 mb-4 mt-6">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 mb-6 mt-8">$1</h1>');

    // 굵은 텍스트 처리
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');

    // 코드 블록 처리
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>');

    // 리스트 처리
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-1">$1</li>');

    // 단락 처리
    html = html.replace(/\n\n/g, '</p><p class="mb-4">');
    html = html.replace(/\n/g, '<br>');

    // 링크 처리
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>');

    return `<div class="prose prose-lg max-w-none">${html}</div>`;
  };

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
}
