"use client";

import { useParallax } from "@/app/hooks/useAnimations";

export default function Background() {
  const offset = useParallax(0.05); // Very subtle parallax speed

  return (
    <div className="fixed inset-0 z-[-50] overflow-hidden pointer-events-none select-none">
       {/* Parallax Image Layer */}
       <div 
         className="absolute -inset-[20%] bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-90"
         style={{ transform: `translateY(${offset}px)` }}
       />
       
       {/* Glass Overlay Layer */}
       <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl" />
       
       {/* Gradient Overlay for extra calmness */}
       <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
    </div>
  );
}