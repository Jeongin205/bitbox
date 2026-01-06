"use client";

import { useState } from "react";
import { Copy, Check, RotateCcw, Box } from "lucide-react";
import { decimalToBinary, binaryToDecimal } from "@/lib/converter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function BitBoxPage() {
  const [dec, setDec] = useState("");
  const [bin, setBin] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // 실시간 변환 로직
  const handleDecChange = (val: string) => {
    setDec(val);
    setBin(decimalToBinary(val));
  };

  const handleBinChange = (val: string) => {
    // 2진수 입력창에는 0, 1, 공백만 허용 (UX 최적화)
    const filtered = val.replace(/[^01\s]/g, "");
    setBin(filtered);
    setDec(binaryToDecimal(filtered));
  };

  // 복사 기능 (피드백 포함)
  const copyToClipboard = (text: string, field: string) => {
    if (!text || text === "Invalid") return;
    navigator.clipboard.writeText(text.replace(/\s/g, "")); // 공백 제거 후 복사
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50 p-6 md:p-24">
      {/* 브랜드 헤더 */}
      <div className="mb-10 flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200">
          <Box className="text-white" size={28} />
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-slate-900">
          Bit<span className="text-blue-600">Box</span>
        </h1>
        <p className="text-sm font-medium text-slate-500">
          Essential Developer Toolbox
        </p>
      </div>

      <Card className="w-full max-w-lg border-none shadow-2xl ring-1 ring-slate-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8">
          <div>
            <CardTitle className="text-xl font-bold">진법 변환기</CardTitle>
            <CardDescription>
              10진수와 2진수를 실시간으로 변환합니다.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setDec("");
              setBin("");
            }}
            className="rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <RotateCcw size={16} />
          </Button>
        </CardHeader>

        <CardContent className="space-y-10">
          {/* 10진수 영역 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Decimal
              </Label>
              {dec && (
                <span className="text-[10px] font-medium text-slate-400">
                  숫자 입력
                </span>
              )}
            </div>
            <div className="relative group">
              <Input
                type="number"
                value={dec}
                onChange={(e) => handleDecChange(e.target.value)}
                placeholder="0"
                className="h-16 border-none bg-slate-100 px-6 text-2xl font-bold focus-visible:ring-2 focus-visible:ring-blue-600 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(dec, "dec")}
                className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {copiedField === "dec" ? (
                  <Check className="text-green-500" size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </Button>
            </div>
          </div>

          {/* 2진수 영역 (가독성 최적화) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold uppercase tracking-widest text-blue-500">
                Binary (Chunked)
              </Label>
              {bin && (
                <span className="text-[10px] font-medium text-blue-400">
                  4-bit separation
                </span>
              )}
            </div>
            <div className="relative group">
              <Input
                value={bin}
                onChange={(e) => handleBinChange(e.target.value)}
                placeholder="0000 0000"
                className="h-16 border-none bg-blue-50 px-6 text-2xl font-mono font-bold text-blue-700 tracking-wider focus-visible:ring-2 focus-visible:ring-blue-600 transition-all"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(bin, "bin")}
                className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400"
              >
                {copiedField === "bin" ? (
                  <Check className="text-green-500" size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-12 text-center text-xs text-slate-400">
        © 2026 BitBox. Built for fast and clean development.
      </footer>
    </main>
  );
}
