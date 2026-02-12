import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import NewBookmark from "./components/NewBookmarkForm";
import RealtimeBookmarks from "./components/RealtimeBookmarks";
import AboutSection from "./components/AboutSection";
import { Button } from "./components/ui/button";
import { AnimatedSection } from "./components/ui/design-system";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: bookmarks } = await supabase.from("bookmarks").select().order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50/50">
      
      {/* Hero / Dashboard Header */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 pb-2">
              {user ? "Your Library" : "Smart Bookmark"}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              {user 
                ? "Manage your collection securely and efficiently." 
                : "The simple, secure, and private way to organize your digital life."}
            </p>
            
            {!user && (
              <div className="pt-8">
                <Link href="/login">
                  <Button className="rounded-full px-8 py-6 text-lg bg-gray-900 hover:bg-gray-800 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {user ? (
        /* Dashboard View */
        <main className="container px-4 pb-20 mx-auto">
          <AnimatedSection delay={0.2}>
            <NewBookmark />
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <RealtimeBookmarks bookmarks={bookmarks || []} />
          </AnimatedSection>
          
          <div id="about" className="pt-20">
             <AboutSection />
          </div>
        </main>
      ) : (
        /* Landing Page View */
        <div id="about">
          <AboutSection />
        </div>
      )}
    </div>
  );
}
