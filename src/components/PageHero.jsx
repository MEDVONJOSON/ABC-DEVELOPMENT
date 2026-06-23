import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PageHero({ eyebrow, title, subtitle, image, ctaPrimary, ctaSecondary }) {
  return (
    <section className="relative overflow-hidden bg-gradient-brand text-white">
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-brand-800/70 to-accent-600/60" />
      </div>
      <div className="container-page relative py-20 md:py-28">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest bg-white/15 backdrop-blur px-3 py-1.5 rounded-full mb-5">
              {eyebrow}
            </div>
          )}
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {(ctaPrimary || ctaSecondary) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {ctaPrimary && (
                <Link to={ctaPrimary.to} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-brand-800 font-semibold hover:bg-brand-50 transition-colors">
                  {ctaPrimary.label} <ArrowRight size={18} />
                </Link>
              )}
              {ctaSecondary && (
                <Link to={ctaSecondary.to} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
