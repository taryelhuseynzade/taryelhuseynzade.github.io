# Project Blueprint

## 1. Overview

This project is a personal portfolio website for Taryel Hüseynzadə. It is built with modern, framework-less web technologies (HTML, CSS, JavaScript), with a clean separation of concerns. All styling is in `style.css` and all interactive logic is in `main.js`. The site is designed to be responsive, accessible, and visually engaging.

## 2. Style and Design

The website's styling is completely managed by an external stylesheet, `style.css`.

*   **Layout:** The layout is responsive, adapting for both mobile and desktop screens. It uses a main content area with a bottom navigation bar on mobile that transforms into a vertical side-nav on desktop.
*   **Color:** The application supports light, dark, and system-preference themes. It features a dynamic primary color that users can select, including a special animated "rainbow" effect.
*   **Typography:** The primary font is 'Segoe UI' or a similar system sans-serif font. Text size is adjustable for accessibility.
*   **Visual Effects:**
    *   **Glassmorphism:** The main header, navigation bars, and content cards use a blurred, semi-transparent "liquid glass" effect.
    *   **Depth and Shadow:** Cards and interactive elements have soft drop shadows to create a sense of depth.
*   **Iconography:** Material Design icons are used to enhance navigation and user understanding.

## 3. Implemented Features

### 3.1. Code Structure

*   **Separation of Concerns:** All CSS styles have been moved to a dedicated `style.css` file, and all JavaScript logic has been moved to `main.js`, improving code organization and maintainability.

### 3.2. Core Navigation

*   **Multi-Page Structure:** The site includes dedicated pages for `about.html`, `osl.html`, and `help.html`.
*   **Tabbed Views:** The main interface on `index.html` is divided into three views: "Home," "Videos," and "Articles."
*   **Liquid Navigation:** A "liquid glass" style navigation bar allows users to switch between views on the main page.
*   **Fullscreen Menu:** A hamburger menu provides access to secondary pages and the "Settings" panel.

### 3.3. UI Components

*   **Activity Panels (Windows):** The "Settings" section appears in a draggable, resizable, and maximizable modal window on desktop, and a slide-in panel on mobile.
*   **Cards:** Content is presented in clean, "liquid glass" styled cards.

### 3.4. Customization and Accessibility (A11Y)

*   **Language Selection:** The UI supports multiple languages (AZ, EN, RU).
*   **Theme Control:** Users can switch between "Light," "Dark," and "System" themes.
*   **Color Palette Customization:** Users can change the primary accent color.
*   **Accessibility Options:** Includes options for text size and disabling animations.

## 4. Current Plan

*   **Objective:** Refactor the JavaScript by moving it from `index.html` to an external `main.js` file.
*   **Steps Completed:**
    1.  Extracted the entire JavaScript block from the `<script>` tags in `index.html`.
    2.  Created a new `main.js` file and wrote the extracted JavaScript into it.
    3.  Modified `index.html`, removing the inline `<script>` block and replacing it with a `<script src="main.js"></script>` tag at the end of the `<body>`.
    4.  Updated this `blueprint.md` to document the code refactoring.
