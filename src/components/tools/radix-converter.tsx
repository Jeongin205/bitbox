"use client";

import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CopyInput } from "@/components/copy-input";
import { BinaryInput } from "@/components/tools/binary-input"; // 기존 컴포넌트 재사용
import { ToolHeader } from "@/components/tools/tool-header"; // 공통 헤더 재사용

export function RadixConverter() {
  // 모든 진법의 값을 하나의 state 객체로 관리
  const [values, setValues] = useState({
    dec: "", // 10진수
    bin: "", // 2진수
    oct: "", // 8진수
    hex: "", // 16진수
  });

  // 초기화 핸들러
  const handleReset = () => {
    setValues({ dec: "", bin: "", oct: "", hex: "" });
  };

  /**
   * 통합 입력 핸들러
   * @param val 입력된 문자열
   * @param radix 진법 (2, 8, 10, 16)
   */
  const handleChange = (val: string, radix: number) => {
    // 1. 입력값이 비어있으면 전체 초기화 후 리턴
    if (!val) {
      handleReset();
      return;
    }

    // 2. 진법별 유효성 검사 (Regex)
    let isValid = true;
    let errorMessage = "";

    switch (radix) {
      case 2:
        if (/[^0-1]/.test(val)) {
          isValid = false;
          // BinaryInput이 자체적으로 막아주기도 하지만, 안전장치 추가
        }
        break;
      case 8:
        if (/[^0-7]/.test(val)) {
          isValid = false;
          errorMessage = "8진수는 0부터 7까지의 숫자만 사용할 수 있어요!";
        }
        break;
      case 10:
        if (/[^0-9]/.test(val)) isValid = false;
        break;
      case 16:
        if (/[^0-9a-fA-F]/.test(val)) {
          isValid = false;
          errorMessage = "16진수는 0~9와 A~F만 입력할 수 있어요!";
        }
        break;
    }

    // 유효하지 않은 문자 입력 시 경고 띄우고 입력 무시
    if (!isValid) {
      if (errorMessage) toast.error(errorMessage);
      return;
    }

    // 3. 기준이 되는 10진수 정수로 변환
    const num = parseInt(val, radix);

    if (isNaN(num)) return;

    // 4. 모든 진법의 문자열로 변환하여 상태 업데이트
    setValues({
      dec: num.toString(10),
      bin: num.toString(2),
      oct: num.toString(8),
      hex: num.toString(16).toUpperCase(), // 16진수는 대문자로
    });
  };

  return (
    <Card className="border-0 shadow-sm ring-1 ring-slate-200 sm:border sm:ring-0">
      <ToolHeader
        title="진법 변환기"
        icon={ArrowRightLeft}
        onReset={handleReset}
      />

      <CardContent className="space-y-8 p-6">
        {/* 1. Decimal (10진수) - 가장 기본 */}
        <div className="space-y-3">
          <Label htmlFor="decimal">Decimal (10진수)</Label>
          <CopyInput
            id="decimal"
            type="number"
            value={values.dec}
            onValueChange={(v) => handleChange(v, 10)}
            placeholder="예: 255"
            copyLabel="10진수"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          {/* 2. Binary (2진수) - 파란색 테마 */}
          <BinaryInput
            value={values.bin}
            onChange={(v) => handleChange(v, 2)}
            label="Binary (2진수)"
            placeholder="예: 1111 1111"
            className="bg-blue-50/50 border-blue-200 focus-visible:ring-blue-500 text-blue-900"
          />

          {/* 3. Octal (8진수) - 에메랄드 테마 */}
          <div className="space-y-3">
            <Label htmlFor="octal" className="text-emerald-700 font-medium">
              Octal (8진수)
            </Label>
            <CopyInput
              id="octal"
              value={values.oct}
              onValueChange={(v) => handleChange(v, 8)}
              placeholder="예: 377"
              copyLabel="8진수"
              className="border-emerald-200 bg-emerald-50/50 text-emerald-900 focus-visible:ring-emerald-500 font-mono tracking-wider"
              iconClassName="hover:text-emerald-600"
            />
            <p className="text-right text-xs text-slate-400">
              * 0~7 숫자만 입력 가능
            </p>
          </div>

          {/* 4. Hexadecimal (16진수) - 보라색 테마 */}
          <div className="space-y-3">
            <Label htmlFor="hex" className="text-violet-700 font-medium">
              Hexadecimal (16진수)
            </Label>
            <div className="relative">
              {/* 16진수 느낌을 살리기 위한 0x 데코레이션 */}
              <span className="absolute left-3 top-2.5 text-violet-400/70 font-mono text-sm select-none">
                0x
              </span>
              <CopyInput
                id="hex"
                value={values.hex}
                onValueChange={(v) => handleChange(v, 16)}
                placeholder="FF"
                copyLabel="16진수"
                // padding-left(pl-9)를 줘서 0x 텍스트와 겹치지 않게 함
                className="pl-9 border-violet-200 bg-violet-50/50 text-violet-900 focus-visible:ring-violet-500 font-mono tracking-wider uppercase placeholder:normal-case"
                iconClassName="hover:text-violet-600"
              />
            </div>
            <p className="text-right text-xs text-slate-400">
              * 0~9, A~F 입력 가능 (자동 대문자 변환)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
