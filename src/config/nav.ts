import { Binary, Calculator, Palette, FileJson } from "lucide-react";

export type SiteConfig = (typeof SITE_MENU)[number];

export const SITE_MENU = [
  {
    id: "binary",
    title: "진법 변환기",
    href: "/tools/base",
    description:
      "2진수, 8진수, 16진수를 실시간으로 변환하고 비트 패턴을 분석합니다.",
    icon: Binary,
    status: "active",
  },
  {
    id: "complement",
    title: "2의 보수 계산기",
    href: "/tools/twos",
    description:
      "컴퓨터 내부의 음수 표현 방식인 2의 보수(2's Complement)를 계산합니다.",
    icon: Calculator,
    status: "active",
  },
  {
    id: "hex-color",
    title: "HEX 색상 추출기",
    href: "/tools/color",
    description: "RGB 값을 16진수 색상 코드로 변환하거나 반대로 계산합니다.",
    icon: Palette,
    status: "active",
  },
] as const;
