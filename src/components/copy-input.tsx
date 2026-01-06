"use client";

import * as React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
  copyLabel?: string; // 복사 성공 시 보여줄 이름 (예: "10진수")
}

export function CopyInput({
  value,
  onValueChange,
  copyLabel = "값",
  className,
  type = "text",
  ...props
}: CopyInputProps) {
  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    toast.success(`${copyLabel} 복사 완료!`);
  };

  return (
    <div className="relative">
      <Input
        type={type}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(
          // 🛠️ 스피너 숨김 및 기본 스타일 (h-14 등)
          "h-14 pr-12 text-lg font-mono",
          "focus-visible:ring-2 focus-visible:ring-blue-600 transition-all",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          className
        )}
        {...props}
      />
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 h-10 w-10 text-slate-400 hover:text-blue-600 hover:bg-transparent"
        onClick={handleCopy}
        tabIndex={-1} // 탭 키로 이동 시 버튼은 건너뛰기 (선택 사항)
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">복사</span>
      </Button>
    </div>
  );
}
