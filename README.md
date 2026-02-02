# ToolBitBox 📦

> **Developer's Smart Toolkit**
> 컴퓨터 공학 전공자와 개발자를 위한 웹 유틸리티 모음집입니다.

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 🚀 Introduction

**ToolBitBox**는 복잡한 계산이나 변환 작업을 빠르고 직관적으로 처리하기 위해 만들어진 웹 도구입니다.
기존 공학용 계산기의 복잡한 UI를 개선하고, **shadcn/ui**를 활용하여 모던하고 일관된 사용자 경험(UX)을 제공합니다.

🔗 **Live Demo:** [https://bit-box.vercel.app](https://bit-box.vercel.app)

## ✨ Key Features

### 1. 🔄 통합 진법 변환기 (Radix Converter)

- **Multi-Conversion:** 하나의 입력창에 값을 넣으면 2진수, 8진수, 10진수, 16진수로 **동시에 변환**됩니다.
- **Auto Validation:** 각 진법에 맞지 않는 입력(예: 2진수에 '2' 입력)을 실시간으로 차단하고 알려줍니다.
- **Smart UI:** 진법별 고유 테마 컬러(Blue, Emerald, Violet)와 `0x` 접두사 처리 등 디테일한 UX를 제공합니다.

### 2. 🧮 2의 보수 계산기 (Two's Complement)

- **Bit Depth Control:** 4비트, 8비트, 16비트, 32비트 환경을 선택하여 계산할 수 있습니다.
- **Bidirectional:** 10진수(양수/음수)를 입력하면 비트열로, 비트열을 입력하면 10진수로 **양방향 변환**됩니다.
- **Visual Learning:** 컴퓨터가 음수를 저장하는 방식(MSB 등)을 이해하는 데 최적화되어 있습니다.

### 3. 🎨 HEX 색상 추출기 (Color Extractor)

- **RGB Sliders:** Red, Green, Blue 슬라이더를 조절하여 원하는 색상을 직관적으로 찾습니다.
- **Sync:** 슬라이더 조절과 Hex 코드 입력이 실시간으로 동기화됩니다.
- **Preview:** 선택한 색상을 즉시 미리보기 화면으로 제공합니다.

### 4. 📱 반응형 디자인 & 공통 레이아웃

- 데스크탑, 태블릿, 모바일 환경을 완벽 지원하며, 모바일에서는 **Sheet Menu**를 제공합니다.
- **Reusable Architecture:** 공통 레이아웃 컴포넌트(`ToolPage`)를 도입하여 일관된 디자인 시스템을 유지합니다.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui, Lucide React
- **Deployment:** Vercel

## 📂 Project Structure

```bash
src/
├── app/
│   ├── about/              # 소개 페이지
│   ├── tools/              # 도구 페이지 모음
│   │   ├── radix/          # 진법 변환기
│   │   ├── color/          # HEX 색상 추출기
│   │   └── twos/           # 2의 보수 계산기
│   ├── layout.tsx          # 전역 레이아웃
│   └── page.tsx            # 메인 대시보드
├── components/
│   ├── tools/              # 핵심 비즈니스 로직 컴포넌트
│   │   ├── base-converter.tsx
│   │   ├── hex-color-converter.tsx
│   │   ├── twos-calculator.tsx
│   │   └── tool-page.tsx   # 공통 레이아웃 래퍼
│   ├── ui/                 # shadcn UI 컴포넌트
│   ├── copy-input.tsx      # 복사 기능 포함 입력창
│   └── navbar.tsx          # 반응형 헤더
└── config/                 # 상수 및 메뉴 설정 (nav.ts)
```
