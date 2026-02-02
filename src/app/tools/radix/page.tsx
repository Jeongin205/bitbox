import { RadixConverter } from "@/components/tools/radix-converter";
import { ToolPage } from "@/components/tools/tool-page-layout";

export const metadata = {
  title: "진법 변환기 - ToolBitBox",
  description: "2진수, 8진수, 10진수, 16진수를 실시간으로 상호 변환합니다.",
};

export default function RadixPage() {
  return (
    <ToolPage
      title="진법 변환기"
      description="하나의 숫자를 입력하면 모든 진법(2, 8, 10, 16)으로 자동 변환됩니다."
    >
      <RadixConverter />
    </ToolPage>
  );
}
