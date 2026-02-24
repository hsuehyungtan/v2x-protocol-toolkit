# GEMINI.md - Next.js Project Context

## 🚀 Project Overview
* **Framework**: Next.js (App Router)
* **Language**: JavaScript (ES6+)
* **Compiler:** **React Compiler** (Automatic memoization; eliminates manual `useMemo`/`useCallback`)
* **Styling**: Tailwind CSS
* **Package Manager:** **pnpm** (Efficient disk usage and strict dependency management)
* **Architecture**: Clean Architecture (UI Layer, Domain Layer, Data Layer)
* **Project Focus**: High-performance static/dynamic web development.
* **Deployment Mode:** Static Export (`output: 'export'`)

---

## 🏗️ Folder Structure
AI should adhere to the following directory standards:

* `/app`: Routes, layouts, and page components.
* `/components`: 
    * `/ui`: Basic atomic components (e.g., shadcn/ui).
    * `/features`: Feature-based complex components.
* `/hooks`: Custom React Hooks.
* `/services`: API calling logic and data fetching.
* `/types`: TypeScript interfaces and type definitions.
* `/lib` or `/utils`: Utility functions and shared helpers.

---

## 🎨 Development Standards

### 1. Component Guidelines
* Prioritize **Server Components**; use `'use client'` only when client-side interactivity is required.
* Use **Functional Components** defined with arrow functions.
* Props must have dedicated `interface` or `type` definitions for type safety.

### 2. Naming & Styling
* **File Naming**: PascalCase for components (e.g., `UserCard.tsx`), camelCase for hooks/utils (e.g., `useAuth.ts`).
* **Styling**: Use **Tailwind CSS** exclusively with a mobile-first RWD approach.

### 3. Code Quality & Version Control
* **Logging**: All program log messages **must** be written in **English**.
* **Commit Messages**: Strictly follow the **commitlint** (Conventional Commits) standard (e.g., `feat:`, `fix:`, `chore:`).

---

## 🛠️ Technical Preferences
* **Data Validation**: Use `zod` for Schema validation.
* **Icons**: Lucide React.
* **State Management**: Follow official React/Next.js recommendations or use Zustand.

---

## 📝 Interaction Guidelines (For AI)
* **Response Language**: Explanations should be in **Traditional Chinese (Taiwan usage)**.
* **Code & Logs**: All code snippets, comments, and log messages should remain in **English**.
* **Standard**: Ensure all generated code adheres to the defined Clean Architecture and naming conventions.