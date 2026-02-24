# Project Blueprint

## 1. Overview

This project is a personal portfolio website for Taryel Hüseynzadə. It is a single-page application (SPA) built with modern, framework-less web technologies (HTML, CSS, JavaScript). The site is designed to be responsive, accessible, and visually engaging, showcasing Taryel's YouTube content and articles.

## 2. Style and Design

The website employs a modern and bold design aesthetic.

*   **Layout:** The layout is responsive, adapting for both mobile and desktop screens. It uses a main content area with a bottom navigation bar on mobile that transforms into a vertical side-nav on desktop.
*   **Color:** The application supports light, dark, and system-preference themes. It features a dynamic primary color that users can select, including a special animated "rainbow" effect. The default color is a vibrant blue.
*   **Typography:** The primary font is 'Segoe UI' or a similar system sans-serif font. Text size is adjustable for accessibility.
*   **Visual Effects:**
    *   **Glassmorphism:** The main header and navigation bars use a blurred, semi-transparent "glass" effect.
    *   **Depth and Shadow:** Cards and interactive elements have soft drop shadows to create a sense of depth and a "lifted" appearance.
    *   **Interactivity:** Buttons and navigation items have clear hover and active states, with smooth transitions and scaling effects.
*   **Iconography:** Material Design icons are used throughout the application to enhance navigation and user understanding.

## 3. Implemented Features

### 3.1. Core Navigation

*   **Tabbed Views:** The main interface is divided into three views: "Home," "Videos," and "Articles," accessible via the primary navigation.
*   **Liquid Navigation:** A "liquid glass" style navigation bar allows users to switch between views. The indicator smoothly animates to the active tab.
*   **Fullscreen Menu:** A hamburger menu provides access to secondary pages like "About," "License," and "Settings."

### 3.2. UI Components

*   **Activity Panels (Windows):** The "Settings" and "About" sections appear in modal windows. On desktop, these panels are draggable, resizable, and can be maximized, mimicking a desktop environment. On mobile, they slide in as full-screen panels.
*   **Cards:** Content, such as the YouTube channel link and video items, is presented in clean, well-styled cards.
*   **Video List:** Videos are displayed in a list with a thumbnail, title, date, duration, and a direct link to watch on YouTube.

### 3.3. Customization and Accessibility (A11Y)

*   **Language Selection:** The UI supports multiple languages (Azerbaijani, English, Russian) with content stored in a JavaScript translation object.
*   **Theme Control:** Users can switch between "Light," "Dark," and "System" themes. The choice is saved in `localStorage`.
*   **Color Palette Customization:** Users can change the application's primary accent color from a predefined set or choose a custom color.
*   **Accessibility Options:**
    *   **Text Size:** Users can switch between normal and large text sizes.
    *   **Animation Control:** Animations can be disabled for users who are sensitive to motion.

## 4. Current Plan

*   **Objective:** Fulfill the user's request to "start" by organizing and documenting the project.
*   **Steps Completed:**
    1.  Analyzed the existing `index.html` and `package.json` to understand the project's current state.
    2.  Created this `blueprint.md` file to document the project's features, design, and architecture.
