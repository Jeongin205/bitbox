"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyInput } from "@/components/copy-input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ColorVariant = "blue" | "orange" | "slate" | "red" | "green";

const COLOR_STYLES: Record<
  ColorVariant,
  {
    input: string;
    checkbox: string;
    label: string;
  }
> = {
  blue: {
    input:
      "border-blue-200 bg-blue-50/50 text-blue-900 focus-visible:ring-blue-500",
    checkbox:
      "data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600",
    label: "text-blue-600",
  },
  orange: {
    input:
      "border-orange-200 bg-orange-50/50 text-orange-900 focus-visible:ring-orange-500",
    checkbox:
      "data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600",
    label: "text-orange-600",
  },
  slate: {
    input:
      "border-slate-200 bg-slate-50/50 text-slate-900 focus-visible:ring-slate-500",
    checkbox:
      "data-[state=checked]:bg-slate-600 data-[state=checked]:border-slate-600",
    label: "text-slate-600",
  },
  red: {
    input:
      "border-red-200 bg-red-50/50 text-red-900 focus-visible:ring-red-500",
    checkbox:
      "data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600",
    label: "text-red-600",
  },
  green: {
    input:
      "border-emerald-200 bg-emerald-50/50 text-emerald-900 focus-visible:ring-emerald-500",
    checkbox:
      "data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600",
    label: "text-emerald-600",
  },
};

interface BinaryInputProps {
  value: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
  variant?: ColorVariant;
  helperText?: React.ReactNode;
}

export function BinaryInput({
  value,
  onChange,
  readOnly = false,
  label = "Binary",
  placeholder = "이진수 입력",
  className,
  variant = "blue",
  helperText,
}: BinaryInputProps) {
  const [useSpacing, setUseSpacing] = useState(true);

  const getDisplayValue = (raw: string) => {
    if (!raw) return "";
    if (!useSpacing) return raw;
    return raw.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleChange = (newValue: string) => {
    if (readOnly || !onChange) return;
    const rawValue = newValue.replace(/\s/g, "");
    if (rawValue && !/^[01]*$/.test(rawValue)) {
      toast.error("2진수는 0과 1만 입력할 수 있어요!");
      return;
    }
    onChange(rawValue);
  };

  const styles = COLOR_STYLES[variant];

  // ✅ 멘트 결정 로직
  // 1. 사용자가 helperText를 직접 넣었으면(null 포함) 그걸 씀
  // 2. 안 넣었으면(undefined) 기존 기본 멘트를 보여줌 (하위 호환성)
  const finalHelperText =
    helperText !== undefined
      ? helperText
      : readOnly
      ? "* 맨 앞 비트(MSB)가 1이면 음수입니다."
      : "* 2진수를 직접 입력할 수도 있습니다.";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className={cn("font-medium", styles.label)}>{label}</Label>

        <div className="flex items-center space-x-2">
          <Checkbox
            id={`spacing-${label}`}
            checked={useSpacing}
            onCheckedChange={(checked) => setUseSpacing(checked as boolean)}
            className={styles.checkbox}
          />
          <Label
            htmlFor={`spacing-${label}`}
            className="text-xs text-slate-500 font-normal cursor-pointer select-none"
          >
            4자리씩 끊어보기
          </Label>
        </div>
      </div>

      <CopyInput
        value={getDisplayValue(value)}
        onValueChange={handleChange}
        readOnly={readOnly}
        placeholder={placeholder}
        copyLabel={label}
        className={cn(
          "font-mono tracking-wider transition-colors",
          styles.input,
          className
        )}
      />

      {finalHelperText && (
        <p className="text-right text-xs text-slate-400">{finalHelperText}</p>
      )}
    </div>
  );
}
