"use client";

import { addBookmark } from "@/app/actions";
import { useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { GlassCard } from "@/app/components/ui/design-system";

const NewBookmark = () => {
  const urlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  
  return (
    <GlassCard className="w-full max-w-xl mx-auto p-6 mb-8 transform transition-all duration-300 hover:shadow-xl border-white/40">
      <form className="flex flex-col gap-4" action={addBookmark}>
        <div className="space-y-1">
          <label htmlFor="url" className="text-sm font-semibold text-gray-700 ml-1">URL</label>
          <input
            id="url"
            name="url"
            ref={urlRef}
            required
            className="w-full px-4 py-3 text-gray-900 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900/20 transition-all backdrop-blur-sm placeholder:text-gray-400"
            placeholder="https://example.com"
            type="url"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm font-semibold text-gray-700 ml-1">Title <span className="text-gray-400 font-normal">(Optional)</span></label>
          <input
            id="title"
            name="title"
            ref={titleRef}
            className="w-full px-4 py-3 text-gray-900 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900/20 transition-all backdrop-blur-sm placeholder:text-gray-400"
            placeholder="My Awesome Bookmark"
            type="text"
          />
        </div>
        
        <Button
          type="submit"
          className="mt-2 w-full py-6 bg-gray-900 text-white hover:bg-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          Add Bookmark
        </Button>
      </form>
    </GlassCard>
  );
};

export default NewBookmark;
