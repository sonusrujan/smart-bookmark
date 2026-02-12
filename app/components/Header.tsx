"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Header({ user }: { user?: { email?: string } | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-gray-100/50 py-4 shadow-sm" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container px-6 mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
            {/* <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white text-xs font-bold shadow-lg">SB</span> */}
            <img src="/logo.png" alt="SB" className="w-8 h-8 rounded-xl shadow-lg object-cover" />
            Smart Bookmark
          </Link>
          <nav className="hidden md:flex gap-6">
             <Link 
               href="/#about" 
               className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
             >
               About
             </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <>
               <span className="hidden sm:inline-block text-gray-600 text-sm font-medium">{user.email}</span>
               <Button 
                onClick={handleSignOut} 
                className="bg-gray-100/50 hover:bg-gray-200/50 text-gray-900 border border-gray-200/50 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium transition-all hover:scale-105"
               >
                 Sign Out
               </Button>
            </>
          )}
           {!user && (
             <Link href="/login">
               <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-6 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105">
                 Sign In
               </Button>
             </Link>
           )}
        </div>
      </div>
    </header>
  );
}
