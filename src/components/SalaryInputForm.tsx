'use client';

import React, { useState, useEffect } from 'react';
import { calculateWorkDays } from '@/lib/salaryCalculator';

interface SalaryInputFormProps {
  onCalculate: (data: {
    year: number;
    month: number;
    employeeName: string;
    workDays: number;
    workHours: number; // extraHours 대신 workHours로 변경
    hourlyWage: number;
    weeklyHolidayAllowance: number;
    bonus: number;
    remarks: string;
  }) => void;
}

export default function SalaryInputForm({ onCalculate }: SalaryInputFormProps) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [employeeName, setEmployeeName] = useState('홍길동');
  // 근무일수는 자동계산, 시급과 주휴수당은 초기값으로 설정
  const [workDays, setWorkDays] = useState(0);
  const [workHours, setWorkHours] = useState(0); // extraHours 대신 workHours 사용
  const [hourlyWage, setHourlyWage] = useState(11000);
  const [weeklyHolidayAllowance, setWeeklyHolidayAllowance] = useState(2200);
  const [hasBonus, setHasBonus] = useState(false);
  const [bonus, setBonus] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Set<number>>(new Set());

  // 년도나 월이 변경될 때마다 근무일수 자동계산 및 선택된 날짜 초기화
  useEffect(() => {
    const calculatedWorkDays = calculateWorkDays(year, month);
    setWorkDays(calculatedWorkDays);
    
    // 해당 월의 월~금 날짜들을 자동으로 선택
    const newSelectedDates = new Set<number>();
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay();
      // 월(1)~금(5)인 경우만 선택
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        newSelectedDates.add(date.getDate());
      }
    }
    
    setSelectedDates(newSelectedDates);
  }, [year, month]);

  // 선택된 날짜 수를 근무일수로 설정하고 근무시간도 자동 계산
  useEffect(() => {
    setWorkDays(selectedDates.size);
    setWorkHours(selectedDates.size * 4); // 기본 근무시간으로 설정
  }, [selectedDates]);

  const handleDateToggle = (day: number) => {
    const newSelectedDates = new Set(selectedDates);
    if (newSelectedDates.has(day)) {
      newSelectedDates.delete(day);
    } else {
      newSelectedDates.add(day);
    }
    setSelectedDates(newSelectedDates);
  };

  // 근무시간 증가/감소 함수
  const increaseWorkHours = () => {
    setWorkHours(prev => prev + 1);
  };

  const decreaseWorkHours = () => {
    if (workHours > 0) {
      setWorkHours(prev => prev - 1);
    }
  };

  // 기본 근무시간 계산 (근무일수 × 4시간)
  const baseWorkHours = workDays * 4;
  // 기타가감 시간 (실제 근무시간 - 기본 근무시간)
  const extraHours = workHours - baseWorkHours;

  const getCalendarDays = () => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const daysInMonth = endDate.getDate();
    const firstDayOfWeek = startDate.getDay();
    
    const days = [];
    
    // 첫 주의 빈 칸들
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="w-6 h-6 sm:w-8 sm:h-8"></div>);
    }
    
    // 월의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isSelected = selectedDates.has(day);
      
      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateToggle(day)}
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium transition-colors ${
            isWeekend 
              ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
              : isSelected 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={isWeekend}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      year,
      month,
      employeeName,
      workDays,
      workHours, // extraHours 대신 workHours 전달
      hourlyWage,
      weeklyHolidayAllowance,
      bonus: hasBonus ? bonus : 0,
      remarks
    });
  };

  const handleBonusChange = (checked: boolean) => {
    setHasBonus(checked);
    if (!checked) {
      setBonus(0);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        급여계산 입력
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 년도/월 선택 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              년도
            </label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 2 + i).map((y) => (
                <option key={y} value={y}>{y}년</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
              월
            </label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>{m}월</option>
              ))}
            </select>
          </div>
        </div>

        {/* 성명 입력 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-2">
              성명
            </label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="홍길동"
              required
            />
          </div>
          
          <div>
            <label htmlFor="workDays" className="block text-sm font-medium text-gray-700 mb-2">
              근무일수 (수정가능)
            </label>
            <div className="flex gap-2 relative">
              <input
                type="number"
                id="workDays"
                value={workDays}
                onChange={(e) => setWorkDays(Number(e.target.value))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                placeholder="20"
                min="1"
                max="31"
                required
                onFocus={(e) => e.target.select()}
              />
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                📅
              </button>
            </div>
            
            {/* 달력 드롭다운 */}
            {showCalendar && (
              <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 
                w-[calc(100vw-2rem)] max-w-80 sm:w-80
                left-1/2 transform -translate-x-1/2
                sm:left-auto sm:right-0 sm:transform-none
                mx-auto sm:mx-0
                shadow-xl">
                <div className="text-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {year}년 {month}월
                  </h3>
                  <p className="text-sm text-gray-600">월~금을 클릭하여 근무일 선택/해제</p>
                </div>
                
                {/* 요일 헤더 */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                    <div key={day} className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* 달력 그리드 */}
                <div className="grid grid-cols-7 gap-1">
                  {getCalendarDays()}
                </div>
                
                <div className="mt-3 text-center">
                  <button
                    type="button"
                    onClick={() => setShowCalendar(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 근무시간, 시급, 주휴수당 입력 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 근무시간 (자동계산) */}
          <div>
            <label htmlFor="workHours" className="block text-sm font-medium text-gray-700 mb-2">
              근무시간 (자동계산)
            </label>
            <div className="flex items-center w-full">
              <button
                type="button"
                onClick={decreaseWorkHours}
                className="w-10 h-10 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-bold flex-shrink-0"
              >
                -
              </button>
              <input
                type="number"
                id="workHours"
                value={workHours}
                onChange={(e) => setWorkHours(Number(e.target.value))}
                className="w-[calc(100%-5rem)] px-3 py-2 border-t border-b border-gray-300 bg-gray-200 text-gray-700 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.5"
                required
                onFocus={(e) => e.target.select()}
              />
              <button
                type="button"
                onClick={increaseWorkHours}
                className="w-10 h-10 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-bold flex-shrink-0"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              기본: {baseWorkHours}시간 + 기타가감: {extraHours > 0 ? '+' : ''}{extraHours}시간
            </p>
          </div>
          
          {/* 시급 (수정 가능) */}
          <div>
            <label htmlFor="hourlyWage" className="block text-sm font-medium text-gray-700 mb-2">
              시급 (원)
            </label>
            <input
              type="number"
              id="hourlyWage"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              placeholder="11000"
              min="0"
              step="100"
              required
              onFocus={(e) => e.target.select()}
            />
          </div>
          
          {/* 주휴수당 (수정 가능) */}
          <div>
            <label htmlFor="weeklyHolidayAllowance" className="block text-sm font-medium text-gray-700 mb-2">
              주휴수당 (원)
            </label>
            <input
              type="number"
              id="weeklyHolidayAllowance"
              value={weeklyHolidayAllowance}
              onChange={(e) => setWeeklyHolidayAllowance(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              placeholder="2200"
              min="0"
              step="100"
              required
              onFocus={(e) => e.target.select()}
            />
          </div>
        </div>

        {/* 상여금 체크박스 및 입력 */}
        <div>
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="hasBonus"
              checked={hasBonus}
              onChange={(e) => handleBonusChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hasBonus" className="ml-2 block text-sm font-medium text-gray-700">
              상여금 포함
            </label>
          </div>
          
          {hasBonus && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label htmlFor="bonus" className="block text-sm font-medium text-gray-700 mb-2">
                  상여금 (원)
                </label>
                <input
                  type="number"
                  id="bonus"
                  value={bonus}
                  onChange={(e) => setBonus(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  placeholder="상여금 금액을 입력하세요"
                  min="0"
                  step="1000"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-2">
                  비고
                </label>
                <input
                  type="text"
                  id="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="추가 비고사항을 입력하세요"
                />
              </div>
            </div>
          )}
        </div>

        {/* 계산 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          급여 계산하기
        </button>
      </form>

      {/* 안내사항 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-2">💡 안내사항</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 근무일수는 주말과 공휴일을 제외하여 자동 계산됩니다</li>
          <li>• 하루 근무시간은 4시간으로 계산됩니다</li>
          <li>• 근무시간은 +/- 버튼으로 조정하거나 직접 입력할 수 있습니다</li>
          <li>• 시급과 주휴수당은 필요에 따라 수정할 수 있습니다</li>
          <li>• 소득세는 3.3%, 농어촌세는 소득세의 10%로 계산됩니다</li>
          <li>• 📅 버튼을 클릭하여 개별 근무일을 선택/해제할 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
}
