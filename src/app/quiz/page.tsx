import { Metadata } from "next";
import { QuizContainer } from "@/components/quiz/quiz-container";

export const metadata: Metadata = {
  title: "BitBox Challenge - 진법 변환 퀴즈",
  description: "2진수, 16진수, 2의 보수 변환 문제를 풀며 실력을 테스트하세요.",
};

export default function QuizPage() {
  return <QuizContainer />;
}
