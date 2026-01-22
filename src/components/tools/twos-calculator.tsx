"use client";

import { useState } from "react";
import { Calculator, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CopyInput } from "@/components/copy-input";
import { cn } from "@/lib/utils";
import { BinaryInput } from "@/components/tools/binary-input";
import { ToolHeader } from "@/components/tools/tool-header";

const BIT_MODES = [4, 8, 16, 32];

export function TwosCalculator() {
  const [decimal, setDecimal] = useState("");
  const [bits, setBits] = useState(8);
  const [binary, setBinary] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 초기화 핸들러
  const handleReset = () => {
    setDecimal("");
    setBinary("");
    setError(null);
  };

  // 1. 비트 수가 바뀔 때: 현재 입력된 10진수 기준으로 다시 계산
  const handleBitChange = (newBits: number) => {
    setBits(newBits);
    if (decimal) {
      calculateFromDecimal(decimal, newBits);
    } else {
      // 비트 수가 바뀌면 이진수 길이를 맞춰주거나 초기화
      setBinary("");
      setError(null);
    }
  };

  // 2. 10진수 입력 시 -> 2진수 변환
  const calculateFromDecimal = (val: string, currentBits: number) => {
    setDecimal(val); // 입력값 상태 업데이트

    if (!val) {
      setBinary("");
      setError(null);
      return;
    }

    const num = parseInt(val, 10);

    if (isNaN(num)) {
      setError("유효한 숫자를 입력해주세요.");
      setBinary("");
      return;
    }

    // 범위 체크
    const min = -Math.pow(2, currentBits - 1);
    const max = Math.pow(2, currentBits - 1) - 1;

    if (num < min || num > max) {
      setError(`${currentBits}비트 범위를 벗어났습니다. (${min} ~ ${max})`);
      setBinary(""); // 범위 벗어나면 이진수는 비워둠
      return;
    }

    setError(null);

    // 2의 보수 변환 로직
    if (num < 0) {
      // 음수: 2^n + num (비트 시프트 이용)
      // JS 비트연산은 32비트 정수로 처리되므로 BigInt 사용이 안전
      const bigNum = BigInt(num);
      const bigBase = BigInt(1) << BigInt(currentBits);
      const result = bigBase + bigNum;
      setBinary(result.toString(2));
    } else {
      // 양수: 패딩 채워서 표현
      setBinary(num.toString(2).padStart(currentBits, "0"));
    }
  };

  // 3. 2진수 입력 시 -> 10진수 변환 (역변환 로직 추가!)
  const calculateFromBinary = (val: string) => {
    setBinary(val); // 입력값 상태 업데이트

    if (!val) {
      setDecimal("");
      setError(null);
      return;
    }

    // 길이가 설정된 비트보다 길면 경고
    if (val.length > bits) {
      setError(`현재 ${bits}비트 모드입니다. 입력 길이가 초과되었습니다.`);
      setDecimal("");
      return;
    }

    setError(null);

    // 2의 보수 역변환 로직 (Binary -> Decimal)
    // 1. 일단 10진수로 변환
    const rawInt = parseInt(val, 2);

    // 2. 최상위 비트(MSB) 확인을 위해 값 비교
    // MSB의 가중치: 2^(n-1)
    const msbValue = Math.pow(2, bits - 1);

    if (rawInt >= msbValue) {
      // MSB가 1인 경우 (음수)
      // 값 = rawInt - 2^n
      const maxRange = Math.pow(2, bits);
      const signedInt = rawInt - maxRange;
      setDecimal(signedInt.toString());
    } else {
      // MSB가 0인 경우 (양수)
      setDecimal(rawInt.toString());
    }
  };

  return (
    <Card className="border-0 shadow-sm ring-1 ring-slate-200 sm:border sm:ring-0">
      <ToolHeader
        title="2의 보수 계산기 (2's Complement)"
        icon={Calculator}
        onReset={handleReset}
      />
      <CardContent className="space-y-6 p-6">
        {/* 비트 수 선택 */}
        <div className="space-y-3">
          <Label>Bit Depth (비트 수)</Label>
          <div className="flex gap-2">
            {BIT_MODES.map((mode) => (
              <Button
                key={mode}
                variant={bits === mode ? "default" : "outline"}
                onClick={() => handleBitChange(mode)}
                className={cn(
                  "flex-1 transition-all",
                  bits === mode
                    ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                    : "hover:text-blue-600 hover:border-blue-200",
                )}
              >
                {mode}-bit
              </Button>
            ))}
          </div>
        </div>

        {/* 10진수 입력 */}
        <div className="space-y-3">
          <Label htmlFor="decimal-input">Decimal (10진수 정수)</Label>
          <CopyInput
            id="decimal-input"
            type="number"
            value={decimal}
            onValueChange={(v) => calculateFromDecimal(v, bits)}
            placeholder={`예: -5 (범위: ${-Math.pow(2, bits - 1)} ~ ${
              Math.pow(2, bits - 1) - 1
            })`}
            copyLabel="10진수"
            iconClassName="hover:text-blue-600"
          />
        </div>

        {/* 에러 메시지 */}
        {error && (
          <Alert
            variant="destructive"
            className="bg-red-50 text-red-900 border-red-200"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 2진수 입력/출력 */}
        <BinaryInput
          value={binary}
          onChange={calculateFromBinary}
          label="Binary (2의 보수)"
          readOnly={false}
          className="border-blue-200 bg-blue-50/50 text-blue-900 focus-visible:ring-blue-500"
          helperText={null}
        />

        {/* 도움말 추가 */}
        <p className="text-right text-xs text-slate-400 mt-2">
          * {bits}비트 길이에 맞춰 자동으로 해석됩니다. (MSB 1 = 음수)
        </p>
      </CardContent>
    </Card>
  );
}
