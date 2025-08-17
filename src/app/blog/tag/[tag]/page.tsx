import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostsByTag, getAllTags } from '@/data/blogPosts';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const allTags = getAllTags();
  
  if (!allTags.includes(tag)) {
    notFound();
  }

  const posts = getBlogPostsByTag(tag);

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

        {/* 태그 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏷️ #{tag} 관련 포스트
          </h1>
          <p className="text-xl text-gray-600">
            총 {posts.length}개의 포스트를 찾았습니다
          </p>
        </div>

        {/* 포스트 목록 */}
        {posts.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              해당 태그로 작성된 포스트가 없습니다.
            </p>
            <Link 
              href="/blog"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              블로그 목록으로 돌아가기
            </Link>
          </div>
        )}

        {/* 다른 태그 보기 */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🏷️ 다른 주제도 살펴보기
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {allTags.filter(t => t !== tag).map((otherTag) => (
              <Link
                key={otherTag}
                href={`/blog/tag/${otherTag}`}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-blue-200 hover:text-blue-800 transition-colors"
              >
                #{otherTag}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            더 많은 정보가 필요하신가요?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            급여계산기와 가이드를 통해 더 자세한 정보를 얻어보세요
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
