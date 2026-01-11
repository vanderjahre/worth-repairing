
# Blueprint: Webcomic Platform

## Overview

A simple, elegant, and modern web platform for hosting a webcomic. The site provides a clean reading experience, easy navigation between comic pages, and a dedicated archive for browsing all published chapters. The design is responsive, ensuring a seamless experience on both desktop and mobile devices.

## Project Outline & Features

### Core Structure

*   **`index.html`**: The main landing page, displaying the latest comic.
*   **`style.css`**: The global stylesheet for the website.
*   **`main.js`**: The primary JavaScript file for handling comic navigation and dynamic content loading.
*   **`archive.html`**: A page dedicated to listing all comic chapters and pages.
*   **`archive.js`**: The script for dynamically building the archive page.
*   **`about.html`**: A page containing information about the author and the webcomic.
*   **`footer.js`**: A web component for the site's footer.

### Design & Style

*   **Layout:** Centered, single-column layout with a maximum width for readability.
*   **Color Palette:** A dark mode theme with a deep background (`#1a1a1a`), a slightly lighter container (`#2e2e2e`), and high-contrast text (`#e0e0e0`). Accent color for buttons is a vibrant orange (`#B34700`).
*   **Header:** The header consists of the website title image and the main navigation. It uses CSS Flexbox to stack the elements vertically and keep them centered, ensuring they never appear on the same line. The structure is consistent across all pages.
*   **Navigation:** Clear and simple navigation for `Home`, `Archive`, and `About` pages. Comic navigation includes buttons for `First`, `Previous`, `Next`, and `Latest` comics, along with a dropdown for chapter selection.
*   **Typography:** Clean, sans-serif font for all text.
*   **Responsive:** The design adapts to different screen sizes.

### Features

*   **Dynamic Comic Loading:** The comic image and blog post content are loaded dynamically from JSON files without requiring a page refresh.
*   **Client-Side Routing:** Navigation between comics is handled on the client side, providing a fast and smooth user experience.
*   **Dynamic Archive:** The archive page is generated dynamically from the comic data, ensuring it is always up-to-date.
*   **Custom Footer:** A reusable `site-footer` web component displays social media links and copyright information.

## Current Plan

*   **Goal:** Ensure the header layout is correct and consistent across all pages of the website.
*   **Action:** Implement a robust CSS Flexbox solution as guided by the user.
*   **Details:**
    1.  **Standardize HTML:** Simplify the `<header>` element in `index.html`, `about.html`, and `archive.html` to a consistent structure, removing nested `divs` and superfluous images.
    2.  **Update CSS:** Modify `style.css` to apply `display: flex`, `flex-direction: column`, and `align-items: center` to the `header` element. This will stack the title image and navigation vertically and center them horizontally.
    3.  **Refine Spacing:** Use the `gap` property to add appropriate spacing between the header elements.
