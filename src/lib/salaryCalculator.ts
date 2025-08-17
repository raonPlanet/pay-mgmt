/**
 * 급여계산 관련 유틸리티 함수들
 */

// 한국 공휴일 데이터 (2025년 기준)
const HOLIDAYS_2025 = [
  '2025-01-01', // 신정
  '2025-02-09', // 설날
  '2025-02-10', // 설날
  '2025-02-11', // 설날
  '2025-03-01', // 삼일절
  '2025-05-05', // 어린이날
  '2025-05-12', // 부처님 오신 날
  '2025-06-06', // 현충일
  '2025-08-15', // 광복절
  '2025-10-03', // 개천절
  '2025-10-09', // 한글날
  '2025-12-25', // 크리스마스
];

/**
 * 특정 월의 근무일수를 계산합니다 (주말과 공휴일 제외)
 */
export function calculateWorkDays(year: number, month: number): number {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  let workDays = 0;
  
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const dayOfWeek = date.getDay();
    const dateString = date.toISOString().split('T')[0];
    
    // 주말(토,일)이 아니고 공휴일이 아닌 경우만 카운트
    if (dayOfWeek !== 0 && dayOfWeek !== 6 && !HOLIDAYS_2025.includes(dateString)) {
      workDays++;
    }
  }
  
  return workDays;
}

/**
 * 급여계산 결과를 반환합니다
 */
export interface SalaryCalculation {
  employeeName: string;
  workPeriod: string;
  workDays: number;
  workHours: number;
  hourlyWage: number;
  baseSalary: number;
  weeklyHolidayAllowance: number;
  bonus: number;
  totalSalary: number;
  incomeTax: number;
  ruralTax: number;
  totalDeduction: number;
  netPayment: number;
  remarks: string;
}

export function calculateSalary(
  year: number,
  month: number,
  employeeName: string,
  workDays: number,
  hourlyWage: number,
  weeklyHolidayAllowance: number,
  bonus: number = 0,
  remarks: string = ''
): SalaryCalculation {
  const workHours = workDays * 4; // 하루 4시간 근무
  
  // 급여액: 근무시간 × 시급
  const baseSalary = workHours * hourlyWage;
  
  // 주휴수당: 시급 × 8시간 × (근무일수 ÷ 20) (월 기준 비례 계산)
  // 근로기준법 제55조에 따른 주휴수당 계산
  const totalWeeklyHolidayAllowance = Math.floor(hourlyWage * 8 * (workDays / 20));
  
  const totalSalary = baseSalary + totalWeeklyHolidayAllowance + bonus;
  
  // 세금 계산 - 10의 자리에서 버림
  const incomeTax = Math.floor(totalSalary * 0.03 / 10) * 10; // 소득세 3%를 10의 자리에서 버림
  const ruralTax = Math.floor(totalSalary * 0.003 / 10) * 10; // 농어촌세 0.3%를 10의 자리에서 버림
  const totalDeduction = incomeTax + ruralTax;
  
  const netPayment = totalSalary - totalDeduction;
  
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  const workPeriod = `${startDate.getFullYear()}.${String(startDate.getMonth() + 1).padStart(2, '0')}.${String(startDate.getDate()).padStart(2, '0')} ~ ${endDate.getFullYear()}.${String(endDate.getMonth() + 1).padStart(2, '0')}.${String(endDate.getDate()).padStart(2, '0')}`;
  
  return {
    employeeName,
    workPeriod,
    workDays,
    workHours,
    hourlyWage,
    baseSalary,
    weeklyHolidayAllowance: totalWeeklyHolidayAllowance,
    bonus,
    totalSalary,
    incomeTax,
    ruralTax,
    totalDeduction,
    netPayment,
    remarks
  };
}

/**
 * 숫자를 한국 원화 형식으로 포맷팅합니다
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(amount);
}

/**
 * 숫자를 한국 원화 형식으로 포맷팅합니다 (₩ 기호 포함)
 */
export function formatKRW(amount: number): string {
  return `₩ ${amount.toLocaleString('ko-KR')}`;
}
