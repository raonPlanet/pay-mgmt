import Link from 'next/link';
import { blogPosts, getFeaturedPosts, getRecentPosts, getAllTags } from '@/data/blogPosts';

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(6);
  const allTags = getAllTags();

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
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📚 급여계산 블로그
          </h1>
          <p className="text-xl text-gray-600">
            근로기준법과 급여계산에 대한 전문적인 정보를 제공합니다
          </p>
          <Link 
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            급여계산기 사용하기
          </Link>
        </div>

        {/* 피처드 포스트 */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🌟 추천 포스트</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {post.readTime}분 읽기
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {formatDate(post.publishedAt)}
                      </span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        자세히 보기 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 최신 포스트 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 최신 포스트</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.readTime}분 읽기
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {formatDate(post.publishedAt)}
                    </span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      자세히 보기 →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 태그 클라우드 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🏷️ 주제별 보기</h2>
          <div className="flex flex-wrap gap-3">
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-blue-200 hover:text-blue-800 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* 카테고리별 보기 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📂 카테고리별 보기</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💰 급여정책</h3>
              <p className="text-gray-600 mb-4">
                최저임금, 급여정책 등 급여 관련 최신 정보
              </p>
              <Link 
                href="/blog/category/급여정책"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                보기 →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 수당계산</h3>
              <p className="text-gray-600 mb-4">
                주휴수당, 초과근무수당, 야간근무수당 등 수당 계산 방법
              </p>
              <Link 
                href="/blog/category/수당계산"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                보기 →
              </Link>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            정확한 급여계산이 필요하신가요?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            근로기준법에 따른 자동 급여계산기를 사용해보세요
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            급여계산기 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
}
