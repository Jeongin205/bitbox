"use client";

import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CopyInput } from "@/components/copy-input";

export function BinaryConverter() {
  const [dec, setDec] = useState("");
  const [bin, setBin] = useState("");

  const handleDecChange = (value: string) => {
    setDec(value);
    if (!value) {
      setBin("");
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      const binaryStr = num.toString(2);
      const formattedBin = binaryStr.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
      setBin(formattedBin);
    }
  };

  const handleBinChange = (value: string) => {
    const rawValue = value.replace(/\s/g, "");

    if (rawValue && !/^[01]*$/.test(rawValue)) {
      toast.error("2진수는 0과 1만 입력할 수 있어요!");
      setBin(value);
      return;
    }
    setBin(value);
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
      <CardHeader className="bg-slate-50/50 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ArrowRightLeft className="h-4 w-4 text-blue-600" />
          2진수 변환
        </CardTitle>
      </CardHeader>
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
        <div className="space-y-2">
          <Label htmlFor="bin" className="text-blue-600">
            Binary (2진수)
          </Label>
          <CopyInput
            id="bin"
            value={bin}
            onValueChange={handleBinChange}
            placeholder="예: 1111 1111"
            copyLabel="2진수"
            className="border-blue-200 bg-blue-50/50 text-blue-900"
          />
          <p className="text-right text-xs text-slate-400">
            * 4자리씩 자동 구분됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
