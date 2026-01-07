import { BaseConverter } from "@/components/tools/base-converter";

export const metadata = {
  title: "진법 변환기 - BitBox",
  description: "2진수, 8진수, 10진수, 16진수를 실시간으로 상호 변환합니다.",
};

export default function BasePage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 space-y-2 text-center">
        {/* 페이지 타이틀 & 설명 섹션 */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          진법 변환기
        </h1>
        <p className="text-slate-500">
          하나의 입력창에 값을 넣으면 2진수, 8진수, 10진수, 16진수로 자동
          변환됩니다.
        </p>
      </div>

      {/* 통합 변환기 컴포넌트 배치 */}
      <BaseConverter />
    </div>
  );
}
