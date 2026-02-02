import { HexColorConverter } from "@/components/tools/hex-color-converter";
import { ToolPage } from "@/components/tools/tool-page-layout";

export const metadata = {
  title: "HEX 색상 추출기 - ToolBitBox",
  description:
    "RGB 값을 조절하여 웹에서 사용하는 16진수(Hex) 색상 코드를 생성합니다.",
};

export default function ColorPage() {
  return (
    <ToolPage
      title="HEX 색상 추출기"
      description="RGB 값을 조절하거나 HEX 코드를 입력하여 색상을 변환합니다."
    >
      <HexColorConverter />
    </ToolPage>
  );
}
