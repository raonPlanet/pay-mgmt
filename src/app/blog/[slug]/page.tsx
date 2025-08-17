import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getRecentPosts } from '@/data/blogPosts';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(3).filter(p => p.id !== post.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← 블로그 목록으로 돌아가기
          </Link>
        </div>

        {/* 메인 콘텐츠 */}
        <article className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* 포스트 메타 정보 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500">
                {post.readTime}분 읽기
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {post.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>작성자: {post.author}</span>
              <span>발행일: {formatDate(post.publishedAt)}</span>
              {post.updatedAt !== post.publishedAt && (
                <span>수정일: {formatDate(post.updatedAt)}</span>
              )}
            </div>
          </div>

          {/* 태그 */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-800 transition-colors text-sm"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* 포스트 콘텐츠 */}
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* 작성자 정보 */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">작성자 소개</h3>
            <p className="text-gray-600">
              {post.author}는 근로기준법과 급여계산에 대한 전문 지식을 바탕으로 
              근로자들이 자신의 권리를 보호할 수 있도록 도움을 드립니다.
            </p>
          </div>
        </article>

        {/* 관련 포스트 */}
        {recentPosts.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 관련 포스트</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {relatedPost.description}
                  </p>
                  <Link 
                    href={`/blog/${relatedPost.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    자세히 보기 →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA 섹션 */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            이 정보가 도움이 되었나요?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            정확한 급여계산을 위해 급여계산기를 사용해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              급여계산기 사용하기
            </Link>
            <Link 
              href="/guide"
              className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              급여계산 가이드 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
