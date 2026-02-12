import { GlassCard, AnimatedSection } from "@/app/components/ui/design-system";

export default function AboutSection() {
  return (
    <div className="space-y-24 pb-24">
      {/* Feature Grid */}
      <section id="features" className="container px-4 mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
           <AnimatedSection delay={0.2}>
              <GlassCard className="h-full p-8 space-y-4 hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl mb-4">
                  🔐
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Secure by Design</h3>
                <p className="text-gray-700 leading-relaxed font-medium">
                  Enterprise-grade security with Row Level Security (RLS). Your data is isolated, encrypted, and yours alone.
                </p>
              </GlassCard>
           </AnimatedSection>

           <AnimatedSection delay={0.3}>
              <GlassCard className="h-full p-8 space-y-4 hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl mb-4">
                  ⚡
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Real-Time Sync</h3>
                <p className="text-gray-700 leading-relaxed font-medium">
                  Changes propagate instantly across all your devices. Add a bookmark on your phone, see it on your desktop immediately.
                </p>
              </GlassCard>
           </AnimatedSection>

           <AnimatedSection delay={0.4}>
              <GlassCard className="h-full p-8 space-y-4 hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-2xl mb-4">
                  🎯
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Minimalist Focus</h3>
                <p className="text-gray-700 leading-relaxed font-medium">
                  A distraction-free interface designed for productivity. No ads, no clutter, just your content.
                </p>
              </GlassCard>
           </AnimatedSection>

           <AnimatedSection delay={0.5}>
              <GlassCard className="h-full p-8 space-y-4 hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-2xl mb-4">
                  ☁️
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Cloud Native</h3>
                <p className="text-gray-700 leading-relaxed font-medium">
                  Built on Next.js and Supabase. Scalable, fast, and always available wherever you are.
                </p>
              </GlassCard>
           </AnimatedSection>
         </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="container px-4 mx-auto">
        <AnimatedSection delay={0.6}>
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gray-900 p-12 text-center md:text-left md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-white">Built for Performance.</h2>
                <p className="text-gray-300 text-lg font-medium">
                  Powered by the latest technologies to ensure speed, reliability, and a premium user experience.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                   {['Next.js 16', 'Supabase', 'Tailwind CSS', 'TypeScript'].map((tech) => (
                     <span key={tech} className="px-4 py-1.5 bg-gray-800 text-gray-100 rounded-full text-sm font-semibold border border-gray-700">
                       {tech}
                     </span>
                   ))}
                </div>
              </div>
              <div className="hidden md:block md:w-1/3 opacity-80 mix-blend-lighten">
                 {/* Abstract decorative element - kept assuming it's acceptable as background, but removed gradients from text above */}
                 <div className="w-48 h-48 rounded-full bg-blue-600 blur-3xl mx-auto opacity-20"></div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}