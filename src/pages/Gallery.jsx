import { useState } from 'react';
import { X } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';

const photos = [
  { id: 1, src: '/images/hero-education.jpg', alt: 'Education in action', category: 'education' },
  { id: 2, src: '/images/hero-health.jpg', alt: 'Community health workers', category: 'health' },
  { id: 3, src: '/images/hero-community.jpg', alt: 'Community meeting', category: 'community' },
  { id: 4, src: '/images/hero-landscape.jpg', alt: 'Sierra Leone landscape', category: 'landscape' },
  { id: 5, src: '/images/og-default.jpg', alt: 'ABC Development banner', category: 'community' },
];

export default function Gallery() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(photos.map((p) => p.category))];
  const filtered = photos.filter((p) => filter === 'all' || p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Visual Stories from the Field"
        subtitle="Browse photos of our work, events, and community impact across Sierra Leone."
        image="/images/hero-community.jpg"
      />

      <section className="section">
        <div className="container-page">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`chip capitalize ${
                  filter === c
                    ? 'bg-brand-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className="aspect-[4/3] overflow-hidden rounded-2xl shadow-soft hover:shadow-lg transition-shadow group"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            More photos from our field teams are added regularly. Follow us on social media for daily updates.
          </p>
        </div>
      </section>

      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            onClick={() => setActive(null)}
          >
            <X size={20} />
          </button>
          <img
            src={active.src}
            alt={active.alt}
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
