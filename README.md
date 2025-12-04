# Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure (High-Level Overview)](#project-structure-high-level-overview)
- [Architectural Notes](#architectural-notes)
- [Setup & Installation](#setup--installation)

# Overview

**Data Room** is a virtual document management application inspired by platforms like Google Drive and Dropbox.  
It was built as part of a frontend take-home assignment to demonstrate strong UX design, React architecture, and real-world file/folder CRUD functionality.

The app enables users to organize documents inside a structured repository—supporting nested folders, file uploads (multiple file types), renaming, deletion, and persistent local storage. The UI is designed to be clean, intuitive, and production-ready, with careful handling of edge cases and smooth interaction patterns.

A live deployment is available here:  
👉 **https://data-room-delta.vercel.app/**

This project focuses on:

- **Functional completeness** — All core folder and file operations are fully implemented.
- **User-friendly experience** — Clear navigation, responsive layout, contextual actions, and meaningful empty/error states.
- **Maintainable architecture** — Modular React components, typed data models, and IndexedDB-backed persistence.

## Features

### 🔐 Authentication
- Login via **Google** (Supabase Auth)
- Protected routes – user must authenticate before accessing the Data Room
- Session persistence across refreshes

---

### 📁 Folder Management
- Create folders at any depth
- Unlimited folder nesting
- Rename folders with duplicate-name protection
- Delete folders
- Desktop-like navigation:
  - **Double-click** to open folders on desktop
  - **Tap** to open folders on touch devices

---

### 📄 File Management
- Upload **multiple files at once**
- Drag-and-drop upload area or file picker dialog
- File size validation before upload
- Preview files directly in the browser (opens in a new tab)
- Rename files with duplicate-name prevention
- Download files
- Delete files

Supported behaviors:
- Prevent renaming or uploading files to a name that already exists in the same folder
- Visual feedback for hover, selection, and active item interactions

---

### 🧭 Navigation & Browsing
- Breadcrumbs that represent the user’s current folder path
- PC-like folder navigation with desktop and touch support

---

### 🛠 Actions Panel
Available at the top of each folder view:

- **View Switcher** – toggle between **grid** and **list** views  
- **Sorting Controls** – sort by:
  - Name
  - Date created
  - Date updated
- **Sort Order** – ascending / descending
- **Search** – instantly filter items within the folder
- **New Folder** button
- **Upload** button

---

### 🗂 Folder View
- Clean, responsive layout that adapts grid/list presentation
- Row-based layout for list view with metadata (name, size, modification date)
- Tile-based grid layout for visual browsing
- Hover states, active states, and selected item indicators for clarity
- Long names gracefully truncated with tooltip on hover

---

### 💾 Data Persistence
- Files (as binary blobs) and folders stored in **IndexedDB**
- Full persistence across page reloads
- Supabase authentication handles user session storage

---

### 🎨 UX Details & Interactions
- Visual cues when interacting with files or folders
- Drag-over highlights in the upload dialog
- Consistent spacing, sizing, and alignment across components
- Accessible color contrast and large click/tap targets
- Smooth animations for dialogs and drawers

---

### 📱 Device Support
- Desktop and mobile/touch friendly
- Touch-friendly interactions for navigation and selection
- Responsive layout at all breakpoints

## Tech Stack

This project uses a modern, production-ready frontend stack optimized for performance, DX, and clean UI development.

### ⚛️ Core Framework
- **React 19**
- **TypeScript**
- **Vite** – blazing-fast dev server and bundler

### 🎨 UI & Styling
- **Tailwind CSS 4** for utility-first styling
- **shadcn/ui** components (Radix-based)
- **lucide-react** and **React-icons** for icons
- **clsx** and **tailwind-merge** for class handling
- **tw-animate-css** for subtle motion

### 🔐 Authentication
- **Supabase JS** – Google login and session handling

### 🧭 Routing & State
- **React Router 7**
- **@tanstack/react-query** – async state, caching, and IndexedDB integration

### 💾 Storage & Data Management
- **idb** – IndexedDB wrapper for persistent file/folder storage
- **uuid** – for unique item identifiers
- **dayjs** – for timestamps and date formatting

### ⚙️ Developer Tooling
- **ESLint** with plugins:
  - react-hooks
  - react-refresh
  - import/order & simple-import-sort
  - unused-imports
- **Prettier** for formatting consistency
- **Husky** + **lint-staged** for pre-commit checks
- TypeScript project references and strict-mode configuration

## Project Structure (High-Level Overview)

The codebase is organized using a feature-first structure, where related components, hooks, and utilities are grouped by domain.  
This approach keeps the project scalable, easy to navigate, and aligned with modern React architecture practices.

    components/
        LoginPage.tsx
        Logo.tsx

        dashboard/
            Dashboard.tsx
            Breadcrumbs.tsx
            dashboard-header/      # Header, user menu, theme switcher
            data-room/             # Core file/folder management UI
                actions-panel/     # Upload, create folder, search, sort, view switcher
                upload/            # Drag-and-drop upload dialog + validation
                grid-view/         # Grid layout components
                list-view/         # List layout components

    ui/                            # Reusable primitive UI components (buttons, dialogs, inputs, etc.)

    context/
        auth/                      # Authentication (Supabase + Google Login)
        dialog/                    # Global dialog state
        theme/                     # Light/dark theme context

    hooks/                         # Data room operations, uploads, navigation, item CRUD

    lib/
        constants.ts
        paths.ts
        supabaseClient.ts
        types/                     # Shared TypeScript types
        utils/                     # File utils, formatting, filtering, validation helpers
        validation/                # File validation logic

    services/
        dataRoomService.ts         # IndexedDB CRUD operations

    store/
        db.ts                      # IndexedDB schema + access layer
        simulateDelay.ts           # UX-improving artificial delay

    App.tsx
    main.tsx
    index.css

### Architectural Notes

The application follows a clean, modular architecture centered around separation of concerns:

**1. Feature-based Component Organization**  
UI is grouped by domain (dashboard, data-room, upload, grid-view, list-view), making the structure easy to navigate and scalable.  
Each part of the data room workflow has its own isolated components.

**2. Custom Hooks for Business Logic**  
CRUD operations, uploads, file preview handling, duplicate name checks, and navigation logic are implemented in dedicated hooks.  
This keeps UI components focused on presentation while logic remains reusable and testable.

**3. IndexedDB Persistence Layer**  
All files and folders are stored locally using IndexedDB through a small service layer.  
This provides realistic CRUD behavior, supports binary file storage, and keeps the app fully client-side while mimicking a backend.

**4. Context Providers for Global State**  
Authentication, dialog visibility, and theme selection are handled with React Context, avoiding prop drilling and centralizing cross-app state.

**5. Reusable UI System**  
A custom “ui” library (buttons, dialogs, inputs, dropdowns, etc.) creates a consistent design foundation across the app and avoids duplication.

**6. URL-Driven Navigation**  
Folder navigation is reflected in the URL, enabling deep-linking into nested folders.

## Setup & Installation

### 1. Clone the repository
```sh
git clone https://github.com/Andrii-dan/data_room.git
cd data_room
```

### 2. Install dependencies
```sh
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These values can be found in your Supabase project's API settings.

### 4. Start the development server
```sh
npm run dev
```

The app will be available at:
```
http://localhost:5173
```

### 5. Build for production
```sh
npm run build
```


This setup allows you to run the full application locally with authentication, folder/file CRUD operations, uploads, search, sorting, and persistent IndexedDB storage.
