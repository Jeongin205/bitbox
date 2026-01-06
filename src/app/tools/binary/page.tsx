"use client";

import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CopyInput } from "@/components/copy-input";

export default function BinaryConverter() {
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
      // 4자리마다 공백 추가
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
    // max-w-3xl로 설정하여 중앙에 적당한 크기로 배치
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          2진수 변환기
        </h1>
        <p className="text-slate-500">
          컴퓨터의 기본 언어인 2진수(Binary)와 10진수를 실시간으로 변환합니다.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="border-b bg-slate-50/50">
          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <ArrowRightLeft className="h-5 w-5 text-blue-600" />
            실시간 변환
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-8">
          {/* 10진수 입력 */}
          <div className="space-y-3">
            <Label htmlFor="dec" className="text-base">
              Decimal (10진수)
            </Label>
            <CopyInput
              id="dec"
              type="number"
              value={dec}
              onValueChange={handleDecChange}
              placeholder="예: 255"
              copyLabel="10진수"
              className="h-16 text-xl" // 입력창을 조금 더 시원하게 키움
            />
          </div>

          {/* 2진수 입력 */}
          <div className="space-y-3">
            <Label htmlFor="bin" className="text-base text-blue-600">
              Binary (2진수)
            </Label>
            <CopyInput
              id="bin"
              type="text"
              inputMode="numeric"
              value={bin}
              onValueChange={handleBinChange}
              placeholder="예: 1111 1111"
              copyLabel="2진수"
              className="h-16 border-blue-200 bg-blue-50/50 text-xl text-blue-900 focus-visible:ring-blue-500"
            />
            <p className="text-right text-xs text-slate-400">
              * 4자리씩 자동 구분됩니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
