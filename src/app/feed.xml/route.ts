import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://pay-mgmt.vercel.app' // 실제 도메인으로 변경하세요
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>급여계산 프로그램 - 근로기준법에 따른 자동 계산</title>
    <description>간단한 입력으로 급여명세를 자동 계산하고, 이미지나 PDF로 다운로드하여 카카오톡으로 공유할 수 있습니다.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    
    <item>
      <title>급여계산 프로그램 출시</title>
      <description>근로기준법에 따른 자동 급여계산 및 급여명세서 생성 프로그램이 출시되었습니다.</description>
      <link>${baseUrl}</link>
      <guid>${baseUrl}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    
    <item>
      <title>급여명세서 자동 생성 기능</title>
      <description>월, 성명, 시급만 입력하면 근무일수, 주휴수당, 세금공제까지 자동으로 계산하여 급여명세서를 생성합니다.</description>
      <link>${baseUrl}</link>
      <guid>${baseUrl}#features</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    
    <item>
      <title>카카오톡 공유 및 PDF 다운로드</title>
      <description>생성된 급여명세서를 이미지로 변환하여 카카오톡으로 공유하거나 PDF로 다운로드할 수 있습니다.</description>
      <link>${baseUrl}</link>
      <guid>${baseUrl}#sharing</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
