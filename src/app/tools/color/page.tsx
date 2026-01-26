import { HexColorConverter } from "@/components/tools/hex-color-converter";

export const metadata = {
  title: "HEX 색상 추출기 - ToolBitBox",
  description:
    "RGB 값을 조절하여 웹에서 사용하는 16진수(Hex) 색상 코드를 생성합니다.",
};

export default function ColorPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 space-y-2 text-center">
        {/* 페이지 타이틀 & 설명 섹션 */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          HEX 색상 추출기
        </h1>
        <p className="text-slate-500">
          슬라이더를 움직여 색상을 만들고 Hex 코드를 복사하세요.
        </p>
      </div>

      {/* 통합 변환기 컴포넌트 배치 */}

      <HexColorConverter />
    </div>
  );
}
