import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ToolBitBox", // 페이지별 타이틀 뒤에 자동으로 붙음 (예: 진법 변환기 | BitBox)
    default: "ToolBitBox - 개발자를 위한 스마트 도구 상자", // 기본 타이틀
  },
  description:
    "2진수, 8진수, 16진수 변환부터 2의 보수 계산까지. 컴퓨터 공학 전공자와 개발자를 위한 필수 웹 유틸리티 모음입니다.",
  keywords: [
    "진법 변환기",
    "2진수 변환",
    "16진수 계산",
    "2의 보수",
    "개발자 도구",
    "ToolBitBox",
  ],
  authors: [{ name: "ToolBitBox Team" }],
  creator: "ToolBitBox Team",
  verification: {
    google: "wD1i8ns0RmEvTKPEiElHXByzNaW_HYA_UHiGv-XidUU",
  },
  openGraph: {
    title: "ToolBitBox - 개발자를 위한 스마트 도구 상자",
    description:
      "복잡한 계산은 ToolBitBox에 맡기세요. 빠르고 정확한 개발자용 도구 모음.",
    url: "https://bit-box.vercel.app",
    siteName: "ToolBitBox",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
