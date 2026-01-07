import type { Metadata } from "next";
import { TwosCalculator } from "@/components/tools/twos-calculator";

export const metadata: Metadata = {
  title: "2의 보수 계산기",
  description:
    "음수 표현을 위한 2의 보수(Two's Complement) 변환기. 4/8/16/32비트 모드를 지원합니다.",
};

export default function TwosPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          2의 보수 계산기
        </h1>
        <p className="text-slate-500">
          컴퓨터가 음수를 저장하는 방식인 2의 보수 형태를 확인해보세요.
        </p>
      </div>

      <TwosCalculator />
    </div>
  );
}
