<div align="center">

# Michał Dobosz - Developer Portfolio

An interactive, fully responsive developer portfolio engineered as a **VS Code / IDE clone**.
Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

[Live Demo](https://github.com/Romedix1) • [Report Bug](https://github.com/Romedix1/portfolio/issues) • [Contact Me](mailto:doboszmichal4@gmail.com)

---

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-E2E%20Testing-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)

</div>

## Overview

This portfolio brings a desktop code editor experience to the web, featuring:
- **VS Code Dark+ Aesthetics:** Authentic typography (JetBrains Mono), syntax highlighting, line numbers, and activity bar.
- **File Explorer:** Interactive tree view to browse pages, markdown documents, and project source files.
- **Tabs System:** Multi-tab browsing with state persistence in `localStorage`, active tab indicators, and close actions.
- **Quick File Search (<kbd>Ctrl</kbd> + <kbd>P</kbd>):** Fast file finder with real-time filtering and full keyboard arrow navigation.
- **Command Palette (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> / <kbd>F1</kbd>):** Execute quick actions (copy email, download PDF CV, open GitHub / LinkedIn).
- **Interactive Terminal (<kbd>Ctrl</kbd> + <kbd>`</kbd>):** Functional in-browser terminal with command history, autocomplete navigation, and built-in commands (`help`, `whoami`, `skills`, `contact`, `projects`, `echo`, `clear`, `sudo`).
- **E2E Tests:** Complete end-to-end test coverage with Playwright for navigation, tabs, search modal, and terminal across modern browser engines.
- **SEO & Accessibility:** Fully compliant with WAI-ARIA standards, dynamic metadata, OpenGraph, sitemap, and robots.txt.

---

## Keyboard Shortcuts

| Shortcut | Action | Description |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>P</kbd> | **Quick Open** | Search and open files by name |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> / <kbd>F1</kbd> | **Command Palette** | Execute actions and utilities |
| <kbd>Ctrl</kbd> + <kbd>`</kbd> | **Toggle Terminal** | Open / close interactive bottom terminal |
| <kbd>Escape</kbd> | **Close Dialog** | Dismiss modal or search palette |
| <kbd>↑</kbd> / <kbd>↓</kbd> + <kbd>Enter</kbd> | **List Navigation** | Navigate search results and terminal history |

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Tabs, Commands, and Terminal state)
- **Icons & UI:** [Lucide React](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/) (Toast notifications)
- **Testing:** [Playwright](https://playwright.dev/) (Cross-browser E2E testing on Chromium & Firefox)
- **Typography:** JetBrains Mono via `next/font/google`

---

## Project Structure

```text
├── public/                 # Static assets (CV, project screenshots)
├── src/
│   ├── app/
│   │   ├── (routes)/       # Portfolio pages (/about, /contact, /projects)
│   │   ├── _components/    # IDE components (explorer, file-tab, terminal, search-modal)
│   │   ├── hooks/          # Custom hooks (useListNavigation, useTerminalHistory)
│   │   ├── layout.tsx      # Root layout, metadata, SEO configuration
│   │   ├── not-found.tsx   # Custom 404 page styled as IDE tab
│   │   ├── sitemap.ts      # Automated SEO sitemap
│   │   └── robots.ts       # Automated robots.txt
│   ├── store/              # Zustand global state slices (useTabStore, useCommandStore)
│   └── types/              # TypeScript definitions and data interfaces
├── tests/                  # Playwright E2E test suites
│   ├── navigation.spec.ts  # Explorer navigation and 404 tests
│   ├── tabs.spec.ts        # Tab opening, switching, closing, and reload persistence
│   ├── search.spec.ts      # File search and command palette tests
│   └── terminal.spec.ts    # Terminal commands and history tests
├── playwright.config.ts    # Playwright test runner configuration
└── next.config.ts          # Next.js compiler and image optimization settings
```

---

## Getting Started

### Prerequisites
- Node.js 20+ installed
- npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Romedix1/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## Running Tests

This project includes E2E tests written with **Playwright**:

```bash
# Run all E2E tests across Chromium & Firefox
npx playwright test

# Run tests in UI interactive mode
npx playwright test --ui

# Run specific test file
npx playwright test tests/search.spec.ts
```

---

## Author

**Michał Dobosz**
- GitHub: [@Romedix1](https://github.com/Romedix1)
- LinkedIn: [Michał Dobosz](https://www.linkedin.com/in/micha%C5%82-dobosz-553762275/)
- Email: [doboszmichal4@gmail.com](mailto:doboszmichal4@gmail.com)

---

## License

This project is open source and available under the [MIT License](LICENSE).
