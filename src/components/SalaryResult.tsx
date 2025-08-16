'use client';

import React, { useState } from 'react';
import { SalaryCalculation, formatKRW } from '@/lib/salaryCalculator';
import { generateSalaryImage, downloadSalaryPDF, shareToKakao } from '@/lib/imageGenerator';

interface SalaryResultProps {
  salaryData: SalaryCalculation;
  onBack: () => void;
}

export default function SalaryResult({ salaryData, onBack }: SalaryResultProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    try {
      await generateSalaryImage(salaryData);
      alert('이미지가 생성되었습니다!');
    } catch (error) {
      console.error('이미지 생성 오류:', error);
      alert('이미지 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      await downloadSalaryPDF(salaryData);
    } catch (error) {
      console.error('PDF 다운로드 오류:', error);
      alert('PDF 다운로드 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareToKakao = async () => {
    setIsSharing(true);
    try {
      await shareToKakao(salaryData);
    } catch (error) {
      console.error('공유 오류:', error);
      alert('공유 중 오류가 발생했습니다.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          급여계산 결과
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          ← 뒤로가기
        </button>
      </div>

      {/* 근로자 정보 */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          {salaryData.workPeriod.split('~')[0].split('.')[0]}년 {String(Number(salaryData.workPeriod.split('~')[0].split('.')[1]) + 1).padStart(2, '0')}월 급여명세서
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">성명:</span>
            <span className="ml-2 text-gray-900">{salaryData.employeeName}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">근무기간:</span>
            <span className="ml-2 text-gray-900">{salaryData.workPeriod}</span>
          </div>
        </div>
        {salaryData.remarks && (
          <div className="mt-3 pt-3 border-t border-blue-200">
            <span className="font-medium text-gray-700">비고:</span>
            <span className="ml-2 text-gray-900">{salaryData.remarks}</span>
          </div>
        )}
      </div>

      {/* 급여 지급 내역 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4 border-b-2 border-blue-500 pb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            급여 지급 내역
          </h3>
          <span className="text-sm text-gray-600">(단위: 원)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-3 py-3 text-center font-medium text-gray-700 text-sm">근무일자</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-700 text-sm">
                  <div>근무일수</div>
                </th>
                <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-700 text-sm">
                  <div>근무시간</div>
                </th>
                <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-700 text-sm">시급</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-700 text-sm">급여액수</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-700 text-sm">주휴수당</th>
                {salaryData.bonus > 0 && (
                  <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-700 text-sm">상여금</th>
                )}
                <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-700 text-sm">합계</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-3 text-center text-sm">{salaryData.workPeriod}</td>
                <td className="border border-gray-300 px-2 py-3 text-center text-sm">{salaryData.workDays}일</td>
                <td className="border border-gray-300 px-2 py-3 text-center text-sm">{salaryData.workHours}시간</td>
                <td className="border border-gray-300 px-2 py-3 text-center text-sm">{salaryData.hourlyWage.toLocaleString()}</td>
                <td className="border border-gray-300 px-2 py-3 text-center text-sm">{salaryData.baseSalary.toLocaleString()}</td>
                <td className="border border-gray-300 px-2 py-3 text-center text-sm">{salaryData.weeklyHolidayAllowance.toLocaleString()}</td>
                {salaryData.bonus > 0 && (
                  <td className="border border-gray-300 px-2 py-3 text-center text-sm">{salaryData.bonus.toLocaleString()}</td>
                )}
                <td className="border border-gray-300 px-2 py-3 text-center text-sm font-bold text-red-600">
                  {salaryData.totalSalary.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 공제 및 실지급액 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b-2 border-red-500 pb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            공제 및 실지급액
          </h3>
          <span className="text-sm text-gray-600">(단위: 원)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-700 text-sm">원천징수율</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-700 text-sm">소득세</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-700 text-sm">농어촌세</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-700 text-sm">징수 금액</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-700 text-sm">실 지급 금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 text-center text-sm">3.30%</td>
                <td className="border border-gray-300 px-2 py-3 text-center text-sm">{salaryData.incomeTax.toLocaleString()}</td>
                <td className="border border-gray-300 px-2 py-3 text-center text-sm">{salaryData.ruralTax.toLocaleString()}</td>
                <td className="border border-gray-300 px-2 py-3 text-center text-sm">{salaryData.totalDeduction.toLocaleString()}</td>
                <td className="border border-gray-300 px-2 py-3 text-center text-sm font-bold text-green-600">
                  {salaryData.netPayment.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 요약 정보 */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatKRW(salaryData.totalSalary)}
            </div>
            <div className="text-sm text-gray-600">총 급여</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {formatKRW(salaryData.totalDeduction)}
            </div>
            <div className="text-sm text-gray-600">공제액</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatKRW(salaryData.netPayment)}
            </div>
            <div className="text-sm text-gray-600">실지급액</div>
          </div>
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleGenerateImage}
          disabled={isGenerating}
          className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? '이미지 생성 중...' : '📷 이미지 생성'}
        </button>
        
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'PDF 생성 중...' : '📄 PDF 다운로드'}
        </button>
        
        <button
          onClick={handleShareToKakao}
          disabled={isSharing}
          className="flex-1 bg-yellow-500 text-white py-3 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSharing ? '공유 중...' : '💬 카카오톡 공유'}
        </button>
      </div>

      {/* 공유 안내사항 */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-md">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">💡 공유 기능 안내</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 이미지 생성: 급여명세서를 PNG 이미지로 변환합니다</li>
          <li>• PDF 다운로드: 급여명세서를 PDF 파일로 다운로드합니다</li>
          <li>• 카카오톡 공유: 모바일에서 카카오톡으로 이미지를 공유합니다</li>
          <li>• PC에서는 이미지 다운로드로 대체됩니다</li>
        </ul>
      </div>
    </div>
  );
}
