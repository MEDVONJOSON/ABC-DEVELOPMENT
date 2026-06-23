import { useEffect, useRef, useState } from 'react';
import { stats } from '../data/site.js';

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
  return (
    <div ref={ref} className="text-center px-4">
      <div className="font-display font-bold text-4xl md:text-5xl text-gradient">
        {value.toLocaleString()}
        {s.suffix}
      </div>
      <div className="text-sm md:text-base text-slate-600 mt-2 font-medium">
        {s.label}
      </div>
    </div>
  );
}

export default function Stats({ variant = 'light' }) {
  const bg = variant === 'dark'
    ? 'bg-gradient-brand text-white'
    : 'bg-gradient-brand-soft';
  return (
    <section className={`${bg} py-14`}>
      <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <StatItem key={s.id} s={s} />
        ))}
      </div>
    </section>
  );
}
