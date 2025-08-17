import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      question: "주휴수당은 언제 지급되나요?",
      answer: "주휴수당은 1주간의 소정근로일수를 개근한 경우에 지급됩니다. 주 15시간 이상 근무하는 경우 주휴수당을 받을 수 있으며, 이는 근로기준법 제55조에 근거합니다."
    },
    {
      question: "초과근무 수당은 어떻게 계산하나요?",
      answer: "주 40시간을 초과하거나 1일 8시간을 초과하는 근무에 대해서는 통상임금의 50% 이상을 가산하여 지급해야 합니다. 예를 들어 시급 10,000원으로 2시간 초과근무 시 30,000원의 수당을 받을 수 있습니다."
    },
    {
      question: "야간근무 수당은 언제 적용되나요?",
      answer: "오후 10시부터 오전 6시까지의 시간대에 근무하는 경우 야간근무 수당이 적용됩니다. 이 시간대에는 통상임금의 50% 이상을 가산하여 지급해야 합니다."
    },
    {
      question: "퇴직금은 언제 받을 수 있나요?",
      answer: "1년 이상 계속 근무한 근로자가 퇴직할 때 퇴직금을 받을 수 있습니다. 퇴직금은 1개월치 평균임금에 근속연수를 곱한 금액의 30일분입니다."
    },
    {
      question: "근로계약서에 반드시 포함되어야 할 내용은?",
      answer: "근로계약서에는 근무장소, 업무내용, 근무시간, 급여, 지급방법, 근로계약기간 등이 명시되어야 합니다. 특히 급여의 구성과 지급방법은 명확하게 기재되어야 합니다."
    },
    {
      question: "부당한 공제에 대한 구제방법은?",
      answer: "법령에서 정하지 않은 공제나 부당한 공제가 있는 경우, 근로감시원에게 신고하거나 노동청에 진정할 수 있습니다. 근로자의 동의 없이 임의로 공제할 수 없습니다."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ❓ 자주 묻는 질문 (FAQ)
          </h1>
          <p className="text-xl text-gray-600">
            급여계산과 관련된 궁금한 점들을 모았습니다
          </p>
          <Link 
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            급여계산기 사용하기
          </Link>
        </div>

        {/* FAQ 목록 */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Q. {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A. {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* 추가 정보 섹션 */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📚 더 자세한 정보가 필요하신가요?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link 
              href="/guide"
              className="block p-6 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors text-center"
            >
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                📖 급여계산 가이드
              </h3>
              <p className="text-gray-600 text-sm">
                근로기준법에 따른 급여계산 방법과 각종 수당에 대한 상세한 설명
              </p>
            </Link>
            
            <a 
              href="https://www.moel.go.kr/info/lawinfo/guide/guide.jsp"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors text-center"
            >
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                🔗 근로기준법 정보
              </h3>
              <p className="text-gray-600 text-sm">
                노동부에서 제공하는 공식 근로기준법 가이드 및 상담 서비스
              </p>
            </a>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            지금 바로 급여 계산하기
          </Link>
        </div>
      </div>
    </div>
  );
}
