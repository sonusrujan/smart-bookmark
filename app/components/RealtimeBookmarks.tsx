"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import NewBookmarkForm from "@/app/components/NewBookmarkForm";

const RealtimeBookmarks = ({ bookmarks: serverBookmarks }: { bookmarks: any[] }) => {
  const supabase = createClient();
  const [bookmarks, setBookmarks] = useState(serverBookmarks);

  useEffect(() => {
    setBookmarks(serverBookmarks);
  }, [serverBookmarks]);

  useEffect(() => {
    const channel = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        (payload) => {
          // Inserts
          if (payload.new) {
            setBookmarks((bookmarks) => [...bookmarks, payload.new]);
          }

          // Deletes
          if (payload.old) {
            setBookmarks((bookmarks) =>
              bookmarks.filter((bookmark) => bookmark.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleDelete = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center">Your Bookmarks</h2>
      {bookmarks.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{bookmark.title}</h3>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {bookmark.url}
                </a>
              </div>
              <button
                onClick={() => handleDelete(bookmark.id)}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-center text-gray-600">
          You don't have any bookmarks yet.
        </p>
      )}
    </div>
  );
};

export default RealtimeBookmarks;
