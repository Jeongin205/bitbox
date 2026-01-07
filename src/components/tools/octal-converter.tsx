"use client";

import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CopyInput } from "@/components/copy-input";
import { ToolHeader } from "@/components/tools/tool-header";

export function OctalConverter() {
  const [decimal, setDecimal] = useState("");
  const [octal, setOctal] = useState("");

  const handleReset = () => {
    setDecimal("");
    setOctal("");
  };

  const handleDecimalChange = (value: string) => {
    setDecimal(value);
    if (!value) {
      setOctal("");
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setOctal(num.toString(8));
    }
  };

  const handleOctalChange = (value: string) => {
    if (value && !/^[0-7]*$/.test(value)) {
      toast.error("8진수는 0부터 7까지의 숫자만 사용할 수 있어요!");
      return;
    }
    setOctal(value);
    if (!value) {
      setDecimal("");
      return;
    }
    const num = parseInt(value, 8);
    if (!isNaN(num)) {
      setDecimal(num.toString(10));
    }
  };

  return (
    <Card className="border-0 shadow-sm ring-1 ring-slate-200 sm:border sm:ring-0">
      <ToolHeader
        title="8진수 변환"
        icon={ArrowRightLeft}
        iconClassName="text-emerald-600"
        onReset={handleReset}
      />
      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <Label htmlFor="dec-oct">Decimal (10진수)</Label>
          <CopyInput
            id="dec-oct"
            type="number"
            value={decimal}
            onValueChange={handleDecimalChange}
            placeholder="예: 64"
            copyLabel="10진수"
            className="focus-visible:ring-emerald-500"
            iconClassName="hover:text-emerald-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="octal" className="text-emerald-600">
            Octal (8진수)
          </Label>
          <CopyInput
            id="octal"
            value={octal}
            onValueChange={handleOctalChange}
            placeholder="예: 100"
            copyLabel="8진수"
            className="border-emerald-200 bg-emerald-50/50 text-emerald-900 focus-visible:ring-emerald-500"
            iconClassName="hover:text-emerald-600"
          />
          <p className="text-right text-xs text-slate-400">
            * 0~7 사이의 숫자만 입력 가능합니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
