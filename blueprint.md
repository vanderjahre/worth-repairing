# Webcomic Reader Blueprint

## Overview

A simple, elegant, and modern webcomic reader application. This project allows a user to display their webcomic in a familiar and easy-to-navigate format, featuring a continuous global page count and a beautiful chapter archive for a seamless user experience.

## Features

### Core Functionality

*   **Global Page Numbering**: Pages are numbered continuously from the first page to the last, rather than resetting with each chapter.
*   **Chapter-Based File Organization**: While pages are numbered globally for the user, the underlying image files and notes are organized into chapter-based folders for easy management by the author.
*   **Comic Display**: Displays the current comic page by dynamically finding the correct chapter folder and image file based on the global page number.
*   **Navigation**: "First", "Previous", "Next", and "Last" buttons allow for straightforward navigation through the global page sequence.
*   **Page Jumper**: The dropdown menu lists all pages with their global page numbers, allowing users to jump directly to any page in the comic.
*   **Keyboard Navigation**: Users can navigate between pages using the left and right arrow keys.
*   **URL-based Page Tracking**: The URL uses a single, clean parameter (`?page=X`) to track the current page, making it easy to share links to specific pages.
*   **Archive Page**: A dedicated `archive.html` page displays a grid of chapter covers. Clicking a cover takes the user to the first page of that chapter.

### Author Experience

*   **Simplified Content Management**: The workflow for adding new content is clear and logical:
    1.  Add the new comic image file to the appropriate chapter folder (e.g., `comics/chapter2/4.jpg`), using the new global page number as the filename.
    2.  Update the `chaptersConfig` array in `main.js` to reflect the new number of pages in the updated chapter, and include a `name` for the chapter and a path to its `cover` image.
    3.  Add the author's note to the corresponding `chapterX.json` file, using the global page number as the key (e.g., in `notes/chapter2.json`, add a key `"4": "My note for page 4."`).
*   **Organized Author Notes**: Author notes are stored in separate JSON files per chapter, keeping them decoupled from the main application logic and easy to manage.

## Current Task: Archive Page

*   **Goal**: Create a new page to display all chapter covers, allowing users to easily navigate to the beginning of any chapter.
*   **Implementation**:
    *   **`archive.html`**: A new HTML file was created for the archive page.
    *   **Navigation**: The main navigation in both `index.html` and `archive.html` was updated to include a link to the new archive page.
    *   **`archive.js`**: This new JavaScript file dynamically generates the content of the archive page. It imports the `chapters` data from `main.js` and creates a grid of chapter covers, each linking to the first page of that chapter.
    *   **`archive.css`**: This new CSS file provides styling for the archive page, creating a clean and responsive grid layout for the chapter covers.
    *   **Chapter Covers**: A new `images/covers/` directory was created to store the chapter cover images.
    *   **`main.js`**: The `chaptersConfig` was updated to include a `name` and `cover` property for each chapter. The `chapters` array is now exported from `main.js` so it can be used by `archive.js`.
