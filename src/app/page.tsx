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
import { SITE_MENU } from "@/config/nav";
import { cn } from "@/lib/utils";

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
        {SITE_MENU.map((tool) => (
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
                    className={cn(
                      "rounded-lg p-2 transition-colors",
                      // ✅ 상태에 따라 배경색 자동 변경
                      tool.status === "active" ? "bg-blue-50" : "bg-slate-100"
                    )}
                  >
                    {/* ✅ 아이콘 색상도 상태에 따라 자동 변경 (iconColor 변수 삭제됨) */}
                    <tool.icon
                      className={cn(
                        "h-8 w-8",
                        tool.status === "active"
                          ? "text-blue-600"
                          : "text-slate-400"
                      )}
                    />
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
