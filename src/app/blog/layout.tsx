import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "급여계산 블로그 - 근로기준법과 급여계산 전문 정보",
  description: "근로기준법에 따른 급여계산 방법, 수당 계산법, 근로자 권리 보호 등 전문적인 정보를 제공하는 블로그입니다.",
  keywords: ["급여계산", "근로기준법", "주휴수당", "초과근무수당", "야간근무수당", "최저임금", "근로자권리"],
  openGraph: {
    title: "급여계산 블로그 - 근로기준법과 급여계산 전문 정보",
    description: "근로기준법에 따른 급여계산 방법, 수당 계산법, 근로자 권리 보호 등 전문적인 정보를 제공합니다.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "급여계산 블로그 - 근로기준법과 급여계산 전문 정보",
    description: "근로기준법에 따른 급여계산 방법, 수당 계산법, 근로자 권리 보호 등 전문적인 정보를 제공합니다.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
