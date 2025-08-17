import Link from 'next/link';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            근로기준법에 따른 급여계산 완벽 가이드
          </h1>
          <p className="text-xl text-gray-600">
            근로자의 권리와 급여계산에 대한 모든 정보를 제공합니다
          </p>
          <Link 
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            급여계산기 사용하기
          </Link>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            근로기준법과 급여계산의 기본 원리
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              근로기준법은 모든 근로자의 기본적인 권리를 보호하고 공정한 근로조건을 보장하기 위한 법률입니다. 
              이 법에 따라 급여를 계산할 때는 기본급뿐만 아니라 각종 수당과 공제사항을 정확히 파악해야 합니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              기본급과 수당의 구분
            </h3>
            <p className="text-gray-700 mb-6">
              기본급은 근로자가 정해진 시간 동안 근로를 제공한 대가로 받는 기본적인 보수입니다. 
              이는 근로계약서에 명시되어야 하며, 사전에 합의된 금액이어야 합니다. 
              기본급 외에도 근로자는 다양한 수당을 받을 수 있습니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              초과근무 수당 계산법
            </h3>
            <p className="text-gray-700 mb-6">
              근로기준법 제50조에 따르면, 1주간의 근로시간이 40시간을 초과하거나 1일의 근로시간이 8시간을 초과하는 경우 
              초과근무에 대해서는 통상임금의 100분의 50 이상을 가산하여 지급해야 합니다. 
              예를 들어, 시급이 10,000원인 근로자가 하루 2시간 초과근무를 했다면, 
              초과근무 수당은 10,000원 × 2시간 × 1.5 = 30,000원이 됩니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              야간근무 수당
            </h3>
            <p className="text-gray-700 mb-6">
              야간근무는 오후 10시부터 오전 6시까지의 시간대를 말하며, 이 시간대에 근무할 경우 
              통상임금의 100분의 50 이상을 가산하여 지급해야 합니다. 
              야간근무와 초과근무가 겹치는 경우에는 각각의 가산률을 적용하여 계산합니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              휴일근무 수당
            </h3>
            <p className="text-gray-700 mb-6">
              주 5일 근무제를 실시하는 사업장에서 주 40시간을 초과하여 근무하는 경우, 
              초과시간에 대해서는 통상임금의 100분의 50 이상을 가산하여 지급해야 합니다. 
              또한 법정공휴일에 근무하는 경우에도 별도의 수당이 지급되어야 합니다.
            </p>
          </div>
        </div>

        {/* 두 번째 섹션 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            공제사항과 퇴직금 계산
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              각종 공제사항
            </h3>
            <p className="text-gray-700 mb-6">
              급여에서 공제할 수 있는 항목은 법령에서 정한 경우에만 가능합니다. 
              주요 공제사항으로는 소득세, 국민연금보험료, 건강보험료, 고용보험료 등이 있습니다. 
              이는 근로자의 동의 없이 임의로 공제할 수 없으며, 공제율도 법령에서 정한 범위 내에서 적용해야 합니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              퇴직금 계산
            </h3>
            <p className="text-gray-700 mb-6">
              1년 이상 계속 근무한 근로자가 퇴직할 때는 퇴직금을 받을 수 있습니다. 
              퇴직금은 1개월치 평균임금에 근속연수를 곱한 금액의 30일분입니다. 
              예를 들어, 월 평균임금이 300만원이고 3년간 근무했다면, 
              퇴직금은 300만원 × 3년 = 900만원이 됩니다.
            </p>
          </div>
        </div>

        {/* 세 번째 섹션 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            근로자의 권리 보호와 구제방법
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              근로자는 자신의 급여가 정확히 계산되어 지급받을 권리가 있습니다. 
              만약 부당한 공제나 수당 미지급이 있다면, 근로감시원에게 신고하거나 노동청에 진정할 수 있습니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              근로계약서와 급여명세서
            </h3>
            <p className="text-gray-700 mb-6">
              근로계약서에는 급여의 구성과 지급방법이 명확히 기재되어야 하며, 
              급여명세서를 통해 매월 지급내역을 확인할 수 있어야 합니다. 
              이러한 문서는 근로자의 권리를 보호하는 중요한 증빙자료가 됩니다.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              전문가 상담의 중요성
            </h3>
            <p className="text-gray-700 mb-6">
              정확한 급여계산을 위해서는 근로기준법의 세부사항을 이해하고, 
              필요시 전문가의 도움을 받는 것이 중요합니다. 
              특히 복잡한 수당 계산이나 공제사항이 있는 경우에는 
              노동법 전문가나 노동청의 상담서비스를 활용하는 것이 좋습니다.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                💡 실무 활용 팁
              </h4>
              <p className="text-blue-700">
                위의 정보를 바탕으로 근로자는 자신의 권리를 보호하고 공정한 급여를 받을 수 있습니다. 
                정기적으로 급여명세서를 확인하고, 의문사항이 있으면 즉시 문의하는 것이 중요합니다.
              </p>
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            지금 바로 급여를 계산해보세요!
          </h2>
          <p className="text-xl mb-6 opacity-90">
            근로기준법에 따른 정확한 급여계산을 도와드립니다
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
