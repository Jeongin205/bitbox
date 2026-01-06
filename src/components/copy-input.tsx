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
  copyLabel?: string;
  iconClassName?: string; // 🎨 새로 추가: 아이콘/버튼 스타일 커스텀
}

export function CopyInput({
  value,
  onValueChange,
  copyLabel = "값",
  className,
  iconClassName, // 받아오기
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
          "h-14 pr-12 text-lg font-mono focus-visible:ring-2 focus-visible:ring-blue-600 transition-all",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          className
        )}
        {...props}
      />
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          "absolute right-2 top-2 h-10 w-10 text-slate-400 hover:bg-transparent",
          // 만약 iconClassName이 없으면 기본값(blue) 사용, 있으면 그거 사용
          iconClassName || "hover:text-blue-600"
        )}
        onClick={handleCopy}
        tabIndex={-1}
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">복사</span>
      </Button>
    </div>
  );
}
