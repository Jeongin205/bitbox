"use client";

import { RefreshCcw, LucideIcon } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolHeaderProps {
  title: string; // 도구 이름 (예: 2진수 변환)
  icon: LucideIcon; // 아이콘 컴포넌트 (예: ArrowRightLeft)
  iconClassName?: string; // 아이콘 색상 (예: text-blue-600)
  onReset: () => void; // 초기화 버튼 눌렀을 때 실행할 함수
}

export function ToolHeader({
  title,
  icon: Icon,
  iconClassName,
  onReset,
}: ToolHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-slate-50/50 pb-4">
      <CardTitle className="flex items-center gap-2 text-lg">
        <Icon className={cn("h-5 w-5", iconClassName)} />
        {title}
      </CardTitle>

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="h-8 px-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
      >
        <RefreshCcw className="mr-2 h-3.5 w-3.5" />
        초기화
      </Button>
    </CardHeader>
  );
}
