"use client";

import { useState } from "react";
import { ArrowRightLeft, Copy, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CopyInput } from "@/components/copy-input";

export default function OctalConverter() {
  const [decimal, setDecimal] = useState("");
  const [octal, setOctal] = useState("");

  // 10진수 입력 핸들러
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

  // 8진수 입력 핸들러 (0~7만 허용)
  const handleOctalChange = (value: string) => {
    // 정규식: 0-7 이외의 문자가 들어오면 무시
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

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${label} 복사 완료`);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          8진수 변환기
        </h1>
        <p className="text-slate-500">
          유닉스 권한 설정(chmod) 등에 사용되는 8진수(Octal)를 10진수와
          변환합니다.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* 메인 변환기 영역 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-blue-600" />
                실시간 변환
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 10진수 입력 */}
              <div className="space-y-2">
                <Label htmlFor="decimal">Decimal (10진수)</Label>
                <CopyInput
                  id="decimal"
                  type="number"
                  value={decimal}
                  onValueChange={handleDecimalChange}
                  placeholder="예: 64"
                  copyLabel="10진수"
                />
              </div>

              {/* 8진수 입력 */}
              <div className="space-y-2">
                <Label htmlFor="octal" className="text-blue-600">
                  Octal (8진수)
                </Label>
                <CopyInput
                  id="octal"
                  value={octal}
                  onValueChange={handleOctalChange}
                  placeholder="예: 100"
                  copyLabel="8진수"
                  // 8진수 전용 스타일(파란 배경)은 className으로 덮어씌우기 가능
                  className="border-blue-200 bg-blue-50/50 text-blue-900 focus-visible:ring-blue-500"
                />
                <p className="text-xs text-slate-400">
                  * 0~7 사이의 숫자만 입력 가능합니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바: 8진수 가이드 */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-4 w-4" />
                8진수 ↔ 2진수 매핑
              </CardTitle>
              <CardDescription>
                8진수 한 자리는 2진수 3비트와 정확히 대응됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-white text-sm">
                <div className="grid grid-cols-3 border-b bg-slate-100 p-2 font-semibold text-slate-600">
                  <div className="text-center">Oct</div>
                  <div className="text-center">Bin</div>
                  <div className="text-center">Dec</div>
                </div>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <div
                    key={num}
                    className="grid grid-cols-3 p-2 border-b last:border-0 hover:bg-slate-50"
                  >
                    <div className="text-center font-bold text-blue-600">
                      {num}
                    </div>
                    <div className="text-center font-mono text-slate-500">
                      {num.toString(2).padStart(3, "0")}
                    </div>
                    <div className="text-center text-slate-400">{num}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
