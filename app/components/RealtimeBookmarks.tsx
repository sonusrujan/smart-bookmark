"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { GlassCard, AnimatedSection } from "@/app/components/ui/design-system";
import { deleteBookmark } from "@/app/actions";

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
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => 
              prev.filter((bookmark) => bookmark.id !== (payload.old as any).id)
            );
          } else if (payload.eventType === 'UPDATE') {
            setBookmarks((prev) => 
              prev.map((bookmark) => bookmark.id === payload.new.id ? payload.new : bookmark)
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
    if (!window.confirm("Are you sure you want to delete this bookmark?")) return;
    
    // Optimistic update for immediate feedback
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    
    // Trigger Server Action (handles DB delete + Revalidate)
    await deleteBookmark(id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 pb-20">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your Collection</h2>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {bookmarks.length} {bookmarks.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>
      
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((bookmark, index) => (
            <AnimatedSection key={bookmark.id} delay={index * 0.05} className="h-full">
              <GlassCard className="h-full p-5 flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300 border-white/60 hover:border-blue-500/20 hover:shadow-lg">
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {bookmark.title || 'Untitled'}
                    </h3>
                  </div>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-blue-500 transition-colors line-clamp-1 break-all mt-1 block"
                  >
                    {bookmark.url}
                  </a>
                </div>
                
                <div className="flex justify-end pt-2 border-t border-gray-100 mt-auto">
                    <a 
                      href={bookmark.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg mr-2 transition-colors"
                    >
                      Visit
                    </a>
                    <button
                      onClick={() => handleDelete(bookmark.id)}
                      className="text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">
            Your collection is empty. Start adding bookmarks above.
          </p>
        </div>
      )}
    </div>
  );
};

export default RealtimeBookmarks;
