import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">💰</span>
            <span className="text-xl font-bold text-gray-800">급여계산기</span>
          </Link>

          {/* 네비게이션 링크 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              홈
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              블로그
            </Link>
            <Link 
              href="/guide" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              급여계산 가이드
            </Link>
            <Link 
              href="/faq" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              자주 묻는 질문
            </Link>
            <a 
              href="https://www.moel.go.kr/info/lawinfo/guide/guide.jsp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              근로기준법 정보
            </a>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
