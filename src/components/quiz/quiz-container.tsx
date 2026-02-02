"use client";

import React, { useState } from "react";
import { QuizSetup, QuizConfig } from "./quiz-setup";
import { QuizGame } from "./quiz-game";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Trophy } from "lucide-react";

export function QuizContainer() {
  const [gameState, setGameState] = useState<"setup" | "playing" | "result">(
    "setup",
  );
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [result, setResult] = useState<{ score: number; total: number } | null>(
    null,
  );

  // 게임 시작 핸들러
  const handleStart = (selectedConfig: QuizConfig) => {
    setConfig(selectedConfig);
    setGameState("playing");
  };

  // 게임 종료 핸들러
  const handleFinish = (score: number, total: number) => {
    setResult({ score, total });
    setGameState("result");
  };

  // 다시 하기
  const handleReset = () => {
    setGameState("setup");
    setResult(null);
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      {/* 1. 헤더 영역 */}
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          BitBox <span className="text-blue-600">Challenge</span>
        </h1>
        <p className="text-lg text-slate-500">
          컴퓨터 구조 A+를 위한 진법 변환 트레이닝 센터
        </p>
      </div>

      {/* 2. 상태에 따른 화면 전환 */}
      {gameState === "setup" && <QuizSetup onStart={handleStart} />}

      {gameState === "playing" && config && (
        <QuizGame config={config} onFinish={handleFinish} />
      )}

      {gameState === "result" && result && (
        <div className="max-w-md mx-auto text-center space-y-6 animate-in zoom-in duration-300">
          <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 shadow-xl">
            <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">챌린지 종료!</h2>
            <div className="py-6">
              <span className="text-6xl font-black text-blue-600">
                {result.score}
              </span>
              <span className="text-2xl text-slate-400 font-medium">
                {" "}
                / {result.total}
              </span>
            </div>
            <p className="text-slate-500">
              {result.score === result.total
                ? "완벽합니다! 마스터 하시네요 🎉"
                : "수고하셨습니다! 조금 더 연습해볼까요?"}
            </p>
          </div>

          <Button
            onClick={handleReset}
            size="lg"
            className="w-full h-14 text-lg"
          >
            <RefreshCcw className="mr-2 w-5 h-5" /> 다시 도전하기
          </Button>
        </div>
      )}
    </div>
  );
}
