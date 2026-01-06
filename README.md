# BitBox 📦

> **Developer's Smart Toolkit** > 컴퓨터 공학 전공자와 개발자를 위한 웹 유틸리티 모음집입니다.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 🚀 Introduction

**BitBox**는 복잡한 계산이나 변환 작업을 빠르고 직관적으로 처리하기 위해 만들어진 웹 도구입니다.
기존 공학용 계산기의 복잡한 UI를 개선하고, **shadcn/ui**를 활용하여 모던하고 일관된 사용자 경험(UX)을 제공합니다.

🔗 **Live Demo:** [https://bit-box.vercel.app](https://bit-box.vercel.app)

## ✨ Key Features

### 1. 통합 진법 변환기 (Base Converter)

- **All-in-One:** 탭(Tab) 전환을 통해 2진수, 8진수, 16진수를 한 화면에서 관리
- **Real-time:** 입력과 동시에 실시간 변환 결과 제공
- **Theme-aware:** 진법별 고유 테마 컬러 적용 (Binary-Blue, Octal-Emerald, Hex-Violet)
- **UX:** 클릭 한 번으로 결과값 복사 (Copy to Clipboard) 및 입력값 유효성 검사 (Validation)

### 2. 반응형 디자인 (Responsive Design)

- 데스크탑, 태블릿, 모바일 환경 완벽 지원
- 모바일 환경을 위한 **Sheet Menu** (사이드 드로어) 네비게이션 구현

### 3. SEO & Analytics

- **Metadata:** Open Graph 이미지 및 SEO 메타태그 최적화
- **Analytics:** Vercel Analytics 연동을 통한 실시간 방문자 분석

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
│   ├── about/        # 소개 페이지
│   ├── tools/        # 도구 모음
│   │   └── base/     # 진법 변환기 (통합)
│   ├── layout.tsx    # 전역 레이아웃
│   └── page.tsx      # 메인 대시보드
├── components/
│   ├── tools/        # 도구별 로직 컴포넌트 (Binary, Octal, Hex)
│   ├── ui/           # shadcn UI 컴포넌트
│   ├── copy-input.tsx # 재사용 가능한 입력 컴포넌트
│   ├── footer.tsx    # 푸터
│   └── navbar.tsx    # 반응형 헤더
└── lib/              # 유틸리티 함수
```
