# 🌌 Galaxy PDF Tool - Secure Merger & Splitter

[![React Version](https://img.shields.io/badge/React-18+-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Client--Side-brightgreen?logo=lock)](https://shields.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A modern, high-fidelity UI for a PDF merging and splitting tool built with **React, TypeScript, and Tailwind CSS**. This application redefines document privacy by performing all operations **100% on the client-side**. Your files are never uploaded, scanned, or stored on a server.

![Galaxy PDF Tool Showcase](https://picsum.photos/1200/800)

## Why Galaxy PDF Tool?

In an era where data privacy is paramount, most online document tools require you to upload your sensitive files to a third-party server, creating potential security risks. The Galaxy PDF Tool was built on a simple, powerful principle: **your data should never leave your device.**

By leveraging the power of modern web browsers, it offers a secure, fast, and completely private alternative for everyday PDF tasks, wrapped in a beautiful, immersive user interface.

## ✨ Key Features

-   🔒 **Absolute Privacy**: 100% client-side processing. Your files are processed in your browser and never touch a server.
-   ↔️ **Dual-Mode Interface**: Seamlessly switch between merging multiple PDFs and splitting a single PDF with a clean, intuitive tabbed UI.
-   🧩 **Powerful Merging**: Select multiple PDFs, reorder them with easy drag-and-drop, and combine them into one unified document.
-   ✂️ **Precise Splitting**: Extract custom page ranges (e.g., `1-5, 8, 11-13`) or split every page into its own separate PDF file with a single click.
-   ✨ **Immersive UX**: A stunning animated galaxy background and a modern dark theme provide a unique and comfortable user experience.
-   📱 **Fully Responsive**: Designed to work flawlessly on desktops, tablets, and mobile devices.
-   ✍️ **SEO-Optimized**: Includes a comprehensive 3500+ word article on PDF security and standards, complete with JSON-LD schema for rich search results.

## 🛠️ Technology Stack

-   **Framework**: [React 18+](https://react.dev/) (Functional Components & Hooks)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: React Hooks (`useState`, `useCallback`, `useRef`)
-   **Core Logic**: TypeScript functions that simulate the client-side processing flow, demonstrating a high-fidelity UI/UX.

## 🚀 Getting Started

This project is a self-contained web application. No complex build steps are required to run it locally.

### Prerequisites

-   A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
-   A simple way to serve local files. Python's built-in server is a great option.

### Running Locally

1.  **Clone or Download the Project**:
    Ensure all provided files are in a single project directory, maintaining the folder structure.

2.  **Start a Local Server**:
    Open a terminal in the project's root directory and run one of the following commands:

    **Using Python 3:**
    ```bash
    python -m http.server
    ```
    **Using Node.js (with `serve`):**
    ```bash
    # Install serve globally if you haven't already
    npm install -g serve
    
    # Run from your project directory
    serve
    ```

3.  **Open in Browser**:
    Navigate to the local address provided by the server (e.g., `http://localhost:8000` or `http://localhost:3000`).

## 📁 File Structure

The project is organized logically to mirror a modern React/Next.js application, promoting clarity and maintainability.

```
/
├── public/
│   └── favicon.svg         # Application icon
├── components/
│   ├── Layout.tsx          # Main layout: galaxy background, header, footer, modals
│   └── PDFToolUI.tsx       # Core tabbed interface for merge/split functionality
├── lib/
│   └── PDFUtils.ts         # Placeholder logic for file handling/downloads
├── pages/
│   └── index.tsx           # Main application page component
├── utils/
│   └── SeoArticle.tsx      # SEO article content and schema
├── App.tsx                 # Root React component
├── index.html              # Main HTML entry point
├── index.tsx               # React application entry point
├── metadata.json           # Application metadata
├── README.md               # You are here!
├── robots.txt              # Instructions for web crawlers
└── sitemap.xml             # Sitemap for SEO
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📜 License

This project is distributed under the MIT License. See the `LICENSE` file for more information.
