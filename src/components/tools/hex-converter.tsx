"use client";

import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CopyInput } from "@/components/copy-input";
import { ToolHeader } from "@/components/tools/tool-header";

export function HexConverter() {
  const [decimal, setDecimal] = useState("");
  const [hex, setHex] = useState("");

  const handleReset = () => {
    setDecimal("");
    setHex("");
  };

  // 10진수 입력 핸들러
  const handleDecimalChange = (value: string) => {
    setDecimal(value);
    if (!value) {
      setHex("");
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setHex(num.toString(16).toUpperCase()); // 16진수는 대문자가 국룰
    }
  };

  // 16진수 입력 핸들러 (0-9, A-F)
  const handleHexChange = (value: string) => {
    // 정규식: 0-9, a-f, A-F 만 허용
    if (value && !/^[0-9a-fA-F]*$/.test(value)) {
      toast.error("16진수는 0~9와 A~F만 입력할 수 있어요!");
      return;
    }

    setHex(value.toUpperCase()); // 입력 즉시 대문자로 변환

    if (!value) {
      setDecimal("");
      return;
    }
    const num = parseInt(value, 16);
    if (!isNaN(num)) {
      setDecimal(num.toString(10));
    }
  };

  return (
    <Card className="border-0 shadow-sm ring-1 ring-slate-200 sm:border sm:ring-0">
      <ToolHeader
        title="16진수 변환"
        icon={ArrowRightLeft}
        iconClassName="text-violet-600"
        onReset={handleReset}
      />
      <CardContent className="space-y-6 p-6">
        {/* 10진수 입력 */}
        <div className="space-y-3">
          <Label htmlFor="dec-hex">Decimal (10진수)</Label>
          <CopyInput
            id="dec-hex"
            type="number"
            value={decimal}
            onValueChange={handleDecimalChange}
            placeholder="예: 255"
            copyLabel="10진수"
            className="focus-visible:ring-violet-500"
            iconClassName="hover:text-violet-600" // 복사 버튼도 보라색
          />
        </div>

        {/* 16진수 입력 */}
        <div className="space-y-2">
          <Label htmlFor="hex" className="text-violet-600">
            Hexadecimal (16진수)
          </Label>
          <CopyInput
            id="hex"
            type="text"
            value={hex}
            onValueChange={handleHexChange}
            placeholder="예: FF"
            copyLabel="16진수"
            className="border-violet-200 bg-violet-50/50 text-violet-900 focus-visible:ring-violet-500"
            iconClassName="hover:text-violet-600"
          />
          <p className="text-right text-xs text-slate-400">
            * A~F는 자동으로 대문자로 변환됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
