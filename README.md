# Smart Bookmark 🚀

A modern, secure, and real-time bookmark manager built with **Next.js 16**, **Supabase**, and **Tailwind CSS**. Designed with a premium, Apple-inspired aesthetics ("Glassmorphism") to keep your digital life organized and beautiful.

## ✨ Key Features

- **🔐 Enterprise-Grade Security**: Authentication powered by Supabase (Google OAuth) with strict **Row Level Security (RLS)** ensuring your data is 100% private and isolated.
- **⚡ Real-Time Sync**: Add or delete a bookmark in one tab or device, and watch it update instantly everywhere using Supabase Realtime subscriptions.
- **☁️ Cloud Native**: Fully serverless architecture using Next.js App Router and Server Actions.
- **🎨 Premium UI/UX**:
    - **Glassmorphism**: Frosted glass effects and smooth transitions using native CSS and custom hooks.
    - **Animations**: Custom-built entry animations, parallax effects, and hover interactions (No heavy animation libraries).
- **📱 Responsive**: Optimized for all devices, from desktops to mobiles.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL + Auth + Realtime)
- **Deployment**: Vercel (Recommended)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-bookmark.git
cd smart-bookmark
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup (SQL)

Run the following SQL in your Supabase SQL Editor to set up the table and security policies:

```sql
-- Create Table
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text,
  url text not null,
  user_id uuid references auth.users not null
);

-- Enable RLS
alter table bookmarks enable row level security;

-- Create Policies
create policy "Individuals can create bookmarks." on bookmarks for
    insert with check (auth.uid() = user_id);

create policy "Individuals can view their own bookmarks. " on bookmarks for
    select using (auth.uid() = user_id);

create policy "Individuals can update their own bookmarks." on bookmarks for
    update using (auth.uid() = user_id);

create policy "Individuals can delete their own bookmarks." on bookmarks for
    delete using (auth.uid() = user_id);
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🌟 Usage

1.  **Sign In**: Click "Get Started Free" or "Sign In" to authenticate via Google.
2.  **Add Bookmark**: Paste a URL and optional title. The card instantly appears in your library.
3.  **Manage**: View your collection in a responsive grid. Click "Visit" to open or "Remove" to delete (with confirmation).
4.  **Sync**: Open the app in a second window. Changes reflect instantly across both.

## 🔒 Security

This project uses **Supabase Row Level Security (RLS)**. Even though the API is exposed, database policies ensure that users can **only** access rows where their specific `user_id` matches the authenticated session. Your data is cryptographically secure.

---
Built with ❤️ using Next.js & Supabase.

## 🧩 Challenges & Solutions

During the development of Smart Bookmark, we encountered and solved several interesting technical challenges:

### 1. Next.js 16 Async Cookies
- **Problem**: Next.js 15+ made `cookies()` asynchronous, causing the Supabase `createServerClient` to fail in server components.
- **Solution**: We refactored `lib/supabase/server.ts` to `await cookies()` before initializing the Supabase client, ensuring compatibility with the latest Next.js App Router patterns.

### 2. Workspace Root Confusion
- **Problem**: The build process failed with `Can't resolve 'tailwindcss'` because Next.js incorrectly inferred the project root due to a stray `package-lock.json` in a parent directory.
- **Solution**: We identified and removed the conflicting lockfile outside the project root, allowing Next.js to correctly detect the local `package.json` and dependencies.

### 3. Real-Time Deletion Sync
- **Problem**: React state updates for real-time deletions were conflicting with manual optimistic updates, causing UI glitches.
- **Solution**: We implemented robust event handling in the Supabase subscription, explicitly separating `INSERT`, `DELETE`, and `UPDATE` events. We also added optimistic updates for immediate UI feedback while the server request processes.

### 4. Middleware vs. Static Pages
- **Problem**: The authentication middleware was too aggressive, redirecting unauthenticated users away from the new Landing and About pages.
- **Solution**: We updated `middleware.ts` logic to explicitly whitelist public paths, ensuring the marketing pages remain accessible to everyone while protecting the dashboard.
