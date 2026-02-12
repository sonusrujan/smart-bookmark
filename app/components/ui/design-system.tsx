"use client";

import { useIntersectionObserver } from "@/app/hooks/useAnimations";
import { ReactNode } from "react";

export function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: ReactNode, 
  className?: string, 
  delay?: number 
}) {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef}
      style={{ transitionDelay: `${delay}s` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function GlassCard({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
