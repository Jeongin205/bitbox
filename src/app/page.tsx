"use client";

import Link from "next/link";
import {
  ArrowRight,
  Binary,
  Calculator,
  Palette,
  FileJson,
  Lock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 🛠️ 도구 데이터 관리 (나중에 여기에 계속 추가하면 됩니다)
const TOOLS = [
  {
    id: "binary",
    title: "진법 변환기",
    description:
      "2진수, 10진수, 16진수를 실시간으로 변환하고 비트 패턴을 분석합니다.",
    icon: <Binary className="h-8 w-8 text-blue-600" />,
    href: "/tools/binary",
    status: "active", // 활성화 상태
  },
  {
    id: "complement",
    title: "2의 보수 계산기",
    description:
      "컴퓨터 내부의 음수 표현 방식인 2의 보수(2's Complement)를 계산합니다.",
    icon: <Calculator className="h-8 w-8 text-slate-400" />,
    href: "/tools/complement",
    status: "coming-soon", // 준비 중
  },
  {
    id: "hex-color",
    title: "HEX 색상 추출기",
    description: "RGB 값을 16진수 색상 코드로 변환하거나 반대로 계산합니다.",
    icon: <Palette className="h-8 w-8 text-slate-400" />,
    href: "/tools/color",
    status: "coming-soon",
  },
  {
    id: "json-fmt",
    title: "JSON 포맷터",
    description: "복잡한 JSON 데이터를 보기 좋게 정렬하고 유효성을 검사합니다.",
    icon: <FileJson className="h-8 w-8 text-slate-400" />,
    href: "/tools/json",
    status: "coming-soon",
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* 1. 히어로 섹션 (Hero Section) */}
      <section className="mb-16 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
          개발자를 위한 <span className="text-blue-600">스마트 도구 상자</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          복잡한 계산과 변환 작업을 BitBox에서 한 번에 해결하세요.
          <br className="hidden sm:inline" />
          공학용 계산기보다 빠르고, 일반 검색보다 정확합니다.
        </p>
      </section>

      {/* 2. 도구 그리드 (Tool Grid) */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.id}
            href={tool.status === "active" ? tool.href : "#"}
            className={tool.status !== "active" ? "cursor-not-allowed" : ""}
          >
            <Card
              className={`group relative h-full transition-all hover:shadow-lg ${
                tool.status !== "active"
                  ? "bg-slate-50 opacity-60"
                  : "hover:-translate-y-1 hover:border-blue-200"
              }`}
            >
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`rounded-lg p-2 ${
                      tool.status === "active" ? "bg-blue-50" : "bg-slate-100"
                    }`}
                  >
                    {tool.icon}
                  </div>
                  {tool.status === "coming-soon" && (
                    <Badge
                      variant="secondary"
                      className="bg-slate-200 text-slate-500"
                    >
                      준비 중
                    </Badge>
                  )}
                  {tool.status === "active" && (
                    <ArrowRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-500" />
                  )}
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {tool.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
