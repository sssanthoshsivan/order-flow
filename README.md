# Ecoyaan Checkout Flow

A simplified 3-step checkout flow built with **Next.js 15**, **React**, **TypeScript**, and **Tailwind CSS**. This project demonstrates Server-Side Rendering (SSR), state management with Context API, form validation, and responsive design.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

---

## 🛒 Features

### Checkout Flow
1. **Cart / Order Summary** — Displays products with SSR, subtotal, shipping, and grand total
2. **Shipping Address** — Form with real-time validation (email, 10-digit phone, 6-digit PIN)
3. **Payment Confirmation** — Order review, simulated payment processing, and success screen

### Technical Highlights
- **Server-Side Rendering**: Cart page uses Next.js Server Components to fetch data at request time
- **API Routes**: Mock backend via `/api/cart` endpoint
- **Context API**: Persistent state across all checkout steps
- **Form Validation**: Client-side validation with inline error messages and blur-triggered feedback
- **Responsive Design**: Mobile-first layout that adapts to all screen sizes
- **Animations**: Smooth page transitions, staggered card animations, and interactive micro-animations

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── api/cart/route.ts      # Mock API endpoint (GET /api/cart)
│   ├── confirmation/page.tsx  # Step 3: Payment & Success
│   ├── shipping/page.tsx      # Step 2: Address Form  
│   ├── page.tsx               # Step 1: Cart (Server Component)
│   ├── layout.tsx             # Root layout with CheckoutProvider
│   └── globals.css            # Design system & animations
├── components/
│   ├── CartView.tsx           # Client-side cart display
│   ├── Header.tsx             # Branded navigation header
│   └── StepIndicator.tsx      # 3-step progress bar
├── context/
│   └── CheckoutContext.tsx    # Global checkout state (Context API)
├── data/
│   └── cart.json              # Mock product data
└── types/
    └── index.ts               # TypeScript interfaces
```

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| **App Router** | Modern Next.js pattern with built-in Server Components for SSR |
| **Server Components** | Cart page fetches data server-side, ensuring SEO and fast initial load |
| **Context API** | Lightweight state management sufficient for a 3-step linear flow |
| **Tailwind CSS** | Rapid UI development with consistent design tokens |
| **Client-side Validation** | Immediate feedback on blur with inline errors for better UX |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd ecoyaan-checkout

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🌐 Deployment

This app is optimized for deployment on **Vercel**:

1. Push the repository to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Deploy — no configuration needed

---

## 📱 Responsive Design

The layout adapts across breakpoints:
- **Mobile (< 640px)**: Single-column stacked layout
- **Tablet (640px–1024px)**: Two-column forms, adjusted spacing
- **Desktop (1024px+)**: Side-by-side product list and order summary

---

## 🔐 SSR Verification

To verify Server-Side Rendering:
1. Open `http://localhost:3000`
2. View Page Source (`Ctrl+U` / `Cmd+Option+U`)
3. Search for product names — they appear in the raw HTML, confirming SSR
