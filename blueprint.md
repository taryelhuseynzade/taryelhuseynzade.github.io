# Project Blueprint

## 1. Overview

This project is a personal portfolio website for Taryel Hüseynzadə. It is built with modern, framework-less web technologies (HTML, CSS, JavaScript). The site is designed to be responsive, accessible, and visually engaging, showcasing Taryel's YouTube content and articles. It now includes a separate `about.html` page.

## 2. Style and Design

The website employs a modern and bold design aesthetic.

*   **Layout:** The layout is responsive, adapting for both mobile and desktop screens. It uses a main content area with a bottom navigation bar on mobile that transforms into a vertical side-nav on desktop.
*   **Color:** The application supports light, dark, and system-preference themes. It features a dynamic primary color that users can select, including a special animated "rainbow" effect. The default color is a vibrant blue.
*   **Typography:** The primary font is 'Segoe UI' or a similar system sans-serif font. Text size is adjustable for accessibility.
*   **Visual Effects:**
    *   **Glassmorphism:** The main header, navigation bars, and content cards use a blurred, semi-transparent "liquid glass" effect.
    *   **Depth and Shadow:** Cards and interactive elements have soft drop shadows to create a sense of depth and a "lifted" appearance.
    *   **Interactivity:** Buttons and navigation items have clear hover and active states, with smooth transitions and scaling effects.
*   **Iconography:** Material Design icons are used throughout the application to enhance navigation and user understanding.

## 3. Implemented Features

### 3.1. Core Navigation

*   **Multi-Page Structure:** The site now includes a dedicated `about.html` page.
*   **Tabbed Views:** The main interface on `index.html` is divided into three views: "Home," "Videos," and "Articles," accessible via the primary navigation.
*   **Liquid Navigation:** A "liquid glass" style navigation bar allows users to switch between views on the main page. The indicator smoothly animates to the active tab.
*   **Fullscreen Menu:** A hamburger menu provides access to secondary pages like `about.html`, `osl.html`, `help.html` and the "Settings" panel.

### 3.2. UI Components

*   **Activity Panels (Windows):** The "Settings" section appears in a modal window. On desktop, this panel is draggable, resizable, and can be maximized, mimicking a desktop environment. On mobile, it slides in as a full-screen panel.
*   **Cards:** Content, such as the YouTube channel link and video items, is presented in clean, "liquid glass" styled cards.
*   **Video List:** Videos are displayed in a list with a thumbnail, title, date, duration, and a direct link to watch on YouTube.

### 3.3. Customization and Accessibility (A11Y)

*   **Language Selection:** The UI supports multiple languages (Azerbaijani, English, Russian) with content stored in a JavaScript translation object.
*   **Theme Control:** Users can switch between "Light," "Dark," and "System" themes. The choice is saved in `localStorage`.
*   **Color Palette Customization:** Users can change the application's primary accent color from a predefined set or choose a custom color.
*   **Accessibility Options:**
    *   **Text Size:** Users can now switch between normal and large text sizes.
    *   **Animation Control:** Animations can be disabled for users who are sensitive to motion.

## 4. Current Plan

*   **Objective:** Replace the "About" panel with a dedicated `about.html` page.
*   **Steps Completed:**
    1.  Created the new `about.html` file with the profile information.
    2.  Updated `index.html` to remove the "About" panel markup.
    3.  Modified the link in the fullscreen menu to point to `about.html`.
    4.  Removed the JavaScript logic for opening the "About" panel from `index.html`.
    5.  Updated this `blueprint.md` file to reflect the new structure.
