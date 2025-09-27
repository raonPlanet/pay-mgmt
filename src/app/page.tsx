'use client';
/* 메인 컨텐츠 */
import React, { useState } from 'react';
import SalaryInputForm from '@/components/SalaryInputForm';
import SalaryResult from '@/components/SalaryResult';
import { SalaryCalculation, calculateSalary } from '@/lib/salaryCalculator';

export default function Home() {
  const [salaryData, setSalaryData] = useState<SalaryCalculation | null>(null);

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            💰 급여명세서 9월 💰
          </h1>
          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            간단한 입력으로 급여명세를 자동 계산하고, 이미지나 PDF로 다운로드하여 
            카카오톡으로 공유할 수 있습니다.
          </p> */}
        </div>

        {/* 메인 컨텐츠 */}
        {salaryData ? (
          <SalaryResult salaryData={salaryData} onBack={handleBack} />
        ) : (
          <SalaryInputForm onCalculate={handleCalculate} />
        )}

        {/* 푸터 */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2025 급여계산 프로그램 </p>
          {/* <p>© 2025 급여계산 프로그램 - 근로기준법에 따른 자동 계산</p>
          <p className="mt-2">
            주휴수당, 세금공제 등 모든 계산이 자동으로 이루어집니다
          </p> */}
        </footer>
      </div>
    </main>
  );
}
