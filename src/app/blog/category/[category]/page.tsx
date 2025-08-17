import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostsByCategory } from '@/data/blogPosts';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const posts = getBlogPostsByCategory(category);
  
  if (posts.length === 0) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryDescription = (cat: string) => {
    switch (cat) {
      case '급여정책':
        return '최저임금, 급여정책 등 급여 관련 최신 정보와 가이드';
      case '수당계산':
        return '주휴수당, 초과근무수당, 야간근무수당 등 수당 계산 방법과 법적 근거';
      default:
        return '근로기준법과 급여계산에 대한 전문적인 정보';
    }
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

        {/* 카테고리 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📂 {category}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {getCategoryDescription(category)}
          </p>
          <p className="text-lg text-gray-500">
            총 {posts.length}개의 포스트를 찾았습니다
          </p>
        </div>

        {/* 포스트 목록 */}
        <div className="space-y-6">
          {posts.map((post) => (
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
                
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {post.description}
                </p>
                
                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-blue-800 transition-colors text-xs"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>작성자: {post.author}</span>
                    <span>발행일: {formatDate(post.publishedAt)}</span>
                  </div>
                  
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

        {/* 다른 카테고리 보기 */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📂 다른 카테고리도 살펴보기
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link 
              href="/blog/category/급여정책"
              className={`block p-6 border-2 rounded-lg text-center transition-colors ${
                category === '급여정책' 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">💰 급여정책</h3>
              <p className="text-gray-600 text-sm">
                최저임금, 급여정책 등 급여 관련 최신 정보
              </p>
            </Link>
            
            <Link 
              href="/blog/category/수당계산"
              className={`block p-6 border-2 rounded-lg text-center transition-colors ${
                category === '수당계산' 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 수당계산</h3>
              <p className="text-gray-600 text-sm">
                주휴수당, 초과근무수당, 야간근무수당 등 수당 계산 방법
              </p>
            </Link>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
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
