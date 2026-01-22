"use client";

import { useState, useEffect } from "react";
import { Palette, RefreshCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ToolHeader } from "@/components/tools/tool-header";
import { CopyInput } from "@/components/copy-input";

export function HexColorConverter() {
  // 기본값: BitBox의 메인 컬러 (Blue-600)
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
  const [hex, setHex] = useState("#000000");

  // 초기화
  const handleReset = () => {
    setColor({ r: 0, g: 0, b: 0 });
    setHex("#000000");
  };

  // RGB가 바뀌면 -> Hex 업데이트
  useEffect(() => {
    const r = color.r.toString(16).padStart(2, "0");
    const g = color.g.toString(16).padStart(2, "0");
    const b = color.b.toString(16).padStart(2, "0");
    setHex(`#${r}${g}${b}`.toUpperCase());
  }, [color]);

  // Hex 입력 시 -> RGB 업데이트
  const handleHexChange = (value: string) => {
    setHex(value);

    // # 제거 및 유효성 검사 (3자리 or 6자리)
    const cleanHex = value.replace("#", "");
    if (/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      setColor({ r, g, b });
    }
  };

  // 슬라이더 및 숫자 입력 핸들러
  const handleColorChange = (channel: "r" | "g" | "b", val: number) => {
    setColor((prev) => ({ ...prev, [channel]: val }));
  };

  return (
    <Card className="border-0 shadow-sm ring-1 ring-slate-200 sm:border sm:ring-0">
      <ToolHeader
        title="HEX 색상 추출기"
        description="RGB 값을 조절하여 16진수 색상 코드를 생성합니다."
        icon={Palette}
        // iconClassName은 기본값(blue)을 따르므로 제거
        onReset={handleReset}
      />

      <CardContent className="space-y-8 p-6">
        {/* 1. 색상 미리보기 */}
        <div
          className="h-32 w-full rounded-xl shadow-inner border border-slate-200 flex items-center justify-center transition-colors duration-200"
          style={{ backgroundColor: hex }}
        >
          <span className="bg-white/90 px-4 py-2 rounded-lg font-mono font-bold text-slate-900 shadow-sm backdrop-blur-sm">
            {hex}
          </span>
        </div>

        {/* 2. HEX 입력창 */}
        <div className="space-y-3">
          <Label>Hex Code (16진수)</Label>
          <CopyInput
            value={hex}
            onValueChange={handleHexChange}
            placeholder="#000000"
            copyLabel="Hex 코드"
            className="font-mono tracking-wider uppercase"
            iconClassName="hover:text-pink-500"
          />
        </div>

        {/* 3. RGB 슬라이더 + 숫자 입력 컨트롤 */}
        <div className="space-y-6 pt-2">
          <ColorControl
            label="Red (적색)"
            value={color.r}
            colorClass="bg-red-500"
            onChange={(v) => handleColorChange("r", v)}
          />
          <ColorControl
            label="Green (녹색)"
            value={color.g}
            colorClass="bg-green-500"
            onChange={(v) => handleColorChange("g", v)}
          />
          <ColorControl
            label="Blue (청색)"
            value={color.b}
            colorClass="bg-blue-500"
            onChange={(v) => handleColorChange("b", v)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// 🎨 슬라이더 + 인풋 통합 컴포넌트
function ColorControl({
  label,
  value,
  colorClass,
  onChange,
}: {
  label: string;
  value: number;
  colorClass: string;
  onChange: (val: number) => void;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    if (val > 255) val = 255; // 255 초과 방지
    if (val < 0) val = 0; // 음수 방지
    onChange(val);
  };

  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium text-slate-500">{label}</Label>
      <div className="flex gap-4 items-center">
        {/* 슬라이더 */}
        <Slider
          value={[value]}
          max={255}
          step={1}
          onValueChange={(vals) => onChange(vals[0])}
          className={`flex-1 ${colorClass.replace("bg-", "text-")}`}
        />
        {/* 숫자 입력창 (직접 입력 가능) */}
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          className="w-20 text-right font-mono tabular-nums h-9"
        />
      </div>
    </div>
  );
}
