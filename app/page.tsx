import { createClient } from "@/lib/supabase/server";
import NewBookmark from "./components/NewBookmarkForm";
import RealtimeBookmarks from "./components/RealtimeBookmarks";

export const revalidate = 0;

export default async function Home() {
  const supabase = createClient();
  const { data: bookmarks } = await supabase.from("bookmarks").select();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-8 bg-white border-b">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-center text-gray-900 lg:text-5xl">
            Smart Bookmark
          </h1>
          <p className="mt-4 text-lg text-center text-gray-600">
            Your personal space to save and organize your favorite links.
          </p>
        </div>
      </header>
      <main className="container px-4 py-12 mx-auto">
        <NewBookmark />
        <RealtimeBookmarks bookmarks={bookmarks || []} />
      </main>
    </div>
  );
}
