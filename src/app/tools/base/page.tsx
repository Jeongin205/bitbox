"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BinaryConverter } from "@/components/tools/binary-converter";
import { OctalConverter } from "@/components/tools/octal-converter";
import { HexConverter } from "@/components/tools/hex-converter";
import { Info } from "lucide-react";

export default function BaseConverterPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
          진법 변환기
        </h1>
        <p className="text-slate-500">
          2진수부터 16진수까지, 모든 진법을 실시간으로 상호 변환합니다.
        </p>
      </div>

      <Tabs defaultValue="binary" className="mx-auto max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="binary">2진수 (Binary)</TabsTrigger>
          <TabsTrigger value="octal">8진수 (Octal)</TabsTrigger>
          <TabsTrigger value="hex">16진수 (Hex)</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="binary">
            <BinaryConverter />
            <p className="mt-4 text-center text-sm text-slate-400">
              * Tip: 2진수는 컴퓨터 내부 연산의 기본 단위입니다.
            </p>
          </TabsContent>

          <TabsContent value="octal">
            <OctalConverter />
            <div className="mt-4 flex justify-center gap-2 text-sm text-slate-400">
              <Info className="h-4 w-4" />
              <span>Tip: 리눅스 파일 권한(chmod) 설정에 주로 사용됩니다.</span>
            </div>
          </TabsContent>

          <TabsContent value="hex">
            <HexConverter />
            <div className="mt-4 flex justify-center gap-2 text-sm text-slate-400">
              <Info className="h-4 w-4" />
              <span>
                Tip: 색상 코드(#FFFFFF)나 메모리 주소 표기에 주로 사용됩니다.
              </span>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
