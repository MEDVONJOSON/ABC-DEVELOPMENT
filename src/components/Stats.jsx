import { useEffect, useRef, useState } from 'react';
import { Users, Award, Heart, HandCoins } from 'lucide-react';
import { stats } from '../data/site.js';

const statIcons = {
  supported: Users,
  volunteers: Heart,
  awards: Award,
  donations: HandCoins,
};

function useCountUp(target, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (now) => {
              const t = Math.min(1, (now - start) / durationMs);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.floor(target * eased));
              if (t < 1) requestAnimationFrame(step);
              else setValue(target);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, durationMs]);

  return [ref, value];
}

function StatItem({ s }) {
  const [ref, value] = useCountUp(s.value);
  const Icon = statIcons[s.id] || Users;
  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center px-4 py-6 group"
    >
      {/* Icon badge */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
        style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}
      >
        <Icon size={26} className="text-white" />
      </div>

      {/* Count */}
      <div
        className="font-display font-black text-4xl md:text-5xl text-white"
        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
      >
        {value.toLocaleString()}{s.suffix}
      </div>

      {/* Label */}
      <div className="text-sm md:text-base text-white/80 mt-2 font-medium tracking-wide">
        {s.label}
      </div>
    </div>
  );
}

export default function Stats({ variant = 'light' }) {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{
        background: variant === 'dark'
          ? 'linear-gradient(135deg,#1b5e20 0%,#0d47a1 100%)'
          : 'linear-gradient(135deg,#2e7d32 0%,#1565c0 100%)',
      }}
    >
      {/* Decorative dot pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container-page relative grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-white/20">
        {stats.map((s) => (
          <StatItem key={s.id} s={s} />
        ))}
      </div>
    </section>
  );
}
