'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SalaryInputForm from '@/components/SalaryInputForm';
import SalaryResult from '@/components/SalaryResult';
import { SalaryCalculation, calculateSalary } from '@/lib/salaryCalculator';
import { getRecentPosts } from '@/data/blogPosts';

export default function Home() {
  const [salaryData, setSalaryData] = useState<SalaryCalculation | null>(null);
  const recentPosts = getRecentPosts(3);

  const handleCalculate = (data: {
    year: number;
    month: number;
    employeeName: string;
    workDays: number;
    workHours: number; // extraHours 대신 workHours 사용
    hourlyWage: number;
    weeklyHolidayAllowance: number;
    bonus: number;
    remarks: string;
  }) => {
    const result = calculateSalary(
      data.year,
      data.month,
      data.employeeName,
      data.workDays,
      data.workHours, // extraHours 대신 workHours 전달
      data.hourlyWage,
      data.weeklyHolidayAllowance,
      data.bonus,
      data.remarks
    );
    setSalaryData(result);
  };

  const handleBack = () => {
    setSalaryData(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            💰 급여명세서 💰
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            간단한 입력으로 급여명세를 자동 계산하고, 이미지나 PDF로 다운로드하여 
            카카오톡으로 공유할 수 있습니다.
          </p>
          
          {/* 가이드 링크 */}
          <div className="flex justify-center gap-4 mb-6">
            <Link 
              href="/guide"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              📚 급여계산 가이드
            </Link>
            <a 
              href="https://www.moel.go.kr/info/lawinfo/guide/guide.jsp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              🔗 근로기준법 정보
            </a>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        {salaryData ? (
          <SalaryResult salaryData={salaryData} onBack={handleBack} />
        ) : (
          <SalaryInputForm onCalculate={handleCalculate} />
        )}

        {/* 최신 블로그 포스트 섹션 */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              📚 최신 급여계산 정보
            </h2>
            <Link 
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              모든 포스트 보기 →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.readTime}분 읽기
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    자세히 보기 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 정보성 콘텐츠 섹션 */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            💡 급여계산에 대한 유용한 정보
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                🕒 근로시간과 수당
              </h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 주 40시간 초과 근무 시 50% 가산 수당</li>
                <li>• 야간근무(22시~06시) 시 50% 가산 수당</li>
                <li>• 휴일근무 시 별도 수당 지급</li>
                <li>• 주휴수당은 주 15시간 이상 근무 시 지급</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                📋 공제사항과 세금
              </h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 소득세, 지방소득세</li>
                <li>• 국민연금보험료 (4.5%)</li>
                <li>• 건강보험료 (3.545%)</li>
                <li>• 고용보험료 (0.8%)</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Link 
              href="/guide"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              자세한 가이드 보기
            </Link>
          </div>
        </div>

        {/* 푸터 */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2025 급여계산 프로그램 - 근로기준법에 따른 자동 계산</p>
          <p className="mt-2">
            주휴수당, 세금공제 등 모든 계산이 자동으로 이루어집니다
          </p>
        </footer>
      </div>
    </main>
  );
}
