"use client";

import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CopyInput } from "@/components/copy-input";
import { BinaryInput } from "@/components/tools/binary-input";
import { ToolHeader } from "@/components/tools/tool-header";

export function BinaryConverter() {
  const [dec, setDec] = useState("");
  const [bin, setBin] = useState("");

  const handleReset = () => {
    setDec("");
    setBin("");
  };

  // 10진수 입력 시
  const handleDecChange = (value: string) => {
    setDec(value);
    if (!value) {
      setBin("");
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setBin(num.toString(2));
    }
  };

  // 2진수 입력 시
  const handleBinChange = (rawValue: string) => {
    setBin(rawValue);
    if (!rawValue) {
      setDec("");
      return;
    }
    const num = parseInt(rawValue, 2);
    if (!isNaN(num)) {
      setDec(num.toString(10));
    }
  };

  return (
    <Card className="border-0 shadow-sm ring-1 ring-slate-200 sm:border sm:ring-0">
      <ToolHeader
        title="2진수 변환"
        icon={ArrowRightLeft}
        iconClassName="text-blue-600"
        onReset={handleReset}
      />
      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <Label htmlFor="dec-bin">Decimal (10진수)</Label>
          <CopyInput
            id="dec-bin"
            type="number"
            value={dec}
            onValueChange={handleDecChange}
            placeholder="예: 255"
            copyLabel="10진수"
          />
        </div>
        <BinaryInput
          value={bin}
          onChange={handleBinChange}
          label="Binary (2진수)"
          placeholder="예: 11111111"
        />
      </CardContent>
    </Card>
  );
}
