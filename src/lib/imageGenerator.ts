/**
 * 급여명세서를 이미지로 변환하고 PDF로 다운로드하는 유틸리티
 */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { SalaryCalculation } from './salaryCalculator';

/**
 * 급여명세서를 이미지로 변환하고 다운로드합니다
 */
export async function generateSalaryImage(salaryData: SalaryCalculation): Promise<void> {
  try {
    // 임시 DOM 요소 생성
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = generateSalaryHTML(salaryData);
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '800px';
    tempDiv.style.backgroundColor = '#ffffff';
    document.body.appendChild(tempDiv);

    const canvas = await html2canvas(tempDiv, {
      width: 800,
      height: 600,
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: true
    });

    // 이미지 다운로드
    const link = document.createElement('a');
    const fileName = `${salaryData.employeeName}_${salaryData.workPeriod.split('~')[0].trim()}_급여명세서.png`;
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 임시 요소 제거
    document.body.removeChild(tempDiv);
  } catch (error) {
    console.error('이미지 생성 오류:', error);
    throw error;
  }
}

/**
 * 급여명세서를 PDF로 다운로드합니다
 */
export async function downloadSalaryPDF(salaryData: SalaryCalculation): Promise<void> {
  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = generateSalaryHTML(salaryData);
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '800px';
    tempDiv.style.backgroundColor = '#ffffff';
    document.body.appendChild(tempDiv);

    const canvas = await html2canvas(tempDiv, {
      width: 800,
      height: 600,
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // PDF 파일명을 익월로 표시하도록 수정
    const workPeriodStart = salaryData.workPeriod.split('~')[0].trim();
    const year = workPeriodStart.split('.')[0];
    const month = parseInt(workPeriodStart.split('.')[1]);
    const nextMonth = month + 1;
    const fileName = `${salaryData.employeeName}_${year}년${String(nextMonth).padStart(2, '0')}월_급여명세서.pdf`;
    pdf.save(fileName);
    
    // 임시 요소 제거
    document.body.removeChild(tempDiv);
  } catch (error) {
    console.error('PDF 생성 오류:', error);
    throw error;
  }
}

/**
 * 급여명세서 HTML을 생성합니다 (이미지 변환용)
 */
function generateSalaryHTML(salaryData: SalaryCalculation): string {
  // 월 표시를 익월로 변경
  const workPeriodStart = salaryData.workPeriod.split('~')[0].trim();
  const year = workPeriodStart.split('.')[0];
  const month = parseInt(workPeriodStart.split('.')[1]);
  const nextMonth = month + 1;
  
  return `
    <div style="
      font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
      width: 800px;
      padding: 40px;
      background: white;
      color: #333;
    ">
      <!-- 제목 -->
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 28px; font-weight: bold; color: #2c3e50; margin: 0;">
          ${year}년 ${String(nextMonth).padStart(2, '0')}월 급여명세서
        </h1>
      </div>

      <!-- 근로자 정보 -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 18px; color: #34495e; margin-bottom: 15px;">성명: ${salaryData.employeeName}</h2>
      </div>

      <!-- 급여 지급 내역 테이블 -->
      <div style="margin-bottom: 40px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 2px solid #3498db; padding-bottom: 5px;">
          <h3 style="font-size: 16px; color: #2c3e50; margin: 0;">급여 지급 내역</h3>
          <span style="font-size: 14px; color: #7f8c8d;">(단위: 원)</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">근무일자</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">근무일수</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">근무시간</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">시급</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">급여액수</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">주휴수당</th>
              ${salaryData.bonus > 0 ? '<th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">상여금</th>' : ''}
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">합계</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${salaryData.workPeriod}</td>
                             <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${salaryData.workDays}일</td>
                               <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">
                  ${salaryData.workHours}시간
                  ${salaryData.extraHours !== 0 ? `<br><span style="font-size: 11px; color: #7f8c8d;">(기타가감: ${salaryData.extraHours > 0 ? '+' : ''}${salaryData.extraHours}시간)</span>` : ''}
                </td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${salaryData.hourlyWage.toLocaleString()}</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${salaryData.baseSalary.toLocaleString()}</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${salaryData.weeklyHolidayAllowance.toLocaleString()}</td>
              ${salaryData.bonus > 0 ? `<td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${salaryData.bonus.toLocaleString()}</td>` : ''}
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold; color: #e74c3c;">
                ${salaryData.totalSalary.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 공제 및 실지급액 테이블 -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">
          <h3 style="font-size: 16px; color: #2c3e50; margin: 0;">공제 및 실지급액</h3>
          <span style="font-size: 14px; color: #7f8c8d;">(단위: 원)</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">원천징수율</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">소득세</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">농어촌세</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">징수 금액</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold;">실 지급 금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">3.30%</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${salaryData.incomeTax.toLocaleString()}</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${salaryData.ruralTax.toLocaleString()}</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${salaryData.totalDeduction.toLocaleString()}</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center; font-weight: bold; color: #27ae60;">
                ${salaryData.netPayment.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 하단 정보 -->
      <div style="margin-top: 30px; text-align: center; color: #7f8c8d; font-size: 14px;">
        <p>본 명세서는 자동 계산 프로그램으로 생성되었습니다.</p>
        <p>생성일시: ${new Date().toLocaleDateString('ko-KR')}</p>
      </div>
    </div>
  `;
}

/**
 * 카카오톡 공유를 위한 이미지 다운로드 및 공유 기능
 */
export async function shareToKakao(salaryData: SalaryCalculation): Promise<void> {
  try {
    // 모바일과 PC를 구분하여 처리
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // 모바일: 이미지 생성 후 공유 시도
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generateSalaryHTML(salaryData);
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.width = '800px';
      tempDiv.style.backgroundColor = '#ffffff';
      document.body.appendChild(tempDiv);

      try {
        const canvas = await html2canvas(tempDiv, {
          width: 800,
          height: 600,
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false,
          useCORS: true,
          allowTaint: true
        });

        // 월 표시를 익월로 변경하여 공유 텍스트에도 반영
        const workPeriodStart = salaryData.workPeriod.split('~')[0].trim();
        const year = workPeriodStart.split('.')[0];
        const month = parseInt(workPeriodStart.split('.')[1]);
        const nextMonth = month + 1;
        
        // Web Share API 사용 (모바일에서 실제 파일 공유)
        if (navigator.share && navigator.canShare) {
          try {
            // Canvas를 Blob으로 변환
            const blob = await new Promise<Blob>((resolve) => {
              canvas.toBlob((blob) => resolve(blob!), 'image/png');
            });
            
            // File 객체 생성
            const fileName = `${salaryData.employeeName}_${year}년${String(nextMonth).padStart(2, '0')}월_급여명세서.png`;
            const file = new File([blob], fileName, { type: 'image/png' });
            
            // 공유 데이터 준비
            const shareData: {
              title: string;
              text: string;
              files: File[];
            } = {
              title: `${salaryData.employeeName} 급여명세서`,
              text: `${year}년 ${String(nextMonth).padStart(2, '0')}월 급여명세서입니다.`,
              files: [file]
            };
            
            // 공유 가능한지 확인
            if (navigator.canShare(shareData)) {
              await navigator.share(shareData);
              return; // 공유 성공 시 함수 종료
            }
          } catch (shareError) {
            console.log('Web Share API 실패, 다른 방법 시도:', shareError);
          }
        }
        
        // Web Share API가 실패하거나 지원되지 않는 경우
        // 이미지를 새 창에서 열어서 사용자가 직접 저장/공유할 수 있도록 함
        const imageData = canvas.toDataURL('image/png');
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <title>${salaryData.employeeName} 급여명세서</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { 
                    margin: 0; 
                    padding: 20px; 
                    background: #f5f5f5; 
                    font-family: Arial, sans-serif; 
                  }
                  .container { 
                    max-width: 600px; 
                    margin: 0 auto; 
                    background: white; 
                    padding: 20px; 
                    border-radius: 10px; 
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
                  }
                  .image-container { 
                    text-align: center; 
                    margin: 20px 0; 
                  }
                  img { 
                    max-width: 100%; 
                    height: auto; 
                    border: 1px solid #ddd; 
                    border-radius: 5px; 
                  }
                  .button { 
                    display: inline-block; 
                    padding: 12px 24px; 
                    margin: 10px; 
                    background: #007bff; 
                    color: white; 
                    text-decoration: none; 
                    border-radius: 5px; 
                    font-weight: bold; 
                  }
                  .button:hover { 
                    background: #0056b3; 
                  }
                  .instructions { 
                    background: #e7f3ff; 
                    padding: 15px; 
                    border-radius: 5px; 
                    margin: 20px 0; 
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>${salaryData.employeeName} 급여명세서</h1>
                  <div class="instructions">
                    <h3>📱 모바일에서 공유하는 방법:</h3>
                    <ol>
                      <li>이미지를 길게 눌러 "이미지 저장" 선택</li>
                      <li>저장된 이미지를 카카오톡으로 전송</li>
                      <li>또는 이미지를 길게 눌러 "공유" 선택 후 카카오톡 선택</li>
                    </ol>
                  </div>
                  <div class="image-container">
                    <img src="${imageData}" alt="급여명세서" />
                  </div>
                  <div style="text-align: center;">
                    <a href="${imageData}" download="${salaryData.employeeName}_${year}년${String(nextMonth).padStart(2, '0')}월_급여명세서.png" class="button">
                      📥 이미지 다운로드
                    </a>
                  </div>
                </div>
              </body>
            </html>
          `);
          newWindow.document.close();
        }
        
      } finally {
        document.body.removeChild(tempDiv);
      }
      
    } else {
      // PC: 이미지 다운로드
      await generateSalaryImage(salaryData);
    }
  } catch (error) {
    console.error('카카오톡 공유 중 오류 발생:', error);
    alert('공유 기능을 사용할 수 없습니다. 이미지를 다운로드합니다.');
    
    // 오류 발생 시 PDF 다운로드로 대체
    await downloadSalaryPDF(salaryData);
  }
}
